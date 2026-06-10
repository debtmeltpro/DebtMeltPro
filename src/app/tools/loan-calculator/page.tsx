import type { Metadata } from 'next';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import { generateToolMetadata, generateFaqSchema, generateToolSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import { LoanCalculator } from './LoanCalculator';

export const metadata: Metadata = generateToolMetadata('loan-calculator');

const FAQ_ITEMS = [
  { q: 'What is a loan amortization schedule?', a: 'An amortization schedule shows each monthly payment split into principal and interest, plus the remaining balance after each payment. Early payments are mostly interest; later payments are mostly principal.' },
  { q: 'How do extra payments affect my loan?', a: 'Extra payments go directly toward principal, reducing future interest charges and shortening the loan term. Even small monthly prepayments can save thousands over a 30-year mortgage.' },
  { q: 'Is this the same as an EMI calculator?', a: 'This loan calculator includes full amortization and prepayment modeling. Our EMI calculator gives a faster monthly payment estimate — use both depending on how much detail you need.' },
];

export default function LoanCalculatorPage() {
  const toolSchema = generateToolSchema('loan-calculator');
  const faqSchema = generateFaqSchema(FAQ_ITEMS);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Loans & EMI', url: `${SITE_URL}/category/loans` },
    { name: 'Loan Calculator', url: `${SITE_URL}/tools/loan-calculator` },
  ]);

  return (
    <>
      {toolSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumb items={[
        { label: 'Loans & EMI', href: '/category/loans' },
        { label: 'Loan Calculator', href: '/tools/loan-calculator' },
      ]} />

      <section className="bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 text-sm font-medium mb-4">Tool 8 of 9</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">Loan Calculator — Amortization & Prepayment</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Full loan amortization schedule with prepayment modeling. See how extra payments reduce interest and shorten your loan term.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6"><AdSlotLeaderboard className="mt-6" /></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><LoanCalculator /></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6"><AdSlotInContent /></div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Loan Calculator FAQ</h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <details key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group">
              <summary className="p-5 cursor-pointer font-medium text-sm list-none flex justify-between hover:text-sky-600">{q}<span className="text-slate-400 group-open:rotate-45">+</span></summary>
              <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-3">{a}</div>
            </details>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="loan-calculator" heading="Related Calculators" />
    </>
  );
}
