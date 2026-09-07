"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ImageUploader from "@/components/ImageUploader";
import AnalyzeButton from "@/components/AnalyzeButton";
import ResultsDashboard from "@/components/ResultsDashboard";
import LoadingOverlay from "@/components/LoadingOverlay";
import ErrorBanner from "@/components/ErrorBanner";
import { AuditResult } from "@/types/audit";
import { Leaf, ArrowLeft } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type AppState = "idle" | "loading" | "success" | "error";
type Role = "assistant" | "user";
interface Message { role: Role; text: string; }

// ─── Constants ────────────────────────────────────────────────────────────────
const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

const SEED_MESSAGES: Message[] = [
  {
    role: "assistant",
    text: "Welcome to EcoLens AI! I can analyze any environment photo and provide a detailed climate audit with mitigation strategies and ROI estimates. What would you like to analyze?",
  },
  {
    role: "user",
    text: "I want to analyze the solar potential and carbon footprint of my rooftop.",
  },
  {
    role: "assistant",
    text: "Great choice! Upload a photo of your rooftop and I'll assess solar irradiance, panel placement optimization, vegetation coverage, and provide a full carbon offset analysis with projected ROI — all in seconds.",
  },
];

const CANNED_REPLY =
  "Based on your query, I'll analyze the environmental data and provide actionable climate insights with detailed mitigation strategies tailored to your specific location.";

// ─── useIsMobile ──────────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── FadeUp ───────────────────────────────────────────────────────────────────
interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}
function FadeUp({ children, delay = 0, y = 24, className = "" }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── MIcon ────────────────────────────────────────────────────────────────────
interface MIconProps {
  name: string;
  size?: number;
  fill?: 0 | 1;
  weight?: number;
  grade?: number;
  opticalSize?: number;
  className?: string;
}
function MIcon({
  name,
  size = 20,
  fill = 0,
  weight = 400,
  grade = 0,
  opticalSize = 20,
  className = "",
}: MIconProps) {
  return (
    <span
      className={`material-symbols-outlined select-none ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`,
        lineHeight: 1,
        display: "inline-block",
      }}
    >
      {name}
    </span>
  );
}

// ─── AnimatedText ─────────────────────────────────────────────────────────────
function AnimatedText({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="relative flex flex-col overflow-hidden"
      style={{ height: "1.2em" }}
    >
      <span className="flex-shrink-0 transition-transform duration-[250ms] ease-out group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-[250ms] ease-out group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
}

// ─── PrimaryButton ────────────────────────────────────────────────────────────
interface PrimaryButtonProps {
  children: React.ReactNode;
  as?: "a" | "button";
  onClick?: () => void;
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}
function PrimaryButton({
  children,
  as: Tag = "a",
  onClick,
  href,
  size = "lg",
  className = "",
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: "h-9 px-6 text-xs",
    md: "h-10 px-7 text-sm",
    lg: "h-12 px-9 text-sm",
  };
  const base = `group inline-flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-black font-medium leading-none transition-colors ${sizeClasses[size]} ${className}`;

  if (Tag === "button") {
    return (
      <button className={base} onClick={onClick}>
        <AnimatedText>{children}</AnimatedText>
      </button>
    );
  }
  return (
    <a href={href ?? "#"} className={base} onClick={onClick}>
      <AnimatedText>{children}</AnimatedText>
    </a>
  );
}

// ─── ChatPanel ────────────────────────────────────────────────────────────────
interface ChatPanelProps {
  initialScroll?: "top" | "bottom";
  animateMessagesIn?: boolean;
}
function ChatPanel({ initialScroll = "bottom", animateMessagesIn = false }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialScroll === "bottom") {
      messagesEndRef.current?.scrollIntoView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messages.length > SEED_MESSAGES.length) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "assistant", text: CANNED_REPLY },
    ]);
    setInputValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  return (
    <div
      className="flex flex-col h-full rounded-2xl border border-white/10 overflow-hidden"
      style={{ background: "rgba(8,8,10,0.6)", backdropFilter: "blur(24px)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/5 flex-shrink-0">
        <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
          <MIcon name="eco" size={14} className="text-green-400" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white leading-tight truncate">
            EcoLens AI Assistant
          </p>
          <p className="text-[11px] text-white/40 leading-tight truncate">
            Analyze your environment with AI
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-5 space-y-4 min-h-0">
        {messages.map((msg, i) => {
          const bubble = (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-white/15 text-white/90"
                    : "bg-white/5 text-white/70 border border-white/5"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );

          if (animateMessagesIn) {
            return (
              <FadeUp key={i} delay={i * 0.12} y={16}>
                <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-white/15 text-white/90"
                        : "bg-white/5 text-white/70 border border-white/5"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </FadeUp>
            );
          }
          return bubble;
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input row */}
      <div className="flex-shrink-0 p-3">
        <div
          className="flex items-end gap-2 rounded-2xl px-3 py-2"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(20px) saturate(140%)",
          }}
        >
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask about the climate audit..."
            rows={1}
            className="flex-1 bg-transparent text-white/80 placeholder-white/30 text-sm resize-none outline-none py-1 scrollbar-hide"
            style={{ maxHeight: 120 }}
          />
          <button
            onClick={sendMessage}
            className="flex-shrink-0 bg-white text-black rounded-xl p-2 hover:bg-white/90 transition-colors"
          >
            <MIcon name="arrow_upward" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── EcoLensPreview ───────────────────────────────────────────────────────────
function EcoLensPreview() {
  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: "hsl(140 60% 8%)" }}
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
        <div className="flex items-center gap-1.5">
          <Leaf size={12} className="text-green-400" />
          <span
            className="text-sm sm:text-base md:text-lg tracking-tight text-white"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            EcoLens<sup className="text-[0.5em]">AI</sup>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          {(["Upload", "Results", "About", "GitHub"] as const).map((link, i) => (
            <span
              key={link}
              className={`text-[9px] lg:text-[10px] cursor-pointer transition-colors ${
                i === 0 ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {link}
            </span>
          ))}
        </div>
        <button
          className="rounded-full px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] text-white"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(20px) saturate(140%)",
          }}
        >
          Start Audit
        </button>
      </div>

      {/* Hero block */}
      <div className="relative z-10 flex flex-col items-center text-center px-3 sm:px-4 pt-3 sm:pt-5 md:pt-7 pb-6">
        <h1
          className="animate-fade-rise font-normal leading-[0.95] tracking-[-0.03em] text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl max-w-[90%]"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where Photos Reveal{" "}
          <em className="not-italic text-white/55">Climate</em>{" "}
          <em className="not-italic text-white/55">Truth.</em>
        </h1>
        <p className="animate-fade-rise-delay text-white/60 text-[9px] sm:text-[11px] md:text-xs leading-relaxed max-w-[80%] sm:max-w-sm md:max-w-md mt-2 sm:mt-3 md:mt-4">
          Upload a photo of any environment and receive an instant AI-powered climate audit —
          mitigation strategies, adaptation plans, and ROI analysis in seconds.
        </p>
        <button
          className="animate-fade-rise-delay-2 rounded-full px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-[9px] sm:text-[10px] text-white mt-3 sm:mt-4 md:mt-5"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(20px) saturate(140%)",
          }}
        >
          Start Audit
        </button>
      </div>
    </div>
  );
}

// ─── CtaDashboardMock ─────────────────────────────────────────────────────────
function CtaDashboardMock() {
  return (
    <div
      className="w-full max-w-[1100px] aspect-[3/4] sm:aspect-[16/10] lg:aspect-[16/9] rounded-2xl mx-auto overflow-hidden p-2 sm:p-3"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(20px) saturate(140%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 30px rgba(0,0,0,0.25)",
      }}
    >
      <div className="grid h-full grid-cols-1 sm:grid-cols-[minmax(220px,320px)_1fr] gap-2 sm:gap-3">
        <div className="min-h-0 hidden sm:block">
          <ChatPanel initialScroll="top" animateMessagesIn />
        </div>
        <div className="min-h-0">
          <EcoLensPreview />
        </div>
      </div>
    </div>
  );
}

// ─── CtaSection ───────────────────────────────────────────────────────────────
function CtaSection({ onStartAudit }: { onStartAudit: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const dashboardY = useTransform(scrollYProgress, [0, 1], ["120px", "-120px"]);
  const grassY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["80px", "-40px"] : ["200px", "-200px"]
  );

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative w-full overflow-hidden"
      style={{ background: "linear-gradient(to bottom, transparent 0%, #14191E 100%)" }}
    >
      <div className="relative mx-auto max-w-[1080px] px-4 sm:px-6 pt-24 sm:pt-32 md:pt-40 pb-[440px] sm:pb-[520px] md:pb-[440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
          {/* Left column — EcoLens copy */}
          <div className="relative z-20 max-w-[400px]">
            <FadeUp delay={0}>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.02em] leading-[1.05] text-white">
                Turn your environment photos into AI-powered climate insights.
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="mt-6 text-white/80 text-base sm:text-lg leading-[1.5] max-w-[380px]">
                Upload any photo — rooftop, street, home, or yard — and receive an instant climate
                audit with mitigation strategies, adaptation plans, and ROI analysis. The same
                insights environmental consultants charge thousands for.
              </p>
            </FadeUp>
            <FadeUp delay={0.2} className="mt-10">
              <PrimaryButton as="button" onClick={onStartAudit}>
                Start Climate Audit
              </PrimaryButton>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* Dashboard mock — parallax up */}
      <motion.div
        style={{ y: dashboardY }}
        className="absolute top-[440px] sm:top-[460px] md:top-[500px] lg:top-20 left-4 right-4 sm:left-auto sm:-right-[8%] md:-right-[10%] lg:-right-[12%] z-10 sm:w-[85%] md:w-[80%] lg:w-[68%]"
      >
        <CtaDashboardMock />
      </motion.div>

      {/* Grass foreground — parallax, in front of dashboard */}
      <motion.img
        src="https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1780586778/cta-bg_mlwy5s.png"
        alt=""
        aria-hidden
        style={{ y: grassY }}
        className="pointer-events-none select-none absolute left-0 right-0 bottom-[-40px] sm:bottom-[-80px] lg:bottom-[-140px] w-full z-30 object-cover"
      />
    </section>
  );
}

// ─── AuditPage ────────────────────────────────────────────────────────────────
export default function AuditPage() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // ── File selection ─────────────────────────────────────────────────────────
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

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    setAppState("loading");
    setResult(null);
    setErrorMessage("");
    try {
      const formData = new FormData();
      formData.append("image", uploadedFile);
      const res = await fetch("/api/audit", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error ?? "Unknown error from server.");
      setResult(json.data as AuditResult);
      setAppState("success");
      setTimeout(() => {
        document.getElementById("results-dashboard")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(msg);
      setAppState("error");
    }
  };

  // ── Reset ──────────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setUploadedFile(null);
    setPreviewUrl(null);
    setAppState("idle");
    setResult(null);
    setErrorMessage("");
    document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
  }, [previewUrl]);

  const scrollToUpload = () => {
    document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const isLoading = appState === "loading";
  const hasFile = !!uploadedFile;

  return (
    <div className="relative min-h-screen" style={{ zIndex: 1 }}>
      {/* ── Full-screen video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
          type="video/mp4"
        />
      </video>

      {/* ── Sticky Navbar ───────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "rgba(16, 185, 129, 0.2)",
              border: "1px solid rgba(52,211,153,0.3)",
            }}
          >
            <Leaf size={16} style={{ color: "#34d399" }} />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            EcoLens <span className="gradient-text">AI</span>
          </span>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
          style={{ color: "var(--green-300)" }}
        >
          <ArrowLeft size={15} />
          Back to Home
        </Link>
      </nav>

      {/* ── Upload Section ───────────────────────────────────────────────────── */}
      <div className="pt-12 pb-24 px-4 relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <section
          id="upload-section"
          className="w-full max-w-3xl px-6 sm:px-12 py-16 flex flex-col items-center gap-8 rounded-3xl"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(24px) saturate(150%)",
            WebkitBackdropFilter: "blur(24px) saturate(150%)",
            boxShadow: "0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1
            className="font-bold text-3xl mb-3 text-white"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Upload Your Photo
          </h1>
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
              <AnalyzeButton onClick={handleAnalyze} disabled={!hasFile} loading={isLoading} />
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
              <ErrorBanner message={errorMessage} onRetry={handleAnalyze} />
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
      </div>

      {/* ── Results ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {appState === "success" && result && previewUrl && (
          <motion.div
            key="results-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-12 pb-24 px-4 relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full"
          >
            <section
              className="w-11/12 max-w-7xl mx-auto px-8 sm:px-16 md:px-24 lg:px-32 py-12 lg:py-20 rounded-[2.5rem]"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(24px) saturate(150%)",
                WebkitBackdropFilter: "blur(24px) saturate(150%)",
                boxShadow: "0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <div className="text-center mb-10">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-bold text-3xl mb-2 text-white"
                style={{ fontFamily: "var(--font-space)" }}
              >
                Your Climate <span className="gradient-text">Audit Report</span>
              </motion.h2>
            </div>
            <ResultsDashboard result={result} imageUrl={previewUrl} onReset={handleReset} />
            </section>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
