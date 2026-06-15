'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpRight, CalendarClock, ClipboardList, Target, TrendingUp } from 'lucide-react';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { SimpleDataTable } from '@/components/dashboard/simple-data-table';
import { StatCard } from '@/components/dashboard/stat-card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { demoLeads, formatLeadValue, leadStatusLabels, type LeadRecord, type LeadStatus } from '@/lib/crm-data';

type Props = { role: 'agency' | 'agent' };

export function LeadManagementWorkspace({ role }: Props) {
  const [leads, setLeads] = useState<LeadRecord[]>(role === 'agent' ? demoLeads.filter((lead) => lead.assignedAgent === 'Nneka Ibe') : demoLeads);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | LeadStatus>('all');
  const [agent, setAgent] = useState('all');

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      const text = `${lead.clientName} ${lead.interest} ${lead.propertyTitle ?? ''} ${lead.assignedAgent} ${lead.source}`.toLowerCase();
      return text.includes(search.toLowerCase()) && (status === 'all' || lead.status === status) && (agent === 'all' || lead.assignedAgent === agent);
    });
  }, [agent, leads, search, status]);

  function moveLead(id: string, nextStatus: LeadStatus) {
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status: nextStatus } : lead)));
  }

  const columns: ColumnDef<LeadRecord>[] = [
    {
      header: 'Lead',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.clientName}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.interest}</p>
        </div>
      ),
    },
    {
      header: 'Property',
      cell: ({ row }) => row.original.propertyId ? (
        <Link href={`/dashboard/${role}/properties/${row.original.propertyId}`} className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800">
          {row.original.propertyTitle} <ArrowUpRight className="h-3 w-3" />
        </Link>
      ) : 'No property attached',
    },
    {
      header: 'Source',
      accessorKey: 'source',
    },
    {
      header: 'Value',
      cell: ({ row }) => <span className="font-bold text-slate-950">{formatLeadValue(row.original.valueEstimate)}</span>,
    },
    {
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={leadStatusLabels[row.original.status]} />,
    },
    {
      header: 'Next action',
      cell: ({ row }) => <span className="text-sm text-slate-600">{row.original.nextAction}</span>,
    },
    {
      header: 'Move stage',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => moveLead(row.original.id, event.target.value as LeadStatus)}>
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

  const totalValue = leads.reduce((sum, lead) => sum + lead.valueEstimate, 0);

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{role === 'agent' ? 'My Leads' : 'Lead Management'}</h1>
          <p className="mt-2 text-slate-500">Track inquiries, property interest, next actions and conversion stages.</p>
        </div>
        <Button variant="gold"><Target className="h-4 w-4" /> Convert best lead</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open leads" value={String(leads.filter((lead) => !['won', 'lost'].includes(lead.status)).length)} change="Active pipeline" icon={ClipboardList} />
        <StatCard label="Viewing booked" value={String(leads.filter((lead) => lead.status === 'viewing_booked').length)} change="Inspection stage" icon={CalendarClock} />
        <StatCard label="Negotiating" value={String(leads.filter((lead) => lead.status === 'negotiating').length)} change="Close carefully" icon={TrendingUp} />
        <StatCard label="Pipeline value" value={formatLeadValue(totalValue)} change="Estimated deal value" icon={Target} />
      </div>

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
        <Input placeholder="Search leads" value={search} onChange={(event) => setSearch(event.target.value)} />
        <Select value={status} onChange={(event) => setStatus(event.target.value as typeof status)}>
          <option value="all">All lead stages</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="viewing_booked">Viewing booked</option>
          <option value="negotiating">Negotiating</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
          <option value="dormant">Dormant</option>
        </Select>
        <Select value={agent} onChange={(event) => setAgent(event.target.value)}>
          <option value="all">All agents</option>
          <option value="Nneka Ibe">Nneka Ibe</option>
          <option value="Seyi Adewale">Seyi Adewale</option>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead pipeline</CardTitle>
          <CardDescription>Move leads between stages and keep next actions visible. This is the CRM engine before automation is added.</CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleDataTable data={filtered} columns={columns} searchPlaceholder="Quick search leads..." />
        </CardContent>
      </Card>
    </div>
  );
}
