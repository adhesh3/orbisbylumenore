import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'neutral' | 'gain' | 'loss' | 'gold' | 'navy' | 'info';

const tones: Record<Tone, string> = {
  neutral: 'bg-navy-50 text-navy-700',
  gain: 'bg-emerald-50 text-emerald-700',
  loss: 'bg-rose-50 text-rose-700',
  gold: 'bg-gold-50 text-gold-700',
  navy: 'bg-navy text-white',
  info: 'bg-sky-50 text-sky-700',
};

type Props = HTMLAttributes<HTMLSpanElement> & { tone?: Tone };

export function Chip({ className, tone = 'neutral', ...props }: Props) {
  return <span className={cn('chip', tones[tone], className)} {...props} />;
}
