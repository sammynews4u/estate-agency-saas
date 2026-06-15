'use client';

import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { ClientRecord, ClientType, LeadStatus } from '@/lib/crm-data';

type ClientFormState = {
  fullName: string;
  email: string;
  phone: string;
  type: ClientType;
  budgetMin: string;
  budgetMax: string;
  preferredLocation: string;
  propertyPreference: string;
  timeline: string;
  leadSource: string;
  status: LeadStatus;
  assignedAgent: string;
  notes: string;
};

const initialState: ClientFormState = {
  fullName: '',
  email: '',
  phone: '',
  type: 'buyer',
  budgetMin: '',
  budgetMax: '',
  preferredLocation: '',
  propertyPreference: '',
  timeline: '0-3 months',
  leadSource: 'Manual entry',
  status: 'new',
  assignedAgent: 'Nneka Ibe',
  notes: '',
};

export function ClientForm({ onCreate }: { onCreate: (client: ClientRecord) => void }) {
  const [form, setForm] = useState<ClientFormState>(initialState);
  const [message, setMessage] = useState('');

  function update<K extends keyof ClientFormState>(key: K, value: ClientFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.fullName || !form.phone) {
      setMessage('Client name and phone number are required.');
      return;
    }

    onCreate({
      id: `cl_${Date.now()}`,
      fullName: form.fullName,
      email: form.email || 'no-email@example.com',
      phone: form.phone,
      type: form.type,
      budgetMin: Number(form.budgetMin || 0),
      budgetMax: Number(form.budgetMax || 0),
      preferredLocation: form.preferredLocation || 'Not specified',
      propertyPreference: form.propertyPreference || 'Not specified',
      timeline: form.timeline,
      leadSource: form.leadSource,
      status: form.status,
      assignedAgent: form.assignedAgent,
      lastContacted: new Date().toISOString().slice(0, 10),
      nextFollowUp: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
      tags: [form.type, form.status],
      notes: form.notes || 'No notes yet.',
    });
    setForm(initialState);
    setMessage('Client added to CRM workspace.');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add client</CardTitle>
        <CardDescription>Capture buyer, tenant, landlord, seller, investor and developer records.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Full name</label>
            <Input value={form.fullName} onChange={(event) => update('fullName', event.target.value)} placeholder="Client name" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Phone</label>
            <Input value={form.phone} onChange={(event) => update('phone', event.target.value)} placeholder="+234..." />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Email</label>
            <Input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="client@example.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Client type</label>
            <Select value={form.type} onChange={(event) => update('type', event.target.value as ClientType)}>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="landlord">Landlord</option>
              <option value="tenant">Tenant</option>
              <option value="investor">Investor</option>
              <option value="developer">Developer</option>
            </Select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Budget minimum</label>
            <Input type="number" value={form.budgetMin} onChange={(event) => update('budgetMin', event.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Budget maximum</label>
            <Input type="number" value={form.budgetMax} onChange={(event) => update('budgetMax', event.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Preferred location</label>
            <Input value={form.preferredLocation} onChange={(event) => update('preferredLocation', event.target.value)} placeholder="Lekki, Ikoyi, Ajah" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Property preference</label>
            <Input value={form.propertyPreference} onChange={(event) => update('propertyPreference', event.target.value)} placeholder="3-bedroom apartment" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Status</label>
            <Select value={form.status} onChange={(event) => update('status', event.target.value as LeadStatus)}>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="viewing_booked">Viewing booked</option>
              <option value="negotiating">Negotiating</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
              <option value="dormant">Dormant</option>
            </Select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Assigned agent</label>
            <Select value={form.assignedAgent} onChange={(event) => update('assignedAgent', event.target.value)}>
              <option>Nneka Ibe</option>
              <option>Seyi Adewale</option>
            </Select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Timeline</label>
            <Input value={form.timeline} onChange={(event) => update('timeline', event.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Lead source</label>
            <Input value={form.leadSource} onChange={(event) => update('leadSource', event.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold text-slate-700">Notes</label>
            <Textarea value={form.notes} onChange={(event) => update('notes', event.target.value)} placeholder="Client motivation, objections, next step and property match notes." />
          </div>
          <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row sm:items-center">
            <Button type="submit"><UserPlus className="h-4 w-4" /> Add client</Button>
            {message ? <p className="text-sm font-semibold text-emerald-700">{message}</p> : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
