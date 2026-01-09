import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "feedback@dealsofquality.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const leadRequestSchema = z.object({
  serviceType: z.string().min(1, "Service type is required").max(200),
  zipCode: z.string().min(5, "ZIP code is required").max(10),
  customer: z.object({
    name: z.string().min(1, "Name is required").max(200),
    email: z.string().email("Invalid email address").max(255),
    phone: z.string().min(1, "Phone is required").max(20),
  }),
  urgency: z.string().min(1, "Urgency is required").max(50),
  projectDetails: z.string().optional().max(2000),
});

type LeadRequest = z.infer<typeof leadRequestSchema>;

// HTML escape function to prevent injection
const escapeHtml = (str: string): string => {
  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;",
  };
  return str.replace(/[&<>"'`=/]/g, (char) => htmlEntities[char] || char);
};

// Sanitize and escape a value for safe HTML inclusion
const sanitizeValue = (value: string | undefined | null): string => {
  if (!value) return "N/A";
  // Remove any potential newlines that could cause header injection
  const cleaned = value.replace(/[\r\n]/g, " ").trim();
  return escapeHtml(cleaned) || "N/A";
};

// Generate Concierge Dashboard HTML template
const generateConciergeDashboardHTML = (data: LeadRequest): string => {
  const { serviceType, zipCode, customer, urgency, projectDetails } = data;
  
  // Determine urgency badge color and text
  let urgencyBadge = "";
  let urgencyColor = "#2563eb"; // Default blue
  
  const urgencyLower = urgency.toLowerCase();
  if (urgencyLower.includes("as soon") || urgencyLower.includes("asap")) {
    urgencyBadge = "ASAP";
    urgencyColor = "#dc2626"; // Red
  } else if (urgencyLower.includes("week")) {
    urgencyBadge = "WITHIN A WEEK";
    urgencyColor = "#f59e0b"; // Orange
  } else {
    urgencyBadge = "FLEXIBLE";
    urgencyColor = "#2563eb"; // Blue
  }

  const safeName = sanitizeValue(customer.name);
  const safeEmail = sanitizeValue(customer.email);
  const safePhone = sanitizeValue(customer.phone);
  const safeService = sanitizeValue(serviceType);
  const safeZip = sanitizeValue(zipCode);
  const safeUrgency = sanitizeValue(urgency);
  const safeDetails = projectDetails ? sanitizeValue(projectDetails) : "";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #1f2937;
          background-color: #f9fafb;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 700px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          padding: 24px;
          text-align: center;
        }
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 24px;
          font-weight: 700;
        }
        .urgency-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 12px;
          color: #ffffff;
          background-color: ${urgencyColor};
        }
        .content {
          padding: 32px;
        }
        .section {
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e5e7eb;
        }
        .section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e5e7eb;
        }
        .info-row {
          display: flex;
          margin-bottom: 12px;
          padding: 12px;
          background-color: #f9fafb;
          border-radius: 6px;
        }
        .info-label {
          font-weight: 600;
          color: #4b5563;
          min-width: 140px;
          flex-shrink: 0;
        }
        .info-value {
          color: #111827;
          flex: 1;
        }
        .project-details {
          background-color: #f9fafb;
          padding: 16px;
          border-radius: 6px;
          border-left: 4px solid #3b82f6;
          margin-top: 12px;
          white-space: pre-wrap;
          color: #111827;
        }
        .cta-button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #3b82f6;
          color: #ffffff;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          margin-top: 16px;
        }
        .footer {
          background-color: #f9fafb;
          padding: 20px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 New Lead Received</h1>
          <div class="urgency-badge">${urgencyBadge}</div>
        </div>
        <div class="content">
          <div class="section">
            <div class="section-title">📋 Lead Information</div>
            <div class="info-row">
              <span class="info-label">Name:</span>
              <span class="info-value">${safeName}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span>
              <span class="info-value"><a href="mailto:${safeEmail}" style="color: #3b82f6; text-decoration: none;">${safeEmail}</a></span>
            </div>
            <div class="info-row">
              <span class="info-label">Phone:</span>
              <span class="info-value"><a href="tel:${safePhone}" style="color: #3b82f6; text-decoration: none;">${safePhone}</a></span>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">🎯 Service Details</div>
            <div class="info-row">
              <span class="info-label">Service Type:</span>
              <span class="info-value">${safeService}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Location (ZIP):</span>
              <span class="info-value">${safeZip}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Urgency:</span>
              <span class="info-value"><strong style="color: ${urgencyColor};">${safeUrgency}</strong></span>
            </div>
          </div>
          
          ${safeDetails ? `
          <div class="section">
            <div class="section-title">📝 Project Details</div>
            <div class="project-details">${safeDetails}</div>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 24px;">
            <a href="mailto:${safeEmail}?subject=Re: Your ${safeService} Request" class="cta-button">
              Reply to Lead
            </a>
          </div>
        </div>
        <div class="footer">
          <p>This is an automated notification from Deals Of Quality</p>
          <p>Generated on ${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send email using Resend API
const sendEmail = async (to: string, subject: string, html: string) => {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Deals Of Quality <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return response.json();
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    // Parse and validate request body
    let requestBody: unknown;
    try {
      requestBody = await req.json();
    } catch {
      console.error("Invalid JSON in request body");
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate input with zod schema
    const validationResult = leadRequestSchema.safeParse(requestBody);
    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error.issues);
      return new Response(
        JSON.stringify({
          error: "Invalid request data",
          details: validationResult.error.issues.map((i) => i.message),
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const leadData: LeadRequest = validationResult.data;

    // Generate subject line: [NEW LEAD] {Service} in {Zip} - {Urgency}
    const urgencyBadge = leadData.urgency.toLowerCase().includes("as soon") || leadData.urgency.toLowerCase().includes("asap")
      ? "ASAP"
      : leadData.urgency.toLowerCase().includes("week")
      ? "WITHIN A WEEK"
      : "FLEXIBLE";
    
    const subject = `[NEW LEAD] ${leadData.serviceType} in ${leadData.zipCode} - ${urgencyBadge}`;

    // Generate Concierge Dashboard HTML
    const html = generateConciergeDashboardHTML(leadData);

    // Send email to admin
    await sendEmail(ADMIN_EMAIL, subject, html);
    console.log("Lead email sent successfully to", ADMIN_EMAIL);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Lead email sent successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Error in send-lead function:", errorMessage);
    return new Response(
      JSON.stringify({ error: "Failed to process request", details: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
