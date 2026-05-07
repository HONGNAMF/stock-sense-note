"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/Badge";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Section } from "@/components/Section";
import { TermButton } from "@/components/TermButton";
import { ReflectionPanel } from "@/components/ReflectionPanel";
import { getHistoricalProfile } from "@/lib/historical-data";
import { getAnalysisEvidence, getEvidenceLinks } from "@/lib/signal-links";
import { storage } from "@/lib/storage";
import { priceService, type LivePriceQuote } from "@/services/priceService";
import type { Stock, StockNote } from "@/types";

const analysisLabels: Array<[keyof Stock["analysis"], string]> = [
  ["business", "이 회사가 하는 일"],
  ["revenue", "어떻게 돈을 버는지"],
  ["earnings", "최근 실적 흐름"],
  ["valuation", "현재 주가가 비싼지 싼지"],
  ["trend", "주가 흐름"],
  ["buyNow", "지금 사도 되는지"],
  ["longTerm", "장기 보유 가능성"],
  ["risks", "리스크 요소"],
  ["peers", "비슷한 기업 비교"]
];

export function StockDetailClient({ stock }: { stock: Stock }) {
  const historical = getHistoricalProfile(stock.ticker);
  const evidenceLinks = getEvidenceLinks(stock.ticker);
  const [liveQuote, setLiveQuote] = useState<LivePriceQuote | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [graphOpen, setGraphOpen] = useState(false);
  const [openAnalysisKey, setOpenAnalysisKey] = useState<string | null>("buyNow");
  const [note, setNote] = useState<StockNote>({
    ticker: stock.ticker,
    reason: "",
    targetBuyPrice: "",
    stopLoss: "",
    feeling: "",
    updatedAt: ""
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const current = storage.getNote(stock.ticker);
    if (current) setNote(current);
  }, [stock.ticker]);

  useEffect(() => {
    let alive = true;
    setPriceLoading(true);
    priceService.getLiveQuote(stock.ticker).then((quote) => {
      if (!alive) return;
      setLiveQuote(quote);
      setPriceLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [stock.ticker]);

  function update(field: keyof StockNote, value: string) {
    setSaved(false);
    setNote((current) => ({ ...current, [field]: value }));
  }

  function saveNote() {
    storage.saveNote({ ...note, updatedAt: new Date().toISOString() });
    setSaved(true);
  }

  const shownPrice = liveQuote?.formattedPrice ?? cleanMetric(stock.currentPrice);
  const shownChangeRate = liveQuote?.changeRate ?? stock.changeRate;
  const shownMarketCap = liveQuote?.formattedMarketCap ?? cleanMetric(stock.marketCap);
  const isLivePrice = Boolean(liveQuote);
  const priceLabel = priceLoading ? "시세 확인 중" : liveQuote?.realtime ? "실시간 현재가" : liveQuote ? "지연 시세 현재가" : "시세 확인 필요";

  return (
    <AppShell>
      <header className="flex items-start justify-between gap-4">
        <div>
          <Link href="/" className="text-sm font-black text-black/45">홈으로</Link>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge tone="blue">{stock.market}</Badge>
            <Badge tone="lemon">참고용 분석</Badge>
          </div>
          <h1 className="mt-3 text-4xl font-black text-ink">{stock.name}</h1>
          <p className="mt-1 text-base font-bold text-black/50">{stock.ticker}</p>
        </div>
        <FavoriteButton ticker={stock.ticker} />
      </header>

      <section className="mt-6 rounded-3xl bg-white p-5 shadow-soft">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black text-black/45">{priceLabel}</p>
            <p className="mt-1 text-3xl font-black">{shownPrice}</p>
            <p className="mt-1 text-xs font-bold text-black/42">
              {isLivePrice ? `${liveQuote?.source} 기준 · 실제 거래 전 증권사 앱에서 한 번 더 확인하세요.` : "실시간 시세 API 키가 없거나 응답하지 않아 데이터를 확인하지 못했습니다."}
            </p>
          </div>
          <p className={shownChangeRate >= 0 ? "text-xl font-black text-emerald-600" : "text-xl font-black text-red-500"}>
            <span className="mr-1 text-xs text-black/45">{isLivePrice ? "전일 대비" : "예시 등락률"}</span>
            {shownChangeRate >= 0 ? "+" : ""}
            {shownChangeRate}%
          </p>
        </div>
        <div className="mt-4">
          <Badge tone={stock.aiBadge === "과열 상태" ? "coral" : stock.aiBadge === "관망 구간" ? "yellow" : "green"}>AI 판단: {stock.aiBadge}</Badge>
        </div>
        <p className="mt-3 text-sm font-semibold leading-6 text-black/60">{stock.oneLine}</p>
        <div className="mt-4 grid gap-3">
          <InfoBox title="왜 지금 보이나요?" body={stock.whyNow} />
          <InfoBox title="주의할 점" body={stock.riskNote} danger />
          <InfoBox title="업데이트 규칙" body={stock.updateRule} />
        </div>
        <div className="mt-4 rounded-2xl border border-black/5 bg-paper p-3">
          <p className="text-xs font-black text-black/45">근거 링크</p>
          <div className="mt-2 space-y-2">
            {evidenceLinks.slice(0, 3).map((link) => (
              <EvidenceButton key={link.url} link={link} />
            ))}
          </div>
        </div>
      </section>

      <Section title="기본 지표" sub="PER, PBR, EPS, ROE는 [?]를 누르면 쉬운 설명을 볼 수 있어요.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Metric title="시가총액" value={shownMarketCap} />
          <TermButton term="PER" value={liveQuote?.formattedPer ?? cleanMetric(stock.per)} />
          <TermButton term="PBR" value={liveQuote?.formattedPbr ?? cleanMetric(stock.pbr)} />
          <TermButton term="EPS" value={liveQuote?.formattedEps ?? cleanMetric(stock.eps)} />
          <TermButton term="ROE" value={liveQuote?.formattedRoe ?? cleanMetric(stock.roe)} />
          <Metric title="52주 최고" value={liveQuote?.formattedWeek52High ?? cleanMetric(stock.week52High)} />
          <Metric title="52주 최저" value={liveQuote?.formattedWeek52Low ?? cleanMetric(stock.week52Low)} />
          <Metric title="상태" value={stock.status} />
        </div>
      </Section>

      <Section title="10년 흐름" sub="MVP에서는 예시 그래프와 표로 흐름을 먼저 이해하게 합니다.">
        <div className="rounded-3xl bg-white p-4 shadow-soft">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="blue">{historical.sector}</Badge>
            <Badge tone="lemon">MVP 추정 데이터</Badge>
          </div>
          <p className="mt-3 text-xs font-bold leading-5 text-black/45">{historical.sourceGuide}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setHistoryOpen((next) => !next)} className="h-12 rounded-2xl bg-ink text-sm font-black text-white">
              {historyOpen ? "10년 표 닫기" : "10년 표 보기"}
            </button>
            <button type="button" onClick={() => setGraphOpen((next) => !next)} className="h-12 rounded-2xl bg-skysoft text-sm font-black text-sky-950">
              {graphOpen ? "그래프 닫기" : "그래프 표시"}
            </button>
          </div>
          {graphOpen ? <HistoryGraph rows={historical.metrics} /> : null}
          {historyOpen ? <HistoryTable rows={historical.metrics} /> : null}
        </div>
      </Section>

      <Section title="왜 크게 움직였나요?">
        <div className="space-y-3">
          {historical.events.map((event) => (
            <article key={`${event.period}-${event.title}`} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={event.impact === "상승" ? "green" : event.impact === "하락" ? "coral" : "gray"}>{event.impact}</Badge>
                <p className="text-sm font-black text-black/45">{event.period}</p>
              </div>
              <h3 className="mt-3 text-lg font-black">{event.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-black/64">{event.explanation}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="AI 분석">
        <div className="space-y-3">
          {analysisLabels.map(([key, label]) => (
            <article key={key} className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
              <button type="button" onClick={() => setOpenAnalysisKey((current) => (current === key ? null : key))} className="w-full text-left">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-black text-black/48">{label}</h3>
                  <span className="rounded-full bg-black/[0.05] px-2.5 py-1 text-xs font-black text-black/50">{openAnalysisKey === key ? "근거 닫기" : "근거 보기"}</span>
                </div>
                <p className="mt-2 text-base font-semibold leading-7 text-black/72">{stock.analysis[key]}</p>
              </button>
              {openAnalysisKey === key ? <AnalysisEvidence ticker={stock.ticker} analysisKey={key} isBuyNow={key === "buyNow"} /> : null}
            </article>
          ))}
        </div>
      </Section>

      <Section title="뉴스">
        <div className="space-y-3">
          {stock.news.map((item) => (
            <article key={item.title} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge tone={item.sentiment === "긍정" ? "green" : item.sentiment === "부정" ? "coral" : "gray"}>{item.sentiment}</Badge>
                  <h3 className="mt-3 text-lg font-black">{item.title}</h3>
                  <p className="mt-1 text-sm font-bold text-black/45">{item.source}</p>
                </div>
                <a href={item.url} target="_blank" rel="noreferrer" aria-label="기사 열기" className="grid size-10 shrink-0 place-items-center rounded-full bg-black/[0.05]">
                  <ExternalLink size={18} />
                </a>
              </div>
              <ul className="mt-3 space-y-1 text-sm font-semibold leading-6 text-black/62">
                {item.summary.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs font-bold leading-5 text-black/42">저작권 보호를 위해 기사 본문을 복제하지 않고, 출처 링크와 자체 작성 요약만 표시합니다.</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="내 메모" sub="저장 내용은 localStorage에 보관됩니다.">
        <div className="space-y-3 rounded-3xl bg-white p-4 shadow-soft">
          <MemoField label="투자 이유" value={note.reason} onChange={(value) => update("reason", value)} />
          <MemoField label="매수 고민 가격" value={note.targetBuyPrice} onChange={(value) => update("targetBuyPrice", value)} />
          <MemoField label="손절 기준" value={note.stopLoss} onChange={(value) => update("stopLoss", value)} />
          <MemoField label="느낀 점" value={note.feeling} onChange={(value) => update("feeling", value)} multiline />
          <button type="button" onClick={saveNote} className="h-12 w-full rounded-2xl bg-ink text-sm font-black text-white">
            {saved ? "저장됨" : "메모 저장"}
          </button>
        </div>
      </Section>

      <ReflectionPanel assetKey={stock.ticker} assetKind="stock" />
    </AppShell>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-3 shadow-sm">
      <p className="text-xs font-black text-black/45">{title}</p>
      <p className="mt-1 text-base font-black text-ink">{value}</p>
    </div>
  );
}

function cleanMetric(value: string) {
  if (!value || value.includes("예시") || value.includes("MVP")) return "데이터 확인 필요";
  return value;
}

function InfoBox({ title, body, danger = false }: { title: string; body: string; danger?: boolean }) {
  return (
    <div className={danger ? "rounded-2xl bg-coral/70 p-3" : "rounded-2xl bg-black/[0.035] p-3"}>
      <p className="text-xs font-black text-black/45">{title}</p>
      <p className="mt-1 text-sm font-semibold leading-6 text-black/68">{body}</p>
    </div>
  );
}

function EvidenceButton({ link }: { link: { title: string; summary: string; url: string; source: string } }) {
  function openLink() {
    const ok = window.confirm(`${link.source} 외부 링크로 이동할까요?\n\n${link.summary}`);
    if (ok) window.open(link.url, "_blank", "noopener,noreferrer");
  }

  return (
    <button type="button" onClick={openLink} className="w-full rounded-2xl bg-white p-3 text-left shadow-sm transition hover:bg-skysoft/60">
      <span className="text-xs font-black text-black/42">{link.source}</span>
      <span className="mt-1 block text-sm font-black text-ink">{link.title}</span>
      <span className="mt-1 block text-xs font-semibold leading-5 text-black/56">{link.summary}</span>
      <span className="mt-2 inline-flex items-center gap-1 text-xs font-black text-sky-800">
        바로가기 <ExternalLink size={13} />
      </span>
    </button>
  );
}

function AnalysisEvidence({ ticker, analysisKey, isBuyNow }: { ticker: string; analysisKey: string; isBuyNow?: boolean }) {
  const links = getAnalysisEvidence(ticker, analysisKey);

  return (
    <div className="mt-4 rounded-2xl bg-paper p-3">
      <p className="text-xs font-black text-black/45">왜 이렇게 판단했나요?</p>
      <p className="mt-1 text-sm font-semibold leading-6 text-black/62">이 항목은 최근 뉴스, 공식 공시, 시세 흐름을 함께 확인해서 참고용으로 해석하는 구조입니다. MVP에서는 검증 가능한 링크와 자체 요약을 붙여두었습니다.</p>
      {isBuyNow ? (
        <div className="mt-3 rounded-2xl bg-lemon/70 p-3">
          <p className="text-sm font-black text-yellow-950">지금 사도 되는지 판단 기준</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-yellow-950/80">현재 가격이 기대를 이미 반영했는지, 실적과 공시가 기대를 뒷받침하는지, 단기 급등 뒤 차익실현 위험이 있는지를 함께 봅니다. 확정 매수 표현 대신 분할 접근, 관망, 확인 같은 보수적 표현을 씁니다.</p>
        </div>
      ) : null}
      <div className="mt-3 space-y-2">
        {links.map((link) => (
          <EvidenceButton key={link.url} link={link} />
        ))}
      </div>
    </div>
  );
}

function numberFromText(value: string) {
  const matched = value.match(/[\d.]+/);
  return matched ? Number(matched[0]) : 0;
}

function HistoryGraph({ rows }: { rows: Array<{ year: number; marketCap: string; revenue: string; operatingProfit: string }> }) {
  const caps = rows.map((row) => numberFromText(row.marketCap));
  const max = Math.max(...caps, 1);

  return (
    <div className="mt-4 rounded-2xl bg-paper p-4">
      <div className="flex h-48 items-end gap-2">
        {rows.map((row, index) => {
          const height = Math.max(12, Math.round((caps[index] / max) * 160));
          return (
            <div key={row.year} className="flex flex-1 flex-col items-center justify-end gap-2">
              <div className="w-full rounded-t-xl bg-ink" style={{ height }} title={`${row.year} ${row.marketCap}`} />
              <span className="text-[10px] font-black text-black/45">{String(row.year).slice(2)}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs font-bold text-black/45">막대는 10년 시가총액 흐름을 단순화한 예시입니다.</p>
    </div>
  );
}

function HistoryTable({ rows }: { rows: Array<{ year: number; marketCap: string; revenue: string; operatingProfit: string; per: string; pbr: string; roe: string; note: string }> }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[680px] border-separate border-spacing-y-2 text-left">
        <thead>
          <tr className="text-xs font-black text-black/42">
            <th className="px-3">연도</th>
            <th className="px-3">시가총액</th>
            <th className="px-3">매출</th>
            <th className="px-3">영업이익</th>
            <th className="px-3">PER</th>
            <th className="px-3">PBR</th>
            <th className="px-3">ROE</th>
            <th className="px-3">해석</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.year} className="rounded-2xl bg-paper text-sm font-bold text-black/68">
              <td className="rounded-l-2xl px-3 py-3 text-ink">{row.year}</td>
              <td className="px-3 py-3">{row.marketCap}</td>
              <td className="px-3 py-3">{row.revenue}</td>
              <td className="px-3 py-3">{row.operatingProfit}</td>
              <td className="px-3 py-3">{row.per}</td>
              <td className="px-3 py-3">{row.pbr}</td>
              <td className="px-3 py-3">{row.roe}</td>
              <td className="rounded-r-2xl px-3 py-3">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MemoField({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-black text-black/55">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-24 w-full resize-none rounded-2xl border border-black/5 bg-paper px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-ink/20" />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-12 w-full rounded-2xl border border-black/5 bg-paper px-4 font-semibold outline-none focus:ring-2 focus:ring-ink/20" />
      )}
    </label>
  );
}
