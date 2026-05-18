import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardBody, CardHeader, CardSub, CardTitle } from '@/components/ui/Card';
import { TBody, TD, TH, THead, TR, Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { bankAccounts } from '@/data/banks';
import { memberName } from '@/data/family';
import { formatUSD } from '@/lib/utils';
import { Plus, Building2, Download } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const PIE_COLORS = ['#1B2A4A', '#C9A84C', '#2E7D52', '#5C72A1', '#A88934', '#7E6627', '#33487A'];

export function Banks() {
  const totalBalance = bankAccounts.reduce((s, b) => s + b.balance, 0);
  const byBank = Object.entries(
    bankAccounts.reduce<Record<string, number>>((acc, b) => {
      acc[b.bank] = (acc[b.bank] ?? 0) + b.balance;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  return (
    <div>
      <PageHeader
        title="Banks & Accounts"
        description="All your bank relationships, brokerages, and retirement accounts in one place."
        actions={
          <>
            <Button variant="outline" size="sm"><Download size={14} /> Export</Button>
            <Button size="sm"><Plus size={14} /> Add account</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader><CardTitle>Consolidated Balance</CardTitle></CardHeader>
          <CardBody>
            <div className="stat-num text-3xl text-navy">{formatUSD(totalBalance, { compact: true })}</div>
            <CardSub>Across {bankAccounts.length} accounts at {byBank.length} institutions</CardSub>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Distribution by Institution</CardTitle>
              <CardSub>Where the family's money sits</CardSub>
            </div>
          </CardHeader>
          <CardBody>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byBank} dataKey="value" cx="50%" cy="50%" innerRadius={42} outerRadius={68} paddingAngle={1} stroke="#fff" strokeWidth={2}>
                    {byBank.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => formatUSD(v, { compact: true })} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>All Accounts</CardTitle>
            <CardSub>Sorted by balance · click any row to drill in</CardSub>
          </div>
        </CardHeader>
        <CardBody className="pt-0">
          <Table>
            <THead>
              <TR>
                <TH>Institution</TH>
                <TH>Type</TH>
                <TH>Holder</TH>
                <TH>Account</TH>
                <TH className="text-right">APY</TH>
                <TH className="text-right">Balance</TH>
              </TR>
            </THead>
            <TBody>
              {[...bankAccounts]
                .sort((a, b) => b.balance - a.balance)
                .map((b) => (
                  <TR key={b.id}>
                    <TD>
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded bg-navy-50 flex items-center justify-center text-navy">
                          <Building2 size={14} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-navy">{b.bank}</div>
                          <div className="text-[11px] text-muted-foreground">{b.branch}</div>
                        </div>
                      </div>
                    </TD>
                    <TD><Chip tone="neutral">{b.type}</Chip></TD>
                    <TD className="text-sm text-navy">
                      {memberName(b.holderId)}
                      {b.joint?.length ? (
                        <div className="text-[11px] text-muted-foreground">Joint with {b.joint.map(memberName).join(', ')}</div>
                      ) : null}
                    </TD>
                    <TD className="text-sm font-mono text-muted-foreground">{b.accountMasked}</TD>
                    <TD className="text-right text-sm text-navy tabular-nums">{b.apy ? `${b.apy.toFixed(2)}%` : '—'}</TD>
                    <TD className="text-right stat-num text-navy">{formatUSD(b.balance)}</TD>
                  </TR>
                ))}
            </TBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
