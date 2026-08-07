import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import crypto from "crypto";
import { sendLeadNotification } from "./lib/brevo.js";

const ALLOWED_ORIGINS = ["https://theaveniq.in", "https://www.theaveniq.in"];

const isOriginAllowed = (origin: string | undefined, req?: any): boolean => {
  if (!origin) {
    const referer = req?.headers?.referer || req?.headers?.referrer;
    if (referer) {
      try {
        const refUrl = new URL(referer);
        return isOriginAllowed(refUrl.origin, req);
      } catch (e) {}
    }
    return true;
  }

  if (req?.headers?.host) {
    const host = req.headers.host;
    if (origin === `https://${host}` || origin === `http://${host}`) {
      return true;
    }
  }

  return (
    ALLOWED_ORIGINS.includes(origin) ||
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:") ||
    origin.endsWith(".vercel.app") ||
    origin.includes(".replit.dev") ||
    origin.includes(".replit.co")
  );
};

// Zod validation schema for contact submissions
const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().min(1).email().max(254),
  phone: z.string().trim().max(25).optional(),
  company: z.string().trim().min(1).max(100),
  contactReason: z.enum(["New Project", "General Inquiry", "Support Request", "Partnership", "Other"]),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(2000),
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
  const allowed = isOriginAllowed(origin, req);

  res.setHeader("Access-Control-Allow-Origin", allowed && origin ? origin : "https://theaveniq.in");
  res.setHeader("Access-Control-Allow-Headers", "authorization, x-client-info, apikey, content-type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  // CORS Preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Origin check
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

    // Honeypot check
    if (body.website_url && body.website_url.trim() !== "") {
      console.warn("BLOCKED_HONEYPOT_TRIGGERED", { timestamp: new Date().toISOString() });
      return res.status(400).json({ error: "Please review your information and try again." });
    }

    // Timing check
    if (body.time_elapsed !== undefined && body.time_elapsed < 3000) {
      console.warn("BLOCKED_FAST_BOT_SUBMISSION", { timestamp: new Date().toISOString() });
      return res.status(400).json({ error: "Please review your information and try again." });
    }

    // Payload validation
    const validationResult = contactSchema.safeParse({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      contactReason: body.contactReason,
      subject: body.subject,
      message: body.message,
      source: body.source,
    });

    if (!validationResult.success) {
      console.warn("BLOCKED_PAYLOAD_VALIDATION_FAILED", { timestamp: new Date().toISOString() });
      return res.status(400).json({ error: "Please review your information and try again." });
    }

    const validatedData = validationResult.data;

    // IP Hashing
    const rawIp = getClientIp(req);
    const ipHash = hashIp(rawIp);

    // Initialize Supabase Client with fallback keys
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "https://vgwazefismdjovobdxay.supabase.co";
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
      process.env.VITE_SUPABASE_ANON_KEY ||
      "sb_publishable_JRj_VsSZqMx2l3D8C2aC4g_k9WtTDoj";

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Hourly Limit Check (Max 5/hour)
    try {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      const { count: hourlyCount } = await supabase
        .from("lead_rate_limits")
        .select("*", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .gte("created_at", oneHourAgo);

      if (hourlyCount && hourlyCount >= 5) {
        console.warn("RATE_LIMIT_TRIGGERED", { limit: "hourly", timestamp: new Date().toISOString() });
        return res.status(429).json({ error: "Too many requests have been submitted from your network. Please try again later." });
      }
    } catch (rlErr) {
      console.warn("HOURLY_RATE_LIMIT_CHECK_SKIPPED", rlErr);
    }

    // Daily Limit Check (Max 20/day)
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { count: dailyCount } = await supabase
        .from("lead_rate_limits")
        .select("*", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .gte("created_at", oneDayAgo);

      if (dailyCount && dailyCount >= 20) {
        console.warn("RATE_LIMIT_TRIGGERED", { limit: "daily", timestamp: new Date().toISOString() });
        return res.status(429).json({ error: "Too many requests have been submitted from your network. Please try again later." });
      }
    } catch (rlErr) {
      console.warn("DAILY_RATE_LIMIT_CHECK_SKIPPED", rlErr);
    }

    // Store Rate Limit entry
    try {
      await supabase.from("lead_rate_limits").insert({ ip_hash: ipHash });
    } catch (rlErr) {
      console.warn("RATE_LIMIT_LOG_SKIPPED", rlErr);
    }

    // Map payload keys to DB schema
    const contactDbRecord = {
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      contact_reason: validatedData.contactReason,
      subject: validatedData.subject,
      message: validatedData.message,
      source: validatedData.source || "Direct"
    };

    // Store submission in contact_messages
    let contactId: any = null;
    try {
      const { data: contactData, error: insertErr } = await supabase
        .from("contact_messages")
        .insert(contactDbRecord)
        .select("id")
        .single();

      if (insertErr) {
        console.error("DB_SAVE_CONTACT_ERROR", insertErr);
      } else {
        contactId = contactData?.id;
      }
    } catch (dbErr) {
      console.error("DB_SAVE_CONTACT_EXCEPTION", dbErr);
    }

    // Store submission in leads table for Admin Panel CRM
    const leadDbRecord = {
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      project_type: validatedData.contactReason,
      budget_range: "N/A (Contact Form)",
      timeline: "Flexible",
      contact_method: "Email",
      message: `[${validatedData.contactReason}] ${validatedData.subject}: ${validatedData.message}`,
      source: validatedData.source || "Contact Us Page",
      status: "New"
    };

    try {
      const { error: leadInsertErr } = await supabase
        .from("leads")
        .insert(leadDbRecord);

      if (leadInsertErr) {
        console.error("DB_SAVE_LEAD_FROM_CONTACT_ERROR", leadInsertErr);
      }
    } catch (leadDbErr) {
      console.error("DB_SAVE_LEAD_FROM_CONTACT_EXCEPTION", leadDbErr);
    }

    // Log administrative activity trail entry
    try {
      await supabase.from("activity_logs").insert({
        admin_email: "System",
        action: "contact_submitted",
        details: { contact_id: contactId, email: contactDbRecord.email, reason: contactDbRecord.contact_reason }
      });
    } catch (actErr) {
      console.error("FAILED_TO_LOG_CONTACT_ACTIVITY", actErr);
    }

    // Dispatch Alerts (Brevo API Integration)
    const brevoApiKey = process.env.BREVO_API_KEY;
    if (brevoApiKey) {
      try {
        console.log("[Brevo] Dispatching lead email notification via sendLeadNotification...");
        const emailResult = await sendLeadNotification({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          service: validatedData.contactReason,
          message: validatedData.message
        });

        // Log administrative email logs to Supabase
        try {
          await supabase.from("email_logs").insert([
            {
              recipient: "info@theaveniq.site",
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
        }
      } catch (emailErr: any) {
        console.error("BREVO_EMAIL_DISPATCH_CRITICAL_FAILURE", emailErr);
      }
    } else {
      console.warn("BREVO_API_KEY_NOT_FOUND", { timestamp: new Date().toISOString() });
    }

    console.log("CONTACT_SUBMISSION_SUCCESS", { timestamp: new Date().toISOString() });
    return res.status(200).json({ success: true });

  } catch (err: any) {
    console.error("CONTACT_HANDLER_UNHANDLED_CRASH", err);
    return res.status(500).json({
      error: `CONTACT_HANDLER_UNHANDLED_CRASH: ${err instanceof Error ? err.message : String(err)}`
    });
  }
}
