"use client";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    throw new Error("브라우저 저장공간이 부족해서 저장하지 못했어요. 프로필 사진을 작게 바꾸거나 사진 없이 저장해 주세요.");
  }
}

export const localStore = { readJson, writeJson };
