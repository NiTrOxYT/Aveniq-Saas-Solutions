import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Brain, Globe, Smartphone, Settings, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_VIDEOS = {
  "SaaS Development": "/videos/saas.mp4",
  "AI Automation": "/videos/ai.mp4",
  "Web Applications": "/videos/web.mp4",
  "Mobile Apps": "/videos/mobile.mp4",
  "Business Systems": "/videos/business.mp4",
  "UI/UX Design": "/videos/design.mp4",
};

const services = [
  { title: "SaaS Development",   desc: "Scalable, multi-tenant architectures built for rapid growth and enterprise reliability.", icon: Zap,        num: "01" },
  { title: "AI Automation",      desc: "Intelligent workflows that eliminate manual tasks and unlock operational leverage.",        icon: Brain,      num: "02" },
  { title: "Web Applications",   desc: "Performant, custom web apps built on modern stacks that users love.",                     icon: Globe,      num: "03" },
  { title: "Mobile Apps",        desc: "Native-feeling iOS and Android experiences crafted for your users.",                      icon: Smartphone, num: "04" },
  { title: "Business Systems",   desc: "Internal tools, CRMs, and portals tailored to your exact processes.",                     icon: Settings,   num: "05" },
  { title: "UI/UX Design",       desc: "World-class interfaces that convert visitors, delight users, and build trust.",           icon: Layers,     num: "06" },
];

/* ── Single card ──────────────────────────────────────────── */
function ServiceCard({
  svc,
  cardRef,
}: {
  svc: (typeof services)[0];
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* play/pause video on hover */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [hovered]);

  return (
    <div
      ref={cardRef}
      className="relative liquid-glass rounded-2xl cursor-default select-none opacity-0 overflow-hidden"
      style={{ borderRadius: "16px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── animated background layer ── */}
      <div
        className="absolute inset-0 rounded-[16px] overflow-hidden pointer-events-none transition-opacity duration-700"
        style={{ opacity: hovered ? 1 : 0, zIndex: 0 }}
      >
        <video
  ref={videoRef}
  src={SERVICE_VIDEOS[svc.title as keyof typeof SERVICE_VIDEOS]}
  muted
  loop
  playsInline
  preload="none"
  className="w-full h-full object-cover"
/>
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
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 85%" } }
    );
    gsap.fromTo(cardsRef.current.filter(Boolean),
      { y: 44, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
    );
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 md:mb-20 opacity-0">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#9C89D9", fontFamily: "Barlow, sans-serif" }}>
            What We Build
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4 text-white px-2" style={{ letterSpacing: "-0.025em" }}>
            End-to-end digital solutions
          </h2>
          <p className="text-sm md:text-base font-light px-4" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Barlow, sans-serif" }}>
            Engineered for scale. Designed for humans.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc, i) => (
            <ServiceCard
              key={i}
              svc={svc}
              cardRef={el => { cardsRef.current[i] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
