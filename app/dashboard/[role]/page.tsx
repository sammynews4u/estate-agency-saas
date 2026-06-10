import { notFound } from 'next/navigation';
import { RoleOverview } from '@/components/dashboard/role-overview';
import { isRouteRole } from '@/lib/roles/config';

export default async function RoleDashboardPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  if (!isRouteRole(role)) notFound();
  return <RoleOverview role={role} />;
}
