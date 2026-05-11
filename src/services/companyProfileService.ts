import type { CompanyProfile, ListedCompany } from "@/types";
import { getCompanyProfileByTicker } from "@/lib/mock-data";
import { listedCompanies } from "@/lib/listed-companies";

function fallbackProfile(company: ListedCompany): CompanyProfile {
  return {
    id: `profile-${company.stockCode}`,
    stockId: company.stockCode,
    stockCode: company.stockCode,
    companyName: company.companyName,
    market: company.market,
    sector: company.sector,
    businessSummary: "상세 사업 정보 정리 중",
    mainProducts: ["정보 정리 중"],
    revenueSources: ["공개 자료 확인 후 정리 예정"],
    mainCustomers: ["확인 필요"],
    industryTags: company.searchKeywords,
    easyExplanation: "이 회사의 상세 사업 정보는 아직 정리 중입니다.",
    dataSource: "mock",
    dataConfidence: "낮음",
    lastUpdatedAt: new Date().toISOString()
  };
}

export const companyProfileService = {
  getByTicker: (ticker: string) => {
    const known = getCompanyProfileByTicker(ticker);
    if (known) return known;
    const code = ticker.replace(/\.(KS|KQ|KRX)$/i, "");
    const listed = listedCompanies.find((company) => company.stockCode === code);
    return listed ? fallbackProfile(listed) : null;
  },
  getOrCreateMockProfile: (ticker: string, name?: string, sector?: string) => {
    const existing = companyProfileService.getByTicker(ticker);
    if (existing) return existing;
    const code = ticker.replace(/\.(KS|KQ|KRX)$/i, "");
    return fallbackProfile({
      stockCode: code,
      companyName: name || ticker,
      market: ticker.includes(".KQ") ? "KOSDAQ" : ticker.includes(".KS") || ticker.includes(".KRX") ? "KOSPI" : "US",
      sector: sector || "상세 사업 정보 정리 중",
      isEtf: false,
      searchKeywords: [sector || "정보 정리 중"]
    });
  },
  buildAiPrompt: (input: { companyName: string; stockCode: string; sector: string; businessText: string; productText?: string; revenueText?: string }) => ({
    role: "system",
    instruction: "Summarize official business report text into beginner-friendly Korean JSON. Do not copy long source text. Do not guess unknown facts. Do not write investment advice.",
    input,
    outputSchema: {
      business_summary: "한 줄 회사 설명",
      main_products: ["제품1", "제품2", "제품3"],
      revenue_sources: ["매출원1", "매출원2"],
      main_customers: ["고객군1", "고객군2"],
      industry_tags: ["태그1", "태그2"],
      easy_explanation: "초보자도 이해할 수 있는 쉬운 설명",
      data_confidence: "높음 | 보통 | 낮음",
      caution: "해석 시 주의할 점"
    }
  })
};
