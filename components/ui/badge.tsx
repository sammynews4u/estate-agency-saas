import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'muted' | 'gold';

const variants: Record<BadgeVariant, string> = {
  default: 'bg-slate-900 text-white',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  muted: 'bg-slate-100 text-slate-600',
  gold: 'bg-yellow-100 text-yellow-800',
};

export function Badge({ className, variant = 'default', ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold', variants[variant], className)} {...props} />;
}
