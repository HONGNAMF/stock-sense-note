"use client";

import type { InvestmentProfile, LocalProfile } from "@/types/investment";
import { profileService } from "@/services/profileService";
import { syncService } from "@/services/syncService";

export const investmentProfileService = {
  getInvestmentProfile: (userId?: string) => {
    const profile = profileService.getProfiles().find((item) => item.localUserId === userId) ?? profileService.getProfile();
    return profile?.investmentProfile;
  },
  saveInvestmentProfile: async (userId: string, result: InvestmentProfile) => {
    const profile = profileService.getProfiles().find((item) => item.localUserId === userId);
    if (!profile) return false;
    const next: LocalProfile = { ...profile, investmentProfile: result, investorSummary: result.resultSummary, onboardingCompleted: true, updatedAt: new Date().toISOString() };
    profileService.updateProfile(next);
    await syncService.saveUserData(userId, { profile: next }).catch(() => false);
    return true;
  },
  updateInvestmentProfile: async (userId: string, result: InvestmentProfile) => investmentProfileService.saveInvestmentProfile(userId, result)
};
