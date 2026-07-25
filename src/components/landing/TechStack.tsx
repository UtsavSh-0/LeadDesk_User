"use client";

import { motion } from "motion/react";
import { SectionHeading } from "./SectionHeading";

const stack = [
  { name: "Next.js", why: "Fast, SEO-friendly pages that load instantly" },
  { name: "TypeScript", why: "Fewer bugs, safer refactors, cleaner code" },
  { name: "Tailwind CSS", why: "A consistent, modern design system" },
  { name: "Supabase", why: "Auth, database, and storage in one platform" },
  { name: "PostgreSQL", why: "Battle-tested database trusted at scale" },
  { name: "Responsive Design", why: "Works beautifully on mobile, tablet & desktop" },
  { name: "Authentication Ready", why: "Secure login for your team from day one" },
];

export function TechStack() {
  return (
    <section className="bg-subtle-gradient">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Under the hood"
          title="Built with modern technology"
          subtitle="A stack you can trust — not a fragile MVP. Every choice is made to keep your workspace fast, safe, and easy to scale."
        />

        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2.5"
        >
          {stack.map((s) => (
            <li
              key={s.name}
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground shadow-soft"
            >
              {s.name}
            </li>
          ))}
        </motion.ul>

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((s, i) => (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="rounded-xl border border-border bg-card p-4 shadow-soft"
            >
              <p className="text-sm font-semibold text-foreground">{s.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.why}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
