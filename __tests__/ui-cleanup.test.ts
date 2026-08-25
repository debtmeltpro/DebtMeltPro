import * as fs from 'fs';
import * as path from 'path';
import { TOOLS } from '@/lib/seo';

describe('Phase 4C: UI & Content Cleanup Tests', () => {
  describe('About Page Calculator Count', () => {
    it('accurately states nine core calculators and does not state five', () => {
      const filePath = path.join(process.cwd(), 'src/app/about/page.tsx');
      const content = fs.readFileSync(filePath, 'utf-8');

      expect(content).toContain('suite of nine core calculators');
      expect(content).not.toContain('suite of five core calculators');
      expect(TOOLS.length).toBe(9);
    });
  });

  describe('CSS Malformed Nested Selector Audit', () => {
    it('globals.css does not contain nested body selectors', () => {
      const filePath = path.join(process.cwd(), 'src/app/globals.css');
      const content = fs.readFileSync(filePath, 'utf-8');

      // Check that there is no body { ... body { pattern
      const nestedBodyRegex = /body\s*\{[^}]*body\s*\{/s;
      expect(nestedBodyRegex.test(content)).toBe(false);
    });
  });

  describe('Header Navigation Suite', () => {
    it('contains links to all 9 calculator routes in Header source', () => {
      const filePath = path.join(process.cwd(), 'src/components/layout/Header.tsx');
      const content = fs.readFileSync(filePath, 'utf-8');

      const expectedToolSlugs = [
        '/tools/debt-payoff',
        '/tools/emi-calculator',
        '/tools/sip-calculator',
        '/tools/compound-interest',
        '/tools/credit-card-payoff',
        '/tools/mortgage-calculator',
        '/tools/student-loan',
        '/tools/loan-calculator',
        '/tools/credit-card-interest',
      ];

      for (const slug of expectedToolSlugs) {
        expect(content).toContain(slug);
      }
    });

    it('contains More Tools dropdown for additional calculators', () => {
      const filePath = path.join(process.cwd(), 'src/components/layout/Header.tsx');
      const content = fs.readFileSync(filePath, 'utf-8');

      expect(content).toContain('More Tools');
      expect(content).toContain('MORE_TOOLS_LINKS');
      expect(content).toContain('ALL_CALCULATOR_LINKS');
    });
  });
});
