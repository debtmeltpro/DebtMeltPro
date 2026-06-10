// ============================================================
// DebtMeltPro — EMI & General Loan Math Engine
// ============================================================

import type { LoanEMIInput, LoanEMIResult, LoanAmortizationRow } from '@/types';

const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;

/** Standard EMI: P × r × (1+r)^n / [(1+r)^n − 1] */
export const calculateEMI = (
  principal: number,
  annualRatePercent: number,
  tenureMonths: number,
): number => {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  if (annualRatePercent === 0) return round2(principal / tenureMonths);

  const r = annualRatePercent / 100 / 12;
  const n = tenureMonths;
  const emi = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return round2(emi);
};

function buildSchedule(
  loanAmount: number,
  annualInterestRatePercent: number,
  tenureMonths: number,
  extraMonthlyPayment: number,
): { schedule: LoanAmortizationRow[]; totalInterest: number; months: number } {
  const monthlyRate = annualInterestRatePercent / 100 / 12;
  const emi = calculateEMI(loanAmount, annualInterestRatePercent, tenureMonths);
  const schedule: LoanAmortizationRow[] = [];

  let balance = loanAmount;
  let cumulativeInterest = 0;
  let cumulativePrincipal = 0;
  let month = 0;
  const maxMonths = tenureMonths + 360;

  while (balance > 0.01 && month < maxMonths) {
    month++;
    const interest = round2(balance * monthlyRate);
    const basePrincipal = round2(Math.min(Math.max(0, emi - interest), balance));
    const extra = round2(Math.min(extraMonthlyPayment, Math.max(0, balance - basePrincipal)));
    const totalPrincipal = round2(basePrincipal + extra);
    const payment = round2(interest + totalPrincipal);
    balance = round2(Math.max(0, balance - totalPrincipal));
    cumulativeInterest = round2(cumulativeInterest + interest);
    cumulativePrincipal = round2(cumulativePrincipal + totalPrincipal);

    schedule.push({
      month,
      payment,
      principal: totalPrincipal,
      interest,
      extraPayment: extra,
      balance,
      cumulativeInterest,
      cumulativePrincipal,
    });
  }

  return {
    schedule,
    totalInterest: round2(cumulativeInterest),
    months: month,
  };
}

export const calculateLoanEMI = (input: LoanEMIInput): LoanEMIResult => {
  const {
    loanAmount,
    annualInterestRatePercent,
    tenureMonths,
    extraMonthlyPayment = 0,
  } = input;

  const emi = calculateEMI(loanAmount, annualInterestRatePercent, tenureMonths);
  const { schedule, totalInterest, months } = buildSchedule(
    loanAmount,
    annualInterestRatePercent,
    tenureMonths,
    extraMonthlyPayment,
  );

  const cumulativePrincipal = schedule[schedule.length - 1]?.cumulativePrincipal ?? 0;
  const totalPaid = round2(totalInterest + cumulativePrincipal);

  let interestSaved = 0;
  let monthsSaved = 0;
  if (extraMonthlyPayment > 0) {
    const baseline = buildSchedule(loanAmount, annualInterestRatePercent, tenureMonths, 0);
    interestSaved = round2(baseline.totalInterest - totalInterest);
    monthsSaved = Math.max(0, baseline.months - months);
  }

  return {
    emi,
    loanAmount,
    tenureMonths,
    actualTenureMonths: months,
    totalInterest,
    totalPaid,
    schedule,
    interestSaved,
    monthsSaved,
  };
};

/** Monthly interest charge on a revolving balance */
export const calculateMonthlyInterestCharge = (
  balance: number,
  annualRatePercent: number,
): { dailyInterest: number; monthlyInterest: number; annualInterest: number } => {
  const monthlyRate = annualRatePercent / 100 / 12;
  const dailyRate = annualRatePercent / 100 / 365;
  return {
    dailyInterest: round2(balance * dailyRate),
    monthlyInterest: round2(balance * monthlyRate),
    annualInterest: round2(balance * (annualRatePercent / 100)),
  };
};
