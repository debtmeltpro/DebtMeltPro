// ============================================================
// DebtMeltPro — Student Loan Refinance Estimator v2
// ──────────────────────────────────────────────────
// NEW in v2:
//   • Income-Driven Repayment (IDR) plan comparison
//   • PSLF eligibility & savings estimator
//   • Multi-loan consolidation with weighted avg rate
//   • Forgiveness tax bomb calculator
//   • Employer contribution modeling
//   • Payoff date projection
//   • Extra payment impact analysis
//
// Backward-compatible: all v1 exports remain unchanged.
// ============================================================

import type { StudentLoanInput, StudentLoanResult, LoanComparisonSnapshot } from '@/types';

const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;
const MAX_MONTHS = 600;

/**
 * 2026 HHS Federal Poverty Guidelines (48 contiguous states and District of Columbia).
 * Source: U.S. Department of Health and Human Services, 2026 HHS Poverty Guidelines.
 * Baseline (Family size 1): $15,960; Each additional person: $5,680.
 */
export const calcHhsPovertyGuideline = (familySize: number = 1): number => {
  const normalizedSize = Math.max(1, Math.floor(familySize));
  return 15960 + 5680 * (normalizedSize - 1);
};

// ─── Core Helpers ─────────────────────────────────────────────

const calcMonthlyPayment = (
  principal: number,
  annualRatePercent: number,
  termMonths: number,
): number => {
  if (annualRatePercent === 0) return round2(principal / termMonths);
  const r = annualRatePercent / 100 / 12;
  return round2(
    principal * (r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1),
  );
};

const amortize = (
  principal: number,
  annualRatePercent: number,
  termMonths: number,
): { balance: number; cumulativePaid: number; interestPaid: number }[] => {
  const monthlyRate = annualRatePercent / 100 / 12;
  const payment = calcMonthlyPayment(principal, annualRatePercent, termMonths);
  let balance = principal;
  let cumulativePaid = 0;
  let cumulativeInterest = 0;
  const schedule: { balance: number; cumulativePaid: number; interestPaid: number }[] = [];

  for (let m = 0; m < termMonths; m++) {
    const interest = round2(balance * monthlyRate);
    const principalPaid = round2(Math.min(payment - interest, balance));
    balance = round2(Math.max(0, balance - principalPaid));
    cumulativePaid = round2(cumulativePaid + payment);
    cumulativeInterest = round2(cumulativeInterest + interest);
    schedule.push({ balance, cumulativePaid, interestPaid: cumulativeInterest });
  }

  return schedule;
};

// ─── Core Refinance Calculator (v1 compatible) ────────────────

export const calculateStudentLoanRefinance = (
  input: StudentLoanInput,
): StudentLoanResult => {
  const {
    loanBalance, currentRatePercent, currentTermMonths, currentMonthsRemaining,
    newRatePercent, newTermMonths, refinanceFeePercent,
  } = input;

  const currentMonthlyPayment = calcMonthlyPayment(
    loanBalance, currentRatePercent, currentTermMonths,
  );
  const refinanceFee = round2(loanBalance * (refinanceFeePercent / 100));
  const refinancedBalance = round2(loanBalance + refinanceFee);
  const newMonthlyPayment = calcMonthlyPayment(refinancedBalance, newRatePercent, newTermMonths);

  const totalCurrentCost = round2(currentMonthlyPayment * currentMonthsRemaining);
  const totalNewCost = round2(newMonthlyPayment * newTermMonths);
  const totalSavings = round2(totalCurrentCost - totalNewCost);
  const monthlySavings = round2(currentMonthlyPayment - newMonthlyPayment);
  const breakEvenMonths =
    monthlySavings > 0 ? Math.ceil(refinanceFee / monthlySavings) : Infinity;

  const currentSchedule = amortize(loanBalance, currentRatePercent, currentMonthsRemaining);
  const newSchedule = amortize(refinancedBalance, newRatePercent, newTermMonths);
  const chartLength = Math.max(currentMonthsRemaining, newTermMonths);

  const comparisonChart: LoanComparisonSnapshot[] = [];
  for (let m = 0; m < chartLength; m++) {
    comparisonChart.push({
      month: m + 1,
      currentBalance: currentSchedule[m]?.balance ?? 0,
      newBalance: newSchedule[m]?.balance ?? 0,
      cumulativeCurrentPaid: currentSchedule[m]?.cumulativePaid ?? totalCurrentCost,
      cumulativeNewPaid: newSchedule[m]?.cumulativePaid ?? totalNewCost,
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

// ─── NEW: Multi-Loan Overview ─────────────────────────────────

export interface LoanDetail {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  monthlyPayment: number;
  remainingMonths: number;
  type: 'federal-subsidized' | 'federal-unsubsidized' | 'federal-plus' | 'private';
}

export interface MultiLoanOverview {
  totalBalance: number;
  weightedAverageRate: number;
  totalMonthlyPayment: number;
  totalInterestRemaining: number;
  /** Loan costing the most interest (target for extra payments) */
  costliestLoan: { id: string; name: string; totalInterest: number };
  /** Per-loan interest breakdown */
  interestByLoan: { id: string; name: string; totalInterest: number; percentOfTotal: number }[];
  /** Projected payoff date (last loan) */
  latestPayoffDate: string;
}

export const analyzeMultipleLoans = (loans: LoanDetail[]): MultiLoanOverview => {
  if (loans.length === 0) {
    const payoffDate = new Date();
    return {
      totalBalance: 0,
      weightedAverageRate: 0,
      totalMonthlyPayment: 0,
      totalInterestRemaining: 0,
      costliestLoan: { id: 'n/a', name: 'N/A', totalInterest: 0 },
      interestByLoan: [],
      latestPayoffDate: payoffDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
    };
  }  
  const totalBalance = round2(loans.reduce((s, l) => s + l.balance, 0));
  const weightedAverageRate = round2(
    loans.reduce((s, l) => s + l.interestRate * (l.balance / totalBalance), 0),
  );
  const totalMonthlyPayment = round2(loans.reduce((s, l) => s + l.monthlyPayment, 0));

  const interestByLoan = loans.map((loan) => {
    const schedule = amortize(loan.balance, loan.interestRate, loan.remainingMonths);
    const totalInterest = schedule[schedule.length - 1]?.interestPaid ?? 0;
    return { id: loan.id, name: loan.name, totalInterest };
  });

  const totalInterestRemaining = round2(interestByLoan.reduce((s, l) => s + l.totalInterest, 0));

  const enriched = interestByLoan.map((l) => ({
    ...l,
    percentOfTotal: round2(totalInterestRemaining > 0
      ? (l.totalInterest / totalInterestRemaining) * 100 : 0),
  }));

 // const costliest = [...enriched].sort((a, b) => b.totalInterest - a.totalInterest)[0]!;
  const costliest = enriched.reduce(
    (best, cur) => (cur.totalInterest > best.totalInterest ? cur : best),
    enriched[0] ?? { id: 'n/a', name: 'N/A', totalInterest: 0, percentOfTotal: 0 },
  );

  const maxRemaining = Math.max(...loans.map((l) => l.remainingMonths));
  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + maxRemaining);

  return {
    totalBalance,
    weightedAverageRate,
    totalMonthlyPayment,
    totalInterestRemaining,
    costliestLoan: { id: costliest.id, name: costliest.name, totalInterest: costliest.totalInterest },
    interestByLoan: enriched,
    latestPayoffDate: payoffDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
  };
};

// ─── NEW: IDR Plan Comparison ─────────────────────────────────

export type IDRPlanType = 'SAVE' | 'PAYE' | 'IBR' | 'ICR';

export interface IDRPlanResult {
  plan: IDRPlanType;
  planFullName: string;
  initialMonthlyPayment: number;
  averageMonthlyPayment: number;
  totalPaid: number;
  totalInterestPaid: number;
  forgivenessAmount: number;
  forgivenessMonth: number;
  /** Tax on forgiven amount (IDR forgiveness is taxable income after 2025) */
  forgivenessTaxBomb: number;
  /** Total cost including tax bomb */
  totalCostWithTax: number;
}

export interface IDRComparisonResult {
  plans: IDRPlanResult[];
  standardPlan: { monthlyPayment: number; totalPaid: number; totalInterest: number };
  bestPlan: IDRPlanType;
  bestPlanSavings: number;
}

/**
 * Compare income-driven repayment plans.
 *
 * Simplified models:
 * - SAVE: 5% discretionary income (undergrad), 10% (grad), 20yr/25yr forgiveness
 * - PAYE: 10% discretionary income, 20yr forgiveness
 * - IBR: 10% discretionary income (new borrowers), 20yr forgiveness
 * - ICR: 20% discretionary income or 12yr fixed adjusted, 25yr forgiveness
 *
 * Discretionary income = AGI - 225% of federal poverty line
 */
export const compareIDRPlans = (
  totalFederalBalance: number,
  weightedRate: number,
  annualGrossIncome: number,
  familySize: number = 1,
  incomeGrowthPercent: number = 3,
  isGradLoans: boolean = false,
  marginalTaxRate: number = 22,
): IDRComparisonResult => {
  // 2026 HHS Federal Poverty Guidelines (48 contiguous states and District of Columbia)
  // Source: U.S. Department of Health and Human Services, 2026 HHS Poverty Guidelines.
  const povertyLine = calcHhsPovertyGuideline(familySize);
  const povertyThreshold225 = povertyLine * 2.25;

  const standardPayment = calcMonthlyPayment(totalFederalBalance, weightedRate, 120); // 10yr standard
  const standardTotal = round2(standardPayment * 120);
  const standardInterest = round2(standardTotal - totalFederalBalance);

  const simulateIDR = (
    plan: IDRPlanType,
    incomePercent: number,
    forgivenessYears: number,
  ): IDRPlanResult => {
    const forgivenessMonth = forgivenessYears * 12;
    const monthlyRate = weightedRate / 100 / 12;
    let balance = totalFederalBalance;
    let income = annualGrossIncome;
    let totalPaid = 0;
    let totalInterest = 0;

    const planNames: Record<IDRPlanType, string> = {
      SAVE: 'SAVE (Court Enjoined / Inactive)',
      PAYE: 'PAYE — Legacy / Sunsetting',
      IBR: 'IBR — Income-Based Repayment',
      ICR: 'ICR — Restricted / Legacy',
    };

    let firstPayment = 0;
    //const yearlyPayments: number[] = [];

    for (let month = 1; month <= forgivenessMonth; month++) {
      // Recalculate payment annually
      if (month === 1 || month % 12 === 1) {
        income = month === 1 ? income : round2(income * (1 + incomeGrowthPercent / 100));
      }

      const discretionary = Math.max(0, income - povertyThreshold225);
      let payment = round2((discretionary * (incomePercent / 100)) / 12);

      // Cap payment at standard repayment (PAYE/IBR)
      if (plan !== 'ICR' && plan !== 'SAVE') {
        payment = Math.min(payment, standardPayment);
      }

      // Ensure payment is at least 0
      payment = round2(Math.max(0, Math.min(payment, balance + balance * monthlyRate)));

      if (month === 1) firstPayment = payment;

      const interest = round2(balance * monthlyRate);
      totalInterest = round2(totalInterest + interest);
      balance = round2(balance + interest - payment);
      totalPaid = round2(totalPaid + payment);

      if (balance <= 0) {
        balance = 0;
        // Paid off before forgiveness
        return {
          plan,
          planFullName: planNames[plan],
          initialMonthlyPayment: firstPayment,
          averageMonthlyPayment: round2(totalPaid / month),
          totalPaid,
          totalInterestPaid: totalInterest,
          forgivenessAmount: 0,
          forgivenessMonth: month,
          forgivenessTaxBomb: 0,
          totalCostWithTax: totalPaid,
        };
      }
    }

    const forgivenessAmount = round2(Math.max(0, balance));
    const forgivenessTaxBomb = round2(forgivenessAmount * (marginalTaxRate / 100));

    return {
      plan,
      planFullName: planNames[plan],
      initialMonthlyPayment: firstPayment,
      averageMonthlyPayment: round2(totalPaid / forgivenessMonth),
      totalPaid,
      totalInterestPaid: totalInterest,
      forgivenessAmount,
      forgivenessMonth,
      forgivenessTaxBomb,
      totalCostWithTax: round2(totalPaid + forgivenessTaxBomb),
    };
  };

  const plans: IDRPlanResult[] = [
    simulateIDR('SAVE', isGradLoans ? 10 : 5, isGradLoans ? 25 : 20),
    simulateIDR('PAYE', 10, 20),
    simulateIDR('IBR', 10, 20),
    simulateIDR('ICR', 20, 25),
  ];

  //const bestPlan = [...plans].sort((a, b) => a.totalCostWithTax - b.totalCostWithTax)[0]!;
  const firstPlan = plans[0];
  const bestPlan = (firstPlan
    ? plans.slice(1).reduce((best, cur) => (cur.totalCostWithTax < best.totalCostWithTax ? cur : best), firstPlan)
    : simulateIDR('SAVE', isGradLoans ? 10 : 5, isGradLoans ? 25 : 20));
 

  return {
    plans,
    standardPlan: {
      monthlyPayment: standardPayment,
      totalPaid: standardTotal,
      totalInterest: standardInterest,
    },
    bestPlan: bestPlan.plan,
    bestPlanSavings: round2(standardTotal - bestPlan.totalCostWithTax),
  };
};

// ─── NEW: PSLF Analysis ──────────────────────────────────────

export interface PSLFResult {
  /** Total qualifying payments before forgiveness */
  qualifyingPayments: number;
  /** Months of qualifying payments needed */
  remainingQualifyingMonths: number;
  /** Projected forgiveness amount */
  projectedForgiveness: number;
  /** Savings vs standard repayment */
  savingsVsStandard: number;
  /** Monthly payment under PSLF-compatible IDR plan */
  monthlyPayment: number;
  /** Total paid before forgiveness */
  totalPaid: number;
  /** Is PSLF worth pursuing? */
  recommendation: 'pursue_pslf' | 'refinance' | 'evaluate_further';
  /** Tax-free (PSLF forgiveness is not taxable) */
  taxOnForgiveness: number;
}

export const calculatePSLF = (
  totalFederalBalance: number,
  weightedRate: number,
  annualGrossIncome: number,
  qualifyingPaymentsMade: number,
  familySize: number = 1,
  incomeGrowthPercent: number = 3,
): PSLFResult => {
  const remainingQualifyingMonths = Math.max(0, 120 - qualifyingPaymentsMade);
  // 2026 HHS Federal Poverty Guidelines (48 contiguous states and District of Columbia)
  // Source: U.S. Department of Health and Human Services, 2026 HHS Poverty Guidelines.
  const povertyLine = calcHhsPovertyGuideline(familySize);
  const povertyThreshold225 = povertyLine * 2.25;

  const monthlyRate = weightedRate / 100 / 12;
  let balance = totalFederalBalance;
  let income = annualGrossIncome;
  let totalPaid = 0;
  let firstPayment = 0;

  for (let month = 1; month <= remainingQualifyingMonths; month++) {
    if (month % 12 === 1 && month > 1) {
      income = round2(income * (1 + incomeGrowthPercent / 100));
    }

    const discretionary = Math.max(0, income - povertyThreshold225);
    const payment = round2(Math.min(
      (discretionary * 0.10) / 12, // PAYE/IBR rate
      balance + balance * monthlyRate,
    ));
    if (month === 1) firstPayment = payment;

    const interest = round2(balance * monthlyRate);
    balance = round2(balance + interest - payment);
    totalPaid = round2(totalPaid + payment);
  }

  const projectedForgiveness = round2(Math.max(0, balance));

  const standardPayment = calcMonthlyPayment(totalFederalBalance, weightedRate, 120);
  const standardTotal = round2(standardPayment * 120);
  const savingsVsStandard = round2(standardTotal - totalPaid);

  let recommendation: PSLFResult['recommendation'];
  if (projectedForgiveness > 20_000 && remainingQualifyingMonths < 84) {
    recommendation = 'pursue_pslf';
  } else if (projectedForgiveness < 5_000) {
    recommendation = 'refinance';
  } else {
    recommendation = 'evaluate_further';
  }

  return {
    qualifyingPayments: qualifyingPaymentsMade,
    remainingQualifyingMonths,
    projectedForgiveness,
    savingsVsStandard,
    monthlyPayment: firstPayment,
    totalPaid,
    recommendation,
    taxOnForgiveness: 0, // PSLF forgiveness is tax-free
  };
};

// ─── NEW: Extra Payment Impact ────────────────────────────────

export interface ExtraPaymentImpact {
  scenarios: {
    extraAmount: number;
    newPayoffMonths: number;
    totalInterest: number;
    interestSaved: number;
    monthsSaved: number;
    payoffDate: string;
  }[];
  baselineInterest: number;
  baselineMonths: number;
}

export const calculateExtraPaymentImpact = (
  balance: number,
  interestRate: number,
  monthlyPayment: number,
  extraAmounts: number[] = [50, 100, 200, 500],
): ExtraPaymentImpact => {
  const simulate = (extra: number) => {
    const monthlyRate = interestRate / 100 / 12;
    let bal = balance;
    let totalInterest = 0;
    let months = 0;
    const totalPayment = monthlyPayment + extra;

    while (bal > 0.01 && months < MAX_MONTHS) {
      months++;
      const interest = round2(bal * monthlyRate);
      totalInterest = round2(totalInterest + interest);
      const pmt = round2(Math.min(totalPayment, bal + interest));
      bal = round2(Math.max(0, bal + interest - pmt));
    }

    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + months);

    return {
      totalInterest,
      months,
      payoffDate: payoffDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
    };
  };

  const baseline = simulate(0);

  return {
    scenarios: extraAmounts.map((extra) => {
      const result = simulate(extra);
      return {
        extraAmount: extra,
        newPayoffMonths: result.months,
        totalInterest: result.totalInterest,
        interestSaved: round2(baseline.totalInterest - result.totalInterest),
        monthsSaved: Math.max(0, baseline.months - result.months),
        payoffDate: result.payoffDate,
      };
    }),
    baselineInterest: baseline.totalInterest,
    baselineMonths: baseline.months,
  };
};

// ─── NEW: Employer Contribution Modeling ──────────────────────

export interface EmployerContributionResult {
  /** Monthly payment after employer contribution */
  effectiveMonthlyPayment: number;
  /** Total employer contribution over loan life */
  totalEmployerContribution: number;
  /** Interest saved due to employer payments */
  interestSaved: number;
  /** Months saved */
  monthsSaved: number;
  /** Payoff date with employer help */
  payoffDate: string;
}

/**
 * Model employer student loan repayment benefit.
 * Under CARES Act (through 2025), employers can contribute up to $5,250/yr tax-free.
 */
export const calculateEmployerContribution = (
  balance: number,
  interestRate: number,
  monthlyPayment: number,
  employerMonthlyContribution: number,
  maxAnnualBenefit: number = 5250,
): EmployerContributionResult => {
  const monthlyRate = interestRate / 100 / 12;
  const effectiveExtra = round2(Math.min(employerMonthlyContribution, maxAnnualBenefit / 12));

  // Baseline
  let baseBal = balance;
  let baseInterest = 0;
  let baseMonths = 0;
  while (baseBal > 0.01 && baseMonths < MAX_MONTHS) {
    baseMonths++;
    const int = round2(baseBal * monthlyRate);
    baseInterest = round2(baseInterest + int);
    baseBal = round2(Math.max(0, baseBal + int - Math.min(monthlyPayment, baseBal + int)));
  }

  // With employer
  let empBal = balance;
  let empInterest = 0;
  let empMonths = 0;
  let totalEmpContrib = 0;
  while (empBal > 0.01 && empMonths < MAX_MONTHS) {
    empMonths++;
    const int = round2(empBal * monthlyRate);
    empInterest = round2(empInterest + int);
    const totalPmt = round2(
      Math.min(monthlyPayment + effectiveExtra, empBal + int),
    );
    const empPortion = round2(Math.min(effectiveExtra, totalPmt));
    totalEmpContrib = round2(totalEmpContrib + empPortion);
    empBal = round2(Math.max(0, empBal + int - totalPmt));
  }

  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + empMonths);

  return {
    effectiveMonthlyPayment: round2(monthlyPayment + effectiveExtra),
    totalEmployerContribution: totalEmpContrib,
    interestSaved: round2(baseInterest - empInterest),
    monthsSaved: Math.max(0, baseMonths - empMonths),
    payoffDate: payoffDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
  };
};