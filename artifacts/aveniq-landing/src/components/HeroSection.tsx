import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(badgeRef.current,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    tl.fromTo(line1Ref.current,
      { y: 80, opacity: 0, skewY: 3 },
      { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "power4.out" },
      "-=0.2"
    );

    tl.fromTo(line2Ref.current,
      { y: 80, opacity: 0, skewY: 3 },
      { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "power4.out" },
      "-=0.75"
    );

    tl.fromTo(glowRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.9, ease: "power3.inOut" },
      "-=0.5"
    );

    tl.fromTo(descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(statsRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    tl.fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.2"
    );

    gsap.to(scrollRef.current?.querySelector(".scroll-dot") ?? null, {
      y: 9, duration: 1.3, repeat: -1, yoyo: true, ease: "sine.inOut",
    });

    const btn = primaryBtnRef.current;
    if (btn) {
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25, duration: 0.3, ease: "power2.out" });
      };
      const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,0.3)" });
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      return () => { btn.removeEventListener("mousemove", onMove); btn.removeEventListener("mouseleave", onLeave); };
    }
  }, []);

  const handleViewWorkClick = () => {
    // Scroll to the featured work section
    const featuredWorkSection = document.getElementById('portfolio');
    if (featuredWorkSection) {
      window.scrollTo({
        top: featuredWorkSection.offsetTop - 80, // Offset for fixed header
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-[100dvh] max-h-[1100px] flex flex-col items-center pt-20 sm:pt-24 pb-6 px-4 sm:px-6 z-10">

      {/* Badge */}
      <div ref={badgeRef} className="mb-8 md:mb-10">
        <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-[10px] font-semibold tracking-[0.22em] uppercase text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9C89D9]" style={{ boxShadow: "0 0 6px #9C89D9" }} />
          Premium Software Agency
        </span>
      </div>

      {/* Headline */}
      <h1
        className="text-center mb-6 md:mb-8 max-w-[1000px] mx-auto"
        style={{ fontFamily: "'Instrument Serif', serif", lineHeight: 1.15, letterSpacing: "-0.035em" }}
      >
        {/* LINE 1 — upright, crisp white */}
        <span className="block pb-1">
          <span
            ref={line1Ref}
            className="block"
            style={{
              fontSize: "clamp(2.5rem, 10vw, 9.5rem)",
              color: "#FFFFFF",
              willChange: "transform",
              whiteSpace: "nowrap",
            }}
          >
            Your Vision.
          </span>
        </span>

        {/* LINE 2 — italic, gradient white → lavender */}
        <span className="block pb-1">
          <span
            ref={line2Ref}
            className="block"
            style={{
              fontSize: "clamp(2.5rem, 10vw, 9.5rem)",
              fontStyle: "italic",
              background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, #C4B5FD 55%, #9C89D9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              willChange: "transform",
              whiteSpace: "nowrap",
            }}
          >
            Our Digital Reality.
          </span>
        </span>
      </h1>

      {/* Glow line */}
      <div ref={glowRef} className="relative w-32 md:w-48 h-px mb-8 md:mb-10 origin-center">
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent, #9C89D9, transparent)" }} />
        <div className="absolute inset-0 blur-[3px]" style={{ background: "linear-gradient(90deg, transparent, #9C89D9, transparent)" }} />
      </div>

      {/* Description */}
      <p
        ref={descRef}
        className="text-center max-w-lg mx-auto mb-8 md:mb-10 leading-[1.75] font-light px-2"
        style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", fontFamily: "Barlow, sans-serif", letterSpacing: "0.01em" }}
      >
        We transform ideas into scalable software, intelligent automations,
        <br className="hidden md:block" /> and digital products that drive real business growth.
      </p>

      {/* CTAs */}
      <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-3 mb-12 md:mb-16">
        {/* Primary — gradient pill */}
        <button
          ref={primaryBtnRef}
          data-testid="button-book-demo"
          className="group relative px-9 py-3.5 rounded-full text-sm font-semibold text-white overflow-hidden"
          style={{ willChange: "transform" }}
        >
          <div className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #7C6BC4 0%, #9C89D9 100%)" }} />
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: "linear-gradient(135deg, #8B7DD4 0%, #ADA0E8 100%)" }} />
          <span className="relative z-10 flex items-center gap-2.5">
            Book a Demo Now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>

        {/* Secondary */}
        <button
          data-testid="button-view-work"
          onClick={handleViewWorkClick}
          className="group px-8 py-3.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300"
          style={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
        >
          View Our Work
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="flex items-center gap-6 sm:gap-8 md:gap-16">
        {[
          { value: "50+", label: "Products Shipped" },
          { value: "99.9%", label: "Uptime SLA" },
          { value: "3×", label: "Avg. Performance" },
        ].map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span
              className="text-2xl md:text-[2rem] font-bold tabular-nums"
              style={{ fontFamily: "'Instrument Serif', serif", background: "linear-gradient(160deg, #fff 30%, #9C89D9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              {s.value}
            </span>
            <span className="text-[10px] font-medium tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Scroll indicator — pushed to bottom via flex */}
      <div ref={scrollRef} className="mt-auto flex flex-col items-center gap-2.5">
        <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Barlow, sans-serif" }}>Scroll</span>
        <div className="relative w-px h-10" style={{ background: "linear-gradient(to bottom, rgba(156,137,217,0.4), transparent)" }}>
          <div className="scroll-dot absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full" style={{ background: "#9C89D9" }} />
        </div>
      </div>
    </section>
  );
}
