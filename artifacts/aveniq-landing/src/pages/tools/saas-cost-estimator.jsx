import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { organizationSchema } from "@/components/SchemaMarkup";
import ContentMetaHeader from "@/components/ContentMetaHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedContextGrid from "@/components/RelatedContextGrid";
import { Wrench, CheckSquare, ArrowRight, Calendar } from "lucide-react";
import { Link } from "wouter";
export default function SaasCostEstimatorPage() {
    const [platformType, setPlatformType] = useState("web");
    const [authType, setAuthType] = useState("oauth");
    const [hasAI, setHasAI] = useState(true);
    const [hasPayments, setHasPayments] = useState(true);
    const [hasAdminDashboard, setHasAdminDashboard] = useState(true);
    const [scalabilityLevel, setScalabilityLevel] = useState("growth");
    // Cost heuristic computation
    let baseCost = 15000;
    let baseWeeks = 6;
    if (platformType === "cross") {
        baseCost += 12000;
        baseWeeks += 4;
    }
    if (authType === "enterprise") {
        baseCost += 5000;
        baseWeeks += 2;
    }
    if (hasAI) {
        baseCost += 15000;
        baseWeeks += 4;
    }
    if (hasPayments) {
        baseCost += 6000;
        baseWeeks += 2;
    }
    if (hasAdminDashboard) {
        baseCost += 8000;
        baseWeeks += 3;
    }
    if (scalabilityLevel === "enterprise") {
        baseCost += 20000;
        baseWeeks += 5;
    }
    return (<div className="bg-black min-h-screen text-white selection:bg-[#6750A4]">
      <SEOHead title="SaaS Development Cost & Timeline Estimator | Aveniq" description="Estimate software development budget, delivery timeline, and technical architecture specifications for your custom SaaS or enterprise platform." canonical="https://theaveniq.site/tools/saas-cost-estimator"/>
      <SchemaMarkup schema={[
            organizationSchema,
            {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Aveniq SaaS Development Cost Estimator",
                "operatingSystem": "Web",
                "applicationCategory": "DeveloperApplication",
            },
        ]}/>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-32">
        <ContentMetaHeader title="Interactive Custom SaaS Cost & Timeline Estimator" subtitle="Configure feature scope, authentication complexity, AI integration, and multi-tenancy requirements to generate an instant budget and timeline projection." category="Interactive Tool" author="SaaS Delivery Team" reviewer="VP of Engineering" lastUpdated="August 2026" version="v1.8.0"/>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Options Matrix */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-white/10 space-y-6">
            <h2 className="text-white text-xl font-medium flex items-center gap-2 mb-4">
              <Wrench className="w-5 h-5 text-[#9C89D9]"/> Scope Configuration
            </h2>

            {/* Target Platform */}
            <div>
              <label className="block text-white/80 font-medium text-sm mb-2">Target Platform Scope:</label>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setPlatformType("web")} className={`p-3 text-xs rounded-xl border font-medium text-left transition-all ${platformType === "web"
            ? "bg-[#6750A4]/20 border-[#9C89D9] text-white"
            : "bg-white/5 border-white/10 text-white/60 hover:text-white"}`}>
                  Web App Only (Next.js / React)
                </button>
                <button onClick={() => setPlatformType("cross")} className={`p-3 text-xs rounded-xl border font-medium text-left transition-all ${platformType === "cross"
            ? "bg-[#6750A4]/20 border-[#9C89D9] text-white"
            : "bg-white/5 border-white/10 text-white/60 hover:text-white"}`}>
                  Web + Mobile App (React Native)
                </button>
              </div>
            </div>

            {/* Checkboxes for Features */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <label className="block text-white/80 font-medium text-sm">Key Capabilities & Integrations:</label>

              <label className="flex items-center gap-3 text-sm text-white/80 cursor-pointer">
                <input type="checkbox" checked={hasAI} onChange={(e) => setHasAI(e.target.checked)} className="w-4 h-4 accent-[#9C89D9] rounded"/>
                <span>AI Agents / RAG / LLM Feature Suite</span>
              </label>

              <label className="flex items-center gap-3 text-sm text-white/80 cursor-pointer">
                <input type="checkbox" checked={hasPayments} onChange={(e) => setHasPayments(e.target.checked)} className="w-4 h-4 accent-[#9C89D9] rounded"/>
                <span>Stripe Subscriptions & Multi-Currency Billing</span>
              </label>

              <label className="flex items-center gap-3 text-sm text-white/80 cursor-pointer">
                <input type="checkbox" checked={hasAdminDashboard} onChange={(e) => setHasAdminDashboard(e.target.checked)} className="w-4 h-4 accent-[#9C89D9] rounded"/>
                <span>Role-Based Enterprise Admin Portal</span>
              </label>
            </div>

            {/* Scalability Level */}
            <div className="pt-4 border-t border-white/10">
              <label className="block text-white/80 font-medium text-sm mb-2">Target Infrastructure Scale:</label>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setScalabilityLevel("growth")} className={`p-3 text-xs rounded-xl border font-medium text-left transition-all ${scalabilityLevel === "growth"
            ? "bg-[#6750A4]/20 border-[#9C89D9] text-white"
            : "bg-white/5 border-white/10 text-white/60 hover:text-white"}`}>
                  Growth Tier (&lt; 100k Monthly Active Users)
                </button>
                <button onClick={() => setScalabilityLevel("enterprise")} className={`p-3 text-xs rounded-xl border font-medium text-left transition-all ${scalabilityLevel === "enterprise"
            ? "bg-[#6750A4]/20 border-[#9C89D9] text-white"
            : "bg-white/5 border-white/10 text-white/60 hover:text-white"}`}>
                  Enterprise Tier (High Availability & SOC2)
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-[#9C89D9]/40 flex flex-col justify-between shadow-2xl">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9C89D9] font-semibold flex items-center gap-1.5 mb-4">
                <CheckSquare className="w-4 h-4 text-emerald-400"/> Projected Scope
              </span>

              <div className="mb-6">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Estimated Project Investment</p>
                <p className="text-4xl sm:text-5xl font-mono font-bold text-white">
                  ${baseCost.toLocaleString()}
                  <span className="text-xs text-white/40 font-normal"> USD</span>
                </p>
              </div>

              <div className="mb-6 pt-4 border-t border-white/10">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#9C89D9]"/> Estimated Delivery Timeline
                </p>
                <p className="text-2xl font-mono text-emerald-400 font-semibold">
                  {baseWeeks} – {baseWeeks + 2} Weeks
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link href="/start-project" className="w-full py-3.5 px-6 rounded-xl bg-[#6750A4] hover:bg-[#9C89D9] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors duration-300">
                Request Statement of Work (SOW) <ArrowRight className="w-4 h-4"/>
              </Link>
            </div>
          </div>
        </div>

        <RelatedContextGrid items={[
            {
                title: "Custom SaaS Development Services",
                description: "Explore our multi-tenant microservice SaaS engineering capabilities.",
                href: "/saas-development",
                category: "Service",
            },
            {
                title: "AI ROI Calculator",
                description: "Model labor cost savings from deploying custom AI automation.",
                href: "/tools/ai-roi-calculator",
                category: "Tool",
            },
            {
                title: "Engineering Standards",
                description: "Review our SLA guarantees and strict code quality standards.",
                href: "/trust/engineering-standards",
                category: "Resource",
            },
        ]}/>
      </main>

      <Footer />
    </div>);
}
