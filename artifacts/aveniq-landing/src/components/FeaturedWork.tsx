import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Nexora CRM",
    desc: "AI-powered customer relationship management built for modern high-performance sales teams.",
    gradient: "from-[#6750A4]/30 via-black/60 to-black",
    accentColor: "rgba(103,80,164,0.6)",
    tag: "SaaS · AI",
  },
  {
    title: "FlowSync",
    desc: "Workflow automation platform connecting 200+ microservices and data pipelines seamlessly.",
    gradient: "from-blue-900/30 via-black/60 to-black",
    accentColor: "rgba(59,130,246,0.5)",
    tag: "Automation",
  },
  {
    title: "Beacon Analytics",
    desc: "Real-time stream processing and visualization dashboard for web-scale businesses.",
    gradient: "from-emerald-900/30 via-black/60 to-black",
    accentColor: "rgba(16,185,129,0.5)",
    tag: "Analytics",
  },
];

export default function FeaturedWork() {
  const reduce = useReducedMotion();

  return (
    <section id="portfolio" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-3 text-white">What We've Shipped</h2>
            <p className="text-white/60 text-sm md:text-base max-w-[50ch] font-light">A glimpse at the digital realities we've built for clients.</p>
          </div>
          <button className="text-[#9C89D9] text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-[gap] duration-200 shrink-0 cursor-pointer active:scale-95">
            View All Projects <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              className={`group relative h-[340px] sm:h-[400px] lg:h-[420px] rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-b ${proj.gradient} transition-[border-color,transform] duration-300 hover:border-white/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer`}
            >
              {/* Glow orb */}
              <div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[60px] opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                style={{ background: proj.accentColor }}
              />

              {/* Tag */}
              <div className="absolute top-6 left-6">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-white/50 border border-white/10 px-3.5 py-1.5 rounded-full bg-black/20 backdrop-blur-sm">
                  {proj.tag}
                </span>
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-8 z-10">
                <h3 className="text-xl font-semibold mb-2.5 text-white">{proj.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed mb-6 font-light">{proj.desc}</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#9C89D9] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  View Case Study <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
