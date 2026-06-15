import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { analyticsData } from '@/lib/demo-data';

export function AnalyticsCard() {
  const maxValue = Math.max(...analyticsData.map((item) => item.value));
  const points = analyticsData
    .map((item, index) => {
      const x = 24 + index * 58;
      const y = 150 - (item.value / maxValue) * 110;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity trend</CardTitle>
        <CardDescription>Demo metrics across the last seven days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <svg viewBox="0 0 400 190" className="h-full w-full" role="img" aria-label="Activity trend chart">
            <line x1="20" y1="155" x2="390" y2="155" stroke="currentColor" className="text-slate-200" strokeWidth="2" />
            <line x1="20" y1="110" x2="390" y2="110" stroke="currentColor" className="text-slate-200" strokeWidth="1" />
            <line x1="20" y1="65" x2="390" y2="65" stroke="currentColor" className="text-slate-200" strokeWidth="1" />
            <polyline points={points} fill="none" stroke="currentColor" className="text-emerald-600" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {analyticsData.map((item, index) => {
              const x = 24 + index * 58;
              const y = 150 - (item.value / maxValue) * 110;
              return (
                <g key={item.name}>
                  <circle cx={x} cy={y} r="5" fill="currentColor" className="text-emerald-600" />
                  <text x={x} y="178" textAnchor="middle" className="fill-slate-500 text-[11px] font-semibold">{item.name}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
