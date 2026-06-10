import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyAveniq() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  const [uptime,   setUptime]   = useState(0);
  const [products, setProducts] = useState(0);
  const [perf,     setPerf]     = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 88%" } }
    );

    gsap.fromTo(statsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 82%",
          onEnter: () => {
            if (animated.current) return;
            animated.current = true;
            gsap.to({ val: 0 }, { val: 99.9, duration: 2.2, ease: "power2.out", onUpdate: function () { setUptime(Number(this.targets()[0].val.toFixed(1))); } });
            gsap.to({ val: 0 }, { val: 50,   duration: 2.2, ease: "power2.out", onUpdate: function () { setProducts(Math.floor(this.targets()[0].val)); } });
            gsap.to({ val: 0 }, { val: 3,    duration: 2.2, ease: "power2.out", onUpdate: function () { setPerf(Math.floor(this.targets()[0].val)); } });
          },
        },
      }
    );

    gsap.fromTo(textRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: textRef.current, start: "top 86%" } }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-28 md:py-36 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="mb-16 md:mb-20 opacity-0">
          <p
            className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-5"
            style={{ color: "#6750A4", fontFamily: "Barlow, sans-serif" }}
          >
            Why Aveniq
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl leading-tight max-w-xl"
            style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: "-0.025em" }}
          >
            Numbers that<br />speak for themselves
          </h2>
        </div>

        {/* Stats — large, bold, horizontal */}
        <div
          ref={statsRef}
          className="grid grid-cols-3 mb-20 md:mb-28 opacity-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
            { value: `${uptime}%`, label: "Uptime SLA" },
            { value: `${products}+`, label: "Products shipped" },
            { value: `${perf}×`, label: "Performance gain" },
          ].map((stat, i) => (
            <div
              key={i}
              className="py-10 md:py-14 text-center"
              style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
            >
              <div
                className="text-4xl sm:text-5xl md:text-7xl font-semibold tabular-nums mb-3 leading-none"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  background: "linear-gradient(150deg, #fff 20%, #9C89D9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <p
                className="text-xs font-medium tracking-[0.15em] uppercase"
                style={{ color: "rgba(255,255,255,0.28)", fontFamily: "Barlow, sans-serif" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Philosophy text block */}
        <div ref={textRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 opacity-0">
          <div>
            <h3
              className="text-2xl md:text-3xl mb-5 leading-snug"
              style={{ fontFamily: "'Instrument Serif', serif", color: "rgba(255,255,255,0.9)" }}
            >
              Built for founders who move at the speed of ideas.
            </h3>
          </div>
          <div className="space-y-5">
            {[
              { title: "Speed without sacrifice", desc: "We move fast without cutting corners. Rapid iteration backed by rigorous testing and code review." },
              { title: "Reliability by design", desc: "Systems architected to run 24/7 at scale, from day one. No retrofitting reliability after launch." },
              { title: "Partnership, not service", desc: "We act as a technical co-founder, not a vendor. Your success is our success." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.25rem" }}>
                <div
                  className="w-1 h-1 rounded-full mt-2 shrink-0"
                  style={{ background: "#6750A4", boxShadow: "0 0 6px #6750A4" }}
                />
                <div>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Barlow, sans-serif" }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.32)", fontFamily: "Barlow, sans-serif", fontWeight: 300 }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
