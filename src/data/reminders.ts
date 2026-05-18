export type Reminder = {
  id: string;
  title: string;
  module: 'Banking' | 'Investments' | 'Loans' | 'Insurance' | 'Real Estate' | 'Taxes' | 'Vehicles';
  dueDate: string;
  leadTimeDays: 7 | 15 | 30 | 60;
  status: 'Upcoming' | 'Due Today' | 'Overdue' | 'Completed';
  amount?: number;
  memberId?: string;
  notes?: string;
};

// Anchored to May 18, 2026 — today's "demo today"
export const reminders: Reminder[] = [
  { id: 'rm-1', title: 'Wells Fargo Mortgage EMI (Greenwich)', module: 'Loans', dueDate: '2026-06-05', leadTimeDays: 7, status: 'Upcoming', amount: 10_876, memberId: 'm-richard' },
  { id: 'rm-2', title: 'BoA Mortgage EMI (Aspen)', module: 'Loans', dueDate: '2026-06-10', leadTimeDays: 7, status: 'Upcoming', amount: 26_580, memberId: 'm-richard' },
  { id: 'rm-3', title: 'Vanguard VTSAX SIP', module: 'Investments', dueDate: '2026-06-05', leadTimeDays: 7, status: 'Upcoming', amount: 5_000, memberId: 'm-richard' },
  { id: 'rm-4', title: 'Federal Quarterly Estimated Tax — Q2', module: 'Taxes', dueDate: '2026-06-15', leadTimeDays: 30, status: 'Upcoming', amount: 285_000, memberId: 'm-richard' },
  { id: 'rm-5', title: 'Connecticut Muni Bond — Coupon credit', module: 'Investments', dueDate: '2026-07-01', leadTimeDays: 15, status: 'Upcoming', amount: 4_375, memberId: 'm-eleanor' },
  { id: 'rm-6', title: 'AMEX Centurion — Statement due', module: 'Banking', dueDate: '2026-05-25', leadTimeDays: 7, status: 'Upcoming', amount: 18_400, memberId: 'm-richard' },
  { id: 'rm-7', title: 'Chubb Auto Insurance — Quarterly premium', module: 'Insurance', dueDate: '2026-06-15', leadTimeDays: 15, status: 'Upcoming', amount: 5_340, memberId: 'm-richard' },
  { id: 'rm-8', title: 'Greenwich Property Tax — Q2', module: 'Real Estate', dueDate: '2026-07-01', leadTimeDays: 30, status: 'Upcoming', amount: 14_600, memberId: 'm-richard' },
  { id: 'rm-9', title: 'Range Rover Service Due', module: 'Vehicles', dueDate: '2026-06-20', leadTimeDays: 15, status: 'Upcoming', memberId: 'm-richard' },
  { id: 'rm-10', title: 'Capital One CD Maturity', module: 'Investments', dueDate: '2026-08-01', leadTimeDays: 30, status: 'Upcoming', amount: 259_625, memberId: 'm-richard' },
  { id: 'rm-11', title: 'Northwestern Mutual Term Life — Annual review', module: 'Insurance', dueDate: '2026-05-20', leadTimeDays: 7, status: 'Due Today', memberId: 'm-richard' },
  { id: 'rm-12', title: 'Portfolio Rebalancing Review (Q2)', module: 'Investments', dueDate: '2026-06-30', leadTimeDays: 15, status: 'Upcoming', memberId: 'm-richard' },
];
