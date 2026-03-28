// ============================================================
// DebtFreedom — Student Loan Refinance Estimator Math Engine
// Compares current federal/private loan vs. refinanced loan.
// Accounts for refinancing fees and break-even calculation.
// ============================================================

import type { StudentLoanInput, StudentLoanResult, LoanComparisonSnapshot } from '@/types';

const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;

/**
 * Standard amortizing loan monthly payment.
 * M = P × [r(1+r)^n] / [(1+r)^n - 1]
 */
const calcMonthlyPayment = (principal: number, annualRatePercent: number, termMonths: number): number => {
  if (annualRatePercent === 0) return round2(principal / termMonths);
  const r = annualRatePercent / 100 / 12;
  return round2(principal * (r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1));
};

/**
 * Generate monthly amortization schedule for a loan.
 */
const amortize = (
  principal: number,
  annualRatePercent: number,
  termMonths: number
): { balance: number; cumulativePaid: number }[] => {
  const monthlyRate = annualRatePercent / 100 / 12;
  const payment = calcMonthlyPayment(principal, annualRatePercent, termMonths);
  let balance = principal;
  let cumulativePaid = 0;
  const schedule: { balance: number; cumulativePaid: number }[] = [];

  for (let m = 0; m < termMonths; m++) {
    const interestCharge = round2(balance * monthlyRate);
    const principalPaid = round2(Math.min(payment - interestCharge, balance));
    balance = round2(Math.max(0, balance - principalPaid));
    cumulativePaid = round2(cumulativePaid + payment);
    schedule.push({ balance, cumulativePaid });
  }

  return schedule;
};

/**
 * Main student loan refinance analysis.
 *
 * IMPORTANT DISCLAIMER (also displayed in UI):
 * Federal student loans come with income-driven repayment plans, forgiveness
 * programs (PSLF, IDR forgiveness), and forbearance options. Refinancing to
 * private loans PERMANENTLY removes access to these benefits.
 * This calculator measures pure financial cost comparison only.
 */
export const calculateStudentLoanRefinance = (input: StudentLoanInput): StudentLoanResult => {
  const {
    loanBalance,
    currentRatePercent,
    currentTermMonths,
    currentMonthsRemaining,
    newRatePercent,
    newTermMonths,
    refinanceFeePercent,
  } = input;

  const currentMonthlyPayment = calcMonthlyPayment(loanBalance, currentRatePercent, currentTermMonths);
  const refinanceFee = round2(loanBalance * (refinanceFeePercent / 100));
  const refinancedBalance = round2(loanBalance + refinanceFee);
  const newMonthlyPayment = calcMonthlyPayment(refinancedBalance, newRatePercent, newTermMonths);

  const totalCurrentCost = round2(currentMonthlyPayment * currentMonthsRemaining);
  const totalNewCost = round2(newMonthlyPayment * newTermMonths);
  const totalSavings = round2(totalCurrentCost - totalNewCost);
  const monthlySavings = round2(currentMonthlyPayment - newMonthlyPayment);

  // Break-even: how many months until cumulative savings exceed refinancing fee
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(refinanceFee / monthlySavings) : Infinity;

  // Build comparison chart (show up to min of both terms)
  const currentSchedule = amortize(loanBalance, currentRatePercent, currentMonthsRemaining);
  const newSchedule = amortize(refinancedBalance, newRatePercent, newTermMonths);
  const chartLength = Math.max(currentMonthsRemaining, newTermMonths);

  const comparisonChart: LoanComparisonSnapshot[] = [];
  for (let m = 0; m < chartLength; m++) {
    const currentEntry = currentSchedule[m];
    const newEntry = newSchedule[m];
    comparisonChart.push({
      month: m + 1,
      currentBalance: currentEntry?.balance ?? 0,
      newBalance: newEntry?.balance ?? 0,
      cumulativeCurrentPaid: currentEntry?.cumulativePaid ?? totalCurrentCost,
      cumulativeNewPaid: newEntry?.cumulativePaid ?? totalNewCost,
    });
  }

  const recommendation: 'refinance' | 'keep' | 'marginal' =
    totalSavings > 5000 && breakEvenMonths < 24
      ? 'refinance'
      : totalSavings < 0
        ? 'keep'
        : 'marginal';

  return {
    currentMonthlyPayment,
    newMonthlyPayment,
    monthlySavings,
    totalCurrentCost,
    totalNewCost,
    totalSavings,
    refinanceFee,
    breakEvenMonths: isFinite(breakEvenMonths) ? breakEvenMonths : 9999,
    recommendation,
    comparisonChart,
  };
};
