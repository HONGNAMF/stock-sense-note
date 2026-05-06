"use client";

import type { LocalProfile, UserSettings } from "@/types/investment";
import { localStore } from "@/services/localStore";

const profileKey = "haeseok-note:v2:profile";
const settingsKey = "haeseok-note:v2:settings";

export const profileService = {
  getProfile: () => localStore.readJson<LocalProfile | null>(profileKey, null),
  saveProfile: (profile: LocalProfile) => localStore.writeJson(profileKey, profile),
  getSettings: () =>
    localStore.readJson<UserSettings>(settingsKey, {
      viewMode: "기본 보기",
      defaultBrokerDomestic: "토스증권",
      defaultBrokerOverseas: "미니스탁",
      defaultBrokerEtf: "토스증권"
    }),
  saveSettings: (settings: UserSettings) => localStore.writeJson(settingsKey, settings)
};
