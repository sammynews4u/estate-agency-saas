import { Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { demoActivities } from '@/lib/demo-data';

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>Recent demo workflow events</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {demoActivities.map((activity, index) => (
          <div key={`${activity.action}-${index}`} className="flex gap-3 rounded-xl border border-slate-100 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Activity className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900">{activity.action}</p>
              <p className="text-sm text-slate-500">{activity.actor} → {activity.target}</p>
              <p className="mt-1 text-xs text-slate-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
