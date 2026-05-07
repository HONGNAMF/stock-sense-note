export type LivePriceQuotePayload = {
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

type YahooChartResult = {
  meta?: {
    symbol?: string;
    regularMarketPrice?: number;
    previousClose?: number;
    chartPreviousClose?: number;
    currency?: string;
    exchangeName?: string;
    regularMarketTime?: number;
  };
};

type YahooChartResponse = {
  chart?: {
    result?: YahooChartResult[];
    error?: unknown;
  };
};

const YAHOO_CHART_URL = "https://query1.finance.yahoo.com/v8/finance/chart";

function decodeTicker(ticker: string) {
  return decodeURIComponent(ticker).trim().toUpperCase();
}

function yahooCandidates(ticker: string) {
  const normalized = decodeTicker(ticker);
  if (normalized.endsWith(".KRX")) {
    const code = normalized.replace(".KRX", "");
    return [`${code}.KS`, `${code}.KQ`];
  }
  if (/^\d{6}$/.test(normalized)) return [`${normalized}.KS`, `${normalized}.KQ`];
  return [normalized];
}

function formatPrice(price: number, currency: string) {
  if (currency === "KRW") return `${Math.round(price).toLocaleString("ko-KR")}원`;
  if (currency === "USD") return `$${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  return `${price.toLocaleString("ko-KR", { maximumFractionDigits: 2 })} ${currency}`;
}

async function fetchYahooQuote(symbol: string) {
  const url = `${YAHOO_CHART_URL}/${encodeURIComponent(symbol)}?range=1d&interval=1d`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    },
    cache: "no-store"
  });

  if (!response.ok) return null;
  const data = (await response.json()) as YahooChartResponse;
  const meta = data.chart?.result?.[0]?.meta;
  const price = meta?.regularMarketPrice;
  if (typeof price !== "number" || Number.isNaN(price)) return null;

  const previousClose = meta.previousClose ?? meta.chartPreviousClose;
  const changeRate = typeof previousClose === "number" && previousClose > 0 ? Number((((price - previousClose) / previousClose) * 100).toFixed(2)) : 0;
  const currency = meta.currency || "KRW";

  return {
    providerSymbol: meta.symbol || symbol,
    price,
    formattedPrice: formatPrice(price, currency),
    changeRate,
    currency,
    marketTime: meta.regularMarketTime ? new Date(meta.regularMarketTime * 1000).toISOString() : undefined,
    source: `Yahoo Finance${meta.exchangeName ? ` · ${meta.exchangeName}` : ""}`,
    isFallback: false
  };
}

export async function getLivePriceQuote(ticker: string): Promise<LivePriceQuotePayload | null> {
  const decoded = decodeTicker(ticker);
  if (!decoded) return null;

  for (const symbol of yahooCandidates(decoded)) {
    const quote = await fetchYahooQuote(symbol);
    if (quote) {
      return {
        ticker: decoded,
        ...quote
      };
    }
  }

  return null;
}
