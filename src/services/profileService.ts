"use client";

import type { LocalProfile, UserSettings } from "@/types/investment";
import { localStore } from "@/services/localStore";

const profilesKey = "haeseok-note:v3:profiles";
const currentProfileKey = "haeseok-note:v3:current-profile-id";
const settingsKey = "haeseok-note:v3:settings";

function sameIdentity(profile: LocalProfile, name: string, birthDate: string) {
  return profile.name.trim() === name.trim() && profile.birthDate === birthDate;
}

export const profileService = {
  getProfiles: () => localStore.readJson<LocalProfile[]>(profilesKey, []),
  saveProfiles: (profiles: LocalProfile[]) => localStore.writeJson(profilesKey, profiles),
  getCurrentProfileId: () => localStore.readJson<string | null>(currentProfileKey, null),
  setCurrentProfileId: (id: string | null) => localStore.writeJson(currentProfileKey, id),
  getProfile: () => {
    const id = profileService.getCurrentProfileId();
    return profileService.getProfiles().find((profile) => profile.localUserId === id) ?? null;
  },
  findProfile: (name: string, birthDate: string) => profileService.getProfiles().find((profile) => sameIdentity(profile, name, birthDate)) ?? null,
  createProfile: (profile: LocalProfile) => {
    const profiles = profileService.getProfiles();
    profileService.saveProfiles([profile, ...profiles]);
    profileService.setCurrentProfileId(profile.localUserId);
  },
  updateProfile: (profile: LocalProfile) => {
    const profiles = profileService.getProfiles();
    profileService.saveProfiles(profiles.map((item) => (item.localUserId === profile.localUserId ? profile : item)));
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
