/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// ============================================================
// DebtMeltPro — Global Zustand Store
// Persists user preferences, cookie consent, and last-used tool
// across navigation without server round-trips.
// ============================================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AppStore } from '@/types';

const noopStorage = {
  getItem: (_name: string) => null,
  setItem: (_name: string, _value: string) => {},
  removeItem: (_name: string) => {},
} as any;

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
      storage: createJSONStorage(() =>
        typeof window === 'undefined' ? noopStorage : window.localStorage,
      ),
      partialize: (state) => ({
        cookieConsent: state.cookieConsent,
        lastTool: state.lastTool,
      }),
    }
  )
);
