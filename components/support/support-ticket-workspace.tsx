'use client';

import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { AlertTriangle, Clock3, LifeBuoy, MessageSquarePlus, Plus, ShieldAlert, TicketCheck, UsersRound } from 'lucide-react';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { SimpleDataTable } from '@/components/dashboard/simple-data-table';
import { StatCard } from '@/components/dashboard/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  demoSupportReplies,
  demoSupportTickets,
  slaStatusLabels,
  slaStatusTone,
  supportCategoryLabels,
  supportPriorityLabels,
  supportPriorityTone,
  supportStatusLabels,
  supportStatusTone,
  type SupportCategory,
  type SupportPriority,
  type SupportReply,
  type SupportStatus,
  type SupportTicket,
} from '@/lib/support-data';

type Props = {
  role: 'super-admin' | 'agency' | 'agent' | 'client' | 'landlord' | 'service-provider' | 'developer' | 'finance';
};

const statuses: SupportStatus[] = ['open', 'in_progress', 'awaiting_user', 'resolved', 'escalated'];
const priorities: SupportPriority[] = ['low', 'medium', 'high', 'urgent'];
const categories: SupportCategory[] = ['account', 'technical', 'property', 'billing', 'verification', 'service_request'];

export function SupportTicketWorkspace({ role }: Props) {
  const initialTickets = useMemo(() => {
    if (role === 'client') return demoSupportTickets.filter((ticket) => ticket.requesterRole === 'Client');
    if (role === 'landlord') return demoSupportTickets.filter((ticket) => ticket.requesterRole === 'Landlord/Seller');
    if (role === 'service-provider') return demoSupportTickets.filter((ticket) => ticket.requesterRole === 'Service Provider');
    if (role === 'finance') return demoSupportTickets.filter((ticket) => ticket.category === 'billing');
    if (role === 'agent') return demoSupportTickets.filter((ticket) => ['property', 'technical', 'verification'].includes(ticket.category));
    return demoSupportTickets;
  }, [role]);

  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [replies, setReplies] = useState<SupportReply[]>(demoSupportReplies);
  const [statusFilter, setStatusFilter] = useState<'all' | SupportStatus>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | SupportPriority>('all');
  const [activeView, setActiveView] = useState<'tickets' | 'replies' | 'sla'>('tickets');
  const [showForm, setShowForm] = useState(false);

  const [subject, setSubject] = useState('New support request');
  const [requester, setRequester] = useState(role === 'client' ? 'Current client' : 'Internal user');
  const [category, setCategory] = useState<SupportCategory>('technical');
  const [priority, setPriority] = useState<SupportPriority>('medium');
  const [relatedRecord, setRelatedRecord] = useState('Related property, transaction or document');
  const [summary, setSummary] = useState('Describe the issue clearly, what has been tried, and what outcome is required.');

  const filteredTickets = useMemo(
    () => tickets.filter((ticket) => (statusFilter === 'all' || ticket.status === statusFilter) && (priorityFilter === 'all' || ticket.priority === priorityFilter)),
    [tickets, statusFilter, priorityFilter],
  );

  function updateTicketStatus(id: string, nextStatus: SupportStatus) {
    setTickets((current) => current.map((ticket) => (ticket.id === id ? { ...ticket, status: nextStatus } : ticket)));
  }

  function addTicket() {
    const next: SupportTicket = {
      id: `sup_${Date.now()}`,
      subject,
      requester,
      requesterRole: role === 'super-admin' ? 'Platform Admin' : role.replaceAll('-', ' '),
      category,
      priority,
      status: 'open',
      slaStatus: priority === 'urgent' ? 'near_breach' : 'inside_sla',
      assignedTo: priority === 'urgent' ? 'Escalation Desk' : 'Support Desk',
      relatedRecord,
      createdAt: '2026-06-05 12:00',
      lastReplyAt: '2026-06-05 12:00',
      summary,
    };
    setTickets((current) => [next, ...current]);
    setReplies((current) => [{ id: `reply_${Date.now()}`, ticketSubject: subject, author: requester, channel: 'Portal', message: summary, createdAt: '2026-06-05 12:00' }, ...current]);
    setShowForm(false);
  }

  const openTickets = tickets.filter((ticket) => ['open', 'in_progress', 'awaiting_user', 'escalated'].includes(ticket.status)).length;
  const escalated = tickets.filter((ticket) => ticket.status === 'escalated').length;
  const breached = tickets.filter((ticket) => ticket.slaStatus === 'breached').length;
  const resolved = tickets.filter((ticket) => ticket.status === 'resolved').length;

  const columns: ColumnDef<SupportTicket>[] = [
    {
      header: 'Ticket',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.subject}</p>
          <p className="mt-1 max-w-[360px] text-xs leading-5 text-slate-500">{row.original.summary}</p>
          <p className="mt-1 text-xs text-slate-400">{row.original.requester} • {row.original.requesterRole}</p>
        </div>
      ),
    },
    { header: 'Category', cell: ({ row }) => <Badge variant="muted">{supportCategoryLabels[row.original.category]}</Badge> },
    { header: 'Priority', cell: ({ row }) => <Badge variant={supportPriorityTone[row.original.priority]}>{supportPriorityLabels[row.original.priority]}</Badge> },
    { header: 'SLA', cell: ({ row }) => <Badge variant={slaStatusTone[row.original.slaStatus]}>{slaStatusLabels[row.original.slaStatus]}</Badge> },
    { header: 'Assigned to', accessorKey: 'assignedTo' },
    { header: 'Last reply', accessorKey: 'lastReplyAt' },
    { header: 'Status', cell: ({ row }) => <Badge variant={supportStatusTone[row.original.status]}>{supportStatusLabels[row.original.status]}</Badge> },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateTicketStatus(row.original.id, event.target.value as SupportStatus)}>
          {statuses.map((option) => <option key={option} value={option}>{supportStatusLabels[option]}</option>)}
        </select>
      ),
    },
  ];

  const replyColumns: ColumnDef<SupportReply>[] = [
    { header: 'Reply', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.ticketSubject}</p><p className="mt-1 max-w-[420px] text-xs leading-5 text-slate-500">{row.original.message}</p></div> },
    { header: 'Author', accessorKey: 'author' },
    { header: 'Channel', accessorKey: 'channel' },
    { header: 'Created', accessorKey: 'createdAt' },
  ];

  const heading = role === 'super-admin' ? 'Platform Support & Ticketing' : role === 'agency' ? 'Agency Support Desk' : 'Support Centre';
  const description = role === 'super-admin'
    ? 'Monitor escalations, SLA failures and support volume across the platform.'
    : 'Centralise client, agent, landlord, finance, verification and service-provider issues before they become lost WhatsApp complaints.';

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{heading}</h1>
          <p className="mt-2 max-w-3xl text-slate-500">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary"><MessageSquarePlus className="h-4 w-4" /> Add internal note</Button>
          <Button variant="gold" onClick={() => setShowForm((current) => !current)}><Plus className="h-4 w-4" /> New ticket</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open tickets" value={String(openTickets)} change="Still require action" icon={LifeBuoy} />
        <StatCard label="Escalated" value={String(escalated)} change="Management attention needed" icon={ShieldAlert} />
        <StatCard label="SLA breached" value={String(breached)} change="Service promise already missed" icon={AlertTriangle} />
        <StatCard label="Resolved" value={String(resolved)} change="Closed support records" icon={TicketCheck} />
      </div>

      <Card className="border-sky-200 bg-sky-50">
        <CardContent className="p-4 text-sm leading-6 text-sky-950">
          <span className="font-black">Operational warning:</span> without a ticketing desk, serious issues disappear inside WhatsApp chats. That kills accountability, response time and client trust.
        </CardContent>
      </Card>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create support ticket</CardTitle>
            <CardDescription>Capture the issue, priority, related record and expected resolution path.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <Input value={subject} onChange={(event) => setSubject(event.target.value)} />
              <Input value={requester} onChange={(event) => setRequester(event.target.value)} />
              <Select value={category} onChange={(event) => setCategory(event.target.value as SupportCategory)}>{categories.map((option) => <option key={option} value={option}>{supportCategoryLabels[option]}</option>)}</Select>
              <Select value={priority} onChange={(event) => setPriority(event.target.value as SupportPriority)}>{priorities.map((option) => <option key={option} value={option}>{supportPriorityLabels[option]}</option>)}</Select>
              <Input className="xl:col-span-2" value={relatedRecord} onChange={(event) => setRelatedRecord(event.target.value)} />
            </div>
            <Textarea value={summary} onChange={(event) => setSummary(event.target.value)} />
            <Button onClick={addTicket}><Plus className="h-4 w-4" /> Save ticket</Button>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap gap-2">
        {[
          ['tickets', 'Tickets'],
          ['replies', 'Replies'],
          ['sla', 'SLA rules'],
        ].map(([value, label]) => <Button key={value} variant={activeView === value ? 'default' : 'outline'} size="sm" onClick={() => setActiveView(value as typeof activeView)}>{label}</Button>)}
      </div>

      {activeView === 'tickets' && (
        <div className="space-y-4">
          <Card>
            <CardContent className="grid gap-3 p-4 md:grid-cols-2 lg:grid-cols-4">
              <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'all' | SupportStatus)}>
                <option value="all">All statuses</option>
                {statuses.map((option) => <option key={option} value={option}>{supportStatusLabels[option]}</option>)}
              </Select>
              <Select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value as 'all' | SupportPriority)}>
                <option value="all">All priorities</option>
                {priorities.map((option) => <option key={option} value={option}>{supportPriorityLabels[option]}</option>)}
              </Select>
              <Button variant="secondary"><Clock3 className="h-4 w-4" /> SLA view</Button>
            </CardContent>
          </Card>
          <SimpleDataTable data={filteredTickets} columns={columns} searchPlaceholder="Search support tickets..." />
        </div>
      )}

      {activeView === 'replies' && <SimpleDataTable data={replies} columns={replyColumns} searchPlaceholder="Search support replies..." />}

      {activeView === 'sla' && (
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            ['Urgent', '2 business hours', 'Escalate automatically when payment, verification or closing is blocked.'],
            ['High', '8 business hours', 'Used for failed uploads, wrong documents, access issues and client-facing disruptions.'],
            ['Medium/Low', '24-48 business hours', 'Used for routine requests, clarifications, quote questions and account support.'],
          ].map(([title, time, note]) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{time}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-slate-600">{note}</CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
