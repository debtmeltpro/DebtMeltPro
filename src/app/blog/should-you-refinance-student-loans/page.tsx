import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogArticle } from '@/components/seo/BlogArticle';
import { SITE_URL } from '@/lib/seo';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Should You Refinance Your Student Loans? A Complete Decision Framework',
  description: 'When refinancing saves you money, when it puts you at risk, and the federal loan protections you should never give up. A balanced guide for borrowers.',
  keywords: ['refinance student loans', 'federal vs private loans', 'student loan refinancing', 'PSLF', 'income driven repayment'],
  alternates: { canonical: `${SITE_URL}/blog/should-you-refinance-student-loans` },
  openGraph: { type: 'article', publishedTime: '2024-05-20T00:00:00Z' },
};

const FAQS = [
  { q: 'Can I undo a student loan refinance?', a: 'No. Once you refinance federal loans into a private loan, there is no way to convert them back to federal loans. This decision is permanent. Make sure you fully understand the trade-offs before proceeding.' },
  { q: 'What is the average rate reduction from refinancing?', a: 'Borrowers with good credit (720+) typically see rate reductions of 1-3 percentage points. On a $35,000 loan, a 2% rate drop can save $4,000-6,000 over the life of the loan.' },
  { q: 'Should I refinance if I work in public service?', a: 'Almost certainly no. Public Service Loan Forgiveness (PSLF) forgives remaining federal loan balances after 120 qualifying payments (10 years). Refinancing to a private loan permanently disqualifies you from PSLF.' },
];

export default function RefinanceStudentLoansPage() {
  return (
    <BlogArticle
      slug="should-you-refinance-student-loans"
      title="Should You Refinance Your Student Loans? A Complete Decision Framework"
      category="Student Loans"
      categorySlug="student-loans"
      date="2024-05-20"
      readTime="7 min read"
      intro="Student loan refinancing can save thousands in interest — or it can cost you access to critical federal protections. This guide gives you a clear framework for making the right decision based on your specific situation."
      relatedToolSlug="student-loan"
      faqs={FAQS}
    >
      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">
        When Refinancing Makes Sense
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        Refinancing is most beneficial when three conditions are met: you can qualify for a
        meaningfully lower interest rate (at least 1% reduction), you have stable income with no
        plans to rely on income-driven repayment, and you do not need federal loan protections like
        PSLF, forbearance, or deferment.
      </p>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        For borrowers with strong credit scores (720+) and private student loans, refinancing is
        often a straightforward win. Private loans do not come with federal protections, so there
        is nothing to lose by getting a lower rate.
      </p>

      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-5 my-6 not-prose">
        <p className="font-bold text-amber-900 dark:text-amber-200 mb-2">Critical Warning: Federal Loans</p>
        <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
          Refinancing federal student loans to a private lender <strong>permanently removes</strong>{' '}
          access to income-driven repayment plans, Public Service Loan Forgiveness, federal
          forbearance and deferment, and future federal forgiveness programs. This cannot be undone.
        </p>
      </div>

      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">
        The Break-Even Calculation
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        Most refinancing involves an origination fee (typically 0.5-2% of the loan balance). Your
        break-even point is how many months of savings it takes to recover this fee. For example,
        if refinancing $35,000 costs a $350 fee and saves $50/month, you break even in 7 months.
        Only refinance if you plan to keep the loan past this point.
      </p>

      <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-5 my-6 not-prose">
        <p className="font-semibold text-green-800 dark:text-green-200 mb-2">Calculate your savings</p>
        <p className="text-sm text-green-700 dark:text-green-300 mb-3">
          Enter your current loan terms and the refinanced rate to see exact monthly savings,
          total interest saved, and break-even timeline.
        </p>
        <Link href="/tools/student-loan" className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors">
          Open Refinance Calculator <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">
        The Hybrid Approach
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        If you have both federal and private student loans, consider refinancing only the private
        loans while keeping your federal loans intact. This lets you capture rate savings on private
        debt without sacrificing federal protections. Many lenders allow you to choose exactly which
        loans to refinance.
      </p>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        For your federal loans, explore{' '}
        <Link href="/tools/debt-payoff" className="text-green-600 dark:text-green-400 underline hover:no-underline">
          accelerated payoff strategies
        </Link>{' '}
        instead. Applying extra payments to your highest-rate federal loan can achieve similar
        interest savings while preserving all federal benefits.
      </p>
    </BlogArticle>
  );
}
