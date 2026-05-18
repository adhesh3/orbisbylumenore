import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type DateRange = 'MTD' | 'QTD' | 'YTD' | 'All-time';
type Currency = 'USD';
type MemberFilter = 'all' | string;

type AppState = {
  memberFilter: MemberFilter;
  setMemberFilter: (m: MemberFilter) => void;
  dateRange: DateRange;
  setDateRange: (d: DateRange) => void;
  currency: Currency;
  askMeOpen: boolean;
  setAskMeOpen: (b: boolean) => void;
};

const AppCtx = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [memberFilter, setMemberFilter] = useState<MemberFilter>('all');
  const [dateRange, setDateRange] = useState<DateRange>('YTD');
  const [askMeOpen, setAskMeOpen] = useState(false);

  const value = useMemo(
    () => ({
      memberFilter,
      setMemberFilter,
      dateRange,
      setDateRange,
      currency: 'USD' as const,
      askMeOpen,
      setAskMeOpen,
    }),
    [memberFilter, dateRange, askMeOpen],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
