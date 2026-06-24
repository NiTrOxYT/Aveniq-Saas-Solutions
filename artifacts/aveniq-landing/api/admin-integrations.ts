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

  // 1. Temporary Server Logs
  console.log({
    authHeader: req.headers.authorization,
    hasBrevoKey: !!process.env.BREVO_API_KEY
  });

  const brevoApiKey = process.env.BREVO_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "https://vgwazefismdjovobdxay.supabase.co";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // 2. Handle GET Request - Retrieve Status
  if (req.method === "GET") {
    if (!brevoApiKey) {
      return res.status(200).json({
        success: true,
        hasBrevoKey: false,
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
      const getResponseHeaders = (response: any) => {
        const headersObj: Record<string, string> = {};
        if (response && response.headers && typeof response.headers.forEach === "function") {
          response.headers.forEach((value: string, key: string) => {
            headersObj[key] = value;
          });
        }
        return headersObj;
      };

      const isTransactionalKey = brevoApiKey.startsWith("xkeysib-");
      console.log("[Admin Integrations] Brevo Key Verification:", {
        isTransactionalKey,
        keyLength: brevoApiKey.length,
        keyPrefix: brevoApiKey.substring(0, 8) + "..."
      });

      if (!isTransactionalKey) {
        console.warn("[Admin Integrations] WARNING: Key does not start with 'xkeysib-'. It might be an SMTP key or invalid.");
      }

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
        return res.status(502).json({
          success: false,
          status: 502,
          brevoError: { message: `Reachability check failed: ${fetchErr.message || fetchErr}` },
          exception: {
            message: fetchErr.message,
            stack: fetchErr.stack
          },
          isTransactionalKey,
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

      const accountHeaders = getResponseHeaders(accountRes);
      const accountBodyText = await accountRes.text();
      let accountJson: any = null;
      try {
        accountJson = JSON.parse(accountBodyText);
      } catch (_) {}

      console.log("[Admin Integrations] Brevo Account Endpoint Diagnostics:", {
        status: accountRes.status,
        headers: accountHeaders,
        rawBody: accountBodyText,
        parsedJson: accountJson
      });

      if (!accountRes.ok) {
        const errorMessage = accountJson?.message || accountJson?.code || accountBodyText || "Unknown Brevo error";
        const isIpError = accountBodyText.toLowerCase().includes("ip") || 
                          accountBodyText.toLowerCase().includes("not authorized") || 
                          accountBodyText.toLowerCase().includes("not verified");

        return res.status(accountRes.status).json({
          success: false,
          status: accountRes.status,
          brevoError: accountJson || { raw: accountBodyText },
          isTransactionalKey,
          headers: accountHeaders,
          configured: true,
          apiKeyPresent: true,
          apiReachable: true,
          apiStatus: isIpError ? "IP Blocked" : "Invalid API Key",
          ipError: isIpError,
          senderEmail: "hello@theaveniq.in",
          senderVerified: false,
          domainStatus: "Unknown",
          domainVerified: false,
          health: "critical",
          lastEmailSent: null,
          errorMessage: isIpError ? "Brevo security settings are blocking requests from the deployment environment." : errorMessage
        });
      }

      // Call Brevo API senders endpoint to verify verified senders
      let senderEmailStatus = "Inactive";
      let domainStatus = "Unverified";
      let health = "healthy";

      let sendersRes;
      let sendersHeaders = {};
      let sendersBodyText = "";
      let sendersJson: any = null;

      try {
        sendersRes = await fetch("https://api.brevo.com/v3/senders", { headers });
        sendersHeaders = getResponseHeaders(sendersRes);
        sendersBodyText = await sendersRes.text();
        try {
          sendersJson = JSON.parse(sendersBodyText);
        } catch (_) {}

        console.log("[Admin Integrations] Senders Endpoint Diagnostics:", {
          status: sendersRes.status,
          headers: sendersHeaders,
          rawBody: sendersBodyText,
          parsedJson: sendersJson
        });

        if (sendersRes.ok && sendersJson) {
          const aveniqSender = sendersJson.senders?.find(
            (s: any) => s.email.toLowerCase() === "hello@theaveniq.in"
          );
          if (aveniqSender) {
            senderEmailStatus = aveniqSender.active ? "Active" : "Inactive";
          }
        }
      } catch (err: any) {
        console.error("[Admin Integrations] Senders fetch error:", err);
      }

      let domainsRes;
      let domainsHeaders = {};
      let domainsBodyText = "";
      let domainsJson: any = null;

      try {
        domainsRes = await fetch("https://api.brevo.com/v3/senders/domains", { headers });
        domainsHeaders = getResponseHeaders(domainsRes);
        domainsBodyText = await domainsRes.text();
        try {
          domainsJson = JSON.parse(domainsBodyText);
        } catch (_) {}

        console.log("[Admin Integrations] Domains Endpoint Diagnostics:", {
          status: domainsRes.status,
          headers: domainsHeaders,
          rawBody: domainsBodyText,
          parsedJson: domainsJson
        });

        if (domainsRes.ok && domainsJson) {
          const aveniqDomain = domainsJson.domains?.find(
            (d: any) => d.domain.toLowerCase() === "theaveniq.in"
          );
          if (aveniqDomain) {
            domainStatus = aveniqDomain.verified ? "Verified" : "Unverified";
          }
        }
      } catch (err: any) {
        console.error("[Admin Integrations] Domains fetch error:", err);
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
        success: true,
        hasBrevoKey: true,
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
        isTransactionalKey
      });

    } catch (err: any) {
      console.error("[Admin Integrations] Failed to query Brevo status:", err);
      const isTransactionalKey = brevoApiKey ? brevoApiKey.startsWith("xkeysib-") : false;
      return res.status(500).json({
        success: false,
        status: 500,
        brevoError: { message: err.message || String(err) },
        exception: {
          message: err.message,
          stack: err.stack
        },
        isTransactionalKey,
        configured: true,
        apiKeyPresent: true,
        apiReachable: false,
        apiStatus: "Connection Error",
        senderEmail: "hello@theaveniq.in",
        senderVerified: false,
        domainStatus: "Unknown",
        domainVerified: false,
        health: "critical",
        lastEmailSent: null
      });
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
