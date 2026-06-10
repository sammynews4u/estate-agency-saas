import { ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { AnalyticsCard } from '@/components/dashboard/analytics-card';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { NotificationPanel } from '@/components/dashboard/notification-panel';
import { RoleBadge } from '@/components/dashboard/role-badge';
import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardStatsByRole, getDemoUserByRole } from '@/lib/demo-data';
import { roleDescriptions, routeToUserRole } from '@/lib/roles/config';
import type { RouteRole } from '@/types/roles';

export function RoleOverview({ role }: { role: RouteRole }) {
  const userRole = routeToUserRole[role];
  const user = getDemoUserByRole(userRole);
  const stats = dashboardStatsByRole[role];

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-soft lg:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <RoleBadge role={role} />
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300">Foundation mode</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight md:text-4xl">Welcome, {user.fullName}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">{roleDescriptions[userRole]}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="gold"><Link href={`/dashboard/${role}/settings`}>Open settings</Link></Button>
            <Button asChild variant="outlineDark"><Link href={role === 'super-admin' ? '/dashboard/super-admin/users' : '/dashboard/agency/branches'}>Manage foundation</Link></Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <AnalyticsCard />
        <Card>
          <CardHeader>
            <CardTitle>Next build checkpoint</CardTitle>
            <CardDescription>Do not skip this sequence.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {['Connect Supabase project', 'Apply schema and RLS migrations', 'Seed demo users and agencies', 'Build Property Marketplace module next'].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700">{index + 1}</div>
                <p className="text-sm font-semibold text-slate-700">{item}</p>
              </div>
            ))}
            <div className="rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5" />
                <p>Advanced modules are placeholders by design. Build the revenue engine next, not decorative pages.</p>
              </div>
            </div>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/dashboard/agency/properties">Preview next placeholder <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ActivityFeed />
        <NotificationPanel />
      </div>
    </div>
  );
}
