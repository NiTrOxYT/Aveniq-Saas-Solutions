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
    <section className="py-28 px-4 sm:px-6 relative z-10 border-t border-white/[0.04]">
      {/* Ambient right glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 90% 50%, rgba(103,80,164,0.05) 0%, transparent 70%)",
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
          className="mb-16"
        >
          <h2
            className="text-3xl md:text-5xl font-medium text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Technology stack
          </h2>
          <p className="text-white/40 text-base font-light max-w-[50ch] leading-relaxed">
            Modern, battle-tested tools — not bleeding-edge experiments that break in production.
          </p>
        </motion.div>

        {/* Category groups */}
        <div className="space-y-10">
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
            >
              {/* Category label */}
              <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.25em] mb-4">
                {category}
              </p>

              {/* Tech cards row */}
              <div className="flex flex-wrap gap-3">
                {grouped[category].map((tech, ti) => (
                  <motion.div
                    key={tech.name}
                    initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.4,
                      delay: ci * 0.06 + ti * 0.05,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-white/[0.06] bg-[#09090b] hover:border-[#6750A4]/40 hover:bg-[#0e0e12] transition-all duration-300 cursor-default"
                  >
                    {/* Simple Icons CDN logo */}
                    <img
                      src={`https://cdn.simpleicons.org/${tech.iconSlug}/ffffff`}
                      alt={tech.name}
                      width={16}
                      height={16}
                      className="w-4 h-4 opacity-50 group-hover:opacity-90 transition-opacity duration-300"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        // Fallback: hide broken icon
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <span className="text-white/60 text-sm font-medium group-hover:text-white/90 transition-colors duration-300">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
