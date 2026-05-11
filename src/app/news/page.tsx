import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/Badge";
import { stocks } from "@/lib/mock-data";

export default function NewsPage() {
  const news = stocks.flatMap((stock) => stock.news.map((item) => ({ ...item, stockName: stock.name })));

  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">뉴스</p>
        <h1 className="mt-1 text-3xl font-black text-ink">3줄로 먼저 읽기</h1>
        <p className="mt-2 text-sm font-semibold leading-6 text-black/55">실제 뉴스 API 연결 전까지는 mock 기사로 동작합니다. 기사 본문은 복제하지 않고 출처 링크와 자체 요약만 표시합니다.</p>
      </header>

      <div className="mt-5 space-y-3">
        {news.map((item) => (
          <article key={`${item.stockName}-${item.title}`} className="rounded-3xl bg-white p-5 shadow-soft">
            <div className="flex flex-wrap gap-2">
              <Badge tone="blue">{item.stockName}</Badge>
              <Badge tone={item.sentiment === "긍정" ? "green" : item.sentiment === "부정" ? "coral" : "gray"}>{item.sentiment}</Badge>
            </div>
            <h2 className="mt-3 text-lg font-black">{item.title}</h2>
            <p className="mt-1 text-sm font-bold text-black/45">{item.source}</p>
            <ul className="mt-3 space-y-1 text-sm font-semibold leading-6 text-black/62">
              {item.summary.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <a href={item.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-black text-ink underline">
              출처에서 보기
            </a>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
