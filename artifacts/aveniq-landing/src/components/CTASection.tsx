import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CTASection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Gradient shift animation
    gsap.to(bgRef.current, {
      backgroundPosition: "200% center",
      duration: 15,
      ease: "none",
      repeat: -1
    });
  }, []);

  return (
    <section className="relative py-24 sm:py-32 md:py-40 overflow-hidden z-10">
      <div 
        ref={bgRef}
        className="absolute inset-0 opacity-40 bg-[length:200%_auto]"
        style={{ backgroundImage: "linear-gradient(to right, #6750A4, #9C89D9, #000000, #6750A4)" }}
      />
      
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl mb-6">Ready to turn your idea into reality?</h2>
        <p className="text-xl text-white/80 mb-12">Let's build something extraordinary together.</p>
        
        <a href="/book-demo" className="inline-block px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 active:scale-[0.97] transition-[transform,filter,box-shadow] duration-200 hover:brightness-110 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
          Book a Demo
        </a>
      </div>
    </section>
  );
}
