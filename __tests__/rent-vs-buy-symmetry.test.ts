import { calculateMortgage } from '@/lib/math-engine/mortgage';

describe('Phase 5B-Step 1: Rent vs Buy Cash-Flow Symmetry & Edge Cases', () => {
  // Base configuration
  const baseInput = {
    homePrice: 300000,
    downPaymentPercent: 20, // $60,000 down
    mortgageRatePercent: 6.0,
    loanTermYears: 30,
    propertyTaxRatePercent: 1.2, // $300/mo
    maintenanceRatePercent: 1.0, // $250/mo
    homeInsuranceMonthly: 75,
    hoaMonthly: 0,
    homeAppreciationPercent: 3.0,
    monthlyRent: 2000,
    rentIncreasePercent: 3.0,
    investmentReturnPercent: 7.0,
    marginalTaxRatePercent: 22,
    yearsToAnalyze: 10,
  };

  describe('Scenario A: Rent < Ownership Cost', () => {
    it('renter invests the positive monthly surplus', () => {
      // Monthly buying cost: PI (~$1438.92) + Tax ($300) + Maint ($250) + Ins ($75) = ~$2063.92/mo
      // Rent: $1500/mo. Surplus: ~$563.92/mo invested by renter.
      const result = calculateMortgage({
        ...baseInput,
        monthlyRent: 1500,
        rentIncreasePercent: 2.0,
      });

      expect(result.monthlyPayment).toBeCloseTo(2063.92, 1);
      expect(result.rentingNetWorth).toBeGreaterThan(baseInput.homePrice * 0.2); // Grown well past initial $60k
      expect(result.yearlyComparison.length).toBe(10);
      expect(result.rentingNetWorth).toBeGreaterThan(0);
    });
  });

  describe('Scenario B: Rent > Ownership Cost', () => {
    it('accounts for excess rental expense by deducting deficit from portfolio', () => {
      // Cheap home / expensive rent scenario
      // Home price $150k, 20% down ($30k). PI ($719.46) + Tax ($150) + Maint ($125) + Ins ($50) = ~$1044.46/mo
      // Rent: $2200/mo. Excess rent: ~$1155.54/mo higher than buying.
      const result = calculateMortgage({
        ...baseInput,
        homePrice: 150000,
        monthlyRent: 2200,
        rentIncreasePercent: 3.0,
        yearsToAnalyze: 5,
      });

      // After 5 years of paying $2200+/mo vs $1044/mo owning,
      // the initial $30,000 portfolio should be depleted or severely drawn down compared to pure compounding
      const pureCompoundingDownPayment = 30000 * Math.pow(1 + 0.07, 5); // ~$42,076
      expect(result.rentingNetWorth).toBeLessThan(pureCompoundingDownPayment);
      expect(result.recommendation).toBe('buy');
    });
  });

  describe('Scenario C: Rent approximately equals Ownership Cost', () => {
    it('produces near-neutral cash-flow difference where portfolio tracks down payment compounding', () => {
      // Buying cost: ~$2063.92/mo
      // Rent: $2064/mo with 0% rent increase
      const result = calculateMortgage({
        ...baseInput,
        monthlyRent: 2064,
        rentIncreasePercent: 0,
        yearsToAnalyze: 5,
      });

      // Compounded monthly at 7%/12 for 60 months
      const expectedDownPaymentFV = 60000 * Math.pow(1 + 0.07 / 12, 60); // ~$85,057.49
      // Because monthly cost diff is ~ -$0.08/mo, renter portfolio closely matches monthly compounded down payment
      expect(result.rentingNetWorth).toBeCloseTo(expectedDownPaymentFV, -2);
    });
  });

  describe('Scenario D: Crossing-Cost Transition (Rent crosses ownership cost)', () => {
    it('smoothly switches from positive contributions to negative drawdowns when rent escalates', () => {
      // Initial rent $1800 < $2064 buying cost.
      // Rent grows at 5% annually:
      // Y1: $1800, Y2: $1890, Y3: $1984.50, Y4: $2083.73 (Crosses!), Y5: $2187.91
      const result = calculateMortgage({
        ...baseInput,
        monthlyRent: 1800,
        rentIncreasePercent: 5.0,
        yearsToAnalyze: 10,
      });

      expect(result.yearlyComparison.length).toBe(10);
      expect(result.rentingNetWorth).toBeGreaterThan(0);
      // In early years, cumulative buying cost is higher than rent cost
      expect(result.yearlyComparison[0]!.cumulativeBuyingCost).toBeGreaterThan(
        result.yearlyComparison[0]!.cumulativeRentCost
      );
    });
  });

  describe('Mathematical Invariants', () => {
    it('portfolio balance never becomes negative even under extreme rent costs', () => {
      const result = calculateMortgage({
        ...baseInput,
        homePrice: 100000, // $20k down
        monthlyRent: 5000, // Massive rent
        rentIncreasePercent: 10,
        yearsToAnalyze: 15,
      });

      expect(result.rentingNetWorth).toBeGreaterThanOrEqual(0);
      for (const year of result.yearlyComparison) {
        expect(year.rentingPortfolioValue).toBeGreaterThanOrEqual(0);
      }
    });

    it('higher rent monotonically decreases or maintains renter net worth', () => {
      const resultLowRent = calculateMortgage({ ...baseInput, monthlyRent: 1500 });
      const resultHighRent = calculateMortgage({ ...baseInput, monthlyRent: 2500 });

      expect(resultLowRent.rentingNetWorth).toBeGreaterThan(resultHighRent.rentingNetWorth);
    });
  });
});
