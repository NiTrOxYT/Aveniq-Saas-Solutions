import { motion, useReducedMotion } from "framer-motion";
import { Award, Zap, DollarSign, Cpu, Headphones, RefreshCcw, Users, Database, } from "lucide-react";
const WHY_ITEMS = [
    {
        icon: Award,
        title: "Enterprise quality",
        body: "Senior engineers with 5-10 years of production experience on every project. No juniors working unsupervised.",
        span: "lg:col-span-2",
        bg: "radial-gradient(circle at top left, rgba(16,185,129,0.08) 0%, transparent 60%)",
        border: "group-hover:border-emerald-500/30",
    },
    {
        icon: Zap,
        title: "Fast delivery",
        body: "Iterative sprints with working software every 2 weeks. No 6-month silences before you see results.",
        span: "lg:col-span-1",
        bg: "radial-gradient(circle at top left, rgba(103,80,164,0.06) 0%, transparent 60%)",
        border: "group-hover:border-[#6750A4]/30",
    },
    {
        icon: DollarSign,
        title: "Transparent pricing",
        body: "Fixed-price projects with milestone-based payments. No hourly billing surprises or open-ended engagements.",
        span: "lg:col-span-1",
        bg: "radial-gradient(circle at top left, rgba(103,80,164,0.06) 0%, transparent 60%)",
        border: "group-hover:border-[#6750A4]/30",
    },
    {
        icon: Cpu,
        title: "Modern technologies",
        body: "React, Next.js, TypeScript, Python, Supabase — battle-tested, widely supported, and not end-of-life in 18 months.",
        span: "lg:col-span-1",
        bg: "radial-gradient(circle at top left, rgba(103,80,164,0.06) 0%, transparent 60%)",
        border: "group-hover:border-[#6750A4]/30",
    },
    {
        icon: Headphones,
        title: "Dedicated support",
        body: "Direct Slack access to your engineering team. 24-hour SLA for critical issues during and after launch.",
        span: "lg:col-span-2",
        bg: "radial-gradient(circle at top left, rgba(103,80,164,0.08) 0%, transparent 60%)",
        border: "group-hover:border-[#6750A4]/40",
    },
    {
        icon: RefreshCcw,
        title: "Agile workflow",
        body: "2-week sprint cycles with sprint reviews, demos, and planning sessions. You see progress every week.",
        span: "lg:col-span-1",
        bg: "radial-gradient(circle at top left, rgba(103,80,164,0.06) 0%, transparent 60%)",
        border: "group-hover:border-[#6750A4]/30",
    },
    {
        icon: Users,
        title: "Senior engineers",
        body: "Every Aveniq project is led by engineers who have built and scaled production systems used by real businesses.",
        span: "lg:col-span-2",
        bg: "radial-gradient(circle at top left, rgba(148,163,184,0.08) 0%, transparent 60%)",
        border: "group-hover:border-slate-400/30",
    },
    {
        icon: Database,
        title: "Scalable architecture",
        body: "Systems designed to grow from 100 to 100,000 users without architectural rewrites or emergency migrations.",
        span: "lg:col-span-2",
        bg: "radial-gradient(circle at top left, rgba(156,137,217,0.09) 0%, transparent 60%)",
        border: "group-hover:border-[#9C89D9]/40",
    },
];
export function WhyAveniqService() {
    const reduce = useReducedMotion();
    return (<section className="py-28 px-4 sm:px-6 relative z-10 border-t border-white/[0.04] bg-[#020202]">
      {/* Ambient left-glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 50% 60% at 10% 50%, rgba(103,80,164,0.04) 0%, transparent 70%)",
        }} aria-hidden="true"/>

      <div className="max-w-7xl mx-auto relative">
        {/* Header — left-aligned, no eyebrow */}
        <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }} className="mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-medium text-white mb-5 tracking-tight leading-tight animate-fade-in" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Why engineering teams choose Aveniq
          </h2>
          <p className="text-white/40 text-base font-light leading-relaxed max-w-[55ch]">
            Eight commitments we make on every project — not marketing language, measurable standards.
          </p>
        </motion.div>

        {/* Bento Grid — Gapless 4-column interlocking layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.05] grid-flow-row-dense">
          {WHY_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (<motion.div key={i} initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{
                    duration: 0.6,
                    delay: i * 0.05,
                    ease: [0.23, 1, 0.32, 1],
                }} className={`group relative flex flex-col gap-5 p-8 bg-[#070709] transition-all duration-500 overflow-hidden border border-transparent ${item.span} ${item.border}`}>
                {/* Physical edge highlight card overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: item.bg }}/>

                {/* Grid Overlay lines in background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20"/>

                {/* Tactile Icon */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-105" style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <Icon className="w-4 h-4 text-[#9C89D9] group-hover:text-white transition-colors duration-300" strokeWidth={1.5}/>
                </div>

                {/* Text Block */}
                <div className="relative z-10 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-2 tracking-tight transition-colors duration-300 group-hover:text-white">
                      {item.title}
                    </h3>
                    <p className="text-white/40 text-xs leading-relaxed font-light transition-colors duration-300 group-hover:text-white/60">
                      {item.body}
                    </p>
                  </div>
                </div>

                {/* Ambient glow corner strip */}
                <div className="absolute top-0 right-0 w-[40px] h-[1px] bg-gradient-to-l from-[#9C89D9]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                <div className="absolute bottom-0 left-0 h-[40px] w-[1px] bg-gradient-to-t from-[#9C89D9]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
              </motion.div>);
        })}
        </div>
      </div>
    </section>);
}
