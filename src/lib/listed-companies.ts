import type { ListedCompany } from "@/types";

export const listedCompanies: ListedCompany[] = [
  { stockCode: "005930", companyName: "삼성전자", market: "KOSPI", sector: "반도체·스마트폰", isEtf: false, searchKeywords: ["반도체", "HBM", "스마트폰", "AI 메모리"] },
  { stockCode: "000660", companyName: "SK하이닉스", market: "KOSPI", sector: "메모리 반도체", isEtf: false, searchKeywords: ["HBM", "DRAM", "NAND", "AI"] },
  { stockCode: "000250", companyName: "삼천당제약", market: "KOSDAQ", sector: "제약·바이오", isEtf: false, searchKeywords: ["제약", "바이오", "점안제", "변동성"] },
  { stockCode: "009150", companyName: "삼성전기", market: "KOSPI", sector: "전자부품", isEtf: false, searchKeywords: ["MLCC", "카메라모듈", "전자부품", "전장"] },
  { stockCode: "041830", companyName: "인바디", market: "KOSDAQ", sector: "의료기기", isEtf: false, searchKeywords: ["체성분", "의료기기", "헬스케어"] },
  { stockCode: "054800", companyName: "아이디스", market: "KOSDAQ", sector: "영상보안", isEtf: false, searchKeywords: ["CCTV", "영상보안", "보안장비"] },
  { stockCode: "310200", companyName: "애니플러스", market: "KOSDAQ", sector: "콘텐츠", isEtf: false, searchKeywords: ["애니", "콘텐츠", "IP", "팬덤"] },
  { stockCode: "079160", companyName: "CJ CGV", market: "KOSPI", sector: "영화·극장", isEtf: false, searchKeywords: ["영화", "극장", "콘텐츠"] },
  { stockCode: "035720", companyName: "카카오", market: "KOSPI", sector: "플랫폼", isEtf: false, searchKeywords: ["메신저", "플랫폼", "콘텐츠", "금융"] },
  { stockCode: "035420", companyName: "NAVER", market: "KOSPI", sector: "인터넷 플랫폼", isEtf: false, searchKeywords: ["검색", "커머스", "웹툰", "AI"] },
  { stockCode: "064350", companyName: "현대로템", market: "KOSPI", sector: "방산·철도", isEtf: false, searchKeywords: ["방산", "철도", "전차"] },
  { stockCode: "012450", companyName: "한화에어로스페이스", market: "KOSPI", sector: "방산·항공", isEtf: false, searchKeywords: ["방산", "항공엔진", "우주"] },
  { stockCode: "267260", companyName: "HD현대일렉트릭", market: "KOSPI", sector: "전력기기", isEtf: false, searchKeywords: ["변압기", "전력", "데이터센터"] },
  { stockCode: "042700", companyName: "한미반도체", market: "KOSPI", sector: "반도체 장비", isEtf: false, searchKeywords: ["HBM", "반도체장비", "TC본더"] },
  { stockCode: "095340", companyName: "ISC", market: "KOSDAQ", sector: "반도체 부품", isEtf: false, searchKeywords: ["테스트소켓", "반도체", "AI"] },
  { stockCode: "108490", companyName: "로보티즈", market: "KOSDAQ", sector: "로봇", isEtf: false, searchKeywords: ["로봇", "감속기", "자율주행로봇"] },
  { stockCode: "041650", companyName: "상신브레이크", market: "KOSPI", sector: "자동차 부품", isEtf: false, searchKeywords: ["브레이크", "자동차부품", "제동"] },
  { stockCode: "013570", companyName: "디아이씨", market: "KOSPI", sector: "자동차 부품", isEtf: false, searchKeywords: ["자동차부품", "감속기", "전기차"] },
  { stockCode: "010140", companyName: "삼성중공업", market: "KOSPI", sector: "조선", isEtf: false, searchKeywords: ["조선", "선박", "LNG"] },
  { stockCode: "329180", companyName: "HD현대중공업", market: "KOSPI", sector: "조선", isEtf: false, searchKeywords: ["조선", "방산", "선박"] },
  { stockCode: "069500", companyName: "KODEX 200", market: "ETF", sector: "국내 지수 ETF", isEtf: true, searchKeywords: ["ETF", "KOSPI200", "지수"] },
  { stockCode: "360750", companyName: "TIGER 미국S&P500", market: "ETF", sector: "미국 지수 ETF", isEtf: true, searchKeywords: ["ETF", "S&P500", "미국"] },
  { stockCode: "133690", companyName: "TIGER 미국나스닥100", market: "ETF", sector: "미국 성장 ETF", isEtf: true, searchKeywords: ["ETF", "나스닥", "미국", "성장"] },
  { stockCode: "091160", companyName: "KODEX 반도체", market: "ETF", sector: "반도체 ETF", isEtf: true, searchKeywords: ["ETF", "반도체", "테마"] },
  { stockCode: "396500", companyName: "TIGER 반도체TOP10", market: "ETF", sector: "반도체 ETF", isEtf: true, searchKeywords: ["ETF", "반도체", "TOP10"] }
];

export function searchListedCompanies(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return listedCompanies;
  return listedCompanies.filter((company) =>
    [company.companyName, company.stockCode, company.market, company.sector, ...company.searchKeywords].some((value) => value.toLowerCase().includes(normalized))
  );
}
