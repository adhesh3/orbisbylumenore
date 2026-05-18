export type ExpenseCategory =
  | 'Household'
  | 'Insurance Premiums'
  | 'Clothing & Personal'
  | 'Vehicles'
  | 'Technology & Communication'
  | 'Travel & Entertainment'
  | 'Education'
  | 'Healthcare'
  | 'Charitable Giving'
  | 'Property Taxes & HOA'
  | 'Loan EMIs'
  | 'Miscellaneous';

export type Expense = {
  id: string;
  category: ExpenseCategory;
  subcategory: string;
  payee: string;
  monthlyAmount: number;
  annualAmount: number;
  paymentMethod: 'AMEX Centurion' | 'Chase Sapphire' | 'JPM Checking' | 'BoA Savings' | 'Auto-Debit';
  holderId: string;
};

export const expenses: Expense[] = [
  // Household
  { id: 'ex-1', category: 'Household', subcategory: 'Groceries (Whole Foods, Citarella)', payee: 'Various', monthlyAmount: 4_800, annualAmount: 57_600, paymentMethod: 'AMEX Centurion', holderId: 'm-eleanor' },
  { id: 'ex-2', category: 'Household', subcategory: 'Electricity (Eversource)', payee: 'Eversource Energy', monthlyAmount: 1_650, annualAmount: 19_800, paymentMethod: 'Auto-Debit', holderId: 'm-richard' },
  { id: 'ex-3', category: 'Household', subcategory: 'Water & Sewer', payee: 'Aquarion Water', monthlyAmount: 380, annualAmount: 4_560, paymentMethod: 'Auto-Debit', holderId: 'm-richard' },
  { id: 'ex-4', category: 'Household', subcategory: 'Internet & TV', payee: 'Optimum Fiber', monthlyAmount: 360, annualAmount: 4_320, paymentMethod: 'Auto-Debit', holderId: 'm-richard' },
  { id: 'ex-5', category: 'Household', subcategory: 'Domestic Staff (housekeeper, nanny, chef)', payee: 'Payroll', monthlyAmount: 18_500, annualAmount: 222_000, paymentMethod: 'JPM Checking', holderId: 'm-eleanor' },
  { id: 'ex-6', category: 'Household', subcategory: 'Landscaping & Pool Service', payee: 'Greenwich Landcare', monthlyAmount: 4_200, annualAmount: 50_400, paymentMethod: 'AMEX Centurion', holderId: 'm-richard' },

  // Insurance
  { id: 'ex-7', category: 'Insurance Premiums', subcategory: 'Health (Aetna PPO Family)', payee: 'Aetna', monthlyAmount: 2_840, annualAmount: 34_080, paymentMethod: 'Auto-Debit', holderId: 'm-richard' },
  { id: 'ex-8', category: 'Insurance Premiums', subcategory: 'Homeowners + Umbrella', payee: 'Chubb', monthlyAmount: 4_166, annualAmount: 49_992, paymentMethod: 'Auto-Debit', holderId: 'm-richard' },
  { id: 'ex-9', category: 'Insurance Premiums', subcategory: 'Auto (4 vehicles)', payee: 'Chubb / PURE', monthlyAmount: 1_780, annualAmount: 21_360, paymentMethod: 'Auto-Debit', holderId: 'm-richard' },
  { id: 'ex-10', category: 'Insurance Premiums', subcategory: 'Term Life (Richard, $10M)', payee: 'Northwestern Mutual', monthlyAmount: 1_240, annualAmount: 14_880, paymentMethod: 'Auto-Debit', holderId: 'm-richard' },
  { id: 'ex-11', category: 'Insurance Premiums', subcategory: 'Yacht Insurance', payee: 'Pantaenius', monthlyAmount: 3_200, annualAmount: 38_400, paymentMethod: 'Auto-Debit', holderId: 'm-richard' },

  // Clothing & Personal
  { id: 'ex-12', category: 'Clothing & Personal', subcategory: 'Clothing & Accessories', payee: 'Various luxury retailers', monthlyAmount: 5_500, annualAmount: 66_000, paymentMethod: 'AMEX Centurion', holderId: 'm-eleanor' },
  { id: 'ex-13', category: 'Clothing & Personal', subcategory: 'Personal Grooming & Spa', payee: 'Various', monthlyAmount: 2_400, annualAmount: 28_800, paymentMethod: 'AMEX Centurion', holderId: 'm-eleanor' },

  // Vehicles
  { id: 'ex-14', category: 'Vehicles', subcategory: 'Fuel & EV Charging', payee: 'Various', monthlyAmount: 1_350, annualAmount: 16_200, paymentMethod: 'Chase Sapphire', holderId: 'm-richard' },
  { id: 'ex-15', category: 'Vehicles', subcategory: 'Service & Repairs', payee: 'Authorized dealers', monthlyAmount: 1_800, annualAmount: 21_600, paymentMethod: 'AMEX Centurion', holderId: 'm-richard' },
  { id: 'ex-16', category: 'Vehicles', subcategory: 'Yacht — Marina, Crew, Fuel', payee: 'Newport Marina + Crew', monthlyAmount: 14_500, annualAmount: 174_000, paymentMethod: 'AMEX Centurion', holderId: 'm-richard' },

  // Technology & Communication
  { id: 'ex-17', category: 'Technology & Communication', subcategory: 'Cell Phones (family plan)', payee: 'Verizon', monthlyAmount: 480, annualAmount: 5_760, paymentMethod: 'Auto-Debit', holderId: 'm-richard' },
  { id: 'ex-18', category: 'Technology & Communication', subcategory: 'Software & Subscriptions', payee: 'Various SaaS', monthlyAmount: 620, annualAmount: 7_440, paymentMethod: 'AMEX Centurion', holderId: 'm-richard' },
  { id: 'ex-19', category: 'Technology & Communication', subcategory: 'Streaming (Netflix, HBO, Disney+, etc.)', payee: 'Various', monthlyAmount: 190, annualAmount: 2_280, paymentMethod: 'AMEX Centurion', holderId: 'm-eleanor' },

  // Travel & Entertainment
  { id: 'ex-20', category: 'Travel & Entertainment', subcategory: 'Air Travel (incl. NetJets card)', payee: 'NetJets / United Polaris', monthlyAmount: 22_000, annualAmount: 264_000, paymentMethod: 'AMEX Centurion', holderId: 'm-richard' },
  { id: 'ex-21', category: 'Travel & Entertainment', subcategory: 'Hotels & Lodging', payee: 'Aman, Four Seasons, Rosewood', monthlyAmount: 9_500, annualAmount: 114_000, paymentMethod: 'AMEX Centurion', holderId: 'm-eleanor' },
  { id: 'ex-22', category: 'Travel & Entertainment', subcategory: 'Restaurants & Dining', payee: 'Various', monthlyAmount: 6_400, annualAmount: 76_800, paymentMethod: 'AMEX Centurion', holderId: 'm-eleanor' },
  { id: 'ex-23', category: 'Travel & Entertainment', subcategory: 'Club Memberships (golf, country, wine)', payee: 'Various', monthlyAmount: 4_700, annualAmount: 56_400, paymentMethod: 'AMEX Centurion', holderId: 'm-richard' },

  // Education
  { id: 'ex-24', category: 'Education', subcategory: 'Stanford — James (Tuition + room/board)', payee: 'Stanford University', monthlyAmount: 7_750, annualAmount: 93_000, paymentMethod: 'JPM Checking', holderId: 'm-richard' },
  { id: 'ex-25', category: 'Education', subcategory: 'Greenwich Country Day — Sophia', payee: 'Greenwich Country Day School', monthlyAmount: 5_400, annualAmount: 64_800, paymentMethod: 'JPM Checking', holderId: 'm-eleanor' },
  { id: 'ex-26', category: 'Education', subcategory: 'Tutoring & Enrichment', payee: 'Various', monthlyAmount: 2_200, annualAmount: 26_400, paymentMethod: 'JPM Checking', holderId: 'm-eleanor' },

  // Healthcare (OOP)
  { id: 'ex-27', category: 'Healthcare', subcategory: 'Concierge medicine & specialists', payee: 'Mount Sinai Concierge', monthlyAmount: 1_650, annualAmount: 19_800, paymentMethod: 'AMEX Centurion', holderId: 'm-richard' },

  // Charitable Giving
  { id: 'ex-28', category: 'Charitable Giving', subcategory: 'Whitman Family Foundation (donor-advised fund)', payee: 'Fidelity Charitable', monthlyAmount: 12_500, annualAmount: 150_000, paymentMethod: 'BoA Savings', holderId: 'm-richard' },
  { id: 'ex-29', category: 'Charitable Giving', subcategory: 'Personal donations (alma maters, NGOs)', payee: 'Various', monthlyAmount: 3_750, annualAmount: 45_000, paymentMethod: 'AMEX Centurion', holderId: 'm-eleanor' },

  // Property Taxes & HOA
  { id: 'ex-30', category: 'Property Taxes & HOA', subcategory: 'Property Taxes (all properties)', payee: 'Various municipalities', monthlyAmount: 37_212, annualAmount: 446_540, paymentMethod: 'JPM Checking', holderId: 'm-richard' },
  { id: 'ex-31', category: 'Property Taxes & HOA', subcategory: 'HOA / Building Maintenance', payee: '432 Park Avenue Condo', monthlyAmount: 8_000, annualAmount: 96_000, paymentMethod: 'Auto-Debit', holderId: 'm-eleanor' },

  // Loan EMIs (auto debit)
  { id: 'ex-32', category: 'Loan EMIs', subcategory: 'Mortgage — Greenwich', payee: 'Wells Fargo', monthlyAmount: 10_876, annualAmount: 130_512, paymentMethod: 'Auto-Debit', holderId: 'm-richard' },
  { id: 'ex-33', category: 'Loan EMIs', subcategory: 'Mortgage — Aspen', payee: 'Bank of America', monthlyAmount: 26_580, annualAmount: 318_960, paymentMethod: 'Auto-Debit', holderId: 'm-richard' },
  { id: 'ex-34', category: 'Loan EMIs', subcategory: 'HELOC', payee: 'JPMorgan Chase', monthlyAmount: 1_932, annualAmount: 23_184, paymentMethod: 'Auto-Debit', holderId: 'm-richard' },
  { id: 'ex-35', category: 'Loan EMIs', subcategory: 'Securities-Backed Line', payee: 'Goldman Sachs', monthlyAmount: 3_073, annualAmount: 36_876, paymentMethod: 'Auto-Debit', holderId: 'm-richard' },
  { id: 'ex-36', category: 'Loan EMIs', subcategory: 'Auto Loan', payee: 'JPMorgan Chase', monthlyAmount: 2_741, annualAmount: 32_892, paymentMethod: 'Auto-Debit', holderId: 'm-eleanor' },
];

export const monthlyExpenseTotal = expenses.reduce((s, x) => s + x.monthlyAmount, 0);
export const annualExpenseTotal = expenses.reduce((s, x) => s + x.annualAmount, 0);
