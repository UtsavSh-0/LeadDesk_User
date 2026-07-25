"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "₹0",
    period: "/mo",
    desc: "For solo founders getting their first leads in.",
    features: ["Up to 100 leads", "1 team member", "Basic analytics", "Email support"],
    cta: "Start free",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Growth",
    price: "₹1,499",
    period: "/mo",
    desc: "For teams turning inquiries into a repeatable pipeline.",
    features: [
      "Unlimited leads",
      "Up to 10 team members",
      "Advanced analytics",
      "Status automations",
      "Priority support",
    ],
    cta: "Start Growth",
    href: "/signup",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organizations with security, scale, and SSO needs.",
    features: [
      "Unlimited everything",
      "SSO & audit logs",
      "Dedicated CSM",
      "Custom SLAs",
      "Onboarding & training",
    ],
    cta: "Contact sales",
    href: "#contact",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-subtle-gradient">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple pricing that scales with your team"
          subtitle="Start free. Upgrade when your pipeline is ready. Cancel anytime."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-7 shadow-soft transition-shadow",
                p.highlight
                  ? "border-primary/30 ring-1 ring-primary/20 shadow-lift md:-translate-y-2"
                  : "border-border hover:shadow-lift",
              )}
            >
              {p.highlight ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground shadow-lift">
                  Most popular
                </span>
              ) : null}
              <div>
                <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
              </div>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-foreground">{p.price}</span>
                {p.period ? <span className="text-sm text-muted-foreground">{p.period}</span> : null}
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-primary-soft text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  variant={p.highlight ? "default" : "outline"}
                  className={cn("w-full", p.highlight && "shadow-lift")}
                  asChild
                >
                  {p.href.startsWith("/") ? (
                    <Link href={p.href}>{p.cta}</Link>
                  ) : (
                    <a href={p.href}>{p.cta}</a>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
