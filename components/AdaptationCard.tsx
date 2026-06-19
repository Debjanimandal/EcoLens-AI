"use client";

import { motion } from "framer-motion";
import { AuditResult } from "@/types/audit";
import { Shield } from "lucide-react";

interface AdaptationCardProps {
  adaptation: AuditResult["adaptation"];
}

export default function AdaptationCard({ adaptation }: AdaptationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="glass-card p-6 flex flex-col gap-5"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(45, 212, 191, 0.15)",
            border: "1px solid rgba(45, 212, 191, 0.25)",
          }}
        >
          <Shield size={20} style={{ color: "#2dd4bf" }} />
        </div>
        <div>
          <h2
            className="font-display font-bold text-lg leading-tight"
            style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
          >
            Adaptation
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Build climate resilience
          </p>
        </div>
      </div>

      {/* Risk addressed */}
      <div
        className="rounded-xl px-4 py-3"
        style={{
          background: "rgba(45, 212, 191, 0.07)",
          border: "1px solid rgba(45, 212, 191, 0.15)",
        }}
      >
        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
          Risk Being Addressed
        </p>
        <p style={{ color: "#5eead4", fontSize: "0.875rem", fontWeight: 600 }}>
          {adaptation.risk_addressed}
        </p>
      </div>

      {/* Recommendations */}
      <div>
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
          Adaptation Strategies
        </p>
        <ul className="result-list list-none p-0" style={{ "--list-color": "#5eead4" } as React.CSSProperties}>
          {adaptation.recommendations.map((rec, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              style={{ color: "#a5f3fc" }}
            >
              <span style={{ color: "#2dd4bf" }}>→</span>
              <span>{rec}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Resilience benefit */}
      <div
        className="rounded-xl px-4 py-3 mt-auto"
        style={{
          background: "rgba(45, 212, 191, 0.08)",
          border: "1px solid rgba(45, 212, 191, 0.18)",
        }}
      >
        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
          Resilience Benefit
        </p>
        <p style={{ color: "#a5f3fc", fontSize: "0.875rem", lineHeight: 1.6 }}>
          {adaptation.resilience_benefit}
        </p>
      </div>
    </motion.div>
  );
}
