"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, ExternalLink, Search } from "lucide-react";
import { Badge } from "@/components/Badge";
import { economyTermService } from "@/services/economyTermService";
import type { EconomyTerm } from "@/data/economyTerms";

const recentStorageKey = "sensefolio:v1:recent-economy-terms";

type EconomyTermSearchProps = {
  compact?: boolean;
  initialQuery?: string;
};

export function EconomyTermSearch({ compact = false, initialQuery = "" }: EconomyTermSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const [recent, setRecent] = useState<string[]>([]);
  const examples = economyTermService.examples();
  const results = useMemo(() => economyTermService.search(query, compact ? 2 : 8), [compact, query]);

  useEffect(() => {
    if (initialQuery) setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    try {
      setRecent(JSON.parse(localStorage.getItem(recentStorageKey) ?? "[]"));
    } catch {
      setRecent([]);
    }
  }, []);

  function remember(term: string) {
    const next = [term, ...recent.filter((item) => item !== term)].slice(0, 6);
    setRecent(next);
    localStorage.setItem(recentStorageKey, JSON.stringify(next));
  }

  function chooseTerm(term: string) {
    setQuery(term);
    remember(term);
  }

  return (
    <section className={compact ? "mt-5 rounded-3xl bg-white p-5 shadow-soft" : "mt-5"}>
      <div className={compact ? "" : "rounded-3xl bg-white p-5 shadow-soft"}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-black text-black/45">경제 용어 검색</p>
            <h2 className="mt-1 text-2xl font-black text-ink">뉴스 속 단어를 투자 판단 언어로 바꿔봐요</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-black/55">
              기준금리, CPI, 코스피처럼 자주 보이는 단어가 포트폴리오 해석에 주는 힌트를 쉽게 정리합니다.
            </p>
          </div>
          <div className="hidden size-11 place-items-center rounded-2xl bg-skysoft text-sky-950 sm:grid">
            <BookOpen size={20} />
          </div>
        </div>

        <label className="mt-4 flex h-14 items-center gap-3 rounded-2xl bg-paper px-4 text-black/50">
          <Search size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="궁금한 경제·투자 용어를 검색해보세요"
            className="h-full min-w-0 flex-1 bg-transparent text-sm font-bold text-ink outline-none placeholder:text-black/38 sm:text-base"
          />
        </label>

        <div className="mt-3 flex flex-wrap gap-2">
          {examples.slice(0, compact ? 7 : examples.length).map((term) => (
            <button key={term} onClick={() => chooseTerm(term)} className="rounded-full bg-black/[0.05] px-3 py-1.5 text-xs font-black text-black/60">
              {term}
            </button>
          ))}
        </div>

        {recent.length ? (
          <p className="mt-3 text-xs font-bold leading-5 text-black/42">
            최근 검색: {recent.map((term) => (
              <button key={term} onClick={() => chooseTerm(term)} className="mr-1 font-black text-ink underline decoration-black/15 underline-offset-4">
                {term}
              </button>
            ))}
          </p>
        ) : null}
      </div>

      <div className={compact ? "mt-4 grid gap-3" : "mt-5 grid gap-4"}>
        {results.map((term) => (
          <EconomyTermCard key={term.term} term={term} compact={compact} onSelectKeyword={chooseTerm} onRemember={remember} />
        ))}
      </div>

      {compact ? (
        <Link href={`/glossary${query ? `?term=${encodeURIComponent(query)}` : ""}`} className="mt-3 block h-11 rounded-2xl bg-ink pt-3 text-center text-xs font-black text-white">
          경제 용어 더 자세히 보기
        </Link>
      ) : null}
    </section>
  );
}

function EconomyTermCard({
  term,
  compact,
  onSelectKeyword,
  onRemember
}: {
  term: EconomyTerm;
  compact: boolean;
  onSelectKeyword: (keyword: string) => void;
  onRemember: (term: string) => void;
}) {
  return (
    <article onMouseEnter={() => onRemember(term.term)} className="rounded-3xl bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Badge tone="blue">{term.category}</Badge>
          <h3 className="mt-3 text-2xl font-black text-ink">{term.term}</h3>
          <p className="mt-2 text-base font-black leading-7 text-black/72">{term.easyDescription}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <InfoBlock title="왜 중요할까?" body={term.whyImportant} />
        <InfoBlock title="최근 왜 자주 언급될까?" body={term.whyMentionedRecently} />
        <InfoBlock title="시장에 주는 영향" body={term.marketImpact} />
        <InfoBlock title="포트폴리오 해석 힌트" body={term.portfolioHint} />
      </div>

      {!compact ? (
        <>
          <div className="mt-4 rounded-2xl bg-lemon/70 p-4">
            <p className="text-xs font-black text-yellow-950/60">주의해서 읽을 포인트</p>
            <p className="mt-2 text-sm font-bold leading-6 text-yellow-950">{term.cautionPoint}</p>
          </div>

          <div className="mt-4">
            <p className="text-xs font-black text-black/42">투자자가 같이 보면 좋은 체크포인트</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {term.investorChecklist.map((item) => (
                <span key={item} className="rounded-full bg-paper px-3 py-1.5 text-xs font-black text-black/62">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-black text-black/42">관련 키워드</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {term.relatedKeywords.map((keyword) => (
                <button key={keyword} onClick={() => onSelectKeyword(keyword)} className="rounded-full bg-skysoft px-3 py-1.5 text-xs font-black text-sky-950">
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {term.relatedContents.map((content) => (
              <Link key={`${term.term}-${content.title}`} href={content.href} className="rounded-2xl border border-black/5 bg-paper p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black text-black/42">{content.type}</p>
                    <p className="mt-1 text-sm font-black text-ink">{content.title}</p>
                  </div>
                  <ExternalLink size={15} className="mt-0.5 shrink-0 text-black/35" />
                </div>
                <p className="mt-2 text-xs font-semibold leading-5 text-black/55">{content.description}</p>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </article>
  );
}

function InfoBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-paper p-4">
      <p className="text-xs font-black text-black/42">{title}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-black/65">{body}</p>
    </div>
  );
}
