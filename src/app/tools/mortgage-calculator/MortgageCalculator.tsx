'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { Home, TrendingUp, AlertCircle } from 'lucide-react';
import { calculateMortgage } from '@/lib/math-engine/mortgage';
import { mortgageInputSchema } from '@/lib/validations/schemas';
import { cn } from '@/lib/utils';
import { useCurrency, createCurrencyFormatters } from '@/hooks/useCurrency';

const DEFAULT_INPUT = {
  homePrice: 450000,
  downPaymentPercent: 20,
  mortgageRatePercent: 6.8,
  loanTermYears: '30' as const,
  propertyTaxRatePercent: 1.1,
  maintenanceRatePercent: 1.0,
  homeInsuranceMonthly: 150,
  hoaMonthly: 0,
  homeAppreciationPercent: 4.0,
  monthlyRent: 2200,
  rentIncreasePercent: 3.0,
  investmentReturnPercent: 7.0,
  marginalTaxRatePercent: 22,
  yearsToAnalyze: 10,
};

function InputRow({
  label, id, value, onChange, min, max, step, prefix, suffix, helpText,
}: {
  label: string; id: string; value: number;
  onChange: (v: number) => void;
  min?: number; max?: number; step?: number;
  prefix?: string; suffix?: string; helpText?: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1">
        <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
        {helpText && <span className="text-xs text-slate-400">{helpText}</span>}
      </div>
      <div className="flex items-center gap-1.5">
        {prefix && <span className="text-slate-500 font-mono text-sm">{prefix}</span>}
        <input
          id={id} type="number" value={value} min={min} max={max} step={step ?? 1}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="input-financial flex-1"
        />
        {suffix && <span className="text-slate-500 text-sm">{suffix}</span>}
      </div>
    </div>
  );
}

export function MortgageCalculator() {
  const [inputs, setInputs] = useState(DEFAULT_INPUT);
  const [error, setError] = useState<string | null>(null);

  const currencyInfo = useCurrency();
  const { formatCurrency, formatCurrencyShort } = createCurrencyFormatters(currencyInfo);
  const currencySymbol = currencyInfo.loading ? '$' : currencyInfo.symbol;

  const update = (field: keyof typeof inputs, value: number | string) =>
    setInputs((prev) => ({ ...prev, [field]: value }));

  const results = useMemo(() => {
    const parsed = mortgageInputSchema.safeParse(inputs);
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? 'Invalid inputs');
      return null;
    }
    setError(null);
    try {
      return calculateMortgage(parsed.data as Parameters<typeof calculateMortgage>[0]);
    } catch {
      setError('Calculation error');
      return null;
    }
  }, [inputs]);

  const recommendation = results?.recommendation;

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

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Home className="w-4 h-4 text-blue-500" /> Home Purchase
          </h2>
          <div className="space-y-4">
            <InputRow label="Home Price" id="homePrice" value={inputs.homePrice}
              onChange={(v) => update('homePrice', v)} min={50000} max={5000000} step={5000}
              prefix={currencySymbol} />
            <InputRow label="Down Payment" id="downPct" value={inputs.downPaymentPercent}
              onChange={(v) => update('downPaymentPercent', v)} min={3} max={99} step={0.5}
              suffix="%"
              helpText={`${currencySymbol}${Math.round(inputs.homePrice * inputs.downPaymentPercent / 100).toLocaleString()}`} />
            <InputRow label="Mortgage Rate" id="mortgageRate" value={inputs.mortgageRatePercent}
              onChange={(v) => update('mortgageRatePercent', v)} min={1} max={15} step={0.05}
              suffix="%" />
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">
                Loan Term
              </label>
              <div className="flex gap-2">
                {(['15', '20', '30'] as const).map((t) => (
                  <button key={t}
                    onClick={() => update('loanTermYears', t)}
                    className={cn(
                      'flex-1 py-2 rounded-lg text-sm font-medium transition-colors',
                      inputs.loanTermYears === t
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                    )}>
                    {t} yr
                  </button>
                ))}
              </div>
            </div>
            <InputRow label="Property Tax" id="propTax" value={inputs.propertyTaxRatePercent}
              onChange={(v) => update('propertyTaxRatePercent', v)} min={0} max={5} step={0.05}
              suffix="% / yr" />
            <InputRow label="Maintenance" id="maint" value={inputs.maintenanceRatePercent}
              onChange={(v) => update('maintenanceRatePercent', v)} min={0} max={5} step={0.1}
              suffix="% / yr" />
            <InputRow label="Home Insurance" id="ins" value={inputs.homeInsuranceMonthly}
              onChange={(v) => update('homeInsuranceMonthly', v)} min={0} max={5000} step={10}
              prefix={`${currencySymbol}/mo`} />
            <InputRow label="HOA Fees" id="hoa" value={inputs.hoaMonthly}
              onChange={(v) => update('hoaMonthly', v)} min={0} max={5000} step={10}
              prefix={`${currencySymbol}/mo`} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-500" /> Market & Rent
          </h2>
          <div className="space-y-4">
            <InputRow label="Home Appreciation" id="appreciation" value={inputs.homeAppreciationPercent}
              onChange={(v) => update('homeAppreciationPercent', v)} min={0} max={15} step={0.1}
              suffix="% / yr" />
            <InputRow label="Current Monthly Rent" id="rent" value={inputs.monthlyRent}
              onChange={(v) => update('monthlyRent', v)} min={100} max={50000} step={50}
              prefix={currencySymbol} />
            <InputRow label="Annual Rent Increase" id="rentIncrease" value={inputs.rentIncreasePercent}
              onChange={(v) => update('rentIncreasePercent', v)} min={0} max={15} step={0.1}
              suffix="%" />
            <InputRow label="Investment Return (if renting)" id="investReturn"
              value={inputs.investmentReturnPercent}
              onChange={(v) => update('investmentReturnPercent', v)} min={1} max={20} step={0.1}
              suffix="%" />
            <InputRow label="Your Tax Rate" id="taxRate" value={inputs.marginalTaxRatePercent}
              onChange={(v) => update('marginalTaxRatePercent', v)} min={0} max={50} step={1}
              suffix="%" />
            <InputRow label="Years to Analyze" id="years" value={inputs.yearsToAnalyze}
              onChange={(v) => update('yearsToAnalyze', Math.round(v))} min={1} max={40} step={1}
              suffix=" years" />
          </div>
        </div>
      </div>

      {/* ── Results ─────────────────────────────────────────── */}
      <div className="xl:col-span-2 space-y-5">
        {error && (
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 text-sm">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          {results && (
            <motion.div key="results" initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }} className="space-y-5">

              {/* Recommendation Banner */}
              <div className={cn('rounded-xl p-5 border', {
                'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800':
                  recommendation === 'buy',
                'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800':
                  recommendation === 'rent',
                'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800':
                  recommendation === 'neutral',
              })}>
                <p className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                  {recommendation === 'buy'     && '🏡 Buying appears financially advantageous'}
                  {recommendation === 'rent'    && '🏠 Renting & investing appears financially stronger'}
                  {recommendation === 'neutral' && '⚖️ The financial outcome is roughly equal'}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Over {inputs.yearsToAnalyze} years. Break-even:{' '}
                  <strong>
                    Year {results.breakEvenYears > inputs.yearsToAnalyze
                      ? `>${inputs.yearsToAnalyze}`
                      : results.breakEvenYears}
                  </strong>.
                  This is a financial estimate only — lifestyle factors matter equally.
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: formatCurrency(results.monthlyPayment),    label: 'Monthly All-In Cost (Buy)', accent: '' },
                  { value: formatCurrency(inputs.monthlyRent),         label: 'Current Monthly Rent',     accent: '' },
                  { value: formatCurrency(results.buyingNetWorth),     label: `Buyer Net Worth (Yr ${inputs.yearsToAnalyze})`,  accent: 'border-l-4 border-l-green-500' },
                  { value: formatCurrency(results.rentingNetWorth),    label: `Renter Net Worth (Yr ${inputs.yearsToAnalyze})`, accent: 'border-l-4 border-l-blue-500' },
                ].map(({ value, label, accent }) => (
                  <div key={label}
                    className={cn('bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5', accent)}>
                    <div className="text-xl font-bold tabular-nums text-slate-900 dark:text-white">{value}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  Net Worth Comparison Over Time
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Buyer equity vs. renter's investment portfolio
                </p>
                <div style={{ minHeight: 300 }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={results.yearlyComparison} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                      <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`}
                        tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={formatCurrencyShort}
                        tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={70} />
                      <Tooltip
                        formatter={(v: number) => formatCurrency(v)}
                        labelFormatter={(l) => `Year ${l}`}
                        contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
                      />
                      <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                      {results.breakEvenYears <= inputs.yearsToAnalyze && (
                        <ReferenceLine x={results.breakEvenYears} stroke="#f59e0b" strokeDasharray="4 4"
                          label={{ value: 'Break-Even', position: 'top', fontSize: 10, fill: '#f59e0b' }} />
                      )}
                      <Line type="monotone" dataKey="buyingEquity"        name="Buyer Equity"      stroke="#22c55e" strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="rentingPortfolioValue" name="Renter Portfolio" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Secondary Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    value: formatCurrency(results.opportunityCostOfDownPayment),
                    label: 'Opportunity Cost of Down Payment',
                    sub: 'Growth if invested instead',
                  },
                  {
                    value: formatCurrency(results.totalMortgageCost),
                    label: `Total Buying Cost (${inputs.yearsToAnalyze} yr)`,
                    sub: '',
                  },
                  {
                    value: formatCurrency(results.totalRentCost),
                    label: `Total Rent Paid (${inputs.yearsToAnalyze} yr)`,
                    sub: '',
                  },
                ].map(({ value, label, sub }) => (
                  <div key={label}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                    <div className="text-xl font-bold tabular-nums">{value}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</div>
                    {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
