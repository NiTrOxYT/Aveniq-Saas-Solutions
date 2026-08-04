import { motion, useReducedMotion } from "framer-motion";
import { Activity, TrendingUp, GraduationCap, Hotel, ShoppingBag, Factory, Building2, Rocket, } from "lucide-react";
const INDUSTRIES = [
    {
        name: "Healthcare",
        icon: Activity,
        description: "HIPAA-compliant patient portals, clinical workflow automation, and telehealth platforms.",
        glow: "rgba(59,130,246,0.06)",
        hoverBorder: "group-hover:border-blue-500/30",
    },
    {
        name: "Finance",
        icon: TrendingUp,
        description: "Regulatory-compliant fintech, trading dashboards, and automated accounting systems.",
        glow: "rgba(16,185,129,0.06)",
        hoverBorder: "group-hover:border-emerald-500/30",
    },
    {
        name: "Education",
        icon: GraduationCap,
        description: "LMS platforms, AI-powered tutoring tools, and institutional management systems.",
        glow: "rgba(103,80,164,0.06)",
        hoverBorder: "group-hover:border-[#6750A4]/35",
    },
    {
        name: "Hospitality",
        icon: Hotel,
        description: "Guest experience apps, property management, and reservation optimization platforms.",
        glow: "rgba(245,158,11,0.05)",
        hoverBorder: "group-hover:border-amber-500/20",
    },
    {
        name: "Retail & E-commerce",
        icon: ShoppingBag,
        description: "Headless e-commerce, inventory intelligence, and omnichannel customer experiences.",
        glow: "rgba(236,72,153,0.06)",
        hoverBorder: "group-hover:border-pink-500/30",
    },
    {
        name: "Manufacturing & Logistics",
        icon: Factory,
        description: "Production floor monitoring, supply chain visibility, and quality assurance platforms.",
        glow: "rgba(100,116,139,0.06)",
        hoverBorder: "group-hover:border-slate-400/30",
    },
    {
        name: "Real Estate",
        icon: Building2,
        description: "Property listing platforms, CRM systems, and automated valuation and reporting tools.",
        glow: "rgba(16,185,129,0.05)",
        hoverBorder: "group-hover:border-emerald-500/25",
    },
    {
        name: "Fast-Growth Startups",
        icon: Rocket,
        description: "MVPs, full product builds, and technical foundations designed for rapid iteration and investor due diligence.",
        glow: "rgba(156,137,217,0.09)",
        hoverBorder: "group-hover:border-[#9C89D9]/40",
    },
];
export function IndustriesServed() {
    const reduce = useReducedMotion();
    return (<section className="py-28 px-4 sm:px-6 relative z-10 border-t border-white/[0.04] bg-[#020202]">
      {/* Background radial highlight */}
      <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(circle at 80% 80%, rgba(103,80,164,0.03) 0%, transparent 60%)",
        }} aria-hidden="true"/>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }} className="mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-medium text-white mb-4 tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Industries we serve
          </h2>
          <p className="text-white/40 text-base font-light leading-relaxed max-w-[50ch]">
            Deep domain understanding across eight industries means we ask the right questions before writing the first line of code.
          </p>
        </motion.div>

        {/* Industry grid — 4 columns on large screens with subtle animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES.map((industry, i) => {
            const Icon = industry.icon;
            return (<motion.div key={industry.name} initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{
                    duration: 0.5,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                }} className={`group relative p-7 rounded-2xl border border-white/[0.08] hover:border-white/[0.18] bg-white/[0.03] backdrop-blur-[20px] shadow-[0_30px_80px_rgba(0,0,0,0.35)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden`}>
                {/* Glow backdrop overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                    background: `radial-gradient(circle at 10% 10%, ${industry.glow} 0%, transparent 75%)`,
                }}/>

                {/* Grid Overlay lines in background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-20"/>

                {/* Icon wrapper */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mb-6 transition-transform duration-500 group-hover:scale-105" style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <Icon className="w-4 h-4 text-white/40 group-hover:text-[#9C89D9] transition-colors duration-300" strokeWidth={1.5}/>
                </div>

                <h3 className="text-white font-semibold text-sm mb-2 tracking-tight transition-colors duration-300 group-hover:text-white">
                  {industry.name}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed font-light transition-colors duration-300 group-hover:text-white/60">
                  {industry.description}
                </p>

                {/* Tactile border effects */}
                <div className="absolute top-0 right-0 w-[30px] h-[1px] bg-gradient-to-l from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                <div className="absolute bottom-0 left-0 h-[30px] w-[1px] bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
              </motion.div>);
        })}
        </div>
      </div>
    </section>);
}
