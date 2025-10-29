'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/client';
import { getEntries } from '@/app/actions/entries';

export default function TestSupabasePage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  const testConnection = async () => {
    setIsLoading(true);
    addResult('Testing Supabase connection...');

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('communication_entries')
        .select('count')
        .limit(1);

      if (error) {
        addResult(`❌ Connection failed: ${error.message}`);
        return;
      }

      addResult('✅ Connection successful');
    } catch (err) {
      addResult(
        `❌ Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const testInsert = async () => {
    setIsLoading(true);
    addResult('Testing data insertion...');

    try {
      const supabase = createClient();
      const testEntry = {
        category: ['event'],
        title: 'Test Event from UI',
        summary: 'This is a test entry created from the UI',
        issue: false,
        significance: 'Testing Supabase integration from UI',
        lead_organization: 'federal',
        comms_contact: {
          firstname: 'Test',
          lastname: 'User',
          email: 'test@example.com',
        },
        comms_material: ['news release'],
        schedule_status: 'confirmed',
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 3600000).toISOString(),
        all_day: false,
        representatives: ['Joe'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('communication_entries')
        .insert([testEntry])
        .select()
        .single();

      if (error) {
        addResult(`❌ Insert failed: ${error.message}`);
        return;
      }

      addResult(`✅ Insert successful, ID: ${data.id}`);
    } catch (err) {
      addResult(
        `❌ Insert failed: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const testServerAction = async () => {
    setIsLoading(true);
    addResult('Testing server action (getEntries)...');

    try {
      const entries = await getEntries();
      addResult(`✅ Server action successful, found ${entries.length} entries`);
    } catch (err) {
      addResult(
        `❌ Server action failed: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Supabase Integration Test
          </h1>
          <p className='text-gray-600'>
            Test your Supabase connection and database operations
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <Card>
            <CardHeader>
              <CardTitle>Test Actions</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <Button
                onClick={testConnection}
                disabled={isLoading}
                className='w-full'
              >
                Test Connection
              </Button>

              <Button
                onClick={testInsert}
                disabled={isLoading}
                variant='outline'
                className='w-full'
              >
                Test Insert
              </Button>

              <Button
                onClick={testServerAction}
                disabled={isLoading}
                variant='outline'
                className='w-full'
              >
                Test Server Action
              </Button>

              <Button
                onClick={clearResults}
                variant='secondary'
                className='w-full'
              >
                Clear Results
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm max-h-96 overflow-y-auto'>
                {testResults.length === 0 ? (
                  <div className='text-gray-500'>
                    No test results yet. Click a test button to start.
                  </div>
                ) : (
                  testResults.map((result, index) => (
                    <div key={index} className='mb-1'>
                      {result}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h3 className='font-semibold mb-2'>1. Create Database Table</h3>
              <p className='text-sm text-gray-600 mb-2'>
                Run the SQL in{' '}
                <code className='bg-gray-100 px-2 py-1 rounded'>
                  supabase-schema.sql
                </code>{' '}
                in your Supabase SQL editor.
              </p>
            </div>

            <div>
              <h3 className='font-semibold mb-2'>2. Environment Variables</h3>
              <p className='text-sm text-gray-600 mb-2'>
                Make sure your{' '}
                <code className='bg-gray-100 px-2 py-1 rounded'>
                  .env.local
                </code>{' '}
                has the correct Supabase credentials.
              </p>
            </div>

            <div>
              <h3 className='font-semibold mb-2'>3. Test Form Submission</h3>
              <p className='text-sm text-gray-600'>
                Go to{' '}
                <code className='bg-gray-100 px-2 py-1 rounded'>/newentry</code>{' '}
                and try creating a new entry.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
