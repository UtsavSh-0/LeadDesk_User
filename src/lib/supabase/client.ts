import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';

// Browser client: reads/writes the session via cookies (not localStorage),
// so the session is visible to the server (middleware, server components,
// route handlers) too. Requires only the public URL + anon key — never
// the service role key.
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
