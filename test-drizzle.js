// Test script to verify Drizzle connection
import { db } from './lib/db.ts';
import { communicationEntries } from './lib/schema.ts';

async function testConnection() {
  try {
    console.log('Testing Drizzle connection...');

    // Test a simple query
    const result = await db.select().from(communicationEntries).limit(1);
    console.log('✅ Connection successful!');
    console.log('Sample data:', result);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();
