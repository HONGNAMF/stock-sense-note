"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StockCard } from "@/components/StockCard";
import { stocks } from "@/lib/mock-data";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const result = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return stocks;
    return stocks.filter((stock) => [stock.name, stock.ticker, stock.category, ...stock.interests].some((item) => item.toLowerCase().includes(normalized)));
  }, [query]);

  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">검색</p>
        <h1 className="mt-1 text-3xl font-black text-ink">궁금한 종목을 찾아요</h1>
      </header>

      <Link href="/market" className="mt-5 block rounded-3xl bg-ink p-5 text-white shadow-soft">
        <p className="text-sm font-bold text-white/55">시장 피드</p>
        <h2 className="mt-1 text-xl font-black">유명 종목 100개 한눈에 보기</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-white/70">섹터별로 나누고, 왜 유명한지와 위험도를 같이 봅니다.</p>
      </Link>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link href="/glossary" className="rounded-2xl bg-white p-4 text-sm font-black shadow-sm">단어찾기</Link>
        <Link href="/etfs" className="rounded-2xl bg-white p-4 text-sm font-black shadow-sm">ETF 보기</Link>
      </div>

      <label className="mt-5 flex h-14 items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 shadow-soft">
        <Search size={20} className="text-black/45" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="삼성전자, Spotify, 애니플러스..." className="h-full flex-1 bg-transparent font-bold outline-none" />
      </label>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {result.map((stock) => (
          <StockCard key={stock.ticker} stock={stock} />
        ))}
      </div>
    </AppShell>
  );
}
