import type { Etf } from "@/types/investment";

const usTechHoldings = [
  { name: "NVIDIA", symbol: "NVDA", weight: 9.8 },
  { name: "Microsoft", symbol: "MSFT", weight: 8.7 },
  { name: "Apple", symbol: "AAPL", weight: 7.9 },
  { name: "Amazon", symbol: "AMZN", weight: 5.2 },
  { name: "Meta", symbol: "META", weight: 4.8 }
];

function makeEtf(symbol: string, name: string, market: "KR" | "US", issuer: string, character: Etf["character"], risk: Etf["risk"], oneLine: string): Etf {
  const isDividend = character === "배당형";
  const isTheme = character === "테마형";
  return {
    symbol,
    name,
    market,
    issuer,
    expenseRatio: market === "KR" ? "약 0.05%~0.45%" : "약 0.03%~0.35%",
    recentReturn: isTheme ? "+8.4% / 최근 1개월" : isDividend ? "+2.1% / 최근 1개월" : "+4.3% / 최근 1개월",
    dividend: isDividend ? "배당 있음" : "상품별 상이",
    character,
    risk,
    oneLine,
    easyExplanation: "ETF는 여러 종목을 한 바구니에 담아 한 번에 분산해서 보는 상품입니다. 개별주보다 덜 흔들릴 수 있지만, 담긴 산업이 함께 흔들리면 ETF도 하락할 수 있습니다.",
    holdings: usTechHoldings,
    sectors: [
      { name: "기술", weight: 42 },
      { name: "헬스케어", weight: 16 },
      { name: "금융", weight: 14 },
      { name: "소비", weight: 12 }
    ],
    countries: [
      { name: market === "KR" ? "한국" : "미국", weight: 82 },
      { name: "기타", weight: 18 }
    ],
    comparison: "ETF는 개별주보다 회사 하나의 리스크는 낮지만, 수익률도 특정 종목 급등만큼 크지 않을 수 있습니다.",
    risks: ["구성 종목이 비슷하면 분산 효과가 약해질 수 있습니다.", "테마 ETF는 유행이 꺾이면 함께 조정받을 수 있습니다.", "환율과 보수도 실제 수익률에 영향을 줍니다."],
    news: [
      { title: "월간 ETF 자금 흐름 점검", source: "Market Context Mock", url: "https://www.krx.co.kr/", summary: "MVP 예시 뉴스입니다. 실제 배포 시 원문을 복제하지 않고 링크와 자체 요약만 표시합니다.", sentiment: "중립" }
    ]
  };
}

export const etfs: Etf[] = [
  makeEtf("069500.KS", "KODEX 200", "KR", "삼성자산운용", "지수형", "낮음", "한국 대표 대형주를 넓게 담는 기본형 ETF입니다."),
  makeEtf("360750.KS", "TIGER 미국S&P500", "KR", "미래에셋자산운용", "지수형", "낮음", "미국 대표 500개 기업에 분산 투자하는 ETF입니다."),
  makeEtf("133690.KS", "TIGER 미국나스닥100", "KR", "미래에셋자산운용", "성장형", "중간", "미국 기술 성장주 비중이 높은 ETF입니다."),
  makeEtf("091160.KS", "KODEX 반도체", "KR", "삼성자산운용", "테마형", "중간", "국내 반도체 밸류체인을 묶어서 보는 ETF입니다."),
  makeEtf("396500.KS", "TIGER 반도체TOP10", "KR", "미래에셋자산운용", "테마형", "중간", "국내 반도체 주요 종목을 집중해서 담는 ETF입니다."),
  makeEtf("402970.KS", "ACE 미국배당다우존스", "KR", "한국투자신탁운용", "배당형", "낮음", "미국 배당 성장주를 중심으로 보는 ETF입니다."),
  makeEtf("458730.KS", "TIGER 미국배당다우존스", "KR", "미래에셋자산운용", "배당형", "낮음", "미국 배당주 흐름을 국내 상장 상품으로 보는 ETF입니다."),
  makeEtf("465350.KS", "TIGER 코리아휴머노이드로봇산업", "KR", "미래에셋자산운용", "테마형", "높음", "로봇 산업 기대를 담은 테마형 ETF입니다."),
  makeEtf("VOO", "VOO", "US", "Vanguard", "지수형", "낮음", "미국 S&P500을 낮은 보수로 따라가는 대표 ETF입니다."),
  makeEtf("VTI", "VTI", "US", "Vanguard", "지수형", "낮음", "미국 전체 주식시장에 넓게 분산하는 ETF입니다."),
  makeEtf("QQQ", "QQQ", "US", "Invesco", "성장형", "중간", "나스닥 100 중심의 기술 성장 ETF입니다."),
  makeEtf("SCHD", "SCHD", "US", "Schwab", "배당형", "낮음", "배당과 현금흐름을 중시하는 미국 ETF입니다."),
  makeEtf("SMH", "SMH", "US", "VanEck", "테마형", "중간", "글로벌 반도체 대표 기업을 담는 ETF입니다."),
  makeEtf("BOTZ", "BOTZ", "US", "Global X", "테마형", "높음", "로봇과 자동화 산업을 보는 테마 ETF입니다."),
  makeEtf("IHI", "IHI", "US", "iShares", "방어형", "중간", "미국 의료기기 기업을 담는 헬스케어 ETF입니다."),
  makeEtf("GLD", "GLD", "US", "State Street", "방어형", "중간", "금 가격 흐름을 따라가는 방어형 자산 ETF입니다.")
];

export function getEtf(symbol: string) {
  const decoded = decodeURIComponent(symbol);
  return etfs.find((etf) => etf.symbol === decoded);
}

export function createFallbackEtf(
  symbol: string,
  meta?: {
    name?: string;
    issuer?: string;
    character?: Etf["character"];
  }
): Etf {
  const decoded = decodeURIComponent(symbol);
  return makeEtf(
    decoded,
    meta?.name?.trim() || decoded,
    decoded.includes(".KS") || /^\d{6}$/.test(decoded) ? "KR" : "US",
    meta?.issuer?.trim() || "운용사 확인 필요",
    meta?.character || "지수형",
    "중간",
    "KRX ETF 검색에서 선택한 상품입니다. 실제 구성 종목과 수익률 API 연결 전까지는 기본 해석 템플릿으로 보여줍니다."
  );
}
