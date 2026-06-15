'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Building2, CheckCircle2, Clock3, Home, PlusCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { SimpleDataTable } from '@/components/dashboard/simple-data-table';
import { StatCard } from '@/components/dashboard/stat-card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PropertyFilters, type PropertyFiltersState } from '@/components/properties/property-filters';
import { PropertyForm } from '@/components/properties/property-form';
import { demoProperties, formatMoney, propertyStatusLabels, type PropertyRecord, type PropertyStatus } from '@/lib/property-data';

type PropertyManagementWorkspaceProps = {
  role: 'agency' | 'agent' | 'landlord';
};

export function PropertyManagementWorkspace({ role }: PropertyManagementWorkspaceProps) {
  const baseProperties = role === 'agent' ? demoProperties.filter((property) => property.assignedAgent === 'Nneka Ibe') : role === 'landlord' ? demoProperties.filter((property) => property.owner === 'Mr. Chinedu Obi') : demoProperties;
  const [properties, setProperties] = useState<PropertyRecord[]>(baseProperties);
  const [showForm, setShowForm] = useState(role === 'landlord');
  const [filters, setFilters] = useState<PropertyFiltersState>({ search: '', category: 'all', propertyType: 'all', status: 'all' });

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      const text = `${property.title} ${property.location} ${property.state} ${property.assignedAgent} ${property.owner}`.toLowerCase();
      const matchesSearch = text.includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'all' || property.listingCategory === filters.category;
      const matchesType = filters.propertyType === 'all' || property.propertyType === filters.propertyType;
      const matchesStatus = filters.status === 'all' || property.status === filters.status;
      return matchesSearch && matchesCategory && matchesType && matchesStatus;
    });
  }, [filters, properties]);

  const saleCount = properties.filter((property) => property.listingCategory === 'sale').length;
  const rentCount = properties.filter((property) => property.listingCategory === 'rent').length;
  const pendingCount = properties.filter((property) => property.status === 'pending_verification' || property.status === 'under_review').length;
  const activeCount = properties.filter((property) => property.status === 'available' || property.status === 'vacant').length;

  function updateStatus(id: string, status: PropertyStatus) {
    setProperties((current) => current.map((property) => (property.id === id ? { ...property, status } : property)));
  }

  function addProperty(property: PropertyRecord) {
    setProperties((current) => [property, ...current]);
    setShowForm(false);
  }

  const columns: ColumnDef<PropertyRecord>[] = [
    {
      header: 'Property',
      cell: ({ row }) => (
        <div>
          <Link href={`/dashboard/${role}/properties/${row.original.id}`} className="font-bold text-slate-950 hover:text-emerald-700">
            {row.original.title}
          </Link>
          <p className="mt-1 text-xs text-slate-500">{row.original.location}, {row.original.state}</p>
        </div>
      ),
    },
    {
      header: 'Type',
      cell: ({ row }) => (
        <div className="space-y-1">
          <Badge variant={row.original.listingCategory === 'sale' ? 'success' : 'default'}>{row.original.listingCategory === 'sale' ? 'Sale' : 'Rent'}</Badge>
          <p className="text-xs text-slate-500">{row.original.propertyType}</p>
        </div>
      ),
    },
    {
      header: 'Price',
      cell: ({ row }) => <span className="font-bold text-slate-950">{formatMoney(row.original.price, row.original.currency)}</span>,
    },
    {
      header: 'Agent',
      accessorKey: 'assignedAgent',
    },
    {
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={propertyStatusLabels[row.original.status]} />,
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <select
          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700"
          value={row.original.status}
          onChange={(event) => updateStatus(row.original.id, event.target.value as PropertyStatus)}
        >
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
          <option value="pending_verification">Pending verification</option>
          <option value="under_review">Under review</option>
          <option value="vacant">Vacant</option>
          <option value="occupied">Occupied</option>
          <option value="under_negotiation">Under negotiation</option>
          <option value="unavailable">Unavailable</option>
        </select>
      ),
    },
  ];

  const title = role === 'agent' ? 'My Properties' : role === 'landlord' ? 'My Submitted Properties' : 'Property Marketplace';
  const description = role === 'agent' ? 'Manage listings assigned to you and keep status updated.' : role === 'landlord' ? 'Track properties you submitted and their verification/listing status.' : 'Manage sales and rental inventory across the agency.';

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{title}</h1>
          <p className="mt-2 text-slate-500">{description}</p>
        </div>
        <Button onClick={() => setShowForm((current) => !current)}>
          <PlusCircle className="h-4 w-4" /> {showForm ? 'Hide form' : 'Add property'}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active listings" value={String(activeCount)} change="Available or vacant" icon={Home} />
        <StatCard label="Sale listings" value={String(saleCount)} change="Sales inventory" icon={Building2} />
        <StatCard label="Rental listings" value={String(rentCount)} change="Rental inventory" icon={Clock3} />
        <StatCard label="Pending review" value={String(pendingCount)} change="Needs verification" icon={CheckCircle2} />
      </div>

      {showForm ? <PropertyForm onCreate={addProperty} mode={role === 'landlord' ? 'landlord' : 'agency'} /> : null}

      <PropertyFilters value={filters} onChange={setFilters} />

      <Card>
        <CardHeader>
          <CardTitle>Listings</CardTitle>
          <CardDescription>Search, filter, view and update listing status. Database tables and RLS are included in the new migration.</CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleDataTable data={filtered} columns={columns} searchPlaceholder="Quick search listings..." />
        </CardContent>
      </Card>
    </div>
  );
}
