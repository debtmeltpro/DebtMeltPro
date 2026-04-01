// src/app/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  TrendingDown, Home, Flame, CreditCard, GraduationCap,
  Shield, Zap, BarChart3, CheckCircle2, ArrowRight,
  BookOpen, FolderOpen, Sparkles,
} from 'lucide-react';
import { AdSlotLeaderboard, AdSlotInArticle } from '@/components/molecules/AdSlot';
import { TOOLS, CATEGORIES, SITE_URL, generateFaqSchema } from '@/lib/seo';
import { getViralPrompts, getPromptCount } from '@/lib/prompts';
import { BLOG_POSTS } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Free Financial Calculators — Debt Payoff, Mortgage, FIRE, Credit Cards',
  description:
    "Use DebtMeltPro's suite of free, expert-grade financial calculators. Compare debt payoff strategies, run a rent vs. buy analysis, calculate your FIRE number, optimize credit card payments, and estimate student loan refinancing savings.",
  keywords: [
    'free debt payoff calculator',
    'snowball vs avalanche calculator',
    'rent vs buy calculator',
    'FIRE number calculator',
    'credit card payoff calculator',
    'student loan refinance calculator',
  ],
  alternates: { canonical: SITE_URL },
};

const FAQ_DATA = [
  { q: 'What is the debt snowball method?', a: 'The debt snowball method involves paying off your smallest debt balances first while making minimum payments on all other debts. Once a debt is paid off, you roll that payment into the next smallest debt, creating psychological momentum.' },
  { q: 'What is the debt avalanche method?', a: 'The debt avalanche method focuses on paying off debts with the highest interest rates first, regardless of balance size. This approach minimizes the total interest paid over time and is mathematically the most efficient strategy.' },
  { q: 'What is a FIRE number?', a: 'A FIRE number is the investment portfolio size needed to sustain your lifestyle indefinitely using the 4% safe withdrawal rate. It equals 25 times your annual expenses.' },
  { q: 'Is it better to rent or buy a home?', a: 'The rent vs. buy decision depends on your local market, how long you plan to stay, down payment size, and opportunity cost of capital. Our calculator compares the true total cost of both options over your analysis period.' },
];

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingDown, Home, Flame, CreditCard, GraduationCap,
};

const TRUST_ITEMS = [
  { icon: Shield,    text: 'No data stored — all calculations run locally in your browser' },
  { icon: Zap,       text: 'Instant results — no sign-up or email required' },
  { icon: BarChart3, text: 'Professional-grade math validated against standard financial formulas' },
] as const;

export default function HomePage() {
  const faqSchema = generateFaqSchema(FAQ_DATA);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 pb-20 border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200/30 dark:bg-green-900/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-green-100/40 dark:bg-green-950/30 rounded-full blur-2xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-sm font-medium mb-6">
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            100% Free · No Sign-Up Required!
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
            <Link href="/tools/debt-payoff" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
              Start with Debt Payoff <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/tools/compound-interest" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition-all">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6"><AdSlotLeaderboard className="mt-8" /></div>

      {/* ── Tool Grid ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="tools-heading">
        <div className="text-center mb-12">
          <h2 id="tools-heading" className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Free Financial Calculators
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Each calculator uses industry-standard formulas validated by certified financial planners.
            All calculations run in your browser — your data never leaves your device.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS.map(tool => {
            const Icon = ICON_MAP[tool.icon] ?? TrendingDown;
            return (
              <Link key={tool.slug} href={`/tools/${tool.slug}`}
                className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4 cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 group-hover:bg-green-50 dark:group-hover:bg-green-950 transition-colors">
                    <Icon className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-colors ${tool.accentColor}`} aria-hidden="true" />
                  </div>
                  {tool.badge && (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tool.badgeColor}`}>{tool.badge}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1.5 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{tool.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{tool.description}</p>
                </div>
                <div className="mt-auto flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Open Calculator <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Category Browsing ─────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <FolderOpen className="w-5 h-5 text-green-500" aria-hidden="true" />
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Browse by Category
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map(cat => (
              <Link key={cat.slug} href={`/category/${cat.slug}`}
                className="group p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-sm transition-shadow">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-2">
                  {cat.description}
                </p>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  {cat.toolSlugs.length} tool{cat.toolSlugs.length !== 1 ? 's' : ''} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Finance Prompts ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" aria-hidden="true" />
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Viral AI Finance Prompts
            </h2>
          </div>
          <Link href="/prompts" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 transition-colors inline-flex items-center gap-1">
            All {getPromptCount()} Prompts <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-2xl">
          Copy-paste AI prompts for ChatGPT and Claude that turn AI into your personal financial advisor.
          Budgeting, debt payoff, investing, and more — all free.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {getViralPrompts(3).map(prompt => (
            <Link key={prompt.slug} href={`/prompts/${prompt.category}/${prompt.slug}`}
              className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300">
                  <Zap className="w-2.5 h-2.5" /> VIRAL
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                  {prompt.aiModels[0]}
                </span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {prompt.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {prompt.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Latest Blog Posts ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-500" aria-hidden="true" />
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Financial Education
            </h2>
          </div>
          <Link href="/blog" className="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-700 transition-colors inline-flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BLOG_POSTS.slice(0, 3).map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-sm transition-shadow">
              <span className="text-xs font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded-full">
                {post.category}
              </span>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm mt-3 mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Why DebtMeltPro ─────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
          Why Thousands Trust DebtMeltPro
        </h2>
        <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4 text-sm">
          <p>
            DebtMeltPro provides a complete suite of free financial calculators designed to help you
            make smarter money decisions. Unlike most online tools that require sign-ups, email
            addresses, or personal data collection, every DebtMeltPro calculator runs entirely in your
            browser. Your financial data never leaves your device — no servers, no databases, no
            tracking of sensitive information.
          </p>
          <p>
            Our <Link href="/tools/debt-payoff" className="text-green-600 dark:text-green-400 underline hover:no-underline">Debt Payoff Calculator</Link> compares
            the snowball, avalanche, and hybrid payoff strategies side-by-side so you can see exactly
            how much interest each method saves. The <Link href="/tools/mortgage-calculator" className="text-green-600 dark:text-green-400 underline hover:no-underline">Rent vs. Buy Calculator</Link> goes
            beyond a simple mortgage payment comparison to include property taxes, maintenance,
            insurance, and the opportunity cost of your down payment. Our <Link href="/tools/compound-interest" className="text-green-600 dark:text-green-400 underline hover:no-underline">FIRE Calculator</Link> projects
            compound investment growth with inflation adjustment, helping you determine when your
            portfolio can sustain your lifestyle indefinitely.
          </p>
          <p>
            For credit card holders caught in the minimum payment cycle, the <Link href="/tools/credit-card-payoff" className="text-green-600 dark:text-green-400 underline hover:no-underline">Credit Card Payoff Calculator</Link> reveals
            how much interest you are really paying and how fixing your payment amount can cut years
            off your payoff timeline. Student loan borrowers can use the <Link href="/tools/student-loan" className="text-green-600 dark:text-green-400 underline hover:no-underline">Refinance Calculator</Link> to
            compare current terms against refinanced options, including break-even analysis and
            warnings about losing federal loan protections.
          </p>
          <p>
            Beyond calculators, our <Link href="/prompts" className="text-green-600 dark:text-green-400 underline hover:no-underline">AI Finance Prompts</Link> library
            offers copy-paste templates for ChatGPT, Claude, and Gemini that turn AI into your
            personal financial analyst — covering budgeting, debt strategies, investing, credit
            optimization, real estate decisions, and tax planning.
          </p>
        </div>
      </section>

      {/* ── FAQ Section ───────────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQ_DATA.map((item, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{item.q}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <AdSlotInArticle className="mt-8" />
        </div>
      </section>
    </>
  );
}
