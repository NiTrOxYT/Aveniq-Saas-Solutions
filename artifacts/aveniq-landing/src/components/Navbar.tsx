import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { prefetchRoute } from "@/utils/prefetch";

interface NavbarProps {
  theme?: "light" | "dark";
}

export default function Navbar({ theme }: NavbarProps = {}) {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location, navigate] = useLocation();

  const isLight = theme === "light" || location === "/qr-menu" || location.startsWith("/qr-menu");

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: "-100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1, delay: 1, ease: "power3.out" }
    );

    const handleScroll = () => {
      if (window.scrollY > 50) {
        if (isLight) {
          navRef.current?.classList.add("py-2", "backdrop-blur-xl", "bg-[#F7F3EC]/90", "border-b", "border-[#E4DBCF]");
          navRef.current?.classList.remove("py-4", "md:py-6", "bg-transparent", "border-transparent", "bg-black/50", "border-white/10");
        } else {
          navRef.current?.classList.add("py-2", "backdrop-blur-xl", "bg-black/50", "border-b", "border-white/10");
          navRef.current?.classList.remove("py-4", "md:py-6", "bg-transparent", "border-transparent", "bg-[#F7F3EC]/90", "border-[#E4DBCF]");
        }
      } else {
        navRef.current?.classList.add("py-4", "md:py-6", "bg-transparent", "border-transparent");
        navRef.current?.classList.remove("py-2", "backdrop-blur-xl", "bg-black/50", "border-b", "border-white/10", "bg-[#F7F3EC]/90", "border-[#E4DBCF]");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLight]);

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
            <text x="120" y="82" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="64" fill={isLight ? "#332A24" : "white"} letterSpacing="-0.03em">Aveniq</text>
          </svg>
        </Link>

        {/* Desktop links */}
        <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${isLight ? "text-[#332A24]/75" : "text-white/70"}`}>
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className={`${isLight ? "hover:text-[#332A24]" : "hover:text-white"} transition-colors flex items-center gap-1 cursor-pointer`}
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
                  className="w-56 rounded-xl border py-2 overflow-hidden"
                  style={{
                    background: isLight ? "#FFFDF8" : "rgba(9,9,11,0.97)",
                    backdropFilter: "blur(20px)",
                    borderColor: isLight ? "#E4DBCF" : "rgba(255,255,255,0.08)",
                    boxShadow: isLight
                      ? "0 20px 50px rgba(51,42,36,0.12), inset 0 1px 0 rgba(255,255,255,0.9)"
                      : "0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  {SERVICE_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      onClick={() => setServicesOpen(false)}
                      onMouseEnter={() => prefetchRoute(link.href)}
                      onFocus={() => prefetchRoute(link.href)}
                      className={`block px-4 py-2.5 text-xs font-medium ${
                        isLight
                          ? "text-[#766A5F] hover:text-[#332A24] hover:bg-[#F7F3EC]"
                          : "text-white/55 hover:text-white hover:bg-white/[0.04]"
                      } transition-all duration-150`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a href={location === "/" ? "#portfolio" : "/#portfolio"} className={`${isLight ? "hover:text-[#332A24]" : "hover:text-white"} transition-colors`}>Portfolio</a>
          <Link href="/about" onMouseEnter={() => prefetchRoute("/about")} onFocus={() => prefetchRoute("/about")} className={`${isLight ? "hover:text-[#332A24]" : "hover:text-white"} transition-colors`}>About</Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/contact" onMouseEnter={() => prefetchRoute("/contact")} onFocus={() => prefetchRoute("/contact")} className={`text-sm font-medium ${isLight ? "text-[#332A24]/75 hover:text-[#332A24]" : "text-white/70 hover:text-white"} transition-colors`}>Contact</Link>
          <button 
            onClick={handleStartProjectClick}
            onMouseEnter={() => prefetchRoute("/start-project")}
            onFocus={() => prefetchRoute("/start-project")}
            className="bg-gradient-to-r from-[#6750A4] to-[#9C89D9] text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full font-semibold text-sm transition-all duration-200 active:scale-[0.97] hover:brightness-110 cursor-pointer shadow-sm"
          >
            Start Your Project
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden ${isLight ? "text-[#332A24] hover:text-[#9A6548]" : "text-white/70 hover:text-white"} transition-colors`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 ${
          isLight
            ? "bg-[#FFFDF8]/95 backdrop-blur-xl border-b border-[#E4DBCF]"
            : "bg-black/95 backdrop-blur-xl border-b border-white/10"
        } py-6 px-4 max-h-[85vh] overflow-y-auto shadow-xl`}>
          <div className={`flex flex-col gap-1 text-sm font-medium ${isLight ? "text-[#332A24]" : "text-white/70"}`}>
            {/* Services group */}
            <div className="py-3 px-2">
              <p className={`text-[10px] font-mono uppercase tracking-widest ${isLight ? "text-[#766A5F]" : "text-white/25"} mb-3`}>Services</p>
              <div className="grid grid-cols-2 gap-1">
                {SERVICE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-xs ${
                      isLight
                        ? "text-[#766A5F] hover:text-[#332A24] hover:bg-[#F7F3EC]"
                        : "text-white/55 hover:text-white hover:bg-white/[0.04]"
                    } py-2 px-3 rounded-lg transition-all duration-150`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className={`h-px ${isLight ? "bg-[#E4DBCF]" : "bg-white/[0.06]"} my-2`} />

            {["Portfolio", "About", "Contact"].map((label) => {
              const isContact = label === "Contact";
              const isAbout = label === "About";
              const targetHref = isContact 
                ? "/contact" 
                : isAbout
                ? "/about"
                : (location === "/" ? "#portfolio" : "/#portfolio");
              return (
                <a
                  key={label}
                  href={targetHref}
                  onClick={(e) => {
                    if (isContact) {
                      e.preventDefault();
                      navigate("/contact");
                    } else if (isAbout) {
                      e.preventDefault();
                      navigate("/about");
                    }
                    setMobileOpen(false);
                  }}
                  className={`hover:${isLight ? "text-[#9A6548] bg-[#F7F3EC]" : "text-white bg-white/5"} transition-colors py-3 px-2 rounded-lg`}
                >
                  {label}
                </a>
              );
            })}
            <button 
              onClick={handleStartProjectClick}
              className="bg-gradient-to-r from-[#6750A4] to-[#9C89D9] text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 active:scale-[0.97] hover:brightness-110 mt-3 cursor-pointer shadow-sm"
            >
              Start Your Project
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
