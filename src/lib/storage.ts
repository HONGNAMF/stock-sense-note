"use client";

import type { StockNote, UserProfile, WatchTag } from "@/types";
import { GUEST_ID } from "@/lib/brand";
import { profileService } from "@/services/profileService";
import { cloudSyncService } from "@/services/cloudSyncService";

const keys = {
  legacyProfile: "sensefolio:v1:legacy-profile",
  favorites: "sensefolio:v1:favorites",
  notes: "sensefolio:v1:notes",
  tags: "sensefolio:v1:tags"
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function currentUserId() {
  return profileService.getCurrentProfileId();
}

function scopedKey(base: string) {
  const id = currentUserId();
  if (!id || id === GUEST_ID) return null;
  return `${base}:${id}`;
}

export const storage = {
  isGuest: () => currentUserId() === GUEST_ID,
  getProfile: () => readJson<UserProfile | null>(keys.legacyProfile, null),
  setProfile: (profile: UserProfile) => writeJson(keys.legacyProfile, profile),
  getFavorites: () => {
    const key = scopedKey(keys.favorites);
    return key ? readJson<string[]>(key, []) : [];
  },
  setFavorites: (tickers: string[]) => {
    const key = scopedKey(keys.favorites);
    if (key) writeJson(key, tickers);
  },
  toggleFavorite: (ticker: string) => {
    const key = scopedKey(keys.favorites);
    if (!key) return storage.getFavorites();
    const favorites = storage.getFavorites();
    const next = favorites.includes(ticker) ? favorites.filter((item) => item !== ticker) : [...favorites, ticker];
    writeJson(key, next);
    cloudSyncService.syncSoon();
    return next;
  },
  getNotes: () => {
    const key = scopedKey(keys.notes);
    return key ? readJson<Record<string, StockNote>>(key, {}) : {};
  },
  getNote: (ticker: string) => storage.getNotes()[ticker],
  saveNote: (note: StockNote) => {
    const key = scopedKey(keys.notes);
    if (!key) return false;
    const notes = storage.getNotes();
    writeJson(key, { ...notes, [note.ticker]: note });
    cloudSyncService.syncSoon();
    return true;
  },
  getTags: () => {
    const key = scopedKey(keys.tags);
    return key ? readJson<Record<string, WatchTag>>(key, {}) : {};
  },
  setTag: (ticker: string, tag: WatchTag) => {
    const key = scopedKey(keys.tags);
    if (!key) return false;
    const tags = storage.getTags();
    writeJson(key, { ...tags, [ticker]: tag });
    cloudSyncService.syncSoon();
    return true;
  }
};
