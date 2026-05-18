export type BankAccount = {
  id: string;
  bank: string;
  branch: string;
  routing: string;
  accountMasked: string;
  type: 'Checking' | 'Savings' | 'CD' | 'Money Market' | 'Brokerage' | 'IRA' | '401(k)';
  holderId: string;
  joint?: string[];
  balance: number;
  apy?: number;
};

export const bankAccounts: BankAccount[] = [
  {
    id: 'ba-1',
    bank: 'JPMorgan Chase',
    branch: 'Greenwich Avenue, CT',
    routing: '021000021',
    accountMasked: '••••4127',
    type: 'Checking',
    holderId: 'm-richard',
    joint: ['m-eleanor'],
    balance: 184_500,
    apy: 0.01,
  },
  {
    id: 'ba-2',
    bank: 'Bank of America',
    branch: 'Stamford, CT',
    routing: '026009593',
    accountMasked: '••••8830',
    type: 'Savings',
    holderId: 'm-eleanor',
    joint: ['m-richard'],
    balance: 312_000,
    apy: 4.25,
  },
  {
    id: 'ba-3',
    bank: 'Goldman Sachs (Marcus)',
    branch: 'Online',
    routing: '124085244',
    accountMasked: '••••0019',
    type: 'Money Market',
    holderId: 'm-richard',
    balance: 850_000,
    apy: 4.6,
  },
  {
    id: 'ba-4',
    bank: 'Citibank',
    branch: 'New York, NY',
    routing: '021000089',
    accountMasked: '••••5563',
    type: 'CD',
    holderId: 'm-eleanor',
    balance: 500_000,
    apy: 5.1,
  },
  {
    id: 'ba-5',
    bank: 'Fidelity',
    branch: 'Westport, CT',
    routing: '101205681',
    accountMasked: '••••2240',
    type: 'Brokerage',
    holderId: 'm-richard',
    balance: 4_280_000,
  },
  {
    id: 'ba-6',
    bank: 'Charles Schwab',
    branch: 'San Francisco, CA',
    routing: '121202211',
    accountMasked: '••••6711',
    type: 'Brokerage',
    holderId: 'm-eleanor',
    balance: 2_140_000,
  },
  {
    id: 'ba-7',
    bank: 'Vanguard',
    branch: 'Online',
    routing: '051403164',
    accountMasked: '••••9082',
    type: 'IRA',
    holderId: 'm-richard',
    balance: 1_350_000,
  },
  {
    id: 'ba-8',
    bank: 'Fidelity',
    branch: 'Boston, MA',
    routing: '101205681',
    accountMasked: '••••3344',
    type: '401(k)',
    holderId: 'm-eleanor',
    balance: 1_820_000,
  },
  {
    id: 'ba-9',
    bank: 'First Republic Bank',
    branch: 'Greenwich, CT',
    routing: '321081669',
    accountMasked: '••••7741',
    type: 'Savings',
    holderId: 'm-richard',
    balance: 225_000,
    apy: 4.0,
  },
];
