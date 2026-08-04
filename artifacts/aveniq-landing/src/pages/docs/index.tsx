import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { organizationSchema } from "@/components/SchemaMarkup";
import ContentMetaHeader from "@/components/ContentMetaHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedContextGrid from "@/components/RelatedContextGrid";
import { BookOpen, Terminal, Code2, Cpu, ArrowUpRight, ShieldCheck, Zap, Layers } from "lucide-react";
import { Link } from "wouter";

export default function DocsPage() {
  const docSections = [
    {
      title: "AI Agent Architecture & State Machines",
      description: "Production guide for orchestrating multi-agent state machines, memory persistence, and tool execution loops.",
      category: "AI Engineering",
      href: "/ai-automation-development",
    },
    {
      title: "Model Context Protocol (MCP) Integration",
      description: "Implementation spec for building custom MCP servers, resource providers, and client tool-calling bridges.",
      category: "Protocols",
      href: "/ai-automation-development",
    },
    {
      title: "Enterprise RAG & Hybrid Vector Search",
      description: "Architecture for dense vector embeddings, BM25 keyword re-ranking, metadata filtering, and chunking strategies.",
      category: "Data & ML",
      href: "/ai-automation-development",
    },
    {
      title: "Stateless Microservice API Design",
      description: "Restful & GraphQL API conventions, rate limiting, JWT token verification, and Zod payload validation.",
      category: "Backend",
      href: "/custom-software-development",
    },
    {
      title: "Multi-Tenant Database Isolation & RLS",
      description: "Row-Level Security (RLS) strategies in PostgreSQL and Supabase for tenant isolation and data protection.",
      category: "Security & DB",
      href: "/saas-development",
    },
    {
      title: "CI/CD & Zero-Downtime Deployments",
      description: "Automated GitHub Actions pipelines, containerization with Docker, and canary deployment workflows.",
      category: "DevOps",
      href: "/custom-software-development",
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#6750A4]">
      <SEOHead
        title="Public Engineering Documentation & Architecture Specs | Aveniq"
        description="Public technical documentation for AI agent state machines, Model Context Protocol (MCP), enterprise RAG, multi-tenant SaaS architecture, and CI/CD pipelines."
        canonical="https://theaveniq.site/docs"
      />
      <SchemaMarkup
        schema={[
          organizationSchema,
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Public Engineering Documentation Hub",
            "url": "https://theaveniq.site/docs",
          },
        ]}
      />
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-32">
        <ContentMetaHeader
          title="Public Engineering Documentation & System Specs"
          subtitle="In-depth implementation guides, architectural specifications, and code patterns curated by Aveniq enterprise software architects."
          category="Developer Documentation"
          author="Aveniq Architecture Guild"
          reviewer="VP of Engineering"
          lastUpdated="August 2026"
          version="v3.0.0"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {docSections.map((doc, idx) => (
            <Link
              key={idx}
              href={doc.href}
              className="group p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-[#9C89D9]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#9C89D9] bg-[#6750A4]/20 px-2.5 py-0.5 rounded-full border border-[#9C89D9]/20">
                    {doc.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-white font-medium text-lg mb-2 group-hover:text-[#9C89D9] transition-colors">
                  {doc.title}
                </h3>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  {doc.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <RelatedContextGrid
          items={[
            {
              title: "System Architecture Blueprints",
              description: "Explore reusable system diagrams and technical stack breakdowns.",
              href: "/architecture",
              category: "Guide",
            },
            {
              title: "Implementation Playbooks",
              description: "Actionable execution guides for AI, Cloud, and SaaS delivery.",
              href: "/playbooks",
              category: "Resource",
            },
            {
              title: "API Integration Guides",
              description: "Developer specs for OpenAI, Supabase, Stripe, and AWS.",
              href: "/integrations",
              category: "Technology",
            },
          ]}
        />
      </main>

      <Footer />
    </div>
  );
}
