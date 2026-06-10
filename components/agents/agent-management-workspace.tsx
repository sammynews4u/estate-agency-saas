'use client';

import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { BadgeCheck, BarChart3, BriefcaseBusiness, Plus, ShieldAlert, UserCog, UsersRound } from 'lucide-react';
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
  agentStatusLabels,
  agentStatusTone,
  agentTierLabels,
  demoAgents,
  formatAgentMoney,
  type AgentProfile,
  type AgentStatus,
  type AgentTier,
} from '@/lib/agent-data';

const statuses: AgentStatus[] = ['active', 'pending', 'suspended', 'inactive'];
const tiers: AgentTier[] = ['associate', 'senior', 'principal', 'team_lead'];

export function AgentManagementWorkspace() {
  const [agents, setAgents] = useState<AgentProfile[]>(demoAgents);
  const [status, setStatus] = useState<'all' | AgentStatus>('all');
  const [team, setTeam] = useState('all');
  const [showForm, setShowForm] = useState(false);

  const [fullName, setFullName] = useState('New Field Agent');
  const [email, setEmail] = useState('new.agent@estateflow.test');
  const [phone, setPhone] = useState('+234 800 000 0000');
  const [branch, setBranch] = useState('Lekki Branch');
  const [agentTeam, setAgentTeam] = useState('Premium Sales');
  const [tier, setTier] = useState<AgentTier>('associate');
  const [specialisation, setSpecialisation] = useState('Residential sales and buyer qualification');

  const teams = useMemo(() => Array.from(new Set(agents.map((agent) => agent.team))), [agents]);
  const filteredAgents = useMemo(
    () => agents.filter((agent) => (status === 'all' || agent.status === status) && (team === 'all' || agent.team === team)),
    [agents, status, team],
  );

  function updateStatus(id: string, nextStatus: AgentStatus) {
    setAgents((current) => current.map((agent) => (agent.id === id ? { ...agent, status: nextStatus } : agent)));
  }

  function addAgent() {
    const next: AgentProfile = {
      id: `agent_${Date.now()}`,
      fullName,
      email,
      phone,
      branch,
      team: agentTeam,
      tier,
      specialisation,
      status: 'pending',
      activeProperties: 0,
      assignedLeads: 0,
      activeClients: 0,
      viewingsThisMonth: 0,
      dealsClosed: 0,
      conversionRate: 0,
      revenueClosed: 0,
      commissionEarned: 0,
      lastActivity: 'No activity yet',
      manager: 'Agency Admin',
    };

    setAgents((current) => [next, ...current]);
    setShowForm(false);
  }

  const columns: ColumnDef<AgentProfile>[] = [
    {
      header: 'Agent',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.fullName}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.email}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.phone}</p>
        </div>
      ),
    },
    {
      header: 'Branch / Team',
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-slate-800">{row.original.branch}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.team}</p>
        </div>
      ),
    },
    {
      header: 'Tier',
      cell: ({ row }) => <Badge variant="muted">{agentTierLabels[row.original.tier]}</Badge>,
    },
    {
      header: 'Workload',
      cell: ({ row }) => (
        <div className="text-xs text-slate-600">
          <p>{row.original.activeProperties} properties</p>
          <p>{row.original.assignedLeads} leads</p>
          <p>{row.original.activeClients} clients</p>
        </div>
      ),
    },
    {
      header: 'Performance',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.conversionRate}% conversion</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.dealsClosed} deals closed</p>
        </div>
      ),
    },
    {
      header: 'Revenue / Commission',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{formatAgentMoney(row.original.revenueClosed)}</p>
          <p className="mt-1 text-xs text-slate-500">{formatAgentMoney(row.original.commissionEarned)} commission</p>
        </div>
      ),
    },
    {
      header: 'Status',
      cell: ({ row }) => <Badge variant={agentStatusTone[row.original.status]}>{agentStatusLabels[row.original.status]}</Badge>,
    },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateStatus(row.original.id, event.target.value as AgentStatus)}>
          {statuses.map((option) => <option key={option} value={option}>{agentStatusLabels[option]}</option>)}
        </select>
      ),
    },
  ];

  const activeAgents = agents.filter((agent) => agent.status === 'active').length;
  const totalLeads = agents.reduce((sum, agent) => sum + agent.assignedLeads, 0);
  const totalRevenue = agents.reduce((sum, agent) => sum + agent.revenueClosed, 0);
  const averageConversion = Math.round(agents.reduce((sum, agent) => sum + agent.conversionRate, 0) / agents.length);
  const underperformingAgents = agents.filter((agent) => agent.status === 'active' && agent.conversionRate < 15).length;

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Agent Management System</h1>
          <p className="mt-2 max-w-3xl text-slate-500">Manage agent profiles, branch/team placement, workload, conversion performance and commission exposure from one operational screen.</p>
        </div>
        <Button variant="gold" onClick={() => setShowForm((current) => !current)}><Plus className="h-4 w-4" /> Add agent</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active agents" value={String(activeAgents)} change="Agents available for assignment" icon={UsersRound} />
        <StatCard label="Assigned leads" value={String(totalLeads)} change="Current pipeline workload" icon={BriefcaseBusiness} />
        <StatCard label="Closed revenue" value={formatAgentMoney(totalRevenue)} change="Tracked agent-sourced deals" icon={BarChart3} />
        <StatCard label="Avg conversion" value={`${averageConversion}%`} change="Across visible agents" icon={BadgeCheck} />
      </div>

      {underperformingAgents > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-5 w-5 text-amber-700" />
              <div>
                <p className="font-bold text-amber-900">Performance risk detected</p>
                <p className="text-sm text-amber-800">{underperformingAgents} active agent{underperformingAgents > 1 ? 's' : ''} below 15% conversion. Reassign stale leads or coach immediately. Do not let poor follow-up quietly rot your pipeline.</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Open coaching plan</Button>
          </CardContent>
        </Card>
      )}

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add new agent</CardTitle>
            <CardDescription>Create an onboarding-ready agent profile. Access and auth invitation can be wired to Supabase later.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Input value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Full name" />
              <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
              <Input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone" />
              <Input value={branch} onChange={(event) => setBranch(event.target.value)} placeholder="Branch" />
              <Input value={agentTeam} onChange={(event) => setAgentTeam(event.target.value)} placeholder="Team" />
              <Select value={tier} onChange={(event) => setTier(event.target.value as AgentTier)}>
                {tiers.map((option) => <option key={option} value={option}>{agentTierLabels[option]}</option>)}
              </Select>
            </div>
            <Textarea value={specialisation} onChange={(event) => setSpecialisation(event.target.value)} placeholder="Specialisation" />
            <div className="flex flex-wrap gap-3">
              <Button onClick={addAgent}><UserCog className="h-4 w-4" /> Save agent</Button>
              <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Agent controls</CardTitle>
          <CardDescription>Filter the operational table by status and team.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Select value={status} onChange={(event) => setStatus(event.target.value as 'all' | AgentStatus)}>
              <option value="all">All statuses</option>
              {statuses.map((option) => <option key={option} value={option}>{agentStatusLabels[option]}</option>)}
            </Select>
            <Select value={team} onChange={(event) => setTeam(event.target.value)}>
              <option value="all">All teams</option>
              {teams.map((option) => <option key={option} value={option}>{option}</option>)}
            </Select>
          </div>
        </CardContent>
      </Card>

      <SimpleDataTable data={filteredAgents} columns={columns} searchPlaceholder="Search agents, teams, branches..." />
    </div>
  );
}
