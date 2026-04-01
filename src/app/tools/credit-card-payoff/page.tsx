import type { Metadata } from 'next';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import { generateToolMetadata, generateFaqSchema, generateToolSchema } from '@/lib/seo';
import { CreditCardCalculator } from './CreditCardCalculator';

export const metadata: Metadata = generateToolMetadata('credit-card-payoff');

const FAQ_ITEMS = [
  { q: 'How does the minimum payment trap work?', a: 'Credit card issuers typically set minimum payments at 1-3% of your balance. As you pay down your balance, the minimum payment also decreases. This is intentional — it maximizes the interest you pay over time. A $5,000 balance at 20% APR with 2% minimum payments can take over 30 years to pay off.' },
  { q: 'What is the best strategy to pay off credit cards?', a: "Fix your payment at the amount of the first month's minimum (or higher) and never let it decrease. This alone can cut your payoff time in half. Any extra money you apply beyond the minimum goes entirely toward reducing your principal balance." },
  { q: 'Does carrying a balance help my credit score?', a: 'No — this is a common myth. Carrying a credit card balance does NOT help your credit score. High credit utilization (balance divided by credit limit) can actually hurt your score. Pay your balance in full whenever possible.' },
  { q: 'How much interest am I really paying each month?', a: 'Your monthly interest charge equals your balance multiplied by your APR divided by 12. For example, $5,000 at 22% APR costs you about $92 in interest each month. If your minimum payment is $100, only $8 goes toward reducing the actual debt.' },
  { q: 'Should I close credit cards after paying them off?', a: 'Generally no. Closing cards reduces your total available credit, which can increase your credit utilization ratio and lower your score. Keep paid-off cards open but inactive, or use them for a small recurring charge that you pay in full each month.' },
];

export default function CreditCardPage() {
  const toolSchema = generateToolSchema('credit-card-payoff');
  const faqSchema = generateFaqSchema(FAQ_ITEMS);

  return (
    <>
      {toolSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb items={[
        { label: 'Debt Management', href: '/category/debt-management' },
        { label: 'Credit Card Optimizer', href: '/tools/credit-card-payoff' },
      ]} />

      <section className="bg-gradient-to-b from-rose-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-sm font-medium mb-4">Tool 4 of 5</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Credit Card Payoff Calculator — Escape the Minimum Payment Trap
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Minimum payments are designed to maximize interest revenue for the bank, not to help you
            get out of debt. See exactly how much you are losing and find the fastest path to a $0
            balance with this free credit card payoff calculator.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6"><AdSlotLeaderboard className="mt-6" /></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><CreditCardCalculator /></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6"><AdSlotInContent /></div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Example Section */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Example: The True Cost of Minimum Payments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase mb-2">Minimum Only</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                $5,000 balance at 22% APR: <strong>30+ years</strong> to pay off, <strong>$12,000+ in interest</strong> — you pay nearly three times what you borrowed.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase mb-2">Fixed $200/Month</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Same $5,000 balance: paid off in <strong>32 months</strong> with only <strong>$1,350 in interest</strong>. You save over $10,000.
              </p>
            </div>
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">How This Calculator Works</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          Enter your credit card balance, APR (annual percentage rate), and current minimum payment percentage.
          The calculator instantly shows you two scenarios: paying only the declining minimum versus making a
          fixed monthly payment. You can see exactly how many years you shave off and how much interest you
          save by committing to a fixed or increased payment amount each month.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          The math uses standard monthly amortization with declining balance calculations. As your balance
          decreases, more of each payment goes to principal rather than interest — this acceleration effect
          is why fixed payments are dramatically more effective than declining minimums.
        </p>

        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Credit Card Payoff FAQ</h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <details key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group">
              <summary className="p-5 cursor-pointer font-medium text-slate-800 dark:text-slate-200 text-sm flex justify-between items-center gap-3 list-none hover:text-rose-600 dark:hover:text-rose-400 transition-colors">{q}<span className="text-slate-400 group-open:rotate-45 transition-transform shrink-0 text-lg leading-none">+</span></summary>
              <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">{a}</div>
            </details>
          ))}
        </div>
        <p className="mt-8 text-xs text-slate-400 leading-relaxed"><strong>Disclaimer:</strong> Results are estimates for educational purposes only. Actual results vary based on lender terms and promotional APR periods. Not financial advice.</p>
      </section>

      <RelatedTools currentSlug="credit-card-payoff" />
    </>
  );
}
