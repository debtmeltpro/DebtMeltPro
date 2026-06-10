'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { calculateLoanEMI, formatDuration } from '@/lib/math-engine';
import { loanEmiInputSchema } from '@/lib/validations/schemas';
import { useCurrency, createCurrencyFormatters } from '@/hooks/useCurrency';

const DEFAULT = {
  loanAmount: 2500000,
  annualInterestRatePercent: 8.5,
  tenureMonths: 240,
  extraMonthlyPayment: 0,
};

export function EMICalculator() {
  const [inputs, setInputs] = useState(DEFAULT);
  const update = <K extends keyof typeof DEFAULT>(k: K, v: typeof DEFAULT[K]) =>
    setInputs((p) => ({ ...p, [k]: v }));

  const currencyInfo = useCurrency();
  const { formatCurrency } = createCurrencyFormatters(currencyInfo);
  const sym = currencyInfo.loading ? '₹' : currencyInfo.symbol;

  const results = useMemo(() => {
    const parsed = loanEmiInputSchema.safeParse(inputs);
    if (!parsed.success) return null;
    try { return calculateLoanEMI(parsed.data); } catch { return null; }
  }, [inputs]);

  const validationError = useMemo(() => {
    const parsed = loanEmiInputSchema.safeParse(inputs);
    return parsed.success ? null : parsed.error.errors[0]?.message ?? 'Invalid input';
  }, [inputs]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-5">
        <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Calculator className="w-4 h-4 text-indigo-500" /> Loan Details
        </h2>
        <div>
          <label htmlFor="emi-amount" className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Loan Amount</label>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-mono text-sm">{sym}</span>
            <input id="emi-amount" type="number" value={inputs.loanAmount} min={1000} step={10000}
              onChange={(e) => update('loanAmount', parseFloat(e.target.value) || 0)} className="input-financial flex-1" />
          </div>
        </div>
        <div>
          <label htmlFor="emi-rate" className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Annual Interest Rate (%)</label>
          <input id="emi-rate" type="number" value={inputs.annualInterestRatePercent} min={0} max={30} step={0.1}
            onChange={(e) => update('annualInterestRatePercent', parseFloat(e.target.value) || 0)} className="input-financial w-full" />
        </div>
        <div>
          <label htmlFor="emi-tenure" className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Tenure (Months)</label>
          <input id="emi-tenure" type="number" value={inputs.tenureMonths} min={1} max={480} step={1}
            onChange={(e) => update('tenureMonths', parseInt(e.target.value, 10) || 0)} className="input-financial w-full" />
          <p className="text-xs text-slate-400 mt-1">{Math.floor(inputs.tenureMonths / 12)} years {inputs.tenureMonths % 12} months</p>
        </div>
        {validationError && <p className="text-xs text-red-600 dark:text-red-400" role="alert">{validationError}</p>}
      </div>

      <div className="xl:col-span-2 space-y-6">
        {results && (
          <>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6 text-center">
              <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-1">Monthly EMI</p>
              <p className="text-4xl font-bold text-indigo-900 dark:text-indigo-100 tabular-nums">{formatCurrency(results.emi)}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Total Interest', value: formatCurrency(results.totalInterest) },
                { label: 'Total Payment', value: formatCurrency(results.totalPaid) },
                { label: 'Principal', value: formatCurrency(results.loanAmount) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center">
                  <p className="text-xs text-slate-500 mb-1">{label}</p>
                  <p className="text-lg font-bold tabular-nums text-slate-900 dark:text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <h3 className="font-semibold text-slate-900 dark:text-white p-5 pb-0 text-sm">Amortization Schedule (First 12 Months)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm mt-3">
                  <thead className="bg-slate-50 dark:bg-slate-900/50">
                    <tr className="text-left text-slate-500">
                      <th className="p-3">Month</th><th className="p-3">EMI</th><th className="p-3">Principal</th><th className="p-3">Interest</th><th className="p-3">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.schedule.slice(0, 12).map((row) => (
                      <tr key={row.month} className="border-t border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        <td className="p-3">{row.month}</td>
                        <td className="p-3 tabular-nums">{formatCurrency(row.payment)}</td>
                        <td className="p-3 tabular-nums">{formatCurrency(row.principal)}</td>
                        <td className="p-3 tabular-nums text-red-500">{formatCurrency(row.interest)}</td>
                        <td className="p-3 tabular-nums">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="p-4 text-xs text-slate-400">Payoff in {formatDuration(results.actualTenureMonths)} · Use our <Link href="/tools/loan-calculator" className="text-indigo-600 underline">Loan Calculator</Link> for prepayment modeling.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
