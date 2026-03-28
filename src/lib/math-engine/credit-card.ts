// ============================================================
// DebtFreedom — Credit Card Payoff Optimizer Math Engine
// Exposes the "Minimum Payment Trap" mathematically.
// Simulates declining minimums vs. fixed extra payments.
// ============================================================

import type { CreditCardInput, CreditCardResult, CreditCardSnapshot } from '@/types';

const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;
const MAX_MONTHS = 600;

/**
 * Credit card minimum payment calculation.
 * Most issuers use: MAX(floor, balance × percentOfBalance)
 * As balance declines, minimums decline — this is the trap.
 */
const calcMinimumPayment = (
  balance: number,
  percentOfBalance: number,
  floor: number
): number => {
  if (balance <= 0) return 0;
  const calculated = round2(balance * (percentOfBalance / 100));
  const payment = Math.max(floor, calculated);
  return round2(Math.min(payment, balance)); // Can't pay more than owed
};

/**
 * Simulate month-by-month credit card payoff.
 *
 * @param useFixedPayment - If true, payment = first month's minimum + extra (fixed).
 *                          If false, payment = declining minimum each month.
 */
const simulatePayoff = (
  balance: number,
  apr: number,
  minPercent: number,
  minFloor: number,
  extraPayment: number,
  useFixedPayment: boolean
): CreditCardSnapshot[] => {
  const monthlyRate = apr / 100 / 12;
  let currentBalance = round2(balance);
  const schedule: CreditCardSnapshot[] = [];

  // Fixed payment = first month's minimum + extra (prevents the trap)
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

    schedule.push({
      month,
      balance: currentBalance,
      payment,
      interestCharge,
      principalPaid,
    });
  }

  return schedule;
};

/**
 * Main credit card optimizer.
 * Shows side-by-side: minimum-only vs. fixed (optimized) payment strategy.
 */
export const calculateCreditCardPayoff = (input: CreditCardInput): CreditCardResult => {
  const { balance, apr, minimumPaymentPercent, minimumPaymentFloor, fixedExtraPayment } = input;

  // Minimum-only simulation (declining payments — the trap)
  const minimumSchedule = simulatePayoff(
    balance, apr, minimumPaymentPercent, minimumPaymentFloor, 0, false
  );

  // Optimized simulation (fixed payment)
  const optimizedSchedule = simulatePayoff(
    balance, apr, minimumPaymentPercent, minimumPaymentFloor, fixedExtraPayment, true
  );

  const sumPayments = (schedule: CreditCardSnapshot[]) =>
    round2(schedule.reduce((s, m) => s + m.payment, 0));
  const sumInterest = (schedule: CreditCardSnapshot[]) =>
    round2(schedule.reduce((s, m) => s + m.interestCharge, 0));

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
