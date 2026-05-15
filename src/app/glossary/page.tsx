"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { EconomyTermSearch } from "@/components/EconomyTermSearch";

export default function GlossaryPage() {
  const [initialQuery, setInitialQuery] = useState("");

  useEffect(() => {
    setInitialQuery(new URLSearchParams(window.location.search).get("term") ?? "");
  }, []);

  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">단어찾기</p>
        <h1 className="mt-1 text-3xl font-black text-ink">경제 용어를 내 투자 언어로</h1>
        <p className="mt-2 text-sm font-semibold leading-6 text-black/55">
          뉴스와 분석 글에서 자주 보이는 단어를 쉬운 설명, 시장 영향, 포트폴리오 힌트로 정리합니다.
        </p>
      </header>

      <EconomyTermSearch initialQuery={initialQuery} />
    </AppShell>
  );
}
