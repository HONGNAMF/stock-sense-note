import { NextResponse } from "next/server";
import { getLivePriceQuote } from "@/lib/live-price";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker");

  if (!ticker) {
    return NextResponse.json({ quote: null, message: "ticker query is required" }, { status: 400 });
  }

  const quote = await getLivePriceQuote(ticker);
  return NextResponse.json({
    quote,
    message: quote ? undefined : "Live quote not available. The UI should fall back to MVP sample data."
  });
}
