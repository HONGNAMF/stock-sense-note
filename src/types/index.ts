export type RiskProfile = "안정형" | "성장형" | "테마형" | "취향형";
export type Volatility = "낮음" | "중간" | "높음";
export type Horizon = "단기" | "중기" | "장기";
export type NewsFrequency = "거의 안 봄" | "가끔" | "자주";
export type LossTolerance = "-5%" | "-10%" | "-20%" | "상관없음";
export type Interest =
  | "음악"
  | "영화"
  | "애니"
  | "게임"
  | "콘텐츠"
  | "커뮤니티"
  | "AI"
  | "의료"
  | "반도체"
  | "ETF"
  | "기타";

export type UserProfile = {
  name: string;
  volatility: Volatility;
  horizon: Horizon;
  newsFrequency: NewsFrequency;
  interests: Interest[];
  lossTolerance: LossTolerance;
  riskProfile: RiskProfile;
};

export type StockStatus = "상승" | "조정" | "과열" | "안정";
export type WatchTag = "공부중" | "장기보유" | "고위험" | "취향주";
export type Sentiment = "긍정" | "부정" | "중립";
export type Market = "KR" | "US";

export type NewsItem = {
  title: string;
  source: string;
  url: string;
  summary: string[];
  sentiment: Sentiment;
};

export type CompanyProfile = {
  id: string;
  stockId: string;
  stockCode: string;
  companyName: string;
  market: string;
  sector: string;
  businessSummary: string;
  mainProducts: string[];
  revenueSources: string[];
  mainCustomers: string[];
  industryTags: string[];
  easyExplanation: string;
  dataSource: "KRX" | "DART" | "manual" | "AI summary" | "mock";
  dataConfidence: "높음" | "보통" | "낮음";
  lastUpdatedAt: string;
};

export type ListedCompany = {
  stockCode: string;
  companyName: string;
  market: "KOSPI" | "KOSDAQ" | "KONEX" | "US" | "ETF";
  sector: string;
  isEtf: boolean;
  searchKeywords: string[];
};

export type Stock = {
  ticker: string;
  name: string;
  market: Market;
  stockCode?: string;
  sector?: string;
  isEtf?: boolean;
  searchKeywords?: string[];
  lastUpdated: string;
  whyNow: string;
  riskNote: string;
  updateRule: string;
  signalTags: string[];
  currentPrice: string;
  changeRate: number;
  marketCap: string;
  per: string;
  pbr: string;
  eps: string;
  roe: string;
  week52High: string;
  week52Low: string;
  status: StockStatus;
  category: string;
  interests: string[];
  aiBadge: "관망 구간" | "분할 매수 가능" | "과열 상태" | "장기 보유형";
  oneLine: string;
  companyProfile?: CompanyProfile;
  analysis: {
    business: string;
    revenue: string;
    earnings: string;
    valuation: string;
    trend: string;
    buyNow: string;
    longTerm: string;
    risks: string;
    peers: string;
  };
  news: NewsItem[];
};

export type StockNote = {
  ticker: string;
  reason: string;
  targetBuyPrice: string;
  stopLoss: string;
  feeling: string;
  updatedAt: string;
};
