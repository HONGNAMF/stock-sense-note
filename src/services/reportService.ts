import type { TradeRecord } from "@/types/investment";

export const reportService = {
  monthlySummary: (trades: TradeRecord[]) => ({
    title: "이번 달 투자 복기",
    summary: trades.length ? "이번 달은 기록을 남기며 판단을 확인한 달입니다." : "아직 거래 기록이 없어 관심종목과 판단 기록 중심으로 복기합니다.",
    feedback: "충동적인 결론보다, 내가 왜 봤고 왜 샀는지를 남기는 습관이 가장 중요합니다.",
    buys: trades.filter((trade) => trade.tradeType === "매수").length,
    sells: trades.filter((trade) => trade.tradeType === "매도").length
  }),
  quarterlySummary: () => ({
    title: "분기 투자 습관 리포트",
    summary: "관심 분야가 넓어질수록 기록 기준을 단순하게 유지하는 것이 좋습니다.",
    strengths: ["관심 있는 산업을 이해하려는 태도가 있습니다.", "매수 전 리스크를 확인하려는 흐름이 보입니다."],
    watchouts: ["좋아하는 분야에 감정이 섞일 수 있습니다.", "매도 기준을 미리 정하면 복기가 쉬워집니다."]
  })
};
