# EstateFlow Pro

EstateFlow Pro is a multi-role real estate operating-system foundation built with Next.js App Router, TypeScript, Tailwind CSS, Supabase Auth, Supabase PostgreSQL, RLS-ready migrations, role-based dashboards and reusable business modules.

This build now contains twenty-two module foundations. The dashboard routes are consolidated through a Vercel-safe catch-all route so the project can build cleanly and deploy reliably. The full Supabase schema, RLS policies and seed data are included for live database wiring.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn-style local UI components
- Lucide React icons
- Supabase Auth-ready structure
- Supabase PostgreSQL migrations
- Supabase Row Level Security policies
- TanStack Table
- Recharts

## Included modules

1. Property Marketplace
2. CRM / Lead Management
3. Appointment & Viewing Management
4. Automated Follow-Up System
5. Receipt & Invoice System
6. Document Management
7. Property Valuation Tool
8. AI Real Estate Assistant
9. Referral Network
10. Property Discovery / Lead Discovery Tool
11. Agent Management System
12. Finance & Business Management
13. Property Management System
14. Real Estate Service Marketplace
15. Construction & Development Module
16. Reports & Analytics Module
17. Marketing Campaign Studio
18. KYC & Compliance Verification
19. Deal Pipeline & Transaction Management
20. Customer Support & Ticketing
21. Subscription & Billing Plans
22. Audit, Risk & Internal Control

## Role dashboards

The system includes dashboard routes for:

- Super Admin
- Agency Admin
- Agent
- Client/User
- Landlord/Seller
- Service Provider
- Developer
- Finance/Staff User

## Important routes

```text
/dashboard/super-admin
/dashboard/super-admin/users
/dashboard/super-admin/agencies
/dashboard/super-admin/activity
/dashboard/super-admin/marketing

/dashboard/agency
/dashboard/agency/properties
/dashboard/agency/clients
/dashboard/agency/leads
/dashboard/agency/appointments
/dashboard/agency/follow-ups
/dashboard/agency/marketing
/dashboard/agency/valuation
/dashboard/agency/ai-assistant
/dashboard/agency/discovery
/dashboard/agency/referrals
/dashboard/agency/property-management
/dashboard/agency/services
/dashboard/agency/finance
/dashboard/agency/invoices
/dashboard/agency/receipts
/dashboard/agency/documents
/dashboard/agency/verification
/dashboard/agency/reports

/dashboard/agent
/dashboard/agent/properties
/dashboard/agent/clients
/dashboard/agent/leads
/dashboard/agent/appointments
/dashboard/agent/follow-ups
/dashboard/agent/marketing
/dashboard/agent/valuation
/dashboard/agent/ai-assistant
/dashboard/agent/discovery
/dashboard/agent/referrals
/dashboard/agent/property-management
/dashboard/agent/documents
/dashboard/agent/verification
/dashboard/agent/commissions

/dashboard/client
/dashboard/client/browse-properties
/dashboard/client/saved-properties
/dashboard/client/appointments
/dashboard/client/services
/dashboard/client/documents
/dashboard/client/verification

/dashboard/landlord
/dashboard/landlord/submit-property
/dashboard/landlord/properties
/dashboard/landlord/appointments
/dashboard/landlord/property-management
/dashboard/landlord/services
/dashboard/landlord/valuation
/dashboard/landlord/documents
/dashboard/landlord/verification

/dashboard/service-provider
/dashboard/service-provider/profile
/dashboard/service-provider/requests
/dashboard/service-provider/quotes
/dashboard/service-provider/portfolio
/dashboard/service-provider/reviews
/dashboard/service-provider/documents
/dashboard/service-provider/verification

/dashboard/developer
/dashboard/developer/projects
/dashboard/developer/units
/dashboard/developer/sales
/dashboard/developer/marketing
/dashboard/developer/progress
/dashboard/developer/documents
/dashboard/developer/verification
/dashboard/developer/reports

/dashboard/finance
/dashboard/finance/invoices
/dashboard/finance/receipts
/dashboard/finance/expenses
/dashboard/finance/payroll
/dashboard/finance/reports
/dashboard/super-admin/subscriptions
/dashboard/super-admin/risk-control
/dashboard/super-admin/support

/dashboard/agency/transactions
/dashboard/agency/support
/dashboard/agency/subscription
/dashboard/agency/risk-control

/dashboard/finance/transactions
/dashboard/finance/subscriptions
/dashboard/finance/risk-control
/dashboard/finance/support
```

## Construction & Development Module

Added routes:

- `/dashboard/developer/projects`
- `/dashboard/developer/units`
- `/dashboard/developer/sales`
- `/dashboard/developer/progress`

Included features:

- Developer project register
- Project status tracking
- Unit inventory
- Unit status control
- Construction milestone tracking
- Contractor/risk note tracking
- Project sales tracking
- Deposit and closing pipeline
- Project health cards
- Supabase schema and RLS for developer projects, units, progress records and development sales

## Reports & Analytics Module

Added routes:

- `/dashboard/agency/reports`
- `/dashboard/developer/reports`
- `/dashboard/super-admin/activity`

Included features:

- Revenue/activity trend charts
- Property mix chart
- Lead conversion funnel
- Discovery source performance
- Agent performance summaries
- Developer project analytics
- Insight table
- Export history table
- Period filter UI
- Supabase schema and RLS for report snapshots, analytics insights and report exports


## Marketing Campaign Studio

Added routes:

- `/dashboard/super-admin/marketing`
- `/dashboard/agency/marketing`
- `/dashboard/agent/marketing`
- `/dashboard/developer/marketing`

Included features:

- Campaign register
- WhatsApp, email, SMS, social, portal and offline channel structure
- Audience targeting for buyers, tenants, landlords, sellers, investors and developers
- Campaign budget tracking
- Leads generated and viewing conversion metrics
- Creative asset workflow
- Campaign planner cards
- Integration-ready delivery boundary for future WhatsApp/SMS/email APIs
- Supabase schema and RLS for campaigns, assets and schedules

## KYC & Compliance Verification

Added routes:

- `/dashboard/agency/verification`
- `/dashboard/agent/verification`
- `/dashboard/client/verification`
- `/dashboard/landlord/verification`
- `/dashboard/service-provider/verification`
- `/dashboard/developer/verification`

Included features:

- Verification record register
- Identity, address, ownership, agency licence, provider licence, developer project and tenant KYC types
- Risk level tracking
- Verification status updates
- Compliance checklist
- Risk policy cards
- Document upload-ready interface
- Supabase schema and RLS for verification records and compliance checklist items


## Deal Pipeline & Transaction Management

Added routes:

- `/dashboard/agency/transactions`
- `/dashboard/agent/transactions`
- `/dashboard/client/transactions`
- `/dashboard/landlord/transactions`
- `/dashboard/finance/transactions`

Included features:

- Sale, rent, lease and off-plan transaction pipeline
- Deal value and expected commission tracking
- Closing stage updates
- Transaction priority and risk notes
- Checklist progress tracking
- Document count awareness
- Closing task board
- Finance-facing transaction control view
- Supabase schema and RLS for deal transactions, transaction tasks and transaction checklist items

## Customer Support & Ticketing

Added routes:

- `/dashboard/super-admin/support`
- `/dashboard/agency/support`
- `/dashboard/agent/support`
- `/dashboard/client/support`
- `/dashboard/landlord/support`
- `/dashboard/service-provider/support`
- `/dashboard/developer/support`
- `/dashboard/finance/support`

Included features:

- Support ticket register
- Account, technical, property, billing, verification and service-request categories
- Ticket priority and SLA status tracking
- Escalation status workflow
- Ticket reply history
- Internal note structure
- SLA rule cards
- Supabase schema and RLS for support tickets, ticket messages and SLA rules


## Latest added modules: Subscription/Billing Plans and Audit/Risk Control

### Subscription & Billing Plans

Added routes:

- `/dashboard/super-admin/subscriptions`
- `/dashboard/agency/subscription`
- `/dashboard/finance/subscriptions`

Included features:

- Platform subscription register
- Starter, Growth and Enterprise plan structure
- Billing cycle tracking
- Seat, listing, AI credit and storage usage limits
- Feature gate matrix
- Subscription status workflow
- Renewal risk tracking
- Supabase schema and RLS for platform subscriptions, feature gates and usage events

### Audit, Risk & Internal Control

Added routes:

- `/dashboard/super-admin/risk-control`
- `/dashboard/agency/risk-control`
- `/dashboard/finance/risk-control`

Included features:

- Risk register
- Audit trail event viewer
- Internal control checks
- Risk level and status workflows
- Failed-control tracking
- High-risk action monitoring
- Governance policy cards
- Supabase schema and RLS for risk register, audit trail and internal control checks

## Install and run

```bash
npm install
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Typecheck

```bash
npm run typecheck
```

## Build

```bash
npm run build
```

## Supabase setup

This package is prepared for the Supabase project `dadtorrtahknyhaybcac`.

1. Copy `.env.example` to `.env.local`.
2. Add your Supabase anon key and service role key from Supabase Project Settings > API.
3. Keep the database connection string in `.env.local` locally and in Vercel Environment Variables in production. Do not commit real passwords.
4. Run the migration files in order.
5. Run `supabase/seed.sql` after the migrations.

Required environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://dadtorrtahknyhaybcac.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=your_supabase_postgres_connection_string
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

For Vercel, set the same variables in Project Settings > Environment Variables and change `NEXT_PUBLIC_APP_URL` to your live Vercel URL.

## Migration order

```text
supabase/migrations/0001_foundation_schema.sql
supabase/migrations/0002_foundation_rls.sql
supabase/migrations/0003_property_crm_schema.sql
supabase/migrations/0004_property_crm_rls.sql
supabase/migrations/0005_appointments_followups_schema.sql
supabase/migrations/0006_appointments_followups_rls.sql
supabase/migrations/0007_billing_documents_schema.sql
supabase/migrations/0008_billing_documents_rls.sql
supabase/migrations/0009_valuation_ai_schema.sql
supabase/migrations/0010_valuation_ai_rls.sql
supabase/migrations/0011_referrals_discovery_schema.sql
supabase/migrations/0012_referrals_discovery_rls.sql
supabase/migrations/0013_agent_finance_schema.sql
supabase/migrations/0014_agent_finance_rls.sql
supabase/migrations/0015_property_management_services_schema.sql
supabase/migrations/0016_property_management_services_rls.sql
supabase/migrations/0017_development_reports_schema.sql
supabase/migrations/0018_development_reports_rls.sql
supabase/migrations/0019_marketing_compliance_schema.sql
supabase/migrations/0020_marketing_compliance_rls.sql
supabase/migrations/0021_transactions_support_schema.sql
supabase/migrations/0022_transactions_support_rls.sql
supabase/migrations/0023_subscriptions_risk_schema.sql
supabase/migrations/0024_subscriptions_risk_rls.sql
supabase/seed.sql
```

## Current limitation

The module routes currently use deployment-safe dashboard shells rather than heavy per-module pages. That is intentional for this Vercel-ready build. The original module source components, database schema and policies are still included, but the next serious step is wiring each module to real Supabase queries, mutations, storage uploads and activity logs before re-expanding heavy route-level pages.

Do not keep adding modules before wiring persistence. The platform now has serious breadth, including deal execution and support operations. The next risk is shallow functionality, so the next serious step is live Supabase CRUD, storage uploads, real permissions and end-to-end testing.

## Vercel deployment

This project now includes:

- `vercel.json`
- `.vercelignore`
- `.gitignore`
- `.env.example`
- `.env.local.example`
- `.env.production.example`
- `scripts/check-env.mjs`
- `npm run deploy:check`
- Supabase client, server and admin client helpers

Deployment steps:

1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Set Framework Preset to Next.js.
4. Set Build Command to `npm run deploy:check`.
5. Set Install Command to `npm install --no-audit --no-fund`.
6. Add the Supabase environment variables in Vercel.
7. Deploy.

Important: the database password was shared in chat. Rotate it in Supabase before production use. Treat the current password as exposed.
