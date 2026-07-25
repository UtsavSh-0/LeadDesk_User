import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { signupSchema, sanitizeText } from '@/lib/security/validation';
import { checkRateLimit, recordAttempt, getClientIp, formatRetryMessage } from '@/lib/security/rateLimit';

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0]);
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return NextResponse.json({ error: 'Validation failed', fieldErrors }, { status: 400 });
  }

  const ip = getClientIp(request);
  const ipKey = `signup:ip:${ip}`;

  // Caps how many accounts a single source can create in a burst, whether
  // or not each attempt succeeds — a separate concern from login lockouts.
  const limit = await checkRateLimit(ipKey);
  if (!limit.allowed) {
    return NextResponse.json({ error: formatRetryMessage(limit.retryAfterSeconds, 'sign up') }, { status: 429 });
  }
  await recordAttempt(ipKey);

  // sanitizeText strips control characters / stray HTML from the free-text
  // name field. Email is separately lower-cased/validated by the schema.
  // The password itself is left untouched — Supabase Auth hashes it with
  // bcrypt server-side; this app never stores or hashes it itself.
  const name = sanitizeText(parsed.data.name);
  const email = sanitizeText(parsed.data.email).toLowerCase();
  const { password } = parsed.data;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  });

  if (error) {
    // Supabase's own message (e.g. "User already registered") can confirm
    // an email is taken — don't relay it verbatim to an unauthenticated
    // caller. A legitimate owner of that email will get a normal "sign in"
    // path instead; anyone else learns nothing new.
    return NextResponse.json(
      { error: 'Could not create your account with these details. Try signing in instead, or use a different email.' },
      { status: 400 },
    );
  }

  return NextResponse.json({ success: true, needsEmailConfirmation: !data.session }, { status: 201 });
}
