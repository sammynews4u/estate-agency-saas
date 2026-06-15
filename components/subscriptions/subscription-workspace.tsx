'use client';

import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { BarChart3, CheckCircle2, Gauge, LockKeyhole, Plus, WalletCards } from 'lucide-react';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { SimpleDataTable } from '@/components/dashboard/simple-data-table';
import { StatCard } from '@/components/dashboard/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import {
  billingCycleLabels,
  demoFeatureGates,
  demoSubscriptions,
  formatSubscriptionMoney,
  getUsageStatus,
  planLabels,
  subscriptionStatusLabels,
  subscriptionStatusTone,
  usageStatusLabels,
  usageStatusTone,
  type BillingCycle,
  type PlatformSubscription,
  type SubscriptionPlan,
  type SubscriptionStatus,
} from '@/lib/subscription-data';

type Props = {
  role: 'super-admin' | 'agency' | 'finance';
};

const plans: SubscriptionPlan[] = ['starter', 'growth', 'enterprise'];
const statuses: SubscriptionStatus[] = ['trial', 'active', 'past_due', 'suspended', 'cancelled'];
const cycles: BillingCycle[] = ['monthly', 'quarterly', 'annual'];

function UsageBadge({ used, limit }: { used: number; limit: number }) {
  const status = getUsageStatus(used, limit);
  return <Badge variant={usageStatusTone[status]}>{usageStatusLabels[status]}</Badge>;
}

export function SubscriptionWorkspace({ role }: Props) {
  const initialRows = useMemo(() => (role === 'agency' ? demoSubscriptions.filter((item) => item.agencyName === 'PrimeNest Realty') : demoSubscriptions), [role]);
  const [subscriptions, setSubscriptions] = useState<PlatformSubscription[]>(initialRows);
  const [statusFilter, setStatusFilter] = useState<'all' | SubscriptionStatus>('all');
  const [planFilter, setPlanFilter] = useState<'all' | SubscriptionPlan>('all');
  const [showForm, setShowForm] = useState(false);
  const [agencyName, setAgencyName] = useState('New Agency Account');
  const [plan, setPlan] = useState<SubscriptionPlan>('starter');
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const [monthlyFee, setMonthlyFee] = useState('35000');

  const filteredSubscriptions = useMemo(
    () => subscriptions.filter((item) => (statusFilter === 'all' || item.status === statusFilter) && (planFilter === 'all' || item.plan === planFilter)),
    [subscriptions, statusFilter, planFilter],
  );

  function updateStatus(id: string, nextStatus: SubscriptionStatus) {
    setSubscriptions((current) => current.map((item) => (item.id === id ? { ...item, status: nextStatus } : item)));
  }

  function addSubscription() {
    const limit = plan === 'enterprise' ? 1200 : plan === 'growth' ? 200 : 50;
    const seats = plan === 'enterprise' ? 60 : plan === 'growth' ? 12 : 4;
    const next: PlatformSubscription = {
      id: `sub_${Date.now()}`,
      agencyName,
      plan,
      status: 'trial',
      billingCycle: cycle,
      monthlyFee: Number(monthlyFee) || 0,
      nextBillingDate: '2026-07-05',
      seatsUsed: 1,
      seatsLimit: seats,
      propertyListingsUsed: 0,
      propertyListingsLimit: limit,
      aiCreditsUsed: 0,
      aiCreditsLimit: plan === 'enterprise' ? 30000 : plan === 'growth' ? 7000 : 1200,
      storageUsedGb: 0,
      storageLimitGb: plan === 'enterprise' ? 500 : plan === 'growth' ? 60 : 10,
      renewalRisk: 'medium',
    };
    setSubscriptions((current) => [next, ...current]);
    setShowForm(false);
  }

  const columns: ColumnDef<PlatformSubscription>[] = [
    {
      header: 'Agency / Plan',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.agencyName}</p>
          <p className="mt-1 text-xs text-slate-500">{planLabels[row.original.plan]} • {billingCycleLabels[row.original.billingCycle]}</p>
        </div>
      ),
    },
    { header: 'MRR', cell: ({ row }) => <span className="font-bold text-slate-950">{formatSubscriptionMoney(row.original.monthlyFee)}</span> },
    {
      header: 'Seats',
      cell: ({ row }) => <div><p className="font-semibold text-slate-800">{row.original.seatsUsed}/{row.original.seatsLimit}</p><UsageBadge used={row.original.seatsUsed} limit={row.original.seatsLimit} /></div>,
    },
    {
      header: 'Listings',
      cell: ({ row }) => <div><p className="font-semibold text-slate-800">{row.original.propertyListingsUsed}/{row.original.propertyListingsLimit}</p><UsageBadge used={row.original.propertyListingsUsed} limit={row.original.propertyListingsLimit} /></div>,
    },
    {
      header: 'AI credits',
      cell: ({ row }) => <div><p className="font-semibold text-slate-800">{row.original.aiCreditsUsed}/{row.original.aiCreditsLimit}</p><UsageBadge used={row.original.aiCreditsUsed} limit={row.original.aiCreditsLimit} /></div>,
    },
    { header: 'Next billing', accessorKey: 'nextBillingDate' },
    { header: 'Status', cell: ({ row }) => <Badge variant={subscriptionStatusTone[row.original.status]}>{subscriptionStatusLabels[row.original.status]}</Badge> },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateStatus(row.original.id, event.target.value as SubscriptionStatus)}>
          {statuses.map((option) => <option key={option} value={option}>{subscriptionStatusLabels[option]}</option>)}
        </select>
      ),
    },
  ];

  const totalMrr = subscriptions.filter((item) => item.status === 'active').reduce((sum, item) => sum + item.monthlyFee, 0);
  const activeAccounts = subscriptions.filter((item) => item.status === 'active').length;
  const atRisk = subscriptions.filter((item) => item.status === 'past_due' || item.renewalRisk === 'high').length;
  const averageUsage = Math.round(subscriptions.reduce((sum, item) => sum + item.propertyListingsUsed / item.propertyListingsLimit, 0) / subscriptions.length * 100);

  const title = role === 'agency' ? 'My Platform Subscription' : role === 'finance' ? 'Platform Subscription Billing' : 'Subscription & Billing Plans';
  const description = role === 'agency'
    ? 'Track your active plan, seat usage, listing limits, AI credits and upgrade pressure before growth is blocked.'
    : 'Control SaaS plans, platform billing status, usage limits and feature access. This is how the platform monetises agencies.';

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{title}</h1>
          <p className="mt-2 max-w-3xl text-slate-500">{description}</p>
        </div>
        {role !== 'agency' && <Button variant="gold" onClick={() => setShowForm((current) => !current)}><Plus className="h-4 w-4" /> New subscription</Button>}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active accounts" value={String(activeAccounts)} change="Paying agencies only" icon={CheckCircle2} />
        <StatCard label="Monthly recurring revenue" value={formatSubscriptionMoney(totalMrr)} change="Recorded platform subscription revenue" icon={WalletCards} />
        <StatCard label="Average listing usage" value={`${averageUsage}%`} change="Capacity pressure across accounts" icon={Gauge} />
        <StatCard label="Accounts at risk" value={String(atRisk)} change="Past due or high renewal risk" icon={BarChart3} />
      </div>

      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4 text-sm leading-6 text-amber-950">
          <span className="font-black">Hard control:</span> subscription limits must not be cosmetic. Feature gates, seat caps, AI credits and listing caps should eventually be enforced at API level, not just displayed in the dashboard.
        </CardContent>
      </Card>

      {showForm && role !== 'agency' && (
        <Card>
          <CardHeader>
            <CardTitle>Create platform subscription</CardTitle>
            <CardDescription>Add a new agency billing account with plan limits and usage tracking.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Input value={agencyName} onChange={(event) => setAgencyName(event.target.value)} placeholder="Agency name" />
            <Input value={monthlyFee} onChange={(event) => setMonthlyFee(event.target.value)} inputMode="numeric" placeholder="Monthly fee" />
            <Select value={plan} onChange={(event) => setPlan(event.target.value as SubscriptionPlan)}>{plans.map((option) => <option key={option} value={option}>{planLabels[option]}</option>)}</Select>
            <Select value={cycle} onChange={(event) => setCycle(event.target.value as BillingCycle)}>{cycles.map((option) => <option key={option} value={option}>{billingCycleLabels[option]}</option>)}</Select>
            <div className="md:col-span-2"><Button onClick={addSubscription}><Plus className="h-4 w-4" /> Save subscription</Button></div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap gap-3">
        <Select className="w-52" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}>
          <option value="all">All statuses</option>
          {statuses.map((option) => <option key={option} value={option}>{subscriptionStatusLabels[option]}</option>)}
        </Select>
        <Select className="w-52" value={planFilter} onChange={(event) => setPlanFilter(event.target.value as typeof planFilter)}>
          <option value="all">All plans</option>
          {plans.map((option) => <option key={option} value={option}>{planLabels[option]}</option>)}
        </Select>
      </div>

      <SimpleDataTable data={filteredSubscriptions} columns={columns} searchPlaceholder="Search subscriptions..." />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><LockKeyhole className="h-5 w-5 text-emerald-600" /> Feature gate matrix</CardTitle>
          <CardDescription>Use this to stop weak pricing. Every powerful feature should map to a plan intentionally.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {demoFeatureGates.map((item) => (
              <div key={item.id} className="grid gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 md:grid-cols-[1.5fr_repeat(3,0.5fr)_1.5fr] md:items-center">
                <div><p className="font-bold text-slate-950">{item.feature}</p></div>
                <Badge variant={item.starter ? 'success' : 'muted'}>Starter</Badge>
                <Badge variant={item.growth ? 'success' : 'muted'}>Growth</Badge>
                <Badge variant={item.enterprise ? 'success' : 'muted'}>Enterprise</Badge>
                <p className="text-sm text-slate-500">{item.note}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
