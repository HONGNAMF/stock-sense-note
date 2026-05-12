"use client";

import type { LocalProfile } from "@/types/investment";
import { cloudSyncService } from "@/services/cloudSyncService";
import { profileService, validateNickname } from "@/services/profileService";
import { syncService } from "@/services/syncService";

export const authService = {
  checkNicknameDuplicate: async (nickname: string, currentId?: string) => {
    const localError = validateNickname(nickname, profileService.getProfiles(), currentId);
    if (localError) return localError;
    if (await syncService.findProfileByNickname(nickname).catch(() => null)) return "이미 사용 중인 닉네임이에요. 다른 닉네임을 입력해주세요.";
    if (await cloudSyncService.hasCloudProfile(nickname).catch(() => false)) return "이미 사용 중인 닉네임이에요. 다른 닉네임을 입력해주세요.";
    return "";
  },
  nicknameLogin: async (nickname: string) => {
    const cloudProfile = await syncService.findProfileByNickname(nickname).catch(() => null);
    if (cloudProfile) {
      const data = await syncService.loadUserData(cloudProfile.id).catch(() => null);
      if (data) {
        syncService.hydrateLocal(data);
        return data.profile;
      }
    }
    return profileService.findProfile(nickname) ?? (await cloudSyncService.loginByNickname(nickname).catch(() => null));
  },
  signupWithNickname: async (profile: LocalProfile) => {
    const error = await authService.checkNicknameDuplicate(profile.nickname);
    if (error) throw new Error(error);
    profileService.createProfile(profile);
    await syncService.createProfile(profile).catch(() => null);
    await syncService.saveUserData(profile.localUserId, { profile }).catch(() => false);
    await cloudSyncService.upsertProfileSnapshot(profile).catch(() => false);
    return profile;
  }
};
