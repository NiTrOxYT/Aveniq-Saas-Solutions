-- Create a submission tracking table
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
