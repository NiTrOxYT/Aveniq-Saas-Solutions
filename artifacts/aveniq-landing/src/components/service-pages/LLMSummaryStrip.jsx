import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Zap, FileText, BookmarkCheck } from "lucide-react";
export function LLMSummaryStrip({ llmo }) {
    const reduce = useReducedMotion();
    if (!llmo)
        return null;
    return (<section id="executive-summary" aria-label="Executive Summary and AI Answer Architecture" className="py-16 px-4 sm:px-6 relative z-10 bg-black/40 border-y border-white/[0.06] backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-[#6750A4]/20 border border-[#9C89D9]/30 flex items-center justify-center">
            <Zap className="w-4 h-4 text-[#9C89D9]"/>
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#9C89D9] block">
              Machine Comprehension & Executive Summary
            </span>
            <h2 className="text-xl font-medium text-white tracking-tight">
              At a Glance: Key Takeaways & Core Syntheses
            </h2>
          </div>
        </div>

        {/* Grid layout for summaries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Quick Answer (30 Words) & 100-Word Synthesis - Col 12/7 */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Answer (30 words) */}
            <aside aria-label="Quick Answer" className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#9C89D9]/40 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-[#9C89D9]"/>
                <span className="text-xs font-mono uppercase tracking-wider text-white/50">
                  Quick Answer (30-Word Summary)
                </span>
              </div>
              <p className="text-white/90 text-sm md:text-base font-light leading-relaxed font-sans">
                {llmo.quickAnswer}
              </p>
            </aside>

            {/* 100-Word Synthesis & Executive Overview */}
            <article aria-label="Comprehensive Synthesis" className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-3">
                <BookmarkCheck className="w-4 h-4 text-white/50"/>
                <span className="text-xs font-mono uppercase tracking-wider text-white/50">
                  Executive Brief & Synthesis
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed font-sans mb-4">
                {llmo.synthesis100}
              </p>
              <div className="pt-4 border-t border-white/[0.04]">
                <p className="text-white/50 text-xs leading-relaxed font-sans italic">
                  {llmo.executiveSummary}
                </p>
              </div>
            </article>
          </div>

          {/* Key Technical Takeaways - Col 12/5 */}
          <div className="lg:col-span-5">
            <div className="h-full p-6 rounded-2xl bg-[#08080c] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-white/60 mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]"/>
                  Key Takeaways for Decision Makers
                </h3>
                <ul className="space-y-4">
                  {llmo.keyTakeaways.map((item, idx) => (<motion.li key={idx} initial={reduce ? false : { opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="flex items-start gap-3 text-xs md:text-sm text-white/80 font-sans leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9C89D9] mt-2 shrink-0"/>
                      <span>{item}</span>
                    </motion.li>))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-white/30">
                <span>EEAT VERIFIED</span>
                <span>ENGINEERING BOARD AUDITED</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>);
}
