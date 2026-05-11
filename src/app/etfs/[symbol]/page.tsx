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
