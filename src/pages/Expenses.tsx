import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardBody, CardHeader, CardSub, CardTitle } from '@/components/ui/Card';
import { TBody, TD, TH, THead, TR, Table } from '@/components/ui/Table';
import { Chip } from '@/components/ui/Chip';
import { expenses, monthlyExpenseTotal, annualExpenseTotal } from '@/data/expenses';
import { memberName } from '@/data/family';
import { formatUSD } from '@/lib/utils';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

const COLORS = ['#1B2A4A', '#C9A84C', '#2E7D52', '#5C72A1', '#A88934', '#7E6627', '#33487A', '#9CAACB', '#DEBF63', '#C0392B', '#5A481B', '#33487A'];

export function Expenses() {
  const byCategory = Object.entries(
    expenses.reduce<Record<string, number>>((acc, x) => {
      acc[x.category] = (acc[x.category] ?? 0) + x.monthlyAmount;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  const trend = [
    { month: 'Dec', value: 295_000 },
    { month: 'Jan', value: 312_000 },
    { month: 'Feb', value: 298_000 },
    { month: 'Mar', value: 324_000 },
    { month: 'Apr', value: 318_000 },
    { month: 'May', value: monthlyExpenseTotal },
  ];

  return (
    <div>
      <PageHeader
        title="Expenses Tracker"
        description="Detailed categorized expense tracking for the entire family."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader><CardTitle>Monthly Burn Rate</CardTitle></CardHeader>
          <CardBody>
            <div className="stat-num text-3xl text-navy">{formatUSD(monthlyExpenseTotal, { compact: true })}</div>
            <CardSub>Across {expenses.length} line items</CardSub>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Annual Outflow</CardTitle></CardHeader>
          <CardBody>
            <div className="stat-num text-3xl text-navy">{formatUSD(annualExpenseTotal, { compact: true })}</div>
            <CardSub>Including loan EMIs & property taxes</CardSub>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>MoM Change</CardTitle></CardHeader>
          <CardBody>
            <div className="stat-num text-3xl text-gain">−2.1%</div>
            <CardSub>vs April 2026</CardSub>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader><div><CardTitle>Expense Breakdown</CardTitle><CardSub>By category — current month</CardSub></div></CardHeader>
          <CardBody>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byCategory} dataKey="value" cx="50%" cy="50%" innerRadius={56} outerRadius={92} paddingAngle={1} stroke="#fff" strokeWidth={2}>
                    {byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => formatUSD(v, { compact: true })} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><div><CardTitle>Month-over-Month Trend</CardTitle><CardSub>Total monthly outflow</CardSub></div></CardHeader>
          <CardBody>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend}>
                  <CartesianGrid stroke="#EEF0F5" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#5C6577', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#5C6577', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(v: number) => formatUSD(v, { compact: true })} />
                  <Line type="monotone" dataKey="value" stroke="#1B2A4A" strokeWidth={2.5} dot={{ fill: '#C9A84C', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader><div><CardTitle>Top 5 Expense Categories</CardTitle><CardSub>Highest spend this month</CardSub></div></CardHeader>
        <CardBody>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCategory.slice(0, 5)} layout="vertical" barSize={20}>
                <XAxis type="number" tick={{ fill: '#5C6577', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#0F1A2E', fontSize: 12 }} axisLine={false} tickLine={false} width={170} />
                <Tooltip formatter={(v: number) => formatUSD(v)} />
                <Bar dataKey="value" fill="#1B2A4A" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      <div className="mt-4">
        <Card>
          <CardHeader><div><CardTitle>All Expenses</CardTitle><CardSub>{expenses.length} line items</CardSub></div></CardHeader>
          <CardBody className="pt-0">
            <Table>
              <THead>
                <TR>
                  <TH>Subcategory</TH><TH>Category</TH><TH>Payee</TH>
                  <TH>Payment Method</TH><TH>Holder</TH>
                  <TH className="text-right">Monthly</TH>
                  <TH className="text-right">Annual</TH>
                </TR>
              </THead>
              <TBody>
                {expenses.map((e) => (
                  <TR key={e.id}>
                    <TD className="text-sm font-medium text-navy">{e.subcategory}</TD>
                    <TD><Chip tone="neutral">{e.category}</Chip></TD>
                    <TD className="text-sm text-muted-foreground">{e.payee}</TD>
                    <TD className="text-sm text-muted-foreground">{e.paymentMethod}</TD>
                    <TD className="text-sm">{memberName(e.holderId)}</TD>
                    <TD className="text-right text-sm tabular-nums">{formatUSD(e.monthlyAmount)}</TD>
                    <TD className="text-right stat-num text-navy">{formatUSD(e.annualAmount)}</TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
