'use client';

import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Banknote, Building2, CalendarClock, FilePlus2, FolderKanban, HardHat, Home, LineChart, Plus, TrendingUp, UsersRound } from 'lucide-react';
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
  constructionProgressStatusLabels,
  constructionProgressStatuses,
  constructionProgressStatusTone,
  demoConstructionProgress,
  demoDevelopmentProjects,
  demoDevelopmentSales,
  demoProjectUnits,
  developmentProjectStatusLabels,
  developmentProjectStatuses,
  developmentProjectStatusTone,
  developmentSaleStatusLabels,
  developmentSaleStatuses,
  developmentSaleStatusTone,
  formatDevelopmentMoney,
  projectUnitStatusLabels,
  projectUnitStatuses,
  projectUnitStatusTone,
  type ConstructionProgressRecord,
  type ConstructionProgressStatus,
  type DevelopmentProjectRecord,
  type DevelopmentProjectStatus,
  type DevelopmentSaleRecord,
  type DevelopmentSaleStatus,
  type ProjectUnitRecord,
  type ProjectUnitStatus,
} from '@/lib/development-data';

type WorkspaceMode = 'overview' | 'projects' | 'units' | 'sales' | 'progress';

export function DevelopmentWorkspace({ mode = 'overview' }: { mode?: WorkspaceMode }) {
  const [projects, setProjects] = useState<DevelopmentProjectRecord[]>(demoDevelopmentProjects);
  const [units, setUnits] = useState<ProjectUnitRecord[]>(demoProjectUnits);
  const [progressRecords, setProgressRecords] = useState<ConstructionProgressRecord[]>(demoConstructionProgress);
  const [sales, setSales] = useState<DevelopmentSaleRecord[]>(demoDevelopmentSales);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showUnitForm, setShowUnitForm] = useState(false);
  const [showProgressForm, setShowProgressForm] = useState(false);

  const [projectName, setProjectName] = useState('New development project');
  const [developerName, setDeveloperName] = useState('Current Developer');
  const [location, setLocation] = useState('Lekki, Lagos');
  const [projectDescription, setProjectDescription] = useState('Describe project scope, target buyer, unit mix and commercial angle.');
  const [totalUnits, setTotalUnits] = useState('20');
  const [projectRevenue, setProjectRevenue] = useState('5000000000');

  const [unitNumber, setUnitNumber] = useState('A-101');
  const [unitType, setUnitType] = useState('Apartment');
  const [unitProject, setUnitProject] = useState(projects[0]?.projectName ?? 'New development project');
  const [unitPrice, setUnitPrice] = useState('250000000');
  const [unitAgent, setUnitAgent] = useState('Tola Martins');

  const [progressProject, setProgressProject] = useState(projects[0]?.projectName ?? 'New development project');
  const [milestone, setMilestone] = useState('Foundation works');
  const [phase, setPhase] = useState('Civil works');
  const [targetDate, setTargetDate] = useState('2026-07-30');
  const [progressPercentage, setProgressPercentage] = useState('25');
  const [contractor, setContractor] = useState('Main contractor');
  const [riskNote, setRiskNote] = useState('State the risk clearly. Vague construction tracking is how delays hide until buyers start asking hard questions.');

  const totals = useMemo(() => {
    const totalUnitsCount = projects.reduce((sum, project) => sum + project.totalUnits, 0);
    const soldUnits = projects.reduce((sum, project) => sum + project.unitsSold, 0);
    const revenuePipeline = sales.reduce((sum, sale) => sum + sale.dealValue, 0);
    const depositPipeline = sales.reduce((sum, sale) => sum + sale.depositPaid, 0);
    const averageProgress = Math.round(projects.reduce((sum, project) => sum + project.progressPercentage, 0) / projects.length);
    return { totalUnitsCount, soldUnits, revenuePipeline, depositPipeline, averageProgress };
  }, [projects, sales]);

  function addProject() {
    const next: DevelopmentProjectRecord = {
      id: `project_${Date.now()}`,
      projectName,
      developerName,
      location,
      description: projectDescription,
      startDate: '2026-06-05',
      expectedCompletionDate: '2027-06-30',
      status: 'planning',
      totalUnits: Number(totalUnits) || 0,
      unitsSold: 0,
      unitsAvailable: Number(totalUnits) || 0,
      progressPercentage: 0,
      projectedRevenue: Number(projectRevenue) || 0,
      documentsCount: 0,
    };
    setProjects((current) => [next, ...current]);
    setUnitProject(next.projectName);
    setProgressProject(next.projectName);
    setShowProjectForm(false);
  }

  function addUnit() {
    const next: ProjectUnitRecord = {
      id: `unit_${Date.now()}`,
      projectName: unitProject,
      unitNumber,
      unitType,
      floor: 'Ground + 1',
      bedrooms: unitType.toLowerCase().includes('office') ? 0 : 3,
      bathrooms: unitType.toLowerCase().includes('office') ? 1 : 4,
      sizeSqm: 180,
      price: Number(unitPrice) || 0,
      assignedAgent: unitAgent,
      status: 'available',
    };
    setUnits((current) => [next, ...current]);
    setShowUnitForm(false);
  }

  function addProgressRecord() {
    const next: ConstructionProgressRecord = {
      id: `progress_${Date.now()}`,
      projectName: progressProject,
      milestone,
      phase,
      targetDate,
      progressPercentage: Number(progressPercentage) || 0,
      contractor,
      riskNote,
      status: 'in_progress',
    };
    setProgressRecords((current) => [next, ...current]);
    setShowProgressForm(false);
  }

  function updateProjectStatus(id: string, status: DevelopmentProjectStatus) {
    setProjects((current) => current.map((project) => (project.id === id ? { ...project, status } : project)));
  }

  function updateUnitStatus(id: string, status: ProjectUnitStatus) {
    setUnits((current) => current.map((unit) => (unit.id === id ? { ...unit, status } : unit)));
  }

  function updateProgressStatus(id: string, status: ConstructionProgressStatus) {
    setProgressRecords((current) => current.map((record) => (record.id === id ? { ...record, status } : record)));
  }

  function updateSaleStatus(id: string, status: DevelopmentSaleStatus) {
    setSales((current) => current.map((sale) => (sale.id === id ? { ...sale, status } : sale)));
  }

  const projectColumns: ColumnDef<DevelopmentProjectRecord>[] = [
    { header: 'Project', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.projectName}</p><p className="mt-1 text-xs text-slate-500">{row.original.developerName} • {row.original.location}</p></div> },
    { header: 'Timeline', cell: ({ row }) => <span>{row.original.startDate} to {row.original.expectedCompletionDate}</span> },
    { header: 'Units', cell: ({ row }) => <span>{row.original.unitsSold}/{row.original.totalUnits} sold</span> },
    { header: 'Progress', cell: ({ row }) => <span className="font-bold text-slate-950">{row.original.progressPercentage}%</span> },
    { header: 'Projected revenue', cell: ({ row }) => <span>{formatDevelopmentMoney(row.original.projectedRevenue)}</span> },
    { header: 'Docs', accessorKey: 'documentsCount' },
    { header: 'Status', cell: ({ row }) => <Badge variant={developmentProjectStatusTone[row.original.status]}>{developmentProjectStatusLabels[row.original.status]}</Badge> },
    { header: 'Update', cell: ({ row }) => <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateProjectStatus(row.original.id, event.target.value as DevelopmentProjectStatus)}>{developmentProjectStatuses.map((option) => <option key={option} value={option}>{developmentProjectStatusLabels[option]}</option>)}</select> },
  ];

  const unitColumns: ColumnDef<ProjectUnitRecord>[] = [
    { header: 'Unit', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.unitNumber}</p><p className="mt-1 text-xs text-slate-500">{row.original.unitType} • {row.original.floor}</p></div> },
    { header: 'Project', accessorKey: 'projectName' },
    { header: 'Specs', cell: ({ row }) => <span>{row.original.bedrooms} bed • {row.original.bathrooms} bath • {row.original.sizeSqm} sqm</span> },
    { header: 'Price', cell: ({ row }) => <span className="font-bold text-slate-950">{formatDevelopmentMoney(row.original.price)}</span> },
    { header: 'Buyer', cell: ({ row }) => <span>{row.original.buyerName ?? 'Not assigned'}</span> },
    { header: 'Agent', accessorKey: 'assignedAgent' },
    { header: 'Status', cell: ({ row }) => <Badge variant={projectUnitStatusTone[row.original.status]}>{projectUnitStatusLabels[row.original.status]}</Badge> },
    { header: 'Update', cell: ({ row }) => <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateUnitStatus(row.original.id, event.target.value as ProjectUnitStatus)}>{projectUnitStatuses.map((option) => <option key={option} value={option}>{projectUnitStatusLabels[option]}</option>)}</select> },
  ];

  const progressColumns: ColumnDef<ConstructionProgressRecord>[] = [
    { header: 'Milestone', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.milestone}</p><p className="mt-1 text-xs text-slate-500">{row.original.phase} • {row.original.contractor}</p></div> },
    { header: 'Project', accessorKey: 'projectName' },
    { header: 'Target', accessorKey: 'targetDate' },
    { header: 'Completed', cell: ({ row }) => <span>{row.original.completionDate ?? 'Pending'}</span> },
    { header: 'Progress', cell: ({ row }) => <span className="font-bold text-slate-950">{row.original.progressPercentage}%</span> },
    { header: 'Risk note', accessorKey: 'riskNote' },
    { header: 'Status', cell: ({ row }) => <Badge variant={constructionProgressStatusTone[row.original.status]}>{constructionProgressStatusLabels[row.original.status]}</Badge> },
    { header: 'Update', cell: ({ row }) => <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateProgressStatus(row.original.id, event.target.value as ConstructionProgressStatus)}>{constructionProgressStatuses.map((option) => <option key={option} value={option}>{constructionProgressStatusLabels[option]}</option>)}</select> },
  ];

  const saleColumns: ColumnDef<DevelopmentSaleRecord>[] = [
    { header: 'Buyer', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.buyerName}</p><p className="mt-1 text-xs text-slate-500">{row.original.projectName} • {row.original.unitNumber}</p></div> },
    { header: 'Agent', accessorKey: 'agentName' },
    { header: 'Deal value', cell: ({ row }) => <span className="font-bold text-slate-950">{formatDevelopmentMoney(row.original.dealValue)}</span> },
    { header: 'Deposit paid', cell: ({ row }) => <span>{formatDevelopmentMoney(row.original.depositPaid)}</span> },
    { header: 'Expected close', accessorKey: 'expectedCloseDate' },
    { header: 'Status', cell: ({ row }) => <Badge variant={developmentSaleStatusTone[row.original.status]}>{developmentSaleStatusLabels[row.original.status]}</Badge> },
    { header: 'Update', cell: ({ row }) => <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateSaleStatus(row.original.id, event.target.value as DevelopmentSaleStatus)}>{developmentSaleStatuses.map((option) => <option key={option} value={option}>{developmentSaleStatusLabels[option]}</option>)}</select> },
  ];

  const title = mode === 'overview' ? 'Construction & Development Module' : mode === 'projects' ? 'Developer Projects' : mode === 'units' ? 'Unit Inventory' : mode === 'sales' ? 'Project Sales Tracking' : 'Construction Progress Tracking';
  const description = 'Manage developer projects, unit inventory, construction milestones, documentation readiness and project sales without losing control of the pipeline.';

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{title}</h1>
          <p className="mt-2 max-w-3xl text-slate-500">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {(mode === 'overview' || mode === 'projects') && <Button variant="gold" onClick={() => setShowProjectForm((current) => !current)}><Plus className="h-4 w-4" /> Add project</Button>}
          {(mode === 'overview' || mode === 'units') && <Button variant="secondary" onClick={() => setShowUnitForm((current) => !current)}><Home className="h-4 w-4" /> Add unit</Button>}
          {(mode === 'overview' || mode === 'progress') && <Button variant="outline" onClick={() => setShowProgressForm((current) => !current)}><HardHat className="h-4 w-4" /> Log progress</Button>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Projects" value={projects.length.toString()} change="Active development portfolio" icon={FolderKanban} />
        <StatCard label="Total units" value={totals.totalUnitsCount.toString()} change={`${totals.soldUnits} sold units`} icon={Building2} />
        <StatCard label="Sales pipeline" value={formatDevelopmentMoney(totals.revenuePipeline)} change={`${formatDevelopmentMoney(totals.depositPipeline)} deposits received`} icon={Banknote} />
        <StatCard label="Avg. progress" value={`${totals.averageProgress}%`} change="Across live projects" icon={TrendingUp} />
      </div>

      {showProjectForm && (
        <Card>
          <CardHeader><CardTitle>Add development project</CardTitle><CardDescription>Do not create vague projects. Record unit count, revenue expectation and delivery dates from the start.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Input value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="Project name" />
              <Input value={developerName} onChange={(event) => setDeveloperName(event.target.value)} placeholder="Developer name" />
              <Input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Location" />
              <Input value={totalUnits} onChange={(event) => setTotalUnits(event.target.value)} placeholder="Total units" />
              <Input value={projectRevenue} onChange={(event) => setProjectRevenue(event.target.value)} placeholder="Projected revenue" />
              <Select value="planning" onChange={() => undefined}><option value="planning">Planning</option></Select>
            </div>
            <Textarea value={projectDescription} onChange={(event) => setProjectDescription(event.target.value)} />
            <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setShowProjectForm(false)}>Cancel</Button><Button onClick={addProject}>Save project</Button></div>
          </CardContent>
        </Card>
      )}

      {showUnitForm && (
        <Card>
          <CardHeader><CardTitle>Add project unit</CardTitle><CardDescription>Every unit should have price, status and assigned agent. Inventory chaos kills developer sales.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Select value={unitProject} onChange={(event) => setUnitProject(event.target.value)}>{projects.map((project) => <option key={project.id} value={project.projectName}>{project.projectName}</option>)}</Select>
              <Input value={unitNumber} onChange={(event) => setUnitNumber(event.target.value)} placeholder="Unit number" />
              <Input value={unitType} onChange={(event) => setUnitType(event.target.value)} placeholder="Unit type" />
              <Input value={unitPrice} onChange={(event) => setUnitPrice(event.target.value)} placeholder="Price" />
              <Input value={unitAgent} onChange={(event) => setUnitAgent(event.target.value)} placeholder="Assigned agent" />
            </div>
            <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setShowUnitForm(false)}>Cancel</Button><Button onClick={addUnit}>Save unit</Button></div>
          </CardContent>
        </Card>
      )}

      {showProgressForm && (
        <Card>
          <CardHeader><CardTitle>Log construction progress</CardTitle><CardDescription>Record milestones in a way that a buyer, developer and agency can all understand.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Select value={progressProject} onChange={(event) => setProgressProject(event.target.value)}>{projects.map((project) => <option key={project.id} value={project.projectName}>{project.projectName}</option>)}</Select>
              <Input value={milestone} onChange={(event) => setMilestone(event.target.value)} placeholder="Milestone" />
              <Input value={phase} onChange={(event) => setPhase(event.target.value)} placeholder="Phase" />
              <Input type="date" value={targetDate} onChange={(event) => setTargetDate(event.target.value)} />
              <Input value={progressPercentage} onChange={(event) => setProgressPercentage(event.target.value)} placeholder="Progress %" />
              <Input value={contractor} onChange={(event) => setContractor(event.target.value)} placeholder="Contractor" />
            </div>
            <Textarea value={riskNote} onChange={(event) => setRiskNote(event.target.value)} />
            <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setShowProgressForm(false)}>Cancel</Button><Button onClick={addProgressRecord}>Save progress</Button></div>
          </CardContent>
        </Card>
      )}

      {mode === 'overview' && (
        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Project control warning</CardTitle><CardDescription>The danger is not lack of listings. It is poor unit discipline, unclear project evidence and uncontrolled buyer expectations.</CardDescription></CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-slate-600">
              <p>Use this module to keep project inventory, construction updates, sales status and buyer commitments in one place.</p>
              <p>For developer deals, a dashboard without documentation, milestone proof and payment status is decoration. This module forces those records to exist.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Live project health</CardTitle><CardDescription>Quick view of delivery risk and unit movement.</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {projects.map((project) => <div key={project.id} className="rounded-2xl border border-slate-100 p-4"><div className="flex items-center justify-between gap-3"><div><p className="font-bold text-slate-950">{project.projectName}</p><p className="text-xs text-slate-500">{project.unitsAvailable} available • {project.documentsCount} documents</p></div><Badge variant={developmentProjectStatusTone[project.status]}>{developmentProjectStatusLabels[project.status]}</Badge></div><div className="mt-3 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-emerald-500" style={{ width: `${project.progressPercentage}%` }} /></div></div>)}
            </CardContent>
          </Card>
        </div>
      )}

      {(mode === 'overview' || mode === 'projects') && <SimpleDataTable data={projects} columns={projectColumns} searchPlaceholder="Search projects..." />}
      {(mode === 'overview' || mode === 'units') && <SimpleDataTable data={units} columns={unitColumns} searchPlaceholder="Search units..." />}
      {(mode === 'overview' || mode === 'progress') && <SimpleDataTable data={progressRecords} columns={progressColumns} searchPlaceholder="Search progress records..." />}
      {(mode === 'overview' || mode === 'sales') && <SimpleDataTable data={sales} columns={saleColumns} searchPlaceholder="Search development sales..." />}

      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold text-amber-950">Developer module added as a working foundation.</p>
            <p className="mt-1 text-sm text-amber-900">Next serious upgrade is buyer payment schedules and developer document verification. Do not pretend project sales are safe without those two.</p>
          </div>
          <Button variant="gold" size="sm"><FilePlus2 className="h-4 w-4" /> Export project pack</Button>
        </CardContent>
      </Card>
    </div>
  );
}
