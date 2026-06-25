import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import crypto from "crypto";
import { sendLeadNotification } from "./lib/brevo.js";

const ALLOWED_ORIGINS = ["https://theaveniq.in", "https://www.theaveniq.in"];

const isOriginAllowed = (origin: string | undefined): boolean => {
  if (!origin) return false;
  return (
    ALLOWED_ORIGINS.includes(origin) ||
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:") ||
    origin.includes(".replit.dev") ||
    origin.includes(".replit.co")
  );
};

// Zod Schema matching the Vercel specification payload keys
const leadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().min(1).email().max(254),
  phone: z.string().trim().max(25).optional(),
  company: z.string().trim().min(1).max(100),
  projectType: z.string().min(1),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  preferredContactMethod: z.string().min(1),
  projectDescription: z.string().trim().min(1).max(1000),
  source: z.string().optional(),
});

const getClientIp = (req: any): string => {
  const xForwardedFor = req.headers["x-forwarded-for"];
  if (xForwardedFor) {
    const ips = (xForwardedFor as string).split(",").map((ip) => ip.trim());
    if (ips[0]) return ips[0];
  }
  const xRealIp = req.headers["x-real-ip"];
  if (xRealIp) return xRealIp as string;
  const cfConnectingIp = req.headers["cf-connecting-ip"];
  if (cfConnectingIp) return cfConnectingIp as string;
  return req.socket?.remoteAddress || "127.0.0.1";
};

const hashIp = (ip: string): string => {
  return crypto.createHash("sha256").update(ip).digest("hex");
};

export default async function handler(req: any, res: any) {
  const origin = req.headers.origin || "";
  const allowed = isOriginAllowed(origin);

  res.setHeader("Access-Control-Allow-Origin", allowed ? origin : "https://theaveniq.in");
  res.setHeader("Access-Control-Allow-Headers", "authorization, x-client-info, apikey, content-type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  // 1. CORS Preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 2. Origin Check
  if (!allowed) {
    console.warn("BLOCKED_UNAUTHORIZED_ORIGIN", { timestamp: new Date().toISOString() });
    return res.status(403).json({ error: "Request origin not allowed." });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (parseErr: any) {
        return res.status(400).json({ error: `Invalid JSON payload: ${parseErr.message}` });
      }
    }
    if (!body) {
      return res.status(400).json({ error: "Request body is empty" });
    }

    // 3. Honeypot check
    if (body.website_url && body.website_url.trim() !== "") {
      console.warn("BLOCKED_HONEYPOT_TRIGGERED", { timestamp: new Date().toISOString() });
      return res.status(400).json({ error: "Please review your information and try again." });
    }

    // 4. Timing check
    if (body.time_elapsed !== undefined && body.time_elapsed < 3000) {
      console.warn("BLOCKED_FAST_BOT_SUBMISSION", { timestamp: new Date().toISOString() });
      return res.status(400).json({ error: "Please review your information and try again." });
    }

    // 5. Payload Validation
    const validationResult = leadSchema.safeParse({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      projectType: body.projectType,
      budget: body.budget,
      timeline: body.timeline,
      preferredContactMethod: body.preferredContactMethod,
      projectDescription: body.projectDescription,
      source: body.source,
    });

    if (!validationResult.success) {
      console.warn("BLOCKED_PAYLOAD_VALIDATION_FAILED", { timestamp: new Date().toISOString() });
      return res.status(400).json({ error: "Please review your information and try again." });
    }

    const validatedData = validationResult.data;

    // 6. IP Hashing
    const rawIp = getClientIp(req);
    const ipHash = hashIp(rawIp);

    // Initialize Supabase client
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "https://vgwazefismdjovobdxay.supabase.co";
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseServiceKey) {
      console.error("SUPABASE_SERVICE_ROLE_KEY is not defined");
      return res.status(500).json({ error: "SUPABASE_SERVICE_ROLE_KEY is not defined in environment variables" });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 7. Hourly Limit Check (Max 5/hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: hourlyCount, error: hourlyErr } = await supabase
      .from("lead_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", oneHourAgo);

    if (hourlyErr) {
      console.error("HOURLY_RATE_LIMIT_CHECK_ERROR", hourlyErr);
      return res.status(500).json({ error: `Hourly rate limit check database error: ${hourlyErr.message} (code ${hourlyErr.code})` });
    } else if (hourlyCount && hourlyCount >= 5) {
      console.warn("RATE_LIMIT_TRIGGERED", { limit: "hourly", timestamp: new Date().toISOString() });
      return res.status(429).json({ error: "Too many requests have been submitted from your network. Please try again later." });
    }

    // 8. Daily Limit Check (Max 20/day)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: dailyCount, error: dailyErr } = await supabase
      .from("lead_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", oneDayAgo);

    if (dailyErr) {
      console.error("DAILY_RATE_LIMIT_CHECK_ERROR", dailyErr);
      return res.status(500).json({ error: `Daily rate limit check database error: ${dailyErr.message} (code ${dailyErr.code})` });
    } else if (dailyCount && dailyCount >= 20) {
      console.warn("RATE_LIMIT_TRIGGERED", { limit: "daily", timestamp: new Date().toISOString() });
      return res.status(429).json({ error: "Too many requests have been submitted from your network. Please try again later." });
    }

    // 9. Store Rate Limit entry
    const { error: limitLogErr } = await supabase
      .from("lead_rate_limits")
      .insert({ ip_hash: ipHash });

    if (limitLogErr) {
      console.error("DB_LOG_LIMIT_METADATA_ERROR", limitLogErr);
      return res.status(500).json({ error: `Failed to insert rate limit log: ${limitLogErr.message} (code ${limitLogErr.code})` });
    }

    // Map validated payload to snake_case DB columns
    const leadDbRecord = {
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      project_type: validatedData.projectType,
      budget_range: validatedData.budget,
      timeline: validatedData.timeline,
      contact_method: validatedData.preferredContactMethod,
      message: validatedData.projectDescription,
      source: validatedData.source,
    };

    // 10. Store Lead
    const { data: leadData, error: insertErr } = await supabase
      .from("leads")
      .insert(leadDbRecord)
      .select("id")
      .single();

    if (insertErr) {
      console.error("DB_SAVE_LEAD_ERROR", insertErr);
      return res.status(500).json({ error: `Failed to insert lead into database: ${insertErr.message} (code ${insertErr.code})` });
    }

    // Log lead submission activity
    try {
      await supabase.from("activity_logs").insert({
        admin_email: "System",
        action: "lead_submitted",
        details: { lead_id: leadData?.id, email: leadDbRecord.email, name: leadDbRecord.name }
      });
    } catch (actErr) {
      console.error("FAILED_TO_LOG_SUBMISSION_ACTIVITY", actErr);
    }

    // 11. Send Emails (Brevo API Integration)
    const brevoApiKey = process.env.BREVO_API_KEY;
    if (brevoApiKey) {
      try {
        console.log("[Brevo] Dispatching lead email notification via sendLeadNotification...");
        const emailResult = await sendLeadNotification({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          service: validatedData.projectType,
          message: `${validatedData.projectDescription}\n\nBudget: ${validatedData.budget}\nTimeline: ${validatedData.timeline}\nPreferred Contact Method: ${validatedData.preferredContactMethod}`
        });

        // Log confirmation email status to Supabase
        try {
          await supabase.from("email_logs").insert([
            {
              recipient: "info@theaveniq.in",
              subject: `New Lead - ${validatedData.name}`,
              type: "internal_notification",
              status: emailResult.success ? "Sent" : "Failed",
              error_message: emailResult.error || null
            },
            {
              recipient: validatedData.email,
              subject: "Thank you for contacting Aveniq",
              type: "user_confirmation",
              status: emailResult.success ? "Sent" : "Failed",
              error_message: emailResult.error || null
            }
          ]);
        } catch (dbLogErr) {
          console.error("FAILED_TO_LOG_BREVO_EMAIL", dbLogErr);
        }

        if (!emailResult.success) {
          console.error("BREVO_EMAIL_DISPATCH_FAILED", emailResult.error);
          return res.status(500).json({ error: `Failed to send email notifications: ${emailResult.error}` });
        }
      } catch (emailErr: any) {
        console.error("BREVO_EMAIL_DISPATCH_CRITICAL_FAILURE", emailErr);
        return res.status(500).json({ error: `Critical email service failure: ${emailErr.message || emailErr}` });
      }
    } else {
      console.warn("BREVO_API_KEY_NOT_FOUND", { timestamp: new Date().toISOString() });
      return res.status(500).json({ error: "Email configuration BREVO_API_KEY is not defined in environment variables" });
    }

    console.log("SUBMISSION_SUCCESS", { timestamp: new Date().toISOString() });
    return res.status(200).json({ success: true });

  } catch (err: any) {
    console.error("SERVERLESS_FUNCTION_UNHANDLED_CRASH", err);
    return res.status(500).json({
      error: `SERVERLESS_FUNCTION_UNHANDLED_CRASH: ${err instanceof Error ? err.message : String(err)}`,
      stack: err instanceof Error ? err.stack : undefined
    });
  }
}
