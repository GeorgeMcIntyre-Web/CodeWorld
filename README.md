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

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `pnpm run dev`       | Start dev server (e.g. :5173)        |
| `pnpm run build`     | Production build to `dist/`          |
| `pnpm run preview`   | Serve production build locally       |
| `pnpm run deploy`    | Build and deploy to Cloudflare Pages |
| `pnpm run lint`      | Run ESLint + Prettier check          |
| `pnpm run typecheck` | Run TypeScript check (no emit)       |
| `pnpm run test`      | Run Vitest unit tests                |
| `pnpm run test:e2e`  | Run Playwright E2E tests             |

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

### GitHub OAuth (in-app sign-in)

To let users sign in with GitHub and see “Signed in as …” and Sign out in the app:

1. **Connect the repo to Cloudflare Pages with Git** (required for server-side auth). In Pages → Create project → **Connect to Git**, select the repo. Set **Build command** to `pnpm run build`, **Build output directory** to `dist`. Deploy. This deploys both the static app and the `/functions` API (login, callback, me, logout).
2. **Create a GitHub OAuth App**: GitHub → Settings → Developer settings → [OAuth Apps](https://github.com/settings/developers) → New OAuth App. **Homepage URL**: your site (e.g. `https://your-project.pages.dev`). **Authorization callback URL**: `https://<your-pages-host>/api/auth/callback` (same host as the site). Note the **Client ID** and generate a **Client secret**.
3. **Set environment variables** in Cloudflare Pages: project → Settings → Environment variables. Add **GITHUB_CLIENT_ID**, **GITHUB_CLIENT_SECRET**, and **SESSION_SECRET** (a random string for signing sessions, e.g. `openssl rand -hex 32`). Redeploy so the Functions pick them up.

If these are set and you do not set `VITE_AUTH_URL`, the Login page shows **Sign in with GitHub** and the app shows “Signed in as …” and Sign out after auth.

### Protecting the site with Cloudflare Access

To require login before anyone can open the deployed site (e.g. your `*.pages.dev` or custom domain):

1. In [Cloudflare Dashboard](https://dash.cloudflare.com) go to **Zero Trust** → **Access** → **Applications**.
2. **Add an application**: choose **Self-hosted**; set the application name and **Session Duration** if you want.
3. **Application domain**: add your site hostname (e.g. `codeworld-2m2.pages.dev` or your custom domain). Use the same subdomain you use to open the app.
4. **Policies**: add a policy (e.g. **Include** → **Non-identity** → **One-time PIN** for email-based login, or add an IdP like Google/GitHub). Save.
5. After that, opening the site in a browser will show the Access login first; after auth, users see the app.

The in-app **Sign in** link and `/login` page are still useful for re-authenticating (e.g. after session expiry). Set `VITE_AUTH_URL` to your site’s own URL (e.g. `https://your-site.pages.dev`) so the Sign in button sends users to the same origin and Access will challenge them again.

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
