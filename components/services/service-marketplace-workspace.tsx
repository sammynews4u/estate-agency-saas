'use client';

import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { BriefcaseBusiness, Camera, CheckCircle2, FilePlus2, HandCoins, MessageSquareQuote, Plus, Star, Store, UsersRound } from 'lucide-react';
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
  demoPortfolio,
  demoQuotes,
  demoReviews,
  demoServiceProviders,
  demoServiceRequests,
  formatServiceMoney,
  providerStatusLabels,
  providerStatusTone,
  quoteStatusLabels,
  quoteStatusTone,
  quoteStatuses,
  serviceCategories,
  serviceCategoryLabels,
  serviceRequestStatusLabels,
  serviceRequestStatusTone,
  serviceRequestStatuses,
  type PortfolioRecord,
  type QuoteRecord,
  type QuoteStatus,
  type ServiceCategory,
  type ServiceProviderRecord,
  type ServiceRequestRecord,
  type ServiceRequestStatus,
} from '@/lib/service-marketplace-data';

type WorkspaceRole = 'agency' | 'client' | 'landlord' | 'service-provider';
type WorkspaceMode = 'marketplace' | 'requests' | 'quotes' | 'profile' | 'portfolio' | 'reviews';

export function ServiceMarketplaceWorkspace({ role = 'agency', mode = 'marketplace' }: { role?: WorkspaceRole; mode?: WorkspaceMode }) {
  const [providers] = useState<ServiceProviderRecord[]>(demoServiceProviders);
  const [requests, setRequests] = useState<ServiceRequestRecord[]>(demoServiceRequests);
  const [quotes, setQuotes] = useState<QuoteRecord[]>(demoQuotes);
  const [category, setCategory] = useState<ServiceCategory | 'all'>('all');
  const [requestStatus, setRequestStatus] = useState<ServiceRequestStatus | 'all'>('all');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const [serviceTitle, setServiceTitle] = useState('New service request');
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>('lawyer');
  const [requesterName, setRequesterName] = useState(role === 'landlord' ? 'Landlord user' : role === 'client' ? 'Client user' : 'Agency user');
  const [relatedProperty, setRelatedProperty] = useState('Lekki Phase 1 Duplex');
  const [preferredDate, setPreferredDate] = useState('2026-06-20');
  const [budget, setBudget] = useState('500000');
  const [notes, setNotes] = useState('State the scope, deadline and expected evidence before assigning provider.');

  const [quoteAmount, setQuoteAmount] = useState('350000');
  const [quoteTimeline, setQuoteTimeline] = useState('3 working days');
  const [quoteRequestTitle, setQuoteRequestTitle] = useState('New service request');

  const visibleProviders = useMemo(() => providers.filter((provider) => category === 'all' || provider.category === category), [providers, category]);
  const visibleRequests = useMemo(() => requests.filter((request) => requestStatus === 'all' || request.status === requestStatus), [requests, requestStatus]);

  function updateRequestStatus(id: string, nextStatus: ServiceRequestStatus) {
    setRequests((current) => current.map((request) => (request.id === id ? { ...request, status: nextStatus } : request)));
  }

  function updateQuoteStatus(id: string, nextStatus: QuoteStatus) {
    setQuotes((current) => current.map((quote) => (quote.id === id ? { ...quote, status: nextStatus } : quote)));
  }

  function addServiceRequest() {
    const next: ServiceRequestRecord = {
      id: `sr_${Date.now()}`,
      serviceTitle,
      category: serviceCategory,
      requesterName,
      relatedProperty,
      preferredDate,
      budget: Number(budget) || 0,
      status: 'new',
      notes,
    };
    setRequests((current) => [next, ...current]);
    setShowRequestForm(false);
  }

  function addQuote() {
    const next: QuoteRecord = {
      id: `quote_${Date.now()}`,
      providerName: 'Current Service Provider',
      requestTitle: quoteRequestTitle,
      amount: Number(quoteAmount) || 0,
      timeline: quoteTimeline,
      submittedDate: '2026-06-05',
      status: 'draft',
    };
    setQuotes((current) => [next, ...current]);
    setShowQuoteForm(false);
  }

  const providerColumns: ColumnDef<ServiceProviderRecord>[] = [
    { header: 'Provider', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.businessName}</p><p className="mt-1 text-xs text-slate-500">{row.original.contactName} • {row.original.location}</p></div> },
    { header: 'Category', cell: ({ row }) => <Badge variant="muted">{serviceCategoryLabels[row.original.category]}</Badge> },
    { header: 'Pricing', accessorKey: 'pricingRange' },
    { header: 'Availability', cell: ({ row }) => <Badge variant={row.original.availability === 'available' ? 'success' : row.original.availability === 'busy' ? 'warning' : 'danger'}>{row.original.availability}</Badge> },
    { header: 'Rating', cell: ({ row }) => <span className="font-bold text-slate-950">{row.original.rating.toFixed(1)} ★</span> },
    { header: 'Jobs', accessorKey: 'completedJobs' },
    { header: 'Status', cell: ({ row }) => <Badge variant={providerStatusTone[row.original.status]}>{providerStatusLabels[row.original.status]}</Badge> },
  ];

  const requestColumns: ColumnDef<ServiceRequestRecord>[] = [
    { header: 'Request', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.serviceTitle}</p><p className="mt-1 text-xs text-slate-500">{row.original.notes}</p></div> },
    { header: 'Category', cell: ({ row }) => <Badge variant="muted">{serviceCategoryLabels[row.original.category]}</Badge> },
    { header: 'Requester', accessorKey: 'requesterName' },
    { header: 'Property', accessorKey: 'relatedProperty' },
    { header: 'Budget', cell: ({ row }) => <span className="font-bold text-slate-950">{formatServiceMoney(row.original.budget)}</span> },
    { header: 'Status', cell: ({ row }) => <Badge variant={serviceRequestStatusTone[row.original.status]}>{serviceRequestStatusLabels[row.original.status]}</Badge> },
    { header: 'Update', cell: ({ row }) => <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateRequestStatus(row.original.id, event.target.value as ServiceRequestStatus)}>{serviceRequestStatuses.map((option) => <option key={option} value={option}>{serviceRequestStatusLabels[option]}</option>)}</select> },
  ];

  const quoteColumns: ColumnDef<QuoteRecord>[] = [
    { header: 'Provider', accessorKey: 'providerName' },
    { header: 'Request', accessorKey: 'requestTitle' },
    { header: 'Amount', cell: ({ row }) => <span className="font-bold text-slate-950">{formatServiceMoney(row.original.amount)}</span> },
    { header: 'Timeline', accessorKey: 'timeline' },
    { header: 'Submitted', accessorKey: 'submittedDate' },
    { header: 'Status', cell: ({ row }) => <Badge variant={quoteStatusTone[row.original.status]}>{quoteStatusLabels[row.original.status]}</Badge> },
    { header: 'Update', cell: ({ row }) => <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateQuoteStatus(row.original.id, event.target.value as QuoteStatus)}>{quoteStatuses.map((option) => <option key={option} value={option}>{quoteStatusLabels[option]}</option>)}</select> },
  ];

  const portfolioColumns: ColumnDef<PortfolioRecord>[] = [
    { header: 'Project', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.title}</p><p className="mt-1 text-xs text-slate-500">{row.original.description}</p></div> },
    { header: 'Category', cell: ({ row }) => <Badge variant="muted">{serviceCategoryLabels[row.original.category]}</Badge> },
    { header: 'Location', accessorKey: 'location' },
    { header: 'Completed', accessorKey: 'completionDate' },
    { header: 'Media', accessorKey: 'mediaCount' },
  ];

  const reviewColumns: ColumnDef<(typeof demoReviews)[number]>[] = [
    { header: 'Reviewer', accessorKey: 'reviewerName' },
    { header: 'Property', accessorKey: 'property' },
    { header: 'Rating', cell: ({ row }) => <span className="font-bold text-slate-950">{row.original.rating} ★</span> },
    { header: 'Review', accessorKey: 'review' },
    { header: 'Date', accessorKey: 'createdAt' },
  ];

  const activeProviders = providers.filter((provider) => provider.status === 'active').length;
  const openRequests = requests.filter((request) => !['completed', 'cancelled'].includes(request.status)).length;
  const acceptedQuotes = quotes.filter((quote) => quote.status === 'accepted').length;
  const averageRating = (providers.reduce((sum, provider) => sum + provider.rating, 0) / providers.length).toFixed(1);

  const title = mode === 'marketplace' ? 'Real Estate Service Marketplace' : mode === 'requests' ? 'Service Requests' : mode === 'quotes' ? 'Quotes' : mode === 'profile' ? 'Provider Profile' : mode === 'portfolio' ? 'Portfolio' : 'Reviews';
  const description = role === 'service-provider'
    ? 'Manage your real estate service profile, requests, quotes, portfolio and client reviews.'
    : 'Connect property transactions to lawyers, surveyors, valuers, photographers, drone operators, designers and consultants.';

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{title}</h1>
          <p className="mt-2 max-w-3xl text-slate-500">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {(mode === 'marketplace' || mode === 'requests') && role !== 'service-provider' && <Button variant="gold" onClick={() => setShowRequestForm((current) => !current)}><FilePlus2 className="h-4 w-4" /> Request service</Button>}
          {(mode === 'quotes' || mode === 'requests') && role === 'service-provider' && <Button variant="secondary" onClick={() => setShowQuoteForm((current) => !current)}><MessageSquareQuote className="h-4 w-4" /> Create quote</Button>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active providers" value={activeProviders.toString()} change="Verified service partners" icon={Store} />
        <StatCard label="Open requests" value={openRequests.toString()} change="Needs quote or delivery" icon={BriefcaseBusiness} />
        <StatCard label="Accepted quotes" value={acceptedQuotes.toString()} change="Converted service jobs" icon={HandCoins} />
        <StatCard label="Average rating" value={`${averageRating} ★`} change="Provider trust signal" icon={Star} />
      </div>

      {role !== 'service-provider' && (
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-bold text-emerald-900">This module can become a second revenue line.</p>
              <p className="mt-1 text-sm text-emerald-800">Do not treat providers as random contacts. Track requests, quotes, reviews and completed jobs so the marketplace becomes defensible.</p>
            </div>
            <Button variant="outline" size="sm">Review provider quality</Button>
          </CardContent>
        </Card>
      )}

      {showRequestForm && (
        <Card>
          <CardHeader><CardTitle>Create service request</CardTitle><CardDescription>Define the scope before requesting quotes. Vague requests produce useless quotes.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Input value={serviceTitle} onChange={(event) => setServiceTitle(event.target.value)} placeholder="Service title" />
              <Select value={serviceCategory} onChange={(event) => setServiceCategory(event.target.value as ServiceCategory)}>{serviceCategories.map((option) => <option key={option} value={option}>{serviceCategoryLabels[option]}</option>)}</Select>
              <Input value={requesterName} onChange={(event) => setRequesterName(event.target.value)} placeholder="Requester" />
              <Input value={relatedProperty} onChange={(event) => setRelatedProperty(event.target.value)} placeholder="Related property" />
              <Input value={preferredDate} onChange={(event) => setPreferredDate(event.target.value)} placeholder="Preferred date" />
              <Input value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="Budget" />
            </div>
            <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} />
            <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setShowRequestForm(false)}>Cancel</Button><Button onClick={addServiceRequest}>Save request</Button></div>
          </CardContent>
        </Card>
      )}

      {showQuoteForm && (
        <Card>
          <CardHeader><CardTitle>Create quote</CardTitle><CardDescription>Send a quote with a real price, timeline and deliverable. Guesswork weakens the marketplace.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Input value={quoteRequestTitle} onChange={(event) => setQuoteRequestTitle(event.target.value)} placeholder="Request title" />
              <Input value={quoteAmount} onChange={(event) => setQuoteAmount(event.target.value)} placeholder="Quote amount" />
              <Input value={quoteTimeline} onChange={(event) => setQuoteTimeline(event.target.value)} placeholder="Timeline" />
            </div>
            <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setShowQuoteForm(false)}>Cancel</Button><Button onClick={addQuote}>Save quote</Button></div>
          </CardContent>
        </Card>
      )}

      {(mode === 'marketplace' || mode === 'profile') && (
        <Card>
          <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div><CardTitle>Provider directory</CardTitle><CardDescription>Search and compare qualified real estate service partners.</CardDescription></div>
            <Select className="max-w-xs" value={category} onChange={(event) => setCategory(event.target.value as ServiceCategory | 'all')}><option value="all">All service categories</option>{serviceCategories.map((option) => <option key={option} value={option}>{serviceCategoryLabels[option]}</option>)}</Select>
          </CardHeader>
          <CardContent><SimpleDataTable data={visibleProviders} columns={providerColumns} searchPlaceholder="Search providers..." /></CardContent>
        </Card>
      )}

      {(mode === 'marketplace' || mode === 'requests') && (
        <Card>
          <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div><CardTitle>Service requests</CardTitle><CardDescription>Requests, budgets, assigned providers and fulfilment stages.</CardDescription></div>
            <Select className="max-w-xs" value={requestStatus} onChange={(event) => setRequestStatus(event.target.value as ServiceRequestStatus | 'all')}><option value="all">All request statuses</option>{serviceRequestStatuses.map((option) => <option key={option} value={option}>{serviceRequestStatusLabels[option]}</option>)}</Select>
          </CardHeader>
          <CardContent><SimpleDataTable data={visibleRequests} columns={requestColumns} searchPlaceholder="Search requests..." /></CardContent>
        </Card>
      )}

      {(mode === 'marketplace' || mode === 'quotes') && (
        <Card>
          <CardHeader><CardTitle>Quotes</CardTitle><CardDescription>Quote amounts, timelines and acceptance status.</CardDescription></CardHeader>
          <CardContent><SimpleDataTable data={quotes} columns={quoteColumns} searchPlaceholder="Search quotes..." /></CardContent>
        </Card>
      )}

      {(mode === 'marketplace' || mode === 'portfolio') && (
        <Card>
          <CardHeader><CardTitle>Portfolio</CardTitle><CardDescription>Proof of completed jobs. No portfolio means weak marketplace trust.</CardDescription></CardHeader>
          <CardContent><SimpleDataTable data={demoPortfolio} columns={portfolioColumns} searchPlaceholder="Search portfolio..." /></CardContent>
        </Card>
      )}

      {(mode === 'marketplace' || mode === 'reviews') && (
        <Card>
          <CardHeader><CardTitle>Reviews</CardTitle><CardDescription>Client feedback connected to properties and service delivery.</CardDescription></CardHeader>
          <CardContent><SimpleDataTable data={demoReviews} columns={reviewColumns} searchPlaceholder="Search reviews..." /></CardContent>
        </Card>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><UsersRound className="h-4 w-4 text-emerald-600" /> Provider network</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-600">The platform now has a structure for lawyers, surveyors, valuers, photographers, drone operators, designers and consultants.</p></CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><Camera className="h-4 w-4 text-amber-600" /> Portfolio proof</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-600">Portfolio records create credibility and give clients a reason to trust providers inside the ecosystem.</p></CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-slate-700" /> Quote discipline</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-600">Requests and quotes are tracked so service delivery becomes measurable instead of informal WhatsApp referrals.</p></CardContent></Card>
      </div>
    </div>
  );
}
