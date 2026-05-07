import { NextResponse } from "next/server";

export type KrxStockRow = {
  code: string;
  name: string;
  shortName: string;
  market: string;
  securityType: string;
  industry?: string;
  product?: string;
};

const KIND_LISTED_COMPANIES_URL = "https://kind.krx.co.kr/corpgeneral/corpList.do?method=download&searchType=13";

function stripTags(value: string) {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCells(rowHtml: string) {
  const cells = [...rowHtml.matchAll(/<td[\s\S]*?<\/td>/gi)];
  return cells.map((match) => stripTags(match[0]));
}

function parseKindHtml(html: string): KrxStockRow[] {
  const rows = [...html.matchAll(/<tr[\s\S]*?<\/tr>/gi)];
  return rows
    .map((match) => parseCells(match[0]))
    .filter((cells) => cells.length >= 3 && cells[0] && cells[2])
    .map((cells) => ({
      name: cells[0],
      shortName: cells[0],
      market: cells[1] || "KRX",
      code: cells[2],
      securityType: "상장회사",
      industry: cells[3] || "",
      product: cells[4] || ""
    }));
}

export async function GET() {
  try {
    const response = await fetch(KIND_LISTED_COMPANIES_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Referer: "https://kind.krx.co.kr/"
      },
      cache: "no-store"
    });

    if (!response.ok) throw new Error(`KRX KIND failed: ${response.status}`);
    const buffer = await response.arrayBuffer();
    const html = new TextDecoder("euc-kr").decode(buffer);
    const stocks = parseKindHtml(html);

    return NextResponse.json({
      source: "KRX KIND",
      fetchedAt: new Date().toISOString(),
      stocks
    });
  } catch (error) {
    return NextResponse.json(
      {
        source: "KRX KIND",
        stocks: [],
        message: error instanceof Error ? error.message : "KRX KIND fetch failed"
      },
      { status: 200 }
    );
  }
}
