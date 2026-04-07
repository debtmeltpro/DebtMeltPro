export type AdProviderType = 'adsense' | 'custom';

export type AdPlacementKey =
  | 'leaderboard'
  | 'in_content'
  | 'in_article'
  | 'skyscraper';

export type AdSize = { width: number; height: number };

export interface AdPlacementConfig {
  key: AdPlacementKey;
  provider: AdProviderType;
  /** For AdSense */
  slot?: string;
  /** Visual sizing to reserve space (CLS = 0) */
  size: AdSize;
  /** If true, show "ADVERTISEMENT" label */
  showLabel: boolean;
  /** Optional: hide on small screens */
  hideBelowMd?: boolean;
}

export const ADSENSE_CLIENT_ID = process.env['NEXT_PUBLIC_ADSENSE_ID'] ?? '';

export const AD_PLACEMENTS: Record<AdPlacementKey, AdPlacementConfig> = {
  leaderboard: {
    key: 'leaderboard',
    provider: 'adsense',
    slot: process.env['NEXT_PUBLIC_AD_SLOT_LEADERBOARD'] ?? '',
    size: { width: 728, height: 90 },
    showLabel: true,
    hideBelowMd: true,
  },
  in_content: {
    key: 'in_content',
    provider: 'adsense',
    slot: process.env['NEXT_PUBLIC_AD_SLOT_IN_CONTENT'] ?? '',
    size: { width: 300, height: 250 },
    showLabel: true,
  },
  in_article: {
    key: 'in_article',
    provider: 'adsense',
    slot: process.env['NEXT_PUBLIC_AD_SLOT_IN_ARTICLE'] ?? '',
    size: { width: 728, height: 90 },
    showLabel: false,
  },
  skyscraper: {
    key: 'skyscraper',
    provider: 'adsense',
    slot: process.env['NEXT_PUBLIC_AD_SLOT_SKYSCRAPER'] ?? '',
    size: { width: 160, height: 600 },
    showLabel: true,
  },
};

