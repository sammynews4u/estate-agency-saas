import { notFound } from 'next/navigation';
import { RoleOverview } from '@/components/dashboard/role-overview';
import { isRouteRole, validRouteRoles } from '@/lib/roles/config';
import type { RouteRole } from '@/types/roles';

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;

export function generateStaticParams(): { role: RouteRole }[] {
  return validRouteRoles.map((role) => ({ role }));
}

export default function RoleDashboardPage({ params }: { params: { role: string } }) {
  const { role } = params;
  if (!isRouteRole(role)) notFound();
  return <RoleOverview role={role} />;
}
