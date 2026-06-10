import type { Metadata } from 'next';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import {
  generateToolMetadata, generateFaqSchema, generateToolSchema,
  generateHowToSchema, generateBreadcrumbSchema, SITE_URL,
} from '@/lib/seo';
import { SIPCalculator } from './SIPCalculator';

export const metadata: Metadata = generateToolMetadata('sip-calculator');

const FAQ_ITEMS = [
  { q: 'What is a SIP calculator?', a: 'A SIP calculator projects the future value of regular monthly investments in mutual funds or other assets. Enter your monthly SIP amount, expected annual return, and investment period to see maturity corpus, total invested, and wealth gained from compounding.' },
  { q: 'How is SIP return calculated?', a: 'SIP returns use compound interest on monthly contributions. Each month your investment earns returns, and subsequent SIPs add to the growing corpus. The formula accounts for payments at the end of each month: FV = P × [((1 + r)^n − 1) / r].' },
  { q: 'What is a good SIP return assumption?', a: 'For equity mutual funds in India, 10-12% long-term annual return is a common planning assumption. Debt funds may return 6-8%. Use conservative estimates for planning — actual returns vary with market conditions.' },
  { q: 'What is SIP step-up?', a: 'SIP step-up means increasing your monthly investment each year — typically when your salary rises. A 10% annual step-up can significantly boost your final corpus compared to a flat SIP amount.' },
];

export default function SIPCalculatorPage() {
  const schemas = [
    generateToolSchema('sip-calculator'),
    generateFaqSchema(FAQ_ITEMS),
    generateHowToSchema({
      name: 'How to Use the SIP Calculator',
      description: 'Calculate systematic investment plan returns with optional annual step-up.',
      steps: [
        { name: 'Enter monthly SIP', text: 'Input the amount you invest each month.' },
        { name: 'Set expected return', text: 'Enter your expected annual return percentage.' },
        { name: 'Choose tenure', text: 'Select how many years you will continue the SIP.' },
        { name: 'Add step-up (optional)', text: 'Enter annual percentage increase in SIP amount.' },
        { name: 'Review results', text: 'See maturity corpus, breakdown table, and growth chart.' },
      ],
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Investing & FIRE', url: `${SITE_URL}/category/investing` },
      { name: 'SIP Calculator', url: `${SITE_URL}/tools/sip-calculator` },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, i) => schema && (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <Breadcrumb items={[
        { label: 'Investing & FIRE', href: '/category/investing' },
        { label: 'SIP Calculator', href: '/tools/sip-calculator' },
      ]} />

      <section className="bg-gradient-to-b from-amber-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-sm font-medium mb-4">
            Tool 6 of 9
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            SIP Calculator — Systematic Investment Plan Returns
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Project mutual fund SIP returns with optional annual step-up. See maturity corpus,
            total invested, and wealth gained — free, private, instant.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6"><AdSlotLeaderboard className="mt-6" /></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><SIPCalculator /></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6"><AdSlotInContent /></div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">SIP Calculator FAQ</h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <details key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group">
              <summary className="p-5 cursor-pointer font-medium text-slate-800 dark:text-slate-200 text-sm flex justify-between items-center gap-3 list-none hover:text-amber-600 transition-colors">
                {q}<span className="text-slate-400 group-open:rotate-45 transition-transform shrink-0 text-lg">+</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">{a}</div>
            </details>
          ))}
        </div>
        <p className="mt-8 text-xs text-slate-400"><strong>Disclaimer:</strong> SIP projections are illustrative. Mutual fund returns are not guaranteed. Consult a SEBI-registered advisor before investing.</p>
      </section>

      <RelatedTools currentSlug="sip-calculator" heading="Related Calculators" />
    </>
  );
}
