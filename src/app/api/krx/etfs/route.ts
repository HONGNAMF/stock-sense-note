import { NextResponse } from "next/server";
import { listedCompanies } from "@/lib/listed-companies";

export type KrxEtfRow = {
  code: string;
  name: string;
  issuer: string;
  market: string;
};

export async function GET() {
  const etfs = listedCompanies
    .filter((item) => item.isEtf)
    .map((item) => ({
      code: item.stockCode,
      name: item.companyName,
      issuer: "운용사 확인 필요",
      market: item.market
    }));

  return NextResponse.json({
    source: "Sensefolio seed ETF list",
    fetchedAt: new Date().toISOString(),
    etfs
  });
}
