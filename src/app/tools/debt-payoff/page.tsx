// src/app/tools/debt-payoff/page.tsx
import type { Metadata } from 'next';
import { DebtPayoffCalculator } from './DebtPayoffCalculator';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';

export const metadata: Metadata = {
  title: 'Debt Payoff Calculator — Snowball vs. Avalanche vs. Hybrid',
  description:
    'Compare debt payoff strategies side-by-side. See exactly how much interest you save and how many months faster you become debt-free with the snowball, avalanche, or hybrid method.',
  keywords: [
    'debt payoff calculator',
    'snowball method calculator',
    'debt avalanche calculator',
    'debt payoff comparison',
    'how to pay off debt fast',
  ],
  alternates: { canonical: 'https://debtfreedom.app/tools/debt-payoff' },
};

const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialProduct',
  name: 'Debt Payoff Calculator — Snowball vs. Avalanche',
  description: 'Free online calculator that compares debt payoff strategies.',
  url: 'https://debtfreedom.app/tools/debt-payoff',
  provider: { '@type': 'Organization', name: 'DebtFreedom', url: 'https://debtfreedom.app' },
};

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
    q: 'What is the "debt rollover" effect?',
    a: 'When you fully pay off a debt, instead of pocketing that freed-up payment, you apply it to the next debt. This "snowball" effect accelerates payoff dramatically — a freed $200/month minimum payment becomes extra firepower for your next target.',
  },
  {
    q: 'Should I include my mortgage in this calculator?',
    a: 'Typically, focus on high-interest consumer debt (credit cards, personal loans) before targeting mortgage debt. You can include your mortgage, but use our dedicated Mortgage Calculator for a more nuanced home loan payoff analysis.',
  },
  {
    q: 'How accurate are the calculations?',
    a: 'All calculations use standard monthly amortization formulas. Results assume fixed interest rates and consistent payments. Actual results may vary based on lender terms and promotional APR periods.',
  },
] as const;

export default function DebtPayoffPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />

      <section className="bg-gradient-to-b from-green-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-sm font-medium mb-4">
            Tool 1 of 5
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Debt Payoff Engine
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Add your debts below and instantly compare the Snowball, Avalanche, and Hybrid payoff
            strategies. See your debt-free date and total interest saved.
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

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">
          How to Use This Calculator
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
          Understanding debt payoff strategies can save you thousands of dollars and years of payments.
        </p>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Step-by-Step Guide</h3>
          <ol className="space-y-3">
            {[
              'Click "Add Debt" and enter each debt: name, current balance, annual interest rate, and minimum monthly payment.',
              'Enter any extra monthly amount you can put toward debt (even $50 makes a huge difference).',
              'Review the three strategy results. The "Best Strategy" banner highlights the most cost-effective option.',
              'Study the payoff timeline chart to visualize when each debt disappears.',
              'Use the "Interest Saved" metric to understand the true cost of your debt.',
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

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Key Definitions</h3>
          <dl className="space-y-3">
            {[
              { term: 'APR (Annual Percentage Rate)', def: 'The annual interest rate charged on your debt. A 20% APR = 1.67% charged per month on your remaining balance.' },
              { term: 'Minimum Payment', def: 'The lowest payment your lender requires each month. Paying only minimums can extend repayment by years.' },
              { term: 'Extra Monthly Payment', def: 'Any amount above the combined minimums. Even an extra $100/month can shave years off your timeline.' },
              { term: 'Interest Saved', def: 'The difference between the total interest paying minimums only vs. using an accelerated strategy.' },
            ].map(({ term, def }) => (
              <div key={term}>
                <dt className="text-sm font-semibold text-slate-800 dark:text-slate-200">{term}</dt>
                <dd className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{def}</dd>
              </div>
            ))}
          </dl>
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
    </>
  );
}
