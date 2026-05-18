import { Sparkles, ChevronDown } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useApp } from '@/app/AppContext';
import { FAMILY_NAME, members } from '@/data/family';
import { NotificationsMenu } from './NotificationsMenu';
import { cn } from '@/lib/utils';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

const DATE_RANGES = ['MTD', 'QTD', 'YTD', 'All-time'] as const;

export function Topbar() {
  const { memberFilter, setMemberFilter, dateRange, setDateRange, setAskMeOpen } = useApp();

  const activeMember =
    memberFilter === 'all' ? 'Entire family' : members.find((m) => m.id === memberFilter)?.name ?? 'Entire family';

  return (
    <header className="sticky top-0 z-30 bg-canvas/85 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between gap-3 px-5 lg:px-8 h-16">
        <div className="min-w-0">
          <div className="text-xs text-muted-foreground">{greeting()},</div>
          <div className="text-base md:text-lg font-display text-navy truncate">{FAMILY_NAME}</div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Member switcher */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="hidden sm:inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-white text-sm text-navy hover:bg-navy-50 transition-colors">
                <span className="text-muted-foreground text-xs">View:</span>
                <span className="font-medium">{activeMember}</span>
                <ChevronDown size={14} />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={6}
                className="z-50 min-w-[220px] bg-white rounded-md border border-border shadow-pop p-1 animate-fade-in"
              >
                <DropdownMenu.Item
                  onSelect={() => setMemberFilter('all')}
                  className={cn(
                    'rounded-sm px-2.5 py-2 text-sm cursor-pointer outline-none data-[highlighted]:bg-navy-50',
                    memberFilter === 'all' && 'text-navy font-semibold',
                  )}
                >
                  Entire family
                </DropdownMenu.Item>
                <div className="my-1 h-px bg-border" />
                {members.map((m) => (
                  <DropdownMenu.Item
                    key={m.id}
                    onSelect={() => setMemberFilter(m.id)}
                    className={cn(
                      'rounded-sm px-2.5 py-2 text-sm cursor-pointer outline-none data-[highlighted]:bg-navy-50 flex items-center justify-between gap-3',
                      memberFilter === m.id && 'text-navy font-semibold',
                    )}
                  >
                    <span>{m.name}</span>
                    <span className="text-[11px] text-muted-foreground">{m.relation}</span>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          {/* Date range pills */}
          <div className="hidden md:inline-flex items-center gap-1 p-1 rounded-md border border-border bg-white">
            {DATE_RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={cn(
                  'h-7 px-2.5 text-xs font-medium rounded-sm transition-colors',
                  dateRange === r ? 'bg-navy text-white' : 'text-muted-foreground hover:text-navy',
                )}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Currency pill (USD only for US-based HNI) */}
          <div className="hidden md:inline-flex items-center gap-1 h-9 px-3 rounded-md border border-border bg-white text-xs">
            <span className="text-muted-foreground">Currency</span>
            <span className="font-semibold text-navy">USD</span>
          </div>

          {/* Notifications */}
          <NotificationsMenu />

          {/* Ask Me — top-right */}
          <button
            onClick={() => setAskMeOpen(true)}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-gradient-to-r from-gold to-gold-300 text-navy-800 text-sm font-semibold hover:brightness-105 transition shadow-sm"
          >
            <Sparkles size={14} />
            <span>Ask Me</span>
          </button>
        </div>
      </div>
    </header>
  );
}
