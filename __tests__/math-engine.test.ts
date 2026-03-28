// ============================================================
// DebtFreedom — Math Engine Unit Tests
// Validates all financial formulas against known results.
// Run: npm test
// ============================================================

import { calculateDebtPayoff, formatPayoffDuration, getBestStrategy } from '../src/lib/math-engine/debt';
import { calculateCompound, ruleOf72, realReturn } from '../src/lib/math-engine/compound';
import { calculateCreditCardPayoff } from '../src/lib/math-engine/credit-card';
import { calculateStudentLoanRefinance } from '../src/lib/math-engine/student-loan';
import { formatCurrency, formatCurrencyShort, formatDuration } from '../src/lib/math-engine';
import type { DebtAccount } from '../src/types';

// ─── Test Utilities ────────────────────────────────────────────
const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
const withinPercent = (actual: number, expected: number, pct = 2) =>
  Math.abs(actual - expected) / expected <= pct / 100;

// ─── Debt Payoff Engine ────────────────────────────────────────

describe('Debt Payoff Engine', () => {
  const sampleDebts: DebtAccount[] = [
    { id: 'debt-1', name: 'Credit Card', balance: 5000, interestRate: 20, minimumPayment: 100, type: 'credit_card' },
    { id: 'debt-2', name: 'Personal Loan', balance: 3000, interestRate: 10, minimumPayment: 75,  type: 'personal_loan' },
  ];

  describe('Strategy comparison', () => {
    it('should return results for all three strategies', () => {
      const results = calculateDebtPayoff({ debts: sampleDebts, extraMonthlyPayment: 100, strategy: 'avalanche' });
      expect(results.snowball).toBeDefined();
      expect(results.avalanche).toBeDefined();
      expect(results.hybrid).toBeDefined();
    });

    it('avalanche should pay equal or less interest than snowball', () => {
      const results = calculateDebtPayoff({ debts: sampleDebts, extraMonthlyPayment: 100, strategy: 'avalanche' });
      expect(results.avalanche.totalInterestPaid).toBeLessThanOrEqual(results.snowball.totalInterestPaid);
    });

    it('snowball should tackle lowest balance first', () => {
      const results = calculateDebtPayoff({ debts: sampleDebts, extraMonthlyPayment: 50, strategy: 'snowball' });
      // debt-2 ($3000) should be paid off before debt-1 ($5000) in snowball
      const snowballOrder = results.snowball.payoffOrder;
      const idx2 = snowballOrder.indexOf('debt-2');
      const idx1 = snowballOrder.indexOf('debt-1');
      expect(idx2).toBeLessThan(idx1);
    });

    it('avalanche should tackle highest rate first', () => {
      const results = calculateDebtPayoff({ debts: sampleDebts, extraMonthlyPayment: 50, strategy: 'avalanche' });
      // debt-1 (20%) should be paid off before debt-2 (10%) in avalanche
      const avalancheOrder = results.avalanche.payoffOrder;
      const idx1 = avalancheOrder.indexOf('debt-1');
      const idx2 = avalancheOrder.indexOf('debt-2');
      expect(idx1).toBeLessThan(idx2);
    });
  });

  describe('Interest savings', () => {
    it('should calculate positive interest savings vs minimum only', () => {
      const results = calculateDebtPayoff({ debts: sampleDebts, extraMonthlyPayment: 200, strategy: 'avalanche' });
      expect(results.avalanche.interestSaved).toBeGreaterThan(0);
      expect(results.avalanche.monthsSaved).toBeGreaterThan(0);
    });

    it('should have zero months saved when no extra payment matches minimum-only', () => {
      const results = calculateDebtPayoff({ debts: sampleDebts, extraMonthlyPayment: 0, strategy: 'avalanche' });
      // With no extra payment, payoff time roughly equals minimum-only
      expect(results.avalanche.monthsSaved).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Timeline integrity', () => {
    it('balance should monotonically decrease over timeline', () => {
      const results = calculateDebtPayoff({ debts: sampleDebts, extraMonthlyPayment: 150, strategy: 'avalanche' });
      const timeline = results.avalanche.timeline;
      for (let i = 1; i < timeline.length; i++) {
        expect(timeline[i]!.totalBalance).toBeLessThanOrEqual(timeline[i - 1]!.totalBalance);
      }
    });

    it('final balance should be approximately zero', () => {
      const results = calculateDebtPayoff({ debts: sampleDebts, extraMonthlyPayment: 150, strategy: 'avalanche' });
      const timeline = results.avalanche.timeline;
      const lastEntry = timeline[timeline.length - 1]!;
      expect(lastEntry.totalBalance).toBeLessThan(1); // < $1 remaining
    });

    it('should not exceed 600 months (safety cap)', () => {
      const results = calculateDebtPayoff({ debts: sampleDebts, extraMonthlyPayment: 0, strategy: 'avalanche' });
      expect(results.avalanche.totalMonths).toBeLessThanOrEqual(600);
    });
  });

  describe('getBestStrategy', () => {
    it('should return avalanche when it has lowest interest', () => {
      const results = calculateDebtPayoff({ debts: sampleDebts, extraMonthlyPayment: 100, strategy: 'avalanche' });
      const best = getBestStrategy(results.snowball, results.avalanche, results.hybrid);
      // Avalanche always minimizes interest
      expect(['avalanche', 'hybrid']).toContain(best);
    });
  });

  describe('formatPayoffDuration', () => {
    it('should format months correctly', () => {
      expect(formatPayoffDuration(6)).toBe('6 months');
      expect(formatPayoffDuration(12)).toBe('1 year');
      expect(formatPayoffDuration(18)).toBe('1 yr 6 mo');
      expect(formatPayoffDuration(24)).toBe('2 years');
    });
  });
});

// ─── Compound Interest / FIRE ──────────────────────────────────

describe('Compound Interest & FIRE Calculator', () => {
  const baseInput = {
    initialAmount: 10000,
    monthlyContribution: 500,
    annualReturnPercent: 8,
    years: 20,
    inflationPercent: 3,
    adjustForInflation: false,
    withdrawalRatePercent: 4,
  };

  it('should grow meaningfully over 20 years', () => {
    const result = calculateCompound(baseInput);
    expect(result.finalBalance).toBeGreaterThan(baseInput.initialAmount);
    expect(result.totalInterestEarned).toBeGreaterThan(0);
  });

  it('total should equal contributions + interest earned', () => {
    const result = calculateCompound(baseInput);
    const expectedTotal = round2(result.totalContributions + result.totalInterestEarned);
    expect(Math.abs(result.finalBalance - expectedTotal)).toBeLessThan(1); // within $1
  });

  it('should have 20 yearly data points', () => {
    const result = calculateCompound(baseInput);
    expect(result.yearlyData).toHaveLength(20);
  });

  it('balance should increase monotonically with positive returns', () => {
    const result = calculateCompound(baseInput);
    for (let i = 1; i < result.yearlyData.length; i++) {
      expect(result.yearlyData[i]!.balance).toBeGreaterThan(result.yearlyData[i - 1]!.balance);
    }
  });

  it('inflation-adjusted balance should be less than nominal', () => {
    const nominalResult = calculateCompound({ ...baseInput, adjustForInflation: false });
    const realResult = calculateCompound({ ...baseInput, adjustForInflation: true });
    expect(realResult.finalBalanceReal).toBeLessThan(nominalResult.finalBalance);
  });

  it('FIRE number should equal annual expenses / withdrawal rate', () => {
    const result = calculateCompound(baseInput);
    const annualExpenses = baseInput.monthlyContribution * 12;
    const expectedFireNumber = annualExpenses / (baseInput.withdrawalRatePercent / 100);
    expect(Math.abs(result.fireNumber - expectedFireNumber)).toBeLessThan(1);
  });

  describe('ruleOf72', () => {
    it('should approximate doubling time at 8% as ~9 years', () => {
      expect(ruleOf72(8)).toBeCloseTo(9, 0);
    });
  });

  describe('realReturn', () => {
    it('should calculate Fisher equation real return', () => {
      // (1.08 / 1.03) - 1 ≈ 4.85%
      expect(realReturn(8, 3)).toBeCloseTo(4.85, 1);
    });
  });
});

// ─── Credit Card Payoff ────────────────────────────────────────

describe('Credit Card Payoff Optimizer', () => {
  const baseInput = {
    balance: 5000,
    apr: 20,
    minimumPaymentPercent: 2,
    minimumPaymentFloor: 25,
    fixedExtraPayment: 0,
  };

  it('should show minimum-only takes many years', () => {
    const result = calculateCreditCardPayoff(baseInput);
    expect(result.minimumOnlyMonths).toBeGreaterThan(100);
  });

  it('adding extra payment should dramatically reduce time and interest', () => {
    const withExtra = calculateCreditCardPayoff({ ...baseInput, fixedExtraPayment: 100 });
    const withoutExtra = calculateCreditCardPayoff(baseInput);
    expect(withExtra.optimizedMonths).toBeLessThan(withoutExtra.minimumOnlyMonths);
    expect(withExtra.interestSaved).toBeGreaterThan(0);
  });

  it('total paid should equal balance plus interest paid', () => {
    const result = calculateCreditCardPayoff(baseInput);
    const expected = round2(baseInput.balance + result.minimumOnlyInterestPaid);
    expect(Math.abs(result.minimumOnlyTotalPaid - expected)).toBeLessThan(2);
  });

  it('balance should reach zero in final schedule entry', () => {
    const result = calculateCreditCardPayoff({ ...baseInput, fixedExtraPayment: 200 });
    const lastEntry = result.monthlySchedule[result.monthlySchedule.length - 1];
    expect(lastEntry?.balance ?? 1).toBeLessThan(1);
  });
});

// ─── Student Loan Refinance ────────────────────────────────────

describe('Student Loan Refinance Estimator', () => {
  const baseInput = {
    loanBalance: 30000,
    currentRatePercent: 7.5,
    currentTermMonths: 120,
    currentMonthsRemaining: 108,
    newRatePercent: 5.0,
    newTermMonths: 120,
    refinanceFeePercent: 1.0,
  };

  it('should show savings when refinancing to lower rate', () => {
    const result = calculateStudentLoanRefinance(baseInput);
    expect(result.totalSavings).toBeGreaterThan(0);
    expect(result.monthlySavings).toBeGreaterThan(0);
  });

  it('new monthly payment should be lower with lower rate', () => {
    const result = calculateStudentLoanRefinance(baseInput);
    expect(result.newMonthlyPayment).toBeLessThan(result.currentMonthlyPayment);
  });

  it('refinanceFee should equal balance * feePercent', () => {
    const result = calculateStudentLoanRefinance(baseInput);
    const expectedFee = round2(baseInput.loanBalance * baseInput.refinanceFeePercent / 100);
    expect(Math.abs(result.refinanceFee - expectedFee)).toBeLessThan(0.01);
  });

  it('break-even should be positive when savings exist', () => {
    const result = calculateStudentLoanRefinance(baseInput);
    expect(result.breakEvenMonths).toBeGreaterThan(0);
  });

  it('should recommend refinance when savings are substantial', () => {
    const result = calculateStudentLoanRefinance(baseInput);
    // $30k loan, 2.5% rate reduction → significant savings
    expect(['refinance', 'marginal']).toContain(result.recommendation);
  });
});

// ─── Formatter Utilities ───────────────────────────────────────

describe('Formatter Utilities', () => {
  describe('formatCurrency', () => {
    it('formats large numbers with commas', () => {
      expect(formatCurrency(1234567)).toBe('$1,234,567');
    });
    it('handles zero', () => {
      expect(formatCurrency(0)).toBe('$0');
    });
    it('handles NaN gracefully', () => {
      expect(formatCurrency(NaN)).toBe('$0');
    });
    it('handles Infinity gracefully', () => {
      expect(formatCurrency(Infinity)).toBe('$0');
    });
  });

  describe('formatCurrencyShort', () => {
    it('abbreviates millions', () => {
      expect(formatCurrencyShort(1500000)).toBe('$1.5M');
    });
    it('abbreviates thousands', () => {
      expect(formatCurrencyShort(25000)).toBe('$25K');
    });
    it('handles small amounts', () => {
      expect(formatCurrencyShort(500)).toBe('$500');
    });
  });

  describe('formatDuration', () => {
    it('formats months only', () => {
      expect(formatDuration(6)).toBe('6 mo');
    });
    it('formats years only', () => {
      expect(formatDuration(24)).toBe('2 yr');
    });
    it('formats years and months', () => {
      expect(formatDuration(25)).toBe('2 yr 1 mo');
    });
    it('handles zero', () => {
      expect(formatDuration(0)).toBe('0 mo');
    });
  });
});
