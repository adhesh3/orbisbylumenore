import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardBody, CardHeader, CardSub, CardTitle } from '@/components/ui/Card';
import { TBody, TD, TH, THead, TR, Table } from '@/components/ui/Table';
import { Chip } from '@/components/ui/Chip';
import { properties, vehicles, jewellery, artCollection } from '@/data/realestate';
import { memberName } from '@/data/family';
import { formatDate, formatPct, formatUSD, cn } from '@/lib/utils';

const TABS = [
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'vehicles', label: 'Vehicles' },
  { id: 'jewellery', label: 'Jewellery & Precious' },
  { id: 'art', label: 'Art & Collectibles' },
] as const;
type TabId = (typeof TABS)[number]['id'];

export function Assets() {
  const [tab, setTab] = useState<TabId>('real-estate');

  const totals = {
    'real-estate': properties.reduce((s, p) => s + p.currentValue, 0),
    vehicles: vehicles.reduce((s, v) => s + v.currentValue, 0),
    jewellery: jewellery.reduce((s, j) => s + j.currentValue, 0),
    art: artCollection.reduce((s, a) => s + a.currentAppraisedValue, 0),
  };

  return (
    <div>
      <PageHeader
        title="Assets Registry"
        description="A complete registry of tangible assets — appreciating, depreciating, and collectible."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'rounded-lg border p-3 text-left transition-all',
              tab === t.id ? 'border-navy bg-navy text-white shadow-card' : 'border-border bg-white hover:border-navy-200',
            )}
          >
            <div className={cn('text-[11px] uppercase tracking-wide', tab === t.id ? 'text-navy-200' : 'text-muted-foreground')}>{t.label}</div>
            <div className={cn('stat-num text-lg mt-0.5', tab === t.id ? 'text-white' : 'text-navy')}>{formatUSD(totals[t.id], { compact: true })}</div>
          </button>
        ))}
      </div>

      {tab === 'real-estate' && (
        <Card>
          <CardHeader><div><CardTitle>Real Estate Portfolio</CardTitle><CardSub>{properties.length} properties · US-only</CardSub></div></CardHeader>
          <CardBody className="pt-0">
            <Table>
              <THead>
                <TR>
                  <TH>Property</TH><TH>Type</TH><TH>Owner</TH>
                  <TH>Status</TH>
                  <TH className="text-right">Purchase</TH>
                  <TH className="text-right">Current Value</TH>
                  <TH className="text-right">Appreciation</TH>
                </TR>
              </THead>
              <TBody>
                {properties.map((p) => {
                  const app = ((p.currentValue / p.purchasePrice) - 1) * 100;
                  return (
                    <TR key={p.id}>
                      <TD>
                        <div className="text-sm font-medium text-navy">{p.name}</div>
                        <div className="text-[11px] text-muted-foreground">{p.address}, {p.city}, {p.state}</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">
                          {p.sqft ? `${p.sqft.toLocaleString()} sqft` : ''} {p.lotAcres ? `· ${p.lotAcres} acres` : ''} {p.yearBuilt ? `· Built ${p.yearBuilt}` : ''}
                        </div>
                      </TD>
                      <TD>
                        <Chip tone="navy">{p.type}</Chip>
                        <div className="text-[11px] text-muted-foreground mt-1">{p.subtype}</div>
                      </TD>
                      <TD className="text-sm">{memberName(p.ownerId)}</TD>
                      <TD>
                        <Chip tone={p.status === 'Rented' ? 'gain' : p.status === 'Vacant' ? 'loss' : 'neutral'}>
                          {p.status}
                        </Chip>
                        {p.monthlyRent ? (
                          <div className="text-[11px] text-gain mt-1">+{formatUSD(p.monthlyRent)}/mo</div>
                        ) : null}
                      </TD>
                      <TD className="text-right text-sm tabular-nums">
                        {formatUSD(p.purchasePrice)}
                        <div className="text-[11px] text-muted-foreground">{formatDate(p.purchaseDate)}</div>
                      </TD>
                      <TD className="text-right stat-num text-navy">{formatUSD(p.currentValue)}</TD>
                      <TD className={cn('text-right stat-num', app >= 0 ? 'text-gain' : 'text-loss')}>
                        {formatPct(app)}
                      </TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {tab === 'vehicles' && (
        <Card>
          <CardHeader><div><CardTitle>Vehicles</CardTitle><CardSub>Cars, yacht — depreciation tracked</CardSub></div></CardHeader>
          <CardBody className="pt-0">
            <Table>
              <THead>
                <TR>
                  <TH>Vehicle</TH><TH>Type</TH><TH>Year</TH><TH>Fuel</TH><TH>Owner</TH>
                  <TH>Insurance Expiry</TH>
                  <TH className="text-right">Purchase Cost</TH>
                  <TH className="text-right">Current Value</TH>
                  <TH className="text-right">Depreciation</TH>
                </TR>
              </THead>
              <TBody>
                {vehicles.map((v) => {
                  const dep = ((v.currentValue / v.purchaseCost) - 1) * 100;
                  return (
                    <TR key={v.id}>
                      <TD>
                        <div className="text-sm font-medium text-navy">{v.brand} {v.model}</div>
                        <div className="text-[11px] text-muted-foreground">{v.color} · VIN {v.vin}</div>
                      </TD>
                      <TD><Chip tone="neutral">{v.type}</Chip></TD>
                      <TD className="text-sm">{v.year}</TD>
                      <TD className="text-sm">{v.fuel}</TD>
                      <TD className="text-sm">{memberName(v.ownerId)}</TD>
                      <TD className="text-sm">{formatDate(v.insuranceExpiry)}</TD>
                      <TD className="text-right text-sm tabular-nums">{formatUSD(v.purchaseCost)}</TD>
                      <TD className="text-right stat-num text-navy">{formatUSD(v.currentValue)}</TD>
                      <TD className="text-right stat-num text-loss">{formatPct(dep)}</TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {tab === 'jewellery' && (
        <Card>
          <CardHeader><div><CardTitle>Jewellery & Precious Items</CardTitle><CardSub>Hallmarked and certified pieces</CardSub></div></CardHeader>
          <CardBody className="pt-0">
            <Table>
              <THead>
                <TR>
                  <TH>Item</TH><TH>Form</TH><TH>Purity</TH>
                  <TH className="text-right">Weight (g)</TH>
                  <TH>Owner</TH><TH>Storage</TH>
                  <TH className="text-right">Purchase</TH>
                  <TH className="text-right">Current Value</TH>
                </TR>
              </THead>
              <TBody>
                {jewellery.map((j) => (
                  <TR key={j.id}>
                    <TD className="text-sm font-medium text-navy">{j.item}</TD>
                    <TD className="text-sm">{j.form}</TD>
                    <TD><Chip tone="gold">{j.purity}</Chip></TD>
                    <TD className="text-right text-sm tabular-nums">{j.weightGrams.toLocaleString()}</TD>
                    <TD className="text-sm">{memberName(j.ownerId)}</TD>
                    <TD className="text-sm text-muted-foreground">{j.location}</TD>
                    <TD className="text-right text-sm tabular-nums">{formatUSD(j.purchasePrice)}</TD>
                    <TD className="text-right stat-num text-navy">{formatUSD(j.currentValue)}</TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {tab === 'art' && (
        <Card>
          <CardHeader><div><CardTitle>Art & Collectibles</CardTitle><CardSub>Appraised annually · insurance via Chubb Valuable Articles</CardSub></div></CardHeader>
          <CardBody className="pt-0">
            <Table>
              <THead>
                <TR>
                  <TH>Piece</TH><TH>Artist</TH><TH>Medium</TH>
                  <TH>Acquired</TH><TH>Location</TH>
                  <TH className="text-right">Acquisition</TH>
                  <TH className="text-right">Current Appraisal</TH>
                </TR>
              </THead>
              <TBody>
                {artCollection.map((a) => (
                  <TR key={a.id}>
                    <TD className="text-sm font-medium text-navy">{a.name}</TD>
                    <TD className="text-sm">{a.artist}</TD>
                    <TD className="text-sm text-muted-foreground">{a.medium}</TD>
                    <TD className="text-sm">{formatDate(a.acquisitionDate)}</TD>
                    <TD className="text-sm text-muted-foreground">{a.location}</TD>
                    <TD className="text-right text-sm tabular-nums">{formatUSD(a.acquisitionPrice)}</TD>
                    <TD className="text-right stat-num text-navy">
                      {formatUSD(a.currentAppraisedValue)}
                      <div className="text-[11px] text-muted-foreground">Appraised {formatDate(a.lastAppraisalDate)}</div>
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
