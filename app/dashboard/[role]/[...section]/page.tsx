import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { EmptyState } from '@/components/shared/empty-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { isRouteRole } from '@/lib/roles/config';

const moduleDescriptions: Record<string, string> = {
  properties: 'Manage sales and rental listings, status changes, inquiries and property assignments.',
  'browse-properties': 'Search available listings, review property information and create inquiries.',
  'saved-properties': 'Track saved listings and compare preferred properties.',
  clients: 'Centralise buyers, sellers, landlords, tenants and investors in the CRM.',
  leads: 'Track lead source, qualification stage, assigned agent and conversion movement.',
  appointments: 'Manage viewings, bookings, calendars, reminders and appointment outcomes.',
  'follow-ups': 'Run reminders, WhatsApp, SMS and email follow-up workflows.',
  valuation: 'Prepare valuation estimates, market comparisons and owner-facing valuation reports.',
  'ai-assistant': 'Generate descriptions, follow-up messages, client replies and listing improvements.',
  discovery: 'Record discovered listings, source URLs, duplicate signals and agent assignments.',
  referrals: 'Track agent-to-agent and agency-to-agency referrals with commission sharing.',
  agents: 'Manage agent profiles, workload, performance and commission allocation.',
  commissions: 'Review agent commissions, deal value and commission payout status.',
  finance: 'Monitor revenue, expenses, payroll, branch performance and finance KPIs.',
  invoices: 'Create, track and print client invoices.',
  receipts: 'Record payment receipts and transaction history without processing payments.',
  expenses: 'Track operational expenses, approval status and branch cost centres.',
  payroll: 'Manage staff payroll records and payout status.',
  documents: 'Store contracts, leases, ownership documents, inspection reports and KYC files.',
  'property-management': 'Manage tenants, leases, maintenance, inspections and occupancy records.',
  services: 'Connect clients with lawyers, surveyors, photographers, valuers and other providers.',
  projects: 'Manage developer projects, milestones, documentation and construction progress.',
  units: 'Track developer unit inventory, availability, pricing and buyer reservations.',
  sales: 'Track project sales, deposits, closing stage and off-plan transactions.',
  progress: 'Record construction milestones, risks, contractors and completion percentages.',
  reports: 'View revenue, activity, lead, referral, discovery and performance analytics.',
  marketing: 'Plan campaigns, audiences, channels, budgets and lead conversion metrics.',
  verification: 'Track identity, ownership, agency, provider and developer compliance checks.',
  transactions: 'Manage deal pipeline, closing tasks, document readiness and transaction risk.',
  support: 'Handle support tickets, priorities, SLA status, replies and escalations.',
  subscription: 'Track agency plan limits, renewals, feature gates and usage.',
  subscriptions: 'Control platform plans, agency subscriptions, limits and billing status.',
  'risk-control': 'Monitor risk register, audit trail, failed controls and high-risk actions.',
  users: 'Manage platform users, roles, status and account controls.',
  agencies: 'Manage agencies, branches, status and operational onboarding.',
  branches: 'Manage agency branch records, managers, location and status.',
  activity: 'Review platform activity, logs, risk events and recent system actions.',
  profile: 'Manage profile details, service information and account settings.',
  requests: 'Track service requests and job workflow.',
  quotes: 'Manage quotes, pricing and provider responses.',
  portfolio: 'Showcase provider work samples and service proof.',
  reviews: 'Review feedback, ratings and service quality signals.',
  'submit-property': 'Submit seller or landlord property information for review.',
};

function titleise(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function ModuleRoutePage({ params }: { params: { role: string; section?: string[] } }) {
  const { role, section = [] } = params;
  if (!isRouteRole(role)) notFound();

  const sectionKey = section[0] ?? 'overview';
  const sectionPath = section.join('/');
  const title = titleise(sectionKey);
  const description = moduleDescriptions[sectionKey] ?? 'Operational module route prepared for live Supabase CRUD and workflow integration.';
  const isDetailView = section.length > 1;

  const rows = [
    { label: 'Database state', value: 'Schema and RLS ready' },
    { label: 'UI state', value: 'Deployment-safe module shell' },
    { label: 'Next phase', value: 'Wire live Supabase CRUD' },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-black text-slate-950">{isDetailView ? `${title} Detail` : title}</h1>
            <Badge variant="success">Vercel-ready</Badge>
          </div>
          <p className="mt-2 max-w-3xl text-slate-500">{description}</p>
          {sectionPath ? <p className="mt-1 text-xs text-slate-400">Route: /dashboard/{role}/{sectionPath}</p> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary">Export CSV</Button>
          <Button>{isDetailView ? 'Update record' : 'Create record'}</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Active records</CardDescription>
            <CardTitle>128</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Pending review</CardDescription>
            <CardTitle>24</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Conversion value</CardDescription>
            <CardTitle>₦42.8m</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{title} workspace</CardTitle>
          <CardDescription>
            This deployable shell keeps the route live while the next engineering phase connects the module to Supabase queries, mutations, storage uploads, activity logs and notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b text-slate-500">
                  <th className="py-3 pr-4 font-semibold">Item</th>
                  <th className="py-3 pr-4 font-semibold">Status</th>
                  <th className="py-3 pr-4 font-semibold">Owner</th>
                  <th className="py-3 pr-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium text-slate-900">{row.label}</td>
                    <td className="py-3 pr-4 text-slate-600">{row.value}</td>
                    <td className="py-3 pr-4 text-slate-600">{title} team</td>
                    <td className="py-3 pr-4"><Badge>Ready</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <EmptyState
        title="Live database wiring comes next"
        description="The module route is deployment-safe. The next serious step is replacing demo state with Supabase CRUD, Storage uploads, activity logging and role-scoped permissions."
      />
    </div>
  );
}
