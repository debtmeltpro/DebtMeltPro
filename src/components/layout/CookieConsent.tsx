'use client';

// ============================================================
// DebtFreedom — Cookie Consent Banner
// GDPR/CCPA compliant. Stores consent in localStorage.
// Required before loading Google Analytics or AdSense.
// ============================================================

import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store/app-store';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function CookieConsent() {
  const { cookieConsent, setCookieConsent } = useAppStore();
  const [visible, setVisible] = useState(false);

  // Only show after hydration to prevent SSR mismatch
  useEffect(() => {
    if (cookieConsent === null) {
      // Small delay for better UX — let page render first
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [cookieConsent]);

  const handleAccept = () => {
    setCookieConsent(true);
    setVisible(false);
    // Signal analytics/ads to load
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookieConsentGranted'));
    }
  };

  const handleDecline = () => {
    setCookieConsent(false);
    setVisible(false);
  };

  if (!visible || cookieConsent !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className={cn(
        'fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-[9999]',
        'animate-slide-up'
      )}
    >
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-100 dark:bg-amber-950 rounded-lg">
              <Cookie className="w-4 h-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            </div>
            <h2 className="font-semibold text-slate-900 dark:text-white text-sm">
              We use cookies
            </h2>
          </div>
          <button
            onClick={handleDecline}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors -mt-0.5"
            aria-label="Close cookie banner"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
          We use cookies to analyze site traffic and serve relevant ads. No personal financial
          data you enter is ever stored or transmitted. See our{' '}
          <Link
            href="/privacy-policy"
            className="text-brand-600 dark:text-brand-400 underline underline-offset-2 hover:no-underline"
          >
            Privacy Policy
          </Link>{' '}
          for details.
        </p>

        <div className="flex gap-2.5">
          <button
            onClick={handleAccept}
            className="flex-1 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Accept All
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg transition-colors"
          >
            Essential Only
          </button>
        </div>

        <p className="mt-3 text-2xs text-slate-400 dark:text-slate-500 text-center">
          By using this site you agree to our{' '}
          <Link href="/terms" className="underline hover:no-underline">Terms of Service</Link>.
          GDPR &amp; CCPA compliant.
        </p>
      </div>
    </div>
  );
}
