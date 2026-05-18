// All amounts in USD. US-listed funds / NYSE / NASDAQ tickers only.

export type CD = {
  id: string;
  bank: string;
  certificateNo: string;
  principal: number;
  apy: number;
  termMonths: number;
  startDate: string;
  maturityDate: string;
  currentValue: number;
  interestEarned: number;
  autoRenew: boolean;
  holderId: string;
};

export const cds: CD[] = [
  {
    id: 'cd-1',
    bank: 'Citibank',
    certificateNo: 'CIT-CD-44012',
    principal: 500_000,
    apy: 5.1,
    termMonths: 24,
    startDate: '2025-02-15',
    maturityDate: '2027-02-15',
    currentValue: 532_750,
    interestEarned: 32_750,
    autoRenew: false,
    holderId: 'm-eleanor',
  },
  {
    id: 'cd-2',
    bank: 'Capital One',
    certificateNo: 'COF-CD-78821',
    principal: 250_000,
    apy: 4.85,
    termMonths: 12,
    startDate: '2025-08-01',
    maturityDate: '2026-08-01',
    currentValue: 259_625,
    interestEarned: 9_625,
    autoRenew: true,
    holderId: 'm-richard',
  },
  {
    id: 'cd-3',
    bank: 'Ally Bank',
    certificateNo: 'ALLY-CD-30012',
    principal: 150_000,
    apy: 4.6,
    termMonths: 18,
    startDate: '2025-11-10',
    maturityDate: '2027-05-10',
    currentValue: 154_140,
    interestEarned: 4_140,
    autoRenew: false,
    holderId: 'm-richard',
  },
];

export type MutualFund = {
  id: string;
  fund: string;
  ticker: string;
  amc: string;
  category: 'Equity' | 'Bond' | 'Hybrid' | 'Index' | 'International' | 'Money Market';
  units: number;
  nav: number;
  avgCostNav: number;
  invested: number;
  currentValue: number;
  type: 'SIP' | 'Lumpsum';
  sipAmount?: number;
  sipDay?: number;
  holderId: string;
  xirr: number;
};

export const mutualFunds: MutualFund[] = [
  {
    id: 'mf-1',
    fund: 'Vanguard Total Stock Market Index',
    ticker: 'VTSAX',
    amc: 'Vanguard',
    category: 'Index',
    units: 2_840.21,
    nav: 142.18,
    avgCostNav: 108.40,
    invested: 308_017,
    currentValue: 403_855,
    type: 'SIP',
    sipAmount: 5_000,
    sipDay: 5,
    holderId: 'm-richard',
    xirr: 14.2,
  },
  {
    id: 'mf-2',
    fund: 'Fidelity 500 Index',
    ticker: 'FXAIX',
    amc: 'Fidelity',
    category: 'Index',
    units: 1_910.55,
    nav: 188.46,
    avgCostNav: 142.20,
    invested: 271_679,
    currentValue: 360_023,
    type: 'Lumpsum',
    holderId: 'm-eleanor',
    xirr: 13.6,
  },
  {
    id: 'mf-3',
    fund: 'Vanguard Total Bond Market Index',
    ticker: 'VBTLX',
    amc: 'Vanguard',
    category: 'Bond',
    units: 12_300.0,
    nav: 9.62,
    avgCostNav: 9.85,
    invested: 121_155,
    currentValue: 118_326,
    type: 'Lumpsum',
    holderId: 'm-richard',
    xirr: -0.9,
  },
  {
    id: 'mf-4',
    fund: 'Vanguard Total International Stock',
    ticker: 'VTIAX',
    amc: 'Vanguard',
    category: 'International',
    units: 4_120.0,
    nav: 33.48,
    avgCostNav: 28.90,
    invested: 119_068,
    currentValue: 137_938,
    type: 'SIP',
    sipAmount: 2_500,
    sipDay: 15,
    holderId: 'm-eleanor',
    xirr: 7.4,
  },
  {
    id: 'mf-5',
    fund: 'Fidelity Contrafund',
    ticker: 'FCNTX',
    amc: 'Fidelity',
    category: 'Equity',
    units: 9_840.0,
    nav: 19.42,
    avgCostNav: 14.80,
    invested: 145_632,
    currentValue: 191_093,
    type: 'Lumpsum',
    holderId: 'm-richard',
    xirr: 12.1,
  },
];

export type Stock = {
  id: string;
  name: string;
  ticker: string;
  exchange: 'NYSE' | 'NASDAQ';
  qty: number;
  avgBuyPrice: number;
  currentPrice: number;
  buyDate: string;
  broker: string;
  holderId: string;
};

export const publicStocks: Stock[] = [
  { id: 's-1', name: 'Apple Inc.', ticker: 'AAPL', exchange: 'NASDAQ', qty: 2_500, avgBuyPrice: 142.30, currentPrice: 224.18, buyDate: '2022-04-12', broker: 'Fidelity', holderId: 'm-richard' },
  { id: 's-2', name: 'Microsoft Corp.', ticker: 'MSFT', exchange: 'NASDAQ', qty: 1_400, avgBuyPrice: 248.55, currentPrice: 432.20, buyDate: '2021-09-21', broker: 'Fidelity', holderId: 'm-richard' },
  { id: 's-3', name: 'NVIDIA Corp.', ticker: 'NVDA', exchange: 'NASDAQ', qty: 1_800, avgBuyPrice: 64.10, currentPrice: 138.45, buyDate: '2023-02-08', broker: 'Charles Schwab', holderId: 'm-eleanor' },
  { id: 's-4', name: 'Berkshire Hathaway B', ticker: 'BRK.B', exchange: 'NYSE', qty: 600, avgBuyPrice: 285.40, currentPrice: 458.92, buyDate: '2020-11-04', broker: 'Charles Schwab', holderId: 'm-eleanor' },
  { id: 's-5', name: 'JPMorgan Chase', ticker: 'JPM', exchange: 'NYSE', qty: 900, avgBuyPrice: 138.70, currentPrice: 218.40, buyDate: '2022-08-18', broker: 'Fidelity', holderId: 'm-richard' },
  { id: 's-6', name: 'Amazon.com', ticker: 'AMZN', exchange: 'NASDAQ', qty: 1_200, avgBuyPrice: 124.80, currentPrice: 197.65, buyDate: '2023-01-12', broker: 'Charles Schwab', holderId: 'm-eleanor' },
  { id: 's-7', name: 'Eli Lilly & Co.', ticker: 'LLY', exchange: 'NYSE', qty: 250, avgBuyPrice: 412.50, currentPrice: 798.10, buyDate: '2023-06-02', broker: 'Fidelity', holderId: 'm-richard' },
  { id: 's-8', name: 'Costco Wholesale', ticker: 'COST', exchange: 'NASDAQ', qty: 320, avgBuyPrice: 514.20, currentPrice: 902.40, buyDate: '2022-12-15', broker: 'Charles Schwab', holderId: 'm-eleanor' },
];

export type PrivateStock = {
  id: string;
  company: string;
  sector: string;
  qty: number;
  purchasePrice: number;
  currentValuationPrice: number;
  investmentDate: string;
  vehicle: 'ESOP' | 'Pre-IPO' | 'Direct';
  vesting?: { cliffMonths: number; periodMonths: number; vested: number; total: number };
  holderId: string;
};

export const privateStocks: PrivateStock[] = [
  {
    id: 'ps-1',
    company: 'Stripe, Inc.',
    sector: 'Fintech',
    qty: 8_500,
    purchasePrice: 22.50,
    currentValuationPrice: 28.20,
    investmentDate: '2022-03-10',
    vehicle: 'Pre-IPO',
    holderId: 'm-richard',
  },
  {
    id: 'ps-2',
    company: 'SpaceX',
    sector: 'Aerospace',
    qty: 1_200,
    purchasePrice: 75.00,
    currentValuationPrice: 178.40,
    investmentDate: '2021-11-18',
    vehicle: 'Pre-IPO',
    holderId: 'm-eleanor',
  },
];

export type VCInvestment = {
  id: string;
  startup: string;
  sector: string;
  stage: 'Pre-seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C' | 'Growth';
  vehicle: 'Direct' | 'SPV' | 'Fund';
  invested: number;
  date: string;
  currentValue: number;
  status: 'Active' | 'Exited' | 'Written off';
  holderId: string;
};

export const vcInvestments: VCInvestment[] = [
  { id: 'vc-1', startup: 'Anthropic', sector: 'AI', stage: 'Series C', vehicle: 'SPV', invested: 250_000, date: '2023-05-20', currentValue: 620_000, status: 'Active', holderId: 'm-richard' },
  { id: 'vc-2', startup: 'Cursor', sector: 'Developer Tools', stage: 'Series A', vehicle: 'SPV', invested: 100_000, date: '2024-01-15', currentValue: 285_000, status: 'Active', holderId: 'm-richard' },
  { id: 'vc-3', startup: 'Brex', sector: 'Fintech', stage: 'Growth', vehicle: 'Direct', invested: 175_000, date: '2021-09-10', currentValue: 210_000, status: 'Active', holderId: 'm-eleanor' },
  { id: 'vc-4', startup: 'Mosaic Materials', sector: 'CleanTech', stage: 'Seed', vehicle: 'Fund', invested: 75_000, date: '2020-11-05', currentValue: 0, status: 'Written off', holderId: 'm-richard' },
  { id: 'vc-5', startup: 'Ramp', sector: 'Fintech', stage: 'Series B', vehicle: 'SPV', invested: 150_000, date: '2022-06-12', currentValue: 365_000, status: 'Active', holderId: 'm-eleanor' },
];

export type Bond = {
  id: string;
  name: string;
  type: 'US Treasury' | 'Municipal' | 'Corporate' | 'TIPS' | 'Agency';
  cusip: string;
  faceValue: number;
  purchasePrice: number;
  coupon: number;
  paymentFreq: 'Semi-annual' | 'Annual' | 'Quarterly';
  nextInterestDate: string;
  maturityDate: string;
  currentMarketValue: number;
  holderId: string;
};

export const bonds: Bond[] = [
  { id: 'b-1', name: 'US Treasury 10Y Note', type: 'US Treasury', cusip: '91282CGV8', faceValue: 500_000, purchasePrice: 482_500, coupon: 4.25, paymentFreq: 'Semi-annual', nextInterestDate: '2026-08-15', maturityDate: '2033-08-15', currentMarketValue: 495_900, holderId: 'm-richard' },
  { id: 'b-2', name: 'Connecticut GO Muni Bond', type: 'Municipal', cusip: '20772JTU3', faceValue: 250_000, purchasePrice: 250_000, coupon: 3.50, paymentFreq: 'Semi-annual', nextInterestDate: '2026-07-01', maturityDate: '2030-07-01', currentMarketValue: 254_750, holderId: 'm-eleanor' },
  { id: 'b-3', name: 'Apple Inc. Corporate Bond', type: 'Corporate', cusip: '037833DL1', faceValue: 200_000, purchasePrice: 197_400, coupon: 4.85, paymentFreq: 'Semi-annual', nextInterestDate: '2026-06-30', maturityDate: '2032-06-30', currentMarketValue: 203_100, holderId: 'm-richard' },
  { id: 'b-4', name: 'TIPS 5Y', type: 'TIPS', cusip: '91282CKD4', faceValue: 150_000, purchasePrice: 150_000, coupon: 2.00, paymentFreq: 'Semi-annual', nextInterestDate: '2026-10-15', maturityDate: '2030-10-15', currentMarketValue: 152_300, holderId: 'm-eleanor' },
];

export type Gold = {
  id: string;
  type: 'Physical Gold' | 'Gold ETF' | 'Silver ETF' | 'Digital Gold';
  ticker?: string;
  qty: number;
  unit: 'oz' | 'shares';
  avgCost: number;
  currentPrice: number;
  location?: string;
  holderId: string;
};

export const preciousMetals: Gold[] = [
  { id: 'g-1', type: 'Physical Gold', qty: 250, unit: 'oz', avgCost: 1_640, currentPrice: 2_640, location: 'Home Safe + Bank Vault', holderId: 'm-richard' },
  { id: 'g-2', type: 'Gold ETF', ticker: 'GLD', qty: 600, unit: 'shares', avgCost: 178, currentPrice: 246, holderId: 'm-eleanor' },
  { id: 'g-3', type: 'Silver ETF', ticker: 'SLV', qty: 1_800, unit: 'shares', avgCost: 19.80, currentPrice: 28.40, holderId: 'm-richard' },
];

export type REIT = {
  id: string;
  trust: string;
  ticker: string;
  units: number;
  purchaseNav: number;
  currentNav: number;
  distributionYield: number;
  holderId: string;
};

export const reits: REIT[] = [
  { id: 'r-1', trust: 'Realty Income Corp.', ticker: 'O', units: 3_500, purchaseNav: 58.40, currentNav: 56.10, distributionYield: 5.6, holderId: 'm-richard' },
  { id: 'r-2', trust: 'Prologis, Inc.', ticker: 'PLD', units: 1_200, purchaseNav: 102.20, currentNav: 121.30, distributionYield: 3.2, holderId: 'm-eleanor' },
  { id: 'r-3', trust: 'Vanguard Real Estate ETF', ticker: 'VNQ', units: 2_400, purchaseNav: 84.10, currentNav: 92.80, distributionYield: 4.1, holderId: 'm-richard' },
];

export type RetirementAccount = {
  id: string;
  type: 'Traditional IRA' | 'Roth IRA' | '401(k)' | 'SEP IRA' | 'HSA';
  custodian: string;
  accountNo: string;
  currentCorpus: number;
  employerContribYTD: number;
  employeeContribYTD: number;
  annualLimit: number;
  retirementTarget: string;
  holderId: string;
};

export const retirementAccounts: RetirementAccount[] = [
  { id: 'ret-1', type: '401(k)', custodian: 'Fidelity', accountNo: '401K-WHT-9821', currentCorpus: 1_820_000, employerContribYTD: 12_500, employeeContribYTD: 19_500, annualLimit: 23_000, retirementTarget: '2033-09-22', holderId: 'm-eleanor' },
  { id: 'ret-2', type: 'Traditional IRA', custodian: 'Vanguard', accountNo: 'IRA-WHT-2014', currentCorpus: 1_350_000, employerContribYTD: 0, employeeContribYTD: 8_000, annualLimit: 8_000, retirementTarget: '2032-03-14', holderId: 'm-richard' },
  { id: 'ret-3', type: 'Roth IRA', custodian: 'Charles Schwab', accountNo: 'RIRA-WHT-0917', currentCorpus: 420_000, employerContribYTD: 0, employeeContribYTD: 8_000, annualLimit: 8_000, retirementTarget: '2032-03-14', holderId: 'm-richard' },
  { id: 'ret-4', type: 'SEP IRA', custodian: 'Fidelity', accountNo: 'SEP-WHT-7702', currentCorpus: 640_000, employerContribYTD: 22_000, employeeContribYTD: 0, annualLimit: 69_000, retirementTarget: '2032-03-14', holderId: 'm-richard' },
  { id: 'ret-5', type: 'HSA', custodian: 'Fidelity', accountNo: 'HSA-WHT-1129', currentCorpus: 86_000, employerContribYTD: 1_000, employeeContribYTD: 4_300, annualLimit: 8_300, retirementTarget: '2033-09-22', holderId: 'm-eleanor' },
];

// Helpers
export const investmentTotals = (() => {
  const mfValue = mutualFunds.reduce((s, x) => s + x.currentValue, 0);
  const stocksValue = publicStocks.reduce((s, x) => s + x.qty * x.currentPrice, 0);
  const privateStocksValue = privateStocks.reduce((s, x) => s + x.qty * x.currentValuationPrice, 0);
  const vcValue = vcInvestments.reduce((s, x) => s + x.currentValue, 0);
  const bondsValue = bonds.reduce((s, x) => s + x.currentMarketValue, 0);
  const goldValue = preciousMetals.reduce((s, x) => s + x.qty * x.currentPrice, 0);
  const reitValue = reits.reduce((s, x) => s + x.units * x.currentNav, 0);
  const cdValue = cds.reduce((s, x) => s + x.currentValue, 0);
  const retirementValue = retirementAccounts.reduce((s, x) => s + x.currentCorpus, 0);
  return { mfValue, stocksValue, privateStocksValue, vcValue, bondsValue, goldValue, reitValue, cdValue, retirementValue };
})();
