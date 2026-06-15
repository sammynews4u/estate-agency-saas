export type DiscoverySourceType = 'website' | 'social_media' | 'csv_import' | 'manual_entry' | 'public_feed' | 'partner_api';
export type DiscoveryStatus = 'new' | 'duplicate' | 'contacted' | 'verified' | 'converted' | 'rejected';
export type DuplicateSignal = 'same_title' | 'same_address' | 'same_phone' | 'similar_price' | 'similar_location' | 'similar_image';

export type DiscoverySource = {
  id: string;
  name: string;
  sourceType: DiscoverySourceType;
  url: string;
  status: 'active' | 'paused' | 'blocked';
  lastCheckedAt: string;
  discoveredCount: number;
  notes: string;
};

export type DiscoveredProperty = {
  id: string;
  title: string;
  propertyType: string;
  listingCategory: 'sale' | 'rent';
  location: string;
  price: number;
  ownerName: string;
  ownerPhone: string;
  sourceName: string;
  sourceUrl: string;
  sourceType: DiscoverySourceType;
  assignedAgent: string;
  status: DiscoveryStatus;
  duplicateSignals: DuplicateSignal[];
  confidenceScore: number;
  discoveredAt: string;
  notes: string;
};

export const discoverySourceTypeLabels: Record<DiscoverySourceType, string> = {
  website: 'Website',
  social_media: 'Social media',
  csv_import: 'CSV import',
  manual_entry: 'Manual entry',
  public_feed: 'Public feed',
  partner_api: 'Partner API',
};

export const discoveryStatusLabels: Record<DiscoveryStatus, string> = {
  new: 'New',
  duplicate: 'Duplicate',
  contacted: 'Contacted',
  verified: 'Verified',
  converted: 'Converted',
  rejected: 'Rejected',
};

export const discoveryStatusTone: Record<DiscoveryStatus, 'muted' | 'warning' | 'danger' | 'success' | 'gold'> = {
  new: 'warning',
  duplicate: 'danger',
  contacted: 'gold',
  verified: 'success',
  converted: 'success',
  rejected: 'muted',
};

export const duplicateSignalLabels: Record<DuplicateSignal, string> = {
  same_title: 'Same title',
  same_address: 'Same address',
  same_phone: 'Same phone',
  similar_price: 'Similar price',
  similar_location: 'Similar location',
  similar_image: 'Similar image',
};

export function formatDiscoveryMoney(value: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value);
}

export function detectDuplicateSignals(newLead: Pick<DiscoveredProperty, 'title' | 'location' | 'price' | 'ownerPhone'>, existing: DiscoveredProperty[]): DuplicateSignal[] {
  const signals = new Set<DuplicateSignal>();
  const normalizedTitle = newLead.title.toLowerCase().trim();
  const normalizedLocation = newLead.location.toLowerCase().trim();

  existing.forEach((property) => {
    if (property.title.toLowerCase().trim() === normalizedTitle) signals.add('same_title');
    if (property.location.toLowerCase().trim() === normalizedLocation) signals.add('similar_location');
    if (property.ownerPhone && property.ownerPhone === newLead.ownerPhone) signals.add('same_phone');
    const priceGap = Math.abs(property.price - newLead.price) / Math.max(property.price, newLead.price, 1);
    if (priceGap <= 0.08) signals.add('similar_price');
  });

  return Array.from(signals);
}

export const demoDiscoverySources: DiscoverySource[] = [
  {
    id: 'src_001',
    name: 'Manual Agent Submissions',
    sourceType: 'manual_entry',
    url: 'Internal manual entry',
    status: 'active',
    lastCheckedAt: '2026-06-04',
    discoveredCount: 16,
    notes: 'Properties entered by agents after calls, referrals and field scouting.',
  },
  {
    id: 'src_002',
    name: 'Approved Public Listing Feed',
    sourceType: 'public_feed',
    url: 'https://example.com/public-feed',
    status: 'active',
    lastCheckedAt: '2026-06-03',
    discoveredCount: 28,
    notes: 'Placeholder feed source. Replace with legal API or authorised public feed.',
  },
  {
    id: 'src_003',
    name: 'Instagram Lead Desk',
    sourceType: 'social_media',
    url: 'Manual social media capture',
    status: 'paused',
    lastCheckedAt: '2026-06-01',
    discoveredCount: 7,
    notes: 'Used for manual social media lead entry only. No automated scraping.',
  },
];

export const demoDiscoveredProperties: DiscoveredProperty[] = [
  {
    id: 'disc_001',
    title: 'Newly Built 4-Bedroom Terrace Duplex',
    propertyType: 'House',
    listingCategory: 'sale',
    location: 'Chevron, Lekki, Lagos',
    price: 260000000,
    ownerName: 'Mr. Kola Adeyemi',
    ownerPhone: '+234 806 111 2233',
    sourceName: 'Manual Agent Submissions',
    sourceUrl: 'Internal manual entry',
    sourceType: 'manual_entry',
    assignedAgent: 'Nneka Ibe',
    status: 'new',
    duplicateSignals: ['similar_location', 'similar_price'],
    confidenceScore: 74,
    discoveredAt: '2026-06-04',
    notes: 'Owner is open to sole mandate if valuation report supports asking price.',
  },
  {
    id: 'disc_002',
    title: 'Serviced 3-Bedroom Apartment for Corporate Tenant',
    propertyType: 'Apartment',
    listingCategory: 'rent',
    location: 'Ikoyi, Lagos',
    price: 18000000,
    ownerName: 'Mrs. Bisi Cole',
    ownerPhone: '+234 803 222 4411',
    sourceName: 'Instagram Lead Desk',
    sourceUrl: 'Manual social media capture',
    sourceType: 'social_media',
    assignedAgent: 'Seyi Adewale',
    status: 'contacted',
    duplicateSignals: [],
    confidenceScore: 81,
    discoveredAt: '2026-06-03',
    notes: 'Landlord requested professional tenant screening before viewing.',
  },
  {
    id: 'disc_003',
    title: 'Commercial Warehouse Near Expressway',
    propertyType: 'Warehouse',
    listingCategory: 'rent',
    location: 'Ikeja, Lagos',
    price: 55000000,
    ownerName: 'Apex Holdings',
    ownerPhone: '+234 809 445 6677',
    sourceName: 'Approved Public Listing Feed',
    sourceUrl: 'https://example.com/public-feed/warehouse-ikeja',
    sourceType: 'public_feed',
    assignedAgent: 'Nneka Ibe',
    status: 'verified',
    duplicateSignals: ['same_phone'],
    confidenceScore: 88,
    discoveredAt: '2026-06-02',
    notes: 'Potential fit for logistics clients. Verify loading bay dimensions.',
  },
  {
    id: 'disc_004',
    title: 'Dry Land 900sqm',
    propertyType: 'Land',
    listingCategory: 'sale',
    location: 'Sangotedo, Lagos',
    price: 85000000,
    ownerName: 'Mrs. Halima Musa',
    ownerPhone: '+234 802 778 1900',
    sourceName: 'Manual Agent Submissions',
    sourceUrl: 'Internal manual entry',
    sourceType: 'manual_entry',
    assignedAgent: 'Seyi Adewale',
    status: 'converted',
    duplicateSignals: ['same_title', 'same_phone', 'similar_price'],
    confidenceScore: 92,
    discoveredAt: '2026-05-30',
    notes: 'Converted to platform listing after title review and valuation.',
  },
];
