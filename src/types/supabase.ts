export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          updated_at: string;
          budget: string;
          message: string;
          status: 'New' | 'Contacted' | 'Closed';
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          email: string;
          budget: string;
          message: string;
          status?: 'New' | 'Contacted' | 'Closed';
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          email?: string;
          budget?: string;
          message?: string;
          status?: 'New' | 'Contacted' | 'Closed';
        };
        Relationships: [];
      };
      auth_rate_limits: {
        Row: {
          identifier: string;
          attempt_count: number;
          first_attempt_at: string;
          locked_until: string | null;
          updated_at: string;
        };
        Insert: {
          identifier: string;
          attempt_count?: number;
          first_attempt_at?: string;
          locked_until?: string | null;
          updated_at?: string;
        };
        Update: {
          identifier?: string;
          attempt_count?: number;
          first_attempt_at?: string;
          locked_until?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

// Type for lead form submission
export type LeadFormData = Database['public']['Tables']['leads']['Insert'];