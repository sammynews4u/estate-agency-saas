'use client';

import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { GitBranch, Handshake, Network, Plus, TrendingUp, WalletCards } from 'lucide-react';
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
  calculateExpectedCommission,
  demoReferrals,
  formatReferralMoney,
  referralStatusLabels,
  referralStatusTone,
  referralTypeLabels,
  type ReferralRecord,
  type ReferralStatus,
  type ReferralType,
} from '@/lib/referral-data';

type Props = {
  role: 'agency' | 'agent';
};

const referralStatuses: ReferralStatus[] = ['pending', 'accepted', 'rejected', 'converted', 'paid'];
const referralTypes: ReferralType[] = ['buyer_lead', 'seller_lead', 'landlord_lead', 'tenant_lead', 'property_listing', 'service_request'];

export function ReferralNetworkWorkspace({ role }: Props) {
  const [referrals, setReferrals] = useState<ReferralRecord[]>(role === 'agent' ? demoReferrals.filter((referral) => referral.referringParty === 'Nneka Ibe' || referral.receivingParty === 'Nneka Ibe') : demoReferrals);
  const [status, setStatus] = useState<'all' | ReferralStatus>('all');
  const [showForm, setShowForm] = useState(false);
  const [referralType, setReferralType] = useState<ReferralType>('buyer_lead');
  const [referringParty, setReferringParty] = useState(role === 'agent' ? 'Nneka Ibe' : 'EstateFlow Demo Agency');
  const [receivingParty, setReceivingParty] = useState('Partner Agent / Agency');
  const [clientName, setClientName] = useState('New Referral Client');
  const [clientPhone, setClientPhone] = useState('+234 800 000 0000');
  const [propertyTitle, setPropertyTitle] = useState('Matching property or lead request');
  const [location, setLocation] = useState('Lekki, Lagos');
  const [dealValue, setDealValue] = useState('150000000');
  const [commissionShare, setCommissionShare] = useState('20');
  const [notes, setNotes] = useState('Referral terms must be confirmed before client handover. Record verbal agreements immediately to avoid commission disputes.');

  const filtered = useMemo(() => referrals.filter((referral) => status === 'all' || referral.status === status), [referrals, status]);

  function updateStatus(id: string, nextStatus: ReferralStatus) {
    setReferrals((current) => current.map((referral) => (referral.id === id ? { ...referral, status: nextStatus, lastUpdated: '2026-06-05' } : referral)));
  }

  function createReferral() {
    const numericDealValue = Number(dealValue) || 0;
    const numericCommissionShare = Number(commissionShare) || 0;
    const next: ReferralRecord = {
      id: `ref_${Date.now()}`,
      referralCode: `REF-2026-${String(referrals.length + 1).padStart(3, '0')}`,
      referralType,
      status: 'pending',
      referringParty,
      receivingParty,
      clientName,
      clientPhone,
      propertyTitle,
      location,
      dealValue: numericDealValue,
      commissionShare: numericCommissionShare,
      expectedCommission: calculateExpectedCommission(numericDealValue, numericCommissionShare),
      createdAt: '2026-06-05',
      lastUpdated: '2026-06-05',
      notes,
    };

    setReferrals((current) => [next, ...current]);
    setShowForm(false);
  }

  const columns: ColumnDef<ReferralRecord>[] = [
    {
      header: 'Referral',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.referralCode}</p>
          <p className="mt-1 text-xs text-slate-500">{referralTypeLabels[row.original.referralType]}</p>
        </div>
      ),
    },
    {
      header: 'Parties',
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-slate-800">{row.original.referringParty}</p>
          <p className="mt-1 text-xs text-slate-500">to {row.original.receivingParty}</p>
        </div>
      ),
    },
    {
      header: 'Client / Property',
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-slate-800">{row.original.clientName}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.propertyTitle} • {row.original.location}</p>
        </div>
      ),
    },
    {
      header: 'Deal value',
      cell: ({ row }) => <span className="font-bold text-slate-950">{formatReferralMoney(row.original.dealValue)}</span>,
    },
    {
      header: 'Share',
      cell: ({ row }) => <Badge variant="gold">{row.original.commissionShare}%</Badge>,
    },
    {
      header: 'Expected commission',
      cell: ({ row }) => <span className="font-bold text-emerald-700">{formatReferralMoney(row.original.expectedCommission)}</span>,
    },
    {
      header: 'Status',
      cell: ({ row }) => <Badge variant={referralStatusTone[row.original.status]}>{referralStatusLabels[row.original.status]}</Badge>,
    },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateStatus(row.original.id, event.target.value as ReferralStatus)}>
          {referralStatuses.map((option) => <option key={option} value={option}>{referralStatusLabels[option]}</option>)}
        </select>
      ),
    },
  ];

  const totalPipeline = referrals.reduce((sum, referral) => sum + referral.dealValue, 0);
  const expectedCommission = referrals.reduce((sum, referral) => sum + referral.expectedCommission, 0);
  const convertedCount = referrals.filter((referral) => referral.status === 'converted' || referral.status === 'paid').length;
  const pendingCount = referrals.filter((referral) => referral.status === 'pending').length;

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Referral Network</h1>
          <p className="mt-2 max-w-3xl text-slate-500">Track agent-to-agent, agency-to-agency and service referrals with commission terms, client handover notes and conversion status.</p>
        </div>
        <Button variant="gold" onClick={() => setShowForm((current) => !current)}><Plus className="h-4 w-4" /> New referral</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Referral pipeline" value={formatReferralMoney(totalPipeline)} change="Total deal value tracked" icon={Network} />
        <StatCard label="Expected commission" value={formatReferralMoney(expectedCommission)} change="Before final settlement" icon={WalletCards} />
        <StatCard label="Converted/paid" value={String(convertedCount)} change="Proof the network is producing" icon={TrendingUp} />
        <StatCard label="Pending handovers" value={String(pendingCount)} change="Follow up before they decay" icon={Handshake} />
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create referral record</CardTitle>
            <CardDescription>Referrals become a mess when commission terms live only in WhatsApp. Record the split before the handover.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Select value={referralType} onChange={(event) => setReferralType(event.target.value as ReferralType)}>
                {referralTypes.map((option) => <option key={option} value={option}>{referralTypeLabels[option]}</option>)}
              </Select>
              <Input value={referringParty} onChange={(event) => setReferringParty(event.target.value)} placeholder="Referring party" />
              <Input value={receivingParty} onChange={(event) => setReceivingParty(event.target.value)} placeholder="Receiving party" />
              <Input value={clientName} onChange={(event) => setClientName(event.target.value)} placeholder="Client name" />
              <Input value={clientPhone} onChange={(event) => setClientPhone(event.target.value)} placeholder="Client phone" />
              <Input value={propertyTitle} onChange={(event) => setPropertyTitle(event.target.value)} placeholder="Property or lead request" />
              <Input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Location" />
              <Input value={dealValue} onChange={(event) => setDealValue(event.target.value)} placeholder="Deal value" />
              <Input value={commissionShare} onChange={(event) => setCommissionShare(event.target.value)} placeholder="Commission share %" />
            </div>
            <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} />
            <div className="flex flex-wrap gap-3">
              <Button onClick={createReferral}><GitBranch className="h-4 w-4" /> Save referral</Button>
              <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2">
        <Select value={status} onChange={(event) => setStatus(event.target.value as typeof status)}>
          <option value="all">All referral statuses</option>
          {referralStatuses.map((option) => <option key={option} value={option}>{referralStatusLabels[option]}</option>)}
        </Select>
        <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">Network effect only works when trust is operationalised. Track who brought the lead, who handled it and who gets paid.</div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Referral records</CardTitle>
          <CardDescription>Use this as the source of truth for handovers, commission shares and referral performance.</CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleDataTable data={filtered} columns={columns} searchPlaceholder="Search referrals..." />
        </CardContent>
      </Card>
    </div>
  );
}
