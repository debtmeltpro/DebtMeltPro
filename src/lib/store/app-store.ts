/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// ============================================================
// DebtMeltPro — Global Zustand Store
// Persists strictly functional user UI preferences (last-used tool)
// across navigation without server round-trips.
//
// PRIVACY:
// - Stores only local functional UI state (lastTool).
// - Zero tracking, analytics, or profiling data.
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
      lastTool: null,
      setLastTool: (tool: string) => set({ lastTool: tool }),
    }),
    {
      name: 'DebtMeltPro-preferences',
      storage: createJSONStorage(() =>
        typeof window === 'undefined' ? noopStorage : window.localStorage,
      ),
      partialize: (state) => ({
        lastTool: state.lastTool,
      }),
    }
  )
);
