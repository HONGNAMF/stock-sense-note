import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/Badge";
import type { Stock } from "@/types";

function statusTone(status: Stock["status"]) {
  if (status === "상승") return "green";
  if (status === "과열") return "coral";
  if (status === "조정") return "yellow";
  return "blue";
}

export function StockCard({ stock }: { stock: Stock }) {
  const isUp = stock.changeRate >= 0;
  const TrendIcon = isUp ? ArrowUpRight : ArrowDownRight;

  return (
    <Link href={`/stocks/${encodeURIComponent(stock.ticker)}`} className="block">
      <article className="h-full rounded-2xl border border-black/5 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-black/50">{stock.ticker}</p>
            <h3 className="mt-1 text-lg font-black text-ink">{stock.name}</h3>
          </div>
          <Badge tone={statusTone(stock.status)}>{stock.status}</Badge>
        </div>
        <p className="mt-3 min-h-10 text-sm leading-5 text-black/62">{stock.oneLine}</p>
        <div className="mt-3 rounded-xl bg-black/[0.035] p-3">
          <p className="text-xs font-black text-black/45">왜 지금 보이나요?</p>
          <p className="mt-1 text-sm font-semibold leading-5 text-black/64">{stock.whyNow}</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {stock.signalTags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-skysoft px-2 py-1 text-[11px] font-black text-sky-950">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold text-black/45">현재가</p>
            <p className="text-lg font-black">{stock.currentPrice}</p>
          </div>
          <div className={isUp ? "flex items-center gap-1 font-black text-emerald-600" : "flex items-center gap-1 font-black text-red-500"}>
            <TrendIcon size={18} />
            {isUp ? "+" : ""}
            {stock.changeRate}%
          </div>
        </div>
      </article>
    </Link>
  );
}
