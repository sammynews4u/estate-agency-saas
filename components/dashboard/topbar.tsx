'use client';

import { Bell, Menu, Search, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RoleBadge } from '@/components/dashboard/role-badge';
import type { RouteRole } from '@/types/roles';

export function Topbar({ role, onMenuClick }: { role: RouteRole; onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden min-w-[260px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 md:flex">
            <Search className="h-4 w-4 text-slate-400" />
            <Input className="h-8 border-0 bg-transparent p-0 shadow-none focus:ring-0" placeholder="Search foundation..." />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <RoleBadge role={role} />
          <Button variant="outline" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
              <UserRound className="h-4 w-4" />
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-bold text-slate-900">Demo User</p>
              <p className="text-[11px] text-slate-500">Foundation mode</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
