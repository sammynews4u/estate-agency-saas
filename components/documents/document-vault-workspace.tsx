'use client';

import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Download, Eye, FileArchive, FileCheck2, FileClock, FilePlus2, UploadCloud } from 'lucide-react';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { SimpleDataTable } from '@/components/dashboard/simple-data-table';
import { StatCard } from '@/components/dashboard/stat-card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  demoDocuments,
  documentStatusLabels,
  documentTypeLabels,
  documentVisibilityLabels,
  type DocumentRecord,
  type DocumentStatus,
  type DocumentType,
  type DocumentVisibility,
} from '@/lib/document-data';

type DocumentRole = 'agency' | 'agent' | 'client' | 'landlord' | 'service-provider' | 'developer';

type Props = {
  role: DocumentRole;
};

const roleCopy: Record<DocumentRole, { title: string; description: string }> = {
  agency: {
    title: 'Document Management',
    description: 'Centralise contracts, leases, ownership records, inspection reports, KYC files and agency documents.',
  },
  agent: {
    title: 'My Documents',
    description: 'Keep deal documents organised by client, property and status. Lost paperwork kills trust.',
  },
  client: {
    title: 'My Documents',
    description: 'View documents shared with you and track the status of submitted KYC or transaction files.',
  },
  landlord: {
    title: 'Property Documents',
    description: 'Track documents connected to your submitted properties, ownership records and listing support files.',
  },
  'service-provider': {
    title: 'Service Documents',
    description: 'Manage documents attached to quotes, jobs, portfolio proof and service requests.',
  },
  developer: {
    title: 'Project Documents',
    description: 'Organise project files, unit documents, construction records and sales documentation.',
  },
};

const documentStatuses: DocumentStatus[] = ['draft', 'pending_review', 'approved', 'rejected', 'expired'];
const documentTypes: DocumentType[] = ['contract', 'lease_agreement', 'property_document', 'ownership_record', 'inspection_report', 'valuation_report', 'client_kyc', 'agency_document', 'invoice', 'receipt'];
const visibilityOptions: DocumentVisibility[] = ['private', 'agency', 'client_visible', 'public'];

function documentsForRole(role: DocumentRole) {
  if (role === 'client') return demoDocuments.filter((document) => document.ownerName === 'Aisha Bello' || document.ownerName === 'Femi Adebayo' || document.visibility === 'client_visible');
  if (role === 'agent') return demoDocuments.filter((document) => document.uploadedBy === 'Nneka Ibe' || document.uploadedBy === 'Seyi Adewale');
  if (role === 'landlord') return demoDocuments.filter((document) => document.ownerName === 'Mr. Chinedu Obi' || document.type === 'ownership_record' || document.type === 'property_document');
  if (role === 'service-provider') return demoDocuments.filter((document) => document.type === 'inspection_report' || document.type === 'valuation_report');
  if (role === 'developer') return demoDocuments.filter((document) => document.type === 'contract' || document.type === 'property_document' || document.type === 'inspection_report');
  return demoDocuments;
}

export function DocumentVaultWorkspace({ role }: Props) {
  const [documents, setDocuments] = useState<DocumentRecord[]>(documentsForRole(role));
  const [status, setStatus] = useState<'all' | DocumentStatus>('all');
  const [type, setType] = useState<'all' | DocumentType>('all');
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    return documents.filter((document) => (status === 'all' || document.status === status) && (type === 'all' || document.type === type));
  }, [documents, status, type]);

  function updateStatus(id: string, nextStatus: DocumentStatus) {
    setDocuments((current) => current.map((document) => (document.id === id ? { ...document, status: nextStatus } : document)));
  }

  function updateVisibility(id: string, visibility: DocumentVisibility) {
    setDocuments((current) => current.map((document) => (document.id === id ? { ...document, visibility } : document)));
  }

  function addDemoDocument() {
    const next: DocumentRecord = {
      id: `doc_${String(documents.length + 1).padStart(3, '0')}_new`,
      title: 'New Uploaded Document',
      type: 'property_document',
      relatedTo: 'Newly Added Property',
      ownerName: role === 'client' ? 'Current Client' : 'New Client',
      uploadedBy: role === 'agent' ? 'Current Agent' : 'Dashboard User',
      status: 'pending_review',
      visibility: 'agency',
      expiryDate: '2027-06-04',
      fileName: 'new-uploaded-document.pdf',
      fileSize: '1.7 MB',
      uploadedAt: '2026-06-04',
    };
    setDocuments((current) => [next, ...current]);
    setShowForm(false);
  }

  const columns: ColumnDef<DocumentRecord>[] = [
    {
      header: 'Document',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.title}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.fileName} · {row.original.fileSize}</p>
        </div>
      ),
    },
    {
      header: 'Type / Related to',
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-slate-800">{documentTypeLabels[row.original.type]}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.relatedTo}</p>
        </div>
      ),
    },
    {
      header: 'Owner',
      accessorKey: 'ownerName',
    },
    {
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={documentStatusLabels[row.original.status]} />,
    },
    {
      header: 'Visibility',
      cell: ({ row }) => <span className="text-sm font-semibold text-slate-700">{documentVisibilityLabels[row.original.visibility]}</span>,
    },
    {
      header: 'Expiry',
      cell: ({ row }) => <span>{row.original.expiryDate ?? 'No expiry'}</span>,
    },
    {
      header: 'Status update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateStatus(row.original.id, event.target.value as DocumentStatus)}>
          {documentStatuses.map((status) => <option key={status} value={status}>{documentStatusLabels[status]}</option>)}
        </select>
      ),
    },
    {
      header: 'Access',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.visibility} onChange={(event) => updateVisibility(row.original.id, event.target.value as DocumentVisibility)}>
          {visibilityOptions.map((visibility) => <option key={visibility} value={visibility}>{documentVisibilityLabels[visibility]}</option>)}
        </select>
      ),
    },
    {
      header: 'Actions',
      cell: () => (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline"><Eye className="h-3.5 w-3.5" /> Preview</Button>
          <Button size="sm" variant="secondary"><Download className="h-3.5 w-3.5" /> Download</Button>
        </div>
      ),
    },
  ];

  const approvedCount = documents.filter((document) => document.status === 'approved').length;
  const pendingCount = documents.filter((document) => document.status === 'pending_review').length;
  const expiredCount = documents.filter((document) => document.status === 'expired').length;
  const visibleCount = documents.filter((document) => document.visibility === 'client_visible' || document.visibility === 'public').length;

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{roleCopy[role].title}</h1>
          <p className="mt-2 text-slate-500">{roleCopy[role].description}</p>
        </div>
        <Button variant="gold" onClick={() => setShowForm((current) => !current)}><UploadCloud className="h-4 w-4" /> Upload document</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Approved" value={String(approvedCount)} change="Ready for transaction use" icon={FileCheck2} />
        <StatCard label="Pending review" value={String(pendingCount)} change="Needs admin or legal check" icon={FileClock} />
        <StatCard label="Expired" value={String(expiredCount)} change="Do not rely on these" icon={FileArchive} />
        <StatCard label="Client-visible" value={String(visibleCount)} change="Shared externally" icon={Eye} />
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Upload document</CardTitle>
            <CardDescription>Supabase Storage is prepared by the schema. This UI is ready for live upload wiring.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Document title" defaultValue="New Uploaded Document" />
              <Select defaultValue="property_document">
                {documentTypes.map((documentType) => <option key={documentType} value={documentType}>{documentTypeLabels[documentType]}</option>)}
              </Select>
              <Input placeholder="Related property/client/project" defaultValue="Newly Added Property" />
              <Input placeholder="Owner name" defaultValue="New Client" />
              <Select defaultValue="pending_review">
                {documentStatuses.map((documentStatus) => <option key={documentStatus} value={documentStatus}>{documentStatusLabels[documentStatus]}</option>)}
              </Select>
              <Select defaultValue="agency">
                {visibilityOptions.map((visibility) => <option key={visibility} value={visibility}>{documentVisibilityLabels[visibility]}</option>)}
              </Select>
              <Input type="date" defaultValue="2027-06-04" />
              <Input type="file" />
              <Textarea className="md:col-span-2" placeholder="Notes" defaultValue="Confirm legal validity, ownership details and visibility before sharing externally." />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={addDemoDocument}><FilePlus2 className="h-4 w-4" /> Add document</Button>
              <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
        <Input placeholder="Search documents" />
        <Select value={type} onChange={(event) => setType(event.target.value as typeof type)}>
          <option value="all">All document types</option>
          {documentTypes.map((documentType) => <option key={documentType} value={documentType}>{documentTypeLabels[documentType]}</option>)}
        </Select>
        <Select value={status} onChange={(event) => setStatus(event.target.value as typeof status)}>
          <option value="all">All statuses</option>
          {documentStatuses.map((documentStatus) => <option key={documentStatus} value={documentStatus}>{documentStatusLabels[documentStatus]}</option>)}
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document vault</CardTitle>
          <CardDescription>Every document must have ownership, status, visibility and a related record. Random file dumping is not document management.</CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleDataTable data={filtered} columns={columns} searchPlaceholder="Quick search documents..." />
        </CardContent>
      </Card>

      <Card className="border-emerald-100 bg-emerald-50/50">
        <CardHeader>
          <CardTitle>Document control rule</CardTitle>
          <CardDescription>Documents marked expired or rejected should not be used to close sales, leases or valuation reports until corrected.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
