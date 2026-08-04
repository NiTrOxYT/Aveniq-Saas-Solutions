import { useReducedMotion } from "framer-motion";
import { ArrowRight, Code2, Users, Cpu } from "lucide-react";
import { useLocation } from "wouter";
export default function WhyAveniq() {
    const reduce = useReducedMotion();
    const [, navigate] = useLocation();
    return (<section id="about" className="py-32 px-6 relative z-10 border-t border-white/[0.04] bg-[#020202]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{
            background: "radial-gradient(circle at 80% 50%, rgba(103,80,164,0.06) 0%, transparent 60%)",
        }}/>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Thesis & Stance */}
          <div className="lg:col-span-5">
            <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#9C89D9] mb-4">
              Our Stance & Standards
            </p>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-6 leading-[1.15]" style={{ letterSpacing: "-0.02em" }}>
              We design and build systems designed for <span className="italic text-white/70">unlimited scale</span>.
            </h2>
            <p className="text-white/45 text-sm md:text-base font-light leading-relaxed mb-8 max-w-[45ch]">
              Aveniq is an elite collective of senior systems architects, full-stack engineers, and cloud specialists. We work as dedicated partners to build products, automate internal operations, and protect data integrity.
            </p>
            <button onClick={() => navigate("/about")} className="group text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:text-[#9C89D9] transition-colors duration-300 cursor-pointer">
              Read Our Engineering Philosophy
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300"/>
            </button>
          </div>

          {/* Right Column: Key Pillars (Bento-style list) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Pillar 1: SaaS Architecture */}
            <div className="p-6 rounded-xl border border-white/[0.06] bg-zinc-950/40 hover:border-[#6750A4]/40 hover:bg-zinc-900/40 transition-all duration-300 flex flex-col justify-between min-h-[220px]">
              <div>
                <Cpu className="w-5 h-5 text-[#9C89D9] mb-4"/>
                <h3 className="text-white font-medium text-base mb-2">Multi-Tenant Platforms</h3>
                <p className="text-white/40 text-xs leading-relaxed font-light">
                  We build high-availability architectures using PostgreSQL, Supabase RLS, and secure microservices. Optimized for rapid customer growth.
                </p>
              </div>
              <button onClick={() => navigate("/saas-development")} className="text-[11px] font-semibold text-[#9C89D9] hover:underline flex items-center gap-1 mt-6 w-fit">
                SaaS Engineering <ArrowRight className="w-3 h-3"/>
              </button>
            </div>

            {/* Pillar 2: AI Orchestration */}
            <div className="p-6 rounded-xl border border-white/[0.06] bg-zinc-950/40 hover:border-[#6750A4]/40 hover:bg-zinc-900/40 transition-all duration-300 flex flex-col justify-between min-h-[220px]">
              <div>
                <Users className="w-5 h-5 text-[#9C89D9] mb-4"/>
                <h3 className="text-white font-medium text-base mb-2">Intelligent AI Workflows</h3>
                <p className="text-white/40 text-xs leading-relaxed font-light">
                  We deploy automated AI agents, vector database retrievers (RAG), and Model Context Protocol servers to automate manual bottlenecks.
                </p>
              </div>
              <button onClick={() => navigate("/ai-automation-development")} className="text-[11px] font-semibold text-[#9C89D9] hover:underline flex items-center gap-1 mt-6 w-fit">
                AI Automations <ArrowRight className="w-3 h-3"/>
              </button>
            </div>

            {/* Pillar 3: Code Rigor */}
            <div className="p-6 rounded-xl border border-white/[0.06] bg-zinc-950/40 hover:border-[#6750A4]/40 hover:bg-zinc-900/40 transition-all duration-300 flex flex-col justify-between min-h-[220px]">
              <div>
                <Code2 className="w-5 h-5 text-[#9C89D9] mb-4"/>
                <h3 className="text-white font-medium text-base mb-2">Uncompromising QA</h3>
                <p className="text-white/40 text-xs leading-relaxed font-light">
                  TypeScript strict type safety, end-to-end integration test suites, and strict peer code reviews verify reliability at build time.
                </p>
              </div>
              <button onClick={() => navigate("/trust/engineering-standards")} className="text-[11px] font-semibold text-[#9C89D9] hover:underline flex items-center gap-1 mt-6 w-fit">
                Read QA Standards <ArrowRight className="w-3 h-3"/>
              </button>
            </div>

            {/* Pillar 4: Mobile & Multiplatform */}
            <div className="p-6 rounded-xl border border-white/[0.06] bg-zinc-950/40 hover:border-[#6750A4]/40 hover:bg-zinc-900/40 transition-all duration-300 flex flex-col justify-between min-h-[220px]">
              <div>
                <Users className="w-5 h-5 text-[#9C89D9] mb-4"/>
                <h3 className="text-white font-medium text-base mb-2">Polished Experiences</h3>
                <p className="text-white/40 text-xs leading-relaxed font-light">
                  Native iOS, Android, and Web platforms designed with fluid typography, responsive layout structures, and fast load times.
                </p>
              </div>
              <button onClick={() => navigate("/mobile-app-development")} className="text-[11px] font-semibold text-[#9C89D9] hover:underline flex items-center gap-1 mt-6 w-fit">
                Mobile Apps <ArrowRight className="w-3 h-3"/>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>);
}
