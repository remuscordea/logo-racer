# logo-racer — Project Conventions

Educational car-brand quiz game for kids (Duolingo-style), built as an npm
workspaces monorepo. See [PLAN.md](PLAN.md) for the full product plan and
phased roadmap.

## Stack

- **apps/api** — Node.js + Fastify (TS, ESM), REST API, Prisma ORM + PostgreSQL
- **apps/web** — React + Vite + TypeScript, MUI (custom theme), react-i18next (RO/EN)
- **packages/shared** — shared TS types and constants (brands, worlds, exercise types)
- **apps/mobile** (future) — React Native / Expo, reusing `packages/shared`

## Structure

```
logo-racer/
├── apps/
│   ├── api/    # Fastify backend (src/, prisma/schema.prisma)
│   └── web/    # React frontend (src/)
├── packages/
│   └── shared/ # shared types & constants
├── PLAN.md
└── CLAUDE.md
```

## Commands

- `npm run dev:api` — run the API in watch mode
- `npm run dev:web` — run the web app (Vite dev server)
- `npm run build` — build all workspaces
- `npm run lint` — lint all workspaces
- `npm run prisma:migrate --workspace=apps/api` — run Prisma migrations
- `npm run prisma:generate --workspace=apps/api` — regenerate the Prisma client

Copy `apps/api/.env.example` to `apps/api/.env` and point `DATABASE_URL` at a
local PostgreSQL instance before running the API.

## Conventions

- TypeScript everywhere, strict mode on.
- Shared types/constants (brands, worlds, exercise configs) live in
  `packages/shared` — import via `@logo-racer/shared`, never duplicate.
- New car brands are added via the `Brand` table/seed + an SVG asset — no
  code changes required.
- i18n: all user-facing strings go through `react-i18next` with both `en`
  and `ro` translations added together (`apps/web/src/i18n/locales`).

## Workflow

- Work happens on short-lived branches off `main`, named
  `<type>/<short-description>` (e.g. `feat/matching-exercise`,
  `fix/distractor-selection`).
- Open a PR for every change, even small ones. Keep PRs focused and scoped
  to one phase/feature from PLAN.md.
- Ensure `npm run build` and `npm run lint` pass before opening a PR.
- Merge via PR (no direct pushes to `main`); delete the branch after merge.
