export type LivePriceQuote = {
  ticker: string;
  providerSymbol: string;
  price: number;
  formattedPrice: string;
  changeRate: number;
  currency: string;
  marketTime?: string;
  source: string;
  isFallback: boolean;
};

export const priceService = {
  getThirtyDayMock: () => Array.from({ length: 30 }, (_, index) => ({ day: index + 1, value: 100 + Math.sin(index / 3) * 5 + index * 0.7 })),

  async getLiveQuote(ticker: string): Promise<LivePriceQuote | null> {
    try {
      const response = await fetch(`/api/prices/${encodeURIComponent(ticker)}`, { cache: "no-store" });
      if (!response.ok) return null;
      const data = (await response.json()) as { quote?: LivePriceQuote };
      return data.quote ?? null;
    } catch {
      return null;
    }
  }
};
