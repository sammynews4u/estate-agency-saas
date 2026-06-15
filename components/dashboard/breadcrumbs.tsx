'use client';

import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split('/').filter(Boolean);

  return (
    <div className="mb-4 flex flex-wrap items-center gap-1 text-sm text-slate-500">
      {parts.map((part, index) => (
        <span key={`${part}-${index}`} className="flex items-center gap-1">
          <span className={index === parts.length - 1 ? 'font-semibold text-slate-900' : ''}>{part.replaceAll('-', ' ')}</span>
          {index < parts.length - 1 ? <ChevronRight className="h-4 w-4" /> : null}
        </span>
      ))}
    </div>
  );
}
