import type { Metadata } from 'next';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import { StudentLoanCalculator } from './StudentLoanCalculator';

export const metadata: Metadata = {
  title: 'Student Loan Refinance Calculator — Compare Rates & Save',
  description:
    'Should you refinance your student loans? Calculate exact monthly savings, total interest saved, break-even timeline, and compare your current loan vs. refinanced terms side by side.',
  keywords: [
    'student loan refinance calculator',
    'student loan comparison',
    'refinance student loans savings',
    'student loan interest calculator',
    'private vs federal loan refinance',
  ],
  alternates: { canonical: 'https://debtfreedom.app/tools/student-loan' },
};

const FAQ_ITEMS = [
  {
    q: 'When should you refinance student loans?',
    a: "Refinancing makes sense when: (1) You can qualify for a meaningfully lower interest rate (typically 1%+ reduction), (2) You have stable income and good credit (670+), (3) You don't need federal loan protections like income-driven repayment or public service loan forgiveness (PSLF). If you work for a government or nonprofit, do NOT refinance federal loans.",
  },
  {
    q: 'What are the risks of refinancing federal student loans?',
    a: 'Refinancing federal loans to private loans permanently removes access to: income-driven repayment plans (IDR), Public Service Loan Forgiveness (PSLF), federal forbearance and deferment options, and potential future federal loan forgiveness programs. This calculator measures only the financial cost difference — weigh these protections carefully.',
  },
  {
    q: 'What credit score do I need to refinance?',
    a: 'Most private lenders require a minimum credit score of 650-680, but the best rates typically go to borrowers with 720+ scores. You can often add a creditworthy co-signer to access better rates. Shop multiple lenders as each uses different underwriting criteria.',
  },
] as const;

export default function StudentLoanPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-violet-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-sm font-medium mb-4">
            Tool 5 of 5
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Student Loan Refinance Estimator
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Compare your current loan against a refinanced option. See monthly savings, total interest
            saved, and how long it takes to break even on any refinancing fees.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AdSlotLeaderboard className="mt-6" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StudentLoanCalculator />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AdSlotInContent />
      </div>

      {/* Federal Loan Warning */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-8">
        <div className="rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 p-5">
          <h3 className="font-bold text-amber-900 dark:text-amber-200 mb-2">
            ⚠️ Federal Loan Warning
          </h3>
          <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            Refinancing federal student loans to private loans{' '}
            <strong>permanently eliminates</strong> access to income-driven repayment (IDR),
            Public Service Loan Forgiveness (PSLF), and federal forbearance. This tool measures
            financial costs only. If you work in public service or rely on IDR, do not refinance.
            Consult a student loan specialist before making this decision.
          </p>
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Student Loan Refinance FAQ
        </h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <details key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group">
              <summary className="p-5 cursor-pointer font-medium text-slate-800 dark:text-slate-200 text-sm flex justify-between items-center gap-3 list-none hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                {q}
                <span className="text-slate-400 group-open:rotate-45 transition-transform shrink-0 text-lg leading-none">+</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">
                {a}
              </div>
            </details>
          ))}
        </div>
        <p className="mt-8 text-xs text-slate-400 leading-relaxed">
          <strong>Disclaimer:</strong> Results are estimates for educational purposes only. Refinancing
          federal loans removes important borrower protections. Consult a student loan specialist before
          refinancing.
        </p>
      </section>
    </>
  );
}
