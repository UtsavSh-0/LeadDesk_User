import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';

// Server-side client scoped to the current user's session (reads the auth
// cookie set by middleware/browser client). Use this in Server Components,
// Server Actions, and Route Handlers whenever you need to know "who is the
// signed-in user" and want RLS enforced as that user.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // setAll can be called from a Server Component, where cookies
            // can't be written. Safe to ignore as long as middleware is
            // refreshing the session (see middleware.ts).
          }
        },
      },
    },
  );
}

// Service-role admin client — bypasses RLS entirely. Only ever use this
// server-side (route handlers, never client components) for trusted
// operations like the /api/leads insert. Never expose SUPABASE_SERVICE_ROLE_KEY
// to the browser.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.warn(
    'SUPABASE_SERVICE_ROLE_KEY is not set — supabaseAdmin will fall back to the anon key, which is subject to RLS.',
  );
}

export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createSupabaseClient<Database>(supabaseUrl, supabaseServiceKey)
  : createSupabaseClient<Database>(supabaseUrl || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
