// ============================================================
// DebtFreedom — Root Layout
// SEO: Global metadata, Open Graph, Twitter Cards.
// Schema: SoftwareApplication JSON-LD for Google Rich Snippets.
// Legal: Cookie consent integration.
// Performance: Font optimization via next/font.
// ============================================================

import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/layout/CookieConsent';
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
const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://debtfreedom.app';
const SITE_NAME = 'DebtFreedom';
const SITE_DESCRIPTION =
  'Free financial calculators: Debt payoff (snowball & avalanche), mortgage rent vs. buy, compound interest FIRE calculator, credit card optimizer, and student loan refinance estimator.';

// ─── Global Metadata ─────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Free Financial Calculators & Debt Payoff Tools`,
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
  logo: `${SITE_URL}/logo.png`,
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: `hello@debtfreedom.app`,
  },
};

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
  screenshot: `${SITE_URL}/screenshot.png`,
};

// ─── Root Layout ──────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* DNS prefetch for Google Fonts & AdSense performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
      </head>
      <body className="font-body bg-surface-50 dark:bg-surface-950 text-slate-900 dark:text-slate-100 antialiased">
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
        </ThemeProvider>
      </body>
    </html>
  );
}
