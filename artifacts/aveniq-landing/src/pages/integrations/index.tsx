import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { organizationSchema } from "@/components/SchemaMarkup";
import ContentMetaHeader from "@/components/ContentMetaHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedContextGrid from "@/components/RelatedContextGrid";
import { Cpu, Zap, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export default function IntegrationsPage() {
  const integrations = [
    { title: "OpenAI API Integration", category: "AI & Models", desc: "Function calling, JSON mode, structured outputs, streaming, and error retry patterns.", href: "/ai-automation-development" },
    { title: "Anthropic Claude API", category: "AI & Models", desc: "Tool use integration, prompt caching optimization, long-context window handling.", href: "/ai-automation-development" },
    { title: "Google Gemini API", category: "AI & Models", desc: "Multimodal video/image reasoning, low-latency inference, and structured output parsing.", href: "/ai-automation-development" },
    { title: "Supabase & Postgres RLS", category: "Database & BaaS", desc: "Authentication, Row-Level Security policies, Realtime websockets, and Vector DB.", href: "/saas-development" },
    { title: "Stripe Subscription Billing", category: "Payments", desc: "Webhooks processing, metered usage billing, customer portal, and idempotent events.", href: "/saas-development" },
    { title: "Amazon Web Services (AWS)", category: "Cloud & DevOps", desc: "ECS, Lambda serverless, S3 object storage, CloudFront CDN, and IAM security controls.", href: "/custom-software-development" },
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#6750A4]">
      <SEOHead
        title="Public API & Cloud Integration Guides | Aveniq"
        description="Developer integration guides and code patterns for OpenAI, Claude, Gemini, Supabase, Stripe, AWS, and Firebase."
        canonical="https://theaveniq.site/integrations"
      />
      <SchemaMarkup
        schema={[
          organizationSchema,
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Public API & Cloud Integration Guides",
            "url": "https://theaveniq.site/integrations",
          },
        ]}
      />
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-32">
        <ContentMetaHeader
          title="Public API & Cloud Integration Specs"
          subtitle="Battle-tested code samples, authentication patterns, error retries, and performance tips for enterprise APIs."
          category="Integration Guides"
          author="API Engineering Team"
          reviewer="Head of Integrations"
          lastUpdated="August 2026"
          version="v2.1.0"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {integrations.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-[#9C89D9]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#9C89D9] bg-[#6750A4]/20 px-2.5 py-0.5 rounded-full border border-[#9C89D9]/20">
                    {item.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-white font-medium text-lg mb-2 group-hover:text-[#9C89D9] transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <RelatedContextGrid
          items={[
            {
              title: "Developer Hub & Open Source",
              description: "Explore Aveniq SDKs, boilerplates, and GitHub repos.",
              href: "/developers",
              category: "Tool",
            },
            {
              title: "Public Documentation Hub",
              description: "Public technical specs for RAG, MCP, and AI Agents.",
              href: "/docs",
              category: "Resource",
            },
            {
              title: "AI Development Services",
              description: "Learn how we build production AI integrations for clients.",
              href: "/ai-automation-development",
              category: "Service",
            },
          ]}
        />
      </main>

      <Footer />
    </div>
  );
}
