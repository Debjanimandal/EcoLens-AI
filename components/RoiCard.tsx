"use client";

import { motion } from "framer-motion";
import { AuditResult } from "@/types/audit";
import { TrendingUp } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface RoiCardProps {
  roi: AuditResult["roi"];
}

export default function RoiCard({ roi }: RoiCardProps) {
  const score = Math.min(100, Math.max(0, Math.round(roi.impact_score)));
  const circumference = 2 * Math.PI * 44; // r=44
  const dashOffset = circumference - (score / 100) * circumference;

  // Score colour
  const scoreColor =
    score >= 70 ? "#34d399" : score >= 40 ? "#fbbf24" : "#f87171";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="glass-card p-6 flex flex-col gap-5"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(251, 191, 36, 0.12)",
            border: "1px solid rgba(251, 191, 36, 0.25)",
          }}
        >
          <TrendingUp size={20} style={{ color: "#fbbf24" }} />
        </div>
        <div>
          <h2
            className="font-display font-bold text-lg leading-tight"
            style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
          >
            ROI & Impact
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Cost vs. climate value
          </p>
        </div>
        <div className="ml-auto">
          <StatusBadge level={roi.cost_level} prefix="Cost" />
        </div>
      </div>

      {/* Impact score ring + info */}
      <div className="flex items-center gap-6">
        {/* SVG ring */}
        <div className="score-ring flex-shrink-0" style={{ width: 110, height: 110 }}>
          <svg width="110" height="110" viewBox="0 0 110 110">
            {/* Track */}
            <circle
              cx="55" cy="55" r="44"
              fill="none"
              stroke="rgba(52,211,153,0.1)"
              strokeWidth="10"
            />
            {/* Progress */}
            <motion.circle
              cx="55" cy="55" r="44"
              fill="none"
              stroke={scoreColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
              style={{ transform: "rotate(-90deg)", transformOrigin: "55px 55px" }}
            />
            {/* Score text */}
            <text
              x="55" y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="22"
              fontWeight="700"
              fill={scoreColor}
              fontFamily="var(--font-space)"
            >
              {score}
            </text>
            <text
              x="55" y="68"
              textAnchor="middle"
              fontSize="10"
              fill="#6b7280"
              fontFamily="var(--font-inter)"
            >
              / 100
            </text>
          </svg>
        </div>

        {/* Labels */}
        <div className="flex flex-col gap-2 flex-1">
          <div>
            <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "var(--text-muted)" }}>
              Climate Impact Score
            </p>
            <p
              className="font-display font-bold text-2xl"
              style={{ color: scoreColor, fontFamily: "var(--font-space)" }}
            >
              {score >= 70 ? "High Impact" : score >= 40 ? "Moderate Impact" : "Low Impact"}
            </p>
          </div>
          <div
            className="w-full rounded"
            style={{ height: 4, background: "rgba(52,211,153,0.1)" }}
          >
            <motion.div
              className="h-full rounded"
              style={{ background: scoreColor }}
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Payback */}
      <div
        className="rounded-xl px-4 py-3"
        style={{
          background: "rgba(251, 191, 36, 0.07)",
          border: "1px solid rgba(251, 191, 36, 0.15)",
        }}
      >
        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
          Payback / Value
        </p>
        <p style={{ color: "#fde68a", fontSize: "0.875rem", lineHeight: 1.6 }}>
          {roi.payback_or_value}
        </p>
      </div>
    </motion.div>
  );
}
