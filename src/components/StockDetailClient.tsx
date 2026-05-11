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
import { storage } from "@/lib/storage";
import { priceService, type LivePriceQuote } from "@/services/priceService";
import { companyProfileService } from "@/services/companyProfileService";
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
  const companyProfile = stock.companyProfile ?? companyProfileService.getByTicker(stock.ticker);
  const [liveQuote, setLiveQuote] = useState<LivePriceQuote | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [graphOpen, setGraphOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"simple" | "standard" | "detailed">("standard");
  const [note, setNote] = useState<StockNote>({
    ticker: stock.ticker,
    reason: "",
    targetBuyPrice: "",
    stopLoss: "",
    feeling: "",
    updatedAt: ""
  });
  const [saved, setSaved] = useState(false);
  const [guestMessage, setGuestMessage] = useState(false);

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
    const ok = storage.saveNote({ ...note, updatedAt: new Date().toISOString() });
    if (!ok) {
      setGuestMessage(true);
      return;
    }
    setSaved(true);
  }

  const shownPrice = liveQuote?.formattedPrice ?? cleanMetric(stock.currentPrice);
  const shownChangeRate = liveQuote?.changeRate ?? stock.changeRate;
  const shownMarketCap = liveQuote?.formattedMarketCap ?? cleanMetric(stock.marketCap);
  const priceLabel = priceLoading ? "시세 확인 중" : liveQuote?.realtime ? "실시간 현재가" : liveQuote ? "지연 시세 현재가" : "MVP 예시 가격";
  const isSimple = viewMode === "simple";
  const isDetailed = viewMode === "detailed";

  return (
    <AppShell>
      <header className="flex items-start justify-between gap-4">
        <div>
          <Link href="/" className="text-sm font-black text-black/45">홈으로</Link>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge tone="blue">{stock.market}</Badge>
            <Badge tone="lemon">참고용 해석</Badge>
            <Badge tone={companyProfile?.dataConfidence === "높음" ? "green" : companyProfile?.dataConfidence === "낮음" ? "coral" : "yellow"}>
              데이터 신뢰도: {companyProfile?.dataConfidence ?? "낮음"}
            </Badge>
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
              {liveQuote ? `${liveQuote.source} 기준입니다. 실제 거래 전 증권사 앱에서 다시 확인하세요.` : "실제 시세 API가 없으면 MVP 예시 또는 확인 필요로 표시됩니다."}
            </p>
          </div>
          <p className={shownChangeRate >= 0 ? "text-xl font-black text-emerald-600" : "text-xl font-black text-red-500"}>
            <span className="mr-1 text-xs text-black/45">{liveQuote ? "전일 대비" : "예시 등락률"}</span>
            {shownChangeRate >= 0 ? "+" : ""}
            {shownChangeRate}%
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge tone={stock.aiBadge === "과열 상태" ? "coral" : stock.aiBadge === "관망 구간" ? "yellow" : "green"}>AI 판단: {stock.aiBadge}</Badge>
          <Badge tone={stock.status === "과열" ? "coral" : stock.status === "조정" ? "yellow" : "green"}>{stock.status}</Badge>
        </div>
        <p className="mt-3 text-sm font-semibold leading-6 text-black/60">{stock.oneLine}</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {(["simple", "standard", "detailed"] as const).map((mode) => (
            <button key={mode} onClick={() => setViewMode(mode)} className={viewMode === mode ? "h-10 rounded-2xl bg-ink text-xs font-black text-white" : "h-10 rounded-2xl bg-paper text-xs font-black text-black/55"}>
              {mode === "simple" ? "한눈에 보기" : mode === "standard" ? "기본 보기" : "상세 보기"}
            </button>
          ))}
        </div>
      </section>

      <Section title="이 회사는 뭘 팔아서 돈을 벌까요?">
        <div className="rounded-3xl bg-white p-5 shadow-soft">
          <h2 className="text-xl font-black">{companyProfile?.businessSummary ?? "상세 사업 정보 정리 중"}</h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-black/62">{companyProfile?.easyExplanation ?? "이 회사의 상세 사업 정보는 아직 정리 중입니다."}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Info title="주요 제품/서비스" items={companyProfile?.mainProducts ?? ["정보 정리 중"]} />
            <Info title="돈 버는 방식" items={companyProfile?.revenueSources ?? ["공개 자료 확인 후 정리 예정"]} />
            <Info title="주요 고객/수요처" items={companyProfile?.mainCustomers ?? ["확인 필요"]} />
            <Info title="산업 태그" items={companyProfile?.industryTags ?? ["정보 정리 중"]} />
          </div>
          <p className="mt-4 text-xs font-bold text-black/42">출처: {companyProfile?.dataSource ?? "mock"} · 마지막 정리: {companyProfile?.lastUpdatedAt?.slice(0, 10) ?? "정리 중"}</p>
        </div>
      </Section>

      <Section title="기본 지표" sub="PER, PBR, EPS, ROE의 [?]를 누르면 쉬운 설명을 볼 수 있어요.">
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

      {!isSimple ? (
        <>
          <Section title="좋은 회사 체크 5개">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["돈을 꾸준히 버는가?", "보통", "실적 흐름과 현금창출력을 함께 봐야 합니다."],
                ["매출과 이익이 같이 성장하는가?", "보통", "매출 성장만큼 이익률이 따라오는지 확인합니다."],
                ["부채를 감당할 수 있는가?", "보통", "부채비율과 이자비용을 같이 봅니다."],
                ["실적 대비 너무 비싼가?", "주의", "기대가 가격에 먼저 반영됐을 수 있습니다."],
                ["앞으로도 필요한 회사인가?", "좋음", companyProfile?.industryTags.join(", ") || "산업 필요성을 확인합니다."]
              ].map(([title, grade, body]) => (
                <article key={title} className="rounded-2xl bg-white p-4 shadow-sm">
                  <Badge tone={grade === "좋음" ? "green" : grade === "주의" ? "coral" : "yellow"}>{grade}</Badge>
                  <h3 className="mt-3 text-base font-black">{title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-black/60">{body}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section title="10년 흐름" sub="MVP에서는 예시 그래프와 흐름 설명으로 먼저 이해를 돕습니다.">
            <div className="rounded-3xl bg-white p-4 shadow-soft">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="blue">{historical.sector}</Badge>
                <Badge tone="lemon">MVP 예시 데이터</Badge>
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
        </>
      ) : null}

      {(isDetailed || viewMode === "standard") ? (
        <Section title="AI 분석">
          <div className="space-y-3">
            {analysisLabels.map(([key, label]) => (
              <article key={key} className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-black text-black/48">{label}</h3>
                <p className="mt-2 text-base font-semibold leading-7 text-black/72">{stock.analysis[key]}</p>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {isDetailed ? (
        <Section title="뉴스">
          <div className="space-y-3">
            {stock.news.slice(0, 3).map((item) => (
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
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      <Section title="내 메모" sub="회원 기록은 이 기기의 localStorage에 저장됩니다.">
        <div className="space-y-3 rounded-3xl bg-white p-4 shadow-soft">
          {guestMessage ? <p className="rounded-2xl bg-lemon/80 p-3 text-sm font-bold text-yellow-950">둘러보기 중에는 기록이 저장되지 않아요. 내 센스폴리오를 만들면 저장할 수 있습니다.</p> : null}
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

function Info({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-paper p-4">
      <p className="text-xs font-black text-black/45">{title}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-black/65">{items.join(", ")}</p>
    </div>
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

function MemoField({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-black text-black/55">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-24 w-full rounded-2xl bg-paper p-3 font-semibold outline-none" />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-12 w-full rounded-2xl bg-paper px-3 font-semibold outline-none" />
      )}
    </label>
  );
}

function HistoryGraph({ rows }: { rows: ReturnType<typeof getHistoricalProfile>["metrics"] }) {
  const max = Math.max(...rows.map((row) => row.priceIndex));
  return (
    <div className="mt-4 flex h-36 items-end gap-1 rounded-2xl bg-paper p-3">
      {rows.map((row) => (
        <div key={row.year} className="flex flex-1 flex-col items-center justify-end gap-1">
          <div className="w-full rounded-t-lg bg-ink" style={{ height: `${Math.max(10, (row.priceIndex / max) * 100)}%` }} />
          <span className="text-[10px] font-black text-black/40">{String(row.year).slice(2)}</span>
        </div>
      ))}
    </div>
  );
}

function HistoryTable({ rows }: { rows: ReturnType<typeof getHistoricalProfile>["metrics"] }) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-black/5">
      {rows.map((row) => (
        <div key={row.year} className="grid grid-cols-4 gap-2 border-b border-black/5 bg-white p-3 text-xs font-bold last:border-b-0">
          <span>{row.year}</span>
          <span>매출 {row.revenue}</span>
          <span>이익 {row.operatingProfit}</span>
          <span>지수 {row.priceIndex}</span>
        </div>
      ))}
    </div>
  );
}
