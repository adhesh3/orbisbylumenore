import lumenoreLogo from '@/assets/lumenore-logo.svg';
import { cn } from '@/lib/utils';

// Lumenore wordmark only — used inline next to "by"
export function LumenoreLogo({ className }: { className?: string }) {
  return <img src={lumenoreLogo} alt="Lumenore" className={cn('inline-block', className)} />;
}

// "Orbis by [Lumenore logo]" — the main brand lockup used in the sidebar / topbar
export function OrbisBrand({
  light = false,
  size = 'md',
}: {
  light?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const orbisSize = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];
  const logoH = {
    sm: 'h-3.5',
    md: 'h-4',
    lg: 'h-5',
  }[size];
  const byColor = light ? 'text-navy-200' : 'text-muted-foreground';
  const orbisColor = light ? 'text-white' : 'text-navy';

  return (
    <div className="flex items-center gap-2.5 leading-none">
      <div className="relative">
        <div className="h-8 w-8 rounded-md bg-gradient-to-br from-navy to-navy-400 flex items-center justify-center shadow-sm">
          <div className="h-3 w-3 rounded-full border-2 border-gold" />
        </div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={cn('font-display tracking-tight', orbisSize, orbisColor)}>Orbis</span>
        <span className={cn('text-xs font-medium', byColor)}>by</span>
        <LumenoreLogo
          className={cn(
            logoH,
            'w-auto',
            light ? 'brightness-0 invert opacity-90' : '',
          )}
        />
      </div>
    </div>
  );
}
