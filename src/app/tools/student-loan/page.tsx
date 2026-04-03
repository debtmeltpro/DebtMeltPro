import type { Metadata } from 'next';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import { generateToolMetadata, generateFaqSchema, generateToolSchema, generateHowToSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import { StudentLoanCalculator } from './StudentLoanCalculator';

export const metadata: Metadata = generateToolMetadata('student-loan');

const FAQ_ITEMS = [
  { q: 'When should you refinance student loans?', a: "Refinancing makes sense when you can qualify for a meaningfully lower interest rate (typically 1%+ reduction), you have stable income and good credit (670+), and you don't need federal loan protections like income-driven repayment or Public Service Loan Forgiveness (PSLF)." },
  { q: 'What are the risks of refinancing federal student loans?', a: 'Refinancing federal loans to private loans permanently removes access to income-driven repayment plans (IDR), Public Service Loan Forgiveness (PSLF), federal forbearance and deferment options, and potential future federal loan forgiveness programs.' },
  { q: 'What credit score do I need to refinance?', a: 'Most private lenders require a minimum credit score of 650-680, but the best rates typically go to borrowers with 720+ scores. You can often add a creditworthy co-signer to access better rates.' },
  { q: 'What is a break-even point for refinancing?', a: 'The break-even point is how long it takes for your monthly savings from refinancing to cover the upfront refinancing fee. If your fee is $350 and you save $50/month, break-even is 7 months. Only refinance if you plan to keep the loan past break-even.' },
  { q: 'Can I refinance just some of my student loans?', a: 'Yes. Many borrowers refinance only their private loans while keeping federal loans intact to preserve federal protections. This is often the safest approach if you have a mix of federal and private loans.' },
  { q: 'What is income-driven repayment and why does it matter?', a: 'Income-driven repayment (IDR) plans cap your monthly federal loan payment at 10-20% of your discretionary income and forgive any remaining balance after 20-25 years. This is a critical safety net if your income drops. Refinancing to a private lender eliminates access to IDR permanently.' },
  { q: 'Should I refinance if I work in public service?', a: 'No. If you work for a government or nonprofit employer, you may qualify for Public Service Loan Forgiveness (PSLF) after 120 qualifying payments. PSLF forgives your entire remaining federal loan balance tax-free. Refinancing to a private lender makes you permanently ineligible.' },
  { q: 'Fixed rate vs variable rate: which should I choose when refinancing?', a: 'Fixed rates offer payment predictability and protection against rate increases. Variable rates start lower but can rise over time. If you plan to pay off the loan within 5 years, a variable rate may save money. For longer terms, fixed rates are safer.' },
  { q: 'How much can I save by refinancing student loans?', a: 'Savings depend on your rate reduction and remaining balance. A borrower with $50,000 in loans dropping from 6.8% to 4.5% on a 10-year term saves approximately $6,500 in total interest and $55/month. Use our calculator to see your exact numbers.' },
  { q: 'Can I refinance student loans more than once?', a: 'Yes. There is no limit on how many times you can refinance. If rates drop further or your credit score improves significantly, refinancing again can save additional money. Just watch for any origination fees that could offset the savings.' },
];

export default function StudentLoanPage() {
  const toolSchema = generateToolSchema('student-loan');
  const faqSchema = generateFaqSchema(FAQ_ITEMS);
  const howToSchema = generateHowToSchema({
    name: 'How to Use the Student Loan Refinance Calculator',
    description: 'Compare your current student loan terms against a refinanced option to see exact monthly savings, total interest saved, and break-even timeline.',
    steps: [
      { name: 'Enter current loan details', text: 'Input your current student loan balance, interest rate, and remaining term in months.' },
      { name: 'Enter refinanced terms', text: 'Input the refinanced interest rate you have been offered or are considering, and the new loan term.' },
      { name: 'Add refinancing fees', text: 'Enter any origination fees or closing costs associated with the refinance. This affects the break-even calculation.' },
      { name: 'Review the comparison', text: 'See your monthly savings, total interest saved over the life of the loan, and how many months until the refinance fee pays for itself.' },
      { name: 'Check the recommendation', text: 'Review the automated recommendation based on your specific numbers. For federal loans, carefully consider the trade-offs before proceeding.' },
    ],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Student Loans', url: `${SITE_URL}/category/student-loans` },
    { name: 'Refinance Calculator', url: `${SITE_URL}/tools/student-loan` },
  ]);

  return (
    <>
      {toolSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumb items={[
        { label: 'Student Loans', href: '/category/student-loans' },
        { label: 'Refinance Calculator', href: '/tools/student-loan' },
      ]} />

      <section className="bg-gradient-to-b from-violet-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-sm font-medium mb-4">Tool 5 of 5</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Student Loan Refinance Calculator — Compare Rates and Save
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Compare your current student loan against a refinanced option. See monthly savings, total
            interest saved, and how long it takes to break even on refinancing fees — all with a clear
            recommendation based on your numbers.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6"><AdSlotLeaderboard className="mt-6" /></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><StudentLoanCalculator /></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6"><AdSlotInContent /></div>

      {/* Federal Loan Warning */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-8">
        <div className="rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 p-5">
          <h3 className="font-bold text-amber-900 dark:text-amber-200 mb-2">Federal Loan Warning</h3>
          <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            Refinancing federal student loans to private loans <strong>permanently eliminates</strong> access
            to income-driven repayment (IDR), Public Service Loan Forgiveness (PSLF), and federal forbearance.
            This tool measures financial costs only. If you work in public service or rely on IDR, do not refinance.
          </p>
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Use Cases */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Who Should Use This Calculator?</h2>
          <ul className="space-y-2">
            {[
              'Borrowers with private student loans looking for lower interest rates',
              'Federal loan holders considering refinancing (with awareness of trade-offs)',
              'Graduates with strong credit scores who may qualify for significant rate reductions',
              'Anyone wanting to compare the total cost of their current loan vs. a refinanced alternative',
              'Financial advisors helping clients evaluate student loan refinancing options',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="text-violet-500 mt-0.5 shrink-0">•</span>{item}
              </li>
            ))}
          </ul>
        </div>

        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">How This Calculator Works</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          Enter your current student loan balance, interest rate, remaining term, and the refinanced rate
          you have been offered. The calculator computes your monthly payment under both scenarios using
          standard amortization formulas, then shows you the exact monthly savings, total interest saved
          over the life of the loan, and how long it takes to break even on any refinancing fees.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          The tool also provides a clear recommendation based on your numbers — factoring in the magnitude
          of savings relative to the risks and costs of refinancing. For federal loan holders, a prominent
          warning reminds you of the protections you would permanently lose by refinancing to a private lender.
        </p>

        {/* Understanding Student Loan Refinancing */}
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Understanding Student Loan Refinancing</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          Student loan refinancing replaces your existing loan(s) with a new private loan at (ideally) a lower
          interest rate. This can save thousands of dollars over the life of your loan and reduce your monthly
          payment. However, refinancing is not right for everyone — especially federal loan borrowers who
          benefit from income-driven repayment plans, Public Service Loan Forgiveness, or federal forbearance.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          Student loan debt affects over 43 million Americans, with an average balance exceeding $37,000.
          For borrowers with private loans or high interest rates (above 5-6%), refinancing can be a
          straightforward way to save money. For federal loan holders, the decision requires careful
          weighing of financial savings against the loss of federal protections. Our calculator helps
          you see both sides clearly.
        </p>

        {/* Financial Glossary */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Key Student Loan Terms</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-2 pr-4 font-semibold text-slate-900 dark:text-white">Term</th>
                  <th className="text-left py-2 font-semibold text-slate-900 dark:text-white">Definition</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-400">
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Refinancing</td>
                  <td className="py-2.5">Replacing existing loan(s) with a new loan, ideally at a lower interest rate. Creates a brand new loan agreement with a private lender.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">IDR Plans</td>
                  <td className="py-2.5">Income-Driven Repayment plans cap federal loan payments at 10-20% of discretionary income, with forgiveness after 20-25 years.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">PSLF</td>
                  <td className="py-2.5">Public Service Loan Forgiveness — forgives remaining federal loan balance tax-free after 120 qualifying payments while working for government or nonprofits.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Forbearance</td>
                  <td className="py-2.5">Temporary pause on loan payments during financial hardship. Available for federal loans; rarely offered by private lenders.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Break-Even Point</td>
                  <td className="py-2.5">The number of months until your cumulative monthly savings from refinancing exceed any upfront refinancing fees paid.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Origination Fee</td>
                  <td className="py-2.5">A one-time fee charged by some lenders to process a refinance. Typically 0-2% of the loan amount. Factor this into your break-even calculation.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Expert Tips */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Expert Tips for Student Loan Refinancing</h2>
          <ol className="space-y-3">
            {[
              { title: 'Never refinance if you qualify for PSLF', tip: 'If you work for a government or nonprofit employer, Public Service Loan Forgiveness forgives your remaining balance after 120 payments. Refinancing makes you permanently ineligible — this could cost you tens of thousands in forgiveness.' },
              { title: 'Refinance private loans first', tip: 'Private student loans lack federal protections anyway, making them ideal candidates for refinancing. If you can drop the rate by even 1%, the savings add up significantly over 10+ years.' },
              { title: 'Compare at least 3-5 lenders', tip: 'Rates and terms vary significantly between lenders. Most offer rate checks with a soft credit pull that does not affect your credit score. Comparing multiple offers takes 30 minutes and can save thousands.' },
              { title: 'Consider shortening your term', tip: 'If your budget allows, refinancing into a shorter term (e.g., 5 years instead of 10) dramatically reduces total interest paid. Even if the monthly payment is higher, the interest savings are often substantial.' },
              { title: 'Build an emergency fund first', tip: 'Before committing to private refinanced payments, ensure you have 3-6 months of expenses saved. Private lenders offer limited forbearance compared to federal programs — if your income drops, you still owe the full payment.' },
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div><strong className="text-slate-700 dark:text-slate-300">{item.title}:</strong> {item.tip}</div>
              </li>
            ))}
          </ol>
        </div>

        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Student Loan Refinance FAQ</h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <details key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group">
              <summary className="p-5 cursor-pointer font-medium text-slate-800 dark:text-slate-200 text-sm flex justify-between items-center gap-3 list-none hover:text-violet-600 dark:hover:text-violet-400 transition-colors">{q}<span className="text-slate-400 group-open:rotate-45 transition-transform shrink-0 text-lg leading-none">+</span></summary>
              <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">{a}</div>
            </details>
          ))}
        </div>
        <p className="mt-8 text-xs text-slate-400 leading-relaxed"><strong>Disclaimer:</strong> Results are estimates for educational purposes only. Refinancing federal loans removes important borrower protections. Consult a student loan specialist before refinancing.</p>
      </section>

      <RelatedTools currentSlug="student-loan" />
    </>
  );
}
