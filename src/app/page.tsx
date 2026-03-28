// src/app/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  TrendingDown, Home, Flame, CreditCard, GraduationCap,
  Shield, Zap, BarChart3, CheckCircle2, ArrowRight,
} from 'lucide-react';
import { AdSlotLeaderboard, AdSlotInArticle } from '@/components/molecules/AdSlot';

export const metadata: Metadata = {
  title: 'Free Financial Calculators — Debt Payoff, Mortgage, FIRE, Credit Cards',
  description:
    "Use DebtFreedom's suite of free, expert-grade financial calculators. Compare debt payoff strategies, run a rent vs. buy analysis, calculate your FIRE number, optimize credit card payments, and estimate student loan refinancing savings.",
  keywords: [
    'free debt payoff calculator',
    'snowball vs avalanche calculator',
    'rent vs buy calculator 2024',
    'FIRE number calculator',
    'credit card payoff calculator',
    'student loan refinance calculator',
  ],
  alternates: { canonical: 'https://debtfreedom.app' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the debt snowball method?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The debt snowball method involves paying off your smallest debt balances first while making minimum payments on all other debts. Once a debt is paid off, you roll that payment into the next smallest debt, creating psychological momentum.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the debt avalanche method?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The debt avalanche method focuses on paying off debts with the highest interest rates first, regardless of balance size. This approach minimizes the total interest paid over time and is mathematically the most efficient strategy.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a FIRE number?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A FIRE number is the investment portfolio size needed to sustain your lifestyle indefinitely using the 4% safe withdrawal rate. It equals 25 times your annual expenses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it better to rent or buy a home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The rent vs. buy decision depends on your local market, how long you plan to stay, down payment size, and opportunity cost of capital. Our calculator compares the true total cost of both options over your analysis period.',
      },
    },
  ],
};

const TOOLS = [
  {
    href: '/tools/debt-payoff',
    icon: TrendingDown,
    title: 'Debt Payoff Engine',
    description: 'Compare Snowball, Avalanche & Hybrid strategies. See exactly how much interest and time you save.',
    badge: 'Most Popular',
    badgeColor: 'bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300',
    accentColor: 'group-hover:text-brand-500',
  },
  {
    href: '/tools/mortgage-calculator',
    icon: Home,
    title: 'Rent vs. Buy Pro',
    description: 'True cost comparison including property taxes, maintenance, and opportunity cost of your down payment.',
    badge: null,
    badgeColor: '',
    accentColor: 'group-hover:text-blue-500',
  },
  {
    href: '/tools/compound-interest',
    icon: Flame,
    title: 'FIRE Calculator',
    description: 'Project wealth growth with inflation adjustment. Calculate your FIRE number and sustainable withdrawals.',
    badge: null,
    badgeColor: '',
    accentColor: 'group-hover:text-orange-500',
  },
  {
    href: '/tools/credit-card-payoff',
    icon: CreditCard,
    title: 'Credit Card Optimizer',
    description: 'Expose the minimum payment trap. Calculate exactly how much interest you throw away each month.',
    badge: 'Eye-Opening',
    badgeColor: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
    accentColor: 'group-hover:text-red-500',
  },
  {
    href: '/tools/student-loan',
    icon: GraduationCap,
    title: 'Student Loan Refinance',
    description: 'Compare your current loan vs. refinancing. See break-even analysis and total savings potential.',
    badge: null,
    badgeColor: '',
    accentColor: 'group-hover:text-violet-500',
  },
] as const;

const TRUST_ITEMS = [
  { icon: Shield,    text: 'No data stored — all calculations run locally in your browser' },
  { icon: Zap,       text: 'Instant results — no sign-up or email required' },
  { icon: BarChart3, text: 'Professional-grade math validated against standard financial formulas' },
] as const;

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 pb-20 border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200/30 dark:bg-green-900/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-green-100/40 dark:bg-green-950/30 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-sm font-medium mb-6">
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            100% Free · No Sign-Up Required
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
            Take Control of Your{' '}
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Financial Future
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8">
            Professional-grade financial calculators trusted by thousands. From debt payoff
            strategies to FIRE planning — all free, private, and instant.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tools/debt-payoff"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Start with Debt Payoff
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/tools/compound-interest"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition-all"
            >
              Calculate FIRE Number
            </Link>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {TRUST_ITEMS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Icon className="w-4 h-4 text-green-500 shrink-0" aria-hidden="true" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leaderboard Ad ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AdSlotLeaderboard className="mt-8" />
      </div>

      {/* ── Tool Grid ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="tools-heading">
        <div className="text-center mb-12">
          <h2 id="tools-heading" className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            The Power 5 Financial Tools
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Each calculator uses industry-standard formulas validated by certified financial planners.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS.map(({ href, icon: Icon, title, description, badge, badgeColor, accentColor }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 group-hover:bg-green-50 dark:group-hover:bg-green-950 transition-colors">
                  <Icon
                    className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-colors ${accentColor}`}
                    aria-hidden="true"
                  />
                </div>
                {badge && (
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`}>
                    {badge}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1.5 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {description}
                </p>
              </div>
              <div className="mt-auto flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Open Calculator
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FAQ Section ───────────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((item, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{item.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>

          <AdSlotInArticle className="mt-8" />
        </div>
      </section>
    </>
  );
}
