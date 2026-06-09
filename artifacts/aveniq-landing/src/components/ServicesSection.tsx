import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Brain, Globe, Smartphone, Settings, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: "SaaS Development", desc: "Scalable, multi-tenant architectures built for rapid growth and enterprise reliability.", icon: Zap, num: "01" },
  { title: "AI Automation", desc: "Intelligent workflows that eliminate manual tasks and unlock operational leverage.", icon: Brain, num: "02" },
  { title: "Web Applications", desc: "Performant, custom web apps built on modern stacks that users love.", icon: Globe, num: "03" },
  { title: "Mobile Apps", desc: "Native-feeling iOS and Android experiences crafted for your users.", icon: Smartphone, num: "04" },
  { title: "Business Systems", desc: "Internal tools, CRMs, and portals tailored to your exact processes.", icon: Settings, num: "05" },
  { title: "UI/UX Design", desc: "World-class interfaces that convert visitors, delight users, and build trust.", icon: Layers, num: "06" },
];

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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              className="group relative rounded-2xl overflow-hidden cursor-default"
              style={{ padding: "1px", background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, rgba(103,80,164,0.12) 100%)" }}
            >
              {/* Inner card */}
              <div
                className="relative h-full rounded-[15px] p-7 flex flex-col transition-all duration-500"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.6) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                {/* Top row: number + icon */}
                <div className="flex items-start justify-between mb-7">
                  <span
                    className="text-[11px] font-semibold tracking-[0.15em]"
                    style={{ color: "rgba(255,255,255,0.18)", fontFamily: "Barlow, sans-serif" }}
                  >
                    {svc.num}
                  </span>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "rgba(103,80,164,0.18)", border: "1px solid rgba(103,80,164,0.3)" }}
                  >
                    <svc.icon
                      className="w-4 h-4"
                      style={{ color: "#9C89D9" }}
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-[1.05rem] font-semibold mb-3 leading-snug tracking-[-0.01em]"
                  style={{ color: "rgba(255,255,255,0.92)" }}
                >
                  {svc.title}
                </h3>

                {/* Desc */}
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "rgba(255,255,255,0.38)", fontFamily: "Barlow, sans-serif", fontWeight: 300 }}
                >
                  {svc.desc}
                </p>

                {/* Bottom arrow — appears on hover */}
                <div className="mt-6 flex items-center gap-1.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span
                    className="text-[11px] font-medium tracking-wide"
                    style={{ color: "#9C89D9" }}
                  >
                    Learn more
                  </span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9C89D9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 rounded-[15px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at top right, rgba(103,80,164,0.08) 0%, transparent 70%)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
