import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Word-by-word reveal
    const words = titleRef.current?.querySelectorAll(".word");
    if (words) {
      tl.fromTo(
        words,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }
      );
    }

    tl.fromTo(
      descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    // Magnetic Button logic
    const btn = primaryBtnRef.current;
    if (btn) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
      };
      const handleMouseLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
      };
      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        btn.removeEventListener("mousemove", handleMouseMove);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 
          ref={titleRef} 
          className="font-serif text-5xl md:text-7xl lg:text-[7rem] leading-[1.1] tracking-tight mb-8"
        >
          <span className="inline-block overflow-hidden"><span className="word inline-block">Your</span></span>{" "}
          <span className="inline-block overflow-hidden"><span className="word inline-block">Vision.</span></span>
          <br />
          <span className="inline-block overflow-hidden"><span className="word inline-block text-[#9C89D9]">Our</span></span>{" "}
          <span className="inline-block overflow-hidden"><span className="word inline-block text-[#9C89D9]">Digital</span></span>{" "}
          <span className="inline-block overflow-hidden"><span className="word inline-block text-[#9C89D9]">Reality.</span></span>
        </h1>
        
        <p ref={descRef} className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
          We transform ideas into scalable software, intelligent automations, and digital products that drive real business growth.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            ref={primaryBtnRef}
            className="group relative px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full font-semibold text-white overflow-hidden transition-colors hover:bg-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6750A4] to-[#9C89D9] opacity-0 group-hover:opacity-20 transition-opacity" />
            <span className="relative z-10 flex items-center gap-2">
              Book a Demo Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </button>
          
          <button className="px-8 py-4 rounded-full font-semibold text-white/70 hover:text-white transition-colors">
            View Our Work
          </button>
        </div>
      </div>
    </section>
  );
}
