// ============================================================
// DebtFreedom — Compound Interest & FIRE Math Engine
// Features: monthly compounding, inflation adjustment,
// FIRE number (25× annual expenses), withdrawal simulation.
// ============================================================

import type { CompoundInput, CompoundResult, CompoundYearlySnapshot } from '@/types';

const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;

/**
 * Adjust a nominal dollar amount to real (inflation-adjusted) dollars.
 * Real = Nominal / (1 + inflation)^years
 */
const toRealDollars = (nominal: number, inflationPercent: number, years: number): number => {
  return round2(nominal / Math.pow(1 + inflationPercent / 100, years));
};

/**
 * Calculate compound interest growth month by month.
 *
 * Uses monthly compounding (most common for investment accounts):
 * A = P(1 + r/12)^(12t) + PMT × [(1 + r/12)^(12t) - 1] / (r/12)
 *
 * FIRE Number = Annual Expenses / Safe Withdrawal Rate
 * Standard SWR = 4% (Trinity Study), meaning 25× annual expenses.
 *
 * Monthly withdrawal strategy: After FIRE, show sustainable monthly income.
 */
export const calculateCompound = (input: CompoundInput): CompoundResult => {
  const {
    initialAmount,
    monthlyContribution,
    annualReturnPercent,
    years,
    inflationPercent,
    adjustForInflation,
    withdrawalRatePercent,
  } = input;

  const monthlyRate = annualReturnPercent / 100 / 12;
  const totalMonths = years * 12;

  let balance = initialAmount;
  let totalContributions = initialAmount;
  let totalInterestEarned = 0;
  const yearlyData: CompoundYearlySnapshot[] = [];
  let fireAchievedMonth: number | null = null;

  // Annual expenses = monthly contribution × 12 (what they're saving = what they spend)
  const annualExpenses = monthlyContribution * 12;
  const fireNumber = round2(annualExpenses / (withdrawalRatePercent / 100));

  for (let month = 1; month <= totalMonths; month++) {
    // Compound growth
    const interestThisMonth = round2(balance * monthlyRate);
    balance = round2(balance + interestThisMonth + monthlyContribution);
    totalContributions = round2(totalContributions + monthlyContribution);
    totalInterestEarned = round2(totalInterestEarned + interestThisMonth);

    // FIRE milestone detection
    if (fireAchievedMonth === null && balance >= fireNumber) {
      fireAchievedMonth = month;
    }

    // Record yearly snapshots
    if (month % 12 === 0) {
      const year = month / 12;
      const realBalance = adjustForInflation
        ? toRealDollars(balance, inflationPercent, year)
        : balance;

      yearlyData.push({
        year,
        balance: round2(balance),
        balanceReal: round2(realBalance),
        contributions: round2(totalContributions),
        interest: round2(totalInterestEarned),
      });
    }
  }

  const finalBalance = round2(balance);
  const finalBalanceReal = adjustForInflation
    ? toRealDollars(finalBalance, inflationPercent, years)
    : finalBalance;

  const sustainableMonthlyWithdrawal = round2(finalBalance * (withdrawalRatePercent / 100) / 12);

  const yearsToFire = fireAchievedMonth !== null
    ? round2(fireAchievedMonth / 12)
    : null;

  return {
    finalBalance,
    finalBalanceReal,
    totalContributions: round2(totalContributions),
    totalInterestEarned,
    fireNumber,
    sustainableMonthlyWithdrawal,
    yearsToFire,
    yearlyData,
  };
};

/**
 * Calculate the Rule of 72 — approximate years to double investment.
 * Years to double ≈ 72 / annual_rate_percent
 */
export const ruleOf72 = (annualRatePercent: number): number => {
  return round2(72 / annualRatePercent);
};

/**
 * Calculate real (inflation-adjusted) return.
 * Fisher equation: (1 + nominal) / (1 + inflation) - 1
 */
export const realReturn = (nominalPercent: number, inflationPercent: number): number => {
  return round2(((1 + nominalPercent / 100) / (1 + inflationPercent / 100) - 1) * 100);
};
