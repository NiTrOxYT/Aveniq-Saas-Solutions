import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useLocation } from "wouter";
export function ServiceCTA() {
    const reduce = useReducedMotion();
    const [, navigate] = useLocation();
    return (<section className="py-32 lg:py-40 px-4 sm:px-6 relative z-10 overflow-hidden bg-transparent">
      
      {/* Visual Climax Container: Premium Glass Panel */}
      <div className="max-w-4xl mx-auto relative px-8 py-16 md:py-24 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-[20px] shadow-[0_30px_80px_rgba(0,0,0,0.35)] overflow-hidden group">
        
        {/* Animated Inner Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 transition-opacity duration-700" style={{
            background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 70%)",
        }}/>
          {!reduce && (<motion.div className="absolute w-[500px] h-[500px] rounded-full" style={{
                background: "rgba(103,80,164,0.1)",
                filter: "blur(110px)",
                left: "20%",
                top: "10%",
            }} animate={{
                scale: [1, 1.15, 1],
                x: [0, 20, 0],
                y: [0, -15, 0],
            }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}/>)}
        </div>

        {/* Micro Grid Inside Card */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
        }} aria-hidden="true"/>

        <div className="relative z-10 text-center">
          <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            {/* Pre-headline */}
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 mb-8">
              Ready to start?
            </p>

            {/* Headline */}
            <h2 className="text-4xl md:text-6xl font-medium text-white mb-6 tracking-tight leading-tight" style={{
            fontFamily: "'Instrument Serif', serif",
            textWrap: "balance",
        }}>
              Let's build something{" "}
              <span style={{
            fontStyle: "italic",
            background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, #C4B5FD 60%, #9C89D9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
        }}>
                exceptional.
              </span>
            </h2>

            <p className="text-white/45 text-base md:text-lg font-light leading-relaxed mb-12 max-w-[55ch] mx-auto" style={{ fontFamily: "Barlow, sans-serif" }}>
              Schedule a free 30-minute discovery call. We'll understand your requirements, answer your questions, and outline exactly what working with Aveniq looks like.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20">
              {/* Primary — Book Discovery Call */}
              <a href="https://cal.com/aveniq" target="_blank" rel="noopener noreferrer" className="group relative px-10 py-4 rounded-full text-sm font-semibold text-white overflow-hidden active:scale-[0.97] transition-transform duration-200 flex items-center gap-2.5 shadow-lg shadow-black/30">
                <div className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #7C6BC4 0%, #9C89D9 100%)" }}/>
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, #8B7DD4 0%, #ADA0E8 100%)" }}/>
                <Calendar className="relative z-10 w-4 h-4"/>
                <span className="relative z-10">Book Discovery Call</span>
              </a>

              {/* Secondary — Start Your Project */}
              <button onClick={() => navigate("/start-project")} className="group px-10 py-4 rounded-full text-sm font-semibold text-white/70 hover:text-white border border-white/[0.08] hover:border-white/[0.25] transition-all duration-300 flex items-center gap-2 active:scale-[0.97] cursor-pointer bg-white/[0.01] hover:bg-white/[0.03]">
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"/>
              </button>
            </div>

            {/* Trust strip */}
            <p className="mt-10 text-white/20 text-[10px] font-mono tracking-wider">
              No commitment required · Response within 24 hours · Fixed-price proposals
            </p>
          </motion.div>
        </div>

        {/* Visual hardware accent borders in card corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-white/20 rounded-tl-3xl opacity-60"/>
        <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-white/20 rounded-tr-3xl opacity-60"/>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-white/20 rounded-bl-3xl opacity-60"/>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/20 rounded-br-3xl opacity-60"/>
      </div>
    </section>);
}
