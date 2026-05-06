import { NextResponse } from "next/server";
import { marketContext } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ marketContext });
}
