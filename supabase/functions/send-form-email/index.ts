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
  formType: z.enum(["booking", "schedule", "application", "newsletter"]),
  customerEmail: z.string().email("Invalid email address").max(255),
  customerName: z.string().min(1, "Name is required").max(200),
  formData: formDataSchema,
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

    const { formType, customerEmail, customerName, formData }: EmailRequest =
      validationResult.data;

    // Sanitize all values for safe HTML inclusion
    const safeName = sanitizeValue(customerName);
    const safeEmail = sanitizeValue(customerEmail);

    console.log("Processing email request:", {
      formType,
      customerEmail: safeEmail,
      customerName: safeName,
    });

    const adminEmail = "feedback@dealsofquality.com";
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

    // Send email to admin (always send admin notification to feedback@dealsofquality.com)
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
