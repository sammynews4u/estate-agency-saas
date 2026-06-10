'use client';

import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { BrainCircuit, ClipboardCheck, Copy, FileText, MessageSquareText, Sparkles, WandSparkles } from 'lucide-react';
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
  aiToolLabels,
  demoAIGenerations,
  demoPromptTemplates,
  generateDemoAIOutput,
  generationStatusLabels,
  type AIGenerationRecord,
  type AIGenerationStatus,
  type AIToolType,
} from '@/lib/ai-data';

type Props = {
  role: 'agency' | 'agent';
};

const generationStatuses: AIGenerationStatus[] = ['draft', 'saved', 'used'];

export function AIAssistantWorkspace({ role }: Props) {
  const [generations, setGenerations] = useState<AIGenerationRecord[]>(role === 'agent' ? demoAIGenerations.filter((generation) => generation.relatedClient || generation.relatedProperty) : demoAIGenerations);
  const [toolType, setToolType] = useState<AIToolType>('property_description');
  const [title, setTitle] = useState('New AI draft');
  const [relatedProperty, setRelatedProperty] = useState('Luxury 5-Bedroom Detached Duplex in Lekki Phase 1');
  const [relatedClient, setRelatedClient] = useState('Aisha Bello');
  const [context, setContext] = useState('5-bedroom detached duplex in Lekki Phase 1, Governor’s Consent, swimming pool, BQ, smart locks, fitted kitchen, strong family-buyer demand.');
  const [output, setOutput] = useState(generateDemoAIOutput('property_description', context));
  const [status, setStatus] = useState<'all' | AIGenerationStatus>('all');

  const templatesForTool = useMemo(() => demoPromptTemplates.filter((template) => template.toolType === toolType), [toolType]);
  const filtered = useMemo(() => generations.filter((generation) => status === 'all' || generation.status === status), [generations, status]);

  function generateDraft() {
    const nextOutput = generateDemoAIOutput(toolType, context);
    const next: AIGenerationRecord = {
      id: `ai_gen_${String(generations.length + 1).padStart(3, '0')}_new`,
      toolType,
      title,
      inputSummary: context.slice(0, 160),
      output: nextOutput,
      relatedProperty,
      relatedClient,
      status: 'draft',
      createdAt: '2026-06-04',
    };

    setOutput(nextOutput);
    setGenerations((current) => [next, ...current]);
  }

  function updateStatus(id: string, nextStatus: AIGenerationStatus) {
    setGenerations((current) => current.map((generation) => (generation.id === id ? { ...generation, status: nextStatus } : generation)));
  }

  async function copyOutput() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(output);
    }
  }

  const columns: ColumnDef<AIGenerationRecord>[] = [
    {
      header: 'Draft',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.title}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.createdAt}</p>
        </div>
      ),
    },
    {
      header: 'Tool',
      cell: ({ row }) => <Badge variant="gold">{aiToolLabels[row.original.toolType]}</Badge>,
    },
    {
      header: 'Context',
      cell: ({ row }) => <p className="line-clamp-2 max-w-md text-sm text-slate-700">{row.original.inputSummary}</p>,
    },
    {
      header: 'Related',
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-semibold text-slate-800">{row.original.relatedProperty ?? 'No property'}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.relatedClient ?? 'No client attached'}</p>
        </div>
      ),
    },
    {
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={generationStatusLabels[row.original.status]} />,
    },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateStatus(row.original.id, event.target.value as AIGenerationStatus)}>
          {generationStatuses.map((option) => <option key={option} value={option}>{generationStatusLabels[option]}</option>)}
        </select>
      ),
    },
  ];

  const usedCount = generations.filter((generation) => generation.status === 'used').length;
  const savedCount = generations.filter((generation) => generation.status === 'saved').length;
  const propertyCopyCount = generations.filter((generation) => generation.toolType === 'property_description').length;
  const responseCount = generations.filter((generation) => generation.toolType === 'client_response' || generation.toolType === 'follow_up_message').length;

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">AI Real Estate Assistant</h1>
          <p className="mt-2 max-w-3xl text-slate-500">Generate property copy, client replies, follow-up messages, listing audits, property match notes and pricing suggestions without wasting agent time.</p>
        </div>
        <Button variant="gold" onClick={generateDraft}><Sparkles className="h-4 w-4" /> Generate draft</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="AI drafts" value={String(generations.length)} change="Generated content records" icon={BrainCircuit} />
        <StatCard label="Saved drafts" value={String(savedCount)} change="Ready for review" icon={FileText} />
        <StatCard label="Used drafts" value={String(usedCount)} change="Applied to operations" icon={ClipboardCheck} />
        <StatCard label="Client messages" value={String(responseCount)} change="Replies and follow-ups" icon={MessageSquareText} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Prompt workspace</CardTitle>
            <CardDescription>Structured prompt templates. External AI API wiring can be added later through the integrations settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Draft title" />
            <Select value={toolType} onChange={(event) => setToolType(event.target.value as AIToolType)}>
              {(Object.keys(aiToolLabels) as AIToolType[]).map((option) => <option key={option} value={option}>{aiToolLabels[option]}</option>)}
            </Select>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Available template</p>
              <p className="mt-2 text-sm font-semibold text-emerald-950">{templatesForTool[0]?.name ?? 'Custom template'}</p>
              <p className="mt-1 text-sm leading-6 text-emerald-800">{templatesForTool[0]?.defaultPrompt ?? 'Write a precise, professional real estate response from the supplied context.'}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input value={relatedProperty} onChange={(event) => setRelatedProperty(event.target.value)} placeholder="Related property" />
              <Input value={relatedClient} onChange={(event) => setRelatedClient(event.target.value)} placeholder="Related client" />
            </div>
            <Textarea className="min-h-36" value={context} onChange={(event) => setContext(event.target.value)} placeholder="Paste property, client or pricing context" />
            <div className="flex flex-wrap gap-3">
              <Button onClick={generateDraft}><WandSparkles className="h-4 w-4" /> Generate</Button>
              <Button variant="secondary" onClick={() => setContext('')}>Clear context</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated output</CardTitle>
            <CardDescription>Review before sending. AI should speed up agents, not replace judgement.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="min-h-72 whitespace-pre-line rounded-2xl border border-slate-200 bg-slate-950 p-5 text-sm leading-7 text-slate-100">
              {output}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={copyOutput}><Copy className="h-4 w-4" /> Copy output</Button>
              <Button variant="outline" onClick={() => window.print()}>Print draft</Button>
            </div>
            <div className="rounded-2xl bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
              Brutal rule: never let agents paste AI output blindly. Every claim about title, price, availability, rent, size or amenities must match verified records.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2">
        <Select value={status} onChange={(event) => setStatus(event.target.value as typeof status)}>
          <option value="all">All statuses</option>
          {generationStatuses.map((option) => <option key={option} value={option}>{generationStatusLabels[option]}</option>)}
        </Select>
        <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">Property description drafts: {propertyCopyCount}</div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI generation history</CardTitle>
          <CardDescription>Keep an audit trail of generated content and mark what was actually used.</CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleDataTable data={filtered} columns={columns} searchPlaceholder="Search AI drafts..." />
        </CardContent>
      </Card>
    </div>
  );
}
