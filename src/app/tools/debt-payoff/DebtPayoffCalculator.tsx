'use client';

import { useState, useCallback, useMemo, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

import { Plus, Trash2, TrendingDown, Trophy, Clock, DollarSign, AlertCircle, AlertTriangle } from 'lucide-react';

import { calculateDebtPayoff, getBestStrategy, formatDuration } from '@/lib/math-engine';
import { debtPayoffInputSchema } from '@/lib/validations/schemas';
import { generateId, cn } from '@/lib/utils';
import { useCurrency, createCurrencyFormatters } from '@/hooks/useCurrency';
import type { DebtAccount, PayoffResult, PayoffStrategy } from '@/types';

const SEED_DEBTS: DebtAccount[] = [
  { id: generateId(), name: 'Medical Bill',    balance: 800,   interestRate: 0,     minimumPayment: 50,  type: 'medical'      },
  { id: generateId(), name: 'Credit Card',     balance: 5200,  interestRate: 24.99, minimumPayment: 130, type: 'credit_card'  },
  { id: generateId(), name: 'Car Loan',        balance: 9500,  interestRate: 6.9,   minimumPayment: 220, type: 'auto_loan'    },
];

const STRATEGIES: { key: PayoffStrategy; label: string; tagline: string; color: string }[] = [
  { key: 'snowball',  label: '❄️ Snowball',  tagline: 'Smallest balance first',   color: '#3b82f6' },
  { key: 'avalanche', label: '🏔️ Avalanche', tagline: 'Highest rate first',        color: '#22c55e' },
  { key: 'hybrid',    label: '⚡ Hybrid',    tagline: 'Weighted rate + balance',   color: '#a855f7' },
];

function MetricCard({ label, value, sub, subMuted, highlight, icon: Icon }: {
  label: string; value: string; sub?: string; subMuted?: boolean;
  highlight?: 'green' | 'red' | 'blue'; icon?: React.ElementType;
}) {
  return (
    <div className={cn(
      'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex flex-col gap-1',
      highlight === 'green' && 'border-l-4 border-l-green-500',
      highlight === 'red'   && 'border-l-4 border-l-red-500',
      highlight === 'blue'  && 'border-l-4 border-l-blue-500',
    )}>
      {Icon && <Icon className="w-4 h-4 text-slate-400" aria-hidden="true" />}
      <div className="text-2xl font-bold tabular-nums">{value}</div>
      <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
      {sub && (
        <div className={cn(
          'text-xs font-medium',
          subMuted ? 'text-slate-500 dark:text-slate-400' : 'text-green-600 dark:text-green-400',
        )}>{sub}</div>
      )}
    </div>
  );
}

function DebtRow({ debt, onUpdate, onDelete, index, currencySymbol }: {
  debt: DebtAccount; onUpdate: (d: DebtAccount) => void;
  onDelete: (id: string) => void; index: number; currencySymbol: string;
}) {
  const uid = useId();
  const update = (field: keyof DebtAccount, raw: string) => {
    const numVal = parseFloat(raw) || 0;
    onUpdate({ ...debt, [field]: field === 'name' ? raw : numVal });
  };
  return (
    <motion.div layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }} transition={{ duration: 0.2 }}
      className="grid grid-cols-12 gap-2 items-start p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
      <div className="col-span-12 sm:col-span-4">
        <label htmlFor={`${uid}-name`} className="sr-only">Debt name</label>
        <input id={`${uid}-name`} type="text" value={debt.name} maxLength={50}
          onChange={(e) => update('name', e.target.value)}
          placeholder="e.g. Visa Card"
          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label={`Debt ${index + 1} name`} />
      </div>
      <div className="col-span-4 sm:col-span-2">
        <label htmlFor={`${uid}-balance`} className="text-[10px] text-slate-500 mb-1 block">
          Balance ({currencySymbol})
        </label>
        <input id={`${uid}-balance`} type="number" min="1" max="10000000" step="100"
          value={debt.balance || ''}
          onChange={(e) => update('balance', e.target.value)}
          className="input-financial text-sm" aria-label={`Debt ${index + 1} balance`} />
      </div>
      <div className="col-span-4 sm:col-span-2">
        <label htmlFor={`${uid}-rate`} className="text-[10px] text-slate-500 mb-1 block">APR (%)</label>
        <input id={`${uid}-rate`} type="number" min="0" max="36" step="0.1"
          value={debt.interestRate || ''}
          onChange={(e) => update('interestRate', e.target.value)}
          className="input-financial text-sm" aria-label={`Debt ${index + 1} interest rate`} />
        <select
          value={debt.interestType || 'fixed'}
          onChange={(e) => onUpdate({
            ...debt,
            interestType: e.target.value as 'fixed' | 'variable',
            annualRateChangePercent: e.target.value === 'variable'
              ? (debt.annualRateChangePercent || 0.5)
              : 0,
          })}
          className="w-full mt-1 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px] text-slate-500 focus:outline-none"
          aria-label={`Debt ${index + 1} rate type`}
        >
          <option value="fixed">Fixed</option>
          <option value="variable">Variable ↕</option>
        </select>
      </div>
      <div className="col-span-3 sm:col-span-3">
        <label htmlFor={`${uid}-min`} className="text-[10px] text-slate-500 mb-1 block">
          Min Pay ({currencySymbol})
        </label>
        <input id={`${uid}-min`} type="number" min="1" max="10000" step="5"
          value={debt.minimumPayment || ''}
          onChange={(e) => update('minimumPayment', e.target.value)}
          className="input-financial text-sm" aria-label={`Debt ${index + 1} minimum payment`} />
      </div>
      <div className="col-span-1 flex items-end justify-center pb-0.5">
        <button onClick={() => onDelete(debt.id)}
          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
          aria-label={`Remove ${debt.name}`}>
          <Trash2 className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}

function StrategyPanel({ result, config, isBest, formatCurrency, baselineUnpayable }: {
  result: PayoffResult; config: typeof STRATEGIES[0];
  isBest: boolean; formatCurrency: (n: number) => string;
  baselineUnpayable?: boolean;
}) {
  return (
    <div className={cn('bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 relative',
      isBest && 'ring-2 ring-green-500 shadow-lg shadow-green-500/20')}>
      {isBest && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-sm">
            <Trophy className="w-3 h-3" /> Best Strategy
          </span>
        </div>
      )}
      <div className="text-center mb-4 pt-1">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">{config.label}</h3>
        <p className="text-xs text-slate-500">{config.tagline}</p>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Payoff Time</span>
          <span className="font-bold tabular-nums text-slate-900 dark:text-white">
            {result.isUnpayable ? '⚠️ Not payable' : formatDuration(result.totalMonths)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500 flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> Total Interest</span>
          <span className="font-bold tabular-nums text-red-600 dark:text-red-400">
            {result.isUnpayable ? '—' : formatCurrency(result.totalInterestPaid)}
          </span>
        </div>
        {result.interestSaved > 0 && !baselineUnpayable && !result.isUnpayable && (
          <div className="flex justify-between items-center text-sm bg-green-50 dark:bg-green-950/30 rounded-lg px-3 py-2">
            <span className="text-green-700 dark:text-green-300 flex items-center gap-1.5"><TrendingDown className="w-3.5 h-3.5" /> Saved</span>
            <span className="font-bold tabular-nums text-green-700 dark:text-green-300">{formatCurrency(result.interestSaved)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ChartTooltip({ active, payload, label, formatCurrency }: {
  active?: boolean; payload?: { name: string; value: number; color: string }[];
  label?: number; formatCurrency: (n: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-lg text-sm">
      <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">{formatDuration(label ?? 0)}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex justify-between gap-4" style={{ color: p.color }}>
          <span>{p.name}</span>
          <span className="font-bold tabular-nums">{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function DebtPayoffCalculator() {
  const [debts, setDebts] = useState<DebtAccount[]>(SEED_DEBTS);
  const [extraPayment, setExtraPayment] = useState(200);
  const [activeStrategy, setActiveStrategy] = useState<PayoffStrategy>('avalanche');
  const [validationError, setValidationError] = useState<string | null>(null);

  const currencyInfo = useCurrency();
  const { formatCurrency } = createCurrencyFormatters(currencyInfo);
  const currencySymbol = currencyInfo.loading ? '$' : currencyInfo.symbol;

  const addDebt = useCallback(() => {
    setDebts((prev) => [...prev, {
      id: generateId(), name: `Debt ${prev.length + 1}`,
      balance: 1000, interestRate: 15, minimumPayment: 25, type: 'other',
    }]);
  }, []);

  const updateDebt = useCallback((updated: DebtAccount) => {
    setDebts((prev) => prev.map((d) => d.id === updated.id ? updated : d));
  }, []);

  const deleteDebt = useCallback((id: string) => {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  }, []);

  // Clamp extra payment to valid range
  const handleExtraPaymentChange = useCallback((value: number) => {
    const clamped = Math.max(0, isFinite(value) ? value : 0);
    setExtraPayment(clamped);
  }, []);

  const results = useMemo(() => {
    if (debts.length === 0) return null;
    const parsed = debtPayoffInputSchema.safeParse({ debts, extraMonthlyPayment: extraPayment, strategy: activeStrategy });
    if (!parsed.success) { setValidationError(parsed.error.errors[0]?.message ?? 'Check inputs'); return null; }
    setValidationError(null);
    try { return calculateDebtPayoff(parsed.data); } catch { setValidationError('Calculation error'); return null; }
  }, [debts, extraPayment, activeStrategy]);

  const bestStrategySelection = results
    ? getBestStrategy(results.snowball, results.avalanche, results.hybrid)
    : null;

  const rawBestStrategy = bestStrategySelection?.strategy ?? null;
  const isEqualStrategy = bestStrategySelection?.isEqualStrategy ?? false;

  const allUnpayable =
    results !== null &&
    results.snowball.isUnpayable &&
    results.avalanche.isUnpayable &&
    results.hybrid.isUnpayable;

  const chartData = useMemo(() => {
    if (!results || allUnpayable) return [];
    const maxLen = Math.max(
      results.snowball.timeline.length,
      results.avalanche.timeline.length,
      results.hybrid.timeline.length,
    );
    if (maxLen <= 0) return [];
    const chartLength = Math.min(maxLen, 360);
    return Array.from({ length: chartLength }, (_, i) => ({
      month: i + 1,
      Snowball:  results.snowball.timeline[i]?.totalBalance  ?? 0,
      Avalanche: results.avalanche.timeline[i]?.totalBalance ?? 0,
      Hybrid:    results.hybrid.timeline[i]?.totalBalance    ?? 0,
    }));
  }, [results, allUnpayable]);

  const totalDebt = debts.reduce((s, d) => s + (d.balance || 0), 0);

  const bestStrategy: PayoffStrategy = rawBestStrategy ?? 'avalanche';

  // Detect if baseline is unpayable (affects interest saved / time saved display)
  const baselineUnpayable = results?.baseline.isUnpayable ?? false;

  // Dynamic slider max: at least 2000, or current value if higher
  const sliderMax = Math.max(2000, extraPayment);

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">Your Debts</h2>
            <p className="text-sm text-slate-500">
              Total: <span className="font-bold tabular-nums text-red-600 dark:text-red-400">{formatCurrency(totalDebt)}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!currencyInfo.loading && (
              <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                {currencyInfo.symbol} {currencyInfo.code}
              </span>
            )}
            <button onClick={addDebt} disabled={debts.length >= 20}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors">
              <Plus className="w-4 h-4" /> Add Debt
            </button>
          </div>
        </div>

        <div className="hidden sm:grid grid-cols-12 gap-2 px-3 mb-1.5">
          <span className="col-span-4 text-[10px] font-medium text-slate-500 uppercase tracking-wide">Account Name</span>
          <span className="col-span-2 text-[10px] font-medium text-slate-500 uppercase tracking-wide text-right">Balance</span>
          <span className="col-span-2 text-[10px] font-medium text-slate-500 uppercase tracking-wide text-right">APR %</span>
          <span className="col-span-3 text-[10px] font-medium text-slate-500 uppercase tracking-wide text-right">Min Payment</span>
        </div>

        <AnimatePresence mode="popLayout">
          <div className="space-y-2">
            {debts.map((debt, i) => (
              <DebtRow key={debt.id} debt={debt} index={i}
                onUpdate={updateDebt} onDelete={deleteDebt}
                currencySymbol={currencySymbol} />
            ))}
          </div>
        </AnimatePresence>

        {debts.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            <TrendingDown className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No debts added. Click &quot;Add Debt&quot; to begin.</p>
          </div>
        )}

        <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <label htmlFor="extra-payment" className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                Extra Monthly Payment
              </label>
              <p className="text-xs text-slate-500">Amount above your minimum payments</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-slate-500 font-mono">{currencySymbol}</span>
              <input id="extra-payment" type="number" min="0" max="100000" step="25"
                value={extraPayment}
                onChange={(e) => handleExtraPaymentChange(parseFloat(e.target.value) || 0)}
                className="input-financial w-28 text-base" />
            </div>
          </div>
          <div className="mt-3">
            <input
              type="range"
              min={0}
              max={sliderMax}
              step={25}
              value={extraPayment}
              onChange={(e) => handleExtraPaymentChange(parseFloat(e.target.value) || 0)}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-green-500"
              aria-label="Extra payment slider"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>{currencySymbol}0</span>
              <span>{currencySymbol}500</span>
              <span>{currencySymbol}1,000</span>
              <span>{currencySymbol}{sliderMax.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {validationError && (
          <div className="mt-4 flex items-center gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" /> {validationError}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {results && (
          <motion.div key="results" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="space-y-6">

            {allUnpayable && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900 dark:text-amber-200 text-sm">
                    Debt will continue to grow — no payoff possible
                  </p>
                  <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
                    Your total monthly payments (minimums + extra) are less than the interest accruing. Increase your extra payment or negotiate lower interest rates.
                  </p>
                </div>
              </div>
            )}

            <div>
              <div className="mb-4">
                <h2 className="font-semibold text-slate-900 dark:text-white">Strategy Comparison</h2>
                {isEqualStrategy && !allUnpayable && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    All strategies perform equally
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {STRATEGIES.map((s) => (
                  <StrategyPanel key={s.key} result={results[s.key]} config={s}
                    isBest={!allUnpayable && !isEqualStrategy && s.key === bestStrategy} formatCurrency={formatCurrency}
                    baselineUnpayable={baselineUnpayable} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <MetricCard icon={Trophy} label="Best Strategy"
                value={
                  allUnpayable
                    ? 'None'
                    : isEqualStrategy
                      ? 'Avalanche'
                      : bestStrategy.charAt(0).toUpperCase() + bestStrategy.slice(1)
                }
                highlight={allUnpayable ? 'red' : 'green'}
                sub={
                  allUnpayable
                    ? 'increase payments'
                    : isEqualStrategy
                      ? 'All strategies perform equally — choose based on preference'
                      : undefined
                }
                subMuted={!allUnpayable && isEqualStrategy} />
              <MetricCard icon={DollarSign} label="Interest Saved (vs min)"
                value={allUnpayable ? 'N/A' : formatCurrency(results[bestStrategy].interestSaved)} highlight="green" />
              <MetricCard icon={Clock} label="Time Saved (vs min)"
                value={allUnpayable ? 'N/A' : formatDuration(results[bestStrategy].monthsSaved)} highlight="blue" />
              <MetricCard icon={TrendingDown} label="Debt-Free In"
                value={allUnpayable ? 'Not payable' : formatDuration(results[bestStrategy].totalMonths)}
                sub={allUnpayable ? 'increase payments' : 'from today'} />
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <h3 className="font-semibold text-slate-900 dark:text-white">Payoff Timeline</h3>
                <div className="flex gap-2">
                  {STRATEGIES.map((s) => (
                    <button key={s.key} onClick={() => setActiveStrategy(s.key)}
                      className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors',
                        activeStrategy === s.key
                          ? 'bg-green-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600')}
                      aria-pressed={activeStrategy === s.key}>
                      {s.label.split(' ')[1]}
                    </button>
                  ))}
                </div>
              </div>

              {chartData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center text-sm text-slate-500">
                  {allUnpayable
                    ? 'Payoff timeline chart is unavailable when every strategy is unpayable.'
                    : 'No timeline data for the current inputs.'}
                </div>
              ) : (
                <div className="w-full overflow-hidden" style={{ minHeight: 300 }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -5, bottom: 5 }}>
                      <defs>
                        {[['snowballGrad','#3b82f6'],['avalancheGrad','#22c55e'],['hybridGrad','#a855f7']].map(([id, c]) => (
                          <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor={c} stopOpacity={0.15} />
                            <stop offset="95%" stopColor={c} stopOpacity={0} />
                          </linearGradient>
                        ))}
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                      <XAxis dataKey="month" tickFormatter={(v) => `Mo ${v}`}
                        tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
                        interval="preserveStartEnd" />
                      <YAxis tickFormatter={(v) => `${currencySymbol}${(v/1000).toFixed(0)}k`}
                        tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={50} />
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <Tooltip content={(props: any) => <ChartTooltip {...props} formatCurrency={formatCurrency} />} />
                      <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                      <Area type="monotone" dataKey="Snowball"  stroke="#3b82f6" strokeWidth={2}   fill="url(#snowballGrad)"  dot={false} />
                      <Area type="monotone" dataKey="Avalanche" stroke="#22c55e" strokeWidth={2.5} fill="url(#avalancheGrad)" dot={false} />
                      <Area type="monotone" dataKey="Hybrid"    stroke="#a855f7" strokeWidth={2}   fill="url(#hybridGrad)"   dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                Payoff Order — {activeStrategy.charAt(0).toUpperCase() + activeStrategy.slice(1)} Strategy
              </h3>
              <div className="space-y-2">
                {results[activeStrategy].payoffOrder.map((id, i) => {
                  const debt = debts.find((d) => d.id === id);
                  if (!debt) return null;
                  const monthData = results[activeStrategy].timeline.find(
                    (t) => t.accounts[id] !== undefined && (t.accounts[id] ?? 0) < 0.01
                  );
                  return (
                    <div key={id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                          {debt.name}
                          {debt.interestType === 'variable' && (
                            <span className="ml-1.5 text-[10px] text-amber-600 dark:text-amber-400 font-normal">
                              (Variable ±{debt.annualRateChangePercent ?? 0}%/yr)
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-slate-500">{formatCurrency(debt.balance)} at {debt.interestRate}% APR</p>
                      </div>
                      {monthData && (
                        <span className="text-xs text-green-600 dark:text-green-400 font-semibold shrink-0">
                          Month {monthData.month}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
