export type Loan = {
  id: string;
  type:
    | 'Mortgage'
    | 'HELOC'
    | 'Auto Loan'
    | 'Personal Loan'
    | 'Business Loan'
    | 'Securities-Backed Line'
    | 'Margin Loan'
    | 'Credit Card';
  lender: string;
  accountNo: string;
  principal: number;
  outstanding: number;
  rate: number;
  rateType: 'Fixed' | 'Variable';
  tenureMonths: number;
  emi: number;
  emiDate: number;
  startDate: string;
  linkedAssetId?: string;
  borrowerId: string;
};

export const loans: Loan[] = [
  {
    id: 'ln-1',
    type: 'Mortgage',
    lender: 'Wells Fargo',
    accountNo: 'WF-MTG-218840',
    principal: 2_500_000,
    outstanding: 1_840_500,
    rate: 3.25,
    rateType: 'Fixed',
    tenureMonths: 360,
    emi: 10_876,
    emiDate: 5,
    startDate: '2014-07-01',
    linkedAssetId: 'p-1',
    borrowerId: 'm-richard',
  },
  {
    id: 'ln-2',
    type: 'Mortgage',
    lender: 'Bank of America',
    accountNo: 'BOA-MTG-553201',
    principal: 4_500_000,
    outstanding: 3_820_000,
    rate: 5.85,
    rateType: 'Fixed',
    tenureMonths: 360,
    emi: 26_580,
    emiDate: 10,
    startDate: '2020-01-01',
    linkedAssetId: 'p-3',
    borrowerId: 'm-richard',
  },
  {
    id: 'ln-3',
    type: 'HELOC',
    lender: 'JPMorgan Chase',
    accountNo: 'JPM-HELOC-30142',
    principal: 750_000,
    outstanding: 240_000,
    rate: 7.5,
    rateType: 'Variable',
    tenureMonths: 240,
    emi: 1_932,
    emiDate: 15,
    startDate: '2022-04-15',
    linkedAssetId: 'p-1',
    borrowerId: 'm-richard',
  },
  {
    id: 'ln-4',
    type: 'Securities-Backed Line',
    lender: 'Goldman Sachs Private Wealth',
    accountNo: 'GS-PB-99201',
    principal: 1_500_000,
    outstanding: 620_000,
    rate: 5.95,
    rateType: 'Variable',
    tenureMonths: 60,
    emi: 3_073,
    emiDate: 20,
    startDate: '2023-09-01',
    borrowerId: 'm-richard',
  },
  {
    id: 'ln-5',
    type: 'Auto Loan',
    lender: 'JPMorgan Chase',
    accountNo: 'JPM-AUTO-77103',
    principal: 140_000,
    outstanding: 86_500,
    rate: 6.5,
    rateType: 'Fixed',
    tenureMonths: 60,
    emi: 2_741,
    emiDate: 12,
    startDate: '2023-04-22',
    linkedAssetId: 'v-2',
    borrowerId: 'm-eleanor',
  },
  {
    id: 'ln-6',
    type: 'Credit Card',
    lender: 'American Express Centurion',
    accountNo: 'AMEX-CENT-••0058',
    principal: 0,
    outstanding: 18_400,
    rate: 22.99,
    rateType: 'Variable',
    tenureMonths: 0,
    emi: 18_400,
    emiDate: 25,
    startDate: '2010-05-01',
    borrowerId: 'm-richard',
  },
];

export const liabilitiesTotal = loans.reduce((s, l) => s + l.outstanding, 0);
export const monthlyEmiTotal = loans.reduce((s, l) => s + (l.type === 'Credit Card' ? 0 : l.emi), 0);
