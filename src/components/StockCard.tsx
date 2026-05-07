"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/Badge";
import { priceService, type LivePriceQuote } from "@/services/priceService";
import type { Stock } from "@/types";

function statusTone(status: Stock["status"]) {
  if (status === "상승" || status === "안정") return "green";
  if (status === "과열") return "coral";
  if (status === "조정") return "yellow";
  return "blue";
}

export function StockCard({ stock }: { stock: Stock }) {
  const [liveQuote, setLiveQuote] = useState<LivePriceQuote | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const shownChangeRate = liveQuote?.changeRate ?? stock.changeRate;
  const shownPrice = liveQuote?.formattedPrice ?? cleanPrice(stock.currentPrice);
  const isUp = shownChangeRate >= 0;
  const TrendIcon = isUp ? ArrowUpRight : ArrowDownRight;

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

  return (
    <Link href={`/stocks/${encodeURIComponent(stock.ticker)}`} className="block h-full">
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

        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-black/45">{priceLoading ? "시세 확인 중" : liveQuote?.realtime ? "실시간 시세" : liveQuote ? "지연 시세" : "시세 확인 필요"}</p>
            <p className="text-lg font-black">{shownPrice}</p>
          </div>
          <div className={isUp ? "flex items-center gap-1 font-black text-emerald-600" : "flex items-center gap-1 font-black text-red-500"}>
            <TrendIcon size={18} />
            <span className="text-xs text-black/45">{liveQuote ? "전일 대비" : "등락률 확인 필요"}</span>
            {isUp ? "+" : ""}
            {shownChangeRate}%
          </div>
        </div>
      </article>
    </Link>
  );
}

function cleanPrice(value: string) {
  if (!value || value.includes("예시") || value.includes("MVP")) return "시세 확인 필요";
  return value;
}
