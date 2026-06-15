import { notFound } from 'next/navigation';
import { SettingsWorkspace } from '@/components/dashboard/settings-workspace';
import { isRouteRole, validRouteRoles } from '@/lib/roles/config';
import type { RouteRole } from '@/types/roles';

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;

export function generateStaticParams(): { role: RouteRole }[] {
  return validRouteRoles.map((role) => ({ role }));
}

export default function SettingsPage({ params }: { params: { role: string } }) {
  const { role } = params;
  if (!isRouteRole(role)) notFound();

  return <SettingsWorkspace role={role} />;
}
