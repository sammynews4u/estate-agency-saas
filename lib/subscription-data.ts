export type SubscriptionPlan = 'starter' | 'growth' | 'enterprise';
export type SubscriptionStatus = 'trial' | 'active' | 'past_due' | 'suspended' | 'cancelled';
export type BillingCycle = 'monthly' | 'quarterly' | 'annual';
export type UsageStatus = 'healthy' | 'near_limit' | 'exceeded';

export type PlatformSubscription = {
  id: string;
  agencyName: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  monthlyFee: number;
  nextBillingDate: string;
  seatsUsed: number;
  seatsLimit: number;
  propertyListingsUsed: number;
  propertyListingsLimit: number;
  aiCreditsUsed: number;
  aiCreditsLimit: number;
  storageUsedGb: number;
  storageLimitGb: number;
  renewalRisk: 'low' | 'medium' | 'high';
};

export type FeatureGate = {
  id: string;
  feature: string;
  starter: boolean;
  growth: boolean;
  enterprise: boolean;
  note: string;
};

export const planLabels: Record<SubscriptionPlan, string> = {
  starter: 'Starter',
  growth: 'Growth',
  enterprise: 'Enterprise',
};

export const subscriptionStatusLabels: Record<SubscriptionStatus, string> = {
  trial: 'Trial',
  active: 'Active',
  past_due: 'Past due',
  suspended: 'Suspended',
  cancelled: 'Cancelled',
};

export const subscriptionStatusTone: Record<SubscriptionStatus, 'muted' | 'success' | 'warning' | 'danger' | 'gold'> = {
  trial: 'gold',
  active: 'success',
  past_due: 'warning',
  suspended: 'danger',
  cancelled: 'muted',
};

export const billingCycleLabels: Record<BillingCycle, string> = {
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  annual: 'Annual',
};

export function formatSubscriptionMoney(value: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value);
}

export function getUsageStatus(used: number, limit: number): UsageStatus {
  if (used >= limit) return 'exceeded';
  if (used / limit >= 0.8) return 'near_limit';
  return 'healthy';
}

export const usageStatusLabels: Record<UsageStatus, string> = {
  healthy: 'Healthy',
  near_limit: 'Near limit',
  exceeded: 'Exceeded',
};

export const usageStatusTone: Record<UsageStatus, 'success' | 'warning' | 'danger'> = {
  healthy: 'success',
  near_limit: 'warning',
  exceeded: 'danger',
};

export const demoSubscriptions: PlatformSubscription[] = [
  {
    id: 'sub_001',
    agencyName: 'PrimeNest Realty',
    plan: 'growth',
    status: 'active',
    billingCycle: 'monthly',
    monthlyFee: 85000,
    nextBillingDate: '2026-07-05',
    seatsUsed: 9,
    seatsLimit: 12,
    propertyListingsUsed: 142,
    propertyListingsLimit: 200,
    aiCreditsUsed: 4300,
    aiCreditsLimit: 7000,
    storageUsedGb: 22,
    storageLimitGb: 60,
    renewalRisk: 'low',
  },
  {
    id: 'sub_002',
    agencyName: 'Urban Keys Properties',
    plan: 'starter',
    status: 'trial',
    billingCycle: 'monthly',
    monthlyFee: 35000,
    nextBillingDate: '2026-06-19',
    seatsUsed: 3,
    seatsLimit: 4,
    propertyListingsUsed: 43,
    propertyListingsLimit: 50,
    aiCreditsUsed: 1100,
    aiCreditsLimit: 1200,
    storageUsedGb: 8,
    storageLimitGb: 10,
    renewalRisk: 'medium',
  },
  {
    id: 'sub_003',
    agencyName: 'CedarGate Homes',
    plan: 'enterprise',
    status: 'active',
    billingCycle: 'annual',
    monthlyFee: 250000,
    nextBillingDate: '2026-10-01',
    seatsUsed: 31,
    seatsLimit: 60,
    propertyListingsUsed: 620,
    propertyListingsLimit: 1200,
    aiCreditsUsed: 12400,
    aiCreditsLimit: 30000,
    storageUsedGb: 144,
    storageLimitGb: 500,
    renewalRisk: 'low',
  },
  {
    id: 'sub_004',
    agencyName: 'Oceanfront Assets',
    plan: 'growth',
    status: 'past_due',
    billingCycle: 'quarterly',
    monthlyFee: 85000,
    nextBillingDate: '2026-06-02',
    seatsUsed: 13,
    seatsLimit: 12,
    propertyListingsUsed: 205,
    propertyListingsLimit: 200,
    aiCreditsUsed: 6800,
    aiCreditsLimit: 7000,
    storageUsedGb: 58,
    storageLimitGb: 60,
    renewalRisk: 'high',
  },
];

export const demoFeatureGates: FeatureGate[] = [
  { id: 'fg_001', feature: 'Property marketplace listings', starter: true, growth: true, enterprise: true, note: 'Listing caps differ by plan.' },
  { id: 'fg_002', feature: 'CRM and follow-up automation', starter: true, growth: true, enterprise: true, note: 'Starter has lower campaign volume.' },
  { id: 'fg_003', feature: 'AI assistant credits', starter: true, growth: true, enterprise: true, note: 'Credits are metered monthly.' },
  { id: 'fg_004', feature: 'Property discovery tool', starter: false, growth: true, enterprise: true, note: 'Reserved for serious operators.' },
  { id: 'fg_005', feature: 'Referral network', starter: false, growth: true, enterprise: true, note: 'Network effect module.' },
  { id: 'fg_006', feature: 'Advanced reports and audit controls', starter: false, growth: false, enterprise: true, note: 'Enterprise governance layer.' },
];
