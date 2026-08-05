import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles, Folder, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ServiceAtmosphere } from "@/components/service-pages/ServiceAtmosphere";
import { useProjects, Project } from "@/hooks/use-projects";
import SEOHead from "@/components/SEOHead";

// Inner card component to isolate markup and avoid type-widening dynamic jsx issues
function ProjectCardInner({ proj, idx }: { proj: Project; idx: number }) {
  const getCardGlow = (i: number) => {
    const glows = [
      "radial-gradient(circle at top left, rgba(103,80,164,0.12) 0%, transparent 60%)",
      "radial-gradient(circle at top left, rgba(59,130,246,0.12) 0%, transparent 60%)",
      "radial-gradient(circle at top left, rgba(16,185,129,0.12) 0%, transparent 60%)",
      "radial-gradient(circle at top left, rgba(236,72,153,0.12) 0%, transparent 60%)",
    ];
    return glows[i % glows.length];
  };

  return (
    <>
      {/* Layered inner glow gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{ background: getCardGlow(idx) }}
      />

      {/* Browser Chrome header mockup */}
      <div className="h-10 bg-[#0a0a0c] border-b border-white/[0.04] flex items-center px-5 shrink-0 relative z-10">
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-white/[0.08] group-hover:bg-[#EF4444]/40 transition-colors" />
          <span className="w-2 h-2 rounded-full bg-white/[0.08] group-hover:bg-[#F59E0B]/40 transition-colors" />
          <span className="w-2 h-2 rounded-full bg-white/[0.08] group-hover:bg-[#10B981]/40 transition-colors" />
        </div>
        <div className="w-40 h-3.5 bg-white/[0.03] rounded-md mx-auto flex items-center justify-center text-[8px] font-mono text-white/20 select-none">
          {proj.link ? proj.link.replace(/^https?:\/\//, "") : "aveniq.site/portfolio"}
        </div>
      </div>

      {/* Image / Cover area */}
      <div className="h-64 relative bg-[#09090b] overflow-hidden shrink-0">
        {proj.imageUrl ? (
          <img
            src={proj.imageUrl}
            alt={proj.title}
            loading="lazy"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.025] transition-all duration-700"
          />
        ) : (
          /* Dynamic high-end tech mesh fallback background if no image exists */
          <div
            className="w-full h-full relative"
            style={{
              background: "radial-gradient(circle at center, #101524 0%, #030407 100%)",
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-[#9C89D9]/20 group-hover:text-[#9C89D9]/60 transition-colors duration-500" />
              <span className="text-[10px] font-mono tracking-widest text-white/10 uppercase">
                Aveniq Production Shell
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Meta info card content */}
      <div className="p-8 flex flex-col justify-between grow relative z-10">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] uppercase tracking-wider font-semibold text-[#9C89D9] bg-[#6750A4]/15 px-3 py-1 rounded-full border border-[#9C89D9]/15">
              {proj.tag || "Production"}
            </span>
            {proj.link && (
              <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            )}
          </div>
          <h3 className="text-white font-medium text-xl mb-3 group-hover:text-[#9C89D9] transition-colors duration-300">
            {proj.title}
          </h3>
          <p className="text-white/45 text-sm font-light leading-relaxed max-w-[45ch]">
            {proj.desc}
          </p>
        </div>

        {proj.link && (
          <div className="mt-8 pt-6 border-t border-white/[0.04] flex items-center gap-2 text-xs font-semibold text-white/30 group-hover:text-white transition-colors duration-300">
            Visit Project Site
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform duration-300" />
          </div>
        )}
      </div>
    </>
  );
}

export default function PortfolioPage() {
  const { projects, loading } = useProjects();
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState("All");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Filter out draft projects (only show Published)
  const published = projects.filter((p) => p.status === "Published");

  // Dynamically extract categories from tags
  const tags = ["All", ...Array.from(new Set(published.map((p) => p.tag).filter(Boolean)))];

  const filteredProjects = filter === "All"
    ? published
    : published.filter((p) => p.tag === filter);

  return (
    <div className="relative bg-black min-h-screen text-white selection:bg-[#6750A4] selection:text-white overflow-x-hidden">
      <SEOHead
        title="Our Portfolio — Selected Engineering Works & SaaS Deliveries"
        description="Browse our selected engineering works, custom SaaS platforms, AI automation systems, and mobile applications custom-built by Aveniq."
        canonical="https://theaveniq.site/portfolio"
        keywords="Aveniq portfolio, software projects, SaaS case studies, AI automation works, mobile app designs"
      />

      {/* Atmospheric mesh gradient engine */}
      <ServiceAtmosphere />
      <Navbar />

      <main className="relative z-10 pt-32 md:pt-40 pb-32 max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-20">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-mono tracking-[0.3em] uppercase text-white mb-6"
          >
            Engineering Portfolio
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as any }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl mb-6 text-white tracking-tight leading-[1.1]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Selected{" "}
            <span
              style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, #C4B5FD 55%, #9C89D9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Commissions
            </span>
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] as any }}
            className="text-white/45 text-base md:text-lg font-light leading-relaxed max-w-[55ch] font-sans"
            style={{ fontFamily: "Barlow, sans-serif" }}
          >
            A curated overview of systems we have designed, architected, and deployed. From seed-stage SaaS platforms to enterprise workflow automations.
          </motion.p>
        </div>

        {/* Dynamic Category Filters */}
        {!loading && tags.length > 2 && (
          <div className="flex flex-wrap gap-2.5 mb-16 border-b border-white/[0.04] pb-8 relative z-20">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`relative px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                  filter === tag
                    ? "text-white bg-[#6750A4]/30 border border-[#9C89D9]/40"
                    : "text-white/40 bg-white/[0.01] hover:bg-white/[0.03] hover:text-white border border-white/[0.05]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Projects Display */}
        {loading ? (
          /* Loading State: Premium skeletons */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[420px] rounded-3xl border border-white/[0.06] bg-white/[0.01] animate-pulse overflow-hidden flex flex-col justify-between p-8"
              >
                <div className="space-y-4">
                  <div className="w-16 h-4 bg-white/5 rounded-full" />
                  <div className="w-2/3 h-8 bg-white/5 rounded-lg" />
                  <div className="w-full h-16 bg-white/5 rounded-lg" />
                </div>
                <div className="w-full h-48 bg-white/5 rounded-2xl" />
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          /* Empty state */
          <div className="py-24 text-center border border-white/[0.06] bg-white/[0.01] backdrop-blur-xl rounded-3xl p-12 w-full">
            <Folder className="w-10 h-10 text-white/20 mx-auto mb-4" />
            <h3 className="text-white font-medium text-lg mb-2">No projects found</h3>
            <p className="text-white/40 text-sm max-w-sm mx-auto leading-relaxed mb-6">
              There are no published projects in this category at the moment. Check back later or start a new inquiry.
            </p>
          </div>
        ) : (
          /* Projects grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 relative z-20">
            <AnimatePresence mode="wait">
              {filteredProjects.map((proj, i) => {
                const cardClass = "group relative flex flex-col bg-[#070709] border border-white/[0.06] hover:border-white/[0.12] rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/90 hover:-translate-y-1.5 cursor-pointer";
                const handleOpen = () => proj.link && window.open(proj.link, "_blank", "noopener,noreferrer");

                if (reduce) {
                  return (
                    <div key={proj.id} onClick={handleOpen} className={cardClass}>
                      <ProjectCardInner proj={proj} idx={i} />
                    </div>
                  );
                }

                return (
                  <motion.div
                    key={proj.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] as any }}
                    onClick={handleOpen}
                    className={cardClass}
                  >
                    <ProjectCardInner proj={proj} idx={i} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
