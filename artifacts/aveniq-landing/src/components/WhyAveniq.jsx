import { motion, useReducedMotion } from "framer-motion";
import { Zap, Lightbulb, Shield } from "lucide-react";
const pillars = [
    {
        icon: Zap,
        title: "Speed",
        desc: "We deliver rapidly without compromising quality. Our modern development pipelines and automated testing ensure swift execution and deployment."
    },
    {
        icon: Lightbulb,
        title: "Innovation",
        desc: "We implement cutting-edge solutions built on proven technologies. We choose the optimal tools for your specific business requirements."
    },
    {
        icon: Shield,
        title: "Reliability",
        desc: "We architect resilient systems that scale effortlessly. Built with multi-layered monitoring, backup automation, and high-availability default setups."
    },
];
export default function WhyAveniq() {
    const reduce = useReducedMotion();
    return (<section id="about" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <motion.h2 initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} className="font-serif text-4xl sm:text-5xl md:text-6xl text-center mb-20 text-white">
          Why Businesses Choose Us
        </motion.h2>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (<motion.div key={i} initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }} className="pillar-card group p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#6750A4]/40 hover:bg-white/[0.04] transition-[border-color,background-color] duration-300 cursor-default">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6750A4]/20 to-[#9C89D9]/20 border border-[#6750A4]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <p.icon className="w-5 h-5 text-[#9C89D9]" strokeWidth={1.5}/>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">{p.title}</h3>
              <p className="text-white/60 text-xs leading-relaxed font-light">{p.desc}</p>
            </motion.div>))}
        </div>
      </div>
    </section>);
}
