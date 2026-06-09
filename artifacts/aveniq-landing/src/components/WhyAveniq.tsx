import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhyAveniq() {
  const sectionRef = useRef<HTMLElement>(null);
  const [uptime, setUptime] = useState(0);
  const [products, setProducts] = useState(0);
  const [perf, setPerf] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: 99.9,
          duration: 2,
          ease: "power2.out",
          onUpdate: function() { setUptime(Number(this.targets()[0].val.toFixed(1))); }
        });
        gsap.to({ val: 0 }, {
          val: 50,
          duration: 2,
          ease: "power2.out",
          onUpdate: function() { setProducts(Math.floor(this.targets()[0].val)); }
        });
        gsap.to({ val: 0 }, {
          val: 3,
          duration: 2,
          ease: "power2.out",
          onUpdate: function() { setPerf(Math.floor(this.targets()[0].val)); }
        });
      }
    });

    // Fade in text
    gsap.fromTo(
      sectionRef.current?.querySelectorAll('.stagger-fade'),
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%"
        }
      }
    );

  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="stagger-fade font-serif text-4xl md:text-5xl text-center mb-24">Why Businesses Choose Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-24 border-y border-white/10 py-16">
          <div className="stagger-fade">
            <div className="font-serif text-6xl md:text-7xl text-[#9C89D9] mb-4">{uptime}%</div>
            <p className="text-lg font-medium">Uptime SLA across all deployed systems</p>
          </div>
          <div className="stagger-fade border-y md:border-y-0 md:border-x border-white/10 py-12 md:py-0">
            <div className="font-serif text-6xl md:text-7xl text-[#9C89D9] mb-4">{products}+</div>
            <p className="text-lg font-medium">Products shipped for clients worldwide</p>
          </div>
          <div className="stagger-fade">
            <div className="font-serif text-6xl md:text-7xl text-[#9C89D9] mb-4">{perf}x</div>
            <p className="text-lg font-medium">Average performance improvement vs. prior solutions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="stagger-fade bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl font-semibold mb-3">Speed</h3>
            <p className="text-white/70">We move fast without breaking things. Rapid iteration cycles combined with bulletproof testing.</p>
          </div>
          <div className="stagger-fade bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-white/70">Cutting-edge tech, proven methodologies. We use what works best, not just what's trendy.</p>
          </div>
          <div className="stagger-fade bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl font-semibold mb-3">Reliability</h3>
            <p className="text-white/70">Systems that run 24/7 without babysitting. Built to scale infinitely from day one.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
