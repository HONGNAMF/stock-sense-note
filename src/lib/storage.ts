"use client";

import type { StockNote, UserProfile, WatchTag } from "@/types";

const keys = {
  profile: "haeseok-note:profile",
  favorites: "haeseok-note:favorites",
  notes: "haeseok-note:notes",
  tags: "haeseok-note:tags"
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

export const storage = {
  getProfile: () => readJson<UserProfile | null>(keys.profile, null),
  setProfile: (profile: UserProfile) => writeJson(keys.profile, profile),
  getFavorites: () => readJson<string[]>(keys.favorites, []),
  setFavorites: (tickers: string[]) => writeJson(keys.favorites, tickers),
  toggleFavorite: (ticker: string) => {
    const favorites = storage.getFavorites();
    const next = favorites.includes(ticker) ? favorites.filter((item) => item !== ticker) : [...favorites, ticker];
    storage.setFavorites(next);
    return next;
  },
  getNotes: () => readJson<Record<string, StockNote>>(keys.notes, {}),
  getNote: (ticker: string) => storage.getNotes()[ticker],
  saveNote: (note: StockNote) => {
    const notes = storage.getNotes();
    writeJson(keys.notes, { ...notes, [note.ticker]: note });
  },
  getTags: () => readJson<Record<string, WatchTag>>(keys.tags, {}),
  setTag: (ticker: string, tag: WatchTag) => {
    const tags = storage.getTags();
    writeJson(keys.tags, { ...tags, [ticker]: tag });
  }
};
