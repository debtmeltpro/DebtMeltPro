import type { Metadata } from 'next';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import { generateToolMetadata, generateFaqSchema, generateToolSchema, generateHowToSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import dynamic from 'next/dynamic';

export const metadata: Metadata = generateToolMetadata('credit-card-payoff');

const CreditCardCalculator = dynamic(
  () => import('./CreditCardCalculator').then((m) => m.CreditCardCalculator),
  { ssr: false },
);

const FAQ_ITEMS = [
  { q: 'How does the minimum payment trap work?', a: 'Credit card issuers typically set minimum payments at 1-3% of your balance. As you pay down your balance, the minimum payment also decreases. This is intentional — it maximizes the interest you pay over time. A $5,000 balance at 20% APR with 2% minimum payments can take over 30 years to pay off.' },
  { q: 'What is the best strategy to pay off credit cards?', a: "Fix your payment at the amount of the first month's minimum (or higher) and never let it decrease. This alone can cut your payoff time in half. Any extra money you apply beyond the minimum goes entirely toward reducing your principal balance." },
  { q: 'Does carrying a balance help my credit score?', a: 'No — this is a common myth. Carrying a credit card balance does NOT help your credit score. High credit utilization (balance divided by credit limit) can actually hurt your score. Pay your balance in full whenever possible.' },
  { q: 'How much interest am I really paying each month?', a: 'Your monthly interest charge equals your balance multiplied by your APR divided by 12. For example, $5,000 at 22% APR costs you about $92 in interest each month. If your minimum payment is $100, only $8 goes toward reducing the actual debt.' },
  { q: 'Should I close credit cards after paying them off?', a: 'Generally no. Closing cards reduces your total available credit, which can increase your credit utilization ratio and lower your score. Keep paid-off cards open but inactive, or use them for a small recurring charge that you pay in full each month.' },
  { q: 'What is a good credit utilization ratio?', a: 'Financial experts recommend keeping your credit utilization below 30% — ideally under 10% — for the best credit score impact. Utilization is calculated as your total balances divided by your total credit limits across all cards. Paying down balances is the fastest way to improve utilization.' },
  { q: 'Should I use a balance transfer to pay off credit card debt?', a: 'A 0% APR balance transfer can save significant interest if you commit to paying off the balance within the promotional period (usually 12-21 months). Watch out for balance transfer fees (typically 3-5%) and the post-promotional APR. Never transfer a balance and then make only minimum payments.' },
  { q: 'How does compound interest work on credit cards?', a: 'Credit cards charge interest on your average daily balance, not your statement balance. If you carry a balance, interest accrues daily and compounds monthly — meaning you pay interest on previously charged interest. This compounding effect is why credit card debt grows so quickly when left unchecked.' },
  { q: 'Is it better to pay off one card completely or pay a little on each?', a: 'Mathematically, focusing all extra payments on the highest-APR card (the avalanche method) saves the most money. Psychologically, paying off the smallest balance first (the snowball method) creates momentum. Either way, always make minimum payments on all cards to avoid penalties and credit damage.' },
  { q: 'What happens if I miss a credit card payment?', a: 'Missing a payment triggers a late fee ($25-$40), may increase your APR to the penalty rate (often 29.99%), and gets reported to credit bureaus after 30 days — which can drop your credit score 60-110 points. Set up autopay for at least the minimum to prevent missed payments.' },
];

export default function CreditCardPage() {
  const toolSchema = generateToolSchema('credit-card-payoff');
  const faqSchema = generateFaqSchema(FAQ_ITEMS);
  const howToSchema = generateHowToSchema({
    name: 'How to Use the Credit Card Payoff Calculator',
    description: 'Calculate how long it takes to pay off credit card debt and how much interest you save by paying more than the minimum.',
    steps: [
      { name: 'Enter your balance', text: 'Input your current credit card balance — the total amount you owe on this card.' },
      { name: 'Enter your APR', text: 'Enter your card\'s annual percentage rate (APR). You can find this on your statement or by calling your issuer.' },
      { name: 'Set minimum payment percentage', text: 'Enter your card\'s minimum payment percentage (usually 1-3% of balance). This is shown on your monthly statement.' },
      { name: 'Set a fixed payment amount', text: 'Enter a fixed monthly payment you can commit to. A higher fixed payment dramatically reduces payoff time.' },
      { name: 'Compare the results', text: 'Review the minimum-only vs fixed-payment scenarios. See months saved, interest saved, and your new payoff date.' },
    ],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Debt Management', url: `${SITE_URL}/category/debt-management` },
    { name: 'Credit Card Payoff Calculator', url: `${SITE_URL}/tools/credit-card-payoff` },
  ]);

  return (
    <>
      {toolSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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

        {/* What is a Credit Card Payoff Calculator? */}
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">What Is a Credit Card Payoff Calculator?</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          A credit card payoff calculator is a free financial tool that shows you exactly how long it will take
          to pay off your credit card balance and how much total interest you will pay. Unlike generic
          calculators that only show a single scenario, our tool compares two critical pathways: the declining
          minimum payment trap — where your payment shrinks every month and keeps you in debt for decades — and
          the fixed payment approach, where locking in a consistent payment amount dramatically accelerates your
          debt-free date.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          The average American household carries over $6,500 in credit card debt at an average APR of 20.7%.
          At minimum payments, that debt takes over 17 years to pay off and costs more than $9,000 in interest
          alone. Understanding these numbers is the first step toward breaking free. Our calculator runs
          entirely in your browser — no sign-up required, no data stored, completely private and instant.
        </p>

        {/* Financial Glossary */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Key Credit Card Terms Explained</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-2 pr-4 font-semibold text-slate-900 dark:text-white">Term</th>
                  <th className="text-left py-2 font-semibold text-slate-900 dark:text-white">Definition</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-400">
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">APR</td>
                  <td className="py-2.5">Annual Percentage Rate — the yearly interest rate charged on your balance. Divide by 12 to get the monthly rate.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Minimum Payment</td>
                  <td className="py-2.5">The lowest amount your issuer requires each month, usually 1-3% of the outstanding balance or a flat dollar floor (e.g., $25).</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Credit Utilization</td>
                  <td className="py-2.5">The percentage of your total available credit that you are currently using. Keeping this below 30% (ideally under 10%) helps your credit score.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Balance Transfer</td>
                  <td className="py-2.5">Moving debt from one credit card to another, often with a promotional 0% APR period. Usually comes with a 3-5% transfer fee.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Grace Period</td>
                  <td className="py-2.5">The window (usually 21-25 days) between your statement date and payment due date during which no interest accrues on new purchases — only if you paid last month in full.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Penalty APR</td>
                  <td className="py-2.5">A higher interest rate (often 29.99%) triggered by missing payments or exceeding your credit limit. Can apply to your entire balance indefinitely.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Expert Tips */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Expert Tips for Paying Off Credit Cards Faster</h2>
          <ol className="space-y-3">
            {[
              { title: 'Lock in your payment amount', tip: 'When you start paying off a card, note the minimum payment on your first statement and commit to never paying less than that amount — even as the minimum decreases. This one habit can cut your payoff time in half.' },
              { title: 'Target the highest APR first', tip: 'If you have multiple cards, direct all extra payments to the card with the highest interest rate while making minimums on the rest. This is the avalanche method — it saves the most interest over time.' },
              { title: 'Negotiate your APR', tip: 'Call your card issuer and ask for a rate reduction. If you have been a reliable customer, many issuers will lower your APR by 2-5 percentage points. A 5-minute phone call could save you hundreds.' },
              { title: 'Automate more than the minimum', tip: 'Set up automatic payments for a fixed amount that exceeds the minimum. Automating removes the temptation to pay less during tight months and ensures consistent progress.' },
              { title: 'Use windfalls strategically', tip: 'Apply tax refunds, bonuses, or unexpected income directly to your highest-rate balance. A single $1,000 lump-sum payment can save hundreds in future interest and months of payments.' },
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div><strong className="text-slate-700 dark:text-slate-300">{item.title}:</strong> {item.tip}</div>
              </li>
            ))}
          </ol>
        </div>

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
