"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { journalService } from "@/services/journalService";
import { reportService } from "@/services/reportService";
import type { TradeRecord } from "@/types/investment";

export default function ReportsPage() {
  const [trades, setTrades] = useState<TradeRecord[]>([]);
  useEffect(() => setTrades(journalService.getTrades()), []);
  const monthly = reportService.monthlySummary(trades);
  const quarterly = reportService.quarterlySummary();

  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">리포트</p>
        <h1 className="mt-1 text-3xl font-black text-ink">월간 / 분기 복기</h1>
      </header>
      <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-xl font-black">{monthly.title}</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-black/62">{monthly.summary}</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Card title="이번 달 매수" value={`${monthly.buys}건`} />
          <Card title="이번 달 매도" value={`${monthly.sells}건`} />
        </div>
        <p className="mt-4 rounded-2xl bg-lemon/70 p-3 text-sm font-black leading-6 text-yellow-950">{monthly.feedback}</p>
      </section>
      <section className="mt-7 rounded-3xl bg-ink p-5 text-white shadow-soft">
        <div className="flex gap-2">
          <button className="rounded-full bg-white/15 px-3 py-1 text-xs font-black">이미지 저장</button>
          <button className="rounded-full bg-white/15 px-3 py-1 text-xs font-black">다시 분석</button>
          <button className="rounded-full bg-white/15 px-3 py-1 text-xs font-black">삭제</button>
        </div>
        <h2 className="mt-4 text-2xl font-black">{quarterly.title}</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-white/75">{quarterly.summary}</p>
        <div className="mt-4 grid gap-2">
          {quarterly.strengths.map((item) => <p key={item} className="rounded-2xl bg-white/10 p-3 text-sm font-bold">{item}</p>)}
          {quarterly.watchouts.map((item) => <p key={item} className="rounded-2xl bg-white/10 p-3 text-sm font-bold">{item}</p>)}
        </div>
      </section>
    </AppShell>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-paper p-4">
      <p className="text-xs font-black text-black/45">{title}</p>
      <p className="mt-1 text-xl font-black">{value}</p>
    </div>
  );
}
