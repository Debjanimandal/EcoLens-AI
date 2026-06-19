"use client";

import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="w-full rounded-2xl px-6 py-5 flex gap-4 items-start"
      style={{
        background: "rgba(239, 68, 68, 0.08)",
        border: "1px solid rgba(239, 68, 68, 0.25)",
      }}
    >
      <AlertCircle
        size={22}
        style={{ color: "#f87171", flexShrink: 0, marginTop: "2px" }}
      />
      <div className="flex-1">
        <p
          className="font-semibold text-sm mb-1"
          style={{ color: "#f87171" }}
        >
          Analysis Failed
        </p>
        <p style={{ color: "#fca5a5", fontSize: "0.875rem", lineHeight: 1.6 }}>
          {message}
        </p>
      </div>
      <button
        id="retry-btn"
        onClick={onRetry}
        className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl flex-shrink-0 transition-all hover:opacity-90"
        style={{
          background: "rgba(239, 68, 68, 0.15)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          color: "#f87171",
        }}
      >
        <RefreshCw size={13} />
        Try Again
      </button>
    </motion.div>
  );
}
