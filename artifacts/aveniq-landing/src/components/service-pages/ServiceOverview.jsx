import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] },
    }),
};
export function ServiceOverview({ service }) {
    const { overview } = service;
    const reduce = useReducedMotion();
    return (<section className="py-28 px-4 sm:px-6 relative z-10 border-t border-white/[0.04] bg-[#020202]">
      {/* Background radial highlight */}
      <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(circle at 10% 30%, rgba(103,80,164,0.03) 0%, transparent 60%)",
        }} aria-hidden="true"/>

      <div className="max-w-7xl mx-auto relative">

        {/* ─── What It Is / Who It's For ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          {[overview.whatItIs, overview.whoItsFor].map((item, i) => (<motion.div key={i} custom={i} initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="relative p-8 rounded-2xl border border-white/[0.08] hover:border-white/[0.18] bg-white/[0.03] backdrop-blur-[20px] shadow-[0_30px_80px_rgba(0,0,0,0.35)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden group">
              {/* Subtle accent hover indicator */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                background: "radial-gradient(circle at top left, rgba(103,80,164,0.05) 0%, transparent 60%)",
            }}/>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20"/>
              
              <h2 className="text-2xl md:text-3xl font-medium text-white mb-5 tracking-tight leading-snug" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {item.title}
              </h2>
              <p className="text-white/45 leading-relaxed font-light text-sm group-hover:text-white/60 transition-colors duration-300" style={{ maxWidth: "55ch" }}>
                {item.body}
              </p>

              {/* Borders */}
              <div className="absolute top-0 right-0 w-[20px] h-[1px] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
              <div className="absolute bottom-0 left-0 h-[20px] w-[1px] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
            </motion.div>))}
        </div>

        {/* ─── Business Benefits ─── */}
        <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }} className="mb-32">
          <h3 className="text-xl md:text-2xl font-medium text-white mb-10 tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Business benefits that move the needle
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {overview.businessBenefits.map((benefit, i) => {
            // Create visual variance: highlight the center card slightly or have a subtle alternate style
            const isMiddle = i === 1;
            return (<motion.div key={i} custom={i} initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className={`flex items-start gap-4 p-6 rounded-xl border transition-all duration-300 group ${isMiddle
                    ? "border-[#6750A4]/50 bg-white/[0.05] backdrop-blur-[20px] shadow-[0_30px_80px_rgba(0,0,0,0.35)] hover:-translate-y-1.5"
                    : "border-white/[0.08] bg-white/[0.03] backdrop-blur-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:border-white/[0.18] hover:-translate-y-1"}`}>
                  <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 transition-colors duration-300 ${isMiddle ? "text-[#9C89D9]" : "text-white/20 group-hover:text-[#9C89D9]"}`} strokeWidth={1.5}/>
                  <span className="text-white/45 text-xs md:text-sm leading-relaxed font-light group-hover:text-white/70 transition-colors duration-300">
                    {benefit}
                  </span>
                </motion.div>);
        })}
          </div>
        </motion.div>

        {/* ─── Use Cases ─── */}
        <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}>
          <h3 className="text-xl md:text-2xl font-medium text-white mb-10 tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Real-world outcomes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {overview.useCases.map((uc, i) => (<motion.div key={i} custom={i} initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="relative p-8 rounded-2xl border border-white/[0.08] hover:border-white/[0.18] bg-white/[0.03] backdrop-blur-[20px] shadow-[0_30px_80px_rgba(0,0,0,0.35)] hover:-translate-y-1.5 transition-all duration-500 group overflow-hidden">
                {/* Background grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-25"/>

                {/* Soft gradient backdrop */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                background: "radial-gradient(circle at 10% 10%, rgba(103,80,164,0.07) 0%, transparent 70%)",
            }}/>

                {/* Industry tag */}
                <span className="text-[9px] tracking-[0.25em] font-mono uppercase text-[#9C89D9] mb-6 block">
                  {uc.industry}
                </span>

                {/* Problem */}
                <div className="mb-6 relative z-10">
                  <p className="text-[10px] font-mono text-white/20 uppercase tracking-wider mb-2">
                    The challenge
                  </p>
                  <p className="text-white/40 text-sm leading-relaxed font-light transition-colors duration-300 group-hover:text-white/60">
                    {uc.problem}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div className="flex-1 h-px bg-white/[0.04]"/>
                  <ArrowRight className="w-3.5 h-3.5 text-[#9C89D9] group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={1.5}/>
                  <div className="flex-1 h-px bg-white/[0.04]"/>
                </div>

                {/* Outcome */}
                <div className="relative z-10">
                  <p className="text-[10px] font-mono text-white/20 uppercase tracking-wider mb-2">
                    The outcome
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed font-medium transition-colors duration-300 group-hover:text-white">
                    {uc.outcome}
                  </p>
                </div>

                {/* Visual hardware highlight strips */}
                <div className="absolute top-0 right-0 w-[40px] h-[1px] bg-gradient-to-l from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                <div className="absolute bottom-0 left-0 h-[40px] w-[1px] bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
              </motion.div>))}
          </div>
        </motion.div>
      </div>
    </section>);
}
