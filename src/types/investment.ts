export type ViewMode = "simple" | "standard" | "detailed";
export type RiskLevel = "낮음" | "중간" | "높음";
export type HeartRating = 1 | 2 | 3;
export type AssetKind = "stock" | "etf";

export type InvestmentProfile = {
  riskLevel: RiskLevel;
  investmentPeriod: "단기" | "중기" | "장기";
  informationStyle: "쉬운 설명 선호" | "숫자 해석 선호" | "뉴스 흐름 선호" | "회사 사업 이해 선호";
  interestStyle: "취향 기반" | "실적 기반" | "가격 기반" | "테마/뉴스 기반" | "ETF 기반";
  buyStyle: "신중형" | "균형형" | "적극형";
  reviewStyle: "기록 낮음" | "기록 보통" | "기록 높음";
  resultSummary: string;
  traits: string[];
  cautions: string[];
  usageTips: string[];
  createdAt: string;
  updatedAt: string;
};

export type InvestmentPreferences = {
  preferredMarket: "국내주식" | "해외주식" | "ETF" | "전부 보기";
  preferredPriceRange: "1만원 이하" | "1만원 ~ 5만원" | "5만원 ~ 10만원" | "10만원 이상도 괜찮음" | "가격 상관없음";
  preferredSize: "대형주 위주" | "중소형주도 괜찮음" | "소외주도 보고 싶음" | "잘 모르겠음";
  preferredRisk: "낮은 리스크" | "중간 리스크" | "성장 가능성이 있으면 높은 리스크도 가능";
  preferredApproach: "안정적으로 오래 보기" | "성장 가능성 보기" | "내가 좋아하는 분야 위주로 보기" | "ETF로 분산해서 보기" | "저평가/소외주 찾기";
};

export type RecommendedItemRecord = {
  id: string;
  localUserId: string;
  stockId: string;
  reason: string;
  category: string;
  riskLevel: RiskLevel;
  wasSaved: boolean;
  createdAt: string;
};

export type LocalProfile = {
  localUserId: string;
  nickname: string;
  name?: string;
  profileImageUrl?: string;
  interests: string[];
  watchSymbols: string[];
  investorSummary?: string;
  investmentProfile?: InvestmentProfile;
  preferences?: InvestmentPreferences;
  viewMode: ViewMode;
  onboardingCompleted: boolean;
  isGuest?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserSettings = {
  viewMode: ViewMode;
  defaultBrokerDomestic: string;
  defaultBrokerOverseas: string;
  defaultBrokerEtf: string;
};

export type ReflectionRecord = {
  assetKey: string;
  assetKind: AssetKind;
  heartRating: HeartRating;
  reasonWatching: string;
  reasonNotBuying: string;
  buyIntention: "없음" | "고민 중" | "매수 생각 있음";
  sellStandard: "바로 매도할 것 같음" | "상황 보고 판단" | "장기 보유 가능";
  createdAt: string;
};

export type TradeRecord = {
  id: string;
  assetKey: string;
  assetName: string;
  assetKind: AssetKind;
  tradeType: "매수" | "매도";
  tradeDate: string;
  price: string;
  quantity: string;
  reason: string;
  emotion: string;
  heartRating: HeartRating;
  riskJudgement: RiskLevel;
  aiOneLine: string;
  createdAt: string;
};

export type GlossaryTerm = {
  term: string;
  oneLine: string;
  simple: string;
  caution: string;
  related: string[];
};

export type Etf = {
  symbol: string;
  name: string;
  market: "KR" | "US";
  issuer: string;
  expenseRatio: string;
  currentPrice: string;
  changeRate: string;
  status: string;
  recentReturn: string;
  dividend: string;
  character: "안정형" | "성장형" | "테마형" | "배당형" | "방어형" | "지수형";
  risk: RiskLevel;
  oneLine: string;
  easyExplanation: string;
  holdings: Array<{ name: string; symbol: string; weight: number }>;
  sectors: Array<{ name: string; weight: number }>;
  countries: Array<{ name: string; weight: number }>;
  chart: Array<{ label: string; value: number }>;
  comparison: string;
  risks: string[];
  news: Array<{ title: string; source: string; url: string; summary: string[]; sentiment: "긍정" | "중립" | "부정" }>;
};
