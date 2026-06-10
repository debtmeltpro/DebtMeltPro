// ============================================================
// DebtMeltPro — SIP (Systematic Investment Plan) Math Engine
// Standard monthly SIP with optional annual step-up.
// ============================================================

import type { SIPInput, SIPResult, SIPYearlySnapshot } from '@/types';

const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;

/**
 * Future value of a monthly SIP (payments at end of each month).
 * FV = P × [((1 + r)^n − 1) / r]
 */
export const calculateSIP = (input: SIPInput): SIPResult => {
  const {
    monthlyInvestment,
    annualReturnPercent,
    years,
    stepUpPercent = 0,
  } = input;

  const monthlyRate = annualReturnPercent / 100 / 12;
  const totalMonths = years * 12;
  let balance = 0;
  let totalInvested = 0;
  let currentMonthly = monthlyInvestment;
  const yearlyData: SIPYearlySnapshot[] = [];

  for (let month = 1; month <= totalMonths; month++) {
    balance = round2(balance * (1 + monthlyRate) + currentMonthly);
    totalInvested = round2(totalInvested + currentMonthly);

    if (month % 12 === 0) {
      const year = month / 12;
      yearlyData.push({
        year,
        invested: round2(totalInvested),
        returns: round2(balance - totalInvested),
        corpus: round2(balance),
        monthlySIP: round2(currentMonthly),
      });
      if (year < years) {
        currentMonthly = round2(currentMonthly * (1 + stepUpPercent / 100));
      }
    }
  }

  const maturityAmount = round2(balance);
  const totalReturns = round2(maturityAmount - totalInvested);

  return {
    totalInvested,
    totalReturns,
    maturityAmount,
    yearlyData,
    effectiveAnnualReturn: annualReturnPercent,
  };
};

/** Lump-sum future value for comparison with SIP */
export const calculateLumpSumFV = (
  amount: number,
  annualReturnPercent: number,
  years: number,
): number => {
  const r = annualReturnPercent / 100;
  return round2(amount * Math.pow(1 + r, years));
};
