// ============================================================
// DebtMeltPro — Root Layout
// ============================================================

import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { GoogleAnalytics } from '@/components/seo/GoogleAnalytics';
import './globals.css';

// ─── Fonts ─────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'optional',
  preload: true,
  weight: ['700'],
  fallback: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
});

// ─── Constants ─────────────────────────────────────
const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] || 'https://debtmeltpro.com';
const SITE_NAME = 'DebtMeltPro';
const SITE_DESCRIPTION =
  'Free financial calculators: Debt payoff, mortgage, FIRE, credit card optimizer, student loan tools.';

// ─── Metadata ─────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Free Debt Payoff & Financial Calculators | DebtMeltPro',
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// ─── Schema ─────────────────────────────────────
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
};

// ─── Layout ─────────────────────────────────────
export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <head>
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>

      <body
        suppressHydrationWarning
        className="font-body bg-surface-50 dark:bg-surface-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>

          {/* Skip link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
          >
            Skip to main content
          </a>

          <Header />

          <main id="main-content" className="min-h-screen">
            {children}
          </main>

          <Footer />
          <CookieConsent />

          {/* Analytics */}
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>

        </ThemeProvider>

        {/* ✅ Chunk Recovery Script (moved from head → body end) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var attemptedKey = 'dmp-chunk-reload-attempted';

                function shouldReload(msg) {
                  msg = msg || '';
                  return /ChunkLoadError|Loading chunk|failed to load chunk|module script failed/i.test(msg);
                }

                function reloadOnce() {
                  try {
                    if (window.sessionStorage && window.sessionStorage.getItem(attemptedKey) === '1') return;
                    if (window.sessionStorage) window.sessionStorage.setItem(attemptedKey, '1');
                  } catch (e) {}

                  setTimeout(function () {
                    try { window.location.reload(); } catch (e) {}
                  }, 50);
                }

                window.addEventListener('error', function (e) {
                  var msg = (e && e.message) ? e.message : '';
                  if (shouldReload(msg)) reloadOnce();
                });

                window.addEventListener('unhandledrejection', function (e) {
                  var r = e && e.reason;
                  var msg = (r && r.message) ? r.message : String(r || '');
                  if (shouldReload(msg)) reloadOnce();
                });

                setTimeout(function () {
                  try { window.sessionStorage && window.sessionStorage.removeItem(attemptedKey); } catch (e) {}
                }, 30000);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}