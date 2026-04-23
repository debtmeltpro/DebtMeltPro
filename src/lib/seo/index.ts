// ============================================================
// DebtMeltPro — Reusable SEO Utility System
// Every tool/blog/category page uses these helpers to ensure
// consistent metadata, schema markup, and internal linking.
// ============================================================

import type { Metadata } from 'next';

export const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] || 'https://debtmeltpro.com';
export const SITE_NAME = 'DebtMeltPro';

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
    metaTitle: 'Debt Payoff Calculator — Snowball vs Avalanche Method',
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
    metaTitle: 'Rent vs Buy Calculator 2026 — See Your Break-Even Year in 30s',
    metaDescription: 'Free rent vs buy calculator with hidden costs most tools skip — property tax, maintenance, opportunity cost. Shows exact break-even year. No signup.',    
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
    metaTitle: 'Free FIRE Calculator 2026 — Find Your Retire-Early Number in 60s',
    metaDescription: 'Free FIRE calculator with inflation adjustment. Enter income and expenses to see your exact financial independence date. Works in $, ₹, €. No signup.',
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
    metaTitle: 'Credit Card Payoff Calculator — Free, Instant Results (2026)',
    metaDescription: 'Free credit card payoff calculator. Enter balance, APR, and payment to see exact months to debt-free, total interest, and savings. Works in $, ₹, €. No signup.',
    keywords: [
      'credit card payoff calculator',
      'credit card payment calculator',
      'credit card repayment calculator',
      'credit card interest calculator',
      'credit card debt calculator',
      'pay off credit card calculator',
      'credit card payoff estimator',
      'multiple credit card payoff calculator',
    ],    
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
    metaTitle: 'Student Loan Refinance Calculator — Compare & Save',
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
  introContent: string;
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
    introContent: 'Managing debt effectively is one of the most impactful financial decisions you can make. The average American household carries over $100,000 in total debt, including mortgages, credit cards, auto loans, and student loans. Without a structured payoff strategy, high-interest debt compounds rapidly, costing thousands in unnecessary interest over time. Our free debt management calculators help you compare proven payoff methods — the debt snowball (smallest balance first for psychological momentum), the debt avalanche (highest interest rate first for maximum savings), and the hybrid approach (quick wins followed by mathematical optimization). Each calculator runs entirely in your browser with no data stored on our servers, giving you a private, instant analysis of your debt situation. Whether you are tackling credit card balances, personal loans, or medical bills, these tools provide the clarity you need to build a realistic payoff timeline and track your progress toward becoming debt-free.',
  },
  {
    slug: 'home-buying',
    title: 'Home Buying Tools',
    metaTitle: 'Free Home Buying Calculators — Rent vs Buy Analysis',
    metaDescription: 'Free home buying calculators including rent vs buy analysis, mortgage cost comparison, and true cost of homeownership with opportunity cost calculations.',
    description: 'Make smarter housing decisions with our free calculators. Compare the true cost of renting vs buying, including hidden costs most calculators ignore.',
    keywords: ['home buying calculator', 'rent vs buy', 'mortgage calculator', 'homeownership cost'],
    toolSlugs: ['mortgage-calculator'],
    introContent: 'The decision to rent or buy a home is one of the largest financial commitments most people face. Yet many buyers rely on oversimplified comparisons that ignore critical costs like property taxes, maintenance, homeowners insurance, and the opportunity cost of tying up a large down payment in real estate instead of investing it. Our Rent vs. Buy calculator goes beyond the basic mortgage-versus-rent comparison by factoring in all hidden costs of homeownership, projected home appreciation, tax benefits from mortgage interest deductions, and what your down payment could earn in the stock market over the same period. The result is a true apples-to-apples comparison that shows you exactly which option builds more wealth over your planned time horizon. Whether you are a first-time buyer evaluating affordability, a renter wondering if homeownership makes sense, or an investor comparing real estate returns to market returns, our free tools give you the data-driven insights to make a confident decision.',
  },
  {
    slug: 'investing',
    title: 'Investment & FIRE Tools',
    metaTitle: 'Free Investment Calculators — FIRE Number & Compound Interest',
    metaDescription: 'Free investment calculators for compound interest projection, FIRE number calculation, and retirement planning with inflation-adjusted returns.',
    description: 'Plan your financial independence with our free investment calculators. Project compound growth, calculate your FIRE number, and model sustainable withdrawals.',
    keywords: ['investment calculator', 'FIRE calculator', 'compound interest', 'retirement planning'],
    toolSlugs: ['compound-interest'],
    introContent: 'Building long-term wealth requires understanding how compound interest works in your favor and having a clear target to aim for. The FIRE (Financial Independence, Retire Early) movement has popularized the concept of calculating the exact portfolio size needed to sustain your lifestyle indefinitely — your FIRE number. Using the widely-studied 4% safe withdrawal rate from the Trinity Study, your FIRE number equals 25 times your annual expenses. Our compound interest and FIRE calculator lets you project investment growth over any time horizon, adjust for inflation to see real purchasing power, model different contribution scenarios, and calculate exactly when your portfolio reaches financial independence. Whether you are just starting to invest, optimizing an existing portfolio, or planning for early retirement, these tools help you visualize the power of consistent investing and compound growth. Every dollar invested today works exponentially harder over time, and our calculator shows you precisely how.',
  },
  {
    slug: 'student-loans',
    title: 'Student Loan Tools',
    metaTitle: 'Free Student Loan Calculators — Refinance & Payoff Analysis',
    metaDescription: 'Free student loan calculators to compare refinancing options, calculate savings from lower rates, and analyze break-even timelines for loan refinancing.',
    description: 'Navigate student loan decisions with our free calculators. Compare refinancing options, calculate potential savings, and understand the trade-offs.',
    keywords: ['student loan calculator', 'student loan refinance', 'loan comparison', 'refinancing savings'],
    toolSlugs: ['student-loan'],
    introContent: 'Student loan debt affects over 43 million Americans, with an average balance exceeding $37,000. Refinancing can save thousands in interest for borrowers who qualify for lower rates, but it comes with significant trade-offs — especially for federal loan holders who would permanently lose access to income-driven repayment plans, Public Service Loan Forgiveness (PSLF), and federal forbearance protections. Our student loan refinance calculator provides a clear side-by-side comparison of your current loan terms versus a refinanced option, including exact monthly savings, total interest reduction, and the break-even timeline to recoup any refinancing fees. The tool also surfaces a recommendation based on your specific numbers so you can make an informed decision. Whether you hold private loans (where refinancing is often a straightforward win) or federal loans (where the decision requires careful consideration of non-financial benefits), our calculator gives you the complete picture before you commit.',
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

// generateAggregateRatingSchema removed — fake ratings violate Google policy.

// ─── Helper: Generate HowTo Schema ─────────────────────────

export function generateHowToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s) => ({
      '@type': 'HowToStep',
      name: s.name,
      text: s.text,
    })),
  };
}
