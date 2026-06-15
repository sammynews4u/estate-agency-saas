'use client';

import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { AlertTriangle, CheckCircle2, CircleDollarSign, FileCheck2, Filter, Handshake, Plus, ShieldCheck } from 'lucide-react';
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
  demoDealTransactions,
  demoTransactionTasks,
  formatTransactionMoney,
  transactionPriorityLabels,
  transactionPriorityTone,
  transactionStageLabels,
  transactionStageTone,
  transactionTaskStatusLabels,
  transactionTaskTone,
  transactionTypeLabels,
  type DealTransaction,
  type TransactionPriority,
  type TransactionStage,
  type TransactionTask,
  type TransactionTaskStatus,
  type TransactionType,
} from '@/lib/transaction-data';

type Props = {
  role: 'agency' | 'agent' | 'client' | 'landlord' | 'finance';
};

const stages: TransactionStage[] = ['inquiry', 'offer', 'due_diligence', 'contract', 'deposit', 'closing', 'completed', 'failed'];
const priorities: TransactionPriority[] = ['low', 'medium', 'high', 'critical'];
const types: TransactionType[] = ['sale', 'rent', 'lease', 'off_plan'];
const taskStatuses: TransactionTaskStatus[] = ['pending', 'in_progress', 'completed', 'blocked'];

export function TransactionWorkspace({ role }: Props) {
  const initialDeals = useMemo(() => {
    if (role === 'agent') return demoDealTransactions.filter((deal) => ['Nneka Ibe', 'Seyi Adewale', 'Tunde Lawal'].includes(deal.agent));
    if (role === 'client') return demoDealTransactions.filter((deal) => ['Aisha Bello', 'Femi Adebayo'].includes(deal.client));
    if (role === 'landlord') return demoDealTransactions.filter((deal) => deal.counterparty.toLowerCase().includes('landlord') || deal.property.includes('Lekki'));
    if (role === 'finance') return demoDealTransactions.filter((deal) => ['deposit', 'closing', 'completed', 'contract'].includes(deal.stage));
    return demoDealTransactions;
  }, [role]);

  const [deals, setDeals] = useState<DealTransaction[]>(initialDeals);
  const [tasks, setTasks] = useState<TransactionTask[]>(demoTransactionTasks);
  const [stageFilter, setStageFilter] = useState<'all' | TransactionStage>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | TransactionPriority>('all');
  const [activeView, setActiveView] = useState<'pipeline' | 'tasks' | 'control'>('pipeline');
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState('New property transaction');
  const [property, setProperty] = useState('Select property');
  const [client, setClient] = useState('Client name');
  const [counterparty, setCounterparty] = useState('Seller / landlord / developer');
  const [agent, setAgent] = useState(role === 'agent' ? 'Nneka Ibe' : 'Agency Deal Desk');
  const [type, setType] = useState<TransactionType>('sale');
  const [priority, setPriority] = useState<TransactionPriority>('medium');
  const [dealValue, setDealValue] = useState('100000000');
  const [nextAction, setNextAction] = useState('Confirm documents, payment timeline and closing responsibilities.');

  const filteredDeals = useMemo(
    () => deals.filter((deal) => (stageFilter === 'all' || deal.stage === stageFilter) && (priorityFilter === 'all' || deal.priority === priorityFilter)),
    [deals, stageFilter, priorityFilter],
  );

  function updateStage(id: string, nextStage: TransactionStage) {
    setDeals((current) => current.map((deal) => (deal.id === id ? { ...deal, stage: nextStage } : deal)));
  }

  function updateTaskStatus(id: string, nextStatus: TransactionTaskStatus) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, status: nextStatus } : task)));
  }

  function addDeal() {
    const value = Number(dealValue) || 0;
    const next: DealTransaction = {
      id: `txn_${Date.now()}`,
      title,
      property,
      client,
      counterparty,
      agent,
      branch: 'Lekki HQ',
      type,
      stage: 'inquiry',
      priority,
      dealValue: value,
      expectedCommission: Math.round(value * 0.03),
      closingDate: '2026-07-15',
      nextAction,
      checklistProgress: 12,
      documentCount: 0,
      riskNote: 'New deal. Assign document checklist before calling it qualified.',
    };
    setDeals((current) => [next, ...current]);
    setShowForm(false);
  }

  const pipelineValue = deals.filter((deal) => deal.stage !== 'failed').reduce((sum, deal) => sum + deal.dealValue, 0);
  const expectedCommission = deals.filter((deal) => deal.stage !== 'failed').reduce((sum, deal) => sum + deal.expectedCommission, 0);
  const closingDeals = deals.filter((deal) => ['deposit', 'closing'].includes(deal.stage)).length;
  const riskyDeals = deals.filter((deal) => deal.priority === 'critical' || deal.checklistProgress < 40).length;

  const columns: ColumnDef<DealTransaction>[] = [
    {
      header: 'Transaction',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.title}</p>
          <p className="mt-1 max-w-[360px] text-xs leading-5 text-slate-500">{row.original.property}</p>
          <p className="mt-1 text-xs text-slate-400">{row.original.client} ↔ {row.original.counterparty}</p>
        </div>
      ),
    },
    { header: 'Type', cell: ({ row }) => <Badge variant="muted">{transactionTypeLabels[row.original.type]}</Badge> },
    { header: 'Value', cell: ({ row }) => <span className="font-bold text-slate-800">{formatTransactionMoney(row.original.dealValue)}</span> },
    {
      header: 'Checklist',
      cell: ({ row }) => (
        <div className="min-w-[130px]">
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${row.original.checklistProgress}%` }} />
          </div>
          <p className="mt-1 text-xs text-slate-500">{row.original.checklistProgress}% • {row.original.documentCount} docs</p>
        </div>
      ),
    },
    { header: 'Agent', accessorKey: 'agent' },
    { header: 'Priority', cell: ({ row }) => <Badge variant={transactionPriorityTone[row.original.priority]}>{transactionPriorityLabels[row.original.priority]}</Badge> },
    { header: 'Stage', cell: ({ row }) => <Badge variant={transactionStageTone[row.original.stage]}>{transactionStageLabels[row.original.stage]}</Badge> },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.stage} onChange={(event) => updateStage(row.original.id, event.target.value as TransactionStage)}>
          {stages.map((option) => <option key={option} value={option}>{transactionStageLabels[option]}</option>)}
        </select>
      ),
    },
  ];

  const taskColumns: ColumnDef<TransactionTask>[] = [
    { header: 'Task', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.task}</p><p className="mt-1 text-xs text-slate-500">{row.original.transactionTitle}</p>{row.original.blocker ? <p className="mt-1 text-xs font-semibold text-red-600">Blocker: {row.original.blocker}</p> : null}</div> },
    { header: 'Owner', accessorKey: 'owner' },
    { header: 'Due date', accessorKey: 'dueDate' },
    { header: 'Status', cell: ({ row }) => <Badge variant={transactionTaskTone[row.original.status]}>{transactionTaskStatusLabels[row.original.status]}</Badge> },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateTaskStatus(row.original.id, event.target.value as TransactionTaskStatus)}>
          {taskStatuses.map((option) => <option key={option} value={option}>{transactionTaskStatusLabels[option]}</option>)}
        </select>
      ),
    },
  ];

  const heading = role === 'finance' ? 'Transaction Finance Control' : role === 'client' ? 'My Property Transactions' : role === 'landlord' ? 'My Deal Pipeline' : 'Deal Pipeline & Transaction Management';
  const description = role === 'finance'
    ? 'Track deals that create commission, receipts, deposits and closing obligations before finance records become messy.'
    : 'Move every sale, rent, lease and off-plan deal through a controlled closing pipeline with tasks, documents, risk notes and next actions.';

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{heading}</h1>
          <p className="mt-2 max-w-3xl text-slate-500">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary"><FileCheck2 className="h-4 w-4" /> Closing checklist</Button>
          {role !== 'client' && <Button variant="gold" onClick={() => setShowForm((current) => !current)}><Plus className="h-4 w-4" /> New transaction</Button>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pipeline value" value={formatTransactionMoney(pipelineValue)} change="Open non-failed deals" icon={CircleDollarSign} />
        <StatCard label="Expected commission" value={formatTransactionMoney(expectedCommission)} change="Projected agency income" icon={Handshake} />
        <StatCard label="Near closing" value={String(closingDeals)} change="Deposit or closing stage" icon={CheckCircle2} />
        <StatCard label="Risk flags" value={String(riskyDeals)} change="Low checklist progress or critical priority" icon={AlertTriangle} />
      </div>

      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4 text-sm leading-6 text-amber-950">
          <span className="font-black">Hard rule:</span> a deal is not real revenue until documents, payment terms, counterparty identity, approvals and closing responsibilities are tracked. This module prevents agents from confusing excitement with execution.
        </CardContent>
      </Card>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create transaction</CardTitle>
            <CardDescription>Start a structured deal record. Full Supabase CRUD can be wired after the screen flow is approved.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <Input value={title} onChange={(event) => setTitle(event.target.value)} />
              <Input value={property} onChange={(event) => setProperty(event.target.value)} />
              <Input value={client} onChange={(event) => setClient(event.target.value)} />
              <Input value={counterparty} onChange={(event) => setCounterparty(event.target.value)} />
              <Input value={agent} onChange={(event) => setAgent(event.target.value)} />
              <Select value={type} onChange={(event) => setType(event.target.value as TransactionType)}>{types.map((option) => <option key={option} value={option}>{transactionTypeLabels[option]}</option>)}</Select>
              <Select value={priority} onChange={(event) => setPriority(event.target.value as TransactionPriority)}>{priorities.map((option) => <option key={option} value={option}>{transactionPriorityLabels[option]}</option>)}</Select>
              <Input value={dealValue} onChange={(event) => setDealValue(event.target.value)} inputMode="numeric" />
            </div>
            <Textarea value={nextAction} onChange={(event) => setNextAction(event.target.value)} />
            <Button onClick={addDeal}><Plus className="h-4 w-4" /> Save transaction</Button>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap gap-2">
        {[
          ['pipeline', 'Pipeline'],
          ['tasks', 'Closing tasks'],
          ['control', 'Control room'],
        ].map(([value, label]) => <Button key={value} variant={activeView === value ? 'default' : 'outline'} size="sm" onClick={() => setActiveView(value as typeof activeView)}>{label}</Button>)}
      </div>

      {activeView === 'pipeline' && (
        <div className="space-y-4">
          <Card>
            <CardContent className="grid gap-3 p-4 md:grid-cols-2 lg:grid-cols-4">
              <Select value={stageFilter} onChange={(event) => setStageFilter(event.target.value as 'all' | TransactionStage)}>
                <option value="all">All stages</option>
                {stages.map((option) => <option key={option} value={option}>{transactionStageLabels[option]}</option>)}
              </Select>
              <Select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value as 'all' | TransactionPriority)}>
                <option value="all">All priorities</option>
                {priorities.map((option) => <option key={option} value={option}>{transactionPriorityLabels[option]}</option>)}
              </Select>
              <Button variant="secondary"><Filter className="h-4 w-4" /> Apply filters</Button>
            </CardContent>
          </Card>
          <SimpleDataTable data={filteredDeals} columns={columns} searchPlaceholder="Search transactions..." />
        </div>
      )}

      {activeView === 'tasks' && <SimpleDataTable data={tasks} columns={taskColumns} searchPlaceholder="Search transaction tasks..." />}

      {activeView === 'control' && (
        <div className="grid gap-4 lg:grid-cols-3">
          {deals.slice(0, 3).map((deal) => (
            <Card key={deal.id}>
              <CardHeader>
                <CardTitle>{deal.title}</CardTitle>
                <CardDescription>{deal.nextAction}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-600">
                <div className="flex items-center justify-between"><span>Stage</span><Badge variant={transactionStageTone[deal.stage]}>{transactionStageLabels[deal.stage]}</Badge></div>
                <div className="flex items-center justify-between"><span>Deal value</span><span className="font-bold text-slate-950">{formatTransactionMoney(deal.dealValue)}</span></div>
                <div className="flex items-center justify-between"><span>Closing date</span><span className="font-semibold text-slate-800">{deal.closingDate}</span></div>
                <div className="rounded-xl bg-slate-50 p-3 leading-6"><ShieldCheck className="mb-2 h-4 w-4 text-emerald-600" />{deal.riskNote}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
