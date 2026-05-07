"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/Badge";
import { StockCard } from "@/components/StockCard";
import { etfs } from "@/lib/etf-data";
import { stocks } from "@/lib/mock-data";
import { popularStocks } from "@/lib/popular-stocks";

type SearchRow = {
  key: string;
  name: string;
  ticker: string;
  kind: "상세 종목" | "KRX" | "시장 피드" | "ETF";
  sector: string;
  reason: string;
  href?: string;
  risk?: "낮음" | "중간" | "높음";
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [krxStocks, setKrxStocks] = useState<Array<{ code: string; name: string; shortName: string; market: string; securityType: string; industry?: string; product?: string }>>([]);
  const [krxLoading, setKrxLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch("/api/krx/stocks", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (!alive) return;
        setKrxStocks(Array.isArray(data.stocks) ? data.stocks : []);
      })
      .catch(() => {
        if (alive) setKrxStocks([]);
      })
      .finally(() => {
        if (alive) setKrxLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const rows = useMemo<SearchRow[]>(() => {
    const detailed = stocks.map((stock) => ({
      key: `stock-${stock.ticker}`,
      name: stock.name,
      ticker: stock.ticker,
      kind: "상세 종목" as const,
      sector: stock.category,
      reason: stock.whyNow,
      href: `/stocks/${encodeURIComponent(stock.ticker)}`,
      risk: stock.status === "과열" ? "높음" as const : "중간" as const
    }));

    const krxRows = krxStocks
      .filter((item) => !stocks.some((stock) => stock.ticker.startsWith(item.code)))
      .map((item) => ({
        key: `krx-${item.code}`,
        name: item.shortName || item.name,
        ticker: item.code,
        kind: "KRX" as const,
        sector: [item.market, item.industry].filter(Boolean).join(" · "),
        reason: item.product ? `주요제품: ${item.product}` : "KRX 상장법인목록에서 불러온 한국 상장회사입니다. 상세 해석은 실제 종목 API 연결 후 확장됩니다.",
        risk: "중간" as const
      }));

    const feed = popularStocks
      .filter((item) => !stocks.some((stock) => stock.ticker === item.ticker) && !krxStocks.some((stock) => `${stock.code}.KS` === item.ticker || `${stock.code}.KQ` === item.ticker || stock.code === item.ticker))
      .map((item) => ({
        key: `feed-${item.ticker}`,
        name: item.name,
        ticker: item.ticker,
        kind: "시장 피드" as const,
        sector: item.sector,
        reason: item.reason,
        risk: item.risk
      }));

    const etfRows = etfs.map((etf) => ({
      key: `etf-${etf.symbol}`,
      name: etf.name,
      ticker: etf.symbol,
      kind: "ETF" as const,
      sector: etf.character,
      reason: etf.oneLine,
      href: `/etfs/${encodeURIComponent(etf.symbol)}`,
      risk: etf.risk
    }));

    const merged = [...detailed, ...krxRows, ...feed, ...etfRows];
    const normalized = query.trim().toLowerCase();
    if (!normalized) return merged;

    return merged.filter((row) =>
      [row.name, row.ticker, row.kind, row.sector, row.reason].some((text) => text.toLowerCase().includes(normalized))
    );
  }, [query, krxStocks]);

  const detailedStocks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return stocks;
    return stocks.filter((stock) => [stock.name, stock.ticker, stock.category, ...stock.interests].some((item) => item.toLowerCase().includes(normalized)));
  }, [query]);

  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">검색</p>
        <h1 className="mt-1 text-3xl font-black text-ink">KRX 상장회사 전체를 찾아요</h1>
        <p className="mt-2 text-sm font-semibold leading-6 text-black/55">한국 주식은 KRX 전종목 기본정보를 요청해 검색하고, 해외주식과 ETF는 MVP 데이터와 함께 보여줍니다.</p>
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
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="삼성전기, 한미반도체, 현대차, QQQ..." className="h-full flex-1 bg-transparent font-bold outline-none" />
      </label>
      <p className="mt-2 text-xs font-bold text-black/42">
        {krxLoading ? "KRX 상장회사 전체를 불러오는 중입니다." : krxStocks.length ? `KRX 상장회사 ${krxStocks.length.toLocaleString()}개 검색 가능` : "KRX 연결에 실패하면 MVP 시장 피드로 검색합니다."}
      </p>

      {detailedStocks.length ? (
        <section className="mt-5">
          <h2 className="text-xl font-black">상세 페이지가 있는 종목</h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {detailedStocks.map((stock) => (
              <StockCard key={stock.ticker} stock={stock} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-7">
        <h2 className="text-xl font-black">전체 검색 결과 {rows.length.toLocaleString()}개</h2>
        <div className="mt-3 grid gap-2">
          {rows.map((row) => {
            const card = (
              <article className="rounded-3xl bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-black/45">{row.ticker}</p>
                    <h3 className="mt-1 text-lg font-black text-ink">{row.name}</h3>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Badge tone={row.kind === "ETF" ? "blue" : row.kind === "상세 종목" ? "green" : row.kind === "KRX" ? "lemon" : "gray"}>{row.kind}</Badge>
                    {row.risk ? <Badge tone={row.risk === "높음" ? "coral" : row.risk === "중간" ? "yellow" : "green"}>{row.risk}</Badge> : null}
                  </div>
                </div>
                <p className="mt-2 text-xs font-black text-black/45">{row.sector}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-black/62">{row.reason}</p>
                {!row.href ? <p className="mt-2 text-xs font-bold text-black/42">상세 페이지는 이후 실제 종목 API 연결 시 확장됩니다.</p> : null}
              </article>
            );

            return row.href ? (
              <Link key={row.key} href={row.href}>
                {card}
              </Link>
            ) : (
              <div key={row.key}>{card}</div>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
