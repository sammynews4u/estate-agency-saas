export type ReferralType = 'buyer_lead' | 'seller_lead' | 'landlord_lead' | 'tenant_lead' | 'property_listing' | 'service_request';
export type ReferralStatus = 'pending' | 'accepted' | 'rejected' | 'converted' | 'paid';

export type ReferralRecord = {
  id: string;
  referralCode: string;
  referralType: ReferralType;
  status: ReferralStatus;
  referringParty: string;
  receivingParty: string;
  clientName: string;
  clientPhone: string;
  propertyTitle: string;
  location: string;
  dealValue: number;
  commissionShare: number;
  expectedCommission: number;
  createdAt: string;
  lastUpdated: string;
  notes: string;
};

export const referralTypeLabels: Record<ReferralType, string> = {
  buyer_lead: 'Buyer lead',
  seller_lead: 'Seller lead',
  landlord_lead: 'Landlord lead',
  tenant_lead: 'Tenant lead',
  property_listing: 'Property listing',
  service_request: 'Service request',
};

export const referralStatusLabels: Record<ReferralStatus, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  rejected: 'Rejected',
  converted: 'Converted',
  paid: 'Paid',
};

export const referralStatusTone: Record<ReferralStatus, 'muted' | 'warning' | 'danger' | 'success' | 'gold'> = {
  pending: 'warning',
  accepted: 'gold',
  rejected: 'danger',
  converted: 'success',
  paid: 'success',
};

export function formatReferralMoney(value: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value);
}

export function calculateExpectedCommission(dealValue: number, commissionShare: number) {
  return Math.round((dealValue * commissionShare) / 100);
}

export const demoReferrals: ReferralRecord[] = [
  {
    id: 'ref_001',
    referralCode: 'REF-2026-001',
    referralType: 'buyer_lead',
    status: 'accepted',
    referringParty: 'Nneka Ibe',
    receivingParty: 'Seyi Adewale',
    clientName: 'Dr. Ifeoma Nwosu',
    clientPhone: '+234 803 445 1122',
    propertyTitle: 'Luxury 5-Bedroom Detached Duplex',
    location: 'Lekki Phase 1, Lagos',
    dealValue: 450000000,
    commissionShare: 25,
    expectedCommission: 112500000,
    createdAt: '2026-06-02',
    lastUpdated: '2026-06-04',
    notes: 'Client wants a secure estate and can close within 45 days if title is clean.',
  },
  {
    id: 'ref_002',
    referralCode: 'REF-2026-002',
    referralType: 'landlord_lead',
    status: 'pending',
    referringParty: 'Prime Nest Realty',
    receivingParty: 'EstateFlow Demo Agency',
    clientName: 'Mr. Tunde Balogun',
    clientPhone: '+234 805 901 3344',
    propertyTitle: '12 Units Serviced Apartments',
    location: 'Oniru, Lagos',
    dealValue: 180000000,
    commissionShare: 20,
    expectedCommission: 36000000,
    createdAt: '2026-06-03',
    lastUpdated: '2026-06-03',
    notes: 'Landlord needs corporate tenants and expects monthly occupancy updates.',
  },
  {
    id: 'ref_003',
    referralCode: 'REF-2026-003',
    referralType: 'property_listing',
    status: 'converted',
    referringParty: 'Seyi Adewale',
    receivingParty: 'Nneka Ibe',
    clientName: 'Mrs. Halima Musa',
    clientPhone: '+234 802 778 1900',
    propertyTitle: 'Dry Land Measuring 900sqm',
    location: 'Sangotedo, Lagos',
    dealValue: 85000000,
    commissionShare: 30,
    expectedCommission: 25500000,
    createdAt: '2026-05-30',
    lastUpdated: '2026-06-04',
    notes: 'Listing converted after valuation report. Buyer inspection booked.',
  },
  {
    id: 'ref_004',
    referralCode: 'REF-2026-004',
    referralType: 'service_request',
    status: 'paid',
    referringParty: 'EstateFlow Demo Agency',
    receivingParty: 'Apex Survey & Valuation',
    clientName: 'Tola Martins',
    clientPhone: '+234 809 777 9988',
    propertyTitle: 'Commercial Office Floor',
    location: 'Victoria Island, Lagos',
    dealValue: 2500000,
    commissionShare: 10,
    expectedCommission: 250000,
    createdAt: '2026-05-27',
    lastUpdated: '2026-06-01',
    notes: 'Survey service completed and commission marked as paid.',
  },
];
