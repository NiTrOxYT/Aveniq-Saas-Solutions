import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  Zap,
  DollarSign,
  Cpu,
  Headphones,
  RefreshCcw,
  Users,
  Database,
} from "lucide-react";

const WHY_ITEMS = [
  {
    icon: Award,
    title: "Enterprise quality",
    body: "Senior engineers with 5-10 years of production experience on every project. No juniors working unsupervised.",
  },
  {
    icon: Zap,
    title: "Fast delivery",
    body: "Iterative sprints with working software every 2 weeks. No 6-month silences before you see results.",
  },
  {
    icon: DollarSign,
    title: "Transparent pricing",
    body: "Fixed-price projects with milestone-based payments. No hourly billing surprises or open-ended engagements.",
  },
  {
    icon: Cpu,
    title: "Modern technologies",
    body: "React, Next.js, TypeScript, Python, Supabase — battle-tested, widely supported, and not end-of-life in 18 months.",
  },
  {
    icon: Headphones,
    title: "Dedicated support",
    body: "Direct Slack access to your engineering team. 24-hour SLA for critical issues during and after launch.",
  },
  {
    icon: RefreshCcw,
    title: "Agile workflow",
    body: "2-week sprint cycles with sprint reviews, demos, and planning sessions. You see progress every week.",
  },
  {
    icon: Users,
    title: "Senior engineers",
    body: "Every Aveniq project is led by engineers who have built and scaled production systems used by real businesses.",
  },
  {
    icon: Database,
    title: "Scalable architecture",
    body: "Systems designed to grow from 100 to 100,000 users without architectural rewrites or emergency migrations.",
  },
] as const;

export function WhyAveniqService() {
  const reduce = useReducedMotion();

  return (
    <section className="py-28 px-4 sm:px-6 relative z-10 border-t border-white/[0.04]">
      {/* Ambient left-glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 10% 50%, rgba(103,80,164,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative">

        {/* Header — left-aligned, no eyebrow */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 max-w-2xl"
        >
          <h2
            className="text-3xl md:text-5xl font-medium text-white mb-5 tracking-tight leading-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Why engineering teams choose Aveniq
          </h2>
          <p className="text-white/40 text-base font-light leading-relaxed max-w-[55ch]">
            Eight commitments we make on every project — not marketing language, measurable standards.
          </p>
        </motion.div>

        {/* 4×2 bento grid — gapless, varied cell sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.04]">
          {WHY_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="group relative flex flex-col gap-4 p-8 bg-[#09090b] hover:bg-[#0e0e12] transition-colors duration-300 overflow-hidden"
              >
                {/* Hover corner glow */}
                <div
                  className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at top left, rgba(103,80,164,0.08), transparent 60%)",
                  }}
                />

                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(103,80,164,0.12)",
                    border: "1px solid rgba(103,80,164,0.2)",
                  }}
                >
                  <Icon
                    className="w-4 h-4 text-[#9C89D9]"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-white font-semibold text-sm mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed font-light">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
