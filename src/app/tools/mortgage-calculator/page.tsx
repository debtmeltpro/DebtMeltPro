import type { Metadata } from 'next';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import { generateToolMetadata, generateFaqSchema, generateToolSchema, generateHowToSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import dynamic from 'next/dynamic';

export const metadata: Metadata = generateToolMetadata('mortgage-calculator');

const MortgageCalculator = dynamic(
  () => import('./MortgageCalculator').then((m) => m.MortgageCalculator),
  { ssr: false },
);

const FAQ_ITEMS = [
  { q: 'What costs does this calculator include?', a: 'This calculator includes mortgage principal and interest, property tax (as % of home value), home maintenance (typically 1-2% of value annually), homeowners insurance, HOA fees, and the opportunity cost of your down payment — what you could have earned by investing it instead.' },
  { q: 'What is the opportunity cost of a down payment?', a: 'If you put $60,000 down on a home, that money is no longer available for investment. The opportunity cost is what that $60,000 would have grown to in a diversified investment portfolio over your analysis period. This is a hidden cost of homeownership often overlooked.' },
  { q: 'How does home appreciation affect the calculation?', a: 'Home appreciation increases your equity over time, which is a key financial benefit of buying. Historically, US homes have appreciated at 3-4% annually on average. Higher appreciation favors buying; lower appreciation favors renting.' },
  { q: 'What is the mortgage interest tax deduction?', a: 'Homeowners who itemize deductions can deduct mortgage interest from taxable income. Enter your marginal tax rate and the calculator will estimate this benefit. Note: since the 2017 Tax Cuts and Jobs Act raised the standard deduction, fewer homeowners benefit from itemizing.' },
  { q: 'How long should I plan to stay before buying makes sense?', a: 'Generally, buying becomes financially advantageous after 5-7 years in the same home, though this varies widely by market. Use the break-even year in our results to see your specific number. Transaction costs (closing costs, agent fees) need time to be recouped.' },
  { q: 'What is PMI and how does it affect my costs?', a: 'Private mortgage insurance (PMI) is required when your down payment is less than 20% of the home price. PMI typically costs 0.5-1% of the loan amount annually and is added to your monthly payment until you reach 20% equity. This can add $100-$300/month to your housing costs.' },
  { q: 'Should I get a 15-year or 30-year mortgage?', a: 'A 15-year mortgage has higher monthly payments but a lower interest rate (typically 0.5-0.75% less) and you pay far less total interest. A 30-year mortgage offers lower monthly payments and more cash flow flexibility. Choose based on your income stability and other financial goals.' },
  { q: 'How much house can I afford?', a: 'Financial advisors recommend the 28/36 rule: spend no more than 28% of gross income on housing costs (mortgage, taxes, insurance) and no more than 36% on all debt payments combined. Going beyond these ratios increases financial stress and risk.' },
  { q: 'What are closing costs and how much should I expect?', a: 'Closing costs typically range from 2-5% of the purchase price and include lender fees, appraisal, title insurance, attorney fees, and prepaid items like property taxes and insurance. On a $300,000 home, expect $6,000-$15,000 in closing costs.' },
  { q: 'Is renting really throwing money away?', a: 'No — this is one of the most persistent myths in personal finance. Renters who invest the difference between renting and buying costs (including down payment) often build comparable or greater wealth. Our calculator shows you the exact comparison for your specific situation.' },
];

export default function MortgagePage() {
  const toolSchema = generateToolSchema('mortgage-calculator');
  const faqSchema = generateFaqSchema(FAQ_ITEMS);
  const howToSchema = generateHowToSchema({
    name: 'How to Use the Rent vs Buy Calculator',
    description: 'Compare the true total cost of renting versus buying a home, including hidden costs like opportunity cost, maintenance, and property taxes.',
    steps: [
      { name: 'Enter home purchase details', text: 'Input the home price, down payment amount, mortgage rate, and loan term. Include property tax rate and expected home appreciation.' },
      { name: 'Add ownership costs', text: 'Enter annual maintenance costs (typically 1-2% of home value), homeowners insurance, and any HOA fees.' },
      { name: 'Enter rental details', text: 'Input your current or expected monthly rent and the expected annual rent increase (typically 3-5%).' },
      { name: 'Set investment assumptions', text: 'Enter the expected return on investments. This is used to calculate the opportunity cost of your down payment and the growth of rental savings.' },
      { name: 'Review the comparison', text: 'Study the total cost breakdown for renting vs buying over your chosen time period. Check the break-even year to see when buying becomes cheaper.' },
    ],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Home Buying', url: `${SITE_URL}/category/home-buying` },
    { name: 'Rent vs Buy Calculator', url: `${SITE_URL}/tools/mortgage-calculator` },
  ]);

  return (
    <>
      {toolSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">How This Calculator Works</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          Unlike basic mortgage calculators that only compare monthly payments, our Rent vs. Buy calculator
          performs a comprehensive total cost analysis over your chosen time horizon. It factors in mortgage
          principal and interest, property taxes, homeowners insurance, maintenance costs, HOA fees, and
          the often-overlooked opportunity cost of your down payment — what that money could earn if invested instead.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          On the renting side, the calculator models rent increases over time, renter&apos;s insurance, and
          the investment growth of both the saved down payment and any monthly cost difference. The result
          is a true net worth comparison that shows exactly which option builds more wealth over 5, 10, 20,
          or 30 years in your specific market.
        </p>

        {/* What is a Rent vs Buy Calculator? */}
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Why Most Rent vs Buy Calculators Get It Wrong</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          The biggest mistake in the rent-vs-buy debate is comparing your monthly rent to a monthly mortgage
          payment and calling it a day. This oversimplification ignores dozens of hidden costs and benefits
          on both sides. Homeownership carries ongoing costs that tenants never pay — property taxes, maintenance
          and repairs (typically 1-2% of home value per year), homeowners insurance, and potentially HOA fees
          and PMI. These can add 30-50% on top of your raw mortgage payment.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          On the flip side, renters rarely account for the fact that their "saved" down payment could be
          growing in the stock market. A $60,000 down payment invested at 7% average returns grows to over
          $230,000 in 20 years. Our calculator captures all of these factors to give you the complete,
          unbiased financial picture.
        </p>

        {/* Financial Glossary */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Key Home Buying Terms</h2>
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
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Down Payment</td>
                  <td className="py-2.5">The upfront cash payment for a home purchase, typically 3-20% of the purchase price. Putting down 20% avoids PMI.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">PMI</td>
                  <td className="py-2.5">Private Mortgage Insurance — required when your down payment is less than 20%. Adds 0.5-1% of the loan amount annually to your costs.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Equity</td>
                  <td className="py-2.5">The portion of your home you actually own (home value minus remaining mortgage). Equity grows through principal payments and home appreciation.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Opportunity Cost</td>
                  <td className="py-2.5">The potential investment returns you give up when using money for a down payment instead of investing it in the market.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Break-Even Point</td>
                  <td className="py-2.5">The number of years you need to stay in a home before buying becomes cheaper than renting, after accounting for all costs.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Closing Costs</td>
                  <td className="py-2.5">One-time fees at purchase (2-5% of price) including lender fees, appraisal, title insurance, attorney fees, and prepaid taxes/insurance.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Expert Tips */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Expert Tips for the Rent vs Buy Decision</h2>
          <ol className="space-y-3">
            {[
              { title: 'Use the 5-year rule', tip: 'If you plan to stay in an area for less than 5 years, renting almost always wins. Transaction costs (6% agent fees + 2-5% closing costs) eat into equity gains in short timeframes.' },
              { title: 'Factor in the hidden costs of ownership', tip: 'Budget 1-2% of your home value annually for maintenance and repairs. A $400,000 home needs $4,000-$8,000/year for upkeep. Many first-time buyers underestimate this significantly.' },
              { title: 'Don\'t stretch to the maximum approval', tip: 'Just because a lender approves you for $500,000 does not mean you should borrow that much. Keep total housing costs under 28% of gross income to maintain financial flexibility and reduce stress.' },
              { title: 'Shop mortgage rates aggressively', tip: 'A 0.25% rate difference on a $300,000 30-year mortgage saves over $15,000 in interest. Get at least 3-5 quotes from different lenders before committing.' },
              { title: 'Consider the lifestyle trade-offs', tip: 'Renting offers flexibility (easy relocation, no maintenance burden). Homeownership offers stability and customization. The best financial choice also depends on your life plans and preferences.' },
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div><strong className="text-slate-700 dark:text-slate-300">{item.title}:</strong> {item.tip}</div>
              </li>
            ))}
          </ol>
        </div>

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
