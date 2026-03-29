'use client';

// ============================================================
// DebtMeltPro — Google Analytics (GA4) Integration
// Only loads after cookie consent is granted (GDPR compliant).
// Tracks page views automatically via Next.js router events.
// ============================================================

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useAppStore } from '@/lib/store/app-store';

const GA_ID = process.env['NEXT_PUBLIC_GA_ID'];

export function GoogleAnalytics() {
  const { cookieConsent } = useAppStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route change
  useEffect(() => {
    if (!GA_ID || cookieConsent !== true) return;
    if (typeof window === 'undefined') return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // gtag page_view event
    if ('gtag' in window && typeof window.gtag === 'function') {
      window.gtag('config', GA_ID, {
        page_path: url,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams, cookieConsent]);

  // Don't render anything if no GA ID or no consent
  if (!GA_ID || cookieConsent !== true) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure',
          });
        `}
      </Script>
    </>
  );
}

// Type augmentation for window.gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
