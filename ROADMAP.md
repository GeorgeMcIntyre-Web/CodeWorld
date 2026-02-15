# CodeWorld roadmap and plan

High-level phases and themes. Each phase can be turned into a detailed plan before implementation.

---

## Done

| Phase                             | Summary                                                                                                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bootstrap**                     | Vite + React + TypeScript, layout (top bar, sidebar), Home / Playground / Settings, theme (dark/light + localStorage), text stats + copy, ESLint/Prettier/Vitest, README. |
| **Deploy**                        | Cloudflare Pages via Wrangler CLI, `pnpm run deploy`, `public/_redirects` for SPA, README Deploy section.                                                                 |
| **Auth entry**                    | Sign in link in nav, `/login` page, `VITE_AUTH_URL` for redirect to IdP (e.g. Cloudflare Access).                                                                         |
| **CI/CD**                         | GitHub Actions: lint, typecheck, test, build on push/PR; deploy to Cloudflare Pages on push to `main` when secrets are set.                                               |
| **E2E testing**                   | Playwright; Playground (word/char/line counts, Copy disabled when empty) and Settings (theme toggle) E2E tests; run in CI after build.                                    |
| **Full auth (Cloudflare Access)** | README documents protecting the site with Cloudflare Access (Zero Trust); in-app Sign in / `VITE_AUTH_URL` for re-auth.                                                   |

---

## Next phases (candidate order)

### 1. Full auth (OAuth in-app, optional)

- **Goal:** Protect the site or features with real auth; optional “signed-in” state in the app.
- **Options:**
  - **Cloudflare Access:** Protect the whole Pages site; no in-app login UI beyond the existing link.
  - **OAuth (e.g. Google/GitHub):** Implement OAuth flow (or use a BaaS); show “Signed in as …” and optional Sign out; optionally gate Playground or future features.
- **In scope:** Choose one path; wire login/callback; persist session (cookie or token); optional Sign out and user display in layout.
- **Out of scope:** Full user database; custom username/password; multiple IdPs in v1.

### 2. New features and pages

- **Goal:** Expand the app with more tools and pages.
- **Ideas:**
  - More playground utilities (e.g. JSON formatter, base64 encode/decode, diff viewer).
  - New top-level pages (e.g. Docs, Tools index).
  - Playground: save snippets (local only or backend later).
  - Settings: more options (e.g. default theme, font size).
- **In scope:** Define 1–2 concrete features per iteration; keep routing and layout consistent.
- **Out of scope:** Backend/DB until explicitly planned.

### 3. Backend / API (optional)

- **Goal:** Add server-side logic or persistence when needed by features.
- **Options:**
  - **Cloudflare Workers + D1/KV:** API routes and simple DB or key-value store.
  - **External API:** Use a third-party API for a specific feature (e.g. paste expiry).
- **In scope:** One clear use case (e.g. “save snippet”, “user preferences in DB”); API design; auth for API if app is authenticated.
- **Out of scope:** Full backend rewrite; generic CRUD for everything.

### 4. Docs, accessibility, and polish

- **Goal:** Better docs for contributors and users; accessibility and UX polish.
- **In scope:** CONTRIBUTING.md (or similar) with dev workflow and PR expectations; basic a11y (focus, labels, contrast); README updates for new features; optional Storybook or component docs.
- **Out of scope:** Full design system; marketing site.

### 5. Observability and operations

- **Goal:** Know when the app or deploy pipeline breaks; optional usage insight.
- **In scope:** CI failure notifications (e.g. Slack/email); optional health check or status page; optional analytics (privacy-preserving, e.g. Cloudflare Web Analytics).
- **Out of scope:** Full APM; on-call runbooks (unless you add them later).

---

## How to use this roadmap

- **Pick a phase** and break it into a short plan (acceptance criteria, files, verification).
- **Order** can change: e.g. do “New features” before “Full auth” if you want to ship tools first.
- **Backend** is optional until a feature clearly needs it.

---

## Quick reference: tech stack

- **Frontend:** Vite, React, TypeScript, React Router, plain CSS (theme via CSS variables).
- **Hosting:** Cloudflare Pages (static).
- **CI:** GitHub Actions (quality + deploy on `main` with secrets).
- **Auth (current):** Link to external IdP via `VITE_AUTH_URL`; no session in app yet.
