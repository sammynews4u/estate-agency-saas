'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { PropertyRecord } from '@/lib/property-data';

type PropertyFormState = {
  title: string;
  description: string;
  propertyType: string;
  listingCategory: 'sale' | 'rent';
  price: string;
  location: string;
  city: string;
  state: string;
  bedrooms: string;
  bathrooms: string;
  assignedAgent: string;
  owner: string;
};

const initialState: PropertyFormState = {
  title: '',
  description: '',
  propertyType: 'House',
  listingCategory: 'sale',
  price: '',
  location: '',
  city: '',
  state: 'Lagos',
  bedrooms: '0',
  bathrooms: '0',
  assignedAgent: 'Nneka Ibe',
  owner: '',
};

export function PropertyForm({ onCreate, mode = 'agency' }: { onCreate: (property: PropertyRecord) => void; mode?: 'agency' | 'landlord' }) {
  const [form, setForm] = useState<PropertyFormState>(initialState);
  const [message, setMessage] = useState('');

  function update<K extends keyof PropertyFormState>(key: K, value: PropertyFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.title || !form.price || !form.location) {
      setMessage('Title, price and location are required.');
      return;
    }

    const created: PropertyRecord = {
      id: `prop_${Date.now()}`,
      title: form.title,
      description: form.description || 'New property listing pending full description.',
      propertyType: form.propertyType,
      listingCategory: form.listingCategory,
      price: Number(form.price),
      currency: 'NGN',
      location: form.location,
      city: form.city || form.location,
      state: form.state,
      address: form.location,
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      toilets: Number(form.bathrooms),
      parkingSpaces: 0,
      landSize: 'To be confirmed',
      buildingSize: 'To be confirmed',
      furnishingStatus: 'To be confirmed',
      propertyCondition: 'To be inspected',
      yearBuilt: new Date().getFullYear(),
      legalStatus: 'Pending verification',
      ownershipType: 'To be confirmed',
      amenities: ['New listing'],
      media: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop'],
      assignedAgent: form.assignedAgent,
      owner: form.owner || (mode === 'landlord' ? 'Current landlord' : 'Agency owner record'),
      source: mode === 'landlord' ? 'Landlord submission' : 'Agency entry',
      dateListed: new Date().toISOString().slice(0, 10),
      status: mode === 'landlord' ? 'pending_verification' : 'available',
      featured: false,
      verified: false,
    };

    onCreate(created);
    setForm(initialState);
    setMessage(mode === 'landlord' ? 'Property submitted for agency verification.' : 'Property added to the marketplace workspace.');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{mode === 'landlord' ? 'Submit a property' : 'Create property listing'}</CardTitle>
        <CardDescription>{mode === 'landlord' ? 'Landlord submissions enter pending verification.' : 'Add a sale or rental listing into the agency inventory.'}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold text-slate-700">Property title</label>
            <Input value={form.title} onChange={(event) => update('title', event.target.value)} placeholder="e.g. 4-Bedroom Semi-Detached Duplex in Ajah" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Listing type</label>
            <Select value={form.listingCategory} onChange={(event) => update('listingCategory', event.target.value as PropertyFormState['listingCategory'])}>
              <option value="sale">For sale</option>
              <option value="rent">For rent</option>
            </Select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Property type</label>
            <Select value={form.propertyType} onChange={(event) => update('propertyType', event.target.value)}>
              <option>House</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Office</option>
              <option>Shop</option>
              <option>Warehouse</option>
              <option>Land</option>
            </Select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Price</label>
            <Input type="number" value={form.price} onChange={(event) => update('price', event.target.value)} placeholder="450000000" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Location</label>
            <Input value={form.location} onChange={(event) => update('location', event.target.value)} placeholder="Lekki Phase 1" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">City</label>
            <Input value={form.city} onChange={(event) => update('city', event.target.value)} placeholder="Lekki" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">State</label>
            <Input value={form.state} onChange={(event) => update('state', event.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Bedrooms</label>
            <Input type="number" value={form.bedrooms} onChange={(event) => update('bedrooms', event.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Bathrooms</label>
            <Input type="number" value={form.bathrooms} onChange={(event) => update('bathrooms', event.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Assigned agent</label>
            <Select value={form.assignedAgent} onChange={(event) => update('assignedAgent', event.target.value)}>
              <option>Nneka Ibe</option>
              <option>Seyi Adewale</option>
            </Select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Owner / landlord</label>
            <Input value={form.owner} onChange={(event) => update('owner', event.target.value)} placeholder="Owner name" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold text-slate-700">Description</label>
            <Textarea value={form.description} onChange={(event) => update('description', event.target.value)} placeholder="Describe the property, title strength, access roads, amenities and inspection notes." />
          </div>
          <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row sm:items-center">
            <Button type="submit"><PlusCircle className="h-4 w-4" /> Add property</Button>
            {message ? <p className="text-sm font-semibold text-emerald-700">{message}</p> : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
