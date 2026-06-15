'use client';

import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { BarChart3, CalendarDays, Filter, Megaphone, Plus, Send, Target, UsersRound } from 'lucide-react';
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
  assetStatusLabels,
  assetStatusTone,
  demoMarketingAssets,
  demoMarketingCampaigns,
  formatMarketingMoney,
  marketingAudienceLabels,
  marketingChannelLabels,
  marketingStatusLabels,
  marketingStatusTone,
  type AssetStatus,
  type MarketingAsset,
  type MarketingAudience,
  type MarketingCampaign,
  type MarketingChannel,
  type MarketingStatus,
} from '@/lib/marketing-data';

type Props = {
  role: 'super-admin' | 'agency' | 'agent' | 'developer';
};

const channels: MarketingChannel[] = ['whatsapp', 'email', 'sms', 'social', 'portal', 'offline'];
const audiences: MarketingAudience[] = ['buyers', 'tenants', 'landlords', 'sellers', 'investors', 'developers'];
const statuses: MarketingStatus[] = ['draft', 'scheduled', 'active', 'paused', 'completed'];
const assetStatuses: AssetStatus[] = ['briefed', 'in_design', 'approved', 'published'];

export function MarketingCampaignWorkspace({ role }: Props) {
  const initialCampaigns = useMemo(() => {
    if (role === 'agent') return demoMarketingCampaigns.filter((campaign) => campaign.owner === 'Nneka Ibe' || campaign.owner === 'Seyi Adewale');
    if (role === 'developer') return demoMarketingCampaigns.filter((campaign) => campaign.audience === 'investors' || campaign.owner.includes('Developer'));
    return demoMarketingCampaigns;
  }, [role]);

  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(initialCampaigns);
  const [assets, setAssets] = useState<MarketingAsset[]>(demoMarketingAssets);
  const [statusFilter, setStatusFilter] = useState<'all' | MarketingStatus>('all');
  const [channelFilter, setChannelFilter] = useState<'all' | MarketingChannel>('all');
  const [showForm, setShowForm] = useState(false);
  const [activeView, setActiveView] = useState<'campaigns' | 'assets' | 'planner'>('campaigns');

  const [title, setTitle] = useState('New Property Campaign');
  const [objective, setObjective] = useState('Generate qualified inquiries and convert them into booked property viewings.');
  const [channel, setChannel] = useState<MarketingChannel>('whatsapp');
  const [audience, setAudience] = useState<MarketingAudience>('buyers');
  const [budget, setBudget] = useState('100000');
  const [owner, setOwner] = useState(role === 'agent' ? 'Nneka Ibe' : role === 'developer' ? 'Developer Sales Team' : 'Agency Growth Desk');
  const [relatedProperty, setRelatedProperty] = useState('Select property or project');
  const [message, setMessage] = useState('Create a sharp message that sells the property benefit, not just the features.');

  const filteredCampaigns = useMemo(
    () => campaigns.filter((campaign) => (statusFilter === 'all' || campaign.status === statusFilter) && (channelFilter === 'all' || campaign.channel === channelFilter)),
    [campaigns, statusFilter, channelFilter],
  );

  function updateCampaignStatus(id: string, nextStatus: MarketingStatus) {
    setCampaigns((current) => current.map((campaign) => (campaign.id === id ? { ...campaign, status: nextStatus } : campaign)));
  }

  function updateAssetStatus(id: string, nextStatus: AssetStatus) {
    setAssets((current) => current.map((asset) => (asset.id === id ? { ...asset, status: nextStatus } : asset)));
  }

  function addCampaign() {
    const next: MarketingCampaign = {
      id: `mkt_${Date.now()}`,
      title,
      objective,
      channel,
      audience,
      budget: Number(budget) || 0,
      owner,
      startDate: '2026-06-05',
      endDate: '2026-06-20',
      relatedProperty,
      status: 'draft',
      leadsGenerated: 0,
      viewingsBooked: 0,
      conversionRate: 0,
      message,
    };

    setCampaigns((current) => [next, ...current]);
    setShowForm(false);
  }

  const campaignColumns: ColumnDef<MarketingCampaign>[] = [
    {
      header: 'Campaign',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.title}</p>
          <p className="mt-1 max-w-[360px] text-xs leading-5 text-slate-500">{row.original.objective}</p>
        </div>
      ),
    },
    { header: 'Channel', cell: ({ row }) => <Badge variant="muted">{marketingChannelLabels[row.original.channel]}</Badge> },
    { header: 'Audience', cell: ({ row }) => <Badge variant="gold">{marketingAudienceLabels[row.original.audience]}</Badge> },
    { header: 'Budget', cell: ({ row }) => <span className="font-bold text-slate-800">{formatMarketingMoney(row.original.budget)}</span> },
    {
      header: 'Performance',
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-slate-800">{row.original.leadsGenerated} leads</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.viewingsBooked} viewings • {row.original.conversionRate}%</p>
        </div>
      ),
    },
    { header: 'Owner', accessorKey: 'owner' },
    { header: 'Status', cell: ({ row }) => <Badge variant={marketingStatusTone[row.original.status]}>{marketingStatusLabels[row.original.status]}</Badge> },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateCampaignStatus(row.original.id, event.target.value as MarketingStatus)}>
          {statuses.map((option) => <option key={option} value={option}>{marketingStatusLabels[option]}</option>)}
        </select>
      ),
    },
  ];

  const assetColumns: ColumnDef<MarketingAsset>[] = [
    { header: 'Asset', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.title}</p><p className="mt-1 text-xs text-slate-500">{row.original.campaignTitle}</p></div> },
    { header: 'Format', accessorKey: 'format' },
    { header: 'Platform', accessorKey: 'platform' },
    { header: 'Owner', accessorKey: 'owner' },
    { header: 'Due date', accessorKey: 'dueDate' },
    { header: 'Status', cell: ({ row }) => <Badge variant={assetStatusTone[row.original.status]}>{assetStatusLabels[row.original.status]}</Badge> },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateAssetStatus(row.original.id, event.target.value as AssetStatus)}>
          {assetStatuses.map((option) => <option key={option} value={option}>{assetStatusLabels[option]}</option>)}
        </select>
      ),
    },
  ];

  const activeCampaigns = campaigns.filter((campaign) => campaign.status === 'active').length;
  const totalLeads = campaigns.reduce((sum, campaign) => sum + campaign.leadsGenerated, 0);
  const totalViewings = campaigns.reduce((sum, campaign) => sum + campaign.viewingsBooked, 0);
  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const conversion = totalLeads ? Math.round((totalViewings / totalLeads) * 100) : 0;

  const titleText = role === 'developer' ? 'Developer Marketing Campaign Studio' : role === 'super-admin' ? 'Platform Marketing Overview' : 'Marketing Campaign Studio';
  const description = role === 'agent'
    ? 'Plan property campaigns, track message assets and see which campaigns are producing leads you can actually convert.'
    : role === 'developer'
      ? 'Package development projects into structured investor campaigns, unit reservation pushes and off-plan sales follow-ups.'
      : 'Control real estate campaigns across WhatsApp, email, SMS, social channels, portals and offline outreach.';

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{titleText}</h1>
          <p className="mt-2 max-w-3xl text-slate-500">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary"><Send className="h-4 w-4" /> Integration-ready send</Button>
          <Button variant="gold" onClick={() => setShowForm((current) => !current)}><Plus className="h-4 w-4" /> New campaign</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active campaigns" value={String(activeCampaigns)} change="Currently pushing property demand" icon={Megaphone} />
        <StatCard label="Leads generated" value={String(totalLeads)} change={`${totalViewings} viewings booked`} icon={UsersRound} />
        <StatCard label="Campaign budget" value={formatMarketingMoney(totalBudget)} change="Recorded planned spend" icon={Target} />
        <StatCard label="Lead-to-viewing" value={`${conversion}%`} change="Weak campaigns die here" icon={BarChart3} />
      </div>

      <Card className="border-emerald-200 bg-emerald-50">
        <CardContent className="p-4 text-sm leading-6 text-emerald-950">
          <span className="font-black">Important:</span> this module records and prepares campaigns. Real WhatsApp, SMS and email sending should only be activated after API keys, sender compliance, opt-in records and unsubscribe handling are configured.
        </CardContent>
      </Card>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create campaign</CardTitle>
            <CardDescription>Force every campaign to have an audience, objective, budget and measurable conversion target.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Campaign title" />
              <Input value={owner} onChange={(event) => setOwner(event.target.value)} placeholder="Owner" />
              <Select value={channel} onChange={(event) => setChannel(event.target.value as MarketingChannel)}>{channels.map((option) => <option key={option} value={option}>{marketingChannelLabels[option]}</option>)}</Select>
              <Select value={audience} onChange={(event) => setAudience(event.target.value as MarketingAudience)}>{audiences.map((option) => <option key={option} value={option}>{marketingAudienceLabels[option]}</option>)}</Select>
              <Input value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="Budget" inputMode="numeric" />
              <Input value={relatedProperty} onChange={(event) => setRelatedProperty(event.target.value)} placeholder="Related property/project" />
            </div>
            <Textarea value={objective} onChange={(event) => setObjective(event.target.value)} placeholder="Campaign objective" />
            <Textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Campaign message" />
            <Button onClick={addCampaign}><Plus className="h-4 w-4" /> Save campaign</Button>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap gap-2">
        {[
          ['campaigns', 'Campaigns'],
          ['assets', 'Creative assets'],
          ['planner', 'Planner'],
        ].map(([value, label]) => <Button key={value} variant={activeView === value ? 'default' : 'outline'} size="sm" onClick={() => setActiveView(value as typeof activeView)}>{label}</Button>)}
      </div>

      {activeView === 'campaigns' && (
        <div className="space-y-4">
          <Card>
            <CardContent className="grid gap-3 p-4 md:grid-cols-2 lg:grid-cols-4">
              <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'all' | MarketingStatus)}>
                <option value="all">All statuses</option>
                {statuses.map((option) => <option key={option} value={option}>{marketingStatusLabels[option]}</option>)}
              </Select>
              <Select value={channelFilter} onChange={(event) => setChannelFilter(event.target.value as 'all' | MarketingChannel)}>
                <option value="all">All channels</option>
                {channels.map((option) => <option key={option} value={option}>{marketingChannelLabels[option]}</option>)}
              </Select>
              <Button variant="secondary"><Filter className="h-4 w-4" /> Apply filters</Button>
            </CardContent>
          </Card>
          <SimpleDataTable data={filteredCampaigns} columns={campaignColumns} searchPlaceholder="Search campaigns..." />
        </div>
      )}

      {activeView === 'assets' && <SimpleDataTable data={assets} columns={assetColumns} searchPlaceholder="Search creative assets..." />}

      {activeView === 'planner' && (
        <div className="grid gap-6 lg:grid-cols-3">
          {campaigns.slice(0, 3).map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle>{campaign.title}</CardTitle>
                  <Badge variant={marketingStatusTone[campaign.status]}>{marketingStatusLabels[campaign.status]}</Badge>
                </div>
                <CardDescription>{campaign.startDate} to {campaign.endDate}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">{campaign.relatedProperty}</p>
                <p>{campaign.message}</p>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><CalendarDays className="h-4 w-4" /> Asset deadline must beat launch date. Do not launch empty.</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
