/* eslint-disable react/no-unstable-nested-components */
'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

type YearPoint = {
  year: number;
  contributions: number;
  balance: number;
  balanceReal?: number;
};

export default function CompoundGrowthChart({
  yearlyData,
  showFireMarker,
  fireYear,
  adjustForInflation,
  formatCurrency,
  formatCurrencyShort,
}: {
  yearlyData: YearPoint[];
  showFireMarker: boolean;
  fireYear: number | null;
  adjustForInflation: boolean;
  formatCurrency: (v: number) => string;
  formatCurrencyShort: (v: number) => string;
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={yearlyData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="contribGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
        <XAxis
          dataKey="year"
          tickFormatter={(v) => `Yr ${v}`}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={formatCurrencyShort}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          width={70}
        />
        <Tooltip
          formatter={(v: number) => formatCurrency(v)}
          labelFormatter={(l) => `Year ${l}`}
          contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0' }}
        />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
        {showFireMarker && fireYear !== null && (
          <ReferenceLine
            x={fireYear}
            stroke="#f97316"
            strokeDasharray="4 4"
            label={{ value: '🔥 FIRE', position: 'top', fontSize: 10, fill: '#f97316' }}
          />
        )}
        <Area
          type="monotone"
          dataKey="contributions"
          name="Your Contributions"
          stroke="#94a3b8"
          strokeWidth={1.5}
          fill="url(#contribGrad)"
          dot={false}
        />
        <Area
          type="monotone"
          dataKey={adjustForInflation ? 'balanceReal' : 'balance'}
          name={adjustForInflation ? 'Balance (Real $)' : 'Balance'}
          stroke="#f97316"
          strokeWidth={2.5}
          fill="url(#balanceGrad)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

