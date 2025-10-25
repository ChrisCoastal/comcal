import { DatabaseCommunicationEntry } from '../types/database';
import { ApiCommunicationEntry } from '../types/api';
import { CommunicationEntry as DrizzleEntry } from '../schemas/database';

/**
 * Transform database entry (snake_case) to API entry (camelCase)
 */
export function transformDbEntryToApi(entry: any): ApiCommunicationEntry {
  return {
    id: entry.id,
    category: entry.category,
    title: entry.title,
    relatedTo: entry.related_to || undefined,
    summary: entry.summary,
    issue: entry.issue,
    significance: entry.significance,
    leadOrganization: entry.lead_organization,
    commsContact: entry.comms_contact as {
      firstname: string;
      lastname: string;
      email: string;
    },
    commsMaterial: entry.comms_material,
    notes: entry.notes || undefined,
    scheduleStatus: entry.schedule_status,
    startDate: entry.start_date,
    endDate: entry.end_date,
    allDay: entry.all_day,
    schedulingNotes: entry.scheduling_notes || undefined,
    representatives: entry.representatives || undefined,
    location: entry.location || undefined,
    createdAt: entry.created_at,
    updatedAt: entry.updated_at,
  };
}

/**
 * Transform API entry (camelCase) to database entry (snake_case)
 */
export function transformApiEntryToDb(
  entry: ApiCommunicationEntry
): DatabaseCommunicationEntry {
  return {
    id: entry.id,
    category: entry.category,
    title: entry.title,
    related_to: entry.relatedTo || null,
    summary: entry.summary,
    issue: entry.issue,
    significance: entry.significance,
    lead_organization: entry.leadOrganization,
    comms_contact: entry.commsContact,
    comms_material: entry.commsMaterial,
    notes: entry.notes || null,
    schedule_status: entry.scheduleStatus,
    start_date: entry.startDate,
    end_date: entry.endDate,
    all_day: entry.allDay,
    scheduling_notes: entry.schedulingNotes || null,
    representatives: entry.representatives || null,
    location: entry.location || null,
    created_at: entry.createdAt,
    updated_at: entry.updatedAt,
  };
}

/**
 * Transform array of database entries to API entries
 */
export function transformDbEntriesToApi(
  entries: any[]
): ApiCommunicationEntry[] {
  return entries.map(transformDbEntryToApi);
}

/**
 * Transform array of API entries to database entries
 */
export function transformApiEntriesToDb(
  entries: ApiCommunicationEntry[]
): DatabaseCommunicationEntry[] {
  return entries.map(transformApiEntryToDb);
}
