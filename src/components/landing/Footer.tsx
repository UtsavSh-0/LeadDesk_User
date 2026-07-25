"use client";

import { Sparkles, Github, Twitter, Linkedin, BookOpen, LifeBuoy } from "lucide-react";

const cols = [
  {
    heading: "Product",
    links: ["Features", "Pricing", "Dashboard", "Changelog"],
  },
  {
    heading: "Resources",
    links: ["Documentation", "Support", "GitHub", "Status"],
  },
  {
    heading: "Legal",
    links: ["Privacy", "Terms", "Security", "DPA"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-subtle-gradient">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <a href="#" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-soft">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="font-semibold tracking-tight text-foreground">LeadDesk Mini</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Capture more leads and close more clients with a focused, modern CRM built for small teams.
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              Built with Next.js + Supabase
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { icon: Github, label: "GitHub", href: "#" },
                { icon: BookOpen, label: "Documentation", href: "#" },
                { icon: LifeBuoy, label: "Support", href: "#" },
                { icon: Twitter, label: "Twitter", href: "#" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.heading}>
              <h3 className="text-sm font-semibold text-foreground">{c.heading}</h3>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LeadDesk Mini. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for Digital Heroes Training Task ·{" "}
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary hover:underline"
            >
              digitalheroesco.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
