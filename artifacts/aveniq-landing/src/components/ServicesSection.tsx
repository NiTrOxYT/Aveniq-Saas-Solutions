import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "SaaS Development",
    desc: "Scalable, multi-tenant architectures built for rapid growth and enterprise reliability.",
    tags: ["Architecture", "Scale"],
  },
  {
    num: "02",
    title: "AI Automation",
    desc: "Intelligent workflows that eliminate manual tasks and unlock real operational leverage.",
    tags: ["ML", "Workflow"],
  },
  {
    num: "03",
    title: "Web Applications",
    desc: "Performant, custom web apps built on modern stacks that users genuinely love.",
    tags: ["React", "Performance"],
  },
  {
    num: "04",
    title: "Mobile Apps",
    desc: "Native-feeling iOS and Android experiences, crafted for your users' real habits.",
    tags: ["iOS", "Android"],
  },
  {
    num: "05",
    title: "Business Systems",
    desc: "Internal tools, CRMs, and portals tailored to your exact operational processes.",
    tags: ["CRM", "Integration"],
  },
  {
    num: "06",
    title: "UI/UX Design",
    desc: "World-class interfaces that convert visitors, delight users, and build lasting trust.",
    tags: ["Research", "Craft"],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const rowsRef    = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 88%" } }
    );

    rowsRef.current.forEach((row, i) => {
      gsap.fromTo(
        row,
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 90%" },
          delay: i * 0.05,
        }
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

        {/* Service rows */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {services.map((svc, i) => (
            <div
              key={i}
              ref={el => { rowsRef.current[i] = el; }}
              className="service-row group opacity-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-5 md:gap-8 py-6 md:py-7 px-1 cursor-default hover:bg-white/[0.018] transition-colors duration-300 rounded-sm -mx-1 px-1">
                {/* Number */}
                <span
                  className="text-xs font-mono shrink-0 w-6 text-right"
                  style={{ color: "rgba(255,255,255,0.18)", fontFamily: "Barlow, sans-serif" }}
                >
                  {svc.num}
                </span>

                {/* Title + desc */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-lg sm:text-xl md:text-2xl leading-snug transition-colors duration-300"
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className="text-sm mt-0 max-h-0 overflow-hidden group-hover:max-h-10 group-hover:mt-1.5 transition-all duration-500 leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.32)", fontFamily: "Barlow, sans-serif", fontWeight: 300 }}
                  >
                    {svc.desc}
                  </p>
                </div>

                {/* Tags */}
                <div className="hidden sm:flex items-center gap-2 shrink-0">
                  {svc.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[9px] font-medium tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
                      style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.22)",
                        fontFamily: "Barlow, sans-serif",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <ArrowUpRight
                  className="w-4 h-4 shrink-0 transition-all duration-300 group-hover:rotate-0 -rotate-45"
                  style={{ color: "rgba(255,255,255,0.14)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
