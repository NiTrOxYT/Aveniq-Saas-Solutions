import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { organizationSchema } from "@/components/SchemaMarkup";
import ContentMetaHeader from "@/components/ContentMetaHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedContextGrid from "@/components/RelatedContextGrid";
import { BookOpen, CheckSquare, Shield, Rocket, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export default function PlaybooksPage() {
  const playbooks = [
    {
      title: "Enterprise AI Implementation Playbook",
      description: "Step-by-step roadmap for data audit, security isolation, RAG prototyping, pilot rollout, and LLM cost governance.",
      steps: "8 Phase Framework",
      href: "/ai-automation-development",
    },
    {
      title: "Startup MVP Velocity & Scaling Playbook",
      description: "How to ship an investor-ready SaaS prototype in 6 weeks with zero technical debt and sub-second load times.",
      steps: "6 Week Delivery Matrix",
      href: "/mvp-development",
    },
    {
      title: "Legacy-to-Cloud Migration Playbook",
      description: "Zero-downtime database migration, microservice extraction, Docker containerization, and AWS infrastructure setup.",
      steps: "5 Phase Migration Spec",
      href: "/custom-software-development",
    },
    {
      title: "API Design & Developer Experience Playbook",
      description: "Best practices for RESTful versioning, OpenAPI generation, rate limiting, and automated SDK creation.",
      steps: "Standard Specification",
      href: "/custom-software-development",
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#6750A4]">
      <SEOHead
        title="Actionable Engineering & Implementation Playbooks | Aveniq"
        description="Explore Aveniq's engineering playbooks for Enterprise AI Implementation, Startup MVP Execution, Cloud Migration, and API Design."
        canonical="https://theaveniq.site/playbooks"
      />
      <SchemaMarkup
        schema={[
          organizationSchema,
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Actionable Engineering Playbooks",
            "url": "https://theaveniq.site/playbooks",
          },
        ]}
      />
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-32">
        <ContentMetaHeader
          title="Actionable Engineering & Delivery Playbooks"
          subtitle="Comprehensive, step-by-step execution playbooks created by Aveniq delivery leads and cloud architects."
          category="Execution Frameworks"
          author="Delivery Leadership Guild"
          reviewer="VP of Client Services"
          lastUpdated="August 2026"
          version="v1.6.0"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {playbooks.map((pb, idx) => (
            <Link
              key={idx}
              href={pb.href}
              className="group p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-[#9C89D9]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {pb.steps}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-white font-medium text-lg mb-2 group-hover:text-[#9C89D9] transition-colors">
                  {pb.title}
                </h3>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  {pb.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <RelatedContextGrid
          items={[
            {
              title: "System Architecture Blueprints",
              description: "Review system diagrams for multi-tenant SaaS and agentic AI.",
              href: "/architecture",
              category: "Guide",
            },
            {
              title: "Engineering Best Practices",
              description: "Code review standards, PR guidelines, and testing protocols.",
              href: "/best-practices",
              category: "Resource",
            },
            {
              title: "Enterprise Procurement Hub",
              description: "Download security questionnaires and vendor capability reports.",
              href: "/procurement",
              category: "Resource",
            },
          ]}
        />
      </main>

      <Footer />
    </div>
  );
}
