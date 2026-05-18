import { Card, CardBody, CardHeader, CardSub, CardTitle } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { PageHeader } from '@/components/ui/PageHeader';
import { members } from '@/data/family';
import { totalNetWorth } from '@/data/networth';
import { Button } from '@/components/ui/Button';
import { Plus, Edit3, UserPlus } from 'lucide-react';
import { formatDate, formatUSD } from '@/lib/utils';

const shareByRelation: Record<string, number> = {
  Father: 0.62,
  Mother: 0.32,
  Self: 0.62,
  Spouse: 0.32,
  Child: 0.03,
};

export function Family() {
  return (
    <div>
      <PageHeader
        title="Family Members"
        description="Every transaction, asset and obligation in Orbis is tagged to a family member."
        actions={
          <>
            <Button variant="outline" size="sm"><UserPlus size={14} /> Add custom member</Button>
            <Button size="sm"><Plus size={14} /> Add member</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {members.map((m) => {
          const share = shareByRelation[m.relation] ?? 0.02;
          const indivNW = totalNetWorth * share;
          return (
            <Card key={m.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded-full text-white text-sm font-semibold inline-flex items-center justify-center"
                    style={{ background: m.color }}
                  >
                    {m.initials}
                  </div>
                  <div>
                    <div className="text-lg font-display text-navy">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.relation} · {m.role}</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon"><Edit3 size={14} /></Button>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Date of Birth</div>
                    <div className="text-sm text-navy">{formatDate(m.dob)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">SSN (masked)</div>
                    <div className="text-sm text-navy font-mono">{m.ssnMasked}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Tax Filing Status</div>
                    <div className="text-sm text-navy">{m.taxStatus}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Member ID</div>
                    <div className="text-sm text-navy font-mono">{m.shortId}</div>
                  </div>
                </div>
                <div className="hairline my-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Individual Net Worth</div>
                    <div className="stat-num text-xl text-navy">{formatUSD(indivNW, { compact: true })}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <Chip tone="navy">{(share * 100).toFixed(0)}% of family</Chip>
                    <CardSub>Nominee assignments configured</CardSub>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}

        {/* Add-member placeholder */}
        <Card className="border-dashed border-2 border-border bg-transparent shadow-none hover:bg-navy-50/40 transition-colors">
          <CardBody className="flex flex-col items-center justify-center text-center py-16">
            <div className="h-12 w-12 rounded-full bg-navy-50 flex items-center justify-center mb-3">
              <UserPlus size={20} className="text-navy" />
            </div>
            <CardTitle className="normal-case text-base tracking-normal text-navy">Add another family member</CardTitle>
            <CardSub className="mt-1 max-w-xs">
              Grandparents, dependents, or extended family — Orbis supports an unlimited family tree.
            </CardSub>
            <Button size="sm" variant="outline" className="mt-4">Add member</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
