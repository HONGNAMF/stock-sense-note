import { notFound } from "next/navigation";
import { StockDetailClient } from "@/components/StockDetailClient";
import { createFallbackStock, getStock } from "@/lib/mock-data";

export default async function StockDetailPage({
  params,
  searchParams
}: {
  params: Promise<{ ticker: string }>;
  searchParams: Promise<{ name?: string; sector?: string; product?: string; reason?: string; fallback?: string }>;
}) {
  const { ticker } = await params;
  const query = await searchParams;
  const stock = getStock(ticker) ?? (query.fallback === "1" ? createFallbackStock(ticker, query) : null);
  if (!stock) notFound();
  return <StockDetailClient stock={stock} />;
}
