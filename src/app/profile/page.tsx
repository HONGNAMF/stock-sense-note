"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/Badge";
import { stocks } from "@/lib/mock-data";
import { storage } from "@/lib/storage";
import { profileService } from "@/services/profileService";
import type { LocalProfile } from "@/types/investment";
import type { StockNote } from "@/types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<LocalProfile | null>(null);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [notes, setNotes] = useState<StockNote[]>([]);

  useEffect(() => {
    setProfile(profileService.getProfile());
    setFavoriteCount(storage.getFavorites().length);
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
    if (!confirm("현재 기기에 저장된 이 투자노트 정보를 초기화할까요?")) return;
    profileService.resetCurrentProfile();
    window.location.href = "/";
  }

  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">내 페이지</p>
        <h1 className="mt-1 text-3xl font-black text-ink">{profile ? `${profile.name}님의 투자노트` : "투자노트를 불러와 주세요"}</h1>
      </header>

      <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
        {profile ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge tone="lilac">{profile.investorSummary ?? "기본 보기"}</Badge>
              <Badge tone="blue">관심종목 {favoriteCount}개</Badge>
              <Badge tone="lemon">{profile.birthDate}</Badge>
            </div>
            <Info label="관심 분야" value={profile.interests.length ? profile.interests.join(", ") : "아직 설정하지 않았어요"} />
            <Info label="보기 방식" value={profile.viewMode === "simple" ? "한눈에 보기" : profile.viewMode === "detailed" ? "상세 보기" : "기본 보기"} />
            <Info label="저장 방식" value="현재 버전은 이 기기에 저장됩니다." />
          </div>
        ) : (
          <p className="font-semibold leading-7 text-black/60">이름과 생년월일로 이 기기에 저장된 투자노트를 불러올 수 있어요.</p>
        )}

        <div className="mt-5 grid gap-2">
          <button type="button" onClick={switchNote} className="h-12 rounded-2xl bg-ink text-sm font-black text-white">
            다른 투자노트로 전환
          </button>
          <Link href="/onboarding" className="block h-12 rounded-2xl bg-black/[0.06] pt-3 text-center text-sm font-black text-black/65">
            새 투자노트 만들기
          </Link>
          <button type="button" onClick={resetCurrentNote} className="h-12 rounded-2xl bg-red-50 text-sm font-black text-red-600">
            현재 투자노트 초기화
          </button>
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-xl font-black">최근 메모</h2>
        <div className="mt-3 space-y-3">
          {noteRows.length ? (
            noteRows.map(({ note, stock }) => (
              <Link key={note.ticker} href={`/stocks/${encodeURIComponent(note.ticker)}`} className="block rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-sm font-black text-black/45">{stock?.name ?? note.ticker}</p>
                <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-black/65">{note.feeling || note.reason || "저장된 메모가 있습니다."}</p>
              </Link>
            ))
          ) : (
            <div className="rounded-3xl bg-white p-5 text-sm font-semibold text-black/55 shadow-sm">아직 저장된 메모가 없습니다.</div>
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
