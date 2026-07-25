"use client";

import { motion } from "motion/react";
import { Lock, KeyRound, Users, Database, Code2, ShieldCheck } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const items = [
  { icon: Lock, title: "Encrypted data", desc: "All lead data is encrypted in transit and at rest." },
  { icon: KeyRound, title: "Secure authentication", desc: "Managed auth with password, magic link, and SSO ready." },
  { icon: Users, title: "Role-based access", desc: "Owner, admin, and member roles keep sensitive data scoped." },
  { icon: Database, title: "Reliable cloud storage", desc: "Backed by managed Postgres with daily backups." },
  { icon: Code2, title: "Built with Next.js & Supabase", desc: "A modern, proven stack trusted by thousands of teams." },
  { icon: ShieldCheck, title: "Privacy-first defaults", desc: "You own your data. Export it anytime, no lock-in." },
];

export function Security() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Security & trust"
          title="Your client data, protected end-to-end"
          subtitle="Security isn't an upsell. It's built into every LeadDesk Mini workspace from day one."
        />
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i, idx) => (
            <motion.div
              key={i.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <i.icon className="h-5 w-5" aria-hidden />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-foreground">{i.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{i.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
