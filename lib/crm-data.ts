export type ClientType = 'buyer' | 'seller' | 'landlord' | 'tenant' | 'investor' | 'developer';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'viewing_booked' | 'negotiating' | 'won' | 'lost' | 'dormant';

export type ClientRecord = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  type: ClientType;
  budgetMin: number;
  budgetMax: number;
  preferredLocation: string;
  propertyPreference: string;
  timeline: string;
  leadSource: string;
  status: LeadStatus;
  assignedAgent: string;
  lastContacted: string;
  nextFollowUp: string;
  tags: string[];
  notes: string;
};

export type LeadRecord = {
  id: string;
  clientName: string;
  clientType: ClientType;
  interest: string;
  propertyId?: string;
  propertyTitle?: string;
  source: string;
  status: LeadStatus;
  assignedAgent: string;
  valueEstimate: number;
  createdAt: string;
  nextAction: string;
  nextFollowUp: string;
};

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  viewing_booked: 'Viewing booked',
  negotiating: 'Negotiating',
  won: 'Won',
  lost: 'Lost',
  dormant: 'Dormant',
};

export const demoClients: ClientRecord[] = [
  {
    id: 'cl_001',
    fullName: 'Aisha Bello',
    email: 'aisha@example.com',
    phone: '+234 803 410 2211',
    type: 'buyer',
    budgetMin: 180000000,
    budgetMax: 500000000,
    preferredLocation: 'Lekki, Ikoyi, Victoria Island',
    propertyPreference: '4-5 bedroom detached or semi-detached house',
    timeline: '0-3 months',
    leadSource: 'Website inquiry',
    status: 'qualified',
    assignedAgent: 'Nneka Ibe',
    lastContacted: '2026-06-02',
    nextFollowUp: '2026-06-05',
    tags: ['High intent', 'Mortgage-ready', 'Family home'],
    notes: 'Needs secure estate, good road access, and clear title documents before inspection.',
  },
  {
    id: 'cl_002',
    fullName: 'Femi Adebayo',
    email: 'femi@example.com',
    phone: '+234 805 612 4433',
    type: 'tenant',
    budgetMin: 12000000,
    budgetMax: 22000000,
    preferredLocation: 'Ikoyi',
    propertyPreference: 'Serviced 3-bedroom apartment',
    timeline: 'Immediate',
    leadSource: 'WhatsApp campaign',
    status: 'viewing_booked',
    assignedAgent: 'Seyi Adewale',
    lastContacted: '2026-06-03',
    nextFollowUp: '2026-06-04',
    tags: ['Urgent rental', 'Corporate tenant'],
    notes: 'Prefers furnished apartment with generator, elevator and professional facility management.',
  },
  {
    id: 'cl_003',
    fullName: 'Mrs. Halima Musa',
    email: 'halima@example.com',
    phone: '+234 809 714 5501',
    type: 'investor',
    budgetMin: 70000000,
    budgetMax: 150000000,
    preferredLocation: 'Sangotedo, Ajah, Ibeju-Lekki',
    propertyPreference: 'Dry land or distressed sale property',
    timeline: '1-6 months',
    leadSource: 'Referral',
    status: 'contacted',
    assignedAgent: 'Nneka Ibe',
    lastContacted: '2026-05-31',
    nextFollowUp: '2026-06-06',
    tags: ['Investor', 'Land buyer'],
    notes: 'Wants strong resale potential and proof of ownership before commitment.',
  },
  {
    id: 'cl_004',
    fullName: 'Mr. Chinedu Obi',
    email: 'chinedu@example.com',
    phone: '+234 802 330 8844',
    type: 'landlord',
    budgetMin: 0,
    budgetMax: 0,
    preferredLocation: 'Lekki and Ajah',
    propertyPreference: 'Seller/landlord mandate owner',
    timeline: 'Ongoing',
    leadSource: 'Direct relationship',
    status: 'negotiating',
    assignedAgent: 'Seyi Adewale',
    lastContacted: '2026-06-01',
    nextFollowUp: '2026-06-07',
    tags: ['Owner', 'Multiple assets'],
    notes: 'Needs valuation support to justify listing price and speed up buyer confidence.',
  },
];

export const demoLeads: LeadRecord[] = [
  {
    id: 'lead_001',
    clientName: 'Aisha Bello',
    clientType: 'buyer',
    interest: 'Luxury family home in Lekki Phase 1',
    propertyId: 'prop_001',
    propertyTitle: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
    source: 'Website inquiry',
    status: 'qualified',
    assignedAgent: 'Nneka Ibe',
    valueEstimate: 450000000,
    createdAt: '2026-05-30',
    nextAction: 'Send title document checklist and book inspection',
    nextFollowUp: '2026-06-05',
  },
  {
    id: 'lead_002',
    clientName: 'Femi Adebayo',
    clientType: 'tenant',
    interest: 'Serviced apartment rental in Ikoyi',
    propertyId: 'prop_002',
    propertyTitle: 'Serviced 3-Bedroom Apartment in Ikoyi',
    source: 'WhatsApp campaign',
    status: 'viewing_booked',
    assignedAgent: 'Seyi Adewale',
    valueEstimate: 18000000,
    createdAt: '2026-06-01',
    nextAction: 'Confirm 4:00pm viewing and send access instructions',
    nextFollowUp: '2026-06-04',
  },
  {
    id: 'lead_003',
    clientName: 'Mrs. Halima Musa',
    clientType: 'investor',
    interest: 'Dry land with resale potential',
    propertyId: 'prop_004',
    propertyTitle: 'Dry Land Measuring 900sqm in Sangotedo',
    source: 'Referral',
    status: 'contacted',
    assignedAgent: 'Nneka Ibe',
    valueEstimate: 85000000,
    createdAt: '2026-05-31',
    nextAction: 'Share verification status and survey document summary',
    nextFollowUp: '2026-06-06',
  },
  {
    id: 'lead_004',
    clientName: 'Mr. Chinedu Obi',
    clientType: 'landlord',
    interest: 'Owner wants help selling premium duplex and land',
    propertyId: 'prop_001',
    propertyTitle: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
    source: 'Direct landlord',
    status: 'negotiating',
    assignedAgent: 'Seyi Adewale',
    valueEstimate: 535000000,
    createdAt: '2026-05-29',
    nextAction: 'Prepare seller valuation pitch and listing mandate',
    nextFollowUp: '2026-06-07',
  },
];

export function formatLeadValue(amount: number) {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);
}
