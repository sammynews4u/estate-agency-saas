export type UserRole =
  | 'super_admin'
  | 'agency_admin'
  | 'agent'
  | 'client'
  | 'landlord'
  | 'service_provider'
  | 'developer'
  | 'finance_staff';

export type RouteRole =
  | 'super-admin'
  | 'agency'
  | 'agent'
  | 'client'
  | 'landlord'
  | 'service-provider'
  | 'developer'
  | 'finance';

export type UserStatus = 'active' | 'pending' | 'suspended';

export interface DemoUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  agency: string;
  branch: string;
  status: UserStatus;
  createdAt: string;
}
