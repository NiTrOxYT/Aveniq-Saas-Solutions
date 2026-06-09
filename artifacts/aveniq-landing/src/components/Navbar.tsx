import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "wouter";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      navRef.current,
      { y: "-100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1, delay: 1, ease: "power3.out" }
    );

    // Scroll shrink
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navRef.current?.classList.add("py-2", "backdrop-blur-xl", "bg-black/50", "border-b", "border-white/10");
        navRef.current?.classList.remove("py-6", "bg-transparent", "border-transparent");
      } else {
        navRef.current?.classList.add("py-6", "bg-transparent", "border-transparent");
        navRef.current?.classList.remove("py-2", "backdrop-blur-xl", "bg-black/50", "border-b", "border-white/10");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 py-6 transition-all duration-300 border-transparent bg-transparent"
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 outline-none">
          <svg ref={logoRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" fill="none" className="h-10 w-auto">
            <defs>
              <linearGradient id="logo_grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6750A4" />
                <stop offset="100%" stopColor="#9C89D9" />
              </linearGradient>
            </defs>
            <path d="M40 90 L70 30 L100 90 M55 75 L85 75" stroke="url(#logo_grad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="70" cy="60" r="35" stroke="url(#logo_grad)" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
            <text x="120" y="82" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="64" fill="white" letterSpacing="-0.03em">Aveniq</text>
            <circle cx="345" cy="45" r="6" fill="url(#logo_grad)" />
          </svg>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
          <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </div>

        <div className="flex items-center gap-6">
          <a href="#contact" className="hidden md:block text-sm font-medium text-white/70 hover:text-white transition-colors">Contact</a>
          <button className="bg-gradient-to-r from-[#6750A4] to-[#9C89D9] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity">
            Book Demo
          </button>
        </div>
      </div>
    </nav>
  );
}
