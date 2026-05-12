"use client";

import { storage } from "@/lib/storage";
import { profileService } from "@/services/profileService";
import { syncService } from "@/services/syncService";

export const favoriteService = {
  getFavorites: () => storage.getFavorites(),
  toggleFavorite: async (stockId: string) => {
    const next = storage.toggleFavorite(stockId);
    const userId = profileService.getCurrentProfileId();
    if (userId) await syncService.saveUserData(userId, { favorites: next }).catch(() => false);
    return next;
  }
};
