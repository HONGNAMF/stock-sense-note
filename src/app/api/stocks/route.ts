import { NextResponse } from "next/server";
import { stocks } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ stocks });
}
