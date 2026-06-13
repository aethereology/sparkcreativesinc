# SparkCreatives Inc — Website

Next.js 16 app for [sparkcreativesinc.org](https://sparkcreativesinc.org).

## Development

```bash
npm install
npm run dev        # http://localhost:3000 — Turbopack
npm run lint       # ESLint
npm run typecheck  # TypeScript (no emit)
npm run build      # Production build
```

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in the values before running locally.

## Structure

```
src/
  app/          # Next.js App Router pages and layouts
  components/   # Shared UI components
  content/      # Static content and data (programs, org facts, CTAs)
  lib/          # Utilities, schema helpers, rate limiting
```

## Key conventions

- Four public programs: Spark Boxes, Spark Labs, Spark Studio, Spark Supply Network
- Do not invent metrics, leadership details, or legal claims — mark unknowns `TODO: leadership confirm`
- All CTAs come from `src/content/ctas.ts`
- Schema helpers live in `src/lib/schema.ts`
