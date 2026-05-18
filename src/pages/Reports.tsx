import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardBody, CardHeader, CardSub, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { FileText, Download, Calendar } from 'lucide-react';

const REPORTS = [
  { id: 1, title: 'Family Net Worth Statement', desc: 'Snapshot as of selected date — assets, liabilities, and per-member share.', last: 'May 17, 2026' },
  { id: 2, title: 'Annual Income Summary', desc: 'All income streams across all members, by category.', last: 'Apr 30, 2026' },
  { id: 3, title: 'Annual Expense Report', desc: 'Categorized, member-wise expenses with credit-card breakdown.', last: 'Apr 30, 2026' },
  { id: 4, title: 'Investment Portfolio Report', desc: 'All holdings with XIRR, market value, and unrealized gains.', last: 'May 15, 2026' },
  { id: 5, title: 'Asset Register', desc: 'Complete list of real estate, vehicles, jewellery, art, and collectibles.', last: 'May 10, 2026' },
  { id: 6, title: 'Loan / Liability Summary', desc: 'Outstanding balances, EMI schedule, debt-to-asset ratio.', last: 'May 12, 2026' },
  { id: 7, title: 'Insurance Portfolio', desc: 'All policies, coverage, premiums, and upcoming renewals.', last: 'May 02, 2026' },
  { id: 8, title: 'Capital Gains Statement', desc: 'STCG / LTCG report for IRS Schedule D filing.', last: 'Apr 15, 2026' },
  { id: 9, title: 'Education Expense Report', desc: 'Per-child education spend and projected costs.', last: 'May 05, 2026' },
  { id: 10, title: 'Cash Flow Statement', desc: 'Monthly income vs. outflow for the selected period.', last: 'May 15, 2026' },
  { id: 11, title: 'Reminder / Compliance Calendar', desc: 'Upcoming tax, EMI, premium, and renewal obligations.', last: 'May 16, 2026' },
];

export function Reports() {
  return (
    <div>
      <PageHeader
        title="Reports"
        description="Generate and download comprehensive financial reports — PDF or Excel."
        actions={
          <div className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-white text-xs text-navy">
            <Calendar size={14} /> Period: <span className="font-semibold">YTD 2026</span>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {REPORTS.map((r) => (
          <Card key={r.id}>
            <CardBody>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="h-10 w-10 rounded-md bg-navy-50 flex items-center justify-center text-navy">
                  <FileText size={18} />
                </div>
                <Chip tone="neutral">#{r.id}</Chip>
              </div>
              <div className="font-display text-lg text-navy">{r.title}</div>
              <CardSub className="mt-1 min-h-[40px]">{r.desc}</CardSub>
              <div className="hairline my-3" />
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Last generated {r.last}</div>
                <div className="flex items-center gap-1.5">
                  <Button size="sm" variant="outline"><Download size={14} /> PDF</Button>
                  <Button size="sm" variant="ghost"><Download size={14} /> Excel</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
