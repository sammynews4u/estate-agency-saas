'use client';

import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import type { ListingCategory } from '@/lib/property-data';

export type PropertyFiltersState = {
  search: string;
  category: 'all' | ListingCategory;
  propertyType: string;
  status: string;
};

export function PropertyFilters({ value, onChange }: { value: PropertyFiltersState; onChange: (value: PropertyFiltersState) => void }) {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
      <Input placeholder="Search title, location or agent" value={value.search} onChange={(event) => onChange({ ...value, search: event.target.value })} />
      <Select value={value.category} onChange={(event) => onChange({ ...value, category: event.target.value as PropertyFiltersState['category'] })}>
        <option value="all">All listing types</option>
        <option value="sale">For sale</option>
        <option value="rent">For rent</option>
      </Select>
      <Select value={value.propertyType} onChange={(event) => onChange({ ...value, propertyType: event.target.value })}>
        <option value="all">All property types</option>
        <option value="House">Houses</option>
        <option value="Apartment">Apartments</option>
        <option value="Office">Offices</option>
        <option value="Warehouse">Warehouses</option>
        <option value="Land">Land</option>
      </Select>
      <Select value={value.status} onChange={(event) => onChange({ ...value, status: event.target.value })}>
        <option value="all">All statuses</option>
        <option value="available">Available</option>
        <option value="vacant">Vacant</option>
        <option value="reserved">Reserved</option>
        <option value="pending_verification">Pending verification</option>
        <option value="under_negotiation">Under negotiation</option>
        <option value="sold">Sold</option>
        <option value="occupied">Occupied</option>
      </Select>
    </div>
  );
}
