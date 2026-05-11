import type { TradeRecord } from "@/types/investment";

export const reportService = {
  monthlySummary: (trades: TradeRecord[]) => ({
    title: "이번 달 투자 복기",
    summary: trades.length ? "이번 달 기록을 기준으로 판단 흐름을 확인할 수 있습니다." : "아직 거래 기록이 없어 관심종목과 판단 기록 중심으로 복기합니다.",
    feedback: "충동적인 결정은 줄이고, 내가 왜 보고 있는지와 매도 기준을 먼저 남기는 습관이 중요합니다.",
    buys: trades.filter((trade) => trade.tradeType === "매수").length,
    sells: trades.filter((trade) => trade.tradeType === "매도").length
  }),
  quarterlySummary: () => ({
    title: "분기 투자 습관 리포트",
    summary: "관심 분야가 넓어질수록 기록 기준은 단순하게 유지하는 것이 좋습니다.",
    strengths: ["관심 있는 산업을 이해하려는 시도가 있습니다.", "매수 전 리스크를 확인하려는 흐름이 보입니다."],
    watchouts: ["좋아하는 분야에 감정이 앞설 수 있습니다.", "매도 기준을 미리 정하면 복기가 쉬워집니다."]
  })
};
