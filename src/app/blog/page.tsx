
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { SITE_URL } from '@/lib/seo';
import { ArrowRight, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog';
export const metadata: Metadata = {
  title: 'Financial Education Blog — DebtMeltPro',
  description:
    'Expert guides on debt management, investing, home buying, and student loans. Free financial education to help you make smarter money decisions.',
  keywords: ['financial education', 'debt management tips', 'investment guides', 'home buying guide', 'student loan advice'],
  alternates: { canonical: `${SITE_URL}/blog` },
};

// Blog post registry — add new posts here
/*
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
*/
export default function BlogPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Blog', href: '/blog' }]} />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Financial Education Blog
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Expert guides to help you pay off debt faster, invest smarter, and make informed
            financial decisions — written in plain English.
          </p>
        </div>

        <div className="space-y-4">
          {BLOG_POSTS.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Calendar className="w-3 h-3" aria-hidden="true" />
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-xs text-slate-400">{post.readTime}</span>
              </div>
              <h2 className="font-semibold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Read Article <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
