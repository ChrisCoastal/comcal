import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schemas/database';

// Create the connection lazily to ensure env vars are loaded
let client: postgres.Sql | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

function getClient() {
  if (!client) {
    const databaseUrl = process.env.SUPABASE_DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('SUPABASE_DATABASE_URL environment variable is not set');
    }
    client = postgres(databaseUrl, { prepare: false });
  }
  return client;
}

// Export a getter function instead of the db instance directly
export function getDb() {
  if (!dbInstance) {
    dbInstance = drizzle({ client: getClient(), schema });
  }
  return dbInstance;
}

// For backward compatibility, export db as a getter
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle>];
  },
});

// Export types
export type DB = typeof db;
