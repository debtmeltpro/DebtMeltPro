// src/app/blog/multiple-credit-card-payoff-calculator/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import { generateFaqSchema, SITE_URL } from '@/lib/seo';
import { AdSlotLeaderboard, AdSlotInContent, AdSlotInArticle } from '@/components/molecules/AdSlot';
import { Calendar, Clock, ArrowRight, CreditCard, TrendingDown } from 'lucide-react';

const SLUG = 'multiple-credit-card-payoff-calculator';

/* ── SEO Metadata ─────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Multiple Credit Card Payoff Calculator — Free Tool + Strategy (2026)',
  description:
    'Free calculator for paying off multiple credit cards. Compare avalanche vs snowball methods, see your debt-free date, and save thousands in interest. No signup.',
  keywords: [
    'multiple credit card payoff calculator',
    'multi credit card payoff calculator',
    'pay off multiple credit cards',
    'best way to pay off multiple credit cards',
    'multiple credit card debt calculator',
    'pay off multiple credit card debt calculator',
    'credit card payoff strategy multiple cards',
    'how to pay off 3 credit cards',
  ],
  alternates: { canonical: `${SITE_URL}/blog/${SLUG}` },
  openGraph: {
    title: 'Multiple Credit Card Payoff Calculator + Strategy Guide',
    description:
      'Free calculator for multi-card payoff. Compare avalanche vs snowball and find the fastest path to debt-free.',
    url: `${SITE_URL}/blog/${SLUG}`,
    type: 'article',
    publishedTime: '2026-04-24T00:00:00Z',
    modifiedTime: '2026-04-24T00:00:00Z',
  },
};

/* ── FAQ Data ─────────────────────────────────────────────────── */

const FAQS = [
  {
    q: 'What is the best way to pay off multiple credit cards?',
    a: 'The best mathematical strategy is the avalanche method: pay minimums on all cards, then throw every extra dollar at the card with the highest APR. When that card hits zero, roll its entire payment into the next-highest-APR card. This saves the most money. The best psychological strategy is the snowball method (smallest balance first). If you\'ve struggled to finish debt payoff before, snowball\'s quick wins may matter more than saving a few hundred dollars. Our calculator runs both so you can compare.',
  },
  {
    q: 'How does a multiple credit card payoff calculator work?',
    a: 'You enter each card\'s balance, APR, and minimum payment, then add any extra amount you can pay monthly. The calculator simulates each month: it applies interest, deducts payments, moves the extra to your target card, and rolls payments when a card is cleared. The output is a complete month-by-month schedule showing which card to pay each month, when each card hits zero, total interest paid, and your exact debt-free date — all calculated in your browser instantly.',
  },
  {
    q: 'Should I consolidate multiple credit cards or pay them off separately?',
    a: 'It depends on your credit score and discipline. Consolidation via a personal loan (7-14% APR) or 0% balance transfer card cuts interest dramatically but only works if: (1) you qualify for a good rate, and (2) you stop using the original cards after. About 50% of people who consolidate end up with more debt within 2 years because they run the cards back up. If your credit is 680+ and you can commit to cutting the cards, consolidate. Otherwise, run avalanche on the cards as-is — it\'s safer.',
  },
  {
    q: 'How do I pay off 3 credit cards with different balances and rates?',
    a: 'Four steps. (1) List all three by APR, highest first. (2) Calculate your total minimum payments across all three. (3) Add however much extra you can commit monthly ($100-500 for most people). (4) Pay the minimum on cards 2 and 3. Pay the minimum + all your extra on card 1. When card 1 hits zero, roll its whole payment onto card 2. When card 2 hits zero, roll both previous payments onto card 3. The calculator shows this schedule automatically.',
  },
  {
    q: 'What extra payment should I target to pay off multiple credit cards fast?',
    a: 'For typical multi-card debt of $10,000-$20,000: $300/month extra → 3-4 year payoff. $500/month extra → 2-3 year payoff. $800/month extra → 18-24 month payoff. Even $100/month extra vs minimums cuts 8-15 years off the timeline and saves $5,000+ in interest. The exact number depends on your balances and rates — the calculator shows the impact of each extra-payment level so you can pick the one that fits your budget.',
  },
  {
    q: 'Should I close credit cards after I pay them off?',
    a: 'No — keep them open. Closing cards reduces your total available credit (which hurts your utilization ratio) and shortens your average account age (which hurts your credit score). Both factors typically drop your score 20-60 points per closed card. Instead: keep each paid-off card open, lock them in a drawer or use a spending freeze feature in your bank app, and put one small recurring charge (like a $10/month subscription) with autopay-in-full on each to keep it active.',
  },
  {
    q: 'Can a credit card payoff calculator account for new purchases I might make?',
    a: 'Most don\'t — and that\'s intentional. The whole point of a payoff plan is to stop adding new debt. If you want to model a realistic "still using the card a little" scenario, you can either add the expected monthly new charges to your current balance upfront, or set your minimum payment to include expected new charges. But the better advice: switch to debit or cash for day-to-day spending during payoff. Any new card charges during payoff extend your timeline by 2-5× what the charge amount suggests, because of compounding interest.',
  },
  {
    q: 'Is the avalanche or snowball better for multiple credit cards specifically?',
    a: 'For credit cards specifically, avalanche usually wins by a larger margin than with mixed-debt scenarios. That\'s because credit card APRs vary widely (one card might be 16%, another 28%) — so sorting by rate makes a bigger difference than sorting by balance. On multi-card debt, avalanche typically saves $800-$2,500 more than snowball depending on total balance and rate spread. If all your cards have similar APRs (within 3-4 points), the gap narrows and snowball\'s motivation benefit may win.',
  },
];

/* ── Structured Data ──────────────────────────────────────────── */

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Multiple Credit Card Payoff Calculator — Free Tool + Strategy (2026)',
  description:
    'Complete guide and free calculator for paying off multiple credit cards. Compare avalanche vs snowball, see your debt-free date.',
  datePublished: '2026-04-24T00:00:00Z',
  dateModified: '2026-04-24T00:00:00Z',
  author: { '@type': 'Organization', name: 'DebtMeltPro', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'DebtMeltPro', url: SITE_URL },
  mainEntityOfPage: `${SITE_URL}/blog/${SLUG}`,
};

/* ── Page Component ───────────────────────────────────────────── */

export default function MultipleCreditCardPayoffPage() {
  const faqSchema = generateFaqSchema(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb items={[
        { label: 'Blog', href: '/blog' },
        { label: 'Multiple Credit Card Payoff Calculator', href: `/blog/${SLUG}` },
      ]} />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Header ────────────────────────────────────────── */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/category/debt-management" className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 hover:bg-orange-200 transition-colors">
              Debt Management
            </Link>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Calendar className="w-3 h-3" /> Apr 24, 2026
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3 h-3" /> 10 min read
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
            Multiple Credit Card Payoff Calculator — Free Tool + Strategy Guide
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Juggling multiple credit cards is where debt strategies usually break down. Which one do you pay first? What&rsquo;s the right extra amount? How long until you&rsquo;re actually free? This guide walks through the exact process for paying off 2, 3, 4, or more credit cards — with a free calculator that runs the math on your actual numbers and compares avalanche vs snowball side-by-side.
          </p>
        </header>

        {/* ── Table of Contents ─────────────────────────────── */}
        <nav className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-8">
          <p className="font-semibold text-slate-900 dark:text-white text-sm mb-3">In This Guide</p>
          <ol className="space-y-1.5 text-sm text-orange-700 dark:text-orange-400">
            {[
              { href: '#why-multiple-hard', label: 'Why Multiple Cards Are Harder to Pay Off' },
              { href: '#calculator', label: 'Use the Free Multi-Card Calculator' },
              { href: '#step-by-step', label: 'Step-by-Step Multi-Card Payoff Process' },
              { href: '#example-3-cards', label: 'Real Example: Paying Off 3 Cards ($15k Total)' },
              { href: '#example-5-cards', label: 'Advanced: Paying Off 5 Cards ($30k Total)' },
              { href: '#avalanche-vs-snowball', label: 'Avalanche vs Snowball for Multiple Cards' },
              { href: '#balance-transfer', label: 'When Balance Transfer Beats Both' },
              { href: '#mistakes', label: 'Common Mistakes With Multi-Card Payoff' },
              { href: '#faq', label: 'Frequently Asked Questions' },
            ].map((item, i) => (
              <li key={item.href}>
                <a href={item.href} className="hover:underline">{i + 1}. {item.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <AdSlotLeaderboard />

        {/* ── Why Multiple Hard ─────────────────────────────── */}
        <section id="why-multiple-hard" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-4 mb-4">
            Why Multiple Credit Cards Are Harder to Pay Off
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            One credit card is a straightforward math problem: pick a monthly payment, run the schedule, you&rsquo;re done. Multiple cards introduce three complications that trip people up:
          </p>

          <div className="space-y-3 mb-4">
            <div className="flex gap-3 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
              <div className="shrink-0 w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 text-sm font-bold flex items-center justify-center">1</div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Priority paralysis</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">With one card you just pay it. With four cards, every extra dollar forces a decision — and most people default to spreading payments evenly, which is the worst possible strategy.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
              <div className="shrink-0 w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 text-sm font-bold flex items-center justify-center">2</div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Missed minimums</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Four cards mean four due dates, four minimums, four late-fee risks. A single missed minimum triggers a penalty APR jump (often 29.99%) plus a 60-110 point credit score drop.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
              <div className="shrink-0 w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 text-sm font-bold flex items-center justify-center">3</div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Demotivation fatigue</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">When you finally eliminate card #1, you still have 2-3 cards to go. The finish line feels far away. This is where most multi-card payoff plans quietly die — around month 6-9.</p>
              </div>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The fix for all three: a calculator that shows the complete roadmap upfront. Once you see the exact month each card dies and the exact debt-free date, the journey becomes a plan instead of a slog.
          </p>
        </section>

        {/* ── Calculator CTA ─────────────────────────────────── */}
        <section id="calculator" className="mb-10">
          <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <h2 className="font-display text-xl font-bold text-orange-900 dark:text-orange-100">
                Use the Free Multi-Card Payoff Calculator
              </h2>
            </div>
            <p className="text-sm text-orange-800 dark:text-orange-300 mb-4">
              Enter up to 10 credit cards with balances, APRs, and minimums. The calculator runs avalanche, snowball, and hybrid simultaneously — pick the schedule that fits your style.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/tools/debt-payoff"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Open Multi-Card Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tools/credit-card-payoff"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 text-orange-700 dark:text-orange-400 text-sm font-semibold rounded-lg border border-orange-300 dark:border-orange-700 transition-colors hover:bg-orange-50 dark:hover:bg-slate-700"
              >
                Single Card Calculator
              </Link>
            </div>
          </div>
        </section>

        {/* ── Step-by-Step ──────────────────────────────────── */}
        <section id="step-by-step" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Step-by-Step Multi-Card Payoff Process
          </h2>

          <div className="space-y-4 mb-4">
            {[
              {
                n: '1',
                title: 'Inventory every card (10 minutes)',
                body: 'Pull up each card account online. Write down: current balance, APR (the actual rate, not the intro rate), and minimum payment. Include store cards and any co-signed cards. Don&rsquo;t skip the ones you don&rsquo;t want to think about — those are usually the worst.',
              },
              {
                n: '2',
                title: 'Set up autopay for every minimum',
                body: 'Before anything else, log into each card and turn on autopay for the minimum payment, pulling from your checking account 3-5 days before the due date. This single step prevents 90% of multi-card disasters: late fees, penalty APRs, credit score drops.',
              },
              {
                n: '3',
                title: 'Calculate your total extra payment budget',
                body: 'Sum all minimums. Look at your post-minimums take-home — how much can you commit above that? Be realistic. $50-200/month extra is typical for tight budgets. $300-600 for moderate. $700+ if you&rsquo;re going aggressive. This "extra" is your only decision variable.',
              },
              {
                n: '4',
                title: 'Pick your target card (usually highest APR)',
                body: 'Sort cards by APR. Your target is the top one — that\'s avalanche. Alternative: sort by balance and pick the smallest for snowball motivation. The calculator runs both so you can see the math difference before committing.',
              },
              {
                n: '5',
                title: 'Pay target = minimum + 100% of your extra',
                body: 'Every other card gets only its minimum. Your target card gets its minimum plus every single dollar of your extra budget. Not split. Not hedged. All of it, one card at a time. This is the single most important discipline of multi-card payoff.',
              },
              {
                n: '6',
                title: 'When a card hits zero, roll the whole payment',
                body: 'The minimum you were paying on card #1 plus your extra now becomes extra for card #2. Your firepower grows every time a card is eliminated. This is where multi-card payoff actually accelerates — the final card always clears much faster than you\'d expect.',
              },
            ].map((item) => (
              <div key={item.n} className="flex gap-4 p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <div className="shrink-0 w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 text-sm font-bold flex items-center justify-center">
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

        <AdSlotInArticle />

        {/* ── Example 3 Cards ───────────────────────────────── */}
        <section id="example-3-cards" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Real Example: Paying Off 3 Credit Cards ($15,000 Total)
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Three typical credit cards, $300/month in extra payment capacity, running avalanche:
          </p>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-4">
            <div className="space-y-3">
              {[
                { name: 'Store card (target first)', balance: '$3,000', rate: '27.99%', min: '$75/mo' },
                { name: 'Visa (target second)', balance: '$5,000', rate: '22.49%', min: '$125/mo' },
                { name: 'Mastercard (target last)', balance: '$7,000', rate: '18.99%', min: '$175/mo' },
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
            <p className="text-xs text-slate-400 mt-3">Total minimums: $375/mo. Extra: $300/mo. Total payment: $675/mo.</p>
          </div>

          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
            The avalanche schedule
          </h3>

          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-5 mb-4">
            <li><strong>Months 1-9:</strong> Store card gets $75 min + $300 extra = $375/mo. Clears in month 9.</li>
            <li><strong>Months 10-22:</strong> Store card&rsquo;s $375 rolls into Visa. Visa gets $125 min + $375 rolled = $500/mo. Clears in month 22.</li>
            <li><strong>Months 23-34:</strong> All $500 plus Visa&rsquo;s $125 rolls into Mastercard. Mastercard gets $175 min + $500 rolled = $675/mo. Clears in month 34.</li>
          </ul>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
              <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase mb-2">
                Minimum Payments Only
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Payoff: <strong>22+ years</strong>. Interest: <strong>$18,500+</strong>.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
              <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase mb-2">
                Avalanche + $300 Extra
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Payoff: <strong>34 months</strong>. Interest: <strong>$4,100</strong>.
              </p>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Avalanche on 3 cards with just $300/month extra: <strong>$14,400 in interest saved</strong>, <strong>19 years faster</strong>. And the first win happens in month 9 — not too far away to stay motivated.
          </p>
        </section>

        {/* ── Example 5 Cards ───────────────────────────────── */}
        <section id="example-5-cards" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Advanced: Paying Off 5 Credit Cards ($30,000 Total)
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Five cards is where hybrid strategy often wins. Here&rsquo;s a realistic setup:
          </p>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-4">
            <div className="space-y-3">
              {[
                { name: 'Card A (small, mid rate)', balance: '$1,200', rate: '21%', min: '$30/mo' },
                { name: 'Card B (small, high rate)', balance: '$2,800', rate: '28%', min: '$70/mo' },
                { name: 'Card C (mid, high rate)', balance: '$6,000', rate: '26%', min: '$150/mo' },
                { name: 'Card D (large, low rate)', balance: '$8,000', rate: '17%', min: '$200/mo' },
                { name: 'Card E (largest, mid rate)', balance: '$12,000', rate: '23%', min: '$300/mo' },
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
            <p className="text-xs text-slate-400 mt-3">Total minimums: $750/mo. Extra: $500/mo. Total payment: $1,250/mo.</p>
          </div>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            <strong>Pure avalanche order:</strong> B (28%) → C (26%) → E (23%) → A (21%) → D (17%). Cheapest in interest, but Card A doesn&rsquo;t clear until month 30+ despite only being $1,200.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            <strong>Hybrid order (recommended):</strong> A (smallest, 3 months) → B (28%, 6 months) → C (26%, 10 months) → E (23%, 14 months) → D (17%, 12 months). First win in 3 months instead of 8. Total interest only $300 higher than pure avalanche.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            For 4+ cards, hybrid usually wins because the motivation benefit of killing a small card early is worth the tiny extra interest cost. The calculator shows all three schedules side-by-side — avalanche, snowball, hybrid — so you can pick what fits.
          </p>
        </section>

        {/* ── Avalanche vs Snowball ─────────────────────────── */}
        <section id="avalanche-vs-snowball" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Avalanche vs Snowball for Multiple Cards
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Credit card APRs vary widely (often 16-29%), which makes avalanche&rsquo;s math advantage bigger than it is with mixed debt types. Typical savings comparisons on multi-card debt:
          </p>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/80">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Scenario</th>
                    <th className="text-left py-3 px-4 font-semibold text-green-700 dark:text-green-400">Avalanche</th>
                    <th className="text-left py-3 px-4 font-semibold text-blue-700 dark:text-blue-400">Snowball</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Difference</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-400 divide-y divide-slate-100 dark:divide-slate-700">
                  {[
                    ['$10k / 3 cards / $300 extra', '29 mo / $2.8k int', '31 mo / $3.6k int', 'Avalanche saves $800'],
                    ['$20k / 4 cards / $400 extra', '38 mo / $5.2k int', '40 mo / $6.8k int', 'Avalanche saves $1,600'],
                    ['$30k / 5 cards / $500 extra', '48 mo / $8.4k int', '50 mo / $10.9k int', 'Avalanche saves $2,500'],
                  ].map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} className="py-2.5 px-4 tabular-nums">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Avalanche wins every time on pure math. But snowball completion rates are higher — research shows people who use snowball are more likely to finish. If you&rsquo;ve started and stopped a debt plan before, the $1,500 you &ldquo;lose&rdquo; with snowball is a tax on actually finishing. Read the full comparison in our{' '}
            <Link href="/blog/snowball-vs-avalanche-debt-payoff" className="text-orange-600 dark:text-orange-400 underline hover:no-underline">
              snowball vs avalanche guide
            </Link>
            .
          </p>
        </section>

        <AdSlotInContent />

        {/* ── Balance Transfer ──────────────────────────────── */}
        <section id="balance-transfer" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            When Balance Transfer Beats Both Methods
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            If you have 680+ credit and $10,000-$20,000 across cards, a 0% balance transfer card can beat either strategy. Moving everything to a single 0% APR card for 15-21 months means <strong>every dollar of every payment goes to principal</strong>. On $15k of multi-card debt, this saves $2,000-$3,500 versus avalanche.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
              <p className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase mb-2">✅ Do a Transfer If</p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-5">
                <li>Credit score 680+</li>
                <li>Can pay 70%+ of total during intro period</li>
                <li>Discipline to stop using original cards</li>
                <li>No mortgage application in next 6 months</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
              <p className="text-xs font-semibold text-red-700 dark:text-red-400 uppercase mb-2">❌ Skip the Transfer If</p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-5">
                <li>Credit under 650 (won&rsquo;t get good offers)</li>
                <li>Still actively using the cards</li>
                <li>Total debt far exceeds transfer limit</li>
                <li>Transfer fees eat most of the savings</li>
              </ul>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Typical transfer fee: 3-5% ($450-750 on $15k). If you can pay the balance down during 0% period, it&rsquo;s almost always worth it — you come out $1,500-$3,000 ahead after fees.
          </p>
        </section>

        {/* ── Mistakes ──────────────────────────────────────── */}
        <section id="mistakes" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Common Mistakes With Multi-Card Payoff
          </h2>

          <div className="space-y-3">
            {[
              {
                title: 'Spreading extra payments evenly across cards',
                body: 'If you have $300/month extra and 3 cards, putting $100 on each is the worst approach. You extend every single payoff. Always 100% to one target.',
              },
              {
                title: 'Continuing to use the cards during payoff',
                body: 'A $100 monthly dinner charge on a 24% APR card during payoff extends your timeline by 2-3 months and adds $300-500 in interest. Switch to debit or cash.',
              },
              {
                title: 'Closing cards immediately after payoff',
                body: 'Kills your credit score via utilization and account-age drops. Keep cards open with zero balance. Put one small autopaid charge on each to keep them active.',
              },
              {
                title: 'Ignoring intro-rate expirations',
                body: 'That 0% balance transfer jumps to 24% after 18 months. If you haven&rsquo;t paid it off, plan the post-intro payment before the rate changes, not after.',
              },
              {
                title: 'Not setting up autopay on minimums',
                body: 'With 3-5 cards, missing a single minimum costs $30-40 in fees plus a potential penalty APR of 29.99%. A 3-minute autopay setup per card prevents this forever.',
              },
              {
                title: 'Picking snowball when you&rsquo;ve never failed before',
                body: 'If you&rsquo;ve successfully paid off debt before, your discipline is proven. Pick avalanche for the extra $1,000-$2,500. Snowball is for people who need motivation to finish.',
              },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">
                  <TrendingDown className="inline w-4 h-4 text-red-500 mr-1.5 -mt-0.5" />
                  {item.title}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ Section ────────────────────────────────────── */}
        <section id="faq" className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <details key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group">
                <summary className="p-5 cursor-pointer font-medium text-slate-800 dark:text-slate-200 text-sm flex justify-between items-center gap-3 list-none hover:text-orange-600 transition-colors">
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
            For a deep dive on the avalanche method specifically, read{' '}
            <Link href="/blog/debt-avalanche-calculator-explained" className="text-orange-600 dark:text-orange-400 underline hover:no-underline">
              how the debt avalanche method actually works
            </Link>
            . If you&rsquo;re stuck on one specific card, see our{' '}
            <Link href="/blog/credit-card-payoff-calculator-guide" className="text-orange-600 dark:text-orange-400 underline hover:no-underline">
              single-card payoff calculator guide
            </Link>
            . For $10k-specific payoff plans, read{' '}
            <Link href="/blog/how-to-pay-off-10000-credit-card-debt" className="text-orange-600 dark:text-orange-400 underline hover:no-underline">
              how to pay off $10,000 in credit card debt fast
            </Link>
            . And when you&rsquo;re ready, run your cards through the{' '}
            <Link href="/tools/debt-payoff" className="text-orange-600 dark:text-orange-400 underline hover:no-underline">
              multi-debt calculator
            </Link>
            .
          </p>
        </section>

        {/* ── Disclaimer ─────────────────────────────────────── */}
        <p className="mt-8 text-xs text-slate-400 leading-relaxed">
          <strong>Disclaimer:</strong> This article is for educational purposes only. Payoff calculations assume fixed APRs with no new purchases during the payoff period. Your actual results depend on consistent payments and not running balances back up. Consult a licensed financial advisor before making major debt decisions.
        </p>
      </article>

      {/* ── Related Tools CTA ────────────────────────────────── */}
      <RelatedTools currentSlug="debt-payoff" heading="Free Tools for Multi-Card Payoff" />
    </>
  );
}
