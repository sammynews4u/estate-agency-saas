'use client';

import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Calculator, FileText, LineChart, Plus, Printer, TrendingUp } from 'lucide-react';
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
  calculateValuation,
  demandLevelLabels,
  demoValuationReports,
  formatValuationMoney,
  propertyConditionLabels,
  type DemandLevel,
  type PropertyCondition,
  type ValuationComparable,
  type ValuationReport,
  type ValuationStatus,
  valuationStatusLabels,
} from '@/lib/valuation-data';

type Props = {
  role: 'agency' | 'agent' | 'landlord';
};

const statusOptions: ValuationStatus[] = ['draft', 'under_review', 'approved', 'sent', 'archived'];
const demandOptions: DemandLevel[] = ['low', 'moderate', 'high', 'very_high'];
const conditionOptions: PropertyCondition[] = ['newly_built', 'excellent', 'good', 'needs_renovation', 'distressed'];

export function ValuationWorkspace({ role }: Props) {
  const [reports, setReports] = useState<ValuationReport[]>(role === 'agent' ? demoValuationReports.filter((report) => report.preparedBy === 'Nneka Ibe') : demoValuationReports);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<'all' | ValuationStatus>('all');
  const [propertyTitle, setPropertyTitle] = useState('New 4-Bedroom Semi-Detached Duplex');
  const [propertyType, setPropertyType] = useState('House');
  const [location, setLocation] = useState('Chevron, Lekki, Lagos');
  const [clientName, setClientName] = useState(role === 'landlord' ? 'My submitted property' : 'New Seller');
  const [baseComparablePrice, setBaseComparablePrice] = useState('260000000');
  const [landSizeScore, setLandSizeScore] = useState('450');
  const [condition, setCondition] = useState<PropertyCondition>('good');
  const [demandLevel, setDemandLevel] = useState<DemandLevel>('high');
  const [notes, setNotes] = useState('Comparable estate listings show strong buyer demand, but title documents and finishing quality must be verified before final pricing.');

  const filtered = useMemo(() => reports.filter((report) => status === 'all' || report.status === status), [reports, status]);

  function updateStatus(id: string, nextStatus: ValuationStatus) {
    setReports((current) => current.map((report) => (report.id === id ? { ...report, status: nextStatus } : report)));
  }

  function createValuationReport() {
    const calculated = calculateValuation({
      baseComparablePrice: Number(baseComparablePrice) || 0,
      condition,
      demandLevel,
      landSizeScore: Number(landSizeScore) || 500,
    });

    const comparables: ValuationComparable[] = [
      {
        id: `comp_new_${Date.now()}_1`,
        title: `${propertyType} comparable A`,
        location,
        propertyType,
        price: Number(baseComparablePrice) || calculated.estimatedValue,
        size: `${landSizeScore || 500} sqm`,
        bedrooms: propertyType.toLowerCase() === 'land' ? 0 : 4,
        soldOrListedAt: '2026-06-04',
        similarityScore: 84,
      },
      {
        id: `comp_new_${Date.now()}_2`,
        title: `${propertyType} comparable B`,
        location,
        propertyType,
        price: Math.round((Number(baseComparablePrice) || calculated.estimatedValue) * 1.08),
        size: `${Number(landSizeScore || 500) + 80} sqm`,
        bedrooms: propertyType.toLowerCase() === 'land' ? 0 : 4,
        soldOrListedAt: '2026-05-28',
        similarityScore: 78,
      },
    ];

    const next: ValuationReport = {
      id: `val_${String(reports.length + 1).padStart(3, '0')}_new`,
      reportNumber: `VAL-2026-${String(reports.length + 1).padStart(3, '0')}`,
      propertyTitle,
      propertyType,
      location,
      clientName,
      preparedBy: role === 'agent' ? 'Nneka Ibe' : 'Agency Admin',
      ...calculated,
      demandLevel,
      condition,
      status: 'draft',
      createdAt: '2026-06-04',
      notes,
      comparables,
    };

    setReports((current) => [next, ...current]);
    setShowForm(false);
  }

  const columns: ColumnDef<ValuationReport>[] = [
    {
      header: 'Report',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.reportNumber}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.propertyTitle}</p>
        </div>
      ),
    },
    {
      header: 'Location / Type',
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-slate-800">{row.original.location}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.propertyType} • {demandLevelLabels[row.original.demandLevel]}</p>
        </div>
      ),
    },
    {
      header: 'Recommended price',
      cell: ({ row }) => <span className="font-bold text-slate-950">{formatValuationMoney(row.original.recommendedListingPrice)}</span>,
    },
    {
      header: 'Range',
      cell: ({ row }) => <span>{formatValuationMoney(row.original.lowEstimate)} - {formatValuationMoney(row.original.highEstimate)}</span>,
    },
    {
      header: 'Confidence',
      cell: ({ row }) => <Badge variant={row.original.confidenceScore >= 85 ? 'success' : row.original.confidenceScore >= 75 ? 'gold' : 'warning'}>{row.original.confidenceScore}%</Badge>,
    },
    {
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={valuationStatusLabels[row.original.status]} />,
    },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateStatus(row.original.id, event.target.value as ValuationStatus)}>
          {statusOptions.map((option) => <option key={option} value={option}>{valuationStatusLabels[option]}</option>)}
        </select>
      ),
    },
    {
      header: 'Print',
      cell: () => <Button size="sm" variant="outline" onClick={() => window.print()}><Printer className="h-3.5 w-3.5" /> Print</Button>,
    },
  ];

  const comparableColumns: ColumnDef<ValuationComparable>[] = [
    { header: 'Comparable', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.title}</p><p className="mt-1 text-xs text-slate-500">{row.original.location}</p></div> },
    { header: 'Type', accessorKey: 'propertyType' },
    { header: 'Size', accessorKey: 'size' },
    { header: 'Price', cell: ({ row }) => <span className="font-bold">{formatValuationMoney(row.original.price)}</span> },
    { header: 'Similarity', cell: ({ row }) => <Badge variant={row.original.similarityScore >= 85 ? 'success' : 'muted'}>{row.original.similarityScore}%</Badge> },
  ];

  const totalValue = reports.reduce((sum, report) => sum + report.estimatedValue, 0);
  const averageValue = reports.length ? Math.round(totalValue / reports.length) : 0;
  const approvedCount = reports.filter((report) => report.status === 'approved' || report.status === 'sent').length;
  const highDemandCount = reports.filter((report) => report.demandLevel === 'high' || report.demandLevel === 'very_high').length;
  const allComparables = reports.flatMap((report) => report.comparables).slice(0, 6);

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Property Valuation Tool</h1>
          <p className="mt-2 max-w-3xl text-slate-500">Estimate market value, compare similar properties and generate report-ready pricing guidance before pitching sellers or landlords.</p>
        </div>
        <Button variant="gold" onClick={() => setShowForm((current) => !current)}><Plus className="h-4 w-4" /> New valuation</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Valuation reports" value={String(reports.length)} change="Active valuation records" icon={FileText} />
        <StatCard label="Average estimate" value={formatValuationMoney(averageValue)} change="Across demo reports" icon={Calculator} />
        <StatCard label="Approved/sent" value={String(approvedCount)} change="Ready for seller conversations" icon={LineChart} />
        <StatCard label="High-demand assets" value={String(highDemandCount)} change="Use these in campaigns" icon={TrendingUp} />
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Generate valuation report</CardTitle>
            <CardDescription>This creates a report-ready estimate in local state now and maps cleanly to the Supabase valuation tables.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Input placeholder="Property title" value={propertyTitle} onChange={(event) => setPropertyTitle(event.target.value)} />
              <Input placeholder="Property type" value={propertyType} onChange={(event) => setPropertyType(event.target.value)} />
              <Input placeholder="Location" value={location} onChange={(event) => setLocation(event.target.value)} />
              <Input placeholder="Client / seller / landlord" value={clientName} onChange={(event) => setClientName(event.target.value)} />
              <Input placeholder="Average comparable price" value={baseComparablePrice} onChange={(event) => setBaseComparablePrice(event.target.value)} />
              <Input placeholder="Land/building score e.g. 500" value={landSizeScore} onChange={(event) => setLandSizeScore(event.target.value)} />
              <Select value={condition} onChange={(event) => setCondition(event.target.value as PropertyCondition)}>
                {conditionOptions.map((option) => <option key={option} value={option}>{propertyConditionLabels[option]}</option>)}
              </Select>
              <Select value={demandLevel} onChange={(event) => setDemandLevel(event.target.value as DemandLevel)}>
                {demandOptions.map((option) => <option key={option} value={option}>{demandLevelLabels[option]}</option>)}
              </Select>
            </div>
            <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} />
            <div className="flex flex-wrap gap-3">
              <Button onClick={createValuationReport}><Calculator className="h-4 w-4" /> Calculate valuation</Button>
              <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2">
        <Select value={status} onChange={(event) => setStatus(event.target.value as typeof status)}>
          <option value="all">All statuses</option>
          {statusOptions.map((option) => <option key={option} value={option}>{valuationStatusLabels[option]}</option>)}
        </Select>
        <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">Hard rule: never use valuation output to fake certainty. Use it to frame a defensible price range.</div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Valuation reports</CardTitle>
          <CardDescription>Use this to win listings with evidence, not guesswork or seller emotion.</CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleDataTable data={filtered} columns={columns} searchPlaceholder="Search valuations..." />
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Comparable property evidence</CardTitle>
            <CardDescription>Comparables are the proof layer behind valuation reports.</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleDataTable data={allComparables} columns={comparableColumns} searchPlaceholder="Search comparables..." />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Report checklist</CardTitle>
            <CardDescription>Weak valuation reports lose seller trust.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              'Attach at least two comparable properties before sending.',
              'State low, recommended and high estimates separately.',
              'Record title quality, condition and demand assumptions.',
              'Use confidence score as a risk signal, not a sales gimmick.',
              'Print or export the report only after agency review.',
            ].map((item, index) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700">{index + 1}</div>
                <p className="text-sm font-semibold leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
