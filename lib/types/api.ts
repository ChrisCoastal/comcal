// API types - these use camelCase for frontend consumption
export interface ApiCommunicationEntry {
  id: string;
  // Overview
  category: string[];
  title: string;
  relatedTo?: string;
  summary: string;
  issue: boolean;
  significance: string;
  leadOrganization: string;

  // Planning
  commsContact: {
    firstname: string;
    lastname: string;
    email: string;
  };
  commsMaterial: string[];
  notes?: string;

  // Schedule
  scheduleStatus: string;
  startDate: string; // ISO datetime string
  endDate: string; // ISO datetime string
  allDay: boolean;
  schedulingNotes?: string;

  // Event
  representatives?: string[];
  location?: {
    address: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };

  // Metadata
  createdAt: string;
  updatedAt: string;
}

// Type aliases for backward compatibility
export type CommunicationEntry = ApiCommunicationEntry;
