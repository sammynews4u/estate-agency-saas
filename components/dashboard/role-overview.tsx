import { ArrowRight, CheckCircle2, KeyRound, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { AnalyticsCard } from '@/components/dashboard/analytics-card';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { NotificationPanel } from '@/components/dashboard/notification-panel';
import { RoleBadge } from '@/components/dashboard/role-badge';
import { StatCard } from '@/components/dashboard/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardStatsByRole, getDemoUserByRole } from '@/lib/demo-data';
import { navigationByRole, roleDescriptions, roleLabels, routeToUserRole } from '@/lib/roles/config';
import type { RouteRole } from '@/types/roles';

export function RoleOverview({ role }: { role: RouteRole }) {
  const userRole = routeToUserRole[role];
  const user = getDemoUserByRole(userRole);
  const stats = dashboardStatsByRole[role];
  const quickActions = navigationByRole[role].filter((item) => item.href !== `/dashboard/${role}`).slice(0, 6);

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-soft lg:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <RoleBadge role={role} />
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200">Interactive demo mode</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight md:text-4xl">Welcome, {user.fullName}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">{roleDescriptions[userRole]}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="gold"><Link href={`/dashboard/${role}/settings`}>Open settings</Link></Button>
            <Button asChild variant="outlineDark"><Link href={quickActions[0]?.href ?? `/dashboard/${role}`}>Start work</Link></Button>
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
            <CardTitle>Role access</CardTitle>
            <CardDescription>Demo account and available workspaces for this role.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
              <div className="flex items-start gap-3">
                <KeyRound className="mt-0.5 h-5 w-5" />
                <p><strong>{roleLabels[userRole]} login:</strong> {user.email}<br /><strong>Password:</strong> demo12345</p>
              </div>
            </div>
            {quickActions.slice(0, 5).map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center justify-between rounded-xl border border-slate-100 p-3 transition hover:border-emerald-200 hover:bg-emerald-50">
                <span className="flex items-center gap-3 text-sm font-semibold text-slate-700"><CheckCircle2 className="h-4 w-4 text-emerald-600" />{item.title}</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </Link>
            ))}
            <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-slate-500" />
                <p>Each module now has demo records, editable status fields, detail pages, creation form, reset action and CSV export.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ActivityFeed />
        <NotificationPanel />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All accessible modules</CardTitle>
          <CardDescription>No dead navigation. Each link opens a working demo workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {navigationByRole[role].map((item) => (
              <Button key={item.href} asChild variant={item.href === `/dashboard/${role}` ? 'secondary' : 'outline'} size="sm">
                <Link href={item.href}>{item.title}</Link>
              </Button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="success">Create</Badge>
            <Badge variant="gold">Edit status</Badge>
            <Badge variant="muted">Detail view</Badge>
            <Badge variant="default">Export CSV</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
