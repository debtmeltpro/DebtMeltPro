// ============================================================
// DebtFreedom — Reusable SEO Utility System
// Every tool/blog/category page uses these helpers to ensure
// consistent metadata, schema markup, and internal linking.
// ============================================================

import type { Metadata } from 'next';

export const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] || 'https://debtmeltpro.com';
export const SITE_NAME = 'DebtFreedom';

// ─── Tool Registry (single source of truth) ──────────────────

export interface ToolDef {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
  accentColor: string;
  gradientFrom: string;
  toolNumber: number;
}

export const TOOLS: ToolDef[] = [
  {
    slug: 'debt-payoff',
    title: 'Debt Payoff Engine',
    shortTitle: 'Debt Payoff',
    description: 'Compare Snowball, Avalanche & Hybrid strategies. See exactly how much interest and time you save.',
    metaTitle: 'Debt Payoff Calculator — Snowball vs. Avalanche vs. Hybrid',
    metaDescription: 'Compare debt payoff strategies side-by-side. See exactly how much interest you save and how many months faster you become debt-free with the snowball, avalanche, or hybrid method.',
    keywords: ['debt payoff calculator', 'snowball method calculator', 'debt avalanche calculator', 'debt payoff comparison', 'how to pay off debt fast'],
    category: 'debt-management',
    icon: 'TrendingDown',
    badge: 'Most Popular',
    badgeColor: 'bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300',
    accentColor: 'group-hover:text-brand-500',
    gradientFrom: 'from-green-50',
    toolNumber: 1,
  },
  {
    slug: 'mortgage-calculator',
    title: 'Rent vs. Buy Pro',
    shortTitle: 'Rent vs Buy',
    description: 'True cost comparison including property taxes, maintenance, and opportunity cost of your down payment.',
    metaTitle: 'Rent vs. Buy Calculator — True Cost of Homeownership',
    metaDescription: 'Should you rent or buy? Our calculator includes property taxes, maintenance costs, opportunity cost of your down payment, and home appreciation for a real break-even analysis.',
    keywords: ['rent vs buy calculator', 'should I rent or buy a house', 'true cost of homeownership', 'mortgage vs rent comparison'],
    category: 'home-buying',
    icon: 'Home',
    accentColor: 'group-hover:text-blue-500',
    gradientFrom: 'from-blue-50',
    toolNumber: 2,
  },
  {
    slug: 'compound-interest',
    title: 'FIRE Calculator',
    shortTitle: 'FIRE Calculator',
    description: 'Project wealth growth with inflation adjustment. Calculate your FIRE number and sustainable withdrawals.',
    metaTitle: 'FIRE Calculator — Compound Interest & Financial Independence',
    metaDescription: 'Calculate your FIRE number, project investment growth with inflation adjustment, and find your sustainable withdrawal amount using the 4% rule.',
    keywords: ['FIRE calculator', 'compound interest calculator', 'financial independence retire early', 'FIRE number calculator', '4 percent rule calculator'],
    category: 'investing',
    icon: 'Flame',
    accentColor: 'group-hover:text-orange-500',
    gradientFrom: 'from-orange-50',
    toolNumber: 3,
  },
  {
    slug: 'credit-card-payoff',
    title: 'Credit Card Optimizer',
    shortTitle: 'Credit Cards',
    description: 'Expose the minimum payment trap. Calculate exactly how much interest you throw away each month.',
    metaTitle: 'Credit Card Payoff Calculator — Escape the Minimum Payment Trap',
    metaDescription: "See exactly how long minimum payments take and how much interest you pay. Our credit card optimizer shows the true cost of the minimum payment trap.",
    keywords: ['credit card payoff calculator', 'minimum payment trap', 'credit card interest calculator', 'how long to pay off credit card'],
    category: 'debt-management',
    icon: 'CreditCard',
    badge: 'Eye-Opening',
    badgeColor: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
    accentColor: 'group-hover:text-red-500',
    gradientFrom: 'from-rose-50',
    toolNumber: 4,
  },
  {
    slug: 'student-loan',
    title: 'Student Loan Refinance',
    shortTitle: 'Student Loans',
    description: 'Compare your current loan vs. refinancing. See break-even analysis and total savings potential.',
    metaTitle: 'Student Loan Refinance Calculator — Compare Rates & Save',
    metaDescription: 'Should you refinance your student loans? Calculate exact monthly savings, total interest saved, break-even timeline, and compare current vs. refinanced terms.',
    keywords: ['student loan refinance calculator', 'student loan comparison', 'refinance student loans savings', 'student loan interest calculator'],
    category: 'student-loans',
    icon: 'GraduationCap',
    accentColor: 'group-hover:text-violet-500',
    gradientFrom: 'from-violet-50',
    toolNumber: 5,
  },
];

// ─── Category Registry ───────────────────────────────────────

export interface CategoryDef {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  keywords: string[];
  toolSlugs: string[];
}

export const CATEGORIES: CategoryDef[] = [
  {
    slug: 'debt-management',
    title: 'Debt Management Tools',
    metaTitle: 'Free Debt Management Calculators — Pay Off Debt Faster',
    metaDescription: 'Free debt management calculators to help you pay off credit cards, personal loans, and other debts faster using proven strategies like snowball and avalanche.',
    description: 'Take control of your debt with our free calculators. Compare payoff strategies, optimize credit card payments, and create a plan to become debt-free faster.',
    keywords: ['debt management tools', 'debt payoff calculator', 'credit card payoff', 'debt free calculator'],
    toolSlugs: ['debt-payoff', 'credit-card-payoff'],
  },
  {
    slug: 'home-buying',
    title: 'Home Buying Tools',
    metaTitle: 'Free Home Buying Calculators — Rent vs Buy Analysis',
    metaDescription: 'Free home buying calculators including rent vs buy analysis, mortgage cost comparison, and true cost of homeownership with opportunity cost calculations.',
    description: 'Make smarter housing decisions with our free calculators. Compare the true cost of renting vs buying, including hidden costs most calculators ignore.',
    keywords: ['home buying calculator', 'rent vs buy', 'mortgage calculator', 'homeownership cost'],
    toolSlugs: ['mortgage-calculator'],
  },
  {
    slug: 'investing',
    title: 'Investment & FIRE Tools',
    metaTitle: 'Free Investment Calculators — FIRE Number & Compound Interest',
    metaDescription: 'Free investment calculators for compound interest projection, FIRE number calculation, and retirement planning with inflation-adjusted returns.',
    description: 'Plan your financial independence with our free investment calculators. Project compound growth, calculate your FIRE number, and model sustainable withdrawals.',
    keywords: ['investment calculator', 'FIRE calculator', 'compound interest', 'retirement planning'],
    toolSlugs: ['compound-interest'],
  },
  {
    slug: 'student-loans',
    title: 'Student Loan Tools',
    metaTitle: 'Free Student Loan Calculators — Refinance & Payoff Analysis',
    metaDescription: 'Free student loan calculators to compare refinancing options, calculate savings from lower rates, and analyze break-even timelines for loan refinancing.',
    description: 'Navigate student loan decisions with our free calculators. Compare refinancing options, calculate potential savings, and understand the trade-offs.',
    keywords: ['student loan calculator', 'student loan refinance', 'loan comparison', 'refinancing savings'],
    toolSlugs: ['student-loan'],
  },
];

// ─── Helper: Get related tools ───────────────────────────────

export function getRelatedTools(currentSlug: string, limit = 4): ToolDef[] {
  const current = TOOLS.find(t => t.slug === currentSlug);
  if (!current) return TOOLS.slice(0, limit);

  // Same category first, then others
  const sameCategory = TOOLS.filter(t => t.slug !== currentSlug && t.category === current.category);
  const otherCategory = TOOLS.filter(t => t.slug !== currentSlug && t.category !== current.category);
  return [...sameCategory, ...otherCategory].slice(0, limit);
}

// ─── Helper: Generate tool page metadata ─────────────────────

export function generateToolMetadata(slug: string): Metadata {
  const tool = TOOLS.find(t => t.slug === slug);
  if (!tool) return {};

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: { canonical: `${SITE_URL}/tools/${tool.slug}` },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: `${SITE_URL}/tools/${tool.slug}`,
      siteName: SITE_NAME,
      type: 'website',
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
  };
}

// ─── Helper: Generate FAQ Schema ─────────────────────────────

export function generateFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

// ─── Helper: Generate Breadcrumb Schema ──────────────────────

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Helper: Generate WebPage Schema ─────────────────────────

export function generateWebPageSchema(opts: {
  title: string;
  description: string;
  url: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.title,
    description: opts.description,
    url: opts.url,
    dateModified: opts.dateModified ?? new Date().toISOString(),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

// ─── Helper: Generate Tool (SoftwareApplication) Schema ──────

export function generateToolSchema(slug: string) {
  const tool = TOOLS.find(t => t.slug === slug);
  if (!tool) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: tool.metaDescription,
    url: `${SITE_URL}/tools/${tool.slug}`,
  };
}
