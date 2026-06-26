import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import type { ServiceConfig } from "@/data/serviceData";

interface ServiceOverviewProps {
  service: ServiceConfig;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] as const },
  }),
};

export function ServiceOverview({ service }: ServiceOverviewProps) {
  const { overview } = service;
  const reduce = useReducedMotion();

  return (
    <section className="py-28 px-4 sm:px-6 relative z-10 border-t border-white/[0.04]">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(103,80,164,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative">

        {/* ─── What It Is / Who It's For ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          {[overview.whatItIs, overview.whoItsFor].map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial={reduce ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <h2
                className="text-2xl md:text-3xl font-medium text-white mb-5 tracking-tight leading-snug"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {item.title}
              </h2>
              <p
                className="text-white/50 leading-relaxed font-light"
                style={{ fontSize: "1rem", maxWidth: "55ch" }}
              >
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ─── Business Benefits ─── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-24"
        >
          <h3
            className="text-xl md:text-2xl font-medium text-white mb-10 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Business benefits that move the needle
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {overview.businessBenefits.map((benefit, i) => (
              <motion.div
                key={i}
                custom={i}
                initial={reduce ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="flex items-start gap-3 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1] transition-colors duration-300 group"
              >
                <CheckCircle
                  className="w-4 h-4 mt-0.5 shrink-0 text-[#9C89D9]"
                  strokeWidth={1.5}
                />
                <span className="text-white/65 text-sm leading-relaxed font-light group-hover:text-white/80 transition-colors duration-300">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── Use Cases ─── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <h3
            className="text-xl md:text-2xl font-medium text-white mb-10 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Real-world outcomes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {overview.useCases.map((uc, i) => (
              <motion.div
                key={i}
                custom={i}
                initial={reduce ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="relative p-7 rounded-2xl border border-white/[0.06] bg-[#08080a] hover:border-white/[0.1] transition-all duration-300 group overflow-hidden"
              >
                {/* Corner accent */}
                <div
                  className="absolute top-0 left-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at top left, rgba(103,80,164,0.12), transparent 70%)",
                  }}
                />

                {/* Industry tag */}
                <span
                  className="text-[10px] tracking-[0.2em] font-mono uppercase text-[#9C89D9] mb-4 block"
                >
                  {uc.industry}
                </span>

                {/* Problem */}
                <div className="mb-4">
                  <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-2">
                    The challenge
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed font-light">
                    {uc.problem}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <ArrowRight className="w-3 h-3 text-[#9C89D9]" strokeWidth={2} />
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                {/* Outcome */}
                <div>
                  <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-2">
                    The outcome
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed font-medium">
                    {uc.outcome}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
