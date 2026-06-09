import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Nexora CRM",
    desc: "AI-powered CRM for modern sales teams.",
    gradient: "from-purple-900/40 to-black",
    borderHover: "hover:border-purple-500/50"
  },
  {
    title: "FlowSync",
    desc: "Workflow automation platform connecting 200+ tools.",
    gradient: "from-blue-900/40 to-black",
    borderHover: "hover:border-blue-500/50"
  },
  {
    title: "Beacon Analytics",
    desc: "Real-time analytics dashboard for SaaS businesses.",
    gradient: "from-emerald-900/40 to-black",
    borderHover: "hover:border-emerald-500/50"
  }
];

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-32 px-6 relative z-10 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Selected Work</h2>
            <p className="text-white/70 text-lg">A glimpse at what we've shipped.</p>
          </div>
          <button className="text-[#9C89D9] font-medium flex items-center gap-2 hover:gap-4 transition-all">
            View All Projects <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className={`group relative h-[400px] rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-b ${proj.gradient} ${proj.borderHover} transition-all duration-500 hover:scale-[1.02] cursor-pointer`}
            >
              {/* Image Placeholder / Abstract shape */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-white/20 blur-[80px]" />
              </div>
              
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-2xl font-semibold mb-2">{proj.title}</h3>
                <p className="text-white/70 mb-6">{proj.desc}</p>
                <div className="flex items-center gap-2 text-sm font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
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
