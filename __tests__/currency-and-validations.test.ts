import { createCurrencyFormatters } from '@/hooks/useCurrency';
import { formatCurrency, formatCurrencyExact, formatCurrencyShort } from '@/lib/math-engine';
import {
  debtAccountSchema,
  mortgageInputSchema,
  creditCardInputSchema,
  studentLoanInputSchema,
  sipInputSchema,
  loanEmiInputSchema,
} from '@/lib/validations/schemas';

describe('Phase 3A: Currency Formatting Multi-Locale Tests', () => {
  describe('createCurrencyFormatters (source of truth for UI)', () => {
    it('formats Indian Rupee (en-IN / INR) correctly', () => {
      const formatters = createCurrencyFormatters({
        code: 'INR',
        locale: 'en-IN',
        symbol: '₹',
        name: 'Indian Rupee',
      });

      const formatted = formatters.formatCurrency(50000);
      expect(formatted).toContain('50,000');
      expect(formatted).toContain('₹');

      const exact = formatters.formatCurrencyExact(50000.5);
      expect(exact).toContain('50,000.50');
      expect(exact).toContain('₹');

      expect(formatters.formatCurrencyShort(1500000)).toBe('₹1.5M');
      expect(formatters.formatCurrencyShort(25000)).toBe('₹25K');
    });

    it('formats US Dollar (en-US / USD) correctly', () => {
      const formatters = createCurrencyFormatters({
        code: 'USD',
        locale: 'en-US',
        symbol: '$',
        name: 'US Dollar',
      });

      expect(formatters.formatCurrency(12500)).toBe('$12,500');
      expect(formatters.formatCurrencyExact(12500.75)).toBe('$12,500.75');
      expect(formatters.formatCurrencyShort(1500000)).toBe('$1.5M');
      expect(formatters.formatCurrencyShort(25000)).toBe('$25K');
    });

    it('formats British Pound (en-GB / GBP) correctly', () => {
      const formatters = createCurrencyFormatters({
        code: 'GBP',
        locale: 'en-GB',
        symbol: '£',
        name: 'British Pound',
      });

      expect(formatters.formatCurrency(10000)).toBe('£10,000');
      expect(formatters.formatCurrencyExact(10000.25)).toBe('£10,000.25');
      expect(formatters.formatCurrencyShort(2500000)).toBe('£2.5M');
    });

    it('formats Euro (de-DE / EUR) correctly', () => {
      const formatters = createCurrencyFormatters({
        code: 'EUR',
        locale: 'de-DE',
        symbol: '€',
        name: 'Euro',
      });

      const formatted = formatters.formatCurrency(10000);
      expect(formatted).toContain('10.000');
      expect(formatted).toContain('€');

      expect(formatters.formatCurrencyShort(3000000)).toBe('€3.0M');
    });
  });

  describe('math-engine formatters with multi-currency support', () => {
    it('supports custom locale and currency in formatCurrency', () => {
      const inr = formatCurrency(50000, 'en-IN', 'INR');
      expect(inr).toContain('50,000');
      expect(inr).toContain('₹');

      const gbp = formatCurrency(12000, 'en-GB', 'GBP');
      expect(gbp).toBe('£12,000');

      const eur = formatCurrency(15000, 'de-DE', 'EUR');
      expect(eur).toContain('15.000');
      expect(eur).toContain('€');
    });

    it('supports custom symbol and currency in formatCurrencyShort', () => {
      expect(formatCurrencyShort(2000000, '₹', 'en-IN', 'INR')).toBe('₹2.0M');
      expect(formatCurrencyShort(45000, '£', 'en-GB', 'GBP')).toBe('£45K');
      expect(formatCurrencyShort(500000, '€', 'de-DE', 'EUR')).toBe('€500K');
    });
  });
});

describe('Phase 3A: Currency-Neutral Validation Schemas', () => {
  it('debtAccountSchema has currency-neutral error messages without "$"', () => {
    const result = debtAccountSchema.safeParse({
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Credit Card',
      balance: 0, // min is 1
      interestRate: 15,
      minimumPayment: 25,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.errors.map((e) => e.message);
      expect(messages.some((m) => m.includes('$'))).toBe(false);
      expect(messages).toContain('Balance must be at least 1');
    }
  });

  it('mortgageInputSchema has currency-neutral error messages without "$"', () => {
    const result = mortgageInputSchema.safeParse({
      homePrice: 10000, // min is 50,000
      downPaymentPercent: 20,
      mortgageRatePercent: 6.5,
      loanTermYears: '30',
      propertyTaxRatePercent: 1.2,
      maintenanceRatePercent: 1,
      homeInsuranceMonthly: 100,
      hoaMonthly: 50,
      homeAppreciationPercent: 3,
      monthlyRent: 50, // min is 100
      rentIncreasePercent: 2,
      investmentReturnPercent: 7,
      marginalTaxRatePercent: 25,
      yearsToAnalyze: 10,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.errors.map((e) => e.message);
      expect(messages.some((m) => m.includes('$'))).toBe(false);
      expect(messages).toContain('Home price must be at least 50,000');
      expect(messages).toContain('Rent must be at least 100');
    }
  });

  it('creditCardInputSchema has currency-neutral error messages without "$"', () => {
    const result = creditCardInputSchema.safeParse({
      balance: 50, // min is 100
      apr: 20,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.errors.map((e) => e.message);
      expect(messages.some((m) => m.includes('$'))).toBe(false);
      expect(messages).toContain('Balance must be at least 100');
    }
  });

  it('studentLoanInputSchema has currency-neutral error messages without "$"', () => {
    const result = studentLoanInputSchema.safeParse({
      loanBalance: 500, // min is 1000
      currentRatePercent: 6.8,
      currentTermMonths: 120,
      currentMonthsRemaining: 100,
      newRatePercent: 4.5,
      newTermMonths: 120,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.errors.map((e) => e.message);
      expect(messages.some((m) => m.includes('$'))).toBe(false);
      expect(messages).toContain('Loan balance must be at least 1,000');
    }
  });

  it('sipInputSchema and loanEmiInputSchema work with currency-neutral messages', () => {
    const sipRes = sipInputSchema.safeParse({
      monthlyInvestment: 50, // min is 100
      annualReturnPercent: 12,
      years: 10,
    });
    expect(sipRes.success).toBe(false);
    if (!sipRes.success) {
      expect(sipRes.error.errors.map((e) => e.message)).toContain('SIP must be at least 100');
    }

    const emiRes = loanEmiInputSchema.safeParse({
      loanAmount: 500, // min is 1,000
      annualInterestRatePercent: 8.5,
      tenureMonths: 240,
    });
    expect(emiRes.success).toBe(false);
    if (!emiRes.success) {
      expect(emiRes.error.errors.map((e) => e.message)).toContain('Loan amount must be at least 1,000');
    }
  });
});

// ─── Phase 4A: Currency-Aware Labels, Locale Copy & Monte Carlo ───

import { whatIfWindfall } from '@/lib/math-engine/debt';
import { compareExtraPayments } from '@/lib/math-engine/mortgage';
import { calculateMilestones, monteCarloSimulation } from '@/lib/math-engine/compound';
import * as fs from 'fs';
import * as path from 'path';

describe('Phase 4A: Currency-Aware Engine Labels', () => {
  const sampleDebts = [
    { id: '1', name: 'Credit Card', balance: 5000, interestRate: 20, minimumPayment: 100 },
  ];

  describe('whatIfWindfall', () => {
    it('formats label with INR (₹)', () => {
      const res = whatIfWindfall({ debts: sampleDebts, strategy: 'avalanche', extraMonthlyPayment: 0 }, 50000, 'avalanche', '₹', 'en-IN', 'INR');
      expect(res.label).toContain('₹');
      expect(res.label).not.toContain('$');
      expect(res.label).toContain('50,000');
    });

    it('formats label with GBP (£)', () => {
      const res = whatIfWindfall({ debts: sampleDebts, strategy: 'avalanche', extraMonthlyPayment: 0 }, 2000, 'avalanche', '£', 'en-GB', 'GBP');
      expect(res.label).toContain('£');
      expect(res.label).not.toContain('$');
    });

    it('formats label with EUR (€)', () => {
      const res = whatIfWindfall({ debts: sampleDebts, strategy: 'avalanche', extraMonthlyPayment: 0 }, 3000, 'avalanche', '€', 'de-DE', 'EUR');
      expect(res.label).toContain('€');
      expect(res.label).not.toContain('$');
    });

    it('formats label with USD ($)', () => {
      const res = whatIfWindfall({ debts: sampleDebts, strategy: 'avalanche', extraMonthlyPayment: 0 }, 1000, 'avalanche', '$', 'en-US', 'USD');
      expect(res.label).toContain('$');
      expect(res.label).toContain('1,000');
    });
  });

  describe('compareExtraPayments', () => {
    it('formats scenario labels with INR (₹)', () => {
      const scenarios = compareExtraPayments(2000000, 8.5, 20, [5000, 10000], '₹', 'en-IN', 'INR');
      for (const s of scenarios) {
        if (s.extraMonthly > 0) {
          expect(s.label).toContain('₹');
          expect(s.label).not.toContain('$');
        }
      }
    });

    it('formats scenario labels with GBP (£)', () => {
      const scenarios = compareExtraPayments(200000, 5, 25, [100, 200], '£', 'en-GB', 'GBP');
      for (const s of scenarios) {
        if (s.extraMonthly > 0) {
          expect(s.label).toContain('£');
          expect(s.label).not.toContain('$');
        }
      }
    });

    it('formats scenario labels with EUR (€)', () => {
      const scenarios = compareExtraPayments(300000, 4, 20, [150, 300], '€', 'de-DE', 'EUR');
      for (const s of scenarios) {
        if (s.extraMonthly > 0) {
          expect(s.label).toContain('€');
          expect(s.label).not.toContain('$');
        }
      }
    });
  });

  describe('calculateMilestones', () => {
    it('formats milestones with INR (₹)', () => {
      const milestones = calculateMilestones(10000, 5000, 12, [50000, 100000, 1000000], '₹');
      for (const m of milestones) {
        expect(m.label).toContain('₹');
        expect(m.label).not.toContain('$');
      }
    });

    it('formats milestones with EUR (€)', () => {
      const milestones = calculateMilestones(5000, 1000, 8, [50000, 500000], '€');
      for (const m of milestones) {
        expect(m.label).toContain('€');
        expect(m.label).not.toContain('$');
      }
    });
  });
});

describe('Phase 4A: UI Badge Location Wording Audit', () => {
  it('StudentLoanCalculator does not contain "based on your location"', () => {
    const filePath = path.join(process.cwd(), 'src/app/tools/student-loan/StudentLoanCalculator.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content.toLowerCase()).not.toContain('based on your location');
    expect(content).toContain('based on your device language');
  });

  it('MortgageCalculator does not contain "based on your location"', () => {
    const filePath = path.join(process.cwd(), 'src/app/tools/mortgage-calculator/MortgageCalculator.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content.toLowerCase()).not.toContain('based on your location');
    expect(content).toContain('based on your device language');
  });
});

describe('Phase 4A: Monte Carlo Numerical Safety', () => {
  it('handles Math.random() returning 0 without producing NaN or Infinity', () => {
    const originalRandom = Math.random;
    try {
      // Mock Math.random to always return 0 (worst case for log(u1))
      Math.random = () => 0;

      const result = monteCarloSimulation(10000, 500, 8, 15, 10, 100000, 50);

      expect(Number.isFinite(result.successRate)).toBe(true);
      expect(Number.isFinite(result.medianBalance)).toBe(true);
      expect(Number.isFinite(result.p10Balance)).toBe(true);
      expect(Number.isFinite(result.p90Balance)).toBe(true);
      expect(Number.isFinite(result.p5Balance)).toBe(true);
      expect(isNaN(result.medianBalance)).toBe(false);

      for (const p of result.percentiles) {
        expect(Number.isFinite(p.balance)).toBe(true);
        expect(isNaN(p.balance)).toBe(false);
      }
    } finally {
      Math.random = originalRandom;
    }
  });

  it('runs standard simulation with finite valid statistics', () => {
    const result = monteCarloSimulation(50000, 1000, 9, 16, 15, 500000, 100);
    expect(result.successRate).toBeGreaterThanOrEqual(0);
    expect(result.successRate).toBeLessThanOrEqual(100);
    expect(result.medianBalance).toBeGreaterThan(0);
    expect(result.percentiles.length).toBe(7);
  });
});

