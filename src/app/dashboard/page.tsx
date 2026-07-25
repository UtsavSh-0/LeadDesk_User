import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Users, TrendingUp, CircleCheck, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { LogoutButton } from '@/components/auth/LogoutButton';

export default async function DashboardPage() {
  // Defense in depth: middleware already redirects unauthenticated
  // requests away from /dashboard, but Server Components should never
  // assume that — check again here in case this page is ever reached
  // another way.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const fullName =
    (user.user_metadata?.full_name as string | undefined)?.trim() || user.email?.split('@')[0] || 'there';

  const stats = [
    { icon: Users, label: 'Leads captured', value: '0' },
    { icon: TrendingUp, label: 'Open pipeline', value: '₹0' },
    { icon: CircleCheck, label: 'Deals closed', value: '0' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-soft">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-semibold tracking-tight text-foreground">LeadDesk Mini</span>
          </Link>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Welcome back, {fullName} 👋</h1>
          <p className="mt-1 text-sm text-muted-foreground">Signed in as {user.email}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center gap-2 text-muted-foreground">
                <s.icon className="h-4 w-4" />
                <span className="text-xs font-medium">{s.label}</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-subtle-gradient p-8 text-center shadow-soft">
          <h2 className="text-lg font-semibold text-foreground">You&apos;re all set up</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            This is your personal LeadDesk Mini dashboard. Lead capture, pipeline tracking, and
            reporting for your account will show up here as your workspace fills up.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
            >
              View plans <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Contact support
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
