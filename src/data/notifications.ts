export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  kind: 'reminder' | 'alert' | 'insight' | 'transaction';
  unread: boolean;
};

export const notifications: Notification[] = [
  {
    id: 'n-1',
    title: 'Capital One CD maturing soon',
    body: '$259,625 CD matures Aug 1, 2026. Auto-renew is ON — review APY before then.',
    time: '12 min ago',
    kind: 'reminder',
    unread: true,
  },
  {
    id: 'n-2',
    title: 'Q2 federal estimated tax due Jun 15',
    body: 'Estimated payment: $285,000. Reach out to your CPA for final figure.',
    time: '2 hr ago',
    kind: 'alert',
    unread: true,
  },
  {
    id: 'n-3',
    title: 'NVIDIA dividend credited',
    body: '$180 deposited to Charles Schwab Brokerage ••••6711.',
    time: 'Yesterday',
    kind: 'transaction',
    unread: true,
  },
  {
    id: 'n-4',
    title: 'Portfolio drift detected',
    body: 'Equity allocation is 4.2% above target. AskMe can suggest a rebalance.',
    time: 'Yesterday',
    kind: 'insight',
    unread: false,
  },
  {
    id: 'n-5',
    title: 'Stamford office rent received',
    body: '$78,500 credited to JPMorgan Chase Checking ••••4127.',
    time: '2 days ago',
    kind: 'transaction',
    unread: false,
  },
  {
    id: 'n-6',
    title: 'HELOC variable rate updated',
    body: 'Your JPM HELOC rate adjusted from 7.75% to 7.50% effective May 12.',
    time: '5 days ago',
    kind: 'alert',
    unread: false,
  },
];
