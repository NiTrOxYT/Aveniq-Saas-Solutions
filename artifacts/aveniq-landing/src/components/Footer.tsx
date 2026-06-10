import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative z-10 px-6 pt-16 pb-10"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                <path d="M14 2L26 24H2L14 2Z" stroke="url(#footer_grad)" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
                <path d="M8 18H20" stroke="url(#footer_grad)" strokeWidth="1.8" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="footer_grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6750A4"/>
                    <stop offset="100%" stopColor="#9C89D9"/>
                  </linearGradient>
                </defs>
              </svg>
              <span
                className="text-white font-semibold text-base"
                style={{ fontFamily: "Barlow, sans-serif", letterSpacing: "-0.02em" }}
              >
                Aveniq
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-6 max-w-[200px]"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Barlow, sans-serif", fontWeight: 300 }}
            >
              Building premium digital products for ambitious teams.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="transition-colors duration-200" style={{ color: "rgba(255,255,255,0.25)" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25))")}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p
              className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Barlow, sans-serif" }}
            >
              Company
            </p>
            <ul className="space-y-3">
              {["About", "Portfolio", "Pricing", "Careers", "Contact"].map(link => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.38)", fontFamily: "Barlow, sans-serif" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)")}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p
              className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Barlow, sans-serif" }}
            >
              Services
            </p>
            <ul className="space-y-3">
              {["SaaS Development", "AI Automation", "Web Applications", "Mobile Apps", "UI/UX Design"].map(svc => (
                <li key={svc}>
                  <a
                    href="#services"
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.38)", fontFamily: "Barlow, sans-serif" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)")}
                  >
                    {svc}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Barlow, sans-serif" }}
            >
              Get in touch
            </p>
            <a
              href="mailto:hello@aveniq.com"
              className="text-sm block mb-2 transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.38)", fontFamily: "Barlow, sans-serif" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#9C89D9")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)")}
            >
              hello@aveniq.com
            </a>
            <button
              className="mt-5 text-xs font-semibold text-white px-4 py-2 rounded-full transition-opacity hover:opacity-80"
              style={{ background: "linear-gradient(135deg, #6750A4 0%, #9C89D9 100%)" }}
            >
              Book a Demo
            </button>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)", fontFamily: "Barlow, sans-serif" }}
        >
          <p>© 2026 Aveniq. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
