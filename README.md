# Orbis by Lumenore

A premium, production-grade wealth intelligence platform designed for High Net Worth (HNI) and Ultra-High Net Worth (UHNI) individuals and their families in the United States. All amounts are denominated in USD.

The demo family is the **Whitman Family** based in Greenwich, CT — a credible UHNI household with a net worth of approximately **$74.4M**, spanning real estate (Greenwich, NYC, Aspen, Hamptons, Stamford, Napa), public equities (NYSE / NASDAQ), mutual funds (Vanguard / Fidelity), retirement accounts (401(k), IRAs, SEP IRA, HSA), CDs, US Treasuries, municipal & corporate bonds, REITs, VC investments (Anthropic, Cursor, Brex, Ramp, SpaceX, Stripe), gold & silver, art (Rothko, Koons, Banksy, Leibovitz), and a Sunseeker yacht.

## Tech stack

- React 18 + TypeScript + Vite
- Tailwind CSS (with custom navy / gold premium palette)
- Recharts for all visualizations
- Radix primitives for accessible Dropdown / Dialog
- React Router for navigation
- Lucide for icons

## Modules

Dashboard · Family · Net Worth · Banks & Accounts · Investments (CDs, Mutual Funds, Public Stocks, Private/ESOPs, VC, Bonds, Gold & Silver, REITs, Retirement) · Income · Expenses · Assets (Real Estate, Vehicles, Jewellery, Art) · Loans & Liabilities · Education · Insurance · Reminders & Alerts · Reports · Settings · Setup (onboarding wizard) · AskMe AI

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Key design decisions

- **All numbers are USD.** Real estate, securities, funds, vehicles, and locations are US-centric. The currency selector is locked to USD.
- **Live calculations.** Net worth, totals, and YoY/MoM deltas are computed from the underlying data — no hand-entered summary figures.
- **Premium aesthetic.** Light backgrounds with navy (`#1B2A4A`) and gold (`#C9A84C`) accents, Playfair Display for hero numbers, Inter for body.
- **Setup wizard.** First-time users land on `/setup` (6-step wizard) to onboard their family, accounts, investments, assets, and insurance. The Settings page also surfaces a "Run setup wizard" CTA.
- **AskMe.** Floating button (bottom right), top-right navbar button, and sidebar entry — three discoverability points. The chatbot has read-access to the data and responds with calculations.
- **Notifications.** Bell in the topbar shows six demo notifications (reminders, alerts, transactions, insights) with unread counts.
