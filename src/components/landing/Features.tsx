"use client";

import { motion } from "motion/react";
import { Inbox, LayoutDashboard, Search, ListChecks, BarChart3, ShieldCheck } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const features = [
  {
    icon: Inbox,
    title: "Never miss another inquiry",
    desc: "Every form submission lands in your workspace within seconds — no email digging, no scrolling DMs.",
  },
  {
    icon: Search,
    title: "Find any client instantly",
    desc: "Search across every lead, note, and email in a keystroke instead of digging through spreadsheets.",
  },
  {
    icon: ListChecks,
    title: "Know what needs attention today",
    desc: "See exactly which leads to follow up on next — before opportunities go cold and clients ghost you.",
  },
  {
    icon: LayoutDashboard,
    title: "Give your team one source of truth",
    desc: "Everyone works from the same pipeline, statuses, and notes — no more “which sheet is the latest?”",
  },
  {
    icon: BarChart3,
    title: "Invest where it actually pays off",
    desc: "See which channels bring revenue — not just clicks — so you know where to double down.",
  },
  {
    icon: ShieldCheck,
    title: "Keep client data safe by default",
    desc: "Role-based access and encrypted storage keep sensitive information scoped to the right people.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Benefits"
          title="Every feature earns its place in your day"
          subtitle="Not a bloated CRM. Just the tools your team actually uses to close more business."
        />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:shadow-lift hover:border-primary/25"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/0 blur-2xl transition-colors duration-500 group-hover:bg-primary/10"
              />
              <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary ring-1 ring-primary/10 transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary/40">
                <f.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="relative mt-5 text-base font-semibold text-foreground">{f.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
