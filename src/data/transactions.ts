export type Transaction = {
  id: string;
  date: string;
  description: string;
  category: 'Income' | 'Expense' | 'Transfer' | 'Investment';
  amount: number; // signed: positive = inflow, negative = outflow
  account: string;
  memberId: string;
};

export const recentTransactions: Transaction[] = [
  { id: 't-1', date: '2026-05-17', description: 'Hamptons house — May rent received', category: 'Income', amount: 85_000, account: 'JPMorgan Chase Checking', memberId: 'm-eleanor' },
  { id: 't-2', date: '2026-05-16', description: 'Vanguard VTSAX — SIP', category: 'Investment', amount: -5_000, account: 'JPMorgan Chase Checking', memberId: 'm-richard' },
  { id: 't-3', date: '2026-05-15', description: 'JPM HELOC EMI', category: 'Expense', amount: -1_932, account: 'JPMorgan Chase Checking', memberId: 'm-richard' },
  { id: 't-4', date: '2026-05-14', description: 'NVIDIA dividend', category: 'Income', amount: 180, account: 'Charles Schwab Brokerage', memberId: 'm-eleanor' },
  { id: 't-5', date: '2026-05-13', description: 'Aman Tokyo — Hotel stay', category: 'Expense', amount: -12_400, account: 'AMEX Centurion', memberId: 'm-eleanor' },
  { id: 't-6', date: '2026-05-12', description: 'Quantis Capital — Distribution', category: 'Income', amount: 50_000, account: 'JPMorgan Chase Checking', memberId: 'm-richard' },
  { id: 't-7', date: '2026-05-12', description: 'Stamford Office Building — May rent', category: 'Income', amount: 78_500, account: 'JPMorgan Chase Checking', memberId: 'm-richard' },
  { id: 't-8', date: '2026-05-10', description: 'BoA Mortgage EMI (Aspen)', category: 'Expense', amount: -26_580, account: 'Bank of America Savings', memberId: 'm-richard' },
  { id: 't-9', date: '2026-05-09', description: 'Whitman Family Foundation — Monthly grant', category: 'Expense', amount: -12_500, account: 'BoA Savings', memberId: 'm-richard' },
  { id: 't-10', date: '2026-05-05', description: 'Wells Fargo Mortgage EMI (Greenwich)', category: 'Expense', amount: -10_876, account: 'JPMorgan Chase Checking', memberId: 'm-richard' },
];
