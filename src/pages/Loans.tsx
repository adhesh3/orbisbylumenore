import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardBody, CardHeader, CardSub, CardTitle } from '@/components/ui/Card';
import { TBody, TD, TH, THead, TR, Table } from '@/components/ui/Table';
import { Chip } from '@/components/ui/Chip';
import { loans, liabilitiesTotal, monthlyEmiTotal } from '@/data/loans';
import { memberName } from '@/data/family';
import { totalAssets } from '@/data/networth';
import { formatUSD } from '@/lib/utils';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export function Loans() {
  const debtToAsset = (liabilitiesTotal / totalAssets) * 100;
  const byLoan = loans.map((l) => ({ name: l.type, value: l.outstanding }));

  return (
    <div>
      <PageHeader
        title="Loans & Liabilities"
        description="All borrowings across the family — mortgages, lines of credit, auto loans, and more."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader><CardTitle>Total Liabilities</CardTitle></CardHeader>
          <CardBody>
            <div className="stat-num text-3xl text-loss">{formatUSD(liabilitiesTotal, { compact: true })}</div>
            <CardSub>{loans.length} active loans · across {new Set(loans.map((l) => l.lender)).size} lenders</CardSub>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Monthly EMI Outflow</CardTitle></CardHeader>
          <CardBody>
            <div className="stat-num text-3xl text-navy">{formatUSD(monthlyEmiTotal, { compact: true })}</div>
            <CardSub>Auto-debited across primary checking accounts</CardSub>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Debt-to-Asset Ratio</CardTitle></CardHeader>
          <CardBody>
            <div className="stat-num text-3xl text-navy">{debtToAsset.toFixed(1)}%</div>
            <CardSub>Healthy range: below 20% for UHNI families</CardSub>
          </CardBody>
        </Card>
      </div>

      <Card className="mb-4">
        <CardHeader><div><CardTitle>Outstanding by Loan Type</CardTitle><CardSub>Current principal remaining</CardSub></div></CardHeader>
        <CardBody>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byLoan} barSize={28}>
                <CartesianGrid stroke="#EEF0F5" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#5C6577', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#5C6577', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1_000_000).toFixed(1)}M`} />
                <Tooltip formatter={(v: number) => formatUSD(v, { compact: true })} />
                <Bar dataKey="value" fill="#1B2A4A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><div><CardTitle>All Loans</CardTitle><CardSub>Detailed view · amortization downloadable</CardSub></div></CardHeader>
        <CardBody className="pt-0">
          <Table>
            <THead>
              <TR>
                <TH>Type</TH><TH>Lender</TH><TH>Account #</TH><TH>Borrower</TH>
                <TH className="text-right">Principal</TH>
                <TH className="text-right">Outstanding</TH>
                <TH className="text-right">Rate</TH>
                <TH>Type</TH>
                <TH className="text-right">EMI</TH>
              </TR>
            </THead>
            <TBody>
              {loans.map((l) => (
                <TR key={l.id}>
                  <TD><Chip tone="navy">{l.type}</Chip></TD>
                  <TD className="text-sm font-medium text-navy">{l.lender}</TD>
                  <TD className="text-xs font-mono text-muted-foreground">{l.accountNo}</TD>
                  <TD className="text-sm">{memberName(l.borrowerId)}</TD>
                  <TD className="text-right text-sm tabular-nums">{l.principal ? formatUSD(l.principal) : '—'}</TD>
                  <TD className="text-right stat-num text-loss">{formatUSD(l.outstanding)}</TD>
                  <TD className="text-right text-sm tabular-nums">{l.rate.toFixed(2)}%</TD>
                  <TD><Chip tone={l.rateType === 'Fixed' ? 'gain' : 'gold'}>{l.rateType}</Chip></TD>
                  <TD className="text-right text-sm tabular-nums">
                    {l.type === 'Credit Card' ? '—' : formatUSD(l.emi)}
                    {l.type !== 'Credit Card' ? <div className="text-[11px] text-muted-foreground">Day {l.emiDate}</div> : null}
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
