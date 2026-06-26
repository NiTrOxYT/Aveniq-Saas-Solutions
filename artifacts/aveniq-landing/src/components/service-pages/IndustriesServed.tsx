import { motion, useReducedMotion } from "framer-motion";

const INDUSTRIES = [
  {
    name: "Healthcare",
    icon: "🏥",
    description: "HIPAA-compliant patient portals, clinical workflow automation, and telehealth platforms.",
    accent: "from-[#1a3a2a] to-[#0d1f16]",
  },
  {
    name: "Finance",
    icon: "📊",
    description: "Regulatory-compliant fintech, trading dashboards, and automated accounting systems.",
    accent: "from-[#1a2a3a] to-[#0d1620]",
  },
  {
    name: "Education",
    icon: "🎓",
    description: "LMS platforms, AI-powered tutoring tools, and institutional management systems.",
    accent: "from-[#2a1a3a] to-[#160d20]",
  },
  {
    name: "Hospitality",
    icon: "🏨",
    description: "Guest experience apps, property management, and reservation optimization platforms.",
    accent: "from-[#3a2a1a] to-[#20160d]",
  },
  {
    name: "Retail",
    icon: "🛍️",
    description: "Headless e-commerce, inventory intelligence, and omnichannel customer experiences.",
    accent: "from-[#1a3a3a] to-[#0d2020]",
  },
  {
    name: "Manufacturing",
    icon: "🏭",
    description: "Production floor monitoring, supply chain visibility, and quality assurance platforms.",
    accent: "from-[#3a1a1a] to-[#200d0d]",
  },
  {
    name: "Real Estate",
    icon: "🏢",
    description: "Property listing platforms, CRM systems, and automated valuation and reporting tools.",
    accent: "from-[#2a3a1a] to-[#16200d]",
  },
  {
    name: "Startups",
    icon: "🚀",
    description: "MVPs, full product builds, and technical foundations designed for rapid iteration and investor due diligence.",
    accent: "from-[#3a1a3a] to-[#200d20]",
  },
] as const;

export function IndustriesServed() {
  const reduce = useReducedMotion();

  return (
    <section className="py-28 px-4 sm:px-6 relative z-10 border-t border-white/[0.04]">
      {/* Center ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(103,80,164,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 max-w-2xl"
        >
          <h2
            className="text-3xl md:text-5xl font-medium text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Industries we serve
          </h2>
          <p className="text-white/40 text-base font-light leading-relaxed max-w-[50ch]">
            Deep domain understanding across eight industries means we ask the right questions before writing the first line of code.
          </p>
        </motion.div>

        {/* Industry grid — 4×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INDUSTRIES.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.23, 1, 0.32, 1],
              }}
              className={`group relative p-7 rounded-2xl border border-white/[0.06] bg-gradient-to-br ${industry.accent} hover:border-white/[0.1] transition-all duration-400 overflow-hidden`}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#6750A4]/0 group-hover:bg-[#6750A4]/[0.04] transition-colors duration-400 pointer-events-none rounded-2xl" />

              {/* Icon — text-based for reliability */}
              <div className="text-2xl mb-4" aria-hidden="true">
                {industry.icon}
              </div>

              <h3 className="text-white font-semibold text-sm mb-2 tracking-tight">
                {industry.name}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed font-light">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
