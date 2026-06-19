"use client";

import { motion } from "framer-motion";
import { Scan, Loader2 } from "lucide-react";

interface AnalyzeButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

export default function AnalyzeButton({
  onClick,
  disabled,
  loading,
}: AnalyzeButtonProps) {
  return (
    <motion.button
      id="analyze-btn"
      onClick={onClick}
      disabled={disabled || loading}
      className="btn-primary w-full max-w-sm text-base"
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      aria-label={loading ? "Analyzing image…" : "Analyze image for climate insights"}
    >
      {loading ? (
        <>
          <Loader2 size={20} className="spin" />
          Analyzing your environment…
        </>
      ) : (
        <>
          <Scan size={20} />
          Run Climate Audit
        </>
      )}
    </motion.button>
  );
}
