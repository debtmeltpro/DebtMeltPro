/* eslint-disable react/no-unstable-nested-components */
'use client';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

type Point = { year: number; invested: number; corpus: number; returns: number };

export default function SIPGrowthChart({
  yearlyData,
  formatCurrencyShort,
}: {
  yearlyData: Point[];
  formatCurrencyShort: (v: number) => string;
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={yearlyData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="sipCorpus" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="sipInvested" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
        <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={formatCurrencyShort} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={52} />
        <Tooltip formatter={(v: number) => formatCurrencyShort(v)} />
        <Legend />
        <Area type="monotone" dataKey="invested" name="Invested" stroke="#94a3b8" fill="url(#sipInvested)" strokeWidth={2} />
        <Area type="monotone" dataKey="corpus" name="Maturity Corpus" stroke="#f59e0b" fill="url(#sipCorpus)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
