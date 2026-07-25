"use client";

import { motion } from "motion/react";
import { Building2, User, Megaphone, Store } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const audiences = [
  {
    icon: Building2,
    title: "Agencies",
    desc: "Track every client inquiry across channels and prove response times.",
    accent: "from-blue-500/15 to-blue-500/0",
  },
  {
    icon: User,
    title: "Freelancers",
    desc: "Keep every project inquiry in one place — no more juggling DMs and email.",
    accent: "from-violet-500/15 to-violet-500/0",
  },
  {
    icon: Megaphone,
    title: "Marketing Teams",
    desc: "Measure which campaigns actually generate qualified pipeline, not clicks.",
    accent: "from-emerald-500/15 to-emerald-500/0",
  },
  {
    icon: Store,
    title: "Small Businesses",
    desc: "Give every customer a fast, professional response without a sales ops team.",
    accent: "from-amber-500/15 to-amber-500/0",
  },
];

export function SocialProof() {
  return (
    <section aria-label="Built for" className="border-y border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Built for
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift"
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${a.accent} blur-2xl transition-opacity group-hover:opacity-100`}
              />
              <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary ring-1 ring-primary/10 transition-transform group-hover:scale-105">
                <a.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="relative mt-5 text-base font-semibold text-foreground">{a.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                {a.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
