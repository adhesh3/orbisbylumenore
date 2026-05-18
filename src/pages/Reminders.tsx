import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardBody, CardHeader, CardSub, CardTitle } from '@/components/ui/Card';
import { TBody, TD, TH, THead, TR, Table } from '@/components/ui/Table';
import { Chip } from '@/components/ui/Chip';
import { reminders } from '@/data/reminders';
import { memberName } from '@/data/family';
import { formatDate, formatUSD, daysUntil, cn } from '@/lib/utils';
import { Bell, CheckCircle2 } from 'lucide-react';

export function Reminders() {
  const sorted = [...reminders].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const dueWithin30 = sorted.filter((r) => daysUntil(r.dueDate) <= 30 && daysUntil(r.dueDate) >= 0).length;
  const overdue = sorted.filter((r) => r.status === 'Overdue' || daysUntil(r.dueDate) < 0).length;

  return (
    <div>
      <PageHeader
        title="Reminders & Alerts Center"
        description="Every time-sensitive financial obligation in one place."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader><CardTitle>Total Active</CardTitle></CardHeader>
          <CardBody>
            <div className="stat-num text-3xl text-navy">{sorted.length}</div>
            <CardSub>Across {new Set(sorted.map((r) => r.module)).size} modules</CardSub>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Due in 30 Days</CardTitle></CardHeader>
          <CardBody>
            <div className="stat-num text-3xl text-gold-600">{dueWithin30}</div>
            <CardSub>Includes EMIs, taxes, and renewals</CardSub>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Overdue</CardTitle></CardHeader>
          <CardBody>
            <div className="stat-num text-3xl text-gain">{overdue}</div>
            <CardSub>Excellent compliance posture</CardSub>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>All Reminders</CardTitle>
            <CardSub>Chronological view · upcoming first</CardSub>
          </div>
          <Bell size={16} className="text-muted-foreground" />
        </CardHeader>
        <CardBody className="pt-0">
          <Table>
            <THead>
              <TR>
                <TH>Title</TH><TH>Module</TH><TH>Member</TH>
                <TH>Due Date</TH>
                <TH className="text-right">Amount</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              {sorted.map((r) => {
                const d = daysUntil(r.dueDate);
                const urgency = d <= 0 ? 'loss' : d <= 7 ? 'gold' : 'info';
                return (
                  <TR key={r.id}>
                    <TD className="text-sm font-medium text-navy">{r.title}</TD>
                    <TD><Chip tone="neutral">{r.module}</Chip></TD>
                    <TD className="text-sm">{r.memberId ? memberName(r.memberId) : 'Family'}</TD>
                    <TD className="text-sm">
                      {formatDate(r.dueDate)}
                      <div className={cn('text-[11px]', urgency === 'loss' ? 'text-loss' : urgency === 'gold' ? 'text-gold-600' : 'text-muted-foreground')}>
                        {d <= 0 ? 'Due today / overdue' : `in ${d} days`}
                      </div>
                    </TD>
                    <TD className="text-right text-sm tabular-nums">{r.amount ? formatUSD(r.amount) : '—'}</TD>
                    <TD>
                      {r.status === 'Completed' ? (
                        <Chip tone="gain"><CheckCircle2 size={12} /> Completed</Chip>
                      ) : (
                        <Chip tone={urgency}>{r.status}</Chip>
                      )}
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
