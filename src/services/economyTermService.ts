import { economyTerms, type EconomyTerm } from "@/data/economyTerms";

const featuredTerms = ["기준금리", "CPI", "코스피", "ETF", "PER", "ROE", "환율", "고유가", "반도체", "DSR", "LTV"];

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
  return score;
}

export const economyTermService = {
  examples() {
    return featuredTerms;
  },

  search(query: string, limit = 8) {
    const scored = economyTerms
      .map((term) => ({ term, score: scoreTerm(term, query) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.term.term.localeCompare(b.term.term, "ko"));

    return scored.slice(0, limit).map((item) => item.term);
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
