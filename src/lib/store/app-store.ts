// ============================================================
// DebtMeltPro — Global Zustand Store
// Persists user preferences, cookie consent, and last-used tool
// across navigation without server round-trips.
// ============================================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AppStore } from '@/types';

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      cookieConsent: null,
      setCookieConsent: (value: boolean) => set({ cookieConsent: value }),
      lastTool: null,
      setLastTool: (tool: string) => set({ lastTool: tool }),
    }),
    {
      name: 'DebtMeltPro-preferences',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cookieConsent: state.cookieConsent,
        lastTool: state.lastTool,
      }),
    }
  )
);
