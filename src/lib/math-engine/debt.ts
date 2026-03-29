// ============================================================
// DebtMeltPro — Debt Payoff Math Engine v2
// ────────────────────────────────────────
// NEW in v2:
//   • Debt-to-income ratio (DTI) & affordability analysis
//   • Consolidation loan comparison
//   • What-if scenarios (windfall, rate change, extra income)
//   • Projected payoff date (calendar dates, not just months)
//   • Custom priority ordering (drag-and-drop support)
//   • Per-debt payoff month tracking
//   • Interest cost by debt (see which debt hurts most)
//   • Minimum viable extra payment calculator
//
// Backward-compatible: all v1 exports remain unchanged.
// ============================================================

import type {
  DebtAccount,
  DebtPayoffInput,
  MonthlySnapshot,
  PayoffResult,
  PayoffStrategy,
} from '@/types';

const MAX_MONTHS = 600; // 50-year safety cap

// ─── Internal Helpers ─────────────────────────────────────────

const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;

const monthlyInterest = (balance: number, annualRatePercent: number): number => {
  const monthlyRate = annualRatePercent / 100 / 12;
  return round2(balance * monthlyRate);
};

export const calcFixedMonthlyPayment = (
  principal: number,
  annualRatePercent: number,
  termMonths: number,
): number => {
  if (annualRatePercent === 0) return round2(principal / termMonths);
  const r = annualRatePercent / 100 / 12;
  const payment =
    principal * (r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
  return round2(payment);
};

/**
 * Total interest on a fully-amortizing loan (useful for consolidation comparison).
 */
const totalLoanInterest = (
  principal: number,
  annualRatePercent: number,
  termMonths: number,
): number => {
  const payment = calcFixedMonthlyPayment(principal, annualRatePercent, termMonths);
  return round2(payment * termMonths - principal);
};

// ─── Priority Sorting ─────────────────────────────────────────

const getSortedPriority = (
  debts: DebtAccount[],
  strategy: PayoffStrategy,
  month: number,
  customOrder?: string[],
): DebtAccount[] => {
  const active = [...debts].filter((d) => d.balance > 0.01);

  switch (strategy) {
    case 'snowball':
      return active.sort((a, b) => a.balance - b.balance);
    case 'avalanche':
      return active.sort((a, b) => b.interestRate - a.interestRate);
    case 'hybrid':
      return month <= 3
        ? active.sort((a, b) => a.balance - b.balance)
        : active.sort((a, b) => b.interestRate - a.interestRate);
    case 'custom' as PayoffStrategy:
      if (customOrder?.length) {
        return active.sort(
          (a, b) =>
            (customOrder.indexOf(a.id) === -1 ? 999 : customOrder.indexOf(a.id)) -
            (customOrder.indexOf(b.id) === -1 ? 999 : customOrder.indexOf(b.id)),
        );
      }
      return active;
    default:
      return active;
  }
};

// ─── Baseline (Minimum Payments Only) ────────────────────────

const calcMinimumOnlyBaseline = (
  debts: DebtAccount[],
): { months: number; totalInterest: number; interestByDebt: Record<string, number> } => {
  const accounts = debts.map((d) => ({ ...d, balance: round2(d.balance) }));
  let month = 0;
  let totalInterest = 0;
  const interestByDebt: Record<string, number> = {};
  for (const a of accounts) interestByDebt[a.id] = 0;

  while (accounts.some((a) => a.balance > 0.01) && month < MAX_MONTHS) {
    month++;
    for (const account of accounts) {
      if (account.balance <= 0.01) continue;
      const interest = monthlyInterest(account.balance, account.interestRate);
      totalInterest = round2(totalInterest + interest);
      interestByDebt[account.id] = round2((interestByDebt[account.id] ?? 0) + interest);
      const payment = Math.min(account.minimumPayment, round2(account.balance + interest));
      account.balance = round2(account.balance + interest - payment);
      if (account.balance < 0.01) account.balance = 0;
    }
  }

  return { months: month, totalInterest: round2(totalInterest), interestByDebt };
};

// ─── Core Payoff Simulation ───────────────────────────────────

export interface PayoffResultV2 extends PayoffResult {
  /** Month each individual debt is paid off */
  debtPayoffMonths: Record<string, number>;
  /** Total interest attributed to each debt */
  interestByDebt: Record<string, number>;
  /** Projected calendar payoff date */
  projectedPayoffDate: string;
  /** Effective annual interest rate (blended) */
  weightedAverageRate: number;
}

const simulatePayoff = (
  input: DebtPayoffInput,
  customOrder?: string[],
): PayoffResultV2 => {
  const { strategy, extraMonthlyPayment } = input;
  const accounts = input.debts.map((d) => ({ ...d, balance: round2(d.balance) }));

  const totalBalance = round2(accounts.reduce((s, a) => s + a.balance, 0));
  const weightedAverageRate = round2(
    accounts.reduce((s, a) => s + a.interestRate * (a.balance / totalBalance), 0),
  );

  const timeline: MonthlySnapshot[] = [];
  const payoffOrder: string[] = [];
  const debtPayoffMonths: Record<string, number> = {};
  const interestByDebt: Record<string, number> = {};
  for (const a of accounts) interestByDebt[a.id] = 0;

  let month = 0;
  let totalInterestPaid = 0;
  let totalPaid = 0;
  let rollingExtra = round2(extraMonthlyPayment);

  while (accounts.some((a) => a.balance > 0.01) && month < MAX_MONTHS) {
    month++;
    let monthInterest = 0;

    // Step 1: Accrue interest
    for (const account of accounts) {
      if (account.balance <= 0.01) continue;
      const interest = monthlyInterest(account.balance, account.interestRate);
      account.balance = round2(account.balance + interest);
      monthInterest = round2(monthInterest + interest);
      totalInterestPaid = round2(totalInterestPaid + interest);
      interestByDebt[account.id] = round2((interestByDebt[account.id] ?? 0) + interest);
    }

    // Step 2: Pay minimums
    let minPaid = 0;
    for (const account of accounts) {
      if (account.balance <= 0.01) continue;
      const payment = round2(Math.min(account.minimumPayment, account.balance));
      account.balance = round2(account.balance - payment);
      minPaid = round2(minPaid + payment);
      if (account.balance < 0.01) {
        rollingExtra = round2(rollingExtra + account.minimumPayment);
        if (!payoffOrder.includes(account.id)) {
          payoffOrder.push(account.id);
          debtPayoffMonths[account.id] = month;
        }
        account.balance = 0;
      }
    }

    // Step 3: Apply extra to priority target
    const prioritized = getSortedPriority(accounts, strategy, month, customOrder);
    let remainingExtra = rollingExtra;

    for (const target of prioritized) {
      if (remainingExtra <= 0) break;
      const payment = round2(Math.min(remainingExtra, target.balance));
      target.balance = round2(target.balance - payment);
      remainingExtra = round2(remainingExtra - payment);
      if (target.balance < 0.01) {
        rollingExtra = round2(rollingExtra + target.minimumPayment);
        if (!payoffOrder.includes(target.id)) {
          payoffOrder.push(target.id);
          debtPayoffMonths[target.id] = month;
        }
        target.balance = 0;
      }
    }

    totalPaid = round2(totalPaid + minPaid + Math.min(rollingExtra, rollingExtra));

    const currentTotal = round2(accounts.reduce((s, a) => s + a.balance, 0));
    const monthPrincipal = round2(
      monthInterest > 0 ? minPaid - monthInterest + rollingExtra : minPaid + rollingExtra,
    );

    const accountBalances: Record<string, number> = {};
    for (const a of accounts) accountBalances[a.id] = round2(a.balance);

    timeline.push({
      month,
      totalBalance: currentTotal,
      interestPaid: round2(monthInterest),
      principalPaid: round2(monthPrincipal),
      accounts: accountBalances,
    });
  }

  for (const account of accounts) {
    if (!payoffOrder.includes(account.id)) {
      payoffOrder.push(account.id);
      debtPayoffMonths[account.id] = month;
    }
  }

  // Project calendar payoff date
  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + month);
  const projectedPayoffDate = payoffDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return {
    strategy,
    totalMonths: month,
    totalPaid: round2(totalPaid),
    totalInterestPaid: round2(totalInterestPaid),
    timeline,
    payoffOrder,
    interestSaved: 0,
    monthsSaved: 0,
    debtPayoffMonths,
    interestByDebt,
    projectedPayoffDate,
    weightedAverageRate,
  };
};

// ─── Public API ───────────────────────────────────────────────

export const calculateDebtPayoff = (
  input: DebtPayoffInput,
  customOrder?: string[],
): {
  snowball: PayoffResultV2;
  avalanche: PayoffResultV2;
  hybrid: PayoffResultV2;
  baseline: { months: number; totalInterest: number; interestByDebt: Record<string, number> };
} => {
  const baseline = calcMinimumOnlyBaseline(input.debts);

  const runStrategy = (strategy: PayoffStrategy): PayoffResultV2 => {
    const result = simulatePayoff({ ...input, strategy }, customOrder);
    return {
      ...result,
      interestSaved: round2(baseline.totalInterest - result.totalInterestPaid),
      monthsSaved: Math.max(0, baseline.months - result.totalMonths),
    };
  };

  return {
    snowball: runStrategy('snowball'),
    avalanche: runStrategy('avalanche'),
    hybrid: runStrategy('hybrid'),
    baseline,
  };
};

// ─── NEW: Debt-to-Income Ratio ────────────────────────────────

export interface DTIResult {
  /** Front-end DTI (housing / income) */
  frontEndDTI: number;
  /** Back-end DTI (all debt / income) */
  backEndDTI: number;
  /** Rating: excellent / good / fair / poor / critical */
  rating: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  /** Max additional monthly debt payments lender would approve */
  additionalCapacity: number;
  /** Explanation text */
  explanation: string;
}

export const calculateDTI = (
  monthlyGrossIncome: number,
  monthlyHousingCost: number,
  debts: DebtAccount[],
): DTIResult => {
  const totalDebtPayments = debts.reduce((s, d) => s + d.minimumPayment, 0);
  const totalMonthlyObligations = monthlyHousingCost + totalDebtPayments;

  const frontEndDTI = round2((monthlyHousingCost / monthlyGrossIncome) * 100);
  const backEndDTI = round2((totalMonthlyObligations / monthlyGrossIncome) * 100);

  // Standard lender thresholds (28/36 rule)
  const maxBackEnd = monthlyGrossIncome * 0.43; // FHA max
  const additionalCapacity = round2(Math.max(0, maxBackEnd - totalMonthlyObligations));

  let rating: DTIResult['rating'];
  let explanation: string;

  if (backEndDTI <= 20) {
    rating = 'excellent';
    explanation = 'Your debt load is very manageable. You have significant borrowing capacity and financial flexibility.';
  } else if (backEndDTI <= 36) {
    rating = 'good';
    explanation = 'Your DTI is within the standard lending threshold. Most lenders will view this favorably.';
  } else if (backEndDTI <= 43) {
    rating = 'fair';
    explanation = 'Your DTI is at the upper limit for most loan programs. FHA loans may still be available, but reducing debt would improve your options.';
  } else if (backEndDTI <= 50) {
    rating = 'poor';
    explanation = 'Your DTI exceeds standard lending limits. Focus on paying down debt before taking on new obligations.';
  } else {
    rating = 'critical';
    explanation = 'Your debt payments consume over half your gross income. Aggressive debt reduction is recommended.';
  }

  return { frontEndDTI, backEndDTI, rating, additionalCapacity, explanation };
};

// ─── NEW: Consolidation Comparison ────────────────────────────

export interface ConsolidationResult {
  /** Combined current monthly minimum across all debts */
  currentMonthlyTotal: number;
  /** New single consolidated payment */
  consolidatedPayment: number;
  /** Total interest under current arrangement */
  currentTotalInterest: number;
  /** Total interest under consolidated loan */
  consolidatedTotalInterest: number;
  /** Net savings (positive = consolidation wins) */
  netSavings: number;
  /** Months to pay off current debts */
  currentPayoffMonths: number;
  /** Months to pay off consolidated loan */
  consolidatedPayoffMonths: number;
  /** Recommendation */
  recommendation: 'consolidate' | 'keep_separate' | 'marginal';
  /** Blended rate of current debts */
  currentWeightedRate: number;
}

export const calculateConsolidation = (
  debts: DebtAccount[],
  consolidationRatePercent: number,
  consolidationTermMonths: number,
  consolidationFeePercent: number = 0,
): ConsolidationResult => {
  const totalBalance = round2(debts.reduce((s, d) => s + d.balance, 0));
  const currentMonthlyTotal = round2(debts.reduce((s, d) => s + d.minimumPayment, 0));
  const currentWeightedRate = round2(
    debts.reduce((s, d) => s + d.interestRate * (d.balance / totalBalance), 0),
  );

  // Current path: minimum payments only
  const baseline = calcMinimumOnlyBaseline(debts);
  const currentTotalInterest = baseline.totalInterest;
  const currentPayoffMonths = baseline.months;

  // Consolidated path
  const fee = round2(totalBalance * (consolidationFeePercent / 100));
  const consolidatedBalance = round2(totalBalance + fee);
  const consolidatedPayment = calcFixedMonthlyPayment(
    consolidatedBalance, consolidationRatePercent, consolidationTermMonths,
  );
  const consolidatedTotalInterest = totalLoanInterest(
    consolidatedBalance, consolidationRatePercent, consolidationTermMonths,
  );

  const netSavings = round2(currentTotalInterest - consolidatedTotalInterest);

  let recommendation: ConsolidationResult['recommendation'];
  if (netSavings > 1000 && consolidationRatePercent < currentWeightedRate) {
    recommendation = 'consolidate';
  } else if (netSavings < -500) {
    recommendation = 'keep_separate';
  } else {
    recommendation = 'marginal';
  }

  return {
    currentMonthlyTotal,
    consolidatedPayment,
    currentTotalInterest,
    consolidatedTotalInterest,
    netSavings,
    currentPayoffMonths,
    consolidatedPayoffMonths: consolidationTermMonths,
    recommendation,
    currentWeightedRate,
  };
};

// ─── NEW: What-If Scenario Analysis ──────────────────────────

export interface WhatIfResult {
  label: string;
  totalMonths: number;
  totalInterest: number;
  interestSaved: number;
  monthsSaved: number;
}

/**
 * Run a what-if scenario: apply a one-time windfall payment to the highest-rate debt,
 * then continue with the normal payoff strategy.
 */
export const whatIfWindfall = (
  input: DebtPayoffInput,
  windfallAmount: number,
  strategy: PayoffStrategy = 'avalanche',
): WhatIfResult => {
  // Apply windfall to highest-rate debt first
  const modifiedDebts = input.debts
    .map((d) => ({ ...d }))
    .sort((a, b) => b.interestRate - a.interestRate);

  let remaining = windfallAmount;
  for (const debt of modifiedDebts) {
    const apply = Math.min(remaining, debt.balance);
    debt.balance = round2(debt.balance - apply);
    remaining = round2(remaining - apply);
    if (remaining <= 0) break;
  }

  const baseline = calcMinimumOnlyBaseline(input.debts);
  const result = simulatePayoff({ ...input, debts: modifiedDebts, strategy });

  return {
    label: `$${windfallAmount.toLocaleString()} windfall`,
    totalMonths: result.totalMonths,
    totalInterest: result.totalInterestPaid,
    interestSaved: round2(baseline.totalInterest - result.totalInterestPaid),
    monthsSaved: Math.max(0, baseline.months - result.totalMonths),
  };
};

/**
 * Calculate the minimum extra monthly payment needed to be debt-free
 * within a target number of months.
 */
export const calcMinExtraForTarget = (
  debts: DebtAccount[],
  targetMonths: number,
  strategy: PayoffStrategy = 'avalanche',
): number => {
  let low = 0;
  let high = debts.reduce((s, d) => s + d.balance, 0);

  // Binary search for the minimum extra payment
  for (let i = 0; i < 50; i++) {
    const mid = round2((low + high) / 2);
    const input: DebtPayoffInput = { debts, strategy, extraMonthlyPayment: mid };
    const result = simulatePayoff(input);
    if (result.totalMonths <= targetMonths) {
      high = mid;
    } else {
      low = mid;
    }
    if (high - low < 1) break;
  }

  return Math.ceil(high);
};

// ─── Formatters (kept for backward compatibility) ─────────────

export const formatPayoffDuration = (months: number): string => {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
  if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`;
  return `${years} yr ${remainingMonths} mo`;
};

export const getBestStrategy = (
  snowball: PayoffResult,
  avalanche: PayoffResult,
  hybrid: PayoffResult,
): PayoffStrategy => {
  const interestMap: [PayoffStrategy, number][] = [
    ['snowball', snowball.totalInterestPaid],
    ['avalanche', avalanche.totalInterestPaid],
    ['hybrid', hybrid.totalInterestPaid],
  ];
  interestMap.sort((a, b) => a[1] - b[1]);
  return interestMap[0]?.[0] ?? 'avalanche';
};