'use client';

import { useEffect, useMemo, useState } from 'react';
import { Activity, Download, FilePlus2, RotateCcw, Save, Search, Trash2 } from 'lucide-react';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { StatCard } from '@/components/dashboard/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getDemoModuleRecords, type DemoModuleRecord, type DemoRecordStatus } from '@/lib/module-demo-data';
import type { RouteRole } from '@/types/roles';

const statuses: DemoRecordStatus[] = ['Active', 'Pending', 'In Progress', 'Completed', 'Escalated', 'Closed'];

const statusVariant: Record<DemoRecordStatus, 'success' | 'warning' | 'danger' | 'muted' | 'gold' | 'default'> = {
  Active: 'success',
  Pending: 'warning',
  'In Progress': 'gold',
  Completed: 'success',
  Escalated: 'danger',
  Closed: 'muted',
};

type DemoModuleWorkspaceProps = {
  role: RouteRole;
  sectionKey: string;
  title: string;
  description: string;
  detailId?: string;
};

const blankForm = {
  title: '',
  category: '',
  owner: '',
  value: '',
  dueDate: '2026-06-30',
  notes: '',
};

export function DemoModuleWorkspace({ role, sectionKey, title, description, detailId }: DemoModuleWorkspaceProps) {
  const storageKey = `estateflow-demo:${role}:${sectionKey}`;
  const baseRecords = useMemo(() => getDemoModuleRecords(role, sectionKey), [role, sectionKey]);
  const [records, setRecords] = useState<DemoModuleRecord[]>(baseRecords);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<DemoRecordStatus | 'All'>('All');
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(detailId);
  const [form, setForm] = useState(blankForm);
  const [activity, setActivity] = useState<string[]>(['Demo workspace opened']);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setRecords(JSON.parse(stored) as DemoModuleRecord[]);
    } catch {
      setRecords(baseRecords);
    }
  }, [baseRecords, storageKey]);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(records));
    } catch {
      // localStorage may be unavailable in private browser modes. The UI still works for the current session.
    }
  }, [records, storageKey]);

  const filteredRecords = records.filter((record) => {
    const text = `${record.title} ${record.category} ${record.owner} ${record.status} ${record.notes}`.toLowerCase();
    return text.includes(search.toLowerCase()) && (statusFilter === 'All' || record.status === statusFilter);
  });

  const selectedRecord = selectedId ? records.find((record) => record.id === selectedId) : undefined;
  const activeCount = records.filter((record) => record.status === 'Active' || record.status === 'In Progress').length;
  const pendingCount = records.filter((record) => record.status === 'Pending' || record.status === 'Escalated').length;
  const completedCount = records.filter((record) => record.status === 'Completed' || record.status === 'Closed').length;

  function log(message: string) {
    setActivity((current) => [`${new Date().toLocaleTimeString()} - ${message}`, ...current].slice(0, 8));
  }

  function updateRecord(id: string, patch: Partial<DemoModuleRecord>) {
    setRecords((current) => current.map((record) => (record.id === id ? { ...record, ...patch } : record)));
    log(`Updated ${title} record`);
  }

  function deleteRecord(id: string) {
    setRecords((current) => current.filter((record) => record.id !== id));
    log(`Deleted ${title} record`);
  }

  function addRecord() {
    const next: DemoModuleRecord = {
      id: `${sectionKey}_${Date.now()}`,
      title: form.title || `New ${title} record`,
      category: form.category || 'General',
      owner: form.owner || 'Demo Owner',
      status: 'Pending',
      value: form.value || '₦0',
      dueDate: form.dueDate || '2026-06-30',
      notes: form.notes || 'Created from the interactive demo dashboard.',
    };
    setRecords((current) => [next, ...current]);
    setForm(blankForm);
    setShowForm(false);
    log(`Created ${next.title}`);
  }

  function resetRecords() {
    setRecords(baseRecords);
    log(`Reset ${title} demo data`);
  }

  function exportCsv() {
    const rows = [
      ['ID', 'Title', 'Category', 'Owner', 'Status', 'Value', 'Due Date', 'Notes'],
      ...records.map((record) => [record.id, record.title, record.category, record.owner, record.status, record.value, record.dueDate, record.notes]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${role}-${sectionKey}-demo.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
    log(`Exported ${records.length} ${title} records`);
  }

  if (selectedRecord || detailId) {
    return (
      <div className="space-y-6">
        <Breadcrumbs />
        {selectedRecord ? (
          <>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">{title} detail</p>
                <h1 className="mt-2 text-3xl font-black text-slate-950">{selectedRecord.title}</h1>
                <p className="mt-2 max-w-3xl text-slate-500">{description}</p>
              </div>
              <Button variant="secondary" onClick={() => setSelectedId(undefined)}>Back to {title}</Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Edit record</CardTitle>
                  <CardDescription>Changes persist in the browser demo store.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <Input value={selectedRecord.title} onChange={(event) => updateRecord(selectedRecord.id, { title: event.target.value })} />
                  <Input value={selectedRecord.category} onChange={(event) => updateRecord(selectedRecord.id, { category: event.target.value })} />
                  <Input value={selectedRecord.owner} onChange={(event) => updateRecord(selectedRecord.id, { owner: event.target.value })} />
                  <Select value={selectedRecord.status} onChange={(event) => updateRecord(selectedRecord.id, { status: event.target.value as DemoRecordStatus })}>
                    {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                  </Select>
                  <Input value={selectedRecord.value} onChange={(event) => updateRecord(selectedRecord.id, { value: event.target.value })} />
                  <Input type="date" value={selectedRecord.dueDate} onChange={(event) => updateRecord(selectedRecord.id, { dueDate: event.target.value })} />
                  <Textarea className="md:col-span-2" value={selectedRecord.notes} onChange={(event) => updateRecord(selectedRecord.id, { notes: event.target.value })} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Workflow control</CardTitle>
                  <CardDescription>Use this to test real dashboard actions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3"><span className="text-sm text-slate-500">Status</span><Badge variant={statusVariant[selectedRecord.status]}>{selectedRecord.status}</Badge></div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3"><span className="text-sm text-slate-500">Owner</span><strong>{selectedRecord.owner}</strong></div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3"><span className="text-sm text-slate-500">Value</span><strong>{selectedRecord.value}</strong></div>
                  <Button className="w-full" onClick={() => updateRecord(selectedRecord.id, { status: 'Completed' })}><Save className="h-4 w-4" /> Mark completed</Button>
                  <Button className="w-full" variant="outline" onClick={() => updateRecord(selectedRecord.id, { status: 'Escalated' })}>Escalate</Button>
                  <Button className="w-full" variant="danger" onClick={() => deleteRecord(selectedRecord.id)}><Trash2 className="h-4 w-4" /> Delete record</Button>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Record not found</CardTitle>
              <CardDescription>The record may have been deleted in this browser demo.</CardDescription>
            </CardHeader>
            <CardContent><Button onClick={() => setSelectedId(undefined)}>Return to {title}</Button></CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{title}</h1>
          <p className="mt-2 max-w-3xl text-slate-500">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={exportCsv}><Download className="h-4 w-4" /> Export CSV</Button>
          <Button variant="outline" onClick={resetRecords}><RotateCcw className="h-4 w-4" /> Reset</Button>
          <Button onClick={() => setShowForm((current) => !current)}><FilePlus2 className="h-4 w-4" /> {showForm ? 'Close form' : 'Create record'}</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total records" value={String(records.length)} change="Demo store" icon={Activity} />
        <StatCard label="Active work" value={String(activeCount)} change="Open workflows" icon={Activity} />
        <StatCard label="Needs review" value={String(pendingCount)} change="Pending or escalated" icon={Activity} />
        <StatCard label="Completed" value={String(completedCount)} change="Closed outcomes" icon={Activity} />
      </div>

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Create {title} record</CardTitle>
            <CardDescription>This is not a dead button. Submit it and the table updates immediately.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
            <Input placeholder="Category" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} />
            <Input placeholder="Owner" value={form.owner} onChange={(event) => setForm((current) => ({ ...current, owner: event.target.value }))} />
            <Input placeholder="Value" value={form.value} onChange={(event) => setForm((current) => ({ ...current, value: event.target.value }))} />
            <Input type="date" value={form.dueDate} onChange={(event) => setForm((current) => ({ ...current, dueDate: event.target.value }))} />
            <Input placeholder="Notes" value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
            <Button className="md:col-span-2" onClick={addRecord}>Save new record</Button>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>{title} workspace</CardTitle>
          <CardDescription>Search, filter, edit status, open details, export data and create records.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <Input className="pl-9" placeholder={`Search ${title.toLowerCase()}...`} value={search} onChange={(event) => setSearch(event.target.value)} />
            </div>
            <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as DemoRecordStatus | 'All')}>
              <option value="All">All statuses</option>
              {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </Select>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-bold">Record</th>
                  <th className="px-4 py-3 font-bold">Category</th>
                  <th className="px-4 py-3 font-bold">Owner</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 font-bold">Value</th>
                  <th className="px-4 py-3 font-bold">Due</th>
                  <th className="px-4 py-3 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-4 py-4">
                      <button type="button" className="font-bold text-slate-950 hover:text-emerald-700" onClick={() => setSelectedId(record.id)}>{record.title}</button>
                      <p className="mt-1 max-w-sm truncate text-xs text-slate-500">{record.notes}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{record.category}</td>
                    <td className="px-4 py-4 text-slate-600"><Input className="h-9 min-w-40" value={record.owner} onChange={(event) => updateRecord(record.id, { owner: event.target.value })} /></td>
                    <td className="px-4 py-4">
                      <Select className="h-9 min-w-36" value={record.status} onChange={(event) => updateRecord(record.id, { status: event.target.value as DemoRecordStatus })}>
                        {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                      </Select>
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-900">{record.value}</td>
                    <td className="px-4 py-4 text-slate-600">{record.dueDate}</td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" onClick={() => setSelectedId(record.id)}>Open</Button>
                        <Button size="sm" variant="danger" onClick={() => deleteRecord(record.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
          <CardDescription>Actions you perform in this demo are logged here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {activity.map((item) => <div key={item} className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">{item}</div>)}
        </CardContent>
      </Card>
    </div>
  );
}
