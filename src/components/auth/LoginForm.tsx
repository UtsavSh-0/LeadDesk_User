'use client';

import { useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase/client';

// Always shown for a failed sign-in, whatever the actual cause (wrong
// password, unknown email, unconfirmed account) — never reveal which.
const GENERIC_ERROR = 'Invalid email or password.';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get('redirectedFrom') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError(GENERIC_ERROR);
      return;
    }

    setSubmitting(true);

    try {
      // Signing in through our own API route (not the browser Supabase
      // client directly) lets the server enforce rate limiting / account
      // lockout before ever touching Supabase Auth, and keeps the error
      // message uniform regardless of cause.
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        setError(payload?.error || GENERIC_ERROR);
        toast.error('Sign in failed');
        return;
      }

      toast.success('Signed in');
      router.replace(redirectedFrom);
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const onGoogleSignIn = async () => {
    setOauthLoading(true);
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectedFrom)}` },
    });
    if (oauthError) {
      toast.error('Google sign-in is not available right now.');
      setOauthLoading(false);
    }
    // On success the browser is redirected away, so no further state change needed here.
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-soft">
        <div className="mb-6 text-center">
          <Link href="/" className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your LeadDesk Mini account.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onGoogleSignIn}
          disabled={oauthLoading || submitting}
          aria-busy={oauthLoading}
        >
          {oauthLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon className="mr-2 h-4 w-4" />}
          Continue with Google
        </Button>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or sign in with email
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <div>
            <Label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourcompany.com"
              disabled={submitting}
              maxLength={160}
            />
          </div>

          <div>
            <Label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={submitting}
              maxLength={200}
            />
          </div>

          {error ? (
            <p role="alert" className="text-sm font-medium text-destructive">
              {error}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={submitting} aria-busy={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in…
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.43 3.58v3h3.93c2.3-2.12 3.62-5.24 3.62-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.93-3c-1.09.73-2.5 1.16-4 1.16-3.08 0-5.69-2.08-6.62-4.88H1.32v3.09C3.29 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.38 14.37A7.2 7.2 0 0 1 5 12c0-.82.14-1.62.38-2.37V6.54H1.32A11.98 11.98 0 0 0 0 12c0 1.93.46 3.76 1.32 5.46l4.06-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.29 2.7 1.32 6.54l4.06 3.09C6.31 6.83 8.92 4.75 12 4.75z" />
    </svg>
  );
}
