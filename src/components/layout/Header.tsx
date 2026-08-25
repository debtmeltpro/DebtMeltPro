'use client';

// ============================================================
// DebtMeltPro — Site Header
// Sticky header with full 9-calculator navigation, More Tools
// dropdown, AI prompts, blog, about, and dark mode.
// Fully accessible (ARIA labels, keyboard nav, click-outside).
// ============================================================

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, TrendingDown, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const PRIMARY_NAV_LINKS = [
  { href: '/tools/debt-payoff', label: 'Debt Payoff' },
  { href: '/tools/emi-calculator', label: 'EMI Calculator' },
  { href: '/tools/sip-calculator', label: 'SIP Calculator' },
  { href: '/tools/compound-interest', label: 'Compound & FIRE' },
  { href: '/tools/credit-card-payoff', label: 'Credit Cards' },
  { href: '/tools/mortgage-calculator', label: 'Rent vs Buy' },
] as const;

const MORE_TOOLS_LINKS = [
  { href: '/tools/student-loan', label: 'Student Loan Refinance', description: 'Compare interest rates & savings' },
  { href: '/tools/loan-calculator', label: 'Loan Amortization', description: 'Schedule & payoff breakdown' },
  { href: '/tools/credit-card-interest', label: 'Credit Card Interest', description: 'True cost of revolving balances' },
] as const;

const ALL_CALCULATOR_LINKS = [
  { href: '/tools/debt-payoff', label: 'Debt Payoff Calculator' },
  { href: '/tools/emi-calculator', label: 'Loan EMI Calculator' },
  { href: '/tools/sip-calculator', label: 'SIP Investment Calculator' },
  { href: '/tools/compound-interest', label: 'Compound Interest & FIRE' },
  { href: '/tools/credit-card-payoff', label: 'Credit Card Payoff' },
  { href: '/tools/mortgage-calculator', label: 'Rent vs Buy Analysis' },
  { href: '/tools/student-loan', label: 'Student Loan Refinance' },
  { href: '/tools/loan-calculator', label: 'Loan Amortization Schedule' },
  { href: '/tools/credit-card-interest', label: 'Credit Card Interest' },
] as const;

const SECONDARY_LINKS = [
  { href: '/prompts', label: 'AI Prompts' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  const isMoreActive = MORE_TOOLS_LINKS.some((tool) => pathname === tool.href);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-white/95 dark:bg-surface-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm'
          : 'bg-white dark:bg-surface-900 border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="DebtMeltPro — Home"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center group-hover:bg-brand-600 transition-colors">
              <TrendingDown className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Debt<span className="text-brand-500">MeltPro</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {PRIMARY_NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-2.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                  pathname === href
                    ? 'bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                )}
                aria-current={pathname === href ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}

            {/* More Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setMoreOpen((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setMoreOpen(false);
                }}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                aria-label="More financial calculators"
                className={cn(
                  'px-2.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 inline-flex items-center gap-1',
                  isMoreActive || moreOpen
                    ? 'bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                )}
              >
                <span>More Tools</span>
                <ChevronDown
                  className={cn('w-3.5 h-3.5 transition-transform duration-150', moreOpen && 'rotate-180')}
                  aria-hidden="true"
                />
              </button>

              {moreOpen && (
                <div
                  role="menu"
                  aria-orientation="vertical"
                  className="absolute left-0 mt-1.5 w-64 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Additional Calculators
                  </div>
                  {MORE_TOOLS_LINKS.map(({ href, label, description }) => (
                    <Link
                      key={href}
                      href={href}
                      role="menuitem"
                      onClick={() => setMoreOpen(false)}
                      className={cn(
                        'block px-3 py-2 text-sm transition-colors',
                        pathname === href
                          ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-400 font-medium'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                      )}
                    >
                      <div className="font-medium text-slate-900 dark:text-white text-xs">{label}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Separator */}
            <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" aria-hidden="true" />

            {SECONDARY_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                  pathname?.startsWith(href)
                    ? 'bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                )}
                aria-current={pathname?.startsWith(href) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={mounted && resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {mounted && resolvedTheme === 'dark' ? (
                <Sun className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-900 max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <nav className="px-4 py-3 flex flex-col gap-1" aria-label="Mobile navigation">
            <p className="px-4 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Calculators ({ALL_CALCULATOR_LINKS.length} Tools)
            </p>
            <div className="grid grid-cols-1 gap-1">
              {ALL_CALCULATOR_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    pathname === href
                      ? 'bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                  aria-current={pathname === href ? 'page' : undefined}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />

            <p className="px-4 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Resources
            </p>
            {SECONDARY_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  pathname?.startsWith(href)
                    ? 'bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
