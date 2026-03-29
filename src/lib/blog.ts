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
    slug: 'snowball-vs-avalanche-debt-payoff',
    title: 'Snowball vs Avalanche: Which Debt Payoff Method Saves You More Money?',
    excerpt: 'A detailed comparison of the two most popular debt payoff strategies with real examples showing how much you can save with each approach.',
    date: '2024-06-15',
    category: 'Debt Management',
    categorySlug: 'debt-management',
    readTime: '8 min read',
    keywords: ['snowball vs avalanche', 'debt payoff methods', 'best way to pay off debt'],
  },
  {
    slug: 'minimum-payment-trap-credit-cards',
    title: 'The Minimum Payment Trap: How Credit Card Companies Keep You in Debt',
    excerpt: 'Discover why paying only the minimum on your credit card costs you thousands in interest and learn the simple fix that cuts your payoff time in half.',
    date: '2024-06-10',
    category: 'Debt Management',
    categorySlug: 'debt-management',
    readTime: '6 min read',
    keywords: ['minimum payment trap', 'credit card interest', 'credit card debt help'],
  },
  {
    slug: 'fire-number-explained',
    title: 'What Is a FIRE Number? How to Calculate Your Path to Financial Independence',
    excerpt: 'Learn how to calculate the exact portfolio size you need to retire early, understand the 4% rule, and create a realistic timeline to financial independence.',
    date: '2024-06-05',
    category: 'Investing',
    categorySlug: 'investing',
    readTime: '10 min read',
    keywords: ['FIRE number', 'financial independence', '4 percent rule', 'retire early'],
  },
  {
    slug: 'rent-vs-buy-true-cost',
    title: 'The Hidden Costs of Homeownership: Why the Rent vs Buy Decision Is Not What You Think',
    excerpt: 'Most rent vs buy calculators miss the opportunity cost of your down payment. Learn the complete framework for making this critical financial decision.',
    date: '2024-05-28',
    category: 'Home Buying',
    categorySlug: 'home-buying',
    readTime: '9 min read',
    keywords: ['rent vs buy', 'true cost homeownership', 'opportunity cost down payment'],
  },
  {
    slug: 'should-you-refinance-student-loans',
    title: 'Should You Refinance Your Student Loans? A Complete Decision Framework',
    excerpt: 'When refinancing saves you money, when it puts you at risk, and the federal loan protections you should never give up. A balanced guide for borrowers.',
    date: '2024-05-20',
    category: 'Student Loans',
    categorySlug: 'student-loans',
    readTime: '7 min read',
    keywords: ['refinance student loans', 'federal vs private loans', 'student loan refinancing'],
  },
];
