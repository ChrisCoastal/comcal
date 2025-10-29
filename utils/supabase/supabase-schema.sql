-- Create the communication_entries table
CREATE TABLE communication_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT[] NOT NULL,
  title TEXT NOT NULL,
  related_to TEXT,
  summary TEXT NOT NULL,
  issue BOOLEAN NOT NULL,
  significance TEXT NOT NULL,
  lead_organization TEXT NOT NULL,
  comms_contact JSONB NOT NULL,
  comms_material TEXT[] NOT NULL,
  notes TEXT,
  schedule_status TEXT NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  all_day BOOLEAN NOT NULL,
  scheduling_notes TEXT,
  representatives TEXT[],
  location JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_communication_entries_created_at ON communication_entries(created_at);
CREATE INDEX idx_communication_entries_start_date ON communication_entries(start_date);
CREATE INDEX idx_communication_entries_category ON communication_entries USING GIN(category);

-- Enable Row Level Security
ALTER TABLE communication_entries ENABLE ROW LEVEL SECURITY;

-- Create a policy for authenticated users (adjust as needed)
CREATE POLICY "Allow all operations for authenticated users" ON communication_entries
  FOR ALL USING (auth.role() = 'authenticated');

-- For development/testing, you might want to allow all operations
-- Uncomment the line below if you want to allow anonymous access for testing
-- CREATE POLICY "Allow all operations for anonymous users" ON communication_entries
--   FOR ALL USING (true);
