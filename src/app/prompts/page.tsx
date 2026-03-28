import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { PromptCard } from '@/components/prompts/PromptCard';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import {
  PROMPT_CATEGORIES, getViralPrompts, getPromptCount,
  getPromptsByCategory,
} from '@/lib/prompts';
import { SITE_URL, generateFaqSchema } from '@/lib/seo';
import {
  Zap, ArrowRight, Sparkles, Wallet, TrendingDown, TrendingUp,
  CreditCard, Home, Receipt, Search,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Finance Prompts — ChatGPT & Claude Prompts for Money Management',
  description:
    `${getPromptCount()} free, copy-paste AI prompts for budgeting, debt payoff, investing, credit scores, real estate, and tax planning. Works with ChatGPT, Claude, and Gemini.`,
  keywords: [
    'finance prompts', 'ChatGPT finance prompts', 'AI money prompts',
    'best financial prompts', 'Claude finance prompts', 'budgeting prompts AI',
    'debt payoff prompts', 'investing prompts ChatGPT', 'prompt engineering finance',
  ],
  alternates: { canonical: `${SITE_URL}/prompts` },
  openGraph: {
    title: 'Free AI Finance Prompts — Copy-Paste Templates for ChatGPT & Claude',
    description: `${getPromptCount()} expert finance prompts for budgeting, debt, investing, credit, real estate & taxes.`,
    url: `${SITE_URL}/prompts`,
    siteName: 'DebtFreedom',
  },
};

const FAQ_DATA = [
  { q: 'What are AI finance prompts?', a: 'AI finance prompts are pre-written instructions you paste into AI tools like ChatGPT, Claude, or Gemini to get personalized financial analysis, budgets, debt payoff plans, and investment strategies. They turn general AI into a specialized financial advisor.' },
  { q: 'Are these prompts free to use?', a: 'Yes, every prompt on DebtFreedom is completely free. Copy them, customize them with your numbers, and use them as many times as you want. No account or sign-up required.' },
  { q: 'Which AI model works best for finance prompts?', a: 'ChatGPT (GPT-4) and Claude both excel at financial analysis. ChatGPT is better for creative scenarios and negotiation scripts. Claude is better for detailed calculations and step-by-step plans. Gemini works well for basic budgeting and tax questions.' },
  { q: 'Can AI replace a financial advisor?', a: 'No. AI prompts are for education and planning, not professional advice. They help you understand concepts, explore scenarios, and prepare questions for your actual financial advisor. Always verify important decisions with a licensed professional.' },
];

const ICON_MAP: Record<string, React.ElementType> = {
  Wallet, TrendingDown, TrendingUp, CreditCard, Home, Receipt,
};

export default function PromptsPage() {
  const viralPrompts = getViralPrompts(6);
  const faqSchema = generateFaqSchema(FAQ_DATA);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Free AI Finance Prompts',
    description: `${getPromptCount()} free finance prompts for ChatGPT, Claude, and Gemini.`,
    url: `${SITE_URL}/prompts`,
    publisher: { '@type': 'Organization', name: 'DebtFreedom', url: SITE_URL },
    numberOfItems: getPromptCount(),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb items={[{ label: 'AI Finance Prompts', href: '/prompts' }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white dark:from-slate-900 dark:to-slate-950 pt-12 pb-16 border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-indigo-100/40 dark:bg-indigo-950/30 rounded-full blur-2xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            {getPromptCount()} Free Prompts · Updated Weekly
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
            AI Finance Prompts That{' '}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
              Actually Work
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8">
            Copy-paste prompts for ChatGPT, Claude, and Gemini that turn AI into your
            personal financial analyst. Budgeting, debt payoff, investing, credit repair,
            real estate, and tax planning — all free, no sign-up.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#viral" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl">
              <Zap className="w-4 h-4" /> Browse Viral Prompts
            </a>
            <a href="#categories" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition-all hover:bg-slate-50 dark:hover:bg-slate-700">
              <Search className="w-4 h-4" /> Browse by Category
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6"><AdSlotLeaderboard className="mt-8" /></div>

      {/* Viral / Trending Prompts */}
      <section id="viral" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-orange-500" aria-hidden="true" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Trending Finance Prompts
          </h2>
        </div>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          The most-copied prompts this week. Each one is battle-tested and optimized for the best AI output.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {viralPrompts.map(prompt => (
            <PromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6"><AdSlotInContent /></div>

      {/* Category Grid */}
      <section id="categories" className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Browse Prompts by Category
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Every prompt is organized by financial topic. Click a category to see all available prompts.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROMPT_CATEGORIES.map(cat => {
              const Icon = ICON_MAP[cat.icon] ?? Sparkles;
              const promptCount = getPromptsByCategory(cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/prompts/${cat.slug}`}
                  className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 group-hover:bg-purple-50 dark:group-hover:bg-purple-950 transition-colors">
                      <Icon className={cn('w-5 h-5 transition-colors', cat.color)} aria-hidden="true" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                      {promptCount} prompt{promptCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1.5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {cat.shortTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View Prompts <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
          How to Use These AI Finance Prompts
        </h2>
        <div className="space-y-4">
          {[
            { step: '1', title: 'Pick a prompt', desc: 'Browse by category or check the trending section. Each prompt is designed for a specific financial task.' },
            { step: '2', title: 'Copy & customize', desc: 'Click the copy button, then replace the [BRACKETED] placeholders with your actual numbers — income, debts, expenses, etc.' },
            { step: '3', title: 'Paste into AI', desc: 'Open ChatGPT, Claude, or Gemini and paste the prompt. The AI will generate a personalized analysis based on your inputs.' },
            { step: '4', title: 'Verify with calculators', desc: 'Cross-check key numbers using our free financial calculators. AI is great for strategy, but calculators are better for precise math.' },
          ].map(item => (
            <div key={item.step} className="flex gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
              <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-bold flex items-center justify-center shrink-0">
                {item.step}
              </span>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQ_DATA.map(({ q, a }, i) => (
              <details key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group">
                <summary className="p-5 cursor-pointer font-medium text-slate-800 dark:text-slate-200 text-sm flex justify-between items-center gap-3 list-none hover:text-purple-600 transition-colors">
                  {q}
                  <span className="text-slate-400 group-open:rotate-45 transition-transform shrink-0 text-lg leading-none">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ── cn helper (inline for this file to avoid circular deps) ──
function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
