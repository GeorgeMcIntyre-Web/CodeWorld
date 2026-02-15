# CodeWorld

A minimal TypeScript web app built with Vite, React, and TypeScript. Includes a Playground (text stats + copy) and Settings (theme toggle with localStorage). Works on Windows 10/11.

For upcoming work and phases, see [ROADMAP.md](ROADMAP.md). **For AI agents (Cursor, Claude Code, Antigravity, Codex):** See [AGENTS.md](AGENTS.md) for project context, commands, and conventions; see [ROADMAP.md](ROADMAP.md) for next steps.

## Prerequisites

- **Node.js** 20.x or later
- **pnpm** (install with `npm install -g pnpm`)

## Setup

Clone the repository, then install dependencies:

```bash
pnpm install
```

## Scripts

| Command              | Description                    |
| -------------------- | ------------------------------ |
| `pnpm run dev`       | Start dev server (e.g. :5173)  |
| `pnpm run build`     | Production build to `dist/`    |
| `pnpm run preview`   | Serve production build locally |
| `pnpm run deploy`   | Build and deploy to Cloudflare Pages |
| `pnpm run lint`      | Run ESLint + Prettier check    |
| `pnpm run typecheck` | Run TypeScript check (no emit) |
| `pnpm run test`      | Run Vitest unit tests          |

## Run locally

```bash
pnpm install
pnpm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`). Use the sidebar to open **Home**, **Playground** (paste text, see word/character/line counts, copy), **Settings** (dark/light theme persisted in localStorage), and **Sign in** (auth).

## Auth

A **Sign in** link in the top bar and sidebar goes to `/login`. To enable sign-in, set the auth URL and rebuild:

- Create a `.env` file (or set in your deployment environment) with:
  - `VITE_AUTH_URL=<your-auth-url>`  
  Example: your Cloudflare Access login URL, or an OAuth provider’s authorization URL.
- Run `pnpm run build` (or `pnpm run dev`) so the app picks up the variable.

With `VITE_AUTH_URL` set, the Login page shows a **Sign in** button that redirects to that URL so you can complete auth.

## Deploy (Cloudflare Pages)

Prerequisites: a [Cloudflare](https://dash.cloudflare.com) account. Wrangler is included as a dev dependency.

1. **First-time auth**: use Cloudflare browser login (recommended when not using CI). In PowerShell, unset any existing API token so Wrangler can use OAuth:
   ```powershell
   $env:CLOUDFLARE_API_TOKEN = $null
   npx wrangler login
   ```
   A browser window will open to sign in to Cloudflare. After that, `pnpm run deploy` will use this session. (For CI only, set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` instead.)
2. **Create a Pages project** (once): in the dashboard go to Pages → Create project → Direct Upload, or run:
   ```bash
   npx wrangler pages project create codeworld --production-branch=main
   ```
3. **Deploy**: run `pnpm run deploy`. This builds the app and uploads `dist/` to the Cloudflare Pages project named `codeworld`. Change the project name in the `deploy` script in [package.json](package.json) if your project has a different name.

## CI/CD (GitHub Actions)

On every **push** and **pull request**, GitHub Actions runs lint, typecheck, test, and build so the main branch stays green.

On **push to `main`**, the workflow deploys to Cloudflare Pages **only if** these repository secrets are set:

- **`CLOUDFLARE_API_TOKEN`**: Create a token at [Cloudflare Dashboard → Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens) with **Workers Pages** edit permissions (or an account-level token that can deploy Pages).
- **`CLOUDFLARE_ACCOUNT_ID`**: Your account ID (Cloudflare dashboard, right sidebar).

Add them under **GitHub repo → Settings → Secrets and variables → Actions**. If either secret is missing, the quality job still runs; the deploy job is skipped so CI does not fail before secrets are configured.

## Verify

Full check (lint, typecheck, test, build):

```bash
pnpm install && pnpm run lint && pnpm run typecheck && pnpm run test && pnpm run build
```

All commands should exit with code 0.
