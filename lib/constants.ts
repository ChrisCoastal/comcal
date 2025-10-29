import {
  Category,
  ScheduleStatus,
  LeadOrganization,
  Representatives,
  RelatedTo,
  CommsMaterials,
} from '@/lib/schemas/validation';

export const categoryColors: Record<Category, string> = {
  event: 'bg-blue-100 text-blue-800',
  'news release': 'bg-green-100 text-green-800',
  tv: 'bg-purple-100 text-purple-800',
  radio: 'bg-orange-100 text-orange-800',
  'social media': 'bg-pink-100 text-pink-800',
  observance: 'bg-gray-100 text-gray-800',
  conference: 'bg-indigo-100 text-indigo-800',
  fyi: 'bg-yellow-100 text-yellow-800',
  placeholder: 'bg-slate-100 text-slate-800',
  other: 'bg-neutral-100 text-neutral-800',
};

export const statusColors: Record<ScheduleStatus, string> = {
  unknown: 'bg-gray-100 text-gray-800',
  tentative: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
};

// Derive arrays from the actual type definitions with proper type safety
export const categoryOptions = [
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
] as const satisfies readonly Category[];

export const statusOptions = [
  'unknown',
  'tentative',
  'confirmed',
] as const satisfies readonly ScheduleStatus[];

export const orgOptions = [
  'federal',
  'provincial',
  'crown corp',
  'other',
] as const satisfies readonly LeadOrganization[];

export const representativesOptions = [
  'Minister of Agriculture',
  'Minister of Health',
  'Minister of Education',
  'Minister of Transportation',
  'Minister of Environment',
  'Minister of Energy',
] as const satisfies readonly Representatives[];

export const relatedToOptions = [
  'parent',
  'child',
  'related',
] as const satisfies readonly RelatedTo[];

export const commsMaterialOptions = [
  'news release',
  'backgrounder',
  'speaking notes',
] as const satisfies readonly CommsMaterials[];
