import type { ReactNode } from 'react';

type Props = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function PageHeader({ title, description, actions }: Props) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-6 animate-fade-in">
      <div>
        <h1 className="font-display text-3xl md:text-4xl text-navy tracking-tight">{title}</h1>
        {description ? (
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}
