"use client";

import type { StockNote, WatchTag } from "@/types";
import type { InvestmentProfile, LocalProfile, RecommendedItemRecord, ReflectionRecord, TradeRecord, UserSettings } from "@/types/investment";
import { localStore } from "@/services/localStore";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const keys = {
  profiles: "sensefolio:v1:profiles",
  currentProfileId: "sensefolio:v1:current-profile-id",
  settings: "sensefolio:v1:settings",
  favorites: "sensefolio:v1:favorites",
  notes: "sensefolio:v1:notes",
  tags: "sensefolio:v1:tags",
  reflections: "sensefolio:v1:reflections",
  trades: "sensefolio:v1:trades",
  recommendedItems: "sensefolio:v1:recommended-items"
};

type ProfileRow = {
  id: string;
  nickname: string;
  profile_image_url?: string | null;
  created_at?: string;
  updated_at?: string;
};

function enabled() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function normalizeNickname(nickname: string) {
  return nickname.trim().toLowerCase();
}

function scopedKey(base: string, userId: string) {
  return `${base}:${userId}`;
}

async function request<T>(path: string, init?: RequestInit) {
  if (!enabled()) return null;
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_ANON_KEY ?? "",
      Authorization: `Bearer ${SUPABASE_ANON_KEY ?? ""}`,
      "Content-Type": "application/json",
      ...(init?.method === "POST" ? { Prefer: "resolution=merge-duplicates,return=representation" } : {}),
      ...init?.headers
    }
  });
  if (!response.ok) throw new Error(`Supabase request failed: ${response.status}`);
  if (response.status === 204) return null;
  return (await response.json()) as T;
}

function cacheProfile(profile: LocalProfile) {
  const profiles = localStore.readJson<LocalProfile[]>(keys.profiles, []);
  const next = [profile, ...profiles.filter((item) => item.localUserId !== profile.localUserId && normalizeNickname(item.nickname) !== normalizeNickname(profile.nickname))];
  localStore.writeJson(keys.profiles, next);
  localStore.writeJson(keys.currentProfileId, profile.localUserId);
}

function profileFromRow(row: ProfileRow, extras?: Partial<LocalProfile>): LocalProfile {
  const now = new Date().toISOString();
  return {
    localUserId: row.id,
    nickname: row.nickname,
    name: row.nickname,
    profileImageUrl: row.profile_image_url ?? "",
    interests: extras?.interests ?? [],
    watchSymbols: extras?.watchSymbols ?? [],
    investorSummary: extras?.investorSummary,
    investmentProfile: extras?.investmentProfile,
    preferences: extras?.preferences,
    viewMode: extras?.viewMode ?? "standard",
    onboardingCompleted: extras?.onboardingCompleted ?? Boolean(extras?.investmentProfile),
    createdAt: row.created_at ?? now,
    updatedAt: row.updated_at ?? now
  };
}

export type LoadedUserData = {
  profile: LocalProfile;
  settings: UserSettings;
  favorites: string[];
  notes: Record<string, StockNote>;
  tags: Record<string, WatchTag>;
  reflections: Record<string, ReflectionRecord>;
  trades: TradeRecord[];
  recommendedItems: RecommendedItemRecord[];
};

export const syncService = {
  enabled,
  statusLabel: () => (enabled() ? "클라우드 저장 연결됨" : "임시 저장소 사용 중"),
  findProfileByNickname: async (nickname: string) => {
    const rows = await request<ProfileRow[]>(`profiles?nickname=eq.${encodeURIComponent(normalizeNickname(nickname))}&select=*`);
    return rows?.[0] ?? null;
  },
  createProfile: async (profile: LocalProfile) => {
    if (!enabled()) return null;
    const rows = await request<ProfileRow[]>(`profiles?on_conflict=id`, {
      method: "POST",
      body: JSON.stringify({
        id: profile.localUserId,
        nickname: normalizeNickname(profile.nickname),
        profile_image_url: profile.profileImageUrl || null,
        updated_at: new Date().toISOString()
      })
    });
    return rows?.[0] ?? null;
  },
  updateProfile: async (profile: LocalProfile) => {
    if (!enabled()) return false;
    await request<ProfileRow[]>(`profiles?id=eq.${encodeURIComponent(profile.localUserId)}`, {
      method: "PATCH",
      body: JSON.stringify({
        nickname: normalizeNickname(profile.nickname),
        profile_image_url: profile.profileImageUrl || null,
        updated_at: new Date().toISOString()
      })
    });
    return true;
  },
  loadUserData: async (userId: string): Promise<LoadedUserData | null> => {
    if (!enabled()) return null;
    const [profiles, interests, settings, investmentRows, favoriteRows, reflectionRows, tradeRows, recommendedRows] = await Promise.all([
      request<ProfileRow[]>(`profiles?id=eq.${encodeURIComponent(userId)}&select=*`),
      request<Array<{ interest_tag: string }>>(`user_interests?user_id=eq.${encodeURIComponent(userId)}&select=interest_tag`),
      request<Array<{ view_mode?: string; default_broker_domestic?: string; default_broker_overseas?: string; default_broker_etf?: string }>>(`user_settings?user_id=eq.${encodeURIComponent(userId)}&select=*`),
      request<Array<Record<string, string>>>(`user_investment_profile?user_id=eq.${encodeURIComponent(userId)}&select=*`),
      request<Array<{ stock_id: string }>>(`favorites?user_id=eq.${encodeURIComponent(userId)}&select=stock_id`),
      request<Array<Record<string, unknown>>>(`user_stock_reflections?user_id=eq.${encodeURIComponent(userId)}&select=*`),
      request<Array<Record<string, unknown>>>(`trades?user_id=eq.${encodeURIComponent(userId)}&select=*`),
      request<Array<Record<string, unknown>>>(`recommended_items?user_id=eq.${encodeURIComponent(userId)}&select=*`)
    ]);
    const row = profiles?.[0];
    if (!row) return null;
    const investmentProfile = investmentRows?.[0]
      ? {
          riskLevel: (investmentRows[0].risk_level as InvestmentProfile["riskLevel"]) ?? "중간",
          investmentPeriod: (investmentRows[0].investment_period as InvestmentProfile["investmentPeriod"]) ?? "중기",
          informationStyle: (investmentRows[0].information_style as InvestmentProfile["informationStyle"]) ?? "회사 사업 이해 선호",
          interestStyle: (investmentRows[0].interest_style as InvestmentProfile["interestStyle"]) ?? "취향 기반",
          buyStyle: (investmentRows[0].buy_style as InvestmentProfile["buyStyle"]) ?? "신중형",
          reviewStyle: (investmentRows[0].review_style as InvestmentProfile["reviewStyle"]) ?? "기록 보통",
          resultSummary: (investmentRows[0].result_summary as string) ?? "취향 기반 + 회사 이해형",
          traits: [],
          cautions: [],
          usageTips: [],
          createdAt: (investmentRows[0].created_at as string) ?? new Date().toISOString(),
          updatedAt: (investmentRows[0].updated_at as string) ?? new Date().toISOString()
        }
      : undefined;
    const setting = settings?.[0];
    const userSettings: UserSettings = {
      viewMode: setting?.view_mode === "simple" || setting?.view_mode === "detailed" ? setting.view_mode : "standard",
      defaultBrokerDomestic: setting?.default_broker_domestic ?? "토스증권",
      defaultBrokerOverseas: setting?.default_broker_overseas ?? "미니스탁",
      defaultBrokerEtf: setting?.default_broker_etf ?? "토스증권"
    };
    const profile = profileFromRow(row, {
      interests: interests?.map((item) => item.interest_tag) ?? [],
      investorSummary: investmentProfile?.resultSummary,
      investmentProfile,
      viewMode: userSettings.viewMode,
      onboardingCompleted: Boolean(investmentProfile)
    });
    const favorites = favoriteRows?.map((item) => item.stock_id) ?? [];
    const reflections = Object.fromEntries(
      (reflectionRows ?? []).map((item) => [
        item.stock_id as string,
        {
          assetKey: item.stock_id as string,
          assetKind: "stock" as const,
          heartRating: (item.heart_rating as 1 | 2 | 3) ?? 2,
          reasonWatching: (item.reason_watching as string) ?? "",
          reasonNotBuying: (item.reason_not_buying as string) ?? "",
          buyIntention: (item.buy_intention as ReflectionRecord["buyIntention"]) ?? "고민 중",
          sellStandard: (item.sell_standard as ReflectionRecord["sellStandard"]) ?? "상황 보고 판단",
          createdAt: (item.created_at as string) ?? new Date().toISOString()
        }
      ])
    );
    const trades = (tradeRows ?? []).map((item) => ({
      id: (item.id as string) ?? crypto.randomUUID(),
      assetKey: item.stock_id as string,
      assetName: (item.stock_id as string) ?? "",
      assetKind: "stock" as const,
      tradeType: (item.trade_type as TradeRecord["tradeType"]) ?? "매수",
      tradeDate: (item.trade_date as string) ?? new Date().toISOString().slice(0, 10),
      price: String(item.price ?? ""),
      quantity: String(item.quantity ?? ""),
      reason: (item.reason as string) ?? "",
      emotion: (item.emotion as string) ?? "",
      heartRating: 2 as const,
      riskJudgement: "중간" as const,
      aiOneLine: "클라우드에서 불러온 거래 기록입니다.",
      createdAt: (item.created_at as string) ?? new Date().toISOString()
    }));
    const recommendedItems = (recommendedRows ?? []).map((item) => ({
      id: (item.id as string) ?? crypto.randomUUID(),
      localUserId: userId,
      stockId: item.stock_id as string,
      reason: (item.reason as string) ?? "",
      category: (item.category as string) ?? "",
      riskLevel: (item.risk_level as RecommendedItemRecord["riskLevel"]) ?? "중간",
      wasSaved: Boolean(item.was_saved),
      createdAt: (item.created_at as string) ?? new Date().toISOString()
    }));
    return { profile, settings: userSettings, favorites, notes: {}, tags: {}, reflections, trades, recommendedItems };
  },
  hydrateLocal: (data: LoadedUserData) => {
    cacheProfile(data.profile);
    localStore.writeJson(keys.settings, data.settings);
    localStore.writeJson(scopedKey(keys.favorites, data.profile.localUserId), data.favorites);
    localStore.writeJson(scopedKey(keys.notes, data.profile.localUserId), data.notes);
    localStore.writeJson(scopedKey(keys.tags, data.profile.localUserId), data.tags);
    localStore.writeJson(scopedKey(keys.reflections, data.profile.localUserId), data.reflections);
    localStore.writeJson(scopedKey(keys.trades, data.profile.localUserId), data.trades);
    localStore.writeJson(scopedKey(keys.recommendedItems, data.profile.localUserId), data.recommendedItems);
  },
  saveUserData: async (userId: string, payload: Partial<LoadedUserData>) => {
    if (!enabled()) return false;
    if (payload.profile) await syncService.createProfile(payload.profile);
    if (payload.profile?.interests) {
      await request(`user_interests?user_id=eq.${encodeURIComponent(userId)}`, { method: "DELETE" });
      if (payload.profile.interests.length) {
        await request("user_interests", {
          method: "POST",
          body: JSON.stringify(payload.profile.interests.map((interest) => ({ user_id: userId, interest_tag: interest })))
        });
      }
    }
    if (payload.profile?.investmentProfile) {
      const p = payload.profile.investmentProfile;
      await request("user_investment_profile?on_conflict=user_id", {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          risk_level: p.riskLevel,
          investment_period: p.investmentPeriod,
          information_style: p.informationStyle,
          interest_style: p.interestStyle,
          buy_style: p.buyStyle,
          review_style: p.reviewStyle,
          result_summary: p.resultSummary,
          updated_at: new Date().toISOString()
        })
      });
    }
    if (payload.settings) {
      await request("user_settings?on_conflict=user_id", {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          view_mode: payload.settings.viewMode,
          default_broker_domestic: payload.settings.defaultBrokerDomestic,
          default_broker_overseas: payload.settings.defaultBrokerOverseas,
          default_broker_etf: payload.settings.defaultBrokerEtf,
          updated_at: new Date().toISOString()
        })
      });
    }
    if (payload.favorites) {
      await request(`favorites?user_id=eq.${encodeURIComponent(userId)}`, { method: "DELETE" });
      if (payload.favorites.length) {
        await request("favorites", {
          method: "POST",
          body: JSON.stringify(payload.favorites.map((stockId) => ({ user_id: userId, stock_id: stockId })))
        });
      }
    }
    if (payload.reflections) {
      await request(`user_stock_reflections?user_id=eq.${encodeURIComponent(userId)}`, { method: "DELETE" });
      const rows = Object.values(payload.reflections);
      if (rows.length) {
        await request("user_stock_reflections", {
          method: "POST",
          body: JSON.stringify(
            rows.map((row) => ({
              user_id: userId,
              stock_id: row.assetKey,
              heart_rating: row.heartRating,
              reason_watching: row.reasonWatching,
              reason_not_buying: row.reasonNotBuying,
              buy_intention: row.buyIntention,
              sell_standard: row.sellStandard,
              created_at: row.createdAt
            }))
          )
        });
      }
    }
    if (payload.trades) {
      await request(`trades?user_id=eq.${encodeURIComponent(userId)}`, { method: "DELETE" });
      if (payload.trades.length) {
        await request("trades", {
          method: "POST",
          body: JSON.stringify(
            payload.trades.map((trade) => ({
              id: trade.id,
              user_id: userId,
              stock_id: trade.assetKey,
              trade_type: trade.tradeType,
              trade_date: trade.tradeDate,
              price: Number.parseFloat(trade.price.replace(/,/g, "")) || null,
              quantity: Number.parseFloat(trade.quantity.replace(/,/g, "")) || null,
              reason: trade.reason,
              emotion: trade.emotion,
              created_at: trade.createdAt
            }))
          )
        });
      }
    }
    if (payload.recommendedItems) {
      await request(`recommended_items?user_id=eq.${encodeURIComponent(userId)}`, { method: "DELETE" });
      if (payload.recommendedItems.length) {
        await request("recommended_items", {
          method: "POST",
          body: JSON.stringify(
            payload.recommendedItems.map((item) => ({
              user_id: userId,
              stock_id: item.stockId,
              reason: item.reason,
              category: item.category,
              risk_level: item.riskLevel,
              was_saved: item.wasSaved,
              created_at: item.createdAt
            }))
          )
        });
      }
    }
    return true;
  },
  syncLocalToCloud: async (userId: string) => {
    const profiles = localStore.readJson<LocalProfile[]>(keys.profiles, []);
    const profile = profiles.find((item) => item.localUserId === userId);
    if (!profile) return false;
    return syncService.saveUserData(userId, {
      profile,
      settings: localStore.readJson<UserSettings>(keys.settings, {
        viewMode: "standard",
        defaultBrokerDomestic: "토스증권",
        defaultBrokerOverseas: "미니스탁",
        defaultBrokerEtf: "토스증권"
      }),
      favorites: localStore.readJson<string[]>(scopedKey(keys.favorites, userId), []),
      reflections: localStore.readJson<Record<string, ReflectionRecord>>(scopedKey(keys.reflections, userId), {}),
      trades: localStore.readJson<TradeRecord[]>(scopedKey(keys.trades, userId), []),
      recommendedItems: localStore.readJson<RecommendedItemRecord[]>(scopedKey(keys.recommendedItems, userId), [])
    });
  }
};
