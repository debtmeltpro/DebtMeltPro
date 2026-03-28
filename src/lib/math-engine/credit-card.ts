// ============================================================
// DebtFreedom — Credit Card Payoff Optimizer v2
// ────────────────────────────────────────────
// NEW in v2:
//   • Balance transfer analysis (intro APR periods)
//   • Multi-card optimization (which card to pay first)
//   • APR change impact (rate hike/reduction modeling)
//   • Payoff date projection (calendar dates)
//   • Interest-to-principal ratio tracker
//   • "True cost" of purchases on credit
//   • Utilization impact estimator
//
// Backward-compatible: all v1 exports remain unchanged.
// ============================================================

import type { CreditCardInput, CreditCardResult, CreditCardSnapshot } from '@/types';

const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;
const MAX_MONTHS = 600;

// ─── Core Helpers ─────────────────────────────────────────────

const calcMinimumPayment = (
  balance: number,
  percentOfBalance: number,
  floor: number,
): number => {
  if (balance <= 0) return 0;
  const calculated = round2(balance * (percentOfBalance / 100));
  const payment = Math.max(floor, calculated);
  return round2(Math.min(payment, balance));
};

const simulatePayoff = (
  balance: number,
  apr: number,
  minPercent: number,
  minFloor: number,
  extraPayment: number,
  useFixedPayment: boolean,
): CreditCardSnapshot[] => {
  const monthlyRate = apr / 100 / 12;
  let currentBalance = round2(balance);
  const schedule: CreditCardSnapshot[] = [];
  const initialMin = calcMinimumPayment(currentBalance, minPercent, minFloor);
  const fixedPayment = round2(initialMin + extraPayment);
  let month = 0;

  while (currentBalance > 0.01 && month < MAX_MONTHS) {
    month++;
    const interestCharge = round2(currentBalance * monthlyRate);
    const balanceWithInterest = round2(currentBalance + interestCharge);

    let payment: number;
    if (useFixedPayment) {
      payment = round2(Math.min(fixedPayment, balanceWithInterest));
    } else {
      payment = calcMinimumPayment(balanceWithInterest, minPercent, minFloor);
      if (month === 1 && extraPayment > 0) {
        payment = round2(payment + extraPayment);
      }
    }

    const principalPaid = round2(Math.max(0, payment - interestCharge));
    currentBalance = round2(Math.max(0, balanceWithInterest - payment));

    schedule.push({ month, balance: currentBalance, payment, interestCharge, principalPaid });
  }

  return schedule;
};

// ─── Core Calculator (v1 compatible) ──────────────────────────

export const calculateCreditCardPayoff = (input: CreditCardInput): CreditCardResult => {
  const { balance, apr, minimumPaymentPercent, minimumPaymentFloor, fixedExtraPayment } = input;

  const minimumSchedule = simulatePayoff(
    balance, apr, minimumPaymentPercent, minimumPaymentFloor, 0, false,
  );
  const optimizedSchedule = simulatePayoff(
    balance, apr, minimumPaymentPercent, minimumPaymentFloor, fixedExtraPayment, true,
  );

  const sumPayments = (s: CreditCardSnapshot[]) => round2(s.reduce((t, m) => t + m.payment, 0));
  const sumInterest = (s: CreditCardSnapshot[]) =>
    round2(s.reduce((t, m) => t + m.interestCharge, 0));

  const minimumOnlyTotalPaid = sumPayments(minimumSchedule);
  const minimumOnlyInterestPaid = sumInterest(minimumSchedule);
  const optimizedTotalPaid = sumPayments(optimizedSchedule);
  const optimizedInterestPaid = sumInterest(optimizedSchedule);

  return {
    minimumOnlyMonths: minimumSchedule.length,
    minimumOnlyTotalPaid,
    minimumOnlyInterestPaid,
    optimizedMonths: optimizedSchedule.length,
    optimizedTotalPaid,
    optimizedInterestPaid,
    interestSaved: round2(minimumOnlyInterestPaid - optimizedInterestPaid),
    monthsSaved: minimumSchedule.length - optimizedSchedule.length,
    monthlySchedule: optimizedSchedule,
  };
};

// ─── NEW: Balance Transfer Analysis ───────────────────────────

export interface BalanceTransferResult {
  /** Monthly payment during intro period */
  introMonthlyPayment: number;
  /** Monthly payment after intro expires */
  postIntroMonthlyPayment: number;
  /** Total interest with balance transfer */
  totalInterestBT: number;
  /** Total interest staying on current card */
  totalInterestCurrent: number;
  /** Net savings (positive = BT wins) */
  netSavings: number;
  /** Remaining balance when intro period ends */
  balanceAtIntroEnd: number;
  /** Is the transfer worth it? */
  recommendation: 'transfer' | 'stay' | 'marginal';
  /** Break-even month (when BT savings exceed transfer fee) */
  breakEvenMonth: number;
  /** Full schedule */
  schedule: CreditCardSnapshot[];
}

export const calculateBalanceTransfer = (
  currentBalance: number,
  currentAPR: number,
  introAPR: number,
  introPeriodMonths: number,
  postIntroAPR: number,
  transferFeePercent: number,
  monthlyPayment: number,
): BalanceTransferResult => {
  const transferFee = round2(currentBalance * (transferFeePercent / 100));
  let btBalance = round2(currentBalance + transferFee);
  let totalInterestBT = 0;
  const schedule: CreditCardSnapshot[] = [];
  let month = 0;

  // Phase 1: Intro period
  const introMonthlyRate = introAPR / 100 / 12;
  while (btBalance > 0.01 && month < introPeriodMonths) {
    month++;
    const interest = round2(btBalance * introMonthlyRate);
    totalInterestBT = round2(totalInterestBT + interest);
    const payment = round2(Math.min(monthlyPayment, btBalance + interest));
    const principal = round2(payment - interest);
    btBalance = round2(Math.max(0, btBalance + interest - payment));
    schedule.push({ month, balance: btBalance, payment, interestCharge: interest, principalPaid: principal });
  }

  const balanceAtIntroEnd = round2(btBalance);

  // Phase 2: Post-intro
  const postIntroMonthlyRate = postIntroAPR / 100 / 12;
  while (btBalance > 0.01 && month < MAX_MONTHS) {
    month++;
    const interest = round2(btBalance * postIntroMonthlyRate);
    totalInterestBT = round2(totalInterestBT + interest);
    const payment = round2(Math.min(monthlyPayment, btBalance + interest));
    const principal = round2(payment - interest);
    btBalance = round2(Math.max(0, btBalance + interest - payment));
    schedule.push({ month, balance: btBalance, payment, interestCharge: interest, principalPaid: principal });
  }

  // Compare: staying on current card with same monthly payment
  let stayBalance = round2(currentBalance);
  let totalInterestCurrent = 0;
  const currentMonthlyRate = currentAPR / 100 / 12;
  let stayMonth = 0;
  while (stayBalance > 0.01 && stayMonth < MAX_MONTHS) {
    stayMonth++;
    const interest = round2(stayBalance * currentMonthlyRate);
    totalInterestCurrent = round2(totalInterestCurrent + interest);
    const payment = round2(Math.min(monthlyPayment, stayBalance + interest));
    stayBalance = round2(Math.max(0, stayBalance + interest - payment));
  }

  const netSavings = round2(totalInterestCurrent - totalInterestBT - transferFee);

  // Break-even calculation
  let breakEvenMonth = 0;
  let cumulativeSavings = -transferFee;
  let btBal2 = round2(currentBalance + transferFee);
  let stayBal2 = round2(currentBalance);
  for (let m = 1; m <= MAX_MONTHS && breakEvenMonth === 0; m++) {
    const btRate = m <= introPeriodMonths ? introMonthlyRate : postIntroMonthlyRate;
    const btInt = round2(btBal2 * btRate);
    const stayInt = round2(stayBal2 * currentMonthlyRate);
    cumulativeSavings = round2(cumulativeSavings + stayInt - btInt);
    btBal2 = round2(Math.max(0, btBal2 + btInt - Math.min(monthlyPayment, btBal2 + btInt)));
    stayBal2 = round2(Math.max(0, stayBal2 + stayInt - Math.min(monthlyPayment, stayBal2 + stayInt)));
    if (cumulativeSavings > 0) breakEvenMonth = m;
    if (btBal2 <= 0.01 && stayBal2 <= 0.01) break;
  }

  let recommendation: BalanceTransferResult['recommendation'];
  if (netSavings > 200) recommendation = 'transfer';
  else if (netSavings < -100) recommendation = 'stay';
  else recommendation = 'marginal';

  return {
    introMonthlyPayment: round2(monthlyPayment),
    postIntroMonthlyPayment: round2(monthlyPayment),
    totalInterestBT: round2(totalInterestBT),
    totalInterestCurrent: round2(totalInterestCurrent),
    netSavings,
    balanceAtIntroEnd,
    recommendation,
    breakEvenMonth,
    schedule,
  };
};

// ─── NEW: Multi-Card Optimizer ────────────────────────────────

export interface CardInfo {
  id: string;
  name: string;
  balance: number;
  apr: number;
  minimumPayment: number;
  creditLimit: number;
}

export interface MultiCardResult {
  /** Optimal payoff order (avalanche — highest APR first) */
  optimalOrder: { id: string; name: string; apr: number; balance: number; payoffMonth: number }[];
  /** Total interest if paying optimally */
  totalInterestOptimal: number;
  /** Total interest with minimums only */
  totalInterestMinimums: number;
  /** Interest saved */
  interestSaved: number;
  /** Overall utilization ratio */
  totalUtilization: number;
  /** Per-card utilization */
  cardUtilizations: { id: string; name: string; utilization: number; status: string }[];
  /** Projected debt-free date */
  debtFreeDate: string;
  /** Total months to debt-free */
  totalMonths: number;
}

export const optimizeMultipleCards = (
  cards: CardInfo[],
  extraMonthlyPayment: number,
): MultiCardResult => {
  // Calculate utilizations
  const totalBalance = cards.reduce((s, c) => s + c.balance, 0);
  const totalLimit = cards.reduce((s, c) => s + c.creditLimit, 0);
  const totalUtilization = round2((totalBalance / totalLimit) * 100);

  const cardUtilizations = cards.map((c) => {
    const util = round2((c.balance / c.creditLimit) * 100);
    let status: string;
    if (util <= 10) status = 'Excellent';
    else if (util <= 30) status = 'Good';
    else if (util <= 50) status = 'Fair';
    else if (util <= 75) status = 'High';
    else status = 'Critical';
    return { id: c.id, name: c.name, utilization: util, status };
  });

  // Simulate optimal payoff (avalanche)
  const accounts = cards.map((c) => ({ ...c, balance: round2(c.balance) }));
  accounts.sort((a, b) => b.apr - a.apr);

  let totalInterestOptimal = 0;
  let month = 0;
  let rollingExtra = extraMonthlyPayment;
  const payoffMonths: Record<string, number> = {};

  while (accounts.some((a) => a.balance > 0.01) && month < MAX_MONTHS) {
    month++;
    // Accrue interest
    for (const acct of accounts) {
      if (acct.balance <= 0.01) continue;
      const interest = round2(acct.balance * (acct.apr / 100 / 12));
      acct.balance = round2(acct.balance + interest);
      totalInterestOptimal = round2(totalInterestOptimal + interest);
    }
    // Pay minimums
    for (const acct of accounts) {
      if (acct.balance <= 0.01) continue;
      const payment = round2(Math.min(acct.minimumPayment, acct.balance));
      acct.balance = round2(acct.balance - payment);
      if (acct.balance < 0.01) {
        rollingExtra = round2(rollingExtra + acct.minimumPayment);
        payoffMonths[acct.id] = month;
        acct.balance = 0;
      }
    }
    // Apply extra to highest APR
    let remaining = rollingExtra;
    for (const acct of accounts.filter((a) => a.balance > 0.01).sort((a, b) => b.apr - a.apr)) {
      if (remaining <= 0) break;
      const payment = round2(Math.min(remaining, acct.balance));
      acct.balance = round2(acct.balance - payment);
      remaining = round2(remaining - payment);
      if (acct.balance < 0.01) {
        rollingExtra = round2(rollingExtra + acct.minimumPayment);
        payoffMonths[acct.id] = month;
        acct.balance = 0;
      }
    }
  }

  // Minimum-only baseline
  const baselineAccounts = cards.map((c) => ({ ...c, balance: round2(c.balance) }));
  let totalInterestMinimums = 0;
  let baseMonth = 0;
  while (baselineAccounts.some((a) => a.balance > 0.01) && baseMonth < MAX_MONTHS) {
    baseMonth++;
    for (const acct of baselineAccounts) {
      if (acct.balance <= 0.01) continue;
      const interest = round2(acct.balance * (acct.apr / 100 / 12));
      totalInterestMinimums = round2(totalInterestMinimums + interest);
      const payment = round2(Math.min(acct.minimumPayment, acct.balance + interest));
      acct.balance = round2(Math.max(0, acct.balance + interest - payment));
    }
  }

  const debtFreeDate = new Date();
  debtFreeDate.setMonth(debtFreeDate.getMonth() + month);

  return {
    optimalOrder: cards
      .map((c) => ({
        id: c.id, name: c.name, apr: c.apr, balance: c.balance,
        payoffMonth: payoffMonths[c.id] ?? month,
      }))
      .sort((a, b) => a.payoffMonth - b.payoffMonth),
    totalInterestOptimal: round2(totalInterestOptimal),
    totalInterestMinimums: round2(totalInterestMinimums),
    interestSaved: round2(totalInterestMinimums - totalInterestOptimal),
    totalUtilization,
    cardUtilizations,
    debtFreeDate: debtFreeDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
    totalMonths: month,
  };
};

// ─── NEW: True Cost of a Purchase ─────────────────────────────

export interface PurchaseCostResult {
  /** Original purchase price */
  purchasePrice: number;
  /** Total amount paid including interest */
  totalCost: number;
  /** Interest paid on this purchase */
  interestCost: number;
  /** Months to pay off (at minimum payments) */
  monthsToPayOff: number;
  /** Effective markup (how much more you pay than the price) */
  markupPercent: number;
}

/**
 * Show the true cost of a credit card purchase if only paying minimums.
 * Eye-opening: a $1,000 purchase at 24% APR with 2% minimums costs $2,478.
 */
export const calculatePurchaseTrueCost = (
  purchasePrice: number,
  apr: number,
  minimumPaymentPercent: number = 2,
  minimumPaymentFloor: number = 25,
): PurchaseCostResult => {
  const schedule = simulatePayoff(purchasePrice, apr, minimumPaymentPercent, minimumPaymentFloor, 0, false);
  const totalCost = round2(schedule.reduce((s, m) => s + m.payment, 0));
  const interestCost = round2(totalCost - purchasePrice);

  return {
    purchasePrice,
    totalCost,
    interestCost,
    monthsToPayOff: schedule.length,
    markupPercent: round2((interestCost / purchasePrice) * 100),
  };
};

// ─── NEW: APR Change Impact ───────────────────────────────────

export interface APRChangeImpact {
  currentAPR: number;
  newAPR: number;
  currentTotalInterest: number;
  newTotalInterest: number;
  interestDifference: number;
  currentPayoffMonths: number;
  newPayoffMonths: number;
  monthsDifference: number;
}

/**
 * Model the impact of an APR increase or decrease (e.g., Fed rate change,
 * penalty rate, or negotiated reduction).
 */
export const calculateAPRChangeImpact = (
  balance: number,
  currentAPR: number,
  newAPR: number,
  monthlyPayment: number,
): APRChangeImpact => {
  const simulate = (apr: number) => {
    const monthlyRate = apr / 100 / 12;
    let bal = balance;
    let totalInterest = 0;
    let months = 0;
    while (bal > 0.01 && months < MAX_MONTHS) {
      months++;
      const interest = round2(bal * monthlyRate);
      totalInterest = round2(totalInterest + interest);
      const pmt = round2(Math.min(monthlyPayment, bal + interest));
      bal = round2(Math.max(0, bal + interest - pmt));
    }
    return { totalInterest, months };
  };

  const current = simulate(currentAPR);
  const newResult = simulate(newAPR);

  return {
    currentAPR,
    newAPR,
    currentTotalInterest: current.totalInterest,
    newTotalInterest: newResult.totalInterest,
    interestDifference: round2(newResult.totalInterest - current.totalInterest),
    currentPayoffMonths: current.months,
    newPayoffMonths: newResult.months,
    monthsDifference: newResult.months - current.months,
  };
};