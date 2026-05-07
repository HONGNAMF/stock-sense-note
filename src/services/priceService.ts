export type LivePriceQuote = {
  ticker: string;
  providerSymbol: string;
  price: number;
  formattedPrice: string;
  changeRate: number;
  currency: string;
  marketCap?: number;
  formattedMarketCap?: string;
  per?: number;
  pbr?: number;
  eps?: number;
  roe?: number;
  week52High?: number;
  week52Low?: number;
  formattedPer?: string;
  formattedPbr?: string;
  formattedEps?: string;
  formattedRoe?: string;
  formattedWeek52High?: string;
  formattedWeek52Low?: string;
  marketTime?: string;
  source: string;
  provider: "KIS" | "Yahoo";
  realtime: boolean;
  isFallback: boolean;
};

export const priceService = {
  getThirtyDayMock: () => Array.from({ length: 30 }, (_, index) => ({ day: index + 1, value: 100 + Math.sin(index / 3) * 5 + index * 0.7 })),

  async getLiveQuote(ticker: string): Promise<LivePriceQuote | null> {
    try {
      const response = await fetch(`/api/price?ticker=${encodeURIComponent(ticker)}`, { cache: "no-store" });
      if (!response.ok) return null;
      const data = (await response.json()) as { quote?: LivePriceQuote };
      return data.quote ?? null;
    } catch {
      return null;
    }
  }
};
