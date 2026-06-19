"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

interface SummaryBannerProps {
  summary: string;
}

export default function SummaryBanner({ summary }: SummaryBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-2xl px-6 py-5 flex gap-4 items-start"
      style={{
        background:
          "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(45,212,191,0.08) 100%)",
        border: "1px solid rgba(52, 211, 153, 0.25)",
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{
          background: "rgba(16, 185, 129, 0.2)",
          border: "1px solid rgba(52, 211, 153, 0.3)",
        }}
      >
        <Leaf size={18} style={{ color: "var(--green-400)" }} />
      </div>
      <div>
        <p
          className="font-display font-semibold text-sm mb-1"
          style={{ fontFamily: "var(--font-space)", color: "var(--green-300)" }}
        >
          AI Summary
        </p>
        <p style={{ color: "#d1fae5", fontSize: "0.95rem", lineHeight: 1.7 }}>
          {summary}
        </p>
      </div>
    </motion.div>
  );
}
