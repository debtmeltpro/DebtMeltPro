// ============================================================
// DebtMeltPro — Global Type Definitions
// All financial entities are typed with strict precision.
// ============================================================

// ─── Shared Primitives ───────────────────────────────────────

/** Currency amount in USD cents (integer) to avoid float precision issues */
export type Cents = number;

/** Annual Percentage Rate as a decimal (e.g. 0.065 for 6.5%) */
export type APR = number;

/** Month count (non-negative integer) */
export type Months = number;

// ─── Debt Payoff Engine ──────────────────────────────────────

export type PayoffStrategy = 'snowball' | 'avalanche' | 'hybrid';

export interface DebtAccount {
  id: string;
  name: string;
  /** Current outstanding balance in dollars */
  balance: number;
  /** Annual interest rate as percent (e.g. 18.5 for 18.5%) */
  interestRate: number;
  /** Minimum required monthly payment */
  minimumPayment: number;
  /** Fixed or variable rate */
  interestType?: 'fixed' | 'variable';
  /** Annual rate adjustment for variable rates (e.g. 0.5 means +0.5%/yr) */
  annualRateChangePercent?: number;
  /** Optional: account type for display hints */
  type?: 'credit_card' | 'student_loan' | 'auto_loan' | 'personal_loan' | 'medical' | 'other';
}

export interface MonthlySnapshot {
  month: number;
  /** Total remaining balance across all debts */
  totalBalance: number;
  /** Interest paid this month */
  interestPaid: number;
  /** Principal paid this month */
  principalPaid: number;
  /** Per-account balances */
  accounts: Record<string, number>;
}

export interface PayoffResult {
  strategy: PayoffStrategy;
  /** Number of months to full payoff */
  totalMonths: number;
  /** Total dollars paid (principal + interest) */
  totalPaid: number;
  /** Total interest paid */
  totalInterestPaid: number;
  /** Monthly amortization timeline */
  timeline: MonthlySnapshot[];
  /** Order debts were fully paid off */
  payoffOrder: string[];
  /** Interest saved vs minimum payments only */
  interestSaved: number;
  /** Months saved vs minimum payments only */
  monthsSaved: number;
  /** True when simulation hit MAX_MONTHS without full payoff (negative amortization) */
  isUnpayable: boolean;
}

export interface DebtPayoffInput {
  debts: DebtAccount[];
  extraMonthlyPayment: number;
  strategy: PayoffStrategy;
}

// ─── Mortgage / Rent vs. Buy ─────────────────────────────────

export interface MortgageInput {
  homePrice: number;
  downPaymentPercent: number;
  mortgageRatePercent: number;
  loanTermYears: number;
  propertyTaxRatePercent: number;
  maintenanceRatePercent: number;
  homeInsuranceMonthly: number;
  hoaMonthly: number;
  homeAppreciationPercent: number;
  monthlyRent: number;
  rentIncreasePercent: number;
  investmentReturnPercent: number;
  marginalTaxRatePercent: number;
  yearsToAnalyze: number;
}

export interface MortgageResult {
  monthlyPayment: number;
  totalMortgageCost: number;
  totalRentCost: number;
  buyingNetWorth: number;
  rentingNetWorth: number;
  breakEvenYears: number;
  recommendation: 'buy' | 'rent' | 'neutral';
  opportunityCostOfDownPayment: number;
  yearlyComparison: YearlyMortgageSnapshot[];
}

export interface YearlyMortgageSnapshot {
  year: number;
  buyingEquity: number;
  rentingPortfolioValue: number;
  cumulativeBuyingCost: number;
  cumulativeRentCost: number;
}

// ─── Compound Interest / FIRE Calculator ─────────────────────

export interface CompoundInput {
  initialAmount: number;
  monthlyContribution: number;
  annualReturnPercent: number;
  years: number;
  inflationPercent: number;
  adjustForInflation: boolean;
  withdrawalRatePercent: number;
}

export interface CompoundResult {
  finalBalance: number;
  finalBalanceReal: number;
  totalContributions: number;
  totalInterestEarned: number;
  fireNumber: number;
  sustainableMonthlyWithdrawal: number;
  yearsToFire: number | null;
  yearlyData: CompoundYearlySnapshot[];
}

export interface CompoundYearlySnapshot {
  year: number;
  balance: number;
  balanceReal: number;
  contributions: number;
  interest: number;
}

// ─── Credit Card Payoff Optimizer ────────────────────────────

export interface CreditCardInput {
  balance: number;
  apr: number;
  minimumPaymentPercent: number;
  minimumPaymentFloor: number;
  fixedExtraPayment: number;
}

export interface CreditCardResult {
  minimumOnlyMonths: number;
  minimumOnlyTotalPaid: number;
  minimumOnlyInterestPaid: number;
  optimizedMonths: number;
  optimizedTotalPaid: number;
  optimizedInterestPaid: number;
  interestSaved: number;
  monthsSaved: number;
  monthlySchedule: CreditCardSnapshot[];
  minimumOnlyUnpayable?: boolean;
  optimizedUnpayable?: boolean;
}

export interface CreditCardSnapshot {
  month: number;
  balance: number;
  payment: number;
  interestCharge: number;
  principalPaid: number;
}

// ─── Student Loan Refinance ───────────────────────────────────

export interface StudentLoanInput {
  loanBalance: number;
  currentRatePercent: number;
  currentTermMonths: number;
  currentMonthsRemaining: number;
  newRatePercent: number;
  newTermMonths: number;
  refinanceFeePercent: number;
}

export interface StudentLoanResult {
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  totalCurrentCost: number;
  totalNewCost: number;
  totalSavings: number;
  refinanceFee: number;
  breakEvenMonths: number;
  recommendation: 'refinance' | 'keep' | 'marginal';
  comparisonChart: LoanComparisonSnapshot[];
}

export interface LoanComparisonSnapshot {
  month: number;
  currentBalance: number;
  newBalance: number;
  cumulativeCurrentPaid: number;
  cumulativeNewPaid: number;
}

// ─── UI / Store ───────────────────────────────────────────────

export interface ToolMetadata {
  slug: string;
  title: string;
  description: string;
  icon: string;
  keywords: string[];
}

export interface AppStore {
  cookieConsent: boolean | null;
  setCookieConsent: (value: boolean) => void;
  lastTool: string | null;
  setLastTool: (tool: string) => void;
}

// ─── SEO ──────────────────────────────────────────────────────

export interface PageMetadataInput {
  title: string;
  description: string;
  slug: string;
  keywords: string[];
  toolType?: 'DebtPayoffCalculator' | 'MortgageCalculator' | 'InvestmentCalculator' | 'CreditCardCalculator' | 'LoanCalculator';
}