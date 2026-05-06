"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { journalService } from "@/services/journalService";
import type { TradeRecord } from "@/types/investment";

export default function TradesPage() {
  const [trades, setTrades] = useState<TradeRecord[]>([]);
  const [form, setForm] = useState<Omit<TradeRecord, "id" | "createdAt">>({
    assetKey: "005930.KS",
    assetName: "삼성전자",
    assetKind: "stock",
    tradeType: "매수",
    tradeDate: new Date().toISOString().slice(0, 10),
    price: "",
    quantity: "",
    reason: "",
    emotion: "기록 중",
    heartRating: 2,
    riskJudgement: "중간",
    aiOneLine: "참고용 해석 기준으로 매수 이유가 유지되는지 나중에 복기합니다."
  });

  useEffect(() => setTrades(journalService.getTrades()), []);

  function save() {
    journalService.saveTrade({ ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    setTrades(journalService.getTrades());
  }

  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">매수/매도 기록</p>
        <h1 className="mt-1 text-3xl font-black text-ink">실행과 복기를 연결해요</h1>
      </header>
      <section className="mt-5 grid gap-3 rounded-3xl bg-white p-5 shadow-soft">
        <div className="grid grid-cols-2 gap-2">
          {(["매수", "매도"] as const).map((type) => (
            <button key={type} onClick={() => setForm({ ...form, tradeType: type })} className={form.tradeType === type ? "h-11 rounded-2xl bg-ink font-black text-white" : "h-11 rounded-2xl bg-paper font-black"}>{type}</button>
          ))}
        </div>
        <Input label="종목명" value={form.assetName} onChange={(value) => setForm({ ...form, assetName: value })} />
        <Input label="종목코드" value={form.assetKey} onChange={(value) => setForm({ ...form, assetKey: value })} />
        <Input label="거래일" type="date" value={form.tradeDate} onChange={(value) => setForm({ ...form, tradeDate: value })} />
        <Input label="가격" value={form.price} onChange={(value) => setForm({ ...form, price: value })} />
        <Input label="수량" value={form.quantity} onChange={(value) => setForm({ ...form, quantity: value })} />
        <Input label="이유" value={form.reason} onChange={(value) => setForm({ ...form, reason: value })} />
        <Input label="감정" value={form.emotion} onChange={(value) => setForm({ ...form, emotion: value })} />
        <button onClick={save} className="h-12 rounded-2xl bg-ink font-black text-white">기록 저장</button>
      </section>
      <section className="mt-7">
        <h2 className="text-xl font-black">최근 기록</h2>
        <div className="mt-3 grid gap-3">
          {trades.length ? trades.map((trade) => (
            <article key={trade.id} className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="text-sm font-black text-black/45">{trade.tradeDate} · {trade.tradeType}</p>
              <h3 className="mt-1 text-lg font-black">{trade.assetName}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-black/62">{trade.reason || "이유를 기록하지 않았습니다."}</p>
            </article>
          )) : <div className="rounded-3xl bg-white p-5 text-sm font-semibold text-black/55 shadow-sm">아직 매수/매도 기록이 없습니다.</div>}
        </div>
      </section>
    </AppShell>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label>
      <span className="text-sm font-black text-black/55">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 h-11 w-full rounded-2xl bg-paper px-4 font-bold outline-none" />
    </label>
  );
}
