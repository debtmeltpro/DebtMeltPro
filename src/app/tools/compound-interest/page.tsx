import type { Metadata } from 'next';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import { CompoundCalculator } from './CompoundCalculator';

export const metadata: Metadata = {
  title: 'FIRE Calculator — Compound Interest & Financial Independence',
  description:
    'Calculate your FIRE number, project investment growth with inflation adjustment, and find your sustainable withdrawal amount using the 4% rule. Monthly compounding with real return calculations.',
  keywords: [
    'FIRE calculator',
    'compound interest calculator',
    'financial independence retire early',
    'FIRE number calculator',
    '4 percent rule calculator',
    'safe withdrawal rate calculator',
    'inflation adjusted returns',
  ],
  alternates: { canonical: 'https://debtfreedom.app/tools/compound-interest' },
};

const FAQ_ITEMS = [
  {
    q: 'What is the FIRE movement?',
    a: 'FIRE (Financial Independence, Retire Early) is a lifestyle movement focused on aggressive saving and investing to achieve financial independence — the point at which your investments generate enough passive income to cover your living expenses permanently, allowing you to retire far earlier than traditional retirement age.',
  },
  {
    q: 'How is the FIRE number calculated?',
    a: 'Your FIRE number is calculated by dividing your annual expenses by your safe withdrawal rate. Using the 4% rule, multiply your annual expenses by 25. Example: $50,000/year in expenses × 25 = $1,250,000 FIRE number. This means a $1.25M portfolio could theoretically sustain $50K/year withdrawals indefinitely.',
  },
  {
    q: 'Is the 4% rule still valid?',
    a: 'The 4% rule comes from the Trinity Study (1998) and has historically held up over 30-year retirement periods for a diversified U.S. portfolio. For longer retirements (40-50 years), many FIRE practitioners use 3-3.5% to be conservative. Adjust the withdrawal rate slider to model different scenarios.',
  },
  {
    q: 'What does inflation adjustment mean?',
    a: "When inflation is toggled on, the calculator shows your future balance in today's purchasing power (real dollars). For example, $2M in 30 years at 3% inflation is equivalent to about $820,000 in today's money. This gives you a realistic view of what your wealth will actually buy.",
  },
] as const;

export default function CompoundPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-orange-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-sm font-medium mb-4">
            Tool 3 of 5
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Compound Interest & FIRE Calculator
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Project your investment growth, calculate your FIRE number, and find when your portfolio
            can sustain your lifestyle indefinitely — with inflation-adjusted real returns.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AdSlotLeaderboard className="mt-6" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CompoundCalculator />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AdSlotInContent />
      </div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
          FIRE Calculator FAQ
        </h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <details key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group">
              <summary className="p-5 cursor-pointer font-medium text-slate-800 dark:text-slate-200 text-sm flex justify-between items-center gap-3 list-none hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
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
          <strong>Disclaimer:</strong> FIRE projections are illustrative only. Past investment returns
          do not guarantee future performance. Consult a Certified Financial Planner (CFP) before
          making retirement planning decisions.
        </p>
      </section>
    </>
  );
}
