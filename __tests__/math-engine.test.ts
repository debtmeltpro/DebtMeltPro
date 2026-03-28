import {
  calculateDebtPayoff,
  formatPayoffDuration,
  getBestStrategy,
  calcFixedMonthlyPayment,
} from '@/lib/math-engine/debt';

import {
  calculateCompound,
  ruleOf72,
  realReturn,
} from '@/lib/math-engine/compound';

import {
  calculateCreditCardPayoff,
} from '@/lib/math-engine/credit-card';

import { calculateMortgage } from '@/lib/math-engine/mortgage';
import { calculateStudentLoanRefinance } from '@/lib/math-engine/student-loan';
import {
  formatCurrency,
  formatCurrencyExact,
  formatPercent,
  formatDuration,
  formatCurrencyShort,
  clamp,
} from '@/lib/math-engine';

// ─── Debt Payoff Tests ────────────────────────────────────────

describe('Debt Payoff Calculator', () => {
  const sampleDebts = [
    { id: '1', name: 'Credit Card', balance: 5000, interestRate: 22, minimumPayment: 100 },
    { id: '2', name: 'Car Loan', balance: 10000, interestRate: 6, minimumPayment: 200 },
    { id: '3', name: 'Personal Loan', balance: 3000, interestRate: 12, minimumPayment: 75 },
  ];

  it('should calculate all three strategies', () => {
    const result = calculateDebtPayoff({
      debts: sampleDebts,
      strategy: 'avalanche',
      extraMonthlyPayment: 200,
    });

    expect(result.snowball).toBeDefined();
    expect(result.avalanche).toBeDefined();
    expect(result.hybrid).toBeDefined();
    expect(result.baseline).toBeDefined();
  });

  it('avalanche should save more or equal interest than snowball', () => {
    const result = calculateDebtPayoff({
      debts: sampleDebts,
      strategy: 'avalanche',
      extraMonthlyPayment: 200,
    });

    expect(result.avalanche.totalInterestPaid).toBeLessThanOrEqual(
      result.snowball.totalInterestPaid,
    );
  });

  it('all strategies should pay off all debts', () => {
    const result = calculateDebtPayoff({
      debts: sampleDebts,
      strategy: 'avalanche',
      extraMonthlyPayment: 200,
    });

    const lastSnowball = result.snowball.timeline[result.snowball.timeline.length - 1];
    const lastAvalanche = result.avalanche.timeline[result.avalanche.timeline.length - 1];

    expect(lastSnowball?.totalBalance).toBeLessThanOrEqual(0.01);
    expect(lastAvalanche?.totalBalance).toBeLessThanOrEqual(0.01);
  });

  it('should save interest vs baseline', () => {
    const result = calculateDebtPayoff({
      debts: sampleDebts,
      strategy: 'avalanche',
      extraMonthlyPayment: 200,
    });

    expect(result.avalanche.interestSaved).toBeGreaterThan(0);
    expect(result.snowball.interestSaved).toBeGreaterThan(0);
  });
});

describe('calcFixedMonthlyPayment', () => {
  it('should calculate a standard mortgage payment', () => {
    const payment = calcFixedMonthlyPayment(200000, 6, 360);
    expect(payment).toBeGreaterThan(1190);
    expect(payment).toBeLessThan(1210);
  });

  it('should handle 0% interest rate', () => {
    const payment = calcFixedMonthlyPayment(12000, 0, 12);
    expect(payment).toBe(1000);
  });
});

describe('formatPayoffDuration', () => {
  it('should format months correctly', () => {
    expect(formatPayoffDuration(3)).toBe('3 months');
    expect(formatPayoffDuration(1)).toBe('1 month');
    expect(formatPayoffDuration(12)).toBe('1 year');
    expect(formatPayoffDuration(14)).toBe('1 yr 2 mo');
    expect(formatPayoffDuration(24)).toBe('2 years');
  });
});

describe('getBestStrategy', () => {
  it('should return the strategy with lowest interest', () => {
    const mockResult = (interest: number) => ({
      strategy: 'avalanche' as const,
      totalMonths: 20,
      totalPaid: 10000,
      totalInterestPaid: interest,
      timeline: [],
      payoffOrder: [],
      interestSaved: 0,
      monthsSaved: 0,
    });

    const best = getBestStrategy(
      mockResult(1500),
      mockResult(1200),
      mockResult(1350),
    );
    expect(best).toBe('avalanche');
  });
});

// ─── Compound Interest Tests ──────────────────────────────────

describe('Compound Interest Calculator', () => {
  it('should calculate growth over time', () => {
    const result = calculateCompound({
      initialAmount: 10000,
      monthlyContribution: 500,
      annualReturnPercent: 8,
      years: 10,
      inflationPercent: 3,
      adjustForInflation: false,
      withdrawalRatePercent: 4,
    });

    expect(result.finalBalance).toBeGreaterThan(10000);
    expect(result.totalContributions).toBe(10000 + 500 * 120);
    expect(result.totalInterestEarned).toBeGreaterThan(0);
    expect(result.yearlyData.length).toBe(10);
  });

  it('should calculate FIRE number correctly', () => {
    const result = calculateCompound({
      initialAmount: 0,
      monthlyContribution: 5000,
      annualReturnPercent: 7,
      years: 30,
      inflationPercent: 3,
      adjustForInflation: false,
      withdrawalRatePercent: 4,
    });

    expect(result.fireNumber).toBe(1500000);
  });

  it('should adjust for inflation when enabled', () => {
    const nominal = calculateCompound({
      initialAmount: 10000,
      monthlyContribution: 500,
      annualReturnPercent: 8,
      years: 20,
      inflationPercent: 3,
      adjustForInflation: false,
      withdrawalRatePercent: 4,
    });

    const real = calculateCompound({
      initialAmount: 10000,
      monthlyContribution: 500,
      annualReturnPercent: 8,
      years: 20,
      inflationPercent: 3,
      adjustForInflation: true,
      withdrawalRatePercent: 4,
    });

    expect(real.finalBalanceReal).toBeLessThan(nominal.finalBalance);
  });
});

describe('ruleOf72', () => {
  it('should approximate years to double', () => {
    expect(ruleOf72(8)).toBe(9);
    expect(ruleOf72(10)).toBe(7.2);
    expect(ruleOf72(6)).toBe(12);
  });
});

describe('realReturn', () => {
  it('should calculate inflation-adjusted return', () => {
    const real = realReturn(8, 3);
    expect(real).toBeGreaterThan(4.5);
    expect(real).toBeLessThan(5.5);
  });
});

// ─── Credit Card Tests ────────────────────────────────────────

describe('Credit Card Payoff Calculator', () => {
  it('should show minimum payment trap', () => {
    const result = calculateCreditCardPayoff({
      balance: 5000,
      apr: 22,
      minimumPaymentPercent: 2,
      minimumPaymentFloor: 25,
      fixedExtraPayment: 0,
    });

    expect(result.minimumOnlyMonths).toBeGreaterThan(100);
    expect(result.minimumOnlyInterestPaid).toBeGreaterThan(5000);
  });

  it('should show savings with fixed extra payment', () => {
    const result = calculateCreditCardPayoff({
      balance: 5000,
      apr: 22,
      minimumPaymentPercent: 2,
      minimumPaymentFloor: 25,
      fixedExtraPayment: 100,
    });

    expect(result.interestSaved).toBeGreaterThan(0);
    expect(result.monthsSaved).toBeGreaterThan(0);
    expect(result.optimizedMonths).toBeLessThan(result.minimumOnlyMonths);
  });
});

// ─── Mortgage Tests ───────────────────────────────────────────

describe('Mortgage Calculator', () => {
  it('should calculate rent vs buy comparison', () => {
    const result = calculateMortgage({
      homePrice: 400000,
      downPaymentPercent: 20,
      mortgageRatePercent: 6.5,
      loanTermYears: 30,
      propertyTaxRatePercent: 1.2,
      maintenanceRatePercent: 1,
      homeInsuranceMonthly: 150,
      hoaMonthly: 0,
      homeAppreciationPercent: 3,
      monthlyRent: 2000,
      rentIncreasePercent: 3,
      investmentReturnPercent: 8,
      marginalTaxRatePercent: 22,
      yearsToAnalyze: 10,
    });

    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(result.yearlyComparison.length).toBe(10);
    expect(result.buyingNetWorth).toBeGreaterThan(0);
    expect(result.rentingNetWorth).toBeGreaterThan(0);
    expect(['buy', 'rent', 'neutral']).toContain(result.recommendation);
  });
});

// ─── Student Loan Tests ───────────────────────────────────────

describe('Student Loan Refinance Calculator', () => {
  it('should calculate refinancing savings', () => {
    const result = calculateStudentLoanRefinance({
      loanBalance: 30000,
      currentRatePercent: 6.8,
      currentTermMonths: 120,
      currentMonthsRemaining: 96,
      newRatePercent: 4.5,
      newTermMonths: 96,
      refinanceFeePercent: 0,
    });

    expect(result.totalSavings).toBeGreaterThan(0);
    expect(result.monthlySavings).toBeGreaterThan(0);
    expect(result.newMonthlyPayment).toBeLessThan(result.currentMonthlyPayment);
  });

  it('should recommend keeping when refinancing costs more', () => {
    const result = calculateStudentLoanRefinance({
      loanBalance: 10000,
      currentRatePercent: 4,
      currentTermMonths: 60,
      currentMonthsRemaining: 12,
      newRatePercent: 7,
      newTermMonths: 60,
      refinanceFeePercent: 3,
    });

    expect(result.recommendation).toBe('keep');
  });
});

// ─── Formatting Utility Tests ─────────────────────────────────

describe('Formatting Utilities', () => {
  describe('formatCurrency', () => {
    it('formats whole dollars', () => {
      expect(formatCurrency(12500.75)).toBe('$12,501');
    });
    it('handles zero', () => {
      expect(formatCurrency(0)).toBe('$0');
    });
    it('handles NaN', () => {
      expect(formatCurrency(NaN)).toBe('$0');
    });
    it('handles negative', () => {
      expect(formatCurrency(-500)).toBe('-$500');
    });
  });

  describe('formatCurrencyExact', () => {
    it('shows cents', () => {
      expect(formatCurrencyExact(12500.75)).toBe('$12,500.75');
    });
    it('handles NaN', () => {
      expect(formatCurrencyExact(NaN)).toBe('$0.00');
    });
  });

  describe('formatPercent', () => {
    it('formats decimal to percent', () => {
      expect(formatPercent(0.065)).toBe('6.5%');
    });
    it('handles NaN', () => {
      expect(formatPercent(NaN)).toBe('0.0%');
    });
    it('handles zero', () => {
      expect(formatPercent(0)).toBe('0.0%');
    });
  });

  describe('formatDuration', () => {
    it('handles zero', () => { expect(formatDuration(0)).toBe('0 mo'); });
    it('handles months', () => { expect(formatDuration(5)).toBe('5 mo'); });
    it('handles exact years', () => { expect(formatDuration(12)).toBe('1 yr'); });
    it('handles years + months', () => { expect(formatDuration(14)).toBe('1 yr 2 mo'); });
  });

  describe('formatCurrencyShort', () => {
    it('formats millions', () => { expect(formatCurrencyShort(1500000)).toBe('$1.5M'); });
    it('formats thousands', () => { expect(formatCurrencyShort(25000)).toBe('$25K'); });
    it('formats small numbers', () => { expect(formatCurrencyShort(500)).toBe('$500'); });
  });

  describe('clamp', () => {
    it('keeps value in range', () => { expect(clamp(5, 0, 10)).toBe(5); });
    it('clamps low', () => { expect(clamp(-1, 0, 10)).toBe(0); });
    it('clamps high', () => { expect(clamp(15, 0, 10)).toBe(10); });
  });
});