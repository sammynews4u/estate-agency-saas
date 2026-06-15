# EstateFlow Pro: Vercel Deployment Guide

This project is prepared for deployment on Vercel with Supabase as the database/auth/storage backend.

## Supabase project

Project ref: `dadtorrtahknyhaybcac`

Public Supabase URL:

```bash
https://dadtorrtahknyhaybcac.supabase.co
```

## Critical security note

The Supabase Postgres password was shared in chat. Do not treat it as private anymore. Rotate the database password inside Supabase before production deployment.

Do not commit the database connection string, service role key, or any real secret into GitHub.

## Required Vercel environment variables

Add these in:

```text
Vercel Dashboard > Project > Settings > Environment Variables
```

```bash
NEXT_PUBLIC_SUPABASE_URL=https://dadtorrtahknyhaybcac.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<copy from Supabase Project Settings > API>
SUPABASE_SERVICE_ROLE_KEY=<copy from Supabase Project Settings > API, keep server-only>
DATABASE_URL=<your Supabase Postgres connection string>
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
NEXT_TELEMETRY_DISABLED=1
```

Recommended: for serverless production workloads, use the Supabase pooler connection string where possible instead of the direct database connection string.

## Local setup

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Deploy through GitHub and Vercel

1. Create a GitHub repository.
2. Push this project folder to GitHub.
3. Go to Vercel and import the repository.
4. Framework Preset: `Next.js`.
5. Install Command: `npm install --no-audit --no-fund`.
6. Build Command: `npm run deploy:check`.
7. Output Directory: `.next`.
8. Add all environment variables listed above.
9. Deploy.

## Supabase migrations

Run the SQL files in this order from `supabase/migrations`, then run `supabase/seed.sql`.

You can use either:

1. Supabase SQL Editor, by copying and running each migration manually in order, or
2. Supabase CLI:

```bash
npx supabase login
npx supabase link --project-ref dadtorrtahknyhaybcac
npx supabase db push
```

## Deployment validation

Before deploying, run:

```bash
npm run typecheck
npm run build
```

Or:

```bash
npm run deploy:check
```

## What is now Vercel-ready

- Next.js App Router configuration
- Vercel config file
- Environment templates
- Supabase browser client
- Supabase server client
- Supabase admin client helper
- Node 20+ engine requirement
- Build scripts
- Deployment guide
- Git ignore and Vercel ignore rules

## Current product limitation

The dashboards are module foundations using demo/local UI state. The database schema and RLS are prepared, but the next real engineering phase is connecting every module to live Supabase CRUD, Supabase Storage uploads, notifications, activity logs, and strict permission checks.

## Build strategy used

The module URLs are served through a catch-all dashboard route, for example:

```text
/dashboard/agency/properties
/dashboard/agent/follow-ups
/dashboard/client/transactions
/dashboard/super-admin/risk-control
```

This keeps all module routes alive while avoiding a bloated Vercel production build. The database migrations and module source components remain in the project for the next phase of live Supabase CRUD wiring.
