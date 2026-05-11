export type YearlyMetric = {
  year: number;
  marketCap: string;
  revenue: string;
  operatingProfit: string;
  per: string;
  pbr: string;
  roe: string;
  priceIndex: number;
  note: string;
};

export type VolatilityEvent = {
  period: string;
  title: string;
  explanation: string;
  impact: "상승" | "하락" | "중립";
};

const profiles: Record<string, { baseCap: number; sector: string; events: VolatilityEvent[] }> = {
  "005930.KS": {
    baseCap: 310,
    sector: "반도체 대형주",
    events: [
      { period: "2018-2019", title: "메모리 다운사이클", explanation: "DRAM 가격 하락으로 이익 기대가 낮아지며 주가가 흔들렸습니다.", impact: "하락" },
      { period: "2020-2021", title: "비대면 수요와 유동성", explanation: "IT 기기 수요와 유동성이 반도체 대형주를 밀어올렸습니다.", impact: "상승" },
      { period: "2022", title: "금리 인상과 업황 둔화", explanation: "금리 상승과 재고 부담이 겹치며 밸류에이션이 낮아졌습니다.", impact: "하락" },
      { period: "2024-2026", title: "AI 메모리 기대", explanation: "HBM과 AI 서버 수요가 새로운 논리를 만들었지만 경쟁력 확인이 필요합니다.", impact: "상승" }
    ]
  },
  "000660.KS": {
    baseCap: 95,
    sector: "HBM 대표주",
    events: [
      { period: "2018-2019", title: "메모리 가격 하락", explanation: "업황 둔화로 실적과 주가가 함께 약해졌습니다.", impact: "하락" },
      { period: "2020-2021", title: "서버 수요 회복", explanation: "데이터센터 수요가 살아나며 기대가 커졌습니다.", impact: "상승" },
      { period: "2022-2023", title: "적자와 재고 조정", explanation: "메모리 재고 조정이 길어지며 실적 부담이 커졌습니다.", impact: "하락" },
      { period: "2024-2026", title: "HBM 프리미엄", explanation: "AI 가속기용 HBM 수요가 부각되며 시장 중심 종목이 됐습니다.", impact: "상승" }
    ]
  }
};

const defaultEvents: VolatilityEvent[] = [
  { period: "2018-2020", title: "업황 변화", explanation: "산업 사이클과 금리 환경에 따라 실적 기대가 바뀌었습니다.", impact: "중립" },
  { period: "2021-2022", title: "금리와 성장주 조정", explanation: "금리 상승으로 미래 성장 기대의 현재 가치가 낮아졌습니다.", impact: "하락" },
  { period: "2023-2024", title: "실적 확인 구간", explanation: "기대감보다 실제 매출과 이익 개선 여부가 중요해졌습니다.", impact: "중립" },
  { period: "2025-2026", title: "섹터 재평가", explanation: "AI, 인프라, 로봇, 바이오처럼 섹터별 순환매가 주가 변동을 만들었습니다.", impact: "상승" }
];

export function getHistoricalProfile(ticker: string) {
  const profile = profiles[ticker] ?? { baseCap: 2.5, sector: "관찰 종목", events: defaultEvents };
  const startYear = 2017;

  const metrics: YearlyMetric[] = Array.from({ length: 10 }, (_, index) => {
    const year = startYear + index;
    const cycle = Math.sin(index / 1.7) * 0.18 + index * 0.085;
    const cap = profile.baseCap * Math.max(0.35, 1 + cycle);
    const revenue = cap * (0.32 + (index % 3) * 0.035);
    const profit = revenue * (0.08 + (index % 4) * 0.018);

    return {
      year,
      marketCap: `${cap.toFixed(profile.baseCap > 20 ? 0 : 1)}조원`,
      revenue: `${revenue.toFixed(profile.baseCap > 20 ? 0 : 1)}조원`,
      operatingProfit: `${profit.toFixed(profile.baseCap > 20 ? 1 : 2)}조원`,
      per: index % 4 === 0 ? "높음" : `${(9 + index * 2.1).toFixed(1)}`,
      pbr: `${(0.8 + index * 0.18).toFixed(1)}`,
      roe: `${(6 + index * 1.4).toFixed(1)}%`,
      priceIndex: Math.round(100 * Math.max(0.45, 1 + cycle)),
      note: index < 3 ? "업황 확인" : index < 6 ? "금리·실적 변화" : "섹터 재평가"
    };
  });

  return {
    sector: profile.sector,
    sourceGuide: "MVP에서는 10년 흐름을 이해하기 위한 예시 데이터입니다. 실제 배포 시 KRX, DART, 증권 API 데이터로 교체하는 구조입니다.",
    metrics,
    events: profile.events
  };
}
