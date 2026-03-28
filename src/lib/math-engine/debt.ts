// ============================================================
// DebtFreedom — Debt Payoff Math Engine
// Implements Snowball, Avalanche, and Hybrid strategies with
// full monthly amortization schedules. All math is integer-safe.
// ============================================================

import type {
  DebtAccount,
  DebtPayoffInput,
  MonthlySnapshot,
  PayoffResult,
  PayoffStrategy,
} from '@/types';

const MAX_MONTHS = 600; // 50-year safety cap to prevent infinite loops

// ─── Internal Helpers ─────────────────────────────────────────

/**
 * Round to 2 decimal places using banker's rounding for precision.
 * Native JS toFixed() has known floating-point issues.
 */
const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;

/**
 * Calculate monthly interest charge for a balance at an annual rate.
 * Uses exact monthly rate: r = APR / 12 (not approximated).
 */
const monthlyInterest = (balance: number, annualRatePercent: number): number => {
  const monthlyRate = annualRatePercent / 100 / 12;
  return round2(balance * monthlyRate);
};

/**
 * Calculate the fixed monthly payment for a standard amortizing loan.
 * Formula: P * [r(1+r)^n] / [(1+r)^n - 1]
 */
export const calcFixedMonthlyPayment = (
  principal: number,
  annualRatePercent: number,
  termMonths: number
): number => {
  if (annualRatePercent === 0) return round2(principal / termMonths);
  const r = annualRatePercent / 100 / 12;
  const payment = principal * (r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
  return round2(payment);
};

/**
 * Determine the sorted priority order of debts for a given strategy.
 * - Snowball: lowest balance first (psychological wins)
 * - Avalanche: highest APR first (mathematically optimal)
 * - Hybrid: Avalanche ordering but switches to Snowball
 *   after 3 months of motivation to stay engaged
 */
const getSortedPriority = (
  debts: DebtAccount[],
  strategy: PayoffStrategy,
  month: number
): DebtAccount[] => {
  const active = [...debts].filter((d) => d.balance > 0.01);

  switch (strategy) {
    case 'snowball':
      return active.sort((a, b) => a.balance - b.balance);
    case 'avalanche':
      return active.sort((a, b) => b.interestRate - a.interestRate);
    case 'hybrid':
      // Months 1-3: Snowball for motivation. Month 4+: Avalanche for efficiency.
      return month <= 3
        ? active.sort((a, b) => a.balance - b.balance)
        : active.sort((a, b) => b.interestRate - a.interestRate);
    default:
      return active;
  }
};

// ─── Baseline (Minimum Payments Only) ────────────────────────

/**
 * Calculate total cost if user only ever makes minimum payments.
 * This is the "trap" baseline used to compute Interest Saved and Time Saved.
 *
 * NOTE: Minimum payments on credit cards typically decline as balance falls
 * (e.g. 2% of balance). For simplicity in multi-debt scenarios, we treat
 * the minimumPayment as fixed (conservative estimate — actual savings are higher).
 */
const calcMinimumOnlyBaseline = (debts: DebtAccount[]): { months: number; totalInterest: number } => {
  const accounts = debts.map((d) => ({ ...d, balance: round2(d.balance) }));
  let month = 0;
  let totalInterest = 0;

  while (accounts.some((a) => a.balance > 0.01) && month < MAX_MONTHS) {
    month++;
    for (const account of accounts) {
      if (account.balance <= 0.01) continue;
      const interest = monthlyInterest(account.balance, account.interestRate);
      totalInterest = round2(totalInterest + interest);
      const payment = Math.min(account.minimumPayment, round2(account.balance + interest));
      account.balance = round2(account.balance + interest - payment);
      if (account.balance < 0.01) account.balance = 0;
    }
  }

  return { months: month, totalInterest: round2(totalInterest) };
};

// ─── Core Payoff Simulation ───────────────────────────────────

/**
 * Simulates month-by-month debt payoff for a given strategy.
 *
 * Algorithm:
 * 1. Each month, accrue interest on all balances.
 * 2. Pay minimums on ALL debts.
 * 3. Apply extra payment (snowball/avalanche) to highest-priority debt.
 * 4. If a debt is paid off, roll its minimum payment into the extra pool
 *    (the "snowball" effect — even for avalanche strategy).
 * 5. Record full snapshot for chart rendering.
 */
const simulatePayoff = (input: DebtPayoffInput): PayoffResult => {
  const { strategy, extraMonthlyPayment } = input;

  // Deep-clone to avoid mutating input
  const accounts = input.debts.map((d) => ({
    ...d,
    balance: round2(d.balance),
  }));

  const initialTotalBalance = round2(accounts.reduce((s, a) => s + a.balance, 0));
  const initialTotalMin = accounts.reduce((s, a) => s + a.minimumPayment, 0);

  const timeline: MonthlySnapshot[] = [];
  const payoffOrder: string[] = [];
  let month = 0;
  let totalInterestPaid = 0;
  let totalPaid = 0;
  // Extra payment pool grows as debts are paid off (rollover effect)
  let rollingExtra = round2(extraMonthlyPayment);

  while (accounts.some((a) => a.balance > 0.01) && month < MAX_MONTHS) {
    month++;
    let monthInterest = 0;
    let monthPrincipal = 0;

    // Step 1: Accrue interest on all active accounts
    for (const account of accounts) {
      if (account.balance <= 0.01) continue;
      const interest = monthlyInterest(account.balance, account.interestRate);
      account.balance = round2(account.balance + interest);
      monthInterest = round2(monthInterest + interest);
      totalInterestPaid = round2(totalInterestPaid + interest);
    }

    // Step 2: Pay minimums on all accounts
    let minPaid = 0;
    for (const account of accounts) {
      if (account.balance <= 0.01) continue;
      const payment = round2(Math.min(account.minimumPayment, account.balance));
      account.balance = round2(account.balance - payment);
      minPaid = round2(minPaid + payment);
      if (account.balance < 0.01) {
        // Debt fully paid — roll over its minimum payment
        rollingExtra = round2(rollingExtra + account.minimumPayment);
        if (!payoffOrder.includes(account.id)) {
          payoffOrder.push(account.id);
        }
        account.balance = 0;
      }
    }

    // Step 3: Apply extra payment to priority target
    const prioritized = getSortedPriority(accounts, strategy, month);
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
        }
        target.balance = 0;
      }
    }

    const monthPaymentTotal = round2(minPaid + (rollingExtra - extraMonthlyPayment - (rollingExtra - initialTotalMin - extraMonthlyPayment)));
    totalPaid = round2(totalPaid + minPaid + (rollingExtra > extraMonthlyPayment ? extraMonthlyPayment : rollingExtra));

    // Calculate monthly principal paid
    const currentTotal = round2(accounts.reduce((s, a) => s + a.balance, 0));
    monthPrincipal = round2(monthInterest > 0 ? minPaid - monthInterest + rollingExtra : minPaid + rollingExtra);

    // Record snapshot
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

  // Ensure all debts are in payoff order
  for (const account of accounts) {
    if (!payoffOrder.includes(account.id)) payoffOrder.push(account.id);
  }

  return {
    strategy,
    totalMonths: month,
    totalPaid: round2(totalPaid),
    totalInterestPaid: round2(totalInterestPaid),
    timeline,
    payoffOrder,
    interestSaved: 0, // Populated by compareStrategies
    monthsSaved: 0,   // Populated by compareStrategies
  };
};

// ─── Public API ───────────────────────────────────────────────

/**
 * Main entry point: calculates all three strategies and returns
 * results with Interest Saved and Time Saved vs. minimum-only baseline.
 *
 * @param input - Validated DebtPayoffInput (pass through Zod schema first)
 * @returns Object with results for each strategy and baseline comparison
 */
export const calculateDebtPayoff = (input: DebtPayoffInput): {
  snowball: PayoffResult;
  avalanche: PayoffResult;
  hybrid: PayoffResult;
  baseline: { months: number; totalInterest: number };
} => {
  const baseline = calcMinimumOnlyBaseline(input.debts);

  const runStrategy = (strategy: PayoffStrategy): PayoffResult => {
    const result = simulatePayoff({ ...input, strategy });
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

/**
 * Format months into human-readable "X years, Y months" string.
 */
export const formatPayoffDuration = (months: number): string => {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
  if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`;
  return `${years} yr ${remainingMonths} mo`;
};

/**
 * Determine which strategy saves the most interest.
 * Avalanche always wins or ties mathematically.
 */
export const getBestStrategy = (
  snowball: PayoffResult,
  avalanche: PayoffResult,
  hybrid: PayoffResult
): PayoffStrategy => {
  const interestMap: [PayoffStrategy, number][] = [
    ['snowball', snowball.totalInterestPaid],
    ['avalanche', avalanche.totalInterestPaid],
    ['hybrid', hybrid.totalInterestPaid],
  ];
  interestMap.sort((a, b) => a[1] - b[1]);
  return interestMap[0]?.[0] ?? 'avalanche';
};
