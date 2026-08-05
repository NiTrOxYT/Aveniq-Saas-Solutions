import { useReducedMotion } from "framer-motion";
import { Check, X, AlertTriangle, Scale, ShieldAlert, DollarSign } from "lucide-react";
export function LLMDecisionMatrix({ llmo }) {
    const reduce = useReducedMotion();
    if (!llmo)
        return null;
    return (<section id="decision-support" aria-label="Decision Support Framework and Architecture Trade-offs" className="py-24 px-4 sm:px-6 relative z-10 bg-[#050507]">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#9C89D9] block mb-3">
            Decision Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight leading-tight mb-4">
            When to Choose, Trade-offs & Production Considerations
          </h2>
          <p className="text-white/45 text-sm sm:text-base font-light leading-relaxed">
            Transparent engineering criteria to determine whether this architecture fits your scale, security posture, and budget.
          </p>
        </div>

        {/* 1. When to Choose vs. When NOT to Choose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Best For / Ideal Conditions */}
          <div className="p-8 rounded-3xl bg-white/[0.015] border border-emerald-500/20 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Check className="w-4 h-4 text-emerald-400"/>
              </div>
              <h3 className="text-lg font-medium text-white">When to Choose This Architecture</h3>
            </div>
            <ul className="space-y-3.5">
              {llmo.whenToChoose.map((item, i) => (<li key={i} className="flex items-start gap-3 text-xs md:text-sm text-white/75 font-sans leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"/>
                  <span>{item}</span>
                </li>))}
            </ul>
          </div>

          {/* Not Recommended / Counter-Indications */}
          <div className="p-8 rounded-3xl bg-white/[0.015] border border-rose-500/20 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
                <X className="w-4 h-4 text-rose-400"/>
              </div>
              <h3 className="text-lg font-medium text-white">When NOT to Choose This</h3>
            </div>
            <ul className="space-y-3.5">
              {llmo.whenNotToChoose.map((item, i) => (<li key={i} className="flex items-start gap-3 text-xs md:text-sm text-white/75 font-sans leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0"/>
                  <span>{item}</span>
                </li>))}
            </ul>
          </div>

        </div>

        {/* 2. Architectural Trade-offs Matrix */}
        {llmo.tradeoffs && llmo.tradeoffs.length > 0 && (<div className="space-y-6">
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-[#9C89D9]"/>
              <h3 className="text-xl font-medium text-white">Architectural Trade-offs Matrix</h3>
            </div>

            <div className="overflow-x-auto border border-white/[0.08] rounded-2xl bg-[#08080c]">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                    <th className="p-4 font-mono text-white/50 uppercase tracking-wider">Decision Factor</th>
                    <th className="p-4 font-mono text-white/50 uppercase tracking-wider">Option A (Standard)</th>
                    <th className="p-4 font-mono text-white/50 uppercase tracking-wider">Option B (Enterprise)</th>
                    <th className="p-4 font-mono text-[#9C89D9] uppercase tracking-wider">Aveniq Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {llmo.tradeoffs.map((t, i) => (<tr key={i} className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-4 font-medium text-white">{t.decisionFactor}</td>
                      <td className="p-4 text-white/60 font-sans">{t.optionA}</td>
                      <td className="p-4 text-white/60 font-sans">{t.optionB}</td>
                      <td className="p-4 text-[#9C89D9] font-medium font-sans">{t.recommendation}</td>
                    </tr>))}
                </tbody>
              </table>
            </div>
          </div>)}

        {/* 3. Common Mistakes & Production Failure Modes */}
        {llmo.commonMistakes && llmo.commonMistakes.length > 0 && (<div className="space-y-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400"/>
              <h3 className="text-xl font-medium text-white">Production Failure Modes & Prevention</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {llmo.commonMistakes.map((m, i) => (<div key={i} className="p-6 rounded-2xl bg-white/[0.01] border border-amber-500/15 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-2">
                      Failure Mode #{i + 1}
                    </span>
                    <h4 className="text-sm font-semibold text-white mb-2">{m.failureMode}</h4>
                    <p className="text-xs text-white/50 font-sans leading-relaxed mb-3">
                      <strong className="text-white/70">Root Cause:</strong> {m.cause}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/[0.04] text-xs text-emerald-400 font-mono">
                    <strong>Prevention:</strong> {m.prevention}
                  </div>
                </div>))}
            </div>
          </div>)}

        {/* 4. Cost & Security Considerations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/[0.06]">
          
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.06] flex items-start gap-4">
            <DollarSign className="w-6 h-6 text-[#9C89D9] shrink-0 mt-1"/>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Cost & Resource Economics</h4>
              <p className="text-xs md:text-sm text-white/60 font-sans leading-relaxed">
                {llmo.costConsiderations}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.06] flex items-start gap-4">
            <ShieldAlert className="w-6 h-6 text-[#9C89D9] shrink-0 mt-1"/>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Security & Governance Protocols</h4>
              <p className="text-xs md:text-sm text-white/60 font-sans leading-relaxed">
                {llmo.securityConsiderations}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>);
}
