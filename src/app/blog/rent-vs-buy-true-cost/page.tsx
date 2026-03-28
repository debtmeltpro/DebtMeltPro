import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogArticle } from '@/components/seo/BlogArticle';
import { SITE_URL } from '@/lib/seo';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Hidden Costs of Homeownership: Why the Rent vs Buy Decision Is Not What You Think',
  description: 'Most rent vs buy calculators miss the opportunity cost of your down payment. Learn the complete framework for making this critical financial decision.',
  keywords: ['rent vs buy', 'true cost homeownership', 'opportunity cost down payment', 'should I buy a house', 'renting vs buying'],
  alternates: { canonical: `${SITE_URL}/blog/rent-vs-buy-true-cost` },
  openGraph: { type: 'article', publishedTime: '2024-05-28T00:00:00Z' },
};

const FAQS = [
  { q: 'What is the 5% rule for rent vs buy?', a: 'The 5% rule suggests that if your annual unrecoverable costs of owning (property tax, maintenance, and cost of capital) exceed 5% of the home price, renting may be cheaper. For a $400,000 home, if these costs exceed $20,000/year ($1,667/month), renting is likely better.' },
  { q: 'How long do I need to stay for buying to make sense?', a: 'Generally 5-7 years to break even on transaction costs (closing costs, agent fees). Our calculator gives you the exact break-even year for your specific situation based on local costs and appreciation.' },
  { q: 'Does home equity count as savings?', a: 'Home equity is real wealth, but it is illiquid — you cannot easily spend it without selling or borrowing against your home. A renter who invests the difference has liquid wealth they can access any time without transaction costs.' },
];

export default function RentVsBuyPage() {
  return (
    <BlogArticle
      slug="rent-vs-buy-true-cost"
      title="The Hidden Costs of Homeownership: Why the Rent vs Buy Decision Is Not What You Think"
      category="Home Buying"
      categorySlug="home-buying"
      date="2024-05-28"
      readTime="9 min read"
      intro="Comparing your monthly mortgage payment to your monthly rent tells you almost nothing about whether buying or renting is financially smarter. The real answer depends on hidden costs that most people — and most calculators — completely ignore."
      relatedToolSlug="mortgage-calculator"
      faqs={FAQS}
    >
      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">
        The Costs Most People Forget
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        When people compare renting to buying, they usually look at monthly payment vs. monthly
        rent. But homeownership comes with significant costs beyond the mortgage: property taxes
        (typically 1-2% of home value annually), maintenance and repairs (budget 1-2% annually),
        homeowners insurance, and HOA fees. A $400,000 home can easily cost $600-800/month in
        these extras alone.
      </p>

      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">
        The Biggest Hidden Cost: Opportunity Cost
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        Your down payment is the largest hidden cost of buying. If you put $80,000 down on a home,
        that money is locked in real estate. A renter who invests that $80,000 in a diversified
        index fund averaging 7% returns would have roughly $157,000 after 10 years — nearly double
        the original amount. This opportunity cost is real money you give up by buying.
      </p>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        Additionally, if the monthly all-in cost of owning exceeds renting, the renter can invest
        that monthly savings too. Over a decade, these invested differences can compound into a
        substantial portfolio.
      </p>

      <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-5 my-6 not-prose">
        <p className="font-semibold text-green-800 dark:text-green-200 mb-2">Run your own comparison</p>
        <p className="text-sm text-green-700 dark:text-green-300 mb-3">
          Our Rent vs Buy calculator includes all these hidden costs and shows you the exact
          break-even year for your specific market and situation.
        </p>
        <Link href="/tools/mortgage-calculator" className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors">
          Open Rent vs Buy Calculator <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">
        When Buying Wins
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        Buying tends to win financially when you plan to stay 7+ years, local home appreciation
        exceeds 3-4% annually, mortgage rates are low relative to investment returns, and your rent
        is high relative to the cost of owning. The mortgage interest deduction can also tip the
        scales for buyers in high-tax situations, though fewer homeowners benefit from itemizing
        since 2017.
      </p>

      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">
        When Renting Wins
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        Renting tends to win when you might move within 5 years, the local housing market is
        overvalued, you can invest the cost difference consistently, or your rent is significantly
        lower than the all-in cost of buying. Renting also provides flexibility and eliminates the
        risk of home value decline — a real consideration in volatile markets.
      </p>
    </BlogArticle>
  );
}
