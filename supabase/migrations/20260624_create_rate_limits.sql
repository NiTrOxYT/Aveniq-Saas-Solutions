-- Create leads table to store form submissions
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  project_type TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  timeline TEXT NOT NULL,
  contact_method TEXT NOT NULL,
  message TEXT NOT NULL,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create a submission tracking table for rate limiting
CREATE TABLE IF NOT EXISTS lead_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance & quick IP queries
CREATE INDEX IF NOT EXISTS idx_lead_rate_limits_hash
ON lead_rate_limits(ip_hash);

CREATE INDEX IF NOT EXISTS idx_lead_rate_limits_created
ON lead_rate_limits(created_at);
