// src/app/tools/debt-payoff/page.tsx
import type { Metadata } from 'next';
import { DebtPayoffCalculator } from './DebtPayoffCalculator';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import { generateToolMetadata, generateFaqSchema, generateToolSchema, generateHowToSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';

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
  {
    q: 'What if I can only afford $50 extra per month?',
    a: 'Even $50 extra per month makes a significant difference. On $25,000 of debt at mixed rates, adding $50/month can save over $3,000 in interest and cut 18+ months off your payoff timeline. The key is consistency — apply the extra payment every single month without fail.',
  },
  {
    q: 'Should I pay off debt or save for an emergency fund first?',
    a: 'Build a starter emergency fund of $1,000-$2,000 first, then aggressively attack high-interest debt (above 7-8%), then build a full 3-6 month emergency fund. Without any emergency savings, unexpected expenses force you back into debt.',
  },
  {
    q: 'Is debt consolidation the same as the snowball or avalanche method?',
    a: 'No. Debt consolidation combines multiple debts into a single new loan, hopefully at a lower rate. The snowball and avalanche methods are payment strategies that do not require a new loan — you keep existing debts and optimize your payment order. Consolidation can complement these methods if the new rate is significantly lower.',
  },
  {
    q: 'How do I stay motivated during a long debt payoff journey?',
    a: 'Track your progress visually (debt payoff thermometer), celebrate each debt you eliminate, share your goals with an accountability partner, and remember that each payment brings you closer to financial freedom. The snowball method specifically helps motivation by giving you quick wins early.',
  },
  {
    q: 'What debts should I include in this calculator?',
    a: 'Include all non-mortgage debts: credit cards, personal loans, auto loans, medical bills, student loans, and any other installment debt. Enter each debt separately with its own balance, interest rate, and minimum payment for the most accurate comparison.',
  },
] as const;

export default function DebtPayoffPage() {
  const toolSchema = generateToolSchema('debt-payoff');
  const faqSchema = generateFaqSchema(FAQ_ITEMS.map(f => ({ q: f.q, a: f.a })));
  const howToSchema = generateHowToSchema({
    name: 'How to Use the Debt Payoff Calculator',
    description: 'Compare snowball, avalanche, and hybrid debt payoff strategies to find the fastest and cheapest way to become debt-free.',
    steps: [
      { name: 'Add your debts', text: 'Click "Add Debt" and enter each debt\'s name, current balance, annual interest rate (APR), and minimum monthly payment.' },
      { name: 'Set your extra payment', text: 'Enter any additional monthly amount you can put toward debt beyond your minimums. Even $50 extra per month makes a significant difference.' },
      { name: 'Compare strategies', text: 'Review the Snowball (smallest balance first), Avalanche (highest rate first), and Hybrid results side by side. The "Best Strategy" banner highlights the most cost-effective option.' },
      { name: 'Study the timeline', text: 'Use the payoff timeline chart to visualize when each debt disappears under each strategy and identify your exact debt-free date.' },
      { name: 'Take action', text: 'Use the optimized payment order to start attacking your debts today. Revisit the calculator whenever your situation changes.' },
    ],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools/debt-payoff` },
    { name: 'Debt Payoff Calculator', url: `${SITE_URL}/tools/debt-payoff` },
  ]);

  return (
    <>
      {toolSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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

        {/* What is a Debt Payoff Calculator? */}
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">What Is a Debt Payoff Calculator?</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          A debt payoff calculator is a free financial planning tool that models how long it will take to
          become completely debt-free and how much total interest you will pay along the way. Our calculator
          goes further than most by comparing three proven debt payoff strategies side by side \u2014 the debt
          snowball, debt avalanche, and a hybrid method \u2014 so you can choose the approach that best fits
          your financial situation and personality.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          The average American household carries over $100,000 in total debt, including mortgages, credit
          cards, auto loans, and student loans. Without a structured payoff strategy, high-interest consumer
          debt compounds rapidly, costing thousands in unnecessary interest over time. This calculator helps
          you see the exact impact of directed extra payments and optimized payment ordering \u2014 turning an
          overwhelming debt situation into a clear, actionable roadmap.
        </p>

        {/* Financial Glossary */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Key Debt Payoff Terms</h3>
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
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Debt Snowball</td>
                  <td className="py-2.5">A payoff strategy that targets the smallest balance first, regardless of interest rate. Builds psychological momentum through quick wins.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Debt Avalanche</td>
                  <td className="py-2.5">A payoff strategy targeting the highest interest rate debt first. Mathematically optimal \u2014 saves the most total interest over the payoff period.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Minimum Payment</td>
                  <td className="py-2.5">The lowest required monthly payment on a debt. Making only minimums maximizes the lender\u2019s interest revenue and extends your payoff by years.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Extra Payment</td>
                  <td className="py-2.5">Any amount paid above the sum of all minimum payments. Directed extra payments are the key accelerator in all three payoff strategies.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Debt-Free Date</td>
                  <td className="py-2.5">The projected month and year when your last debt reaches a $0 balance. Moving this date closer is the primary goal of payoff optimization.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">APR</td>
                  <td className="py-2.5">Annual Percentage Rate \u2014 the yearly cost of borrowing, expressed as a percentage. Higher APRs mean more interest charges on your balance each month.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Expert Tips */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Expert Tips for Faster Debt Payoff</h3>
          <ol className="space-y-3">
            {[
              { title: 'Pick a strategy and commit', tip: 'The best debt payoff method is the one you actually stick with. If quick wins motivate you, use the snowball. If saving money excites you, use the avalanche. Consistency matters more than optimization.' },
              { title: 'Never reduce your total payment', tip: 'When you pay off one debt, roll that entire freed-up payment into the next target. This is the rollover effect and it is the single most powerful accelerator in any debt payoff plan.' },
              { title: 'Automate your payments', tip: 'Set up automatic payments for your planned amounts. This removes the monthly decision point and ensures you never miss a payment or accidentally pay less than planned.' },
              { title: 'Find one extra income source', tip: 'A small side income of $200-$500/month applied directly to debt can cut years off your payoff timeline. Freelancing, selling unused items, or a part-time gig all work.' },
              { title: 'Review and adjust quarterly', tip: 'Revisit this calculator every 3 months with your updated balances. Seeing the payoff date get closer provides motivation, and you can adjust strategy if your situation changes.' },
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div><strong className="text-slate-700 dark:text-slate-300">{item.title}:</strong> {item.tip}</div>
              </li>
            ))}
          </ol>
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
