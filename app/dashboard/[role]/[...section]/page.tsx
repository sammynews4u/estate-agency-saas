import { notFound } from 'next/navigation';
import { DemoModuleWorkspace } from '@/components/dashboard/demo-module-workspace';
import { PropertyBrowseWorkspace } from '@/components/properties/property-browse-workspace';
import { PropertyDetailPage } from '@/components/properties/property-detail-page';
import { PropertyManagementWorkspace } from '@/components/properties/property-management-workspace';
import { moduleDescriptions, titleise } from '@/lib/module-demo-data';
import { demoProperties, getPropertyById } from '@/lib/property-data';
import { isRouteRole, navigationByRole, validRouteRoles } from '@/lib/roles/config';
import type { RouteRole } from '@/types/roles';

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;

type RouteParams = { role: RouteRole; section: string[] };

function navigationSectionParams(role: RouteRole) {
  return navigationByRole[role]
    .map((item) => {
      const prefix = `/dashboard/${role}/`;
      if (!item.href.startsWith(prefix)) return null;
      const sectionPath = item.href.slice(prefix.length);
      if (!sectionPath || sectionPath === 'settings') return null;
      return sectionPath.split('/').filter(Boolean);
    })
    .filter((section): section is string[] => Boolean(section));
}

export function generateStaticParams(): RouteParams[] {
  const baseParams = validRouteRoles.flatMap((role) => navigationSectionParams(role).map((section) => ({ role, section })));

  const propertyDetailParams: RouteParams[] = validRouteRoles.flatMap((role) => {
    const sections = navigationSectionParams(role).filter(([first]) => first === 'properties' || first === 'browse-properties' || first === 'saved-properties');
    return sections.flatMap(([first]) => demoProperties.map((property) => ({ role, section: [first, property.id] })));
  });

  return [...baseParams, ...propertyDetailParams];
}

export default function ModuleRoutePage({ params }: { params: { role: string; section?: string[] } }) {
  const { role, section = [] } = params;
  if (!isRouteRole(role)) notFound();

  const sectionKey = section[0] ?? 'overview';
  const detailId = section[1];
  const title = titleise(sectionKey);
  const description = moduleDescriptions[sectionKey] ?? `${title} demo workspace with working records, status changes, detail pages and CSV export.`;

  if (sectionKey === 'browse-properties') {
    if (detailId) {
      const property = getPropertyById(detailId);
      if (!property) notFound();
      return <PropertyDetailPage property={property} />;
    }
    return <PropertyBrowseWorkspace />;
  }

  if (sectionKey === 'saved-properties') {
    if (detailId) {
      const property = getPropertyById(detailId);
      if (!property) notFound();
      return <PropertyDetailPage property={property} />;
    }
    return <PropertyBrowseWorkspace savedOnly />;
  }

  if (sectionKey === 'properties' || sectionKey === 'submit-property') {
    if (detailId) {
      const property = getPropertyById(detailId);
      if (!property) notFound();
      return <PropertyDetailPage property={property} />;
    }
    if (role === 'agency' || role === 'agent' || role === 'landlord') {
      return <PropertyManagementWorkspace role={role} />;
    }
  }

  return <DemoModuleWorkspace role={role} sectionKey={sectionKey} title={title} description={description} detailId={detailId} />;
}
