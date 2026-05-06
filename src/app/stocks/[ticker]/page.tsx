import { notFound } from "next/navigation";
import { StockDetailClient } from "@/components/StockDetailClient";
import { getStock } from "@/lib/mock-data";

export default async function StockDetailPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;
  const stock = getStock(ticker);
  if (!stock) notFound();
  return <StockDetailClient stock={stock} />;
}
