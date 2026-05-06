import type { Stock } from "@/types";

export const marketContext = {
  lastUpdated: "2026-05-06",
  headline: "최근 30일 기준으로 AI 반도체, 전력 인프라, 로봇, 바이오 흐름이 번갈아 주목받고 있어요.",
  sourceNotes: [
    "이 피드는 실시간 급등주가 아니라 최근 30일 흐름, 거래대금 변화, 뉴스 언급량, 섹터 확산을 기준으로 구성한 MVP 예시입니다.",
    "실제 배포 전에는 KRX 시세, DART 공시, 뉴스 API, ETF 구성 데이터로 매일 갱신하는 구조를 권장합니다.",
    "현재 가격과 등락률은 실제 시세가 아닌 MVP 예시 데이터입니다."
  ],
  updatePolicy: "장 시작 전 후보 생성, 장중 주요 뉴스 확인, 장 마감 후 공시와 월간 흐름을 반영하는 방식으로 확장할 수 있습니다."
};

const baseAnalysis = {
  business: "회사가 무엇을 만들고 어떤 고객에게 필요한지 먼저 이해하는 것이 핵심입니다.",
  revenue: "매출은 제품 판매, 서비스, 구독, 수수료, 라이선스 등 회사마다 다른 방식으로 발생합니다.",
  earnings: "최근 실적 흐름은 매출 성장, 이익률, 비용 증가 여부를 함께 봐야 합니다.",
  valuation: "현재 가격이 싸거나 비싸다고 단정하지 않고, 기대가 얼마나 반영됐는지 봅니다.",
  trend: "주가 흐름은 상승, 횡보, 하락을 나눠 보되 단기 소음보다 30일 흐름을 우선합니다.",
  buyNow: "참고용 분석 기준으로는 한 번에 결정하기보다 실적, 뉴스, 가격 부담을 확인하며 분할 접근이 더 편안합니다.",
  longTerm: "장기 보유는 산업 필요성, 현금창출력, 경쟁력 유지 여부가 중요합니다.",
  risks: "실적 기대가 이미 가격에 반영됐거나 뉴스 하나로 변동성이 커질 수 있습니다.",
  peers: "비슷한 기업과 비교하면 이 회사가 비싼지, 성장성이 더 좋은지 보기 쉽습니다."
};

function news(title: string, sentiment: "긍정" | "부정" | "중립") {
  return {
    title,
    source: "Market Context Mock",
    url: "https://dart.fss.or.kr/",
    sentiment,
    summary: ["MVP 예시 뉴스 요약입니다.", "실제 배포 시 기사 본문을 복제하지 않고 출처 링크와 자체 요약만 표시합니다.", "투자 판단은 참고용 해석으로만 봐야 합니다."]
  };
}

function stock(input: Partial<Stock> & Pick<Stock, "ticker" | "name" | "whyNow" | "riskNote" | "category" | "status" | "interests" | "aiBadge" | "oneLine">): Stock {
  return {
    market: input.ticker.includes(".") ? "KR" : "US",
    lastUpdated: "2026-05-06",
    updateRule: "실적 발표, 공시, 주요 고객 뉴스, 월간 거래대금 변화가 생기면 업데이트",
    signalTags: ["최근 30일", "뉴스 언급", "섹터 흐름"],
    currentPrice: "예시 현재가 217,500원대",
    changeRate: 1.4,
    marketCap: "MVP 예시 시가총액",
    per: "예시 PER",
    pbr: "예시 PBR",
    eps: "예시 EPS",
    roe: "예시 ROE",
    week52High: "예시 신고가권",
    week52Low: "예시 저가권",
    analysis: baseAnalysis,
    news: [news(`${input.name} 최근 30일 흐름 점검`, "중립")],
    ...input
  };
}

export const stocks: Stock[] = [
  stock({
    ticker: "005930.KS",
    name: "삼성전자",
    category: "최근 30일 주목 종목",
    status: "상승",
    interests: ["AI", "기타"],
    aiBadge: "관망 구간",
    oneLine: "AI 메모리 기대가 강하지만 가격에는 일부 기대가 반영된 구간입니다.",
    whyNow: "AI 서버 확산과 HBM 경쟁력 회복 기대 때문에 한국 반도체 대표주로 계속 언급됩니다.",
    riskNote: "HBM 공급 인증, 수율 개선, 고객사 확대가 실제 실적으로 이어지는지 확인해야 합니다. 노조 보상 갈등, 환율, 미중 반도체 규제, 지정학 리스크도 단기 변동성을 키울 수 있어요.",
    news: [news("AI 메모리 수요 속 삼성전자 실적 기대 확대", "긍정")]
  }),
  stock({
    ticker: "000660.KS",
    name: "SK하이닉스",
    category: "최근 30일 주목 종목",
    status: "과열",
    interests: ["AI", "기타"],
    aiBadge: "관망 구간",
    oneLine: "좋은 회사 이야기와 비싼 주가 이야기를 동시에 봐야 하는 AI 메모리 대표주예요.",
    whyNow: "HBM 시장 주도권과 AI 메모리 실적 기대 때문에 시장에서 가장 뜨거운 반도체주 중 하나예요.",
    riskNote: "급등 후 기대가 높아진 상태라 실적이 좋아도 주가가 흔들릴 수 있어요. HBM 점유율, 고객사 공급 일정, 설비투자 부담, 메모리 가격 사이클을 함께 봐야 합니다.",
    news: [news("HBM 수요와 AI 메모리 사이클 점검", "중립")]
  }),
  stock({
    ticker: "000250.KQ",
    name: "삼천당제약",
    category: "과열 주의 종목",
    status: "과열",
    interests: ["의료", "기타"],
    aiBadge: "과열 상태",
    oneLine: "뉴스와 논란에 따라 가격이 크게 움직일 수 있어 검증이 먼저 필요한 종목입니다.",
    whyNow: "바이오 계약, 특허, IR 관련 이슈가 주가 변동성을 크게 만들며 위험 신호를 설명하기 좋은 사례입니다.",
    riskNote: "바이오 종목은 공시 해석이 어렵고 기대가 가격에 먼저 반영되는 경우가 많습니다. 계약 조건, 임상 단계, 기술 이전 실현 가능성, 지분 변동을 직접 확인해야 합니다.",
    news: [news("삼천당제약 변동성 확대 이슈 점검", "부정")]
  }),
  stock({
    ticker: "267260.KS",
    name: "HD현대일렉트릭",
    category: "이번 달 흐름 종목",
    status: "상승",
    interests: ["AI", "기타"],
    aiBadge: "장기 보유형",
    oneLine: "AI 데이터센터와 전력 인프라 투자 흐름을 함께 보는 종목입니다.",
    whyNow: "AI 데이터센터가 늘면서 변압기와 전력 설비 수요가 부각되고 있습니다.",
    riskNote: "이미 많이 오른 구간에서는 수주 기대가 실적으로 이어지는 속도와 원가 부담을 확인해야 합니다.",
    news: [news("전력 인프라 투자 흐름 확대", "긍정")]
  }),
  stock({
    ticker: "041830.KQ",
    name: "인바디",
    category: "월간 관심 종목",
    status: "안정",
    interests: ["의료", "기타"],
    aiBadge: "장기 보유형",
    oneLine: "헬스케어와 의료기기 소비를 차분히 공부하기 좋은 종목입니다.",
    whyNow: "건강관리, 피트니스, 고령화 흐름과 연결해 회사 이해를 해볼 만합니다.",
    riskNote: "성장 속도가 빠르지 않으면 주가가 오래 쉬어갈 수 있어 해외 매출과 신제품 흐름을 봐야 합니다.",
    news: [news("의료기기와 건강관리 수요 점검", "중립")]
  }),
  stock({
    ticker: "310200.KQ",
    name: "애니플러스",
    category: "월간 관심 종목",
    status: "조정",
    interests: ["애니", "콘텐츠"],
    aiBadge: "관망 구간",
    oneLine: "좋아하는 콘텐츠와 투자 판단을 분리해서 기록하기 좋은 취향주입니다.",
    whyNow: "애니, 굿즈, 팬덤 소비 흐름과 연결되어 취향 기반 투자 기록에 적합합니다.",
    riskNote: "콘텐츠주는 흥행과 IP 가치에 따라 실적 변동이 생길 수 있어 매출 안정성과 비용 구조를 확인해야 합니다.",
    news: [news("콘텐츠 IP 소비 흐름 점검", "중립")]
  })
];

export const marketSummary = "최근 30일 동안 AI 반도체와 전력 인프라가 강했고, 바이오와 콘텐츠는 뉴스에 따라 변동성이 커졌습니다.";

export function getStock(ticker: string) {
  const decoded = decodeURIComponent(ticker);
  return stocks.find((stock) => stock.ticker === decoded);
}
