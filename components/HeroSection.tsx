"use client";

import { useState, useEffect } from "react";
import { Leaf } from "lucide-react";
import Link from "next/link";

// ─── FadeIn ──────────────────────────────────────────────────────────────────
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

function FadeIn({ children, delay = 0, duration = 1000, className = "" }: FadeInProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`transition-opacity ${className}`}
      style={{ opacity: visible ? 1 : 0, transitionDuration: `${duration}ms` }}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}

// ─── AnimatedHeading ─────────────────────────────────────────────────────────
interface AnimatedHeadingProps {
  text: string;          // Use \n for line breaks
  className?: string;
  style?: React.CSSProperties;
  initialDelay?: number;
}

function AnimatedHeading({
  text,
  className = "",
  style,
  initialDelay = 200,
}: AnimatedHeadingProps) {
  const charDelay = 30;
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), initialDelay);
    return () => clearTimeout(t);
  }, [initialDelay]);

  const lines = text.split("\n");
  let globalCharIndex = 0;

  return (
    <h1 className={className} style={style}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} style={{ display: "block" }}>
          {line.split("").map((char) => {
            const delay = globalCharIndex++ * charDelay;
            return (
              <span
                key={`${lineIndex}-${globalCharIndex}`}
                style={{
                  display: "inline-block",
                  opacity: animated ? 1 : 0,
                  transform: animated ? "translateX(0)" : "translateX(-18px)",
                  transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

// ─── HeroSection ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const scrollToUpload = () => {
    document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* ── Full-screen video — no overlay, raw video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
          type="video/mp4"
        />
      </video>

      {/* ── Content layer ── */}
      <div className="relative flex flex-col flex-1" style={{ zIndex: 1 }}>

        {/* ── Navbar ── */}
        <div className="px-6 md:px-12 lg:px-16 pt-6">
          <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(52, 211, 153, 0.25)" }}
              >
                <Leaf size={14} style={{ color: "#34d399" }} />
              </div>
              <span className="text-2xl font-semibold tracking-tight text-white">
                EcoLens{" "}
                <span className="gradient-text">AI</span>
              </span>
            </div>

            {/* Center links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm text-white/80 hover:text-gray-300 transition-colors duration-200">
                Features
              </a>
              <Link
                href="/audit"
                className="text-sm text-white/80 hover:text-gray-300 transition-colors duration-200"
              >
                How It Works
              </Link>
              <a href="#" className="text-sm text-white/80 hover:text-gray-300 transition-colors duration-200">
                About
              </a>
              <a href="#" className="text-sm text-white/80 hover:text-gray-300 transition-colors duration-200">
                GitHub
              </a>
            </div>
          </nav>
        </div>

        {/* ── Hero content — centered ── */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-16 pb-12 lg:pb-16">
          <div className="max-w-3xl flex flex-col items-center">
            <AnimatedHeading
              text={"Turning Photos into\nClimate Action."}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-4"
              style={{ letterSpacing: "-0.04em" }}
            />

            <FadeIn delay={800} duration={1000} className="w-full">
              <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl mx-auto">
                Upload a photo of your environment — rooftop, street, home, or
                yard — and receive an instant AI-powered climate audit with
                practical, personalized action steps.
              </p>
            </FadeIn>

            {/* (Buttons removed) */}
          </div>
        </div>
      </div>
    </section>
  );
}
