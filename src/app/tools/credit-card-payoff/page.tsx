import type { Metadata } from 'next';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import { CreditCardCalculator } from './CreditCardCalculator';

export const metadata: Metadata = {
  title: 'Credit Card Payoff Calculator — Escape the Minimum Payment Trap',
  description:
    "See exactly how long minimum payments take and how much interest you pay. Our credit card optimizer shows the true cost of the minimum payment trap and calculates your fastest payoff plan.",
  keywords: [
    'credit card payoff calculator',
    'minimum payment trap',
    'credit card interest calculator',
    'how long to pay off credit card',
    'credit card optimizer',
  ],
  alternates: { canonical: 'https://debtfreedom.app/tools/credit-card-payoff' },
};

const FAQ_ITEMS = [
  {
    q: 'How does the minimum payment trap work?',
    a: 'Credit card issuers typically set minimum payments at 1-3% of your balance. As you pay down your balance, the minimum payment also decreases. This is intentional — it maximizes the interest you pay over time. A $5,000 balance at 20% APR with 2% minimum payments can take over 30 years to pay off if you only ever pay the minimum.',
  },
  {
    q: 'What is the best strategy to pay off credit cards?',
    a: "Fix your payment at the amount of the first month's minimum (or higher) and never let it decrease. This alone can cut your payoff time in half. Additionally, any extra money you apply beyond the minimum goes entirely toward reducing your principal balance.",
  },
  {
    q: 'Does carrying a balance help my credit score?',
    a: 'No — this is a common myth. Carrying a credit card balance does NOT help your credit score. In fact, high credit utilization (balance ÷ credit limit) can hurt your score. Pay your balance in full whenever possible.',
  },
] as const;

export default function CreditCardPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-rose-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-sm font-medium mb-4">
            Tool 4 of 5
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Credit Card Payoff Optimizer
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Minimum payments are designed to maximize interest for the bank. See exactly how much
            you are losing and find the fastest path to a $0 balance.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AdSlotLeaderboard className="mt-6" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CreditCardCalculator />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AdSlotInContent />
      </div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Credit Card Payoff FAQ
        </h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <details key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group">
              <summary className="p-5 cursor-pointer font-medium text-slate-800 dark:text-slate-200 text-sm flex justify-between items-center gap-3 list-none hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                {q}
                <span className="text-slate-400 group-open:rotate-45 transition-transform shrink-0 text-lg leading-none">+</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">
                {a}
              </div>
            </details>
          ))}
        </div>
        <p className="mt-8 text-xs text-slate-400 leading-relaxed">
          <strong>Disclaimer:</strong> Results are estimates for educational purposes only. Actual
          results vary based on your lender terms and any promotional APR periods. Not financial advice.
        </p>
      </section>
    </>
  );
}
