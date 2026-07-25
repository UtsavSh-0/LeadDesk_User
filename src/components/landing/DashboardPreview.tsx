"use client";

import { motion } from "motion/react";
import {
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Bell,
  TrendingUp,
  Users,
  IndianRupee,
  Star,
  Circle,
  Mail,
  Phone,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { StatusBadge, type LeadStatus } from "./StatusBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Row = {
  name: string;
  company: string;
  email: string;
  budget: string;
  owner: string;
  created: string;
  status: LeadStatus;
  priority: "High" | "Medium" | "Low";
  note: string;
};

const rows: Row[] = [
  {
    name: "Aarav Mehta",
    company: "Novatech Studio",
    email: "aarav@novatech.io",
    budget: "₹1,20,000",
    owner: "Sana K.",
    created: "Today, 09:14",
    status: "New",
    priority: "High",
    note: "Wants a Q1 launch — decision in 2 weeks.",
  },
  {
    name: "Priya Shah",
    company: "Cloudify",
    email: "priya@cloudify.co",
    budget: "₹75,000",
    owner: "Rahul V.",
    created: "Today, 08:02",
    status: "Contacted",
    priority: "Medium",
    note: "Sent proposal, waiting on legal review.",
  },
  {
    name: "Rohan Kapoor",
    company: "Pixelworks",
    email: "rohan@pixelworks.com",
    budget: "₹42,000",
    owner: "Meera T.",
    created: "Yesterday",
    status: "Closed",
    priority: "Low",
    note: "Signed — kickoff scheduled for Monday.",
  },
  {
    name: "Isha Verma",
    company: "Rocketlabs",
    email: "isha@rocketlabs.dev",
    budget: "₹22,000",
    owner: "Sana K.",
    created: "2 days ago",
    status: "New",
    priority: "Medium",
    note: "Referral from Aarav — small first project.",
  },
  {
    name: "Kabir Singh",
    company: "BrightScale AI",
    email: "kabir@brightscale.ai",
    budget: "₹95,000",
    owner: "Rahul V.",
    created: "3 days ago",
    status: "Contacted",
    priority: "High",
    note: "Interested in retainer, follow up Friday.",
  },
];

const notifications = [
  { icon: Bell, tone: "blue", title: "New lead", detail: "Aarav Mehta · just now" },
  { icon: IndianRupee, tone: "emerald", title: "Budget approved", detail: "₹1.2L · Novatech" },
  { icon: Mail, tone: "violet", title: "Email replied", detail: "Priya S. sent an update" },
];

const activity = [
  { who: "Sana K.", what: "moved Aarav Mehta to Contacted", when: "2m ago" },
  { who: "Rahul V.", what: "added a note to BrightScale", when: "14m ago" },
  { who: "Meera T.", what: "closed Pixelworks · ₹42k", when: "1h ago" },
  { who: "System", what: "captured 3 new leads from website", when: "2h ago" },
];

export function DashboardPreview() {
  return (
    <section id="dashboard-preview" className="bg-subtle-gradient">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Dashboard"
          title="A calm, focused view of every lead"
          subtitle="Search, filter, update statuses, and see analytics — all without leaving the page."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mt-12 max-w-6xl"
        >
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/15 via-accent-blue/15 to-transparent blur-3xl"
          />

          {/* KPI strip */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <KpiTile icon={<Users className="h-4 w-4" />} label="Active leads" value="248" trend="+18%" />
            <KpiTile icon={<IndianRupee className="h-4 w-4" />} label="Pipeline" value="₹18.2L" trend="+9%" />
            <KpiTile icon={<TrendingUp className="h-4 w-4" />} label="Won this month" value="63" trend="+24%" />
            <KpiTile icon={<Bell className="h-4 w-4" />} label="Response rate" value="89%" trend="+4%" />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.65fr_1fr]">
            {/* Main table card */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_80px_-30px_rgba(37,99,235,0.28)]">
              <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search leads, companies, emails…" className="pl-9" aria-label="Search leads" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Filter</Button>
                  <Button size="sm">Add lead</Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm">
                  <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-medium">Company</th>
                      <th scope="col" className="px-4 py-3 font-medium">Budget</th>
                      <th scope="col" className="px-4 py-3 font-medium">Owner</th>
                      <th scope="col" className="px-4 py-3 font-medium">Created</th>
                      <th scope="col" className="px-4 py-3 font-medium">Status</th>
                      <th scope="col" className="px-4 py-3 font-medium">Priority</th>
                      <th scope="col" className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {rows.map((r) => (
                      <tr key={r.email} className="transition-colors hover:bg-muted/40">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="grid h-8 w-8 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                              {r.name.split(" ").map((s) => s[0]).join("")}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-medium text-foreground">{r.company}</p>
                              <p className="truncate text-xs text-muted-foreground">{r.name} · {r.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground">{r.budget}</td>
                        <td className="px-4 py-3 text-muted-foreground">{r.owner}</td>
                        <td className="px-4 py-3 text-muted-foreground">{r.created}</td>
                        <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                        <td className="px-4 py-3"><PriorityBadge priority={r.priority} /></td>
                        <td className="px-4 py-3 text-right">
                          <button
                            aria-label={`Actions for ${r.name}`}
                            className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col items-start justify-between gap-3 border-t border-border p-4 sm:flex-row sm:items-center">
                <p className="text-xs text-muted-foreground">Showing 1–5 of 248 leads</p>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" aria-label="Previous page">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {[1, 2, 3, 4].map((n) => (
                    <Button
                      key={n}
                      variant={n === 1 ? "default" : "outline"}
                      size="sm"
                      className="h-9 w-9 px-0"
                    >
                      {n}
                    </Button>
                  ))}
                  <Button variant="outline" size="icon" aria-label="Next page">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Side panel */}
            <div className="space-y-5">
              {/* Lead details */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Lead details
                  </p>
                  <StatusBadge status="New" />
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                    AM
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">Aarav Mehta</p>
                    <p className="truncate text-xs text-muted-foreground">Novatech Studio</p>
                  </div>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                  <dt className="text-muted-foreground">Budget</dt>
                  <dd className="text-right font-medium text-foreground">₹1,20,000</dd>
                  <dt className="text-muted-foreground">Owner</dt>
                  <dd className="text-right font-medium text-foreground">Sana K.</dd>
                  <dt className="text-muted-foreground">Created</dt>
                  <dd className="text-right font-medium text-foreground">Today, 09:14</dd>
                  <dt className="text-muted-foreground">Source</dt>
                  <dd className="text-right font-medium text-foreground">Website form</dd>
                </dl>
                <div className="mt-4 rounded-lg border border-border/70 bg-background p-3 text-xs text-muted-foreground">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">Note</p>
                  Wants a Q1 launch — decision in 2 weeks.
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="flex-1"><Mail className="mr-1.5 h-3.5 w-3.5" /> Email</Button>
                  <Button size="sm" variant="outline" className="flex-1"><Phone className="mr-1.5 h-3.5 w-3.5" /> Call</Button>
                </div>
              </div>

              {/* Notifications */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Recent notifications
                </p>
                <ul className="mt-3 space-y-2.5">
                  {notifications.map((n) => (
                    <li key={n.title} className="flex items-start gap-3 rounded-lg border border-border/70 bg-background p-2.5">
                      <span
                        className={
                          "grid h-8 w-8 shrink-0 place-items-center rounded-lg " +
                          (n.tone === "blue"
                            ? "bg-blue-50 text-blue-600"
                            : n.tone === "emerald"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-violet-50 text-violet-600")
                        }
                      >
                        <n.icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground">{n.title}</p>
                        <p className="truncate text-xs text-muted-foreground">{n.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent activity */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Recent activity
                </p>
                <ul className="mt-3 space-y-3">
                  {activity.map((a) => (
                    <li key={a.what} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                      <Circle className="mt-1 h-2 w-2 shrink-0 fill-primary text-primary" />
                      <span>
                        <span className="font-medium text-foreground">{a.who}</span> {a.what}
                        <span className="text-muted-foreground/70"> · {a.when}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function KpiTile({
  icon,
  label,
  value,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary-soft text-primary">{icon}</span>
        <span className="text-[11px] font-medium uppercase tracking-wider">{label}</span>
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-2xl font-semibold tracking-tight text-foreground tabular-nums">{value}</span>
        <span className="text-[11px] font-semibold text-emerald-600">{trend}</span>
      </div>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: "High" | "Medium" | "Low" }) {
  const tone =
    priority === "High"
      ? "text-rose-700 bg-rose-50 ring-rose-200"
      : priority === "Medium"
        ? "text-amber-700 bg-amber-50 ring-amber-200"
        : "text-slate-600 bg-slate-50 ring-slate-200";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${tone}`}>
      <Star className="h-3 w-3" /> {priority}
    </span>
  );
}
