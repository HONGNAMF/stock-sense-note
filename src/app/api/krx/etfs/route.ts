import { NextResponse } from "next/server";

export type KrxEtfRow = {
  code: string;
  name: string;
  issuer: string;
  market: string;
};

const KRX_ETF_URL = "https://data.krx.co.kr/comm/bldAttendant/getJsonData.cmd";

function compact(value: unknown) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function pick(row: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = compact(row[key]);
    if (value) return value;
  }
  return "";
}

function normalizeRows(rows: unknown): KrxEtfRow[] {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((row) => {
      const item = row as Record<string, unknown>;
      return {
        code: pick(item, ["ISU_SRT_CD", "ISU_CD", "TICKER", "종목코드"]),
        name: pick(item, ["ISU_ABBRV", "ISU_NM", "KOR_SECN_NM", "종목명"]),
        issuer: pick(item, ["COM_ABBRV", "ETF_OBJ_INDEX_NM", "운용사", "기초지수"]),
        market: "KRX ETF"
      };
    })
    .filter((row) => row.code && row.name);
}

export async function GET() {
  try {
    const body = new URLSearchParams({
      bld: "dbms/MDC/STAT/standard/MDCSTAT04601",
      locale: "ko_KR",
      mktId: "ALL",
      share: "1",
      csvxls_isNo: "false"
    });

    const response = await fetch(KRX_ETF_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent": "Mozilla/5.0",
        Referer: "https://data.krx.co.kr/"
      },
      body,
      cache: "no-store"
    });

    if (!response.ok) throw new Error(`KRX ETF failed: ${response.status}`);
    const json = await response.json();
    const stocks = normalizeRows(json.OutBlock_1 ?? json.output ?? json.block1);

    return NextResponse.json({
      source: "KRX ETF",
      fetchedAt: new Date().toISOString(),
      etfs: stocks
    });
  } catch (error) {
    return NextResponse.json(
      {
        source: "KRX ETF",
        etfs: [],
        message: error instanceof Error ? error.message : "KRX ETF fetch failed"
      },
      { status: 200 }
    );
  }
}
