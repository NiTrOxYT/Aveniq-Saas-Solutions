import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 });

    tl.fromTo(
      badgeRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
    );

    const words = titleRef.current?.querySelectorAll(".word");
    if (words) {
      tl.fromTo(
        words,
        { y: 60, opacity: 0, rotateX: 20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.07, ease: "power4.out" },
        "-=0.3"
      );
    }

    tl.fromTo(
      glowRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: "power3.inOut" },
      "-=0.3"
    );

    tl.fromTo(
      descRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.5"
    );

    tl.fromTo(
      ctaRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(
      statsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.2"
    );

    // Scroll indicator bounce
    gsap.to(scrollRef.current?.querySelector(".scroll-dot") ?? null, {
      y: 8,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Magnetic Button
    const btn = primaryBtnRef.current;
    if (btn) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: "power2.out" });
      };
      const handleMouseLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
      };
      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        btn.removeEventListener("mousemove", handleMouseMove);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 z-10 overflow-hidden">

      {/* Top badge */}
      <div ref={badgeRef} className="mb-8">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6750A4]/40 bg-[#6750A4]/10 backdrop-blur-sm text-[11px] font-medium tracking-widest uppercase text-[#9C89D9]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9C89D9] animate-pulse" />
          Premium Software Agency
        </span>
      </div>

      {/* Headline */}
      <h1
        ref={titleRef}
        className="text-center font-serif leading-[1.05] tracking-[-0.02em] mb-6 max-w-5xl mx-auto"
        style={{ perspective: "1000px" }}
      >
        {/* Line 1 */}
        <span className="block text-[clamp(3.5rem,9vw,8rem)]">
          <span className="inline-block overflow-hidden align-bottom mr-[0.2em]">
            <span className="word inline-block text-white">Your</span>
          </span>
          <span className="inline-block overflow-hidden align-bottom">
            <span className="word inline-block text-white">Vision.</span>
          </span>
        </span>
        {/* Line 2 — gradient */}
        <span className="block text-[clamp(3.5rem,9vw,8rem)]">
          <span className="inline-block overflow-hidden align-bottom mr-[0.2em]">
            <span
              className="word inline-block"
              style={{ background: "linear-gradient(135deg, #fff 0%, #9C89D9 50%, #6750A4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Our
            </span>
          </span>
          <span className="inline-block overflow-hidden align-bottom mr-[0.2em]">
            <span
              className="word inline-block"
              style={{ background: "linear-gradient(135deg, #fff 0%, #9C89D9 50%, #6750A4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Digital
            </span>
          </span>
          <span className="inline-block overflow-hidden align-bottom">
            <span
              className="word inline-block"
              style={{ background: "linear-gradient(135deg, #fff 0%, #9C89D9 50%, #6750A4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Reality.
            </span>
          </span>
        </span>
      </h1>

      {/* Animated glow line */}
      <div ref={glowRef} className="relative w-64 h-px mb-10 origin-center">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9C89D9] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9C89D9] to-transparent blur-sm opacity-70" />
      </div>

      {/* Description */}
      <p
        ref={descRef}
        className="text-base md:text-lg text-white/55 max-w-xl mx-auto mb-10 leading-relaxed text-center font-light"
      >
        We transform ideas into scalable software, intelligent automations,<br className="hidden md:block" /> and digital products that drive real business growth.
      </p>

      {/* CTAs */}
      <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        {/* Primary */}
        <button
          ref={primaryBtnRef}
          data-testid="button-book-demo"
          className="group relative px-8 py-3.5 rounded-full font-semibold text-white text-sm overflow-hidden"
          style={{ willChange: "transform" }}
        >
          {/* gradient bg */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6750A4] to-[#9C89D9]" />
          {/* shine sweep */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)", backgroundSize: "200% 100%", animation: "none" }} />
          {/* outer glow */}
          <div className="absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-gradient-to-r from-[#6750A4] to-[#9C89D9]" style={{ zIndex: -1 }} />
          <span className="relative z-10 flex items-center gap-2">
            Book a Demo Now
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>

        {/* Secondary */}
        <button
          data-testid="button-view-work"
          className="group px-8 py-3.5 rounded-full font-medium text-sm text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2 border border-white/10 hover:border-white/25 backdrop-blur-sm"
        >
          View Our Work
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Stats strip */}
      <div ref={statsRef} className="flex items-center gap-8 md:gap-14">
        {[
          { value: "50+", label: "Products Shipped" },
          { value: "99.9%", label: "Uptime SLA" },
          { value: "3×", label: "Avg. Performance" },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <span
              className="text-2xl md:text-3xl font-bold tracking-tight"
              style={{ background: "linear-gradient(135deg, #fff 30%, #9C89D9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              {stat.value}
            </span>
            <span className="text-[11px] text-white/40 font-medium tracking-wide uppercase">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent relative">
          <div className="scroll-dot absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#9C89D9]" />
        </div>
      </div>
    </section>
  );
}
