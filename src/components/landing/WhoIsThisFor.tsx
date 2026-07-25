"use client";

import { motion } from "motion/react";
import { Building2, User, Megaphone, Store } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const audiences = [
  {
    icon: Building2,
    title: "Digital Agencies",
    desc: "Track every client inquiry across channels, assign owners, and prove response times to clients.",
    bullets: ["Multi-channel intake", "Team assignment", "Client-facing status"],
  },
  {
    icon: User,
    title: "Freelancers",
    desc: "Stop juggling DMs and email. Keep every project inquiry in one place and follow up on time.",
    bullets: ["Zero-setup workflow", "Follow-up reminders", "Personal pipeline view"],
  },
  {
    icon: Megaphone,
    title: "Marketing Teams",
    desc: "Measure which campaigns actually generate qualified leads, not just clicks and vanity metrics.",
    bullets: ["Source tracking", "Conversion analytics", "Campaign ROI"],
  },
  {
    icon: Store,
    title: "Small Businesses",
    desc: "Give every customer a fast, professional response — without hiring a full-time sales ops team.",
    bullets: ["Simple pipeline", "Team collaboration", "Affordable pricing"],
  },
];

export function WhoIsThisFor() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Who it's for"
          title="Built for the teams closing the deals"
          subtitle="If your business runs on inbound inquiries, LeadDesk Mini is built for you."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                <a.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
              <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                {a.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-primary" /> {b}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
