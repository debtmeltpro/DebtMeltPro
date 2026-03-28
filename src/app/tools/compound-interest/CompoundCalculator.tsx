'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { calculateCompound, ruleOf72, realReturn } from '@/lib/math-engine';
import { compoundInputSchema } from '@/lib/validations/schemas';
import { Flame, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrency, createCurrencyFormatters } from '@/hooks/useCurrency';

const DEFAULT = {
  initialAmount: 25000,
  monthlyContribution: 1500,
  annualReturnPercent: 8.0,
  years: 25,
  inflationPercent: 3.0,
  adjustForInflation: true,
  withdrawalRatePercent: 4.0,
};

function Slider({
  label, id, value, onChange, min, max, step, format,
}: {
  label: string; id: string; value: number;
  onChange: (v: number) => void;
  min: number; max: number; step: number;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
        <span className="text-sm font-bold tabular-nums text-slate-900 dark:text-white">
          {format(value)}
        </span>
      </div>
      <input
        id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-orange-500"
      />
      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

export function CompoundCalculator() {
  const [inputs, setInputs] = useState(DEFAULT);
  const update = <K extends keyof typeof DEFAULT>(k: K, v: typeof DEFAULT[K]) =>
    setInputs((p) => ({ ...p, [k]: v }));

  const currencyInfo = useCurrency();
  const { formatCurrency, formatCurrencyShort } = createCurrencyFormatters(currencyInfo);
  const currencySymbol = currencyInfo.loading ? '$' : currencyInfo.symbol;

  const results = useMemo(() => {
    const parsed = compoundInputSchema.safeParse(inputs);
    if (!parsed.success) return null;
    try { return calculateCompound(parsed.data); } catch { return null; }
  }, [inputs]);

  const rule72  = ruleOf72(inputs.annualReturnPercent);
  const realRet = realReturn(inputs.annualReturnPercent, inputs.inflationPercent);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* ── Controls ─────────────────────────────────────────── */}
      <div className="xl:col-span-1 space-y-5">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-5">

          <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-500" /> Investment Parameters
          </h2>

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

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">
              Initial Investment
            </label>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-mono">{currencySymbol}</span>
              <input type="number" value={inputs.initialAmount} min={0} max={10000000} step={1000}
                onChange={(e) => update('initialAmount', parseFloat(e.target.value) || 0)}
                className="input-financial flex-1" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">
              Monthly Contribution
            </label>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-mono">{currencySymbol}</span>
              <input type="number" value={inputs.monthlyContribution} min={0} max={100000} step={50}
                onChange={(e) => update('monthlyContribution', parseFloat(e.target.value) || 0)}
                className="input-financial flex-1" />
            </div>
          </div>

          <Slider label="Annual Return" id="return" value={inputs.annualReturnPercent}
            onChange={(v) => update('annualReturnPercent', v)}
            min={1} max={20} step={0.1} format={(v) => `${v.toFixed(1)}%`} />

          <Slider label="Time Horizon" id="years" value={inputs.years}
            onChange={(v) => update('years', Math.round(v))}
            min={1} max={50} step={1} format={(v) => `${v} yr`} />

          <Slider label="Inflation Rate" id="inflation" value={inputs.inflationPercent}
            onChange={(v) => update('inflationPercent', v)}
            min={0} max={10} step={0.1} format={(v) => `${v.toFixed(1)}%`} />

          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Inflation Adjustment</p>
              <p className="text-xs text-slate-500">Show real (today's dollar) values</p>
            </div>
            <button
              onClick={() => update('adjustForInflation', !inputs.adjustForInflation)}
              className={cn(
                'relative w-11 h-6 rounded-full transition-colors',
                inputs.adjustForInflation ? 'bg-orange-500' : 'bg-slate-300 dark:bg-slate-600'
              )}>
              <span className={cn(
                'absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform',
                inputs.adjustForInflation ? 'translate-x-6' : 'translate-x-1'
              )} />
            </button>
          </div>

          <Slider label="Safe Withdrawal Rate" id="swr" value={inputs.withdrawalRatePercent}
            onChange={(v) => update('withdrawalRatePercent', v)}
            min={2} max={8} step={0.1} format={(v) => `${v.toFixed(1)}%`} />
        </div>

        {/* Quick Stats */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-3">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">Quick Stats</h3>
          {[
            { label: 'Rule of 72',    value: `${rule72} yrs to double` },
            { label: 'Real Return',   value: `${realRet.toFixed(2)}% / yr` },
            { label: 'FIRE Multiple', value: `${(100 / inputs.withdrawalRatePercent).toFixed(0)}×` },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-slate-500">{label}</span>
              <span className="font-bold tabular-nums">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Results ─────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {results && (
          <motion.div key="res" className="xl:col-span-2 space-y-5"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>

            {/* FIRE Status Banner */}
            <div className={cn('rounded-xl p-5 border',
              results.yearsToFire !== null && results.yearsToFire <= inputs.years
                ? 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800'
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
            )}>
              <div className="flex items-center gap-3 mb-1">
                <Flame className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {results.yearsToFire !== null
                    ? `🔥 FIRE achieved in ${results.yearsToFire} years!`
                    : `FIRE Number: ${formatCurrency(results.fireNumber)}`}
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 ml-8">
                {results.yearsToFire !== null
                  ? `Portfolio hits ${formatCurrency(results.fireNumber)} (${inputs.withdrawalRatePercent}% SWR on ${formatCurrency(inputs.monthlyContribution * 12)}/yr expenses).`
                  : `Keep investing ${formatCurrency(inputs.monthlyContribution)}/mo to reach financial independence.`}
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { value: formatCurrency(results.finalBalance),                 label: `Final Balance (${inputs.years} yr)`,      accent: 'border-l-4 border-l-orange-500' },
                { value: inputs.adjustForInflation ? formatCurrency(results.finalBalanceReal) : null, label: "Real Value (Today's $)", accent: '' },
                { value: formatCurrency(results.sustainableMonthlyWithdrawal), label: 'Safe Monthly Income',                      accent: '' },
                { value: formatCurrency(results.totalContributions),           label: 'Total Contributed',                        accent: '' },
                { value: formatCurrency(results.totalInterestEarned),          label: 'Compound Growth Earned',                   accent: 'border-l-4 border-l-green-500' },
                { value: formatCurrency(results.fireNumber),                   label: 'Your FIRE Number',                         accent: '' },
              ].filter((m) => m.value !== null).map(({ value, label, accent }) => (
                <div key={label}
                  className={cn('bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5', accent)}>
                  <div className="text-xl font-bold tabular-nums text-slate-900 dark:text-white">{value}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Contribution ratio bar */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
              <div className="flex gap-2 mb-3">
                {[
                  { label: 'You Contributed', value: formatCurrency(results.totalContributions),  color: 'text-slate-700 dark:text-slate-300' },
                  { label: 'Market Grew',      value: formatCurrency(results.totalInterestEarned), color: 'text-green-600 dark:text-green-400' },
                  { label: 'Total Wealth',     value: formatCurrency(results.finalBalance),         color: 'text-orange-600 dark:text-orange-400' },
                ].map(({ label, value, color }, i, arr) => (
                  <div key={label} className="flex-1 text-center">
                    <div className="text-xs text-slate-500 mb-1">{label}</div>
                    <div className={cn('text-base font-bold tabular-nums', color)}>{value}</div>
                    {i < arr.length - 1 && (
                      <span className="absolute text-slate-300 text-2xl font-light" style={{ marginLeft: 4 }} />
                    )}
                  </div>
                ))}
              </div>
              <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex mt-2">
                <div className="bg-slate-400 dark:bg-slate-500 h-full transition-all"
                  style={{ width: `${(results.totalContributions / results.finalBalance) * 100}%` }} />
                <div className="bg-orange-400 h-full flex-1" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>{((results.totalContributions / results.finalBalance) * 100).toFixed(0)}% contributions</span>
                <span>{((results.totalInterestEarned / results.finalBalance) * 100).toFixed(0)}% compound growth</span>
              </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                Wealth Growth Over Time
              </h3>
              <div style={{ minHeight: 300 }}>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={results.yearlyData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#f97316" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="contribGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#94a3b8" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`}
                      tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={formatCurrencyShort}
                      tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={70} />
                    <Tooltip
                      formatter={(v: number) => formatCurrency(v)}
                      labelFormatter={(l) => `Year ${l}`}
                      contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0' }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                    {results.yearsToFire !== null && results.yearsToFire <= inputs.years && (
                      <ReferenceLine x={Math.round(results.yearsToFire)} stroke="#f97316"
                        strokeDasharray="4 4"
                        label={{ value: '🔥 FIRE', position: 'top', fontSize: 10, fill: '#f97316' }} />
                    )}
                    <Area type="monotone" dataKey="contributions" name="Your Contributions"
                      stroke="#94a3b8" strokeWidth={1.5} fill="url(#contribGrad)" dot={false} />
                    <Area type="monotone"
                      dataKey={inputs.adjustForInflation ? 'balanceReal' : 'balance'}
                      name={inputs.adjustForInflation ? 'Balance (Real $)' : 'Balance'}
                      stroke="#f97316" strokeWidth={2.5} fill="url(#balanceGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
