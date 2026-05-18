# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Orbis by Lumenore is a wealth intelligence dashboard for US HNI/UHNI family offices, built as a purely client-side React/TypeScript/Vite SPA with hardcoded mock data. There is no backend, database, or external API.

### Branch structure

The `main` branch contains only a README. All application code lives on feature branches:

- `cursor/build-orbis-wealth-platform-e617` — Full-featured version with React Router, Tailwind CSS, Radix UI, ESLint script (no config file committed), and modular page/component structure.
- `cursor/orbis-demo-app-7366` — Simpler single-file demo version using plain CSS and Recharts.

**You must check out a feature branch before running any dev commands.**

### Running the apps

Both branches use `npm` (lockfile: `package-lock.json`).

```bash
npm install
npm run dev          # starts Vite dev server (default: http://localhost:5173)
npm run build        # tsc -b && vite build
npm run preview      # preview production build
```

### Lint

Only the platform branch (`cursor/build-orbis-wealth-platform-e617`) has a `lint` script (`eslint .`), but no ESLint config file is committed, so it will error. TypeScript type-checking via `npx tsc -b` works on both branches.

### Known caveats

- Node.js v22 and npm v10 are confirmed working for both branches.
- The platform branch uses Vite 5; the demo branch uses Vite 8 — different major versions, so `node_modules` must be reinstalled when switching branches.
- No `.env` or secrets are needed; all data is mock/hardcoded.
- No tests are configured in either branch (no test runner or test files).
