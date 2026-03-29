// src/app/tools/debt-payoff/page.tsx
import type { Metadata } from 'next';
import { DebtPayoffCalculator } from './DebtPayoffCalculator';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import { generateToolMetadata, generateFaqSchema, generateToolSchema } from '@/lib/seo';

export const metadata: Metadata = generateToolMetadata('debt-payoff');

const FAQ_ITEMS = [
  {
    q: 'What is the difference between the snowball and avalanche debt payoff methods?',
    a: 'The debt snowball method focuses on paying off your smallest debt balance first to build psychological momentum. The avalanche method targets the highest interest rate debt first, minimizing total interest paid. The snowball keeps you motivated; the avalanche saves more money.',
  },
  {
    q: 'How does the hybrid debt payoff method work?',
    a: 'The hybrid method uses the snowball approach for the first 3 months to build momentum and motivation, then switches to the avalanche method for the remainder. This balances psychological wins with mathematical efficiency.',
  },
  {
    q: 'What is the debt rollover effect?',
    a: 'When you fully pay off a debt, instead of pocketing that freed-up payment, you apply it to the next debt. This snowball effect accelerates payoff dramatically — a freed $200/month minimum payment becomes extra firepower for your next target.',
  },
  {
    q: 'Should I include my mortgage in this calculator?',
    a: 'Typically, focus on high-interest consumer debt (credit cards, personal loans) before targeting mortgage debt. You can include your mortgage, but use our dedicated Rent vs Buy Calculator for a more nuanced home loan analysis.',
  },
  {
    q: 'How accurate are the debt payoff calculations?',
    a: 'All calculations use standard monthly amortization formulas. Results assume fixed interest rates and consistent payments. Actual results may vary based on lender terms and promotional APR periods.',
  },
] as const;

export default function DebtPayoffPage() {
  const toolSchema = generateToolSchema('debt-payoff');
  const faqSchema = generateFaqSchema(FAQ_ITEMS.map(f => ({ q: f.q, a: f.a })));

  return (
    <>
      {toolSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb items={[
        { label: 'Debt Management', href: '/category/debt-management' },
        { label: 'Debt Payoff Calculator', href: '/tools/debt-payoff' },
      ]} />

      <section className="bg-gradient-to-b from-green-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-sm font-medium mb-4">
            Tool 1 of 5
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Debt Payoff Calculator — Snowball vs Avalanche vs Hybrid
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Struggling with multiple debts? Add your debts below and instantly compare the Snowball,
            Avalanche, and Hybrid payoff strategies. See your exact debt-free date, total interest
            saved, and the optimal payment order — all calculated in real time with no sign-up required.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AdSlotLeaderboard className="mt-6" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DebtPayoffCalculator />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AdSlotInContent />
      </div>

      {/* SEO Content Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8" aria-labelledby="guide-heading">
        <h2 id="guide-heading" className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">
          How to Use This Debt Payoff Calculator
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
          Understanding debt payoff strategies can save you thousands of dollars and years of payments.
          This free calculator compares three proven methods so you can choose the best approach for
          your financial situation.
        </p>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Step-by-Step Guide</h3>
          <ol className="space-y-3">
            {[
              'Click "Add Debt" and enter each debt: name, current balance, annual interest rate (APR), and minimum monthly payment.',
              'Enter any extra monthly amount you can put toward debt. Even $50 extra per month makes a significant difference over time.',
              'Review the three strategy results. The "Best Strategy" banner highlights the most cost-effective option for your specific debts.',
              'Study the payoff timeline chart to visualize when each debt disappears under each strategy.',
              'Use the "Interest Saved" metric to understand the true cost difference between strategies.',
            ].map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Example usage section */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Example: Before & After</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase mb-2">Before (Minimum Only)</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                $25,000 in debt at mixed rates. Paying only minimums takes <strong>12+ years</strong> and
                costs <strong>$9,800+ in interest</strong>.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase mb-2">After (Avalanche + $200 Extra)</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Same debt paid off in <strong>3 years</strong>, saving <strong>$6,200+ in interest</strong>.
                That is money back in your pocket.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Who Should Use This Calculator?</h3>
          <ul className="space-y-2">
            {[
              'Anyone with two or more debts (credit cards, personal loans, auto loans, medical bills)',
              'People exploring whether to use the snowball or avalanche method',
              'Borrowers who want to see how extra payments accelerate their debt-free date',
              'Financial coaches and advisors helping clients create payoff plans',
              'Anyone feeling overwhelmed by debt who needs a clear, actionable roadmap',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="text-green-500 mt-0.5 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <details key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group">
              <summary className="p-5 cursor-pointer font-medium text-slate-800 dark:text-slate-200 text-sm flex justify-between items-center gap-3 list-none hover:text-green-600 dark:hover:text-green-400 transition-colors">
                {q}
                <span className="text-slate-400 group-open:rotate-45 transition-transform shrink-0 text-lg leading-none">+</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">
                {a}
              </div>
            </details>
          ))}
        </div>

        <p className="mt-8 text-xs text-slate-400 dark:text-slate-600 leading-relaxed">
          <strong>Disclaimer:</strong> Results are estimates for educational purposes only. Calculations
          assume fixed interest rates and do not account for promotional APR periods or lender-specific terms.
          Consult a licensed financial advisor before making debt management decisions.
        </p>
      </section>

      {/* Related Tools for Internal Linking */}
      <RelatedTools currentSlug="debt-payoff" />
    </>
  );
}
