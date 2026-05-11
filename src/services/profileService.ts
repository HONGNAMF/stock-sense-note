"use client";

import type { LocalProfile, UserSettings } from "@/types/investment";
import { localStore } from "@/services/localStore";
import { GUEST_ID } from "@/lib/brand";

const profilesKey = "sensefolio:v1:profiles";
const currentProfileKey = "sensefolio:v1:current-profile-id";
const settingsKey = "sensefolio:v1:settings";

function normalizeNickname(nickname: string) {
  return nickname.trim().toLowerCase();
}

export function validateNickname(nickname: string, profiles: LocalProfile[] = [], currentId?: string) {
  const value = nickname.trim();
  if (!value) return "닉네임을 입력해주세요.";
  if (value.length < 2) return "닉네임은 2자 이상 입력해주세요.";
  if (value.length > 12) return "닉네임은 12자 이하로 입력해주세요.";
  const duplicated = profiles.some((profile) => profile.localUserId !== currentId && normalizeNickname(profile.nickname || profile.name || "") === normalizeNickname(value));
  if (duplicated) return "이미 사용 중인 닉네임이에요.";
  return "";
}

function sameIdentity(profile: LocalProfile, nickname: string) {
  return normalizeNickname(profile.nickname || profile.name || "") === normalizeNickname(nickname);
}

export const profileService = {
  getProfiles: () => localStore.readJson<LocalProfile[]>(profilesKey, []),
  saveProfiles: (profiles: LocalProfile[]) => localStore.writeJson(profilesKey, profiles),
  getCurrentProfileId: () => localStore.readJson<string | null>(currentProfileKey, null),
  setCurrentProfileId: (id: string | null) => localStore.writeJson(currentProfileKey, id),
  getProfile: () => {
    const id = profileService.getCurrentProfileId();
    if (!id || id === GUEST_ID) return null;
    return profileService.getProfiles().find((profile) => profile.localUserId === id) ?? null;
  },
  findProfile: (nickname: string) => profileService.getProfiles().find((profile) => sameIdentity(profile, nickname)) ?? null,
  createProfile: (profile: LocalProfile) => {
    const profiles = profileService.getProfiles();
    const error = validateNickname(profile.nickname || profile.name || "", profiles);
    if (error) throw new Error(error);
    profileService.saveProfiles([{ ...profile, nickname: profile.nickname || profile.name || "" }, ...profiles]);
    profileService.setCurrentProfileId(profile.localUserId);
  },
  updateProfile: (profile: LocalProfile) => {
    const profiles = profileService.getProfiles();
    const error = validateNickname(profile.nickname || profile.name || "", profiles, profile.localUserId);
    if (error) throw new Error(error);
    profileService.saveProfiles(profiles.map((item) => (item.localUserId === profile.localUserId ? { ...profile, name: profile.nickname } : item)));
  },
  resetCurrentProfile: () => {
    const id = profileService.getCurrentProfileId();
    if (!id) return;
    profileService.saveProfiles(profileService.getProfiles().filter((profile) => profile.localUserId !== id));
    profileService.setCurrentProfileId(null);
  },
  getSettings: () =>
    localStore.readJson<UserSettings>(settingsKey, {
      viewMode: "standard",
      defaultBrokerDomestic: "토스증권",
      defaultBrokerOverseas: "미니스탁",
      defaultBrokerEtf: "토스증권"
    }),
  saveSettings: (settings: UserSettings) => localStore.writeJson(settingsKey, settings)
};
