export type IncomeSource = {
  id: string;
  category: 'Employment' | 'Business' | 'Rental' | 'Interest' | 'Dividend' | 'Capital Gains' | 'Other';
  source: string;
  description?: string;
  amountMonthly: number; // averaged monthly
  amountAnnual: number;
  holderId: string;
};

export const incomeSources: IncomeSource[] = [
  // Employment income
  { id: 'inc-1', category: 'Employment', source: 'Quantis Capital Partners — Salary', description: 'Managing Partner base salary', amountMonthly: 58_333, amountAnnual: 700_000, holderId: 'm-richard' },
  { id: 'inc-2', category: 'Employment', source: 'Quantis Capital Partners — Bonus', description: 'Annual performance bonus (paid March)', amountMonthly: 41_667, amountAnnual: 500_000, holderId: 'm-richard' },
  { id: 'inc-3', category: 'Employment', source: 'Whitman Design Studio — Salary', description: 'Founder salary', amountMonthly: 25_000, amountAnnual: 300_000, holderId: 'm-eleanor' },

  // Business income
  { id: 'inc-4', category: 'Business', source: 'Quantis Capital — Distribution', description: 'Carried interest distributions', amountMonthly: 50_000, amountAnnual: 600_000, holderId: 'm-richard' },
  { id: 'inc-5', category: 'Business', source: 'Whitman Design Studio — Profit Share', amountMonthly: 16_667, amountAnnual: 200_000, holderId: 'm-eleanor' },

  // Rental income
  { id: 'inc-6', category: 'Rental', source: 'Hamptons Summer House', amountMonthly: 85_000, amountAnnual: 1_020_000, holderId: 'm-eleanor' },
  { id: 'inc-7', category: 'Rental', source: 'Stamford Commercial Building', amountMonthly: 78_500, amountAnnual: 942_000, holderId: 'm-richard' },

  // Interest income
  { id: 'inc-8', category: 'Interest', source: 'CDs (Citibank, Capital One, Ally)', amountMonthly: 3_868, amountAnnual: 46_415, holderId: 'm-richard' },
  { id: 'inc-9', category: 'Interest', source: 'Money Market & High-Yield Savings', amountMonthly: 4_750, amountAnnual: 57_000, holderId: 'm-richard' },
  { id: 'inc-10', category: 'Interest', source: 'Bond Coupons (Treasury / Muni / Corp)', amountMonthly: 3_980, amountAnnual: 47_758, holderId: 'm-richard' },

  // Dividend income
  { id: 'inc-11', category: 'Dividend', source: 'Stock Portfolio Dividends', amountMonthly: 8_400, amountAnnual: 100_800, holderId: 'm-richard' },
  { id: 'inc-12', category: 'Dividend', source: 'REIT Distributions (O, PLD, VNQ)', amountMonthly: 4_580, amountAnnual: 54_960, holderId: 'm-richard' },

  // Other
  { id: 'inc-13', category: 'Other', source: 'Board Director Fees — Mosaic Board', amountMonthly: 6_250, amountAnnual: 75_000, holderId: 'm-richard' },
];

export const annualIncomeTotal = incomeSources.reduce((s, x) => s + x.amountAnnual, 0);
export const monthlyIncomeTotal = incomeSources.reduce((s, x) => s + x.amountMonthly, 0);
