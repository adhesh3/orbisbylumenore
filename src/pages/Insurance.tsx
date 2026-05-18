import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardBody, CardHeader, CardSub, CardTitle } from '@/components/ui/Card';
import { TBody, TD, TH, THead, TR, Table } from '@/components/ui/Table';
import { Chip } from '@/components/ui/Chip';
import { insurancePolicies, totalCoverage, annualPremiumTotal } from '@/data/insurance';
import { memberName } from '@/data/family';
import { formatDate, formatUSD, daysUntil } from '@/lib/utils';

export function Insurance() {
  return (
    <div>
      <PageHeader
        title="Insurance"
        description="A consolidated view of all policies across the family."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader><CardTitle>Total Coverage</CardTitle></CardHeader>
          <CardBody>
            <div className="stat-num text-3xl text-navy">{formatUSD(totalCoverage, { compact: true })}</div>
            <CardSub>{insurancePolicies.length} policies across the family</CardSub>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Annual Premium</CardTitle></CardHeader>
          <CardBody>
            <div className="stat-num text-3xl text-navy">{formatUSD(annualPremiumTotal, { compact: true })}</div>
            <CardSub>Across health, life, property, and liability</CardSub>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Coverage Gap (Life)</CardTitle></CardHeader>
          <CardBody>
            <div className="stat-num text-3xl text-gain">Adequate</div>
            <CardSub>10× income on primary earner ✓</CardSub>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader><div><CardTitle>All Policies</CardTitle><CardSub>Sorted by renewal date</CardSub></div></CardHeader>
        <CardBody className="pt-0">
          <Table>
            <THead>
              <TR>
                <TH>Policy</TH><TH>Type</TH><TH>Insurer</TH><TH>Insured</TH>
                <TH className="text-right">Coverage</TH>
                <TH className="text-right">Premium</TH>
                <TH>Renewal</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              {[...insurancePolicies]
                .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime())
                .map((p) => {
                  const d = daysUntil(p.renewalDate);
                  return (
                    <TR key={p.id}>
                      <TD>
                        <div className="text-sm font-medium text-navy">{p.policyName}</div>
                        <div className="text-[11px] text-muted-foreground font-mono">{p.policyNumber}</div>
                      </TD>
                      <TD><Chip tone="navy">{p.type}</Chip></TD>
                      <TD className="text-sm">{p.insurer}</TD>
                      <TD className="text-sm">{memberName(p.insuredId)}</TD>
                      <TD className="text-right stat-num text-navy">{formatUSD(p.sumAssured, { compact: true })}</TD>
                      <TD className="text-right text-sm tabular-nums">
                        {formatUSD(p.premiumAnnual)}<div className="text-[11px] text-muted-foreground">{p.premiumFrequency}</div>
                      </TD>
                      <TD className="text-sm">{formatDate(p.renewalDate)}</TD>
                      <TD>
                        <Chip tone={d < 30 ? 'loss' : d < 90 ? 'gold' : 'gain'}>
                          {d < 0 ? `${Math.abs(d)}d overdue` : `in ${d}d`}
                        </Chip>
                      </TD>
                    </TR>
                  );
                })}
            </TBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
