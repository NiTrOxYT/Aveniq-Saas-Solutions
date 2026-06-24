-- Alter leads table to add status column if it doesn't exist
ALTER TABLE leads ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'New';

-- Create lead_notes table
CREATE TABLE IF NOT EXISTS lead_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create email_logs table
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  error_message TEXT,
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_email TEXT NOT NULL,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY DEFAULT 'current',
  company_name TEXT NOT NULL DEFAULT 'Aveniq',
  support_email TEXT NOT NULL DEFAULT 'hello@theaveniq.in',
  calendly_url TEXT NOT NULL DEFAULT 'https://calendly.com',
  social_links JSONB DEFAULT '{}'::jsonb,
  default_lead_status TEXT DEFAULT 'New',
  notification_settings JSONB DEFAULT '{"email": true}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial settings row
INSERT INTO settings (id, company_name, support_email, calendly_url)
VALUES ('current', 'Aveniq', 'hello@theaveniq.in', 'https://calendly.com')
ON CONFLICT (id) DO NOTHING;

-- Indexes for quick lookups
CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON lead_notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at);
