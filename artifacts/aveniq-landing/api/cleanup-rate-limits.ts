import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
  // CORS check (usually not needed for crons, but let's keep it safe)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "authorization, content-type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Secure Cron check
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;

  const isAuthorized = authHeader && cronSecret && (
    authHeader === `Bearer ${cronSecret}` || 
    authHeader.replace("Bearer ", "") === cronSecret
  );

  if (!isAuthorized) {
    console.warn("BLOCKED_CLEANUP_UNAUTHORIZED", { timestamp: new Date().toISOString() });
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "https://vgwazefismdjovobdxay.supabase.co";
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseServiceKey) {
      console.error("SUPABASE_SERVICE_ROLE_KEY is not defined");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { error } = await supabase
      .from("lead_rate_limits")
      .delete()
      .lt("created_at", thirtyDaysAgo);

    if (error) {
      console.warn("DB_CLEANUP_QUERY_WARNING", { error: error.message, timestamp: new Date().toISOString() });
      return res.status(500).json({ success: false, error: error.message });
    }

    console.log("CLEANUP_SUCCESSFUL", { timestamp: new Date().toISOString() });
    return res.status(200).json({ success: true });

  } catch (err: any) {
    console.warn("CLEANUP_CRITICAL_WARNING", { error: err.message, timestamp: new Date().toISOString() });
    return res.status(500).json({ success: false, error: err.message });
  }
}
