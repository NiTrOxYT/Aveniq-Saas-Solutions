import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "SaaS Development",
    desc: "Scalable, multi-tenant architectures built for rapid growth and enterprise reliability. We own the full stack — from database design to deployment pipelines.",
    tags: ["Architecture", "Scale", "Multi-tenant"],
    icon: "◈",
  },
  {
    num: "02",
    title: "AI Automation",
    desc: "Intelligent workflows that eliminate manual tasks and unlock real operational leverage. LLM integrations, custom models, and production-grade pipelines.",
    tags: ["LLM", "Workflow", "Data"],
    icon: "⬡",
  },
  {
    num: "03",
    title: "Web Applications",
    desc: "Performant, custom web apps built on modern stacks that users genuinely love. Pixel-perfect UI, blazing-fast load times, and bulletproof reliability.",
    tags: ["React", "TypeScript", "Performance"],
    icon: "◻",
  },
  {
    num: "04",
    title: "Mobile Apps",
    desc: "Native-feeling iOS and Android experiences, crafted for your users' real habits. Smooth animations, offline-first architecture, push notifications.",
    tags: ["iOS", "Android", "React Native"],
    icon: "◯",
  },
  {
    num: "05",
    title: "Business Systems",
    desc: "Internal tools, CRMs, and portals tailored to your exact operational processes. Custom dashboards, approval flows, and deep third-party integrations.",
    tags: ["CRM", "ERP", "Integration"],
    icon: "◧",
  },
  {
    num: "06",
    title: "UI/UX Design",
    desc: "World-class interfaces that convert visitors, delight users, and build lasting brand trust. User research, prototyping, design systems, and motion craft.",
    tags: ["Research", "Systems", "Motion"],
    icon: "◉",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const rowsRef    = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 88%" } }
    );
    rowsRef.current.forEach((row, i) => {
      gsap.fromTo(
        row,
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: row, start: "top 92%" }, delay: i * 0.05 }
      );
    });
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-28 md:py-36 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="mb-16 md:mb-20 opacity-0">
          <p
            className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-5"
            style={{ color: "#6750A4", fontFamily: "Barlow, sans-serif" }}
          >
            Services
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl leading-tight"
            style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: "-0.025em" }}
          >
            What we build
          </h2>
        </div>

        {/* Service cards */}
        <div>
          {services.map((svc, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                ref={el => { rowsRef.current[i] = el; }}
                className="opacity-0"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="relative cursor-pointer select-none"
                  onMouseEnter={() => setOpenIndex(i)}
                  onMouseLeave={() => setOpenIndex(null)}
                  style={{
                    paddingLeft: "20px",
                    marginLeft: "-20px",
                    transition: "background 0.35s ease",
                    background: isOpen
                      ? "linear-gradient(90deg, rgba(103,80,164,0.07) 0%, transparent 60%)"
                      : "transparent",
                  }}
                >
                  {/* Animated left accent bar */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "2px",
                      borderRadius: "2px",
                      background: "linear-gradient(180deg, #6750A4, #9C89D9)",
                      transition: "height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease",
                      height: isOpen ? "70%" : "0%",
                      opacity: isOpen ? 1 : 0,
                    }}
                  />

                  {/* Top row — always visible */}
                  <div
                    className="flex items-center gap-5 md:gap-8"
                    style={{
                      padding: isOpen ? "28px 8px 16px" : "22px 8px",
                      transition: "padding 0.35s ease",
                    }}
                  >
                    {/* Icon / Number */}
                    <div className="flex flex-col items-center shrink-0 w-8 gap-1">
                      <span
                        className="text-base leading-none"
                        style={{
                          color: isOpen ? "#9C89D9" : "rgba(255,255,255,0.18)",
                          transition: "color 0.3s ease",
                          fontFamily: "monospace",
                        }}
                      >
                        {isOpen ? svc.icon : svc.num}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="leading-snug"
                        style={{
                          fontFamily: "'Instrument Serif', serif",
                          fontSize: isOpen ? "clamp(1.25rem, 2.5vw, 1.65rem)" : "clamp(1.1rem, 2.2vw, 1.5rem)",
                          color: isOpen ? "#FFFFFF" : "rgba(255,255,255,0.78)",
                          transition: "color 0.3s ease, font-size 0.35s ease",
                        }}
                      >
                        {svc.title}
                      </h3>
                    </div>

                    {/* Tags — desktop only, visible on open */}
                    <div
                      className="hidden md:flex items-center gap-2 shrink-0 transition-opacity duration-300"
                      style={{ opacity: isOpen ? 1 : 0.0 }}
                    >
                      {svc.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[9px] font-medium tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
                          style={{
                            border: "1px solid rgba(156,137,217,0.25)",
                            color: "rgba(156,137,217,0.7)",
                            fontFamily: "Barlow, sans-serif",
                            background: "rgba(103,80,164,0.08)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <ArrowUpRight
                      className="w-4 h-4 shrink-0 transition-all duration-300"
                      style={{
                        color: isOpen ? "#9C89D9" : "rgba(255,255,255,0.14)",
                        transform: isOpen ? "rotate(0deg)" : "rotate(-45deg)",
                      }}
                    />
                  </div>

                  {/* Expandable description — CSS grid trick for smooth height */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.42s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <div
                        className="pb-6 pl-[52px] md:pl-[60px] pr-4"
                        style={{
                          opacity: isOpen ? 1 : 0,
                          transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                          transition: "opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s",
                        }}
                      >
                        <p
                          className="text-sm leading-relaxed mb-4 max-w-xl"
                          style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Barlow, sans-serif", fontWeight: 300 }}
                        >
                          {svc.desc}
                        </p>
                        {/* Mobile tags */}
                        <div className="flex md:hidden flex-wrap gap-2 mb-4">
                          {svc.tags.map(tag => (
                            <span
                              key={tag}
                              className="text-[9px] font-medium tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
                              style={{
                                border: "1px solid rgba(156,137,217,0.25)",
                                color: "rgba(156,137,217,0.7)",
                                fontFamily: "Barlow, sans-serif",
                                background: "rgba(103,80,164,0.08)",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
                          style={{ color: "#9C89D9", fontFamily: "Barlow, sans-serif" }}
                        >
                          Learn more <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
