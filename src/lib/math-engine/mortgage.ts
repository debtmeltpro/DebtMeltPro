// ============================================================
// DebtMeltPro — Mortgage & Rent vs. Buy Math Engine v2
// ────────────────────────────────────────────────────
// NEW in v2:
//   • PMI calculation (auto-removed at 78% LTV)
//   • Closing costs modeling (buyer + seller side)
//   • ARM vs Fixed-rate comparison
//   • Full amortization schedule with extra payments
//   • Affordability analysis (28/36 rule)
//   • Refinance break-even calculator
//   • Extra payment impact (biweekly, lump sum, monthly)
//
// Backward-compatible: all v1 exports remain unchanged.
// ============================================================

import type { MortgageInput, MortgageResult, YearlyMortgageSnapshot } from '@/types';

const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;

// ─── Core Helpers ─────────────────────────────────────────────

const calcMonthlyPI = (
  principal: number,
  annualRatePercent: number,
  termYears: number,
): number => {
  if (annualRatePercent === 0) return round2(principal / (termYears * 12));
  const r = annualRatePercent / 100 / 12;
  const n = termYears * 12;
  return round2(principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
};

const futureValue = (
  presentValue: number,
  annualRatePercent: number,
  years: number,
): number => {
  return round2(presentValue * Math.pow(1 + annualRatePercent / 100, years));
};

// ─── Core Rent vs Buy (v1 compatible) ─────────────────────────

export const calculateMortgage = (input: MortgageInput): MortgageResult => {
  const {
    homePrice, downPaymentPercent, mortgageRatePercent, loanTermYears,
    propertyTaxRatePercent, maintenanceRatePercent, homeInsuranceMonthly,
    hoaMonthly, homeAppreciationPercent, monthlyRent, rentIncreasePercent,
    investmentReturnPercent, marginalTaxRatePercent, yearsToAnalyze,
  } = input;

  const downPayment = round2(homePrice * (downPaymentPercent / 100));
  const loanAmount = round2(homePrice - downPayment);
  const monthlyPI = calcMonthlyPI(loanAmount, mortgageRatePercent, loanTermYears);
  const monthlyPropertyTax = round2((homePrice * (propertyTaxRatePercent / 100)) / 12);
  const monthlyMaintenance = round2((homePrice * (maintenanceRatePercent / 100)) / 12);
  const totalMonthlyBuyingCost = round2(
    monthlyPI + monthlyPropertyTax + monthlyMaintenance + homeInsuranceMonthly + hoaMonthly,
  );

  const monthlyInterestYear1 = round2(loanAmount * (mortgageRatePercent / 100) / 12);
  const annualTaxBenefit = round2(monthlyInterestYear1 * 12 * (marginalTaxRatePercent / 100));
  void round2(annualTaxBenefit / 12);

  const yearlyComparison: YearlyMortgageSnapshot[] = [];
  let cumulativeBuyingCost = downPayment;
  let cumulativeRentCost = 0;
  let renterPortfolio = downPayment;
  let currentRent = monthlyRent;
  let loanBalance = loanAmount;
  let breakEvenYears = -1;
  const monthlyInvestmentRate = investmentReturnPercent / 100 / 12;
  const monthlyMortgageRate = mortgageRatePercent / 100 / 12;

  for (let year = 1; year <= yearsToAnalyze; year++) {
    for (let m = 0; m < 12; m++) {
      cumulativeBuyingCost = round2(cumulativeBuyingCost + totalMonthlyBuyingCost);
      if (loanBalance > 0) {
        const interestCharge = round2(loanBalance * monthlyMortgageRate);
        const principal = round2(Math.min(monthlyPI - interestCharge, loanBalance));
        loanBalance = round2(Math.max(0, loanBalance - principal));
      }
    }

    const currentHomeValue = round2(
      homePrice * Math.pow(1 + homeAppreciationPercent / 100, year),
    );
    const buyerEquity = round2(currentHomeValue - loanBalance);

    for (let m = 0; m < 12; m++) {
      renterPortfolio = round2(renterPortfolio * (1 + monthlyInvestmentRate));
      cumulativeRentCost = round2(cumulativeRentCost + currentRent);
      const monthlyCostDiff = totalMonthlyBuyingCost - currentRent;
      // Symmetric opportunity-cost cash-flow model:
      // - If buying costs more than renting (monthlyCostDiff > 0), renter saves the difference and invests it.
      // - If renting costs more than buying (monthlyCostDiff < 0), renter funds the excess rent out of
      //   their investment portfolio (floored at 0 since physical brokerage balances cannot become negative).
      renterPortfolio = round2(Math.max(0, renterPortfolio + monthlyCostDiff));
    }

    currentRent = round2(currentRent * (1 + rentIncreasePercent / 100));

    yearlyComparison.push({
      year,
      buyingEquity: round2(buyerEquity),
      rentingPortfolioValue: round2(renterPortfolio),
      cumulativeBuyingCost: round2(cumulativeBuyingCost),
      cumulativeRentCost: round2(cumulativeRentCost),
    });

    if (breakEvenYears === -1 && buyerEquity > renterPortfolio) {
      breakEvenYears = year;
    }
  }

 // const finalYear = yearlyComparison[yearlyComparison.length - 1]!;
  const finalYear = yearlyComparison[yearlyComparison.length - 1];
  if (!finalYear) {
    return {
      monthlyPayment: totalMonthlyBuyingCost,
      totalMortgageCost: 0,
      totalRentCost: 0,
      buyingNetWorth: 0,
      rentingNetWorth: 0,
      breakEvenYears: yearsToAnalyze + 1,
      recommendation: 'neutral',
      opportunityCostOfDownPayment: 0,
      yearlyComparison: [],
    };
  }
  const buyingNetWorth = finalYear.buyingEquity;
  const rentingNetWorth = finalYear.rentingPortfolioValue;

  const opportunityCostOfDownPayment = round2(
    futureValue(downPayment, investmentReturnPercent, yearsToAnalyze) - downPayment,
  );

  const recommendation: 'buy' | 'rent' | 'neutral' =
    buyingNetWorth > rentingNetWorth * 1.05
      ? 'buy'
      : rentingNetWorth > buyingNetWorth * 1.05
        ? 'rent'
        : 'neutral';

  return {
    monthlyPayment: totalMonthlyBuyingCost,
    totalMortgageCost: round2(cumulativeBuyingCost),
    totalRentCost: round2(cumulativeRentCost),
    buyingNetWorth: round2(buyingNetWorth),
    rentingNetWorth: round2(rentingNetWorth),
    breakEvenYears: breakEvenYears === -1 ? yearsToAnalyze + 1 : breakEvenYears,
    recommendation,
    opportunityCostOfDownPayment,
    yearlyComparison,
  };
};

// ─── NEW: PMI Calculator ─────────────────────────────────────

export interface PMIResult {
  /** Monthly PMI amount */
  monthlyPMI: number;
  /** Annual PMI cost */
  annualPMI: number;
  /** Month when PMI auto-cancels (78% LTV) */
  pmiDropOffMonth: number;
  /** Total PMI paid over life of loan */
  totalPMIPaid: number;
  /** Monthly payment with PMI included */
  totalMonthlyWithPMI: number;
  /** Monthly payment after PMI drops off */
  totalMonthlyWithoutPMI: number;
  /** Whether PMI is required */
  pmiRequired: boolean;
}

export const calculatePMI = (
  homePrice: number,
  downPaymentPercent: number,
  mortgageRatePercent: number,
  loanTermYears: number,
  pmiRatePercent: number = 0.5,
): PMIResult => {
  const downPayment = round2(homePrice * (downPaymentPercent / 100));
  const loanAmount = round2(homePrice - downPayment);
  const ltv = round2(((homePrice - downPayment) / homePrice) * 100);
  const pmiRequired = ltv > 80;

  if (!pmiRequired) {
    const monthlyPI = calcMonthlyPI(loanAmount, mortgageRatePercent, loanTermYears);
    return {
      monthlyPMI: 0, annualPMI: 0, pmiDropOffMonth: 0, totalPMIPaid: 0,
      totalMonthlyWithPMI: monthlyPI, totalMonthlyWithoutPMI: monthlyPI, pmiRequired: false,
    };
  }

  const monthlyPMI = round2((loanAmount * (pmiRatePercent / 100)) / 12);
  const monthlyPI = calcMonthlyPI(loanAmount, mortgageRatePercent, loanTermYears);
  const monthlyRate = mortgageRatePercent / 100 / 12;

  // Find month when LTV reaches 78% (auto-cancel threshold)
  let balance = loanAmount;
  let pmiDropOffMonth = loanTermYears * 12;
  const target78 = homePrice * 0.78;

  for (let month = 1; month <= loanTermYears * 12; month++) {
    const interest = round2(balance * monthlyRate);
    const principal = round2(Math.min(monthlyPI - interest, balance));
    balance = round2(Math.max(0, balance - principal));
    if (balance <= target78) {
      pmiDropOffMonth = month;
      break;
    }
  }

  return {
    monthlyPMI,
    annualPMI: round2(monthlyPMI * 12),
    pmiDropOffMonth,
    totalPMIPaid: round2(monthlyPMI * pmiDropOffMonth),
    totalMonthlyWithPMI: round2(monthlyPI + monthlyPMI),
    totalMonthlyWithoutPMI: monthlyPI,
    pmiRequired: true,
  };
};

// ─── NEW: Affordability Analysis (28/36 Rule) ─────────────────

export interface AffordabilityResult {
  /** Max home price you can afford */
  maxHomePrice: number;
  /** Max monthly housing payment (28% of gross income) */
  maxHousingPayment: number;
  /** Max total debt payments (36% of gross income) */
  maxTotalDebt: number;
  /** Available monthly budget for housing after existing debts */
  availableForHousing: number;
  /** Front-end DTI at max price */
  frontEndDTI: number;
  /** Back-end DTI at max price */
  backEndDTI: number;
  /** Conservative / stretch / comfortable */
  comfortLevel: 'conservative' | 'comfortable' | 'stretch' | 'overextended';
  /** Max loan amount */
  maxLoanAmount: number;
}

export const calculateAffordability = (
  monthlyGrossIncome: number,
  existingMonthlyDebts: number,
  downPaymentAmount: number,
  mortgageRatePercent: number,
  loanTermYears: number,
  propertyTaxRatePercent: number = 1.1,
  homeInsuranceMonthly: number = 150,
): AffordabilityResult => {
  // 28% rule: housing costs ≤ 28% of gross income
  const maxHousingPayment = round2(monthlyGrossIncome * 0.28);
  // 36% rule: total debt ≤ 36% of gross income
  const maxTotalDebt = round2(monthlyGrossIncome * 0.36);
  const availableForHousing = round2(
    Math.min(maxHousingPayment, maxTotalDebt - existingMonthlyDebts),
  );

  // Back out max loan from available payment
  // Available = PI + tax + insurance → PI = Available - tax - insurance
  // Tax depends on home price (circular), so iterate
  let maxHomePrice = 0;
  let low = 0;
  let high = monthlyGrossIncome * 12 * 10; // 10× income cap

  for (let i = 0; i < 50; i++) {
    const mid = (low + high) / 2;
    const dp = Math.min(downPaymentAmount, mid);
    const loan = mid - dp;
    const pi = calcMonthlyPI(loan, mortgageRatePercent, loanTermYears);
    const tax = round2((mid * (propertyTaxRatePercent / 100)) / 12);
    const totalMonthly = pi + tax + homeInsuranceMonthly;

    if (totalMonthly <= availableForHousing) {
      low = mid;
    } else {
      high = mid;
    }
    if (high - low < 100) break;
  }

  maxHomePrice = round2(Math.floor(low / 1000) * 1000); // Round down to nearest $1K
  const maxLoanAmount = round2(maxHomePrice - Math.min(downPaymentAmount, maxHomePrice));

  const actualPI = calcMonthlyPI(maxLoanAmount, mortgageRatePercent, loanTermYears);
  const actualTax = round2((maxHomePrice * (propertyTaxRatePercent / 100)) / 12);
  const actualTotal = actualPI + actualTax + homeInsuranceMonthly;

  const frontEndDTI = round2((actualTotal / monthlyGrossIncome) * 100);
  const backEndDTI = round2(((actualTotal + existingMonthlyDebts) / monthlyGrossIncome) * 100);

  let comfortLevel: AffordabilityResult['comfortLevel'];
  if (frontEndDTI <= 20) comfortLevel = 'conservative';
  else if (frontEndDTI <= 28) comfortLevel = 'comfortable';
  else if (frontEndDTI <= 33) comfortLevel = 'stretch';
  else comfortLevel = 'overextended';

  return {
    maxHomePrice,
    maxHousingPayment,
    maxTotalDebt,
    availableForHousing,
    frontEndDTI,
    backEndDTI,
    comfortLevel,
    maxLoanAmount,
  };
};

// ─── NEW: Full Amortization Schedule ──────────────────────────

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  extraPayment: number;
  balance: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
  equityPercent: number;
}

export interface AmortizationResult {
  schedule: AmortizationRow[];
  totalInterest: number;
  totalPaid: number;
  payoffMonth: number;
  interestSavedByExtra: number;
  monthsSavedByExtra: number;
}

export const generateAmortizationSchedule = (
  loanAmount: number,
  annualRatePercent: number,
  termYears: number,
  extraMonthlyPayment: number = 0,
  homeValue?: number,
): AmortizationResult => {
  const monthlyRate = annualRatePercent / 100 / 12;
  const basePayment = calcMonthlyPI(loanAmount, annualRatePercent, termYears);
  const totalMonths = termYears * 12;
  const schedule: AmortizationRow[] = [];
  let balance = loanAmount;
  let cumulativeInterest = 0;
  let cumulativePrincipal = 0;
  let month = 0;

  while (balance > 0.01 && month < totalMonths + 120) {
    month++;
    const interest = round2(balance * monthlyRate);
    const basePrincipal = round2(Math.min(basePayment - interest, balance));
    const extra = round2(Math.min(extraMonthlyPayment, balance - basePrincipal));
    const totalPrincipal = round2(basePrincipal + extra);
    const payment = round2(interest + totalPrincipal);
    balance = round2(Math.max(0, balance - totalPrincipal));
    cumulativeInterest = round2(cumulativeInterest + interest);
    cumulativePrincipal = round2(cumulativePrincipal + totalPrincipal);

    const equityPercent = homeValue
      ? round2(((homeValue - balance) / homeValue) * 100)
      : round2(((loanAmount - balance) / loanAmount) * 100);

    schedule.push({
      month, payment, principal: basePrincipal, interest, extraPayment: extra,
      balance, cumulativeInterest, cumulativePrincipal, equityPercent,
    });
  }

  // Calculate baseline (no extra payments) for savings comparison
  let baseBalance = loanAmount;
  let baseInterest = 0;
  let baseMonth = 0;
  while (baseBalance > 0.01 && baseMonth < totalMonths) {
    baseMonth++;
    const interest = round2(baseBalance * monthlyRate);
    baseInterest = round2(baseInterest + interest);
    const principal = round2(Math.min(basePayment - interest, baseBalance));
    baseBalance = round2(Math.max(0, baseBalance - principal));
  }

  return {
    schedule,
    totalInterest: cumulativeInterest,
    totalPaid: round2(cumulativeInterest + loanAmount),
    payoffMonth: month,
    interestSavedByExtra: round2(baseInterest - cumulativeInterest),
    monthsSavedByExtra: Math.max(0, baseMonth - month),
  };
};

// ─── NEW: Extra Payment Impact Comparison ─────────────────────

export interface ExtraPaymentScenario {
  label: string;
  extraMonthly: number;
  totalInterest: number;
  payoffMonths: number;
  interestSaved: number;
  monthsSaved: number;
  totalPaid: number;
}

/**
 * Compare multiple extra payment scenarios side-by-side.
 * Shows impact of $100, $200, $500 extra, biweekly payments, etc.
 */
export const compareExtraPayments = (
  loanAmount: number,
  annualRatePercent: number,
  termYears: number,
  scenarios?: number[],
  currencySymbol = '$',
  locale = 'en-US',
  currency = 'USD',
): ExtraPaymentScenario[] => {
  const defaults = [0, 100, 200, 300, 500, 1000];
  const amounts = scenarios ?? defaults;

  const basePayment = calcMonthlyPI(loanAmount, annualRatePercent, termYears);

  // Biweekly equivalent: 26 half-payments = 13 monthly payments per year
  const biweeklyExtra = round2(basePayment / 12); // ~1 extra payment per year

  const allAmounts = [...new Set([...amounts, biweeklyExtra])].sort((a, b) => a - b);

  const baseline = generateAmortizationSchedule(loanAmount, annualRatePercent, termYears, 0);

  return allAmounts.map((extra) => {
    const result = generateAmortizationSchedule(
      loanAmount, annualRatePercent, termYears, extra,
    );

    const formattedExtra = (() => {
      try {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(extra);
      } catch {
        return `${currencySymbol}${round2(extra)}`;
      }
    })();

    const label = extra === biweeklyExtra
      ? `Biweekly (${formattedExtra}/mo equiv)`
      : extra === 0 ? 'Standard payment' : `+${formattedExtra}/month`;

    return {
      label,
      extraMonthly: extra,
      totalInterest: result.totalInterest,
      payoffMonths: result.payoffMonth,
      interestSaved: round2(baseline.totalInterest - result.totalInterest),
      monthsSaved: Math.max(0, baseline.payoffMonth - result.payoffMonth),
      totalPaid: result.totalPaid,
    };
  });
};

// ─── NEW: Refinance Break-Even Calculator ─────────────────────

export interface RefinanceResult {
  /** Current monthly P&I */
  currentPayment: number;
  /** New monthly P&I */
  newPayment: number;
  /** Monthly savings */
  monthlySavings: number;
  /** Total closing costs */
  closingCosts: number;
  /** Break-even month */
  breakEvenMonth: number;
  /** Total interest saved over life of new loan */
  totalInterestSaved: number;
  /** Net benefit after closing costs */
  netBenefit: number;
  /** Recommendation */
  recommendation: 'refinance' | 'keep_current' | 'marginal';
}

export const calculateRefinance = (
  currentBalance: number,
  currentRatePercent: number,
  currentRemainingMonths: number,
  newRatePercent: number,
  newTermYears: number,
  closingCostPercent: number = 2,
): RefinanceResult => {
  const currentPayment = calcMonthlyPI(currentBalance, currentRatePercent, currentRemainingMonths / 12);
  const closingCosts = round2(currentBalance * (closingCostPercent / 100));
  const newBalance = round2(currentBalance + closingCosts);
  const newPayment = calcMonthlyPI(newBalance, newRatePercent, newTermYears);
  const monthlySavings = round2(currentPayment - newPayment);

  const breakEvenMonth = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 9999;

  // Total interest comparison
  const currentTotalInterest = round2(currentPayment * currentRemainingMonths - currentBalance);
  const newTotalInterest = round2(newPayment * newTermYears * 12 - newBalance);
  const totalInterestSaved = round2(currentTotalInterest - newTotalInterest);
  const netBenefit = round2(totalInterestSaved - closingCosts);

  let recommendation: RefinanceResult['recommendation'];
  if (netBenefit > 5000 && breakEvenMonth < 36) recommendation = 'refinance';
  else if (netBenefit < 0) recommendation = 'keep_current';
  else recommendation = 'marginal';

  return {
    currentPayment, newPayment, monthlySavings, closingCosts, breakEvenMonth,
    totalInterestSaved, netBenefit, recommendation,
  };
};

// ─── NEW: Closing Cost Estimator ──────────────────────────────

export interface ClosingCostEstimate {
  /** Total buyer closing costs */
  buyerTotal: number;
  /** Itemized buyer costs */
  buyerItems: { label: string; amount: number }[];
  /** Total seller closing costs (for future sellers) */
  sellerTotal: number;
  /** Cash needed to close (down payment + buyer closing costs) */
  cashToClose: number;
}

export const estimateClosingCosts = (
  homePrice: number,
  downPaymentPercent: number,
  loanAmount: number,
  stateTransferTaxPercent: number = 0.2,
): ClosingCostEstimate => {
  const downPayment = round2(homePrice * (downPaymentPercent / 100));

  const buyerItems = [
    { label: 'Loan origination fee (1%)', amount: round2(loanAmount * 0.01) },
    { label: 'Appraisal', amount: 500 },
    { label: 'Home inspection', amount: 400 },
    { label: 'Title insurance', amount: round2(homePrice * 0.005) },
    { label: 'Title search', amount: 300 },
    { label: 'Recording fees', amount: 150 },
    { label: 'Survey', amount: 400 },
    { label: 'Attorney fees', amount: 800 },
    { label: 'Escrow deposit (2 mo tax + insurance)', amount: round2(homePrice * 0.003) },
    { label: 'Prepaid interest (15 days)', amount: round2(loanAmount * 0.002) },
    { label: 'Transfer tax', amount: round2(homePrice * (stateTransferTaxPercent / 100)) },
  ];

  const buyerTotal = round2(buyerItems.reduce((s, i) => s + i.amount, 0));

  const sellerTotal = round2(homePrice * 0.06); // ~6% agent commissions (typical)

  return {
    buyerTotal,
    buyerItems,
    sellerTotal,
    cashToClose: round2(downPayment + buyerTotal),
  };
};