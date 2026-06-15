import Link from 'next/link';
import { ArrowRight, BarChart3, Building2, CalendarDays, CheckCircle2, FileText, Home, Shield, Sparkles, UsersRound, WalletCards } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { demoUsers } from '@/lib/demo-data';
import { demoProperties, formatMoney } from '@/lib/property-data';
import { roleLabels, userRoleToRoute } from '@/lib/roles/config';

const features = [
  { icon: Home, title: 'Property marketplace', text: 'Add listings, update status, browse properties, save favourites and send enquiries.' },
  { icon: UsersRound, title: 'CRM and leads', text: 'Manage clients, landlords, agents, leads, follow-ups and appointments by role.' },
  { icon: WalletCards, title: 'Finance workflows', text: 'Invoices, receipts, expenses, payroll, commissions and subscription records in demo mode.' },
  { icon: Shield, title: 'Compliance control', text: 'Verification, documents, risk control, support tickets and audit-style activity records.' },
  { icon: BarChart3, title: 'Reports and activity', text: 'Dashboard statistics, module records, status tracking and CSV export for every workspace.' },
  { icon: Sparkles, title: 'AI assistant module', text: 'Demo workspace for listing copy, client replies and follow-up message generation workflows.' },
];

const platformStats = [
  { label: 'Demo roles', value: '8' },
  { label: 'Demo users', value: String(demoUsers.length) },
  { label: 'Property samples', value: String(demoProperties.length) },
  { label: 'Working modules', value: '50+' },
];

export default function HomePage() {
  const featuredProperties = demoProperties.slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="premium-gradient px-6 py-8 text-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-soft">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold">EstateFlow Pro</p>
              <p className="text-xs text-slate-300">Real estate SaaS operating system</p>
            </div>
          </Link>
          <div className="hidden items-center gap-7 text-sm font-semibold text-slate-200 md:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#properties" className="hover:text-white">Properties</a>
            <a href="#demo-users" className="hover:text-white">Demo users</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="hidden text-sm text-slate-200 hover:text-white sm:inline">Login</Link>
            <Button asChild variant="gold"><Link href="/dashboard/super-admin">View Demo</Link></Button>
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-10 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200">
              Multi-role property operations, CRM, finance and compliance demo
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Run your real estate agency, marketplace and back office from one platform.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              EstateFlow Pro is a deploy-ready SaaS demo for agencies, agents, clients, landlords, service providers, developers, finance teams and platform administrators. It includes working dashboards, demo records, property workflows, local demo persistence and CSV export.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="/auth/login">Try demo login</Link></Button>
              <Button asChild size="lg" variant="outlineDark"><Link href="/dashboard/client/browse-properties">Browse properties</Link></Button>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-4">
              {platformStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-2xl font-black">{stat.value}</p>
                  <p className="mt-1 text-xs text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-soft backdrop-blur">
            <div className="rounded-[1.5rem] bg-white p-6 text-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Live dashboard preview</p>
                  <h2 className="mt-1 text-2xl font-black">Agency command centre</h2>
                </div>
                <Badge variant="success">Working demo</Badge>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <PreviewCard icon={<UsersRound />} label="New leads" value="24" />
                <PreviewCard icon={<CalendarDays />} label="Viewings" value="13" />
                <PreviewCard icon={<FileText />} label="Documents" value="41" />
                <PreviewCard icon={<CheckCircle2 />} label="Verified" value="83%" />
              </div>
              <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                <p className="text-sm font-semibold text-slate-500">Workflow engine</p>
                <div className="mt-4 space-y-3">
                  {['Create and edit records', 'Change workflow status', 'Open detail pages', 'Export CSV from modules'].map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-wide text-emerald-700">Platform features</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">Built for serious real estate operations, not decorative pages.</h2>
          <p className="mt-4 leading-7 text-slate-600">The dashboard modules now support real demo actions. They are still front-end demo workflows, but they behave like an MVP instead of dead placeholders.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700"><Icon className="h-6 w-6" /></div>
                <h3 className="mt-5 text-xl font-black text-slate-950">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{feature.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="properties" className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-emerald-700">Sample properties</p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">Properties shown inside the dashboard demo.</h2>
            </div>
            <Button asChild><Link href="/dashboard/client/browse-properties">Open property marketplace <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <article key={property.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
                <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url(${property.media[0]})` }} />
                <div className="p-5">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge variant={property.listingCategory === 'sale' ? 'success' : 'default'}>{property.listingCategory === 'sale' ? 'For sale' : 'For rent'}</Badge>
                    {property.verified ? <Badge variant="gold">Verified</Badge> : null}
                  </div>
                  <h3 className="text-lg font-black text-slate-950">{property.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{property.location}, {property.state}</p>
                  <p className="mt-4 text-2xl font-black text-emerald-700">{formatMoney(property.price, property.currency)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="demo-users" className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-emerald-700">Demo access</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">Use any role without guessing credentials.</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">Every demo account uses the same password: <strong>demo12345</strong>. Use the login page shortcut buttons or open a dashboard directly.</p>
          </div>
          <Button asChild variant="secondary"><Link href="/auth/login">Open login page</Link></Button>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {demoUsers.map((user) => (
            <div key={user.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black text-slate-950">{user.fullName}</h3>
                  <p className="mt-1 text-sm text-slate-500">{user.email}</p>
                </div>
                <Badge variant="success">{roleLabels[user.role]}</Badge>
              </div>
              <p className="mt-4 text-sm text-slate-600">{user.agency} • {user.branch}</p>
              <Button asChild className="mt-5 w-full" variant="outline"><Link href={`/dashboard/${userRoleToRoute[user.role]}`}>Open dashboard</Link></Button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function PreviewCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
        {icon}
      </div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-xl font-bold text-slate-950">{value}</p>
    </div>
  );
}
