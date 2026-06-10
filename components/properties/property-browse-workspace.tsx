'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { StatCard } from '@/components/dashboard/stat-card';
import { PropertyCard } from '@/components/properties/property-card';
import { PropertyFilters, type PropertyFiltersState } from '@/components/properties/property-filters';
import { AlertCircle, Building2, Heart, Home, MessageSquareText } from 'lucide-react';
import { demoProperties, type PropertyRecord } from '@/lib/property-data';

export function PropertyBrowseWorkspace({ savedOnly = false }: { savedOnly?: boolean }) {
  const [saved, setSaved] = useState<PropertyRecord[]>(demoProperties.slice(0, 2));
  const [inquiries, setInquiries] = useState<string[]>([]);
  const [notice, setNotice] = useState('');
  const [filters, setFilters] = useState<PropertyFiltersState>({ search: '', category: 'all', propertyType: 'all', status: 'all' });

  const source = savedOnly ? saved : demoProperties;
  const filtered = useMemo(() => {
    return source.filter((property) => {
      const text = `${property.title} ${property.location} ${property.state} ${property.assignedAgent}`.toLowerCase();
      return (
        text.includes(filters.search.toLowerCase()) &&
        (filters.category === 'all' || property.listingCategory === filters.category) &&
        (filters.propertyType === 'all' || property.propertyType === filters.propertyType) &&
        (filters.status === 'all' || property.status === filters.status)
      );
    });
  }, [filters, source]);

  function saveProperty(property: PropertyRecord) {
    setSaved((current) => (current.some((item) => item.id === property.id) ? current : [property, ...current]));
    setNotice(`${property.title} saved to your shortlist.`);
  }

  function sendInquiry(property: PropertyRecord) {
    setInquiries((current) => (current.includes(property.id) ? current : [property.id, ...current]));
    setNotice(`Inquiry prepared for ${property.title}. This will connect to the CRM inquiry table when Supabase is active.`);
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div>
        <h1 className="text-3xl font-black text-slate-950">{savedOnly ? 'Saved Properties' : 'Browse Properties'}</h1>
        <p className="mt-2 text-slate-500">{savedOnly ? 'Your saved shortlist from the marketplace.' : 'Search sales and rental listings, save properties and send inquiries.'}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Available listings" value={String(demoProperties.length)} change="Demo inventory" icon={Home} />
        <StatCard label="Saved properties" value={String(saved.length)} change="Your shortlist" icon={Heart} />
        <StatCard label="Inquiries sent" value={String(inquiries.length)} change="Session workspace" icon={MessageSquareText} />
        <StatCard label="Verified listings" value={String(demoProperties.filter((item) => item.verified).length)} change="Checked assets" icon={Building2} />
      </div>

      {notice ? (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          <AlertCircle className="mt-0.5 h-4 w-4" /> {notice}
        </div>
      ) : null}

      <PropertyFilters value={filters} onChange={setFilters} />

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {filtered.map((property) => (
          <PropertyCard key={property.id} property={property} onSave={saveProperty} onInquiry={sendInquiry} />
        ))}
      </div>
    </div>
  );
}
