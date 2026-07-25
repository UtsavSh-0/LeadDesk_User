import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const WINDOW_MS = 15 * 60 * 1000; // rolling window an identifier's attempts are counted over
const MAX_ATTEMPTS = 5; // attempts allowed within the window before lockout
const LOCKOUT_MS = 15 * 60 * 1000; // how long an identifier stays locked out

type RateLimitRow = {
  identifier: string;
  attempt_count: number;
  first_attempt_at: string;
  locked_until: string | null;
};

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfterSeconds: number };

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Call before attempting auth. Does not itself count as an attempt. */
export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  const row = await getRow(identifier);
  if (!row?.locked_until) return { allowed: true };

  const msLeft = new Date(row.locked_until).getTime() - Date.now();
  if (msLeft <= 0) return { allowed: true };

  return { allowed: false, retryAfterSeconds: Math.ceil(msLeft / 1000) };
}

/**
 * Record an attempt against an identifier. Pass this for every failed
 * login, and for every signup attempt (success or failure) to cap how many
 * accounts one source can create. Locks the identifier once it crosses
 * MAX_ATTEMPTS within the current window.
 */
export async function recordAttempt(identifier: string): Promise<void> {
  const now = new Date();
  const row = await getRow(identifier);

  if (!row) {
    await supabaseAdmin.from('auth_rate_limits').insert({
      identifier,
      attempt_count: 1,
      first_attempt_at: now.toISOString(),
      updated_at: now.toISOString(),
    });
    return;
  }

  const windowExpired = now.getTime() - new Date(row.first_attempt_at).getTime() > WINDOW_MS;

  if (windowExpired) {
    // Start a fresh window rather than piling onto a stale one.
    await supabaseAdmin
      .from('auth_rate_limits')
      .update({
        attempt_count: 1,
        first_attempt_at: now.toISOString(),
        locked_until: null,
        updated_at: now.toISOString(),
      })
      .eq('identifier', identifier);
    return;
  }

  const attemptCount = row.attempt_count + 1;
  const lockedUntil = attemptCount >= MAX_ATTEMPTS ? new Date(now.getTime() + LOCKOUT_MS).toISOString() : null;

  await supabaseAdmin
    .from('auth_rate_limits')
    .update({ attempt_count: attemptCount, locked_until: lockedUntil, updated_at: now.toISOString() })
    .eq('identifier', identifier);
}

/** Call after a successful login/signup so a good sign-in clears the slate. */
export async function resetRateLimit(identifier: string): Promise<void> {
  await supabaseAdmin.from('auth_rate_limits').delete().eq('identifier', identifier);
}

/** Best-effort client IP extraction behind a reverse proxy / edge network. */
export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0]!.trim();
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

/** Friendly "try again in N minute(s)" copy for a retryAfterSeconds value. */
export function formatRetryMessage(retryAfterSeconds: number, action: string): string {
  const minutes = Math.max(1, Math.ceil(retryAfterSeconds / 60));
  return `Too many attempts to ${action}. Please try again in ${minutes} minute${minutes === 1 ? '' : 's'}.`;
}

// ---------------------------------------------------------------------------
// Internal
// ---------------------------------------------------------------------------

async function getRow(identifier: string): Promise<RateLimitRow | null> {
  const { data, error } = await supabaseAdmin
    .from('auth_rate_limits')
    .select('identifier, attempt_count, first_attempt_at, locked_until')
    .eq('identifier', identifier)
    .maybeSingle();

  // Fail open on infra errors (e.g. migration not yet applied) — rate
  // limiting is defense in depth, not the only control, so a Supabase
  // hiccup shouldn't lock every user out of signing in.
  if (error) {
    console.error('Rate limit lookup failed:', error.message);
    return null;
  }

  return data as RateLimitRow | null;
}
