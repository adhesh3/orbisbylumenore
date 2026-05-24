# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Orbis by Lumenore is a wealth intelligence dashboard for US HNI/UHNI family offices, built as a purely client-side React/TypeScript/Vite SPA with hardcoded mock data. There is no backend, database, or external API.

### Branch structure

The `main` branch contains only a README. All application code lives on feature branches:

- `cursor/build-orbis-wealth-platform-e617` — Full-featured version with React Router, Tailwind CSS, Radix UI, and modular page/component structure.
- `cursor/orbis-demo-app-7366` — Simpler single-file demo version using plain CSS and Recharts.

**You must check out a feature branch before running any dev commands.**

### Running the apps

Both branches use `npm` (lockfile: `package-lock.json`). See `package.json` for all scripts:

```bash
npm install
npm run dev          # starts Vite dev server (default: http://localhost:5173)
npm run build        # tsc -b && vite build
npm run preview      # preview production build
```

### Lint and type checking

- TypeScript type-checking: `npx tsc -b` (works on both branches).
- The platform branch has `npm run lint` (`eslint .`), but no ESLint config file is committed, so it will error. Rely on `tsc -b` for static analysis.
- No test framework or test files are configured on either branch.

### Known caveats

- Node.js v22 and npm v10 are confirmed working.
- The platform branch uses Vite 5; the demo branch uses Vite 8. `node_modules` must be reinstalled when switching branches.
- No `.env` or secrets are needed; all data is mock/hardcoded.
