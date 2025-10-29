// Test script to verify Drizzle connection
import dotenv from 'dotenv';

// Load environment variables explicitly BEFORE importing db
dotenv.config({ path: '.env.local' });

import { db } from './lib/db';
import { communicationEntries } from './lib/schema';

async function testConnection() {
  try {
    console.log('Testing Drizzle connection...');
    console.log('Current working directory:', process.cwd());
    console.log(
      'SUPABASE_DATABASE_URL set:',
      !!process.env.SUPABASE_DATABASE_URL
    );
    console.log(
      'SUPABASE_DATABASE_URL value:',
      process.env.SUPABASE_DATABASE_URL ? 'SET (hidden)' : 'NOT SET'
    );
    console.log('DATABASE_URL set:', !!process.env.DATABASE_URL);

    // Check if the URL is properly formatted
    if (process.env.SUPABASE_DATABASE_URL) {
      console.log(
        'URL starts with postgresql:',
        process.env.SUPABASE_DATABASE_URL.startsWith('postgresql://')
      );
    }

    // Test a simple query
    const result = await db.select().from(communicationEntries).limit(1);
    console.log('✅ Connection successful!');
    console.log('Sample data:', result);
  } catch (error) {
    console.error('❌ Connection failed:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
  }
}

testConnection();
