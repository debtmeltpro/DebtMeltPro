import type { Metadata } from 'next';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import { generateToolMetadata, generateFaqSchema, generateToolSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import { CreditCardInterestCalculator } from './CreditCardInterestCalculator';

export const metadata: Metadata = generateToolMetadata('credit-card-interest');

const FAQ_ITEMS = [
  { q: 'How is credit card interest calculated?', a: 'Most issuers use average daily balance method. Monthly interest ≈ balance × (APR ÷ 12). Daily interest ≈ balance × (APR ÷ 365). Interest compounds monthly when you carry a balance.' },
  { q: 'Why does my payment barely reduce my balance?', a: 'If your monthly payment is close to the interest charge, almost nothing goes to principal. On a $5,000 balance at 23% APR, interest is about $96/month — a $100 payment only reduces principal by $4.' },
  { q: 'How is this different from the Credit Card Payoff Calculator?', a: 'This tool focuses on interest cost (daily, monthly, annual) and payoff at a fixed payment. The Payoff Optimizer compares minimum-payment trap vs optimized fixed payments side by side.' },
];

export default function CreditCardInterestPage() {
  const toolSchema = generateToolSchema('credit-card-interest');
  const faqSchema = generateFaqSchema(FAQ_ITEMS);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Debt Management', url: `${SITE_URL}/category/debt-management` },
    { name: 'Credit Card Interest Calculator', url: `${SITE_URL}/tools/credit-card-interest` },
  ]);

  return (
    <>
      {toolSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumb items={[
        { label: 'Debt Management', href: '/category/debt-management' },
        { label: 'Credit Card Interest', href: '/tools/credit-card-interest' },
      ]} />

      <section className="bg-gradient-to-b from-rose-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-sm font-medium mb-4">Tool 9 of 9</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">Credit Card Interest Calculator</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">See daily, monthly, and annual interest on your credit card balance — plus total interest paid over your payoff timeline.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6"><AdSlotLeaderboard className="mt-6" /></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><CreditCardInterestCalculator /></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6"><AdSlotInContent /></div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Credit Card Interest FAQ</h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <details key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group">
              <summary className="p-5 cursor-pointer font-medium text-sm list-none flex justify-between hover:text-rose-600">{q}<span className="text-slate-400 group-open:rotate-45">+</span></summary>
              <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-3">{a}</div>
            </details>
          ))}
        </div>
      </section>
      <RelatedTools currentSlug="credit-card-interest" heading="Related Calculators" />
    </>
  );
}
