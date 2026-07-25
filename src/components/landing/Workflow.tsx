"use client";

import { motion } from "motion/react";
import {
  Globe,
  FileEdit,
  ShieldCheck,
  Database,
  LayoutDashboard,
  ListChecks,
  Trophy,
  ArrowDown,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const steps = [
  { icon: Globe, title: "Website visitor", desc: "Prospect lands on your site" },
  { icon: FileEdit, title: "Lead form", desc: "Submits an inquiry in seconds" },
  { icon: ShieldCheck, title: "Validation", desc: "Clean data, spam blocked" },
  { icon: Database, title: "Database", desc: "Securely stored & timestamped" },
  { icon: LayoutDashboard, title: "Admin dashboard", desc: "Appears in real time" },
  { icon: ListChecks, title: "Status updated", desc: "Assigned to the right owner" },
  { icon: Trophy, title: "Deal closed", desc: "Revenue in the door", outcome: true },
];

export function Workflow() {
  return (
    <section className="bg-subtle-gradient">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="From visitor to closed deal, automatically"
          subtitle="No manual copying. No dropped hand-offs. Just a clean path from first click to signed contract."
        />

        <div className="mx-auto mt-14 max-w-3xl">
          <ol className="relative">
            {/* Progress line */}
            <motion.div
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
              className="absolute left-[1.375rem] top-2 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-primary via-primary/50 to-transparent sm:left-[1.6rem]"
            />

            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative mb-3 flex items-start gap-4 last:mb-0"
              >
                <div className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-lift ring-4 ring-subtle-gradient ring-offset-0">
                  <s.icon className="h-5 w-5" aria-hidden />
                </div>
                <div className="min-w-0 flex-1 rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                      Step {i + 1}
                    </span>
                    {s.outcome ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                        Outcome
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-base font-semibold text-foreground">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>

                {i < steps.length - 1 ? (
                  <ArrowDown
                    aria-hidden
                    className="pointer-events-none absolute left-[1.075rem] top-[3.15rem] h-3 w-3 text-primary/50 sm:left-[1.3rem]"
                  />
                ) : null}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
