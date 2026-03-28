'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { calculateStudentLoanRefinance } from '@/lib/math-engine/student-loan';
import { formatDuration } from '@/lib/math-engine';
import { studentLoanInputSchema } from '@/lib/validations/schemas';
import { TrendingDown, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrency, createCurrencyFormatters } from '@/hooks/useCurrency';

const DEFAULT = {
  loanBalance: 35000,
  currentRatePercent: 7.5,
  currentTermMonths: 120,
  currentMonthsRemaining: 108,
  newRatePercent: 5.2,
  newTermMonths: 120,
  refinanceFeePercent: 1.0,
};

export function StudentLoanCalculator() {
  const [inputs, setInputs] = useState(DEFAULT);
  const [error, setError] = useState<string | null>(null);
  const currencyInfo = useCurrency();
  const { formatCurrency, formatCurrencyShort } = createCurrencyFormatters(currencyInfo);

  const update = <K extends keyof typeof DEFAULT>(k: K, v: number) =>
    setInputs((p) => ({ ...p, [k]: v }));

  const results = useMemo(() => {
    const parsed = studentLoanInputSchema.safeParse(inputs);
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? 'Invalid inputs');
      return null;
    }
    setError(null);
    try {
      return calculateStudentLoanRefinance(parsed.data);
    } catch {
      setError('Calculation error');
      return null;
    }
  }, [inputs]);

  const chartData = results?.comparisonChart.filter((_, i) => i % 3 === 0) ?? [];

  function InputRow({
    label, id, value, onChange, min, max, step, prefix, suffix,
  }: {
    label: string; id: string; value: number;
    onChange: (v: number) => void;
    min?: number; max?: number; step?: number;
    prefix?: string; suffix?: string;
  }) {
    return (
      <div>
        <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">
          {label}
        </label>
        <div className="flex items-center gap-1.5">
          {prefix && <span className="text-slate-500 font-mono text-sm">{prefix}</span>}
          <input
            id={id} type="number" value={value}
            min={min} max={max} step={step ?? 1}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            className="input-financial flex-1 text-sm"
          />
          {suffix && <span className="text-slate-500 text-xs">{suffix}</span>}
        </div>
      </div>
    );
  }

  // Show currency symbol from detected locale
  const currencyPrefix = currencyInfo.loading ? '$' : currencyInfo.symbol;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* ── Inputs ──────────────────────────────────────────── */}
      <div className="xl:col-span-1 space-y-5">
        {/* Currency badge */}
        {!currencyInfo.loading && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <span className="text-base font-bold text-slate-800 dark:text-slate-200">
              {currencyInfo.symbol}
            </span>
            <span>
              Showing in <strong>{currencyInfo.name}</strong> ({currencyInfo.code})
              · based on your location
            </span>
          </div>
        )}

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-4">
          <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
            <TrendingDown className="w-4 h-4 text-violet-500" />
            Current Loan
          </h2>
          <InputRow label="Loan Balance" id="balance" value={inputs.loanBalance}
            onChange={(v) => update('loanBalance', v)} min={1000} max={1000000} step={500}
            prefix={currencyPrefix} />
          <InputRow label="Current Interest Rate" id="curRate" value={inputs.currentRatePercent}
            onChange={(v) => update('currentRatePercent', v)} min={0.1} max={25} step={0.05}
            suffix="%" />
          <InputRow label="Original Term" id="term" value={inputs.currentTermMonths}
            onChange={(v) => update('currentTermMonths', v)} min={12} max={360} step={12}
            suffix=" months" />
          <InputRow label="Months Remaining" id="remaining" value={inputs.currentMonthsRemaining}
            onChange={(v) => update('currentMonthsRemaining', v)}
            min={1} max={inputs.currentTermMonths} step={1} suffix=" months" />
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-4">
          <h2 className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Refinance Options
          </h2>
          <InputRow label="New Interest Rate" id="newRate" value={inputs.newRatePercent}
            onChange={(v) => update('newRatePercent', v)} min={0.1} max={25} step={0.05}
            suffix="%" />
          <InputRow label="New Loan Term" id="newTerm" value={inputs.newTermMonths}
            onChange={(v) => update('newTermMonths', v)} min={12} max={360} step={12}
            suffix=" months" />
          <InputRow label="Refinancing Fee" id="fee" value={inputs.refinanceFeePercent}
            onChange={(v) => update('refinanceFeePercent', v)} min={0} max={5} step={0.1}
            suffix="% of balance" />
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}
      </div>

      {/* ── Results ─────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {results && !error && (
          <motion.div
            key="r"
            className="xl:col-span-2 space-y-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Recommendation */}
            <div className={cn('rounded-xl p-5 border', {
              'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800':
                results.recommendation === 'refinance',
              'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800':
                results.recommendation === 'keep',
              'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800':
                results.recommendation === 'marginal',
            })}>
              <div className="flex items-center gap-3 mb-1">
                {results.recommendation === 'refinance' && <CheckCircle className="w-5 h-5 text-green-500" />}
                {results.recommendation === 'keep'      && <XCircle className="w-5 h-5 text-red-500" />}
                {results.recommendation === 'marginal'  && <AlertCircle className="w-5 h-5 text-amber-500" />}
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {results.recommendation === 'refinance' && '✅ Refinancing looks financially beneficial'}
                  {results.recommendation === 'keep'      && '❌ Keeping your current loan is better'}
                  {results.recommendation === 'marginal'  && '⚠️ Marginal benefit — consider carefully'}
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 ml-8">
                Break-even:{' '}
                <strong>
                  {results.breakEvenMonths < 9999
                    ? formatDuration(results.breakEvenMonths)
                    : 'Never'}
                </strong>{' '}
                · Total savings:{' '}
                <strong className="text-green-600 dark:text-green-400">
                  {formatCurrency(Math.max(0, results.totalSavings))}
                </strong>
              </p>
            </div>

            {/* Key Metrics — all using localized currency */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                {
                  value: formatCurrency(results.currentMonthlyPayment),
                  label: 'Current Monthly Payment',
                  accent: '',
                },
                {
                  value: formatCurrency(results.newMonthlyPayment),
                  label: 'New Monthly Payment',
                  accent: 'border-l-4 border-l-green-500',
                },
                {
                  value: `${results.monthlySavings > 0 ? '+' : ''}${formatCurrency(results.monthlySavings)}/mo`,
                  label: 'Monthly Change',
                  accent: '',
                  valueClass: results.monthlySavings > 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-500',
                },
                {
                  value: formatCurrency(results.totalCurrentCost),
                  label: 'Current Loan Total Cost',
                  accent: '',
                },
                {
                  value: formatCurrency(results.totalNewCost),
                  label: 'Refinanced Total Cost',
                  accent: '',
                },
                {
                  value: formatCurrency(results.refinanceFee),
                  label: 'Refinancing Fee',
                  accent: '',
                },
              ].map(({ value, label, accent, valueClass }) => (
                <div
                  key={label}
                  className={cn(
                    'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5',
                    accent
                  )}
                >
                  <div className={cn('text-2xl font-bold tabular-nums', valueClass)}>
                    {value}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Balance Comparison Chart */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                Remaining Balance Comparison
              </h3>
              <div style={{ minHeight: 280 }}>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis
                      dataKey="month"
                      tickFormatter={(v) => `Mo ${v}`}
                      tick={{ fontSize: 11, fill: '#94a3b8' }}
                      axisLine={false} tickLine={false}
                    />
                    <YAxis
                      tickFormatter={formatCurrencyShort}
                      tick={{ fontSize: 11, fill: '#94a3b8' }}
                      axisLine={false} tickLine={false} width={70}
                    />
                    <Tooltip
                      formatter={(v: number) => formatCurrency(v)}
                      labelFormatter={(l) => `Month ${l}`}
                      contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0' }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                    {results.breakEvenMonths < 9999 && (
                      <ReferenceLine
                        x={results.breakEvenMonths}
                        stroke="#f59e0b"
                        strokeDasharray="4 4"
                        label={{ value: 'Break-Even', position: 'top', fontSize: 10, fill: '#f59e0b' }}
                      />
                    )}
                    <Line type="monotone" dataKey="currentBalance" name="Current Loan"
                      stroke="#f43f5e" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="newBalance" name="Refinanced"
                      stroke="#22c55e" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
