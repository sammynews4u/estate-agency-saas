export type MarketingChannel = 'whatsapp' | 'email' | 'sms' | 'social' | 'portal' | 'offline';
export type MarketingStatus = 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
export type MarketingAudience = 'buyers' | 'tenants' | 'landlords' | 'sellers' | 'investors' | 'developers';
export type AssetStatus = 'briefed' | 'in_design' | 'approved' | 'published';

export type MarketingCampaign = {
  id: string;
  title: string;
  objective: string;
  channel: MarketingChannel;
  audience: MarketingAudience;
  budget: number;
  owner: string;
  startDate: string;
  endDate: string;
  relatedProperty: string;
  status: MarketingStatus;
  leadsGenerated: number;
  viewingsBooked: number;
  conversionRate: number;
  message: string;
};

export type MarketingAsset = {
  id: string;
  title: string;
  campaignTitle: string;
  format: string;
  platform: string;
  owner: string;
  dueDate: string;
  status: AssetStatus;
};

export const marketingChannelLabels: Record<MarketingChannel, string> = {
  whatsapp: 'WhatsApp',
  email: 'Email',
  sms: 'SMS',
  social: 'Social media',
  portal: 'Property portal',
  offline: 'Offline',
};

export const marketingAudienceLabels: Record<MarketingAudience, string> = {
  buyers: 'Buyers',
  tenants: 'Tenants',
  landlords: 'Landlords',
  sellers: 'Sellers',
  investors: 'Investors',
  developers: 'Developers',
};

export const marketingStatusLabels: Record<MarketingStatus, string> = {
  draft: 'Draft',
  scheduled: 'Scheduled',
  active: 'Active',
  paused: 'Paused',
  completed: 'Completed',
};

export const marketingStatusTone: Record<MarketingStatus, 'muted' | 'warning' | 'success' | 'danger' | 'gold'> = {
  draft: 'muted',
  scheduled: 'gold',
  active: 'success',
  paused: 'warning',
  completed: 'muted',
};

export const assetStatusLabels: Record<AssetStatus, string> = {
  briefed: 'Briefed',
  in_design: 'In design',
  approved: 'Approved',
  published: 'Published',
};

export const assetStatusTone: Record<AssetStatus, 'muted' | 'warning' | 'success' | 'gold'> = {
  briefed: 'muted',
  in_design: 'warning',
  approved: 'gold',
  published: 'success',
};

export function formatMarketingMoney(value: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value);
}

export const demoMarketingCampaigns: MarketingCampaign[] = [
  {
    id: 'mkt_001',
    title: 'Lekki Premium Buyer Push',
    objective: 'Generate qualified buyer inquiries for premium Lekki terrace listings.',
    channel: 'whatsapp',
    audience: 'buyers',
    budget: 180000,
    owner: 'Nneka Ibe',
    startDate: '2026-06-05',
    endDate: '2026-06-18',
    relatedProperty: '4-Bedroom Terrace Duplex, Chevron',
    status: 'active',
    leadsGenerated: 46,
    viewingsBooked: 12,
    conversionRate: 26,
    message: 'Exclusive 4-bedroom terrace duplex in Chevron with clean title and flexible viewing windows.',
  },
  {
    id: 'mkt_002',
    title: 'Landlord Sole Mandate Campaign',
    objective: 'Convince landlords and sellers to submit properties for exclusive agency management.',
    channel: 'email',
    audience: 'landlords',
    budget: 75000,
    owner: 'Agency Growth Desk',
    startDate: '2026-06-08',
    endDate: '2026-06-30',
    relatedProperty: 'Agency mandate pipeline',
    status: 'scheduled',
    leadsGenerated: 18,
    viewingsBooked: 0,
    conversionRate: 11,
    message: 'Your property deserves structured marketing, verified tenants and transparent reporting.',
  },
  {
    id: 'mkt_003',
    title: 'Ikoyi Corporate Rental Drive',
    objective: 'Attract relocation managers and executive tenants for serviced apartments.',
    channel: 'social',
    audience: 'tenants',
    budget: 240000,
    owner: 'Seyi Adewale',
    startDate: '2026-05-24',
    endDate: '2026-06-12',
    relatedProperty: 'Serviced 3-Bedroom Apartment, Ikoyi',
    status: 'active',
    leadsGenerated: 63,
    viewingsBooked: 19,
    conversionRate: 30,
    message: 'Move into a fully serviced executive apartment in Ikoyi with secure parking and power backup.',
  },
  {
    id: 'mkt_004',
    title: 'Off-Plan Investor Briefing',
    objective: 'Warm up investors for developer project unit reservations.',
    channel: 'portal',
    audience: 'investors',
    budget: 310000,
    owner: 'Developer Sales Team',
    startDate: '2026-06-01',
    endDate: '2026-07-01',
    relatedProperty: 'Victoria Island Residences Phase II',
    status: 'paused',
    leadsGenerated: 27,
    viewingsBooked: 5,
    conversionRate: 19,
    message: 'Secure off-plan units with staged payments, documented progress and projected rental yield.',
  },
];

export const demoMarketingAssets: MarketingAsset[] = [
  {
    id: 'asset_001',
    title: 'WhatsApp buyer broadcast copy',
    campaignTitle: 'Lekki Premium Buyer Push',
    format: 'Short copy',
    platform: 'WhatsApp',
    owner: 'Nneka Ibe',
    dueDate: '2026-06-06',
    status: 'approved',
  },
  {
    id: 'asset_002',
    title: '30-second apartment reel',
    campaignTitle: 'Ikoyi Corporate Rental Drive',
    format: 'Video',
    platform: 'Instagram / TikTok',
    owner: 'Creative Desk',
    dueDate: '2026-06-07',
    status: 'in_design',
  },
  {
    id: 'asset_003',
    title: 'Landlord email sequence',
    campaignTitle: 'Landlord Sole Mandate Campaign',
    format: 'Email sequence',
    platform: 'Email',
    owner: 'Agency Growth Desk',
    dueDate: '2026-06-09',
    status: 'briefed',
  },
  {
    id: 'asset_004',
    title: 'Investor one-page project card',
    campaignTitle: 'Off-Plan Investor Briefing',
    format: 'PDF / image card',
    platform: 'Portal / WhatsApp',
    owner: 'Developer Sales Team',
    dueDate: '2026-06-10',
    status: 'published',
  },
];
