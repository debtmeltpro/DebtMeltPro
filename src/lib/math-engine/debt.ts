// ============================================================
// DebtMeltPro — Debt Payoff Math Engine v2
// ────────────────────────────────────────
// NEW in v2:
//   • Variable interest rate support (annual adjustment)
//   • Improved hybrid strategy (normalized weighted scoring)
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
const MAX_RATE = 36; // Cap variable rates at 36%
const GROWTH_THRESHOLD = 6; // consecutive months of total balance growth → unpayable
const BALANCE_EPS = 0.01;

// ─── Internal Helpers ─────────────────────────────────────────

const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;

const safeNum = (n: number): number => (isFinite(n) ? n : 0);

const safeDivide = (a: number, b: number): number => {
  if (!isFinite(a) || !isFinite(b) || b === 0) return 0;
  return a / b;
};

const monthlyInterest = (balance: number, annualRatePercent: number): number => {
  const b = safeNum(balance);
  const r = safeNum(annualRatePercent);
  const monthlyRate = r / 100 / 12;
  return round2(b * monthlyRate);
};

export const calcFixedMonthlyPayment = (
  principal: number,
  annualRatePercent: number,
  termMonths: number,
): number => {
  const p = Math.max(0, safeNum(principal));
  const t = Math.max(1, Math.floor(safeNum(termMonths)));
  if (annualRatePercent === 0) return round2(p / t);
  const r = annualRatePercent / 100 / 12;
  if (!isFinite(r) || r <= 0) return round2(p / t);
  const payment =
    p * (r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);
  return round2(isFinite(payment) ? payment : p / t);
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

// ─── Variable Rate Adjustment Helper ──────────────────────────

/**
 * Adjusts interest rates for variable-rate accounts at year boundaries.
 * Mutates the accounts array (caller must pass a copy).
 * Caps rates at MAX_RATE to prevent runaway values.
 */
const adjustVariableRates = (accounts: DebtAccount[]): void => {
  for (const account of accounts) {
    if (
      account.interestType === 'variable' &&
      typeof account.annualRateChangePercent === 'number' &&
      isFinite(account.annualRateChangePercent) &&
      account.annualRateChangePercent !== 0
    ) {
      account.interestRate = Math.max(
        0,
        Math.min(MAX_RATE, account.interestRate + account.annualRateChangePercent),
      );
    }
  }
};

// ─── Priority Sorting ─────────────────────────────────────────

const getSortedPriority = (
  debts: DebtAccount[],
  strategy: PayoffStrategy,
  _month: number,
  customOrder?: string[],
): DebtAccount[] => {
  const active = [...debts].filter(
    (d) => isFinite(d.balance) && isFinite(d.interestRate) && d.balance > BALANCE_EPS,
  );
  if (active.length === 0) return [];

  switch (strategy) {
    case 'snowball':
      return active.sort((a, b) => a.balance - b.balance);
    case 'avalanche':
      return active.sort((a, b) => b.interestRate - a.interestRate);
    case 'hybrid': {
      // Normalize rate and balance to 0-1 range, then weight
      // 65% interest rate priority + 35% small-balance priority
      const maxRate = Math.max(...active.map((d) => d.interestRate), 1);
      const maxBal = Math.max(...active.map((d) => d.balance), 1);
      return active.sort((a, b) => {
        const scoreA =
          (a.interestRate / maxRate) * 0.65 + (1 - a.balance / maxBal) * 0.35;
        const scoreB =
          (b.interestRate / maxRate) * 0.65 + (1 - b.balance / maxBal) * 0.35;
        return scoreB - scoreA;
      });
    }
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
  const { strategy } = input;
  const accounts = input.debts.map((d) => ({
    ...d,
    balance: round2(Math.max(0, safeNum(d.balance))),
    minimumPayment: round2(Math.max(0, safeNum(d.minimumPayment))),
    interestRate: Math.min(MAX_RATE, Math.max(0, safeNum(d.interestRate))),
  }));

  const totalBalance = round2(accounts.reduce((s, a) => s + a.balance, 0));
  const weightedAverageRate =
    totalBalance > BALANCE_EPS
      ? round2(accounts.reduce((s, a) => s + a.interestRate * safeDivide(a.balance, totalBalance), 0))
      : 0;

  const timeline: MonthlySnapshot[] = [];
  const payoffOrder: string[] = [];
  const debtPayoffMonths: Record<string, number> = {};
  const interestByDebt: Record<string, number> = {};
  for (const a of accounts) interestByDebt[a.id] = 0;

  let month = 0;
  let totalInterestPaid = 0;
  let totalPaid = 0;

  let previousBalance = totalBalance;
  let growthMonths = 0;
  let brokeForUnpayable = false;

  while (accounts.some((a) => a.balance > BALANCE_EPS) && month < MAX_MONTHS) {
    month++;

    if (month > 1 && month % 12 === 1) {
      adjustVariableRates(accounts);
    }

    let monthInterest = 0;

    for (const account of accounts) {
      if (account.balance <= BALANCE_EPS) continue;
      let interest = monthlyInterest(account.balance, account.interestRate);
      if (!isFinite(interest)) interest = 0;
      account.balance = round2(Math.max(0, safeNum(account.balance) + interest));
      monthInterest = round2(monthInterest + interest);
      totalInterestPaid = round2(totalInterestPaid + interest);
      interestByDebt[account.id] = round2(safeNum(interestByDebt[account.id] ?? 0) + interest);
    }

    let minPaid = 0;
    for (const account of accounts) {
      if (account.balance <= BALANCE_EPS) continue;
      let payment = round2(Math.min(account.minimumPayment, account.balance));
      if (!isFinite(payment)) payment = 0;
      payment = Math.max(0, Math.min(payment, safeNum(account.balance)));
      account.balance = round2(Math.max(0, safeNum(account.balance) - payment));
      minPaid = round2(minPaid + payment);
      if (account.balance < BALANCE_EPS) {
        if (!payoffOrder.includes(account.id)) {
          payoffOrder.push(account.id);
          debtPayoffMonths[account.id] = month;
        }
        account.balance = 0;
      }
    }

    const extraBudget = round2(Math.max(0, safeNum(input.extraMonthlyPayment)));
    let remainingExtra = extraBudget;
    if (!isFinite(remainingExtra)) remainingExtra = 0;

    const prioritized = getSortedPriority(accounts, strategy, month, customOrder);
    for (const target of prioritized) {
      if (remainingExtra <= BALANCE_EPS) break;
      let payment = round2(Math.min(remainingExtra, Math.max(0, safeNum(target.balance))));
      if (!isFinite(payment)) payment = 0;
      payment = Math.max(0, Math.min(payment, safeNum(target.balance)));
      target.balance = round2(Math.max(0, safeNum(target.balance) - payment));
      remainingExtra = round2(Math.max(0, remainingExtra - payment));
      if (!isFinite(remainingExtra)) remainingExtra = 0;
      if (target.balance < BALANCE_EPS) {
        if (!payoffOrder.includes(target.id)) {
          payoffOrder.push(target.id);
          debtPayoffMonths[target.id] = month;
        }
        target.balance = 0;
      }
    }

    const extraApplied = round2(extraBudget - remainingExtra);
    totalPaid = round2(totalPaid + minPaid + extraApplied);

    let currentTotal = round2(accounts.reduce((s, a) => s + a.balance, 0));
    if (!isFinite(currentTotal)) currentTotal = 0;
    let totalPaymentThisMonth = round2(minPaid + extraApplied);
    if (!isFinite(totalPaymentThisMonth)) totalPaymentThisMonth = 0;
    let monthPrincipal = round2(Math.max(0, totalPaymentThisMonth - monthInterest));
    if (!isFinite(monthPrincipal)) monthPrincipal = 0;

    const accountBalances: Record<string, number> = {};
    for (const a of accounts) accountBalances[a.id] = round2(Math.max(0, a.balance));

    timeline.push({
      month,
      totalBalance: safeNum(currentTotal),
      interestPaid: round2(monthInterest),
      principalPaid: round2(monthPrincipal),
      accounts: accountBalances,
    });

    const negativeAmortMonth = totalPaymentThisMonth < monthInterest;
    const balanceGrowing = currentTotal > previousBalance + BALANCE_EPS;
    if (negativeAmortMonth) {
      growthMonths++;
    } else {
      growthMonths = 0;
    }
    previousBalance = currentTotal;

    if (growthMonths >= GROWTH_THRESHOLD) {
      brokeForUnpayable = true;
      break;
    }
  }

  const remainingDebt = accounts.some((a) => a.balance > BALANCE_EPS);
  const hitCap = month >= MAX_MONTHS && remainingDebt;
  const isUnpayable = brokeForUnpayable || hitCap;

  let projectedPayoffDate = '';
  let finalTimeline = timeline;
  let finalTotalMonths = month;
  const finalPayoffOrder = [...payoffOrder];
  const finalDebtPayoffMonths = { ...debtPayoffMonths };

  if (isUnpayable) {
    finalTotalMonths = 0;
    projectedPayoffDate = '';
  } else {
    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + month);
    projectedPayoffDate = payoffDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });

    for (const account of accounts) {
      if (!finalPayoffOrder.includes(account.id)) {
        finalPayoffOrder.push(account.id);
        finalDebtPayoffMonths[account.id] = month;
      }
    }
  }

  return {
    strategy,
    totalMonths: finalTotalMonths,
    totalPaid: round2(Math.max(0, totalPaid)),
    totalInterestPaid: round2(Math.max(0, totalInterestPaid)),
    timeline: finalTimeline,
    payoffOrder: finalPayoffOrder,
    interestSaved: 0,
    monthsSaved: 0,
    isUnpayable,
    debtPayoffMonths: finalDebtPayoffMonths,
    interestByDebt,
    projectedPayoffDate,
    weightedAverageRate,
  };
};

// ─── Baseline (same simulation, extra = 0) ───────────────────

const calcMinimumOnlyBaseline = (
  debts: DebtAccount[],
): { months: number; totalInterest: number; interestByDebt: Record<string, number>; isUnpayable: boolean } => {
  const result = simulatePayoff({
    debts: debts.map((d) => ({ ...d })),
    extraMonthlyPayment: 0,
    strategy: 'avalanche',
  });
  return {
    months: result.isUnpayable ? 0 : result.totalMonths,
    totalInterest: round2(Math.max(0, result.totalInterestPaid)),
    interestByDebt: result.interestByDebt,
    isUnpayable: result.isUnpayable,
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
  baseline: { months: number; totalInterest: number; interestByDebt: Record<string, number>; isUnpayable: boolean };
} => {
  const baseline = calcMinimumOnlyBaseline(input.debts);

  const snowballResult = simulatePayoff({ ...input, strategy: 'snowball' }, customOrder);
  const avalancheResult = simulatePayoff({ ...input, strategy: 'avalanche' }, customOrder);
  const hybridResult = simulatePayoff({ ...input, strategy: 'hybrid' }, customOrder);

  const maxInterest = Math.max(
    safeNum(snowballResult.totalInterestPaid),
    safeNum(avalancheResult.totalInterestPaid),
    safeNum(hybridResult.totalInterestPaid),
  );
  const maxMonths = Math.max(
    safeNum(snowballResult.totalMonths),
    safeNum(avalancheResult.totalMonths),
    safeNum(hybridResult.totalMonths),
  );

  const runStrategy = (result: PayoffResultV2): PayoffResultV2 => {
    const resOk = !result.isUnpayable && result.totalMonths > 0;
    return {
      ...result,
      interestSaved: resOk
        ? round2(Math.max(0, maxInterest - safeNum(result.totalInterestPaid)))
        : 0,
      monthsSaved: resOk ? Math.max(0, maxMonths - safeNum(result.totalMonths)) : 0,
    };
  };

  return {
    snowball: runStrategy(snowballResult),
    avalanche: runStrategy(avalancheResult),
    hybrid: runStrategy(hybridResult),
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
  const income = Math.max(0, safeNum(monthlyGrossIncome));
  const totalDebtPayments = debts.reduce((s, d) => s + safeNum(d.minimumPayment), 0);
  const totalMonthlyObligations = safeNum(monthlyHousingCost) + totalDebtPayments;

  const frontEndDTI =
    income > 0 ? round2((safeNum(monthlyHousingCost) / income) * 100) : 0;
  const backEndDTI =
    income > 0 ? round2((totalMonthlyObligations / income) * 100) : 0;

  const maxBackEnd = income * 0.43;
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
  let totalBalance = round2(debts.reduce((s, d) => s + d.balance, 0));
  if (!isFinite(totalBalance)) totalBalance = 0;
  const currentMonthlyTotal = round2(debts.reduce((s, d) => s + d.minimumPayment, 0));
  const currentWeightedRate = (() => {
    const w = round2(
      debts.reduce((s, d) => s + safeNum(d.interestRate) * safeDivide(d.balance, totalBalance), 0),
    );
    return isFinite(w) ? w : 0;
  })();

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
    .sort((a, b) => safeNum(b.interestRate) - safeNum(a.interestRate));

  let remaining = safeNum(windfallAmount);
  for (const debt of modifiedDebts) {
    let apply = Math.min(remaining, safeNum(debt.balance));
    if (!isFinite(apply)) apply = 0;
    debt.balance = round2(Math.max(0, safeNum(debt.balance) - apply));
    remaining = round2(remaining - apply);
    if (!isFinite(remaining)) remaining = 0;
    if (remaining <= 0) break;
  }

  const baseline = calcMinimumOnlyBaseline(input.debts);
  const result = simulatePayoff({ ...input, debts: modifiedDebts, strategy });

  const baseOk = !baseline.isUnpayable && baseline.months > 0;
  const resOk = !result.isUnpayable && result.totalMonths > 0;

  return {
    label: `$${windfallAmount.toLocaleString()} windfall`,
    totalMonths: result.totalMonths,
    totalInterest: result.totalInterestPaid,
    interestSaved:
      baseOk && resOk
        ? round2(Math.max(0, baseline.totalInterest - result.totalInterestPaid))
        : 0,
    monthsSaved: baseOk && resOk ? Math.max(0, baseline.months - result.totalMonths) : 0,
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
  const sumBal = debts.reduce((s, d) => s + safeNum(d.balance), 0);
  let high = round2(Math.max(sumBal * 2 + 1000, 1000));

  for (let i = 0; i < 50; i++) {
    const mid = round2((low + high) / 2);
    const input: DebtPayoffInput = {
      debts: debts.map((d) => ({ ...d })),
      strategy,
      extraMonthlyPayment: mid,
    };
    const result = simulatePayoff(input);
    if (!result.isUnpayable && result.totalMonths > 0 && result.totalMonths <= targetMonths) {
      high = mid;
    } else {
      low = mid;
    }
    if (high - low < 1) break;
  }

  return Math.ceil(Math.max(0, safeNum(high)));
};

// ─── Formatters (kept for backward compatibility) ─────────────

export const formatPayoffDuration = (months: number): string => {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
  if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`;
  return `${years} yr ${remainingMonths} mo`;
};
export interface GetBestStrategyResult {
  strategy: PayoffStrategy | null;
  isEqualStrategy: boolean;
}

const STRATEGY_EPS = 0.01;

export const getBestStrategy = (
  snowball: PayoffResult,
  avalanche: PayoffResult,
  hybrid: PayoffResult,
): GetBestStrategyResult => {
  const all = [
    { key: 'snowball' as PayoffStrategy, data: snowball },
    { key: 'avalanche' as PayoffStrategy, data: avalanche },
    { key: 'hybrid' as PayoffStrategy, data: hybrid },
  ];

  const allPayable = all.every((s) => !s.data.isUnpayable);
  if (!allPayable) {
    const payable = all.filter((s) => !s.data.isUnpayable);
    if (payable.length === 0) return { strategy: null, isEqualStrategy: false };
    payable.sort((a, b) => {
      const di = a.data.totalInterestPaid - b.data.totalInterestPaid;
      if (Math.abs(di) >= STRATEGY_EPS) return di;
      return a.data.totalMonths - b.data.totalMonths;
    });
    return { strategy: payable[0]!.key, isEqualStrategy: false };
  }

  const first = all[0]!.data;
  const allEqual = all.every(
    (s) =>
      Math.abs(s.data.totalInterestPaid - first.totalInterestPaid) < STRATEGY_EPS &&
      Math.abs(s.data.totalMonths - first.totalMonths) < STRATEGY_EPS,
  );

  if (allEqual) {
    return { strategy: 'avalanche', isEqualStrategy: true };
  }

  const sorted = [...all];
  sorted.sort((a, b) => {
    const di = a.data.totalInterestPaid - b.data.totalInterestPaid;
    if (Math.abs(di) >= STRATEGY_EPS) return di;
    return a.data.totalMonths - b.data.totalMonths;
  });
  return { strategy: sorted[0]!.key, isEqualStrategy: false };
};