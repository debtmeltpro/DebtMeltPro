// ============================================================
// DebtFreedom — Mortgage & Rent vs. Buy Math Engine
// Includes: mortgage amortization, property tax, maintenance,
// opportunity cost of down payment, and wealth comparison.
// ============================================================

import type { MortgageInput, MortgageResult, YearlyMortgageSnapshot } from '@/types';

const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;

/**
 * Standard mortgage (PITI) monthly payment — principal & interest only.
 * Property tax and insurance are added separately for transparency.
 * Formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
 */
const calcMonthlyPI = (principal: number, annualRatePercent: number, termYears: number): number => {
  if (annualRatePercent === 0) return round2(principal / (termYears * 12));
  const r = annualRatePercent / 100 / 12;
  const n = termYears * 12;
  return round2(principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
};

/**
 * Calculate future value of a lump sum investment.
 * FV = PV × (1 + r)^n
 */
const futureValue = (presentValue: number, annualRatePercent: number, years: number): number => {
  return round2(presentValue * Math.pow(1 + annualRatePercent / 100, years));
};

/**
 * Future value of a recurring monthly contribution (annuity).
 * FV = PMT × [(1 + r)^n - 1] / r
 */
const futureValueAnnuity = (
  monthlyPayment: number,
  annualRatePercent: number,
  months: number
): number => {
  if (annualRatePercent === 0) return round2(monthlyPayment * months);
  const r = annualRatePercent / 100 / 12;
  return round2(monthlyPayment * (Math.pow(1 + r, months) - 1) / r);
};

/**
 * Full Rent vs. Buy comparison.
 *
 * Buying costs include: mortgage P&I, property tax, maintenance, insurance, HOA.
 * Renting costs include: monthly rent (with increases) + investing the down payment difference.
 *
 * The renter invests: (a) the down payment as a lump sum, (b) the monthly cost difference
 * if buying is more expensive. This captures the full opportunity cost.
 */
export const calculateMortgage = (input: MortgageInput): MortgageResult => {
  const {
    homePrice,
    downPaymentPercent,
    mortgageRatePercent,
    loanTermYears,
    propertyTaxRatePercent,
    maintenanceRatePercent,
    homeInsuranceMonthly,
    hoaMonthly,
    homeAppreciationPercent,
    monthlyRent,
    rentIncreasePercent,
    investmentReturnPercent,
    marginalTaxRatePercent,
    yearsToAnalyze,
  } = input;

  const downPayment = round2(homePrice * (downPaymentPercent / 100));
  const loanAmount = round2(homePrice - downPayment);

  // Monthly mortgage payment (P&I)
  const monthlyPI = calcMonthlyPI(loanAmount, mortgageRatePercent, loanTermYears);

  // Monthly ancillary costs
  const monthlyPropertyTax = round2((homePrice * (propertyTaxRatePercent / 100)) / 12);
  const monthlyMaintenance = round2((homePrice * (maintenanceRatePercent / 100)) / 12);
  const totalMonthlyBuyingCost = round2(
    monthlyPI + monthlyPropertyTax + monthlyMaintenance + homeInsuranceMonthly + hoaMonthly
  );

  // Mortgage interest deduction benefit (simplified — reduces effective tax)
  // Only interest portion of payment qualifies; this is approximate for year 1
  const monthlyInterestYear1 = round2(loanAmount * (mortgageRatePercent / 100) / 12);
  const annualTaxBenefit = round2(monthlyInterestYear1 * 12 * (marginalTaxRatePercent / 100));
  const monthlyTaxBenefit = round2(annualTaxBenefit / 12);
  const effectiveMonthlyBuyingCost = round2(totalMonthlyBuyingCost - monthlyTaxBenefit);

  // ── Year-by-year comparison ───────────────────────────────

  const yearlyComparison: YearlyMortgageSnapshot[] = [];
  let cumulativeBuyingCost = downPayment; // Down payment is a sunk cost for buying
  let cumulativeRentCost = 0;
  let renterPortfolio = downPayment; // Renter invests the down payment
  let currentRent = monthlyRent;
  let loanBalance = loanAmount;
  let breakEvenYears = -1;

  const monthlyInvestmentRate = investmentReturnPercent / 100 / 12;
  const monthlyMortgageRate = mortgageRatePercent / 100 / 12;
  const annualHomeAppreciationRate = homeAppreciationPercent / 100;

  for (let year = 1; year <= yearsToAnalyze; year++) {
    const monthsElapsed = (year - 1) * 12;

    // ─ Buyer calculations for this year ─
    for (let m = 0; m < 12; m++) {
      cumulativeBuyingCost = round2(cumulativeBuyingCost + totalMonthlyBuyingCost);
      if (loanBalance > 0) {
        const interestCharge = round2(loanBalance * monthlyMortgageRate);
        const principal = round2(Math.min(monthlyPI - interestCharge, loanBalance));
        loanBalance = round2(Math.max(0, loanBalance - principal));
      }
    }

    // Home equity = current value - remaining loan
    const currentHomeValue = round2(homePrice * Math.pow(1 + annualHomeAppreciationRate, year));
    const buyerEquity = round2(currentHomeValue - loanBalance);

    // ─ Renter calculations for this year ─
    for (let m = 0; m < 12; m++) {
      // Grow existing portfolio
      renterPortfolio = round2(renterPortfolio * (1 + monthlyInvestmentRate));
      cumulativeRentCost = round2(cumulativeRentCost + currentRent);

      // Renter invests any monthly savings (if buying costs more)
      const monthlyCostDiff = totalMonthlyBuyingCost - currentRent;
      if (monthlyCostDiff > 0) {
        // Buying is more expensive — renter invests the difference
        renterPortfolio = round2(renterPortfolio + monthlyCostDiff);
      }
    }

    // Apply annual rent increase
    currentRent = round2(currentRent * (1 + rentIncreasePercent / 100));

    yearlyComparison.push({
      year,
      buyingEquity: round2(buyerEquity),
      rentingPortfolioValue: round2(renterPortfolio),
      cumulativeBuyingCost: round2(cumulativeBuyingCost),
      cumulativeRentCost: round2(cumulativeRentCost),
    });

    // Detect break-even: first year buyer's net worth exceeds renter's
    if (breakEvenYears === -1 && buyerEquity > renterPortfolio) {
      breakEvenYears = year;
    }
  }

  const finalYear = yearlyComparison[yearlyComparison.length - 1];
  if (!finalYear) throw new Error('No yearly comparison data generated');

  const buyingNetWorth = finalYear.buyingEquity;
  const rentingNetWorth = finalYear.rentingPortfolioValue;

  // Opportunity cost = what renter's portfolio is worth
  const opportunityCostOfDownPayment = round2(
    futureValue(downPayment, investmentReturnPercent, yearsToAnalyze) - downPayment
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
