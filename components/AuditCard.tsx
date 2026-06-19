"use client";

import { motion } from "framer-motion";
import { AuditResult } from "@/types/audit";
import { Search, AlertTriangle, Info, CheckCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface AuditCardProps {
  audit: AuditResult["audit"];
}

const confidenceIcon = {
  low: <AlertTriangle size={14} style={{ color: "var(--medium-text)" }} />,
  medium: <Info size={14} style={{ color: "var(--teal-400)" }} />,
  high: <CheckCircle size={14} style={{ color: "var(--green-400)" }} />,
};

export default function AuditCard({ audit }: AuditCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
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
          <Search size={20} style={{ color: "var(--green-400)" }} />
        </div>
        <div>
          <h2
            className="font-display font-bold text-lg leading-tight"
            style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
          >
            Visual Audit
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            What the AI observed
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          {confidenceIcon[audit.confidence]}
          <StatusBadge level={audit.confidence} prefix="Confidence" />
        </div>
      </div>

      {/* Subject */}
      <div
        className="rounded-xl px-4 py-3"
        style={{
          background: "rgba(52, 211, 153, 0.06)",
          border: "1px solid rgba(52, 211, 153, 0.12)",
        }}
      >
        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
          Identified Subject
        </p>
        <p
          className="font-display font-semibold text-base"
          style={{ fontFamily: "var(--font-space)", color: "var(--green-300)" }}
        >
          {audit.identified_subject}
        </p>
      </div>

      {/* Issue */}
      <div>
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
          Observed Issue
        </p>
        <p style={{ color: "#d1fae5", fontSize: "0.9rem", lineHeight: 1.6 }}>
          {audit.observed_issue}
        </p>
      </div>

      {/* Why it matters */}
      <div
        className="rounded-xl px-4 py-3"
        style={{
          background: "rgba(245, 158, 11, 0.07)",
          border: "1px solid rgba(245, 158, 11, 0.15)",
        }}
      >
        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#d97706" }}>
          Why It Matters
        </p>
        <p style={{ color: "#fde68a", fontSize: "0.875rem", lineHeight: 1.6 }}>
          {audit.why_it_matters}
        </p>
      </div>
    </motion.div>
  );
}
