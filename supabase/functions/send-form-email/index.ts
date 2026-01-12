import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Input validation schema with strict limits
const formDataSchema = z.record(z.string().max(2000).optional());

const emailRequestSchema = z.object({
  formType: z.enum(["booking", "schedule", "application", "newsletter", "quote"]),
  customerEmail: z.string().email("Invalid email address").max(255),
  customerName: z.string().min(1, "Name is required").max(200),
  formData: formDataSchema,
  // Honeypot field - should always be empty for legitimate submissions
  website: z.string().max(0).optional(),
});

type EmailRequest = z.infer<typeof emailRequestSchema>;

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

const sendEmail = async (to: string, subject: string, html: string) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Deals of Quality Help <help@dealsofquality.com>",
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
    const validationResult = emailRequestSchema.safeParse(requestBody);
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

    const { formType, customerEmail, customerName, formData, website }: EmailRequest =
      validationResult.data;

    // Honeypot check - if the hidden field has content, it's likely a bot
    if (website && website.length > 0) {
      // Silently accept but don't process - bots won't know they failed
      console.log("Honeypot triggered, rejecting spam submission");
      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize all values for safe HTML inclusion
    const safeName = sanitizeValue(customerName);
    const safeEmail = sanitizeValue(customerEmail);

    console.log("Processing email request:", {
      formType,
      customerEmail: safeEmail,
      customerName: safeName,
    });

    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "eli.campbell@me.com";
    let customerSubject = "";
    let adminSubject = "";
    let customerHtml = "";
    let adminHtml = "";

    if (formType === "booking") {
      // Check if this is a contact form message (has message field but no service/date)
      const isContactForm = formData.message && !formData.service && !formData.preferredDate;
      
      if (isContactForm) {
        customerSubject = "Thank You for Contacting Us - Deals Of Quality";
        adminSubject = `New Contact Form Submission from ${safeName}`;

        customerHtml = `
          <h1>Thank you for contacting us, ${safeName}!</h1>
          <p>We've received your message and will get back to you as soon as possible.</p>
          <p>If you have any urgent questions, please call us at <strong>(818) 584-7389</strong>.</p>
          <p>Best regards,<br>The Deals Of Quality Team</p>
        `;

        adminHtml = `
          <h1>New Contact Form Submission</h1>
          <h3>Contact Information:</h3>
          <ul>
            <li><strong>Name:</strong> ${safeName}</li>
            <li><strong>Email:</strong> ${safeEmail}</li>
            <li><strong>Phone:</strong> ${sanitizeValue(formData.phone)}</li>
            ${formData.serviceCategory ? `<li><strong>Category:</strong> ${sanitizeValue(formData.serviceCategory)}</li>` : ''}
          </ul>
          <h3>Message:</h3>
          <p>${sanitizeValue(formData.message)}</p>
        `;
      } else {
        customerSubject = "Your Booking Request - Deals Of Quality";
        adminSubject = `New Booking Request from ${safeName}`;

        customerHtml = `
          <h1>Thank you for your booking request, ${safeName}!</h1>
          <p>We've received your service request and will contact you shortly to confirm your appointment.</p>
          <h3>Your Request Details:</h3>
          <ul>
            <li><strong>Service:</strong> ${sanitizeValue(formData.service)}</li>
            <li><strong>Preferred Date:</strong> ${sanitizeValue(formData.preferredDate)}</li>
            <li><strong>Preferred Time:</strong> ${sanitizeValue(formData.preferredTime)}</li>
            <li><strong>Address:</strong> ${sanitizeValue(formData.address)}</li>
            <li><strong>Additional Details:</strong> ${sanitizeValue(formData.details)}</li>
          </ul>
          <p>If you have any questions, please call us at <strong>(818) 584-7389</strong>.</p>
          <p>Best regards,<br>The Deals Of Quality Team</p>
        `;

        adminHtml = `
          <h1>New Booking Request</h1>
          <h3>Customer Information:</h3>
          <ul>
            <li><strong>Name:</strong> ${safeName}</li>
            <li><strong>Email:</strong> ${safeEmail}</li>
            <li><strong>Phone:</strong> ${sanitizeValue(formData.phone)}</li>
          </ul>
          <h3>Service Details:</h3>
          <ul>
            <li><strong>Service:</strong> ${sanitizeValue(formData.service)}</li>
            <li><strong>Preferred Date:</strong> ${sanitizeValue(formData.preferredDate)}</li>
            <li><strong>Preferred Time:</strong> ${sanitizeValue(formData.preferredTime)}</li>
            <li><strong>Address:</strong> ${sanitizeValue(formData.address)}</li>
            <li><strong>Additional Details:</strong> ${sanitizeValue(formData.details)}</li>
          </ul>
        `;
      }
    } else if (formType === "schedule") {
      customerSubject = "Your Service Request - Deals Of Quality";
      adminSubject = `New Service Request from ${safeName}`;

      customerHtml = `
        <h1>Thank you for your service request, ${safeName}!</h1>
        <p>We've received your request and will contact you shortly to confirm your appointment.</p>
        <h3>Your Request Details:</h3>
        <ul>
          <li><strong>Category:</strong> ${sanitizeValue(formData.category)}</li>
          <li><strong>Service:</strong> ${sanitizeValue(formData.service)}</li>
          <li><strong>Preferred Date:</strong> ${sanitizeValue(formData.preferredDate)}</li>
          <li><strong>Preferred Time:</strong> ${sanitizeValue(formData.preferredTime)}</li>
          <li><strong>Address:</strong> ${sanitizeValue(formData.address)}</li>
          <li><strong>Additional Details:</strong> ${sanitizeValue(formData.details)}</li>
        </ul>
        <p>If you have any questions, please call us at <strong>(818) 584-7389</strong>.</p>
        <p>Best regards,<br>The Deals Of Quality Team</p>
      `;

      adminHtml = `
        <h1>New Service Request</h1>
        <h3>Customer Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${safeName}</li>
          <li><strong>Email:</strong> ${safeEmail}</li>
          <li><strong>Phone:</strong> ${sanitizeValue(formData.phone)}</li>
        </ul>
        <h3>Service Details:</h3>
        <ul>
          <li><strong>Category:</strong> ${sanitizeValue(formData.category)}</li>
          <li><strong>Service:</strong> ${sanitizeValue(formData.service)}</li>
          <li><strong>Preferred Date:</strong> ${sanitizeValue(formData.preferredDate)}</li>
          <li><strong>Preferred Time:</strong> ${sanitizeValue(formData.preferredTime)}</li>
          <li><strong>Address:</strong> ${sanitizeValue(formData.address)}</li>
          <li><strong>Additional Details:</strong> ${sanitizeValue(formData.details)}</li>
        </ul>
      `;
    } else if (formType === "application") {
      customerSubject = "Application Received - Deals Of Quality";
      adminSubject = `New Pro Application from ${safeName}`;

      customerHtml = `
        <h1>Thank you for applying, ${safeName}!</h1>
        <p>We've received your application to join our network of tech professionals.</p>
        <p>Our team will review your application and get back to you within 24-48 hours.</p>
        <h3>Your Application Details:</h3>
        <ul>
          <li><strong>Email:</strong> ${safeEmail}</li>
          <li><strong>Phone:</strong> ${sanitizeValue(formData.phone)}</li>
          <li><strong>ZIP Code:</strong> ${sanitizeValue(formData.zipCode)}</li>
          <li><strong>Expertise:</strong> ${sanitizeValue(formData.expertise)}</li>
          <li><strong>Experience:</strong> ${sanitizeValue(formData.experience)}</li>
        </ul>
        <p>If you have any questions, please call us at <strong>(818) 584-7389</strong>.</p>
        <p>Best regards,<br>The Deals Of Quality Team</p>
      `;

      adminHtml = `
        <h1>New Pro Application</h1>
        <h3>Applicant Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${safeName}</li>
          <li><strong>Email:</strong> ${safeEmail}</li>
          <li><strong>Phone:</strong> ${sanitizeValue(formData.phone)}</li>
          <li><strong>ZIP Code:</strong> ${sanitizeValue(formData.zipCode)}</li>
        </ul>
        <h3>Experience &amp; Expertise:</h3>
        <ul>
          <li><strong>Area of Expertise:</strong> ${sanitizeValue(formData.expertise)}</li>
          <li><strong>Years of Experience:</strong> ${sanitizeValue(formData.experience)}</li>
          <li><strong>About:</strong> ${sanitizeValue(formData.about)}</li>
        </ul>
      `;
    } else if (formType === "quote") {
      // Concierge Dashboard email template for quote requests
      const serviceType = sanitizeValue(formData.serviceCategory || formData.service || "Service Request");
      const zipCode = sanitizeValue(formData.zip || formData.zipCode || "N/A");
      const urgencyValue = sanitizeValue(formData.urgency || "Not specified");
      
      // Determine urgency badge color and text
      let urgencyBadge = "";
      let urgencyColor = "#2563eb"; // Default blue
      
      if (urgencyValue.toLowerCase().includes("as soon") || urgencyValue.toLowerCase().includes("asap")) {
        urgencyBadge = "ASAP";
        urgencyColor = "#dc2626"; // Red
      } else if (urgencyValue.toLowerCase().includes("week")) {
        urgencyBadge = "WITHIN A WEEK";
        urgencyColor = "#f59e0b"; // Orange
      } else {
        urgencyBadge = "FLEXIBLE";
        urgencyColor = "#2563eb"; // Blue
      }

      // Build dynamic subject line: [NEW LEAD] {Service} in {Zip} - {Urgency}
      adminSubject = `[NEW LEAD] ${serviceType} in ${zipCode} - ${urgencyBadge}`;

      // Concierge Dashboard HTML Template
      adminHtml = `
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
                  <span class="info-value"><a href="tel:${sanitizeValue(formData.phone)}" style="color: #3b82f6; text-decoration: none;">${sanitizeValue(formData.phone)}</a></span>
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">🎯 Service Details</div>
                <div class="info-row">
                  <span class="info-label">Service Type:</span>
                  <span class="info-value">${serviceType}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Location (ZIP):</span>
                  <span class="info-value">${zipCode}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Urgency:</span>
                  <span class="info-value"><strong style="color: ${urgencyColor};">${urgencyValue}</strong></span>
                </div>
              </div>
              
              ${formData.message ? `
              <div class="section">
                <div class="section-title">📝 Project Details</div>
                <div class="project-details">${sanitizeValue(formData.message)}</div>
              </div>
              ` : ''}
              
              <div style="text-align: center; margin-top: 24px;">
                <a href="mailto:${safeEmail}?subject=Re: Your ${serviceType} Request" class="cta-button">
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

      // Customer confirmation email
      customerSubject = "Thank You for Your Quote Request - Deals Of Quality";
      customerHtml = `
        <h1>Thank you for your quote request, ${safeName}!</h1>
        <p>We've received your request for <strong>${serviceType}</strong> in ${zipCode} and will connect you with qualified pros in your area.</p>
        <p>You can expect to hear from us soon. If you have any urgent questions, please call us at <strong>(818) 584-7389</strong>.</p>
        <p>Best regards,<br>The Deals Of Quality Team</p>
      `;
    } else if (formType === "newsletter") {
      customerSubject = "Welcome to Deals Of Quality Newsletter!";
      adminSubject = `New Newsletter Subscription: ${safeEmail}`;

      customerHtml = `
        <h1>Thank you for subscribing, ${safeName}!</h1>
        <p>You've successfully subscribed to our newsletter. You'll receive updates on:</p>
        <ul>
          <li>Home service tips and maintenance advice</li>
          <li>Special offers and promotions</li>
          <li>New services and service categories</li>
          <li>Technology updates and smart home insights</li>
        </ul>
        <p>If you have any questions, please call us at <strong>(818) 584-7389</strong>.</p>
        <p>Best regards,<br>The Deals Of Quality Team</p>
      `;

      adminHtml = `
        <h1>New Newsletter Subscription</h1>
        <h3>Subscriber Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${safeName}</li>
          <li><strong>Email:</strong> ${safeEmail}</li>
        </ul>
        <p><strong>Subscription Date:</strong> ${new Date().toLocaleString()}</p>
      `;
    }

    // Send email to customer (skip for newsletter if generic subscriber name)
    if (formType !== "newsletter" || customerName !== "Newsletter Subscriber") {
      const customerEmailResponse = await sendEmail(
        customerEmail,
        customerSubject,
        customerHtml
      );
      console.log("Customer email sent successfully");
    }

    // Send email to admin (always send admin notification to admin email)
    const adminEmailResponse = await sendEmail(
      adminEmail,
      adminSubject,
      adminHtml
    );
    console.log("Admin email sent successfully to", adminEmail);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Emails sent successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Error in send-form-email function:", errorMessage);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
