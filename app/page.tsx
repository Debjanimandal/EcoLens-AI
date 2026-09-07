import HeroSection from "@/components/HeroSection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen" style={{ zIndex: 1 }}>
      {/* ── Hero (includes navbar + video bg) ─────────────────────────── */}
      <HeroSection />
    </div>
  );
}
