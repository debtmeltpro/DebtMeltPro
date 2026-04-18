'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppStore } from '@/lib/store/app-store';
import { cn } from '@/lib/utils';
import { AD_PLACEMENTS, ADSENSE_CLIENT_ID, type AdPlacementKey, type AdSize } from '@/lib/adsConfig';

interface AdSlotProps {
  /** Use a centralized placement key (preferred) */
  placement?: AdPlacementKey;
  /** Back-compat: allow direct AdSense slot id */
  adSlot?: string | undefined;
  /** Back-compat: keep existing variants */
  variant?: 'rectangle' | 'leaderboard' | 'skyscraper' | 'in-article';
  className?: string | undefined;
  showLabel?: boolean;
  /** Optional: hide container entirely when no-fill */
  hideOnNoFill?: boolean;
}

function AdPlaceholder({ size, className }: { size: AdSize; className?: string | undefined }) {
  return (
    <div
      className={cn(
        'w-full bg-slate-100 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center animate-pulse',
        className,
      )}
      style={{ minHeight: size.height }}
      aria-hidden="true"
    >
      <span className="text-xs text-slate-400 dark:text-slate-600 select-none">Ad</span>
    </div>
  );
}

let adsenseScriptPromise: Promise<void> | null = null;
function loadAdSenseScript(): Promise<void> {
  if (adsenseScriptPromise) return adsenseScriptPromise;
  adsenseScriptPromise = new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve();
    if (document.getElementById('adsense-script')) return resolve();
    const script = document.createElement('script');
    script.id = 'adsense-script';
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    script.dataset['adClient'] = ADSENSE_CLIENT_ID;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
  return adsenseScriptPromise;
}

function PromoFallback({ size }: { size: AdSize }) {
  return (
    <div
      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-sm text-slate-600 dark:text-slate-400"
      style={{ minHeight: size.height }}
    >
      <span className="px-4 text-center">
        Try our free calculators — no signup, runs entirely in your browser.
      </span>
    </div>
  );
}

export function AdSlot({
  placement,
  adSlot,
  variant = 'rectangle',
  className,
  showLabel = true,
  hideOnNoFill = false,
}: AdSlotProps) {
  const { cookieConsent } = useAppStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [noFill, setNoFill] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  const placementConfig = placement ? AD_PLACEMENTS[placement] : null;
  const resolvedSlot = placementConfig?.slot || adSlot || '';
  const resolvedShowLabel = placementConfig ? placementConfig.showLabel : showLabel;
  const size: AdSize = useMemo(() => {
    if (placementConfig) return placementConfig.size;
    if (variant === 'leaderboard' || variant === 'in-article') return { width: 728, height: 90 };
    if (variant === 'skyscraper') return { width: 160, height: 600 };
    return { width: 300, height: 250 };
  }, [placementConfig, variant]);

  const maxWidthClass = useMemo(() => {
    if (placementConfig?.key === 'leaderboard' || placementConfig?.key === 'in_article') return 'max-w-[728px]';
    if (placementConfig?.key === 'skyscraper') return 'max-w-[160px]';
    if (placementConfig?.key === 'in_content') return 'max-w-[336px]';
    if (variant === 'leaderboard' || variant === 'in-article') return 'max-w-[728px]';
    if (variant === 'skyscraper') return 'max-w-[160px]';
    return 'max-w-[336px]';
  }, [placementConfig, variant]);

  const hideBelowMd = placementConfig?.hideBelowMd === true;

  const boxClass = cn('ad-slot w-full overflow-hidden rounded-lg', maxWidthClass);

  const boxStyle: React.CSSProperties = {
    minHeight: size.height,
    contain: 'layout size',
    backgroundColor: 'rgb(var(--surface-muted))',
  };

  const checkLoaded = () => {
    const adEl = adRef.current;
    if (!adEl) return false;
    const status = adEl.getAttribute('data-adsbygoogle-status');
    if (status === 'done') return true;
    const iframe = adEl.querySelector('iframe');
    if (iframe && iframe.getBoundingClientRect().height > 0) return true;
    return false;
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = containerRef.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (cookieConsent !== true || !resolvedSlot) return;
    if (!isVisible) return;
    const initAds = () => {
      try {
        const adEl = adRef.current;
        if (!adEl) return;

        // AdSense marks initialized nodes with this attribute. Avoid duplicate push.
        const status = adEl.getAttribute('data-adsbygoogle-status');
        if (status === 'done') {
          pushedRef.current = true;
          setIsLoaded(true);
          return;
        }

        if (pushedRef.current) return;

        if (typeof window !== 'undefined' && 'adsbygoogle' in window) {
          // @ts-expect-error adsbygoogle injected by Google
          (window.adsbygoogle = window.adsbygoogle ?? []).push({});
          pushedRef.current = true;
        }
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[AdSlot] AdSense push failed:', err);
        }
      }
    };
    loadAdSenseScript().then(() => initAds());
    const handler = () => initAds();
    window.addEventListener('cookieConsentGranted', handler);
    return () => window.removeEventListener('cookieConsentGranted', handler);
  }, [cookieConsent, resolvedSlot, isVisible]);

  useEffect(() => {
    if (cookieConsent !== true || !resolvedSlot) return;
    if (!isVisible) return;
    if (isLoaded) return;
    let raf = 0;
    const start = Date.now();
    const tick = () => {
      if (checkLoaded()) {
        setIsLoaded(true);
        return;
      }
      if (Date.now() - start > 4000) {
        setNoFill(true);
        return;
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [cookieConsent, resolvedSlot, isVisible, isLoaded]);

  const shouldHide = hideOnNoFill && noFill;

  if (process.env.NODE_ENV === 'development' || !resolvedSlot) {
    return (
      <div ref={containerRef} className={cn('w-full flex flex-col items-center gap-2', className)}>
        {/* {resolvedShowLabel && (
          <p className="text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-wide font-medium">
            Advertisement
          </p>
        )} */}
        {/* <div className={boxClass} style={boxStyle}>
          <AdPlaceholder size={size} />
        </div> */}
      </div>
    );
  }

  if (shouldHide) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full flex flex-col items-center gap-2',
        hideBelowMd && 'hidden md:flex',
        className,
      )}
    >
      {/* {resolvedShowLabel && (
        <p className="text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-wide font-medium">
          Advertisement
        </p>
      )} */}
      {/* <div className={boxClass} style={boxStyle}>
        {cookieConsent === true && isVisible && (
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100%', background: 'transparent' }}
            data-ad-client={ADSENSE_CLIENT_ID}
            data-ad-slot={resolvedSlot}
            data-ad-format={variant === 'in-article' ? 'fluid' : 'auto'}
            data-full-width-responsive="true"
          />
        )}
        {cookieConsent !== true || !isLoaded ? (
          <div className="w-full" style={{ minHeight: size.height }}>
            {noFill && cookieConsent === true ? (
              <PromoFallback size={size} />
            ) : (
              <AdPlaceholder size={size} className="border-0 bg-transparent dark:bg-transparent" />
            )}
          </div>
        ) : null}
      </div> */}
    </div>
  );
}

export function AdSlotLeaderboard({ className }: { className?: string | undefined }) {
  return <AdSlot placement="leaderboard" variant="leaderboard" className={cn('my-6 mx-auto', className)} />;
}

export function AdSlotInContent({ className }: { className?: string | undefined }) {
  return <AdSlot placement="in_content" variant="rectangle" className={cn('my-8 mx-auto', className)} />;
}

export function AdSlotInArticle({ className }: { className?: string | undefined }) {
  return <AdSlot placement="in_article" variant="in-article" className={cn('my-6', className)} showLabel={false} />;
}
