// src/app/blog/debt-avalanche-calculator-explained/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import { generateFaqSchema, SITE_URL } from '@/lib/seo';
import { AdSlotLeaderboard, AdSlotInContent, AdSlotInArticle } from '@/components/molecules/AdSlot';
import { Calendar, Clock, ArrowRight, Mountain } from 'lucide-react';

const SLUG = 'debt-avalanche-calculator-explained';

/* ── SEO Metadata ─────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Debt Avalanche Calculator: How It Works + Free Tool (2026)',
  description:
    'Complete guide to the debt avalanche method. See how targeting high-APR debt first saves thousands. Free calculator compares avalanche vs snowball vs hybrid.',
  keywords: [
    'debt avalanche calculator',
    'avalanche method calculator',
    'debt avalanche method',
    'avalanche debt payoff calculator',
    'debt avalanche vs snowball calculator',
    'how does debt avalanche work',
    'best debt avalanche calculator',
    'debt avalanche spreadsheet',
  ],
  alternates: { canonical: `${SITE_URL}/blog/${SLUG}` },
  openGraph: {
    title: 'Debt Avalanche Calculator: Complete Guide',
    description:
      'How the debt avalanche method works, why it saves the most money, and a free calculator to test it on your debts.',
    url: `${SITE_URL}/blog/${SLUG}`,
    type: 'article',
    publishedTime: '2026-04-24T00:00:00Z',
    modifiedTime: '2026-04-24T00:00:00Z',
  },
};

/* ── FAQ Data ─────────────────────────────────────────────────── */

const FAQS = [
  {
    q: 'What is a debt avalanche calculator?',
    a: 'A debt avalanche calculator is a tool that runs the debt avalanche strategy — paying minimums on all debts while throwing every extra dollar at the debt with the highest interest rate. It shows you exactly which debt to target first, how long each debt takes to clear, total interest you\'ll pay, and how much you save versus minimum payments. Our calculator runs this math in your browser instantly with no signup.',
  },
  {
    q: 'How does the debt avalanche method work?',
    a: 'Three rules: (1) list all your debts by interest rate, highest to lowest; (2) pay only the minimum on everything except the highest-rate debt; (3) throw every extra dollar you have at the highest-rate debt until it hits zero. When that first debt is gone, roll its entire payment (minimum + extra) into the next-highest-rate debt. Keep rolling until all debts are paid. This is mathematically the fastest, cheapest way to become debt-free.',
  },
  {
    q: 'Why does the debt avalanche save more money than snowball?',
    a: 'Because interest is what makes debt expensive, and higher rates compound faster. Every dollar you direct to a 24% APR credit card eliminates about 24¢/year in future interest. The same dollar on a 6% car loan eliminates only 6¢/year. Avalanche puts every dollar where it has the biggest impact. On $20,000 of mixed-rate debt, avalanche typically saves $1,000-$3,000 versus snowball over the full payoff period.',
  },
  {
    q: 'What\'s the downside of the debt avalanche method?',
    a: 'It can feel slow. If your highest-rate debt is also your largest balance, you might go 6-12 months without fully eliminating any single debt — which is demotivating for people who need quick wins. The snowball method (smallest balance first) eliminates debts faster in raw count, even though it costs more in interest. If you\'ve tried and failed to pay off debt before, snowball might actually work better for you despite being mathematically inferior.',
  },
  {
    q: 'Do I need a spreadsheet for the debt avalanche method?',
    a: 'No — a good calculator is better. Spreadsheets require you to manually update balances each month and recalculate payment allocations when a debt is cleared. A dedicated debt avalanche calculator handles the rollover automatically and shows the complete timeline instantly. Spreadsheets are fine for tracking actual payments made, but for planning, a calculator saves hours.',
  },
  {
    q: 'Can I combine debt avalanche with a balance transfer?',
    a: 'Yes, and it\'s often the optimal strategy. Move your highest-APR debt to a 0% balance transfer card, then run avalanche on the remaining debts. During the 0% period, the transferred balance acts like a zero-interest obligation you pay down aggressively. After the intro period ends (usually 15-21 months), if anything remains, it rejoins the avalanche at whatever the post-intro rate is.',
  },
  {
    q: 'How long does the debt avalanche take to clear typical debt?',
    a: 'Varies with your debt size and payment amount. Typical examples: $15,000 mixed debt with $300/month extra → 36 months. $25,000 mixed debt with $500/month extra → 39 months. $40,000 mixed debt with $700/month extra → 53 months. The calculator shows your exact timeline based on your actual debts. In every case, avalanche finishes 2-6 months faster than minimums while saving $3,000-$12,000 in interest.',
  },
  {
    q: 'What if I have both credit card debt and student loans — does avalanche still work?',
    a: 'Yes, and it usually says "attack the credit cards first" because credit card APRs (18-28%) are almost always higher than student loan rates (5-8%). But there\'s a caveat for federal student loans: income-driven repayment and PSLF protections have value that avalanche math doesn\'t capture. If you qualify for PSLF, it may be better to pay minimums on federal loans while attacking credit cards, then keep paying minimums on student loans through forgiveness instead of accelerating their payoff.',
  },
];

/* ── Structured Data ──────────────────────────────────────────── */

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Debt Avalanche Calculator: How It Works + Free Tool (2026)',
  description:
    'Complete guide to the debt avalanche method, with real examples and a free calculator to test it on your debts.',
  datePublished: '2026-04-24T00:00:00Z',
  dateModified: '2026-04-24T00:00:00Z',
  author: { '@type': 'Organization', name: 'DebtMeltPro', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'DebtMeltPro', url: SITE_URL },
  mainEntityOfPage: `${SITE_URL}/blog/${SLUG}`,
};

/* ── Page Component ───────────────────────────────────────────── */

export default function DebtAvalancheCalculatorPage() {
  const faqSchema = generateFaqSchema(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb items={[
        { label: 'Blog', href: '/blog' },
        { label: 'Debt Avalanche Calculator Explained', href: `/blog/${SLUG}` },
      ]} />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Header ────────────────────────────────────────── */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/category/debt-management" className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 hover:bg-green-200 transition-colors">
              Debt Management
            </Link>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Calendar className="w-3 h-3" /> Apr 24, 2026
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3 h-3" /> 9 min read
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
            Debt Avalanche Calculator: How It Works + Free Tool (2026)
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            The debt avalanche method is the mathematically cheapest way to pay off multiple debts — but only if you actually use it right. This guide explains how the avalanche works, why it saves the most money, and walks through a real example with $22,000 of mixed debt. At the end, the free calculator runs the math on your actual numbers.
          </p>
        </header>

        {/* ── Table of Contents ─────────────────────────────── */}
        <nav className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-8">
          <p className="font-semibold text-slate-900 dark:text-white text-sm mb-3">In This Guide</p>
          <ol className="space-y-1.5 text-sm text-green-700 dark:text-green-400">
            {[
              { href: '#what-is', label: 'What Is the Debt Avalanche Method?' },
              { href: '#how-works', label: 'How the Avalanche Actually Works (Step-by-Step)' },
              { href: '#example', label: 'Real Example: $22,000 Across 3 Debts' },
              { href: '#calculator', label: 'Use the Free Avalanche Calculator' },
              { href: '#vs-snowball', label: 'Avalanche vs Snowball: Side-by-Side' },
              { href: '#when-works', label: 'When Avalanche Works Best' },
              { href: '#when-fails', label: 'When Avalanche Fails (And What to Do)' },
              { href: '#faq', label: 'Frequently Asked Questions' },
            ].map((item, i) => (
              <li key={item.href}>
                <a href={item.href} className="hover:underline">{i + 1}. {item.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <AdSlotLeaderboard />

        {/* ── What Is ───────────────────────────────────────── */}
        <section id="what-is" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-4 mb-4">
            What Is the Debt Avalanche Method?
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            The debt avalanche method is a debt payoff strategy where you attack your highest-interest-rate debt first, regardless of balance size. You make only minimum payments on every other debt. Every extra dollar you have goes to the one debt with the highest APR until it&rsquo;s gone. Then you roll that entire payment into the next-highest-rate debt and repeat.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            The name comes from the image of your payments accelerating and compounding like an avalanche rolling downhill. Each debt eliminated adds its minimum payment to the total you&rsquo;re throwing at the next debt. By the time you reach your final debt, you&rsquo;re attacking it with a massive combined monthly payment.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            It&rsquo;s the mathematically optimal payoff strategy because interest rates — not balances — determine how expensive each debt really is. A $5,000 credit card at 24% APR costs you $1,200/year in interest. A $20,000 car loan at 5% costs you $1,000/year. The credit card is your highest-cost debt even though the car loan is 4× bigger. Avalanche goes for the expensive one first.
          </p>
        </section>

        {/* ── How Works ─────────────────────────────────────── */}
        <section id="how-works" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            How the Avalanche Actually Works (Step-by-Step)
          </h2>

          <div className="space-y-4 mb-4">
            {[
              {
                n: '1',
                title: 'List all your debts by interest rate',
                body: 'Write down every debt — credit cards, personal loans, student loans, car loans, medical bills. Sort them from highest APR at the top to lowest APR at the bottom. Do not sort by balance. The rate is what matters.',
              },
              {
                n: '2',
                title: 'Set a total monthly debt budget',
                body: 'Add up all your minimum payments. Then figure out how much extra you can commit each month — even $100 extra makes a big difference. That extra amount is your attack budget.',
              },
              {
                n: '3',
                title: 'Pay all minimums, every month',
                body: 'Never miss a minimum. Missing a minimum triggers late fees, a penalty APR jump, and a 60-110 point credit score drop. Autopay the minimums on everything except your target debt.',
              },
              {
                n: '4',
                title: 'Throw 100% of the extra at the top debt',
                body: 'Every dollar of your attack budget goes to debt #1 (highest APR). Not spread across debts. Not 50/50. All of it, one debt at a time. This is the core discipline of the avalanche.',
              },
              {
                n: '5',
                title: 'When debt #1 hits zero, roll the whole payment',
                body: 'The minimum you were paying on debt #1 plus your extra attack budget now becomes your extra for debt #2. Your attack firepower grows every time a debt is eliminated — this is the avalanche effect.',
              },
              {
                n: '6',
                title: 'Repeat until all debts are gone',
                body: 'Keep rolling payments down the list. By the time you&rsquo;re attacking your lowest-rate debt, you&rsquo;re throwing the combined minimums of every previous debt plus your original attack budget at it. The last debt clears shockingly fast.',
              },
            ].map((item) => (
              <div key={item.n} className="flex gap-4 p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <div className="shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-sm font-bold flex items-center justify-center">
                  {item.n}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{item.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Example ───────────────────────────────────────── */}
        <section id="example" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Real Example: Avalanche on $22,000 Across 3 Debts
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Let&rsquo;s walk through a realistic scenario. Three debts, $400/month in extra payment capacity:
          </p>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-4">
            <div className="space-y-3">
              {[
                { name: 'Credit Card (target first)', balance: '$6,000', rate: '24.99%', min: '$150/mo' },
                { name: 'Personal Loan (target second)', balance: '$8,000', rate: '12%', min: '$200/mo' },
                { name: 'Car Loan (target last)', balance: '$8,000', rate: '5.5%', min: '$180/mo' },
              ].map(d => (
                <div key={d.name} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-800 dark:text-slate-200">{d.name}</span>
                  <div className="flex gap-4 text-slate-500 tabular-nums text-xs sm:text-sm">
                    <span>{d.balance}</span>
                    <span>{d.rate}</span>
                    <span>{d.min}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">Total minimums: $530/mo. Extra attack budget: $400/mo. Total debt payment: $930/mo.</p>
          </div>

          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
            Month 1-13: Attack the credit card
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Credit card payment: $150 min + $400 extra = <strong>$550/month on the credit card</strong>. Personal loan gets $200 minimum. Car loan gets $180 minimum. Credit card clears in month 13 with about $700 in interest paid.
          </p>

          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
            Month 14-27: Roll to personal loan
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Credit card is gone, so the $550 you were paying now rolls into the personal loan. Personal loan attack payment: $200 original min + $550 rolled = <strong>$750/month on the personal loan</strong>. Car loan still gets $180 minimum. Personal loan clears around month 27.
          </p>

          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
            Month 28-35: Car loan finish line
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Personal loan gone. Full firepower now on the car loan: $180 original + $750 rolled = <strong>$930/month on the car loan</strong>. Clears in about 8 months. <strong>Debt-free by month 35.</strong>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
              <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase mb-2">
                Minimum Payments Only
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Payoff time: <strong>12+ years</strong>. Total interest: <strong>$11,400+</strong>.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
              <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase mb-2">
                Avalanche + $400 Extra
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Payoff time: <strong>35 months</strong>. Total interest: <strong>$4,100</strong>.
              </p>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Avalanche saves this person <strong>$7,300 in interest</strong> and <strong>9+ years</strong> of payments — just by prioritizing correctly.
          </p>
        </section>

        {/* ── Calculator CTA ─────────────────────────────────── */}
        <section id="calculator" className="mb-10">
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Mountain className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h2 className="font-display text-xl font-bold text-green-900 dark:text-green-100">
                Use the Free Debt Avalanche Calculator
              </h2>
            </div>
            <p className="text-sm text-green-800 dark:text-green-300 mb-4">
              Enter your real debts and see the exact avalanche payoff schedule — no spreadsheet needed. Our calculator also runs snowball and hybrid methods simultaneously so you can compare all three.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/tools/debt-payoff"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Open Debt Avalanche Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tools/credit-card-payoff"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 text-green-700 dark:text-green-400 text-sm font-semibold rounded-lg border border-green-300 dark:border-green-700 transition-colors hover:bg-green-50 dark:hover:bg-slate-700"
              >
                Credit Card Calculator
              </Link>
            </div>
          </div>
        </section>

        <AdSlotInArticle />

        {/* ── vs Snowball ───────────────────────────────────── */}
        <section id="vs-snowball" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Avalanche vs Snowball: Side-by-Side Comparison
          </h2>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/80">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Factor</th>
                    <th className="text-left py-3 px-4 font-semibold text-green-700 dark:text-green-400">🏔️ Avalanche</th>
                    <th className="text-left py-3 px-4 font-semibold text-blue-700 dark:text-blue-400">❄️ Snowball</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-400 divide-y divide-slate-100 dark:divide-slate-700">
                  {[
                    ['Targets first', 'Highest interest rate', 'Smallest balance'],
                    ['Total interest paid', 'Least possible', 'More than avalanche'],
                    ['Debt-free timeline', 'Fastest', 'Slightly slower'],
                    ['First debt cleared', 'Depends on balances', 'Fastest'],
                    ['Motivation level', 'Lower (slower visible wins)', 'Higher (quick wins)'],
                    ['Best for', 'Disciplined, numbers-driven', 'Motivation-seekers'],
                    ['Completion rate (research)', 'Lower', 'Higher'],
                  ].map(([factor, avalanche, snowball]) => (
                    <tr key={factor}>
                      <td className="py-2.5 px-4 font-medium text-slate-700 dark:text-slate-300">{factor}</td>
                      <td className="py-2.5 px-4">{avalanche}</td>
                      <td className="py-2.5 px-4">{snowball}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            For the full breakdown with real examples in both $ and ₹, read our{' '}
            <Link href="/blog/snowball-vs-avalanche-debt-payoff" className="text-green-600 dark:text-green-400 underline hover:no-underline">
              snowball vs avalanche comparison guide
            </Link>
            .
          </p>
        </section>

        {/* ── When Works ────────────────────────────────────── */}
        <section id="when-works" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            When the Debt Avalanche Works Best
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Avalanche is most valuable when these conditions apply:
          </p>

          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-5 mb-4">
            <li><strong>Wide APR spread.</strong> If your highest-rate debt is 24% and your lowest is 5%, every dollar you direct to the 24% debt saves almost 5× more in interest than the same dollar on the 5% debt. Big spreads = big avalanche wins.</li>
            <li><strong>You&rsquo;re spreadsheet-motivated.</strong> If seeing &ldquo;interest saved&rdquo; numbers motivates you more than seeing debts cross off the list, avalanche will feel rewarding even in slow months.</li>
            <li><strong>Your highest-rate debt has a moderate balance.</strong> If the first target will clear in 6-12 months, you get the psychological benefit of snowball plus the mathematical benefit of avalanche. This is the optimal zone.</li>
            <li><strong>You&rsquo;ve paid off debt before successfully.</strong> Track record matters. If you&rsquo;ve shown yourself you can finish hard financial projects, avalanche rewards that discipline.</li>
          </ul>
        </section>

        <AdSlotInContent />

        {/* ── When Fails ────────────────────────────────────── */}
        <section id="when-fails" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            When Avalanche Fails (And What to Do Instead)
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Avalanche is mathematically optimal but psychologically harder. It fails for people who need visible progress to stay motivated. Signs avalanche might not work for you:
          </p>

          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-5 mb-4">
            <li>You&rsquo;ve tried debt payoff before and lost motivation within 3-6 months</li>
            <li>Your highest-rate debt is also your biggest — meaning no win for 12+ months</li>
            <li>You have 5+ small debts and seeing any of them hit zero would feel huge</li>
            <li>Your interest rates are all similar (within 3-4% of each other) — avalanche math barely wins anyway</li>
          </ul>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            For any of these cases, switch to the <strong>hybrid method</strong>: start with snowball for 2-3 months to knock out the smallest debts and build momentum, then switch to avalanche for the remaining high-rate debts. You capture most of the interest savings while getting the motivational wins early. Our debt payoff calculator runs this hybrid scenario automatically alongside pure avalanche and pure snowball so you can pick based on what you see.
          </p>
        </section>

        {/* ── FAQ Section ────────────────────────────────────── */}
        <section id="faq" className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <details key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group">
                <summary className="p-5 cursor-pointer font-medium text-slate-800 dark:text-slate-200 text-sm flex justify-between items-center gap-3 list-none hover:text-green-600 transition-colors">
                  {q}
                  <span className="text-slate-400 group-open:rotate-45 transition-transform shrink-0 text-lg leading-none">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Related Resources ──────────────────────────────── */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Keep Going
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Compare avalanche vs snowball with real examples in our{' '}
            <Link href="/blog/snowball-vs-avalanche-debt-payoff" className="text-green-600 dark:text-green-400 underline hover:no-underline">
              side-by-side debt payoff comparison
            </Link>
            . If credit cards are your main problem, read{' '}
            <Link href="/blog/credit-card-payoff-calculator-guide" className="text-green-600 dark:text-green-400 underline hover:no-underline">
              our complete credit card payoff calculator guide
            </Link>
            . Understand why minimums keep you in debt forever in{' '}
            <Link href="/blog/minimum-payment-trap-credit-cards" className="text-green-600 dark:text-green-400 underline hover:no-underline">
              the minimum payment trap article
            </Link>
            . And run your numbers through the{' '}
            <Link href="/tools/debt-payoff" className="text-green-600 dark:text-green-400 underline hover:no-underline">
              free debt avalanche calculator
            </Link>
            .
          </p>
        </section>

        {/* ── Disclaimer ─────────────────────────────────────── */}
        <p className="mt-8 text-xs text-slate-400 leading-relaxed">
          <strong>Disclaimer:</strong> This article is for educational purposes only. Avalanche calculations assume fixed interest rates and no new charges during the payoff period. Your actual results depend on consistent payments and disciplined spending. Consult a licensed financial advisor before making major debt management decisions.
        </p>
      </article>

      {/* ── Related Tools CTA ────────────────────────────────── */}
      <RelatedTools currentSlug="debt-payoff" heading="Free Tools to Apply the Avalanche" />
    </>
  );
}
