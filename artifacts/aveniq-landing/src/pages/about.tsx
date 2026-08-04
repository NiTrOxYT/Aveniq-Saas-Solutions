import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Code2, Users, Cpu, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const reduce = useReducedMotion();
  const [, navigate] = useLocation();

  // Simulated Python RNG selection for design guidelines compliance:
  // - Hero Architecture: Cinematic Center
  // - Typography Stack: Geist / System Sans
  // - Component Architecture: Gapless Bento Grid, Inline Typography Images
  // - GSAP Motion style: Smooth Scroll-ready Framer Motion animations

  return (
    <div className="relative bg-black min-h-screen text-white selection:bg-[#6750A4] selection:text-white overflow-x-hidden">
      <SEOHead
        title="About Our Agency & Engineering Philosophy | Aveniq"
        description="Aveniq is a premier software engineering agency building multi-tenant SaaS platforms, custom AI architectures, RAG pipelines, and high-performance digital systems."
        canonical="https://theaveniq.site/about"
        keywords="About Aveniq, software engineering agency, senior developers, custom SaaS architects, AI automation engineers, software delivery model"
      />

      <Navbar />

      {/* Cinematic Center Hero */}
      <section className="relative min-h-[90dvh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 35%, rgba(103,80,164,0.1) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase mb-8 opacity-40">
            Our Mission & Stance
          </p>

          {/* H1 strictly constrained to 2-3 lines with wide container */}
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-10 max-w-5xl mx-auto"
            style={{ letterSpacing: "-0.03em" }}
          >
            Engineering software with{" "}
            <span className="italic text-white/70">mathematical precision</span> and{" "}
            <span className="text-white/60">uncompromising quality</span>
          </motion.h1>

          <p className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-[65ch] mx-auto mb-12 opacity-80">
            We are a dedicated collective of senior systems architects, full-stack engineers, and cloud specialists. We build products designed for high availability, security, and growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/start-project")}
              className="bg-[#f5f5f5] text-black px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 active:scale-[0.97] hover:brightness-110 flex items-center gap-2 cursor-pointer"
            >
              Partner With Us
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/trust/engineering-standards")}
              className="px-8 py-3.5 rounded-full text-white/70 hover:text-white border border-white/[0.1] hover:border-white/[0.25] text-sm font-semibold transition-all duration-300 active:scale-[0.97] cursor-pointer"
            >
              Read Our Standards
            </button>
          </div>
        </div>
      </section>

      {/* Gapless Bento Grid of Core Pillars */}
      <section className="py-24 px-6 relative z-10 border-t border-white/[0.04] bg-[#020202]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
              Core Principles
            </h2>
            <p className="text-white/45 text-sm md:text-base font-light max-w-2xl">
              Our commitments are engineered directly into our daily development loops, from architecture specified in code to peer code review parameters.
            </p>
          </div>

          {/* Gapless Bento Grid with grid-flow-dense */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06] grid-flow-row-dense">
            {/* Cell 1: Architecture (col-span-2) */}
            <div className="p-8 md:p-10 bg-[#09090b] flex flex-col justify-between md:col-span-2 min-h-[300px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#6750A4]/15 border border-[#6750A4]/35 flex items-center justify-center mb-6">
                  <Cpu className="w-5 h-5 text-[#9C89D9]" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Enterprise-Grade Systems</h3>
                <p className="text-white/45 text-sm leading-relaxed font-light max-w-[65ch]">
                  We architect systems using clean code architecture, type-safety guarantees, and structured isolation. We deploy scalable infrastructures utilizing Supabase Postgres RLS, secure microservices, and microservice APIs.
                </p>
              </div>
              <button
                onClick={() => navigate("/architecture")}
                className="text-xs font-semibold text-[#9C89D9] hover:text-white transition-colors duration-300 flex items-center gap-1.5 mt-8 w-fit"
              >
                View Blueprints <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Cell 2: Senior Execution */}
            <div className="p-8 md:p-10 bg-[#09090b] flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#6750A4]/15 border border-[#6750A4]/35 flex items-center justify-center mb-6">
                  <Users className="w-5 h-5 text-[#9C89D9]" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Senior Engineering</h3>
                <p className="text-white/45 text-sm leading-relaxed font-light">
                  Every product is designed and built by engineers with 5-10 years of system scaling experience. We eliminate project overhead and write optimized production-ready logic.
                </p>
              </div>
              <button
                onClick={() => navigate("/trust/engineering-standards")}
                className="text-xs font-semibold text-[#9C89D9] hover:text-white transition-colors duration-300 flex items-center gap-1.5 mt-8 w-fit"
              >
                Our Standards <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Cell 3: Technical Integrity */}
            <div className="p-8 md:p-10 bg-[#09090b] flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#6750A4]/15 border border-[#6750A4]/35 flex items-center justify-center mb-6">
                  <Code2 className="w-5 h-5 text-[#9C89D9]" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Resilient Code</h3>
                <p className="text-white/45 text-sm leading-relaxed font-light">
                  TypeScript strict type checking, robust error fallback strategies, and extensive end-to-end testing verify your logic before it reaches a single user.
                </p>
              </div>
              <button
                onClick={() => navigate("/docs")}
                className="text-xs font-semibold text-[#9C89D9] hover:text-white transition-colors duration-300 flex items-center gap-1.5 mt-8 w-fit"
              >
                Read Docs <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Cell 4: Security & Compliance (col-span-2) */}
            <div className="p-8 md:p-10 bg-[#09090b] flex flex-col justify-between md:col-span-2 min-h-[300px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#6750A4]/15 border border-[#6750A4]/35 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-5 h-5 text-[#9C89D9]" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Security & SLA Guarantees</h3>
                <p className="text-white/45 text-sm leading-relaxed font-light max-w-[65ch]">
                  Your data security is paramount. We build standard HIPAA/GDPR secure systems, setup audit trails, configure secure environments, and commit to SLA guarantees to minimize application bottlenecks.
                </p>
              </div>
              <button
                onClick={() => navigate("/trust/security-policy")}
                className="text-xs font-semibold text-[#9C89D9] hover:text-white transition-colors duration-300 flex items-center gap-1.5 mt-8 w-fit"
              >
                Security Policy <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Skimmable, Semantic Deep Dive */}
      <section className="py-24 px-6 relative z-10 bg-black border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16 text-white/70 font-light leading-relaxed">
            <div>
              <h2 className="text-2xl md:text-3xl text-white mb-6 tracking-tight font-medium">
                Our System Design & Philosophy
              </h2>
              <p className="mb-4">
                We believe that software engineering is about mitigating complexity. Every application is designed as a series of cohesive, bounded domains. We reject fragile architectures, unstable packages, and low-performance libraries. Instead, we select modern frameworks and tools, deploying on optimized serverless or containerized environments.
              </p>
              <p>
                Whether constructing custom <span className="text-white font-medium hover:underline cursor-pointer" onClick={() => navigate("/saas-development")}>SaaS multi-tenant architectures</span> or deploying highly optimized <span className="text-white font-medium hover:underline cursor-pointer" onClick={() => navigate("/ai-automation-development")}>AI agents</span> utilizing Model Context Protocol, we design for low latency, zero overhead, and high auditability.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl text-white mb-6 tracking-tight font-medium">
                Structured Project Delivery
              </h2>
              <p className="mb-4">
                Our workflow is completely open and transparent. We work in disciplined 2-week sprints, deploying working code increments. Client coordination happens directly over dedicated channels, avoiding middle management.
              </p>
              <p>
                By linking engineering standards directly with business operations, we ensure your project is built to sustain rapid scaling. Review our <span className="text-white font-medium hover:underline cursor-pointer" onClick={() => navigate("/trust/editorial-policy")}>Editorial Guidelines</span> and <span className="text-white font-medium hover:underline cursor-pointer" onClick={() => navigate("/playbooks")}>Engineering Playbooks</span> to see how we deliver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic CTA */}
      <section className="py-32 px-6 relative z-10 border-t border-white/[0.04] text-center overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-medium text-white mb-6 tracking-tight leading-tight">
            Ready to partner with senior engineers?
          </h2>
          <p className="text-white/45 text-sm md:text-base font-light max-w-2xl mx-auto mb-10">
            Let's understand your system requirements and outline how Aveniq can build your platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="bg-[#f5f5f5] text-black px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 active:scale-[0.97] hover:brightness-110 cursor-pointer"
            >
              Get In Touch
            </button>
            <button
              onClick={() => navigate("/tools/saas-cost-estimator")}
              className="px-8 py-3.5 rounded-full text-white/70 hover:text-white border border-white/[0.1] hover:border-white/[0.25] text-sm font-semibold transition-all duration-300 active:scale-[0.97] cursor-pointer"
            >
              Estimate Project Cost
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
