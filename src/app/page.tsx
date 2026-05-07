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
import type { LocalProfile } from "@/types/investment";

type LoginState = "idle" | "not-found";

export default function HomePage() {
  const [localProfile, setLocalProfile] = useState<LocalProfile | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loginName, setLoginName] = useState("");
  const [loginState, setLoginState] = useState<LoginState>("idle");

  useEffect(() => {
    setLocalProfile(profileService.getProfile());
    setFavorites(storage.getFavorites());
  }, []);

  const monthlyInterestMatches = useMemo(() => {
    if (!localProfile?.interests.length) return stocks.slice(0, 3);
    const joined = localProfile.interests.join(" ");
    return stocks.filter((stock) => stock.interests.some((interest) => joined.includes(interest))).slice(0, 4);
  }, [localProfile]);

  const recentStocks = stocks.slice(0, 3);
  const overheatedStocks = stocks.filter((stock) => stock.ticker === "000660.KS" || stock.ticker === "000250.KQ" || stock.status.includes("과열")).slice(0, 3);
  const monthlyFlowStocks = stocks.slice(3, 6);

  function login() {
    const found = profileService.findProfile(loginName);
    if (!found) {
      setLoginState("not-found");
      return;
    }
    profileService.setCurrentProfileId(found.localUserId);
    setLocalProfile(found);
    setLoginState("idle");
  }

  function browseOnly() {
    const now = new Date().toISOString();
    setLocalProfile({
      localUserId: "guest-browse",
      name: "둘러보기",
      interests: [],
      watchSymbols: [],
      investorSummary: "로그인 없이 둘러보는 중입니다.",
      viewMode: "standard",
      onboardingCompleted: false,
      createdAt: now,
      updatedAt: now
    });
  }

  if (!localProfile) {
    return (
      <AppShell>
        <section className="rounded-3xl bg-ink p-6 text-white shadow-soft">
          <p className="text-sm font-bold text-white/55">센스폴리오 · Sensefolio</p>
          <h1 className="mt-2 text-4xl font-black">내 투자 감각을 키우는 개인 투자노트</h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-white/72">
            주식과 ETF를 쉽게 이해하고, 내 판단과 매수·매도 기록을 쌓아보세요.
          </p>
        </section>

        <section className="mt-5 space-y-4 rounded-3xl bg-white p-5 shadow-soft">
          <div className="grid grid-cols-3 gap-2">
            <button onClick={login} className="h-12 rounded-2xl bg-black/[0.08] text-sm font-black text-black/70">
              로그인
            </button>
            <Link href="/onboarding" className="h-12 rounded-2xl bg-ink pt-3 text-center text-sm font-black text-white">
              회원가입
            </Link>
            <button onClick={browseOnly} className="h-12 rounded-2xl bg-black/[0.06] text-sm font-black text-black/70">
              둘러보기
            </button>
          </div>

          <div className="h-px bg-black/[0.06]" />

          <h2 className="text-lg font-black">내 투자노트 로그인</h2>
          <label className="block">
            <span className="text-sm font-black text-black/55">닉네임</span>
            <input
              value={loginName}
              onChange={(event) => setLoginName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") login();
              }}
              className="mt-2 h-12 w-full rounded-2xl bg-paper px-4 font-bold outline-none"
              placeholder="회원가입 때 쓴 닉네임"
            />
          </label>
          <p className="text-xs font-bold leading-5 text-black/45">
            현재 MVP는 닉네임으로 이 기기에 저장된 투자노트를 불러옵니다. 둘러보기는 기록을 만들지 않고 먼저 앱을 볼 수 있어요.
          </p>
        </section>

        {loginState === "not-found" ? (
          <section className="mt-4 rounded-3xl bg-lemon/80 p-5 shadow-soft">
            <h2 className="text-lg font-black text-yellow-950">저장된 투자노트를 찾을 수 없어요.</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-yellow-950/75">처음 사용하신다면 회원가입을 진행해주세요.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link href="/onboarding" className="h-11 rounded-2xl bg-ink pt-3 text-center text-xs font-black text-white">
                회원가입하기
              </Link>
              <button onClick={() => setLoginState("idle")} className="h-11 rounded-2xl bg-white text-xs font-black text-black/65">
                다시 입력하기
              </button>
            </div>
          </section>
        ) : null}
      </AppShell>
    );
  }

  return (
    <AppShell>
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-black/50">센스폴리오 · Sensefolio</p>
          <h1 className="mt-1 text-3xl font-black tracking-normal text-ink">내 투자 감각을 키우는 개인 투자노트</h1>
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">
            주식과 ETF를 쉽게 이해하고, 내 판단과 매수·매도 기록을 쌓아보세요.
          </p>
        </div>
        <div className="grid size-12 place-items-center overflow-hidden rounded-full bg-ink text-lg font-black text-white">
          {localProfile.profileImageUrl ? <img src={localProfile.profileImageUrl} alt="" className="size-12 object-cover" /> : localProfile.name.slice(0, 1)}
        </div>
      </header>

      {!localProfile.onboardingCompleted ? (
        <section className="mt-5 rounded-3xl bg-lemon/80 p-5 shadow-soft">
          <h2 className="text-lg font-black text-yellow-950">닉네임을 입력하면 나만의 투자노트를 만들 수 있어요.</h2>
          <Link href="/onboarding" className="mt-4 block h-11 rounded-2xl bg-ink pt-3 text-center text-xs font-black text-white">
            내 투자노트 만들기
          </Link>
        </section>
      ) : null}

      <div className="mt-5 grid grid-cols-3 gap-2">
        <Link href="/reports" className="rounded-2xl bg-ink p-4 text-center text-xs font-black text-white shadow-soft">
          📅 월간 요약
        </Link>
        <Link href="/reports" className="rounded-2xl bg-white p-4 text-center text-xs font-black text-black/65 shadow-sm">
          📊 주간 흐름
        </Link>
        <Link href="/news" className="rounded-2xl bg-white p-4 text-center text-xs font-black text-black/65 shadow-sm">
          🌍 오늘 시장
        </Link>
      </div>

      <Link href="/search" className="mt-5 flex h-14 items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 text-black/45 shadow-soft">
        <Search size={20} />
        <span className="font-bold">종목명이나 티커 검색</span>
      </Link>

      <section className="mt-5 rounded-3xl bg-ink p-5 text-white shadow-soft">
        <div className="flex flex-wrap gap-2">
          <Badge tone="lemon">참고용 해석</Badge>
          <Badge tone="blue">시세 출처 표시</Badge>
        </div>
        <h2 className="mt-4 text-xl font-black">월간 시장 흐름</h2>
        <p className="mt-2 text-base font-semibold leading-7 text-white/82">{marketSummary}</p>
        <p className="mt-3 text-sm font-semibold text-white/62">{profileGuide(undefined)}</p>
        <p className="mt-3 text-xs font-bold text-white/45">업데이트 기준: {marketContext.lastUpdated}</p>
      </section>

      <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-lg font-black">오늘 급등주는 앱 안에서 추천하지 않아요.</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-black/60">단기 급등주는 변동성이 크므로 참고용으로만 확인하세요.</p>
        <a
          href="https://finance.naver.com/sise/sise_rise.naver"
          target="_blank"
          rel="noreferrer"
          className="mt-4 block h-11 rounded-2xl bg-black/[0.06] pt-3 text-center text-xs font-black text-black/70"
        >
          오늘 급등주 보러가기
        </a>
      </section>

      <Section title="내가 매수한 종목" sub="매수/매도 기록을 남기면 월간 리포트에 반영됩니다.">
        <Link href="/trades" className="block rounded-3xl bg-white p-5 shadow-soft">
          <p className="text-lg font-black">매수/매도 기록하러 가기</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">종목명, 가격, 수량, 이유와 감정을 간단히 남겨보세요.</p>
        </Link>
      </Section>

      <Section title="최근 30일 주목 종목">
        <StockGrid title="recent" list={recentStocks} />
      </Section>

      <Section title="월간 관심 종목">
        <StockGrid title="monthly" list={monthlyInterestMatches} />
      </Section>

      <Section title="과열 주의 종목" sub="최근 한 달간 많이 올랐거나 거래량이 크게 늘어 주의해서 볼 필요가 있는 종목입니다.">
        <StockGrid title="overheated" list={overheatedStocks} />
      </Section>

      <Section title="이번 달 흐름 종목">
        <StockGrid title="flow" list={monthlyFlowStocks} />
      </Section>

      <Section title="관심종목" sub={favorites.length ? "하트로 저장한 종목이에요." : "아직 관심종목이 없어요. 종목 상세에서 하트를 누르면 여기에 모입니다."}>
        {favorites.length ? (
          <StockGrid title="fav" list={stocks.filter((stock) => favorites.includes(stock.ticker))} />
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Link href="/market" className="rounded-2xl bg-white p-4 text-center text-sm font-black shadow-sm">
              종목 둘러보기
            </Link>
            <Link href="/etfs" className="rounded-2xl bg-white p-4 text-center text-sm font-black shadow-sm">
              ETF 둘러보기
            </Link>
          </div>
        )}
      </Section>
    </AppShell>
  );
}

function StockGrid({ title, list }: { title: string; list: typeof stocks }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {list.map((stock) => (
        <StockCard key={`${title}-${stock.ticker}`} stock={stock} />
      ))}
    </div>
  );
}
