// src/app/blog/debt-explained-india-guide/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import { generateFaqSchema, SITE_URL } from '@/lib/seo';
import { AdSlotLeaderboard, AdSlotInContent, AdSlotInArticle } from '@/components/molecules/AdSlot';
import { Calendar, Clock, ArrowRight, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';

const SLUG = 'debt-explained-india-guide';

/* ── SEO Metadata ─────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Debt Explained: CIBIL Myths, Debt Funds & India vs US Debt (2026 Guide)',
  description:
    'Debt explained in plain English for Indian borrowers — good debt vs bad debt, debt funds, debt vs equity, CIBIL score myths, and why Indian debt costs more than US debt in 2026.',
  keywords: [
    'debt explained',
    'what is debt',
    'debt fund',
    'debt vs equity',
    'debt mutual funds',
    'cibil score myths',
    'debt equity ratio',
    'does debt affect cibil score',
    'india vs us debt comparison',
    'is debt good or bad',
    'how long debt stays in credit report india',
    'good debt vs bad debt',
    'debt funds india 2026',
  ],
  alternates: { canonical: `${SITE_URL}/blog/${SLUG}` },
  openGraph: {
    title: 'Debt Explained — CIBIL Myths, Debt Funds & India vs US Debt',
    description:
      'A plain-English guide to debt in India: good vs bad debt, debt funds, CIBIL myths, and why Indian debt hits harder than US debt. Real ₹ examples, no jargon.',
    url: `${SITE_URL}/blog/${SLUG}`,
    type: 'article',
    publishedTime: '2026-04-20T00:00:00Z',
    modifiedTime: '2026-04-20T00:00:00Z',
  },
};

/* ── FAQ Data ─────────────────────────────────────────────────── */

const FAQS = [
  {
    q: 'Does debt affect CIBIL score?',
    a: 'Yes — but not in the way most people think. Having debt itself does not lower your score. In fact, zero credit history gives you no score at all (often shown as NH or NA). What actually hurts your CIBIL score: missed or late payments, high credit utilisation (above 30% of your limit), too many hard enquiries in a short window, and accounts marked as "Settled" instead of "Closed". Debt that you manage well — paying on time, keeping balances low — actually builds your score over time.',
  },
  {
    q: 'What is a debt fund in simple terms?',
    a: 'A debt fund is a mutual fund that invests your money in loans — specifically, loans given to the government and big companies (bonds, T-bills, commercial papers). Instead of you lending money to a bank as a fixed deposit, the fund lends money to many borrowers and shares the interest with you. Returns in India typically run 6–8% per year, more stable than equity but lower ceiling. Good for parking money for 1–3 years when you need safety over growth.',
  },
  {
    q: 'India vs US debt: which is worse for borrowers?',
    a: 'Indian borrowers carry less total debt on average but pay much higher interest on what they do carry. US credit cards typically charge 20–25% APR; Indian cards charge 36–48%. Home loans in the US are around 6–7%; in India, 8–9%. Personal loans in the US run 7–11%; in India, 11–18%. So while the average American household has more debt (about 75% of GDP vs India\'s ~40%), the same ₹1 lakh of credit card debt costs an Indian borrower nearly twice as much in interest per year. Indian debt compounds faster because the rates are built on a higher inflation benchmark.',
  },
  {
    q: 'Is all debt bad?',
    a: 'No, and anyone telling you otherwise is oversimplifying. A home loan at 8.5% that lets you stop paying rent and build equity is genuinely useful debt. An education loan that raises your earning capacity by ₹5 lakh a year is the best ROI most middle-class Indians will ever get. A small business loan that funds inventory and generates cash flow is a tool. The bad debts are the ones that finance consumption — credit card EMIs for a vacation, personal loans for weddings you cannot afford, BNPL on gadgets that depreciate 40% the day you buy them. The test: will this debt leave you richer or poorer in five years?',
  },
  {
    q: 'How long does debt stay on credit report India?',
    a: 'Negative entries on your CIBIL report — late payments, defaults, settlements, write-offs — stay for 7 years from the date of the event. Positive entries (closed accounts paid in full) generally stay much longer because they help your score through length of credit history. Accounts marked "Settled" (where you paid less than what you owed) are especially damaging — the "Settled" tag is visible for 7 years and makes future lenders very cautious, even after the period expires. Paying off a debt fully is always better than settling, even if settlement feels like the easier option.',
  },
  {
    q: 'Debt vs equity: which is safer?',
    a: 'For investors, debt is usually lower risk and lower reward; equity is higher risk and higher potential reward. A good debt fund might return 6–8% per year with minor fluctuations. A good equity fund might return 12–14% over a decade but could drop 30–40% in a bad year. For companies, debt-equity ratio tells you how leveraged they are — a ratio above 2 means they owe twice as much as their owners\' capital, which is risky. There\'s no one-size-fits-all answer. Young investors with 20+ year horizons usually benefit from more equity; someone retiring in 3 years should be debt-heavy for stability.',
  },
  {
    q: 'What is a healthy debt-to-equity ratio?',
    a: 'For companies, a debt-to-equity ratio below 1 is generally considered healthy — it means the business owes less than its shareholders have invested. Between 1 and 2 is still acceptable for stable industries. Above 2 signals risk. But context matters: banks and infrastructure companies naturally carry higher ratios because their business model depends on leverage. For individuals, a useful version is your personal debt-to-income ratio — keep total monthly EMIs below 40% of your take-home pay, and credit card utilisation below 30% of your total limit. Above these levels, lenders start flagging you as risky.',
  },
];

/* ── Structured Data ──────────────────────────────────────────── */

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Debt Explained: CIBIL Myths, Debt Funds & India vs US Debt (2026 Guide)',
  description:
    'A plain-English guide to debt for Indian borrowers — good debt vs bad debt, debt funds, debt vs equity, CIBIL score myths, and India vs US debt comparison.',
  datePublished: '2026-04-20T00:00:00Z',
  dateModified: '2026-04-20T00:00:00Z',
  author: { '@type': 'Organization', name: 'DebtMeltPro', url: SITE_URL },
  publisher: {
    '@type': 'Organization',
    name: 'DebtMeltPro',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/blog/${SLUG}`,
  },
  inLanguage: 'en-US',
};

/* ── Page Component ───────────────────────────────────────────── */

export default function DebtExplainedPage() {
  const faqSchema = generateFaqSchema(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb items={[
        { label: 'Blog', href: '/blog' },
        { label: 'Debt Explained', href: `/blog/${SLUG}` },
      ]} />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Header ────────────────────────────────────────── */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/category/debt-management" className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 hover:bg-red-200 transition-colors">
              Debt Management
            </Link>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Calendar className="w-3 h-3" /> Apr 20, 2026
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3 h-3" /> 13 min read
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
            Debt Explained: CIBIL Myths, Debt Funds &amp; India vs US Debt (2026 Guide)
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Debt is one of those words people throw around like everyone already knows what it means — but ask five friends what debt actually is and you&rsquo;ll get five different answers. One will say it&rsquo;s just borrowed money. Another will say it&rsquo;s the reason they can&rsquo;t sleep. A third will tell you it&rsquo;s how they bought their flat, paid for their MBA, or started their shop. All of them are right. None of them are complete. This guide unpacks what debt actually is in 2026 — the good kind, the bad kind, the debt funds your mutual fund agent keeps pushing, the CIBIL myths quietly costing Indians lakhs, and why Indian debt hits differently from American debt. Let&rsquo;s get into it.
          </p>
        </header>

        {/* ── Table of Contents ─────────────────────────────── */}
        <nav className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-8" aria-label="Table of contents">
          <p className="font-semibold text-slate-900 dark:text-white text-sm mb-3">In This Guide</p>
          <ol className="space-y-1.5 text-sm text-red-700 dark:text-red-400">
            {[
              { href: '#quick-answer', label: 'Quick Answer: Debt Explained in 5 Bullets' },
              { href: '#what-is-debt', label: 'What Is Debt (Beyond the Textbook Definition)' },
              { href: '#good-vs-bad-debt', label: 'Good Debt vs Bad Debt: The Line Most People Miss' },
              { href: '#debt-vs-equity', label: 'Debt vs Equity: Two Completely Different Animals' },
              { href: '#debt-funds', label: 'Debt Funds Explained (Without the Jargon)' },
              { href: '#india-vs-us-debt', label: 'India vs US Debt: Why the Math Is Totally Different' },
              { href: '#cibil-myths', label: 'CIBIL Score Myths That Are Costing You Lakhs' },
              { href: '#how-long-cibil', label: 'How Long Does Debt Stay on Your CIBIL Report?' },
              { href: '#is-debt-good-or-bad', label: 'Is Debt Good or Bad? The Honest Answer' },
              { href: '#faq', label: 'Frequently Asked Questions' },
            ].map((item, i) => (
              <li key={item.href}>
                <a href={item.href} className="hover:underline">{i + 1}. {item.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <AdSlotLeaderboard />

        {/* ── Quick Answer ───────────────────────────────────── */}
        <section id="quick-answer" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-4 mb-4">
            Quick Answer: Debt Explained in 5 Bullets
          </h2>

          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-5 mb-4">
            <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-2">
              <li><strong>Debt is a tool</strong> — borrowed money with a promise to pay back plus interest. Used well, it builds wealth. Used poorly, it eats you alive.</li>
              <li><strong>Good debt</strong> (home loan at 8%, education loan) creates future value. <strong>Bad debt</strong> (credit card revolve at 42%, BNPL on gadgets) pays for things that lose value.</li>
              <li><strong>Debt funds</strong> are mutual funds that lend your money to governments and companies. Stable 6–8% returns in India, lower risk than equity.</li>
              <li><strong>Indian debt costs more</strong> than US debt for the same borrower — credit card APRs of 36–48% vs 20–25% in America.</li>
              <li><strong>CIBIL isn&rsquo;t magic</strong> — it&rsquo;s a math formula. The biggest score killers are missed payments and high utilisation, not &ldquo;having debt.&rdquo;</li>
            </ul>
          </div>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The rest of this guide is the why, the how, and the mistakes most Indians make. If you read nothing else, bookmark the CIBIL myths section — it will save you real money the next time you apply for a home loan.
          </p>
        </section>

        {/* ── What Is Debt ───────────────────────────────────── */}
        <section id="what-is-debt" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            What Is Debt (Beyond the Textbook Definition)
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Technically, debt is any amount of money you&rsquo;ve borrowed and are obligated to repay — usually with interest. That&rsquo;s the textbook answer, and it&rsquo;s also the least useful answer. The more honest definition: debt is a trade. You&rsquo;re trading some of your future income for access to something today — a house, a degree, a medical emergency, a wedding, a holiday.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            In India 2026, debt shows up in dozens of forms most people never think of together. Home loans, auto loans, personal loans, education loans, gold loans, credit card outstandings, BNPL instalments, EMI conversions, overdraft facilities, and the ₹5,000 you borrowed from your cousin last Diwali. All of it is debt. All of it counts toward what lenders see when you apply for something new.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Here&rsquo;s the part that matters. Different debts carry wildly different costs. A home loan at 8.5% and a credit card balance at 42% are not remotely comparable — even though both show up as &ldquo;debt&rdquo; on your CIBIL report. One is a reasonable trade of future income for housing equity. The other is financial self-harm. The single most valuable thing you can do as a borrower is stop thinking of debt as one thing and start sorting it by cost.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The <a href="https://www.rbi.org.in/Scripts/FAQView.aspx?Id=36" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-400 underline hover:no-underline inline-flex items-center gap-0.5">Reserve Bank of India <ExternalLink className="w-3 h-3" /></a> tracks household debt as a percentage of GDP, and India&rsquo;s ratio has been climbing steadily — from around 35% in 2020 to well over 40% in 2024. That&rsquo;s not a crisis number yet, but it means more Indians than ever are now making debt decisions that will shape their financial lives for a decade or more.
          </p>
        </section>

        {/* ── Good Debt vs Bad Debt ──────────────────────────── */}
        <section id="good-vs-bad-debt" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Good Debt vs Bad Debt: The Line Most People Miss
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            The simplest test I know: after five years, will this debt have left you richer or poorer? That&rsquo;s the entire framework. Everything else — interest rates, EMI comfort, tax benefits — is secondary to that one question.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Good Debt */}
            <div className="bg-white dark:bg-slate-800 border border-green-200 dark:border-green-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" aria-hidden="true" />
                <h3 className="font-semibold text-green-700 dark:text-green-400 text-sm">Good Debt</h3>
              </div>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-5">
                <li><strong>Home loan</strong> — builds equity in a real asset, rate typically 8–9%</li>
                <li><strong>Education loan</strong> — raises earning capacity, usually the highest-ROI debt a middle-class Indian takes</li>
                <li><strong>Business loan</strong> — funds inventory or expansion that generates cash flow</li>
                <li><strong>Smart EMI at 0% interest</strong> (laptop for work, tools for your trade) with no hidden processing fees</li>
              </ul>
            </div>

            {/* Bad Debt */}
            <div className="bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
                <h3 className="font-semibold text-red-700 dark:text-red-400 text-sm">Bad Debt</h3>
              </div>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-5">
                <li><strong>Credit card revolving balance</strong> — 36–48% APR, fastest wealth destroyer in India</li>
                <li><strong>Personal loan for weddings/holidays</strong> — pays for a few days of photos and a lifetime of EMIs</li>
                <li><strong>BNPL on gadgets</strong> — the iPhone loses 40% of its value the day you buy it; the EMI doesn&rsquo;t</li>
                <li><strong>Top-up loans just because they&rsquo;re available</strong> — easy money becomes hard problems fast</li>
              </ul>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Notice what&rsquo;s not on either list — car loans. That&rsquo;s because they&rsquo;re genuinely in the middle. A car loan for a vehicle you need for work is functional debt. A car loan for the Fortuner you bought because your brother-in-law bought a Creta is status-signalling wrapped in an EMI. Same interest rate, same tenure, different lifetime cost. The debt isn&rsquo;t the issue. The decision driving the debt is.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            If you&rsquo;re currently carrying the bad kind, the fastest way out is a structured payoff plan — run your numbers through our <Link href="/tools/debt-payoff" className="text-red-600 dark:text-red-400 underline hover:no-underline">multi-debt payoff calculator</Link> or, if credit cards are the main culprit, the dedicated <Link href="/tools/credit-card-payoff" className="text-red-600 dark:text-red-400 underline hover:no-underline">credit card payoff calculator</Link>. Both are free, both work in ₹, and neither saves any data.
          </p>
        </section>

        <AdSlotInArticle />

        {/* ── Debt vs Equity ─────────────────────────────────── */}
        <section id="debt-vs-equity" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Debt vs Equity: Two Completely Different Animals
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            The terms &ldquo;debt&rdquo; and &ldquo;equity&rdquo; come up in two different contexts, and most people mix them up. Let&rsquo;s separate them cleanly.
          </p>

          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
            1. Debt vs Equity as an Investor
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            When you invest, you&rsquo;re choosing between being a lender or being an owner. Lend money to a company (buy its bonds, or invest in a debt fund) and you&rsquo;re a creditor — fixed returns, first in line if the company runs into trouble, lower upside. Buy the company&rsquo;s shares (equity) and you&rsquo;re an owner — variable returns, last in line in a bankruptcy, uncapped upside.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            In Indian mutual fund terms: a debt fund invests in bonds and similar instruments — stable, lower returns, lower risk. An equity fund invests in company shares — volatile, higher long-term returns, higher risk. Both have a place in a portfolio; the right mix depends on your timeline and your ability to sleep through a 30% market drop.
          </p>

          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
            2. Debt vs Equity as a Business Metric
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            When companies (or analysts) talk about debt-to-equity ratio, they mean how much of the business is funded by borrowing versus how much is funded by the owners&rsquo; money. A debt-equity ratio of 0.5 means every ₹1 of equity is matched by 50 paise of debt — conservative, safe, slow-growing. A ratio of 2 means ₹2 of debt per ₹1 of equity — leveraged, risky, but potentially higher-returning.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            This matters for two reasons. First, if you&rsquo;re investing in Indian stocks, you should check the debt-equity ratio before you buy — Nifty Auto companies average around 1.5, Nifty Bank averages over 10 (because banks are legally built on leverage), and Nifty IT averages well under 0.3. Context matters. Second, if you&rsquo;re running a business, your own debt-equity ratio affects how much banks will lend you and at what rate.
          </p>
        </section>

        {/* ── Debt Funds ────────────────────────────────────── */}
        <section id="debt-funds" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Debt Funds Explained (Without the Jargon)
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            A debt mutual fund is a pool of money that invests in loans — not loans to you, loans by you. The fund takes money from thousands of investors, bundles it, and lends it to borrowers who need it: the Government of India (through G-Secs), state governments, PSUs, and big private companies (through corporate bonds). The borrowers pay interest. The fund collects it. You get a share proportional to your investment.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Why use debt funds instead of a fixed deposit? Three reasons. First, returns are often slightly higher — typical debt fund yields in India run 6–8%, versus 6.5–7% for bank FDs. Second, liquidity is better — you can usually redeem in 1–2 working days, no premature withdrawal penalty. Third, tax treatment used to be favourable for holdings over three years, although the April 2023 amendment removed indexation benefits for most debt funds, making the tax advantage much smaller.
          </p>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/80">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Debt Fund Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Horizon</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Typical Return</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-400 divide-y divide-slate-100 dark:divide-slate-700">
                  {[
                    ['Liquid Fund', '1–90 days', '6–7%', 'Very low'],
                    ['Ultra Short Duration', '3–6 months', '6.5–7.5%', 'Low'],
                    ['Short Duration', '1–3 years', '7–8%', 'Low–moderate'],
                    ['Corporate Bond Fund', '2–5 years', '7–8.5%', 'Moderate'],
                    ['Gilt Fund', '5+ years', '6.5–8%', 'Interest-rate sensitive'],
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

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Debt funds are not risk-free — that&rsquo;s the myth every bank RM accidentally creates. Two real risks: interest-rate risk (when the <a href="https://www.rbi.org.in/home.aspx" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-400 underline hover:no-underline inline-flex items-center gap-0.5">RBI <ExternalLink className="w-3 h-3" /></a> hikes rates, existing bonds lose value, which pulls down your NAV temporarily) and credit risk (if a company the fund lent to defaults — this is what hit Franklin Templeton&rsquo;s debt schemes in 2020).
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Debt funds are regulated by <a href="https://www.sebi.gov.in/" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-400 underline hover:no-underline inline-flex items-center gap-0.5">SEBI <ExternalLink className="w-3 h-3" /></a>, which classifies them into 16 categories so you can compare apples to apples. Before you invest, check the scheme&rsquo;s average credit rating (stick to AAA or AA+ if you want safety), its portfolio concentration (no single issuer above 10% is a good rule), and its expense ratio (below 0.5% for direct plans is reasonable).
          </p>
        </section>

        {/* ── India vs US Debt ───────────────────────────────── */}
        <section id="india-vs-us-debt" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            India vs US Debt: Why the Math Is Totally Different
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            If you follow finance content from the US — podcasts, YouTube, personal finance Twitter — you&rsquo;ve probably heard advice like &ldquo;carry a small credit card balance to build credit&rdquo; or &ldquo;the 4% safe withdrawal rule&rdquo; or &ldquo;mortgage debt is basically free money.&rdquo; None of that applies cleanly to India. The numbers underneath are completely different.
          </p>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/80">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Debt Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">India (2026)</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">US (2026)</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Gap</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-400 divide-y divide-slate-100 dark:divide-slate-700">
                  {[
                    ['Credit card APR', '36–48%', '20–25%', '~1.8× higher'],
                    ['Home loan rate', '8.5–9.5%', '6.5–7.5%', '~2 pp higher'],
                    ['Personal loan', '11–18%', '7–11%', '~1.7× higher'],
                    ['Auto loan', '9–12%', '6.5–9%', '~1.4× higher'],
                    ['Household debt / GDP', '~40%', '~75%', 'Lower total, higher cost'],
                  ].map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} className={`py-2.5 px-4 ${j > 0 ? 'tabular-nums' : ''}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            The simple version: Americans carry more debt but pay less for it. Indians carry less debt but pay much more. On the same ₹1,00,000 credit card balance, an Indian borrower loses roughly ₹42,000 in annual interest; an American loses around ₹22,000. The same debt. The same balance. Wildly different outcomes.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Why? A few structural reasons. India&rsquo;s inflation benchmark has historically been higher (RBI targets 4%, US Fed targets 2%), and all lending rates are built on top of that. Indian banks also price in higher default risk because the legal recovery process is slower and harder. And the Indian consumer credit market is younger — fewer decades of payment-history data for banks to underwrite against. The <a href="https://www.imf.org/en/Countries/IND" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-400 underline hover:no-underline inline-flex items-center gap-0.5">IMF country data for India <ExternalLink className="w-3 h-3" /></a> and the <a href="https://data.worldbank.org/indicator/FR.INR.LEND?locations=IN-US" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-400 underline hover:no-underline inline-flex items-center gap-0.5">World Bank lending rate series <ExternalLink className="w-3 h-3" /></a> both show this gap persisting over decades.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            What this means practically: every piece of American debt-advice you consume online needs to be re-checked against Indian numbers before you apply it. &ldquo;Just pay the minimum&rdquo; at 22% APR in the US is a bad idea. The same advice at 42% APR in India is genuinely ruinous. For a full India-specific breakdown, see our deep dive on <Link href="/blog/credit-card-debt-india" className="text-red-600 dark:text-red-400 underline hover:no-underline">credit card debt in India</Link> and the <Link href="/blog/minimum-payment-trap-credit-cards" className="text-red-600 dark:text-red-400 underline hover:no-underline">credit card minimum payment trap</Link>.
          </p>
        </section>

        <AdSlotInContent />

        {/* ── CIBIL Myths ────────────────────────────────────── */}
        <section id="cibil-myths" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            CIBIL Score Myths That Are Costing You Lakhs
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            More money is lost to CIBIL misinformation in India than to any other single financial myth. These are the seven I hear most often — all wrong, and most of them expensive.
          </p>

          <div className="space-y-4">
            {[
              {
                myth: 'Myth 1: Checking my own CIBIL score lowers it.',
                truth: 'False. When you check your own score through CIBIL, Paisabazaar, or your bank&rsquo;s app, it&rsquo;s a soft enquiry — invisible to scoring algorithms. What does lower your score is a hard enquiry, which happens when a bank or NBFC checks your score because you applied for credit. Check your own score as often as you like; apply for credit sparingly.',
              },
              {
                myth: 'Myth 2: Closing old credit cards improves my score.',
                truth: 'Usually the opposite. CIBIL rewards long credit history. Your oldest card establishes your average account age, and closing it shortens that average — hurting your score. It also reduces your total available credit, which pushes your utilisation ratio higher. Keep old cards open (even if unused) and put one small recurring charge on them that you auto-pay in full.',
              },
              {
                myth: 'Myth 3: Having no debt gives me a perfect CIBIL score.',
                truth: 'No. If you&rsquo;ve never taken a loan or held a credit card, CIBIL has nothing to score. Your report will usually show &ldquo;NH&rdquo; (no history) or &ldquo;NA&rdquo; (not applicable), and lenders will often reject you as a blank slate. A modest credit history — one card used sensibly — is almost always better than none at all.',
              },
              {
                myth: 'Myth 4: Paying late by just a few days doesn&rsquo;t matter.',
                truth: 'Partly true, partly dangerous. Banks typically report to CIBIL only when a payment is 30+ days overdue. So a 3–5 day delay hits you with a late fee but not a CIBIL mark. Cross 30 days, though, and you can lose 60–110 score points almost overnight. That penalty takes months to recover from. Set up autopay.',
              },
              {
                myth: 'Myth 5: One missed payment ruins me forever.',
                truth: 'Not forever, but long enough to hurt. A single 30-day delinquency stays on your report for 7 years. However, its impact fades over time — after 24 months of consistent on-time payments, the negative weight shrinks significantly. The damage is real but recoverable. Consistent future behaviour matters more than any single mistake.',
              },
              {
                myth: 'Myth 6: CIBIL fixes errors automatically.',
                truth: 'It does not. If your report shows a loan you never took, a default you already cleared, or a wrong personal detail, you must file a dispute yourself through CIBIL&rsquo;s online portal. The bank then has 30 days to verify and correct. Errors are surprisingly common — about 1 in 5 reports has at least one. Always pull your report and check it before a major loan application.',
              },
              {
                myth: 'Myth 7: Using 90% of my credit limit is fine as long as I pay on time.',
                truth: 'No. Credit utilisation — the ratio of your outstanding balance to your total limit — is one of CIBIL&rsquo;s most heavily weighted factors. Keep it below 30% for healthy scores; below 10% for excellent ones. A ₹1 lakh limit with ₹90,000 used will pull your score down every month, even if you pay every minimum on time. This is the quietest score killer in India.',
              },
            ].map((item, i) => (
              <div key={i} className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <p className="font-semibold text-red-700 dark:text-red-400 text-sm mb-2">{item.myth}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.truth}</p>
              </div>
            ))}
          </div>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-6">
            For the full official rules and how CIBIL calculates your score, the <a href="https://www.cibil.com/faq" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-400 underline hover:no-underline inline-flex items-center gap-0.5">TransUnion CIBIL FAQ <ExternalLink className="w-3 h-3" /></a> is the authoritative source. Everything else — bank blogs, YouTube videos, WhatsApp forwards — is a secondary interpretation, and many of them are years out of date.
          </p>
        </section>

        {/* ── How Long Does Debt Stay ────────────────────────── */}
        <section id="how-long-cibil" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            How Long Does Debt Stay on Your CIBIL Report?
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            The short answer: 7 years for most negative entries, much longer (often permanently) for positive history. But the details matter, and they&rsquo;re where most people get tripped up.
          </p>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/80">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Event</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Stays On Report For</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Impact Fades After</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-400 divide-y divide-slate-100 dark:divide-slate-700">
                  {[
                    ['Late payment (30+ days)', '7 years', '18–24 months'],
                    ['Written-off account', '7 years', 'Slowly, over full period'],
                    ['Settled account (paid less than owed)', '7 years (tag: &ldquo;Settled&rdquo;)', 'Rarely — the tag stays visible and hurts'],
                    ['Closed account (paid in full)', 'Often permanent', 'Actually helps (long history)'],
                    ['Hard enquiry', '2 years', 'Most weight in first 6 months'],
                    ['Bankruptcy / insolvency', '7–10 years', 'Severe throughout'],
                  ].map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} className="py-2.5 px-4" dangerouslySetInnerHTML={{ __html: cell }} />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            The row that catches most people off guard is the &ldquo;Settled&rdquo; one. When a borrower negotiates with a bank to pay less than what&rsquo;s owed — a one-time settlement — the account gets marked &ldquo;Settled&rdquo; on the CIBIL report. That tag is visible for 7 years and signals to every future lender that you didn&rsquo;t repay in full. Many borrowers choose settlement thinking they&rsquo;re solving the problem, only to discover years later that home loan applications are being rejected because of it.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The better path, almost always, is to pay the full amount — even on a long EMI plan — so the account closes as &ldquo;Closed&rdquo; instead of &ldquo;Settled.&rdquo; Those two words look identical to someone outside finance. They look completely different to someone approving your home loan.
          </p>
        </section>

        {/* ── Is Debt Good or Bad ────────────────────────────── */}
        <section id="is-debt-good-or-bad" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Is Debt Good or Bad? The Honest Answer
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Neither. It&rsquo;s a tool, and the answer depends entirely on how you use it. A home loan at 8.5% when your SIP returns 12% over the long run is a winning trade — you&rsquo;re paying 8.5 to earn 12, while also building equity in your home. A credit card balance at 42% while your SIP returns 12% is the opposite of that trade — you&rsquo;re losing 30% a year, every year, on the spread.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            The framework I use personally, and suggest to anyone who asks: if the interest rate on the debt is lower than your expected long-term investment return, and the debt is funding something that either builds equity or raises your earning capacity, it&rsquo;s probably fine. If the rate is higher than your expected return, or the debt is funding pure consumption, clear it aggressively before you even think about investing.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            In practice for Indian middle-class borrowers in 2026, this roughly means: pay off credit card balances and personal loans first (rates 12–48%), then evaluate whether to prepay the home loan or invest the surplus (rates 8–9% vs equity returns 11–13% long-term). The home loan decision is legitimately close and comes down to personal preference — some people sleep better with less debt, others with more liquidity.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Once the expensive debt is gone and you&rsquo;re building wealth, the next question becomes: how much do you actually need? That&rsquo;s the financial independence question. Our <Link href="/blog/fire-number-explained" className="text-red-600 dark:text-red-400 underline hover:no-underline">FIRE number guide</Link> walks through the math, or you can jump straight to the <Link href="/tools/compound-interest" className="text-red-600 dark:text-red-400 underline hover:no-underline">FIRE calculator</Link> and plug in your numbers.
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
                <summary className="p-5 cursor-pointer font-medium text-slate-800 dark:text-slate-200 text-sm flex justify-between items-center gap-3 list-none hover:text-red-600 transition-colors">
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
            For an India-specific deep dive into the most expensive debt most people carry, read our guide on <Link href="/blog/credit-card-debt-india" className="text-red-600 dark:text-red-400 underline hover:no-underline">credit card debt in India</Link>. The <Link href="/blog/minimum-payment-trap-credit-cards" className="text-red-600 dark:text-red-400 underline hover:no-underline">minimum payment trap guide</Link> breaks down exactly how 5% minimum payments keep people in debt for decades. When you&rsquo;re ready to attack multiple debts at once, the <Link href="/blog/snowball-vs-avalanche-debt-payoff" className="text-red-600 dark:text-red-400 underline hover:no-underline">snowball vs avalanche comparison</Link> shows which method saves more. Run your own numbers through the <Link href="/tools/debt-payoff" className="text-red-600 dark:text-red-400 underline hover:no-underline">multi-debt payoff calculator</Link>, or if you want a personalised escape plan, try the <Link href="/prompts/debt-payoff/debt-snowball-action-plan" className="text-red-600 dark:text-red-400 underline hover:no-underline">AI debt snowball action plan prompt</Link> with ChatGPT or Claude. For the full collection, browse our <Link href="/category/debt-management" className="text-red-600 dark:text-red-400 underline hover:no-underline">debt management tools</Link>.
          </p>
        </section>

        {/* ── Disclaimer ─────────────────────────────────────── */}
        <p className="mt-8 text-xs text-slate-400 leading-relaxed">
          <strong>Disclaimer:</strong> This article is for educational purposes only and is not financial or legal advice. Interest rates, CIBIL scoring factors, and tax rules referenced are based on typical Indian lending and regulatory conditions as of April 2026 and may change. Always verify your specific situation with your bank, a SEBI-registered investment advisor, or a qualified financial planner before making major debt or investment decisions.
        </p>
      </article>

      {/* ── Related Tools CTA ────────────────────────────────── */}
      <RelatedTools currentSlug="debt-payoff" heading="Free Tools to Manage Your Debt" />
    </>
  );
}
