import { Link } from "wouter";
import { ArrowUpRight, Cpu, Layers, Building2, BookOpen, Wrench, Shield, CheckCircle2 } from "lucide-react";
import { prefetchRoute } from "@/utils/prefetch";

export interface ContextLink {
  title: string;
  description: string;
  href: string;
  category: "Service" | "Industry" | "Solution" | "Technology" | "Guide" | "Glossary" | "Resource" | "Tool";
}

export interface RelatedContextGridProps {
  items: ContextLink[];
  heading?: string;
  subheading?: string;
}

const categoryIcons = {
  Service: Layers,
  Industry: Building2,
  Solution: CheckCircle2,
  Technology: Cpu,
  Guide: BookOpen,
  Glossary: BookOpen,
  Resource: Shield,
  Tool: Wrench,
};

export default function RelatedContextGrid({
  items,
  heading = "Explore Related Engineering Intelligence",
  subheading = "Deepen your knowledge across interconnected services, technologies, solutions, and architectural blueprints.",
}: RelatedContextGridProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-28 px-4 sm:px-6 relative z-10 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <h3 
            className="text-3xl md:text-4xl font-medium text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {heading}
          </h3>
          <p className="text-white/40 text-base font-light leading-relaxed max-w-[60ch]">
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const Icon = categoryIcons[item.category] || Layers;
            return (
              <Link
                key={idx}
                href={item.href}
                onMouseEnter={() => prefetchRoute(item.href)}
                onFocus={() => prefetchRoute(item.href)}
                className="group p-6 rounded-2xl bg-white/[0.03] backdrop-blur-[20px] border border-white/[0.08] hover:border-white/[0.18] shadow-[0_30px_80px_rgba(0,0,0,0.35)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-[#9C89D9] flex items-center gap-1.5 bg-[#6750A4]/15 px-2.5 py-0.5 rounded-full border border-[#9C89D9]/15">
                      <Icon className="w-3 h-3" />
                      {item.category}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>
                  <h4 className="text-white font-medium text-base mb-2 group-hover:text-[#9C89D9] transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-white/45 text-xs md:text-sm font-light leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
