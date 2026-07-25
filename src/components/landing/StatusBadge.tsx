"use client";

import { cn } from "@/lib/utils";

export type LeadStatus = "New" | "Contacted" | "Closed";

const styles: Record<LeadStatus, string> = {
  New: "bg-blue-50 text-blue-700 ring-blue-200",
  Contacted: "bg-amber-50 text-amber-700 ring-amber-200",
  Closed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export function StatusBadge({ status, className }: { status: LeadStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        styles[status],
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "New" && "bg-blue-500",
          status === "Contacted" && "bg-amber-500",
          status === "Closed" && "bg-emerald-500",
        )}
      />
      {status}
    </span>
  );
}
