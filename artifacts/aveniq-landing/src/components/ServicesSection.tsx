import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Brain, Globe, Smartphone, Settings, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AI_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_135830_bb6491d1-9b66-4aec-9722-13b4dfe3fb46.mp4";

/* Fluid blob colours per card — 3 blobs each */
const CARD_BLOBS: { a: string; b: string; c: string }[] = [
  { a: "#3B5BDB", b: "#4C6EF5", c: "#7950F2" },   // 01 SaaS — indigo/violet
  { a: "#7C3AED", b: "#A855F7", c: "#C026D3" },   // 02 AI — deep purple/fuchsia (video shows)
  { a: "#0D9488", b: "#06B6D4", c: "#0EA5E9" },   // 03 Web — teal/cyan
  { a: "#EA580C", b: "#F59E0B", c: "#DC2626" },   // 04 Mobile — amber/orange/red
  { a: "#1E40AF", b: "#1D4ED8", c: "#2563EB" },   // 05 Business — deep blue
  { a: "#BE185D", b: "#DB2777", c: "#EC4899" },   // 06 Design — rose/pink
];

const services = [
  { title: "SaaS Development",   desc: "Scalable, multi-tenant architectures built for rapid growth and enterprise reliability.", icon: Zap,        num: "01", useVideo: true  },
  { title: "AI Automation",      desc: "Intelligent workflows that eliminate manual tasks and unlock operational leverage.",        icon: Brain,      num: "02", useVideo: false },
  { title: "Web Applications",   desc: "Performant, custom web apps built on modern stacks that users love.",                     icon: Globe,      num: "03", useVideo: false },
  { title: "Mobile Apps",        desc: "Native-feeling iOS and Android experiences crafted for your users.",                      icon: Smartphone, num: "04", useVideo: false },
  { title: "Business Systems",   desc: "Internal tools, CRMs, and portals tailored to your exact processes.",                     icon: Settings,   num: "05", useVideo: false },
  { title: "UI/UX Design",       desc: "World-class interfaces that convert visitors, delight users, and build trust.",           icon: Layers,     num: "06", useVideo: false },
];

/* ── Single card ──────────────────────────────────────────── */
function ServiceCard({
  svc,
  index,
  cardRef,
}: {
  svc: (typeof services)[0];
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const blobs = CARD_BLOBS[index];

  /* play/pause video on hover */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [hovered]);

  return (
    <div
      ref={cardRef}
      className="liquid-glass rounded-2xl cursor-default select-none"
      style={{ borderRadius: "16px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── animated background layer ── */}
      <div
        className="absolute inset-0 rounded-[16px] overflow-hidden pointer-events-none transition-opacity duration-700"
        style={{ opacity: hovered ? 1 : 0, zIndex: 0 }}
      >
        {svc.useVideo ? (
          /* AI Automation: real video */
          <video
            ref={videoRef}
            src={AI_VIDEO_URL}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            style={{ opacity: 0.55 }}
          />
        ) : (
          /* Other cards: CSS fluid blobs */
          <div className="absolute inset-0 overflow-hidden" style={{ filter: "blur(28px)", transform: "scale(1.2)" }}>
            <div
              style={{
                position: "absolute",
                width: "160%",
                height: "160%",
                top: "-30%",
                left: "-30%",
                background: `radial-gradient(ellipse 55% 55% at 30% 30%, ${blobs.a}99, transparent 70%)`,
                animation: "blob-drift-a 9s ease-in-out infinite",
                opacity: 0.9,
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "140%",
                height: "140%",
                top: "-20%",
                left: "-10%",
                background: `radial-gradient(ellipse 50% 50% at 70% 60%, ${blobs.b}88, transparent 70%)`,
                animation: "blob-drift-b 11s ease-in-out infinite",
                opacity: 0.8,
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "120%",
                height: "120%",
                bottom: "-20%",
                right: "-10%",
                background: `radial-gradient(ellipse 45% 45% at 50% 80%, ${blobs.c}77, transparent 70%)`,
                animation: "blob-drift-c 7s ease-in-out infinite",
                opacity: 0.7,
              }}
            />
          </div>
        )}
        {/* frosted overlay so the background reads through glass */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.42)", backdropFilter: "blur(0px)" }}
        />
      </div>

      {/* ── card content ── */}
      <div className="relative z-10 p-7 flex flex-col h-full" style={{ minHeight: "230px" }}>
        {/* top row */}
        <div className="flex items-start justify-between mb-7">
          <span
            className="text-[10px] font-semibold tracking-[0.18em]"
            style={{ color: "rgba(255,255,255,0.22)", fontFamily: "Barlow, sans-serif" }}
          >
            {svc.num}
          </span>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{
              background: hovered ? "rgba(255,255,255,0.12)" : "rgba(103,80,164,0.18)",
              border: hovered ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(103,80,164,0.32)",
              transition: "background 0.4s, border 0.4s, transform 0.3s",
            }}
          >
            <svc.icon
              className="w-4 h-4"
              style={{ color: hovered ? "#ffffff" : "#9C89D9", transition: "color 0.4s" }}
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* title */}
        <h3
          className="text-[1.05rem] font-semibold mb-3 leading-snug"
          style={{ color: "rgba(255,255,255,0.92)", letterSpacing: "-0.01em" }}
        >
          {svc.title}
        </h3>

        {/* description */}
        <p
          className="text-[0.8125rem] leading-relaxed flex-1"
          style={{
            color: hovered ? "rgba(255,255,255,0.62)" : "rgba(255,255,255,0.36)",
            fontFamily: "Barlow, sans-serif",
            fontWeight: 300,
            transition: "color 0.4s",
          }}
        >
          {svc.desc}
        </p>

        {/* learn more — slides up on hover */}
        <div
          className="mt-5 flex items-center gap-1.5"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.35s, transform 0.35s",
          }}
        >
          <span className="text-[11px] font-medium tracking-wide" style={{ color: "#9C89D9" }}>
            Learn more
          </span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9C89D9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────── */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", immediateRender: false, scrollTrigger: { trigger: headingRef.current, start: "top 85%" } }
    );
    gsap.fromTo(cardsRef.current.filter(Boolean),
      { y: 44, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", immediateRender: false, scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
    );
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-20">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#9C89D9", fontFamily: "Barlow, sans-serif" }}>
            What We Build
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-white" style={{ letterSpacing: "-0.025em" }}>
            End-to-end digital solutions
          </h2>
          <p className="text-base font-light" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Barlow, sans-serif" }}>
            Engineered for scale. Designed for humans.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc, i) => (
            <ServiceCard
              key={i}
              svc={svc}
              index={i}
              cardRef={el => { cardsRef.current[i] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
