import Link from 'next/link';
import { Building2, CheckCircle2, Shield, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  'Multi-role dashboard foundation',
  'Supabase schema and RLS-ready structure',
  'Agency, branch, user and role base',
  'Scalable architecture for future modules',
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="premium-gradient px-6 py-8 text-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-soft">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold">EstateFlow Pro</p>
              <p className="text-xs text-slate-300">Real estate operating system</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm text-slate-200 hover:text-white">Login</Link>
            <Button asChild variant="gold"><Link href="/dashboard/super-admin">View Demo</Link></Button>
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-10 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200">
              Foundation build for a serious real estate SaaS platform
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Build the operating system first. Then add the marketplace.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              This scaffold gives you authentication pages, role-specific dashboards, Supabase schema, RLS policies, reusable components, agency structure, user management and clean navigation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="/dashboard/super-admin">Open Super Admin</Link></Button>
              <Button asChild size="lg" variant="outlineDark"><Link href="/auth/register">Create Account</Link></Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-soft backdrop-blur">
            <div className="rounded-[1.5rem] bg-white p-6 text-slate-900">
              <div className="grid gap-4 sm:grid-cols-2">
                <PreviewCard icon={<UsersRound />} label="Users" value="8 roles" />
                <PreviewCard icon={<Shield />} label="Security" value="RLS-ready" />
                <PreviewCard icon={<Building2 />} label="Agencies" value="Multi-tenant" />
                <PreviewCard icon={<CheckCircle2 />} label="Build" value="Modular" />
              </div>
              <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                <p className="text-sm font-semibold text-slate-500">Foundation scope</p>
                <div className="mt-4 space-y-3">
                  {features.map((feature) => (
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
