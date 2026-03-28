import type { Metadata } from 'next';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import { generateToolMetadata, generateFaqSchema, generateToolSchema } from '@/lib/seo';
import { MortgageCalculator } from './MortgageCalculator';

export const metadata: Metadata = generateToolMetadata('mortgage-calculator');

const FAQ_ITEMS = [
  { q: 'What costs does this calculator include?', a: 'This calculator includes mortgage principal and interest, property tax (as % of home value), home maintenance (typically 1-2% of value annually), homeowners insurance, HOA fees, and the opportunity cost of your down payment — what you could have earned by investing it instead.' },
  { q: 'What is the opportunity cost of a down payment?', a: 'If you put $60,000 down on a home, that money is no longer available for investment. The opportunity cost is what that $60,000 would have grown to in a diversified investment portfolio over your analysis period. This is a hidden cost of homeownership often overlooked.' },
  { q: 'How does home appreciation affect the calculation?', a: 'Home appreciation increases your equity over time, which is a key financial benefit of buying. Historically, US homes have appreciated at 3-4% annually on average. Higher appreciation favors buying; lower appreciation favors renting.' },
  { q: 'What is the mortgage interest tax deduction?', a: 'Homeowners who itemize deductions can deduct mortgage interest from taxable income. Enter your marginal tax rate and the calculator will estimate this benefit. Note: since the 2017 Tax Cuts and Jobs Act raised the standard deduction, fewer homeowners benefit from itemizing.' },
  { q: 'How long should I plan to stay before buying makes sense?', a: 'Generally, buying becomes financially advantageous after 5-7 years in the same home, though this varies widely by market. Use the break-even year in our results to see your specific number. Transaction costs (closing costs, agent fees) need time to be recouped.' },
];

export default function MortgagePage() {
  const toolSchema = generateToolSchema('mortgage-calculator');
  const faqSchema = generateFaqSchema(FAQ_ITEMS);

  return (
    <>
      {toolSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb items={[
        { label: 'Home Buying', href: '/category/home-buying' },
        { label: 'Rent vs Buy Calculator', href: '/tools/mortgage-calculator' },
      ]} />

      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">Tool 2 of 5</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">Rent vs. Buy Calculator — True Cost of Homeownership</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Go beyond the monthly payment. Compare the true 10–30 year cost of renting vs. buying, including maintenance, taxes, and the opportunity cost of locking capital in a down payment.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6"><AdSlotLeaderboard className="mt-6" /></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><MortgageCalculator /></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6"><AdSlotInContent /></div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Rent vs. Buy FAQ</h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <details key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group">
              <summary className="p-5 cursor-pointer font-medium text-slate-800 dark:text-slate-200 text-sm flex justify-between items-center gap-3 list-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{q}<span className="text-slate-400 group-open:rotate-45 transition-transform shrink-0 text-lg leading-none">+</span></summary>
              <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">{a}</div>
            </details>
          ))}
        </div>
        <p className="mt-8 text-xs text-slate-400 leading-relaxed"><strong>Disclaimer:</strong> Results are estimates. Real estate markets vary by location. Consult a licensed real estate agent and financial advisor before making a home purchase decision.</p>
      </section>

      <RelatedTools currentSlug="mortgage-calculator" />
    </>
  );
}
