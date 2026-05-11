"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/Badge";
import { APP_NAME_KO } from "@/lib/brand";
import { resizeImageFile } from "@/lib/image-utils";
import { stocks } from "@/lib/mock-data";
import { storage } from "@/lib/storage";
import { profileService, validateNickname } from "@/services/profileService";
import { journalService } from "@/services/journalService";
import type { LocalProfile } from "@/types/investment";
import type { StockNote } from "@/types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<LocalProfile | null>(null);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [tradeCount, setTradeCount] = useState(0);
  const [notes, setNotes] = useState<StockNote[]>([]);
  const [nicknameDraft, setNicknameDraft] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const current = profileService.getProfile();
    setProfile(current);
    setNicknameDraft(current?.nickname ?? "");
    setFavoriteCount(storage.getFavorites().length);
    setTradeCount(journalService.getTrades().length);
    setNotes(Object.values(storage.getNotes()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
  }, []);

  const noteRows = useMemo(
    () =>
      notes.slice(0, 3).map((note) => ({
        note,
        stock: stocks.find((stock) => stock.ticker === note.ticker)
      })),
    [notes]
  );

  function switchNote() {
    profileService.setCurrentProfileId(null);
    window.location.href = "/";
  }

  function resetCurrentNote() {
    if (!confirm("현재 기기에 저장된 내 센스폴리오를 초기화할까요?")) return;
    profileService.resetCurrentProfile();
    window.location.href = "/";
  }

  function saveNickname() {
    if (!profile) return;
    const error = validateNickname(nicknameDraft, profileService.getProfiles(), profile.localUserId);
    if (error) {
      setMessage(error);
      return;
    }
    const next = { ...profile, nickname: nicknameDraft.trim(), name: nicknameDraft.trim(), updatedAt: new Date().toISOString() };
    profileService.updateProfile(next);
    setProfile(next);
    setMessage("닉네임을 저장했어요.");
  }

  async function changeProfileImage(file?: File) {
    if (!profile || !file) return;
    try {
      const profileImageUrl = await resizeImageFile(file);
      const next = { ...profile, profileImageUrl, updatedAt: new Date().toISOString() };
      profileService.updateProfile(next);
      setProfile(next);
      setMessage("프로필 사진을 바꿨어요.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "프로필 사진을 저장하지 못했어요.");
    }
  }

  function removeProfileImage() {
    if (!profile) return;
    const next = { ...profile, profileImageUrl: "", updatedAt: new Date().toISOString() };
    profileService.updateProfile(next);
    setProfile(next);
  }

  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">내 페이지</p>
        <h1 className="mt-1 text-3xl font-black text-ink">{profile ? `${profile.nickname}님의 ${APP_NAME_KO}` : "둘러보기 모드입니다"}</h1>
      </header>

      <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
        {profile ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-full bg-ink text-2xl font-black text-white">
                {profile.profileImageUrl ? <img src={profile.profileImageUrl} alt="" className="size-20 object-cover" /> : profile.nickname.slice(0, 1)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-black/45">프로필 사진</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <label className="flex h-10 cursor-pointer items-center rounded-2xl bg-paper px-3 text-xs font-black text-black/65">
                    사진 바꾸기
                    <input type="file" accept="image/png,image/jpeg" onChange={(event) => changeProfileImage(event.target.files?.[0])} className="sr-only" />
                  </label>
                  {profile.profileImageUrl ? (
                    <button type="button" onClick={removeProfileImage} className="h-10 rounded-2xl bg-black/[0.05] px-3 text-xs font-black text-black/55">
                      사진 제거
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            <label className="block">
              <span className="text-sm font-black text-black/55">닉네임 변경</span>
              <div className="mt-2 flex gap-2">
                <input value={nicknameDraft} onChange={(event) => setNicknameDraft(event.target.value)} className="h-12 min-w-0 flex-1 rounded-2xl bg-paper px-4 font-bold outline-none" />
                <button onClick={saveNickname} className="rounded-2xl bg-ink px-4 text-xs font-black text-white">
                  저장
                </button>
              </div>
            </label>
            {message ? <p className="rounded-2xl bg-lemon/70 p-3 text-sm font-bold text-yellow-950">{message}</p> : null}

            <div className="flex flex-wrap gap-2">
              <Badge tone="lilac">{profile.investorSummary ?? "기본 보기"}</Badge>
              <Badge tone="blue">관심종목 {favoriteCount}개</Badge>
              <Badge tone="green">매수/매도 기록 {tradeCount}개</Badge>
            </div>
            <Info label="관심 분야" value={profile.interests.length ? profile.interests.join(", ") : "아직 설정하지 않았어요"} />
            <Info label="보기 방식" value={profile.viewMode === "simple" ? "한눈에 보기" : profile.viewMode === "detailed" ? "상세 보기" : "기본 보기"} />
            <Info label="저장 방식" value="현재 버전은 이 기기에 저장됩니다. 다른 기기에서는 이어지지 않을 수 있어요." />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid size-20 place-items-center rounded-full bg-ink text-2xl font-black text-white">S</div>
            <div>
              <h2 className="text-xl font-black">둘러보기 모드입니다.</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-black/60">내 기록을 저장하려면 회원가입이 필요해요.</p>
            </div>
            <Link href="/onboarding" className="block h-12 rounded-2xl bg-ink pt-3 text-center text-sm font-black text-white">
              회원가입하기
            </Link>
          </div>
        )}

        <div className="mt-5 grid gap-2">
          <button type="button" onClick={switchNote} className="h-12 rounded-2xl bg-ink text-sm font-black text-white">
            다른 센스폴리오로 전환
          </button>
          <Link href="/onboarding" className="block h-12 rounded-2xl bg-black/[0.06] pt-3 text-center text-sm font-black text-black/65">
            새 센스폴리오 만들기
          </Link>
          {profile ? (
            <button type="button" onClick={resetCurrentNote} className="h-12 rounded-2xl bg-red-50 text-sm font-black text-red-600">
              현재 센스폴리오 초기화
            </button>
          ) : null}
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-xl font-black">최근 기록</h2>
        <div className="mt-3 space-y-3">
          {noteRows.length ? (
            noteRows.map(({ note, stock }) => (
              <Link key={note.ticker} href={`/stocks/${encodeURIComponent(note.ticker)}`} className="block rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-sm font-black text-black/45">{stock?.name ?? note.ticker}</p>
                <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-black/65">{note.feeling || note.reason || "저장된 메모가 있습니다."}</p>
              </Link>
            ))
          ) : (
            <div className="rounded-3xl bg-white p-5 text-sm font-semibold text-black/55 shadow-sm">아직 저장된 기록이 없습니다.</div>
          )}
        </div>
      </section>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-black text-black/42">{label}</p>
      <p className="mt-1 text-base font-black">{value}</p>
    </div>
  );
}
