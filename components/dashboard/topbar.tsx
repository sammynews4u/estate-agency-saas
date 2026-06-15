'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, Menu, Search, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RoleBadge } from '@/components/dashboard/role-badge';
import { demoUsers, getDemoUserByRole } from '@/lib/demo-data';
import { routeToUserRole } from '@/lib/roles/config';
import type { DemoUser, RouteRole } from '@/types/roles';

export function Topbar({ role, onMenuClick }: { role: RouteRole; onMenuClick: () => void }) {
  const [user, setUser] = useState<DemoUser>(() => getDemoUserByRole(routeToUserRole[role]));
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('estateflow-demo-session');
      if (stored) {
        const parsed = JSON.parse(stored) as DemoUser & { routeRole?: RouteRole };
        if (parsed.routeRole === role || parsed.role === routeToUserRole[role]) {
          setUser(parsed);
          return;
        }
      }
      setUser(demoUsers.find((item) => item.role === routeToUserRole[role]) ?? demoUsers[0]);
    } catch {
      setUser(demoUsers.find((item) => item.role === routeToUserRole[role]) ?? demoUsers[0]);
    }
  }, [role]);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden min-w-[260px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 md:flex">
            <Search className="h-4 w-4 text-slate-400" />
            <Input className="h-8 border-0 bg-transparent p-0 shadow-none focus:ring-0" placeholder="Search demo workspace..." />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <RoleBadge role={role} />
          <Button variant="outline" size="icon" aria-label="Notifications" onClick={() => setNotifications(0)}>
            <span className="relative">
              <Bell className="h-5 w-5" />
              {notifications ? <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-black text-white">{notifications}</span> : null}
            </span>
          </Button>
          <Link href={`/dashboard/${role}/settings`} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:bg-slate-50">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
              <UserRound className="h-4 w-4" />
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-bold text-slate-900">{user.fullName}</p>
              <p className="text-[11px] text-slate-500">{user.agency}</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
