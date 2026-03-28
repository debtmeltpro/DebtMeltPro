// ============================================================
// DebtFreedom — Site Footer
// Legal disclaimer (required for AdSense finance category).
// GDPR/CCPA compliant privacy links.
// ============================================================

import Link from 'next/link';
import { TrendingDown, ExternalLink } from 'lucide-react';

const TOOL_LINKS = [
  { href: '/tools/debt-payoff', label: 'Debt Payoff Calculator' },
  { href: '/tools/mortgage-calculator', label: 'Rent vs. Buy Calculator' },
  { href: '/tools/compound-interest', label: 'FIRE Calculator' },
  { href: '/tools/credit-card-payoff', label: 'Credit Card Optimizer' },
  { href: '/tools/student-loan', label: 'Student Loan Refinance' },
] as const;

const LEGAL_LINKS = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 mt-16">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

          {/* Brand + Disclaimer */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
                <TrendingDown className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Debt<span className="text-brand-400">Freedom</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4 max-w-lg">
              Free financial calculators to help you understand debt payoff strategies,
              mortgage decisions, compound growth, and loan optimization.
            </p>

            {/* ⚠️ Legal Disclaimer — Required for AdSense Finance category */}
            <div className="rounded-lg border border-amber-800/40 bg-amber-950/30 px-4 py-3 text-xs text-amber-300/80 leading-relaxed">
              <strong className="font-semibold text-amber-300">Financial Disclaimer: </strong>
              DebtFreedom provides educational financial calculators for informational purposes only.
              All calculations are estimates based on the inputs provided and do not constitute
              financial, tax, or legal advice. Results may vary based on actual terms, fees, and
              individual circumstances. Consult a licensed financial advisor before making any
              financial decisions. We are not affiliated with any financial institution.
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Our Tools
            </h3>
            <ul className="space-y-2.5">
              {TOOL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:text-brand-400 transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {year} DebtFreedom. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {LEGAL_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                {label}
              </Link>
            ))}
            <a
              href="https://www.consumer.ftc.gov/features/feature-0038-on-guard-online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              FTC Guidelines
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
