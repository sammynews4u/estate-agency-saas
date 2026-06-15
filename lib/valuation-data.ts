import { formatMoney } from '@/lib/billing-data';

export type ValuationStatus = 'draft' | 'under_review' | 'approved' | 'sent' | 'archived';
export type DemandLevel = 'low' | 'moderate' | 'high' | 'very_high';
export type PropertyCondition = 'newly_built' | 'excellent' | 'good' | 'needs_renovation' | 'distressed';

export type ValuationComparable = {
  id: string;
  title: string;
  location: string;
  propertyType: string;
  price: number;
  size: string;
  bedrooms: number;
  soldOrListedAt: string;
  similarityScore: number;
};

export type ValuationReport = {
  id: string;
  reportNumber: string;
  propertyTitle: string;
  propertyType: string;
  location: string;
  clientName: string;
  preparedBy: string;
  estimatedValue: number;
  lowEstimate: number;
  highEstimate: number;
  recommendedListingPrice: number;
  confidenceScore: number;
  demandLevel: DemandLevel;
  condition: PropertyCondition;
  status: ValuationStatus;
  createdAt: string;
  notes: string;
  comparables: ValuationComparable[];
};

export const valuationStatusLabels: Record<ValuationStatus, string> = {
  draft: 'Draft',
  under_review: 'Under review',
  approved: 'Approved',
  sent: 'Sent',
  archived: 'Archived',
};

export const demandLevelLabels: Record<DemandLevel, string> = {
  low: 'Low demand',
  moderate: 'Moderate demand',
  high: 'High demand',
  very_high: 'Very high demand',
};

export const propertyConditionLabels: Record<PropertyCondition, string> = {
  newly_built: 'Newly built',
  excellent: 'Excellent',
  good: 'Good',
  needs_renovation: 'Needs renovation',
  distressed: 'Distressed',
};

export function calculateValuation(params: {
  baseComparablePrice: number;
  condition: PropertyCondition;
  demandLevel: DemandLevel;
  landSizeScore: number;
}) {
  const conditionMultiplier: Record<PropertyCondition, number> = {
    newly_built: 1.16,
    excellent: 1.1,
    good: 1,
    needs_renovation: 0.88,
    distressed: 0.74,
  };

  const demandMultiplier: Record<DemandLevel, number> = {
    low: 0.92,
    moderate: 1,
    high: 1.08,
    very_high: 1.16,
  };

  const sizeMultiplier = Math.min(Math.max(params.landSizeScore / 500, 0.82), 1.24);
  const estimatedValue = Math.round(params.baseComparablePrice * conditionMultiplier[params.condition] * demandMultiplier[params.demandLevel] * sizeMultiplier);
  const confidenceScore = Math.round(Math.min(94, Math.max(58, 72 + (params.demandLevel === 'very_high' ? 8 : 0) + (params.condition === 'newly_built' ? 6 : 0))));

  return {
    estimatedValue,
    lowEstimate: Math.round(estimatedValue * 0.92),
    highEstimate: Math.round(estimatedValue * 1.08),
    recommendedListingPrice: Math.round(estimatedValue * 1.035),
    confidenceScore,
  };
}

export function formatValuationMoney(value: number) {
  return formatMoney(value);
}

export const demoValuationReports: ValuationReport[] = [
  {
    id: 'val_001',
    reportNumber: 'VAL-2026-001',
    propertyTitle: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
    propertyType: 'House',
    location: 'Lekki Phase 1, Lagos',
    clientName: 'Mr. Chinedu Obi',
    preparedBy: 'Nneka Ibe',
    estimatedValue: 438000000,
    lowEstimate: 405000000,
    highEstimate: 472000000,
    recommendedListingPrice: 450000000,
    confidenceScore: 86,
    demandLevel: 'high',
    condition: 'newly_built',
    status: 'approved',
    createdAt: '2026-06-02',
    notes: 'Premium finish, secure estate, clear title and demand from family buyers support a strong listing price.',
    comparables: [
      { id: 'comp_001', title: '5-Bedroom Detached Duplex', location: 'Lekki Phase 1', propertyType: 'House', price: 430000000, size: '550 sqm', bedrooms: 5, soldOrListedAt: '2026-05-12', similarityScore: 91 },
      { id: 'comp_002', title: 'Smart 5-Bedroom Duplex with BQ', location: 'Lekki Phase 1', propertyType: 'House', price: 465000000, size: '600 sqm', bedrooms: 5, soldOrListedAt: '2026-05-18', similarityScore: 88 },
      { id: 'comp_003', title: 'Luxury Detached Duplex', location: 'Oniru', propertyType: 'House', price: 410000000, size: '500 sqm', bedrooms: 5, soldOrListedAt: '2026-04-30', similarityScore: 79 },
    ],
  },
  {
    id: 'val_002',
    reportNumber: 'VAL-2026-002',
    propertyTitle: 'Dry Land Measuring 900sqm in Sangotedo',
    propertyType: 'Land',
    location: 'Sangotedo, Lagos',
    clientName: 'Mrs. Halima Musa',
    preparedBy: 'Seyi Adewale',
    estimatedValue: 83000000,
    lowEstimate: 76000000,
    highEstimate: 91000000,
    recommendedListingPrice: 85000000,
    confidenceScore: 78,
    demandLevel: 'moderate',
    condition: 'good',
    status: 'under_review',
    createdAt: '2026-06-03',
    notes: 'Dry land status and road access are positive, but title verification must be completed before aggressive pricing.',
    comparables: [
      { id: 'comp_004', title: 'Dry Land 900sqm', location: 'Sangotedo', propertyType: 'Land', price: 80000000, size: '900 sqm', bedrooms: 0, soldOrListedAt: '2026-05-20', similarityScore: 93 },
      { id: 'comp_005', title: 'Residential Plot', location: 'Ajah', propertyType: 'Land', price: 72500000, size: '800 sqm', bedrooms: 0, soldOrListedAt: '2026-05-04', similarityScore: 75 },
    ],
  },
  {
    id: 'val_003',
    reportNumber: 'VAL-2026-003',
    propertyTitle: 'Commercial Office Floor in Victoria Island',
    propertyType: 'Office',
    location: 'Victoria Island, Lagos',
    clientName: 'Tola Martins',
    preparedBy: 'Nneka Ibe',
    estimatedValue: 62500000,
    lowEstimate: 58500000,
    highEstimate: 69000000,
    recommendedListingPrice: 65000000,
    confidenceScore: 82,
    demandLevel: 'high',
    condition: 'good',
    status: 'sent',
    createdAt: '2026-06-01',
    notes: 'Corporate demand is stable, but shell-and-core condition limits the rental premium until fit-out terms are clarified.',
    comparables: [
      { id: 'comp_006', title: 'Open Plan Office Floor', location: 'Victoria Island', propertyType: 'Office', price: 60000000, size: '690 sqm', bedrooms: 0, soldOrListedAt: '2026-05-15', similarityScore: 87 },
      { id: 'comp_007', title: 'Grade B Commercial Floor', location: 'Ikoyi', propertyType: 'Office', price: 70000000, size: '750 sqm', bedrooms: 0, soldOrListedAt: '2026-05-21', similarityScore: 74 },
    ],
  },
];
