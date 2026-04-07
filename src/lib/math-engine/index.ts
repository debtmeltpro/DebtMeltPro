// ============================================================
// DebtMeltPro — Math Engine Index v2
// ──────────────────────────────────
// Central export point for all financial calculators.
// NEW in v2:
//   • All v2 calculator exports (40+ functions)
//   • Financial health score calculator
//   • Net worth tracker helpers
//   • Rule-of-thumb validators
//   • Inflation adjustment utilities
//
// Backward-compatible: all v1 exports remain unchanged.
// ============================================================

const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;

// ─── Debt Calculator ───────────────────────────────────────────
export {
  // v1 exports
  calculateDebtPayoff,
  formatPayoffDuration,
  getBestStrategy,
  calcFixedMonthlyPayment,
  // v2 exports
  calculateDTI,
  calculateConsolidation,
  whatIfWindfall,
  calcMinExtraForTarget,
} from './debt';

export type {
  PayoffResultV2,
  DTIResult,
  ConsolidationResult,
  WhatIfResult,
  GetBestStrategyResult,
} from './debt';

// ─── Mortgage Calculator ───────────────────────────────────────
export {
  // v1 exports
  calculateMortgage,
  // v2 exports
  calculatePMI,
  calculateAffordability,
  generateAmortizationSchedule,
  compareExtraPayments,
  calculateRefinance,
  estimateClosingCosts,
} from './mortgage';

export type {
  PMIResult,
  AffordabilityResult,
  AmortizationRow,
  AmortizationResult,
  ExtraPaymentScenario,
  RefinanceResult,
  ClosingCostEstimate,
} from './mortgage';

// ─── Compound Interest & FIRE Calculator ───────────────────────
export {
  // v1 exports
  calculateCompound,
  ruleOf72,
  realReturn,
  // v2 exports
  calculateWithEscalation,
  calculateFIREVariants,
  calculateMilestones,
  monteCarloSimulation,
  calculateTaxDrag,
  requiredMonthlySavings,
  analyzeSavingsRate,
} from './compound';

export type {
  EscalationResult,
  FIREVariants,
  Milestone,
  MonteCarloResult,
  TaxDragResult,
  SavingsRateAnalysis,
} from './compound';

// ─── Credit Card Calculator ────────────────────────────────────
export {
  // v1 exports
  calculateCreditCardPayoff,
  // v2 exports
  calculateBalanceTransfer,
  optimizeMultipleCards,
  calculatePurchaseTrueCost,
  calculateAPRChangeImpact,
} from './credit-card';

export type {
  BalanceTransferResult,
  CardInfo,
  MultiCardResult,
  PurchaseCostResult,
  APRChangeImpact,
} from './credit-card';

// ─── Student Loan Calculator ───────────────────────────────────
export {
  // v1 exports
  calculateStudentLoanRefinance,
  // v2 exports
  analyzeMultipleLoans,
  compareIDRPlans,
  calculatePSLF,
  calculateExtraPaymentImpact,
  calculateEmployerContribution,
} from './student-loan';

export type {
  LoanDetail,
  MultiLoanOverview,
  IDRPlanType,
  IDRPlanResult,
  IDRComparisonResult,
  PSLFResult,
  ExtraPaymentImpact,
  EmployerContributionResult,
} from './student-loan';

// ─── Shared Formatting Utilities ──────────────────────────────

const USD_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD',
  minimumFractionDigits: 0, maximumFractionDigits: 0,
});

const USD_FORMATTER_CENTS = new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD',
  minimumFractionDigits: 2, maximumFractionDigits: 2,
});

const PCT_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 2,
});

export const formatCurrency = (amount: number): string => {
  if (!isFinite(amount) || isNaN(amount)) return '$0';
  return USD_FORMATTER.format(amount);
};

export const formatCurrencyExact = (amount: number): string => {
  if (!isFinite(amount) || isNaN(amount)) return '$0.00';
  return USD_FORMATTER_CENTS.format(amount);
};

export const formatPercent = (decimal: number): string => {
  if (!isFinite(decimal) || isNaN(decimal)) return '0.0%';
  return PCT_FORMATTER.format(decimal);
};

export const formatPercentNumber = (percent: number): string => {
  return formatPercent(percent / 100);
};

export const formatDuration = (months: number): string => {
  if (!isFinite(months) || months <= 0) return '0 mo';
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0) return `${months} mo`;
  if (remainingMonths === 0) return `${years} yr`;
  return `${years} yr ${remainingMonths} mo`;
};

export const formatCurrencyShort = (amount: number): string => {
  if (isNaN(amount) || !isFinite(amount)) return '$0';
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(0)}K`;
  return `${sign}$${abs.toFixed(0)}`;
};

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

// ─── NEW: Date Formatting ─────────────────────────────────────

/**
 * Format a month number (from now) into a calendar date string.
 * e.g. 18 → "September 2027"
 */
export const monthsToDate = (months: number): string => {
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};

/**
 * Format a month number into a short date.
 * e.g. 18 → "Sep 2027"
 */
export const monthsToShortDate = (months: number): string => {
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

// ─── NEW: Financial Health Score ──────────────────────────────

export interface FinancialHealthScore {
  /** Overall score 0-100 */
  score: number;
  /** Letter grade */
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';
  /** Category scores */
  categories: {
    emergencyFund: { score: number; label: string };
    debtToIncome: { score: number; label: string };
    savingsRate: { score: number; label: string };
    netWorth: { score: number; label: string };
  };
  /** Actionable recommendations (top 3) */
  recommendations: string[];
}

/**
 * Calculate a comprehensive financial health score (0-100).
 * Based on: emergency fund coverage, DTI, savings rate, and net worth trajectory.
 */
export const calculateFinancialHealth = (
  monthlyIncome: number,
  monthlyExpenses: number,
  totalDebtPayments: number,
  emergencyFund: number,
  totalAssets: number,
  totalDebts: number,
  age: number,
): FinancialHealthScore => {
  const round = (n: number) => Math.round(n);

  // Emergency fund score (0-25): months of expenses covered
  const efMonths = monthlyExpenses > 0 ? emergencyFund / monthlyExpenses : 0;
  let efScore: number;
  let efLabel: string;
  if (efMonths >= 6) { efScore = 25; efLabel = `${efMonths.toFixed(1)} months — excellent`; }
  else if (efMonths >= 3) { efScore = round(15 + (efMonths - 3) * 3.33); efLabel = `${efMonths.toFixed(1)} months — good`; }
  else if (efMonths >= 1) { efScore = round(5 + (efMonths - 1) * 5); efLabel = `${efMonths.toFixed(1)} months — building`; }
  else { efScore = round(efMonths * 5); efLabel = `${efMonths.toFixed(1)} months — critical`; }

  // DTI score (0-25)
  const dti = monthlyIncome > 0 ? (totalDebtPayments / monthlyIncome) * 100 : 100;
  let dtiScore: number;
  let dtiLabel: string;
  if (dti <= 15) { dtiScore = 25; dtiLabel = `${dti.toFixed(0)}% — excellent`; }
  else if (dti <= 28) { dtiScore = round(25 - (dti - 15) * 0.77); dtiLabel = `${dti.toFixed(0)}% — good`; }
  else if (dti <= 43) { dtiScore = round(15 - (dti - 28) * 0.67); dtiLabel = `${dti.toFixed(0)}% — fair`; }
  else { dtiScore = round(Math.max(0, 5 - (dti - 43) * 0.25)); dtiLabel = `${dti.toFixed(0)}% — high`; }

  // Savings rate score (0-25)
  const savingsRate = monthlyIncome > 0
    ? ((monthlyIncome - monthlyExpenses - totalDebtPayments) / monthlyIncome) * 100 : 0;
  let srScore: number;
  let srLabel: string;
  if (savingsRate >= 30) { srScore = 25; srLabel = `${savingsRate.toFixed(0)}% — exceptional`; }
  else if (savingsRate >= 20) { srScore = round(20 + (savingsRate - 20) * 0.5); srLabel = `${savingsRate.toFixed(0)}% — great`; }
  else if (savingsRate >= 10) { srScore = round(10 + (savingsRate - 10)); srLabel = `${savingsRate.toFixed(0)}% — good`; }
  else if (savingsRate > 0) { srScore = round(savingsRate); srLabel = `${savingsRate.toFixed(0)}% — building`; }
  else { srScore = 0; srLabel = `${savingsRate.toFixed(0)}% — needs attention`; }

  // Net worth score (0-25): net worth relative to age-based benchmark
  const netWorth = totalAssets - totalDebts;
  // Benchmark: (Age - 25) × Annual Income / 10 (simplified from "The Millionaire Next Door")
  const benchmark = Math.max(0, (age - 25) * monthlyIncome * 12 / 10);
  let nwScore: number;
  let nwLabel: string;
  if (benchmark <= 0 || age < 25) {
    nwScore = netWorth > 0 ? 20 : 10;
    nwLabel = netWorth > 0 ? 'Positive — on track' : 'Building';
  } else {
    const ratio = netWorth / benchmark;
    if (ratio >= 1.5) { nwScore = 25; nwLabel = 'Well above benchmark'; }
    else if (ratio >= 1) { nwScore = round(20 + (ratio - 1) * 10); nwLabel = 'On target'; }
    else if (ratio >= 0.5) { nwScore = round(10 + (ratio - 0.5) * 20); nwLabel = 'Building momentum'; }
    else { nwScore = round(Math.max(0, ratio * 20)); nwLabel = 'Early stage'; }
  }

  const totalScore = Math.min(100, efScore + dtiScore + srScore + nwScore);

  let grade: FinancialHealthScore['grade'];
  if (totalScore >= 95) grade = 'A+';
  else if (totalScore >= 85) grade = 'A';
  else if (totalScore >= 75) grade = 'B+';
  else if (totalScore >= 65) grade = 'B';
  else if (totalScore >= 55) grade = 'C+';
  else if (totalScore >= 45) grade = 'C';
  else if (totalScore >= 30) grade = 'D';
  else grade = 'F';

  // Generate recommendations
  const recs: string[] = [];
  if (efMonths < 3) recs.push('Build your emergency fund to cover 3 months of expenses');
  if (efMonths < 6 && efMonths >= 3) recs.push('Grow emergency fund from 3 to 6 months for full security');
  if (dti > 36) recs.push('Reduce debt-to-income ratio below 36% — focus on highest-rate debts first');
  if (savingsRate < 15) recs.push('Increase your savings rate toward 15-20% of income');
  if (netWorth < 0) recs.push('Prioritize debt payoff to achieve a positive net worth');
  if (savingsRate >= 15 && efMonths >= 6 && dti < 28) {
    recs.push('You\'re in great shape — consider maximizing retirement contributions');
  }

  return {
    score: totalScore,
    grade,
    categories: {
      emergencyFund: { score: efScore, label: efLabel },
      debtToIncome: { score: dtiScore, label: dtiLabel },
      savingsRate: { score: srScore, label: srLabel },
      netWorth: { score: nwScore, label: nwLabel },
    },
    recommendations: recs.slice(0, 3),
  };
};

// ─── NEW: Inflation Adjustment ────────────────────────────────

/**
 * Convert a future dollar amount to today's purchasing power.
 */
export const adjustForInflation = (
  futureAmount: number,
  inflationPercent: number,
  years: number,
): number => {
  return round2(futureAmount / Math.pow(1 + inflationPercent / 100, years));
};

/**
 * Convert today's dollars to what you'll need in the future to maintain purchasing power.
 */
export const inflateToFuture = (
  todayAmount: number,
  inflationPercent: number,
  years: number,
): number => {
  return round2(todayAmount * Math.pow(1 + inflationPercent / 100, years));
};

// ─── NEW: Quick Financial Rules ───────────────────────────────

/**
 * Collection of financial rules-of-thumb for quick validation.
 */
export const financialRules = {
  /** 50/30/20 budget breakdown for a given income */
  budget503020: (monthlyIncome: number) => ({
    needs: round2(monthlyIncome * 0.5),
    wants: round2(monthlyIncome * 0.3),
    savings: round2(monthlyIncome * 0.2),
  }),

  /** Recommended emergency fund range */
  emergencyFundRange: (monthlyExpenses: number) => ({
    minimum: round2(monthlyExpenses * 3),
    recommended: round2(monthlyExpenses * 6),
    conservative: round2(monthlyExpenses * 9),
  }),

  /** Age-based stock allocation (rule of 110) */
  stockAllocation: (age: number) => ({
    stocks: Math.max(0, Math.min(100, 110 - age)),
    bonds: Math.min(100, Math.max(0, age - 10)),
  }),

  /** Life insurance needs (10× income rule) */
  lifeInsuranceNeed: (annualIncome: number) => round2(annualIncome * 10),

  /** Max car payment (20/4/10 rule) */
  carAffordability: (monthlyIncome: number) => ({
    maxMonthlyPayment: round2(monthlyIncome * 0.10),
    maxLoanTerm: 48,
    minDownPaymentPercent: 20,
  }),
} as const;