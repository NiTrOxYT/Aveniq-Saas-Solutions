import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { organizationSchema } from "@/components/SchemaMarkup";
import ContentMetaHeader from "@/components/ContentMetaHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedContextGrid from "@/components/RelatedContextGrid";
import { Github, Box, ArrowUpRight } from "lucide-react";
export default function DevelopersPage() {
    const projects = [
        {
            title: "aveniq-agent-sdk",
            description: "Lightweight TypeScript & Python SDK for orchestrating multi-agent state machines and RAG vector search retries.",
            stars: "1.2k",
            lang: "TypeScript / Python",
            link: "https://github.com/aveniq",
        },
        {
            title: "next-saas-boilerplate-pro",
            description: "Production-ready Next.js 15, Tailwind CSS, Supabase RLS, Stripe, and Zod enterprise SaaS starter kit.",
            stars: "3.4k",
            lang: "TypeScript",
            link: "https://github.com/aveniq",
        },
        {
            title: "mcp-vector-bridge",
            description: "Model Context Protocol (MCP) server adapter for PostgreSQL pgvector and Pinecone semantic search integration.",
            stars: "890",
            lang: "Go / TypeScript",
            link: "https://github.com/aveniq",
        },
        {
            title: "rag-benchmark-suite",
            description: "Automated latency, recall accuracy, and token-cost evaluation suite for enterprise RAG deployments.",
            stars: "650",
            lang: "Python",
            link: "https://github.com/aveniq",
        },
    ];
    return (<div className="bg-black min-h-screen text-white selection:bg-[#6750A4]">
      <SEOHead title="Developer Hub & Open Source Ecosystem | Aveniq" description="Explore Aveniq's open source SDKs, Next.js SaaS boilerplates, Model Context Protocol (MCP) tools, and AI agent frameworks." canonical="https://theaveniq.site/developers"/>
      <SchemaMarkup schema={[
            organizationSchema,
            {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "Developer Hub & Open Source Ecosystem",
                "url": "https://theaveniq.site/developers",
            },
        ]}/>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-32">
        <ContentMetaHeader title="Developer Hub & Open Source Ecosystem" subtitle="Explore open source libraries, SDKs, enterprise boilerplates, and MCP integrations maintained by Aveniq engineers." category="Developer Community" author="Aveniq Open Source Team" reviewer="Head of Open Source" lastUpdated="August 2026" version="v1.4.0"/>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {projects.map((proj, idx) => (<a key={idx} href={proj.link} target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-[#9C89D9]/50 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Box className="w-5 h-5 text-[#9C89D9]"/>
                    <h3 className="text-white font-mono font-semibold text-lg group-hover:text-[#9C89D9] transition-colors">
                      {proj.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors"/>
                </div>
                <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                  {proj.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/5 pt-4">
                <span className="font-mono text-[#9C89D9]">{proj.lang}</span>
                <span className="flex items-center gap-1 font-mono">
                  <Github className="w-3.5 h-3.5"/> {proj.stars} stars
                </span>
              </div>
            </a>))}
        </div>

        <RelatedContextGrid items={[
            {
                title: "Engineering Standards",
                description: "Review our strict code quality benchmarks and SLA guarantees.",
                href: "/trust/engineering-standards",
                category: "Resource",
            },
            {
                title: "AI ROI Calculator",
                description: "Model savings from custom AI automation.",
                href: "/tools/ai-roi-calculator",
                category: "Tool",
            },
            {
                title: "AI Development Services",
                description: "Learn how we build production agentic AI for enterprise clients.",
                href: "/ai-automation-development",
                category: "Service",
            },
        ]}/>
      </main>

      <Footer />
    </div>);
}
