import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Bell, CheckCheck } from 'lucide-react';
import { useState } from 'react';
import { notifications as seedNotifications, type Notification } from '@/data/notifications';
import { cn } from '@/lib/utils';

const kindStyles: Record<Notification['kind'], { dot: string; label: string }> = {
  reminder: { dot: 'bg-gold', label: 'Reminder' },
  alert: { dot: 'bg-rose-500', label: 'Alert' },
  insight: { dot: 'bg-sky-500', label: 'Insight' },
  transaction: { dot: 'bg-emerald-500', label: 'Transaction' },
};

export function NotificationsMenu() {
  const [items, setItems] = useState(seedNotifications);
  const unread = items.filter((n) => n.unread).length;

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="Notifications"
          className="relative h-9 w-9 inline-flex items-center justify-center rounded-md border border-border bg-white text-navy hover:bg-navy-50 transition-colors"
        >
          <Bell size={16} />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-rose-500 text-[10px] text-white font-semibold inline-flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 w-[380px] bg-white rounded-lg border border-border shadow-pop overflow-hidden animate-fade-in"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div>
              <div className="text-sm font-semibold text-navy">Notifications</div>
              <div className="text-[11px] text-muted-foreground">
                {unread} unread · {items.length} total
              </div>
            </div>
            <button
              onClick={markAllRead}
              className="inline-flex items-center gap-1 text-[11px] text-navy hover:text-navy-700"
            >
              <CheckCheck size={12} /> Mark all read
            </button>
          </div>
          <div className="max-h-[420px] overflow-y-auto">
            {items.map((n) => (
              <div
                key={n.id}
                className={cn(
                  'px-4 py-3 border-b border-border/70 last:border-b-0 flex gap-3 hover:bg-navy-50/40 transition-colors',
                  n.unread && 'bg-gold-50/30',
                )}
              >
                <div
                  className={cn(
                    'mt-1.5 h-2 w-2 rounded-full shrink-0',
                    kindStyles[n.kind].dot,
                  )}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-medium text-navy truncate">{n.title}</div>
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground shrink-0">
                      {kindStyles[n.kind].label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.body}</p>
                  <div className="text-[11px] text-muted-foreground mt-1">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-2.5 border-t border-border bg-navy-50/40 text-center">
            <a href="#" className="text-xs font-medium text-navy hover:text-navy-700">
              View all notifications
            </a>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
