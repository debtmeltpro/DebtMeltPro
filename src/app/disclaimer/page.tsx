import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { SITE_URL } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Disclaimer — DebtMeltPro',
  description:
    'Financial disclaimer for DebtMeltPro calculators. Our tools are for educational purposes only and do not constitute financial, tax, or legal advice.',
  robots: { index: true, follow: false },
  alternates: { canonical: `${SITE_URL}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Disclaimer', href: '/disclaimer' }]} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Disclaimer
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Last Updated: <time dateTime="2026-08-23">August 23, 2026</time>
        </p>

        <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-6 mb-8">
          <h2 className="font-bold text-red-900 dark:text-red-200 text-lg mb-2">
            Not Financial, Tax, or Legal Advice
          </h2>
          <p className="text-sm text-red-800 dark:text-red-300 leading-relaxed">
            The tools, calculators, estimates, projections, and content provided on DebtMeltPro
            (debtmeltpro.com) are for <strong>educational and informational purposes only</strong>.
            Nothing on this website constitutes financial, investment, tax, accounting, or legal advice.
            You should always consult with a qualified, licensed professional before making any
            financial decisions.
          </p>
        </div>

        <div className="space-y-8 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          <section>
            <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">
              1. Educational Purpose Only
            </h2>
            <p>
              All calculators on DebtMeltPro — including but not limited to the Debt Payoff Calculator,
              Rent vs. Buy Calculator, FIRE Calculator, Credit Card Payoff Optimizer, and Student Loan
              Refinance Estimator — are designed to provide general educational information. They
              produce mathematical estimates based solely on the inputs you provide and standard
              financial formulas. These estimates do not account for your complete financial picture,
              tax situation, or individual circumstances.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">
              2. No Professional Relationship
            </h2>
            <p>
              Using DebtMeltPro does not create a client, fiduciary, advisory, or professional
              relationship between you and DebtMeltPro or its operators. We are not registered
              investment advisors, broker-dealers, financial planners, tax preparers, or attorneys.
              We do not hold any financial licenses or certifications.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">
              3. Accuracy of Calculations
            </h2>
            <p>
              While we strive to ensure mathematical accuracy using industry-standard formulas
              (monthly amortization, compound interest, annuity calculations), we make no warranty —
              express or implied — regarding the accuracy, completeness, reliability, or suitability
              of any calculation result. All outputs are estimates and may differ from actual results
              due to factors including but not limited to: variable interest rates, promotional APR
              periods, lender-specific terms and fees, tax law changes, market conditions, and
              individual credit circumstances.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">
              4. Investment Projections
            </h2>
            <p>
              Projections shown in our compound interest and FIRE calculators are hypothetical and
              based on assumed rates of return. Past investment performance does not guarantee future
              results. Actual investment returns will vary and may be significantly different from
              the projections shown. The 4% safe withdrawal rate (Trinity Study) is a historical
              guideline, not a guarantee of portfolio sustainability.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">
              5. Student Loan Refinancing Warning
            </h2>
            <p>
              Refinancing federal student loans to private loans permanently eliminates access to
              federal borrower protections including income-driven repayment plans, Public Service
              Loan Forgiveness (PSLF), and federal forbearance and deferment options. Our Student
              Loan Refinance Estimator measures only the financial cost difference and does not
              account for the value of these protections. Consult a student loan specialist before
              making refinancing decisions.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">
              6. Third-Party Content & Advertising
            </h2>
            <p>
              DebtMeltPro displays advertisements served by Google AdSense. These advertisements are
              provided by third parties and do not constitute endorsements, recommendations, or
              guarantees of any product, service, or company. We have no control over the content of
              these advertisements. Any financial products or services advertised on this site should
              be independently evaluated before use.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, DebtMeltPro and its operators,
              developers, and contributors shall not be held liable for any direct, indirect,
              incidental, special, consequential, or punitive damages arising from or related to
              your use of the calculators or any information provided on this website. This includes,
              without limitation, any financial losses resulting from decisions made based on
              calculator results.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">
              8. Consult a Professional
            </h2>
            <p>
              Before making any financial decision — including debt payoff strategies, home purchases,
              investment plans, credit management, or loan refinancing — we strongly encourage you to
              consult with one or more of the following qualified professionals:
            </p>
            <ul className="mt-3 space-y-1.5 ml-4">
              {[
                'Certified Financial Planner (CFP)',
                'Certified Public Accountant (CPA)',
                'Licensed Real Estate Agent or Broker',
                'Student Loan Specialist or Counselor',
                'Licensed Attorney (for legal matters)',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">
              9. Contact
            </h2>
            <p>
              If you have questions about this disclaimer, please{' '}
              <Link href="/contact" className="text-green-600 dark:text-green-400 underline hover:no-underline">
                contact us
              </Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
