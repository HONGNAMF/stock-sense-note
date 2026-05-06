"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/Badge";
import { Section } from "@/components/Section";
import { StockCard } from "@/components/StockCard";
import { marketContext, marketSummary, stocks } from "@/lib/mock-data";
import { profileGuide } from "@/lib/analysis";
import { storage } from "@/lib/storage";
import { profileService } from "@/services/profileService";
import type { UserProfile } from "@/types";
import type { LocalProfile } from "@/types/investment";

export default function HomePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [localProfile, setLocalProfile] = useState<LocalProfile | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setProfile(storage.getProfile());
    setLocalProfile(profileService.getProfile());
    setFavorites(storage.getFavorites());
  }, []);

  const interestMatches = useMemo(() => {
    if (!profile) return stocks.filter((stock) => stock.category === "관심사 기반 추천");
    return stocks.filter((stock) => stock.interests.some((interest) => profile.interests.includes(interest)));
  }, [profile]);

  const groups = [
    ["실시간 핫 종목", stocks.filter((stock) => stock.category === "실시간 핫 종목").slice(0, 3)],
    ["위험 신호 종목", stocks.filter((stock) => stock.category === "위험 신호 종목" || stock.status === "과열").slice(0, 3)],
    ["테마 확산 종목", stocks.filter((stock) => stock.category === "테마 확산 종목").slice(0, 3)],
    ["비교 관찰 종목", stocks.filter((stock) => stock.category === "비교 관찰 종목" || stock.status === "안정").slice(0, 3)]
  ] as const;

  return (
    <AppShell>
      {!profile && !localProfile ? (
        <section className="mb-6 rounded-3xl bg-ink p-6 text-white shadow-soft">
          <p className="text-sm font-bold text-white/55">개인화 투자 해석 노트</p>
          <h1 className="mt-2 text-4xl font-black">해석노트</h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-white/72">이해 → 판단 → 실행 → 기록 → 복기를 돕는 개인 투자 노트입니다.</p>
          <Link href="/onboarding" className="mt-5 block h-12 rounded-2xl bg-white pt-3 text-center text-sm font-black text-ink">
            시작하기
          </Link>
        </section>
      ) : null}
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-black/50">해석노트</p>
          <h1 className="mt-1 text-3xl font-black tracking-normal text-ink">
            {localProfile ? `${localProfile.name}님, 이번 달 흐름을 볼까요?` : profile ? `${profile.name}님, 오늘은 쉽게 볼까요?` : "오늘 주식, 문장으로 해석해요"}
          </h1>
        </div>
        <Link href="/onboarding" className="shrink-0 rounded-full bg-ink px-4 py-2 text-sm font-black text-white">
          {profile ? "수정" : "시작"}
        </Link>
      </header>

      <Link href="/search" className="mt-5 flex h-14 items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 text-black/45 shadow-soft">
        <Search size={20} />
        <span className="font-bold">종목명이나 티커 검색</span>
      </Link>

      <Link href="/market" className="mt-3 block rounded-2xl bg-white px-4 py-3 text-sm font-black text-ink shadow-sm">
        유명 종목 100개를 섹터별로 보기
      </Link>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <Link href="/reports" className="rounded-2xl bg-lemon p-3 text-center text-xs font-black text-yellow-950">월간 요약</Link>
        <Link href="/etfs" className="rounded-2xl bg-skysoft p-3 text-center text-xs font-black text-sky-950">월간 관심 ETF</Link>
        <Link href="/glossary" className="rounded-2xl bg-lilac p-3 text-center text-xs font-black text-violet-950">단어찾기</Link>
      </div>

      <section className="mt-5 rounded-3xl bg-ink p-5 text-white shadow-soft">
        <div className="flex flex-wrap gap-2">
          <Badge tone="lemon">참고용 분석</Badge>
          {profile ? <Badge tone="lilac">{profile.riskProfile}</Badge> : null}
        </div>
        <h2 className="mt-4 text-xl font-black">오늘 시장 한 줄 요약</h2>
        <p className="mt-2 text-base font-semibold leading-7 text-white/82">{marketSummary}</p>
        <p className="mt-3 text-sm font-semibold text-white/62">{profileGuide(profile?.riskProfile)}</p>
        <p className="mt-3 text-xs font-bold text-white/45">업데이트 기준일: {marketContext.lastUpdated}</p>
      </section>

      <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-lg font-black">이 종목들이 뜨는 기준</h2>
        <div className="mt-3 space-y-2 text-sm font-semibold leading-6 text-black/62">
          {marketContext.sourceNotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
        <p className="mt-3 rounded-2xl bg-lemon/60 p-3 text-sm font-black leading-6 text-yellow-950">{marketContext.updatePolicy}</p>
      </section>

      <Section title="내가 매수한 종목" sub="매수/매도 기록을 남기면 리포트에 반영됩니다.">
        <Link href="/trades" className="block rounded-3xl bg-white p-5 shadow-soft">
          <p className="text-lg font-black">매수/매도 기록하러 가기</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">종목명, 가격, 수량, 이유와 감정을 간단히 남겨보세요.</p>
        </Link>
      </Section>

      {groups.map(([title, list]) => (
        <Section key={title} title={title}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {list.map((stock) => (
              <StockCard key={`${title}-${stock.ticker}`} stock={stock} />
            ))}
          </div>
        </Section>
      ))}

      <Section title="관심종목" sub={favorites.length ? "하트로 저장한 종목이에요." : "종목 상세에서 하트를 누르면 여기에 모입니다."}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(favorites.length ? stocks.filter((stock) => favorites.includes(stock.ticker)) : stocks.slice(0, 2)).map((stock) => (
            <StockCard key={`fav-${stock.ticker}`} stock={stock} />
          ))}
        </div>
      </Section>

      <Section title="관심사 기반 추천" sub="온보딩 관심 분야와 연결되는 종목입니다.">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {interestMatches.slice(0, 4).map((stock) => (
            <StockCard key={`interest-${stock.ticker}`} stock={stock} />
          ))}
        </div>
      </Section>
    </AppShell>
  );
}
