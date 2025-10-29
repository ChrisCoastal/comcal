import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  jsonb,
  pgEnum,
} from 'drizzle-orm/pg-core';

// Enums
export const categoryEnum = pgEnum('category', [
  'event',
  'news release',
  'tv',
  'radio',
  'social media',
  'observance',
  'conference',
  'fyi',
  'placeholder',
  'other',
]);

export const leadOrgEnum = pgEnum('lead_organization', [
  'federal',
  'provincial',
  'crown corp',
  'other',
]);

export const statusEnum = pgEnum('schedule_status', [
  'unknown',
  'tentative',
  'confirmed',
]);

export const representativesEnum = pgEnum('representatives', [
  'Minister of Finance',
  'Minister of Health',
  'Minister of Education',
  'Minister of Transportation',
  'Minister of Environment',
  'Minister of Energy',
  'Minister of Agriculture',
]);

export const relatedToEnum = pgEnum('related_to', [
  'parent',
  'child',
  'related',
]);

export const commsMaterialsEnum = pgEnum('comms_material', [
  'news release',
  'backgrounder',
  'speaking notes',
]);

// Main table
export const communicationEntries = pgTable('communication_entries', {
  id: uuid('id').primaryKey().defaultRandom(),
  category: text('category').array().notNull(),
  title: text('title').notNull(),
  related_to: text('related_to'),
  summary: text('summary').notNull(),
  issue: boolean('issue').notNull(),
  significance: text('significance').notNull(),
  lead_organization: text('lead_organization').notNull(),
  comms_contact: jsonb('comms_contact').notNull(),
  comms_material: text('comms_material').array().notNull(),
  notes: text('notes'),
  schedule_status: text('schedule_status').notNull(),
  start_date: timestamp('start_date', { withTimezone: true }).notNull(),
  end_date: timestamp('end_date', { withTimezone: true }).notNull(),
  all_day: boolean('all_day').notNull(),
  scheduling_notes: text('scheduling_notes'),
  representatives: text('representatives').array(),
  location: jsonb('location'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Export types for TypeScript
export type CommunicationEntry = typeof communicationEntries.$inferSelect;
export type NewCommunicationEntry = typeof communicationEntries.$inferInsert;
