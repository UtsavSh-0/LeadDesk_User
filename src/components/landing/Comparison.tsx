"use client";

import { motion } from "motion/react";
import {
  FileSpreadsheet,
  MessageCircle,
  MailX,
  ClipboardList,
  EyeOff,
  LayoutDashboard,
  Search,
  ListChecks,
  Users,
  Zap,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const without = [
  { icon: FileSpreadsheet, label: "Excel sheets nobody updates" },
  { icon: MessageCircle, label: "WhatsApp threads with lost leads" },
  { icon: MailX, label: "Emails buried in team inboxes" },
  { icon: ClipboardList, label: "Manual follow-up reminders" },
  { icon: EyeOff, label: "Zero visibility across the team" },
];

const withLd = [
  { icon: LayoutDashboard, label: "One central dashboard" },
  { icon: Search, label: "Search any lead in seconds" },
  { icon: ListChecks, label: "Real-time status tracking" },
  { icon: Users, label: "Shared team view" },
  { icon: Zap, label: "Fast, on-time follow-ups" },
];

export function Comparison() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Before & after"
          title="Without LeadDesk vs With LeadDesk"
          subtitle="The same team, the same inbound leads — with a very different outcome."
        />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 items-stretch gap-5 md:grid-cols-2">
          {/* Without */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-7"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Without LeadDesk
            </p>
            <h3 className="mt-2 text-xl font-semibold text-foreground">
              A daily scramble to keep up
            </h3>
            <ul className="mt-6 space-y-2.5">
              {without.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-center gap-3 rounded-xl border border-border/70 bg-background p-3"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-foreground">{item.label}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* With */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-b from-primary-soft/70 to-card p-6 shadow-lift ring-1 ring-primary/10 sm:p-7"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl"
            />
            <p className="relative text-xs font-semibold uppercase tracking-widest text-primary">
              With LeadDesk
            </p>
            <h3 className="relative mt-2 text-xl font-semibold text-foreground">
              A calm, closable pipeline
            </h3>
            <ul className="relative mt-6 space-y-2.5">
              {withLd.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.3, delay: i * 0.05 + 0.05 }}
                  className="flex items-center gap-3 rounded-xl border border-primary/15 bg-background p-3"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
