'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { formSchema, type FormData } from '@/lib/schemas/validation';
import { db } from '@/lib/db';
import { communicationEntries } from '@/lib/schemas/database';
import { transformDbEntriesToApi } from '@/lib/utils/transformers';
import { eq } from 'drizzle-orm';

export async function createEntry(formData: FormData) {
  try {
    const validatedData = formSchema.parse(formData);

    const now = new Date();
    const entry = {
      id: crypto.randomUUID(),
      category: validatedData.category,
      title: validatedData.title,
      related_to: validatedData.relatedTo,
      summary: validatedData.summary,
      issue: validatedData.issue,
      significance: validatedData.significance,
      lead_organization: validatedData.leadOrganization,
      comms_contact: validatedData.commsContact,
      comms_material: validatedData.commsMaterial,
      notes: validatedData.notes,
      schedule_status: validatedData.scheduleStatus,
      start_date: new Date(validatedData.startDate),
      end_date: new Date(validatedData.endDate),
      all_day: validatedData.allDay,
      scheduling_notes: validatedData.schedulingNotes,
      representatives: validatedData.representatives,
      location: validatedData.location,
      created_at: now,
      updated_at: now,
    };

    // Save to database using Drizzle
    const [newEntry] = await db
      .insert(communicationEntries)
      .values(entry)
      .returning();

    console.log('Entry created successfully:', newEntry);

    revalidatePath('/');
    redirect('/');
  } catch (error) {
    console.error('Error creating entry:', error);

    if (error instanceof Error) {
      if (error.name === 'ZodError') {
        throw new Error(
          'Invalid form data. Please check your inputs and try again.'
        );
      }
      throw error;
    }

    throw new Error('Failed to create entry. Please try again.');
  }
}

export async function updateEntry(id: string, formData: FormData) {
  try {
    const rawData = {
      category: formData.category,
      title: formData.title,
      relatedTo: formData.relatedTo,
      summary: formData.summary,
      issue: formData.issue,
      significance: formData.significance,
      leadOrganization: formData.leadOrganization,
      commsContact: formData.commsContact,
      commsMaterial: formData.commsMaterial,
      notes: formData.notes,
      scheduleStatus: formData.scheduleStatus,
      startDate: formData.startDate,
      endDate: formData.endDate,
      allDay: formData.allDay,
      schedulingNotes: formData.schedulingNotes,
      representatives: formData.representatives,
      location: formData.location,
    };

    const validatedData = formSchema.parse(rawData);

    const updatedEntry = {
      category: validatedData.category,
      title: validatedData.title,
      related_to: validatedData.relatedTo,
      summary: validatedData.summary,
      issue: validatedData.issue,
      significance: validatedData.significance,
      lead_organization: validatedData.leadOrganization,
      comms_contact: validatedData.commsContact,
      comms_material: validatedData.commsMaterial,
      notes: validatedData.notes,
      schedule_status: validatedData.scheduleStatus,
      start_date: new Date(validatedData.startDate),
      end_date: new Date(validatedData.endDate),
      all_day: validatedData.allDay,
      scheduling_notes: validatedData.schedulingNotes,
      representatives: validatedData.representatives,
      location: validatedData.location,
      updated_at: new Date(),
    };

    // Update in database using Drizzle
    const [updated] = await db
      .update(communicationEntries)
      .set(updatedEntry)
      .where(eq(communicationEntries.id, id))
      .returning();

    console.log('Entry updated successfully:', updated);

    revalidatePath('/');
    revalidatePath(`/entry/${id}`);

    redirect('/');
  } catch (error) {
    console.error('Error updating entry:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      throw new Error(
        'Invalid form data. Please check your inputs and try again.'
      );
    }

    throw new Error('Failed to update entry. Please try again.');
  }
}

export async function deleteEntry(id: string) {
  try {
    // Delete from database using Drizzle
    await db
      .delete(communicationEntries)
      .where(eq(communicationEntries.id, id));

    console.log('Entry deleted successfully');

    revalidatePath('/');
    redirect('/');
  } catch (error) {
    console.error('Error deleting entry:', error);
    throw new Error('Failed to delete entry. Please try again.');
  }
}

export async function getEntries() {
  try {
    // Fetch entries using Drizzle
    const dbEntries = await db
      .select()
      .from(communicationEntries)
      .orderBy(communicationEntries.created_at);

    // Transform database entries to API format
    const entries = transformDbEntriesToApi(dbEntries as unknown[]);

    console.log('Entries fetched successfully:', entries.length);
    return entries;
  } catch (error) {
    console.error('Error fetching entries:', error);
    throw new Error('Failed to fetch entries. Please try again.');
  }
}
