import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    );

    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          padding: scrolled ? "12px 0" : "24px 0",
          background: scrolled ? "rgba(0,0,0,0.75)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 outline-none group">
            <div className="relative w-7 h-7">
              <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M14 2L26 24H2L14 2Z" stroke="url(#nav_grad)" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
                <path d="M8 18H20" stroke="url(#nav_grad)" strokeWidth="1.8" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="nav_grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6750A4"/>
                    <stop offset="100%" stopColor="#9C89D9"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span
              className="text-white font-semibold text-lg tracking-tight group-hover:text-white/80 transition-colors"
              style={{ fontFamily: "Barlow, sans-serif", letterSpacing: "-0.02em" }}
            >
              Aveniq
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {["Services", "Portfolio", "About", "Pricing"].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Barlow, sans-serif" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="#contact"
              className="text-sm transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Barlow, sans-serif" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              Contact
            </a>
            <button
              className="relative text-sm font-semibold text-white px-5 py-2 rounded-full overflow-hidden"
              style={{ background: "linear-gradient(135deg, #6750A4 0%, #9C89D9 100%)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Book Demo
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-px bg-white/60 transition-all duration-300 origin-center"
              style={{ transform: mobileOpen ? "translateY(6px) rotate(45deg)" : "none" }}
            />
            <span
              className="block w-5 h-px bg-white/60 transition-all duration-300"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-px bg-white/60 transition-all duration-300 origin-center"
              style={{ transform: mobileOpen ? "translateY(-6px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="fixed inset-x-0 top-0 z-40 flex flex-col pt-20 pb-8 px-6 transition-all duration-400 md:hidden"
        style={{
          background: "rgba(0,0,0,0.95)",
          backdropFilter: "blur(24px)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transform: mobileOpen ? "translateY(0)" : "translateY(-10px)",
        }}
      >
        {["Services", "Portfolio", "About", "Pricing", "Contact"].map(link => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={() => setMobileOpen(false)}
            className="py-4 text-xl font-light border-b text-white/70 hover:text-white transition-colors"
            style={{ borderColor: "rgba(255,255,255,0.06)", fontFamily: "Instrument Serif, serif" }}
          >
            {link}
          </a>
        ))}
        <button
          className="mt-8 text-sm font-semibold text-white py-3 rounded-full"
          style={{ background: "linear-gradient(135deg, #6750A4 0%, #9C89D9 100%)" }}
        >
          Book a Demo
        </button>
      </div>
    </>
  );
}
