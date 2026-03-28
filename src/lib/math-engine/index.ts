// ============================================================
// DebtFreedom — Math Engine Index
// Central export point for all financial calculators.
// Also exports shared formatting utilities.
// ============================================================

// ─── Calculator Exports ────────────────────────────────────────
export { calculateDebtPayoff, formatPayoffDuration, getBestStrategy, calcFixedMonthlyPayment } from './debt';
export { calculateMortgage } from './mortgage';
export { calculateCompound, ruleOf72, realReturn } from './compound';
export { calculateCreditCardPayoff } from './credit-card';
export { calculateStudentLoanRefinance } from './student-loan';

// ─── Shared Formatting Utilities ──────────────────────────────

const USD_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const USD_FORMATTER_CENTS = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const PCT_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});

/**
 * Format a dollar amount to a USD string (no cents for large numbers).
 * e.g. 12500.75 → "$12,501"
 */
export const formatCurrency = (amount: number): string => {
  if (!isFinite(amount) || isNaN(amount)) return '$0';
  return USD_FORMATTER.format(amount);
};

/**
 * Format a dollar amount with cents precision.
 * e.g. 12500.75 → "$12,500.75"
 */
export const formatCurrencyExact = (amount: number): string => {
  if (!isFinite(amount) || isNaN(amount)) return '$0.00';
  return USD_FORMATTER_CENTS.format(amount);
};

/**
 * Format a decimal as a percentage string.
 * e.g. 0.065 → "6.5%"
 */
export const formatPercent = (decimal: number): string => {
  if (!isFinite(decimal) || isNaN(decimal)) return '0.0%';
  return PCT_FORMATTER.format(decimal);
};

/**
 * Format a percentage number (already in %) as a string.
 * e.g. 6.5 → "6.50%"
 */
export const formatPercentNumber = (percent: number): string => {
  return formatPercent(percent / 100);
};

/**
 * Format a month count as "X yr Y mo" or just months.
 */
export const formatDuration = (months: number): string => {
  if (!isFinite(months) || months <= 0) return '0 mo';
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0) return `${months} mo`;
  if (remainingMonths === 0) return `${years} yr`;
  return `${years} yr ${remainingMonths} mo`;
};

/**
 * Abbreviate large dollar numbers for axis labels.
 * e.g. 1500000 → "$1.5M", 25000 → "$25K"
 */
export const formatCurrencyShort = (amount: number): string => {
  if (isNaN(amount) || !isFinite(amount)) return '$0';
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(0)}K`;
  return `${sign}$${abs.toFixed(0)}`;
};

/**
 * Clamp a value between min and max (safe for financial inputs).
 */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);
