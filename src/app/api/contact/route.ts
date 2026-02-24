import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// ============================================
// CONFIGURATION
// ============================================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;
const personalEmailRecipient = process.env.PERSONAL_EMAIL;
const fromEmailAddress = process.env.CONTACT_FORM_SEND_FROM_EMAIL;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Supabase URL or Service Key is not defined. Check .env.local");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;
const supabaseAdmin = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

// ============================================
// SECURITY: Rate Limiting (In-Memory Store)
// ============================================
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per minute per IP

function getRateLimitKey(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || 'unknown';
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

// ============================================
// SECURITY: Input Validation & Sanitization
// ============================================
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 254) return false; // RFC 5321 max length
  return EMAIL_REGEX.test(email);
}

function sanitizeHtml(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

function sanitizeInput(str: string, maxLength: number = 1000): string {
  if (!str || typeof str !== 'string') return '';
  return str.trim().slice(0, maxLength);
}

// ============================================
// API HANDLER
// ============================================
export async function POST(req: NextRequest) {
  // Check rate limit first
  const rateLimitKey = getRateLimitKey(req);
  if (isRateLimited(rateLimitKey)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Server configuration issue.' }, { status: 500 });
  }

  const canSendEmail = resend && personalEmailRecipient && fromEmailAddress;

  let submissionData;

  try {
    const body = await req.json();

    // Honeypot check - if filled, it's likely a bot
    if (body.website && body.website.length > 0) {
      // Silently accept but don't process (anti-spam)
      return NextResponse.json({ message: 'Message sent successfully!' }, { status: 201 });
    }

    // Sanitize and validate inputs
    const name = sanitizeInput(body.name, 100);
    const submitterEmail = sanitizeInput(body.email, 254);
    const subject = sanitizeInput(body.subject, 200);
    const message = sanitizeInput(body.message, 5000);

    submissionData = { name, email: submitterEmail, subject, message };

    // Validation
    if (!name || name.length < 2) {
      return NextResponse.json({ error: 'Please provide a valid name (at least 2 characters).' }, { status: 400 });
    }
    if (!submitterEmail || !isValidEmail(submitterEmail)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json({ error: 'Please provide a message (at least 10 characters).' }, { status: 400 });
    }

    const { data, error: dbError } = await supabaseAdmin
      .from('contact_submissions') // Your table name
      .insert([{ name, submitterEmail, subject: subject ?? null, message }]);

    if (dbError) {
      console.error('Supabase error inserting contact submission:', dbError);
      return NextResponse.json({ error: 'Failed to save message.', details: dbError.message }, { status: 500 });
    }

    // Optionally: Send an email notification to yourself here (e.g., using Supabase Edge Functions or a third-party service)

    if (canSendEmail && submissionData) {
      try {
        // Sanitize all content for HTML email to prevent injection
        const emailHtmlContent = `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${sanitizeHtml(submissionData.name)}</p>
          <p><strong>Email:</strong> ${sanitizeHtml(submissionData.email)}</p>
          <p><strong>Subject:</strong> ${sanitizeHtml(submissionData.subject || 'N/A')}</p>
          <p><strong>Message:</strong></p>
          <div style="white-space: pre-wrap; padding: 10px; border: 1px solid #eee; background: #f9f9f9;">${sanitizeHtml(submissionData.message)}</div>
          <hr>
          <p><em>This email was sent from your portfolio contact form.</em></p>
        `;

        const { error: emailError } = await resend.emails.send({
          from: fromEmailAddress!, // Add '!' if canSendEmail guarantees it's not null
          to: [personalEmailRecipient!], // Add '!'
          subject: `❗ New Portfolio Contact: ${submissionData.subject ?? submissionData.name}`, // You can add an emoji too
          html: emailHtmlContent,
          replyTo: submitterEmail,
          headers: { // <<< ADD CUSTOM HEADERS HERE
            'Priority': 'urgent',
            'X-Priority': '1', // '1 (Highest)', '2 (High)', '3 (Normal)', '4 (Low)', '5 (Lowest)'
            'Importance': 'high',
            // Some clients might respond to X-MSMail-Priority
            'X-MSMail-Priority': 'High'
          },
        });

        if (emailError) {
          console.error('API Contact - Resend email sending error:', emailError);
        }
        // Email sent successfully - emailData contains the response
      } catch (resendError) {
        console.error('API Contact - Unexpected error during Resend email sending:', resendError);
      }
    } else if (!canSendEmail) { // Log if email wasn't sent due to config
      console.warn("API Contact - Email notification not sent: Resend client or email addresses misconfigured.");
    }

    return NextResponse.json({ message: 'Message sent successfully!', data }, { status: 201 });
  } catch (err) {
    console.error('API contact route error:', err);
    // Check if the error is from JSON parsing
    if (err instanceof SyntaxError && req.body) {
      return NextResponse.json({ error: 'Invalid JSON format in request body' }, { status: 400 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred.', details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}