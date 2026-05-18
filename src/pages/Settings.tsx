import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardBody, CardHeader, CardSub, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { FAMILY_NAME, members } from '@/data/family';
import { Key, Shield, Database, Bell, Users, Globe, Sparkles, ArrowRight } from 'lucide-react';

export function Settings() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Profile, security, members, and platform preferences."
        actions={
          <Link to="/setup">
            <Button variant="gold" size="sm">
              <Sparkles size={14} /> Run setup wizard
              <ArrowRight size={14} />
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Family Profile</CardTitle>
              <CardSub>Core identity used across reports and AskMe</CardSub>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Family Name" value={FAMILY_NAME} />
              <Field label="Primary Contact" value="Richard Whitman" />
              <Field label="Time Zone" value="America/New_York" />
              <Field label="Currency" value="USD ($)" />
              <Field label="Financial Year" value="Calendar Year (Jan–Dec)" />
              <Field label="Tax Residency" value="United States" />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Members</CardTitle>
              <CardSub>{members.length} members configured</CardSub>
            </div>
            <Users size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardBody>
            <div className="space-y-2">
              {members.map((m) => (
                <div key={m.id} className="flex items-center justify-between gap-3 py-1.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-8 w-8 rounded-full text-white text-xs font-semibold inline-flex items-center justify-center" style={{ background: m.color }}>
                      {m.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-navy truncate">{m.name}</div>
                      <div className="text-[11px] text-muted-foreground">{m.relation} · {m.role}</div>
                    </div>
                  </div>
                  <Chip tone="neutral">{m.shortId}</Chip>
                </div>
              ))}
            </div>
            <div className="hairline my-3" />
            <Button variant="outline" size="sm" className="w-full">Manage members</Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><div><CardTitle>Security</CardTitle><CardSub>Password, 2FA, sessions</CardSub></div><Shield size={16} className="text-muted-foreground" /></CardHeader>
          <CardBody>
            <div className="space-y-3">
              <Row icon={<Key size={14} />} label="Change password" status="Last updated 3 months ago" />
              <Row icon={<Shield size={14} />} label="Two-factor authentication" status="Enabled (Authenticator app)" tone="gain" />
              <Row icon={<Database size={14} />} label="Active sessions" status="2 trusted devices" />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><div><CardTitle>Preferences</CardTitle><CardSub>Notifications, appearance, data</CardSub></div><Bell size={16} className="text-muted-foreground" /></CardHeader>
          <CardBody>
            <div className="space-y-3">
              <Row icon={<Bell size={14} />} label="Browser notifications" status="On — reminders + critical alerts" tone="gain" />
              <Row icon={<Globe size={14} />} label="Appearance" status="Light (default · per design spec)" />
              <Row icon={<Database size={14} />} label="Data export" status="Last full backup: May 17, 2026" />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-sm text-navy mt-0.5">{value}</div>
    </div>
  );
}

function Row({ icon, label, status, tone }: { icon: React.ReactNode; label: string; status: string; tone?: 'gain' }) {
  return (
    <div className="flex items-center justify-between gap-3 p-2.5 rounded-md border border-border">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-8 w-8 rounded-md bg-navy-50 flex items-center justify-center text-navy">{icon}</div>
        <div className="min-w-0">
          <div className="text-sm text-navy">{label}</div>
          <div className={`text-[11px] ${tone === 'gain' ? 'text-gain' : 'text-muted-foreground'}`}>{status}</div>
        </div>
      </div>
      <Button variant="ghost" size="sm">Manage</Button>
    </div>
  );
}
