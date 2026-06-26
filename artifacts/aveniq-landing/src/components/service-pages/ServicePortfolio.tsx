import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useProjects } from "@/hooks/use-projects";
import type { ServiceConfig } from "@/data/serviceData";

interface ServicePortfolioProps {
  service: ServiceConfig;
}

export function ServicePortfolio({ service }: ServicePortfolioProps) {
  const { projects, loading } = useProjects();
  const reduce = useReducedMotion();

  // Filter to relevant projects by tag, fallback to all published
  const relevant = projects.filter(
    (p) =>
      p.status === "Published" &&
      service.portfolioTags.some((tag) =>
        p.tag?.toLowerCase().includes(tag.toLowerCase())
      )
  );

  // Fallback: show first 4 published projects if no tag match
  const displayed =
    relevant.length > 0
      ? relevant.slice(0, 4)
      : projects.filter((p) => p.status === "Published").slice(0, 4);

  if (loading || displayed.length === 0) return null;

  return (
    <section className="py-28 px-4 sm:px-6 relative z-10 border-t border-white/[0.04]">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 30%, rgba(103,80,164,0.04) 0%, transparent 70%)",
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
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2
              className="text-3xl md:text-5xl font-medium text-white mb-4 tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Recent work
            </h2>
            <p className="text-white/40 text-base font-light max-w-[50ch] leading-relaxed">
              A selection of projects that demonstrate our capabilities in this space.
            </p>
          </div>

          <Link
            href="/#portfolio"
            className="group text-[#9C89D9] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:text-white transition-colors duration-300 shrink-0"
          >
            View all projects
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayed.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: [0.23, 1, 0.32, 1],
              }}
              onClick={() => proj.link && window.open(proj.link, "_blank", "noopener,noreferrer")}
              className="group flex flex-col bg-[#08080a] border border-white/[0.06] hover:border-white/[0.12] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/80 hover:-translate-y-[2px] cursor-pointer"
            >
              {/* Browser chrome */}
              <div className="h-9 bg-[#0b0b0d] border-b border-white/[0.04] flex items-center px-4 shrink-0">
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/[0.08]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/[0.08]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/[0.08]" />
                </div>
                <div className="w-24 h-3 bg-white/[0.03] rounded-md mx-auto" />
              </div>

              {/* Screenshot */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-950">
                {proj.imageUrl ? (
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white/20 text-xs uppercase tracking-widest font-mono">
                    {proj.tag}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-grow">
                <span className="text-[10px] tracking-[0.2em] font-mono uppercase text-white/30 mb-3 block">
                  {proj.tag}
                </span>
                <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
                  {proj.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed font-light mb-6 line-clamp-3">
                  {proj.desc}
                </p>
                <div className="mt-auto">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#9C89D9] group-hover:text-white transition-colors duration-300 inline-flex items-center gap-1.5">
                    View project
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
