import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { generateWebPageSchema, SITE_URL, TOOLS } from '@/lib/seo';
import { Shield, Zap, BarChart3, Lock, Users, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About DebtMeltPro — Free Financial Calculators You Can Trust',
  description:
    'DebtMeltPro provides free, privacy-first financial calculators for debt payoff, mortgage analysis, FIRE planning, and more. Learn about our mission to make financial tools accessible to everyone.',
  keywords: ['about DebtMeltPro', 'free financial calculators', 'financial tools', 'debt payoff tools'],
  alternates: { canonical: `${SITE_URL}/about` },
};

const VALUES = [
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Your financial data never leaves your browser. No accounts, no data storage, no tracking of personal finances. We built our calculators to run 100% client-side.',
  },
  {
    icon: Shield,
    title: 'Accuracy Matters',
    description: 'Every calculator uses industry-standard financial formulas validated against known results. Our math engine is unit-tested to ensure precision you can rely on.',
  },
  {
    icon: Zap,
    title: 'Instant & Free',
    description: 'No sign-ups, no paywalls, no email gates. Every tool loads instantly and delivers results in real time. Financial literacy should not have a price tag.',
  },
  {
    icon: Users,
    title: 'Built for Real People',
    description: 'Our tools are designed for clarity, not complexity. Whether you are tackling credit card debt or planning early retirement, the interface guides you step by step.',
  },
  {
    icon: BarChart3,
    title: 'Professional Grade',
    description: 'The same amortization formulas used by banks and financial advisors power every calculator. We show our work so you can verify the math yourself.',
  },
  {
    icon: Heart,
    title: 'Community Driven',
    description: 'DebtMeltPro is sustained through non-intrusive advertising. We reinvest revenue into building more tools and keeping existing calculators up to date.',
  },
] as const;

export default function AboutPage() {
  const schema = generateWebPageSchema({
    title: 'About DebtMeltPro',
    description: 'Learn about our mission to provide free, privacy-first financial calculators.',
    url: `${SITE_URL}/about`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Breadcrumb items={[{ label: 'About', href: '/about' }]} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            About DebtMeltPro
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We believe everyone deserves access to professional-grade financial tools —
            without paying for expensive software or handing over personal data.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-12">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              DebtMeltPro was created with a simple goal: give people the tools to make informed
              financial decisions. Too many financial calculators online are either oversimplified,
              hidden behind paywalls, or designed to collect your data and sell you products.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We built a suite of nine core calculators — covering debt payoff strategies, rent vs.
              buy analysis, compound interest and FIRE planning, credit card optimization, student
              loan refinancing, SIP returns, loan EMI, loan amortization, and credit card interest — using the same mathematical formulas that banks and certified
              financial planners rely on.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Every calculation runs entirely in your web browser. Your balances, interest rates,
              income, and financial details are never transmitted to any server. This is a deliberate
              architectural decision, not just a policy promise.
            </p>
          </div>
        </section>

        {/* Values Grid */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5"
              >
                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/50 w-fit mb-3">
                  <Icon className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">{title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Tools */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Our Calculator Suite
          </h2>
          <div className="space-y-3">
            {TOOLS.map(tool => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-sm transition-shadow group"
              >
                <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-sm font-bold text-green-700 dark:text-green-300 shrink-0">
                  {tool.toolNumber}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section>
          <div className="rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 p-5">
            <h2 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">
              Important Disclaimer
            </h2>
            <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
              DebtMeltPro provides educational financial calculators for informational purposes only.
              We are not certified financial planners, tax advisors, or legal professionals. Our tools
              produce mathematical estimates based on the inputs you provide. Always consult a
              qualified professional before making financial decisions. Read our full{' '}
              <Link href="/disclaimer" className="underline hover:no-underline">disclaimer</Link>.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
