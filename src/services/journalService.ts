"use client";

import type { ReflectionRecord, TradeRecord } from "@/types/investment";
import { localStore } from "@/services/localStore";

const reflectionKey = "haeseok-note:v2:reflections";
const tradeKey = "haeseok-note:v2:trades";

export const journalService = {
  getReflections: () => localStore.readJson<Record<string, ReflectionRecord>>(reflectionKey, {}),
  getReflection: (assetKey: string) => journalService.getReflections()[assetKey],
  saveReflection: (record: ReflectionRecord) => {
    const records = journalService.getReflections();
    localStore.writeJson(reflectionKey, { ...records, [record.assetKey]: record });
  },
  getTrades: () => localStore.readJson<TradeRecord[]>(tradeKey, []),
  saveTrade: (record: TradeRecord) => localStore.writeJson(tradeKey, [record, ...journalService.getTrades()])
};
