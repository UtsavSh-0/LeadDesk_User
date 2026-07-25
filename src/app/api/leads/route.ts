import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { z } from 'zod';
import { sanitizeText } from '@/lib/security/validation';
import { checkRateLimit, recordAttempt, getClientIp, formatRetryMessage } from '@/lib/security/rateLimit';

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

// Mirrors the client-side schema in LeadForm.tsx. Server validation is the
// last line of defense — never trust data coming from the client.
const leadSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(80, 'Name is too long'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email')
    .max(160, 'Email is too long'),
  budget: z.string().trim().min(1, 'Select a budget range'),
  message: z
    .string()
    .trim()
    .min(10, 'Please share a few details (at least 10 characters)')
    .max(1000, 'Message is too long (max 1000 characters)'),
});

const ALLOWED_BUDGETS = new Set(['under-25k', '25k-50k', '50k-1L', '1L+']);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function errorResponse(
  message: string,
  status: number,
  fieldErrors?: Record<string, string>,
) {
  return NextResponse.json(
    { error: message, ...(fieldErrors ? { fieldErrors } : {}) },
    { status },
  );
}

// ---------------------------------------------------------------------------
// POST /api/leads — create a new lead
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  // Reject non-JSON bodies early.
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return errorResponse('Content-Type must be application/json', 415);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse('Invalid request body. Expected JSON.', 400);
  }

  const result = leadSchema.safeParse(body);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[0]);
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return errorResponse('Validation failed', 400, fieldErrors);
  }

  const data = result.data;

  // Extra allow-list check since budget comes from a fixed dropdown.
  if (!ALLOWED_BUDGETS.has(data.budget)) {
    return errorResponse('Validation failed', 400, {
      budget: 'Select a valid budget range',
    });
  }

  // Basic spam/abuse throttle on this public, unauthenticated endpoint —
  // separate from the auth rate limiter, keyed only by IP.
  const ipKey = `leads:ip:${getClientIp(request)}`;
  const limit = await checkRateLimit(ipKey);
  if (!limit.allowed) {
    return errorResponse(formatRetryMessage(limit.retryAfterSeconds, 'submit this form'), 429);
  }
  await recordAttempt(ipKey);

  // Defense in depth: strip control characters / stray HTML tags from
  // free-text fields before they're stored. Supabase's query builder
  // already parameterizes this insert (no SQL injection risk), and this
  // app renders leads as plain React text (auto-escaped, no stored-XSS
  // risk here) — sanitizing further protects any future consumer (CSV
  // export, emails, a different admin UI) that might not escape as
  // carefully.
  const cleanName = sanitizeText(data.name);
  const cleanMessage = sanitizeText(data.message);

  try {
    const { data: lead, error } = await supabaseAdmin
      .from('leads')
      .insert({
        name: cleanName,
        email: data.email.toLowerCase(),
        budget: data.budget,
        message: cleanMessage,
        status: 'New',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      // A DB check constraint failing means something slipped past
      // application-level validation — still return a clean 400.
      if (error.code === '23514' /* check_violation */) {
        return errorResponse(
          'Validation failed at the database level. Please check your input.',
          400,
        );
      }
      return errorResponse('Failed to save lead. Please try again.', 500);
    }

    // REST best practice: 201 Created + Location header pointing at the
    // new resource.
    return NextResponse.json(
      { message: 'Lead submitted successfully', lead },
      { status: 201, headers: { Location: `/api/leads/${lead.id}` } },
    );
  } catch (err) {
    console.error('Unexpected API error (POST /api/leads):', err);
    return errorResponse('Something went wrong. Please try again.', 500);
  }
}

// Note: GET/PATCH (listing + status updates) live only in the separate
// admin portal project — this public site only ever creates leads.
