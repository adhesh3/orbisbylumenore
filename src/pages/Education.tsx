import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardBody, CardHeader, CardSub, CardTitle } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { educationProfiles } from '@/data/education';
import { memberById } from '@/data/family';
import { formatUSD } from '@/lib/utils';

export function Education() {
  return (
    <div>
      <PageHeader
        title="Education Tracker"
        description="Track education expenses and funding for each child or family member."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {educationProfiles.map((e) => {
          const member = memberById(e.memberId);
          const fundedPct = (e.fundEarmarked / e.goalTotal) * 100;
          const annualTotal = e.annualTuition + e.annualRoomBoard + e.annualOther;
          return (
            <Card key={e.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div
                    className="h-11 w-11 rounded-full text-white text-sm font-semibold inline-flex items-center justify-center"
                    style={{ background: member?.color }}
                  >
                    {member?.initials}
                  </div>
                  <div>
                    <div className="text-base font-display text-navy">{member?.name}</div>
                    <div className="text-xs text-muted-foreground">{e.institution} · {e.city}, {e.state}</div>
                  </div>
                </div>
                <Chip tone="navy">{e.level}</Chip>
              </CardHeader>
              <CardBody>
                {e.major ? <div className="text-sm text-muted-foreground mb-3">{e.major} · Expected graduation {e.expectedGradYear}</div> : <div className="text-sm text-muted-foreground mb-3">Expected graduation {e.expectedGradYear}</div>}

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Tuition</div>
                    <div className="stat-num text-sm text-navy">{formatUSD(e.annualTuition)}<span className="text-xs text-muted-foreground">/yr</span></div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Room & Board</div>
                    <div className="stat-num text-sm text-navy">{e.annualRoomBoard ? formatUSD(e.annualRoomBoard) : '—'}{e.annualRoomBoard ? <span className="text-xs text-muted-foreground">/yr</span> : null}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Other</div>
                    <div className="stat-num text-sm text-navy">{formatUSD(e.annualOther)}<span className="text-xs text-muted-foreground">/yr</span></div>
                  </div>
                </div>

                <div className="rounded-md bg-navy-50/60 p-3 grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Annual Cost</div>
                    <div className="stat-num text-base text-navy">{formatUSD(annualTotal)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Spent to Date</div>
                    <div className="stat-num text-base text-navy">{formatUSD(e.spentToDate)}</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Education fund earmarked</span>
                    <span className="tabular-nums text-navy font-medium">
                      {formatUSD(e.fundEarmarked)} / {formatUSD(e.goalTotal)}
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-navy-50 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold to-gold-300"
                      style={{ width: `${fundedPct}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">{fundedPct.toFixed(0)}% funded</div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
