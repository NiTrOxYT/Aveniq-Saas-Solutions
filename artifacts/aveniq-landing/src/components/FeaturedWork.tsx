import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Nexora CRM",
    desc: "AI-powered CRM for modern sales teams.",
    gradient: "from-[#6750A4]/30 via-black/60 to-black",
    accentColor: "rgba(103,80,164,0.6)",
    tag: "SaaS · AI",
  },
  {
    title: "FlowSync",
    desc: "Workflow automation platform connecting 200+ tools.",
    gradient: "from-blue-900/30 via-black/60 to-black",
    accentColor: "rgba(59,130,246,0.5)",
    tag: "Automation",
  },
  {
    title: "Beacon Analytics",
    desc: "Real-time analytics dashboard for SaaS businesses.",
    gradient: "from-emerald-900/30 via-black/60 to-black",
    accentColor: "rgba(16,185,129,0.5)",
    tag: "Analytics",
  },
];

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    gsap.fromTo(
      headingRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      }
    );

    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    );
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-4 md:gap-6">
          <div>
            <p className="text-[11px] text-[#9C89D9] font-medium tracking-widest uppercase mb-3">Selected Work</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-3">What We've Shipped</h2>
            <p className="text-white/50 text-sm md:text-base">A glimpse at what we've built for clients.</p>
          </div>
          <button className="text-[#9C89D9] text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all duration-200 shrink-0">
            View All Projects <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((proj, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              className={`group relative h-[340px] sm:h-[400px] lg:h-[420px] rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-b ${proj.gradient} transition-all duration-500 hover:border-white/20 hover:scale-[1.02] cursor-pointer`}
            >
              {/* Glow orb */}
              <div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[60px] opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                style={{ background: proj.accentColor }}
              />

              {/* Tag */}
              <div className="absolute top-6 left-6">
                <span className="text-[10px] font-medium tracking-widest uppercase text-white/40 border border-white/10 px-3 py-1 rounded-full">
                  {proj.tag}
                </span>
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="text-2xl font-semibold mb-2">{proj.title}</h3>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">{proj.desc}</p>
                <div className="flex items-center gap-2 text-sm font-medium text-[#9C89D9] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  View Case Study <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
