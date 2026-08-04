import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { organizationSchema } from "@/components/SchemaMarkup";
import ContentMetaHeader from "@/components/ContentMetaHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedContextGrid from "@/components/RelatedContextGrid";
import { Code2, GitBranch, Cpu, Terminal, Zap, CheckCircle2 } from "lucide-react";

export default function EngineeringStandardsPage() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#6750A4]">
      <SEOHead
        title="Engineering Standards & Software Quality | Aveniq"
        description="Learn about Aveniq's software architecture principles, automated testing rigor, CI/CD deployment pipelines, code review benchmarks, and SLA performance guarantees."
        canonical="https://theaveniq.site/trust/engineering-standards"
      />
      <SchemaMarkup
        schema={[
          organizationSchema,
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Engineering Standards",
            "url": "https://theaveniq.site/trust/engineering-standards",
            "publisher": organizationSchema,
          },
        ]}
      />
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-32">
        <ContentMetaHeader
          title="Engineering Standards & Code Quality"
          subtitle="Our engineering benchmarks: strict TypeScript type safety, modular microservices, automated unit & integration testing, zero-downtime deployment, and Core Web Vitals optimization."
          category="Engineering Rigor"
          author="Principal Software Architect"
          reviewer="VP of Engineering"
          lastUpdated="August 2026"
          version="v2.2.0"
        />

        {/* Core Methodology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-xl bg-zinc-950/80 border border-white/10">
            <Code2 className="w-6 h-6 text-[#9C89D9] mb-3" />
            <h3 className="text-white font-medium text-lg mb-2">100% Strict Type Safety</h3>
            <p className="text-white/60 text-xs leading-relaxed font-light">
              We mandate TypeScript strict mode, Zod runtime validation, and auto-generated API schema types to catch errors at compile time rather than production.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-zinc-950/80 border border-white/10">
            <GitBranch className="w-6 h-6 text-[#9C89D9] mb-3" />
            <h3 className="text-white font-medium text-lg mb-2">CI/CD Pipeline Rigor</h3>
            <p className="text-white/60 text-xs leading-relaxed font-light">
              Every pull request triggers automated linting, unit tests, security scans, and preview deployments before merge approval by two peer senior engineers.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-zinc-950/80 border border-white/10">
            <Zap className="w-6 h-6 text-[#9C89D9] mb-3" />
            <h3 className="text-white font-medium text-lg mb-2">Sub-100ms Performance</h3>
            <p className="text-white/60 text-xs leading-relaxed font-light">
              Database queries are indexed, vector search is cached, static pages are edge-rendered, and client assets pass strict Core Web Vitals audits.
            </p>
          </div>
        </div>

        {/* Detailed Standards */}
        <div className="space-y-12 text-white/80 font-light leading-relaxed">
          <section>
            <h2 className="font-serif text-3xl text-white mb-4 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#9C89D9]" /> Architecture Principles
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-white/70">
              <li><strong className="text-white font-medium">Domain-Driven Design (DDD):</strong> Codebases are organized logically by bounded business contexts, isolating business logic from external frameworks.</li>
              <li><strong className="text-white font-medium">Stateless API Design:</strong> Microservices and serverless functions communicate via idempotent REST/GraphQL or gRPC endpoints.</li>
              <li><strong className="text-white font-medium">Resilient AI Pipeline Design:</strong> LLM calls implement exponential backoff retry loops, fallback model switching (e.g. Claude fallback to Gemini), and strict JSON response parsing.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-white mb-4">SLA & Performance Benchmarks</h2>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/20 text-white font-medium">
                    <th className="py-3 px-4">Metric / SLA</th>
                    <th className="py-3 px-4">Target Benchmark</th>
                    <th className="py-3 px-4">Enforcement Mechanism</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/70">
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">LCP (Largest Contentful Paint)</td>
                    <td className="py-3 px-4 text-emerald-400 font-mono">&lt; 1.8 seconds</td>
                    <td className="py-3 px-4">Lighthouse CI in GitHub Actions</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">INP (Interaction to Next Paint)</td>
                    <td className="py-3 px-4 text-emerald-400 font-mono">&lt; 100 milliseconds</td>
                    <td className="py-3 px-4">React 19 Concurrent Rendering</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">API Response Latency (p95)</td>
                    <td className="py-3 px-4 text-emerald-400 font-mono">&lt; 120 milliseconds</td>
                    <td className="py-3 px-4">Edge Serverless + Redis Caching</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Code Test Coverage</td>
                    <td className="py-3 px-4 text-emerald-400 font-mono">&gt; 85% Statements</td>
                    <td className="py-3 px-4">Jest / Vitest CI Blocking Rule</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <RelatedContextGrid
          items={[
            {
              title: "Editorial Policy",
              description: "Read our technical review guidelines and zero-spam policy.",
              href: "/trust/editorial-policy",
              category: "Resource",
            },
            {
              title: "Security Policy",
              description: "Review our SDLC security, data isolation, and encryption standards.",
              href: "/trust/security-policy",
              category: "Resource",
            },
            {
              title: "Custom Software Development",
              description: "See how we apply enterprise engineering standards to client projects.",
              href: "/custom-software-development",
              category: "Service",
            },
          ]}
        />
      </main>

      <Footer />
    </div>
  );
}
