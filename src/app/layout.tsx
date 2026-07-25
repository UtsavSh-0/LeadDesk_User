import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeadDesk Mini — Stop Losing High-Value Leads",
  description:
    "LeadDesk Mini is a focused CRM for agencies and freelancers. Capture, organize and close every inquiry from one simple dashboard.",
  openGraph: {
    title: "LeadDesk Mini — Stop Losing High-Value Leads",
    description:
      "Every inquiry tracked. Every follow-up remembered. Every opportunity closed. A modern lead-management workspace for growing teams.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadDesk Mini — Stop Losing High-Value Leads",
    description:
      "Every inquiry tracked. Every follow-up remembered. Every opportunity closed.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
