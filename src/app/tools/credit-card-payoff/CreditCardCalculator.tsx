'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { calculateCreditCardPayoff } from '@/lib/math-engine';
import { formatDuration } from '@/lib/math-engine';
import { creditCardInputSchema } from '@/lib/validations/schemas';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useCurrency, createCurrencyFormatters } from '@/hooks/useCurrency';

const DEFAULT = {
  balance: 5000,
  apr: 22.99,
  minimumPaymentPercent: 2,
  minimumPaymentFloor: 25,
  fixedExtraPayment: 100,
};

export function CreditCardCalculator() {
  const [inputs, setInputs] = useState(DEFAULT);
  const update = <K extends keyof typeof DEFAULT>(k: K, v: number) =>
    setInputs((p) => ({ ...p, [k]: v }));

  const currencyInfo = useCurrency();
  const { formatCurrency } = createCurrencyFormatters(currencyInfo);
  const currencySymbol = currencyInfo.loading ? '$' : currencyInfo.symbol;

  const results = useMemo(() => {
    const parsed = creditCardInputSchema.safeParse(inputs);
    if (!parsed.success) return null;
    try { return calculateCreditCardPayoff(parsed.data); } catch { return null; }
  }, [inputs]);

  const chartData = results ? [
    {
      name: 'Minimum Only',
      'Interest Paid': results.minimumOnlyInterestPaid,
      'Total Paid':    results.minimumOnlyTotalPaid,
    },
    {
      name: 'Optimized',
      'Interest Paid': results.optimizedInterestPaid,
      'Total Paid':    results.optimizedTotalPaid,
    },
  ] : [];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* ── Inputs ──────────────────────────────────────────── */}
      <div className="xl:col-span-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-5">
        <h2 className="font-semibold text-slate-900 dark:text-white">Credit Card Details</h2>

        {/* Currency badge */}
        {!currencyInfo.loading && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-800 dark:text-slate-200 text-base">
              {currencyInfo.symbol}
            </span>
            <span>
              <strong>{currencyInfo.name}</strong> ({currencyInfo.code}) · your location
            </span>
          </div>
        )}

        {/* Balance */}
        <div>
          <label htmlFor="cc-balance" className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">
            Current Balance
          </label>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-mono text-sm">{currencySymbol}</span>
            <input id="cc-balance" type="number" value={inputs.balance}
              min={100} max={500000} step={100}
              onChange={(e) => update('balance', parseFloat(e.target.value) || 0)}
              className="input-financial flex-1 text-sm" />
          </div>
        </div>

        {/* APR */}
        <div>
          <label htmlFor="cc-apr" className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">
            Annual APR
          </label>
          <div className="flex items-center gap-1.5">
            <input id="cc-apr" type="number" value={inputs.apr}
              min={0.1} max={36} step={0.1}
              onChange={(e) => update('apr', parseFloat(e.target.value) || 0)}
              className="input-financial flex-1 text-sm" />
            <span className="text-slate-500 text-sm">%</span>
          </div>
        </div>

        {/* Min payment % */}
        <div>
          <label htmlFor="cc-minpct" className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">
            Minimum Payment %
          </label>
          <div className="flex items-center gap-1.5">
            <input id="cc-minpct" type="number" value={inputs.minimumPaymentPercent}
              min={0.5} max={10} step={0.5}
              onChange={(e) => update('minimumPaymentPercent', parseFloat(e.target.value) || 0)}
              className="input-financial flex-1 text-sm" />
            <span className="text-slate-500 text-xs">% of balance</span>
          </div>
        </div>

        {/* Min floor */}
        <div>
          <label htmlFor="cc-floor" className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">
            Minimum Payment Floor
          </label>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-mono text-sm">{currencySymbol}</span>
            <input id="cc-floor" type="number" value={inputs.minimumPaymentFloor}
              min={5} max={500} step={5}
              onChange={(e) => update('minimumPaymentFloor', parseFloat(e.target.value) || 0)}
              className="input-financial flex-1 text-sm" />
          </div>
        </div>

        {/* Extra payment */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
          <label htmlFor="cc-extra" className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">
            Extra Monthly Payment
          </label>
          <p className="text-xs text-slate-500 mb-2">Added on top of the fixed minimum</p>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-mono text-sm">{currencySymbol}</span>
            <input id="cc-extra" type="number" value={inputs.fixedExtraPayment}
              min={0} max={10000} step={25}
              onChange={(e) => update('fixedExtraPayment', parseFloat(e.target.value) || 0)}
              className="input-financial flex-1 text-base" />
          </div>
        </div>
      </div>

      {/* ── Results ─────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {results && (
          <motion.div key="r" className="xl:col-span-2 space-y-5"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>

            {/* Shock Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 border-l-4 border-l-red-500">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide mb-1">
                      Minimum Only (The Trap)
                    </p>
                    <p className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
                      {formatCurrency(results.minimumOnlyInterestPaid)}
                    </p>
                    <p className="text-sm text-slate-500">
                      interest paid over {formatDuration(results.minimumOnlyMonths)}
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">
                      Total Paid: {formatCurrency(results.minimumOnlyTotalPaid)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 border-l-4 border-l-green-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">
                      Fixed Payment (Optimized)
                    </p>
                    <p className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
                      {formatCurrency(results.optimizedInterestPaid)}
                    </p>
                    <p className="text-sm text-slate-500">
                      interest paid over {formatDuration(results.optimizedMonths)}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                      Total Paid: {formatCurrency(results.optimizedTotalPaid)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Banner */}
            <div className="rounded-xl p-5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-center">
              <p className="text-3xl font-bold tabular-nums text-green-700 dark:text-green-300">
                {formatCurrency(results.interestSaved)}
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                interest saved · {formatDuration(results.monthsSaved)} faster payoff
              </p>
            </div>

            {/* Comparison Chart */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                Side-by-Side Comparison
              </h3>
              <div style={{ minHeight: 260 }}>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }}
                      axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={(v) => `${currencySymbol}${(v / 1000).toFixed(0)}k`}
                      tick={{ fontSize: 11, fill: '#94a3b8' }}
                      axisLine={false} tickLine={false} width={60} />
                    <Tooltip
                      formatter={(v: number, name: string) => [formatCurrency(v), name]}
                      contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0' }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                    <Bar dataKey="Interest Paid" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Total Paid"    fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Schedule Table */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-100 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                  Optimized Payoff Schedule (First 12 Months)
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      {['Month', 'Payment', 'Interest', 'Principal', 'Balance'].map((h) => (
                        <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {results.monthlySchedule.slice(0, 12).map((row) => (
                      <tr key={row.month}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-2.5 tabular-nums text-slate-600 dark:text-slate-400">{row.month}</td>
                        <td className="px-4 py-2.5 tabular-nums font-medium">{formatCurrency(row.payment)}</td>
                        <td className="px-4 py-2.5 tabular-nums text-red-600 dark:text-red-400">{formatCurrency(row.interestCharge)}</td>
                        <td className="px-4 py-2.5 tabular-nums text-green-600 dark:text-green-400">{formatCurrency(row.principalPaid)}</td>
                        <td className="px-4 py-2.5 tabular-nums font-semibold">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
