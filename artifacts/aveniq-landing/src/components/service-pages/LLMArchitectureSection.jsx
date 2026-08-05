import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Cpu, Layers, Wrench, ChevronRight } from "lucide-react";
export function LLMArchitectureSection({ llmo }) {
    const reduce = useReducedMotion();
    const [activeEntityIndex, setActiveEntityIndex] = useState(0);
    if (!llmo)
        return null;
    return (<section id="architecture-implementation" aria-label="System Architecture and Technical Implementation" className="py-24 px-4 sm:px-6 relative z-10 bg-black">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#9C89D9] block mb-3">
            System Topology & Implementation
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight leading-tight mb-4">
            Architecture Blueprint & Technical Protocols
          </h2>
          <p className="text-white/45 text-sm sm:text-base font-light leading-relaxed">
            Detailed breakdown of system mechanics, machine entities, implementation milestones, and operational troubleshooting protocols.
          </p>
        </div>

        {/* 1. Architecture Overview & Implementation Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Architecture Overview - Col 6 */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-[#9C89D9]"/>
              <h3 className="text-xl font-medium text-white">System Architecture Overview</h3>
            </div>
            <div className="p-8 rounded-3xl bg-[#08080c] border border-white/[0.08] relative">
              <p className="text-white/70 text-sm leading-relaxed font-sans font-light">
                {llmo.architectureOverview}
              </p>
            </div>
          </div>

          {/* Step-by-Step Implementation Steps - Col 6 */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-[#9C89D9]"/>
              <h3 className="text-xl font-medium text-white">Implementation Methodology</h3>
            </div>
            <div className="space-y-4">
              {llmo.implementationSteps.map((step, idx) => (<div key={idx} className="p-4 rounded-2xl bg-white/[0.015] border border-white/[0.06] flex items-start gap-4">
                  <span className="w-7 h-7 rounded-xl bg-[#6750A4]/20 border border-[#9C89D9]/30 text-[#9C89D9] font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs md:text-sm text-white/80 font-sans leading-relaxed">
                    {step}
                  </p>
                </div>))}
            </div>
          </div>

        </div>

        {/* 2. Machine-Readable Concept Definitions (Entities) */}
        {llmo.entities && llmo.entities.length > 0 && (<div className="space-y-8">
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-[#9C89D9]"/>
              <h3 className="text-xl font-medium text-white">Machine-Readable Entity Definitions</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Entity Selector Pills */}
              <div className="lg:col-span-4 space-y-2">
                {llmo.entities.map((e, idx) => (<button key={idx} onClick={() => setActiveEntityIndex(idx)} className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${activeEntityIndex === idx
                    ? "bg-[#6750A4]/20 border-[#9C89D9]/40 text-white"
                    : "bg-white/[0.01] border-white/[0.05] text-white/50 hover:bg-white/[0.03] hover:text-white"}`}>
                    <span className="font-mono text-xs md:text-sm font-medium">{e.name}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeEntityIndex === idx ? "rotate-90 text-[#9C89D9]" : ""}`}/>
                  </button>))}
              </div>

              {/* Active Entity Card */}
              <div className="lg:col-span-8">
                {llmo.entities[activeEntityIndex] && (<div className="p-8 rounded-3xl bg-[#09090d] border border-white/[0.08] space-y-6">
                    <div>
                      <span className="text-[10px] font-mono text-[#9C89D9] uppercase tracking-widest block mb-1">
                        Technical Entity Spec
                      </span>
                      <h4 className="text-xl font-serif text-white">{llmo.entities[activeEntityIndex].name}</h4>
                    </div>

                    <div className="space-y-4 text-xs md:text-sm">
                      <div>
                        <strong className="text-white/40 font-mono uppercase tracking-wider block text-[10px] mb-1">Definition</strong>
                        <p className="text-white/80 font-sans leading-relaxed">{llmo.entities[activeEntityIndex].definition}</p>
                      </div>

                      <div>
                        <strong className="text-white/40 font-mono uppercase tracking-wider block text-[10px] mb-1">Primary Purpose</strong>
                        <p className="text-white/70 font-sans leading-relaxed">{llmo.entities[activeEntityIndex].purpose}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
                        <div>
                          <strong className="text-[#10B981] font-mono uppercase tracking-wider block text-[10px] mb-1">Dependencies</strong>
                          <ul className="text-white/60 font-mono text-xs space-y-1">
                            {llmo.entities[activeEntityIndex].dependencies.map((d, i) => (<li key={i}>• {d}</li>))}
                          </ul>
                        </div>

                        <div>
                          <strong className="text-[#9C89D9] font-mono uppercase tracking-wider block text-[10px] mb-1">Alternatives</strong>
                          <ul className="text-white/60 font-mono text-xs space-y-1">
                            {llmo.entities[activeEntityIndex].alternatives.map((a, i) => (<li key={i}>• {a}</li>))}
                          </ul>
                        </div>

                        <div>
                          <strong className="text-rose-400 font-mono uppercase tracking-wider block text-[10px] mb-1">Limitations</strong>
                          <ul className="text-white/60 font-mono text-xs space-y-1">
                            {llmo.entities[activeEntityIndex].limitations.map((l, i) => (<li key={i}>• {l}</li>))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>)}

        {/* 3. Operational Troubleshooting Protocols */}
        {llmo.troubleshooting && llmo.troubleshooting.length > 0 && (<div className="space-y-6">
            <div className="flex items-center gap-3">
              <Wrench className="w-5 h-5 text-amber-400"/>
              <h3 className="text-xl font-medium text-white">Operational Diagnostics & Troubleshooting</h3>
            </div>

            <div className="overflow-x-auto border border-white/[0.08] rounded-2xl bg-[#08080c]">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                    <th className="p-4 font-mono text-amber-400 uppercase tracking-wider">Observed Symptom</th>
                    <th className="p-4 font-mono text-white/50 uppercase tracking-wider">Underlying Root Cause</th>
                    <th className="p-4 font-mono text-emerald-400 uppercase tracking-wider">Diagnostic Resolution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {llmo.troubleshooting.map((t, i) => (<tr key={i} className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-4 font-medium text-amber-300 font-mono">{t.symptom}</td>
                      <td className="p-4 text-white/60 font-sans">{t.rootCause}</td>
                      <td className="p-4 text-emerald-400 font-sans font-medium">{t.resolution}</td>
                    </tr>))}
                </tbody>
              </table>
            </div>
          </div>)}

      </div>
    </section>);
}
