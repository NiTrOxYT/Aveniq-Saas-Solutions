import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

Deno.serve(async (req) => {
  // CORS Preflight Check
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  // To prevent random internet clients from executing the cleanup,
  // we check if it is called with the Service Role token or internally via Supabase cron
  const authHeader = req.headers.get("Authorization");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  const isAuthorized = authHeader && serviceKey && (
    authHeader === `Bearer ${serviceKey}` || 
    authHeader.replace("Bearer ", "") === serviceKey
  );

  if (!isAuthorized) {
    console.warn("BLOCKED_CLEANUP_UNAUTHORIZED", { timestamp: new Date().toISOString() });
    return new Response(JSON.stringify({ error: "Access denied" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabase = createClient(supabaseUrl, serviceKey!);

    // Deletes records older than 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { error } = await supabase
      .from("lead_rate_limits")
      .delete()
      .lt("created_at", thirtyDaysAgo);

    if (error) {
      console.warn("DB_CLEANUP_QUERY_WARNING", { error: error.message, timestamp: new Date().toISOString() });
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("CLEANUP_SUCCESSFUL", { timestamp: new Date().toISOString() });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err: any) {
    // Lead capture must remain operational even if cleanup fails
    console.warn("CLEANUP_CRITICAL_WARNING", { error: err.message, timestamp: new Date().toISOString() });
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
