"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/Badge";
import { StockCard } from "@/components/StockCard";
import { watchTags } from "@/lib/constants";
import { stocks } from "@/lib/mock-data";
import { storage } from "@/lib/storage";
import type { WatchTag } from "@/types";

export default function WatchlistPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [tags, setTags] = useState<Record<string, WatchTag>>({});

  useEffect(() => {
    setFavorites(storage.getFavorites());
    setTags(storage.getTags());
  }, []);

  const list = stocks.filter((stock) => favorites.includes(stock.ticker));

  function setTag(ticker: string, tag: WatchTag) {
    storage.setTag(ticker, tag);
    setTags(storage.getTags());
  }

  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">관심종목</p>
        <h1 className="mt-1 text-3xl font-black text-ink">하트를 누른 종목</h1>
        <p className="mt-2 text-sm font-semibold text-black/55">{list.length}개 저장됨</p>
      </header>

      {list.length ? (
        <div className="mt-5 space-y-4">
          {list.map((stock) => (
            <section key={stock.ticker} className="rounded-3xl bg-white p-3 shadow-soft">
              <StockCard stock={stock} />
              <div className="mt-3 flex flex-wrap items-center gap-2 px-1 pb-1">
                <Badge tone={stock.status === "과열" ? "coral" : stock.status === "조정" ? "yellow" : "green"}>{stock.status}</Badge>
                {watchTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setTag(stock.ticker, tag)}
                    className={
                      tags[stock.ticker] === tag
                        ? "rounded-full bg-ink px-3 py-1.5 text-xs font-black text-white"
                        : "rounded-full bg-black/[0.05] px-3 py-1.5 text-xs font-black text-black/55"
                    }
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl bg-white p-6 text-center shadow-soft">
          <p className="text-lg font-black">아직 관심종목이 없어요.</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-black/55">종목 상세에서 하트를 누르면 여기에 모입니다.</p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Link href="/market" className="rounded-2xl bg-ink px-4 py-3 text-sm font-black text-white">
              종목 둘러보기
            </Link>
            <Link href="/etfs" className="rounded-2xl bg-black/[0.06] px-4 py-3 text-sm font-black text-black/65">
              ETF 둘러보기
            </Link>
          </div>
        </div>
      )}
    </AppShell>
  );
}
