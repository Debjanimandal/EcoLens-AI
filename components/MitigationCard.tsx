"use client";

import { motion } from "framer-motion";
import { AuditResult } from "@/types/audit";
import { Zap } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface MitigationCardProps {
  mitigation: AuditResult["mitigation"];
}

export default function MitigationCard({ mitigation }: MitigationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="glass-card p-6 flex flex-col gap-5"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(52, 211, 153, 0.25)",
          }}
        >
          <Zap size={20} style={{ color: "var(--green-400)" }} />
        </div>
        <div>
          <h2
            className="font-display font-bold text-lg leading-tight"
            style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
          >
            Mitigation
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Reduce emissions & environmental impact
          </p>
        </div>
        <div className="ml-auto">
          <StatusBadge level={mitigation.effort_level} prefix="Effort" />
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
          Recommended Actions
        </p>
        <ul className="result-list list-none p-0">
          {mitigation.recommendations.map((rec, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
            >
              {rec}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Expected benefit */}
      <div
        className="rounded-xl px-4 py-3 mt-auto"
        style={{
          background: "rgba(16, 185, 129, 0.08)",
          border: "1px solid rgba(52, 211, 153, 0.18)",
        }}
      >
        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
          Expected Benefit
        </p>
        <p style={{ color: "var(--green-300)", fontSize: "0.875rem", lineHeight: 1.6 }}>
          {mitigation.expected_benefit}
        </p>
      </div>
    </motion.div>
  );
}
