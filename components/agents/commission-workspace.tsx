'use client';

import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Banknote, Coins, FilePlus2, ReceiptText, TrendingUp } from 'lucide-react';
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
  commissionStatusLabels,
  commissionStatusTone,
  demoCommissions,
  formatAgentMoney,
  type CommissionRecord,
  type CommissionStatus,
} from '@/lib/agent-data';

const statuses: CommissionStatus[] = ['pending', 'approved', 'paid', 'disputed', 'cancelled'];

export function CommissionWorkspace() {
  const [commissions, setCommissions] = useState<CommissionRecord[]>(demoCommissions.filter((commission) => commission.agentName === 'Nneka Ibe'));
  const [status, setStatus] = useState<'all' | CommissionStatus>('all');
  const [showForm, setShowForm] = useState(false);
  const [propertyTitle, setPropertyTitle] = useState('Newly closed agency deal');
  const [clientName, setClientName] = useState('New Client');
  const [dealValue, setDealValue] = useState('50000000');
  const [commissionRate, setCommissionRate] = useState('3');
  const [notes, setNotes] = useState('Attach closing evidence before finance approval.');

  const filtered = useMemo(() => commissions.filter((commission) => status === 'all' || commission.status === status), [commissions, status]);

  function updateStatus(id: string, nextStatus: CommissionStatus) {
    setCommissions((current) => current.map((commission) => (commission.id === id ? { ...commission, status: nextStatus } : commission)));
  }

  function addCommissionClaim() {
    const value = Number(dealValue) || 0;
    const rate = Number(commissionRate) || 0;
    const next: CommissionRecord = {
      id: `comm_${Date.now()}`,
      agentName: 'Nneka Ibe',
      propertyTitle,
      clientName,
      dealType: 'sale',
      dealValue: value,
      commissionRate: rate,
      commissionAmount: Math.round((value * rate) / 100),
      status: 'pending',
      closedAt: '2026-06-05',
      dueDate: '2026-06-15',
      notes,
    };

    setCommissions((current) => [next, ...current]);
    setShowForm(false);
  }

  const columns: ColumnDef<CommissionRecord>[] = [
    {
      header: 'Deal',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.propertyTitle}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.clientName} • {row.original.dealType}</p>
        </div>
      ),
    },
    { header: 'Deal value', cell: ({ row }) => <span className="font-bold text-slate-950">{formatAgentMoney(row.original.dealValue)}</span> },
    { header: 'Rate', cell: ({ row }) => <Badge variant="muted">{row.original.commissionRate}%</Badge> },
    { header: 'Commission', cell: ({ row }) => <span className="font-bold text-emerald-700">{formatAgentMoney(row.original.commissionAmount)}</span> },
    { header: 'Due date', accessorKey: 'dueDate' },
    { header: 'Status', cell: ({ row }) => <Badge variant={commissionStatusTone[row.original.status]}>{commissionStatusLabels[row.original.status]}</Badge> },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateStatus(row.original.id, event.target.value as CommissionStatus)}>
          {statuses.map((option) => <option key={option} value={option}>{commissionStatusLabels[option]}</option>)}
        </select>
      ),
    },
  ];

  const totalEarned = commissions.reduce((sum, commission) => sum + commission.commissionAmount, 0);
  const approved = commissions.filter((commission) => commission.status === 'approved').reduce((sum, commission) => sum + commission.commissionAmount, 0);
  const paid = commissions.filter((commission) => commission.status === 'paid').reduce((sum, commission) => sum + commission.commissionAmount, 0);
  const pending = commissions.filter((commission) => commission.status === 'pending').reduce((sum, commission) => sum + commission.commissionAmount, 0);

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">My Commissions</h1>
          <p className="mt-2 max-w-3xl text-slate-500">Track earned, approved, paid and disputed commissions. This module is intentionally tied to real deals, not vanity activity.</p>
        </div>
        <Button variant="gold" onClick={() => setShowForm((current) => !current)}><FilePlus2 className="h-4 w-4" /> Add claim</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total commission" value={formatAgentMoney(totalEarned)} change="All tracked deals" icon={Coins} />
        <StatCard label="Approved" value={formatAgentMoney(approved)} change="Ready for payout" icon={ReceiptText} />
        <StatCard label="Paid" value={formatAgentMoney(paid)} change="Already settled" icon={Banknote} />
        <StatCard label="Pending" value={formatAgentMoney(pending)} change="Needs finance approval" icon={TrendingUp} />
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add commission claim</CardTitle>
            <CardDescription>Use this only after a real transaction milestone. Weak claims should be rejected by finance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Input value={propertyTitle} onChange={(event) => setPropertyTitle(event.target.value)} placeholder="Property title" />
              <Input value={clientName} onChange={(event) => setClientName(event.target.value)} placeholder="Client name" />
              <Input value={dealValue} onChange={(event) => setDealValue(event.target.value)} placeholder="Deal value" />
              <Input value={commissionRate} onChange={(event) => setCommissionRate(event.target.value)} placeholder="Commission rate" />
            </div>
            <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} />
            <div className="flex flex-wrap gap-3">
              <Button onClick={addCommissionClaim}>Submit claim</Button>
              <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Commission controls</CardTitle>
          <CardDescription>Filter commission records by approval and payout stage.</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={status} onChange={(event) => setStatus(event.target.value as 'all' | CommissionStatus)} className="max-w-sm">
            <option value="all">All statuses</option>
            {statuses.map((option) => <option key={option} value={option}>{commissionStatusLabels[option]}</option>)}
          </Select>
        </CardContent>
      </Card>

      <SimpleDataTable data={filtered} columns={columns} searchPlaceholder="Search commission records..." />
    </div>
  );
}
