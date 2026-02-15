# CodeWorld – context for AI agents

Use this file for project context so Cursor, Claude Code, Antigravity, and Codex stay aligned.

## Project

- **Name:** CodeWorld
- **Description:** Minimal TypeScript web app: Playground (text stats + copy), Settings (theme), Sign in link; deployed on Cloudflare Pages.

## Stack

- **Frontend:** Vite, React, TypeScript, React Router, plain CSS (theme via CSS variables). No component library beyond React.
- **Hosting:** Cloudflare Pages (static). Deploy via Wrangler CLI.
- **CI:** GitHub Actions (lint, typecheck, test, build on push/PR; deploy to Pages on push to `main` when secrets are set).
- **Node:** 20+. Package manager: pnpm.

## Commands

- `pnpm install` – install dependencies
- `pnpm run dev` – start dev server
- `pnpm run build` – production build to `dist/`
- `pnpm run preview` – serve `dist/` locally
- `pnpm run deploy` – build and deploy to Cloudflare Pages
- `pnpm run lint` – ESLint + Prettier check
- `pnpm run typecheck` – TypeScript check (no emit)
- `pnpm run test` – Vitest unit tests

After making edits, run `pnpm run lint` and `pnpm run typecheck` (and `pnpm run test` when touching code under test) when possible.

## Structure

- **Root:** `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `public/` (e.g. `_redirects`).
- **src:** `main.tsx`, `App.tsx`, `App.css`; `pages/` (Home, Playground, Settings, Login); `lib/` (e.g. `textStats.ts`); `hooks/` (e.g. `useTheme.ts`).
- **Config:** ESLint (flat config), Prettier, Vitest in `vite.config.ts`.
- Key entry: `src/App.tsx` (router + layout). Next steps: see `ROADMAP.md`.

## Conventions

- No UI component library beyond React; use plain CSS. Theme: CSS variables + `data-theme` on root; persisted in localStorage.
- New pages go under `src/pages/` and get a route in `src/App.tsx`.
- Prefer pure functions in `src/lib/` for logic that needs unit tests (e.g. `getTextStats`).
- Follow existing patterns (e.g. Playground, Settings) for layout and styling.

## Quality

- Before committing: run `pnpm run lint && pnpm run typecheck && pnpm run test` (or at least lint and typecheck).
- CI runs these on every push and PR; deploy runs only on push to `main` when `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are set in GitHub secrets.

## Next steps

See **ROADMAP.md** for phases and priorities: E2E testing, full auth (Cloudflare Access or OAuth), new features and pages, optional backend/API, docs and accessibility, observability. Pick the next phase from there and implement it.
