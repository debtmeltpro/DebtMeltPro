'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Percent, AlertTriangle } from 'lucide-react';
import { calculateCreditCardInterest, formatDuration } from '@/lib/math-engine';
import { creditCardInterestInputSchema } from '@/lib/validations/schemas';
import { useCurrency, createCurrencyFormatters } from '@/hooks/useCurrency';

const DEFAULT = { balance: 5000, apr: 22.99, monthlyPayment: 200 };

export function CreditCardInterestCalculator() {
  const [inputs, setInputs] = useState(DEFAULT);
  const update = <K extends keyof typeof DEFAULT>(k: K, v: number) =>
    setInputs((p) => ({ ...p, [k]: v }));

  const currencyInfo = useCurrency();
  const { formatCurrency } = createCurrencyFormatters(currencyInfo);
  const sym = currencyInfo.loading ? '$' : currencyInfo.symbol;

  const results = useMemo(() => {
    const parsed = creditCardInterestInputSchema.safeParse(inputs);
    if (!parsed.success) return null;
    try { return calculateCreditCardInterest(parsed.data); } catch { return null; }
  }, [inputs]);

  const validationError = useMemo(() => {
    const parsed = creditCardInterestInputSchema.safeParse(inputs);
    return parsed.success ? null : parsed.error.errors[0]?.message ?? 'Invalid input';
  }, [inputs]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-5">
        <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Percent className="w-4 h-4 text-rose-500" /> Card Details
        </h2>
        {[
          { id: 'cci-balance', label: 'Current Balance', key: 'balance' as const },
          { id: 'cci-apr', label: 'APR (%)', key: 'apr' as const },
          { id: 'cci-payment', label: 'Monthly Payment', key: 'monthlyPayment' as const },
        ].map(({ id, label, key }) => (
          <div key={id}>
            <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">{label}</label>
            <div className="flex items-center gap-1.5">
              {key !== 'apr' && <span className="text-slate-500 font-mono text-sm">{sym}</span>}
              <input id={id} type="number" value={inputs[key]}
                onChange={(e) => update(key, parseFloat(e.target.value) || 0)} className="input-financial flex-1" />
              {key === 'apr' && <span className="text-slate-400">%</span>}
            </div>
          </div>
        ))}
        {validationError && (
          <p className="text-xs text-red-600 dark:text-red-400 flex items-start gap-1" role="alert">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />{validationError}
          </p>
        )}
      </div>

      <div className="xl:col-span-2 space-y-6">
        {results && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Daily Interest', value: formatCurrency(results.dailyInterest), sub: 'charged on current balance' },
                { label: 'Monthly Interest', value: formatCurrency(results.monthlyInterest), sub: 'if balance unchanged' },
                { label: 'Annual Interest', value: formatCurrency(results.annualInterest), sub: 'at current balance' },
              ].map(({ label, value, sub }) => (
                <div key={label} className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-xl p-5">
                  <p className="text-xs text-rose-700 dark:text-rose-300 mb-1">{label}</p>
                  <p className="text-2xl font-bold tabular-nums text-rose-900 dark:text-rose-100">{value}</p>
                  <p className="text-[10px] text-rose-600/80 mt-1">{sub}</p>
                </div>
              ))}
            </div>

            {results.isUnpayable ? (
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-5 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Payment does not cover monthly interest — balance will grow. Increase payment above {formatCurrency(results.monthlyInterest)} or use our{' '}
                  <Link href="/tools/credit-card-payoff" className="underline font-medium">Credit Card Payoff Calculator</Link>.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Months to Pay Off', value: formatDuration(results.monthsToPayoff) },
                  { label: 'Total Interest Paid', value: formatCurrency(results.totalInterestPaid) },
                  { label: 'Total Paid', value: formatCurrency(results.totalPaid) },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">{label}</p>
                    <p className="text-lg font-bold tabular-nums">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {!results.isUnpayable && results.schedule.length > 0 && (
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden max-h-72 overflow-y-auto">
                <h3 className="font-semibold text-sm p-5 pb-0">Payment Breakdown</h3>
                <table className="w-full text-sm mt-3">
                  <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0">
                    <tr className="text-left text-slate-500">
                      <th className="p-3">Month</th><th className="p-3">Payment</th><th className="p-3">Interest</th><th className="p-3">Principal</th><th className="p-3">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.schedule.slice(0, 24).map((row) => (
                      <tr key={row.month} className="border-t border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        <td className="p-2">{row.month}</td>
                        <td className="p-2 tabular-nums">{formatCurrency(row.payment)}</td>
                        <td className="p-2 tabular-nums text-red-500">{formatCurrency(row.interestCharge)}</td>
                        <td className="p-2 tabular-nums text-green-600">{formatCurrency(row.principalPaid)}</td>
                        <td className="p-2 tabular-nums">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
