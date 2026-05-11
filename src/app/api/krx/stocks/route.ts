import { NextResponse } from "next/server";
import { listedCompanies } from "@/lib/listed-companies";

export type KrxStockRow = {
  code: string;
  name: string;
  shortName: string;
  market: string;
  securityType: string;
  industry?: string;
  product?: string;
};

export async function GET() {
  const stocks = listedCompanies
    .filter((item) => !item.isEtf)
    .map((item) => ({
      code: item.stockCode,
      name: item.companyName,
      shortName: item.companyName,
      market: item.market,
      securityType: "상장회사",
      industry: item.sector,
      product: item.searchKeywords.join(", ")
    }));

  return NextResponse.json({
    source: "Sensefolio seed listed companies",
    fetchedAt: new Date().toISOString(),
    stocks
  });
}
