"use client";

import { Level } from "@/types/audit";

interface StatusBadgeProps {
  level: Level;
  prefix?: string;
}

const CONFIG: Record<Level, { label: string; className: string }> = {
  low: { label: "Low", className: "badge badge-low" },
  medium: { label: "Medium", className: "badge badge-medium" },
  high: { label: "High", className: "badge badge-high" },
};

export default function StatusBadge({ level, prefix }: StatusBadgeProps) {
  const { label, className } = CONFIG[level];
  return (
    <span className={className}>
      {prefix ? `${prefix}: ${label}` : label}
    </span>
  );
}
