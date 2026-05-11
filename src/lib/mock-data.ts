import type { CompanyProfile, Stock } from "@/types";

export const marketContext = {
  lastUpdated: "2026-05-11",
  headline: "최근 30일 기준으로 AI 반도체, 전력 인프라, 의료기기, 로봇 흐름이 함께 언급되고 있습니다.",
  sourceNotes: [
    "MVP에서는 실제 추천이 아니라 최근 30일 흐름을 설명하는 mock 시장 피드를 사용합니다.",
    "실서비스에서는 KRX 시세, DART 공시, 뉴스 API, ETF 구성 데이터를 서비스 계층에서 교체합니다.",
    "가격과 등락률은 출처가 표시되며, API 연결 전에는 예시 또는 지연 데이터로 보일 수 있습니다."
  ],
  updatePolicy: "월간 거래대금, 뉴스 언급량, 공시, 실적 발표, 섹터 흐름을 반영해 교체하는 구조입니다."
};

export const marketSummary = "최근 30일 동안 AI 메모리와 전력 인프라가 강했고, 일부 바이오와 로봇 종목은 변동성이 커져 과열 여부를 함께 봐야 합니다.";

const baseAnalysis = {
  business: "먼저 이 회사가 무엇을 팔고 누구에게 필요한지 이해하는 것이 핵심입니다.",
  revenue: "제품 판매, 서비스 사용료, 장비 공급, 부품 납품처럼 회사마다 돈 버는 방식이 다릅니다.",
  earnings: "최근 실적은 매출 성장, 이익률, 비용 증가 여부를 함께 봐야 합니다.",
  valuation: "현재 가격이 싸다거나 비싸다고 단정하지 않고, 기대가 얼마나 반영됐는지 봅니다.",
  trend: "하루 급등락보다 최근 30일 흐름과 거래량 변화를 우선 봅니다.",
  buyNow: "참고용 해석 기준으로는 한 번에 결정하기보다 회사 이해, 가격 부담, 리스크를 나눠 확인하는 편이 좋습니다.",
  longTerm: "장기 보유 가능성은 산업 필요성, 현금창출력, 경쟁력 유지 여부가 중요합니다.",
  risks: "실적 기대가 가격에 먼저 반영되었거나 뉴스 하나로 변동성이 커질 수 있습니다.",
  peers: "비슷한 기업과 비교하면 이 회사가 비싼지, 성장성이 더 좋은지 보기 쉽습니다."
};

function news(title: string, sentiment: "긍정" | "부정" | "중립") {
  return {
    title,
    source: "Market Context Mock",
    url: "https://dart.fss.or.kr/",
    sentiment,
    summary: [
      "MVP 예시 뉴스 요약입니다.",
      "기사 본문을 복제하지 않고 출처 링크와 자체 작성 요약만 표시합니다.",
      "투자 판단은 참고용 해석으로만 봐야 합니다."
    ]
  };
}

function makeProfile(input: Omit<CompanyProfile, "id" | "stockId" | "lastUpdatedAt"> & { id?: string; stockId?: string }): CompanyProfile {
  return {
    id: input.id ?? `profile-${input.stockCode}`,
    stockId: input.stockId ?? input.stockCode,
    lastUpdatedAt: "2026-05-11",
    ...input
  };
}

const profiles: Record<string, CompanyProfile> = {
  "005930.KS": makeProfile({
    stockCode: "005930",
    companyName: "삼성전자",
    market: "KOSPI",
    sector: "반도체·스마트폰",
    businessSummary: "반도체, 스마트폰, 가전, 디스플레이 부품을 만드는 한국 대표 기술 기업",
    mainProducts: ["메모리 반도체", "스마트폰", "가전", "디스플레이 패널"],
    revenueSources: ["제품 판매", "부품 공급", "프리미엄 기기 판매"],
    mainCustomers: ["글로벌 전자제품 소비자", "서버·AI 인프라 기업", "완성품 제조사"],
    industryTags: ["반도체", "AI 메모리", "스마트폰", "가전"],
    easyExplanation: "AI 서버와 스마트폰에 들어가는 핵심 부품과 완제품을 함께 파는 회사입니다.",
    dataSource: "mock",
    dataConfidence: "보통"
  }),
  "000660.KS": makeProfile({
    stockCode: "000660",
    companyName: "SK하이닉스",
    market: "KOSPI",
    sector: "메모리 반도체",
    businessSummary: "AI 서버와 PC·모바일에 쓰이는 메모리 반도체를 만드는 회사",
    mainProducts: ["DRAM", "NAND", "HBM"],
    revenueSources: ["메모리 반도체 판매", "고부가 HBM 공급"],
    mainCustomers: ["글로벌 빅테크", "서버 제조사", "전자제품 제조사"],
    industryTags: ["HBM", "AI 메모리", "반도체"],
    easyExplanation: "AI가 커질수록 더 많이 필요한 고성능 메모리를 파는 회사입니다.",
    dataSource: "mock",
    dataConfidence: "보통"
  }),
  "000250.KQ": makeProfile({
    stockCode: "000250",
    companyName: "삼천당제약",
    market: "KOSDAQ",
    sector: "제약·바이오",
    businessSummary: "의약품과 바이오시밀러 관련 사업을 하는 제약 기업",
    mainProducts: ["전문의약품", "점안제", "바이오시밀러 후보"],
    revenueSources: ["의약품 판매", "기술이전·계약 가능성"],
    mainCustomers: ["병원", "약국", "제약 파트너사"],
    industryTags: ["제약", "바이오", "변동성"],
    easyExplanation: "약을 만들고 파는 회사이며, 바이오 관련 기대가 주가 변동성을 크게 만들 수 있습니다.",
    dataSource: "mock",
    dataConfidence: "낮음"
  }),
  "041830.KQ": makeProfile({
    stockCode: "041830",
    companyName: "인바디",
    market: "KOSDAQ",
    sector: "의료기기",
    businessSummary: "체성분 분석 의료기기를 만드는 회사",
    mainProducts: ["체성분 분석기", "혈압계", "건강관리 솔루션"],
    revenueSources: ["장비 판매", "소모품·서비스"],
    mainCustomers: ["병원", "피트니스센터", "건강검진센터"],
    industryTags: ["의료기기", "헬스케어", "건강관리"],
    easyExplanation: "몸의 근육량과 지방량을 측정하는 기기를 만들어 병원과 헬스장 등에 판매합니다.",
    dataSource: "mock",
    dataConfidence: "보통"
  }),
  "054800.KQ": makeProfile({
    stockCode: "054800",
    companyName: "아이디스",
    market: "KOSDAQ",
    sector: "영상보안",
    businessSummary: "CCTV와 영상보안 장비를 만드는 회사",
    mainProducts: ["CCTV 카메라", "영상 저장장치", "보안 솔루션"],
    revenueSources: ["장비 판매", "보안 시스템 공급"],
    mainCustomers: ["기업", "공공기관", "보안 설치 업체"],
    industryTags: ["CCTV", "영상보안", "보안"],
    easyExplanation: "건물과 매장에서 쓰는 CCTV와 영상 저장 장비를 만드는 회사입니다.",
    dataSource: "mock",
    dataConfidence: "보통"
  })
};

function stock(input: Partial<Stock> & Pick<Stock, "ticker" | "name" | "whyNow" | "riskNote" | "category" | "status" | "interests" | "aiBadge" | "oneLine">): Stock {
  const companyProfile = profiles[input.ticker];
  return {
    market: input.ticker.includes(".KS") || input.ticker.includes(".KQ") ? "KR" : "US",
    stockCode: input.ticker.replace(/\.(KS|KQ|KRX)$/i, ""),
    sector: companyProfile?.sector ?? "상세 사업 정보 정리 중",
    isEtf: false,
    searchKeywords: companyProfile?.industryTags ?? [],
    lastUpdated: "2026-05-11",
    updateRule: "실적 발표, 공시, 월간 거래대금, 주요 뉴스가 바뀌면 업데이트합니다.",
    signalTags: ["최근 30일", "뉴스 언급", "섹터 흐름"],
    currentPrice: "MVP 예시 가격",
    changeRate: 0,
    marketCap: "데이터 확인 필요",
    per: "데이터 확인 필요",
    pbr: "데이터 확인 필요",
    eps: "데이터 확인 필요",
    roe: "데이터 확인 필요",
    week52High: "데이터 확인 필요",
    week52Low: "데이터 확인 필요",
    analysis: {
      ...baseAnalysis,
      business: companyProfile?.easyExplanation ?? baseAnalysis.business,
      revenue: companyProfile ? `${companyProfile.revenueSources.join(", ")} 방식으로 매출을 만듭니다.` : baseAnalysis.revenue
    },
    news: [news(`${input.name} 최근 30일 흐름 점검`, "중립")],
    companyProfile,
    ...input
  };
}

export const stocks: Stock[] = [
  stock({
    ticker: "005930.KS",
    name: "삼성전자",
    category: "최근 30일 주목 종목",
    status: "상승",
    interests: ["AI", "반도체"],
    aiBadge: "관망 구간",
    oneLine: "AI 메모리 기대와 가격 부담을 함께 봐야 하는 대표 기술주입니다.",
    whyNow: "AI 서버 확산과 HBM 경쟁력 회복 기대 때문에 최근 30일 동안 계속 언급됩니다.",
    riskNote: "HBM 공급 인증, 반도체 수율, 환율, 지정학 리스크, 노조 보상 갈등이 단기 변동성을 키울 수 있습니다.",
    news: [news("AI 메모리 수요 속 삼성전자 실적 기대 확대", "긍정")]
  }),
  stock({
    ticker: "000660.KS",
    name: "SK하이닉스",
    category: "최근 30일 주목 종목",
    status: "과열",
    interests: ["AI", "반도체"],
    aiBadge: "관망 구간",
    oneLine: "HBM 기대가 강하지만 기대가 높아진 만큼 흔들림도 같이 봐야 합니다.",
    whyNow: "HBM 시장 주도권과 AI 메모리 실적 기대 때문에 시장에서 가장 뜨거운 반도체주 중 하나입니다.",
    riskNote: "급등 후 기대가 높아진 상태라 실적이 좋아도 차익실현과 고객사 뉴스에 주가가 크게 흔들릴 수 있습니다.",
    news: [news("HBM 수요와 AI 메모리 사이클 점검", "중립")]
  }),
  stock({
    ticker: "000250.KQ",
    name: "삼천당제약",
    category: "과열 주의 종목",
    status: "과열",
    interests: ["의료", "바이오"],
    aiBadge: "과열 상태",
    oneLine: "뉴스와 기대에 따라 가격이 크게 움직일 수 있어 근거 확인이 먼저입니다.",
    whyNow: "바이오 계약과 변동성 이슈가 함께 언급되어 위험 신호를 설명하기 좋은 종목입니다.",
    riskNote: "계약 조건, 임상 단계, 기술이전 가능성, 공시 내용을 직접 확인해야 하며 추측성 뉴스에 민감합니다.",
    news: [news("삼천당제약 변동성 확대 이슈 점검", "부정")]
  }),
  stock({
    ticker: "041830.KQ",
    name: "인바디",
    category: "조용히 성장 중인 종목",
    status: "안정",
    interests: ["의료", "헬스케어"],
    aiBadge: "장기 보유형",
    oneLine: "체성분 분석이라는 명확한 제품을 가진 헬스케어 장비 회사입니다.",
    whyNow: "건강관리와 의료기기 수요가 꾸준해 조용히 공부해볼 만한 종목으로 분류했습니다.",
    riskNote: "성장 속도가 빠르지 않을 수 있고 해외 매출, 환율, 경쟁 제품을 함께 봐야 합니다.",
    news: [news("헬스케어 장비 수요와 인바디 흐름 점검", "중립")]
  }),
  stock({
    ticker: "054800.KQ",
    name: "아이디스",
    category: "실적은 괜찮지만 소외된 종목",
    status: "안정",
    interests: ["보안", "인프라"],
    aiBadge: "관망 구간",
    oneLine: "CCTV와 영상보안 장비를 만드는 비교적 이해하기 쉬운 회사입니다.",
    whyNow: "AI 보안과 영상 인프라 흐름 속에서 소외 실적형으로 공부해볼 수 있습니다.",
    riskNote: "시장 관심이 낮으면 실적이 좋아도 주가 반응이 느릴 수 있고 경쟁 강도도 확인해야 합니다.",
    news: [news("영상보안 장비 산업 흐름 점검", "중립")]
  }),
  stock({
    ticker: "310200.KQ",
    name: "애니플러스",
    category: "이번 달 흐름 종목",
    status: "조정",
    interests: ["콘텐츠", "애니"],
    aiBadge: "관망 구간",
    oneLine: "애니메이션과 콘텐츠 IP 흐름을 볼 때 참고할 수 있는 취향 기반 종목입니다.",
    whyNow: "콘텐츠와 팬덤 소비 흐름을 투자노트 관점에서 이해하기 좋은 예시입니다.",
    riskNote: "콘텐츠 흥행은 예측이 어렵고 특정 작품이나 IP에 기대가 몰리면 변동성이 커질 수 있습니다.",
    news: [news("콘텐츠 IP와 애니메이션 산업 흐름 점검", "중립")]
  })
];

export function getMockStock(ticker: string) {
  return stocks.find((stock) => stock.ticker === ticker || stock.stockCode === ticker.replace(/\.(KS|KQ|KRX)$/i, ""));
}

export function getStock(ticker: string) {
  const decoded = decodeURIComponent(ticker);
  return getMockStock(decoded);
}

export function createFallbackStock(
  ticker: string,
  query: { name?: string; sector?: string; product?: string; reason?: string }
): Stock {
  const decoded = decodeURIComponent(ticker);
  const code = decoded.replace(/\.(KS|KQ|KRX)$/i, "");
  const companyProfile = makeProfile({
    stockCode: code,
    companyName: query.name || decoded,
    market: decoded.includes(".KQ") ? "KOSDAQ" : decoded.includes(".KS") || decoded.includes(".KRX") ? "KOSPI" : "US",
    sector: query.sector || "상세 사업 정보 정리 중",
    businessSummary: query.product || "상세 사업 정보 정리 중",
    mainProducts: query.product ? [query.product] : ["정보 정리 중"],
    revenueSources: ["공개 자료 확인 후 정리 예정"],
    mainCustomers: ["확인 필요"],
    industryTags: [query.sector || "정보 정리 중"],
    easyExplanation: query.product || "이 회사의 상세 사업 정보는 아직 정리 중입니다.",
    dataSource: "mock",
    dataConfidence: "낮음"
  });

  return stock({
    ticker: decoded,
    name: query.name || decoded,
    stockCode: code,
    sector: query.sector,
    companyProfile,
    category: "상장사 검색 결과",
    status: "안정",
    interests: ["기타"],
    aiBadge: "관망 구간",
    oneLine: "기본 상장사 정보는 확인되었고, 상세 사업 정보는 정리 중입니다.",
    whyNow: query.reason || "검색한 종목의 기본 정보를 먼저 보여줍니다.",
    riskNote: "상세 사업 정보와 재무 데이터가 아직 부족하므로 확정적으로 판단하기 어렵습니다.",
    signalTags: ["상장사", "기본 정보", "정리 중"]
  });
}

export function getCompanyProfileByTicker(ticker: string) {
  return profiles[ticker] ?? profiles[ticker.replace(".KRX", ".KS")] ?? null;
}
