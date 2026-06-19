"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import ImageUploader from "@/components/ImageUploader";
import AnalyzeButton from "@/components/AnalyzeButton";
import ResultsDashboard from "@/components/ResultsDashboard";
import LoadingOverlay from "@/components/LoadingOverlay";
import ErrorBanner from "@/components/ErrorBanner";
import { AuditResult } from "@/types/audit";
import { Leaf, ExternalLink } from "lucide-react";

type AppState = "idle" | "loading" | "success" | "error";

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // ── File selection ──────────────────────────────────────────────────────
  const handleFileSelected = useCallback((file: File, url: string) => {
    setUploadedFile(file);
    setPreviewUrl(url);
    setAppState("idle");
    setResult(null);
    setErrorMessage("");
  }, []);

  const handleFileClear = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setUploadedFile(null);
    setPreviewUrl(null);
    setAppState("idle");
    setResult(null);
    setErrorMessage("");
  }, [previewUrl]);

  // ── Submit ──────────────────────────────────────────────────────────────
  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setAppState("loading");
    setResult(null);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("image", uploadedFile);

      const res = await fetch("/api/audit", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        throw new Error(json.error ?? "Unknown error from server.");
      }

      setResult(json.data as AuditResult);
      setAppState("success");

      // Scroll results into view on mobile
      setTimeout(() => {
        document.getElementById("results-dashboard")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(msg);
      setAppState("error");
    }
  };

  // ── Reset ───────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setUploadedFile(null);
    setPreviewUrl(null);
    setAppState("idle");
    setResult(null);
    setErrorMessage("");
    document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
  }, [previewUrl]);

  const isLoading = appState === "loading";
  const hasFile = !!uploadedFile;

  return (
    <div className="relative min-h-screen" style={{ zIndex: 1 }}>
      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          borderBottom: "1px solid rgba(52, 211, 153, 0.1)",
          background: "rgba(4, 13, 10, 0.85)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(16, 185, 129, 0.2)", border: "1px solid rgba(52,211,153,0.3)" }}
          >
            <Leaf size={16} style={{ color: "var(--green-400)" }} />
          </div>
          <span
            className="font-display font-bold text-lg tracking-tight"
            style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
          >
            EcoLens <span className="gradient-text">AI</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span
            className="text-xs px-3 py-1 rounded-full"
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(52, 211, 153, 0.2)",
              color: "var(--green-300)",
            }}
          >
            Gemini Vision
          </span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{ color: "var(--text-muted)" }}
            className="hover:opacity-70 transition-opacity"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Upload section ──────────────────────────────────────────────── */}
      <section
        id="upload-section"
        className="max-w-3xl mx-auto px-6 py-20 flex flex-col items-center gap-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2
            className="font-display font-bold text-3xl mb-3"
            style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
          >
            Upload Your Photo
          </h2>
          <p style={{ color: "#a7f3d0", fontSize: "1rem" }}>
            Any environment — indoors or outdoors. The AI does the rest.
          </p>
        </motion.div>

        {/* Uploader */}
        <ImageUploader
          onFileSelected={handleFileSelected}
          onFileClear={handleFileClear}
          previewUrl={previewUrl}
          fileName={uploadedFile?.name ?? null}
          disabled={isLoading}
        />

        {/* Analyze button */}
        <AnimatePresence>
          {hasFile && appState !== "success" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
              className="w-full flex justify-center"
            >
              <AnalyzeButton
                onClick={handleAnalyze}
                disabled={!hasFile}
                loading={isLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        <AnimatePresence>
          {appState === "error" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <ErrorBanner
                message={errorMessage}
                onRetry={handleAnalyze}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <LoadingOverlay />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Results ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {appState === "success" && result && previewUrl && (
          <motion.section
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto px-6 pb-24"
          >
            <div className="section-divider" />
            <div className="text-center mb-10">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display font-bold text-3xl mb-2"
                style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
              >
                Your Climate <span className="gradient-text">Audit Report</span>
              </motion.h2>
              <p style={{ color: "#a7f3d0" }}>
                AI-powered insights based on your uploaded photo
              </p>
            </div>
            <ResultsDashboard
              result={result}
              imageUrl={previewUrl}
              onReset={handleReset}
            />
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer
        className="border-t py-8 px-6 text-center"
        style={{ borderColor: "rgba(52, 211, 153, 0.1)" }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Leaf size={14} style={{ color: "var(--green-400)" }} />
          <span
            className="font-display font-semibold text-sm"
            style={{ fontFamily: "var(--font-space)", color: "var(--green-300)" }}
          >
            EcoLens AI
          </span>
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Powered by Google Gemini Vision · Built for climate action
        </p>
      </footer>
    </div>
  );
}
