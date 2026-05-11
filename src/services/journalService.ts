"use client";

import type { ReflectionRecord, TradeRecord } from "@/types/investment";
import { localStore } from "@/services/localStore";
import { profileService } from "@/services/profileService";
import { GUEST_ID } from "@/lib/brand";
import { cloudSyncService } from "@/services/cloudSyncService";

const reflectionKey = "sensefolio:v1:reflections";
const tradeKey = "sensefolio:v1:trades";

function scopedKey(base: string) {
  const id = profileService.getCurrentProfileId();
  if (!id || id === GUEST_ID) return null;
  return `${base}:${id}`;
}

export const journalService = {
  isGuest: () => profileService.getCurrentProfileId() === GUEST_ID,
  getReflections: () => {
    const key = scopedKey(reflectionKey);
    return key ? localStore.readJson<Record<string, ReflectionRecord>>(key, {}) : {};
  },
  getReflection: (assetKey: string) => journalService.getReflections()[assetKey],
  saveReflection: (record: ReflectionRecord) => {
    const key = scopedKey(reflectionKey);
    if (!key) return false;
    const records = journalService.getReflections();
    localStore.writeJson(key, { ...records, [record.assetKey]: record });
    cloudSyncService.syncSoon();
    return true;
  },
  getTrades: () => {
    const key = scopedKey(tradeKey);
    return key ? localStore.readJson<TradeRecord[]>(key, []) : [];
  },
  saveTrade: (record: TradeRecord) => {
    const key = scopedKey(tradeKey);
    if (!key) return false;
    localStore.writeJson(key, [record, ...journalService.getTrades()]);
    cloudSyncService.syncSoon();
    return true;
  }
};
