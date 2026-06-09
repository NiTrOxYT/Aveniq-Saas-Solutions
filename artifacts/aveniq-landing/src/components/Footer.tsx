import { Twitter, Linkedin, Github, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-20 pb-10 px-6 relative z-10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" fill="none" className="h-8 w-auto mb-6">
              <defs>
                <linearGradient id="logo_grad_footer" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6750A4" />
                  <stop offset="100%" stopColor="#9C89D9" />
                </linearGradient>
              </defs>
              <path d="M40 90 L70 30 L100 90 M55 75 L85 75" stroke="url(#logo_grad_footer)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="120" y="82" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="64" fill="white" letterSpacing="-0.03em">Aveniq</text>
            </svg>
            <p className="text-white/50 text-sm">Building premium digital realities.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">SaaS Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Automation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Web Applications</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Business Systems</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>© 2026 Aveniq. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
