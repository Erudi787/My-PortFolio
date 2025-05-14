import { NextRequest, NextResponse } from 'next/server';
// For API routes, it's often better to use the admin client if you're not dealing with user-specific RLS for this table
// Or create a dedicated service role client for such operations.
// For simplicity here, we can use the regular client if your RLS allows anonymous inserts or if you handle auth.
// For a public contact form, you might not need user auth here, but ensure RLS is set up on your Supabase table accordingly (e.g., allow public insert).

// Using supabaseAdmin for inserting into a table like contact_submissions is a common pattern
// to bypass RLS if you're handling validation server-side.
// Ensure SUPABASE_SERVICE_ROLE_KEY is in your .env.local
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role for direct DB operations

const resendApiKey = process.env.RESEND_API_KEY;
const personalEmailRecipient = process.env.PERSONAL_EMAIL; // Email to send TO
const fromEmailAddress = process.env.CONTACT_FORM_SEND_FROM_EMAIL; // Email to send FROM

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Supabase URL or Service Key is not defined. Check .env.local");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Initialize Supabase client with service role for backend operations
// This client bypasses RLS, use with caution and proper validation.
const supabaseAdmin = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;


export async function POST(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase client not initialized. Server configuration issue.' }, { status: 500 });
  }

  const canSendEmail = resend && personalEmailRecipient && fromEmailAddress;

  let submissionData;

  try {
    const body = await req.json();
    const { name, email: submitterEmail, subject, message } = body; // Renamed 'email' to 'submitterEmail' for clarity
    submissionData = body;

    // Basic validation
    if (!name || !submitterEmail || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }
    if (!/\S+@\S+\.\S+/.test(submitterEmail)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const { data, error: dbError } = await supabaseAdmin
      .from('contact_submissions') // Your table name
      .insert([{ name, submitterEmail, subject: subject ?? null, message }]);

    if (dbError) {
      console.error('Supabase error inserting contact submission:', dbError);
      return NextResponse.json({ error: 'Failed to save message.', details: dbError.message }, { status: 500 });
    } else {
        console.log('Contact form submission saved to database:', data);
    }

    // Optionally: Send an email notification to yourself here (e.g., using Supabase Edge Functions or a third-party service)

    if (canSendEmail && submissionData) { // Use the canSendEmail flag
      try {
        const emailHtmlContent = `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${submissionData.name}</p>
          <p><strong>Email:</strong> ${submissionData.email}</p>
          <p><strong>Subject:</strong> ${submissionData.subject ?? 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <div style="white-space: pre-wrap; padding: 10px; border: 1px solid #eee; background: #f9f9f9;">${submissionData.message}</div>
          <hr>
          <p><em>This email was sent from your portfolio contact form.</em></p>
        `;

        const { data: emailData, error: emailError } = await resend.emails.send({
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
        } else {
          console.log('Email notification sent successfully via Resend:', emailData);
        }
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