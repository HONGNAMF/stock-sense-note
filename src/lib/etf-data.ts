import type { Etf } from "@/types/investment";

const usTechHoldings = [
  { name: "NVIDIA", symbol: "NVDA", weight: 9.8 },
  { name: "Microsoft", symbol: "MSFT", weight: 8.7 },
  { name: "Apple", symbol: "AAPL", weight: 7.9 },
  { name: "Amazon", symbol: "AMZN", weight: 5.2 },
  { name: "Meta", symbol: "META", weight: 4.8 }
];

function makeEtf(
  symbol: string,
  name: string,
  market: "KR" | "US",
  issuer: string,
  character: Etf["character"],
  risk: Etf["risk"],
  oneLine: string
): Etf {
  const isDividend = character === "배당형";
  const isTheme = character === "테마형";
  return {
    symbol,
    name,
    market,
    issuer,
    expenseRatio: market === "KR" ? "연 0.05%~0.45%대" : "연 0.03%~0.35%대",
    recentReturn: isTheme ? "+8.4% / 최근 1개월" : isDividend ? "+2.1% / 최근 1개월" : "+4.3% / 최근 1개월",
    dividend: isDividend ? "배당 있음" : "상품별 상이",
    character,
    risk,
    oneLine,
    easyExplanation:
      character === "지수형"
        ? "시장 전체를 작게 나눠 담는 방식이라 개별 종목보다 이해하기 쉽습니다."
        : character === "배당형"
          ? "가격 상승보다 현금흐름과 꾸준함을 더 중요하게 보는 ETF입니다."
          : character === "테마형"
            ? "특정 산업 흐름에 집중해서 수익 기회와 변동성이 함께 커질 수 있습니다."
            : "여러 종목을 묶어서 한 번에 투자하는 바구니입니다.",
    holdings: isTheme
      ? [
          { name: "SK하이닉스", symbol: "000660", weight: 18.5 },
          { name: "삼성전자", symbol: "005930", weight: 17.2 },
          { name: "한미반도체", symbol: "042700", weight: 8.5 },
          { name: "ISC", symbol: "095340", weight: 6.3 },
          { name: "리노공업", symbol: "058470", weight: 4.9 }
        ]
      : usTechHoldings,
    sectors: [
      { name: character === "배당형" ? "금융" : character === "테마형" ? "반도체/로봇" : "기술", weight: 42 },
      { name: "소비재", weight: 18 },
      { name: "헬스케어", weight: 14 },
      { name: "산업재", weight: 12 },
      { name: "기타", weight: 14 }
    ],
    countries: market === "KR" ? [{ name: "한국", weight: 100 }] : [{ name: "미국", weight: 92 }, { name: "기타", weight: 8 }],
    comparison: "ETF는 개별주보다 한 회사 리스크가 낮지만, 내가 정확히 무엇을 담고 있는지는 구성 종목을 봐야 합니다.",
    risks: [
      "구성 종목이 특정 섹터에 몰려 있으면 ETF라도 변동성이 커질 수 있습니다.",
      "환율, 보수, 추적오차가 실제 체감 수익률에 영향을 줍니다.",
      "테마형 ETF는 유행이 식으면 긴 조정을 받을 수 있습니다."
    ],
    news: [
      {
        title: `${name}, 최근 30일 흐름 점검`,
        source: "Mock ETF Brief",
        url: "https://example.com/etf-brief",
        summary: "최근 ETF 흐름은 구성 섹터와 환율, 시장 금리 변화가 함께 영향을 줬습니다.",
        sentiment: "중립"
      }
    ]
  };
}

export const etfs: Etf[] = [
  makeEtf("069500.KS", "KODEX 200", "KR", "삼성자산운용", "지수형", "낮음", "한국 대표 대형주 흐름을 한 번에 보는 ETF입니다."),
  makeEtf("360750.KS", "TIGER 미국S&P500", "KR", "미래에셋자산운용", "지수형", "중간", "미국 대표 기업 500개 흐름을 원화로 볼 수 있습니다."),
  makeEtf("133690.KS", "TIGER 미국나스닥100", "KR", "미래에셋자산운용", "성장형", "중간", "미국 기술주 성장 흐름을 담은 ETF입니다."),
  makeEtf("091160.KS", "KODEX 반도체", "KR", "삼성자산운용", "테마형", "높음", "국내 반도체 업황을 집중해서 보는 ETF입니다."),
  makeEtf("396500.KS", "TIGER 반도체TOP10", "KR", "미래에셋자산운용", "테마형", "높음", "국내 반도체 핵심 종목 비중이 높은 ETF입니다."),
  makeEtf("402970.KS", "ACE 미국배당다우존스", "KR", "한국투자신탁운용", "배당형", "중간", "미국 배당주를 꾸준히 모아가는 성격입니다."),
  makeEtf("458730.KS", "TIGER 미국배당다우존스", "KR", "미래에셋자산운용", "배당형", "중간", "배당과 장기 보유를 함께 보는 ETF입니다."),
  makeEtf("462900.KS", "TIGER 코리아휴머노이드로봇산업", "KR", "미래에셋자산운용", "테마형", "높음", "로봇과 피지컬 AI 기대를 담은 테마 ETF입니다."),
  makeEtf("VOO", "VOO", "US", "Vanguard", "지수형", "중간", "미국 S&P500을 낮은 보수로 추종하는 대표 ETF입니다."),
  makeEtf("VTI", "VTI", "US", "Vanguard", "지수형", "중간", "미국 전체 주식시장에 넓게 투자하는 ETF입니다."),
  makeEtf("QQQ", "QQQ", "US", "Invesco", "성장형", "중간", "나스닥 대형 기술주의 성장 흐름을 봅니다."),
  makeEtf("SCHD", "SCHD", "US", "Schwab", "배당형", "중간", "배당 성장과 현금흐름을 중시하는 ETF입니다."),
  makeEtf("SMH", "SMH", "US", "VanEck", "테마형", "높음", "글로벌 반도체 대표 기업에 집중합니다."),
  makeEtf("BOTZ", "BOTZ", "US", "Global X", "테마형", "높음", "로봇과 자동화 산업을 담은 ETF입니다."),
  makeEtf("IHI", "IHI", "US", "iShares", "방어형", "중간", "미국 의료기기 산업에 투자합니다."),
  makeEtf("GLD", "GLD", "US", "SPDR", "방어형", "중간", "금 가격 흐름을 추종하는 방어 자산 ETF입니다.")
];

export function getEtf(symbol: string) {
  return etfs.find((etf) => etf.symbol === decodeURIComponent(symbol));
}
