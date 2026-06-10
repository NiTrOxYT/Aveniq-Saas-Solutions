import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 md:py-44 px-6 overflow-hidden z-10">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(103,80,164,0.18) 0%, rgba(50,30,100,0.06) 45%, transparent 70%)" }} />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(103,80,164,0.04) 50%, transparent 100%)" }}
      />

      {/* Thin accent lines */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(103,80,164,0.3), transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(103,80,164,0.2), transparent)" }} />

      <div ref={contentRef} className="relative max-w-4xl mx-auto text-center opacity-0">
        <p
          className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-8"
          style={{ color: "#6750A4", fontFamily: "Barlow, sans-serif" }}
        >
          Start a project
        </p>

        <h2
          className="leading-[1.04] mb-8"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(2.6rem, 7vw, 7rem)",
            letterSpacing: "-0.03em",
          }}
        >
          Ready to build<br />
          <em
            style={{
              fontStyle: "italic",
              background: "linear-gradient(155deg, rgba(255,255,255,0.88) 0%, #C4B5FD 40%, #9C89D9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            something great?
          </em>
        </h2>

        <p
          className="mb-12 mx-auto max-w-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.36)", fontSize: "1.0625rem", fontFamily: "Barlow, sans-serif", fontWeight: 300 }}
        >
          We work with ambitious founders and teams to create software their users love.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            className="group flex items-center gap-3 px-9 py-4 rounded-full text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85"
            style={{ background: "linear-gradient(135deg, #6750A4 0%, #9C89D9 100%)" }}
          >
            Book a Demo
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <a
            href="mailto:hello@aveniq.com"
            className="text-sm transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.32)", fontFamily: "Barlow, sans-serif" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.32)")}
          >
            or email hello@aveniq.com
          </a>
        </div>
      </div>
    </section>
  );
}
