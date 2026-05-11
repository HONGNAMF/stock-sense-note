"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/Badge";
import { StockCard } from "@/components/StockCard";
import { etfs } from "@/lib/etf-data";
import { stocks } from "@/lib/mock-data";
import { searchListedCompanies } from "@/lib/listed-companies";
import { companyProfileService } from "@/services/companyProfileService";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const detailedStocks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return stocks;
    return stocks.filter((stock) => [stock.name, stock.ticker, stock.category, stock.sector ?? "", ...(stock.searchKeywords ?? []), ...stock.interests].some((item) => item.toLowerCase().includes(normalized)));
  }, [query]);

  const listedRows = useMemo(() => searchListedCompanies(query), [query]);
  const etfRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return etfs;
    return etfs.filter((etf) => [etf.name, etf.symbol, etf.character, etf.oneLine, etf.issuer].some((item) => item.toLowerCase().includes(normalized)));
  }, [query]);

  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">검색</p>
        <h1 className="mt-1 text-3xl font-black text-ink">상장사와 ETF를 한 번에 찾아요</h1>
        <p className="mt-2 text-sm font-semibold leading-6 text-black/55">종목명, 종목코드, 업종, 제품 키워드로 검색할 수 있습니다. MVP에는 seed/import 구조와 주요 예시 데이터가 포함되어 있어요.</p>
      </header>

      <Link href="/market" className="mt-5 block rounded-3xl bg-ink p-5 text-white shadow-soft">
        <p className="text-sm font-bold text-white/55">시장 피드</p>
        <h2 className="mt-1 text-xl font-black">유명 종목을 한눈에 보기</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-white/70">최근 30일 흐름과 과열 주의 종목을 함께 봅니다.</p>
      </Link>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link href="/glossary" className="rounded-2xl bg-white p-4 text-sm font-black shadow-sm">단어찾기</Link>
        <Link href="/etfs" className="rounded-2xl bg-white p-4 text-sm font-black shadow-sm">ETF 보기</Link>
      </div>

      <label className="mt-5 flex h-14 items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 shadow-soft">
        <Search size={20} className="text-black/45" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="브레이크, CCTV, 체성분, MLCC, 삼성전자..." className="h-full flex-1 bg-transparent font-bold outline-none" />
      </label>

      {detailedStocks.length ? (
        <section className="mt-5">
          <h2 className="text-xl font-black">상세 해석이 준비된 종목</h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {detailedStocks.map((stock) => (
              <StockCard key={stock.ticker} stock={stock} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-7">
        <h2 className="text-xl font-black">상장사 검색 결과 {listedRows.length.toLocaleString()}개</h2>
        <div className="mt-3 grid gap-2">
          {listedRows.map((row) => {
            const profile = companyProfileService.getOrCreateMockProfile(`${row.stockCode}.KRX`, row.companyName, row.sector);
            const href = row.isEtf ? `/etfs/${encodeURIComponent(`${row.stockCode}.KS`)}?fallback=1&name=${encodeURIComponent(row.companyName)}` : `/stocks/${encodeURIComponent(`${row.stockCode}.KRX`)}?fallback=1&name=${encodeURIComponent(row.companyName)}&sector=${encodeURIComponent(row.sector)}`;
            return (
              <Link key={row.stockCode} href={href} className="block rounded-3xl bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-black/45">{row.stockCode}</p>
                    <h3 className="mt-1 text-lg font-black text-ink">{row.companyName}</h3>
                  </div>
                  <Badge tone={row.isEtf ? "blue" : "lemon"}>{row.isEtf ? "ETF" : row.market}</Badge>
                </div>
                <p className="mt-2 text-xs font-black text-black/45">{row.sector}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-black/62">{profile.businessSummary}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-xl font-black">ETF 검색 결과 {etfRows.length.toLocaleString()}개</h2>
        <div className="mt-3 grid gap-2">
          {etfRows.map((etf) => (
            <Link key={etf.symbol} href={`/etfs/${encodeURIComponent(etf.symbol)}`} className="block rounded-3xl bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-black/45">{etf.symbol}</p>
                  <h3 className="mt-1 text-lg font-black text-ink">{etf.name}</h3>
                </div>
                <Badge tone="blue">ETF</Badge>
              </div>
              <p className="mt-2 text-sm font-semibold leading-6 text-black/62">{etf.oneLine}</p>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
