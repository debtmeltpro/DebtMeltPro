'use client';

// ============================================================
// DebtFreedom — Ad Slot Component
// Each slot is a named export (NOT object.property) so that
// Next.js 14 RSC bundler can resolve them in Server Components.
// ============================================================

import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store/app-store';
import { cn } from '@/lib/utils';

type AdSlotVariant = 'rectangle' | 'leaderboard' | 'skyscraper' | 'in-article';

interface AdSlotProps {
  adSlot?: string;
  variant?: AdSlotVariant;
  className?: string;
  showLabel?: boolean;
}

const SLOT_DIMENSIONS: Record<AdSlotVariant, { width: number; height: number }> = {
  rectangle:    { width: 300, height: 250 },
  leaderboard:  { width: 728, height: 90 },
  skyscraper:   { width: 160, height: 600 },
  'in-article': { width: 728, height: 90 },
};

function AdPlaceholder({
  variant,
  className,
}: {
  variant: AdSlotVariant;
  className?: string;
}) {
  const dims = SLOT_DIMENSIONS[variant];
  return (
    <div
      className={cn(
        'bg-slate-100 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center',
        className
      )}
      style={{ minHeight: dims.height, minWidth: Math.min(dims.width, 300) }}
      aria-hidden="true"
    >
      <span className="text-xs text-slate-400 dark:text-slate-600 select-none">Ad</span>
    </div>
  );
}

export function AdSlot({
  adSlot,
  variant = 'rectangle',
  className,
  showLabel = true,
}: AdSlotProps) {
  const { cookieConsent } = useAppStore();
  const [adsLoaded, setAdsLoaded] = useState(false);
  const dims = SLOT_DIMENSIONS[variant];

  useEffect(() => {
    if (cookieConsent !== true || !adSlot) return;

    const initAds = () => {
      try {
        if (typeof window !== 'undefined' && 'adsbygoogle' in window) {
          // @ts-expect-error adsbygoogle injected by Google
          (window.adsbygoogle = window.adsbygoogle ?? []).push({});
          setAdsLoaded(true);
        }
      } catch (err) {
        console.warn('[AdSlot] AdSense push failed:', err);
      }
    };

    if (!document.getElementById('adsense-script')) {
      const script = document.createElement('script');
      script.id = 'adsense-script';
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.dataset['adClient'] = process.env['NEXT_PUBLIC_ADSENSE_ID'] ?? '';
      script.crossOrigin = 'anonymous';
      script.onload = initAds;
      document.head.appendChild(script);
    } else {
      initAds();
    }

    const handler = () => initAds();
    window.addEventListener('cookieConsentGranted', handler);
    return () => window.removeEventListener('cookieConsentGranted', handler);
  }, [cookieConsent, adSlot]);

  // Dev mode or no slot ID → show placeholder
  if (process.env.NODE_ENV === 'development' || !adSlot) {
    return (
      <div className={cn('flex flex-col items-center gap-1.5', className)}>
        {showLabel && (
          <p className="text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-wide font-medium">
            Advertisement
          </p>
        )}
        <AdPlaceholder variant={variant} />
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center gap-1.5', className)}>
      {showLabel && (
        <p className="text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-wide font-medium">
          Advertisement
        </p>
      )}
      <div
        style={{
          minWidth: Math.min(dims.width, 320),
          minHeight: dims.height,
          contain: 'layout size',
        }}
      >
        {cookieConsent === true ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={process.env['NEXT_PUBLIC_ADSENSE_ID']}
            data-ad-slot={adSlot}
            data-ad-format={variant === 'in-article' ? 'fluid' : 'auto'}
            data-full-width-responsive="true"
          />
        ) : (
          <AdPlaceholder variant={variant} />
        )}
      </div>
    </div>
  );
}

// ── Named slot exports (NOT object properties) ────────────────
// Each is its own export so Next.js RSC manifest can resolve them.

export function AdSlotLeaderboard({ className }: { className?: string }) {
  return (
    <AdSlot
      adSlot={process.env['NEXT_PUBLIC_AD_SLOT_LEADERBOARD']}
      variant="leaderboard"
      className={cn('hidden md:flex my-6 mx-auto', className)}
    />
  );
}

export function AdSlotInContent({ className }: { className?: string }) {
  return (
    <AdSlot
      adSlot={process.env['NEXT_PUBLIC_AD_SLOT_IN_CONTENT']}
      variant="rectangle"
      className={cn('my-8 mx-auto', className)}
    />
  );
}

export function AdSlotInArticle({ className }: { className?: string }) {
  return (
    <AdSlot
      adSlot={process.env['NEXT_PUBLIC_AD_SLOT_IN_ARTICLE']}
      variant="in-article"
      className={cn('my-6', className)}
      showLabel={false}
    />
  );
}
