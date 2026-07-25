import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { loginSchema, sanitizeText } from '@/lib/security/validation';
import { checkRateLimit, recordAttempt, resetRateLimit, getClientIp, formatRetryMessage } from '@/lib/security/rateLimit';

// Deliberately identical whether the email doesn't exist, the password is
// wrong, or the account is unconfirmed — never confirm which one it was.
const GENERIC_ERROR = 'Invalid email or password.';

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

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    // Same generic message even for malformed input — don't hint at what
    // validation expects to an unauthenticated caller.
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
  }

  const email = sanitizeText(parsed.data.email).toLowerCase();
  const password = parsed.data.password;
  const ip = getClientIp(request);

  // Two independent lockouts: per-email (stops targeted credential
  // stuffing against one account) and per-IP (stops one source spraying
  // many emails). Either one being tripped blocks the request.
  const emailKey = `login:email:${email}`;
  const ipKey = `login:ip:${ip}`;

  const [emailLimit, ipLimit] = await Promise.all([checkRateLimit(emailKey), checkRateLimit(ipKey)]);
  const limited = !emailLimit.allowed ? emailLimit : !ipLimit.allowed ? ipLimit : null;
  if (limited && !limited.allowed) {
    return NextResponse.json({ error: formatRetryMessage(limited.retryAfterSeconds, 'sign in') }, { status: 429 });
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    await Promise.all([recordAttempt(emailKey), recordAttempt(ipKey)]);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
  }

  await Promise.all([resetRateLimit(emailKey), resetRateLimit(ipKey)]);
  return NextResponse.json({ success: true }, { status: 200 });
}
