export interface LeadNotificationData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

/**
 * Sends lead notifications using the Brevo Transactional Email REST API.
 * Sends an internal notification email to info@theaveniq.in and an automated confirmation to the lead.
 */
export async function sendLeadNotification(data: LeadNotificationData): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("[Brevo] BREVO_API_KEY is not defined in environment variables.");
    return { success: false, error: "BREVO_API_KEY is missing." };
  }

  const { name, email, phone = "Not provided", service = "General Inquiry", message } = data;

  try {
    // 1. Send Internal Notification to info@theaveniq.in
    const adminPayload = {
      sender: {
        name: "Aveniq Lead System",
        email: "hello@theaveniq.in",
      },
      to: [
        {
          email: "info@theaveniq.in",
          name: "Aveniq Info Desk",
        },
      ],
      subject: `New Lead - ${name}`,
      htmlContent: `
        <html>
          <head>
            <style>
              body { font-family: sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
              .header { border-bottom: 2px solid #10b981; padding-bottom: 10px; margin-bottom: 20px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #666; }
              .value { margin-top: 5px; font-size: 14px; }
              .message-box { background: #f9f9f9; padding: 15px; border-left: 4px solid #10b981; border-radius: 4px; font-style: italic; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Lead Inquiry Ingested</h2>
              </div>
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${phone}</div>
              </div>
              <div class="field">
                <div class="label">Service:</div>
                <div class="value">${service}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">${message.replace(/\n/g, "<br/>")}</div>
              </div>
            </div>
          </body>
        </html>
      `
    };

    console.log(`[Brevo] Sending internal notification to info@theaveniq.in for lead: ${name}`);
    const adminRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify(adminPayload),
    });

    if (!adminRes.ok) {
      const errorText = await adminRes.text();
      const errorMsg = `HTTP ${adminRes.status}: ${errorText}`;
      console.error(`[Brevo] Failed to send internal notification: ${errorMsg}`);
      return { success: false, error: `Internal notification failed: ${errorMsg}` };
    }

    const adminResponseData = await adminRes.json();
    console.log(`[Brevo] Internal notification sent successfully. Message ID: ${adminResponseData.messageId}`);

    // 2. Send Automated Confirmation to the Lead
    const confirmationPayload = {
      sender: {
        name: "Aveniq Team",
        email: "hello@theaveniq.in",
      },
      to: [
        {
          email: email,
          name: name,
        },
      ],
      subject: "Thank you for contacting Aveniq",
      htmlContent: `
        <html>
          <head>
            <style>
              body { font-family: sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
              .footer { border-top: 1px solid #eee; padding-top: 15px; margin-top: 25px; font-size: 12px; color: #888; }
            </style>
          </head>
          <body>
            <div class="container">
              <p>Hi ${name},</p>
              <p>Thank you for contacting Aveniq. We've successfully received your message regarding our <strong>${service}</strong> service.</p>
              <p>Our team is currently reviewing your message and will reach out shortly to discuss how we can help.</p>
              <br/>
              <p>Best regards,</p>
              <p><strong>Aveniq Team</strong></p>
              <div class="footer">
                <a href="https://theaveniq.in">theaveniq.in</a> &bull; Sleek. Precise. Structural.
              </div>
            </div>
          </body>
        </html>
      `
    };

    console.log(`[Brevo] Sending automated confirmation receipt to lead email: ${email}`);
    const confirmationRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify(confirmationPayload),
    });

    if (!confirmationRes.ok) {
      const errorText = await confirmationRes.text();
      console.warn(`[Brevo] Failed to send automated confirmation to lead: HTTP ${confirmationRes.status}: ${errorText}`);
      // Do not abort success response if lead notification succeeded but confirmation receipt failed.
    } else {
      const confirmationResponseData = await confirmationRes.json();
      console.log(`[Brevo] Confirmation email sent successfully. Message ID: ${confirmationResponseData.messageId}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error("[Brevo] Critical unhandled error in email service:", error);
    return { success: false, error: error.message || "Unhandled email dispatch error." };
  }
}
