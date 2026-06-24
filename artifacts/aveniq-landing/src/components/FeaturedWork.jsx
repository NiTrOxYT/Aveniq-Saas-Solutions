import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
function LazyImage({ src, alt, className, isLowPower }) {
    const [visible, setVisible] = useState(false);
    const containerRef = useRef(null);
    useEffect(() => {
        if (isLowPower) {
            setVisible(true);
            return;
        }
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
        }, { rootMargin: "300px" });
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => observer.disconnect();
    }, [isLowPower]);
    return (<div ref={containerRef} className="w-full h-full bg-zinc-950/40 relative">
      {visible ? (<img src={src} alt={alt} loading="lazy" decoding="async" className={`${className} transition-opacity duration-500`}/>) : null}
    </div>);
}
export default function FeaturedWork() {
    const { projects } = useProjects();
    const reduce = useReducedMotion();
    const [isLowPower, setIsLowPower] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const cores = navigator.hardwareConcurrency || 8;
            const memory = navigator.deviceMemory || 8;
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsLowPower(prefersReduced || cores <= 4 || memory <= 4 || isMobile);
        }
    }, []);
    const handleCardClick = (link) => {
        if (link) {
            window.open(link, "_blank", "noopener,noreferrer");
        }
    };
    const showFeatured = projects.length >= 4;
    return (<section id="portfolio" className="py-32 px-6 relative z-10 bg-black overflow-hidden border-t border-white/[0.03]">
      {/* Subtle ambient glow and vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(103,80,164,0.04)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0"/>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        {(() => {
            const HeaderTag = isLowPower ? "div" : motion.div;
            const headerProps = isLowPower
                ? {}
                : {
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.3 },
                    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
                };
            return (<HeaderTag {...headerProps} className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-6">
              <div>
                <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl mb-4 text-white leading-[1.1] tracking-tight">
                  Selected Work
                </h2>
                <p className="text-white/40 text-sm md:text-base max-w-[55ch] font-light leading-relaxed">
                  A curated collection of digital products and high-performance applications designed and engineered for the web.
                </p>
              </div>
              <button onClick={() => handleCardClick("#")} className="text-[#9C89D9] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:text-white transition-colors duration-300 shrink-0 cursor-pointer group">
                View All Projects 
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"/>
              </button>
            </HeaderTag>);
        })()}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          {projects.map((proj, i) => {
            const isFeatured = showFeatured && i === 0;
            const CardDiv = isLowPower ? "div" : motion.div;
            const cardProps = isLowPower
                ? {}
                : {
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.1 },
                    transition: {
                        duration: 0.8,
                        delay: i * 0.05,
                        ease: [0.23, 1, 0.32, 1],
                    },
                };
            // Custom classes for featured vs standard card layout
            const cardClass = isFeatured
                ? "col-span-1 md:col-span-2 group flex flex-col md:flex-row md:items-stretch bg-[#08080a] border border-white/[0.06] hover:border-white/[0.12] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/80 md:aspect-[2.3/1] md:min-h-[440px]"
                : "group flex flex-col bg-[#08080a] border border-white/[0.06] hover:border-white/[0.12] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/80";
            // If not low-power, add card lift hover class
            const hoverClass = isLowPower
                ? ""
                : "hover:-translate-y-[2px]";
            return (<CardDiv key={proj.id} {...cardProps} onClick={() => handleCardClick(proj.link)} className={`${cardClass} ${hoverClass} cursor-pointer`}>
                {/* Browser Mockup Image Container */}
                <div className={isFeatured
                    ? "w-full md:w-[65%] flex flex-col flex-shrink-0 bg-zinc-950 border-b md:border-b-0 md:border-r border-white/[0.06]"
                    : "w-full flex flex-col bg-zinc-950 border-b border-white/[0.06]"}>
                  {/* Browser Top Toolbar (Minimalist) */}
                  <div className="h-9 bg-[#0b0b0d] border-b border-white/[0.04] flex items-center px-4 shrink-0">
                    <div className="flex gap-1.5 shrink-0">
                      {/* Subtly tinted grey browser dots - Stripe style */}
                      <span className="w-1.5 h-1.5 rounded-full bg-white/[0.08]"/>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/[0.08]"/>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/[0.08]"/>
                    </div>
                    {/* Minimal address bar indicator */}
                    <div className="w-24 md:w-36 h-3 bg-white/[0.03] rounded-md mx-auto"/>
                  </div>

                  {/* Screenshot wrapped in 1.7:1 ratio */}
                  <div className="relative w-full aspect-[1.7/1] md:aspect-auto md:flex-grow overflow-hidden bg-zinc-950">
                    {proj.imageUrl ? (<LazyImage src={proj.imageUrl} alt={proj.title} isLowPower={isLowPower} className="w-full h-full object-cover object-top filter contrast-[1.01] brightness-[0.98] transition-transform duration-700 ease-out-premium group-hover:scale-[1.01]"/>) : (
                // Fallback when no image is uploaded
                <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white/20 text-xs uppercase tracking-widest font-mono">
                        No Screenshot
                      </div>)}
                  </div>
                </div>

                {/* Content Area */}
                <div className={isFeatured
                    ? "w-full md:w-[35%] p-8 md:p-10 flex flex-col justify-center flex-grow"
                    : "p-8 flex flex-col flex-grow"}>
                  {/* Category Pill / Tag */}
                  <span className="text-[10px] tracking-[0.2em] font-mono uppercase text-white/30 mb-3 block select-none">
                    {proj.tag}
                  </span>

                  {/* Project Title */}
                  <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-3">
                    {proj.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-white/50 text-sm leading-relaxed mb-6 font-light line-clamp-4 max-w-[50ch]">
                    {proj.desc}
                  </p>

                  {/* CTA View Project */}
                  <div className="mt-auto">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#9C89D9] group-hover:text-white transition-colors duration-300 inline-flex items-center gap-1.5 group/cta">
                      View Project 
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover/cta:translate-x-1 transition-transform duration-300"/>
                    </span>
                  </div>
                </div>
              </CardDiv>);
        })}
        </div>
      </div>
    </section>);
}
