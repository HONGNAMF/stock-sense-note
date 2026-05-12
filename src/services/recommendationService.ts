import { etfs } from "@/lib/etf-data";
import { listedCompanies } from "@/lib/listed-companies";
import { stocks } from "@/lib/mock-data";
import { companyProfileService } from "@/services/companyProfileService";
import type { CompanyProfile, ListedCompany, StockStatus } from "@/types";
import type { InvestmentPreferences, LocalProfile, RiskLevel } from "@/types/investment";

export type RecommendationSectionId = "taste" | "study" | "etf" | "overlooked" | "themeRisk";

export type RecommendationCandidate = {
  id: string;
  name: string;
  symbol: string;
  assetKind: "stock" | "etf";
  region: "국내" | "해외";
  market: string;
  sector: string;
  oneLine: string;
  interestReason: string;
  habitReason: string;
  recent30DayFlow: string;
  risk: RiskLevel;
  dataConfidence: CompanyProfile["dataConfidence"];
  tags: string[];
  score: number;
  href: string;
  isOverheated: boolean;
  isOverlooked: boolean;
};

export type RecommendationSection = {
  id: RecommendationSectionId;
  title: string;
  description: string;
  emptyMessage?: string;
  candidates: RecommendationCandidate[];
};

const DEFAULT_INTERESTS = ["기술 / 산업", "헬스케어", "인프라", "ETF"];

const interestTagMap: Record<string, string[]> = {
  "콘텐츠 / 취향": ["콘텐츠", "애니", "영화", "IP", "팬덤", "웹툰", "게임", "OTT"],
  "생활 / 소비": ["소비", "커머스", "리테일", "가전", "자동차", "생활"],
  "기술 / 산업": ["AI", "반도체", "HBM", "MLCC", "로봇", "전장", "데이터센터", "소프트웨어"],
  헬스케어: ["헬스케어", "의료기기", "제약", "바이오", "건강관리", "진단"],
  "금융 / 경제": ["금융", "은행", "증권", "보험", "배당", "금리"],
  인프라: ["전력", "변압기", "방산", "철도", "조선", "물류", "영상보안", "CCTV", "자동차부품"],
  ETF: ["ETF", "지수", "배당", "테마", "분산"],
  해외주식: ["미국", "US", "글로벌", "플랫폼"],
  국내주식: ["KOSPI", "KOSDAQ", "국내"],
  기타: []
};

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function composeTicker(company: ListedCompany) {
  if (company.isEtf) return `${company.stockCode}.KS`;
  if (company.market === "KOSDAQ") return `${company.stockCode}.KQ`;
  if (company.market === "US") return company.stockCode;
  return `${company.stockCode}.KS`;
}

function stockStatusRisk(status?: StockStatus): RiskLevel {
  if (status === "과열") return "높음";
  if (status === "조정") return "중간";
  return "낮음";
}

function getMatchedInterest(tags: string[], interests: string[]) {
  const activeInterests = interests.length ? interests : DEFAULT_INTERESTS;
  const normalizedTags = tags.map(normalize);
  const matched = activeInterests.filter((interest) => {
    const mapped = interestTagMap[interest] ?? [interest];
    return mapped.some((tag) => normalizedTags.some((candidateTag) => candidateTag.includes(normalize(tag))));
  });
  return matched;
}

function scoreConfidence(confidence: CompanyProfile["dataConfidence"]) {
  if (confidence === "높음") return 10;
  if (confidence === "보통") return 6;
  return 1;
}

function scorePreferences(candidate: { assetKind: "stock" | "etf"; region: "국내" | "해외"; risk: RiskLevel; isOverlooked: boolean; tags: string[] }, preferences?: InvestmentPreferences) {
  if (!preferences) return 0;
  let score = 0;
  if (preferences.preferredMarket === "전부 보기") score += 4;
  if (preferences.preferredMarket === "ETF" && candidate.assetKind === "etf") score += 20;
  if (preferences.preferredMarket === "국내주식" && candidate.assetKind === "stock" && candidate.region === "국내") score += 14;
  if (preferences.preferredMarket === "해외주식" && candidate.assetKind === "stock" && candidate.region === "해외") score += 14;
  if (preferences.preferredRisk === "낮은 리스크" && candidate.risk === "낮음") score += 18;
  if (preferences.preferredRisk === "중간 리스크" && candidate.risk !== "높음") score += 10;
  if (preferences.preferredRisk.includes("높은 리스크") && candidate.risk === "높음") score += 8;
  if (preferences.preferredSize === "소외주도 보고 싶음" && candidate.isOverlooked) score += 14;
  if (preferences.preferredApproach === "ETF로 분산해서 보기" && candidate.assetKind === "etf") score += 18;
  if (preferences.preferredApproach === "저평가/소외주 찾기" && candidate.isOverlooked) score += 18;
  if (preferences.preferredApproach === "내가 좋아하는 분야 위주로 보기") score += 6;
  if (preferences.preferredApproach === "성장 가능성 보기" && candidate.tags.some((tag) => ["AI", "반도체", "로봇", "바이오", "성장"].includes(tag))) score += 12;
  if (preferences.preferredApproach === "안정적으로 오래 보기" && candidate.risk !== "높음") score += 12;
  return score;
}

function buildListedCandidate(company: ListedCompany, profile: LocalProfile | null): RecommendationCandidate {
  const ticker = composeTicker(company);
  const stock = stocks.find((item) => item.stockCode === company.stockCode || item.ticker === ticker);
  const companyProfile = companyProfileService.getOrCreateMockProfile(ticker, company.companyName, company.sector);
  const tags = Array.from(new Set([company.sector, ...company.searchKeywords, ...companyProfile.industryTags]));
  const matchedInterests = getMatchedInterest(tags, profile?.interests ?? []);
  const isEtf = company.isEtf;
  const isThemeLike = tags.some((tag) => ["바이오", "로봇", "AI", "HBM", "테마", "방산"].includes(tag));
  const isOverheated = stock?.status === "과열" || tags.some((tag) => ["변동성", "테마"].includes(tag));
  const isOverlooked = tags.some((tag) => ["영상보안", "의료기기", "자동차부품", "조선"].includes(tag)) && !isOverheated;
  const dataConfidence = companyProfile.dataConfidence;
  const risk = isOverheated ? "높음" : stockStatusRisk(stock?.status);
  const partialCandidate = {
    assetKind: isEtf ? ("etf" as const) : ("stock" as const),
    region: company.market === "US" ? ("해외" as const) : ("국내" as const),
    risk,
    isOverlooked,
    tags
  };

  const interestScore = matchedInterests.length * 18;
  const businessScore = companyProfile.businessSummary.includes("정리 중") ? 3 : 16;
  const habitScore =
    (profile?.investorSummary?.includes("신중") && risk !== "높음" ? 10 : 0) +
    (profile?.investorSummary?.includes("ETF") && isEtf ? 12 : 0) +
    (companyProfile.businessSummary.includes("정리 중") ? 0 : 8);
  const flowScore = isEtf ? 8 : isThemeLike ? 12 : stock ? 14 : 6;
  const financialScore = scoreConfidence(dataConfidence) + (risk === "낮음" ? 8 : risk === "중간" ? 4 : 0);
  const riskPenalty = isOverheated ? 16 : dataConfidence === "낮음" ? 6 : 0;
  const preferenceScore = scorePreferences(partialCandidate, profile?.preferences);
  const investmentProfileScore =
    (profile?.investmentProfile?.buyStyle === "신중형" && risk !== "높음" ? 8 : 0) +
    (profile?.investmentProfile?.interestStyle === "ETF 기반" && isEtf ? 14 : 0) +
    (profile?.investmentProfile?.interestStyle === "테마/뉴스 기반" && isThemeLike ? 8 : 0) +
    (profile?.investmentProfile?.reviewStyle === "기록 높음" && companyProfile.dataConfidence !== "낮음" ? 5 : 0);
  const score = interestScore + businessScore + habitScore + preferenceScore + investmentProfileScore + flowScore + financialScore - riskPenalty;

  const params = new URLSearchParams({
    fallback: "1",
    name: company.companyName,
    sector: company.sector,
    product: company.searchKeywords.slice(0, 3).join(", "),
    reason: matchedInterests[0] ?? "최근 30일 흐름"
  });

  return {
    id: `${company.market}-${company.stockCode}`,
    name: company.companyName,
    symbol: ticker,
    assetKind: isEtf ? "etf" : "stock",
    region: company.market === "US" ? "해외" : "국내",
    market: company.market,
    sector: company.sector,
    oneLine: companyProfile.businessSummary.includes("정리 중") ? `${company.sector} 관련 회사입니다. 상세 사업 정보는 정리 중입니다.` : companyProfile.businessSummary,
    interestReason: matchedInterests.length
      ? `선택한 관심사 ${matchedInterests.slice(0, 2).join(", ")}와 ${tags.slice(0, 3).join(", ")} 태그가 이어집니다.`
      : "관심사가 아직 적어 최근 30일 흐름과 업종 태그를 넓게 보고 골랐습니다.",
    habitReason: profile?.preferences
      ? `${profile.preferences.preferredMarket}, ${profile.preferences.preferredRisk}, ${profile.preferences.preferredApproach} 조건을 함께 반영했습니다.`
      : isEtf
      ? "개별 회사보다 넓게 분산해서 공부하기 좋은 후보입니다."
      : companyProfile.businessSummary.includes("정리 중")
        ? "기본 업종 정보부터 확인한 뒤 사업 내용을 보완해볼 후보입니다."
        : "회사가 무엇을 팔아 돈을 버는지 한 줄로 설명 가능한 후보입니다.",
    recent30DayFlow: stock?.whyNow ?? (isEtf ? "최근 30일 섹터와 자금 흐름을 ETF로 넓게 확인하기 좋은 후보입니다." : `${company.sector} 업종 흐름을 월간 단위로 확인할 수 있는 후보입니다.`),
    risk,
    dataConfidence,
    tags,
    score,
    href: isEtf ? `/etfs/${encodeURIComponent(ticker)}?${params.toString()}` : `/stocks/${encodeURIComponent(ticker)}?${params.toString()}`,
    isOverheated,
    isOverlooked
  };
}

function buildMockStockCandidates(profile: LocalProfile | null): RecommendationCandidate[] {
  return stocks
    .filter((stock) => stock.market === "US")
    .map((stock) => {
      const tags = Array.from(new Set([stock.sector ?? "", ...stock.interests, ...(stock.companyProfile?.industryTags ?? [])].filter(Boolean)));
      const matchedInterests = getMatchedInterest(tags, profile?.interests ?? []);
      const risk = stockStatusRisk(stock.status);
      const isOverlooked = false;
      return {
        id: `mock-${stock.ticker}`,
        name: stock.name,
        symbol: stock.ticker,
        assetKind: "stock",
        region: "해외",
        market: "US",
        sector: stock.sector ?? "해외 주식",
        oneLine: stock.companyProfile?.businessSummary ?? stock.oneLine,
        interestReason: matchedInterests.length ? `선택한 관심사 ${matchedInterests.join(", ")}와 연결됩니다.` : "해외 주요 주식 mock 후보로 포함했습니다.",
        habitReason: "해외 주요 주식은 MVP에서는 mock data로 보여주고, 실제 API 연결 시 확장됩니다.",
        recent30DayFlow: stock.whyNow,
        risk,
        dataConfidence: stock.companyProfile?.dataConfidence ?? "낮음",
        tags,
        score: 30 + matchedInterests.length * 16 + scorePreferences({ assetKind: "stock", region: "해외", risk, isOverlooked, tags }, profile?.preferences),
        href: `/stocks/${encodeURIComponent(stock.ticker)}`,
        isOverheated: stock.status === "과열",
        isOverlooked: false
      };
    });
}

function buildEtfCandidates(profile: LocalProfile | null): RecommendationCandidate[] {
  return etfs.map((etf) => {
    const tags = [etf.character, etf.market === "KR" ? "국내 ETF" : "해외 ETF", etf.oneLine, etf.name];
    const matchedInterests = getMatchedInterest(tags, profile?.interests ?? []);
    const isOverlooked = etf.character === "방어형" || etf.character === "배당형";
    return {
      id: `etf-${etf.symbol}`,
      name: etf.name,
      symbol: etf.symbol,
      assetKind: "etf",
      region: etf.market === "KR" ? "국내" : "해외",
      market: etf.market === "KR" ? "ETF" : "US ETF",
      sector: etf.character,
      oneLine: etf.oneLine,
      interestReason: matchedInterests.length ? `선택한 관심사 ${matchedInterests.join(", ")}와 ETF 성격이 맞습니다.` : "개별주가 부담스러울 때 넓게 볼 수 있는 ETF 후보입니다.",
      habitReason: etf.risk === "낮음" ? "리스크를 낮춰 넓게 공부하기 좋은 후보입니다." : "테마 흐름을 ETF로 묶어 보되 변동성은 함께 확인해야 합니다.",
      recent30DayFlow: "최근 30일 흐름을 개별 종목이 아니라 섹터 바구니로 확인하는 후보입니다.",
      risk: etf.risk,
      dataConfidence: "보통",
      tags,
      score: 28 + matchedInterests.length * 14 + (etf.risk === "낮음" ? 12 : 4) + scorePreferences({ assetKind: "etf", region: etf.market === "KR" ? "국내" : "해외", risk: etf.risk, isOverlooked, tags }, profile?.preferences),
      href: `/etfs/${encodeURIComponent(etf.symbol)}`,
      isOverheated: etf.risk === "높음",
      isOverlooked
    };
  });
}

function uniqueById(candidates: RecommendationCandidate[]) {
  return Array.from(new Map(candidates.map((candidate) => [candidate.id, candidate])).values());
}

function takeSorted(candidates: RecommendationCandidate[], predicate: (candidate: RecommendationCandidate) => boolean) {
  return candidates.filter(predicate).sort((a, b) => b.score - a.score).slice(0, 12);
}

export const recommendationService = {
  buildCandidates: (profile: LocalProfile | null) => {
    return uniqueById([
      ...listedCompanies.map((company) => buildListedCandidate(company, profile)),
      ...buildMockStockCandidates(profile),
      ...buildEtfCandidates(profile)
    ]).sort((a, b) => b.score - a.score);
  },
  buildSections: (profile: LocalProfile | null): RecommendationSection[] => {
    const candidates = recommendationService.buildCandidates(profile);
    const fallbackMessage = "조건에 딱 맞는 회사가 많지 않아요. 대신 비슷한 산업이나 ETF로 넓혀서 보여드릴게요.";

    return [
      {
        id: "taste",
        title: "취향에 맞는 종목",
        description: "관심사 태그와 회사의 제품·서비스 키워드가 이어지는 후보입니다.",
        emptyMessage: fallbackMessage,
        candidates: takeSorted(candidates, (candidate) => candidate.assetKind === "stock" && candidate.score >= 35)
      },
      {
        id: "study",
        title: "공부해볼 만한 종목",
        description: "사업 구조를 한 줄로 설명할 수 있고 월간 흐름을 이해하기 좋은 후보입니다.",
        emptyMessage: fallbackMessage,
        candidates: takeSorted(candidates, (candidate) => candidate.assetKind === "stock" && !candidate.isOverheated)
      },
      {
        id: "etf",
        title: "안정적으로 보기 좋은 ETF",
        description: "개별주보다 넓게 담아 산업 흐름을 공부하기 좋은 ETF 후보입니다.",
        candidates: takeSorted(candidates, (candidate) => candidate.assetKind === "etf" && candidate.risk !== "높음")
      },
      {
        id: "overlooked",
        title: "소외되어 있지만 볼 만한 종목",
        description: "화려한 테마보다 사업 구조와 업종 태그를 차분히 볼 수 있는 후보입니다.",
        emptyMessage: fallbackMessage,
        candidates: takeSorted(candidates, (candidate) => candidate.isOverlooked)
      },
      {
        id: "themeRisk",
        title: "주의해서 볼 테마 종목",
        description: "최근 30일 흐름은 있지만 과열과 변동성도 같이 확인해야 하는 후보입니다.",
        candidates: takeSorted(candidates, (candidate) => candidate.isOverheated || candidate.risk === "높음")
      }
    ];
  }
};
