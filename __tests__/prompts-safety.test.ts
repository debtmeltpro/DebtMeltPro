import {
  PROMPTS,
  PROMPT_CATEGORIES,
  AI_EDUCATIONAL_DISCLAIMER,
  AI_PII_WARNING,
  getPromptCount,
  getViralPrompts,
  getPromptsByCategory,
} from '@/lib/prompts';
import * as fs from 'fs';
import * as path from 'path';

describe('Phase 4B: AI Prompt Safety & Disclaimers', () => {
  describe('Constants & Disclaimers', () => {
    it('defines clear AI educational disclaimer without claiming certified advice', () => {
      expect(AI_EDUCATIONAL_DISCLAIMER).toContain('educational and brainstorming purposes only');
      expect(AI_EDUCATIONAL_DISCLAIMER).toContain('not certified financial, tax, accounting, or legal advice');
      expect(AI_EDUCATIONAL_DISCLAIMER).toContain('Verify important information with a qualified professional');
    });

    it('defines clear PII and sensitive data warning', () => {
      expect(AI_PII_WARNING).toContain('Never paste passwords');
      expect(AI_PII_WARNING).toContain('bank account numbers');
      expect(AI_PII_WARNING).toContain('PAN');
      expect(AI_PII_WARNING).toContain('SSN');
      expect(AI_PII_WARNING).toContain('Aadhaar numbers');
    });
  });

  describe('Prompt Definitions & Regional Metadata', () => {
    it('ensures all prompts have defined regional tags', () => {
      expect(PROMPTS.length).toBeGreaterThanOrEqual(8);
      for (const prompt of PROMPTS) {
        expect(prompt.region).toBeDefined();
        expect(['US-focused', 'General', 'Global']).toContain(prompt.region);
      }
    });

    it('tags US-specific prompts appropriately', () => {
      const usPrompts = PROMPTS.filter((p) => p.region === 'US-focused');
      const usSlugs = usPrompts.map((p) => p.slug);

      expect(usSlugs).toContain('portfolio-risk-analyzer');
      expect(usSlugs).toContain('credit-score-90-day-boost');
      expect(usSlugs).toContain('tax-deduction-finder');
    });

    it('ensures no prompt asks for passwords, credentials, or full account numbers', () => {
      const unsafeKeywords = [
        'password',
        'pin number',
        'bank account number',
        'social security number',
        'aadhaar number',
        'pan number',
        'routing number',
      ];

      for (const prompt of PROMPTS) {
        const text = prompt.prompt.toLowerCase();
        for (const kw of unsafeKeywords) {
          // Should not request actual credentials
          expect(text).not.toContain(`your ${kw}`);
          expect(text).not.toContain(`[${kw.toUpperCase().replace(/\s+/g, '_')}]`);
        }
      }
    });
  });

  describe('UI Component Safety Warnings Audit', () => {
    it('PromptCard component includes PII safety notice', () => {
      const filePath = path.join(process.cwd(), 'src/components/prompts/PromptCard.tsx');
      const content = fs.readFileSync(filePath, 'utf-8');

      expect(content).toContain('Privacy Safety Notice:');
      expect(content).toContain('Never paste passwords, bank account numbers, card numbers, PAN, SSN, Aadhaar numbers');
    });

    it('PromptCard component includes AI Educational Disclaimer', () => {
      const filePath = path.join(process.cwd(), 'src/components/prompts/PromptCard.tsx');
      const content = fs.readFileSync(filePath, 'utf-8');

      expect(content).toContain('AI Educational Disclaimer:');
      expect(content).toContain('AI-generated responses are for educational and brainstorming purposes only');
    });

    it('Prompts index page renders educational disclaimer banner', () => {
      const filePath = path.join(process.cwd(), 'src/app/prompts/page.tsx');
      const content = fs.readFileSync(filePath, 'utf-8');

      expect(content).toContain('AI_EDUCATIONAL_DISCLAIMER');
      expect(content).toContain('AI Educational Disclaimer:');
    });

    it('Prompts category page renders educational disclaimer banner', () => {
      const filePath = path.join(process.cwd(), 'src/app/prompts/[category]/page.tsx');
      const content = fs.readFileSync(filePath, 'utf-8');

      expect(content).toContain('AI_EDUCATIONAL_DISCLAIMER');
      expect(content).toContain('AI Educational Disclaimer:');
    });
  });
});
