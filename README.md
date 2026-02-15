# CodeWorld

A minimal TypeScript web app built with Vite, React, and TypeScript. Includes a Playground (text stats + copy) and Settings (theme toggle with localStorage). Works on Windows 10/11.

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
| `pnpm run lint`      | Run ESLint + Prettier check    |
| `pnpm run typecheck` | Run TypeScript check (no emit) |
| `pnpm run test`      | Run Vitest unit tests          |

## Run locally

```bash
pnpm install
pnpm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`). Use the sidebar to open **Home**, **Playground** (paste text, see word/character/line counts, copy), and **Settings** (dark/light theme persisted in localStorage).

## Verify

Full check (lint, typecheck, test, build):

```bash
pnpm install && pnpm run lint && pnpm run typecheck && pnpm run test && pnpm run build
```

All commands should exit with code 0.
