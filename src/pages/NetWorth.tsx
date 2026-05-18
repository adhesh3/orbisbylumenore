import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardBody, CardHeader, CardSub, CardTitle } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import {
  totalNetWorth,
  totalAssets,
  totalLiabilities,
  allocation,
  liquidAssets,
  illiquidAssets,
  netWorthTimeline,
  bankCashTotal,
  cdTotal,
  bondsTotal,
  retirementTotal,
  preciousMetalsTotal,
  stocksTotal,
  mfTotal,
  privateStocksTotal,
  vcTotal,
  reitTotal,
  realEstateTotal,
  jewelleryTotal,
  artTotal,
  vehiclesTotal,
} from '@/data/networth';
import { loans } from '@/data/loans';
import { formatUSD, formatPct } from '@/lib/utils';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

export function NetWorth() {
  const liabilityBuckets = [
    { name: 'Mortgages', value: loans.filter((l) => l.type === 'Mortgage').reduce((s, l) => s + l.outstanding, 0) },
    { name: 'HELOC', value: loans.filter((l) => l.type === 'HELOC').reduce((s, l) => s + l.outstanding, 0) },
    { name: 'Securities-Backed', value: loans.filter((l) => l.type === 'Securities-Backed Line').reduce((s, l) => s + l.outstanding, 0) },
    { name: 'Auto Loans', value: loans.filter((l) => l.type === 'Auto Loan').reduce((s, l) => s + l.outstanding, 0) },
    { name: 'Credit Cards', value: loans.filter((l) => l.type === 'Credit Card').reduce((s, l) => s + l.outstanding, 0) },
  ];

  const buckets = [
    { name: 'Liquid Assets', breakdown: [
      { label: 'Bank Cash & MMF', value: bankCashTotal },
      { label: 'Public Stocks', value: stocksTotal },
      { label: 'Mutual Funds', value: mfTotal },
      { label: 'REITs', value: reitTotal },
    ]},
    { name: 'Fixed Income', breakdown: [
      { label: 'CDs', value: cdTotal },
      { label: 'Bonds', value: bondsTotal },
    ]},
    { name: 'Retirement Corpus', breakdown: [
      { label: '401(k) / IRAs / SEP / HSA', value: retirementTotal },
    ]},
    { name: 'Real Estate', breakdown: [
      { label: 'Residential + Commercial + Land', value: realEstateTotal },
    ]},
    { name: 'Alternatives', breakdown: [
      { label: 'VC / Pre-IPO', value: vcTotal + privateStocksTotal },
      { label: 'Precious Metals', value: preciousMetalsTotal },
      { label: 'Art', value: artTotal },
      { label: 'Jewellery', value: jewelleryTotal },
      { label: 'Vehicles', value: vehiclesTotal },
    ]},
  ];

  const liquidPct = (liquidAssets / (liquidAssets + illiquidAssets)) * 100;

  const stackData = netWorthTimeline.map((p, i) => ({
    month: p.month,
    Assets: +(p.value + (totalLiabilities / 1_000_000) - i * 0.05).toFixed(1),
    Liabilities: +((totalLiabilities / 1_000_000) - i * 0.05).toFixed(1),
  }));

  return (
    <div>
      <PageHeader
        title="Net Worth Tracker"
        description="The definitive snapshot of family wealth."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Total Net Worth</CardTitle>
              <CardSub>Assets − Liabilities · live</CardSub>
            </div>
            <Chip tone="gain"><TrendingUp size={12} /> +{(((netWorthTimeline[netWorthTimeline.length - 1].value / netWorthTimeline[0].value) - 1) * 100).toFixed(1)}% YoY</Chip>
          </CardHeader>
          <CardBody>
            <div className="flex items-baseline gap-4">
              <div className="stat-num text-5xl text-navy">{formatUSD(totalNetWorth, { compact: true })}</div>
              <div className="text-xs text-muted-foreground">exact: {formatUSD(totalNetWorth)}</div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-md bg-emerald-50/60 p-3">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Total Assets</div>
                <div className="stat-num text-lg text-gain">{formatUSD(totalAssets, { compact: true })}</div>
              </div>
              <div className="rounded-md bg-rose-50/60 p-3">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Total Liabilities</div>
                <div className="stat-num text-lg text-loss">{formatUSD(totalLiabilities, { compact: true })}</div>
              </div>
              <div className="rounded-md bg-navy-50/60 p-3">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Liquidity</div>
                <div className="stat-num text-lg text-navy">{liquidPct.toFixed(0)}%</div>
              </div>
            </div>
            <div className="h-56 mt-5">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={netWorthTimeline}>
                  <defs>
                    <linearGradient id="nwArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1B2A4A" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#1B2A4A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#EEF0F5" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#5C6577', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#5C6577', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
                  <Tooltip formatter={(v: number) => [`$${v}M`, 'Net Worth']} />
                  <Area type="monotone" dataKey="value" stroke="#1B2A4A" strokeWidth={2.5} fill="url(#nwArea)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><div><CardTitle>Assets vs Liabilities</CardTitle><CardSub>12-month stacked view</CardSub></div></CardHeader>
          <CardBody>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stackData}>
                  <CartesianGrid stroke="#EEF0F5" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#5C6577', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#5C6577', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
                  <Tooltip formatter={(v: number, name: string) => [`$${v}M`, name]} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Liabilities" stackId="a" fill="#C0392B" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Assets" stackId="a" fill="#1B2A4A" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader><div><CardTitle>Asset Buckets</CardTitle><CardSub>Categorized for institutional reporting</CardSub></div></CardHeader>
          <CardBody>
            <div className="space-y-4">
              {buckets.map((b) => {
                const total = b.breakdown.reduce((s, x) => s + x.value, 0);
                const pct = (total / totalAssets) * 100;
                return (
                  <div key={b.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="text-sm font-semibold text-navy">{b.name}</div>
                      <div className="text-sm tabular-nums text-navy">{formatUSD(total, { compact: true })} <span className="text-xs text-muted-foreground">({pct.toFixed(1)}%)</span></div>
                    </div>
                    <div className="h-2 rounded-full bg-navy-50 overflow-hidden mb-2">
                      <div className="h-full bg-navy" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {b.breakdown.map((x) => (
                        <div key={x.label} className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{x.label}</span>
                          <span className="tabular-nums text-navy">{formatUSD(x.value, { compact: true })}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><div><CardTitle>Liability Breakdown</CardTitle><CardSub>By category</CardSub></div></CardHeader>
          <CardBody>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={liabilityBuckets} layout="vertical" barSize={22}>
                  <XAxis type="number" tick={{ fill: '#5C6577', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1_000_000).toFixed(1)}M`} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#0F1A2E', fontSize: 12 }} axisLine={false} tickLine={false} width={140} />
                  <Tooltip formatter={(v: number) => formatUSD(v, { compact: true })} />
                  <Bar dataKey="value" fill="#C0392B" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
              <ArrowUpRight size={12} /> Total Liabilities: <span className="font-semibold text-navy">{formatUSD(totalLiabilities, { compact: true })}</span>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
