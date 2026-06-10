import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const descRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    tl.fromTo(badgeRef.current,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
    )
    .fromTo(line1Ref.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: "power4.out" },
      "-=0.3"
    )
    .fromTo(line2Ref.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: "power4.out" },
      "-=0.85"
    )
    .fromTo(descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(statsRef.current,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.2"
    );

    gsap.to(scrollRef.current?.querySelector(".scroll-dot") ?? null, {
      y: 10, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut",
    });

    // Magnetic CTA button
    const btn = primaryRef.current;
    if (btn) {
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - r.left - r.width / 2) * 0.2,
          y: (e.clientY - r.top - r.height / 2) * 0.2,
          duration: 0.4, ease: "power2.out",
        });
      };
      const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1,0.3)" });
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      return () => { btn.removeEventListener("mousemove", onMove); btn.removeEventListener("mouseleave", onLeave); };
    }
  }, []);

  return (
    <section
      id="hero-anchor"
      ref={wrapRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-28 pb-8 px-5 sm:px-8 z-10 overflow-hidden"
    >
      {/* Subtle radial glow centered behind text */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "500px",
          background: "radial-gradient(ellipse at 50% 50%, rgba(103,80,164,0.14) 0%, transparent 65%)",
          filter: "blur(30px)",
        }}
      />

      {/* Badge */}
      <div ref={badgeRef} className="mb-9 md:mb-12">
        <span
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.22em] uppercase"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            color: "rgba(255,255,255,0.45)",
            fontFamily: "Barlow, sans-serif",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#9C89D9", boxShadow: "0 0 6px #9C89D9" }} />
          Premium Software Agency
        </span>
      </div>

      {/* Headline */}
      <h1
        className="text-center max-w-[1100px] mx-auto mb-8 md:mb-10"
        style={{ fontFamily: "'Instrument Serif', serif", lineHeight: 1.08, letterSpacing: "-0.03em" }}
      >
        <span className="block overflow-hidden py-1">
          <span
            ref={line1Ref}
            className="block"
            style={{ fontSize: "clamp(3rem, 10vw, 9.8rem)", color: "#FFFFFF", whiteSpace: "nowrap" }}
          >
            Your Vision.
          </span>
        </span>
        <span className="block overflow-hidden py-1">
          <span
            ref={line2Ref}
            className="block"
            style={{
              fontSize: "clamp(3rem, 10vw, 9.8rem)",
              fontStyle: "italic",
              whiteSpace: "nowrap",
              background: "linear-gradient(155deg, rgba(255,255,255,0.92) 0%, #C4B5FD 45%, #9C89D9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Digital Reality.
          </span>
        </span>
      </h1>

      {/* Description */}
      <p
        ref={descRef}
        className="text-center max-w-md mx-auto mb-10 md:mb-12 leading-relaxed font-light"
        style={{ color: "rgba(255,255,255,0.38)", fontSize: "1.0625rem", fontFamily: "Barlow, sans-serif" }}
      >
        We transform ideas into scalable software, intelligent automations,
        and digital products that drive real business growth.
      </p>

      {/* CTAs */}
      <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-3 mb-16 md:mb-20">
        <button
          ref={primaryRef}
          className="group relative flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-white overflow-hidden"
          style={{ background: "linear-gradient(135deg, #6750A4 0%, #9C89D9 100%)", willChange: "transform" }}
        >
          <span>Book a Demo</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <button
          className="group flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300"
          style={{ color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.08)" }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(255,255,255,0.85)"; el.style.borderColor = "rgba(255,255,255,0.16)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(255,255,255,0.45)"; el.style.borderColor = "rgba(255,255,255,0.08)"; }}
        >
          View Our Work
        </button>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="flex items-stretch gap-0">
        {[
          { value: "50+",   label: "Products Shipped" },
          { value: "99.9%", label: "Uptime SLA" },
          { value: "3×",    label: "Avg. Performance" },
        ].map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center px-8 md:px-12 py-2"
            style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none" }}
          >
            <span
              className="text-2xl md:text-[2.1rem] font-semibold tabular-nums mb-0.5"
              style={{
                fontFamily: "'Instrument Serif', serif",
                background: "linear-gradient(160deg, #fff 25%, #9C89D9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {s.value}
            </span>
            <span
              className="text-[9px] font-medium tracking-[0.16em] uppercase"
              style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Barlow, sans-serif" }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="mt-auto flex flex-col items-center gap-2 pt-8">
        <span
          className="text-[9px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(255,255,255,0.18)", fontFamily: "Barlow, sans-serif" }}
        >
          Scroll
        </span>
        <div
          className="relative w-px h-9"
          style={{ background: "linear-gradient(to bottom, rgba(156,137,217,0.35), transparent)" }}
        >
          <div
            className="scroll-dot absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full"
            style={{ background: "#9C89D9" }}
          />
        </div>
      </div>
    </section>
  );
}
