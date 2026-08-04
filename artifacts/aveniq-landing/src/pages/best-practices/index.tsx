import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { organizationSchema } from "@/components/SchemaMarkup";
import ContentMetaHeader from "@/components/ContentMetaHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedContextGrid from "@/components/RelatedContextGrid";
import { ShieldCheck, CheckCircle2, GitPullRequest, Code2, Terminal, Bug } from "lucide-react";
import { Link } from "wouter";

export default function BestPracticesPage() {
  const standards = [
    {
      title: "Code Review & Peer Verification Standards",
      desc: "Mandatory 2-reviewer sign-off, automated linting, security scanning, and unit test coverage thresholds.",
    },
    {
      title: "Pull Request & Git Commit Discipline",
      desc: "Conventional commits specification (feat, fix, refactor, docs), squashed branch histories, and PR template compliance.",
    },
    {
      title: "Automated Testing & Coverage Protocol",
      desc: "Unit testing with Vitest/Jest (>85% coverage), integration testing with Playwright, and load testing with k6.",
    },
    {
      title: "Structured Logging & Observability",
      desc: "JSON formatted logs, trace correlation IDs across microservices, OpenTelemetry metrics, and automated alert triggers.",
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#6750A4]">
      <SEOHead
        title="Engineering Best Practices & Code Standards | Aveniq"
        description="Review Aveniq's internal software engineering standards, code review checklists, testing coverage requirements, and deployment protocols."
        canonical="https://theaveniq.site/best-practices"
      />
      <SchemaMarkup
        schema={[
          organizationSchema,
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Engineering Best Practices & Standards",
            "url": "https://theaveniq.site/best-practices",
          },
        ]}
      />
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-32">
        <ContentMetaHeader
          title="Engineering Standards & Quality Guidelines"
          subtitle="Our internal code quality checklists, pull request protocols, testing matrices, and observability benchmarks."
          category="Engineering Quality"
          author="Quality & Standards Guild"
          reviewer="VP of Engineering"
          lastUpdated="August 2026"
          version="v2.0.0"
        />

        <div className="space-y-6 mb-16">
          {standards.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-white font-medium text-lg mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#9C89D9]" /> {item.title}
                </h3>
                <p className="text-white/60 text-sm font-light leading-relaxed pl-7">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <RelatedContextGrid
          items={[
            {
              title: "Engineering Standards Policy",
              description: "Read about our SLA metrics, code coverage, and performance benchmarks.",
              href: "/trust/engineering-standards",
              category: "Resource",
            },
            {
              title: "Security & Compliance Policy",
              description: "Review SDLC security, OWASP top 10 controls, and encryption standards.",
              href: "/trust/security-policy",
              category: "Resource",
            },
            {
              title: "Implementation Playbooks",
              description: "Explore execution playbooks for AI, MVP, and Cloud delivery.",
              href: "/playbooks",
              category: "Guide",
            },
          ]}
        />
      </main>

      <Footer />
    </div>
  );
}
