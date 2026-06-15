import type { ReactNode } from 'react';

type ChartProps = {
  children?: ReactNode;
  data?: unknown[];
  dataKey?: string;
  nameKey?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  fill?: string;
  stroke?: string;
};

function ChartBox({ children, className }: ChartProps) {
  return (
    <div className={className} style={{ width: '100%', height: '100%', minHeight: 120 }}>
      <svg viewBox="0 0 400 160" width="100%" height="100%" role="img" aria-label="Chart placeholder">
        <path d="M20 130 C80 70 130 100 180 60 S280 40 360 90" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.55" />
        <rect x="40" y="90" width="34" height="48" opacity="0.16" fill="currentColor" />
        <rect x="100" y="70" width="34" height="68" opacity="0.16" fill="currentColor" />
        <rect x="160" y="50" width="34" height="88" opacity="0.16" fill="currentColor" />
        <rect x="220" y="82" width="34" height="56" opacity="0.16" fill="currentColor" />
        <rect x="280" y="45" width="34" height="93" opacity="0.16" fill="currentColor" />
      </svg>
      {children ? <div style={{ display: 'none' }}>{children}</div> : null}
    </div>
  );
}

export function ResponsiveContainer({ children }: ChartProps) {
  return <div style={{ width: '100%', height: '100%' }}>{children}</div>;
}

export function AreaChart(props: ChartProps) { return <ChartBox {...props} />; }
export function BarChart(props: ChartProps) { return <ChartBox {...props} />; }
export function LineChart(props: ChartProps) { return <ChartBox {...props} />; }
export function PieChart(props: ChartProps) { return <ChartBox {...props} />; }
export function Area(_props: ChartProps) { return null; }
export function Bar(_props: ChartProps) { return null; }
export function Line(_props: ChartProps) { return null; }
export function Pie(_props: ChartProps) { return null; }
export function Cell(_props: ChartProps) { return null; }
export function CartesianGrid(_props: ChartProps) { return null; }
export function Tooltip(_props: ChartProps) { return null; }
export function XAxis(_props: ChartProps) { return null; }
export function YAxis(_props: ChartProps) { return null; }
