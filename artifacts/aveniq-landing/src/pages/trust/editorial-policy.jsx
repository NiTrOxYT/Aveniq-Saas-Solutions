import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { organizationSchema } from "@/components/SchemaMarkup";
import ContentMetaHeader from "@/components/ContentMetaHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedContextGrid from "@/components/RelatedContextGrid";
import { ShieldCheck, CheckCircle2, FileText, Lock, Users } from "lucide-react";
export default function EditorialPolicyPage() {
    return (<div className="bg-black min-h-screen text-white selection:bg-[#6750A4]">
      <SEOHead title="Editorial Policy & Content Governance | Aveniq" description="Learn how Aveniq ensures technical accuracy, peer-reviewed engineering content, AI disclosure, and zero-spam quality standards across all publications." canonical="https://theaveniq.site/trust/editorial-policy"/>
      <SchemaMarkup schema={[
            organizationSchema,
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Editorial Policy",
                "url": "https://theaveniq.site/trust/editorial-policy",
                "publisher": organizationSchema,
            },
        ]}/>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-32">
        <ContentMetaHeader title="Editorial Policy & Content Governance" subtitle="Our strict commitment to technical accuracy, peer-reviewed engineering content, ethical AI disclosure, and zero marketing fluff." category="EEAT & Governance" author="Aveniq Editorial Board" reviewer="VP of Engineering" lastUpdated="August 2026" version="v1.0.0"/>

        {/* Executive Summary Callout */}
        <div className="p-6 rounded-2xl bg-zinc-950 border border-[#9C89D9]/30 mb-12">
          <h2 className="text-[#9C89D9] font-medium text-lg mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5"/> Executive Summary
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Every technical article, architectural blueprint, case study, and comparison published on Aveniq undergoes rigorous peer review by active software architects and AI engineers. We enforce native English clarity, empirical benchmark verification, strict non-hallucination guidelines, and transparent attribution.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="space-y-12 text-white/80 font-light leading-relaxed">
          <section>
            <h2 className="font-serif text-3xl text-white mb-4 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#9C89D9]"/> 1. Technical Accuracy & Peer Review
            </h2>
            <p className="mb-4">
              All engineering publications on Aveniq must be authored or reviewed by a senior software engineer, cloud architect, or machine learning specialist. We verify all code snippets, API signatures, CLI commands, and architectural diagrams against official framework documentation and active production environments.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>Code snippets are compiled and validated against current LTS runtimes (e.g. Node 20+, Python 3.11+, Next.js 15+).</li>
              <li>API references and benchmark metrics are empirically measured; we explicitly state test hardware and environments.</li>
              <li>Outdated technical guides are flagged for quarterly review or version deprecation.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-white mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#9C89D9]"/> 2. AI Disclosure & Content Integrity
            </h2>
            <p className="mb-4">
              While Aveniq leverages AI technology internally for research assistance and syntax formatting, 100% of our published guides, recommendations, and architectural decisions are directed, vetted, and signed off by human enterprise engineers.
            </p>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-sm">
              <p className="font-medium text-white mb-1">Zero AI Hallucination Policy</p>
              <p className="text-white/60">
                We strictly prohibit publishing unverified AI-generated text, fake metrics, generic filler, or fabricated case studies. All metrics cited in case studies reflect genuine client project outcomes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-white mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-[#9C89D9]"/> 3. Independence & Commercial Integrity
            </h2>
            <p>
              Our technology evaluations (e.g. OpenAI vs Claude, RAG vs Fine-tuning, Next.js vs Remix) are based strictly on engineering merit, cost-to-performance ratios, security, and developer productivity. Aveniq does not accept sponsored content or undisclosed affiliate placement.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-white mb-4 flex items-center gap-3">
              <Users className="w-6 h-6 text-[#9C89D9]"/> 4. Review & Update Frequency
            </h2>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/20 text-white font-medium">
                    <th className="py-3 px-4">Content Type</th>
                    <th className="py-3 px-4">Review Frequency</th>
                    <th className="py-3 px-4">Responsible Team</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/70">
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">AI & Agentic Framework Guides</td>
                    <td className="py-3 px-4">Quarterly</td>
                    <td className="py-3 px-4">AI Research Lab</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Service Pillars & Architecture</td>
                    <td className="py-3 px-4">Quarterly</td>
                    <td className="py-3 px-4">Solutions Architects</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Tech Comparisons & Stack Reviews</td>
                    <td className="py-3 px-4">Every 6 Months</td>
                    <td className="py-3 px-4">Principal Engineers</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Case Studies & Research Reports</td>
                    <td className="py-3 px-4">Annual Review</td>
                    <td className="py-3 px-4">Delivery Leads</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <RelatedContextGrid items={[
            {
                title: "Security & Compliance Policy",
                description: "Read about our SDLC security, OWASP top 10 adherence, and enterprise data privacy.",
                href: "/trust/security-policy",
                category: "Resource",
            },
            {
                title: "Engineering Standards",
                description: "Explore our code review process, CI/CD pipeline rigor, and SLA commitments.",
                href: "/trust/engineering-standards",
                category: "Resource",
            },
            {
                title: "AI Development Services",
                description: "Learn how we build production-grade agentic AI and RAG applications.",
                href: "/ai-automation-development",
                category: "Service",
            },
        ]}/>
      </main>

      <Footer />
    </div>);
}
