import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Zod schema for sending test email
const testEmailSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
});

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "authorization, content-type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Wrap response methods for detailed diagnostics
  const originalStatus = res.status;
  res.status = function (code: number) {
    console.log(`[Admin Integrations API] Response Status: ${code}`);
    return originalStatus.call(res, code);
  };

  const originalJson = res.json;
  res.json = function (data: any) {
    if (res.statusCode >= 400 && data && data.error) {
      console.error(`[Admin Integrations API Error] Status ${res.statusCode}: ${data.error}`, data.details || "");
    }
    return originalJson.call(res, data);
  };

  // 1. Admin Authentication Check
  const authHeader = req.headers.authorization;
  
  // Detailed Request Headers Logging (Excluding Secrets)
  const loggedHeaders = { ...req.headers };
  delete loggedHeaders.authorization;
  delete loggedHeaders["api-key"];
  delete loggedHeaders["x-sb-auth-token"];
  delete loggedHeaders["cookie"];
  console.log("[Admin Integrations API] Request Headers:", loggedHeaders);

  if (!authHeader) {
    console.warn("[Admin Integrations] Missing authorization header");
    return res.status(401).json({ error: "Missing authorization header" });
  }

  const token = authHeader.split(" ")[1];
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "https://vgwazefismdjovobdxay.supabase.co";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseServiceKey) {
    console.error("[Admin Integrations] SUPABASE_SERVICE_ROLE_KEY is not defined");
    return res.status(500).json({ error: "Supabase service key configuration is missing on server" });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  let userId: string;
  try {
    const { data: { user }, error: authErr } = await supabase.auth.getUser(token);
    if (authErr || !user) {
      console.warn("[Admin Integrations] User authentication failed:", {
        message: authErr?.message || "User is null",
        status: authErr?.status || 401,
        rawError: authErr
      });
      return res.status(401).json({ 
        error: "Unauthorized: Invalid session token",
        details: authErr?.message || "Invalid session token"
      });
    }
    userId = user.id;
  } catch (err: any) {
    console.error("[Admin Integrations] Auth parsing crash:", err);
    return res.status(401).json({ 
      error: "Unauthorized: Token validation crash",
      details: err.message || "Token validation crash"
    });
  }

  // Verify user is in admin_users table
  try {
    const { data: adminUser, error: adminErr } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (adminErr || !adminUser) {
      console.warn(`[Admin Integrations] Access forbidden for userId: ${userId}`, adminErr);
      return res.status(403).json({ error: "Forbidden: Administrator access required" });
    }
  } catch (dbErr: any) {
    console.error("[Admin Integrations] Admin table check failed:", dbErr);
    return res.status(500).json({ error: "Database error verifying administrator credentials" });
  }

  const brevoApiKey = process.env.BREVO_API_KEY;

  // 2. Handle GET Request - Retrieve Status
  if (req.method === "GET") {
    if (!brevoApiKey) {
      return res.status(200).json({
        configured: false,
        apiKeyPresent: false,
        apiReachable: false,
        apiStatus: "Not Configured",
        senderEmail: "hello@theaveniq.in",
        senderVerified: false,
        domainStatus: "Not Configured",
        domainVerified: false,
        health: "unknown",
        lastEmailSent: null,
      });
    }

    try {
      const headers = {
        "api-key": brevoApiKey,
        "accept": "application/json",
      };

      // Call Brevo API account endpoint to verify key validity
      let accountRes;
      try {
        accountRes = await fetch("https://api.brevo.com/v3/account", { headers });
      } catch (fetchErr: any) {
        console.error("[Admin Integrations] Reachability check failed:", fetchErr);
        return res.status(200).json({
          configured: true,
          apiKeyPresent: true,
          apiReachable: false,
          apiStatus: "API Unreachable",
          senderEmail: "hello@theaveniq.in",
          senderVerified: false,
          domainStatus: "Unknown",
          domainVerified: false,
          health: "critical",
          lastEmailSent: null,
        });
      }

      if (!accountRes.ok) {
        const bodyText = await accountRes.text();
        const isIpError = bodyText.toLowerCase().includes("ip") || 
                          bodyText.toLowerCase().includes("not authorized") || 
                          bodyText.toLowerCase().includes("not verified");
        
        if (isIpError) {
          return res.status(200).json({
            configured: true,
            apiKeyPresent: true,
            apiReachable: true,
            apiStatus: "IP Blocked",
            ipError: true,
            senderEmail: "hello@theaveniq.in",
            senderVerified: false,
            domainStatus: "Unknown",
            domainVerified: false,
            health: "critical",
            lastEmailSent: null,
            errorMessage: "Brevo security settings are blocking requests from the deployment environment."
          });
        }

        return res.status(200).json({
          configured: true,
          apiKeyPresent: true,
          apiReachable: true,
          apiStatus: "Invalid API Key",
          senderEmail: "hello@theaveniq.in",
          senderVerified: false,
          domainStatus: "Unknown",
          domainVerified: false,
          health: "critical",
          lastEmailSent: null,
        });
      }

      // Call Brevo API senders endpoint to verify verified senders
      let senderEmailStatus = "Inactive";
      let domainStatus = "Unverified";
      let health = "healthy";

      const sendersRes = await fetch("https://api.brevo.com/v3/senders", { headers });
      if (sendersRes.ok) {
        const sendersData = await sendersRes.json();
        const aveniqSender = sendersData.senders?.find(
          (s: any) => s.email.toLowerCase() === "hello@theaveniq.in"
        );
        if (aveniqSender) {
          senderEmailStatus = aveniqSender.active ? "Active" : "Inactive";
        }
      }

      const domainsRes = await fetch("https://api.brevo.com/v3/senders/domains", { headers });
      if (domainsRes.ok) {
        const domainsData = await domainsRes.json();
        const aveniqDomain = domainsData.domains?.find(
          (d: any) => d.domain.toLowerCase() === "theaveniq.in"
        );
        if (aveniqDomain) {
          domainStatus = aveniqDomain.verified ? "Verified" : "Unverified";
        }
      }

      if (senderEmailStatus === "Inactive" || domainStatus === "Unverified") {
        health = "warning";
      }

      // Fetch last successfully sent email from Supabase logs
      let lastEmailSent = null;
      try {
        const { data: logData } = await supabase
          .from("email_logs")
          .select("sent_at")
          .eq("status", "Sent")
          .order("sent_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (logData?.sent_at) {
          lastEmailSent = logData.sent_at;
        }
      } catch (logErr) {
        console.error("[Admin Integrations] Failed to query last email log:", logErr);
      }

      return res.status(200).json({
        configured: true,
        apiKeyPresent: true,
        apiReachable: true,
        apiStatus: "Connected",
        senderEmail: "hello@theaveniq.in",
        senderVerified: senderEmailStatus === "Active",
        domainStatus,
        domainVerified: domainStatus === "Verified",
        health,
        lastEmailSent,
      });

    } catch (err: any) {
      console.error("[Admin Integrations] Failed to query Brevo status:", err);
      return res.status(500).json({ error: "Failed to connect to Brevo API provider" });
    }
  }

  // 3. Handle POST Request - Send Test Email
  if (req.method === "POST") {
    if (!brevoApiKey) {
      return res.status(400).json({ error: "Brevo integration is not configured. Missing BREVO_API_KEY environment variable." });
    }

    try {
      let body = req.body;
      if (typeof body === "string") {
        body = JSON.parse(body);
      }

      const parseResult = testEmailSchema.safeParse(body);
      if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.errors[0].message });
      }

      const targetEmail = parseResult.data.email;

      // Dispatch Brevo email
      const payload = {
        sender: {
          name: "Aveniq Admin System",
          email: "hello@theaveniq.in",
        },
        to: [
          {
            email: targetEmail,
          },
        ],
        subject: "Aveniq - Brevo Connection Test",
        htmlContent: `
          <html>
            <body style="font-family: sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">Brevo Connection Success</h2>
              <p>This is a real-time transactional test email sent from the Aveniq Admin Control Deck.</p>
              <p>Your Brevo API Key Integration is active and operating correctly on Vercel serverless functions.</p>
              <br/>
              <p>Sent at: <strong>${new Date().toLocaleString()}</strong></p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
              <small style="color: #888;">Aveniq Admin Service</small>
            </body>
          </html>
        `
      };

      const dispatchRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": brevoApiKey,
          "content-type": "application/json",
          "accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const httpStatus = dispatchRes.status;
      let responseBody: any = null;
      let responseText = "";
      try {
        responseText = await dispatchRes.clone().text();
        responseBody = JSON.parse(responseText);
      } catch (e) {
        responseBody = { raw: responseText || null };
      }

      const messageId = responseBody?.messageId || dispatchRes.headers.get("message-id") || dispatchRes.headers.get("x-request-id") || null;
      const dispatchOk = dispatchRes.ok;

      // Diagnostic Logging
      console.log(`[Brevo Diagnostics] HTTP Status: ${httpStatus}`);
      console.log(`[Brevo Diagnostics] Response Body: ${responseText}`);
      console.log(`[Brevo Diagnostics] Request ID (Message ID): ${messageId}`);

      const statusText = dispatchOk ? "Sent" : "Failed";
      
      let errorMsg = null;
      if (!dispatchOk) {
        const isIpError = responseText.toLowerCase().includes("ip") || 
                          responseText.toLowerCase().includes("not authorized") || 
                          responseText.toLowerCase().includes("not verified");
        if (isIpError) {
          errorMsg = "Brevo security settings are blocking requests from the deployment environment.";
        } else {
          errorMsg = responseBody?.message || `HTTP Status ${httpStatus}`;
        }
      }

      // Log activity to email_logs
      try {
        await supabase.from("email_logs").insert({
          recipient: targetEmail,
          subject: "Aveniq - Brevo Connection Test",
          type: "test_email",
          status: statusText,
          error_message: errorMsg || `HTTP Status ${httpStatus} | MsgID: ${messageId}`,
        });
      } catch (logErr) {
        console.error("[Admin Integrations] Failed to write test email log to DB:", logErr);
      }

      // Log to activity_logs
      try {
        await supabase.from("activity_logs").insert({
          admin_email: "Administrator",
          action: "test_email_dispatched",
          details: { 
            recipient: targetEmail, 
            success: dispatchOk,
            httpStatus,
            responseBody,
            messageId,
            error: errorMsg,
          },
        });
      } catch (actErr) {
        console.error("[Admin Integrations] Failed to write activity log:", actErr);
      }

      if (!dispatchOk) {
        return res.status(httpStatus).json({ error: errorMsg });
      }

      return res.status(200).json({ success: true, messageId });

    } catch (err: any) {
      console.error("[Admin Integrations] Test email dispatch crash:", err);
      return res.status(500).json({ error: `Unhandled dispatch crash: ${err.message || err}` });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
