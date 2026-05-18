import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const usd0 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const usd2 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatUSD(amount: number, opts: { decimals?: boolean; compact?: boolean } = {}) {
  if (!Number.isFinite(amount)) return '—';
  if (opts.compact) {
    const abs = Math.abs(amount);
    if (abs >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(2)}B`;
    if (abs >= 1_000_000) return `$${(amount / 1_000_000).toFixed(2)}M`;
    if (abs >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
    return usd0.format(amount);
  }
  return (opts.decimals ? usd2 : usd0).format(amount);
}

export function formatNumber(n: number, decimals = 0) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

export function formatPct(n: number, decimals = 1) {
  return `${n >= 0 ? '+' : ''}${n.toFixed(decimals)}%`;
}

export function formatDate(d: string | Date) {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function daysUntil(d: string | Date) {
  const date = typeof d === 'string' ? new Date(d) : d;
  const diff = date.getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function classFor(value: number) {
  if (value > 0) return 'text-gain';
  if (value < 0) return 'text-loss';
  return 'text-muted-foreground';
}
