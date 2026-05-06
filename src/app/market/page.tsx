"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/Badge";
import { popularStocks, popularStockUpdateGuide } from "@/lib/popular-stocks";
import { stocks } from "@/lib/mock-data";

const sectors = ["전체", ...Array.from(new Set(popularStocks.map((stock) => stock.sector)))];

export default function MarketPage() {
  const [sector, setSector] = useState("전체");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return popularStocks.filter((stock) => {
      const sectorMatch = sector === "전체" || stock.sector === sector;
      const queryMatch = !normalized || [stock.name, stock.ticker, stock.sector, stock.reason].some((item) => item.toLowerCase().includes(normalized));
      return sectorMatch && queryMatch;
    });
  }, [sector, query]);

  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">월간 시장 피드</p>
        <h1 className="mt-1 text-3xl font-black text-ink">최근 유명한 종목 100개 한눈에 보기</h1>
        <p className="mt-2 text-sm font-semibold leading-6 text-black/55">{popularStockUpdateGuide}</p>
      </header>

      <label className="mt-5 flex h-14 items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 shadow-soft">
        <Search size={20} className="text-black/45" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="삼성전자, 바이오, 방산..." className="h-full flex-1 bg-transparent font-bold outline-none" />
      </label>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {sectors.map((item) => (
          <button key={item} type="button" onClick={() => setSector(item)} className={item === sector ? "shrink-0 rounded-full bg-ink px-4 py-2 text-sm font-black text-white" : "shrink-0 rounded-full bg-white px-4 py-2 text-sm font-black text-black/55 shadow-sm"}>
            {item}
          </button>
        ))}
      </div>

      <section className="mt-5 rounded-3xl bg-white p-3 shadow-soft">
        <div className="grid grid-cols-[44px_1fr_96px] gap-2 px-3 py-2 text-xs font-black text-black/40 sm:grid-cols-[56px_1fr_140px_1.2fr_72px]">
          <span>순위</span>
          <span>종목</span>
          <span>섹터</span>
          <span className="hidden sm:block">왜 유명한가</span>
          <span className="hidden sm:block">위험</span>
        </div>
        <div className="space-y-2">
          {rows.map((row) => {
            const hasDetail = stocks.some((stock) => stock.ticker === row.ticker);
            const content = (
              <article className="grid min-h-16 grid-cols-[44px_1fr_96px] items-center gap-2 rounded-2xl bg-paper px-3 py-2 transition hover:bg-skysoft/60 sm:grid-cols-[56px_1fr_140px_1.2fr_72px]">
                <p className="text-sm font-black text-black/45">{row.rank}</p>
                <div>
                  <h2 className="text-sm font-black text-ink">{row.name}</h2>
                  <p className="mt-0.5 text-xs font-bold text-black/45">{row.ticker}</p>
                </div>
                <p className="text-xs font-black leading-5 text-black/58">{row.sector}</p>
                <p className="hidden text-xs font-semibold leading-5 text-black/56 sm:block">{row.reason}</p>
                <div className="hidden sm:block">
                  <Badge tone={row.risk === "높음" ? "coral" : row.risk === "중간" ? "yellow" : "green"}>{row.risk}</Badge>
                </div>
              </article>
            );

            return hasDetail ? (
              <Link key={row.ticker} href={`/stocks/${encodeURIComponent(row.ticker)}`} className="block">
                {content}
              </Link>
            ) : (
              <div key={row.ticker}>{content}</div>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
