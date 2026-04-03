import type { Metadata } from 'next';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import { generateToolMetadata, generateFaqSchema, generateToolSchema, generateHowToSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import { CompoundCalculator } from './CompoundCalculator';

export const metadata: Metadata = generateToolMetadata('compound-interest');

const FAQ_ITEMS = [
  { q: 'What is the FIRE movement?', a: 'FIRE (Financial Independence, Retire Early) is a lifestyle movement focused on aggressive saving and investing to achieve financial independence — the point at which your investments generate enough passive income to cover your living expenses permanently.' },
  { q: 'How is the FIRE number calculated?', a: 'Your FIRE number is calculated by dividing your annual expenses by your safe withdrawal rate. Using the 4% rule, multiply your annual expenses by 25. Example: $50,000/year in expenses × 25 = $1,250,000 FIRE number.' },
  { q: 'Is the 4% rule still valid?', a: 'The 4% rule comes from the Trinity Study (1998) and has historically held up over 30-year retirement periods. For longer retirements (40-50 years), many FIRE practitioners use 3-3.5% to be conservative. Adjust the withdrawal rate slider to model different scenarios.' },
  { q: 'What does inflation adjustment mean?', a: "When inflation is toggled on, the calculator shows your future balance in today's purchasing power (real dollars). For example, $2M in 30 years at 3% inflation is equivalent to about $820,000 in today's money." },
  { q: 'How does compound interest work?', a: 'Compound interest means you earn interest on your interest. Each month, returns are calculated on your total balance (original investment + accumulated growth), creating exponential growth over time. Starting early is the single biggest advantage.' },
  { q: 'What is the difference between Lean FIRE, Regular FIRE, and Fat FIRE?', a: 'Lean FIRE targets minimal annual spending (under $40,000/year for a couple), requiring a smaller portfolio but tighter lifestyle. Regular FIRE targets moderate spending ($40,000-$100,000). Fat FIRE targets comfortable or luxury spending ($100,000+), requiring a larger portfolio but allowing a more traditional lifestyle in retirement.' },
  { q: 'What rate of return should I assume?', a: 'The US stock market has returned approximately 10% annually before inflation, or about 7% after inflation, over long periods. A diversified portfolio of stocks and bonds might return 6-8% annually. Use conservative estimates for planning — it is better to arrive early than to plan on optimistic returns and fall short.' },
  { q: 'Should I include my home equity in my FIRE number?', a: 'Generally no. Your primary residence does not generate income to cover living expenses unless you plan to sell or downsize. Include only investable assets — retirement accounts (401k, IRA), brokerage accounts, and other income-producing investments.' },
  { q: 'How much should I save each month to reach FIRE?', a: 'The more you save, the faster you reach FIRE. Saving 50% of your income can lead to financial independence in about 17 years. Saving 65% can get you there in roughly 10 years. Use this calculator to model your specific savings rate and see your projected FIRE date.' },
  { q: 'What are the biggest risks to a FIRE plan?', a: 'Sequence of returns risk (a market crash early in retirement), unexpected healthcare costs, rising inflation beyond historical norms, and lifestyle creep are the main threats. Building a buffer beyond your FIRE number (aiming for 28-30× expenses instead of 25×) provides additional safety margin.' },
];

export default function CompoundPage() {
  const toolSchema = generateToolSchema('compound-interest');
  const faqSchema = generateFaqSchema(FAQ_ITEMS);
  const howToSchema = generateHowToSchema({
    name: 'How to Use the FIRE Calculator',
    description: 'Calculate your FIRE number, project compound investment growth, and find your financial independence date with inflation-adjusted returns.',
    steps: [
      { name: 'Enter your current portfolio', text: 'Input your current total invested assets — 401(k), IRA, brokerage accounts, etc.' },
      { name: 'Set monthly contributions', text: 'Enter how much you invest each month. Include employer matching if applicable.' },
      { name: 'Set expected return and inflation', text: 'Enter your expected annual return (historically 7-10% for stocks) and inflation rate (typically 2-3%).' },
      { name: 'Enter annual expenses', text: 'Input your annual living expenses to calculate your FIRE number (25× annual expenses using the 4% rule).' },
      { name: 'Review your FIRE timeline', text: 'See when your projected portfolio crosses your FIRE number — that is your financial independence date.' },
    ],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Investing & FIRE', url: `${SITE_URL}/category/investing` },
    { name: 'FIRE Calculator', url: `${SITE_URL}/tools/compound-interest` },
  ]);

  return (
    <>
      {toolSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumb items={[
        { label: 'Investing & FIRE', href: '/category/investing' },
        { label: 'FIRE Calculator', href: '/tools/compound-interest' },
      ]} />

      <section className="bg-gradient-to-b from-orange-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-sm font-medium mb-4">
            Tool 3 of 5
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Compound Interest & FIRE Calculator
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Project your investment growth, calculate your FIRE number, and find when your portfolio
            can sustain your lifestyle indefinitely — with inflation-adjusted real returns. No sign-up required.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6"><AdSlotLeaderboard className="mt-6" /></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CompoundCalculator />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6"><AdSlotInContent /></div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">How This Calculator Works</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          Our FIRE calculator uses standard compound interest formulas to project your investment growth over time.
          Enter your current portfolio value, monthly contribution, expected annual return, and time horizon to see
          your projected balance at each year. Toggle inflation adjustment to view results in today&apos;s purchasing power,
          giving you a realistic picture of how much your future portfolio can actually buy.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          The FIRE number calculation divides your annual expenses by your chosen safe withdrawal rate (defaulting
          to the 4% rule from the Trinity Study). The calculator then shows exactly when your projected portfolio
          reaches this target — your financial independence date.
        </p>

        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">Who Should Use This Calculator</h2>
        <ul className="space-y-2 mb-6">
          {[
            'Anyone curious about the power of compound interest over long time horizons',
            'FIRE movement followers calculating their financial independence timeline',
            'Investors comparing the impact of different contribution amounts or return assumptions',
            'Pre-retirees validating whether their portfolio can sustain their planned withdrawals',
            'Financial advisors modeling scenarios for client retirement planning',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span className="text-orange-500 mt-0.5 shrink-0">•</span>{item}
            </li>
          ))}
        </ul>

        {/* What is a FIRE Number? */}
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">What Is a FIRE Number and Why Does It Matter?</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          Your FIRE number is the total investment portfolio value needed to sustain your lifestyle indefinitely
          without active employment income. It is calculated using the widely-studied safe withdrawal rate from
          the Trinity Study — typically 4% — which means your FIRE number equals 25 times your annual expenses.
          For example, if you spend $60,000 per year, your FIRE number is $1,500,000.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          The concept is powerful because it gives you a concrete target to work toward. Unlike vague retirement
          goals, your FIRE number is specific, measurable, and directly tied to your actual spending habits.
          Reducing your expenses by even $5,000 per year lowers your FIRE number by $125,000 — making the goal
          significantly more achievable. Our calculator helps you visualize the compound growth path to this target.
        </p>

        {/* Financial Glossary */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Key Investment and FIRE Terms</h2>
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
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">FIRE Number</td>
                  <td className="py-2.5">The portfolio size needed to cover your expenses forever. Equals 25× annual expenses at a 4% withdrawal rate.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Safe Withdrawal Rate</td>
                  <td className="py-2.5">The percentage of your portfolio you can withdraw annually with a high probability of never running out. The 4% rule is the most common benchmark.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Compound Interest</td>
                  <td className="py-2.5">Earning returns on your accumulated returns, creating exponential growth. The earlier you start, the more powerful compounding becomes.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Real vs Nominal Returns</td>
                  <td className="py-2.5">Nominal returns are before inflation adjustment. Real returns subtract inflation, showing actual purchasing power growth (typically 3% lower).</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Savings Rate</td>
                  <td className="py-2.5">The percentage of your income you save and invest. A 50% savings rate leads to FIRE in roughly 17 years; 25% takes about 32 years.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-slate-700 dark:text-slate-300">Sequence of Returns Risk</td>
                  <td className="py-2.5">The risk that poor market returns in the early years of retirement permanently deplete your portfolio, even if long-term averages are fine.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Expert Tips */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Expert Tips for Reaching Financial Independence</h2>
          <ol className="space-y-3">
            {[
              { title: 'Start investing today — not tomorrow', tip: 'Compound interest rewards time more than anything else. Investing $500/month starting at age 25 beats $1,000/month starting at 35, assuming 7% returns. Every year of delay costs you exponentially.' },
              { title: 'Optimize your savings rate', tip: 'Your savings rate is the most powerful lever for reaching FIRE. Cutting $500/month in expenses both increases your savings and lowers your FIRE number by $150,000 — a double benefit.' },
              { title: 'Use tax-advantaged accounts first', tip: 'Maximize 401(k) employer matching (free money), then fill your Roth IRA ($7,000/year limit in 2024), then return to your 401(k), and finally use taxable brokerage accounts for additional savings.' },
              { title: 'Keep investment fees below 0.2%', tip: 'High-fee actively managed funds rarely beat low-cost index funds over long periods. A 1% fee difference can cost you hundreds of thousands over a 30-year investing career.' },
              { title: 'Build a flexible withdrawal strategy', tip: 'Instead of rigidly withdrawing 4% every year, plan to reduce spending during market downturns. This variable withdrawal approach dramatically improves portfolio survival rates over very long retirements.' },
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div><strong className="text-slate-700 dark:text-slate-300">{item.title}:</strong> {item.tip}</div>
              </li>
            ))}
          </ol>
        </div>

        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">FIRE Calculator FAQ</h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <details key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group">
              <summary className="p-5 cursor-pointer font-medium text-slate-800 dark:text-slate-200 text-sm flex justify-between items-center gap-3 list-none hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                {q}
                <span className="text-slate-400 group-open:rotate-45 transition-transform shrink-0 text-lg leading-none">+</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">{a}</div>
            </details>
          ))}
        </div>
        <p className="mt-8 text-xs text-slate-400 leading-relaxed">
          <strong>Disclaimer:</strong> FIRE projections are illustrative only. Past investment returns do not guarantee future performance. Consult a Certified Financial Planner (CFP) before making retirement decisions.
        </p>
      </section>

      <RelatedTools currentSlug="compound-interest" />
    </>
  );
}
