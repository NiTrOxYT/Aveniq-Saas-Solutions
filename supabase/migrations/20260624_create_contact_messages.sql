-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  contact_reason TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New',
  source TEXT NOT NULL DEFAULT 'Direct',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS on contact_messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Define RLS Policies
-- Only authenticated administrators are allowed SELECT, UPDATE, DELETE access
DROP POLICY IF EXISTS "Allow all for admin on contact_messages" ON contact_messages;
CREATE POLICY "Allow all for admin on contact_messages" ON contact_messages
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- Add index on created_at for rapid queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
