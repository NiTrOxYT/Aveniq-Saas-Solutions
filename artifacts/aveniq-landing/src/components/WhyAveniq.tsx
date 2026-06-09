import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Lightbulb, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { icon: Zap, title: "Speed", desc: "We move fast without breaking things. Rapid iteration combined with bulletproof testing." },
  { icon: Lightbulb, title: "Innovation", desc: "Cutting-edge tech, proven methodologies. We use what works best, not just what's trendy." },
  { icon: Shield, title: "Reliability", desc: "Systems that run 24/7 without babysitting. Built to scale infinitely from day one." },
];

export default function WhyAveniq() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [uptime, setUptime] = useState(0);
  const [products, setProducts] = useState(0);
  const [perf, setPerf] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      }
    );

    gsap.fromTo(
      statsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          onEnter: () => {
            if (animated.current) return;
            animated.current = true;
            gsap.to({ val: 0 }, {
              val: 99.9, duration: 2, ease: "power2.out",
              onUpdate: function () { setUptime(Number(this.targets()[0].val.toFixed(1))); },
            });
            gsap.to({ val: 0 }, {
              val: 50, duration: 2, ease: "power2.out",
              onUpdate: function () { setProducts(Math.floor(this.targets()[0].val)); },
            });
            gsap.to({ val: 0 }, {
              val: 3, duration: 2, ease: "power2.out",
              onUpdate: function () { setPerf(Math.floor(this.targets()[0].val)); },
            });
          },
        },
      }
    );

    gsap.fromTo(
      pillarsRef.current?.querySelectorAll(".pillar-card") ?? [],
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: pillarsRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 ref={headingRef} className="font-serif text-4xl md:text-5xl text-center mb-24">
          Why Businesses Choose Us
        </h2>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden mb-24">
          {[
            { value: `${uptime}%`, label: "Uptime SLA across all deployed systems" },
            { value: `${products}+`, label: "Products shipped for clients worldwide" },
            { value: `${perf}×`, label: "Average performance vs. prior solutions" },
          ].map((stat, i) => (
            <div key={i} className="bg-black/80 backdrop-blur-sm px-10 py-12 text-center">
              <div
                className="font-serif text-6xl md:text-7xl mb-3 tabular-nums"
                style={{ background: "linear-gradient(135deg, #fff 30%, #9C89D9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                {stat.value}
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-[200px] mx-auto">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div ref={pillarsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="pillar-card group p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#6750A4]/40 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6750A4]/30 to-[#9C89D9]/30 border border-[#6750A4]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <p.icon className="w-5 h-5 text-[#9C89D9]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
