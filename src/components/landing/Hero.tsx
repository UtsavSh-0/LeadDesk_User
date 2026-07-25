"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  PlayCircle,
  Search,
  TrendingUp,
  Users,
  Sparkles,
  Check,
  Bell,
  IndianRupee,
  CircleCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";

const badges = [
  "Setup in under 2 minutes",
  "No credit card required",
  "Enterprise-grade security",
];

export function Hero() {
  return (
    <section className="bg-hero-gradient relative overflow-hidden">
      {/* Ambient grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(37,99,235,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.06)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:py-28">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-3 py-1 text-xs font-medium text-primary shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Lead management, without the chaos
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05] text-balance">
            Stop Losing{" "}
            <span className="bg-gradient-to-r from-primary to-accent-blue bg-clip-text text-transparent">
              High-Value Leads.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium text-foreground/90 text-balance">
            Every missed follow-up costs your business money.
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            Capture, organize, and close every inquiry from one simple dashboard —
            purpose-built for agencies and freelancers who are done losing leads to
            messy WhatsApp threads and abandoned spreadsheets.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" className="shadow-lift group" asChild>
              <Link href="/signup">
                Create Free Workspace
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-border bg-white/70 backdrop-blur" asChild>
              <a href="#dashboard-preview">
                <PlayCircle className="mr-1.5 h-4 w-4" /> See Dashboard Demo
              </a>
            </Button>
          </div>

          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
            {badges.map((b) => (
              <li key={b} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right — Dashboard illustration + floating cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative"
          aria-hidden
        >
          <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/25 via-accent-blue/20 to-transparent blur-3xl" />

          {/* Floating notification — top left */}
          <motion.div
            initial={{ opacity: 0, y: -12, x: -8 }}
            animate={{ opacity: 1, y: [0, -6, 0], x: 0 }}
            transition={{
              opacity: { duration: 0.5, delay: 0.6 },
              x: { duration: 0.5, delay: 0.6 },
              y: { duration: 5, delay: 0.6, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -left-4 -top-4 z-20 hidden items-center gap-2.5 rounded-xl border border-border bg-white/95 px-3 py-2 shadow-[0_20px_50px_-20px_rgba(37,99,235,0.35)] backdrop-blur sm:flex"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <Bell className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-foreground">New Lead</p>
              <p className="text-[10px] text-muted-foreground">Aarav Mehta · just now</p>
            </div>
          </motion.div>

          {/* Floating budget — right */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.9 },
              x: { duration: 0.5, delay: 0.9 },
              y: { duration: 6, delay: 0.9, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -right-3 top-24 z-20 hidden items-center gap-2.5 rounded-xl border border-emerald-200 bg-white/95 px-3 py-2 shadow-[0_20px_50px_-20px_rgba(16,185,129,0.35)] backdrop-blur md:flex"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
              <IndianRupee className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11px] font-semibold text-foreground">Budget approved</p>
              <p className="text-[10px] text-emerald-700">₹1.2L · Novatech</p>
            </div>
          </motion.div>

          {/* Floating status — bottom right */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: [0, -4, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 1.2 },
              y: { duration: 7, delay: 1.2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -bottom-4 -right-2 z-20 hidden items-center gap-2.5 rounded-xl border border-border bg-white/95 px-3 py-2 shadow-[0_20px_50px_-20px_rgba(37,99,235,0.35)] backdrop-blur sm:flex"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-primary">
              <CircleCheck className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11px] font-semibold text-foreground">Status updated</p>
              <p className="text-[10px] text-muted-foreground">Priya S. → Contacted</p>
            </div>
          </motion.div>

          <div className="relative rounded-2xl border border-border/70 bg-white/95 p-4 shadow-[0_40px_100px_-40px_rgba(37,99,235,0.45)] backdrop-blur sm:p-5">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Search leads, emails, companies…</span>
              <span className="ml-auto rounded-md border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                ⌘K
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <MiniStat icon={<Users className="h-4 w-4" />} label="New leads" value="248" trend="+18%" />
              <MiniStat icon={<TrendingUp className="h-4 w-4" />} label="Pipeline" value="₹42L" trend="+9%" />
              <MiniStat icon={<Sparkles className="h-4 w-4" />} label="Closed" value="63" trend="+24%" />
            </div>

            <div className="mt-4 rounded-xl border border-border bg-subtle-gradient p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-medium text-foreground">Leads this week</p>
                <span className="text-[10px] text-muted-foreground">Mon – Sun</span>
              </div>
              <Sparkline />
            </div>

            <div className="mt-4 space-y-2">
              {[
                { n: "Aarav Mehta", c: "Requested website redesign", s: "New" as const },
                { n: "Priya Shah", c: "Follow-up scheduled tomorrow", s: "Contacted" as const },
                { n: "Rohan Kapoor", c: "Contract signed · ₹1.2L", s: "Closed" as const },
              ].map((l) => (
                <div
                  key={l.n}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                      {l.n.split(" ").map((s) => s[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{l.n}</p>
                      <p className="text-xs text-muted-foreground">{l.c}</p>
                    </div>
                  </div>
                  <StatusBadge status={l.s} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MiniStat({ icon, label, value, trend }: { icon: React.ReactNode; label: string; value: string; trend: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-[11px]">{label}</span>
      </div>
      <div className="mt-1.5 flex items-baseline justify-between">
        <span className="text-lg font-semibold text-foreground">{value}</span>
        <span className="text-[10px] font-medium text-emerald-600">{trend}</span>
      </div>
    </div>
  );
}

function Sparkline() {
  const points = [10, 22, 16, 30, 26, 40, 36, 52, 44, 60, 55, 72];
  const w = 300;
  const h = 90;
  const max = Math.max(...points);
  const step = w / (points.length - 1);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (p / max) * (h - 8) - 4}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#g)" />
      <path d={path} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
