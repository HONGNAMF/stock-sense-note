export type PopularStock = {
  rank: number;
  name: string;
  ticker: string;
  sector: string;
  reason: string;
  risk: "낮음" | "중간" | "높음";
};

const groups = [
  {
    sector: "AI 반도체",
    reason: "AI 서버, HBM, 반도체 투자 사이클",
    names: [["삼성전자", "005930.KS"], ["SK하이닉스", "000660.KS"], ["한미반도체", "042700.KS"], ["ISC", "095340.KQ"], ["리노공업", "058470.KQ"]]
  },
  {
    sector: "전력·인프라",
    reason: "AI 데이터센터와 전력망 투자 확대",
    names: [["HD현대일렉트릭", "267260.KS"], ["LS ELECTRIC", "010120.KS"], ["한국전력", "015760.KS"], ["일진전기", "103590.KS"], ["LS", "006260.KS"]]
  },
  {
    sector: "바이오·헬스케어",
    reason: "임상, 기술이전, 헬스케어 수요",
    names: [["삼천당제약", "000250.KQ"], ["셀트리온", "068270.KS"], ["삼성바이오로직스", "207940.KS"], ["인바디", "041830.KQ"], ["유한양행", "000100.KS"]]
  },
  {
    sector: "로봇·AI 서비스",
    reason: "AI가 로봇과 자동화 소프트웨어로 확산",
    names: [["로보티즈", "108490.KQ"], ["두산로보틱스", "454910.KS"], ["NAVER", "035420.KS"], ["카카오", "035720.KS"], ["크래프톤", "259960.KS"]]
  },
  {
    sector: "콘텐츠·소비",
    reason: "IP, 팬덤, 브랜드 소비 흐름",
    names: [["애니플러스", "310200.KQ"], ["하이브", "352820.KS"], ["JYP Ent.", "035900.KQ"], ["CJ ENM", "035760.KQ"], ["BGF리테일", "282330.KS"]]
  },
  {
    sector: "해외 플랫폼",
    reason: "글로벌 플랫폼, 광고, 구독, 커뮤니티 성장",
    names: [["Spotify", "SPOT"], ["Pinterest", "PINS"], ["Roblox", "RBLX"], ["Duolingo", "DUOL"], ["Reddit", "RDDT"]]
  }
];

export const popularStocks: PopularStock[] = groups.flatMap((group, groupIndex) =>
  group.names.map(([name, ticker], index) => ({
    rank: groupIndex * 10 + index + 1,
    name,
    ticker,
    sector: group.sector,
    reason: group.reason,
    risk: group.sector.includes("바이오") ? "높음" : group.sector.includes("AI") ? "중간" : "중간"
  }))
);

export const popularStockUpdateGuide =
  "실시간 급등주가 아니라 최근 30일 뉴스 언급, 거래대금 변화, 실적 기대, 섹터 흐름을 기준으로 교체하는 시장 피드입니다.";
