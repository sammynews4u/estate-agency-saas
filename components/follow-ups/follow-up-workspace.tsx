'use client';

import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { BellRing, CheckCircle2, Megaphone, MessageCircle, Plus, Send, TimerReset } from 'lucide-react';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { SimpleDataTable } from '@/components/dashboard/simple-data-table';
import { StatCard } from '@/components/dashboard/stat-card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  channelLabels,
  demoCampaigns,
  demoFollowUps,
  demoTemplates,
  followUpStatusLabels,
  type CampaignRecord,
  type FollowUpChannel,
  type FollowUpStatus,
  type FollowUpTask,
} from '@/lib/follow-up-data';

type Props = { role: 'agency' | 'agent' };

const statusOptions: FollowUpStatus[] = ['scheduled', 'due_today', 'completed', 'missed', 'cancelled'];
const channelOptions: FollowUpChannel[] = ['call', 'whatsapp', 'sms', 'email', 'meeting'];

export function FollowUpWorkspace({ role }: Props) {
  const [tasks, setTasks] = useState<FollowUpTask[]>(role === 'agent' ? demoFollowUps.filter((task) => task.assignedAgent === 'Nneka Ibe') : demoFollowUps);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | FollowUpStatus>('all');
  const [channel, setChannel] = useState<'all' | FollowUpChannel>('all');
  const [selectedTemplateId, setSelectedTemplateId] = useState(demoTemplates[0]?.id ?? '');
  const [customMessage, setCustomMessage] = useState(demoTemplates[0]?.body ?? '');
  const [showComposer, setShowComposer] = useState(false);

  const filtered = useMemo(() => {
    return tasks.filter((task) => {
      const text = `${task.recipientName} ${task.relatedProperty ?? ''} ${task.relatedLead ?? ''} ${task.assignedAgent} ${task.message}`.toLowerCase();
      return text.includes(search.toLowerCase()) && (status === 'all' || task.status === status) && (channel === 'all' || task.channel === channel);
    });
  }, [channel, search, status, tasks]);

  function updateStatus(id: string, nextStatus: FollowUpStatus) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, status: nextStatus } : task)));
  }

  function applyTemplate(templateId: string) {
    setSelectedTemplateId(templateId);
    const template = demoTemplates.find((item) => item.id === templateId);
    if (template) setCustomMessage(template.body);
  }

  function addFollowUp() {
    const next: FollowUpTask = {
      id: `fu_${String(tasks.length + 1).padStart(3, '0')}_new`,
      recipientName: 'New Prospect',
      recipientType: 'buyer',
      relatedProperty: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
      relatedLead: 'New inquiry response',
      assignedAgent: role === 'agent' ? 'Nneka Ibe' : 'Seyi Adewale',
      channel: 'whatsapp',
      message: customMessage,
      scheduledAt: '2026-06-10 10:00',
      status: 'scheduled',
      priority: 'medium',
    };
    setTasks((current) => [next, ...current]);
    setShowComposer(false);
  }

  const columns: ColumnDef<FollowUpTask>[] = [
    {
      header: 'Recipient',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.recipientName}</p>
          <p className="mt-1 text-xs capitalize text-slate-500">{row.original.recipientType}</p>
        </div>
      ),
    },
    {
      header: 'Channel',
      cell: ({ row }) => <Badge variant={row.original.channel === 'whatsapp' ? 'success' : row.original.channel === 'email' ? 'gold' : 'muted'}>{channelLabels[row.original.channel]}</Badge>,
    },
    {
      header: 'Message / Task',
      cell: ({ row }) => (
        <div className="max-w-md">
          <p className="line-clamp-2 text-sm text-slate-700">{row.original.message}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.relatedProperty}</p>
        </div>
      ),
    },
    {
      header: 'Agent',
      accessorKey: 'assignedAgent',
    },
    {
      header: 'Scheduled',
      accessorKey: 'scheduledAt',
    },
    {
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={followUpStatusLabels[row.original.status]} />,
    },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateStatus(row.original.id, event.target.value as FollowUpStatus)}>
          {statusOptions.map((option) => <option key={option} value={option}>{followUpStatusLabels[option]}</option>)}
        </select>
      ),
    },
  ];

  const campaignColumns: ColumnDef<CampaignRecord>[] = [
    {
      header: 'Campaign',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.name}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.audience}</p>
        </div>
      ),
    },
    { header: 'Channel', cell: ({ row }) => <Badge variant="muted">{channelLabels[row.original.channel]}</Badge> },
    { header: 'Recipients', accessorKey: 'recipients' },
    { header: 'Scheduled', accessorKey: 'scheduledAt' },
    { header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  ];

  const dueTodayCount = tasks.filter((task) => task.status === 'due_today').length;
  const scheduledCount = tasks.filter((task) => task.status === 'scheduled').length;
  const completedCount = tasks.filter((task) => task.status === 'completed').length;
  const missedCount = tasks.filter((task) => task.status === 'missed').length;

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{role === 'agent' ? 'My Follow-ups' : 'Automated Follow-Up System'}</h1>
          <p className="mt-2 text-slate-500">Schedule reminders, prepare WhatsApp/SMS/email messages and manage follow-up discipline across the sales pipeline.</p>
        </div>
        <Button variant="gold" onClick={() => setShowComposer((current) => !current)}><Plus className="h-4 w-4" /> Create follow-up</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Due today" value={String(dueTodayCount)} change="Do these first" icon={BellRing} />
        <StatCard label="Scheduled" value={String(scheduledCount)} change="Future reminders" icon={TimerReset} />
        <StatCard label="Completed" value={String(completedCount)} change="Pipeline discipline" icon={CheckCircle2} />
        <StatCard label="Missed" value={String(missedCount)} change="This is lost money" icon={MessageCircle} />
      </div>

      {showComposer && (
        <Card>
          <CardHeader>
            <CardTitle>Follow-up composer</CardTitle>
            <CardDescription>External sending is intentionally integration-ready, not hardcoded. Add Twilio, WhatsApp Cloud API, Resend or SendGrid keys later.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Input placeholder="Recipient" defaultValue="New Prospect" />
              <Select defaultValue="whatsapp">
                {channelOptions.map((option) => <option key={option} value={option}>{channelLabels[option]}</option>)}
              </Select>
              <Input type="datetime-local" defaultValue="2026-06-10T10:00" />
            </div>
            <div className="grid gap-4 md:grid-cols-[280px_1fr]">
              <Select value={selectedTemplateId} onChange={(event) => applyTemplate(event.target.value)}>
                {demoTemplates.map((template) => <option key={template.id} value={template.id}>{template.name}</option>)}
              </Select>
              <Textarea value={customMessage} onChange={(event) => setCustomMessage(event.target.value)} />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={addFollowUp}><Send className="h-4 w-4" /> Save scheduled follow-up</Button>
              <Button variant="secondary" onClick={() => setShowComposer(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
        <Input placeholder="Search follow-ups" value={search} onChange={(event) => setSearch(event.target.value)} />
        <Select value={status} onChange={(event) => setStatus(event.target.value as typeof status)}>
          <option value="all">All statuses</option>
          {statusOptions.map((option) => <option key={option} value={option}>{followUpStatusLabels[option]}</option>)}
        </Select>
        <Select value={channel} onChange={(event) => setChannel(event.target.value as typeof channel)}>
          <option value="all">All channels</option>
          {channelOptions.map((option) => <option key={option} value={option}>{channelLabels[option]}</option>)}
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Follow-up queue</CardTitle>
          <CardDescription>Every inquiry should have a next action. Leads without follow-ups are abandoned leads pretending to be pipeline.</CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleDataTable data={filtered} columns={columns} searchPlaceholder="Quick search follow-ups..." />
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Message templates</CardTitle>
            <CardDescription>Reusable templates for WhatsApp, SMS, email, calls and meetings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoTemplates.map((template) => (
              <div key={template.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-950">{template.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{template.useCase}</p>
                  </div>
                  <Badge variant="muted">{channelLabels[template.channel]}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{template.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Megaphone className="h-4 w-4 text-emerald-700" /> Campaign records</CardTitle>
            <CardDescription>Bulk messaging is recorded here. Real sending requires configured external APIs.</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleDataTable data={demoCampaigns} columns={campaignColumns} searchPlaceholder="Search campaigns..." />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
