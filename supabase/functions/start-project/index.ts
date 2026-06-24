import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";
import { z } from "https://esm.sh/zod@3.22.4";

// Whitelist configuration for CORS & Origin validation
const ALLOWED_ORIGINS = ["https://theaveniq.in", "https://www.theaveniq.in"];

const isOriginAllowed = (origin: string | null): boolean => {
  if (!origin) return false; // Reject requests with no origin (direct API bots)
  return (
    ALLOWED_ORIGINS.includes(origin) ||
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:") ||
    origin.includes(".replit.dev") ||
    origin.includes(".replit.co")
  );
};

// Zod Schema for validation on server
const leadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().min(1).email().max(254),
  company: z.string().trim().min(1).max(100),
  project_type: z.string().min(1),
  budget_range: z.string().min(1),
  timeline: z.string().min(1),
  contact_method: z.string().min(1),
  message: z.string().trim().min(1).max(1000),
  source: z.string().optional(),
});

const getClientIp = (req: Request): string => {
  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp;

  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) return xRealIp;

  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const ips = xForwardedFor.split(",").map((ip) => ip.trim());
    if (ips[0]) return ips[0];
  }

  return "127.0.0.1";
};

// SHA-256 hashing for IP addresses (Privacy protection)
const hashIp = async (ip: string): Promise<string> => {
  const msgBuffer = new TextEncoder().encode(ip);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") || "";
  const allowed = isOriginAllowed(origin);

  const corsHeaders = {
    "Access-Control-Allow-Origin": allowed ? origin : "https://theaveniq.in",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // 1. CORS Preflight Check
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // 2. Strict Origin/CORS Validation
  if (!allowed) {
    console.warn("BLOCKED_UNAUTHORIZED_ORIGIN", { timestamp: new Date().toISOString() });
    return new Response(JSON.stringify({ error: "Access denied" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();

    // 3. Honeypot check
    if (body.websiteUrl && body.websiteUrl.trim() !== "") {
      console.warn("BLOCKED_HONEYPOT_TRIGGERED", { timestamp: new Date().toISOString() });
      return new Response(JSON.stringify({ error: "Spam detected (honeypot)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 4. Timing check
    if (body.timeElapsed !== undefined && body.timeElapsed < 3000) {
      console.warn("BLOCKED_FAST_BOT_SUBMISSION", { timestamp: new Date().toISOString() });
      return new Response(JSON.stringify({ error: "Spam detected (timing check)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 5. Hash client IP before querying or storing
    const rawIp = getClientIp(req);
    const ipHash = await hashIp(rawIp);

    // Initialize Supabase Client with service key to bypass RLS for inserts
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 6. Hourly Rate Limit Check (Max 5 submissions per hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: hourlyCount, error: hourlyErr } = await supabase
      .from("lead_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", oneHourAgo);

    if (hourlyErr) {
      console.error("HOURLY_RATE_LIMIT_CHECK_ERROR", { timestamp: new Date().toISOString() });
    } else if (hourlyCount && hourlyCount >= 5) {
      console.warn("RATE_LIMIT_TRIGGERED", { limit: "hourly", timestamp: new Date().toISOString() });
      return new Response(
        JSON.stringify({ error: "Too many requests have been submitted from your network. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 7. Daily Rate Limit Check (Max 20 submissions per day)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: dailyCount, error: dailyErr } = await supabase
      .from("lead_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", oneDayAgo);

    if (dailyErr) {
      console.error("DAILY_RATE_LIMIT_CHECK_ERROR", { timestamp: new Date().toISOString() });
    } else if (dailyCount && dailyCount >= 20) {
      console.warn("RATE_LIMIT_TRIGGERED", { limit: "daily", timestamp: new Date().toISOString() });
      return new Response(
        JSON.stringify({ error: "Too many requests have been submitted from your network. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 8. Payload validation
    const validationResult = leadSchema.safeParse({
      name: body.name,
      email: body.email,
      company: body.company,
      project_type: body.project_type,
      budget_range: body.budget_range,
      timeline: body.timeline,
      contact_method: body.contact_method,
      message: body.message,
      source: body.source,
    });

    if (!validationResult.success) {
      console.warn("BLOCKED_PAYLOAD_VALIDATION_FAILED", { timestamp: new Date().toISOString() });
      return new Response(JSON.stringify({ error: "Payload validation failed" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const leadData = validationResult.data;

    // 9. Store Rate Limit entry (stores ip_hash, no raw IP!)
    const { error: limitLogErr } = await supabase
      .from("lead_rate_limits")
      .insert({ ip_hash: ipHash });

    if (limitLogErr) {
      console.error("DB_LOG_LIMIT_METADATA_ERROR", { timestamp: new Date().toISOString() });
    }

    // 10. Store Lead
    const { error: insertErr } = await supabase
      .from("leads")
      .insert(leadData);

    if (insertErr) {
      console.error("DB_SAVE_LEAD_ERROR", { timestamp: new Date().toISOString() });
      return new Response(JSON.stringify({ error: "Failed to store lead data" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 11. Send email notifications (failures do not block lead capture)
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      try {
        const helloEmailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Aveniq Portal <hello@theaveniq.in>",
            to: ["hello@theaveniq.in"],
            subject: `New Project Request: ${leadData.name} - ${leadData.company}`,
            html: `
              <h3>New Project Submission</h3>
              <p><strong>Name:</strong> ${leadData.name}</p>
              <p><strong>Email:</strong> ${leadData.email}</p>
              <p><strong>Company:</strong> ${leadData.company}</p>
              <p><strong>Project Type:</strong> ${leadData.project_type}</p>
              <p><strong>Budget Range:</strong> ${leadData.budget_range}</p>
              <p><strong>Timeline:</strong> ${leadData.timeline}</p>
              <p><strong>Contact Method:</strong> ${leadData.contact_method}</p>
              <p><strong>Description:</strong></p>
              <blockquote style="white-space: pre-wrap; background: #f9f9f9; padding: 10px; border-left: 3px solid #ccc;">${leadData.message}</blockquote>
              <p><strong>Source:</strong> ${leadData.source || "Direct"}</p>
            `,
          }),
        });

        if (!helloEmailRes.ok) {
          console.warn("EMAIL_DISPATCH_WARNING", { target: "admin", timestamp: new Date().toISOString() });
        }

        const confirmationEmailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Aveniq Team <hello@theaveniq.in>",
            to: [leadData.email],
            subject: "We've received your project request - Aveniq",
            html: `
              <p>Hi ${leadData.name},</p>
              <p>Thank you for reaching out to Aveniq. We've received your project details and are currently reviewing your requirements.</p>
              <p><strong>What happens next:</strong></p>
              <ol>
                <li>We review your requirements and tech specifications.</li>
                <li>We prepare custom architecture and roadmap recommendations.</li>
                <li>We contact you within 48 hours to align on next steps.</li>
              </ol>
              <br/>
              <p>Best regards,</p>
              <p><strong>Aveniq Team</strong><br/><a href="https://theaveniq.in">theaveniq.in</a></p>
            `,
          }),
        });

        if (!confirmationEmailRes.ok) {
          console.warn("EMAIL_DISPATCH_WARNING", { target: "user", timestamp: new Date().toISOString() });
        }
      } catch (emailErr) {
        console.warn("EMAIL_DISPATCH_ERROR", { timestamp: new Date().toISOString() });
      }
    } else {
      console.warn("EMAIL_DISPATCH_SKIPPED_NO_KEY", { timestamp: new Date().toISOString() });
    }

    console.log("SUBMISSION_SUCCESS", { timestamp: new Date().toISOString() });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: any) {
    console.error("EDGE_FUNCTION_UNHANDLED_CRASH", { timestamp: new Date().toISOString() });
    return new Response(JSON.stringify({ error: "Something went wrong. Please try again in a few minutes." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
