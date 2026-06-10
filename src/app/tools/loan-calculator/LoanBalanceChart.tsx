/* eslint-disable react/no-unstable-nested-components */
'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function LoanBalanceChart({
  data,
  formatCurrencyShort,
}: {
  data: { month: number; balance: number; interest: number }[];
  formatCurrencyShort: (v: number) => string;
}) {
  const sampled = data.filter((_, i) => i % Math.max(1, Math.floor(data.length / 24)) === 0 || i === data.length - 1);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={sampled} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="loanBal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
        <XAxis dataKey="month" tickFormatter={(m) => `Mo ${m}`} tick={{ fontSize: 10, fill: '#94a3b8' }} />
        <YAxis tickFormatter={formatCurrencyShort} tick={{ fontSize: 10, fill: '#94a3b8' }} width={52} />
        <Tooltip formatter={(v: number) => formatCurrencyShort(v)} />
        <Area type="monotone" dataKey="balance" name="Remaining Balance" stroke="#0ea5e9" fill="url(#loanBal)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
