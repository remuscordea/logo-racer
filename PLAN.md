# logo-racer — Project Plan

## Overview
An educational web application (mobile later) for kids, Duolingo-style, where
the child learns car brands through interactive quiz exercises, organized into
themed "worlds" and levels, with a recurring mascot (a rabbit).

Initial target: 1 user (the developer's 8-year-old daughter), no account system,
but the architecture is designed from the start to support adding users and
persisting progress in a database.

---

## Tech Stack

### Backend
- Node.js + Fastify
- REST API (not GraphQL)
- PostgreSQL (relational data: brands, levels, worlds, exercises)
- ORM: Prisma (recommended — easy migrations, type-safe, integrates well with TS)

### Frontend (web)
- React + Vite + TypeScript
- MUI with a custom theme (vibrant colors, rounded fonts, playful feel)
- react-i18next for RO/EN with toggle
- Framer Motion for animations (mascot, exercise transitions, rewards)

### Mobile (future phase)
- React Native / Expo
- Reuse: exercise types, validation logic, API client (via shared package)

### Monorepo
```
logo-racer/
├── apps/
│   ├── api/          # Fastify backend
│   └── web/          # React frontend (logos at public/assets/logos/<brand>.png)
├── packages/
│   └── shared/       # TS types, constants, shared exercise logic
├── PLAN.md
└── CLAUDE.md
```

---

## DB Schema (PostgreSQL via Prisma)

### Brand
- id
- name (e.g. "Toyota")
- logoPngPath (path to PNG 256×256 asset, e.g. "/assets/logos/toyota.png")
- difficulty (1–3, used for distractor selection)
- createdAt / updatedAt

### World (themed world)
- id
- name (e.g. "Famous Brands")
- order
- description

### Level
- id
- worldId (FK → World)
- order
- exerciseConfig (JSON: which exercise types, how many, which brands are involved)

### ExerciseType (enum, not necessarily a table)
- LOGO_TO_NAME
- NAME_TO_LOGO
- MATCHING
- TRUE_FALSE

### (Future) User
- id
- deviceId / email (auth later)
- createdAt

### (Future) Progress
- id
- userId (FK → User, nullable initially / device-based)
- levelId (FK → Level)
- completed (bool)
- stars / score
- completedAt

> Migration note: progress is stored in `localStorage` in the initial phase
> (JSON structure identical to the `Progress` table), so the migration is
> 1:1 once we move to backend + device ID / user auth.

---

## Brands (18 total)

Logos are PNG 256×256 at `apps/web/public/assets/logos/<brand>.png`.

| Brand      | File            | Difficulty |
|------------|-----------------|------------|
| BMW        | bmw.png         | 1          |
| Ferrari    | ferrari.png     | 1          |
| Ford       | ford.png        | 1          |
| Tesla      | tesla.png       | 1          |
| Toyota     | toyota.png      | 1          |
| VW         | vw.png          | 1          |
| Audi       | audi.png        | 2          |
| Dacia      | dacia.png       | 2          |
| Hyundai    | hyundai.png     | 2          |
| Kia        | kia.png         | 2          |
| Renault    | renault.png     | 2          |
| Volvo      | volvo.png       | 2          |
| Bentley    | bentley.png     | 3          |
| Citroën    | citroen.png     | 3          |
| Nissan     | nissan.png      | 3          |
| Porsche    | porsche.png     | 3          |
| Subaru     | subaru.png      | 3          |
| Suzuki     | suzuki.png      | 3          |

(Adding new brands = insert into the `Brand` table + drop a PNG in `public/assets/logos/` — no code changes required)

---

## Exercise Types

1. **LOGO_TO_NAME** — logo image + 4 text options (1 correct, 3 distractors)
2. **NAME_TO_LOGO** — brand name (text) + 4 image options (1 correct, 3 distractors)
3. **MATCHING** — "tap to connect": logos on the left, names on the right;
   the child taps a logo then the matching name; correct pair → green
   animation + lock; wrong pair → shake + reset selection
4. **TRUE_FALSE** — "Is this logo from [Brand X]?" Yes/No, for quick review

Distractors (wrong options) are chosen from brands with similar `difficulty`,
to avoid combinations that are too easy/hard.

---

## Worlds & Levels

### World 1 — "Famous Brands"
Brands (all difficulty 1, most recognisable globally): BMW, Ferrari, Ford, Tesla, Toyota, VW

| Level | Exercise types          | Brands covered                    |
|-------|-------------------------|-----------------------------------|
| 1     | LOGO_TO_NAME            | BMW, Ferrari, Toyota, VW          |
| 2     | NAME_TO_LOGO            | BMW, Ferrari, Toyota, VW, Ford    |
| 3     | MATCHING + TRUE_FALSE   | BMW, Ferrari, Ford, Tesla, Toyota, VW |

### World 2 — "On the Street"
Brands (difficulty 2, everyday cars): Audi, Dacia, Hyundai, Kia, Renault, Volvo

| Level | Exercise types          | Brands covered                         |
|-------|-------------------------|----------------------------------------|
| 1     | LOGO_TO_NAME            | Audi, Kia, Renault, Volvo              |
| 2     | NAME_TO_LOGO            | Audi, Kia, Renault, Volvo, Hyundai     |
| 3     | MATCHING + TRUE_FALSE   | Audi, Dacia, Hyundai, Kia, Renault, Volvo |

### World 3 — "Special Cars"
Brands (difficulty 3, sporty / less common): Bentley, Citroën, Nissan, Porsche, Subaru, Suzuki

| Level | Exercise types          | Brands covered                              |
|-------|-------------------------|---------------------------------------------|
| 1     | LOGO_TO_NAME            | Nissan, Porsche, Citroën, Suzuki            |
| 2     | NAME_TO_LOGO            | Nissan, Porsche, Citroën, Suzuki, Subaru    |
| 3     | MATCHING + TRUE_FALSE   | Bentley, Citroën, Nissan, Porsche, Subaru, Suzuki |

Each world ends with a badge/diploma + celebration animation.

Visual map: "path with stones" style, the rabbit mascot advances as the child completes levels.

---

## Mascot
A cute rabbit, drawn as SVG (not raster) for scalability and easy animation
with Framer Motion. Expression variants: happy (correct answer), encouraging
(wrong answer / "try again"), celebrating (end of world).

---

## Language
RO/EN with toggle (react-i18next). Brand names (Toyota, BMW, etc.) stay
identical in both languages — they're proper nouns.

---

## Legal Note (logos)
Car brand logos are registered trademarks. For personal/family use,
recreating them as simplified PNGs is acceptable. If the app is ever
published (App Store, monetization, etc.), it will be necessary to
re-evaluate using stylized/silhouette representations instead of exact logos.

---

## Implementation Phases

**Phase 0 — Setup** ✅
- Monorepo (apps/api, apps/web, packages/shared)
- Prisma + PostgreSQL (initial schema: Brand, World, Level)
- Fastify skeleton with basic REST routes (`/brands`, `/worlds`, `/levels`)
- Vite + React + TS + MUI skeleton, basic custom theme
- i18n setup (RO/EN toggle working)

**Phase 1 — Data + API** ✅
- Updated brand list to 18 brands (PNG assets)
- Seed DB with 18 brands + 3 worlds + 9 levels
- Complete REST endpoints for brands/worlds/levels

**Phase 2 — Exercises (core gameplay)**
- Implement components for the 4 exercise types
- Distractor selection logic (based on `difficulty`)
- Exercise screen with feedback (correct/incorrect) + mascot integration

**Phase 3 — Roadmap UI + progress**
- Visual map of worlds/levels
- Save progress to localStorage (structure compatible with the future
  `Progress` table)
- Badges/diplomas at the end of each world

**Phase 4 — Mascot + polish**
- Rabbit SVG + expression variants + Framer Motion animations
- Sound/feedback (optional)
- Responsive design (mobile preparation)

**Phase 5 (future)** — Auth + progress migration to DB, React Native mobile client
