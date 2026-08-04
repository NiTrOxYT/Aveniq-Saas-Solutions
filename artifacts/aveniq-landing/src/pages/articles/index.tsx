import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { organizationSchema } from "@/components/SchemaMarkup";
import ContentMetaHeader from "@/components/ContentMetaHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedContextGrid from "@/components/RelatedContextGrid";
import { editorialTopics, editorialClusters } from "@/data/editorial-roadmap";
import { BookOpen, ArrowUpRight, Cpu, Layers, ShieldCheck, Zap } from "lucide-react";
import { Link } from "wouter";

export default function ArticlesIndexPage() {
  const [selectedCluster, setSelectedCluster] = useState<string>("All");

  const filteredTopics = selectedCluster === "All"
    ? editorialTopics
    : editorialTopics.filter((t) => t.cluster === selectedCluster);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#6750A4]">
      <SEOHead
        title="Technical Engineering Articles & Architecture Guides | Aveniq"
        description="Deep technical articles on AI Agents, Model Context Protocol (MCP), Enterprise RAG, Multi-Tenant SaaS, Microservices, and Cloud Engineering."
        canonical="https://theaveniq.site/articles"
      />
      <SchemaMarkup
        schema={[
          organizationSchema,
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Technical Engineering Articles & Architecture Guides",
            "url": "https://theaveniq.site/articles",
          },
        ]}
      />
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-32">
        <ContentMetaHeader
          title="Technical Engineering Articles & Thought Leadership"
          subtitle="Deep-dive architecture guides, benchmark comparisons, production failure analyses, and code patterns written by Aveniq engineers."
          category="Engineering Publications"
          author="Aveniq Editorial Board"
          reviewer="VP of Engineering"
          lastUpdated="August 2026"
          version="v3.0.0"
        />

        {/* Cluster Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-white/10">
          <button
            onClick={() => setSelectedCluster("All")}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
              selectedCluster === "All"
                ? "bg-[#6750A4] text-white font-semibold"
                : "bg-white/5 text-white/60 hover:text-white border border-white/10"
            }`}
          >
            All Clusters ({editorialTopics.length})
          </button>
          {editorialClusters.map((cluster, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCluster(cluster)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                selectedCluster === cluster
                  ? "bg-[#6750A4] text-white font-semibold"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/10"
              }`}
            >
              {cluster}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredTopics.map((topic) => (
            <Link
              key={topic.id}
              href={`/articles/${topic.slug}`}
              className="group p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-[#9C89D9]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#9C89D9] bg-[#6750A4]/20 px-2.5 py-0.5 rounded-full border border-[#9C89D9]/20">
                    {topic.cluster}
                  </span>
                  <span className="text-[10px] font-mono text-white/40">{topic.targetWords.toLocaleString()} words</span>
                </div>
                <h3 className="text-white font-medium text-lg mb-2 group-hover:text-[#9C89D9] transition-colors leading-snug">
                  {topic.title}
                </h3>
                <p className="text-white/60 text-xs font-light leading-relaxed mb-6">
                  {topic.summary}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/5 pt-4">
                <span className="text-emerald-400 font-mono text-[10px]">Priority: {topic.priority}</span>
                <span className="flex items-center gap-1 text-[#9C89D9] font-medium group-hover:text-white transition-colors">
                  Read Article <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <RelatedContextGrid
          items={[
            {
              title: "Public Engineering Documentation",
              description: "Technical specs for RAG, MCP, AI Agents, and API design.",
              href: "/docs",
              category: "Resource",
            },
            {
              title: "System Architecture Blueprints",
              description: "Review system diagrams for multi-tenant SaaS and agentic AI.",
              href: "/architecture",
              category: "Guide",
            },
            {
              title: "AI ROI Calculator",
              description: "Model labor cost savings from custom AI automation.",
              href: "/tools/ai-roi-calculator",
              category: "Tool",
            },
          ]}
        />
      </main>

      <Footer />
    </div>
  );
}
