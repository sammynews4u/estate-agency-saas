'use client';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { analyticsData } from '@/lib/demo-data';

export function AnalyticsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Foundation activity trend</CardTitle>
        <CardDescription>Demo chart wired with Recharts for later real metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#059669" fill="#10b981" fillOpacity={0.18} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
