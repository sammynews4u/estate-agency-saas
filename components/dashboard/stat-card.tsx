import { TrendingUp, type LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function StatCard({ label, value, change, icon: Icon = TrendingUp }: { label: string; value: string; change: string; icon?: LucideIcon }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-black text-slate-950">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-xs font-semibold text-slate-500">{change}</p>
    </Card>
  );
}
