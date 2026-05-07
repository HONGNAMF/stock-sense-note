export type LivePriceQuotePayload = {
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
  provider: "KIS" | "Naver" | "Yahoo";
  realtime: boolean;
  isFallback: boolean;
};

type KisPriceResponse = {
  rt_cd?: string;
  msg1?: string;
  output?: Record<string, string | undefined>;
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

type YahooQuoteResponse = {
  quoteResponse?: {
    result?: Array<{
      symbol?: string;
      marketCap?: number;
      trailingPE?: number;
      priceToBook?: number;
      epsTrailingTwelveMonths?: number;
      returnOnEquity?: number;
      fiftyTwoWeekHigh?: number;
      fiftyTwoWeekLow?: number;
      currency?: string;
    }>;
  };
};

const YAHOO_CHART_URL = "https://query1.finance.yahoo.com/v8/finance/chart";
const YAHOO_QUOTE_URL = "https://query1.finance.yahoo.com/v7/finance/quote";
const NAVER_ITEM_URL = "https://finance.naver.com/item/main.naver";
const KIS_BASE_URL = process.env.KIS_BASE_URL || "https://openapi.koreainvestment.com:9443";

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

function domesticCode(ticker: string) {
  const normalized = decodeTicker(ticker);
  const code = normalized.replace(/\.(KS|KQ|KRX)$/i, "");
  return /^\d{6}$/.test(code) ? code : null;
}

function formatPrice(price: number, currency: string) {
  if (currency === "KRW") return `${Math.round(price).toLocaleString("ko-KR")} KRW`;
  if (currency === "USD") return `$${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  return `${price.toLocaleString("ko-KR", { maximumFractionDigits: 2 })} ${currency}`;
}

function formatMarketCap(value: number, currency: string) {
  if (currency === "KRW") {
    const trillion = value / 1_0000_0000_0000;
    if (trillion >= 1) return `about ${trillion.toFixed(1)}T KRW`;
    return `about ${(value / 1_0000_0000).toFixed(0)}B KRW`;
  }
  if (currency === "USD") {
    const billion = value / 1_000_000_000;
    if (billion >= 1) return `about $${billion.toFixed(1)}B`;
    return `about $${(value / 1_000_000).toFixed(0)}M`;
  }
  return `${value.toLocaleString("ko-KR")} ${currency}`;
}

function formatRatio(value: number) {
  return `${value.toLocaleString("ko-KR", { maximumFractionDigits: 2 })}x`;
}

function formatPercent(value: number) {
  const percent = Math.abs(value) <= 1 ? value * 100 : value;
  return `${percent.toLocaleString("ko-KR", { maximumFractionDigits: 2 })}%`;
}

function validNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function numberFromKis(value?: string) {
  if (!value) return undefined;
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : undefined;
}

function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function numberFromText(value?: string) {
  if (!value) return undefined;
  const parsed = Number(stripHtml(value).replace(/,/g, "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : undefined;
}

function textByRegex(html: string, pattern: RegExp) {
  return stripHtml(pattern.exec(html)?.[1] ?? "");
}

function numberById(html: string, id: string) {
  return numberFromText(textByRegex(html, new RegExp(`<em\\s+id=["']${id}["'][^>]*>([\\s\\S]*?)<\\/em>`, "i")));
}

function parseNaverMarketCap(html: string): { marketCap?: number; formattedMarketCap?: string } {
  const raw = textByRegex(html, /<em\s+id=["']_market_sum["'][^>]*>([\s\S]*?)<\/em>\s*억원/i);
  if (!raw) return {};

  const trillion = numberFromText(/([\d,]+)\s*조/.exec(raw)?.[1]) ?? 0;
  const eok = numberFromText(/조\s*([\d,]+)/.exec(raw)?.[1]) ?? (raw.includes("조") ? 0 : numberFromText(raw) ?? 0);
  const marketCap = trillion * 1_0000_0000_0000 + eok * 100_000_000;

  return {
    marketCap: marketCap || undefined,
    formattedMarketCap: `${raw}억원`
  };
}

function parseNaverRoe(html: string) {
  const row = /ROE\(지배주주\)<\/strong><\/th>([\s\S]*?)<\/tr>/i.exec(html)?.[1];
  if (!row) return undefined;
  const cells = Array.from(row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi))
    .map((match) => numberFromText(match[1]))
    .filter((value): value is number => typeof value === "number");
  return cells.at(-1);
}

async function fetchNaverFinanceQuote(ticker: string): Promise<LivePriceQuotePayload | null> {
  const code = domesticCode(ticker);
  if (!code) return null;

  const url = new URL(NAVER_ITEM_URL);
  url.searchParams.set("code", code);
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    },
    cache: "no-store"
  });
  if (!response.ok) return null;

  const html = await response.text();
  const current = numberFromText(textByRegex(html, /현재가\s*([\d,]+)/));
  if (!current) return null;

  const changeRate = numberFromText(textByRegex(html, /현재가[\s\S]*?([\d.]+)\s*퍼센트/)) ?? 0;
  const week52 = /52주최고[\s\S]*?<td>[\s\S]*?<em>([\d,]+)<\/em>[\s\S]*?<em>([\d,]+)<\/em>/i.exec(html);
  const week52High = numberFromText(week52?.[1]);
  const week52Low = numberFromText(week52?.[2]);
  const per = numberById(html, "_per");
  const eps = numberById(html, "_eps");
  const pbr = numberById(html, "_pbr");
  const roe = parseNaverRoe(html);
  const cap = parseNaverMarketCap(html);
  const marketTime = textByRegex(html, /<span id="time">([\s\S]*?)<\/span>/i);

  return {
    ticker: decodeTicker(ticker),
    providerSymbol: code,
    price: current,
    formattedPrice: formatPrice(current, "KRW"),
    changeRate,
    currency: "KRW",
    marketCap: cap.marketCap,
    formattedMarketCap: cap.formattedMarketCap,
    per,
    pbr,
    eps,
    roe,
    week52High,
    week52Low,
    formattedPer: per ? formatRatio(per) : undefined,
    formattedPbr: pbr ? formatRatio(pbr) : undefined,
    formattedEps: eps ? formatPrice(eps, "KRW") : undefined,
    formattedRoe: roe ? formatPercent(roe) : undefined,
    formattedWeek52High: week52High ? formatPrice(week52High, "KRW") : undefined,
    formattedWeek52Low: week52Low ? formatPrice(week52Low, "KRW") : undefined,
    marketTime: marketTime || new Date().toISOString(),
    source: "Naver Finance",
    provider: "Naver",
    realtime: false,
    isFallback: false
  };
}

function signedAbs(value?: string) {
  const parsed = numberFromKis(value);
  return typeof parsed === "number" ? Math.abs(parsed) : undefined;
}

async function fetchKisRealtimeQuote(ticker: string): Promise<LivePriceQuotePayload | null> {
  const appKey = process.env.KIS_APP_KEY;
  const appSecret = process.env.KIS_APP_SECRET;
  const accessToken = process.env.KIS_ACCESS_TOKEN;
  const code = domesticCode(ticker);

  if (!code || !appKey || !appSecret || !accessToken) return null;

  const url = new URL("/uapi/domestic-stock/v1/quotations/inquire-price", KIS_BASE_URL);
  url.searchParams.set("FID_COND_MRKT_DIV_CODE", "J");
  url.searchParams.set("FID_INPUT_ISCD", code);

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${accessToken}`,
      appkey: appKey,
      appsecret: appSecret,
      tr_id: "FHKST01010100",
      custtype: "P"
    },
    cache: "no-store"
  });

  if (!response.ok) return null;
  const data = (await response.json()) as KisPriceResponse;
  if (data.rt_cd !== "0" || !data.output) return null;

  const output = data.output;
  const price = signedAbs(output.stck_prpr);
  if (!price) return null;

  const marketCapEok = numberFromKis(output.hts_avls);
  const marketCap = marketCapEok ? marketCapEok * 100_000_000 : undefined;
  const per = numberFromKis(output.per);
  const pbr = numberFromKis(output.pbr);
  const eps = numberFromKis(output.eps);
  const week52High = signedAbs(output.w52_hgpr);
  const week52Low = signedAbs(output.w52_lwpr);

  return {
    ticker: decodeTicker(ticker),
    providerSymbol: code,
    price,
    formattedPrice: formatPrice(price, "KRW"),
    changeRate: numberFromKis(output.prdy_ctrt) ?? 0,
    currency: "KRW",
    marketCap,
    formattedMarketCap: marketCap ? formatMarketCap(marketCap, "KRW") : undefined,
    per,
    pbr,
    eps,
    week52High,
    week52Low,
    formattedPer: per ? formatRatio(per) : undefined,
    formattedPbr: pbr ? formatRatio(pbr) : undefined,
    formattedEps: eps ? formatPrice(eps, "KRW") : undefined,
    formattedWeek52High: week52High ? formatPrice(week52High, "KRW") : undefined,
    formattedWeek52Low: week52Low ? formatPrice(week52Low, "KRW") : undefined,
    marketTime: new Date().toISOString(),
    source: "Korea Investment OpenAPI",
    provider: "KIS",
    realtime: true,
    isFallback: false
  };
}

async function fetchYahooFundamentals(symbol: string, currency: string) {
  const url = `${YAHOO_QUOTE_URL}?symbols=${encodeURIComponent(symbol)}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    },
    cache: "no-store"
  });

  if (!response.ok) return null;
  const data = (await response.json()) as YahooQuoteResponse;
  const row = data.quoteResponse?.result?.[0];
  if (!row) return null;

  const marketCap = validNumber(row.marketCap);
  const per = validNumber(row.trailingPE);
  const pbr = validNumber(row.priceToBook);
  const eps = validNumber(row.epsTrailingTwelveMonths);
  const roe = validNumber(row.returnOnEquity);
  const week52High = validNumber(row.fiftyTwoWeekHigh);
  const week52Low = validNumber(row.fiftyTwoWeekLow);

  return {
    marketCap,
    formattedMarketCap: marketCap ? formatMarketCap(marketCap, currency) : undefined,
    per,
    pbr,
    eps,
    roe,
    week52High,
    week52Low,
    formattedPer: per ? formatRatio(per) : undefined,
    formattedPbr: pbr ? formatRatio(pbr) : undefined,
    formattedEps: eps ? formatPrice(eps, currency) : undefined,
    formattedRoe: roe ? formatPercent(roe) : undefined,
    formattedWeek52High: week52High ? formatPrice(week52High, currency) : undefined,
    formattedWeek52Low: week52Low ? formatPrice(week52Low, currency) : undefined
  };
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
  if (!meta) return null;

  const price = meta.regularMarketPrice;
  if (typeof price !== "number" || Number.isNaN(price)) return null;

  const previousClose = meta.previousClose ?? meta.chartPreviousClose;
  const changeRate = typeof previousClose === "number" && previousClose > 0 ? Number((((price - previousClose) / previousClose) * 100).toFixed(2)) : 0;
  const currency = meta.currency || "KRW";
  const fundamentals = await fetchYahooFundamentals(meta.symbol || symbol, currency);

  return {
    providerSymbol: meta.symbol || symbol,
    price,
    formattedPrice: formatPrice(price, currency),
    changeRate,
    currency,
    marketCap: fundamentals?.marketCap,
    formattedMarketCap: fundamentals?.formattedMarketCap,
    per: fundamentals?.per,
    pbr: fundamentals?.pbr,
    eps: fundamentals?.eps,
    roe: fundamentals?.roe,
    week52High: fundamentals?.week52High,
    week52Low: fundamentals?.week52Low,
    formattedPer: fundamentals?.formattedPer,
    formattedPbr: fundamentals?.formattedPbr,
    formattedEps: fundamentals?.formattedEps,
    formattedRoe: fundamentals?.formattedRoe,
    formattedWeek52High: fundamentals?.formattedWeek52High,
    formattedWeek52Low: fundamentals?.formattedWeek52Low,
    marketTime: meta.regularMarketTime ? new Date(meta.regularMarketTime * 1000).toISOString() : undefined,
    source: `Yahoo Finance${meta.exchangeName ? ` / ${meta.exchangeName}` : ""}`,
    provider: "Yahoo" as const,
    realtime: false,
    isFallback: false
  };
}

export async function getLivePriceQuote(ticker: string): Promise<LivePriceQuotePayload | null> {
  const decoded = decodeTicker(ticker);
  if (!decoded) return null;

  const kisQuote = await fetchKisRealtimeQuote(decoded);
  if (kisQuote) return kisQuote;

  const naverQuote = await fetchNaverFinanceQuote(decoded);
  if (naverQuote) return naverQuote;

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
