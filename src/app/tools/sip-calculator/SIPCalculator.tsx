'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { PiggyBank } from 'lucide-react';
import { calculateSIP } from '@/lib/math-engine';
import { sipInputSchema } from '@/lib/validations/schemas';
import { useCurrency, createCurrencyFormatters } from '@/hooks/useCurrency';

const SIPGrowthChart = dynamic(() => import('./SIPGrowthChart'), {
  ssr: false,
  loading: () => <div className="w-full h-[300px] rounded-lg bg-slate-50 dark:bg-slate-900/50 animate-pulse" aria-hidden="true" />,
});

const DEFAULT = {
  monthlyInvestment: 10000,
  annualReturnPercent: 12,
  years: 15,
  stepUpPercent: 10,
};

export function SIPCalculator() {
  const [inputs, setInputs] = useState(DEFAULT);
  const [chartsReady, setChartsReady] = useState(false);
  const update = <K extends keyof typeof DEFAULT>(k: K, v: typeof DEFAULT[K]) =>
    setInputs((p) => ({ ...p, [k]: v }));

  useEffect(() => { setChartsReady(true); }, []);

  const currencyInfo = useCurrency();
  const { formatCurrency, formatCurrencyShort } = createCurrencyFormatters(currencyInfo);
  const sym = currencyInfo.loading ? '₹' : currencyInfo.symbol;

  const results = useMemo(() => {
    const parsed = sipInputSchema.safeParse(inputs);
    if (!parsed.success) return null;
    try { return calculateSIP(parsed.data); } catch { return null; }
  }, [inputs]);

  const validationError = useMemo(() => {
    const parsed = sipInputSchema.safeParse(inputs);
    if (parsed.success) return null;
    return parsed.error.errors[0]?.message ?? 'Invalid input';
  }, [inputs]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-5">
        <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <PiggyBank className="w-4 h-4 text-amber-500" /> SIP Parameters
        </h2>

        {[
          { id: 'sip-monthly', label: 'Monthly SIP Amount', key: 'monthlyInvestment' as const, min: 100, max: 500000, step: 500 },
          { id: 'sip-return', label: 'Expected Annual Return (%)', key: 'annualReturnPercent' as const, min: 1, max: 30, step: 0.5 },
          { id: 'sip-years', label: 'Investment Period (Years)', key: 'years' as const, min: 1, max: 40, step: 1 },
          { id: 'sip-stepup', label: 'Annual Step-Up (%)', key: 'stepUpPercent' as const, min: 0, max: 50, step: 1 },
        ].map(({ id, label, key, min, max, step }) => (
          <div key={id}>
            <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">{label}</label>
            <div className="flex items-center gap-1.5">
              {key === 'monthlyInvestment' && <span className="text-slate-500 font-mono text-sm">{sym}</span>}
              <input
                id={id}
                type="number"
                value={inputs[key]}
                min={min}
                max={max}
                step={step}
                onChange={(e) => update(key, parseFloat(e.target.value) || 0)}
                className="input-financial flex-1"
              />
              {key !== 'monthlyInvestment' && key !== 'years' && <span className="text-slate-400 text-sm">%</span>}
              {key === 'years' && <span className="text-slate-400 text-sm">yrs</span>}
            </div>
          </div>
        ))}

        {validationError && (
          <p className="text-xs text-red-600 dark:text-red-400" role="alert">{validationError}</p>
        )}
      </div>

      <div className="xl:col-span-2 space-y-6">
        {results && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Maturity Amount', value: formatCurrency(results.maturityAmount), accent: 'text-amber-600 dark:text-amber-400' },
              { label: 'Total Invested', value: formatCurrency(results.totalInvested), accent: 'text-slate-700 dark:text-slate-200' },
              { label: 'Wealth Gained', value: formatCurrency(results.totalReturns), accent: 'text-green-600 dark:text-green-400' },
            ].map(({ label, value, accent }) => (
              <div key={label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                <p className={`text-2xl font-bold tabular-nums ${accent}`}>{value}</p>
              </div>
            ))}
          </div>
        )}

        {chartsReady && results && results.yearlyData.length > 0 && (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm">SIP Growth Over Time</h3>
            <SIPGrowthChart yearlyData={results.yearlyData} formatCurrencyShort={formatCurrencyShort} />
          </div>
        )}

        {results && (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <h3 className="font-semibold text-slate-900 dark:text-white p-5 pb-0 text-sm">Year-by-Year Breakdown</h3>
            <div className="overflow-x-auto max-h-64">
              <table className="w-full text-sm mt-3">
                <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0">
                  <tr className="text-left text-slate-500 dark:text-slate-400">
                    <th className="p-3">Year</th>
                    <th className="p-3">Monthly SIP</th>
                    <th className="p-3">Invested</th>
                    <th className="p-3">Returns</th>
                    <th className="p-3">Corpus</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 dark:text-slate-300">
                  {results.yearlyData.map((row) => (
                    <tr key={row.year} className="border-t border-slate-100 dark:border-slate-700">
                      <td className="p-3">{row.year}</td>
                      <td className="p-3 tabular-nums">{formatCurrency(row.monthlySIP)}</td>
                      <td className="p-3 tabular-nums">{formatCurrency(row.invested)}</td>
                      <td className="p-3 tabular-nums text-green-600 dark:text-green-400">{formatCurrency(row.returns)}</td>
                      <td className="p-3 tabular-nums font-medium">{formatCurrency(row.corpus)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
