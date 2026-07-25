"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary to-[oklch(0.45_0.22_262)] px-6 py-14 text-center shadow-lift sm:px-12 sm:py-20"
        >
          <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(600px_200px_at_80%_10%,white,transparent)]" />
          <h2 className="relative text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl text-balance">
            Ready to organize your leads?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-primary-foreground/85">
            Set up your workspace in under two minutes. No credit card. Cancel anytime.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lift" asChild>
              <a href="#contact">
                Start Free <ArrowRight className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              asChild
            >
              <a href="#dashboard-preview">See Dashboard Demo</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
