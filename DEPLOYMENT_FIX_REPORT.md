# Deployment Fix Report

## Problem found

The project source code was not the main deployment problem. The build was able to compile, but the deployment package had two dangerous Vercel install issues:

1. `package.json` used many `"latest"` dependency versions. That makes Vercel resolve moving targets during fresh installs and can break without any code change.
2. `package-lock.json` pointed package tarballs to an internal sandbox npm registry URL instead of the public npm registry. Vercel cannot access that internal registry, so deployment can fail during `npm install` before the app reaches `npm run build`.

## Fixes applied

- Replaced all `"latest"` dependencies in `package.json` with exact locked versions.
- Rewrote all `package-lock.json` resolved tarball URLs from the internal sandbox registry to `https://registry.npmjs.org/`.
- Added the public npm registry explicitly in `.npmrc`.
- Changed Vercel install command from `npm install --no-audit --no-fund` to `npm ci --no-audit --no-fund` for deterministic production deployment.
- Kept the existing Next.js deployment-safe worker configuration because removing it caused the build to hang during page-data/build-trace collection in this environment.

## Verification completed

The following commands were executed successfully after the fixes:

```bash
npm install --no-audit --no-fund
npm run typecheck
npm run build
```

Additional deterministic deployment verification was also completed with:

```bash
npm ci --no-audit --no-fund --registry=https://registry.npmjs.org/
npm run typecheck
npm run build
```

## Verified build output

The production build completed successfully and generated these routes:

- `/`
- `/_not-found`
- `/auth/forgot-password`
- `/auth/login`
- `/auth/register`
- `/dashboard`
- `/dashboard/[role]`
- `/dashboard/[role]/[...section]`
- `/dashboard/[role]/settings`

## Vercel settings to use

Use these settings in Vercel:

```text
Framework Preset: Next.js
Install Command: npm ci --no-audit --no-fund
Build Command: npm run deploy:check
Output Directory: .next
Node.js Version: 20.x
```

## Required environment variables

Set these in Vercel Project Settings > Environment Variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://dadtorrtahknyhaybcac.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your Supabase anon key>
SUPABASE_SERVICE_ROLE_KEY=<your Supabase service role key>
DATABASE_URL=<your Supabase database or pooler URL>
NEXT_PUBLIC_APP_URL=<your deployed Vercel URL>
NEXT_TELEMETRY_DISABLED=1
```

Do not commit real secret values into GitHub.
