"use client";

import { useEffect, useState } from "react";
import { journalService } from "@/services/journalService";
import type { AssetKind, HeartRating, ReflectionRecord } from "@/types/investment";

const watchReasons = ["싸 보이는데 확신은 없음", "오를 것 같긴 한데 이유는 애매함", "이해는 되는데 가격이 고민됨", "요즘 자주 보여서 계속 보게 됨", "이유 없이 눈에 밟힘"];
const notBuyingReasons = ["가격이 부담돼서", "확신이 없어서", "더 알아보고 싶어서", "떨어질까 봐", "직접 입력"];

export function ReflectionPanel({ assetKey, assetKind }: { assetKey: string; assetKind: AssetKind }) {
  const [record, setRecord] = useState<ReflectionRecord>({
    assetKey,
    assetKind,
    heartRating: 2,
    reasonWatching: watchReasons[0],
    reasonNotBuying: notBuyingReasons[0],
    buyIntention: "고민 중",
    sellStandard: "상황 보고 판단",
    createdAt: new Date().toISOString()
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedRecord = journalService.getReflection(assetKey);
    if (savedRecord) setRecord(savedRecord);
  }, [assetKey]);

  function save() {
    journalService.saveReflection({ ...record, createdAt: new Date().toISOString() });
    setSaved(true);
  }

  return (
    <section className="mt-7 rounded-3xl bg-white p-5 shadow-soft">
      <h2 className="text-xl font-black">내 판단 기록</h2>
      <div className="mt-4 space-y-4">
        <div>
          <p className="text-sm font-black text-black/55">호감도</p>
          <div className="mt-2 flex gap-2">
            {[1, 2, 3].map((value) => (
              <button key={value} onClick={() => setRecord({ ...record, heartRating: value as HeartRating })} className={record.heartRating === value ? "rounded-2xl bg-coral px-4 py-2 font-black" : "rounded-2xl bg-paper px-4 py-2 font-black"}>
                {"❤️".repeat(value)}
              </button>
            ))}
          </div>
        </div>
        <Choice title="왜 계속 보게 돼?" value={record.reasonWatching} values={watchReasons} onChange={(value) => setRecord({ ...record, reasonWatching: value })} />
        <Choice title="왜 아직 안 샀어?" value={record.reasonNotBuying} values={notBuyingReasons} onChange={(value) => setRecord({ ...record, reasonNotBuying: value })} />
        <Choice title="매수 의향" value={record.buyIntention} values={["없음", "고민 중", "매수 생각 있음"]} onChange={(value) => setRecord({ ...record, buyIntention: value as ReflectionRecord["buyIntention"] })} />
        <Choice title="매도 기준" value={record.sellStandard} values={["바로 매도할 것 같음", "상황 보고 판단", "장기 보유 가능"]} onChange={(value) => setRecord({ ...record, sellStandard: value as ReflectionRecord["sellStandard"] })} />
        <button onClick={save} className="h-12 w-full rounded-2xl bg-ink text-sm font-black text-white">{saved ? "저장됨" : "판단 기록 저장"}</button>
      </div>
    </section>
  );
}

function Choice({ title, values, value, onChange }: { title: string; values: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <p className="text-sm font-black text-black/55">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.map((item) => (
          <button key={item} onClick={() => onChange(item)} className={item === value ? "rounded-full bg-ink px-3 py-2 text-xs font-black text-white" : "rounded-full bg-paper px-3 py-2 text-xs font-black text-black/60"}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
