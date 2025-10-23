import { z } from 'zod';
import {
  Category,
  LeadOrganization,
  ScheduleStatus,
  Representatives,
  RelatedTo,
  CommsMaterials,
} from '@/types';

// Individual schema definitions that match the types exactly
export const categorySchema = z.enum([
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
] as const);

export const leadOrgSchema = z.enum([
  'federal',
  'provincial',
  'crown corp',
  'other',
] as const);

export const statusSchema = z.enum([
  'unknown',
  'tentative',
  'confirmed',
] as const);

export const representativesSchema = z.enum([
  'Joe',
  'Jane',
  'David',
  'Ella',
] as const);

export const relatedToSchema = z.enum(['parent', 'child', 'related'] as const);

export const commsMaterialsSchema = z.enum([
  'news release',
  'backgrounder',
  'speaking notes',
] as const);

// Main form validation schema
export const formSchema = z
  .object({
    // Overview
    category: z
      .array(categorySchema)
      .min(1, 'At least one category is required'),
    title: z.string().min(1, 'Title is required'),
    relatedTo: relatedToSchema.optional(),
    summary: z.string().min(1, 'Summary is required'),
    issue: z.boolean(),
    significance: z.string().min(1, 'Significance is required'),
    leadOrganization: leadOrgSchema,

    // Planning
    commsContact: z.object({
      firstname: z.string().min(1, 'First name is required'),
      lastname: z.string().min(1, 'Last name is required'),
      email: z.string().email('Valid email is required'),
    }),
    commsMaterial: z.array(commsMaterialsSchema),
    notes: z.string().optional(),

    // Schedule
    scheduleStatus: statusSchema,
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    allDay: z.boolean(),
    schedulingNotes: z.string().optional(),

    // Event
    representatives: z.array(representativesSchema),
    location: z
      .object({
        address: z.string().min(1, 'Address is required'),
        city: z.string().min(1, 'City is required'),
        province: z.string().min(1, 'Province is required'),
        postalCode: z.string().min(1, 'Postal code is required'),
        country: z.string().min(1, 'Country is required'),
      })
      .optional(),
  })
  .refine(
    data => {
      // Add date validation - end date must be after start date
      if (data.startDate && data.endDate) {
        return new Date(data.startDate) <= new Date(data.endDate);
      }
      return true;
    },
    {
      message: 'End date must be after start date',
      path: ['endDate'],
    }
  );

// Export the inferred type for use in components
export type FormData = z.infer<typeof formSchema>;
