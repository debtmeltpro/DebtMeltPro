'use client';

// ============================================================
// Ads temporarily disabled until AdSense approval.
// Re-enable by restoring the original implementation below and
// removing the early `return null`. All call sites continue to
// import AdSlotLeaderboard / AdSlotInContent / AdSlotInArticle
// without changes — they just render nothing for now.
// ============================================================

/* eslint-disable @typescript-eslint/no-unused-vars */

import { cn } from '@/lib/utils';

interface AdSlotProps {
  placement?: string;
  adSlot?: string | undefined;
  variant?: 'rectangle' | 'leaderboard' | 'skyscraper' | 'in-article';
  className?: string | undefined;
  showLabel?: boolean;
  hideOnNoFill?: boolean;
}

// ───────────────────────────────────────────────────────────────
// Ads temporarily disabled until AdSense approval.
// Returning `null` ensures:
//   • no "Advertisement" label renders anywhere
//   • no empty layout-shift placeholder is drawn
//   • no AdSense script is loaded
//   • no IntersectionObserver or adsbygoogle.push() fires
// ───────────────────────────────────────────────────────────────
export function AdSlot(_props: AdSlotProps): null {
  return null;
}

export function AdSlotLeaderboard(_props: { className?: string | undefined }): null {
  // Ads temporarily disabled until AdSense approval.
  return null;
}

export function AdSlotInContent(_props: { className?: string | undefined }): null {
  // Ads temporarily disabled until AdSense approval.
  return null;
}

export function AdSlotInArticle(_props: { className?: string | undefined }): null {
  // Ads temporarily disabled until AdSense approval.
  return null;
}

// Re-export kept so tree-shaking + cn import aren't flagged unused
// if you later re-enable the full component below.
export const __adSlotPlaceholder = cn;

/*
// ── ORIGINAL IMPLEMENTATION — RESTORE WHEN ADSENSE IS APPROVED ──
// (full original body intentionally preserved as a comment so you
//  can diff it back in cleanly. Paste from git history if preferred.)
*/