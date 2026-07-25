import { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  // Refreshes the Supabase session cookie and redirects unauthenticated
  // users away from /dashboard (and authenticated users away from
  // /login and /signup).
  const response = await updateSession(request);

  // ---------------------------------------------------------------------
  // Security headers — mitigate clickjacking, MIME sniffing, and script
  // injection (XSS) at the browser level, on every response.
  // ---------------------------------------------------------------------
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  // Content-Security-Policy: restricts which origins scripts, styles,
  // frames, etc. can be loaded from — the main browser-side defense
  // against injected/third-party script execution. 'unsafe-inline' /
  // 'unsafe-eval' on script-src are required by Next.js's own inline
  // hydration bootstrap scripts; everything else is locked to same-origin
  // plus Supabase for API/auth calls.
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*)|.+)',
  ],
};
