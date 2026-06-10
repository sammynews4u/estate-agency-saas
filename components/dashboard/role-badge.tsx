import { Badge } from '@/components/ui/badge';
import { roleLabels, routeToUserRole } from '@/lib/roles/config';
import type { RouteRole, UserRole } from '@/types/roles';

export function RoleBadge({ role }: { role: RouteRole | UserRole }) {
  const userRole = role.includes('-') || role === 'agency' || role === 'finance'
    ? routeToUserRole[role as RouteRole]
    : (role as UserRole);

  return <Badge variant="gold">{roleLabels[userRole]}</Badge>;
}
