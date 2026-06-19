"use client";

import { motion } from "framer-motion";
import { Leaf, Brain } from "lucide-react";

const steps = [
  "Sending image to Gemini Vision…",
  "Identifying environmental features…",
  "Computing mitigation strategies…",
  "Calculating ROI & impact score…",
  "Preparing your climate report…",
];

export default function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-8 py-16"
    >
      {/* Spinner */}
      <div className="relative">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center pulse-green"
          style={{
            background: "rgba(16, 185, 129, 0.1)",
            border: "2px solid rgba(52, 211, 153, 0.3)",
          }}
        >
          <Brain size={36} style={{ color: "var(--green-400)" }} />
        </div>
        {/* Spinning ring */}
        <svg
          className="absolute inset-0 spin"
          width="96" height="96" viewBox="0 0 96 96"
        >
          <circle
            cx="48" cy="48" r="44"
            fill="none"
            stroke="url(#spinGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="60 220"
          />
          <defs>
            <linearGradient id="spinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Steps */}
      <div className="flex flex-col items-center gap-3">
        <p
          className="font-display font-bold text-xl"
          style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
        >
          Analysing your environment
        </p>
        <div className="flex flex-col gap-1.5 mt-2">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.45, duration: 0.4 }}
              className="flex items-center gap-2 text-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.45 + 0.2 }}
              >
                <Leaf size={13} style={{ color: "var(--green-400)" }} />
              </motion.div>
              <span style={{ color: "#a7f3d0" }}>{step}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tip */}
      <p className="text-xs text-center max-w-xs" style={{ color: "var(--text-muted)" }}>
        For best results, clear photos with good lighting work best. The AI reads
        what it can see — no additional info needed.
      </p>
    </motion.div>
  );
}
