import { popularStocks } from "@/lib/popular-stocks";

export const recommendationService = {
  monthlyStocks: () => popularStocks.slice(0, 12)
};
