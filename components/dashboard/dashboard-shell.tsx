'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Topbar } from '@/components/dashboard/topbar';
import { isRouteRole } from '@/lib/roles/config';
import type { RouteRole } from '@/types/roles';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const role = useMemo<RouteRole>(() => {
    const segment = pathname.split('/')[2] ?? 'super-admin';
    return isRouteRole(segment) ? segment : 'super-admin';
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar role={role} open={open} onClose={() => setOpen(false)} />
      <div className="min-w-0 flex-1">
        <Topbar role={role} onMenuClick={() => setOpen(true)} />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
