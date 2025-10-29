// Database types - these match the actual database schema (snake_case)
export type DatabaseCommunicationEntry = {
  id: string;
  category: string[];
  title: string;
  related_to: string | null;
  summary: string;
  issue: boolean;
  significance: string;
  lead_organization: string;
  comms_contact: {
    firstname: string;
    lastname: string;
    email: string;
  };
  comms_material: string[];
  notes: string | null;
  schedule_status: string;
  start_date: string; // ISO datetime string
  end_date: string; // ISO datetime string
  all_day: boolean;
  scheduling_notes: string | null;
  representatives: string[] | null;
  location: {
    address: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  } | null;
  created_at: string;
  updated_at: string;
};

// Re-export Drizzle inferred types for compatibility
export type { CommunicationEntry as DrizzleCommunicationEntry } from '../schema';
