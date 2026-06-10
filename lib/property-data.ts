export type ListingCategory = 'sale' | 'rent';
export type PropertyStatus = 'available' | 'sold' | 'reserved' | 'pending_verification' | 'under_review' | 'occupied' | 'vacant' | 'under_negotiation' | 'unavailable';

export type PropertyRecord = {
  id: string;
  title: string;
  description: string;
  propertyType: string;
  listingCategory: ListingCategory;
  price: number;
  currency: string;
  location: string;
  city: string;
  state: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  parkingSpaces: number;
  landSize: string;
  buildingSize: string;
  furnishingStatus: string;
  propertyCondition: string;
  yearBuilt: number;
  legalStatus: string;
  ownershipType: string;
  amenities: string[];
  media: string[];
  videoUrl?: string;
  floorPlanUrl?: string;
  virtualTourUrl?: string;
  assignedAgent: string;
  owner: string;
  source: string;
  dateListed: string;
  status: PropertyStatus;
  featured: boolean;
  verified: boolean;
};

export const propertyStatusLabels: Record<PropertyStatus, string> = {
  available: 'Available',
  sold: 'Sold',
  reserved: 'Reserved',
  pending_verification: 'Pending verification',
  under_review: 'Under review',
  occupied: 'Occupied',
  vacant: 'Vacant',
  under_negotiation: 'Under negotiation',
  unavailable: 'Unavailable',
};

export const demoProperties: PropertyRecord[] = [
  {
    id: 'prop_001',
    title: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
    description: 'Premium detached duplex with cinema room, fitted kitchen, BQ, swimming pool and smart-home readiness in a secure estate.',
    propertyType: 'House',
    listingCategory: 'sale',
    price: 450000000,
    currency: 'NGN',
    location: 'Lekki Phase 1',
    city: 'Lekki',
    state: 'Lagos',
    address: 'Admiralty Way, Lekki Phase 1',
    bedrooms: 5,
    bathrooms: 5,
    toilets: 6,
    parkingSpaces: 4,
    landSize: '600 sqm',
    buildingSize: '480 sqm',
    furnishingStatus: 'Semi-furnished',
    propertyCondition: 'Newly built',
    yearBuilt: 2025,
    legalStatus: 'Governor’s Consent',
    ownershipType: 'Freehold',
    amenities: ['Swimming pool', 'BQ', 'CCTV', 'Smart locks', 'Fitted kitchen'],
    media: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'],
    videoUrl: 'https://example.com/video/prop_001',
    floorPlanUrl: 'https://example.com/floor-plan/prop_001',
    virtualTourUrl: 'https://example.com/tour/prop_001',
    assignedAgent: 'Nneka Ibe',
    owner: 'Mr. Chinedu Obi',
    source: 'Direct landlord',
    dateListed: '2026-05-24',
    status: 'available',
    featured: true,
    verified: true,
  },
  {
    id: 'prop_002',
    title: 'Serviced 3-Bedroom Apartment in Ikoyi',
    description: 'Well-managed serviced apartment with elevator access, backup power, security, gym and waterfront proximity.',
    propertyType: 'Apartment',
    listingCategory: 'rent',
    price: 18000000,
    currency: 'NGN',
    location: 'Old Ikoyi',
    city: 'Ikoyi',
    state: 'Lagos',
    address: 'Bourdillon Road, Ikoyi',
    bedrooms: 3,
    bathrooms: 3,
    toilets: 4,
    parkingSpaces: 2,
    landSize: 'Shared compound',
    buildingSize: '210 sqm',
    furnishingStatus: 'Fully furnished',
    propertyCondition: 'Excellent',
    yearBuilt: 2023,
    legalStatus: 'Registered lease',
    ownershipType: 'Leasehold',
    amenities: ['Elevator', 'Gym', 'Backup power', 'Security', 'Water treatment'],
    media: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop'],
    assignedAgent: 'Seyi Adewale',
    owner: 'PrimeCrest Realty',
    source: 'Agency mandate',
    dateListed: '2026-05-26',
    status: 'vacant',
    featured: true,
    verified: true,
  },
  {
    id: 'prop_003',
    title: 'Commercial Office Floor in Victoria Island',
    description: 'Open-plan office floor suitable for corporate teams, fintechs and professional services firms.',
    propertyType: 'Office',
    listingCategory: 'rent',
    price: 65000000,
    currency: 'NGN',
    location: 'Victoria Island',
    city: 'Lagos Island',
    state: 'Lagos',
    address: 'Akin Adesola Street, Victoria Island',
    bedrooms: 0,
    bathrooms: 6,
    toilets: 6,
    parkingSpaces: 10,
    landSize: 'Commercial block',
    buildingSize: '720 sqm',
    furnishingStatus: 'Shell and core',
    propertyCondition: 'Good',
    yearBuilt: 2020,
    legalStatus: 'Commercial title verified',
    ownershipType: 'Leasehold',
    amenities: ['Elevator', 'Reception', 'Backup power', 'Fire alarm', 'Parking'],
    media: ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop'],
    assignedAgent: 'Nneka Ibe',
    owner: 'UrbanBuild DevCo',
    source: 'Developer inventory',
    dateListed: '2026-05-27',
    status: 'under_negotiation',
    featured: false,
    verified: true,
  },
  {
    id: 'prop_004',
    title: 'Dry Land Measuring 900sqm in Sangotedo',
    description: 'Strategically located dry land suitable for residential development with good road access and developing neighbourhood demand.',
    propertyType: 'Land',
    listingCategory: 'sale',
    price: 85000000,
    currency: 'NGN',
    location: 'Sangotedo',
    city: 'Ajah',
    state: 'Lagos',
    address: 'Monastery Road axis, Sangotedo',
    bedrooms: 0,
    bathrooms: 0,
    toilets: 0,
    parkingSpaces: 0,
    landSize: '900 sqm',
    buildingSize: 'N/A',
    furnishingStatus: 'N/A',
    propertyCondition: 'Dry land',
    yearBuilt: 0,
    legalStatus: 'Deed of Assignment',
    ownershipType: 'Freehold',
    amenities: ['Dry land', 'Motorable road', 'Developing estate corridor'],
    media: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop'],
    assignedAgent: 'Seyi Adewale',
    owner: 'Mr. Chinedu Obi',
    source: 'Seller referral',
    dateListed: '2026-05-28',
    status: 'pending_verification',
    featured: false,
    verified: false,
  },
  {
    id: 'prop_005',
    title: 'Warehouse Space in Ikeja Industrial Estate',
    description: 'Large warehouse suitable for logistics, storage, light production and distribution operations.',
    propertyType: 'Warehouse',
    listingCategory: 'rent',
    price: 42000000,
    currency: 'NGN',
    location: 'Ikeja Industrial Estate',
    city: 'Ikeja',
    state: 'Lagos',
    address: 'Oba Akran Avenue axis, Ikeja',
    bedrooms: 0,
    bathrooms: 4,
    toilets: 4,
    parkingSpaces: 15,
    landSize: '1,600 sqm',
    buildingSize: '1,200 sqm',
    furnishingStatus: 'Unfurnished',
    propertyCondition: 'Good',
    yearBuilt: 2018,
    legalStatus: 'Commercial lease verified',
    ownershipType: 'Leasehold',
    amenities: ['Loading bay', 'Truck access', 'Security post', 'Office section'],
    media: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop'],
    assignedAgent: 'Nneka Ibe',
    owner: 'PrimeCrest Realty',
    source: 'Agency mandate',
    dateListed: '2026-05-29',
    status: 'available',
    featured: false,
    verified: true,
  },
];

export function formatMoney(amount: number, currency = 'NGN') {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getPropertyById(id: string) {
  return demoProperties.find((property) => property.id === id);
}
