export type ServiceCategory = 'lawyer' | 'surveyor' | 'architect' | 'interior_designer' | 'photographer' | 'drone_operator' | 'valuer' | 'construction_consultant';
export type ProviderStatus = 'active' | 'pending_review' | 'suspended';
export type ServiceRequestStatus = 'new' | 'quoted' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'declined';

export interface ServiceProviderRecord {
  id: string;
  businessName: string;
  contactName: string;
  category: ServiceCategory;
  phone: string;
  email: string;
  location: string;
  pricingRange: string;
  availability: 'available' | 'busy' | 'unavailable';
  rating: number;
  completedJobs: number;
  portfolioCount: number;
  status: ProviderStatus;
}

export interface ServiceRequestRecord {
  id: string;
  serviceTitle: string;
  category: ServiceCategory;
  requesterName: string;
  relatedProperty: string;
  preferredDate: string;
  budget: number;
  providerName?: string;
  status: ServiceRequestStatus;
  notes: string;
}

export interface QuoteRecord {
  id: string;
  providerName: string;
  requestTitle: string;
  amount: number;
  timeline: string;
  submittedDate: string;
  status: QuoteStatus;
}

export interface PortfolioRecord {
  id: string;
  title: string;
  category: ServiceCategory;
  location: string;
  completionDate: string;
  mediaCount: number;
  description: string;
}

export interface ReviewRecord {
  id: string;
  reviewerName: string;
  property: string;
  rating: number;
  review: string;
  createdAt: string;
}

export const serviceCategoryLabels: Record<ServiceCategory, string> = {
  lawyer: 'Property lawyer',
  surveyor: 'Surveyor',
  architect: 'Architect',
  interior_designer: 'Interior designer',
  photographer: 'Property photographer',
  drone_operator: 'Drone operator',
  valuer: 'Property valuer',
  construction_consultant: 'Construction consultant',
};

export const serviceCategories: ServiceCategory[] = ['lawyer', 'surveyor', 'architect', 'interior_designer', 'photographer', 'drone_operator', 'valuer', 'construction_consultant'];

export const providerStatusLabels: Record<ProviderStatus, string> = {
  active: 'Active',
  pending_review: 'Pending review',
  suspended: 'Suspended',
};

export const providerStatusTone: Record<ProviderStatus, 'success' | 'warning' | 'danger'> = {
  active: 'success',
  pending_review: 'warning',
  suspended: 'danger',
};

export const serviceRequestStatusLabels: Record<ServiceRequestStatus, string> = {
  new: 'New',
  quoted: 'Quoted',
  accepted: 'Accepted',
  in_progress: 'In progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const serviceRequestStatusTone: Record<ServiceRequestStatus, 'default' | 'warning' | 'gold' | 'success' | 'muted' | 'danger'> = {
  new: 'default',
  quoted: 'warning',
  accepted: 'gold',
  in_progress: 'gold',
  completed: 'success',
  cancelled: 'danger',
};

export const quoteStatusLabels: Record<QuoteStatus, string> = {
  draft: 'Draft',
  sent: 'Sent',
  accepted: 'Accepted',
  declined: 'Declined',
};

export const quoteStatusTone: Record<QuoteStatus, 'muted' | 'warning' | 'success' | 'danger'> = {
  draft: 'muted',
  sent: 'warning',
  accepted: 'success',
  declined: 'danger',
};

export const serviceRequestStatuses: ServiceRequestStatus[] = ['new', 'quoted', 'accepted', 'in_progress', 'completed', 'cancelled'];
export const quoteStatuses: QuoteStatus[] = ['draft', 'sent', 'accepted', 'declined'];

export function formatServiceMoney(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export const demoServiceProviders: ServiceProviderRecord[] = [
  {
    id: 'sp_001',
    businessName: 'LexStone Property Law',
    contactName: 'Barr. Ifeoluwa Adeyemi',
    category: 'lawyer',
    phone: '+234 803 444 1902',
    email: 'hello@lexstone.example',
    location: 'Victoria Island, Lagos',
    pricingRange: '₦250k - ₦1.5m',
    availability: 'available',
    rating: 4.8,
    completedJobs: 42,
    portfolioCount: 6,
    status: 'active',
  },
  {
    id: 'sp_002',
    businessName: 'SkyGrid Drone Media',
    contactName: 'David Aina',
    category: 'drone_operator',
    phone: '+234 806 777 3010',
    email: 'bookings@skygrid.example',
    location: 'Lekki, Lagos',
    pricingRange: '₦120k - ₦500k',
    availability: 'busy',
    rating: 4.6,
    completedJobs: 71,
    portfolioCount: 18,
    status: 'active',
  },
  {
    id: 'sp_003',
    businessName: 'MeasuredLine Surveyors',
    contactName: 'Engr. Musa Bello',
    category: 'surveyor',
    phone: '+234 809 222 8844',
    email: 'office@measuredline.example',
    location: 'Ikeja, Lagos',
    pricingRange: '₦300k - ₦2m',
    availability: 'available',
    rating: 4.7,
    completedJobs: 58,
    portfolioCount: 9,
    status: 'pending_review',
  },
  {
    id: 'sp_004',
    businessName: 'NestCraft Interiors',
    contactName: 'Sade Williams',
    category: 'interior_designer',
    phone: '+234 805 212 4456',
    email: 'studio@nestcraft.example',
    location: 'Ikoyi, Lagos',
    pricingRange: '₦750k - ₦8m',
    availability: 'available',
    rating: 4.9,
    completedJobs: 33,
    portfolioCount: 14,
    status: 'active',
  },
];

export const demoServiceRequests: ServiceRequestRecord[] = [
  {
    id: 'sr_001',
    serviceTitle: 'Title document review for Lekki duplex',
    category: 'lawyer',
    requesterName: 'Mrs. Kemi Lawal',
    relatedProperty: 'Lekki Phase 1 Duplex',
    preferredDate: '2026-06-12',
    budget: 500000,
    providerName: 'LexStone Property Law',
    status: 'quoted',
    notes: 'Client wants verification before making deposit.',
  },
  {
    id: 'sr_002',
    serviceTitle: 'Drone shoot for waterfront listing',
    category: 'drone_operator',
    requesterName: 'Tola Martins',
    relatedProperty: 'Banana Island Waterfront Villa',
    preferredDate: '2026-06-15',
    budget: 350000,
    providerName: 'SkyGrid Drone Media',
    status: 'accepted',
    notes: 'Need 60-second video and 12 aerial stills.',
  },
  {
    id: 'sr_003',
    serviceTitle: 'Survey plan for commercial land',
    category: 'surveyor',
    requesterName: 'BlueGate Holdings',
    relatedProperty: 'Ibeju-Lekki Commercial Land',
    preferredDate: '2026-06-20',
    budget: 900000,
    status: 'new',
    notes: 'Surveyor must confirm access road and boundary points.',
  },
];

export const demoQuotes: QuoteRecord[] = [
  {
    id: 'quote_001',
    providerName: 'LexStone Property Law',
    requestTitle: 'Title document review for Lekki duplex',
    amount: 450000,
    timeline: '3 working days',
    submittedDate: '2026-06-04',
    status: 'sent',
  },
  {
    id: 'quote_002',
    providerName: 'SkyGrid Drone Media',
    requestTitle: 'Drone shoot for waterfront listing',
    amount: 320000,
    timeline: '48 hours after shoot',
    submittedDate: '2026-06-03',
    status: 'accepted',
  },
  {
    id: 'quote_003',
    providerName: 'NestCraft Interiors',
    requestTitle: 'Short-let staging consultation',
    amount: 750000,
    timeline: '1 week',
    submittedDate: '2026-06-02',
    status: 'draft',
  },
];

export const demoPortfolio: PortfolioRecord[] = [
  {
    id: 'portfolio_001',
    title: 'Premium aerial shoot for Ikoyi maisonette',
    category: 'drone_operator',
    location: 'Ikoyi, Lagos',
    completionDate: '2026-05-11',
    mediaCount: 24,
    description: 'Aerial and ground visuals used for a luxury sales campaign.',
  },
  {
    id: 'portfolio_002',
    title: 'Title verification for estate block sale',
    category: 'lawyer',
    location: 'Ajah, Lagos',
    completionDate: '2026-04-29',
    mediaCount: 3,
    description: 'Due diligence package for a multi-unit investor transaction.',
  },
  {
    id: 'portfolio_003',
    title: 'Modern furnishing concept for serviced apartment',
    category: 'interior_designer',
    location: 'Lekki, Lagos',
    completionDate: '2026-04-18',
    mediaCount: 31,
    description: 'Space planning, furniture sourcing and soft furnishing direction.',
  },
];

export const demoReviews: ReviewRecord[] = [
  {
    id: 'review_001',
    reviewerName: 'Tola Martins',
    property: 'Banana Island Waterfront Villa',
    rating: 5,
    review: 'Delivered clean drone footage quickly. Strong enough for premium listing campaigns.',
    createdAt: '2026-06-01',
  },
  {
    id: 'review_002',
    reviewerName: 'Mrs. Kemi Lawal',
    property: 'Lekki Phase 1 Duplex',
    rating: 5,
    review: 'The legal review was direct, clear and prevented a weak transaction decision.',
    createdAt: '2026-05-23',
  },
  {
    id: 'review_003',
    reviewerName: 'BlueGate Holdings',
    property: 'Ibeju-Lekki Commercial Land',
    rating: 4,
    review: 'Good communication and useful boundary clarification before negotiation.',
    createdAt: '2026-05-10',
  },
];
