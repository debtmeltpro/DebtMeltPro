// src/app/tools/debt-payoff/page.tsx
// ============================================================
// DebtMeltPro — Debt Payoff Calculator (SEO-Optimized v3)
// Primary keyword: debt payoff calculator
// Secondary: credit card payoff calculator, debt avalanche
//            calculator, debt snowball calculator, loan payoff
//            calculator, debt repayment calculator
// ============================================================

import type { Metadata } from 'next';
import Link from 'next/link';
import { DebtPayoffCalculator } from './DebtPayoffCalculator';
import { AdSlotLeaderboard, AdSlotInContent, AdSlotInArticle } from '@/components/molecules/AdSlot';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import {
  generateFaqSchema,
  generateToolSchema,
  generateHowToSchema,
  generateBreadcrumbSchema,
  SITE_URL,
} from '@/lib/seo';

// ─── SEO Metadata ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Free Debt Payoff Calculator — Snowball vs Avalanche (2026)',
  description:
    'Pay off debt faster with our free debt payoff calculator. Compare snowball, avalanche & hybrid strategies, add extra payments, and see your exact debt-free date.',
  keywords: [
    'debt payoff calculator',
    'debt payoff calculator with extra payments',
    'credit card payoff calculator',
    'debt avalanche calculator',
    'debt snowball calculator',
    'loan payoff calculator',
    'debt repayment calculator',
    'how long to pay off debt calculator',
    'best debt payoff calculator for credit cards',
    'debt payoff calculator avalanche vs snowball',
  ],
  alternates: { canonical: `${SITE_URL}/tools/debt-payoff` },
  openGraph: {
    title: 'Free Debt Payoff Calculator — Snowball vs Avalanche',
    description:
      'Compare snowball, avalanche & hybrid debt payoff strategies. See your exact debt-free date, total interest saved, and optimal payment order — free, instant, and private.',
    url: `${SITE_URL}/tools/debt-payoff`,
    siteName: 'DebtMeltPro',
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Debt Payoff Calculator — Snowball vs Avalanche',
    description:
      'Compare three proven debt payoff strategies side by side. Find your fastest, cheapest path to $0.',
  },
};

// ─── FAQ Data ─────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: 'How long will it take to pay off my debt?',
    a: 'Your payoff timeline depends on your total balance, interest rates, minimum payments, and how much extra you can contribute each month. Enter your debts into this calculator to see the exact month and year you will be debt-free under each strategy. For example, $25,000 in mixed-rate debt with $200 extra per month typically takes 28–40 months with avalanche or snowball, compared to 10+ years with minimums alone.',
  },
  {
    q: "What's the fastest way to pay off debt?",
    a: 'The fastest method combines two steps: directing every extra dollar to one target debt at a time (rather than spreading extra payments across all debts) and rolling each freed-up payment into the next target. The debt avalanche method is mathematically fastest because it eliminates the most expensive interest first. Adding any windfall — tax refunds, bonuses, or side income — directly to your target debt accelerates the timeline further.',
  },
  {
    q: 'Debt avalanche vs snowball — which is better?',
    a: 'The avalanche method saves the most money by targeting the highest interest rate first. The snowball method builds motivation by targeting the smallest balance first for quick wins. Research from Northwestern University shows that people who start with quick wins are more likely to eliminate all their debt. The best method is the one you stick with. Our calculator lets you compare both side by side with your actual numbers.',
  },
  {
    q: 'How much extra should I pay to pay off debt faster?',
    a: 'Even $50 extra per month makes a meaningful difference. On $25,000 of mixed-rate debt, an extra $50/month can save $3,000+ in interest and cut 18 months off your timeline. An extra $200/month can save $6,000+ and cut 3–4 years. Use our calculator to model different extra payment amounts and find the sweet spot for your budget.',
  },
  {
    q: 'Can I pay off debt in 2 years using a calculator?',
    a: 'Yes — depending on your total balance and how much you can pay each month. This calculator shows you exactly what monthly payment is needed to be debt-free in 24 months. For $15,000 in debt at an average 18% interest rate, you would need roughly $750–$800 per month to pay everything off in two years. Adjust the extra payment slider to find the amount that hits your target date.',
  },
  {
    q: 'What is the best debt payoff strategy in the US?',
    a: 'For most Americans, the debt avalanche method (highest interest rate first) saves the most money. However, if you have many small debts and need motivational wins, the snowball method (smallest balance first) has a higher completion rate. A hybrid approach — snowball for the first 2–3 months, then switching to avalanche — gives you quick momentum plus long-term savings. All three strategies work; the key is making extra payments consistently.',
  },
  {
    q: 'Does debt consolidation save money?',
    a: 'Debt consolidation can save money if the new interest rate is meaningfully lower than your current weighted average rate and you do not extend the repayment term. However, consolidation does not reduce what you owe — it restructures it. Many people consolidate and then run up new balances on the freed-up credit cards, ending up worse off. Use our calculator to compare the avalanche method against a consolidation scenario before deciding.',
  },
  {
    q: 'Should I pay off highest interest debt first?',
    a: 'From a pure math standpoint, yes. Paying off the highest interest debt first (avalanche method) minimizes total interest paid over the life of your debt. If your highest-rate debt is a credit card at 24% APR while your car loan is at 5%, every extra dollar reduces interest four times faster on the credit card. The exception: if the highest-rate debt has a very large balance and eliminating a smaller debt quickly would free up cash flow you need.',
  },
  {
    q: 'Can I include multiple loans in this calculator?',
    a: 'Yes. This calculator supports up to 20 separate debts. You can include credit cards, personal loans, auto loans, medical bills, student loans, and any other installment or revolving debt. Enter each account individually with its balance, interest rate, and minimum payment for the most accurate comparison between snowball, avalanche, and hybrid strategies.',
  },
  {
    q: 'How accurate are debt payoff calculators?',
    a: 'Our calculator uses standard monthly amortization formulas — the same math that banks and financial advisors use. Results are highly accurate for fixed-rate debts with consistent payments. Actual results may vary slightly due to daily interest accrual methods, promotional APR periods, variable rates, or lender-specific rounding. For credit cards with fluctuating balances, treat the result as a close estimate and revisit the calculator monthly with updated numbers.',
  },
] as const;

// ─── Page Component ───────────────────────────────────────────

export default function DebtPayoffPage() {
  const toolSchema = generateToolSchema('debt-payoff');
  const faqSchema = generateFaqSchema(FAQ_ITEMS.map((f) => ({ q: f.q, a: f.a })));

  const howToSchema = generateHowToSchema({
    name: 'How to Use the Debt Payoff Calculator',
    description:
      'Compare snowball, avalanche, and hybrid debt payoff strategies to find the fastest and cheapest way to become debt-free.',
    steps: [
      {
        name: 'Add your debts',
        text: 'Click "Add Debt" and enter each debt\'s name, current balance, annual interest rate (APR), and minimum monthly payment. Include credit cards, personal loans, auto loans, medical bills, and student loans.',
      },
      {
        name: 'Set your extra payment',
        text: 'Enter any additional monthly amount you can put toward debt beyond your minimums. Even $50 extra per month makes a significant difference over time.',
      },
      {
        name: 'Compare strategies',
        text: 'Review the Snowball (smallest balance first), Avalanche (highest rate first), and Hybrid results side by side. The "Best Strategy" banner highlights the most cost-effective option.',
      },
      {
        name: 'Study the timeline',
        text: 'Use the payoff timeline chart to visualize when each debt disappears under each strategy and identify your exact debt-free date.',
      },
      {
        name: 'Take action',
        text: 'Follow the optimized payment order to start attacking your debts today. Revisit the calculator whenever your situation changes.',
      },
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Debt Management', url: `${SITE_URL}/category/debt-management` },
    { name: 'Debt Payoff Calculator', url: `${SITE_URL}/tools/debt-payoff` },
  ]);

  return (
    <>
      {/* ── Structured Data ──────────────────────────────────── */}
      {toolSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Breadcrumb ───────────────────────────────────────── */}
      <Breadcrumb
        items={[
          { label: 'Debt Management', href: '/category/debt-management' },
          { label: 'Debt Payoff Calculator', href: '/tools/debt-payoff' },
        ]}
      />

      {/* ── Hero / H1 + Intro ────────────────────────────────── */}
      <section className="bg-gradient-to-b from-green-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-sm font-medium mb-4">
            Tool 1 of 5 · 100% Free
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Debt Payoff Calculator (Snowball vs Avalanche) — Pay Off Debt Faster
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Popular uses: credit card payoff calculator, loan payoff calculator, debt repayment calculator, payoff calculator with extra payments
          </p>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Use this free debt payoff calculator to calculate how long it will take to pay off debt, compare snowball vs avalanche strategies, and see how much interest you can save with extra payments. Works for credit cards, personal loans, and multiple debts.
          </p>
        </div>
      </section>

      {/* ── Ad: Leaderboard ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AdSlotLeaderboard className="mt-6" />
      </div>

      {/* ── Quick Guide ──────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm uppercase tracking-wide">
            Quick Start Guide
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                step: '1',
                title: 'Add your debts',
                desc: 'Enter each balance, APR, and minimum payment.',
              },
              {
                step: '2',
                title: 'Set extra payments',
                desc: 'Enter how much extra you can pay each month.',
              },
              {
                step: '3',
                title: 'Compare & act',
                desc: 'Pick the best strategy and follow the payoff order.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-3 items-start p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30"
              >
                <span className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-bold flex items-center justify-center shrink-0">
                  {item.step}
                </span>
                <div>
                  <p className="font-medium text-sm text-slate-800 dark:text-slate-200">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calculator Widget ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DebtPayoffCalculator />
      </div>
      <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
        Scroll down to see the best strategy to pay off your debt faster and save thousands in interest.
      </p>

      {/* ── Ad: In-Content ───────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AdSlotInContent />
      </div>

      {/* ── Main SEO Content ─────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8" aria-labelledby="guide-heading">

        {/* ── H2: Free Debt Payoff Calculator with Extra Payments ── */}
        <h2
          id="guide-heading"
          className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8"
        >
          Free Debt Payoff Calculator with Extra Payments
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          This debt payoff calculator works as a credit card payoff calculator, loan payoff calculator, and complete debt repayment planner for multiple debts.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          Most debt payoff calculators show a single payoff scenario. This calculator does something
          fundamentally more useful: it compares three proven strategies — snowball, avalanche, and
          hybrid — side by side, using your actual debts and an extra payment amount you choose.
          The result is a clear picture of how much interest each method saves, how many months
          faster you become debt-free, and the exact order in which to attack your accounts.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          The extra payment slider is where the real power lives. Even a modest $50 per month
          directed strategically can save thousands of dollars and cut years off your payoff
          timeline. The calculator models the &ldquo;debt rollover effect&rdquo; — when you pay off one
          account, its entire freed-up minimum payment rolls into the next target, creating an
          accelerating snowball of payments. This is the single most powerful accelerator in any
          debt elimination plan.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          Every calculation runs entirely in your browser. Your balances, rates, and payment details
          are never transmitted to any server. No sign-up, no email gate, no data collection.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          If you're focusing specifically on credit cards, try our{' '}
          <Link
            href="/tools/credit-card-payoff"
              className="text-green-600 dark:text-green-400 underline hover:no-underline"
          >
           credit card payoff calculator
          </Link>{' '}
             to see how minimum payments can extend your payoff timeline.
        </p>
         <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
           You can also compare long-term growth using our{' '}
           <Link
              href="/tools/compound-interest"
              className="text-green-600 dark:text-green-400 underline hover:no-underline"
            >
              compound interest calculator
            </Link>{' '}
            to understand the opportunity cost of paying off debt versus investing.
          </p>   
        {/* ── H2: How to Use This Debt Payoff Calculator ────────── */}
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
          How to Use This Debt Payoff Calculator
        </h2>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-6">
          <ol className="space-y-3">
            {[
              'Click "Add Debt" and enter each debt individually: the account name, current balance, annual interest rate (APR), and your required minimum monthly payment. Include credit cards, personal loans, auto loans, medical bills, and student loans — up to 20 accounts.',
              'Enter your extra monthly payment. This is the amount above and beyond the sum of all your minimum payments. Start with what you can comfortably afford, then experiment with higher amounts to see how the timeline changes.',
              'Review the three strategy panels. The calculator instantly shows your total payoff time, total interest paid, and interest saved for snowball, avalanche, and hybrid. A green "Best Strategy" badge identifies the most cost-effective option for your specific debts.',
              'Study the payoff timeline chart. The colored lines show how your total balance decreases over time under each strategy. The point where a line hits zero is your debt-free date.',
              'Check the payoff order section. This tells you exactly which debt to attack first, second, and third under your chosen strategy. Follow this order for maximum efficiency.',
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

        {/* ── H2: Debt Avalanche vs Snowball ─────────────────────── */}
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Debt Avalanche vs Snowball — Which Strategy Is Better?
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          The <strong>debt avalanche method</strong> targets the debt with the highest interest rate
          first, regardless of balance size. You make minimum payments on everything else and throw
          every extra dollar at the highest-rate account. Once it is eliminated, you move to the
          next highest rate. This approach minimizes total interest paid and is mathematically the
          most efficient debt payoff strategy.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          The <strong>debt snowball method</strong> targets the smallest balance first. The logic is
          psychological rather than mathematical: eliminating a debt entirely gives you a concrete
          win, which fuels motivation. Research published in the Harvard Business Review found that
          consumers who focused on small wins were significantly more likely to persist and
          eliminate all their debt.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          The <strong>hybrid method</strong> starts with snowball for the first 2–3 months to build
          momentum through quick wins, then switches to avalanche for the remainder. This gives you
          the motivational boost of eliminating a small debt quickly while capturing most of the
          interest savings from the avalanche approach.
        </p>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
            Side-by-Side Strategy Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-2 pr-4 font-semibold text-slate-900 dark:text-white">Factor</th>
                  <th className="text-left py-2 pr-4 font-semibold text-slate-900 dark:text-white">Avalanche</th>
                  <th className="text-left py-2 pr-4 font-semibold text-slate-900 dark:text-white">Snowball</th>
                  <th className="text-left py-2 font-semibold text-slate-900 dark:text-white">Hybrid</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-400">
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Targets</td>
                  <td className="py-2.5 pr-4">Highest APR first</td>
                  <td className="py-2.5 pr-4">Smallest balance first</td>
                  <td className="py-2.5">Snowball → Avalanche</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Interest saved</td>
                  <td className="py-2.5 pr-4">Most</td>
                  <td className="py-2.5 pr-4">Least</td>
                  <td className="py-2.5">Near-avalanche</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Quick wins</td>
                  <td className="py-2.5 pr-4">Depends on balances</td>
                  <td className="py-2.5 pr-4">Fastest first win</td>
                  <td className="py-2.5">Fast early wins</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Best for</td>
                  <td className="py-2.5 pr-4">Disciplined savers</td>
                  <td className="py-2.5 pr-4">Motivation seekers</td>
                  <td className="py-2.5">Most people</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── H2: How to Pay Off Debt Faster (2026 Guide) ────────── */}
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
          How to Pay Off Debt Faster (2026 Guide)
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          Paying off debt faster comes down to two levers: reducing the interest you pay each month
          and increasing the amount that goes toward principal. Here are the most effective
          strategies for 2026:
        </p>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-6">
          <ol className="space-y-3">
            {[
              {
                title: 'Negotiate lower interest rates',
                tip: 'Call each credit card issuer and ask for a rate reduction. Mention competitor offers. A 5-minute call can save hundreds. If your credit score has improved since you opened the account, you have strong leverage.',
              },
              {
                title: 'Use the debt rollover effect',
                tip: 'When you eliminate one debt, never pocket the freed-up payment. Roll the entire amount into your next target. A $150 minimum payment that frees up becomes $150 of extra firepower on the next debt.',
              },
              {
                title: 'Direct windfalls to debt',
                tip: 'Apply tax refunds, work bonuses, birthday gifts, and side income directly to your highest-priority debt. A single $1,500 tax refund can save hundreds in future interest.',
              },
              {
                title: 'Automate fixed payments',
                tip: 'Set up autopay for a fixed dollar amount that exceeds the minimum. When minimums decline as your balance shrinks, your payment stays constant — this is the opposite of what credit card companies want you to do.',
              },
              {
                title: 'Generate extra income',
                tip: 'A side income of $200–$500 per month applied directly to debt can cut years off your payoff timeline. Freelancing, selling unused items, rideshare driving, or tutoring all work.',
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <strong className="text-slate-700 dark:text-slate-300">{item.title}:</strong>{' '}
                  {item.tip}
                </div>
              </li>
            ))}
          </ol>
        
        </div>

        <AdSlotInArticle />

        {/* ── H2: Credit Card Debt Payoff Strategy Explained ──────── */}
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Credit Card Debt Payoff Strategy Explained
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          Credit card debt is the most expensive consumer debt most Americans carry. With average
          APRs exceeding 22% in 2026, the cost of carrying a balance compounds aggressively. The
          minimum payment trap — where your required payment shrinks as your balance decreases —
          is specifically designed to keep you paying interest for decades.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          The fix is straightforward: lock your payment at a fixed amount that exceeds your first
          month&apos;s minimum, and never let it decrease. On a $5,000 balance at 22% APR, paying a
          fixed $200 per month instead of declining minimums reduces your payoff from 30+ years to
          32 months and saves over $10,000 in interest. For detailed credit card scenarios, use
          our{' '}
          <Link
            href="/tools/credit-card-payoff"
            className="text-green-600 dark:text-green-400 underline hover:no-underline"
          >
            credit card payoff calculator
          </Link>
          , which models the minimum payment trap and shows the exact savings of fixing your payment.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          If you carry balances on multiple credit cards, this debt payoff calculator is the better
          tool: it optimizes the payment order across all your cards and other debts simultaneously,
          showing you which card to attack first for maximum savings.
        </p>

        {/* ── H2: Debt Payoff Calculator for Multiple Loans ──────── */}
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Debt Payoff Calculator for Multiple Loans
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          This calculator handles up to 20 debts simultaneously — credit cards, personal loans,
          auto loans, medical bills, student loans, and any other installment debt. The power of a
          multi-debt calculator is that it optimizes payment ordering across your entire debt
          portfolio, not just one account at a time.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          For student loan borrowers, be aware that refinancing federal loans into private loans
          permanently removes access to income-driven repayment and Public Service Loan
          Forgiveness. Our{' '}
          <Link
            href="/tools/student-loan"
            className="text-green-600 dark:text-green-400 underline hover:no-underline"
          >
            Student Loan Refinance Calculator
          </Link>{' '}
          helps you evaluate that specific trade-off. For general debt payoff strategy, keep your
          student loans in this calculator alongside your other debts so the algorithm can optimize
          the overall payment order.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          If you are weighing whether to invest or pay off debt, our{' '}
          <Link
            href="/tools/compound-interest"
            className="text-green-600 dark:text-green-400 underline hover:no-underline"
          >
            FIRE Calculator
          </Link>{' '}
          projects compound growth so you can compare the opportunity cost of debt payments against
          potential investment returns. As a general rule, pay off any debt with an interest rate
          above 6–7% before directing extra money to investments.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          If you are managing multiple credit cards, try our{' '}
          <Link
            href="/tools/credit-card-payoff"
            className="text-green-600 dark:text-green-400 underline hover:no-underline"
          >
            credit card payoff calculator
          </Link>{' '}
          to optimize individual card payments before combining strategies.
        </p>

        {/* ── H2: Real Example: Pay Off $25,000 Debt Faster ──────── */}
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Real Example: Pay Off $25,000 Debt Faster
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          Consider someone with three debts totaling $25,000 and $300 per month in extra payments:
        </p>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-4">
          <div className="space-y-3">
            {[
              { name: 'Credit Card', balance: '$6,500', rate: '22.99%', min: '$150/mo' },
              { name: 'Personal Loan', balance: '$10,500', rate: '14.5%', min: '$260/mo' },
              { name: 'Car Loan', balance: '$8,000', rate: '7.9%', min: '$195/mo' },
            ].map((d) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-800 dark:text-slate-200">{d.name}</span>
                <div className="flex gap-4 text-slate-500 tabular-nums">
                  <span>{d.balance}</span>
                  <span>{d.rate} APR</span>
                  <span>{d.min} min</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-800">
            <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase mb-2">
              Minimum Payments Only
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Payoff time: <strong>12+ years</strong>. Total interest paid:{' '}
              <strong>$9,800+</strong>. Total cost: nearly <strong>$35,000</strong> on $25,000 of
              original debt.
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200 dark:border-green-800">
            <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase mb-2">
              Avalanche + $300 Extra
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Payoff time: <strong>29 months</strong>. Total interest paid:{' '}
              <strong>$3,600</strong>. You save <strong>$6,200+ in interest</strong> and{' '}
              <strong>9+ years</strong> of payments.
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          In this example, the avalanche method targets the 22.99% credit card first. Once that
          $6,500 balance is eliminated (around month 8), the freed-up $150 minimum payment rolls
          into the personal loan attack, creating a $710/month payment on that account. The
          acceleration effect is dramatic — and the calculator models every month of it
          automatically.
        </p>
         <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
           Debt Payoff Calculator vs Debt Consolidation
         </h2>

         <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
           A debt payoff calculator helps you create a structured repayment plan, while debt consolidation combines multiple debts into one loan with a lower interest rate. The best option depends on your interest rates, discipline, and financial goals.
         </p>
         <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
             Before choosing consolidation, compare results using our{' '}
            <Link
              href="/tools/debt-payoff"
              className="text-green-600 dark:text-green-400 underline hover:no-underline"
          >
             debt payoff calculator
            </Link>{' '}
              to see if you can save more without taking a new loan.
          </p>
        {/* ── H2: Common Mistakes to Avoid ───────────────────────── */}
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Common Mistakes to Avoid When Paying Off Debt
        </h2>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-6">
          <ol className="space-y-3">
            {[
              {
                title: 'Spreading extra payments across all debts equally',
                tip: 'Splitting $300 extra as $100 to each of three debts is far less effective than focusing all $300 on one target. Concentration creates the rollover effect; spreading dilutes it.',
              },
              {
                title: 'Letting minimum payments decline',
                tip: 'As your credit card balance drops, your required minimum decreases. If you let your payment drop with it, your payoff stretches to decades. Lock in a fixed amount and never reduce it.',
              },
              {
                title: 'Ignoring interest rates entirely',
                tip: 'Some people pay debts randomly or based on emotional factors. If your credit card charges 24% while your car loan charges 5%, every dollar sent to the car loan costs you four times more in foregone interest savings on the credit card.',
              },
              {
                title: 'Taking on new debt while paying off old',
                tip: 'Adding new charges to credit cards while executing a payoff plan is like bailing water while the faucet is still running. Freeze credit card spending or switch to cash during your payoff period.',
              },
              {
                title: 'Having no emergency fund',
                tip: 'Without at least $1,000–$2,000 in cash reserves, any unexpected expense forces you back into debt. Build a starter emergency fund before going fully aggressive on debt payoff.',
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <strong className="text-slate-700 dark:text-slate-300">{item.title}:</strong>{' '}
                  {item.tip}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ── H2: Advanced Tips ──────────────────────────────────── */}
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Advanced Tips to Become Debt-Free Faster
        </h2>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-6">
          <ol className="space-y-3">
            {[
              {
                title: 'Use a 0% balance transfer strategically',
                tip: 'Transferring a high-APR balance to a 0% introductory rate card can eliminate interest for 12–21 months. The key: commit to paying off the transferred balance before the promotional period ends. Watch for the 3–5% transfer fee and factor it into your math.',
              },
              {
                title: 'Revisit this calculator every quarter',
                tip: 'Update your balances every 3 months. Watching the debt-free date move closer is a powerful motivator. If your income changes, adjust the extra payment amount to reflect your new capacity.',
              },
              {
                title: 'Stack multiple acceleration tactics',
                tip: 'Combine a rate reduction (via negotiation or balance transfer) with increased payments (via side income) and the avalanche method. Each tactic alone helps; stacking them creates compounding acceleration.',
              },
              {
                title: 'Consider the debt-to-income ratio impact',
                tip: 'Lenders evaluate your debt-to-income ratio (DTI) for mortgages and other major loans. Aggressively paying down high-payment debts before applying for a mortgage can qualify you for better rates and higher loan amounts.',
              },
              {
                title: 'Use AI prompts for personalized planning',
                tip: 'Our free AI finance prompts let you paste your debt details into ChatGPT or Claude to generate personalized payoff schedules, negotiation scripts, and budget optimizations. Try the ',
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <strong className="text-slate-700 dark:text-slate-300">{item.title}:</strong>{' '}
                  {item.tip}
                  {i === 4 && (
                    <Link
                      href="/prompts/debt-payoff/debt-snowball-action-plan"
                      className="text-green-600 dark:text-green-400 underline hover:no-underline"
                    >
                      Debt Snowball Action Plan prompt
                    </Link>
                  )}
                  {i === 4 && (
                    <span>
                      {' '}or browse{' '}
                      <Link
                        href="/prompts"
                        className="text-green-600 dark:text-green-400 underline hover:no-underline"
                      >
                        all AI finance prompts
                      </Link>
                      .
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ── H2: What Is a Debt Payoff Calculator? ──────────────── */}
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
          What Is a Debt Payoff Calculator?
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          A debt payoff calculator is a financial planning tool that models how long it will take to
          eliminate your debts and how much total interest you will pay along the way. You enter your
          account balances, interest rates, and minimum payments, and the calculator projects your
          payoff timeline month by month.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            This tool also works as a{' '}
           
            <Link
              href="/tools/credit-card-payoff"
              className="text-green-600 dark:text-green-400 underline hover:no-underline"
            >
              credit card payoff calculator
            </Link>
            , helping you manage all types of debt in one place.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          What makes this calculator different from basic versions is the strategy comparison. Most
          tools only show a single payoff scenario. This one runs three simultaneous simulations —
          snowball, avalanche, and hybrid — so you can see exactly how much each approach costs in
          total interest, how many months each takes, and which one saves the most money for your
          specific debt mix.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          The average American household carries over $104,000 in total debt (including mortgages),
          and the average credit card balance exceeds $6,500 at APRs above 22%. Without a
          structured payoff strategy, high-interest consumer debt compounds rapidly, costing
          thousands in unnecessary interest over time. A debt payoff calculator transforms an
          overwhelming situation into a clear, month-by-month action plan.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          This calculator uses standard monthly amortization formulas — the same math banks and
          certified financial planners rely on. All calculations run in your browser with zero data
          stored on any server. For mortgage-specific analysis, use our{' '}
          <Link
            href="/tools/mortgage-calculator"
            className="text-green-600 dark:text-green-400 underline hover:no-underline"
          >
            Rent vs. Buy Calculator
          </Link>
          . For investment projections and retirement planning, try the{' '}
          <Link
            href="/tools/compound-interest"
            className="text-green-600 dark:text-green-400 underline hover:no-underline"
          >
            FIRE Calculator
          </Link>
          .
        </p>

        {/* ── Financial Glossary ─────────────────────────────────── */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
            Key Debt Payoff Terms
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-2 pr-4 font-semibold text-slate-900 dark:text-white">
                    Term
                  </th>
                  <th className="text-left py-2 font-semibold text-slate-900 dark:text-white">
                    Definition
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-400">
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">
                    Debt Snowball
                  </td>
                  <td className="py-2.5">
                    A payoff strategy targeting the smallest balance first, regardless of interest
                    rate. Builds psychological momentum through quick wins.
                  </td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">
                    Debt Avalanche
                  </td>
                  <td className="py-2.5">
                    A payoff strategy targeting the highest interest rate debt first.
                    Mathematically optimal — saves the most total interest over the payoff period.
                  </td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">
                    APR
                  </td>
                  <td className="py-2.5">
                    Annual Percentage Rate — the yearly cost of borrowing, expressed as a
                    percentage. Higher APRs mean more interest charges on your balance each month.
                  </td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">
                    Debt Rollover
                  </td>
                  <td className="py-2.5">
                    When a debt is fully paid off, its freed-up minimum payment is redirected to
                    the next target. This acceleration effect is the engine behind both snowball
                    and avalanche methods.
                  </td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">
                    Extra Payment
                  </td>
                  <td className="py-2.5">
                    Any amount paid above the sum of all minimum payments. Directed extra payments
                    are the key accelerator in all three payoff strategies.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">
                    Debt-Free Date
                  </td>
                  <td className="py-2.5">
                    The projected month and year when your last debt reaches a $0 balance. Moving
                    this date closer is the primary goal of payoff optimization.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── FAQ Section ────────────────────────────────────────── */}

        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Related Debt Payoff Questions
         </h2>

          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 mb-6">
            <li>How to pay off $10,000 debt fast?</li>
            <li>How long to pay off credit card debt?</li>
            <li>Is snowball better than avalanche?</li>
            <li>Can I pay off debt in 1 year?</li>
          </ul>
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Debt Payoff Calculator FAQ
        </h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <details
              key={i}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group"
            >
              <summary className="p-5 cursor-pointer font-medium text-slate-800 dark:text-slate-200 text-sm flex justify-between items-center gap-3 list-none hover:text-green-600 dark:hover:text-green-400 transition-colors">
                {q}
                <span className="text-slate-400 group-open:rotate-45 transition-transform shrink-0 text-lg leading-none">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">
                {a}
              </div>
            </details>
          ))}
        </div>

        {/* ── Related Reading ────────────────────────────────────── */}
        <div className="mt-10 p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
            Continue Learning
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Read our in-depth{' '}
            <Link
              href="/blog/snowball-vs-avalanche-debt-payoff"
              className="text-green-600 dark:text-green-400 underline hover:no-underline"
            >
              snowball vs. avalanche comparison
            </Link>{' '}
            for real-world examples. Learn how the{' '}
            <Link
              href="/blog/minimum-payment-trap-credit-cards"
              className="text-green-600 dark:text-green-400 underline hover:no-underline"
            >
              minimum payment trap
            </Link>{' '}
            keeps credit card holders in debt for decades. If you are also planning for long-term
            wealth, our{' '}
            <Link
              href="/blog/fire-number-explained"
              className="text-green-600 dark:text-green-400 underline hover:no-underline"
            >
              FIRE number guide
            </Link>{' '}
            explains how to calculate financial independence. Browse our{' '}
            <Link
              href="/category/debt-management"
              className="text-green-600 dark:text-green-400 underline hover:no-underline"
            >
              full debt management toolkit
            </Link>{' '}
            for more free tools.
          </p>
        </div>

        {/* ── Disclaimer ─────────────────────────────────────────── */}
        <p className="mt-8 text-xs text-slate-400 dark:text-slate-600 leading-relaxed">
          <strong>Disclaimer:</strong> Results are estimates for educational purposes only.
          Calculations assume fixed interest rates and do not account for promotional APR periods,
          variable rates, or lender-specific terms. Consult a licensed financial advisor before
          making debt management decisions.
        </p>
      </section>

      {/* ── Related Tools CTA ────────────────────────────────── */}
      <RelatedTools currentSlug="debt-payoff" />
    </>
  );
}
