import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardBody, CardHeader, CardSub, CardTitle } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { Chip } from '@/components/ui/Chip';
import {
  totalNetWorth,
  totalAssets,
  totalLiabilities,
  allocation,
  liquidAssets,
  illiquidAssets,
  netWorthTimeline,
} from '@/data/networth';
import { monthlyIncomeTotal } from '@/data/income';
import { monthlyExpenseTotal } from '@/data/expenses';
import { mutualFunds, publicStocks, retirementAccounts } from '@/data/investments';
import { recentTransactions } from '@/data/transactions';
import { reminders } from '@/data/reminders';
import { members } from '@/data/family';
import { formatUSD, formatPct, formatDate, daysUntil, cn } from '@/lib/utils';

const PIE_COLORS = ['#1B2A4A', '#C9A84C', '#2E7D52', '#5C72A1', '#A88934', '#7E6627', '#33487A', '#9CAACB', '#DEBF63'];

const allocationData = [
  { name: 'Real Estate', value: allocation.realEstate },
  { name: 'Equities', value: allocation.equities },
  { name: 'Retirement', value: allocation.retirement },
  { name: 'Fixed Income', value: allocation.fixedIncome },
  { name: 'Cash & Equivalents', value: allocation.cashEquivalents },
  { name: 'Alternatives (VC + REITs)', value: allocation.alternatives },
  { name: 'Precious Metals', value: allocation.preciousMetals },
  { name: 'Art & Jewellery', value: allocation.collectibles },
  { name: 'Vehicles', value: allocation.vehicles },
];

export function Dashboard() {
  const first = netWorthTimeline[0].value;
  const last = netWorthTimeline[netWorthTimeline.length - 1].value;
  const prev = netWorthTimeline[netWorthTimeline.length - 2].value;
  const netChangeYoY = ((last / first) - 1) * 100;
  const netChangeMoM = ((last / prev) - 1) * 100;
  const monthlyCashflow = monthlyIncomeTotal - monthlyExpenseTotal;
  const cashflowData = [
    { name: 'Income', value: monthlyIncomeTotal },
    { name: 'Outflow', value: monthlyExpenseTotal },
    { name: 'Net Surplus', value: monthlyCashflow },
  ];

  const topInvestment = [...mutualFunds, ...publicStocks.map((s) => ({
    fund: s.name,
    ticker: s.ticker,
    invested: s.qty * s.avgBuyPrice,
    currentValue: s.qty * s.currentPrice,
    xirr: ((s.currentPrice / s.avgBuyPrice - 1) * 100),
  }))]
    .sort((a: any, b: any) => (b.currentValue - b.invested) - (a.currentValue - a.invested))
    .slice(0, 1)[0] as any;

  const upcomingReminders = [...reminders]
    .filter((r) => r.status !== 'Completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  const liquidityPct = (liquidAssets / (liquidAssets + illiquidAssets)) * 100;

  const memberShares = members.map((m, i) => {
    // Approximate split based on relation
    const share = m.relation === 'Father' ? 0.62 : m.relation === 'Mother' ? 0.32 : m.relation === 'Child' && m.role === 'Dependent' ? 0.04 : 0.02;
    return { ...m, share, value: totalNetWorth * share, color: PIE_COLORS[i % PIE_COLORS.length] };
  });

  const investmentSummary = [
    { bucket: 'Public Equities', xirr: 16.4, value: publicStocks.reduce((s, x) => s + x.qty * x.currentPrice, 0) },
    { bucket: 'Mutual Funds', xirr: mutualFunds.reduce((s, x) => s + x.xirr * x.currentValue, 0) / mutualFunds.reduce((s, x) => s + x.currentValue, 0), value: mutualFunds.reduce((s, x) => s + x.currentValue, 0) },
    { bucket: 'Retirement Accounts', xirr: 9.8, value: retirementAccounts.reduce((s, x) => s + x.currentCorpus, 0) },
    { bucket: 'Fixed Income (CDs + Bonds)', xirr: 4.8, value: allocation.fixedIncome },
    { bucket: 'Alternatives (VC + REITs)', xirr: 22.1, value: allocation.alternatives },
  ];

  return (
    <div>
      <PageHeader
        title="Wealth Command Center"
        description="A bird's-eye view of the entire family's financial universe."
        actions={<Chip tone="navy">Live</Chip>}
      />

      {/* Hero row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Total Net Worth</CardTitle>
              <CardSub>Assets − Liabilities · updated just now</CardSub>
            </div>
            <Chip tone="gain">
              <ArrowUpRight size={12} /> {formatPct(netChangeYoY)} YoY
            </Chip>
          </CardHeader>
          <CardBody>
            <div className="flex items-end gap-4">
              <div className="stat-num text-5xl md:text-6xl text-navy">
                {formatUSD(totalNetWorth, { compact: true })}
              </div>
              <div className="pb-2 flex flex-col gap-1 text-xs">
                <span className="inline-flex items-center gap-1 text-gain">
                  <ArrowUpRight size={12} /> {formatPct(netChangeMoM)} vs last month
                </span>
                <span className="text-muted-foreground">Exact: {formatUSD(totalNetWorth)}</span>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-md bg-navy-50/60 p-3">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Total Assets</div>
                <div className="stat-num text-xl text-navy mt-0.5">{formatUSD(totalAssets, { compact: true })}</div>
              </div>
              <div className="rounded-md bg-rose-50/60 p-3">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Total Liabilities</div>
                <div className="stat-num text-xl text-loss mt-0.5">{formatUSD(totalLiabilities, { compact: true })}</div>
              </div>
            </div>
            <div className="mt-5 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={netWorthTimeline} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="nwLine" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1B2A4A" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#1B2A4A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#EEF0F5" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#5C6577', fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ borderRadius: 10, border: '1px solid #E6EAF3' }}
                    formatter={(v: number) => [`$${v}M`, 'Net Worth']}
                  />
                  <Line type="monotone" dataKey="value" stroke="#1B2A4A" strokeWidth={2.5} dot={false} fill="url(#nwLine)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Asset Allocation</CardTitle>
              <CardSub>Across all asset classes</CardSub>
            </div>
          </CardHeader>
          <CardBody>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={72}
                    paddingAngle={1}
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {allocationData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => formatUSD(v, { compact: true })} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {allocationData.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="h-2.5 w-2.5 rounded-sm shrink-0"
                      style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                    />
                    <span className="text-muted-foreground truncate">{d.name}</span>
                  </div>
                  <span className="tabular-nums text-navy font-medium">
                    {((d.value / totalAssets) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Monthly Cash Flow</CardTitle>
              <CardSub>Avg. monthly · all members</CardSub>
            </div>
            <Chip tone={monthlyCashflow > 0 ? 'gain' : 'loss'}>
              {monthlyCashflow > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              Net {formatUSD(monthlyCashflow, { compact: true })}
            </Chip>
          </CardHeader>
          <CardBody>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cashflowData} barSize={36}>
                  <CartesianGrid stroke="#EEF0F5" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#5C6577', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip formatter={(v: number) => formatUSD(v)} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {cashflowData.map((d, i) => (
                      <Cell
                        key={i}
                        fill={d.name === 'Income' ? '#2E7D52' : d.name === 'Outflow' ? '#C0392B' : '#C9A84C'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              <div>
                <div className="text-muted-foreground">Income</div>
                <div className="stat-num text-base text-gain">{formatUSD(monthlyIncomeTotal, { compact: true })}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Outflow</div>
                <div className="stat-num text-base text-loss">{formatUSD(monthlyExpenseTotal, { compact: true })}</div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Liquid vs Illiquid</CardTitle>
              <CardSub>Wealth liquidity profile</CardSub>
            </div>
            <Chip tone="info">
              <Wallet size={12} /> {liquidityPct.toFixed(0)}% liquid
            </Chip>
          </CardHeader>
          <CardBody>
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Liquid</span>
                  <span className="tabular-nums text-navy font-medium">
                    {formatUSD(liquidAssets, { compact: true })}
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-navy-50 overflow-hidden mt-1">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: `${liquidityPct}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Illiquid</span>
                  <span className="tabular-nums text-navy font-medium">
                    {formatUSD(illiquidAssets, { compact: true })}
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-navy-50 overflow-hidden mt-1">
                  <div className="h-full bg-gradient-to-r from-navy to-navy-400" style={{ width: `${100 - liquidityPct}%` }} />
                </div>
              </div>
              <div className="pt-2 text-[11px] text-muted-foreground">
                Real estate, private stocks, art and collectibles are classified as illiquid.
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Top Performing Investment</CardTitle>
              <CardSub>By unrealized gain</CardSub>
            </div>
            <Chip tone="gain">
              <TrendingUp size={12} /> Outperformer
            </Chip>
          </CardHeader>
          <CardBody>
            <div className="text-sm text-muted-foreground">{topInvestment?.ticker}</div>
            <div className="font-display text-xl text-navy mt-0.5">{topInvestment?.fund}</div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Current Value</div>
                <div className="stat-num text-base text-navy">{formatUSD(topInvestment?.currentValue ?? 0, { compact: true })}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Return</div>
                <div className="stat-num text-base text-gain">{formatPct(topInvestment?.xirr ?? 0)}</div>
              </div>
            </div>
            <div className="mt-4 text-[11px] text-muted-foreground">
              Invested {formatUSD(topInvestment?.invested ?? 0, { compact: true })} ·
              Gain {formatUSD((topInvestment?.currentValue ?? 0) - (topInvestment?.invested ?? 0), { compact: true })}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardSub>Last 10 entries across all accounts</CardSub>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="divide-y divide-border">
              {recentTransactions.map((t) => (
                <div key={t.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm text-navy truncate">{t.description}</div>
                    <div className="text-[11px] text-muted-foreground truncate">
                      {formatDate(t.date)} · {t.account}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div
                      className={cn(
                        'stat-num text-sm',
                        t.amount > 0 ? 'text-gain' : 'text-loss',
                      )}
                    >
                      {t.amount > 0 ? '+' : ''}{formatUSD(t.amount)}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{t.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Upcoming Reminders</CardTitle>
              <CardSub>Next 5 obligations</CardSub>
            </div>
            <Calendar size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardBody className="pt-0">
            <div className="space-y-2">
              {upcomingReminders.map((r) => {
                const d = daysUntil(r.dueDate);
                const isUrgent = d <= 7;
                return (
                  <div key={r.id} className="flex items-center justify-between p-2.5 rounded-md border border-border hover:border-navy-200 transition-colors">
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-navy truncate">{r.title}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {formatDate(r.dueDate)} · {r.module}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {r.amount ? (
                        <div className="stat-num text-sm text-navy">{formatUSD(r.amount, { compact: true })}</div>
                      ) : null}
                      <Chip tone={isUrgent ? 'loss' : 'gold'}>
                        {d <= 0 ? 'Due today' : `${d}d`}
                      </Chip>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Family Member Snapshot</CardTitle>
              <CardSub>Individual net worth share</CardSub>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-2.5">
              {memberShares.map((m) => (
                <div key={m.id} className="flex items-center gap-3">
                  <div
                    className="h-9 w-9 rounded-full text-white text-xs font-semibold inline-flex items-center justify-center shrink-0"
                    style={{ background: m.color }}
                  >
                    {m.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-medium text-navy truncate">{m.name}</div>
                      <div className="stat-num text-sm text-navy tabular-nums">
                        {formatUSD(m.value, { compact: true })}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{m.relation} · {m.role}</span>
                      <span>{(m.share * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-navy-50 mt-1">
                      <div className="h-full rounded-full" style={{ width: `${m.share * 100}%`, background: m.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Investment Returns Summary</CardTitle>
              <CardSub>XIRR / CAGR by bucket</CardSub>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="divide-y divide-border">
              {investmentSummary.map((b) => (
                <div key={b.bucket} className="py-3 grid grid-cols-3 gap-3 items-center">
                  <div className="text-sm text-navy font-medium">{b.bucket}</div>
                  <div className="text-sm text-muted-foreground tabular-nums">{formatUSD(b.value, { compact: true })}</div>
                  <div className="text-right">
                    <span className={cn('stat-num text-base', b.xirr >= 0 ? 'text-gain' : 'text-loss')}>
                      {formatPct(b.xirr)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground">Blended portfolio XIRR (gross of tax)</div>
              <div className="stat-num text-lg text-navy">+12.4%</div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="text-center text-xs text-muted-foreground py-4">
        Tip: switch the viewer in the top bar to see a single member's snapshot — or use AskMe for instant insights.
        <ArrowRight size={12} className="inline ml-1" />
      </div>
    </div>
  );
}
