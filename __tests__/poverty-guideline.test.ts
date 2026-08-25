import {
  calcHhsPovertyGuideline,
  compareIDRPlans,
  calculatePSLF,
} from '@/lib/math-engine';

describe('Phase 5D-Step 1: 2026 HHS Poverty Guidelines Verification', () => {
  describe('calcHhsPovertyGuideline', () => {
    it('calculates 2026 HHS poverty guideline for family size 1 ($15,960)', () => {
      expect(calcHhsPovertyGuideline(1)).toBe(15960);
    });

    it('calculates 2026 HHS poverty guideline for family size 2 ($21,640)', () => {
      expect(calcHhsPovertyGuideline(2)).toBe(21640);
    });

    it('calculates 2026 HHS poverty guideline for family size 4 ($33,000)', () => {
      expect(calcHhsPovertyGuideline(4)).toBe(33000);
    });

    it('calculates 2026 HHS poverty guideline for larger family size (e.g. 8 members)', () => {
      // 15960 + 5680 * 7 = 55720
      expect(calcHhsPovertyGuideline(8)).toBe(55720);
    });

    it('gracefully handles 0 or negative family sizes by flooring to 1', () => {
      expect(calcHhsPovertyGuideline(0)).toBe(15960);
      expect(calcHhsPovertyGuideline(-3)).toBe(15960);
    });
  });

  describe('Integration with IDR & PSLF calculations', () => {
    it('uses 2026 poverty baseline in compareIDRPlans', () => {
      const balance = 50000;
      const rate = 6.0;
      const income = 60000;
      const resultFam1 = compareIDRPlans(balance, rate, income, 1);
      const resultFam4 = compareIDRPlans(balance, rate, income, 4);

      const plan4 = resultFam4.plans[0];
      const plan1 = resultFam1.plans[0];
      expect(plan4).toBeDefined();
      expect(plan1).toBeDefined();
      if (plan4 && plan1) {
        expect(plan4.initialMonthlyPayment).toBeLessThan(plan1.initialMonthlyPayment);
      }
    });

    it('uses 2026 poverty baseline in calculatePSLF', () => {
      const resultFam1 = calculatePSLF(60000, 6.0, 50000, 60, 1);
      const resultFam3 = calculatePSLF(60000, 6.0, 50000, 60, 3);

      expect(resultFam3.monthlyPayment).toBeLessThan(resultFam1.monthlyPayment);
    });
  });
});
