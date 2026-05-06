"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/Badge";
import { stocks } from "@/lib/mock-data";
import { storage } from "@/lib/storage";
import type { StockNote, UserProfile } from "@/types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [notes, setNotes] = useState<StockNote[]>([]);

  useEffect(() => {
    setProfile(storage.getProfile());
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

  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">내 페이지</p>
        <h1 className="mt-1 text-3xl font-black text-ink">{profile ? `${profile.name}님의 해석 기준` : "해석 기준을 만들어주세요"}</h1>
      </header>

      <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
        {profile ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge tone="lilac">{profile.riskProfile}</Badge>
              <Badge tone="blue">관심종목 {favoriteCount}개</Badge>
              <Badge tone="lemon">손실 허용 {profile.lossTolerance}</Badge>
            </div>
            <Info label="관심 분야" value={profile.interests.join(", ")} />
            <Info label="변동성 허용" value={profile.volatility} />
            <Info label="투자 기간" value={profile.horizon} />
            <Info label="뉴스 체크" value={profile.newsFrequency} />
          </div>
        ) : (
          <p className="font-semibold leading-7 text-black/60">온보딩을 완료하면 투자 성향과 관심 분야에 맞춰 해석 문장이 달라집니다.</p>
        )}
        <Link href="/onboarding" className="mt-5 block h-12 rounded-2xl bg-ink pt-3 text-center text-sm font-black text-white">
          온보딩 다시 수정하기
        </Link>
        <Link href="/legal" className="mt-3 block h-12 rounded-2xl bg-black/[0.06] pt-3 text-center text-sm font-black text-black/65">
          법적 고지 보기
        </Link>
        <Link href="/privacy" className="mt-3 block h-12 rounded-2xl bg-black/[0.06] pt-3 text-center text-sm font-black text-black/65">
          개인정보 안내 보기
        </Link>
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
