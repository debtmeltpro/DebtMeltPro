// ============================================================
// DebtFreedom — Reusable Prompt Utility System
// Every prompt page uses these helpers to ensure consistent
// metadata, schema markup, internal linking, and SEO.
//
// ADDING A NEW PROMPT:
//   1. Add to PROMPTS array below
//   2. Create page at /prompts/[category]/[slug]/page.tsx
//   3. Everything else (sitemap, nav, schema) auto-updates
// ============================================================

import type { Metadata } from 'next';

const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] || 'https://debtmeltpro.com';
const SITE_NAME = 'DebtFreedom';

// ─── Prompt Category Registry ────────────────────────────────

export interface PromptCategoryDef {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  keywords: string[];
  icon: string;
  color: string;
  gradient: string;
}

export const PROMPT_CATEGORIES: PromptCategoryDef[] = [
  {
    slug: 'budgeting',
    title: 'Budgeting & Saving Prompts',
    shortTitle: 'Budgeting',
    metaTitle: 'Best AI Budgeting Prompts — ChatGPT & Claude Finance Prompts',
    metaDescription: 'Copy-paste AI prompts for budgeting, expense tracking, savings goals, and emergency fund planning. Works with ChatGPT, Claude, and Gemini.',
    description: 'AI prompts to help you create budgets, track expenses, build emergency funds, and automate your savings strategy.',
    keywords: ['budgeting prompts', 'AI budget planner', 'ChatGPT budget', 'savings prompts', 'expense tracking AI'],
    icon: 'Wallet',
    color: 'text-green-600 dark:text-green-400',
    gradient: 'from-green-50',
  },
  {
    slug: 'debt-payoff',
    title: 'Debt Payoff Prompts',
    shortTitle: 'Debt Payoff',
    metaTitle: 'AI Debt Payoff Prompts — Get Out of Debt Faster with ChatGPT',
    metaDescription: 'Powerful AI prompts for debt snowball plans, avalanche strategies, negotiation scripts, and payoff timelines. Free copy-paste prompts.',
    description: 'AI prompts to build debt payoff plans, compare strategies, negotiate with creditors, and track your debt-free journey.',
    keywords: ['debt payoff prompts', 'AI debt plan', 'ChatGPT debt help', 'debt negotiation prompts', 'snowball prompts'],
    icon: 'TrendingDown',
    color: 'text-red-600 dark:text-red-400',
    gradient: 'from-red-50',
  },
  {
    slug: 'investing',
    title: 'Investing & FIRE Prompts',
    shortTitle: 'Investing',
    metaTitle: 'Best AI Investing Prompts — Portfolio Analysis & FIRE Planning',
    metaDescription: 'AI prompts for investment analysis, portfolio allocation, FIRE number calculation, and retirement planning. Works with any AI assistant.',
    description: 'AI prompts for investment research, portfolio review, FIRE planning, and building long-term wealth strategies.',
    keywords: ['investing prompts', 'AI portfolio analysis', 'FIRE prompts', 'ChatGPT investing', 'retirement planning AI'],
    icon: 'TrendingUp',
    color: 'text-orange-600 dark:text-orange-400',
    gradient: 'from-orange-50',
  },
  {
    slug: 'credit-score',
    title: 'Credit Score & Credit Card Prompts',
    shortTitle: 'Credit Score',
    metaTitle: 'AI Credit Score Prompts — Improve Credit & Optimize Cards',
    metaDescription: 'AI prompts to analyze your credit report, dispute errors, choose the best credit cards, and build your credit score strategically.',
    description: 'AI prompts for credit score improvement, credit card optimization, dispute letters, and credit utilization strategies.',
    keywords: ['credit score prompts', 'AI credit repair', 'credit card prompts', 'ChatGPT credit', 'improve credit score AI'],
    icon: 'CreditCard',
    color: 'text-blue-600 dark:text-blue-400',
    gradient: 'from-blue-50',
  },
  {
    slug: 'real-estate',
    title: 'Real Estate & Mortgage Prompts',
    shortTitle: 'Real Estate',
    metaTitle: 'AI Real Estate Prompts — Rent vs Buy, Mortgage & Property Analysis',
    metaDescription: 'AI prompts for rent vs buy decisions, mortgage comparison, property investment analysis, and home buying negotiation. Free templates.',
    description: 'AI prompts for home buying decisions, mortgage analysis, rental property evaluation, and real estate negotiation.',
    keywords: ['real estate prompts', 'AI mortgage analysis', 'rent vs buy prompts', 'property investment AI', 'home buying prompts'],
    icon: 'Home',
    color: 'text-violet-600 dark:text-violet-400',
    gradient: 'from-violet-50',
  },
  {
    slug: 'tax-planning',
    title: 'Tax Planning & Optimization Prompts',
    shortTitle: 'Tax Planning',
    metaTitle: 'AI Tax Planning Prompts — Deductions, Filing & Tax Strategy',
    metaDescription: 'AI prompts for tax deduction analysis, filing preparation, tax-loss harvesting, and year-end tax planning strategies.',
    description: 'AI prompts to identify tax deductions, plan quarterly payments, optimize filing strategy, and reduce your tax burden legally.',
    keywords: ['tax planning prompts', 'AI tax deductions', 'ChatGPT tax help', 'tax optimization AI', 'tax filing prompts'],
    icon: 'Receipt',
    color: 'text-emerald-600 dark:text-emerald-400',
    gradient: 'from-emerald-50',
  },
];

// ─── Individual Prompt Registry ──────────────────────────────

export interface PromptDef {
  slug: string;
  category: string;          // matches PromptCategoryDef.slug
  title: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  keywords: string[];
  prompt: string;            // the actual prompt text
  exampleOutput: string;     // sample AI response snippet
  useCases: string[];        // who benefits
  tips: string[];            // pro tips for better results
  relatedToolSlug?: string;  // links to DebtFreedom calculator
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  aiModels: string[];        // which AI models work best
  isViral: boolean;          // featured/trending flag
  dateAdded: string;
  dateUpdated: string;
}

export const PROMPTS: PromptDef[] = [
  // ── Budgeting ───────────────────────────────────────────
  {
    slug: '50-30-20-budget-builder',
    category: 'budgeting',
    title: '50/30/20 Budget Builder',
    metaTitle: '50/30/20 Budget AI Prompt — Create Your Budget in 60 Seconds',
    metaDescription: 'Copy this AI prompt to instantly create a personalized 50/30/20 budget based on your income. Works with ChatGPT, Claude, and Gemini.',
    description: 'Generate a complete 50/30/20 budget breakdown with specific dollar amounts, category suggestions, and actionable savings tips.',
    keywords: ['50 30 20 budget prompt', 'AI budget generator', 'budget template ChatGPT', 'personal budget prompt'],
    prompt: `Act as a certified financial planner. I earn $[YOUR_MONTHLY_INCOME] per month after taxes. Create a detailed 50/30/20 budget for me:

**50% Needs ($[CALCULATE]):**
- List every essential expense category with suggested amounts
- Flag if any category seems too high for my income level

**30% Wants ($[CALCULATE]):**
- List discretionary spending categories with realistic amounts
- Suggest 2-3 areas where I could cut back painlessly

**20% Savings & Debt ($[CALCULATE]):**
- Emergency fund contribution (if I have less than 3 months saved)
- Debt payoff allocation (list by priority)
- Retirement/investment contribution

Also provide:
1. A weekly spending limit for variable expenses
2. One "money win" I can implement this week
3. A 90-day savings milestone to aim for

Format as a clean table I can reference daily.`,
    exampleOutput: 'Based on $5,000/month income: Needs = $2,500 (Rent $1,500, Groceries $400, Insurance $200, Utilities $150, Transport $250), Wants = $1,500 (Dining $300, Entertainment $200, Shopping $200...), Savings = $1,000 (Emergency Fund $400, Debt Payoff $350, 401k $250)...',
    useCases: [
      'First-time budgeters who need a starting framework',
      'Anyone switching from no budget to structured spending',
      'Couples aligning on shared financial goals',
      'Recent graduates starting their first job',
    ],
    tips: [
      'Replace $[YOUR_MONTHLY_INCOME] with your actual take-home pay',
      'Run it again with different income scenarios for raise planning',
      'Ask follow-up: "What if I have $X in credit card debt?"',
      'Combine with our Debt Payoff Calculator for the debt portion',
    ],
    relatedToolSlug: 'debt-payoff',
    difficulty: 'beginner',
    aiModels: ['ChatGPT', 'Claude', 'Gemini', 'Copilot'],
    isViral: true,
    dateAdded: '2024-06-01',
    dateUpdated: '2024-06-15',
  },
  {
    slug: 'emergency-fund-calculator-prompt',
    category: 'budgeting',
    title: 'Emergency Fund Strategy Builder',
    metaTitle: 'Emergency Fund AI Prompt — How Much You Really Need to Save',
    metaDescription: 'Use this AI prompt to calculate your ideal emergency fund size based on your actual expenses, job stability, and risk factors.',
    description: 'Get a personalized emergency fund target and a month-by-month savings plan to reach it.',
    keywords: ['emergency fund prompt', 'how much emergency fund', 'AI savings plan', 'emergency fund calculator'],
    prompt: `Act as a financial advisor. Help me calculate my ideal emergency fund and build a plan to reach it.

My situation:
- Monthly essential expenses: $[AMOUNT]
- Job type: [STABLE_SALARY / FREELANCE / COMMISSION / GIG_WORK]
- Number of income earners in household: [1 / 2]
- Do I have dependents? [YES_HOW_MANY / NO]
- Current emergency savings: $[AMOUNT]
- Monthly amount I can save: $[AMOUNT]

Please provide:
1. My recommended emergency fund target (explain why this number)
2. A month-by-month savings timeline to reach it
3. Where to keep the money (high-yield savings account recommendations)
4. Three mini-milestones to celebrate along the way
5. What counts as a real emergency (and what doesn't)
6. A "starter emergency fund" amount I should hit first ($1,000)

Be specific with dollar amounts, not percentages.`,
    exampleOutput: 'Based on $3,200/month essentials as a single-income freelancer with 1 dependent: Target = $19,200 (6 months). Current gap: $14,200. At $500/month savings: 28 months to full fund. Starter milestone: $1,000 in 2 months...',
    useCases: [
      'Anyone without 3-6 months of expenses saved',
      'Freelancers and gig workers with variable income',
      'New parents planning for increased financial responsibility',
      'People recovering from a financial emergency',
    ],
    tips: [
      'Be honest about essential vs discretionary expenses',
      'Freelancers should aim for 6-9 months, not just 3-6',
      'Ask follow-up: "What if I lose my job in 2 months?"',
    ],
    difficulty: 'beginner',
    aiModels: ['ChatGPT', 'Claude', 'Gemini'],
    isViral: true,
    dateAdded: '2024-06-05',
    dateUpdated: '2024-06-15',
  },

  // ── Debt Payoff ─────────────────────────────────────────
  {
    slug: 'debt-snowball-action-plan',
    category: 'debt-payoff',
    title: 'Debt Snowball Action Plan Generator',
    metaTitle: 'Debt Snowball AI Prompt — Create Your Complete Payoff Plan',
    metaDescription: 'Copy this AI prompt to generate a month-by-month debt snowball plan with exact payment amounts, payoff dates, and motivation milestones.',
    description: 'Generate a complete debt snowball action plan with prioritized payments, celebration milestones, and a visual payoff timeline.',
    keywords: ['debt snowball prompt', 'AI debt payoff plan', 'ChatGPT debt snowball', 'debt free plan generator'],
    prompt: `Act as a debt-free coach using the Dave Ramsey snowball method. Here are my debts:

[LIST EACH DEBT:]
- Name: [DEBT_NAME]
- Balance: $[AMOUNT]
- Interest Rate: [X]%
- Minimum Payment: $[AMOUNT]

Extra monthly amount I can throw at debt: $[AMOUNT]

Create my complete Debt Snowball Action Plan:

1. **Debt Attack Order** — List my debts from smallest to largest balance
2. **Month-by-Month Schedule** — Show exactly how much goes to each debt every month
3. **Payoff Dates** — When each debt hits $0
4. **Snowball Moments** — When each freed-up payment rolls to the next debt
5. **Total Interest Paid** — What this plan costs in interest
6. **Celebration Milestones** — Suggest a small reward for each debt eliminated
7. **Motivation Stats** — Total months to debt-free, total saved vs minimum payments

Format as an actionable timeline I can tape to my fridge.`,
    exampleOutput: 'ATTACK ORDER: 1) Medical Bill $800 (gone by Month 2), 2) Visa Card $2,400 (gone by Month 6), 3) Car Loan $8,000 (gone by Month 19)... MONTH 1: Medical $350 (min $50 + $300 extra), Visa $75 min, Car $195 min...',
    useCases: [
      'People with 3+ debts feeling overwhelmed',
      'Anyone who needs motivation and quick wins',
      'Couples creating a shared debt payoff plan',
      'Dave Ramsey followers wanting a detailed plan',
    ],
    tips: [
      'List ALL debts including medical bills and personal loans',
      'After generating, verify numbers with our Debt Payoff Calculator',
      'Ask follow-up: "What if I get a $2,000 tax refund?"',
      'Compare with avalanche: "Now show me the avalanche method order"',
    ],
    relatedToolSlug: 'debt-payoff',
    difficulty: 'beginner',
    aiModels: ['ChatGPT', 'Claude', 'Gemini', 'Copilot'],
    isViral: true,
    dateAdded: '2024-06-01',
    dateUpdated: '2024-06-20',
  },
  {
    slug: 'debt-negotiation-scripts',
    category: 'debt-payoff',
    title: 'Debt Negotiation Phone Scripts',
    metaTitle: 'AI Debt Negotiation Scripts — Lower Interest Rates & Settle Debt',
    metaDescription: 'Get word-for-word phone scripts to negotiate lower interest rates, waive fees, and settle debts for less. AI-generated negotiation templates.',
    description: 'Word-for-word scripts for calling creditors to lower interest rates, waive late fees, and negotiate debt settlements.',
    keywords: ['debt negotiation script', 'lower interest rate script', 'negotiate credit card rate', 'debt settlement prompt'],
    prompt: `Act as a consumer debt negotiation expert. Generate word-for-word phone scripts I can use to call my creditors.

My situation:
- Creditor: [CREDIT_CARD_COMPANY / MEDICAL / COLLECTIONS]
- Current balance: $[AMOUNT]
- Current interest rate: [X]%
- Payment history: [GOOD / MISSED_1-2 / BEHIND_3+_MONTHS]
- How long I've been a customer: [X] years

Generate these scripts:

**Script 1: Interest Rate Reduction Call**
- Opening line, what department to ask for
- Exact phrases that work ("I've received offers from competitors at X%...")
- How to handle "no" — escalation script
- Closing to lock in the new rate

**Script 2: Late Fee Waiver Request**
- Best time to call
- Key phrases for first-time vs repeat requests

**Script 3: Hardship Program Request**
- When to use this (job loss, medical emergency)
- What to say and what NOT to say
- What programs to ask for by name

**Script 4: Debt Settlement Negotiation** (if behind on payments)
- Opening position and target settlement percentage
- Counter-offer strategy
- How to get the agreement in writing before paying

Include: what to say, what NOT to say, and red flags to watch for.`,
    exampleOutput: 'SCRIPT 1 — OPENING: "Hi, I\'d like to speak with your retention department please." [WAIT FOR TRANSFER] "I\'ve been a loyal customer for 5 years and I\'ve recently received balance transfer offers at 0% from [competitor]. I\'d like to see if you can match or lower my current rate of 22%..."',
    useCases: [
      'Credit card holders paying high interest rates',
      'Anyone behind on payments exploring options',
      'People with medical debt seeking reductions',
      'Consumers who have never negotiated with creditors',
    ],
    tips: [
      'Call Tuesday-Thursday mornings for best results',
      'Have a competitor offer ready (even if you haven\'t applied)',
      'Always get agreements in writing before making payments',
      'Be polite but firm — representatives have more authority than they initially reveal',
    ],
    relatedToolSlug: 'credit-card-payoff',
    difficulty: 'intermediate',
    aiModels: ['ChatGPT', 'Claude'],
    isViral: true,
    dateAdded: '2024-06-10',
    dateUpdated: '2024-06-20',
  },

  // ── Investing ───────────────────────────────────────────
  {
    slug: 'fire-number-roadmap',
    category: 'investing',
    title: 'FIRE Number & Retirement Roadmap',
    metaTitle: 'FIRE Number AI Prompt — Calculate Your Path to Financial Independence',
    metaDescription: 'Use this AI prompt to calculate your exact FIRE number, create a savings roadmap, and model different retirement scenarios.',
    description: 'Calculate your FIRE number and get a detailed roadmap showing exactly when you can achieve financial independence.',
    keywords: ['FIRE number prompt', 'financial independence prompt', 'retirement calculator AI', 'FIRE roadmap ChatGPT'],
    prompt: `Act as a FIRE (Financial Independence, Retire Early) planning expert. Calculate my path to financial independence.

My numbers:
- Age: [YOUR_AGE]
- Annual income (after tax): $[AMOUNT]
- Annual expenses: $[AMOUNT]
- Current investment portfolio: $[AMOUNT]
- Monthly investment contribution: $[AMOUNT]
- Expected annual return: [7-10]%
- Target safe withdrawal rate: [3-4]%

Please calculate and present:

1. **My FIRE Number** — The exact portfolio size I need (Annual Expenses ÷ SWR)
2. **Years to FIRE** — When I'll hit this number at current savings rate
3. **Monthly Passive Income at FIRE** — What my portfolio generates
4. **Three Scenarios:**
   - Current path (no changes)
   - Aggressive (increase savings by 20%)
   - Coast FIRE (stop contributing, let compound growth finish)
5. **Savings Rate Analysis** — My current rate and what each 5% increase does
6. **The "One More Year" Math** — How each extra working year increases safety margin
7. **Biggest Risks** — Sequence of returns, healthcare, inflation

Present as a clear roadmap with specific ages and dollar amounts.`,
    exampleOutput: 'FIRE Number: $1,250,000 (based on $50K/year expenses at 4% SWR). Current portfolio: $180,000. At $2,000/month contributions with 8% returns: FIRE age = 47 (18 years). Aggressive scenario (+$400/month): FIRE age = 44...',
    useCases: [
      'Anyone curious about early retirement feasibility',
      'High earners wanting to optimize their savings rate',
      'People in their 20s-30s planning long-term wealth',
      'FIRE community members refining their strategy',
    ],
    tips: [
      'Use after-tax income for accurate calculations',
      'Model with 7% returns (conservative) not 10%+',
      'Verify results with our FIRE Calculator for precision',
      'Ask follow-up: "What if I move to a lower cost of living area?"',
    ],
    relatedToolSlug: 'compound-interest',
    difficulty: 'intermediate',
    aiModels: ['ChatGPT', 'Claude', 'Gemini'],
    isViral: true,
    dateAdded: '2024-06-01',
    dateUpdated: '2024-06-20',
  },
  {
    slug: 'portfolio-risk-analyzer',
    category: 'investing',
    title: 'Portfolio Risk & Allocation Analyzer',
    metaTitle: 'AI Portfolio Analysis Prompt — Review Your Investment Allocation',
    metaDescription: 'Get an AI-powered analysis of your investment portfolio allocation, risk level, and rebalancing recommendations.',
    description: 'Analyze your current portfolio allocation and get specific rebalancing recommendations based on your age and risk tolerance.',
    keywords: ['portfolio analysis prompt', 'AI investment review', 'asset allocation prompt', 'portfolio rebalancing AI'],
    prompt: `Act as a certified financial analyst (CFA). Analyze my investment portfolio and provide recommendations.

My portfolio:
- Age: [YOUR_AGE]
- Risk tolerance: [CONSERVATIVE / MODERATE / AGGRESSIVE]
- Investment timeline: [X] years until I need this money
- Current holdings:
  [LIST EACH: Fund/Stock Name — Amount — % of portfolio]
  Example:
  - S&P 500 Index Fund — $50,000 — 45%
  - International Index — $20,000 — 18%
  - Bond Fund — $15,000 — 14%
  - Individual Stocks — $25,000 — 23%

Analyze:
1. **Current Allocation** — Am I properly diversified? Sector/geography concentration risks?
2. **Age-Appropriate Mix** — Does my stock/bond ratio match my timeline?
3. **Expense Ratio Audit** — Am I paying too much in fund fees?
4. **Rebalancing Plan** — Specific changes with dollar amounts
5. **Missing Asset Classes** — What am I not exposed to that I should be?
6. **Worst-Case Scenario** — Estimated portfolio drawdown in a 2008-level crash
7. **Tax Efficiency** — Are my assets in the right account types?

Be specific with fund suggestions (use index funds when possible).`,
    exampleOutput: 'ANALYSIS: Your 23% individual stock allocation adds concentrated risk. At age 32 with aggressive tolerance, target: 80% stocks / 15% bonds / 5% alternatives. REBALANCING: Move $10,000 from individual stocks to Total International Index...',
    useCases: [
      'DIY investors wanting a professional-level portfolio review',
      'Anyone who hasn\'t rebalanced in over a year',
      'People inheriting money and unsure how to invest it',
      'Investors wondering if they\'re taking too much or too little risk',
    ],
    tips: [
      'Include ALL investment accounts (401k, IRA, brokerage)',
      'Ask follow-up: "How does this change if I plan to retire at 45?"',
      'This is educational — confirm major moves with a licensed advisor',
    ],
    relatedToolSlug: 'compound-interest',
    difficulty: 'advanced',
    aiModels: ['ChatGPT', 'Claude'],
    isViral: false,
    dateAdded: '2024-06-08',
    dateUpdated: '2024-06-20',
  },

  // ── Credit Score ────────────────────────────────────────
  {
    slug: 'credit-score-90-day-boost',
    category: 'credit-score',
    title: '90-Day Credit Score Boost Plan',
    metaTitle: 'AI Credit Score Boost Prompt — Raise Your Score in 90 Days',
    metaDescription: 'Get a personalized 90-day action plan to raise your credit score using AI. Covers utilization, disputes, authorized users, and timing.',
    description: 'Generate a week-by-week action plan to maximize your credit score improvement in 90 days.',
    keywords: ['improve credit score prompt', 'raise credit score fast', 'credit score AI plan', '90 day credit boost'],
    prompt: `Act as a credit score optimization expert. Create a 90-day plan to raise my credit score.

My current situation:
- Current credit score: [SCORE] ([FICO / VANTAGE])
- Number of credit cards: [X]
- Total credit limit: $[AMOUNT]
- Current total balance: $[AMOUNT]
- Any late payments? [YES_DETAILS / NO]
- Any collections? [YES_DETAILS / NO]
- Average account age: [X] years
- Recent hard inquiries: [X] in last 12 months

Create a detailed 90-day plan:

**Week 1-2: Quick Wins (Utilization)**
- Exact target balance for each card
- Which cards to pay down first
- Optimal utilization percentage

**Week 3-4: Dispute & Clean**
- How to get free credit reports from all 3 bureaus
- What to dispute and exact letter templates
- Goodwill letter template for late payments

**Week 5-8: Strategic Moves**
- Authorized user strategy (if applicable)
- Credit limit increase requests (soft pull only)
- Optimal timing for applications

**Week 9-12: Lock In Gains**
- Monitoring setup
- Ongoing habits to maintain the new score
- What NOT to do that could undo progress

Include specific target score improvement estimate.`,
    exampleOutput: 'Current utilization: 67% (CRITICAL — this alone drops your score 50-80 points). WEEK 1: Pay Visa from $3,400 to $900 (30% of limit). Pay Discover to $0. Target overall utilization: under 10%. Expected impact: +40-60 points...',
    useCases: [
      'Anyone applying for a mortgage in the next 3-6 months',
      'People with credit scores under 700 wanting improvement',
      'Recent graduates building credit for the first time',
      'Anyone recovering from missed payments or collections',
    ],
    tips: [
      'Pull your free reports from annualcreditreport.com first',
      'Utilization changes reflect within 1-2 billing cycles',
      'Never close old credit cards — they help average account age',
      'Combine with our Credit Card Calculator to optimize paydown order',
    ],
    relatedToolSlug: 'credit-card-payoff',
    difficulty: 'intermediate',
    aiModels: ['ChatGPT', 'Claude', 'Gemini'],
    isViral: true,
    dateAdded: '2024-06-03',
    dateUpdated: '2024-06-18',
  },

  // ── Real Estate ─────────────────────────────────────────
  {
    slug: 'rent-vs-buy-decision-framework',
    category: 'real-estate',
    title: 'Rent vs Buy Decision Analyzer',
    metaTitle: 'Rent vs Buy AI Prompt — Should You Buy a House? Get the Answer',
    metaDescription: 'Use this AI prompt to get a comprehensive rent vs buy analysis for your specific market, including hidden costs most people miss.',
    description: 'Get a complete financial comparison of renting vs buying in your specific market, including opportunity cost analysis.',
    keywords: ['rent vs buy prompt', 'should I buy a house AI', 'home buying analysis prompt', 'rent or buy calculator'],
    prompt: `Act as a real estate financial analyst. Help me decide: should I rent or buy?

My situation:
- City/Area: [LOCATION]
- Current monthly rent: $[AMOUNT]
- Home price I'm considering: $[AMOUNT]
- Down payment I have: $[AMOUNT] ([X]%)
- Mortgage rate I qualify for: [X]%
- How long I plan to stay: [X] years
- Annual income: $[AMOUNT]
- Other monthly debts: $[AMOUNT]
- Current investments: $[AMOUNT]

Analyze both scenarios over [X] years:

**BUYING SCENARIO — True Monthly Cost:**
- Mortgage P&I
- Property taxes (use local rate for [LOCATION])
- Homeowners insurance
- PMI (if less than 20% down)
- Maintenance (1-2% of home value)
- HOA (if applicable)
- Opportunity cost of down payment at 7% returns

**RENTING SCENARIO — True Cost:**
- Current rent with [3]% annual increases
- Renter's insurance
- Investment growth of the down payment
- Investment growth of monthly savings (if buying costs more)

**VERDICT:**
- Net worth comparison after [X] years
- Break-even year
- Risk factors for each option
- My specific recommendation with reasoning

Be brutally honest — don't default to "buying is always better."`,
    exampleOutput: 'BUYING: $450K home, 20% down ($90K), 6.8% rate = $2,935 P&I + $412 tax + $150 insurance + $375 maintenance = $3,872/month total. RENTING: $2,200/month + investing $90K down payment + $1,672/month difference. After 7 years: Buyer net worth from home equity: $185K. Renter portfolio: $203K. VERDICT: Renting wins by $18K in your market...',
    useCases: [
      'First-time homebuyers on the fence',
      'Anyone relocating to a new city',
      'Investors weighing real estate vs stock market',
      'People pressured by family to buy but unsure financially',
    ],
    tips: [
      'Be realistic about maintenance costs — most buyers underestimate',
      'Verify with our Rent vs Buy Calculator for precise math',
      'Ask follow-up: "What if home prices drop 10% in year 2?"',
      'Include ALL costs — closing costs, moving, furniture',
    ],
    relatedToolSlug: 'mortgage-calculator',
    difficulty: 'intermediate',
    aiModels: ['ChatGPT', 'Claude'],
    isViral: true,
    dateAdded: '2024-06-05',
    dateUpdated: '2024-06-20',
  },

  // ── Tax Planning ────────────────────────────────────────
  {
    slug: 'tax-deduction-finder',
    category: 'tax-planning',
    title: 'Hidden Tax Deduction Finder',
    metaTitle: 'AI Tax Deduction Finder Prompt — Deductions You\'re Probably Missing',
    metaDescription: 'Use this AI prompt to uncover tax deductions you might be missing based on your job, life situation, and spending patterns.',
    description: 'Discover tax deductions and credits you may be eligible for based on your specific employment, family, and financial situation.',
    keywords: ['tax deduction finder', 'AI tax deductions', 'missed tax deductions', 'ChatGPT tax help', 'tax savings prompt'],
    prompt: `Act as an experienced CPA specializing in individual tax optimization. Help me find deductions I might be missing.

My tax profile:
- Filing status: [SINGLE / MARRIED_FILING_JOINTLY / HEAD_OF_HOUSEHOLD]
- Annual gross income: $[AMOUNT]
- Employment type: [W2_EMPLOYEE / SELF_EMPLOYED / BOTH]
- Do I work from home? [YES_% / NO]
- Do I have a side business? [YES_TYPE / NO]
- Children/dependents: [NUMBER, AGES]
- Homeowner? [YES / NO / RENTER]
- Student loans? [YES_BALANCE / NO]
- Charitable donations? [YES_APPROX / NO]
- Medical expenses this year: $[APPROX]
- State: [YOUR_STATE]

Find every possible deduction and credit:

1. **Above-the-Line Deductions** I may qualify for
2. **Itemize vs Standard** — Which saves me more? Show the math
3. **Tax Credits** I might be missing (these are dollar-for-dollar!)
4. **Self-Employment Deductions** (if applicable)
5. **Education Credits** for me or dependents
6. **State-Specific Benefits** for [MY_STATE]
7. **Year-End Moves** I can still make to reduce this year's tax bill
8. **Estimated Tax Savings** from each recommendation

Flag any deduction worth $500+ that I might be missing.`,
    exampleOutput: 'FOUND 7 POTENTIAL DEDUCTIONS: 1) Home office deduction (simplified method): $1,500. 2) Self-employment health insurance deduction: $4,800. 3) Qualified Business Income (QBI) deduction: up to $3,200. 4) Savers Credit for IRA contributions...',
    useCases: [
      'Self-employed individuals and freelancers',
      'Anyone who hasn\'t reviewed deductions in 2+ years',
      'New homeowners in their first year of ownership',
      'Parents who may qualify for education credits',
    ],
    tips: [
      'Run this prompt in January for tax planning, not just filing',
      'This is a starting point — verify with a licensed CPA',
      'Ask follow-up: "What receipts should I be saving?"',
      'Update the prompt each year with new tax law changes',
    ],
    difficulty: 'advanced',
    aiModels: ['ChatGPT', 'Claude'],
    isViral: true,
    dateAdded: '2024-06-12',
    dateUpdated: '2024-06-20',
  },
];

// ─── Utility Functions ───────────────────────────────────────

/** Get all prompts for a category */
export function getPromptsByCategory(categorySlug: string): PromptDef[] {
  return PROMPTS.filter(p => p.category === categorySlug);
}

/** Get category definition by slug */
export function getCategory(slug: string): PromptCategoryDef | undefined {
  return PROMPT_CATEGORIES.find(c => c.slug === slug);
}

/** Get prompt by category + slug */
export function getPrompt(categorySlug: string, promptSlug: string): PromptDef | undefined {
  return PROMPTS.find(p => p.category === categorySlug && p.slug === promptSlug);
}

/** Get viral/trending prompts */
export function getViralPrompts(limit = 6): PromptDef[] {
  return PROMPTS.filter(p => p.isViral).slice(0, limit);
}

/** Get related prompts (same category, excluding current) */
export function getRelatedPrompts(currentSlug: string, limit = 4): PromptDef[] {
  const current = PROMPTS.find(p => p.slug === currentSlug);
  if (!current) return PROMPTS.slice(0, limit);
  const sameCategory = PROMPTS.filter(p => p.slug !== currentSlug && p.category === current.category);
  const otherCategory = PROMPTS.filter(p => p.slug !== currentSlug && p.category !== current.category);
  return [...sameCategory, ...otherCategory].slice(0, limit);
}

/** Get total prompt count */
export function getPromptCount(): number {
  return PROMPTS.length;
}

/** Get all prompts for sitemap */
export function getAllPromptPaths(): { category: string; slug: string }[] {
  return PROMPTS.map(p => ({ category: p.category, slug: p.slug }));
}

// ─── SEO Generators ──────────────────────────────────────────

/** Generate metadata for a prompt category page */
export function generatePromptCategoryMetadata(categorySlug: string): Metadata {
  const cat = getCategory(categorySlug);
  if (!cat) return {};
  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    keywords: cat.keywords,
    alternates: { canonical: `${SITE_URL}/prompts/${cat.slug}` },
    openGraph: {
      title: cat.metaTitle,
      description: cat.metaDescription,
      url: `${SITE_URL}/prompts/${cat.slug}`,
      siteName: SITE_NAME,
    },
  };
}

/** Generate metadata for an individual prompt page */
export function generatePromptMetadata(categorySlug: string, promptSlug: string): Metadata {
  const prompt = getPrompt(categorySlug, promptSlug);
  if (!prompt) return {};
  return {
    title: prompt.metaTitle,
    description: prompt.metaDescription,
    keywords: prompt.keywords,
    alternates: { canonical: `${SITE_URL}/prompts/${categorySlug}/${prompt.slug}` },
    openGraph: {
      title: prompt.metaTitle,
      description: prompt.metaDescription,
      url: `${SITE_URL}/prompts/${categorySlug}/${prompt.slug}`,
      siteName: SITE_NAME,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: prompt.metaTitle,
      description: prompt.metaDescription,
    },
  };
}

/** Generate HowTo schema for a prompt page */
export function generatePromptSchema(prompt: PromptDef) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: prompt.title,
    description: prompt.description,
    step: [
      { '@type': 'HowToStep', name: 'Copy the prompt', text: 'Copy the AI prompt template below' },
      { '@type': 'HowToStep', name: 'Customize placeholders', text: 'Replace the [BRACKETED] placeholders with your actual numbers' },
      { '@type': 'HowToStep', name: 'Paste into AI', text: `Paste into ${prompt.aiModels.join(', ')} and review the personalized output` },
    ],
    tool: prompt.aiModels.map(m => ({ '@type': 'HowToTool', name: m })),
  };
}
