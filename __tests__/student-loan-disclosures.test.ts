import * as fs from 'fs';
import * as path from 'path';
import { compareIDRPlans } from '@/lib/math-engine';

describe('Phase 5D-Step 2: Student Loan Current-Law Disclosures and Eligibility Context', () => {
  describe('StudentLoanCalculator UI Disclosures', () => {
    const calcPath = path.join(
      process.cwd(),
      'src/app/tools/student-loan/StudentLoanCalculator.tsx'
    );
    const calcContent = fs.readFileSync(calcPath, 'utf-8');

    it('contains SAVE court injunction and inactive status warning', () => {
      expect(calcContent).toContain('SAVE Plan');
      expect(calcContent).toContain('federal court injunctions');
      expect(calcContent).toContain('not an active unrestricted repayment option');
    });

    it('labels PAYE as legacy/sunsetting', () => {
      expect(calcContent).toContain('PAYE — Legacy / Sunsetting');
    });

    it('labels ICR as restricted/legacy', () => {
      expect(calcContent).toContain('ICR — Restricted / Legacy');
      expect(calcContent).toContain('Parent PLUS');
    });

    it('contains IBR borrower cohort distinction note', () => {
      expect(calcContent).toContain('IBR (Income-Based Repayment)');
      expect(calcContent).toContain('post-2014');
      expect(calcContent).toContain('pre-2014');
    });

    it('contains official Federal Student Aid link with safe attributes', () => {
      expect(calcContent).toContain('href="https://studentaid.gov/"');
      expect(calcContent).toContain('target="_blank"');
      expect(calcContent).toContain('rel="noopener noreferrer"');
    });

    it('contains educational disclaimer', () => {
      expect(calcContent).toContain('Federal student-loan repayment programs and eligibility rules can change');
      expect(calcContent).toContain('educational estimate');
      expect(calcContent).toContain('Verify your current eligibility');
    });
  });

  describe('Student Loan Page Disclaimer', () => {
    const pagePath = path.join(
      process.cwd(),
      'src/app/tools/student-loan/page.tsx'
    );
    const pageContent = fs.readFileSync(pagePath, 'utf-8');

    it('contains safe official link to Federal Student Aid', () => {
      expect(pageContent).toContain('href="https://studentaid.gov/"');
      expect(pageContent).toContain('target="_blank"');
      expect(pageContent).toContain('rel="noopener noreferrer"');
    });
  });

  describe('Math Engine IDR Plan Labels', () => {
    it('returns legally qualified plan names in compareIDRPlans', () => {
      const result = compareIDRPlans(40000, 6.0, 50000, 1);
      const savePlan = result.plans.find((p) => p.plan === 'SAVE');
      const payePlan = result.plans.find((p) => p.plan === 'PAYE');
      const ibrPlan = result.plans.find((p) => p.plan === 'IBR');
      const icrPlan = result.plans.find((p) => p.plan === 'ICR');

      expect(savePlan?.planFullName).toContain('Court Enjoined');
      expect(payePlan?.planFullName).toContain('Legacy / Sunsetting');
      expect(ibrPlan?.planFullName).toContain('Income-Based Repayment');
      expect(icrPlan?.planFullName).toContain('Restricted / Legacy');
    });
  });
});
