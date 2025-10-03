// Core types for the Communications Object

export type Category =
  | 'event'
  | 'news release'
  | 'tv'
  | 'radio'
  | 'social media'
  | 'observance'
  | 'conference'
  | 'fyi'
  | 'placeholder'
  | 'other';

export type RelatedTo = 'parent' | 'child' | 'related';

export type LeadOrganization =
  | 'federal'
  | 'provincial'
  | 'crown corp'
  | 'other';

export type CommsContact = {
  firstname: string;
  lastname: string;
  email: string;
};

export type CommsMaterials = 'news release' | 'backgrounder' | 'speaking notes';

export type ScheduleStatus = 'unknown' | 'tentative' | 'confirmed';

// will want this in future to reference an external API
export type Representatives = 'Joe' | 'Jane' | 'David' | 'Ella';

export interface Location {
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface CommunicationEntry {
  id: string;
  // Overview
  category: Category;
  title: string;
  relatedTo?: RelatedTo;
  summary: string;
  issue: boolean;
  significance: string;
  leadOrganization: LeadOrganization;

  // Planning
  commsContact: CommsContact;
  commsMaterial: CommsMaterials[];
  notes?: string;

  // Schedule
  scheduleStatus: ScheduleStatus;
  startDate: string; // ISO datetime string
  endDate: string; // ISO datetime string
  allDay: boolean;
  schedulingNotes?: string;

  // Event
  representatives: Representatives[];
  location?: Location;

  // Metadata
  createdAt: string;
  updatedAt: string;
}
