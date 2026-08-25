import * as fs from 'fs';
import * as path from 'path';

describe('Phase 5B-Step 2: FIRE Proxy Disclosure and How-To Verification', () => {
  describe('CompoundCalculator UI Disclosures', () => {
    it('contains educational note explaining annual savings spending proxy', () => {
      const filePath = path.join(
        process.cwd(),
        'src/app/tools/compound-interest/CompoundCalculator.tsx'
      );
      const content = fs.readFileSync(filePath, 'utf-8');

      expect(content).toContain('Educational Note:');
      expect(content).toContain('educational proxy for retirement spending');
      expect(content).toContain('expected annual living expenses');
    });

    it('contains accessible tooltip on the FIRE Number metric card', () => {
      const filePath = path.join(
        process.cwd(),
        'src/app/tools/compound-interest/CompoundCalculator.tsx'
      );
      const content = fs.readFileSync(filePath, 'utf-8');

      expect(content).toContain('id="fire-calc-tooltip"');
      expect(content).toContain('role="tooltip"');
      expect(content).toContain('aria-label="FIRE number calculation details"');
      expect(content).toContain('aria-describedby="fire-calc-tooltip"');
      expect(content).toContain('25× your actual expected annual living expenses');
    });
  });

  describe('Compound Interest Page How-To Schema', () => {
    it('does not claim an annual expenses input exists', () => {
      const filePath = path.join(
        process.cwd(),
        'src/app/tools/compound-interest/page.tsx'
      );
      const content = fs.readFileSync(filePath, 'utf-8');

      expect(content).not.toContain('Enter annual expenses');
      expect(content).toContain('Set safe withdrawal rate');
    });
  });
});
