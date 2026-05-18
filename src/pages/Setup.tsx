import { useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Home,
  Landmark,
  Sparkles,
  Users,
  Wallet,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { OrbisBrand } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { cn } from '@/lib/utils';

type Member = { name: string; relation: string; dob: string; role: string };
type Account = { bank: string; type: string; balance: string };
type Investment = { type: string; name: string; value: string };
type Asset = { type: string; description: string; value: string };

const STEPS = [
  { id: 1, title: 'Family', subtitle: 'Who is in your household?', icon: Users },
  { id: 2, title: 'Banks', subtitle: 'Where do you bank?', icon: Wallet },
  { id: 3, title: 'Investments', subtitle: 'Top holdings', icon: Landmark },
  { id: 4, title: 'Assets', subtitle: 'Home, vehicles', icon: Home },
  { id: 5, title: 'Insurance', subtitle: 'Key policies', icon: ShieldCheck },
  { id: 6, title: 'Review', subtitle: 'You\'re all set', icon: CheckCircle2 },
];

export function Setup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [familyName, setFamilyName] = useState('Whitman Family');
  const [primaryContact, setPrimaryContact] = useState('Richard Whitman');
  const [timezone, setTimezone] = useState('America/New_York');
  const [members, setMembers] = useState<Member[]>([
    { name: 'Richard Whitman', relation: 'Self', dob: '1968-03-14', role: 'Earning' },
    { name: 'Eleanor Whitman', relation: 'Spouse', dob: '1970-09-22', role: 'Earning' },
  ]);

  const [accounts, setAccounts] = useState<Account[]>([
    { bank: 'JPMorgan Chase', type: 'Checking', balance: '184500' },
    { bank: 'Goldman Sachs (Marcus)', type: 'Money Market', balance: '850000' },
  ]);

  const [investments, setInvestments] = useState<Investment[]>([
    { type: 'Public Stocks', name: 'Apple Inc. (AAPL)', value: '560450' },
    { type: 'Mutual Fund', name: 'Vanguard VTSAX', value: '403855' },
  ]);

  const [assets, setAssets] = useState<Asset[]>([
    { type: 'Real Estate', description: 'Primary Residence — Greenwich, CT', value: '6850000' },
    { type: 'Vehicle', description: '2024 Range Rover Autobiography', value: '162000' },
  ]);

  const [hasLife, setHasLife] = useState(true);
  const [hasHealth, setHasHealth] = useState(true);
  const [hasUmbrella, setHasUmbrella] = useState(true);

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;
  const canGoNext = true;

  const finish = () => navigate('/');

  return (
    <div className="min-h-screen bg-canvas grid-bg">
      <header className="border-b border-border bg-white/70 backdrop-blur sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
          <OrbisBrand />
          <div className="flex items-center gap-3">
            <Chip tone="gold"><Sparkles size={12} /> First-time setup</Chip>
            <Link to="/" className="text-xs text-muted-foreground hover:text-navy">Skip for now</Link>
          </div>
        </div>
        <div className="h-1 bg-navy-50">
          <div
            className="h-full bg-gradient-to-r from-navy to-gold transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 lg:px-8 py-8 lg:py-12">
        {/* Step rail */}
        <div className="hidden md:flex items-center justify-between mb-10">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex items-center gap-3 flex-1">
                <div
                  className={cn(
                    'h-9 w-9 rounded-full inline-flex items-center justify-center text-sm font-semibold shrink-0 transition-all',
                    done && 'bg-gain text-white',
                    active && 'bg-navy text-white ring-4 ring-navy-100',
                    !done && !active && 'bg-white border border-border text-muted-foreground',
                  )}
                >
                  {done ? <Check size={14} /> : <Icon size={14} />}
                </div>
                <div className="min-w-0">
                  <div className={cn('text-xs font-medium', active ? 'text-navy' : 'text-muted-foreground')}>
                    {s.title}
                  </div>
                  <div className="text-[10px] text-muted-foreground truncate">{s.subtitle}</div>
                </div>
                {i < STEPS.length - 1 ? <div className="flex-1 h-px bg-border mx-2" /> : null}
              </div>
            );
          })}
        </div>

        <div className="rounded-xl bg-white border border-border shadow-card p-6 lg:p-10 animate-fade-in">
          {step === 1 && (
            <Section
              eyebrow="Step 1 of 6"
              title="Set up your family profile"
              subtitle="Every transaction, asset, and obligation in Orbis is tagged to a family member. You can add more later."
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <TextField label="Family name" value={familyName} onChange={setFamilyName} placeholder="e.g. Whitman Family" />
                <TextField label="Primary contact" value={primaryContact} onChange={setPrimaryContact} placeholder="Your full name" />
                <SelectField
                  label="Time zone"
                  value={timezone}
                  onChange={setTimezone}
                  options={['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'Pacific/Honolulu']}
                />
              </div>
              <SubsectionTitle>Family members</SubsectionTitle>
              <div className="space-y-3">
                {members.map((m, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 rounded-md border border-border">
                    <TextField label="Full name" value={m.name} onChange={(v) => updateAt(members, setMembers, i, { ...m, name: v })} />
                    <SelectField label="Relation" value={m.relation} onChange={(v) => updateAt(members, setMembers, i, { ...m, relation: v })} options={['Self', 'Spouse', 'Father', 'Mother', 'Child', 'Other']} />
                    <TextField type="date" label="Date of birth" value={m.dob} onChange={(v) => updateAt(members, setMembers, i, { ...m, dob: v })} />
                    <SelectField label="Role" value={m.role} onChange={(v) => updateAt(members, setMembers, i, { ...m, role: v })} options={['Earning', 'Dependent', 'Minor']} />
                  </div>
                ))}
                <AddRow onAdd={() => setMembers([...members, { name: '', relation: 'Child', dob: '', role: 'Dependent' }])}>
                  Add another family member
                </AddRow>
              </div>
            </Section>
          )}

          {step === 2 && (
            <Section eyebrow="Step 2 of 6" title="Connect your bank accounts" subtitle="Add checking, savings, money market, CDs, and brokerage accounts. Balances can be entered manually or auto-synced later.">
              <div className="space-y-3">
                {accounts.map((a, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 rounded-md border border-border">
                    <TextField label="Bank / Institution" value={a.bank} onChange={(v) => updateAt(accounts, setAccounts, i, { ...a, bank: v })} placeholder="JPMorgan Chase" />
                    <SelectField label="Account type" value={a.type} onChange={(v) => updateAt(accounts, setAccounts, i, { ...a, type: v })} options={['Checking', 'Savings', 'Money Market', 'CD', 'Brokerage', 'IRA', '401(k)']} />
                    <TextField label="Current balance (USD)" prefix="$" value={a.balance} onChange={(v) => updateAt(accounts, setAccounts, i, { ...a, balance: v })} placeholder="184,500" />
                  </div>
                ))}
                <AddRow onAdd={() => setAccounts([...accounts, { bank: '', type: 'Checking', balance: '' }])}>
                  Add another account
                </AddRow>
              </div>
            </Section>
          )}

          {step === 3 && (
            <Section eyebrow="Step 3 of 6" title="Add your top investments" subtitle="Start with your largest holdings — Orbis will help you fill in the rest. Stocks, mutual funds, bonds, CDs, and alternatives are all supported.">
              <div className="space-y-3">
                {investments.map((inv, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 rounded-md border border-border">
                    <SelectField label="Type" value={inv.type} onChange={(v) => updateAt(investments, setInvestments, i, { ...inv, type: v })} options={['Public Stocks', 'Mutual Fund', 'CD', 'Bond', 'REIT', 'Private Equity / VC', 'Retirement (401k/IRA)', 'Gold / Silver']} />
                    <TextField label="Name / Ticker" value={inv.name} onChange={(v) => updateAt(investments, setInvestments, i, { ...inv, name: v })} placeholder="Apple Inc. (AAPL)" />
                    <TextField label="Current value (USD)" prefix="$" value={inv.value} onChange={(v) => updateAt(investments, setInvestments, i, { ...inv, value: v })} placeholder="500,000" />
                  </div>
                ))}
                <AddRow onAdd={() => setInvestments([...investments, { type: 'Public Stocks', name: '', value: '' }])}>
                  Add another investment
                </AddRow>
              </div>
            </Section>
          )}

          {step === 4 && (
            <Section eyebrow="Step 4 of 6" title="Tell us about your major assets" subtitle="Home, vacation properties, vehicles, jewellery, art — anything material to your net worth.">
              <div className="space-y-3">
                {assets.map((a, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 rounded-md border border-border">
                    <SelectField label="Asset type" value={a.type} onChange={(v) => updateAt(assets, setAssets, i, { ...a, type: v })} options={['Real Estate', 'Vehicle', 'Yacht / Jet', 'Jewellery', 'Art', 'Other']} />
                    <TextField label="Description" value={a.description} onChange={(v) => updateAt(assets, setAssets, i, { ...a, description: v })} placeholder="Primary residence — Greenwich, CT" />
                    <TextField label="Current value (USD)" prefix="$" value={a.value} onChange={(v) => updateAt(assets, setAssets, i, { ...a, value: v })} placeholder="6,850,000" />
                  </div>
                ))}
                <AddRow onAdd={() => setAssets([...assets, { type: 'Real Estate', description: '', value: '' }])}>
                  Add another asset
                </AddRow>
              </div>
            </Section>
          )}

          {step === 5 && (
            <Section eyebrow="Step 5 of 6" title="Insurance & protection" subtitle="Quick check — toggle the policies you have. You can add policy details later in the Insurance module.">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <ToggleCard label="Term Life Insurance" desc="Income replacement for dependents" on={hasLife} onChange={setHasLife} />
                <ToggleCard label="Health Insurance" desc="Family PPO / HMO coverage" on={hasHealth} onChange={setHasHealth} />
                <ToggleCard label="Umbrella Liability" desc="Personal liability protection" on={hasUmbrella} onChange={setHasUmbrella} />
                <ToggleCard label="Homeowners Insurance" desc="Covers your properties" on={true} onChange={() => {}} />
                <ToggleCard label="Auto Insurance" desc="Per-vehicle coverage" on={true} onChange={() => {}} />
                <ToggleCard label="Valuable Articles" desc="Jewellery, art, watches" on={false} onChange={() => {}} />
              </div>
            </Section>
          )}

          {step === 6 && (
            <Section eyebrow="Step 6 of 6" title="You're all set" subtitle="Your private wealth dashboard is ready. Add more details anytime — every module supports inline editing, CSV import, and AskMe assistance.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Summary label="Family members" value={`${members.length} members`} icon={<Users size={16} />} />
                <Summary label="Bank accounts" value={`${accounts.length} accounts`} icon={<Wallet size={16} />} />
                <Summary label="Investments" value={`${investments.length} holdings`} icon={<Landmark size={16} />} />
                <Summary label="Assets" value={`${assets.length} entries`} icon={<Home size={16} />} />
              </div>
              <div className="mt-6 rounded-md bg-gradient-to-r from-navy to-navy-700 text-white p-5 flex items-center gap-4">
                <div className="h-10 w-10 rounded-md bg-gold/20 border border-gold/30 flex items-center justify-center text-gold">
                  <Sparkles size={18} />
                </div>
                <div className="flex-1">
                  <div className="font-display text-lg">Your wealth dashboard is ready</div>
                  <div className="text-xs text-navy-200">AskMe is now active and contextualized to your data.</div>
                </div>
                <Button variant="gold" size="md" onClick={finish}>
                  Open dashboard <ArrowRight size={14} />
                </Button>
              </div>
            </Section>
          )}

          <div className="hairline my-8" />
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="md" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
              <ArrowLeft size={14} /> Back
            </Button>
            <div className="text-xs text-muted-foreground">
              {step < STEPS.length ? `Step ${step} of ${STEPS.length}` : 'Setup complete'}
            </div>
            {step < STEPS.length ? (
              <Button onClick={() => setStep((s) => Math.min(STEPS.length, s + 1))} disabled={!canGoNext}>
                Continue <ArrowRight size={14} />
              </Button>
            ) : (
              <Button onClick={finish} variant="primary">Go to dashboard <ArrowRight size={14} /></Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function updateAt<T>(arr: T[], set: (a: T[]) => void, i: number, v: T) {
  const next = [...arr];
  next[i] = v;
  set(next);
}

function Section({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-gold-600 font-semibold mb-1">{eyebrow}</div>
      <h2 className="font-display text-2xl md:text-3xl text-navy tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1 max-w-2xl mb-6">{subtitle}</p>
      {children}
    </div>
  );
}

function SubsectionTitle({ children }: { children: ReactNode }) {
  return <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mb-2 mt-2">{children}</div>;
}

function TextField({
  label, value, onChange, placeholder, type = 'text', prefix,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; prefix?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">{label}</span>
      <div className="relative mt-1">
        {prefix ? (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{prefix}</span>
        ) : null}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full h-10 rounded-md border border-border bg-white text-sm text-navy outline-none focus:border-navy-200 focus:ring-2 focus:ring-navy-100 transition-all',
            prefix ? 'pl-7 pr-3' : 'px-3',
          )}
        />
      </div>
    </label>
  );
}

function SelectField({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 rounded-md border border-border bg-white text-sm text-navy px-2.5 mt-1 outline-none focus:border-navy-200 focus:ring-2 focus:ring-navy-100 transition-all"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function AddRow({ onAdd, children }: { onAdd: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="w-full text-sm rounded-md border border-dashed border-border py-3 text-muted-foreground hover:border-navy-200 hover:text-navy hover:bg-navy-50/40 transition-colors"
    >
      + {children}
    </button>
  );
}

function ToggleCard({
  label, desc, on, onChange,
}: { label: string; desc: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={cn(
        'rounded-md border p-4 text-left transition-all',
        on ? 'border-navy bg-navy-50/60 shadow-card' : 'border-border bg-white hover:border-navy-200',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="text-sm font-medium text-navy">{label}</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">{desc}</div>
        </div>
        <div className={cn('h-5 w-9 rounded-full relative transition-colors', on ? 'bg-navy' : 'bg-border')}>
          <div
            className={cn(
              'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all',
              on ? 'left-[18px]' : 'left-0.5',
            )}
          />
        </div>
      </div>
    </button>
  );
}

function Summary({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="rounded-md border border-border p-4 flex items-center gap-3">
      <div className="h-10 w-10 rounded-md bg-navy-50 flex items-center justify-center text-navy">{icon}</div>
      <div>
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="text-sm font-medium text-navy">{value}</div>
      </div>
    </div>
  );
}
