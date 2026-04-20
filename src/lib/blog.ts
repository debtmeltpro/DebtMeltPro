// ============================================================
// DebtMeltPro — Blog Post Registry
// Single source of truth for all blog posts.
// Imported by: sitemap.ts, homepage, blog/page.tsx
//
// MOVED from src/app/blog/page.tsx because Next.js App Router
// pages can only export: default, metadata, generateStaticParams,
// generateMetadata, viewport, generateViewport, config, runtime,
// revalidate, dynamic, dynamicParams, fetchCache, preferredRegion.
// Any other export (like BLOG_POSTS) causes a TS2344 error.
// ============================================================

export const BLOG_POSTS = [
  {
    slug: 'debt-explained-india-guide',
    title: 'Debt Explained: CIBIL Myths, Debt Funds & India vs US Debt (2026 Guide)',
    excerpt:
      'Debt explained in plain English for Indian borrowers — good debt vs bad debt, debt funds, debt vs equity, CIBIL score myths, and why Indian debt costs more than US debt.',
    date: '2026-04-20',
    category: 'Debt Management',
    categorySlug: 'debt-management',
    readTime: '13 min read',
    keywords: [
      'debt explained',
      'what is debt',
      'debt fund',
      'debt vs equity',
      'debt mutual funds',
      'cibil score myths',
      'debt equity ratio',
    ],
  },
  {
    slug: 'credit-card-debt-india',
    title: 'Credit Card Debt in India: How to Pay It Off Fast (2026 Guide)',
    excerpt: 'Drowning in credit card debt in India? Real ₹-based plan to clear it fast — avalanche vs snowball, a free calculator, and a step-by-step escape route.',
    date: '2026-04-17',
    category: 'Debt Management',
    categorySlug: 'debt-management',
    readTime: '11 min read',
    keywords: ['credit card debt india', 'how to pay off credit card debt', 'how to clear credit card debt', 'best way to pay off credit card debt'],
  },
  {
    slug: 'snowball-vs-avalanche-debt-payoff',
    title: 'Snowball vs Avalanche: Best Debt Payoff Method Compared',
    excerpt: 'A detailed comparison of the two most popular debt payoff strategies with real examples showing how much you can save with each approach.',
    date: '2026-04-02',
    category: 'Debt Management',
    categorySlug: 'debt-management',
    readTime: '8 min read',
    keywords: ['snowball vs avalanche', 'debt payoff methods', 'best way to pay off debt'],
  },
  {
    slug: 'minimum-payment-trap-credit-cards',
    title: 'Credit Card Minimum Payment Trap: Why You Stay in Debt Forever',
    excerpt: 'The minimum amount due on your credit card is a carefully designed trap. See the real ₹ math, the CIBIL impact, and how to escape in months instead of decades.',
    date: '2026-04-02',
    category: 'Debt Management',
    categorySlug: 'debt-management',
    readTime: '9 min read',
    keywords: ['minimum payment trap', 'credit card interest', 'credit card debt help'],
  },
  {
    slug: 'fire-number-explained',
    title: 'FIRE Number Explained: Calculate Financial Independence',
    excerpt: 'Learn how to calculate the exact portfolio size you need to retire early, understand the 4% rule, and create a realistic timeline to financial independence.',
    date: '2026-04-02',
    category: 'Investing',
    categorySlug: 'investing',
    readTime: '10 min read',
    keywords: ['FIRE number', 'financial independence', '4 percent rule', 'retire early'],
  },
  {
    slug: 'rent-vs-buy-true-cost',
    title: 'Rent vs Buy: True Cost of Homeownership Revealed',
    excerpt: 'Most rent vs buy calculators miss the opportunity cost of your down payment. Learn the complete framework for making this critical financial decision.',
    date: '2026-04-02',
    category: 'Home Buying',
    categorySlug: 'home-buying',
    readTime: '9 min read',
    keywords: ['rent vs buy', 'true cost homeownership', 'opportunity cost down payment'],
  },
  {
    slug: 'should-you-refinance-student-loans',
    title: 'Refinance Student Loans: Complete Decision Framework',
    excerpt: 'When refinancing saves you money, when it puts you at risk, and the federal loan protections you should never give up. A balanced guide for borrowers.',
    date: '2026-04-02',
    category: 'Student Loans',
    categorySlug: 'student-loans',
    readTime: '7 min read',
    keywords: ['refinance student loans', 'federal vs private loans', 'student loan refinancing'],
  },
];
