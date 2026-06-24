import { useLocation, Link } from "wouter";
import { Twitter, Linkedin, Github, Instagram, ArrowRight } from "lucide-react";
export default function Footer() {
    const [location] = useLocation();
    // Hide the CTA block if already on a landing intake form to avoid redundant loops
    const showCTA = location !== "/contact" && location !== "/start-project" && !location.startsWith("/admin");
    return (<footer className="relative z-10 bg-black pt-16 pb-10 px-6 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        
        {/* Conditional Footer CTA Block */}
        {showCTA && (<div className="mb-20 pb-16 border-b border-white/[0.04] text-center max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-white" style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: "-0.02em" }}>
              Ready to build something exceptional?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/start-project" className="w-full sm:w-auto bg-white hover:bg-white/90 text-black px-8 py-3.5 rounded-full font-bold text-xs transition-colors flex items-center justify-center gap-1.5">
                Start Your Project <ArrowRight className="w-3.5 h-3.5"/>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/10 hover:border-white/20 text-white font-semibold text-xs transition-colors text-center">
                Contact Us
              </Link>
            </div>
          </div>)}

        {/* Footer Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-left">
          {/* Column 1: Company details */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-block outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" fill="none" className="h-8 w-auto">
                <defs>
                  <linearGradient id="logo_grad_footer" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6750A4"/>
                    <stop offset="100%" stopColor="#9C89D9"/>
                  </linearGradient>
                </defs>
                <path d="M40 90 L70 30 L100 90 M55 75 L85 75" stroke="url(#logo_grad_footer)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="70" cy="60" r="35" stroke="url(#logo_grad_footer)" strokeWidth="2" strokeDasharray="4 4" opacity="0.5"/>
                <text x="120" y="82" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="64" fill="white" letterSpacing="-0.03em">Aveniq</text>
              </svg>
            </Link>
            <div className="space-y-1 text-white/50 text-xs font-light">
              <p className="font-semibold text-white/80">Software Development Studio</p>
              <p>Kolkata, India</p>
              <a href="mailto:hello@theaveniq.in" className="block hover:text-white transition-colors pt-1">hello@theaveniq.in</a>
            </div>
          </div>
          
          {/* Column 2: Navigation (replaces unused Company pages) */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider font-mono mb-4">Studio</h4>
            <ul className="space-y-2.5 text-xs text-white/60 font-light">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><a href={location === "/" ? "#services" : "/#services"} className="hover:text-white transition-colors">Services</a></li>
              <li><a href={location === "/" ? "#portfolio" : "/#portfolio"} className="hover:text-white transition-colors">Work</a></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/start-project" className="hover:text-white transition-colors">Start Your Project</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Services (General scope) */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider font-mono mb-4">Expertise</h4>
            <ul className="space-y-2.5 text-xs text-white/60 font-light font-mono">
              <li>SaaS Development</li>
              <li>AI Automations</li>
              <li>Web Applications</li>
              <li>Mobile Platforms</li>
              <li>Business Systems</li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider font-mono mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-white/60 hover:text-white transition-colors"><Linkedin className="w-4 h-4"/></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-white/60 hover:text-white transition-colors"><Github className="w-4 h-4"/></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="text-white/60 hover:text-white transition-colors"><Twitter className="w-4 h-4"/></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-white/60 hover:text-white transition-colors"><Instagram className="w-4 h-4"/></a>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom Block */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center text-xs text-white/30 font-light gap-4">
          <p>© 2026 Aveniq. All rights reserved.</p>
          <div className="flex gap-6 font-mono text-[10px]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>);
}
