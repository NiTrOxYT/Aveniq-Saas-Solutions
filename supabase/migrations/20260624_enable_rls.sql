-- Enable Row Level Security (RLS) and define access control policies

-- Create helper function to check admin clearance
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on all active tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- 1. admin_users policies
DROP POLICY IF EXISTS "Allow select for own operator profile" ON admin_users;
CREATE POLICY "Allow select for own operator profile" ON admin_users
  FOR SELECT TO authenticated USING (id = auth.uid());

-- 2. projects policies
DROP POLICY IF EXISTS "Allow select for public or admin" ON projects;
CREATE POLICY "Allow select for public or admin" ON projects
  FOR SELECT USING (status = 'Published' OR is_admin());

DROP POLICY IF EXISTS "Allow all for admin on projects" ON projects;
CREATE POLICY "Allow all for admin on projects" ON projects
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- 3. leads policies
DROP POLICY IF EXISTS "Allow all for admin on leads" ON leads;
CREATE POLICY "Allow all for admin on leads" ON leads
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- 4. lead_rate_limits policies
-- Note: Vercel functions write using service_role bypasses RLS. No public permissions defined by default.

-- 5. lead_notes policies
DROP POLICY IF EXISTS "Allow all for admin on lead_notes" ON lead_notes;
CREATE POLICY "Allow all for admin on lead_notes" ON lead_notes
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- 6. email_logs policies
DROP POLICY IF EXISTS "Allow all for admin on email_logs" ON email_logs;
CREATE POLICY "Allow all for admin on email_logs" ON email_logs
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- 7. activity_logs policies
DROP POLICY IF EXISTS "Allow all for admin on activity_logs" ON activity_logs;
CREATE POLICY "Allow all for admin on activity_logs" ON activity_logs
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- 8. settings policies
DROP POLICY IF EXISTS "Allow all for admin on settings" ON settings;
CREATE POLICY "Allow all for admin on settings" ON settings
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
