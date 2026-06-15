'use client';

import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Building2, CalendarCheck2, ClipboardCheck, FileWarning, Home, Plus, ShieldCheck, UsersRound, Wrench } from 'lucide-react';
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
  demoInspections,
  demoLeases,
  demoMaintenanceRecords,
  demoOccupancy,
  demoTenants,
  formatPropertyMoney,
  inspectionStatusLabels,
  inspectionStatusTone,
  leaseStatusLabels,
  leaseStatusTone,
  maintenancePriorities,
  maintenancePriorityLabels,
  maintenancePriorityTone,
  maintenanceStatusLabels,
  maintenanceStatusTone,
  maintenanceStatuses,
  occupancyStatusLabels,
  occupancyStatusTone,
  tenantStatusLabels,
  tenantStatusTone,
  tenantStatuses,
  type InspectionRecord,
  type LeaseRecord,
  type MaintenancePriority,
  type MaintenanceRecord,
  type MaintenanceStatus,
  type OccupancyRecord,
  type TenantRecord,
  type TenantStatus,
} from '@/lib/property-management-data';

type WorkspaceRole = 'agency' | 'agent' | 'landlord';

type WorkspaceMode = 'overview' | 'tenants' | 'leases' | 'maintenance' | 'inspections' | 'occupancy';

export function PropertyManagementWorkspace({ role = 'agency', mode = 'overview' }: { role?: WorkspaceRole; mode?: WorkspaceMode }) {
  const [tenants, setTenants] = useState<TenantRecord[]>(demoTenants);
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>(demoMaintenanceRecords);
  const [tenantStatus, setTenantStatus] = useState<TenantStatus | 'all'>('all');
  const [maintenanceStatus, setMaintenanceStatus] = useState<MaintenanceStatus | 'all'>('all');
  const [showTenantForm, setShowTenantForm] = useState(false);
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);

  const [tenantName, setTenantName] = useState('New Tenant');
  const [tenantPhone, setTenantPhone] = useState('+234 800 000 0000');
  const [tenantEmail, setTenantEmail] = useState('tenant@example.com');
  const [tenantProperty, setTenantProperty] = useState('Emerald Court Apartment');
  const [tenantUnit, setTenantUnit] = useState('Flat 1A');
  const [tenantRent, setTenantRent] = useState('2500000');

  const [issueTitle, setIssueTitle] = useState('New maintenance issue');
  const [issueProperty, setIssueProperty] = useState('Emerald Court Apartment');
  const [issueTenant, setIssueTenant] = useState('New Tenant');
  const [issueDescription, setIssueDescription] = useState('Describe the issue clearly before assigning a vendor.');
  const [issuePriority, setIssuePriority] = useState<MaintenancePriority>('medium');
  const [vendor, setVendor] = useState('Unassigned vendor');
  const [estimatedCost, setEstimatedCost] = useState('0');

  const visibleTenants = useMemo(() => tenants.filter((tenant) => tenantStatus === 'all' || tenant.status === tenantStatus), [tenants, tenantStatus]);
  const visibleMaintenance = useMemo(() => maintenance.filter((record) => maintenanceStatus === 'all' || record.status === maintenanceStatus), [maintenance, maintenanceStatus]);

  function updateTenantStatus(id: string, nextStatus: TenantStatus) {
    setTenants((current) => current.map((tenant) => (tenant.id === id ? { ...tenant, status: nextStatus } : tenant)));
  }

  function updateMaintenanceStatus(id: string, nextStatus: MaintenanceStatus) {
    setMaintenance((current) => current.map((record) => (record.id === id ? { ...record, status: nextStatus } : record)));
  }

  function addTenant() {
    const next: TenantRecord = {
      id: `tenant_${Date.now()}`,
      tenantName,
      phone: tenantPhone,
      email: tenantEmail,
      property: tenantProperty,
      unit: tenantUnit,
      leaseStart: '2026-06-05',
      leaseEnd: '2027-06-04',
      rentAmount: Number(tenantRent) || 0,
      paymentFrequency: 'yearly',
      outstandingBalance: 0,
      status: 'active',
      assignedAgent: role === 'agent' ? 'Current Agent' : 'Unassigned',
    };
    setTenants((current) => [next, ...current]);
    setShowTenantForm(false);
  }

  function addMaintenanceRecord() {
    const next: MaintenanceRecord = {
      id: `maint_${Date.now()}`,
      property: issueProperty,
      tenantName: issueTenant,
      issueTitle,
      issueDescription,
      priority: issuePriority,
      assignedVendor: vendor,
      estimatedCost: Number(estimatedCost) || 0,
      dateReported: '2026-06-05',
      status: 'reported',
    };
    setMaintenance((current) => [next, ...current]);
    setShowMaintenanceForm(false);
  }

  const tenantColumns: ColumnDef<TenantRecord>[] = [
    { header: 'Tenant', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.tenantName}</p><p className="mt-1 text-xs text-slate-500">{row.original.phone} • {row.original.email}</p></div> },
    { header: 'Property / Unit', cell: ({ row }) => <div><p className="font-semibold text-slate-800">{row.original.property}</p><p className="mt-1 text-xs text-slate-500">{row.original.unit}</p></div> },
    { header: 'Lease', cell: ({ row }) => <span>{row.original.leaseStart} to {row.original.leaseEnd}</span> },
    { header: 'Rent', cell: ({ row }) => <span className="font-bold text-slate-950">{formatPropertyMoney(row.original.rentAmount)}</span> },
    { header: 'Outstanding', cell: ({ row }) => <span className={row.original.outstandingBalance > 0 ? 'font-bold text-red-600' : 'font-semibold text-emerald-700'}>{formatPropertyMoney(row.original.outstandingBalance)}</span> },
    { header: 'Status', cell: ({ row }) => <Badge variant={tenantStatusTone[row.original.status]}>{tenantStatusLabels[row.original.status]}</Badge> },
    { header: 'Update', cell: ({ row }) => <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateTenantStatus(row.original.id, event.target.value as TenantStatus)}>{tenantStatuses.map((option) => <option key={option} value={option}>{tenantStatusLabels[option]}</option>)}</select> },
  ];

  const leaseColumns: ColumnDef<LeaseRecord>[] = [
    { header: 'Tenant', accessorKey: 'tenantName' },
    { header: 'Property', accessorKey: 'property' },
    { header: 'Document', cell: ({ row }) => <span className="font-semibold text-slate-800">{row.original.leaseDocument}</span> },
    { header: 'Lease period', cell: ({ row }) => <span>{row.original.startDate} to {row.original.endDate}</span> },
    { header: 'Renewal', accessorKey: 'renewalDate' },
    { header: 'Rent', cell: ({ row }) => <span>{formatPropertyMoney(row.original.rentAmount)}</span> },
    { header: 'Status', cell: ({ row }) => <Badge variant={leaseStatusTone[row.original.status]}>{leaseStatusLabels[row.original.status]}</Badge> },
  ];

  const maintenanceColumns: ColumnDef<MaintenanceRecord>[] = [
    { header: 'Issue', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.issueTitle}</p><p className="mt-1 text-xs text-slate-500">{row.original.issueDescription}</p></div> },
    { header: 'Property / Tenant', cell: ({ row }) => <div><p className="font-semibold text-slate-800">{row.original.property}</p><p className="mt-1 text-xs text-slate-500">{row.original.tenantName}</p></div> },
    { header: 'Priority', cell: ({ row }) => <Badge variant={maintenancePriorityTone[row.original.priority]}>{maintenancePriorityLabels[row.original.priority]}</Badge> },
    { header: 'Vendor', accessorKey: 'assignedVendor' },
    { header: 'Cost', cell: ({ row }) => <span>{formatPropertyMoney(row.original.estimatedCost)}</span> },
    { header: 'Status', cell: ({ row }) => <Badge variant={maintenanceStatusTone[row.original.status]}>{maintenanceStatusLabels[row.original.status]}</Badge> },
    { header: 'Update', cell: ({ row }) => <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateMaintenanceStatus(row.original.id, event.target.value as MaintenanceStatus)}>{maintenanceStatuses.map((option) => <option key={option} value={option}>{maintenanceStatusLabels[option]}</option>)}</select> },
  ];

  const inspectionColumns: ColumnDef<InspectionRecord>[] = [
    { header: 'Property', accessorKey: 'property' },
    { header: 'Inspector', accessorKey: 'inspector' },
    { header: 'Date', accessorKey: 'inspectionDate' },
    { header: 'Type', accessorKey: 'inspectionType' },
    { header: 'Score', cell: ({ row }) => <span className="font-bold text-slate-950">{row.original.conditionScore}%</span> },
    { header: 'Findings', accessorKey: 'findings' },
    { header: 'Status', cell: ({ row }) => <Badge variant={inspectionStatusTone[row.original.status]}>{inspectionStatusLabels[row.original.status]}</Badge> },
  ];

  const occupancyColumns: ColumnDef<OccupancyRecord>[] = [
    { header: 'Property / Unit', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.property}</p><p className="mt-1 text-xs text-slate-500">{row.original.unit}</p></div> },
    { header: 'Landlord', accessorKey: 'landlord' },
    { header: 'Tenant', cell: ({ row }) => <span>{row.original.currentTenant ?? 'None'}</span> },
    { header: 'Rent', cell: ({ row }) => <span>{formatPropertyMoney(row.original.rentAmount)}</span> },
    { header: 'Next availability', cell: ({ row }) => <span>{row.original.nextAvailabilityDate ?? 'Not set'}</span> },
    { header: 'Status', cell: ({ row }) => <Badge variant={occupancyStatusTone[row.original.status]}>{occupancyStatusLabels[row.original.status]}</Badge> },
  ];

  const occupiedCount = demoOccupancy.filter((record) => record.status === 'occupied').length;
  const vacantCount = demoOccupancy.filter((record) => record.status === 'vacant').length;
  const unresolvedMaintenance = maintenance.filter((record) => !['resolved', 'closed'].includes(record.status)).length;
  const renewalDue = demoLeases.filter((lease) => lease.status === 'renewal_due').length;
  const occupancyRate = Math.round((occupiedCount / demoOccupancy.length) * 100);
  const overdueBalance = tenants.reduce((sum, tenant) => sum + tenant.outstandingBalance, 0);

  const title = mode === 'overview' ? 'Property Management System' : mode === 'tenants' ? 'Tenant Management' : mode === 'leases' ? 'Lease Management' : mode === 'maintenance' ? 'Maintenance Records' : mode === 'inspections' ? 'Property Inspections' : 'Occupancy Tracking';
  const description = role === 'landlord'
    ? 'Track tenants, lease dates, inspections, maintenance and occupancy across your submitted properties.'
    : role === 'agent'
      ? 'Manage the operational side of assigned properties so listings do not collapse after closing.'
      : 'Control tenants, leases, maintenance, inspections and occupancy from one operational desk.';

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{title}</h1>
          <p className="mt-2 max-w-3xl text-slate-500">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {(mode === 'overview' || mode === 'tenants') && <Button variant="gold" onClick={() => setShowTenantForm((current) => !current)}><Plus className="h-4 w-4" /> Add tenant</Button>}
          {(mode === 'overview' || mode === 'maintenance') && <Button variant="secondary" onClick={() => setShowMaintenanceForm((current) => !current)}><Wrench className="h-4 w-4" /> Log maintenance</Button>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Occupancy rate" value={`${occupancyRate}%`} change={`${occupiedCount} occupied, ${vacantCount} vacant`} icon={Home} />
        <StatCard label="Active tenants" value={tenants.filter((tenant) => tenant.status === 'active').length.toString()} change="Lease-backed occupants" icon={UsersRound} />
        <StatCard label="Maintenance open" value={unresolvedMaintenance.toString()} change="Needs operational follow-up" icon={Wrench} />
        <StatCard label="Renewals due" value={renewalDue.toString()} change="Do not let lease dates sneak up" icon={CalendarCheck2} />
      </div>

      {overdueBalance > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-bold text-red-900">Outstanding tenant balance: {formatPropertyMoney(overdueBalance)}</p>
              <p className="mt-1 text-sm text-red-800">Weak rent follow-up turns property management into charity. Push overdue tenants into structured recovery immediately.</p>
            </div>
            <Button variant="danger" size="sm">Review overdue tenants</Button>
          </CardContent>
        </Card>
      )}

      {showTenantForm && (
        <Card>
          <CardHeader><CardTitle>Add tenant</CardTitle><CardDescription>Capture enough tenant and lease information to manage the relationship properly.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Input value={tenantName} onChange={(event) => setTenantName(event.target.value)} placeholder="Tenant name" />
              <Input value={tenantPhone} onChange={(event) => setTenantPhone(event.target.value)} placeholder="Phone" />
              <Input value={tenantEmail} onChange={(event) => setTenantEmail(event.target.value)} placeholder="Email" />
              <Input value={tenantProperty} onChange={(event) => setTenantProperty(event.target.value)} placeholder="Property" />
              <Input value={tenantUnit} onChange={(event) => setTenantUnit(event.target.value)} placeholder="Unit" />
              <Input value={tenantRent} onChange={(event) => setTenantRent(event.target.value)} placeholder="Annual rent" />
            </div>
            <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setShowTenantForm(false)}>Cancel</Button><Button onClick={addTenant}>Save tenant</Button></div>
          </CardContent>
        </Card>
      )}

      {showMaintenanceForm && (
        <Card>
          <CardHeader><CardTitle>Log maintenance issue</CardTitle><CardDescription>Record the problem, priority, vendor and expected cost before it becomes invisible.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Input value={issueTitle} onChange={(event) => setIssueTitle(event.target.value)} placeholder="Issue title" />
              <Input value={issueProperty} onChange={(event) => setIssueProperty(event.target.value)} placeholder="Property" />
              <Input value={issueTenant} onChange={(event) => setIssueTenant(event.target.value)} placeholder="Tenant" />
              <Select value={issuePriority} onChange={(event) => setIssuePriority(event.target.value as MaintenancePriority)}>{maintenancePriorities.map((option) => <option key={option} value={option}>{maintenancePriorityLabels[option]}</option>)}</Select>
              <Input value={vendor} onChange={(event) => setVendor(event.target.value)} placeholder="Vendor" />
              <Input value={estimatedCost} onChange={(event) => setEstimatedCost(event.target.value)} placeholder="Estimated cost" />
            </div>
            <Textarea value={issueDescription} onChange={(event) => setIssueDescription(event.target.value)} />
            <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setShowMaintenanceForm(false)}>Cancel</Button><Button onClick={addMaintenanceRecord}>Save issue</Button></div>
          </CardContent>
        </Card>
      )}

      {(mode === 'overview' || mode === 'tenants') && (
        <Card>
          <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div><CardTitle>Tenants</CardTitle><CardDescription>Tenant records, rent obligations and status control.</CardDescription></div>
            <Select className="max-w-xs" value={tenantStatus} onChange={(event) => setTenantStatus(event.target.value as TenantStatus | 'all')}><option value="all">All tenant statuses</option>{tenantStatuses.map((option) => <option key={option} value={option}>{tenantStatusLabels[option]}</option>)}</Select>
          </CardHeader>
          <CardContent><SimpleDataTable data={visibleTenants} columns={tenantColumns} searchPlaceholder="Search tenants..." /></CardContent>
        </Card>
      )}

      {(mode === 'overview' || mode === 'leases') && (
        <Card>
          <CardHeader><CardTitle>Leases</CardTitle><CardDescription>Lease period, renewal dates, deposits and document references.</CardDescription></CardHeader>
          <CardContent><SimpleDataTable data={demoLeases} columns={leaseColumns} searchPlaceholder="Search leases..." /></CardContent>
        </Card>
      )}

      {(mode === 'overview' || mode === 'maintenance') && (
        <Card>
          <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div><CardTitle>Maintenance</CardTitle><CardDescription>Maintenance priorities, vendor assignments and cost visibility.</CardDescription></div>
            <Select className="max-w-xs" value={maintenanceStatus} onChange={(event) => setMaintenanceStatus(event.target.value as MaintenanceStatus | 'all')}><option value="all">All maintenance statuses</option>{maintenanceStatuses.map((option) => <option key={option} value={option}>{maintenanceStatusLabels[option]}</option>)}</Select>
          </CardHeader>
          <CardContent><SimpleDataTable data={visibleMaintenance} columns={maintenanceColumns} searchPlaceholder="Search maintenance..." /></CardContent>
        </Card>
      )}

      {(mode === 'overview' || mode === 'inspections') && (
        <Card>
          <CardHeader><CardTitle>Inspections</CardTitle><CardDescription>Inspection schedules, condition scores and action flags.</CardDescription></CardHeader>
          <CardContent><SimpleDataTable data={demoInspections} columns={inspectionColumns} searchPlaceholder="Search inspections..." /></CardContent>
        </Card>
      )}

      {(mode === 'overview' || mode === 'occupancy') && (
        <Card>
          <CardHeader><CardTitle>Occupancy</CardTitle><CardDescription>Unit-level status, landlord visibility and availability planning.</CardDescription></CardHeader>
          <CardContent><SimpleDataTable data={demoOccupancy} columns={occupancyColumns} searchPlaceholder="Search occupancy..." /></CardContent>
        </Card>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Lease discipline</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-600">The module forces every tenancy to connect to lease dates, rent amount, deposit and document references.</p></CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><FileWarning className="h-4 w-4 text-amber-600" /> Maintenance control</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-600">Issues are tracked by priority, vendor, estimated cost and status so property operations stop living inside phone calls.</p></CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><ClipboardCheck className="h-4 w-4 text-slate-700" /> Inspection memory</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-600">Inspection scores and findings create evidence for renewals, deductions, maintenance and landlord reporting.</p></CardContent></Card>
      </div>
    </div>
  );
}
