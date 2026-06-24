import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Zap, Brain, Globe, Smartphone, Settings, Layers } from "lucide-react";
const SERVICE_VIDEOS = {
    "SaaS Development": "/videos-webm/saas.webm",
    "AI Automation": "/videos-webm/ai.webm",
    "Web Applications": "/videos-webm/web.webm",
    "Mobile Apps": "/videos-webm/mobile.webm",
    "Business Systems": "/videos-webm/business.webm",
    "UI/UX Design": "/videos-webm/design.webm",
};
const services = [
    {
        title: "SaaS Development",
        desc: "Scalable, multi-tenant architectures built for rapid growth, high availability, and enterprise-grade reliability.",
        icon: Zap,
        num: "01",
        span: "lg:col-span-2"
    },
    {
        title: "Mobile Apps",
        desc: "Native iOS and Android experiences designed with polished gestures, smooth transitions, and offline-first support.",
        icon: Smartphone,
        num: "04",
        span: "lg:col-span-1"
    },
    {
        title: "Web Applications",
        desc: "Performant, custom-engineered web applications built on modern stacks designed to delight users.",
        icon: Globe,
        num: "03",
        span: "lg:col-span-1"
    },
    {
        title: "AI Automation",
        desc: "Intelligent AI workflows and custom LLM integrations that eliminate manual bottlenecks and unlock operational leverage.",
        icon: Brain,
        num: "02",
        span: "lg:col-span-2"
    },
    {
        title: "Business Systems",
        desc: "Tailored internal tools, customized CRMs, and operations portals designed specifically to streamline your core processes.",
        icon: Settings,
        num: "05",
        span: "lg:col-span-1"
    },
    {
        title: "UI/UX Design",
        desc: "World-class visual design and polished micro-interactions that elevate brand trust and drive conversion.",
        icon: Layers,
        num: "06",
        span: "lg:col-span-2"
    },
];
function ServiceCard({ svc, index, }) {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hovered, setHovered] = useState(false);
    const videoRef = useRef(null);
    const reduce = useReducedMotion();
    const loadedRef = useRef(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.05 });
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        if (isVisible) {
            const v = videoRef.current;
            if (v)
                v.load();
        }
    }, [isVisible]);
    useEffect(() => {
        const v = videoRef.current;
        if (!v)
            return;
        if (hovered) {
            if (!loadedRef.current) {
                v.load();
                loadedRef.current = true;
            }
            v.play().catch(() => { });
        }
        else {
            v.pause();
        }
    }, [hovered]);
    return (<motion.div ref={containerRef} initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }} className={`relative group liquid-glass rounded-2xl cursor-default select-none overflow-hidden outline-none ${svc.span}`} style={{ borderRadius: "16px" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} tabIndex={0} onFocus={() => setHovered(true)} onBlur={() => setHovered(false)}>
      {/* Animated video background layer */}
      <div className="absolute inset-0 rounded-[16px] overflow-hidden pointer-events-none transition-opacity duration-700" style={{ opacity: hovered ? 1 : 0, zIndex: 0 }}>
        <video ref={videoRef} muted loop playsInline preload={hovered ? "auto" : (isVisible ? "metadata" : "none")} className="w-full h-full object-cover">
          {isVisible && (<source src={SERVICE_VIDEOS[svc.title]} type="video/webm"/>)}
        </video>
        {/* frosted overlay so the background reads through glass */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(0px)" }}/>
      </div>

      {/* Card Content */}
      <div className="relative z-10 p-8 flex flex-col h-full justify-between" style={{ minHeight: "250px" }}>
        {/* Top row */}
        <div className="flex items-start justify-between mb-8">
          <span className="text-[10px] font-semibold tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.22)", fontFamily: "Barlow, sans-serif" }}>
            {svc.num}
          </span>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300" style={{
            background: hovered ? "rgba(255,255,255,0.12)" : "rgba(103,80,164,0.18)",
            border: hovered ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(103,80,164,0.32)",
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "background 0.4s, border 0.4s, transform 0.3s",
        }}>
            <svc.icon className="w-5 h-5" style={{ color: hovered ? "#ffffff" : "#9C89D9", transition: "color 0.4s" }} strokeWidth={1.5}/>
          </div>
        </div>

        {/* Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 leading-snug" style={{ color: "rgba(255,255,255,0.92)", letterSpacing: "-0.01em" }}>
            {svc.title}
          </h3>

          <p className="text-xs leading-relaxed max-w-[50ch]" style={{
            color: hovered ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.45)",
            fontFamily: "Barlow, sans-serif",
            fontWeight: 300,
            transition: "color 0.4s",
        }}>
            {svc.desc}
          </p>
        </div>

        {/* Learn more — slides up on hover */}
        <div className="mt-6 flex items-center gap-1.5" style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.35s, transform 0.35s",
        }}>
          <span className="text-[11px] font-medium tracking-wide" style={{ color: "#9C89D9" }}>
            Learn more
          </span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9C89D9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </motion.div>);
}
export default function ServicesSection() {
    const reduce = useReducedMotion();
    return (<section id="services" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} className="text-center mb-16 md:mb-24">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-4 text-white px-2" style={{ letterSpacing: "-0.025em" }}>
            End-to-end digital solutions
          </h2>
          <p className="text-sm md:text-base font-light px-4 max-w-[65ch] mx-auto" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Barlow, sans-serif" }}>
            Engineered for scale. Designed for humans.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (<ServiceCard key={i} svc={svc} index={i}/>))}
        </div>
      </div>
    </section>);
}
