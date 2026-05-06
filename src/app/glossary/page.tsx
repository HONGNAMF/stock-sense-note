"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { glossaryService } from "@/services/glossaryService";

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const results = useMemo(() => glossaryService.search(query), [query]);

  useEffect(() => {
    setRecent(JSON.parse(localStorage.getItem("haeseok-note:v2:recent-terms") ?? "[]"));
  }, []);

  function remember(term: string) {
    const next = [term, ...recent.filter((item) => item !== term)].slice(0, 6);
    setRecent(next);
    localStorage.setItem("haeseok-note:v2:recent-terms", JSON.stringify(next));
  }

  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">단어찾기</p>
        <h1 className="mt-1 text-3xl font-black text-ink">어려운 용어를 쉽게</h1>
      </header>
      <label className="mt-5 flex h-14 items-center gap-3 rounded-2xl bg-white px-4 shadow-soft">
        <Search size={20} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="PER, ETF, 영업이익..." className="h-full flex-1 bg-transparent font-bold outline-none" />
      </label>
      {recent.length ? <p className="mt-3 text-sm font-bold text-black/45">최근 검색: {recent.join(", ")}</p> : null}
      <div className="mt-5 grid gap-3">
        {results.map((item) => (
          <article key={item.term} onMouseEnter={() => remember(item.term)} className="rounded-3xl bg-white p-5 shadow-soft">
            <h2 className="text-xl font-black">{item.term}</h2>
            <p className="mt-2 text-base font-black text-ink">{item.oneLine}</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-black/62">쉽게 말하면: {item.simple}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-black/62">주의할 점: {item.caution}</p>
            <p className="mt-3 text-xs font-black text-black/42">관련 용어: {item.related.join(", ")}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
