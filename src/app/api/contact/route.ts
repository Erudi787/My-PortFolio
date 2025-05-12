import { NextRequest, NextResponse } from 'next/server';
// For API routes, it's often better to use the admin client if you're not dealing with user-specific RLS for this table
// Or create a dedicated service role client for such operations.
// For simplicity here, we can use the regular client if your RLS allows anonymous inserts or if you handle auth.
// For a public contact form, you might not need user auth here, but ensure RLS is set up on your Supabase table accordingly (e.g., allow public insert).

// Using supabaseAdmin for inserting into a table like contact_submissions is a common pattern
// to bypass RLS if you're handling validation server-side.
// Ensure SUPABASE_SERVICE_ROLE_KEY is in your .env.local
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role for direct DB operations

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Supabase URL or Service Key is not defined. Check .env.local");
}

// Initialize Supabase client with service role for backend operations
// This client bypasses RLS, use with caution and proper validation.
const supabaseAdmin = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;


export async function POST(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase client not initialized. Server configuration issue.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('contact_submissions') // Your table name
      .insert([{ name, email, subject: subject || null, message }]);

    if (error) {
      console.error('Supabase error inserting contact submission:', error);
      return NextResponse.json({ error: 'Failed to save message.', details: error.message }, { status: 500 });
    }

    // Optionally: Send an email notification to yourself here (e.g., using Supabase Edge Functions or a third-party service)

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