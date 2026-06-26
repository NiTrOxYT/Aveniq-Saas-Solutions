import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location, navigate] = useLocation();

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: "-100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1, delay: 1, ease: "power3.out" }
    );

    const handleScroll = () => {
      if (window.scrollY > 50) {
        navRef.current?.classList.add("py-2", "backdrop-blur-xl", "bg-black/50", "border-b", "border-white/10");
        navRef.current?.classList.remove("py-4", "md:py-6", "bg-transparent", "border-transparent");
      } else {
        navRef.current?.classList.add("py-4", "md:py-6", "bg-transparent", "border-transparent");
        navRef.current?.classList.remove("py-2", "backdrop-blur-xl", "bg-black/50", "border-b", "border-white/10");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStartProjectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/start-project");
  };

  const SERVICE_LINKS = [
    { label: "AI Automation", href: "/ai-automation-development" },
    { label: "SaaS Development", href: "/saas-development" },
    { label: "Mobile Apps", href: "/mobile-app-development" },
    { label: "Custom Software", href: "/custom-software-development" },
    { label: "Web Development", href: "/web-development-company" },
    { label: "MVP Development", href: "/mvp-development" },
    { label: "Startup Software", href: "/startup-software-development" },
    { label: "UI/UX Design", href: "/ui-ux-design" },
  ] as const;

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6 transition-all duration-300 border-transparent bg-transparent"
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" fill="none" className="h-8 md:h-10 w-auto">
            <defs>
              <linearGradient id="logo_grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6750A4" />
                <stop offset="100%" stopColor="#9C89D9" />
              </linearGradient>
            </defs>
            <path d="M40 90 L70 30 L100 90 M55 75 L85 75" stroke="url(#logo_grad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="70" cy="60" r="35" stroke="url(#logo_grad)" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
            <text x="120" y="82" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="64" fill="white" letterSpacing="-0.03em">Aveniq</text>
          </svg>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Services
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {servicesOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                role="menu"
              >
                <div
                  className="w-56 rounded-xl border border-white/[0.08] py-2 overflow-hidden"
                  style={{
                    background: "rgba(9,9,11,0.97)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  {SERVICE_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      onClick={() => setServicesOpen(false)}
                      className="block px-4 py-2.5 text-xs font-medium text-white/55 hover:text-white hover:bg-white/[0.04] transition-all duration-150"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a href={location === "/" ? "#portfolio" : "/#portfolio"} className="hover:text-white transition-colors">Portfolio</a>
          <a href={location === "/" ? "#about" : "/#about"} className="hover:text-white transition-colors">About</a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/contact" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Contact</Link>
          <button 
            onClick={handleStartProjectClick}
            className="bg-gradient-to-r from-[#6750A4] to-[#9C89D9] text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full font-semibold text-sm transition-all duration-200 active:scale-[0.97] hover:brightness-110 cursor-pointer"
          >
            Start Your Project
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 py-6 px-4 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-1 text-sm font-medium text-white/70">
            {/* Services group */}
            <div className="py-3 px-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/25 mb-3">Services</p>
              <div className="grid grid-cols-2 gap-1">
                {SERVICE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-xs text-white/55 hover:text-white py-2 px-3 rounded-lg hover:bg-white/[0.04] transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.06] my-2" />

            {["Portfolio", "About", "Contact"].map((label) => {
              const isContact = label === "Contact";
              const targetHref = isContact 
                ? "/contact" 
                : label === "About"
                ? (location === "/" ? "#about" : "/#about")
                : (location === "/" ? "#portfolio" : "/#portfolio");
              return (
                <a
                  key={label}
                  href={targetHref}
                  onClick={(e) => {
                    if (isContact) {
                      e.preventDefault();
                      navigate("/contact");
                    }
                    setMobileOpen(false);
                  }}
                  className="hover:text-white transition-colors py-3 px-2 rounded-lg hover:bg-white/5"
                >
                  {label}
                </a>
              );
            })}
            <button 
              onClick={handleStartProjectClick}
              className="bg-gradient-to-r from-[#6750A4] to-[#9C89D9] text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 active:scale-[0.97] hover:brightness-110 mt-3 cursor-pointer"
            >
              Start Your Project
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
