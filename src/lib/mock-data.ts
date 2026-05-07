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

const sampleMarketFields: Record<string, Partial<Stock>> = {
  "005930.KS": {
    currentPrice: "MVP 예시 가격 78,000원대",
    changeRate: 0.8,
    marketCap: "예시 시가총액 460조원대",
    per: "예시 PER 18배",
    pbr: "예시 PBR 1.4배",
    eps: "예시 EPS 4,300원대",
    roe: "예시 ROE 8%대",
    week52High: "예시 52주 고가 89,000원대",
    week52Low: "예시 52주 저가 55,000원대"
  },
  "000660.KS": {
    currentPrice: "MVP 예시 가격 217,500원대",
    changeRate: 2.1,
    marketCap: "예시 시가총액 158조원대",
    per: "예시 PER 12배",
    pbr: "예시 PBR 2.6배",
    eps: "예시 EPS 18,000원대",
    roe: "예시 ROE 22%대",
    week52High: "예시 52주 고가권",
    week52Low: "예시 52주 저가 120,000원대"
  },
  "000250.KQ": {
    currentPrice: "MVP 예시 가격 102,000원대",
    changeRate: -4.8,
    marketCap: "예시 시가총액 2조원대",
    per: "예시 PER 높음",
    pbr: "예시 PBR 7배대",
    eps: "예시 EPS 변동 큼",
    roe: "예시 ROE 확인 필요",
    week52High: "예시 52주 고가 180,000원대",
    week52Low: "예시 52주 저가 55,000원대"
  },
  "267260.KS": {
    currentPrice: "MVP 예시 가격 370,000원대",
    changeRate: 1.2,
    marketCap: "예시 시가총액 7조원대"
  },
  "041830.KQ": {
    currentPrice: "MVP 예시 가격 24,000원대",
    changeRate: -0.6,
    marketCap: "예시 시가총액 3,000억원대"
  },
  "310200.KQ": {
    currentPrice: "MVP 예시 가격 3,200원대",
    changeRate: 0.4,
    marketCap: "예시 시가총액 1,000억원대"
  }
};

function hashTicker(ticker: string) {
  return [...ticker].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function sampleFieldsForTicker(ticker: string): Partial<Stock> {
  const known = sampleMarketFields[ticker];
  if (known) return known;

  const hash = hashTicker(ticker);
  const isKr = ticker.includes(".") || /^\d{6}$/.test(ticker);
  const price = isKr ? 1000 + (hash % 180) * 850 : 8 + (hash % 240);
  const change = Number((((hash % 91) - 45) / 10).toFixed(1));

  return {
    currentPrice: isKr ? `MVP 예시 가격 ${price.toLocaleString()}원대` : `MVP 예시 가격 $${price}대`,
    changeRate: change,
    marketCap: "예시 시가총액: 실제 API 연결 후 갱신",
    per: "예시 PER: 실제 재무 API 연결 후 갱신",
    pbr: "예시 PBR: 실제 재무 API 연결 후 갱신",
    eps: "예시 EPS: 실제 재무 API 연결 후 갱신",
    roe: "예시 ROE: 실제 재무 API 연결 후 갱신",
    week52High: "예시 52주 고가: 실제 시세 API 연결 후 갱신",
    week52Low: "예시 52주 저가: 실제 시세 API 연결 후 갱신"
  };
}

function stock(input: Partial<Stock> & Pick<Stock, "ticker" | "name" | "whyNow" | "riskNote" | "category" | "status" | "interests" | "aiBadge" | "oneLine">): Stock {
  return {
    market: input.ticker.includes(".") ? "KR" : "US",
    lastUpdated: "2026-05-06",
    updateRule: "실적 발표, 공시, 주요 고객 뉴스, 월간 거래대금 변화가 생기면 업데이트",
    signalTags: ["최근 30일", "뉴스 언급", "섹터 흐름"],
    currentPrice: "MVP 예시 가격",
    changeRate: 0,
    marketCap: "MVP 예시 시가총액",
    per: "예시 PER",
    pbr: "예시 PBR",
    eps: "예시 EPS",
    roe: "예시 ROE",
    week52High: "예시 신고가권",
    week52Low: "예시 저가권",
    analysis: baseAnalysis,
    news: [news(`${input.name} 최근 30일 흐름 점검`, "중립")],
    ...sampleFieldsForTicker(input.ticker),
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

export function createFallbackStock(
  ticker: string,
  meta?: {
    name?: string;
    sector?: string;
    product?: string;
    reason?: string;
  }
): Stock {
  const decodedTicker = decodeURIComponent(ticker);
  const name = meta?.name?.trim() || decodedTicker;
  const sector = meta?.sector?.trim() || "KRX 검색 종목";
  const product = meta?.product?.trim();
  const reason = meta?.reason?.trim() || (product ? `주요제품: ${product}` : "검색에서 선택한 종목입니다. 아직 실제 상세 API가 연결되지 않아 기본 해석 템플릿으로 보여줍니다.");
  const businessLine = product
    ? `${name}은 KRX 기본정보 기준으로 ${product}와 관련된 사업을 하는 회사로 볼 수 있어요. 정확한 사업 비중은 사업보고서에서 확인해야 합니다.`
    : `${name}은 ${sector}에 속한 상장회사입니다. 먼저 업종, 주요 제품, 매출처를 확인하면 회사 이해가 쉬워집니다.`;
  const revenueLine = product
    ? `주요 제품이나 서비스가 실제 매출로 얼마나 이어지는지, 특정 고객이나 한 제품에 매출이 몰려 있는지 확인해야 합니다.`
    : `매출 구조는 제품 판매, 서비스, 수주, 플랫폼, 수수료 등 업종마다 다르므로 사업보고서의 매출 구성을 먼저 봐야 합니다.`;
  const riskLine = `${sector} 업종은 경기, 원가, 환율, 수요 변화, 규제나 공시 이슈에 따라 평가가 달라질 수 있어요. 검색 종목은 아직 세부 재무 API가 연결되지 않아 숫자 해석은 보수적으로 봐야 합니다.`;

  return stock({
    ticker: decodedTicker,
    name,
    category: sector,
    status: "안정",
    interests: ["기타"],
    aiBadge: "관망 구간",
    oneLine: `${sector} 흐름과 회사의 실제 매출 구조를 함께 확인해야 하는 검색 종목입니다.`,
    whyNow: reason,
    riskNote: riskLine,
    updateRule: "실제 API 연결 후 시세, 재무, 공시, 뉴스 기준으로 자동 업데이트",
    marketCap: "시가총액 확인 중: 시세 API 응답 시 자동 표시",
    per: "PER 확인 필요: 재무 API 연결 후 표시",
    pbr: "PBR 확인 필요: 재무 API 연결 후 표시",
    eps: "EPS 확인 필요: 재무 API 연결 후 표시",
    roe: "ROE 확인 필요: 재무 API 연결 후 표시",
    analysis: {
      business: businessLine,
      revenue: revenueLine,
      earnings: "최근 실적은 매출 증가율, 영업이익률, 일회성 비용 여부를 나눠서 봐야 합니다. MVP에서는 DART/FnGuide 연결 전이라 방향성 설명 중심으로 제공합니다.",
      valuation: "현재 주가가 비싼지 싼지는 시가총액, 이익 규모, 같은 업종 기업의 PER/PBR을 함께 비교해야 합니다. 시가총액은 가능한 경우 지연 시세 API로 표시합니다.",
      trend: "단기 등락보다 최근 30일 흐름, 거래량 변화, 공시나 뉴스가 동반됐는지를 먼저 보는 것이 좋습니다.",
      buyNow: "참고용 해석 기준으로는 바로 판단하기보다 회사가 뭘 팔고, 실적이 유지되는지, 가격 부담이 있는지를 순서대로 확인하는 편이 안전합니다.",
      longTerm: "장기 보유 가능성은 이 회사의 제품이나 서비스가 앞으로도 필요한지, 이익을 꾸준히 낼 수 있는지에 달려 있습니다.",
      risks: riskLine,
      peers: "같은 업종의 대표 기업, 시가총액이 비슷한 기업, 제품이 겹치는 기업과 비교하면 상대적인 위치를 보기 좋습니다."
    },
    news: [news(`${name} 기본 정보 확인 필요`, "중립")]
  });
}
