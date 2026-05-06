import { NextResponse } from "next/server";
import { getStock } from "@/lib/mock-data";

export async function GET(_: Request, { params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;
  const stock = getStock(ticker);
  if (!stock) return NextResponse.json({ message: "Stock not found" }, { status: 404 });
  return NextResponse.json({ stock });
}
