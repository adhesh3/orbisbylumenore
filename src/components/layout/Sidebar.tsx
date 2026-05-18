import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Wallet,
  TrendingUp,
  ArrowDownToLine,
  ArrowUpFromLine,
  Boxes,
  Landmark,
  GraduationCap,
  ShieldCheck,
  BellRing,
  FileText,
  Settings,
  Sparkles,
  ListChecks,
} from 'lucide-react';
import { OrbisBrand } from '@/components/brand/Logo';
import { useApp } from '@/app/AppContext';
import { FAMILY_NAME, members } from '@/data/family';
import { cn } from '@/lib/utils';

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/family', label: 'Family', icon: Users },
  { to: '/net-worth', label: 'Net Worth', icon: TrendingUp },
  { to: '/banks', label: 'Banks & Accounts', icon: Wallet },
  { to: '/investments', label: 'Investments', icon: Landmark },
  { to: '/income', label: 'Income', icon: ArrowDownToLine },
  { to: '/expenses', label: 'Expenses', icon: ArrowUpFromLine },
  { to: '/assets', label: 'Assets', icon: Boxes },
  { to: '/loans', label: 'Loans & Liabilities', icon: FileText },
  { to: '/education', label: 'Education', icon: GraduationCap },
  { to: '/insurance', label: 'Insurance', icon: ShieldCheck },
  { to: '/reminders', label: 'Reminders & Alerts', icon: BellRing },
  { to: '/reports', label: 'Reports', icon: ListChecks },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const { setAskMeOpen } = useApp();
  const father = members.find((m) => m.relation === 'Father');

  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col bg-navy text-white border-r border-navy-700/40">
      <div className="px-5 pt-6 pb-5">
        <OrbisBrand light size="md" />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5">
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => cn('nav-item', isActive && 'active')}
          >
            <Icon size={16} className="text-navy-200" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-3">
        <button
          onClick={() => setAskMeOpen(true)}
          className="w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium bg-gold/15 text-gold-100 hover:bg-gold/25 transition-colors border border-gold/30"
        >
          <Sparkles size={16} className="text-gold-300" />
          <span>AskMe — Wealth AI</span>
        </button>
      </div>

      <div className="border-t border-navy-700/40 px-4 py-3 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs font-semibold">
          {father?.initials ?? 'WF'}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-white truncate">{FAMILY_NAME}</div>
          <div className="text-[11px] text-navy-200">Private Wealth · Premium</div>
        </div>
      </div>
    </aside>
  );
}
