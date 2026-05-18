import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardBody, CardHeader, CardSub, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { TBody, TD, TH, THead, TR, Table } from '@/components/ui/Table';
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
} from '@/data/investments';
import { memberName } from '@/data/family';
import { formatDate, formatPct, formatUSD, cn } from '@/lib/utils';
import { Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TABS = [
  { id: 'cds', label: 'CDs' },
  { id: 'mf', label: 'Mutual Funds' },
  { id: 'stocks', label: 'Public Stocks' },
  { id: 'private', label: 'Private / ESOPs' },
  { id: 'vc', label: 'VC / Startups' },
  { id: 'bonds', label: 'Bonds' },
  { id: 'metals', label: 'Gold & Silver' },
  { id: 'reits', label: 'REITs' },
  { id: 'retire', label: 'Retirement' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export function Investments() {
  const [tab, setTab] = useState<TabId>('stocks');

  const totals = {
    cds: cds.reduce((s, x) => s + x.currentValue, 0),
    mf: mutualFunds.reduce((s, x) => s + x.currentValue, 0),
    stocks: publicStocks.reduce((s, x) => s + x.qty * x.currentPrice, 0),
    private: privateStocks.reduce((s, x) => s + x.qty * x.currentValuationPrice, 0),
    vc: vcInvestments.reduce((s, x) => s + x.currentValue, 0),
    bonds: bonds.reduce((s, x) => s + x.currentMarketValue, 0),
    metals: preciousMetals.reduce((s, x) => s + x.qty * x.currentPrice, 0),
    reits: reits.reduce((s, x) => s + x.units * x.currentNav, 0),
    retire: retirementAccounts.reduce((s, x) => s + x.currentCorpus, 0),
  };

  const grand = Object.values(totals).reduce((s, x) => s + x, 0);

  return (
    <div>
      <PageHeader
        title="Investments"
        description={`A comprehensive view across ${TABS.length} asset classes · total ${formatUSD(grand, { compact: true })}.`}
        actions={<Button size="sm"><Plus size={14} /> Add investment</Button>}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'rounded-lg border p-3 text-left transition-all',
              tab === t.id ? 'border-navy bg-navy text-white shadow-card' : 'border-border bg-white hover:border-navy-200',
            )}
          >
            <div className={cn('text-[11px] uppercase tracking-wide', tab === t.id ? 'text-navy-200' : 'text-muted-foreground')}>
              {t.label}
            </div>
            <div className={cn('stat-num text-base mt-0.5', tab === t.id ? 'text-white' : 'text-navy')}>
              {formatUSD(totals[t.id], { compact: true })}
            </div>
          </button>
        ))}
      </div>

      {tab === 'cds' && (
        <Card>
          <CardHeader><div><CardTitle>Certificates of Deposit</CardTitle><CardSub>All maturity-bound deposits</CardSub></div></CardHeader>
          <CardBody className="pt-0">
            <Table>
              <THead>
                <TR>
                  <TH>Bank</TH><TH>Certificate #</TH><TH>Holder</TH>
                  <TH className="text-right">Principal</TH><TH className="text-right">APY</TH>
                  <TH>Maturity</TH><TH className="text-right">Current Value</TH><TH>Auto-Renew</TH>
                </TR>
              </THead>
              <TBody>
                {cds.map((c) => (
                  <TR key={c.id}>
                    <TD className="text-sm font-medium text-navy">{c.bank}</TD>
                    <TD className="text-xs font-mono text-muted-foreground">{c.certificateNo}</TD>
                    <TD className="text-sm">{memberName(c.holderId)}</TD>
                    <TD className="text-right text-sm tabular-nums">{formatUSD(c.principal)}</TD>
                    <TD className="text-right text-sm tabular-nums text-navy">{c.apy.toFixed(2)}%</TD>
                    <TD className="text-sm">{formatDate(c.maturityDate)}</TD>
                    <TD className="text-right stat-num text-navy">{formatUSD(c.currentValue)}</TD>
                    <TD><Chip tone={c.autoRenew ? 'gain' : 'neutral'}>{c.autoRenew ? 'On' : 'Off'}</Chip></TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {tab === 'mf' && (
        <Card>
          <CardHeader><div><CardTitle>Mutual Funds</CardTitle><CardSub>US-domiciled funds · NAVs updated daily</CardSub></div></CardHeader>
          <CardBody className="pt-0">
            <Table>
              <THead>
                <TR>
                  <TH>Fund</TH><TH>Ticker</TH><TH>Category</TH><TH>Holder</TH>
                  <TH className="text-right">Units</TH><TH className="text-right">NAV</TH>
                  <TH className="text-right">Invested</TH><TH className="text-right">Current</TH>
                  <TH className="text-right">XIRR</TH>
                </TR>
              </THead>
              <TBody>
                {mutualFunds.map((m) => (
                  <TR key={m.id}>
                    <TD className="text-sm font-medium text-navy">{m.fund}</TD>
                    <TD className="text-xs font-mono">{m.ticker}</TD>
                    <TD><Chip tone="neutral">{m.category}</Chip></TD>
                    <TD className="text-sm">{memberName(m.holderId)}</TD>
                    <TD className="text-right text-sm tabular-nums">{m.units.toLocaleString()}</TD>
                    <TD className="text-right text-sm tabular-nums">${m.nav.toFixed(2)}</TD>
                    <TD className="text-right text-sm tabular-nums">{formatUSD(m.invested)}</TD>
                    <TD className="text-right stat-num text-navy">{formatUSD(m.currentValue)}</TD>
                    <TD className={cn('text-right stat-num', m.xirr >= 0 ? 'text-gain' : 'text-loss')}>
                      {formatPct(m.xirr)}
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {tab === 'stocks' && (
        <Card>
          <CardHeader><div><CardTitle>Public Stocks (Listed Equities)</CardTitle><CardSub>NYSE / NASDAQ holdings · live mark-to-market</CardSub></div></CardHeader>
          <CardBody className="pt-0">
            <Table>
              <THead>
                <TR>
                  <TH>Stock</TH><TH>Ticker</TH><TH>Exchange</TH><TH>Holder</TH>
                  <TH className="text-right">Qty</TH><TH className="text-right">Avg Cost</TH>
                  <TH className="text-right">Price</TH><TH className="text-right">Value</TH>
                  <TH className="text-right">P&L</TH>
                </TR>
              </THead>
              <TBody>
                {publicStocks.map((s) => {
                  const value = s.qty * s.currentPrice;
                  const pl = value - s.qty * s.avgBuyPrice;
                  const plPct = (s.currentPrice / s.avgBuyPrice - 1) * 100;
                  return (
                    <TR key={s.id}>
                      <TD className="text-sm font-medium text-navy">{s.name}</TD>
                      <TD className="text-xs font-mono">{s.ticker}</TD>
                      <TD><Chip tone="info">{s.exchange}</Chip></TD>
                      <TD className="text-sm">{memberName(s.holderId)}</TD>
                      <TD className="text-right text-sm tabular-nums">{s.qty.toLocaleString()}</TD>
                      <TD className="text-right text-sm tabular-nums">${s.avgBuyPrice.toFixed(2)}</TD>
                      <TD className="text-right text-sm tabular-nums">${s.currentPrice.toFixed(2)}</TD>
                      <TD className="text-right stat-num text-navy">{formatUSD(value)}</TD>
                      <TD className={cn('text-right stat-num', pl >= 0 ? 'text-gain' : 'text-loss')}>
                        <div className="inline-flex items-center gap-1 justify-end">
                          {pl >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                          {formatUSD(pl, { compact: true })}
                          <span className="text-[11px] opacity-80">({formatPct(plPct)})</span>
                        </div>
                      </TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {tab === 'private' && (
        <Card>
          <CardHeader><div><CardTitle>Private Stocks / Pre-IPO / ESOPs</CardTitle><CardSub>Unlisted equity holdings</CardSub></div></CardHeader>
          <CardBody className="pt-0">
            <Table>
              <THead>
                <TR>
                  <TH>Company</TH><TH>Sector</TH><TH>Vehicle</TH><TH>Holder</TH>
                  <TH className="text-right">Qty</TH><TH className="text-right">Cost / Share</TH>
                  <TH className="text-right">Current / Share</TH><TH className="text-right">Value</TH>
                </TR>
              </THead>
              <TBody>
                {privateStocks.map((p) => (
                  <TR key={p.id}>
                    <TD className="text-sm font-medium text-navy">{p.company}</TD>
                    <TD className="text-sm text-muted-foreground">{p.sector}</TD>
                    <TD><Chip tone="gold">{p.vehicle}</Chip></TD>
                    <TD className="text-sm">{memberName(p.holderId)}</TD>
                    <TD className="text-right text-sm tabular-nums">{p.qty.toLocaleString()}</TD>
                    <TD className="text-right text-sm tabular-nums">${p.purchasePrice.toFixed(2)}</TD>
                    <TD className="text-right text-sm tabular-nums">${p.currentValuationPrice.toFixed(2)}</TD>
                    <TD className="text-right stat-num text-navy">{formatUSD(p.qty * p.currentValuationPrice)}</TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {tab === 'vc' && (
        <Card>
          <CardHeader><div><CardTitle>Venture Capital / Startup Investments</CardTitle><CardSub>Direct, SPV, and fund commitments</CardSub></div></CardHeader>
          <CardBody className="pt-0">
            <Table>
              <THead>
                <TR>
                  <TH>Startup</TH><TH>Sector</TH><TH>Stage</TH><TH>Vehicle</TH><TH>Holder</TH>
                  <TH>Date</TH>
                  <TH className="text-right">Invested</TH><TH className="text-right">Current Value</TH>
                  <TH>Status</TH>
                </TR>
              </THead>
              <TBody>
                {vcInvestments.map((v) => {
                  const multiple = v.invested ? v.currentValue / v.invested : 0;
                  return (
                    <TR key={v.id}>
                      <TD className="text-sm font-medium text-navy">{v.startup}</TD>
                      <TD className="text-sm text-muted-foreground">{v.sector}</TD>
                      <TD><Chip tone="info">{v.stage}</Chip></TD>
                      <TD className="text-sm">{v.vehicle}</TD>
                      <TD className="text-sm">{memberName(v.holderId)}</TD>
                      <TD className="text-sm">{formatDate(v.date)}</TD>
                      <TD className="text-right text-sm tabular-nums">{formatUSD(v.invested)}</TD>
                      <TD className="text-right stat-num text-navy">
                        {formatUSD(v.currentValue)}
                        <div className={cn('text-[11px]', multiple >= 1 ? 'text-gain' : 'text-loss')}>
                          {multiple.toFixed(2)}x
                        </div>
                      </TD>
                      <TD>
                        <Chip tone={v.status === 'Active' ? 'gain' : v.status === 'Exited' ? 'navy' : 'loss'}>
                          {v.status}
                        </Chip>
                      </TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {tab === 'bonds' && (
        <Card>
          <CardHeader><div><CardTitle>Bonds & Debentures</CardTitle><CardSub>Treasury, municipal, and corporate bonds</CardSub></div></CardHeader>
          <CardBody className="pt-0">
            <Table>
              <THead>
                <TR>
                  <TH>Name</TH><TH>Type</TH><TH>CUSIP</TH><TH>Holder</TH>
                  <TH className="text-right">Face</TH><TH className="text-right">Coupon</TH>
                  <TH>Next Interest</TH><TH>Maturity</TH>
                  <TH className="text-right">Market Value</TH>
                </TR>
              </THead>
              <TBody>
                {bonds.map((b) => (
                  <TR key={b.id}>
                    <TD className="text-sm font-medium text-navy">{b.name}</TD>
                    <TD><Chip tone="neutral">{b.type}</Chip></TD>
                    <TD className="text-xs font-mono">{b.cusip}</TD>
                    <TD className="text-sm">{memberName(b.holderId)}</TD>
                    <TD className="text-right text-sm tabular-nums">{formatUSD(b.faceValue)}</TD>
                    <TD className="text-right text-sm tabular-nums">{b.coupon.toFixed(2)}%</TD>
                    <TD className="text-sm">{formatDate(b.nextInterestDate)}</TD>
                    <TD className="text-sm">{formatDate(b.maturityDate)}</TD>
                    <TD className="text-right stat-num text-navy">{formatUSD(b.currentMarketValue)}</TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {tab === 'metals' && (
        <Card>
          <CardHeader><div><CardTitle>Gold, Silver & Precious Metals</CardTitle><CardSub>Physical and ETF holdings</CardSub></div></CardHeader>
          <CardBody className="pt-0">
            <Table>
              <THead>
                <TR>
                  <TH>Type</TH><TH>Ticker</TH><TH>Holder</TH>
                  <TH className="text-right">Qty</TH><TH>Unit</TH>
                  <TH className="text-right">Avg Cost</TH><TH className="text-right">Current</TH>
                  <TH className="text-right">Value</TH><TH>Location</TH>
                </TR>
              </THead>
              <TBody>
                {preciousMetals.map((g) => (
                  <TR key={g.id}>
                    <TD className="text-sm font-medium text-navy">{g.type}</TD>
                    <TD className="text-xs font-mono">{g.ticker ?? '—'}</TD>
                    <TD className="text-sm">{memberName(g.holderId)}</TD>
                    <TD className="text-right text-sm tabular-nums">{g.qty.toLocaleString()}</TD>
                    <TD className="text-xs">{g.unit}</TD>
                    <TD className="text-right text-sm tabular-nums">${g.avgCost.toFixed(2)}</TD>
                    <TD className="text-right text-sm tabular-nums">${g.currentPrice.toFixed(2)}</TD>
                    <TD className="text-right stat-num text-navy">{formatUSD(g.qty * g.currentPrice)}</TD>
                    <TD className="text-xs text-muted-foreground">{g.location ?? '—'}</TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {tab === 'reits' && (
        <Card>
          <CardHeader><div><CardTitle>REITs</CardTitle><CardSub>Publicly listed real-estate trusts</CardSub></div></CardHeader>
          <CardBody className="pt-0">
            <Table>
              <THead>
                <TR>
                  <TH>Trust</TH><TH>Ticker</TH><TH>Holder</TH>
                  <TH className="text-right">Units</TH><TH className="text-right">Purchase NAV</TH>
                  <TH className="text-right">Current NAV</TH><TH className="text-right">Yield</TH>
                  <TH className="text-right">Value</TH>
                </TR>
              </THead>
              <TBody>
                {reits.map((r) => (
                  <TR key={r.id}>
                    <TD className="text-sm font-medium text-navy">{r.trust}</TD>
                    <TD className="text-xs font-mono">{r.ticker}</TD>
                    <TD className="text-sm">{memberName(r.holderId)}</TD>
                    <TD className="text-right text-sm tabular-nums">{r.units.toLocaleString()}</TD>
                    <TD className="text-right text-sm tabular-nums">${r.purchaseNav.toFixed(2)}</TD>
                    <TD className="text-right text-sm tabular-nums">${r.currentNav.toFixed(2)}</TD>
                    <TD className="text-right text-sm tabular-nums text-gain">{r.distributionYield.toFixed(2)}%</TD>
                    <TD className="text-right stat-num text-navy">{formatUSD(r.units * r.currentNav)}</TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {tab === 'retire' && (
        <Card>
          <CardHeader><div><CardTitle>Retirement Accounts</CardTitle><CardSub>401(k), IRAs, SEP, HSA — annual contribution limit tracked</CardSub></div></CardHeader>
          <CardBody className="pt-0">
            <Table>
              <THead>
                <TR>
                  <TH>Type</TH><TH>Custodian</TH><TH>Account #</TH><TH>Holder</TH>
                  <TH className="text-right">Current Corpus</TH>
                  <TH className="text-right">Contributions YTD</TH>
                  <TH>Limit Used</TH>
                </TR>
              </THead>
              <TBody>
                {retirementAccounts.map((r) => {
                  const used = r.employerContribYTD + r.employeeContribYTD;
                  const pct = (used / r.annualLimit) * 100;
                  return (
                    <TR key={r.id}>
                      <TD><Chip tone="gold">{r.type}</Chip></TD>
                      <TD className="text-sm font-medium text-navy">{r.custodian}</TD>
                      <TD className="text-xs font-mono">{r.accountNo}</TD>
                      <TD className="text-sm">{memberName(r.holderId)}</TD>
                      <TD className="text-right stat-num text-navy">{formatUSD(r.currentCorpus)}</TD>
                      <TD className="text-right text-sm tabular-nums">
                        {formatUSD(used)}
                        <div className="text-[11px] text-muted-foreground">
                          {r.employerContribYTD > 0 ? `Emp ${formatUSD(r.employerContribYTD)}` : 'Self only'}
                        </div>
                      </TD>
                      <TD className="min-w-[140px]">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-muted-foreground">{pct.toFixed(0)}%</span>
                          <span className="tabular-nums">{formatUSD(r.annualLimit)}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-navy-50 overflow-hidden">
                          <div className="h-full bg-gold" style={{ width: `${Math.min(pct, 100)}%` }} />
                        </div>
                      </TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
