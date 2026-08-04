import { motion, useReducedMotion } from "framer-motion";
import type { ServiceConfig, TechItem } from "@/data/serviceData";

interface TechStackProps {
  service: ServiceConfig;
}

// Group tech items by category
function groupByCategory(items: TechItem[]): Record<string, TechItem[]> {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, TechItem[]>);
}

export function TechStack({ service }: TechStackProps) {
  const { techStack } = service;
  const reduce = useReducedMotion();
  const grouped = groupByCategory(techStack);
  const categories = Object.keys(grouped);

  return (
    <section className="py-28 px-4 sm:px-6 relative z-10 border-t border-white/[0.04] bg-black">
      {/* Ambient right glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 90% 50%, rgba(103,80,164,0.04) 0%, transparent 70%)",
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
            Technology stack
          </h2>
          <p className="text-white/40 text-base font-light leading-relaxed max-w-[50ch]">
            Modern, battle-tested tools — not bleeding-edge experiments that break in production.
          </p>
        </motion.div>

        {/* Category groups — styled in a premium grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((category, ci) => (
            <motion.div
              key={category}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: ci * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="p-8 rounded-2xl border border-white/[0.08] hover:border-white/[0.18] bg-white/[0.03] backdrop-blur-[20px] shadow-[0_30px_80px_rgba(0,0,0,0.35)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden group"
            >
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />

              {/* Glowing vertical index marker */}
              <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#6750A4]/40 to-transparent" />

              {/* Category label */}
              <h3 className="text-[10px] font-mono text-[#9C89D9] uppercase tracking-[0.25em] mb-6 pl-4">
                {category}
              </h3>

              {/* Tech cards row */}
              <div className="flex flex-wrap gap-2.5 pl-4">
                {grouped[category].map((tech, ti) => (
                  <motion.div
                    key={tech.name}
                    initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.4,
                      delay: ci * 0.05 + ti * 0.04,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="group/tech flex items-center gap-3 px-4.5 py-2.5 rounded-lg border border-white/[0.05] bg-black/40 hover:border-[#6750A4]/40 hover:bg-black transition-all duration-300 cursor-default relative overflow-hidden"
                  >
                    {/* Corner notch decoration */}
                    <div className="absolute top-0 right-0 w-[4px] h-[4px] border-r border-t border-white/20 opacity-40 group-hover/tech:opacity-100 transition-opacity" />

                    {/* Simple Icons CDN logo */}
                    <img
                      src={`https://cdn.simpleicons.org/${tech.iconSlug}/ffffff`}
                      alt={tech.name}
                      width={14}
                      height={14}
                      className="w-3.5 h-3.5 opacity-40 group-hover/tech:opacity-90 group-hover/tech:scale-105 transition-all duration-300"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        // Fallback: hide broken icon
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <span className="text-white/50 text-xs font-mono tracking-tight group-hover/tech:text-white transition-colors duration-300">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Card visual borders */}
              <div className="absolute top-0 right-0 w-[20px] h-[1px] bg-[#6750A4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 h-[20px] w-[1px] bg-[#6750A4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
