import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Brain, Globe, Smartphone, Settings, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: "SaaS Development", desc: "Scalable, multi-tenant architectures built for rapid growth.", icon: Zap },
  { title: "AI Automation", desc: "Intelligent workflows that eliminate manual operational tasks.", icon: Brain },
  { title: "Web Applications", desc: "Performant, custom web apps built on modern tech stacks.", icon: Globe },
  { title: "Mobile Apps", desc: "Native-feeling iOS and Android experiences for your users.", icon: Smartphone },
  { title: "Business Systems", desc: "Internal tools and CRMs tailored to your exact processes.", icon: Settings },
  { title: "UI/UX Design", desc: "World-class interfaces that prioritize user retention.", icon: Layers },
];

export default function ServicesSection() {
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
        immediateRender: false,
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      }
    );

    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    );
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl mb-4">What We Build</h2>
          <p className="text-white/60 text-lg">End-to-end digital solutions engineered for scale.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              className="group relative p-8 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-[#6750A4]/50 hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(103,80,164,0.15)]"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6750A4] to-[#9C89D9] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svc.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{svc.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
