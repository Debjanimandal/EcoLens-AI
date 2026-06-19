"use client";

import { motion } from "framer-motion";
import { Leaf, Zap, ArrowDown } from "lucide-react";

export default function HeroSection() {
  const scrollToUpload = () => {
    document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[92vh] px-6 text-center overflow-hidden">
      {/* Floating orb decorations */}
      <div
        className="orb-float absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
          animationDelay: "0s",
        }}
      />
      <div
        className="orb-float absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-8 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)",
          animationDelay: "3s",
        }}
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full mb-8"
        style={{
          background: "rgba(16, 185, 129, 0.1)",
          border: "1px solid rgba(52, 211, 153, 0.25)",
        }}
      >
        <Leaf size={14} className="text-green-400" style={{ color: "var(--green-400)" }} />
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "var(--green-300)" }}
        >
          AI-Powered Climate Vision
        </span>
        <Zap size={14} style={{ color: "var(--green-400)" }} />
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-4xl"
      >
        Turning{" "}
        <span className="gradient-text">Photos</span>
        {" "}into
        <br />
        <span className="gradient-text">Climate Action</span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg sm:text-xl max-w-2xl mb-4 leading-relaxed"
        style={{ color: "#a7f3d0" }}
      >
        Upload a photo of your environment — rooftop, street, home, or yard —
        and receive an instant AI-powered climate audit with practical,
        personalized action steps.
      </motion.p>

      {/* Feature pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap gap-3 justify-center mb-10"
      >
        {[
          "📸 Upload any photo",
          "🔬 AI environmental audit",
          "🌱 Mitigation strategies",
          "🛡️ Adaptation plans",
          "💰 ROI analysis",
        ].map((item) => (
          <span
            key={item}
            className="text-sm px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(52, 211, 153, 0.15)",
              color: "#6ee7b7",
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <button id="hero-cta" onClick={scrollToUpload} className="btn-primary text-lg px-8 py-4">
          <Leaf size={20} />
          Start Your Climate Audit
        </button>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex gap-8 mt-16"
      >
        {[
          { value: "< 10s", label: "Analysis time" },
          { value: "100%", label: "Image-based" },
          { value: "0", label: "Forms to fill" },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <div
              className="font-display text-2xl font-bold gradient-text"
              style={{ fontFamily: "var(--font-space)" }}
            >
              {value}
            </div>
            <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              {label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToUpload}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 cursor-pointer"
        style={{ background: "none", border: "none" }}
        aria-label="Scroll to upload"
      >
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          Upload below
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <ArrowDown size={18} style={{ color: "var(--green-400)" }} />
        </motion.div>
      </motion.button>
    </section>
  );
}
