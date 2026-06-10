export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          auth_user_id: string;
          full_name: string;
          email: string;
          phone: string | null;
          avatar_url: string | null;
          role: Database['public']['Enums']['user_role'];
          agency_id: string | null;
          branch_id: string | null;
          status: Database['public']['Enums']['user_status'];
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['profiles']['Row']>;
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };
      agencies: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          phone: string | null;
          website: string | null;
          logo_url: string | null;
          address: string | null;
          city: string | null;
          state: string | null;
          country: string | null;
          status: Database['public']['Enums']['agency_status'];
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['agencies']['Row']>;
        Update: Partial<Database['public']['Tables']['agencies']['Row']>;
      };
      properties: {
        Row: {
          id: string;
          agency_id: string | null;
          branch_id: string | null;
          created_by: string | null;
          assigned_agent_id: string | null;
          owner_profile_id: string | null;
          title: string;
          description: string | null;
          property_type: string;
          listing_category: Database['public']['Enums']['listing_category'];
          price: number;
          currency: string;
          location: string;
          city: string | null;
          state: string | null;
          address: string | null;
          bedrooms: number;
          bathrooms: number;
          toilets: number;
          parking_spaces: number;
          land_size: string | null;
          building_size: string | null;
          furnishing_status: string | null;
          property_condition: string | null;
          year_built: number | null;
          legal_status: string | null;
          ownership_type: string | null;
          amenities: string[];
          listing_source: string | null;
          status: Database['public']['Enums']['property_status'];
          featured: boolean;
          verified: boolean;
          date_listed: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['properties']['Row']>;
        Update: Partial<Database['public']['Tables']['properties']['Row']>;
      };
      property_media: {
        Row: {
          id: string;
          property_id: string;
          agency_id: string | null;
          type: Database['public']['Enums']['property_media_type'];
          url: string;
          alt_text: string | null;
          sort_order: number;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['property_media']['Row']>;
        Update: Partial<Database['public']['Tables']['property_media']['Row']>;
      };
      clients: {
        Row: {
          id: string;
          agency_id: string | null;
          branch_id: string | null;
          assigned_agent_id: string | null;
          created_by: string | null;
          full_name: string;
          email: string | null;
          phone: string;
          type: Database['public']['Enums']['client_type'];
          budget_min: number;
          budget_max: number;
          preferred_location: string | null;
          property_preference: string | null;
          timeline: string | null;
          lead_source: string | null;
          status: Database['public']['Enums']['lead_status'];
          last_contacted_at: string | null;
          next_follow_up_at: string | null;
          tags: string[];
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['clients']['Row']>;
        Update: Partial<Database['public']['Tables']['clients']['Row']>;
      };
      leads: {
        Row: {
          id: string;
          agency_id: string | null;
          branch_id: string | null;
          client_id: string | null;
          property_id: string | null;
          assigned_agent_id: string | null;
          interest: string;
          source: string | null;
          status: Database['public']['Enums']['lead_status'];
          value_estimate: number;
          next_action: string | null;
          next_follow_up_at: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['leads']['Row']>;
        Update: Partial<Database['public']['Tables']['leads']['Row']>;
      };
      property_inquiries: {
        Row: {
          id: string;
          agency_id: string | null;
          branch_id: string | null;
          property_id: string | null;
          client_id: string | null;
          assigned_agent_id: string | null;
          name: string;
          email: string | null;
          phone: string | null;
          message: string | null;
          source: string;
          status: Database['public']['Enums']['inquiry_status'];
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['property_inquiries']['Row']>;
        Update: Partial<Database['public']['Tables']['property_inquiries']['Row']>;
      };
      saved_properties: {
        Row: {
          id: string;
          user_id: string;
          property_id: string;
          agency_id: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['saved_properties']['Row']>;
        Update: Partial<Database['public']['Tables']['saved_properties']['Row']>;
      };
      viewing_appointments: {
        Row: {
          id: string;
          agency_id: string | null;
          branch_id: string | null;
          property_id: string | null;
          client_id: string | null;
          client_profile_id: string | null;
          owner_profile_id: string | null;
          assigned_agent_id: string | null;
          created_by: string | null;
          title: string;
          appointment_type: Database['public']['Enums']['appointment_type'];
          scheduled_start: string;
          scheduled_end: string | null;
          location: string | null;
          status: Database['public']['Enums']['appointment_status'];
          reminder_enabled: boolean;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['viewing_appointments']['Row']>;
        Update: Partial<Database['public']['Tables']['viewing_appointments']['Row']>;
      };
      follow_up_tasks: {
        Row: {
          id: string;
          agency_id: string | null;
          branch_id: string | null;
          client_id: string | null;
          lead_id: string | null;
          property_id: string | null;
          appointment_id: string | null;
          assigned_agent_id: string | null;
          created_by: string | null;
          recipient_name: string;
          recipient_phone: string | null;
          recipient_email: string | null;
          channel: Database['public']['Enums']['follow_up_channel'];
          message: string;
          scheduled_at: string;
          status: Database['public']['Enums']['follow_up_status'];
          priority: Database['public']['Enums']['follow_up_priority'];
          completed_at: string | null;
          external_provider: string | null;
          external_message_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['follow_up_tasks']['Row']>;
        Update: Partial<Database['public']['Tables']['follow_up_tasks']['Row']>;
      };
      message_templates: {
        Row: {
          id: string;
          agency_id: string | null;
          created_by: string | null;
          name: string;
          channel: Database['public']['Enums']['follow_up_channel'];
          use_case: string | null;
          body: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['message_templates']['Row']>;
        Update: Partial<Database['public']['Tables']['message_templates']['Row']>;
      };
      campaigns: {
        Row: {
          id: string;
          agency_id: string | null;
          branch_id: string | null;
          created_by: string | null;
          name: string;
          channel: Database['public']['Enums']['follow_up_channel'];
          audience: string | null;
          recipients_count: number;
          message: string | null;
          scheduled_at: string | null;
          status: Database['public']['Enums']['campaign_status'];
          external_provider: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['campaigns']['Row']>;
        Update: Partial<Database['public']['Tables']['campaigns']['Row']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: 'super_admin' | 'agency_admin' | 'agent' | 'client' | 'landlord' | 'service_provider' | 'developer' | 'finance_staff';
      user_status: 'active' | 'pending' | 'suspended';
      agency_status: 'active' | 'pending' | 'suspended';
      branch_status: 'active' | 'inactive';
      notification_type: 'info' | 'success' | 'warning' | 'error';
      listing_category: 'sale' | 'rent';
      property_status: 'available' | 'sold' | 'reserved' | 'pending_verification' | 'under_review' | 'occupied' | 'vacant' | 'under_negotiation' | 'unavailable';
      property_media_type: 'image' | 'video' | 'floor_plan' | 'virtual_tour';
      client_type: 'buyer' | 'seller' | 'landlord' | 'tenant' | 'investor' | 'developer';
      lead_status: 'new' | 'contacted' | 'qualified' | 'viewing_booked' | 'negotiating' | 'won' | 'lost' | 'dormant';
      inquiry_status: 'new' | 'assigned' | 'contacted' | 'viewing_booked' | 'closed' | 'spam';
      appointment_status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled' | 'no_show';
      appointment_type: 'property_viewing' | 'client_meeting' | 'owner_meeting' | 'valuation_visit' | 'document_review';
      follow_up_channel: 'call' | 'whatsapp' | 'sms' | 'email' | 'meeting';
      follow_up_status: 'scheduled' | 'due_today' | 'completed' | 'missed' | 'cancelled';
      follow_up_priority: 'low' | 'medium' | 'high';
      campaign_status: 'draft' | 'scheduled' | 'sent' | 'paused';
    };
    CompositeTypes: Record<string, never>;
  };
}
