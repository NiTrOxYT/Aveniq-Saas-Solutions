import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { organizationSchema } from "@/components/SchemaMarkup";
import ContentMetaHeader from "@/components/ContentMetaHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedContextGrid from "@/components/RelatedContextGrid";
import { ShieldCheck, FileCheck, Building2, Download, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function ProcurementPage() {
  const documents = [
    {
      title: "Enterprise Vendor Security Questionnaire (CAIQ / SIG)",
      desc: "Pre-completed security assessment answers for enterprise CISO and InfoSec procurement teams.",
      tag: "Security Assessment",
    },
    {
      title: "Technical Capability & SLA Statement",
      desc: "Formal documentation of system availability guarantees (99.9% uptime SLA), disaster recovery RPO/RTO metrics, and support tiers.",
      tag: "SLA Commitment",
    },
    {
      title: "Infrastructure & Data Isolation Architecture Overview",
      desc: "Technical whitepaper detailing multi-tenant data boundary isolation, encryption specifications, and cloud IAM governance.",
      tag: "Architecture Whitepaper",
    },
    {
      title: "Business Continuity & Disaster Recovery Plan (BCP/DR)",
      desc: "Documented failover procedures, multi-region database backups, and emergency incident response escalation paths.",
      tag: "Governance",
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#6750A4]">
      <SEOHead
        title="Enterprise Procurement & Vendor Security Hub | Aveniq"
        description="Enterprise procurement support, vendor security questionnaires, SLA commitments, technical capability statements, and disaster recovery blueprints."
        canonical="https://theaveniq.site/procurement"
      />
      <SchemaMarkup
        schema={[
          organizationSchema,
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Enterprise Procurement & Security Hub",
            "url": "https://theaveniq.site/procurement",
          },
        ]}
      />
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-32">
        <ContentMetaHeader
          title="Enterprise Procurement & Security Hub"
          subtitle="Pre-verified vendor evaluations, security questionnaires, SLA agreements, and technical capability statements for enterprise buyers."
          category="Procurement Resources"
          author="Legal & Compliance Team"
          reviewer="Chief Information Security Officer"
          lastUpdated="August 2026"
          version="v1.9.0"
        />

        <div className="space-y-6 mb-16">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9C89D9] bg-[#6750A4]/20 px-2.5 py-0.5 rounded-full border border-[#9C89D9]/20 inline-block mb-3">
                  {doc.tag}
                </span>
                <h3 className="text-white font-medium text-lg mb-1">{doc.title}</h3>
                <p className="text-white/60 text-sm font-light leading-relaxed max-w-3xl">
                  {doc.desc}
                </p>
              </div>

              <Link
                href="/contact"
                className="shrink-0 py-2.5 px-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-2 transition-colors"
              >
                Request Access <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

        <RelatedContextGrid
          items={[
            {
              title: "Security & Compliance Policy",
              description: "Review SDLC security, OWASP controls, and AES-256 data encryption.",
              href: "/trust/security-policy",
              category: "Resource",
            },
            {
              title: "Engineering Standards",
              description: "Review strict code quality benchmarks and SLA metrics.",
              href: "/trust/engineering-standards",
              category: "Resource",
            },
            {
              title: "System Architecture Blueprints",
              description: "Explore multi-tenant SaaS and AI agent architecture diagrams.",
              href: "/architecture",
              category: "Guide",
            },
          ]}
        />
      </main>

      <Footer />
    </div>
  );
}
