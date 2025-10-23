'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import {
  Category,
  LeadOrganization,
  CommsMaterials,
  ScheduleStatus,
  Representatives,
  RelatedTo,
} from '@/types';
import { categoryOptions, statusOptions, orgOptions } from '@/lib/constants';

// Form validation schema
const formSchema = z.object({
  // Overview
  category: z
    .array(
      z.enum([
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
      ] as const)
    )
    .min(1, 'At least one category is required'),
  title: z.string().min(1, 'Title is required'),
  relatedTo: z.enum(['parent', 'child', 'related'] as const).optional(),
  summary: z.string().min(1, 'Summary is required'),
  issue: z.boolean(),
  significance: z.string().min(1, 'Significance is required'),
  leadOrganization: z.enum([
    'federal',
    'provincial',
    'crown corp',
    'other',
  ] as const),

  // Planning
  commsContact: z.object({
    firstname: z.string().min(1, 'First name is required'),
    lastname: z.string().min(1, 'Last name is required'),
    email: z.email('Valid email is required'),
  }),
  commsMaterial: z.array(
    z.enum(['news release', 'backgrounder', 'speaking notes'] as const)
  ),
  notes: z.string().optional(),

  // Schedule
  scheduleStatus: z.enum(['unknown', 'tentative', 'confirmed'] as const),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  allDay: z.boolean(),
  schedulingNotes: z.string().optional(),

  // Event
  representatives: z.array(z.enum(['Joe', 'Jane', 'David', 'Ella'] as const)),
  location: z
    .object({
      address: z.string().min(1, 'Address is required'),
      city: z.string().min(1, 'City is required'),
      province: z.string().min(1, 'Province is required'),
      postalCode: z.string().min(1, 'Postal code is required'),
      country: z.string().min(1, 'Country is required'),
    })
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

const commsMaterialOptions: CommsMaterials[] = [
  'news release',
  'backgrounder',
  'speaking notes',
];
const representativesOptions: Representatives[] = [
  'Joe',
  'Jane',
  'David',
  'Ella',
];
const relatedToOptions: RelatedTo[] = ['parent', 'child', 'related'];

export default function NewEntryPage() {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<CommsMaterials[]>(
    []
  );
  const [selectedRepresentatives, setSelectedRepresentatives] = useState<
    Representatives[]
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: [],
      issue: false,
      allDay: false,
      commsMaterial: [],
      representatives: [],
      commsContact: {
        firstname: '',
        lastname: '',
        email: '',
      },
    },
  });

  const watchedCategories = watch('category');
  const watchedAllDay = watch('allDay');

  const onSubmit = async (data: FormData) => {
    try {
      // Add selected materials, representatives, and categories to form data
      const formData = {
        ...data,
        category: selectedCategories,
        commsMaterial: selectedMaterials,
        representatives: selectedRepresentatives,
      };

      console.log('Form submitted:', formData);

      // TODO: Implement actual submission logic
      // This would typically involve:
      // 1. Generate a unique ID
      // 2. Add timestamps (createdAt, updatedAt)
      // 3. Submit to backend API
      // 4. Navigate back to entries list or show success message

      alert('Entry created successfully! (This is a placeholder)');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error creating entry. Please try again.');
    }
  };

  const handleCancel = () => {
    if (
      confirm(
        'Are you sure you want to cancel? Any unsaved changes will be lost.'
      )
    ) {
      reset();
      // TODO: Navigate back to entries list
      window.history.back();
    }
  };

  const toggleCategory = (category: Category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    setValue('category', newCategories);
  };

  const toggleMaterial = (material: CommsMaterials) => {
    const newMaterials = selectedMaterials.includes(material)
      ? selectedMaterials.filter(m => m !== material)
      : [...selectedMaterials, material];
    setSelectedMaterials(newMaterials);
    setValue('commsMaterial', newMaterials);
  };

  const toggleRepresentative = (representative: Representatives) => {
    const newRepresentatives = selectedRepresentatives.includes(representative)
      ? selectedRepresentatives.filter(r => r !== representative)
      : [...selectedRepresentatives, representative];
    setSelectedRepresentatives(newRepresentatives);
    setValue('representatives', newRepresentatives);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center space-x-4'>
              <Link href='/'>
                <Button variant='ghost' size='sm'>
                  <ArrowLeft className='h-4 w-4 mr-2' />
                  Back to Entries
                </Button>
              </Link>
              <h1 className='text-2xl font-bold text-gray-900'>
                New Communication Entry
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
          {/* Overview Section */}
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Categories *</label>
                <div className='flex flex-wrap gap-2'>
                  {categoryOptions.map(category => (
                    <Badge
                      key={category}
                      variant={
                        selectedCategories.includes(category)
                          ? 'default'
                          : 'outline'
                      }
                      className='cursor-pointer'
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
                {errors.category && (
                  <p className='text-sm text-red-600'>
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Title *</label>
                <Input
                  {...register('title')}
                  placeholder='Enter title'
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className='text-sm text-red-600'>{errors.title.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Related To</label>
                <Select
                  onValueChange={value =>
                    setValue('relatedTo', value as RelatedTo)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select relationship' />
                  </SelectTrigger>
                  <SelectContent>
                    {relatedToOptions.map(relation => (
                      <SelectItem key={relation} value={relation}>
                        {relation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Summary *</label>
                <textarea
                  {...register('summary')}
                  rows={4}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='Enter summary'
                />
                {errors.summary && (
                  <p className='text-sm text-red-600'>
                    {errors.summary.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Significance *</label>
                <textarea
                  {...register('significance')}
                  rows={3}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='Why is this communication relevant?'
                />
                {errors.significance && (
                  <p className='text-sm text-red-600'>
                    {errors.significance.message}
                  </p>
                )}
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>
                    Lead Organization *
                  </label>
                  <Select
                    onValueChange={value =>
                      setValue('leadOrganization', value as LeadOrganization)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select organization' />
                    </SelectTrigger>
                    <SelectContent>
                      {orgOptions.map(org => (
                        <SelectItem key={org} value={org}>
                          {org}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.leadOrganization && (
                    <p className='text-sm text-red-600'>
                      {errors.leadOrganization.message}
                    </p>
                  )}
                </div>

                <div className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    {...register('issue')}
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                  />
                  <label className='text-sm font-medium'>
                    High Priority Issue
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Planning Section */}
          <Card>
            <CardHeader>
              <CardTitle>Planning</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <h4 className='text-sm font-medium'>
                  Communications Contact *
                </h4>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>First Name</label>
                    <Input
                      {...register('commsContact.firstname')}
                      placeholder='First name'
                      className={
                        errors.commsContact?.firstname ? 'border-red-500' : ''
                      }
                    />
                    {errors.commsContact?.firstname && (
                      <p className='text-sm text-red-600'>
                        {errors.commsContact.firstname.message}
                      </p>
                    )}
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Last Name</label>
                    <Input
                      {...register('commsContact.lastname')}
                      placeholder='Last name'
                      className={
                        errors.commsContact?.lastname ? 'border-red-500' : ''
                      }
                    />
                    {errors.commsContact?.lastname && (
                      <p className='text-sm text-red-600'>
                        {errors.commsContact.lastname.message}
                      </p>
                    )}
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Email</label>
                    <Input
                      {...register('commsContact.email')}
                      type='email'
                      placeholder='email@example.com'
                      className={
                        errors.commsContact?.email ? 'border-red-500' : ''
                      }
                    />
                    {errors.commsContact?.email && (
                      <p className='text-sm text-red-600'>
                        {errors.commsContact.email.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>
                  Communications Materials
                </label>
                <div className='flex flex-wrap gap-2'>
                  {commsMaterialOptions.map(material => (
                    <Badge
                      key={material}
                      variant={
                        selectedMaterials.includes(material)
                          ? 'default'
                          : 'outline'
                      }
                      className='cursor-pointer'
                      onClick={() => toggleMaterial(material)}
                    >
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Notes</label>
                <textarea
                  {...register('notes')}
                  rows={3}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='Additional notes'
                />
              </div>
            </CardContent>
          </Card>

          {/* Schedule Section */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>
                    Schedule Status *
                  </label>
                  <Select
                    onValueChange={value =>
                      setValue('scheduleStatus', value as ScheduleStatus)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(status => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.scheduleStatus && (
                    <p className='text-sm text-red-600'>
                      {errors.scheduleStatus.message}
                    </p>
                  )}
                </div>

                <div className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    {...register('allDay')}
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                  />
                  <label className='text-sm font-medium'>All Day Event</label>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>
                    Start Date/Time *
                  </label>
                  <Input
                    type={watchedAllDay ? 'date' : 'datetime-local'}
                    {...register('startDate')}
                    className={errors.startDate ? 'border-red-500' : ''}
                  />
                  {errors.startDate && (
                    <p className='text-sm text-red-600'>
                      {errors.startDate.message}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium'>End Date/Time *</label>
                  <Input
                    type={watchedAllDay ? 'date' : 'datetime-local'}
                    {...register('endDate')}
                    className={errors.endDate ? 'border-red-500' : ''}
                  />
                  {errors.endDate && (
                    <p className='text-sm text-red-600'>
                      {errors.endDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Scheduling Notes</label>
                <textarea
                  {...register('schedulingNotes')}
                  rows={3}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='Additional scheduling notes'
                />
              </div>
            </CardContent>
          </Card>

          {/* Event Section - Only show if categories include 'event' */}
          {watchedCategories?.includes('event') && (
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Representatives</label>
                  <div className='flex flex-wrap gap-2'>
                    {representativesOptions.map(representative => (
                      <Badge
                        key={representative}
                        variant={
                          selectedRepresentatives.includes(representative)
                            ? 'default'
                            : 'outline'
                        }
                        className='cursor-pointer'
                        onClick={() => toggleRepresentative(representative)}
                      >
                        {representative}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className='space-y-4'>
                  <h4 className='text-sm font-medium'>Location</h4>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Address</label>
                      <Input
                        {...register('location.address')}
                        placeholder='Street address'
                        className={
                          errors.location?.address ? 'border-red-500' : ''
                        }
                      />
                      {errors.location?.address && (
                        <p className='text-sm text-red-600'>
                          {errors.location.address.message}
                        </p>
                      )}
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>City</label>
                      <Input
                        {...register('location.city')}
                        placeholder='City'
                        className={
                          errors.location?.city ? 'border-red-500' : ''
                        }
                      />
                      {errors.location?.city && (
                        <p className='text-sm text-red-600'>
                          {errors.location.city.message}
                        </p>
                      )}
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Province</label>
                      <Input
                        {...register('location.province')}
                        placeholder='Province/State'
                        className={
                          errors.location?.province ? 'border-red-500' : ''
                        }
                      />
                      {errors.location?.province && (
                        <p className='text-sm text-red-600'>
                          {errors.location.province.message}
                        </p>
                      )}
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Postal Code</label>
                      <Input
                        {...register('location.postalCode')}
                        placeholder='Postal code'
                        className={
                          errors.location?.postalCode ? 'border-red-500' : ''
                        }
                      />
                      {errors.location?.postalCode && (
                        <p className='text-sm text-red-600'>
                          {errors.location.postalCode.message}
                        </p>
                      )}
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Country</label>
                      <Input
                        {...register('location.country')}
                        placeholder='Country'
                        className={
                          errors.location?.country ? 'border-red-500' : ''
                        }
                      />
                      {errors.location?.country && (
                        <p className='text-sm text-red-600'>
                          {errors.location.country.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {/* Schedule Section */}
          <Card>
            <CardContent className='space-y-6'>
              <div className='flex items-center space-x-3 justify-end'>
                <Button variant='outline' onClick={handleCancel}>
                  <X className='h-4 w-4 mr-2' />
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                >
                  <Save className='h-4 w-4 mr-2' />
                  {isSubmitting ? 'Saving...' : 'Save Entry'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
