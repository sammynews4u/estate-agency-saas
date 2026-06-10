'use client';

import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DatabaseZap, FileInput, Filter, Plus, SearchCheck, ShieldAlert, UploadCloud } from 'lucide-react';
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
  demoDiscoveredProperties,
  demoDiscoverySources,
  detectDuplicateSignals,
  discoverySourceTypeLabels,
  discoveryStatusLabels,
  discoveryStatusTone,
  duplicateSignalLabels,
  formatDiscoveryMoney,
  type DiscoveredProperty,
  type DiscoverySource,
  type DiscoverySourceType,
  type DiscoveryStatus,
} from '@/lib/discovery-data';

type Props = {
  role: 'agency' | 'agent';
};

const statuses: DiscoveryStatus[] = ['new', 'duplicate', 'contacted', 'verified', 'converted', 'rejected'];
const sourceTypes: DiscoverySourceType[] = ['manual_entry', 'website', 'social_media', 'csv_import', 'public_feed', 'partner_api'];

export function PropertyDiscoveryWorkspace({ role }: Props) {
  const [properties, setProperties] = useState<DiscoveredProperty[]>(role === 'agent' ? demoDiscoveredProperties.filter((property) => property.assignedAgent === 'Nneka Ibe') : demoDiscoveredProperties);
  const [sources, setSources] = useState<DiscoverySource[]>(demoDiscoverySources);
  const [status, setStatus] = useState<'all' | DiscoveryStatus>('all');
  const [sourceType, setSourceType] = useState<'all' | DiscoverySourceType>('all');
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showSourceForm, setShowSourceForm] = useState(false);

  const [title, setTitle] = useState('Newly Discovered Property Lead');
  const [propertyType, setPropertyType] = useState('House');
  const [listingCategory, setListingCategory] = useState<'sale' | 'rent'>('sale');
  const [location, setLocation] = useState('Ajah, Lagos');
  const [price, setPrice] = useState('120000000');
  const [ownerName, setOwnerName] = useState('Property Owner');
  const [ownerPhone, setOwnerPhone] = useState('+234 800 000 0000');
  const [leadSourceName, setLeadSourceName] = useState('Manual Agent Submissions');
  const [leadSourceUrl, setLeadSourceUrl] = useState('Internal manual entry');
  const [leadSourceType, setLeadSourceType] = useState<DiscoverySourceType>('manual_entry');
  const [assignedAgent, setAssignedAgent] = useState(role === 'agent' ? 'Nneka Ibe' : 'Seyi Adewale');
  const [notes, setNotes] = useState('Verify ownership, title documents and asking price before converting this lead to a live listing.');

  const [sourceName, setSourceName] = useState('New authorised source');
  const [newSourceType, setNewSourceType] = useState<DiscoverySourceType>('manual_entry');
  const [sourceUrl, setSourceUrl] = useState('Internal manual entry');
  const [sourceNotes, setSourceNotes] = useState('Only use sources with permission, public feeds, user-provided URLs, CSV imports or APIs. Do not bypass robots.txt, paywalls, captchas or login walls.');

  const filtered = useMemo(
    () => properties.filter((property) => (status === 'all' || property.status === status) && (sourceType === 'all' || property.sourceType === sourceType)),
    [properties, status, sourceType],
  );

  function updateStatus(id: string, nextStatus: DiscoveryStatus) {
    setProperties((current) => current.map((property) => (property.id === id ? { ...property, status: nextStatus } : property)));
  }

  function addDiscoveredProperty() {
    const numericPrice = Number(price) || 0;
    const duplicateSignals = detectDuplicateSignals({ title, location, price: numericPrice, ownerPhone }, properties);
    const next: DiscoveredProperty = {
      id: `disc_${Date.now()}`,
      title,
      propertyType,
      listingCategory,
      location,
      price: numericPrice,
      ownerName,
      ownerPhone,
      sourceName: leadSourceName,
      sourceUrl: leadSourceUrl,
      sourceType: leadSourceType,
      assignedAgent,
      status: duplicateSignals.length >= 3 ? 'duplicate' : 'new',
      duplicateSignals,
      confidenceScore: duplicateSignals.length ? 68 : 82,
      discoveredAt: '2026-06-05',
      notes,
    };

    setProperties((current) => [next, ...current]);
    setShowPropertyForm(false);
  }

  function addSource() {
    const next: DiscoverySource = {
      id: `src_${Date.now()}`,
      name: sourceName,
      sourceType: newSourceType,
      url: sourceUrl,
      status: 'active',
      lastCheckedAt: '2026-06-05',
      discoveredCount: 0,
      notes: sourceNotes,
    };

    setSources((current) => [next, ...current]);
    setShowSourceForm(false);
  }

  const propertyColumns: ColumnDef<DiscoveredProperty>[] = [
    {
      header: 'Discovered property',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.title}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.propertyType} • {row.original.listingCategory}</p>
        </div>
      ),
    },
    {
      header: 'Location / Price',
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-slate-800">{row.original.location}</p>
          <p className="mt-1 text-xs font-bold text-slate-500">{formatDiscoveryMoney(row.original.price)}</p>
        </div>
      ),
    },
    {
      header: 'Owner / Agent',
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-slate-800">{row.original.ownerName}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.assignedAgent}</p>
        </div>
      ),
    },
    {
      header: 'Source',
      cell: ({ row }) => <Badge variant="muted">{discoverySourceTypeLabels[row.original.sourceType]}</Badge>,
    },
    {
      header: 'Duplicates',
      cell: ({ row }) => (
        <div className="flex max-w-[220px] flex-wrap gap-1">
          {row.original.duplicateSignals.length ? row.original.duplicateSignals.map((signal) => <Badge key={signal} variant="warning">{duplicateSignalLabels[signal]}</Badge>) : <Badge variant="success">Clean</Badge>}
        </div>
      ),
    },
    {
      header: 'Confidence',
      cell: ({ row }) => <Badge variant={row.original.confidenceScore >= 85 ? 'success' : row.original.confidenceScore >= 70 ? 'gold' : 'warning'}>{row.original.confidenceScore}%</Badge>,
    },
    {
      header: 'Status',
      cell: ({ row }) => <Badge variant={discoveryStatusTone[row.original.status]}>{discoveryStatusLabels[row.original.status]}</Badge>,
    },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateStatus(row.original.id, event.target.value as DiscoveryStatus)}>
          {statuses.map((option) => <option key={option} value={option}>{discoveryStatusLabels[option]}</option>)}
        </select>
      ),
    },
  ];

  const sourceColumns: ColumnDef<DiscoverySource>[] = [
    { header: 'Source', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.name}</p><p className="mt-1 text-xs text-slate-500">{row.original.url}</p></div> },
    { header: 'Type', cell: ({ row }) => <Badge variant="muted">{discoverySourceTypeLabels[row.original.sourceType]}</Badge> },
    { header: 'Status', cell: ({ row }) => <Badge variant={row.original.status === 'active' ? 'success' : row.original.status === 'paused' ? 'warning' : 'danger'}>{row.original.status}</Badge> },
    { header: 'Discovered', accessorKey: 'discoveredCount' },
    { header: 'Last checked', accessorKey: 'lastCheckedAt' },
  ];

  const totalLeads = properties.length;
  const cleanLeads = properties.filter((property) => property.duplicateSignals.length === 0).length;
  const verifiedOrConverted = properties.filter((property) => property.status === 'verified' || property.status === 'converted').length;
  const duplicateCount = properties.filter((property) => property.status === 'duplicate' || property.duplicateSignals.length >= 3).length;

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Property Discovery & Lead Tool</h1>
          <p className="mt-2 max-w-3xl text-slate-500">Capture discovered properties, monitor authorised sources, detect duplicates and convert verified opportunities into platform listings.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => setShowSourceForm((current) => !current)}><DatabaseZap className="h-4 w-4" /> Add source</Button>
          <Button variant="gold" onClick={() => setShowPropertyForm((current) => !current)}><Plus className="h-4 w-4" /> Add discovery</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Discovered leads" value={String(totalLeads)} change="Raw property opportunities" icon={SearchCheck} />
        <StatCard label="Clean leads" value={String(cleanLeads)} change="No duplicate signal yet" icon={Filter} />
        <StatCard label="Verified/converted" value={String(verifiedOrConverted)} change="Ready for sales activity" icon={FileInput} />
        <StatCard label="Duplicate risk" value={String(duplicateCount)} change="Review before outreach" icon={ShieldAlert} />
      </div>

      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="flex flex-col gap-3 p-4 text-sm leading-6 text-amber-950 lg:flex-row lg:items-start">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
          <p><span className="font-black">Compliance boundary:</span> this module is built for legal discovery workflows only: user-provided URLs, manual entries, authorised feeds, CSV uploads and partner APIs. It must not bypass paywalls, captchas, login walls, site security or robots.txt.</p>
        </CardContent>
      </Card>

      {showSourceForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add discovery source</CardTitle>
            <CardDescription>Register authorised sources before property leads are imported or manually captured.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Input value={sourceName} onChange={(event) => setSourceName(event.target.value)} placeholder="Source name" />
              <Select value={newSourceType} onChange={(event) => setNewSourceType(event.target.value as DiscoverySourceType)}>
                {sourceTypes.map((option) => <option key={option} value={option}>{discoverySourceTypeLabels[option]}</option>)}
              </Select>
              <Input value={sourceUrl} onChange={(event) => setSourceUrl(event.target.value)} placeholder="Source URL or note" />
            </div>
            <Textarea value={sourceNotes} onChange={(event) => setSourceNotes(event.target.value)} />
            <div className="flex flex-wrap gap-3">
              <Button onClick={addSource}><UploadCloud className="h-4 w-4" /> Save source</Button>
              <Button variant="secondary" onClick={() => setShowSourceForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showPropertyForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add discovered property</CardTitle>
            <CardDescription>Manual entry now, API/CSV integration-ready later. Duplicate signals are calculated against the current lead list.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Property title" />
              <Input value={propertyType} onChange={(event) => setPropertyType(event.target.value)} placeholder="Property type" />
              <Select value={listingCategory} onChange={(event) => setListingCategory(event.target.value as 'sale' | 'rent')}>
                <option value="sale">For sale</option>
                <option value="rent">For rent</option>
              </Select>
              <Input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Location" />
              <Input value={price} onChange={(event) => setPrice(event.target.value)} placeholder="Price" />
              <Input value={ownerName} onChange={(event) => setOwnerName(event.target.value)} placeholder="Owner / landlord" />
              <Input value={ownerPhone} onChange={(event) => setOwnerPhone(event.target.value)} placeholder="Owner phone" />
              <Input value={leadSourceName} onChange={(event) => setLeadSourceName(event.target.value)} placeholder="Source name" />
              <Input value={leadSourceUrl} onChange={(event) => setLeadSourceUrl(event.target.value)} placeholder="Source URL / note" />
              <Select value={leadSourceType} onChange={(event) => setLeadSourceType(event.target.value as DiscoverySourceType)}>
                {sourceTypes.map((option) => <option key={option} value={option}>{discoverySourceTypeLabels[option]}</option>)}
              </Select>
              <Input value={assignedAgent} onChange={(event) => setAssignedAgent(event.target.value)} placeholder="Assigned agent" />
            </div>
            <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} />
            <div className="flex flex-wrap gap-3">
              <Button onClick={addDiscoveredProperty}><SearchCheck className="h-4 w-4" /> Save discovered lead</Button>
              <Button variant="secondary" onClick={() => setShowPropertyForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2">
        <Select value={status} onChange={(event) => setStatus(event.target.value as typeof status)}>
          <option value="all">All discovery statuses</option>
          {statuses.map((option) => <option key={option} value={option}>{discoveryStatusLabels[option]}</option>)}
        </Select>
        <Select value={sourceType} onChange={(event) => setSourceType(event.target.value as typeof sourceType)}>
          <option value="all">All source types</option>
          {sourceTypes.map((option) => <option key={option} value={option}>{discoverySourceTypeLabels[option]}</option>)}
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Discovered properties</CardTitle>
          <CardDescription>Verify, contact, reject, mark duplicate or convert these into formal property listings.</CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleDataTable data={filtered} columns={propertyColumns} searchPlaceholder="Search discovered properties..." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Discovery sources</CardTitle>
          <CardDescription>Track authorised discovery channels and keep lead capture legally defensible.</CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleDataTable data={sources} columns={sourceColumns} searchPlaceholder="Search sources..." />
        </CardContent>
      </Card>
    </div>
  );
}
