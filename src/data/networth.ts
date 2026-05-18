import { bankAccounts } from './banks';
import {
  cds,
  mutualFunds,
  publicStocks,
  privateStocks,
  vcInvestments,
  bonds,
  preciousMetals,
  reits,
  retirementAccounts,
} from './investments';
import { properties, vehicles, jewellery, artCollection } from './realestate';
import { loans } from './loans';

// Bank balances by type. We exclude IRA/401(k) from "cash" since retirement accounts are tracked separately,
// and brokerage cash is captured under stocks/MFs already.
export const bankCashTotal = bankAccounts
  .filter((b) => ['Checking', 'Savings', 'CD', 'Money Market'].includes(b.type))
  // CDs are separately enumerated in `cds`. Avoid double counting: include only checking/savings/money market here.
  .filter((b) => b.type !== 'CD')
  .reduce((s, b) => s + b.balance, 0);

export const cdTotal = cds.reduce((s, x) => s + x.currentValue, 0);
export const mfTotal = mutualFunds.reduce((s, x) => s + x.currentValue, 0);
export const stocksTotal = publicStocks.reduce((s, x) => s + x.qty * x.currentPrice, 0);
export const privateStocksTotal = privateStocks.reduce((s, x) => s + x.qty * x.currentValuationPrice, 0);
export const vcTotal = vcInvestments.reduce((s, x) => s + x.currentValue, 0);
export const bondsTotal = bonds.reduce((s, x) => s + x.currentMarketValue, 0);
export const preciousMetalsTotal = preciousMetals.reduce((s, x) => s + x.qty * x.currentPrice, 0);
export const reitTotal = reits.reduce((s, x) => s + x.units * x.currentNav, 0);
export const retirementTotal = retirementAccounts.reduce((s, x) => s + x.currentCorpus, 0);

export const realEstateTotal = properties.reduce((s, p) => s + p.currentValue, 0);
export const vehiclesTotal = vehicles.reduce((s, v) => s + v.currentValue, 0);
export const jewelleryTotal = jewellery.reduce((s, j) => s + j.currentValue, 0);
export const artTotal = artCollection.reduce((s, a) => s + a.currentAppraisedValue, 0);

export const totalLiabilities = loans.reduce((s, l) => s + l.outstanding, 0);

// High-level allocation buckets used in dashboard / net worth pages
export const allocation = {
  realEstate: realEstateTotal,
  equities: stocksTotal + mfTotal + privateStocksTotal,
  fixedIncome: bondsTotal + cdTotal,
  cashEquivalents: bankCashTotal,
  alternatives: vcTotal + reitTotal,
  preciousMetals: preciousMetalsTotal,
  collectibles: artTotal + jewelleryTotal,
  retirement: retirementTotal,
  vehicles: vehiclesTotal,
};

export const totalAssets =
  allocation.realEstate +
  allocation.equities +
  allocation.fixedIncome +
  allocation.cashEquivalents +
  allocation.alternatives +
  allocation.preciousMetals +
  allocation.collectibles +
  allocation.retirement +
  allocation.vehicles;

export const totalNetWorth = totalAssets - totalLiabilities;

// Liquid: cash, MFs, stocks, money-market CDs maturing <1yr, REITs (publicly listed)
export const liquidAssets =
  bankCashTotal + mfTotal + stocksTotal + reitTotal + cdTotal * 0.4; // approx ~40% of CDs mature within 12 months

export const illiquidAssets = totalAssets - liquidAssets;

// 12-month synthetic net-worth timeline (in millions, USD).
// Anchored to end at the live computed totalNetWorth.
const nowM = +(totalNetWorth / 1_000_000).toFixed(2);
const startM = +(nowM * 0.88).toFixed(2); // ~+13.6% over 12 months

function buildTimeline() {
  const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
  return months.map((m, i) => {
    const t = i / (months.length - 1);
    // small mid-cycle dip to make it feel realistic
    const wobble = Math.sin(t * Math.PI) * 0.3;
    const value = +(startM + (nowM - startM) * t + (i === months.length - 1 ? 0 : -wobble * 0.2)).toFixed(2);
    return { month: m, value };
  });
}

export const netWorthTimeline = buildTimeline();
