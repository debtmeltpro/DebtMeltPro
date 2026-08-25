// ============================================================
// DebtMeltPro — Zod Validation Schemas
// All user inputs are validated BEFORE reaching the math engine.
// This prevents NaN errors, injection attacks, and ReDoS vectors.
// ============================================================

import { z } from 'zod';

// ─── Shared Field Factories ───────────────────────────────────

/** A finite, non-negative monetary amount */
const currency = (label: string, max = 10_000_000) =>
  z
    .number({ required_error: `${label} is required`, invalid_type_error: `${label} must be a number` })
    .finite(`${label} must be a finite number`)
    .nonnegative(`${label} cannot be negative`)
    .max(max, `${label} exceeds the maximum allowed value`);

/** Percentage between 0 and a max (default 100) */
const percentage = (label: string, max = 100) =>
  z
    .number({ required_error: `${label} is required`, invalid_type_error: `${label} must be a number` })
    .finite()
    .min(0, `${label} must be at least 0%`)
    .max(max, `${label} must be at most ${max}%`);

/** Positive integer months */
const months = (label: string, max = 600) =>
  z
    .number()
    .int(`${label} must be a whole number of months`)
    .positive(`${label} must be at least 1 month`)
    .max(max, `${label} cannot exceed ${max} months`);

// ─── Debt Account Schema ──────────────────────────────────────

export const debtAccountSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .min(1, 'Account name is required')
    .max(50, 'Account name must be under 50 characters')
    // ReDoS prevention: no complex patterns, just alphanumeric + common chars
    .regex(/^[\w\s\-'&.,()]+$/, 'Account name contains invalid characters'),
  balance: currency('Balance').min(1, 'Balance must be at least 1'),
  interestRate: percentage('Interest rate', 36),
  minimumPayment: currency('Minimum payment', 10_000),
  interestType: z.enum(['fixed', 'variable']).optional().default('fixed'),
  annualRateChangePercent: z.number().finite().min(-5, 'Rate change cannot be less than -5%').max(5, 'Rate change cannot exceed 5%').optional().default(0.5),

  type: z
    .enum(['credit_card', 'student_loan', 'auto_loan', 'personal_loan', 'medical', 'other'])
    .optional(),
});

export const debtPayoffInputSchema = z
  .object({
    debts: z
      .array(debtAccountSchema)
      .min(1, 'Add at least one debt account')
      .max(20, 'Maximum 20 debt accounts supported'),
    extraMonthlyPayment: currency('Extra monthly payment').default(0),
    strategy: z.enum(['snowball', 'avalanche', 'hybrid']),
  })
  .refine(
    (data) =>
      data.debts.every((d) => d.minimumPayment <= d.balance),
    { message: 'Minimum payment cannot exceed current balance', path: ['debts'] }
  );

// ─── Mortgage Schema ──────────────────────────────────────────

export const mortgageInputSchema = z.object({
  homePrice: currency('Home price', 50_000_000).min(50_000, 'Home price must be at least 50,000'),
  downPaymentPercent: percentage('Down payment', 99).min(3, 'Minimum down payment is 3%'),
  mortgageRatePercent: percentage('Mortgage rate', 25).min(0.1, 'Rate must be at least 0.1%'),
  loanTermYears: z.enum(['15', '20', '30']).transform(Number),
  propertyTaxRatePercent: percentage('Property tax rate', 5),
  maintenanceRatePercent: percentage('Maintenance rate', 5).default(1),
  homeInsuranceMonthly: currency('Home insurance', 5000),
  hoaMonthly: currency('HOA fees', 5000),
  homeAppreciationPercent: percentage('Home appreciation', 20),
  monthlyRent: currency('Monthly rent', 50_000).min(100, 'Rent must be at least 100'),
  rentIncreasePercent: percentage('Rent increase', 20),
  investmentReturnPercent: percentage('Investment return', 30),
  marginalTaxRatePercent: percentage('Tax rate', 60),
  yearsToAnalyze: z.number().int().min(1).max(40),
});

// ─── Compound Interest / FIRE Schema ─────────────────────────

export const compoundInputSchema = z.object({
  initialAmount: currency('Initial investment', 10_000_000).default(0),
  monthlyContribution: currency('Monthly contribution', 100_000),
  annualReturnPercent: percentage('Annual return', 30).min(0.1, 'Return must be at least 0.1%'),
  years: z.number().int().min(1, 'At least 1 year required').max(50, 'Maximum 50 years'),
  inflationPercent: percentage('Inflation rate', 20).default(3),
  adjustForInflation: z.boolean().default(true),
  withdrawalRatePercent: percentage('Withdrawal rate', 10).min(0.5).default(4),
});

// ─── Credit Card Schema ───────────────────────────────────────

export const creditCardInputSchema = z.object({
  balance: currency('Credit card balance', 500_000).min(100, 'Balance must be at least 100'),
  apr: percentage('APR', 36).min(0, 'APR cannot be negative'),
  minimumPaymentPercent: percentage('Minimum payment percent', 10).min(0.5).default(2),
  minimumPaymentFloor: currency('Minimum payment floor', 500).default(25),
  fixedExtraPayment: currency('Extra monthly payment', 10_000).default(0),
});

// ─── Student Loan Schema ──────────────────────────────────────

export const studentLoanInputSchema = z
  .object({
    loanBalance: currency('Loan balance', 1_000_000).min(1000, 'Loan balance must be at least 1,000'),
    currentRatePercent: percentage('Current interest rate', 25).min(0.1),
    currentTermMonths: months('Loan term'),
    currentMonthsRemaining: months('Months remaining'),
    newRatePercent: percentage('New interest rate', 25).min(0.1),
    newTermMonths: months('New loan term'),
    refinanceFeePercent: percentage('Refinance fee', 5).default(1),
  })
  .refine(
    (data) => data.currentMonthsRemaining <= data.currentTermMonths,
    { message: 'Months remaining cannot exceed total loan term', path: ['currentMonthsRemaining'] }
  )
  .refine(
    (data) => data.newRatePercent < data.currentRatePercent,
    { message: 'New rate should be lower than current rate to benefit from refinancing', path: ['newRatePercent'] }
  );

// ─── SIP Schema ───────────────────────────────────────────────

export const sipInputSchema = z.object({
  monthlyInvestment: currency('Monthly SIP amount', 1_000_000).min(100, 'SIP must be at least 100'),
  annualReturnPercent: percentage('Expected return', 30).min(1, 'Return must be at least 1%'),
  years: z.number().int().min(1, 'At least 1 year').max(40, 'Maximum 40 years'),
  stepUpPercent: percentage('Annual step-up', 50).default(0),
});

// ─── EMI / Loan Schema ────────────────────────────────────────

export const loanEmiInputSchema = z.object({
  loanAmount: currency('Loan amount', 50_000_000).min(1_000, 'Loan amount must be at least 1,000'),
  annualInterestRatePercent: percentage('Interest rate', 30).min(0, 'Rate cannot be negative'),
  tenureMonths: months('Loan tenure', 480),
  extraMonthlyPayment: currency('Extra payment', 100_000).default(0),
});

// ─── Credit Card Interest Schema ──────────────────────────────

export const creditCardInterestInputSchema = z.object({
  balance: currency('Balance', 500_000).min(1, 'Balance must be at least 1'),
  apr: percentage('APR', 36).min(0),
  monthlyPayment: currency('Monthly payment', 50_000).min(1, 'Payment must be at least 1'),
}).refine(
  (data) => data.monthlyPayment > data.balance * (data.apr / 100 / 12),
  { message: 'Payment must exceed monthly interest to pay off the balance', path: ['monthlyPayment'] },
);

// ─── Type Inference ───────────────────────────────────────────

export type DebtAccountInput = z.infer<typeof debtAccountSchema>;
export type DebtPayoffFormInput = z.infer<typeof debtPayoffInputSchema>;
export type MortgageFormInput = z.infer<typeof mortgageInputSchema>;
export type CompoundFormInput = z.infer<typeof compoundInputSchema>;
export type CreditCardFormInput = z.infer<typeof creditCardInputSchema>;
export type StudentLoanFormInput = z.infer<typeof studentLoanInputSchema>;
export type SIPFormInput = z.infer<typeof sipInputSchema>;
export type LoanEmiFormInput = z.infer<typeof loanEmiInputSchema>;
export type CreditCardInterestFormInput = z.infer<typeof creditCardInterestInputSchema>;
