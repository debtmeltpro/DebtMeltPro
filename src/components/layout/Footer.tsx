// ============================================================
// DebtMeltPro — Site Footer
// Comprehensive internal linking for SEO.
// Legal disclaimer (required for AdSense finance category).
// Links to all pages including about, contact, disclaimer.
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

const CATEGORY_LINKS = [
  { href: '/category/debt-management', label: 'Debt Management' },
  { href: '/category/home-buying', label: 'Home Buying' },
  { href: '/category/investing', label: 'Investing & FIRE' },
  { href: '/category/student-loans', label: 'Student Loans' },
] as const;

const COMPANY_LINKS = [
  { href: '/prompts', label: 'AI Finance Prompts' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
] as const;

const LEGAL_LINKS = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/disclaimer', label: 'Disclaimer' },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 mt-16">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand + Disclaimer */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
                <TrendingDown className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Debt<span className="text-brand-400">MeltPro</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4 max-w-lg">
              Free, privacy-first financial calculators to help you understand debt payoff strategies,
              mortgage decisions, compound growth, and loan optimization. No sign-up required.
            </p>

            {/* Legal Disclaimer */}
            <div className="rounded-lg border border-amber-800/40 bg-amber-950/30 px-4 py-3 text-xs text-amber-300/80 leading-relaxed">
              <strong className="font-semibold text-amber-300">Financial Disclaimer: </strong>
              DebtMeltPro provides educational financial calculators for informational purposes only.
              All calculations are estimates and do not constitute financial, tax, or legal advice.
              Consult a licensed financial advisor before making any financial decisions.
              <Link href="/disclaimer" className="underline ml-1 hover:no-underline">
                Read full disclaimer
              </Link>.
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Calculators
            </h3>
            <ul className="space-y-2.5">
              {TOOL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-brand-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories + Company */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5 mb-6">
              {CATEGORY_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-brand-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-brand-400 transition-colors">
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
            © {year} DebtMeltPro. All rights reserved. Not financial advice.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
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
              href="https://consumer.ftc.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              FTC Guidelines
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
            <a
              href="https://rbi.org.in/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1"

            >
              RBI Financial Awareness
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
