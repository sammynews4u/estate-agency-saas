import Link from 'next/link';
import { Building2 } from 'lucide-react';

export function AuthCard({ title, description, children, footer }: { title: string; description: string; children: React.ReactNode; footer: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-black text-slate-950">EstateFlow Pro</p>
            <p className="text-xs text-slate-500">Foundation</p>
          </div>
        </Link>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-black text-slate-950">{title}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
          </div>
          {children}
          <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>
        </div>
      </div>
    </main>
  );
}
