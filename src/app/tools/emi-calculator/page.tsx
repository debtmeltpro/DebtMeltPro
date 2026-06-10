import type { Metadata } from 'next';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import {
  generateToolMetadata, generateFaqSchema, generateToolSchema,
  generateBreadcrumbSchema, SITE_URL,
} from '@/lib/seo';
import { EMICalculator } from './EMICalculator';

export const metadata: Metadata = generateToolMetadata('emi-calculator');

const FAQ_ITEMS = [
  { q: 'How is EMI calculated?', a: 'EMI uses the standard amortization formula: EMI = P × r × (1+r)^n / [(1+r)^n − 1], where P is principal, r is monthly interest rate, and n is tenure in months. This is the same formula banks use for home, car, and personal loans.' },
  { q: 'What is a good EMI to income ratio?', a: 'Lenders typically prefer total EMIs below 40-50% of net monthly income. Keeping EMIs under 35% leaves room for savings and unexpected expenses.' },
  { q: 'Does EMI include insurance or fees?', a: 'This calculator shows principal and interest EMI only. Banks may add insurance premiums or processing fees separately. Ask your lender for the all-in monthly obligation.' },
];

export default function EMICalculatorPage() {
  const faqSchema = generateFaqSchema(FAQ_ITEMS);
  const toolSchema = generateToolSchema('emi-calculator');
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Loans & EMI', url: `${SITE_URL}/category/loans` },
    { name: 'EMI Calculator', url: `${SITE_URL}/tools/emi-calculator` },
  ]);

  return (
    <>
      {toolSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumb items={[
        { label: 'Loans & EMI', href: '/category/loans' },
        { label: 'EMI Calculator', href: '/tools/emi-calculator' },
      ]} />

      <section className="bg-gradient-to-b from-indigo-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4">Tool 7 of 9</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">EMI Calculator — Loan Monthly Payment</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Calculate EMI for home, car, or personal loans. See monthly payment, total interest, and amortization breakdown instantly.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6"><AdSlotLeaderboard className="mt-6" /></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><EMICalculator /></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6"><AdSlotInContent /></div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">EMI Calculator FAQ</h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <details key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group">
              <summary className="p-5 cursor-pointer font-medium text-sm list-none flex justify-between hover:text-indigo-600">{q}<span className="text-slate-400 group-open:rotate-45">+</span></summary>
              <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-3">{a}</div>
            </details>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="emi-calculator" heading="Related Calculators" />
    </>
  );
}
