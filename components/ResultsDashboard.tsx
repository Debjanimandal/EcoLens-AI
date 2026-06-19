"use client";

import { motion } from "framer-motion";
import { AuditResult } from "@/types/audit";
import AuditCard from "./AuditCard";
import MitigationCard from "./MitigationCard";
import AdaptationCard from "./AdaptationCard";
import RoiCard from "./RoiCard";
import SummaryBanner from "./SummaryBanner";
import { RotateCcw } from "lucide-react";

interface ResultsDashboardProps {
  result: AuditResult;
  imageUrl: string;
  onReset: () => void;
}

export default function ResultsDashboard({
  result,
  imageUrl,
  onReset,
}: ResultsDashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col gap-6"
      id="results-dashboard"
    >
      {/* Top: image + summary */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image thumbnail */}
        <div
          className="lg:w-72 flex-shrink-0 rounded-2xl overflow-hidden self-start"
          style={{ border: "1px solid rgba(52, 211, 153, 0.2)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Analysed photo"
            className="w-full object-cover"
            style={{ maxHeight: "200px" }}
          />
          <div
            className="px-4 py-2 flex items-center justify-between"
            style={{ background: "rgba(4,13,10,0.9)" }}
          >
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              Analysed photo
            </span>
            <button
              id="new-audit-btn"
              onClick={onReset}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
              style={{
                background: "rgba(16, 185, 129, 0.12)",
                border: "1px solid rgba(52, 211, 153, 0.2)",
                color: "var(--green-400)",
              }}
            >
              <RotateCcw size={11} />
              New Audit
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="flex-1 flex flex-col justify-center">
          <SummaryBanner summary={result.summary} />
          <div className="mt-4 flex flex-wrap gap-3">
            <div
              className="px-4 py-2 rounded-xl text-sm"
              style={{
                background: "rgba(16, 185, 129, 0.08)",
                border: "1px solid rgba(52, 211, 153, 0.15)",
                color: "var(--green-300)",
              }}
            >
              🔬 Subject:{" "}
              <strong>{result.audit.identified_subject}</strong>
            </div>
            <div
              className="px-4 py-2 rounded-xl text-sm"
              style={{
                background: "rgba(16, 185, 129, 0.08)",
                border: "1px solid rgba(52, 211, 153, 0.15)",
                color: "var(--green-300)",
              }}
            >
              📊 Impact Score:{" "}
              <strong>{result.roi.impact_score}/100</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 4-card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AuditCard audit={result.audit} />
        <MitigationCard mitigation={result.mitigation} />
        <AdaptationCard adaptation={result.adaptation} />
        <RoiCard roi={result.roi} />
      </div>

      {/* Footer action */}
      <div className="flex justify-center pt-2">
        <button
          id="start-over-btn"
          onClick={onReset}
          className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl transition-all hover:opacity-80"
          style={{
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(52, 211, 153, 0.2)",
            color: "var(--green-300)",
          }}
        >
          <RotateCcw size={15} />
          Audit another photo
        </button>
      </div>
    </motion.div>
  );
}
