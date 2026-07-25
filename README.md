# LeadDesk Mini (Next.js) — Public Site

A focused lead-capture CRM: public landing page + lead form, plus sign up,
sign in, and a dashboard for regular (non-admin) users. Supabase-backed auth.

**The admin portal is a separate project** — see `../admin-portal` — meant to
be deployed on its own subdomain/URL (e.g. `admin.yourdomain.com`) so admin
tooling is never exposed on the public marketing site.

## Stack
- Next.js 15 (App Router) + React 19
- Tailwind CSS v4
- Supabase (Postgres, Auth, RLS)
- @tanstack/react-query for client-side data fetching/mutations

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a Supabase project, then run the migrations, in order:
   - Dashboard → SQL Editor → paste `supabase/migrations/0001_leads.sql` → Run
   - Dashboard → SQL Editor → paste `supabase/migrations/0002_auth_rate_limits.sql` → Run
   - or, with the Supabase CLI: `supabase db push`

3. Copy `.env.example` to `.env.local` and fill in your project's values
   (Project Settings → API in the Supabase dashboard):
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   ```
   `SUPABASE_SERVICE_ROLE_KEY` is server-only — never expose it to the client.
   Use the **same Supabase project** here and in `../admin-portal` so admins
   and customers share one database.

4. Run the dev server:
   ```bash
   npm run dev
   ```

## Structure
- `src/app/page.tsx` — public landing page (marketing sections + lead form)
- `src/app/signup` — customer sign up (`/signup`)
- `src/app/login` — customer sign in (`/login`)
- `src/app/dashboard` — auth-gated dashboard for regular users (`/dashboard`)
- `src/app/api/leads` — POST (create) — used by the public lead capture form
- `src/components/auth` — `SignupForm`, `LoginForm`, `LogoutButton`
- `src/lib/supabase` — browser client, server client, service-role admin
  client, and the middleware session refresher
- `middleware.ts` — refreshes the Supabase session and guards `/dashboard`
- `supabase/migrations` — SQL schema, indexes, RLS policies

## Where things link
- Navbar "Get Started" and mobile menu → `/signup`
- Hero "Create Free Workspace" → `/signup`
- Pricing "Start free" / "Start Growth" → `/signup` ("Contact sales" stays on
  the on-page contact form)
- Navbar "Login" → `/login`
- Footer credit line → "Built for Digital Heroes Training Task", linked to
  https://digitalheroesco.com

## Deploying
Deploy this app and `../admin-portal` as **two separate deployments** (e.g.
two Vercel projects) on two different URLs. Add both Supabase env vars to
each. Point the admin portal at a private/staff-only URL.

## Security
- **Input validation & sanitization** — every form (signup, login, public
  lead capture) is validated server-side with zod, re-validated even though
  the client also validates. Free-text fields are additionally run through
  `sanitizeText()` (`src/lib/security/validation.ts`), which strips control
  characters and raw HTML tags before storage. Supabase's query builder
  parameterizes every query (no raw SQL is ever built from user input), and
  React escapes all rendered output by default.
- **Rate limiting & lockout** — `/api/auth/login`, `/api/auth/signup`, and
  the public `/api/leads` POST endpoint are all backed by a shared
  Supabase-table rate limiter (`src/lib/security/rateLimit.ts`,
  `auth_rate_limits` table). Login is limited per-email *and* per-IP (5
  attempts / 15 min, then a 15-minute lockout); signup and lead submission
  are limited per-IP to curb spam/abuse.
- **Password handling** — this app never hashes or stores passwords itself.
  Supabase Auth (GoTrue) does that server-side with bcrypt. Signup enforces
  a strong-password policy (8+ chars, upper/lower/number/symbol) before the
  request ever reaches Supabase.
- **Generic auth error messages** — login and signup always return the same
  message ("Invalid email or password." / a generic signup failure) whether
  the email doesn't exist, the password is wrong, or the account already
  exists — so responses can't be used to enumerate accounts.
- **Trusted auth provider** — all authentication is delegated to Supabase
  Auth; this app never implements its own credential storage or session
  crypto. A "Continue with Google" OAuth option is wired up on `/login` and
  `/signup` (via `/auth/callback`) — enable the Google provider in your
  Supabase project's Auth settings to activate it.
- **Security headers** — `middleware.ts` sets a Content-Security-Policy,
  `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`,
  `Permissions-Policy`, and HSTS on every response.
