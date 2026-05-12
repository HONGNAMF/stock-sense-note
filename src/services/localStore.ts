"use client";

function getStorage() {
  if (typeof window === "undefined") return null;
  const cloudSyncEnabled = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  return cloudSyncEnabled ? window.sessionStorage : window.localStorage;
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = getStorage()?.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  try {
    getStorage()?.setItem(key, JSON.stringify(value));
  } catch {
    throw new Error("브라우저 저장 공간이 부족해 저장하지 못했어요. 프로필 사진을 작게 바꾸거나 사진 없이 저장해주세요.");
  }
}

function remove(key: string) {
  getStorage()?.removeItem(key);
}

export const localStore = { readJson, writeJson, remove };
