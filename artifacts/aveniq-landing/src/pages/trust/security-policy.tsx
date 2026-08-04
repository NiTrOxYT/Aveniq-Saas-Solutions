import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { organizationSchema } from "@/components/SchemaMarkup";
import ContentMetaHeader from "@/components/ContentMetaHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedContextGrid from "@/components/RelatedContextGrid";
import { Shield, Lock, Server, Key, FileCheck, Eye } from "lucide-react";

export default function SecurityPolicyPage() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#6750A4]">
      <SEOHead
        title="Security & Data Protection Standards | Aveniq"
        description="Discover Aveniq's Secure Software Development Lifecycle (SDLC), OWASP-aligned coding practices, data encryption standards, and enterprise compliance framework."
        canonical="https://theaveniq.site/trust/security-policy"
      />
      <SchemaMarkup
        schema={[
          organizationSchema,
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Security & Compliance Policy",
            "url": "https://theaveniq.site/trust/security-policy",
            "publisher": organizationSchema,
          },
        ]}
      />
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-32">
        <ContentMetaHeader
          title="Security & Data Protection Standards"
          subtitle="Our enterprise secure software development lifecycle (S-SDLC), zero-trust architecture principles, data encryption protocols, and OWASP compliance standards."
          category="Security & Trust"
          author="InfoSec & Engineering Team"
          reviewer="Chief Information Security Officer"
          lastUpdated="August 2026"
          version="v3.1.0"
        />

        {/* Executive Summary */}
        <div className="p-6 rounded-2xl bg-zinc-950 border border-emerald-500/30 mb-12">
          <h2 className="text-emerald-400 font-medium text-lg mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5" /> Factual Compliance & Security Posture
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Aveniq adheres strictly to privacy-by-design and secure-by-default software engineering. We implement automated SAST/DAST pipeline vulnerability scanning, encrypted data storage (AES-256 at rest, TLS 1.3 in transit), granular Role-Based Access Control (RBAC), and strict OWASP Top 10 mitigation workflows.
          </p>
        </div>

        {/* Security Framework Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 rounded-xl bg-zinc-950/80 border border-white/10">
            <Lock className="w-6 h-6 text-[#9C89D9] mb-3" />
            <h3 className="text-white font-medium text-lg mb-2">Data Encryption & Privacy</h3>
            <p className="text-white/60 text-sm leading-relaxed font-light">
              All database storage, vector stores, and object caches are encrypted at rest using AES-256. All client-server communications require TLS 1.3 with automated HTTPS certificate renewals.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-zinc-950/80 border border-white/10">
            <Server className="w-6 h-6 text-[#9C89D9] mb-3" />
            <h3 className="text-white font-medium text-lg mb-2">Secure SDLC & CI/CD</h3>
            <p className="text-white/60 text-sm leading-relaxed font-light">
              Automated dependency vulnerability audits (Snyk / Dependabot) block untrusted third-party packages before deployment. Code reviews require sign-off from senior security engineers.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-zinc-950/80 border border-white/10">
            <Key className="w-6 h-6 text-[#9C89D9] mb-3" />
            <h3 className="text-white font-medium text-lg mb-2">Zero-Trust Access Control</h3>
            <p className="text-white/60 text-sm leading-relaxed font-light">
              Strict Principle of Least Privilege (PoLP) enforced for cloud infrastructure (AWS IAM, GCP IAM, Supabase RLS). Multi-Factor Authentication (MFA) mandatory across all team environments.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-zinc-950/80 border border-white/10">
            <FileCheck className="w-6 h-6 text-[#9C89D9] mb-3" />
            <h3 className="text-white font-medium text-lg mb-2">AI Data Isolation</h3>
            <p className="text-white/60 text-sm leading-relaxed font-light">
              Proprietary customer data processed by LLMs or vector databases (RAG) is isolated. Models are never trained on customer inputs without explicit written opt-in agreements.
            </p>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-10 text-white/80 font-light leading-relaxed">
          <section>
            <h2 className="font-serif text-3xl text-white mb-4">OWASP Security Matrix</h2>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/20 text-white font-medium">
                    <th className="py-3 px-4">OWASP Risk Class</th>
                    <th className="py-3 px-4">Aveniq Mitigation Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/70">
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">A01: Broken Access Control</td>
                    <td className="py-3 px-4">Row-Level Security (RLS) & JWT verification on every API endpoint.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">A02: Cryptographic Failures</td>
                    <td className="py-3 px-4">Enforced TLS 1.3, HSTS headers, and KMS key rotation.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">A03: Injection (SQL / Prompt)</td>
                    <td className="py-3 px-4">Parameterized ORMs, strict JSON schemas, & sanitized prompt templates.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">A04: Insecure Design</td>
                    <td className="py-3 px-4">Threat modeling during pre-build product discovery phase.</td>
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
              description: "Read our content governance, peer-review workflow, and non-hallucination rules.",
              href: "/trust/editorial-policy",
              category: "Resource",
            },
            {
              title: "Engineering Standards",
              description: "Discover our testing protocols, code coverage, and deployment methodologies.",
              href: "/trust/engineering-standards",
              category: "Resource",
            },
            {
              title: "Custom SaaS Development",
              description: "See how we build multi-tenant SaaS platforms with enterprise security.",
              href: "/saas-development",
              category: "Service",
            },
          ]}
        />
      </main>

      <Footer />
    </div>
  );
}
