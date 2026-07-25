"use client";

import { motion } from "motion/react";
import { Users, IndianRupee, Zap, Clock, TrendingUp } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useCounter } from "./useCounter";

type Stat = {
  icon: typeof Users;
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  desc: string;
  accent: string;
};

const stats: Stat[] = [
  {
    icon: Users,
    end: 248,
    suffix: "+",
    label: "Active Leads",
    desc: "Being tracked across pipelines right now",
    accent: "text-blue-600 bg-blue-50 ring-blue-200",
  },
  {
    icon: IndianRupee,
    end: 18.2,
    prefix: "₹",
    suffix: "L",
    decimals: 1,
    label: "Pipeline Value",
    desc: "Live opportunity value in open deals",
    accent: "text-emerald-600 bg-emerald-50 ring-emerald-200",
  },
  {
    icon: Zap,
    end: 89,
    suffix: "%",
    label: "Response Rate",
    desc: "Of inbound leads replied to within an hour",
    accent: "text-violet-600 bg-violet-50 ring-violet-200",
  },
  {
    icon: Clock,
    end: 8,
    suffix: " hrs",
    label: "Saved Weekly",
    desc: "Fewer spreadsheet updates and copy-paste tasks",
    accent: "text-amber-600 bg-amber-50 ring-amber-200",
  },
  {
    icon: TrendingUp,
    end: 3,
    suffix: "×",
    label: "Faster Follow-ups",
    desc: "Compared to WhatsApp and shared inboxes",
    accent: "text-primary bg-primary-soft ring-primary/20",
  },
];

export function ROI() {
  return (
    <section className="bg-subtle-gradient">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Measurable ROI"
          title="Get your week — and your pipeline — back"
          subtitle="Teams that switch to LeadDesk Mini spend less time on admin and more time closing deals."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, i) => (
            <KpiCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function KpiCard({ stat, index }: { stat: Stat; index: number }) {
  const { ref, value } = useCounter(stat.end);
  const display =
    (stat.prefix ?? "") +
    (stat.decimals
      ? value.toFixed(stat.decimals)
      : Math.round(value).toLocaleString("en-IN")) +
    (stat.suffix ?? "");

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/5 blur-2xl transition-opacity group-hover:bg-primary/10"
      />
      <div className="relative flex items-center gap-3">
        <div
          className={`grid h-11 w-11 place-items-center rounded-xl ring-1 ring-inset ${stat.accent}`}
        >
          <stat.icon className="h-5 w-5" aria-hidden />
        </div>
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {stat.label}
        </div>
      </div>
      <div className="relative mt-5">
        <span
          ref={ref}
          className="block text-4xl font-semibold tracking-tight text-foreground sm:text-5xl tabular-nums"
        >
          {display}
        </span>
      </div>
      <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">{stat.desc}</p>
    </motion.article>
  );
}
