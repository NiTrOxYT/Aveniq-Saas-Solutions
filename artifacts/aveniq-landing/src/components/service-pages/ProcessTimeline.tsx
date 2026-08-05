import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    phase: "01",
    title: "Discovery",
    description:
      "Deep-dive into your business goals, existing systems, user needs, and technical constraints. We leave no assumption unquestioned.",
    glow: "rgba(59,130,246,0.06)",
  },
  {
    phase: "02",
    title: "Planning",
    description:
      "Feature prioritization, technical specification, scope definition, and project roadmap with milestone-based delivery targets.",
    glow: "rgba(16,185,129,0.06)",
  },
  {
    phase: "03",
    title: "Design",
    description:
      "High-fidelity UI/UX design in Figma. Every screen, state, and edge case designed and reviewed before a line of code is written.",
    glow: "rgba(236,72,153,0.06)",
  },
  {
    phase: "04",
    title: "Architecture",
    description:
      "Database schema, API contracts, infrastructure design, and security model — the load-bearing decisions made deliberately, not under pressure.",
    glow: "rgba(245,158,11,0.05)",
  },
  {
    phase: "05",
    title: "Development",
    description:
      "2-week sprint cycles with working software delivered continuously. Code reviews, documentation, and tests as standard, not optional.",
    glow: "rgba(103,80,164,0.07)",
  },
  {
    phase: "06",
    title: "Testing",
    description:
      "Unit, integration, and end-to-end test suites. Accessibility audits. Performance profiling. Security scanning. User acceptance testing.",
    glow: "rgba(100,116,139,0.06)",
  },
  {
    phase: "07",
    title: "Deployment",
    description:
      "CI/CD pipeline, zero-downtime deployment, environment configuration, monitoring dashboards, and alerts before go-live.",
    glow: "rgba(16,185,129,0.06)",
  },
  {
    phase: "08",
    title: "Support",
    description:
      "30-day post-launch support included. Optional retainer plans for ongoing development, monitoring, and continuous improvement.",
    glow: "rgba(156,137,217,0.09)",
  },
] as const;

export function ProcessTimeline() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (reduce || isMobile || !wrapRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const distance = trackRef.current!.scrollWidth - window.innerWidth + 96;

      gsap.to(trackRef.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [reduce, isMobile]);

  // Reduced motion or mobile/tablet fallback layout: vertical list (prevents mobile Safari/Chrome blank pages)
  if (reduce || isMobile) {
    return (
      <section className="py-28 px-4 sm:px-6 relative z-10 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-medium text-white mb-16 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            How we work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.phase}
                className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-[20px] shadow-[0_30px_80px_rgba(0,0,0,0.35)] relative overflow-hidden"
              >
                {/* Editorial watermarked number */}
                <div className="absolute right-4 bottom-4 text-6xl font-bold font-mono text-white/[0.02] pointer-events-none select-none">
                  {step.phase}
                </div>
                <span className="text-[10px] font-mono text-[#9C89D9] tracking-widest mb-3 block">
                  {step.phase}
                </span>
                <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-white/[0.04] relative z-10">
      {/* Section heading — above the pinned scroll area */}
      <div className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-3xl md:text-5xl font-medium text-white tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Our development process
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="text-white/40 text-base font-light mt-4 max-w-[50ch] leading-relaxed"
        >
          Eight phases, zero surprises. Every project follows the same rigorous delivery model.
        </motion.p>
        <p className="text-white/20 text-xs font-mono mt-4 tracking-wider">
          ← Scroll horizontally through the process
        </p>
      </div>

      {/* Pinned horizontal scroll container */}
      <div ref={wrapRef} className="relative overflow-hidden h-[100dvh]">
        {/* Ambient glow behind track */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(103,80,164,0.04) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="absolute top-0 left-0 flex h-full items-center"
          style={{ paddingLeft: "6vw", paddingRight: "6vw", gap: "24px" }}
        >
          {/* Progress line */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-[2px] pointer-events-none"
            style={{
              left: "6vw",
              width: `calc(100% - 12vw)`,
              background:
                "linear-gradient(90deg, rgba(103,80,164,0.3) 0%, rgba(156,137,217,0.1) 50%, rgba(103,80,164,0.3) 100%)",
            }}
          />

          {PROCESS_STEPS.map((step, i) => (
            <article
              key={step.phase}
              className="relative flex-shrink-0 w-[340px] md:w-[380px] p-8 rounded-2xl border border-white/[0.08] hover:border-white/[0.18] bg-white/[0.03] backdrop-blur-[20px] shadow-[0_30px_80px_rgba(0,0,0,0.35)] hover:-translate-y-1.5 transition-all duration-500 group overflow-hidden"
              style={{ height: "320px" }}
            >
              {/* Radial glow background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 10% 10%, ${step.glow} 0%, transparent 75%)`,
                }}
              />

              {/* Grid Overlay lines in background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-25" />

              {/* Faint watermark number in background */}
              <div className="absolute right-6 bottom-6 text-8xl font-black font-mono text-white/[0.015] group-hover:text-white/[0.03] transition-colors duration-500 pointer-events-none select-none">
                {step.phase}
              </div>

              {/* Phase marker — connects to the progress line visually */}
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold text-[#9C89D9] group-hover:text-white transition-colors duration-500"
                  style={{
                    background: "rgba(103,80,164,0.1)",
                    border: "1px solid rgba(103,80,164,0.2)",
                  }}
                >
                  {i + 1}
                </div>
                <span className="text-[10px] font-mono text-white/20 tracking-[0.2em] uppercase">
                  Phase {step.phase}
                </span>
              </div>

              <h3
                className="text-xl font-semibold text-white mb-4 tracking-tight relative z-10 group-hover:text-white transition-colors duration-300"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {step.title}
              </h3>

              <p className="text-white/40 text-sm leading-relaxed font-light relative z-10 group-hover:text-white/60 transition-colors duration-500">
                {step.description}
              </p>

              {/* Physical border highlight corner strips */}
              <div className="absolute top-0 right-0 w-[40px] h-[1px] bg-gradient-to-l from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 h-[40px] w-[1px] bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
