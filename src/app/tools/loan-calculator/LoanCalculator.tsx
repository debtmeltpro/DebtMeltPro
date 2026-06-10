'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Landmark } from 'lucide-react';
import { calculateLoanEMI, formatDuration } from '@/lib/math-engine';
import { loanEmiInputSchema } from '@/lib/validations/schemas';
import { useCurrency, createCurrencyFormatters } from '@/hooks/useCurrency';

const LoanBalanceChart = dynamic(() => import('./LoanBalanceChart'), {
  ssr: false,
  loading: () => <div className="w-full h-[280px] rounded-lg bg-slate-50 dark:bg-slate-900/50 animate-pulse" />,
});

const DEFAULT = {
  loanAmount: 500000,
  annualInterestRatePercent: 7.5,
  tenureMonths: 360,
  extraMonthlyPayment: 200,
};

export function LoanCalculator() {
  const [inputs, setInputs] = useState(DEFAULT);
  const [chartsReady, setChartsReady] = useState(false);
  const update = <K extends keyof typeof DEFAULT>(k: K, v: typeof DEFAULT[K]) =>
    setInputs((p) => ({ ...p, [k]: v }));

  useEffect(() => { setChartsReady(true); }, []);

  const currencyInfo = useCurrency();
  const { formatCurrency, formatCurrencyShort } = createCurrencyFormatters(currencyInfo);
  const sym = currencyInfo.loading ? '$' : currencyInfo.symbol;

  const results = useMemo(() => {
    const parsed = loanEmiInputSchema.safeParse(inputs);
    if (!parsed.success) return null;
    try { return calculateLoanEMI(parsed.data); } catch { return null; }
  }, [inputs]);

  const baseline = useMemo(() => {
    const parsed = loanEmiInputSchema.safeParse({ ...inputs, extraMonthlyPayment: 0 });
    if (!parsed.success) return null;
    try { return calculateLoanEMI(parsed.data); } catch { return null; }
  }, [inputs]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-5">
        <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Landmark className="w-4 h-4 text-sky-500" /> Loan Parameters
        </h2>
        {[
          { id: 'loan-amt', label: 'Loan Amount', key: 'loanAmount' as const, sym: true },
          { id: 'loan-rate', label: 'Interest Rate (%)', key: 'annualInterestRatePercent' as const },
          { id: 'loan-tenure', label: 'Tenure (Months)', key: 'tenureMonths' as const },
          { id: 'loan-extra', label: 'Extra Monthly Payment', key: 'extraMonthlyPayment' as const, sym: true },
        ].map(({ id, label, key, sym: showSym }) => (
          <div key={id}>
            <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">{label}</label>
            <div className="flex items-center gap-1.5">
              {showSym && <span className="text-slate-500 font-mono text-sm">{sym}</span>}
              <input id={id} type="number" value={inputs[key]}
                onChange={(e) => update(key, parseFloat(e.target.value) || 0)} className="input-financial flex-1" />
            </div>
          </div>
        ))}
      </div>

      <div className="xl:col-span-2 space-y-6">
        {results && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Monthly EMI', value: formatCurrency(results.emi) },
                { label: 'Total Interest', value: formatCurrency(results.totalInterest) },
                { label: 'Payoff Time', value: formatDuration(results.actualTenureMonths) },
                { label: 'Interest Saved', value: inputs.extraMonthlyPayment > 0 ? formatCurrency(results.interestSaved) : '—' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                  <p className="text-xs text-slate-500 mb-1">{label}</p>
                  <p className="text-sm font-bold tabular-nums text-slate-900 dark:text-white">{value}</p>
                </div>
              ))}
            </div>

            {baseline && inputs.extraMonthlyPayment > 0 && (
              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-4 text-sm text-green-800 dark:text-green-200">
                Prepaying {formatCurrency(inputs.extraMonthlyPayment)}/month saves {formatCurrency(results.interestSaved)} in interest
                and finishes {results.monthsSaved} months earlier vs standard EMI.
              </div>
            )}

            {chartsReady && (
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                <h3 className="font-semibold text-sm mb-4">Remaining Balance Over Time</h3>
                <LoanBalanceChart
                  data={results.schedule.map((r) => ({ month: r.month, balance: r.balance, interest: r.interest }))}
                  formatCurrencyShort={formatCurrencyShort}
                />
              </div>
            )}

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0">
                  <tr className="text-left text-slate-500">
                    <th className="p-3">#</th><th className="p-3">Payment</th><th className="p-3">Principal</th><th className="p-3">Interest</th><th className="p-3">Extra</th><th className="p-3">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.schedule.map((row) => (
                    <tr key={row.month} className="border-t border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                      <td className="p-2">{row.month}</td>
                      <td className="p-2 tabular-nums">{formatCurrency(row.payment)}</td>
                      <td className="p-2 tabular-nums">{formatCurrency(row.principal)}</td>
                      <td className="p-2 tabular-nums text-red-500">{formatCurrency(row.interest)}</td>
                      <td className="p-2 tabular-nums">{row.extraPayment > 0 ? formatCurrency(row.extraPayment) : '—'}</td>
                      <td className="p-2 tabular-nums">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400">Quick EMI only? Try our <Link href="/tools/emi-calculator" className="text-sky-600 underline">EMI Calculator</Link>.</p>
          </>
        )}
      </div>
    </div>
  );
}
