import { economyTerms, type EconomyTerm } from "@/data/economyTerms";

const featuredTerms = [
  "기준금리",
  "CPI",
  "코스피",
  "ETF",
  "PER",
  "ROE",
  "환율",
  "국채금리",
  "공매도",
  "거래량",
  "컨센서스",
  "HBM",
  "전력 인프라",
  "DSR",
  "LTV"
];

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

function searchableText(term: EconomyTerm) {
  return [
    term.term,
    term.category,
    ...term.aliases,
    term.easyDescription,
    term.whyImportant,
    term.whyMentionedRecently,
    term.marketImpact,
    term.portfolioHint,
    term.cautionPoint,
    ...term.investorChecklist,
    ...term.relatedKeywords,
    ...term.relatedContents.flatMap((content) => [content.title, content.description, content.type])
  ]
    .map(normalize)
    .join(" ");
}

function scoreTerm(term: EconomyTerm, query: string) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return featuredTerms.includes(term.term) ? 5 : 1;

  let score = 0;
  if (normalize(term.term) === normalizedQuery) score += 100;
  if (normalize(term.term).includes(normalizedQuery)) score += 50;
  if (term.aliases.some((alias) => normalize(alias) === normalizedQuery)) score += 45;
  if (term.aliases.some((alias) => normalize(alias).includes(normalizedQuery))) score += 25;
  if (searchableText(term).includes(normalizedQuery)) score += 12;
  if (term.relatedKeywords.some((keyword) => normalize(keyword).includes(normalizedQuery))) score += 8;

  const queryLetters = [...normalizedQuery];
  const termText = searchableText(term);
  const partialMatches = queryLetters.filter((letter) => termText.includes(letter)).length;
  if (normalizedQuery.length >= 2 && partialMatches >= Math.min(3, normalizedQuery.length)) score += partialMatches;

  return score;
}

function inferFallbackCategory(query: string): EconomyTerm["category"] {
  const value = normalize(query);
  if (/(금리|채권|국채|연준|fomc)/i.test(value)) return "금리";
  if (/(물가|cpi|인플레|소비)/i.test(value)) return "물가";
  if (/(코스피|코스닥|나스닥|지수|s&p|sp500)/i.test(value)) return "지수";
  if (/(대출|부동산|dsr|ltv|리츠)/i.test(value)) return "부동산/대출";
  if (/(환율|달러|원화|유가|원유|금|원자재)/i.test(value)) return "환율/원자재";
  if (/(etf|펀드|배당)/i.test(value)) return "ETF";
  if (/(ai|반도체|로봇|배터리|전력|데이터센터|바이오|헬스케어)/i.test(value)) return "산업/테마";
  return "기업분석";
}

function fallbackTerm(query: string): EconomyTerm {
  const cleaned = query.trim();
  const category = inferFallbackCategory(cleaned);
  return {
    term: cleaned,
    aliases: [cleaned],
    category,
    easyDescription: `"${cleaned}"은 아직 Sensefolio 용어 사전에 자세히 등록되지 않은 키워드입니다. 대신 관련 시장 흐름을 해석할 때 확인할 포인트를 먼저 보여드릴게요.`,
    whyImportant: "뉴스에 자주 등장하는 단어라도 투자 판단에서는 뜻보다 내 종목의 실적, 업종, 비용, 수요와 어떻게 연결되는지가 더 중요합니다.",
    whyMentionedRecently: "최근 시장은 금리, 물가, AI 투자, 환율, 원자재, 실적 발표 같은 큰 흐름에 따라 여러 키워드가 빠르게 바뀌며 언급됩니다.",
    marketImpact: "이 키워드가 특정 업종의 매출 증가, 비용 부담, 밸류에이션 변화, 투자 심리 변화 중 어디에 연결되는지 나눠 보면 좋습니다.",
    portfolioHint: "바로 매수 신호로 보지 말고 관련 종목, ETF, 최근 30일 흐름, 실적 변화가 함께 움직이는지 확인하는 용도로 사용해보세요.",
    investorChecklist: ["관련 업종", "최근 30일 흐름", "실적 연결", "리스크"],
    cautionPoint: "아직 정식 설명이 없는 키워드라 단정적인 해석은 피해야 합니다. 관련 키워드 버튼이나 종목 검색으로 범위를 좁혀보세요.",
    relatedKeywords: ["기준금리", "CPI", "환율", "코스피", "ETF", "PER", "거래량", "컨센서스"],
    relatedContents: [
      { title: "직접 종목 검색", description: "입력한 키워드와 연결되는 회사나 ETF를 찾아봅니다.", href: `/search?q=${encodeURIComponent(cleaned)}`, type: "종목" },
      { title: "월간 시장 흐름", description: "하루 이슈보다 최근 30일 흐름으로 키워드를 해석합니다.", href: "/reports", type: "분석" }
    ]
  };
}

export const economyTermService = {
  examples() {
    return featuredTerms;
  },

  search(query: string, limit = 8) {
    const trimmed = query.trim();
    const scored = economyTerms
      .map((term) => ({ term, score: scoreTerm(term, query) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.term.term.localeCompare(b.term.term, "ko"));

    const results = scored.slice(0, limit).map((item) => item.term);
    if (!results.length && trimmed) return [fallbackTerm(trimmed)];
    return results;
  },

  find(termName: string) {
    const normalized = normalize(termName);
    return economyTerms.find((term) => normalize(term.term) === normalized || term.aliases.some((alias) => normalize(alias) === normalized));
  },

  related(keyword: string, limit = 5) {
    const normalized = normalize(keyword);
    return economyTerms
      .filter((term) => term.relatedKeywords.some((item) => normalize(item).includes(normalized)) || searchableText(term).includes(normalized))
      .slice(0, limit);
  }
};
