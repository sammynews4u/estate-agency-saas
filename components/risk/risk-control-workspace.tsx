'use client';

import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { AlertTriangle, ClipboardCheck, Eye, FileWarning, ShieldCheck, ShieldAlert } from 'lucide-react';
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
  auditEventLabels,
  controlStatusLabels,
  controlStatusTone,
  demoAuditEvents,
  demoControlChecks,
  demoRisks,
  riskLevelLabels,
  riskLevelTone,
  riskStatusLabels,
  riskStatusTone,
  type AuditTrailEvent,
  type ControlStatus,
  type InternalControlCheck,
  type RiskLevel,
  type RiskRegisterItem,
  type RiskStatus,
} from '@/lib/risk-data';

type Props = {
  role: 'super-admin' | 'agency' | 'finance';
};

const riskLevels: RiskLevel[] = ['low', 'medium', 'high', 'critical'];
const riskStatuses: RiskStatus[] = ['open', 'investigating', 'mitigated', 'accepted', 'closed'];
const controlStatuses: ControlStatus[] = ['not_started', 'in_progress', 'passed', 'failed'];

export function RiskControlWorkspace({ role }: Props) {
  const [risks, setRisks] = useState<RiskRegisterItem[]>(demoRisks);
  const [auditEvents] = useState<AuditTrailEvent[]>(demoAuditEvents);
  const [controls, setControls] = useState<InternalControlCheck[]>(demoControlChecks);
  const [activeView, setActiveView] = useState<'risks' | 'audit' | 'controls'>('risks');
  const [levelFilter, setLevelFilter] = useState<'all' | RiskLevel>('all');
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('New risk item');
  const [category, setCategory] = useState('Operational control');
  const [owner, setOwner] = useState(role === 'finance' ? 'Finance Desk' : 'Agency Admin');
  const [level, setLevel] = useState<RiskLevel>('medium');
  const [impact, setImpact] = useState('Describe what will go wrong if this risk is ignored.');
  const [mitigation, setMitigation] = useState('Define the control action, owner and deadline.');

  const filteredRisks = useMemo(() => risks.filter((risk) => levelFilter === 'all' || risk.level === levelFilter), [risks, levelFilter]);

  function updateRiskStatus(id: string, nextStatus: RiskStatus) {
    setRisks((current) => current.map((item) => (item.id === id ? { ...item, status: nextStatus } : item)));
  }

  function updateControlStatus(id: string, nextStatus: ControlStatus) {
    setControls((current) => current.map((item) => (item.id === id ? { ...item, status: nextStatus } : item)));
  }

  function addRisk() {
    const next: RiskRegisterItem = {
      id: `risk_${Date.now()}`,
      title,
      category,
      owner,
      level,
      status: 'open',
      impact,
      mitigation,
      dueDate: '2026-06-14',
    };
    setRisks((current) => [next, ...current]);
    setShowForm(false);
  }

  const riskColumns: ColumnDef<RiskRegisterItem>[] = [
    {
      header: 'Risk',
      cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.title}</p><p className="mt-1 text-xs text-slate-500">{row.original.category}</p></div>,
    },
    { header: 'Owner', accessorKey: 'owner' },
    { header: 'Level', cell: ({ row }) => <Badge variant={riskLevelTone[row.original.level]}>{riskLevelLabels[row.original.level]}</Badge> },
    { header: 'Due', accessorKey: 'dueDate' },
    { header: 'Status', cell: ({ row }) => <Badge variant={riskStatusTone[row.original.status]}>{riskStatusLabels[row.original.status]}</Badge> },
    {
      header: 'Mitigation',
      cell: ({ row }) => <p className="max-w-[360px] text-xs leading-5 text-slate-500">{row.original.mitigation}</p>,
    },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateRiskStatus(row.original.id, event.target.value as RiskStatus)}>
          {riskStatuses.map((option) => <option key={option} value={option}>{riskStatusLabels[option]}</option>)}
        </select>
      ),
    },
  ];

  const auditColumns: ColumnDef<AuditTrailEvent>[] = [
    { header: 'Actor', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.actor}</p><p className="mt-1 text-xs text-slate-500">{row.original.role}</p></div> },
    { header: 'Event', cell: ({ row }) => <Badge variant="muted">{auditEventLabels[row.original.eventType]}</Badge> },
    { header: 'Action', cell: ({ row }) => <p className="max-w-[360px] text-sm text-slate-700">{row.original.action}</p> },
    { header: 'Record', accessorKey: 'affectedRecord' },
    { header: 'IP', accessorKey: 'ipAddress' },
    { header: 'Risk', cell: ({ row }) => <Badge variant={riskLevelTone[row.original.riskLevel]}>{riskLevelLabels[row.original.riskLevel]}</Badge> },
    { header: 'Time', accessorKey: 'createdAt' },
  ];

  const controlColumns: ColumnDef<InternalControlCheck>[] = [
    { header: 'Control', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.control}</p><p className="mt-1 text-xs text-slate-500">{row.original.area}</p></div> },
    { header: 'Owner', accessorKey: 'owner' },
    { header: 'Last checked', accessorKey: 'lastChecked' },
    { header: 'Evidence', cell: ({ row }) => <p className="max-w-[360px] text-xs leading-5 text-slate-500">{row.original.evidence}</p> },
    { header: 'Status', cell: ({ row }) => <Badge variant={controlStatusTone[row.original.status]}>{controlStatusLabels[row.original.status]}</Badge> },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateControlStatus(row.original.id, event.target.value as ControlStatus)}>
          {controlStatuses.map((option) => <option key={option} value={option}>{controlStatusLabels[option]}</option>)}
        </select>
      ),
    },
  ];

  const criticalOpen = risks.filter((risk) => ['high', 'critical'].includes(risk.level) && ['open', 'investigating'].includes(risk.status)).length;
  const failedControls = controls.filter((control) => control.status === 'failed').length;
  const highRiskAudit = auditEvents.filter((event) => ['high', 'critical'].includes(event.riskLevel)).length;
  const mitigated = risks.filter((risk) => risk.status === 'mitigated' || risk.status === 'closed').length;

  const description = role === 'finance'
    ? 'Track finance-sensitive audit events, internal controls, voided receipts, suspicious adjustments and billing risks.'
    : role === 'super-admin'
      ? 'Monitor platform-wide operational risks, suspicious actions, access changes and enterprise governance controls.'
      : 'Control agency risks before they become fraud, lawsuits, lost mandates or client trust problems.';

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Audit, Risk & Internal Control</h1>
          <p className="mt-2 max-w-3xl text-slate-500">{description}</p>
        </div>
        <Button variant="gold" onClick={() => setShowForm((current) => !current)}><FileWarning className="h-4 w-4" /> New risk</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="High/critical open risks" value={String(criticalOpen)} change="These require executive attention" icon={ShieldAlert} />
        <StatCard label="Failed controls" value={String(failedControls)} change="Controls that are currently broken" icon={AlertTriangle} />
        <StatCard label="High-risk audit events" value={String(highRiskAudit)} change="Sensitive actions requiring review" icon={Eye} />
        <StatCard label="Mitigated or closed" value={String(mitigated)} change="Risks under control" icon={ShieldCheck} />
      </div>

      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4 text-sm leading-6 text-red-950">
          <span className="font-black">No fantasy security:</span> audit logs and risk controls only matter if privileged actions, exports, financial edits, document changes and permission changes are actually written into the audit trail.
        </CardContent>
      </Card>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add risk item</CardTitle>
            <CardDescription>Capture the ugly operational problems early. If nobody owns the risk, the system is pretending.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Risk title" />
              <Input value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
              <Input value={owner} onChange={(event) => setOwner(event.target.value)} placeholder="Owner" />
              <Select value={level} onChange={(event) => setLevel(event.target.value as RiskLevel)}>{riskLevels.map((option) => <option key={option} value={option}>{riskLevelLabels[option]}</option>)}</Select>
            </div>
            <Textarea value={impact} onChange={(event) => setImpact(event.target.value)} placeholder="Impact" />
            <Textarea value={mitigation} onChange={(event) => setMitigation(event.target.value)} placeholder="Mitigation" />
            <Button onClick={addRisk}><FileWarning className="h-4 w-4" /> Save risk</Button>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {[
          ['risks', 'Risk register'],
          ['audit', 'Audit trail'],
          ['controls', 'Internal controls'],
        ].map(([value, label]) => <Button key={value} variant={activeView === value ? 'default' : 'outline'} size="sm" onClick={() => setActiveView(value as typeof activeView)}>{label}</Button>)}
        {activeView === 'risks' && (
          <Select className="w-48" value={levelFilter} onChange={(event) => setLevelFilter(event.target.value as typeof levelFilter)}>
            <option value="all">All risk levels</option>
            {riskLevels.map((option) => <option key={option} value={option}>{riskLevelLabels[option]}</option>)}
          </Select>
        )}
      </div>

      {activeView === 'risks' && <SimpleDataTable data={filteredRisks} columns={riskColumns} searchPlaceholder="Search risks..." />}
      {activeView === 'audit' && <SimpleDataTable data={auditEvents} columns={auditColumns} searchPlaceholder="Search audit trail..." />}
      {activeView === 'controls' && <SimpleDataTable data={controls} columns={controlColumns} searchPlaceholder="Search controls..." />}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardCheck className="h-5 w-5 text-emerald-600" /> Control policy priorities</CardTitle>
          <CardDescription>These are the controls that must become real server-side rules, not dashboard decoration.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {['Approval required for receipt voiding and commission edits.', 'Featured listings blocked until ownership verification is complete.', 'Exports, role changes and bulk messaging must always create audit logs.'].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700">{item}</div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
