import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/Badge";
import { etfs } from "@/lib/etf-data";

const groups = ["안정형", "성장형", "배당형", "테마형", "방어형", "지수형", "국내 상장 ETF", "해외 ETF"];

export default function EtfListPage() {
  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">ETF</p>
        <h1 className="mt-1 text-3xl font-black text-ink">ETF를 쉽게 풀어보기</h1>
        <p className="mt-2 text-sm font-semibold leading-6 text-black/55">구성 종목, 섹터 비중, 리스크를 쉬운 말로 봅니다.</p>
      </header>

      {groups.map((group) => {
        const list = etfs.filter((etf) => etf.character === group || (group === "국내 상장 ETF" && etf.market === "KR") || (group === "해외 ETF" && etf.market === "US")).slice(0, 6);
        if (!list.length) return null;
        return (
          <section key={group} className="mt-7">
            <h2 className="text-xl font-black">{group}</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {list.map((etf) => (
                <Link key={`${group}-${etf.symbol}`} href={`/etfs/${encodeURIComponent(etf.symbol)}`} className="rounded-3xl bg-white p-4 shadow-soft">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-black/45">{etf.symbol}</p>
                      <h3 className="mt-1 text-lg font-black">{etf.name}</h3>
                    </div>
                    <Badge tone={etf.risk === "높음" ? "coral" : etf.risk === "중간" ? "yellow" : "green"}>{etf.risk}</Badge>
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-6 text-black/62">{etf.oneLine}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </AppShell>
  );
}
