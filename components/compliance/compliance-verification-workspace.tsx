'use client';

import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { AlertTriangle, BadgeCheck, ClipboardCheck, FileWarning, Plus, ShieldCheck, UploadCloud, UserCheck } from 'lucide-react';
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
  complianceRoleLabels,
  demoComplianceChecklist,
  demoVerificationRecords,
  riskLevelTone,
  verificationStatusLabels,
  verificationStatusTone,
  verificationTypeLabels,
  type ComplianceChecklistItem,
  type ComplianceRole,
  type RiskLevel,
  type VerificationRecord,
  type VerificationStatus,
  type VerificationType,
} from '@/lib/compliance-data';

type Props = {
  role: ComplianceRole;
};

const statuses: VerificationStatus[] = ['pending', 'in_review', 'verified', 'rejected', 'expired'];
const verificationTypes: VerificationType[] = ['identity', 'address', 'ownership', 'agency_license', 'provider_license', 'developer_project', 'tenant_kyc'];
const riskLevels: RiskLevel[] = ['low', 'medium', 'high'];

export function ComplianceVerificationWorkspace({ role }: Props) {
  const [records, setRecords] = useState<VerificationRecord[]>(role === 'agency' || role === 'agent' ? demoVerificationRecords : demoVerificationRecords.filter((record) => record.subjectRole === role));
  const [statusFilter, setStatusFilter] = useState<'all' | VerificationStatus>('all');
  const [riskFilter, setRiskFilter] = useState<'all' | RiskLevel>('all');
  const [showForm, setShowForm] = useState(false);
  const [activeView, setActiveView] = useState<'records' | 'checklist' | 'policy'>('records');

  const [subjectName, setSubjectName] = useState(role === 'client' ? 'Client Name' : role === 'landlord' ? 'Property Owner Name' : 'Verification Subject');
  const [subjectRole, setSubjectRole] = useState<ComplianceRole>(role === 'agency' || role === 'agent' ? 'client' : role);
  const [verificationType, setVerificationType] = useState<VerificationType>(role === 'landlord' ? 'ownership' : role === 'developer' ? 'developer_project' : role === 'service_provider' ? 'provider_license' : 'identity');
  const [documentName, setDocumentName] = useState('Uploaded verification document.pdf');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('medium');
  const [notes, setNotes] = useState('Review authenticity, expiry date, identity consistency and relationship to the related property or transaction before approval.');

  const filteredRecords = useMemo(
    () => records.filter((record) => (statusFilter === 'all' || record.status === statusFilter) && (riskFilter === 'all' || record.riskLevel === riskFilter)),
    [records, statusFilter, riskFilter],
  );

  function updateStatus(id: string, nextStatus: VerificationStatus) {
    setRecords((current) => current.map((record) => (record.id === id ? { ...record, status: nextStatus } : record)));
  }

  function addRecord() {
    const next: VerificationRecord = {
      id: `ver_${Date.now()}`,
      subjectName,
      subjectRole,
      verificationType,
      documentName,
      submittedAt: '2026-06-05',
      expiresAt: '2026-12-05',
      reviewer: role === 'agent' ? 'Agency Compliance Desk' : 'Compliance Desk',
      riskLevel,
      status: 'pending',
      notes,
    };

    setRecords((current) => [next, ...current]);
    setShowForm(false);
  }

  const recordColumns: ColumnDef<VerificationRecord>[] = [
    {
      header: 'Subject',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.subjectName}</p>
          <p className="mt-1 text-xs text-slate-500">{complianceRoleLabels[row.original.subjectRole]}</p>
        </div>
      ),
    },
    { header: 'Type', cell: ({ row }) => <Badge variant="muted">{verificationTypeLabels[row.original.verificationType]}</Badge> },
    {
      header: 'Document',
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-slate-800">{row.original.documentName}</p>
          <p className="mt-1 text-xs text-slate-500">Submitted {row.original.submittedAt}</p>
        </div>
      ),
    },
    { header: 'Risk', cell: ({ row }) => <Badge variant={riskLevelTone[row.original.riskLevel]}>{row.original.riskLevel}</Badge> },
    { header: 'Reviewer', accessorKey: 'reviewer' },
    { header: 'Expires', accessorKey: 'expiresAt' },
    { header: 'Status', cell: ({ row }) => <Badge variant={verificationStatusTone[row.original.status]}>{verificationStatusLabels[row.original.status]}</Badge> },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateStatus(row.original.id, event.target.value as VerificationStatus)}>
          {statuses.map((option) => <option key={option} value={option}>{verificationStatusLabels[option]}</option>)}
        </select>
      ),
    },
  ];

  const checklistColumns: ColumnDef<ComplianceChecklistItem>[] = [
    { header: 'Rule', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.title}</p><p className="mt-1 text-xs text-slate-500">{row.original.requiredDocument}</p></div> },
    { header: 'Applies to', cell: ({ row }) => <Badge variant="muted">{complianceRoleLabels[row.original.appliesTo]}</Badge> },
    { header: 'Priority', cell: ({ row }) => <Badge variant={riskLevelTone[row.original.priority]}>{row.original.priority}</Badge> },
    { header: 'Status', cell: ({ row }) => <Badge variant={row.original.status === 'configured' ? 'success' : row.original.status === 'required' ? 'warning' : 'muted'}>{row.original.status}</Badge> },
  ];

  const pendingCount = records.filter((record) => record.status === 'pending' || record.status === 'in_review').length;
  const verifiedCount = records.filter((record) => record.status === 'verified').length;
  const highRiskCount = records.filter((record) => record.riskLevel === 'high' && record.status !== 'verified').length;
  const expiredOrRejected = records.filter((record) => record.status === 'expired' || record.status === 'rejected').length;

  const title = role === 'agency' || role === 'agent' ? 'KYC & Compliance Verification' : 'My Verification Centre';
  const description = role === 'agency'
    ? 'Control seller, buyer, tenant, agent, provider and developer verification before trust-sensitive transactions move forward.'
    : role === 'agent'
      ? 'Track the verification status of clients and property owners before you waste time pushing risky transactions.'
      : 'Upload and track the verification documents required to complete trusted real estate transactions.';

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{title}</h1>
          <p className="mt-2 max-w-3xl text-slate-500">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary"><UploadCloud className="h-4 w-4" /> Upload document</Button>
          <Button variant="gold" onClick={() => setShowForm((current) => !current)}><Plus className="h-4 w-4" /> Add verification</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending review" value={String(pendingCount)} change="Do not close blind deals" icon={ClipboardCheck} />
        <StatCard label="Verified records" value={String(verifiedCount)} change="Cleared for transaction activity" icon={BadgeCheck} />
        <StatCard label="High-risk open" value={String(highRiskCount)} change="Needs senior/legal review" icon={AlertTriangle} />
        <StatCard label="Rejected/expired" value={String(expiredOrRejected)} change="Must be fixed before proceeding" icon={FileWarning} />
      </div>

      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4 text-sm leading-6 text-red-950">
          <span className="font-black">Hard boundary:</span> verification records are not a replacement for legal advice, land registry searches, professional due diligence or regulatory compliance. They are an operating workflow so risky deals are not treated like clean deals.
        </CardContent>
      </Card>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add verification record</CardTitle>
            <CardDescription>Capture the document trail early. Nigerian real estate transactions fail when documentation is treated as an afterthought.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input value={subjectName} onChange={(event) => setSubjectName(event.target.value)} placeholder="Subject name" />
              <Select value={subjectRole} onChange={(event) => setSubjectRole(event.target.value as ComplianceRole)}>
                {Object.entries(complianceRoleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </Select>
              <Select value={verificationType} onChange={(event) => setVerificationType(event.target.value as VerificationType)}>
                {verificationTypes.map((option) => <option key={option} value={option}>{verificationTypeLabels[option]}</option>)}
              </Select>
              <Select value={riskLevel} onChange={(event) => setRiskLevel(event.target.value as RiskLevel)}>
                {riskLevels.map((option) => <option key={option} value={option}>{option}</option>)}
              </Select>
              <Input value={documentName} onChange={(event) => setDocumentName(event.target.value)} placeholder="Document name" className="md:col-span-2" />
            </div>
            <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Verification notes" />
            <Button onClick={addRecord}><UserCheck className="h-4 w-4" /> Save verification</Button>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap gap-2">
        {[
          ['records', 'Verification records'],
          ['checklist', 'Compliance checklist'],
          ['policy', 'Risk policy'],
        ].map(([value, label]) => <Button key={value} variant={activeView === value ? 'default' : 'outline'} size="sm" onClick={() => setActiveView(value as typeof activeView)}>{label}</Button>)}
      </div>

      {activeView === 'records' && (
        <div className="space-y-4">
          <Card>
            <CardContent className="grid gap-3 p-4 md:grid-cols-3">
              <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'all' | VerificationStatus)}>
                <option value="all">All statuses</option>
                {statuses.map((option) => <option key={option} value={option}>{verificationStatusLabels[option]}</option>)}
              </Select>
              <Select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value as 'all' | RiskLevel)}>
                <option value="all">All risk levels</option>
                {riskLevels.map((option) => <option key={option} value={option}>{option}</option>)}
              </Select>
              <Button variant="secondary"><ShieldCheck className="h-4 w-4" /> Apply controls</Button>
            </CardContent>
          </Card>
          <SimpleDataTable data={filteredRecords} columns={recordColumns} searchPlaceholder="Search verification records..." />
        </div>
      )}

      {activeView === 'checklist' && <SimpleDataTable data={role === 'agency' || role === 'agent' ? demoComplianceChecklist : demoComplianceChecklist.filter((item) => item.appliesTo === role)} columns={checklistColumns} searchPlaceholder="Search compliance checklist..." />}

      {activeView === 'policy' && (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader><CardTitle>Identity policy</CardTitle><CardDescription>Who the person or organisation is.</CardDescription></CardHeader>
            <CardContent className="text-sm leading-6 text-slate-600">Require valid ID, phone/email match, profile ownership and account consistency before allowing sensitive property, lease or payment records.</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Ownership policy</CardTitle><CardDescription>Who controls the property.</CardDescription></CardHeader>
            <CardContent className="text-sm leading-6 text-slate-600">Do not mark seller or landlord properties as verified until title evidence, address, survey and authority-to-list are reviewed.</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Transaction policy</CardTitle><CardDescription>What must be clean before deal movement.</CardDescription></CardHeader>
            <CardContent className="text-sm leading-6 text-slate-600">High-risk or expired records should block verified badges, premium campaigns, final invoices and client recommendations until cleared.</CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
