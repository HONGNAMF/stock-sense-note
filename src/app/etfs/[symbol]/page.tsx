import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/Badge";
import { ReflectionPanel } from "@/components/ReflectionPanel";
import { createFallbackEtf, getEtf } from "@/lib/etf-data";

export default async function EtfDetailPage({
  params,
  searchParams
}: {
  params: Promise<{ symbol: string }>;
  searchParams: Promise<{ name?: string; issuer?: string; fallback?: string }>;
}) {
  const { symbol } = await params;
  const query = await searchParams;
  const etf = getEtf(symbol) ?? (query.fallback === "1" ? createFallbackEtf(symbol, query) : null);
  if (!etf) notFound();

  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">{etf.symbol}</p>
        <h1 className="mt-1 text-3xl font-black text-ink">{etf.name}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge tone="blue">{etf.character}</Badge>
          <Badge tone={etf.risk === "높음" ? "coral" : etf.risk === "중간" ? "yellow" : "green"}>리스크 {etf.risk}</Badge>
          <Badge tone="lemon">참고용 해석</Badge>
        </div>
      </header>

      <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black text-black/45">시세 흐름</p>
            <p className="mt-1 text-3xl font-black text-ink">{etf.currentPrice}</p>
            <p className="mt-1 text-xs font-bold leading-5 text-black/42">제공처 기준으로 지연될 수 있어 실제 거래 전 증권사 앱에서 다시 확인하세요.</p>
          </div>
          <div className="text-right">
            <p className={etf.changeRate.startsWith("-") ? "text-2xl font-black text-red-500" : "text-2xl font-black text-emerald-600"}>{etf.changeRate}</p>
            <Badge tone={etf.status === "강한 상승" || etf.status === "상승" ? "green" : etf.status === "조정" || etf.status === "약세" ? "coral" : "yellow"}>{etf.status}</Badge>
          </div>
        </div>
        <details className="mt-4 rounded-2xl bg-paper p-4">
          <summary className="cursor-pointer text-sm font-black text-ink">차트 자세히 보기</summary>
          <div className="mt-4">
            <MiniChart rows={etf.chart} />
            <p className="mt-3 text-xs font-bold leading-5 text-black/45">최근 10주 흐름을 100 기준으로 단순화해 보여줍니다. 방향을 이해하기 위한 보조 지표입니다.</p>
          </div>
        </details>
      </section>

      <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-xl font-black">쉬운 해석</h2>
        <p className="mt-2 text-base font-semibold leading-7 text-black/68">{etf.easyExplanation}</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Info title="운용사" value={etf.issuer} />
          <Info title="총보수" value={etf.expenseRatio} />
          <Info title="최근 수익률" value={etf.recentReturn} />
          <Info title="배당" value={etf.dividend} />
        </div>
      </section>

      <section className="mt-7 rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-xl font-black">구성 종목 TOP 10</h2>
        <div className="mt-3 space-y-2">
          {etf.holdings.map((item) => (
            <Bar key={item.symbol} label={`${item.name} ${item.symbol}`} value={item.weight} />
          ))}
        </div>
      </section>

      <section className="mt-7 grid gap-3 sm:grid-cols-2">
        <Chart title="섹터 비중" rows={etf.sectors} />
        <Chart title="국가 비중" rows={etf.countries} />
      </section>

      <section className="mt-7 rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-xl font-black">ETF vs 개별주</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-black/62">{etf.comparison}</p>
        <h3 className="mt-4 text-sm font-black">ETF 리스크</h3>
        <div className="mt-2 grid gap-2">
          {etf.risks.map((risk) => (
            <p key={risk} className="rounded-2xl bg-coral/50 p-3 text-sm font-semibold leading-6 text-red-950">{risk}</p>
          ))}
        </div>
      </section>

      <section className="mt-7 rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-xl font-black">관련 뉴스</h2>
        {etf.news.map((item) => (
          <a key={item.title} href={item.url} target="_blank" rel="noreferrer" className="mt-3 block rounded-2xl bg-paper p-4">
            <Badge tone={item.sentiment === "긍정" ? "green" : item.sentiment === "부정" ? "coral" : "gray"}>{item.sentiment}</Badge>
            <h3 className="mt-2 font-black">{item.title}</h3>
            <p className="mt-1 text-sm font-semibold leading-6 text-black/60">{item.summary.join(" ")}</p>
          </a>
        ))}
      </section>

      <ReflectionPanel assetKey={etf.symbol} assetKind="etf" />
    </AppShell>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-paper p-3">
      <p className="text-xs font-black text-black/45">{title}</p>
      <p className="mt-1 text-sm font-black">{value}</p>
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-black text-black/50">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="mt-1 h-3 rounded-full bg-paper">
        <div className="h-3 rounded-full bg-ink" style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  );
}

function Chart({ title, rows }: { title: string; rows: Array<{ name: string; weight: number }> }) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-soft">
      <h2 className="text-xl font-black">{title}</h2>
      <div className="mt-3 space-y-3">
        {rows.map((row) => (
          <Bar key={row.name} label={row.name} value={row.weight} />
        ))}
      </div>
    </section>
  );
}

function MiniChart({ rows }: { rows: Array<{ label: string; value: number }> }) {
  const max = Math.max(...rows.map((row) => row.value));
  const min = Math.min(...rows.map((row) => row.value));
  return (
    <div className="flex h-36 items-end gap-2">
      {rows.map((row) => {
        const height = 24 + ((row.value - min) / Math.max(max - min, 1)) * 88;
        return (
          <div key={row.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="w-full rounded-t-xl bg-ink" style={{ height: `${height}px` }} />
            <span className="text-[10px] font-black text-black/38">{row.label}</span>
          </div>
        );
      })}
    </div>
  );
}
