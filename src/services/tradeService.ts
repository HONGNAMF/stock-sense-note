"use client";

import { journalService } from "@/services/journalService";
import type { TradeRecord } from "@/types/investment";

export const tradeService = {
  getTrades: () => journalService.getTrades(),
  saveTrade: (record: TradeRecord) => journalService.saveTrade(record)
};
