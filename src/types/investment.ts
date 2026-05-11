export type ViewMode = "simple" | "standard" | "detailed";
export type RiskLevel = "낮음" | "중간" | "높음";
export type HeartRating = 1 | 2 | 3;
export type AssetKind = "stock" | "etf";

export type LocalProfile = {
  localUserId: string;
  nickname: string;
  name?: string;
  profileImageUrl?: string;
  interests: string[];
  watchSymbols: string[];
  investorSummary?: string;
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
  recentReturn: string;
  dividend: string;
  character: "안정형" | "성장형" | "테마형" | "배당형" | "방어형" | "지수형";
  risk: RiskLevel;
  oneLine: string;
  easyExplanation: string;
  holdings: Array<{ name: string; symbol: string; weight: number }>;
  sectors: Array<{ name: string; weight: number }>;
  countries: Array<{ name: string; weight: number }>;
  comparison: string;
  risks: string[];
  news: Array<{ title: string; source: string; url: string; summary: string[]; sentiment: "긍정" | "중립" | "부정" }>;
};
