import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogArticle } from '@/components/seo/BlogArticle';
import { SITE_URL } from '@/lib/seo';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FIRE Number Explained: Calculate Financial Independence',
  description: 'Learn how to calculate the exact portfolio size you need to retire early, understand the 4% rule, and create a realistic timeline to financial independence.',
  keywords: ['FIRE number', 'financial independence', '4 percent rule', 'retire early', 'FIRE movement', 'how much to retire'],
  alternates: { canonical: `${SITE_URL}/blog/fire-number-explained` },
  openGraph: { type: 'article', publishedTime: '2024-06-05T00:00:00Z' },
};

const FAQS = [
  { q: 'What annual expenses should I use for my FIRE number?', a: 'Use your expected annual spending in retirement, not your current income. Include housing, food, insurance, healthcare, travel, and hobbies. Many FIRE practitioners find their expenses decrease 20-30% after leaving full-time work.' },
  { q: 'Does the 4% rule account for inflation?', a: 'Yes. The original Trinity Study assumed you increase withdrawals by inflation each year. A 4% initial withdrawal with inflation adjustments historically survived 30-year periods in over 95% of scenarios.' },
  { q: 'What if I want to retire for 50 years instead of 30?', a: 'For longer retirement horizons, consider using a 3-3.5% withdrawal rate instead of 4%. This raises your FIRE number (multiply expenses by 29-33 instead of 25) but provides a larger safety margin.' },
];

export default function FireNumberPage() {
  return (
    <BlogArticle
      slug="fire-number-explained"
      title="FIRE Number Explained: Calculate Financial Independence"
      category="Investing"
      categorySlug="investing"
      date="2024-06-05"
      readTime="10 min read"
      intro="Financial Independence, Retire Early (FIRE) starts with one number: the portfolio size that can sustain your lifestyle indefinitely. This guide explains exactly how to calculate your FIRE number, the math behind the 4% rule, and how to build a realistic timeline."
      relatedToolSlug="compound-interest"
      faqs={FAQS}
    >
      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">
        The FIRE Number Formula
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        Your FIRE number is calculated with a simple formula: <strong>Annual Expenses ÷ Safe
        Withdrawal Rate = FIRE Number</strong>. Using the standard 4% withdrawal rate, this
        simplifies to: Annual Expenses × 25.
      </p>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        For example, if you spend $50,000 per year, your FIRE number is $50,000 × 25 = $1,250,000.
        Once your investment portfolio reaches $1.25 million, you can withdraw $50,000 per year
        (4% of the portfolio) with a high probability of never running out of money.
      </p>

      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">
        Understanding the 4% Rule
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        The 4% rule comes from the Trinity Study (1998), which analyzed US stock and bond market
        data from 1926-1995. The research found that a 4% initial withdrawal rate, adjusted annually
        for inflation, sustained a diversified portfolio for 30 years in approximately 95% of
        historical periods. This became the foundation of the FIRE movement.
      </p>

      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">
        The Power of Compound Growth
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        Reaching your FIRE number may seem daunting, but compound interest does the heavy lifting.
        Someone investing $1,500 per month at an average 8% annual return would accumulate over
        $1.25 million in approximately 25 years. Importantly, over half of that total comes from
        compound growth — not from the money you contributed.
      </p>

      <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-5 my-6 not-prose">
        <p className="font-semibold text-green-800 dark:text-green-200 mb-2">Calculate your FIRE timeline</p>
        <p className="text-sm text-green-700 dark:text-green-300 mb-3">
          Enter your savings rate and expected returns to see exactly when you will reach financial
          independence.
        </p>
        <Link href="/tools/compound-interest" className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors">
          Open FIRE Calculator <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">
        Reducing Expenses vs. Increasing Income
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        Every dollar you cut from annual expenses reduces your FIRE number by $25 (at 4% SWR).
        Cutting $200/month from expenses ($2,400/year) lowers your target by $60,000. This double
        benefit — lower target plus more money to invest — is why frugality is central to the FIRE
        approach. But earning more and investing the difference works too; the best path combines both.
      </p>

      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">
        Further Reading
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        While building your investment portfolio, ensure high-interest debt is not eroding your returns. Read our{' '}
        <Link href="/blog/snowball-vs-avalanche-debt-payoff" className="text-green-600 dark:text-green-400 underline hover:no-underline">
          snowball vs. avalanche comparison
        </Link>{' '}
        to optimize your debt payoff strategy. If you are deciding between investing and paying down a mortgage, our{' '}
        <Link href="/blog/rent-vs-buy-true-cost" className="text-green-600 dark:text-green-400 underline hover:no-underline">
          rent vs. buy analysis
        </Link>{' '}
        provides clarity on the true cost of homeownership. Use our{' '}
        <Link href="/prompts/investing/fire-number-roadmap" className="text-green-600 dark:text-green-400 underline hover:no-underline">
          AI FIRE roadmap prompt
        </Link>{' '}
        to generate a personalized retirement plan, or explore{' '}
        <Link href="/category/investing" className="text-green-600 dark:text-green-400 underline hover:no-underline">
          all investing tools
        </Link>.
      </p>      
    </BlogArticle>
  );
}
