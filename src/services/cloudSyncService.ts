"use client";

import type { LocalProfile, RecommendedItemRecord, ReflectionRecord, TradeRecord, UserSettings } from "@/types/investment";
import type { StockNote, WatchTag } from "@/types";
import { GUEST_ID } from "@/lib/brand";
import { localStore } from "@/services/localStore";
import { syncService } from "@/services/syncService";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const TABLE = "sensefolio_notes";

const keys = {
  profiles: "sensefolio:v1:profiles",
  currentProfileId: "sensefolio:v1:current-profile-id",
  settings: "sensefolio:v1:settings",
  favorites: "sensefolio:v1:favorites",
  notes: "sensefolio:v1:notes",
  tags: "sensefolio:v1:tags",
  reflections: "sensefolio:v1:reflections",
  trades: "sensefolio:v1:trades",
  interestEvents: "sensefolio:v1:interest-events",
  recommendedItems: "sensefolio:v1:recommended-items"
};

type CloudPayload = {
  profile: LocalProfile;
  settings: UserSettings;
  favorites: string[];
  notes: Record<string, StockNote>;
  tags: Record<string, WatchTag>;
  reflections: Record<string, ReflectionRecord>;
  trades: TradeRecord[];
  interestEvents: InterestEvent[];
  recommendedItems: RecommendedItemRecord[];
  updatedAt: string;
};

export type InterestEvent = {
  id: string;
  kind: "recommendation_click" | "search_view" | "detail_view";
  assetKey: string;
  assetName: string;
  assetKind: "stock" | "etf";
  sector: string;
  tags: string[];
  createdAt: string;
};

type CloudRow = {
  local_user_id: string;
  nickname: string;
  payload: CloudPayload;
  updated_at?: string;
};

function enabled() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function normalizeNickname(nickname: string) {
  return nickname.trim().toLowerCase();
}

function scopedKey(base: string, localUserId: string) {
  return `${base}:${localUserId}`;
}

function headers(prefer?: string) {
  return {
    apikey: SUPABASE_ANON_KEY ?? "",
    Authorization: `Bearer ${SUPABASE_ANON_KEY ?? ""}`,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {})
  };
}

async function request<T>(path: string, init?: RequestInit) {
  if (!enabled()) return null;
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: { ...headers(init?.method === "POST" ? "resolution=merge-duplicates,return=representation" : undefined), ...init?.headers }
  });
  if (!response.ok) throw new Error(`Supabase sync failed: ${response.status}`);
  if (response.status === 204) return null;
  return (await response.json()) as T;
}

function getProfiles() {
  return localStore.readJson<LocalProfile[]>(keys.profiles, []);
}

function saveProfiles(profiles: LocalProfile[]) {
  localStore.writeJson(keys.profiles, profiles);
}

function getProfileById(localUserId: string) {
  return getProfiles().find((profile) => profile.localUserId === localUserId) ?? null;
}

function currentUserId() {
  return localStore.readJson<string | null>(keys.currentProfileId, null);
}

function buildPayload(profile: LocalProfile): CloudPayload {
  return {
    profile,
    settings: localStore.readJson<UserSettings>(keys.settings, {
      viewMode: "standard",
      defaultBrokerDomestic: "토스증권",
      defaultBrokerOverseas: "미니스탁",
      defaultBrokerEtf: "토스증권"
    }),
    favorites: localStore.readJson<string[]>(scopedKey(keys.favorites, profile.localUserId), []),
    notes: localStore.readJson<Record<string, StockNote>>(scopedKey(keys.notes, profile.localUserId), {}),
    tags: localStore.readJson<Record<string, WatchTag>>(scopedKey(keys.tags, profile.localUserId), {}),
    reflections: localStore.readJson<Record<string, ReflectionRecord>>(scopedKey(keys.reflections, profile.localUserId), {}),
    trades: localStore.readJson<TradeRecord[]>(scopedKey(keys.trades, profile.localUserId), []),
    interestEvents: localStore.readJson<InterestEvent[]>(scopedKey(keys.interestEvents, profile.localUserId), []),
    recommendedItems: localStore.readJson<RecommendedItemRecord[]>(scopedKey(keys.recommendedItems, profile.localUserId), []),
    updatedAt: new Date().toISOString()
  };
}

function hydrate(row: CloudRow) {
  const profile = row.payload.profile;
  const profiles = getProfiles();
  const nextProfiles = [profile, ...profiles.filter((item) => item.localUserId !== profile.localUserId && normalizeNickname(item.nickname) !== normalizeNickname(profile.nickname))];
  saveProfiles(nextProfiles);
  localStore.writeJson(keys.currentProfileId, profile.localUserId);
  localStore.writeJson(keys.settings, row.payload.settings);
  localStore.writeJson(scopedKey(keys.favorites, profile.localUserId), row.payload.favorites ?? []);
  localStore.writeJson(scopedKey(keys.notes, profile.localUserId), row.payload.notes ?? {});
  localStore.writeJson(scopedKey(keys.tags, profile.localUserId), row.payload.tags ?? {});
  localStore.writeJson(scopedKey(keys.reflections, profile.localUserId), row.payload.reflections ?? {});
  localStore.writeJson(scopedKey(keys.trades, profile.localUserId), row.payload.trades ?? []);
  localStore.writeJson(scopedKey(keys.interestEvents, profile.localUserId), row.payload.interestEvents ?? []);
  localStore.writeJson(scopedKey(keys.recommendedItems, profile.localUserId), row.payload.recommendedItems ?? []);
  return profile;
}

export const cloudSyncService = {
  enabled,
  findByNickname: async (nickname: string) => {
    if (!enabled()) return null;
    const rows = await request<CloudRow[]>(`${TABLE}?nickname=eq.${encodeURIComponent(normalizeNickname(nickname))}&select=*`);
    return rows?.[0] ?? null;
  },
  loginByNickname: async (nickname: string) => {
    const row = await cloudSyncService.findByNickname(nickname);
    return row ? hydrate(row) : null;
  },
  upsertProfileSnapshot: async (profile: LocalProfile) => {
    if (!enabled() || profile.localUserId === GUEST_ID) return false;
    const payload = buildPayload(profile);
    await request<CloudRow[]>(`${TABLE}?on_conflict=local_user_id`, {
      method: "POST",
      body: JSON.stringify({
        local_user_id: profile.localUserId,
        nickname: normalizeNickname(profile.nickname),
        payload,
        updated_at: payload.updatedAt
      })
    });
    return true;
  },
  upsertCurrentSnapshot: async () => {
    const id = currentUserId();
    if (!id || id === GUEST_ID) return false;
    const profile = getProfileById(id);
    if (!profile) return false;
    return cloudSyncService.upsertProfileSnapshot(profile);
  },
  hasCloudProfile: async (nickname: string) => Boolean(await cloudSyncService.findByNickname(nickname)),
  syncSoon: () => {
    if (!enabled()) return;
    window.setTimeout(() => {
      cloudSyncService.upsertCurrentSnapshot().catch(() => undefined);
      const id = currentUserId();
      if (id) syncService.syncLocalToCloud(id).catch(() => undefined);
    }, 0);
  },
  getInterestEvents: () => {
    const id = currentUserId();
    if (!id || id === GUEST_ID) return [];
    return localStore.readJson<InterestEvent[]>(scopedKey(keys.interestEvents, id), []);
  },
  recordInterestEvent: (event: Omit<InterestEvent, "id" | "createdAt">) => {
    const id = currentUserId();
    if (!id || id === GUEST_ID) return false;
    const rows = cloudSyncService.getInterestEvents();
    const next = [
      {
        ...event,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      },
      ...rows
    ].slice(0, 300);
    localStore.writeJson(scopedKey(keys.interestEvents, id), next);
    cloudSyncService.syncSoon();
    return true;
  },
  getRecommendedItems: () => {
    const id = currentUserId();
    if (!id || id === GUEST_ID) return [];
    return localStore.readJson<RecommendedItemRecord[]>(scopedKey(keys.recommendedItems, id), []);
  },
  saveRecommendedItem: (record: Omit<RecommendedItemRecord, "id" | "createdAt">) => {
    const id = currentUserId();
    if (!id || id === GUEST_ID) return false;
    const rows = cloudSyncService.getRecommendedItems();
    const next: RecommendedItemRecord = { ...record, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    localStore.writeJson(scopedKey(keys.recommendedItems, id), [next, ...rows].slice(0, 300));
    cloudSyncService.syncSoon();
    return true;
  }
};
