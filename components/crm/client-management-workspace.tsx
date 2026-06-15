'use client';

import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { CalendarClock, Filter, UserPlus, UsersRound, Wallet } from 'lucide-react';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { SimpleDataTable } from '@/components/dashboard/simple-data-table';
import { StatCard } from '@/components/dashboard/stat-card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { ClientForm } from '@/components/crm/client-form';
import { demoClients, formatLeadValue, leadStatusLabels, type ClientRecord, type ClientType, type LeadStatus } from '@/lib/crm-data';

type Props = { role: 'agency' | 'agent' };

export function ClientManagementWorkspace({ role }: Props) {
  const [clients, setClients] = useState<ClientRecord[]>(role === 'agent' ? demoClients.filter((client) => client.assignedAgent === 'Nneka Ibe') : demoClients);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [type, setType] = useState<'all' | ClientType>('all');
  const [status, setStatus] = useState<'all' | LeadStatus>('all');

  const filtered = useMemo(() => {
    return clients.filter((client) => {
      const text = `${client.fullName} ${client.email} ${client.phone} ${client.preferredLocation} ${client.assignedAgent}`.toLowerCase();
      return text.includes(search.toLowerCase()) && (type === 'all' || client.type === type) && (status === 'all' || client.status === status);
    });
  }, [clients, search, status, type]);

  function addClient(client: ClientRecord) {
    setClients((current) => [client, ...current]);
    setShowForm(false);
  }

  function updateStatus(id: string, nextStatus: LeadStatus) {
    setClients((current) => current.map((client) => (client.id === id ? { ...client, status: nextStatus, lastContacted: new Date().toISOString().slice(0, 10) } : client)));
  }

  const columns: ColumnDef<ClientRecord>[] = [
    {
      header: 'Client',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.fullName}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.phone} • {row.original.email}</p>
        </div>
      ),
    },
    {
      header: 'Type',
      cell: ({ row }) => <Badge variant="muted">{row.original.type}</Badge>,
    },
    {
      header: 'Preference',
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-slate-800">{row.original.propertyPreference}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.preferredLocation}</p>
        </div>
      ),
    },
    {
      header: 'Budget',
      cell: ({ row }) => <span className="font-bold text-slate-950">{formatLeadValue(row.original.budgetMax || row.original.budgetMin)}</span>,
    },
    {
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={leadStatusLabels[row.original.status]} />,
    },
    {
      header: 'Next follow-up',
      accessorKey: 'nextFollowUp',
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateStatus(row.original.id, event.target.value as LeadStatus)}>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="viewing_booked">Viewing booked</option>
          <option value="negotiating">Negotiating</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
          <option value="dormant">Dormant</option>
        </select>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{role === 'agent' ? 'My Clients' : 'CRM Clients'}</h1>
          <p className="mt-2 text-slate-500">Centralise buyers, tenants, sellers, landlords, investors and developers.</p>
        </div>
        <Button onClick={() => setShowForm((current) => !current)}><UserPlus className="h-4 w-4" /> {showForm ? 'Hide form' : 'Add client'}</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Clients" value={String(clients.length)} change="CRM contacts" icon={UsersRound} />
        <StatCard label="Qualified" value={String(clients.filter((client) => client.status === 'qualified').length)} change="High-intent" icon={Filter} />
        <StatCard label="Follow-ups due" value={String(clients.filter((client) => client.nextFollowUp <= '2026-06-06').length)} change="Needs action" icon={CalendarClock} />
        <StatCard label="Pipeline value" value={formatLeadValue(clients.reduce((sum, item) => sum + item.budgetMax, 0))} change="Max budget" icon={Wallet} />
      </div>

      {showForm ? <ClientForm onCreate={addClient} /> : null}

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
        <Input placeholder="Search clients" value={search} onChange={(event) => setSearch(event.target.value)} />
        <Select value={type} onChange={(event) => setType(event.target.value as typeof type)}>
          <option value="all">All client types</option>
          <option value="buyer">Buyers</option>
          <option value="seller">Sellers</option>
          <option value="landlord">Landlords</option>
          <option value="tenant">Tenants</option>
          <option value="investor">Investors</option>
          <option value="developer">Developers</option>
        </Select>
        <Select value={status} onChange={(event) => setStatus(event.target.value as typeof status)}>
          <option value="all">All statuses</option>
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

      <Card>
        <CardHeader>
          <CardTitle>Client database</CardTitle>
          <CardDescription>Search, segment and update lead stage. Full persistence is ready through the CRM schema migration.</CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleDataTable data={filtered} columns={columns} searchPlaceholder="Quick search CRM..." />
        </CardContent>
      </Card>
    </div>
  );
}
