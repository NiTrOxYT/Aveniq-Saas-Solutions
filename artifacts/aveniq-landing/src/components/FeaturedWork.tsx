import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Nexora CRM",
    desc: "An AI-powered CRM that predicts churn, surfaces opportunities, and automates follow-up for modern sales teams.",
    tag: "SaaS · AI",
    year: "2025",
    style: {
      background: "radial-gradient(ellipse at 30% 40%, rgba(103,80,164,0.55) 0%, rgba(40,20,80,0.8) 50%, #050308 100%)",
      accentBorder: "rgba(103,80,164,0.3)",
    },
  },
  {
    title: "FlowSync",
    desc: "Workflow automation platform connecting 200+ tools with a no-code visual builder.",
    tag: "Automation",
    year: "2025",
    style: {
      background: "radial-gradient(ellipse at 70% 30%, rgba(37,99,235,0.50) 0%, rgba(15,30,80,0.8) 50%, #03060F 100%)",
      accentBorder: "rgba(59,130,246,0.3)",
    },
  },
  {
    title: "Beacon Analytics",
    desc: "Real-time analytics dashboard delivering actionable growth insights for SaaS businesses.",
    tag: "Analytics",
    year: "2024",
    style: {
      background: "radial-gradient(ellipse at 60% 60%, rgba(4,120,87,0.50) 0%, rgba(5,40,30,0.8) 50%, #030F0A 100%)",
      accentBorder: "rgba(16,185,129,0.3)",
    },
  },
];

function ProjectCard({
  project,
  className = "",
  cardRef,
}: {
  project: (typeof projects)[0];
  className?: string;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer opacity-0 ${className}`}
      style={{ border: `1px solid ${project.style.accentBorder}` }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: project.style.background }} />

      {/* Noise grain layer */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-7 md:p-8">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <span
            className="text-[9px] font-medium tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(0,0,0,0.3)",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "Barlow, sans-serif",
              backdropFilter: "blur(8px)",
            }}
          >
            {project.tag}
          </span>
          <span
            className="text-[10px] font-medium tabular-nums"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Barlow, sans-serif" }}
          >
            {project.year}
          </span>
        </div>

        {/* Bottom content */}
        <div>
          <h3
            className="text-2xl md:text-3xl font-medium mb-2 leading-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {project.title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-5 max-w-xs"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Barlow, sans-serif", fontWeight: 300 }}
          >
            {project.desc}
          </p>
          <div
            className="inline-flex items-center gap-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300"
            style={{ color: "#9C89D9", fontFamily: "Barlow, sans-serif" }}
          >
            View Case Study
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 88%" } }
    );
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: i * 0.1, scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    });
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-28 md:py-36 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 gap-4 opacity-0">
          <div>
            <p
              className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-5"
              style={{ color: "#6750A4", fontFamily: "Barlow, sans-serif" }}
            >
              Selected Work
            </p>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl leading-tight"
              style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: "-0.025em" }}
            >
              What we've shipped
            </h2>
          </div>
          <button
            className="flex items-center gap-2 text-sm shrink-0 transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Barlow, sans-serif" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#9C89D9")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
          >
            View All Projects <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Magazine grid: large left + 2 stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5">
          <ProjectCard
            project={projects[0]}
            className="md:col-span-3 h-[460px] md:h-[580px]"
            cardRef={el => { cardsRef.current[0] = el; }}
          />
          <div className="md:col-span-2 flex flex-col gap-4 md:gap-5">
            <ProjectCard
              project={projects[1]}
              className="flex-1 h-[280px] md:h-auto"
              cardRef={el => { cardsRef.current[1] = el; }}
            />
            <ProjectCard
              project={projects[2]}
              className="flex-1 h-[280px] md:h-auto"
              cardRef={el => { cardsRef.current[2] = el; }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
