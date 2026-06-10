import { Bell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { demoNotifications } from '@/lib/demo-data';

export function NotificationPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Notification foundation preview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {demoNotifications.map((item, index) => (
          <div key={`${item.title}-${index}`} className="flex gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600">
              <Bell className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-slate-900">{item.title}</p>
                <Badge variant={item.type === 'success' ? 'success' : item.type === 'warning' ? 'warning' : 'muted'}>{item.type}</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-500">{item.message}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
