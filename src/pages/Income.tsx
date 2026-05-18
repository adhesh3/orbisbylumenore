import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardBody, CardHeader, CardSub, CardTitle } from '@/components/ui/Card';
import { TBody, TD, TH, THead, TR, Table } from '@/components/ui/Table';
import { Chip } from '@/components/ui/Chip';
import { incomeSources, monthlyIncomeTotal, annualIncomeTotal } from '@/data/income';
import { memberName, members } from '@/data/family';
import { formatUSD } from '@/lib/utils';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const COLORS = ['#1B2A4A', '#C9A84C', '#2E7D52', '#5C72A1', '#A88934', '#7E6627', '#33487A'];

export function Income() {
  const byCategory = Object.entries(
    incomeSources.reduce<Record<string, number>>((acc, x) => {
      acc[x.category] = (acc[x.category] ?? 0) + x.amountAnnual;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  const byMember = members.map((m) => ({
    name: m.name.split(' ')[0],
    Salary: incomeSources.filter((s) => s.holderId === m.id && s.category === 'Employment').reduce((s, x) => s + x.amountAnnual, 0),
    Business: incomeSources.filter((s) => s.holderId === m.id && s.category === 'Business').reduce((s, x) => s + x.amountAnnual, 0),
    Rental: incomeSources.filter((s) => s.holderId === m.id && s.category === 'Rental').reduce((s, x) => s + x.amountAnnual, 0),
    Other: incomeSources
      .filter((s) => s.holderId === m.id && !['Employment', 'Business', 'Rental'].includes(s.category))
      .reduce((s, x) => s + x.amountAnnual, 0),
  }));

  return (
    <div>
      <PageHeader
        title="Income Tracker"
        description="All income streams across the family — categorized and forecast."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader><CardTitle>Monthly Income</CardTitle></CardHeader>
          <CardBody>
            <div className="stat-num text-3xl text-navy">{formatUSD(monthlyIncomeTotal, { compact: true })}</div>
            <CardSub>Averaged across all sources</CardSub>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Annual Income (Projected)</CardTitle></CardHeader>
          <CardBody>
            <div className="stat-num text-3xl text-navy">{formatUSD(annualIncomeTotal, { compact: true })}</div>
            <CardSub>Forecasted based on current run-rate</CardSub>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>YoY Growth</CardTitle></CardHeader>
          <CardBody>
            <div className="stat-num text-3xl text-gain">+8.4%</div>
            <CardSub>vs prior calendar year</CardSub>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader><div><CardTitle>Income by Source</CardTitle><CardSub>Annualized</CardSub></div></CardHeader>
          <CardBody>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byCategory} dataKey="value" cx="50%" cy="50%" innerRadius={48} outerRadius={84} paddingAngle={1} stroke="#fff" strokeWidth={2}>
                    {byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => formatUSD(v, { compact: true })} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              {byCategory.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} />
                    <span className="text-muted-foreground truncate">{d.name}</span>
                  </span>
                  <span className="tabular-nums text-navy">{formatUSD(d.value, { compact: true })}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><div><CardTitle>Income by Family Member</CardTitle><CardSub>Stacked by category</CardSub></div></CardHeader>
          <CardBody>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byMember} barSize={32}>
                  <CartesianGrid stroke="#EEF0F5" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#5C6577', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#5C6577', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(v: number) => formatUSD(v, { compact: true })} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Salary" stackId="a" fill="#1B2A4A" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Business" stackId="a" fill="#C9A84C" />
                  <Bar dataKey="Rental" stackId="a" fill="#2E7D52" />
                  <Bar dataKey="Other" stackId="a" fill="#5C72A1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader><div><CardTitle>All Income Sources</CardTitle><CardSub>{incomeSources.length} sources tracked</CardSub></div></CardHeader>
        <CardBody className="pt-0">
          <Table>
            <THead>
              <TR>
                <TH>Source</TH><TH>Category</TH><TH>Holder</TH>
                <TH className="text-right">Monthly</TH>
                <TH className="text-right">Annual</TH>
              </TR>
            </THead>
            <TBody>
              {incomeSources.map((s) => (
                <TR key={s.id}>
                  <TD className="text-sm font-medium text-navy">{s.source}{s.description ? <div className="text-[11px] text-muted-foreground">{s.description}</div> : null}</TD>
                  <TD><Chip tone="neutral">{s.category}</Chip></TD>
                  <TD className="text-sm">{memberName(s.holderId)}</TD>
                  <TD className="text-right text-sm tabular-nums">{formatUSD(s.amountMonthly)}</TD>
                  <TD className="text-right stat-num text-navy">{formatUSD(s.amountAnnual)}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
