# Runtime 500 Fix Report

## Problem
Clicking **View Demo** opened `/dashboard/super-admin`, but the deployed site could return **500 / Internal Server Error** on Vercel.

## Root cause
The dashboard was a demo-only, static-data dashboard, but Next.js was still outputting these routes as dynamic server-rendered routes:

- `/dashboard/[role]`
- `/dashboard/[role]/[...section]`
- `/dashboard/[role]/settings`

That meant Vercel had to execute serverless runtime functions just to show demo pages. For a dashboard that does not need runtime database queries yet, this is a bad deployment shape. It creates avoidable runtime failure points.

## Fix applied
The dashboard demo routes have been converted to static generated routes:

- Added `generateStaticParams()` for all valid role dashboards.
- Added `generateStaticParams()` for all known sidebar/module routes.
- Added `generateStaticParams()` for all role settings pages.
- Added `dynamic = 'force-static'`.
- Added `dynamicParams = false` so unsupported dashboard paths do not hit a server function.
- Limited middleware to only `/dashboard` redirect, so `/dashboard/super-admin` is no longer processed by middleware.
- Replaced the dashboard overview Recharts component with a static SVG chart to remove server-side chart measurement warnings.

## Verification performed
The following commands passed locally:

```bash
npm run typecheck
npm run build
```

Production server route checks passed:

```text
/                                  200
/dashboard/super-admin             200
/dashboard/super-admin/users       200
/dashboard/agency/properties       200
/dashboard/super-admin/settings    200
/dashboard                         307 -> /dashboard/super-admin
```

## Expected Vercel output
The dashboard routes should now appear as `● SSG` rather than `ƒ Dynamic` in the Next.js build output.

That is the point: the View Demo dashboard should be served as static HTML, not as a fragile serverless function.
