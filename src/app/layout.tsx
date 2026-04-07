// ============================================================
// DebtMeltPro — Root Layout
// SEO: Global metadata, Open Graph, Twitter Cards, JSON-LD.
// Analytics: GA4 integration (consent-gated).
// Performance: Font optimization via next/font.
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

// ─── Font Configuration ────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

// ─── Site Constants ────────────────────────────────────────────
const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] || 'https://debtmeltpro.com';
const SITE_NAME = 'DebtMeltPro';
const SITE_DESCRIPTION =
  'Free financial calculators: Debt payoff (snowball & avalanche), mortgage rent vs. buy, compound interest FIRE calculator, credit card optimizer, and student loan refinance estimator.';

// ─── Global Metadata ─────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Free Debt Payoff & Financial Calculators | DebtMeltPro',
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'debt payoff calculator',
    'snowball method calculator',
    'avalanche method calculator',
    'mortgage vs rent calculator',
    'compound interest calculator',
    'FIRE calculator',
    'credit card payoff calculator',
    'student loan refinance calculator',
    'free financial tools',
    'debt freedom',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Free Financial Calculators`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Free Financial Calculators`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Free Financial Calculators`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: process.env['GOOGLE_SITE_VERIFICATION'] ?? '',
  },
  category: 'Finance',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

// ─── JSON-LD Schema ───────────────────────────────────────────

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.png`,
  },

  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'support@debtmeltpro.com',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
};
/*
const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: `${SITE_NAME} Financial Calculator Suite`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  featureList: [
    'Debt Payoff Calculator (Snowball, Avalanche, Hybrid)',
    'Mortgage vs Rent Calculator',
    'Compound Interest & FIRE Calculator',
    'Credit Card Payoff Optimizer',
    'Student Loan Refinance Estimator',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '2847',
  },  
};
*/
// NOTE: SoftwareApplication schema with fake aggregateRating removed.
// Fabricated review data violates Google's structured data guidelines
// and risks a manual penalty. Re-add only with real, verified reviews.

// ─── Root Layout ──────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          // Recovery for intermittent chunk-cache mismatches (ChunkLoadError / failed chunk fetches)
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
                  } catch (e) { /* ignore */ }
                  setTimeout(function () {
                    try { window.location.reload(); } catch (e) { /* ignore */ }
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
                  try { window.sessionStorage && window.sessionStorage.removeItem(attemptedKey); } catch (e) { /* ignore */ }
                }, 30000);
              })();
            `,
          }}
        />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/*
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        /> */}
      </head>
{/*      <body className="font-body bg-surface-50 dark:bg-surface-950 text-slate-900 dark:text-slate-100 antialiased">*/}
      <body
        suppressHydrationWarning
        className="font-body bg-surface-50 dark:bg-surface-950 text-slate-900 dark:text-slate-100 antialiased"
         >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Skip navigation for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-white focus:rounded-lg focus:font-semibold"
          >
            Skip to main content
          </a>

          <Header />

          <main id="main-content" className="min-h-screen">
            {children}
          </main>

          <Footer />
          <CookieConsent />

          {/* Google Analytics (consent-gated) */}
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
