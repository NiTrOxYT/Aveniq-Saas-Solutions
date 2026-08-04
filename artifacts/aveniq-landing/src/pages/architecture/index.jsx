import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { organizationSchema } from "@/components/SchemaMarkup";
import ContentMetaHeader from "@/components/ContentMetaHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedContextGrid from "@/components/RelatedContextGrid";
import { Layers, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
export default function ArchitecturePage() {
    const blueprints = [
        {
            title: "Multi-Tenant SaaS Architecture Blueprint",
            description: "Distributed microservices, Supabase Row-Level Security, Redis session caching, and Stripe billing engine topology.",
            stack: "Next.js 15 • PostgreSQL • Redis • Docker • Stripe",
            href: "/saas-development",
        },
        {
            title: "Enterprise Agentic AI & RAG Pipeline Blueprint",
            description: "Multi-agent coordinator orchestration, pgvector dense retrieval, re-ranking worker pool, and fallback LLM routing.",
            stack: "Python • FastAPI • Pinecone • OpenAI • Claude",
            href: "/ai-automation-development",
        },
        {
            title: "High-Availability Event-Driven Microservices",
            description: "Asynchronous task queue processing, Kafka message streaming, idempotent worker nodes, and dead-letter queues.",
            stack: "Node.js • Kafka • Redis • Docker • Kubernetes",
            href: "/custom-software-development",
        },
        {
            title: "Enterprise ERP & Workflow Automation Blueprint",
            description: "Integrated inventory management, Automated POS sync, role-based audit logging, and legacy database migration connectors.",
            stack: "TypeScript • PostgreSQL • React • Node.js",
            href: "/custom-software-development",
        },
    ];
    return (<div className="bg-black min-h-screen text-white selection:bg-[#6750A4]">
      <SEOHead title="System Architecture Blueprint Library | Aveniq" description="Explore enterprise system architecture diagrams and blueprints for Multi-Tenant SaaS, Agentic AI, RAG pipelines, and Event-Driven Microservices." canonical="https://theaveniq.site/architecture"/>
      <SchemaMarkup schema={[
            organizationSchema,
            {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "System Architecture Blueprint Library",
                "url": "https://theaveniq.site/architecture",
            },
        ]}/>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-32">
        <ContentMetaHeader title="System Architecture Blueprint Library" subtitle="Battle-tested architectural blueprints, system topologies, tech stack selections, and trade-off analyses for enterprise software." category="Architecture Library" author="Principal Systems Architect" reviewer="VP of Technology" lastUpdated="August 2026" version="v2.5.0"/>

        <div className="space-y-6 mb-16">
          {blueprints.map((blueprint, idx) => (<Link key={idx} href={blueprint.href} className="group p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-white/10 hover:border-[#9C89D9]/50 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#9C89D9]">
                  <Layers className="w-4 h-4 text-emerald-400"/>
                  <span>{blueprint.stack}</span>
                </div>
                <h3 className="text-white font-medium text-xl group-hover:text-[#9C89D9] transition-colors">
                  {blueprint.title}
                </h3>
                <p className="text-white/60 text-sm font-light leading-relaxed max-w-3xl">
                  {blueprint.description}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C89D9] group-hover:text-white transition-colors">
                View Blueprint <ArrowUpRight className="w-4 h-4"/>
              </div>
            </Link>))}
        </div>

        <RelatedContextGrid items={[
            {
                title: "Engineering Documentation",
                description: "Public specs for RAG, MCP, AI Agents, and API design.",
                href: "/docs",
                category: "Resource",
            },
            {
                title: "Engineering Playbooks",
                description: "Actionable execution guides for Cloud Migration and AI implementation.",
                href: "/playbooks",
                category: "Guide",
            },
            {
                title: "Procurement & Security Hub",
                description: "Review security questionnaires and vendor capability statements.",
                href: "/procurement",
                category: "Resource",
            },
        ]}/>
      </main>

      <Footer />
    </div>);
}
