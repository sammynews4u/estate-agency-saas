'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { navigationByRole } from '@/lib/roles/config';
import type { RouteRole } from '@/types/roles';

export function Sidebar({ role, open, onClose }: { role: RouteRole; open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const items = navigationByRole[role];

  return (
    <>
      <div className={cn('fixed inset-0 z-40 bg-slate-950/40 lg:hidden', open ? 'block' : 'hidden')} onClick={onClose} />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-[#061525] text-white transition-transform lg:sticky lg:top-0 lg:z-40 lg:h-screen lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Link href={`/dashboard/${role}`} className="flex items-center gap-3" onClick={onClose}>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-black leading-5">EstateFlow Pro</p>
              <p className="text-xs text-slate-400">Working demo</p>
            </div>
          </Link>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 lg:hidden" onClick={onClose} aria-label="Close menu">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {items.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white',
                  active && 'bg-emerald-500 text-white hover:bg-emerald-500',
                )}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {item.title}
                </span>
                {item.badge ? <Badge variant="muted" className="bg-white/10 text-[10px] text-slate-300">{item.badge}</Badge> : null}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-sm font-bold">Demo mode active</p>
            <p className="mt-1 text-xs leading-5 text-slate-300">Create records, update statuses, open details and export module data.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
