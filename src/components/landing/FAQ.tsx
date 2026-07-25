"use client";

import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";

const faqs = [
  {
    q: "How long does it take to get started?",
    a: "Most teams are live in under an afternoon. Sign up, embed the form snippet, and leads start flowing into your dashboard immediately.",
  },
  {
    q: "Can I import leads from another CRM?",
    a: "Yes. CSV import is built in, and the Growth plan supports one-click migrations from HubSpot, Pipedrive, and Zoho.",
  },
  {
    q: "Is there a free plan?",
    a: "The Starter plan is free forever and includes up to 100 leads. You can upgrade when your pipeline grows — no card required to start.",
  },
  {
    q: "How do you handle data security?",
    a: "All data is encrypted in transit and at rest. Role-based access, audit logs, and SSO are available on Enterprise.",
  },
  {
    q: "Do you support custom pipeline stages?",
    a: "Absolutely. Rename statuses, add new stages, and set up automations to move leads based on activity or time.",
  },
  {
    q: "Can I cancel any time?",
    a: "Yes. Cancel or downgrade from your billing settings — no phone call, no retention pitch.",
  },
];

export function FAQ() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          subtitle="Everything you need to know before getting started."
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
