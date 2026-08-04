import { Link } from "wouter";
import { ArrowUpRight, Cpu, Layers, Building2, BookOpen, Wrench, Shield, CheckCircle2 } from "lucide-react";

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
    <section className="py-16 border-t border-white/10 my-16">
      <div className="mb-8">
        <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">{heading}</h3>
        <p className="text-white/50 text-sm max-w-2xl font-light">{subheading}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => {
          const Icon = categoryIcons[item.category] || Layers;
          return (
            <Link
              key={idx}
              href={item.href}
              className="group p-5 rounded-xl bg-zinc-950/60 border border-white/10 hover:border-[#9C89D9]/50 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#9C89D9] flex items-center gap-1.5 bg-[#6750A4]/20 px-2.5 py-0.5 rounded-full border border-[#9C89D9]/20">
                    <Icon className="w-3 h-3" />
                    {item.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
                <h4 className="text-white font-medium text-base mb-1.5 group-hover:text-[#9C89D9] transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-white/40 text-xs font-light line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
