import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import gsap from "gsap";
import type { ServiceConfig } from "@/data/serviceData";

interface ServiceHeroProps {
  service: ServiceConfig;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  const { hero } = service;
  const reduce = useReducedMotion();
  const [, navigate] = useLocation();

  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // GSAP entrance animation
  useEffect(() => {
    if (reduce || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        ".hero-eyebrow",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      tl.fromTo(
        ".hero-headline-line",
        { y: 60, opacity: 0, skewY: 2 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.9, ease: "power4.out", stagger: 0.12 },
        "-=0.3"
      );

      tl.fromTo(
        ".hero-subtext",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );

      tl.fromTo(
        ".hero-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      );

      tl.fromTo(
        ".hero-stat",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.08 },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reduce]);

  // Animated grid background pattern
  const gridLines = Array.from({ length: 8 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-28 pb-20 px-4 sm:px-6 overflow-hidden z-10"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(103,80,164,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Vertical grid lines */}
        <div className="absolute inset-0 flex justify-between px-[8%]">
          {gridLines.map((_, i) => (
            <div
              key={i}
              className="w-px h-full"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.03) 30%, rgba(103,80,164,0.06) 60%, transparent 100%)",
              }}
            />
          ))}
        </div>

        {/* Horizontal scan line */}
        {!reduce && (
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(103,80,164,0.3), transparent)",
            }}
            animate={{ top: ["20%", "80%", "20%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Corner markers */}
        {[
          "top-12 left-12",
          "top-12 right-12",
          "bottom-12 left-12",
          "bottom-12 right-12",
        ].map((pos, i) => (
          <div key={i} className={`absolute ${pos} opacity-20`}>
            <div className="w-4 h-4 border-l border-t border-[#6750A4]" />
          </div>
        ))}
      </div>

      {/* Eyebrow */}
      <div className="hero-eyebrow mb-8">
        <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-[10px] font-semibold tracking-[0.22em] uppercase text-white/50">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#9C89D9]"
            style={{ boxShadow: "0 0 6px #9C89D9" }}
          />
          {hero.eyebrow}
        </span>
      </div>

      {/* Headline */}
      <h1
        ref={headlineRef}
        className="text-center mb-6 max-w-[900px] mx-auto overflow-hidden"
        style={{ fontFamily: "'Instrument Serif', serif", lineHeight: 1.12 }}
      >
        <span
          className="hero-headline-line block"
          style={{
            fontSize: "clamp(2.4rem, 7vw, 6rem)",
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            willChange: "transform",
          }}
        >
          {hero.headline}
        </span>
        <span
          className="hero-headline-line block pb-2"
          style={{
            fontSize: "clamp(2.4rem, 7vw, 6rem)",
            fontStyle: "italic",
            letterSpacing: "-0.03em",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, #C4B5FD 55%, #9C89D9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            willChange: "transform",
          }}
        >
          {hero.headlineItalic}
        </span>
      </h1>

      {/* Glow divider */}
      <div
        ref={glowRef}
        className="relative w-24 md:w-36 h-px mb-8 origin-center"
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent, #9C89D9, transparent)",
          }}
        />
        <div
          className="absolute inset-0 blur-[3px]"
          style={{
            background: "linear-gradient(90deg, transparent, #9C89D9, transparent)",
          }}
        />
      </div>

      {/* Subtext */}
      <p
        className="hero-subtext text-center max-w-xl mx-auto mb-10 leading-[1.75] font-light px-2"
        style={{
          color: "rgba(255,255,255,0.45)",
          fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
          fontFamily: "Barlow, sans-serif",
        }}
      >
        {hero.subtext}
      </p>

      {/* CTAs */}
      <div className="hero-cta flex flex-col sm:flex-row items-center gap-3 mb-20">
        {/* Primary */}
        <button
          onClick={() => navigate("/start-project")}
          className="group relative px-9 py-3.5 rounded-full text-sm font-semibold text-white overflow-hidden active:scale-[0.97] transition-transform duration-200 cursor-pointer"
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: "linear-gradient(135deg, #7C6BC4 0%, #9C89D9 100%)" }}
          />
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(135deg, #8B7DD4 0%, #ADA0E8 100%)" }}
          />
          <span className="relative z-10 flex items-center gap-2.5">
            {hero.primaryCTA}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </span>
        </button>

        {/* Secondary */}
        <Link
          href="/#portfolio"
          className="group px-8 py-3.5 rounded-full text-sm font-medium flex items-center gap-2 active:scale-[0.97] transition-all duration-200 cursor-pointer"
          style={{
            color: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          {hero.secondaryCTA}
        </Link>
      </div>

      {/* Stats strip */}
      <div
        ref={statsRef}
        className="w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px"
        style={{
          background: "rgba(255,255,255,0.04)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        {hero.stats.map((stat, i) => (
          <div
            key={i}
            className="hero-stat flex flex-col items-center justify-center py-7 px-4 text-center"
            style={{
              background: "rgba(0,0,0,0.4)",
              borderRight: i < hero.stats.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}
          >
            <span
              className="text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight"
              style={{ fontFamily: "Barlow, sans-serif" }}
            >
              {stat.value}
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.16em] font-medium"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        animate={reduce ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown
          className="w-4 h-4"
          style={{ color: "rgba(255,255,255,0.18)" }}
        />
      </motion.div>
    </section>
  );
}
