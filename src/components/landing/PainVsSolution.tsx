"use client";

import { motion } from "motion/react";
import { X, Check } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const problems = [
  "Leads scattered across WhatsApp",
  "Excel sheets become messy and outdated",
  "Forgotten follow-ups cost you deals",
  "Slow response time frustrates clients",
  "No visibility on what the team is doing",
];

const solutions = [
  "One central, always-updated dashboard",
  "Real-time status tracking on every lead",
  "Search any client or inquiry in seconds",
  "An organized pipeline your team trusts",
  "Shared team view — everyone is aligned",
];

export function PainVsSolution() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Why teams switch"
          title="The problem isn't your team. It's the tools."
          subtitle="Most agencies patch together WhatsApp, Excel, and email. LeadDesk Mini replaces all of it with one focused workspace."
        />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-7"
          >
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-destructive/10 text-destructive">
                <X className="h-4 w-4" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-destructive">
                Without LeadDesk
              </p>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-foreground">The usual chaos</h3>
            <ul className="mt-6 space-y-2.5">
              {problems.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex items-start gap-3 rounded-xl border border-border/70 bg-background p-3.5"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive">
                    <X className="h-3 w-3" />
                  </span>
                  <span className="text-sm text-foreground">{p}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-b from-primary-soft/70 to-card p-6 shadow-lift ring-1 ring-primary/10 sm:p-7"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="relative flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-lift">
                <Check className="h-4 w-4" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                With LeadDesk
              </p>
            </div>
            <h3 className="relative mt-3 text-xl font-semibold text-foreground">
              Calm, organized pipeline
            </h3>
            <ul className="relative mt-6 space-y-2.5">
              {solutions.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, delay: i * 0.06 + 0.05 }}
                  className="flex items-start gap-3 rounded-xl border border-primary/15 bg-background p-3.5"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm text-foreground">{s}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
