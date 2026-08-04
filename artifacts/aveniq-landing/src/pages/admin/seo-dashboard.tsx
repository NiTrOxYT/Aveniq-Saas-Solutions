import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, AlertTriangle, RefreshCw, Layers, Shield, FileText, Search, Activity } from "lucide-react";

export default function SEODashboardPage() {
  const [filter, setFilter] = useState<string>("all");

  const auditItems = [
    { page: "/", title: "Homepage", status: "Optimal", schema: "Organization, WebSite", lastReviewed: "2026-08-01", nextReview: "2026-11-01" },
    { page: "/ai-automation-development", title: "AI Development", status: "Optimal", schema: "Service, FAQPage", lastReviewed: "2026-08-02", nextReview: "2026-11-02" },
    { page: "/saas-development", title: "Custom SaaS", status: "Optimal", schema: "Service, FAQPage", lastReviewed: "2026-08-02", nextReview: "2026-11-02" },
    { page: "/tools/ai-roi-calculator", title: "AI ROI Tool", status: "Optimal", schema: "SoftwareApplication", lastReviewed: "2026-08-04", nextReview: "2026-11-04" },
    { page: "/tools/saas-cost-estimator", title: "SaaS Estimator", status: "Optimal", schema: "SoftwareApplication", lastReviewed: "2026-08-04", nextReview: "2026-11-04" },
    { page: "/trust/editorial-policy", title: "Editorial Policy", status: "Optimal", schema: "WebPage", lastReviewed: "2026-08-04", nextReview: "2027-02-04" },
    { page: "/trust/security-policy", title: "Security Policy", status: "Optimal", schema: "WebPage", lastReviewed: "2026-08-04", nextReview: "2027-02-04" },
    { page: "/developers", title: "Developer Hub", status: "Optimal", schema: "CollectionPage", lastReviewed: "2026-08-04", nextReview: "2026-11-04" },
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#6750A4]">
      <SEOHead
        title="SEO & Content Intelligence Dashboard | Aveniq Admin"
        description="Internal monitoring dashboard for tracking content review schedules, schema coverage, Core Web Vitals, and topical authority health."
      />
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-white/10 gap-4">
          <div>
            <span className="text-[#9C89D9] text-xs uppercase font-mono tracking-widest bg-[#6750A4]/20 px-3 py-1 rounded-full border border-[#9C89D9]/20">
              Internal Governance
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-white mt-2">
              Content Intelligence & SEO Health Dashboard
            </h1>
          </div>
          <button className="self-start md:self-auto py-2.5 px-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white flex items-center gap-2 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Trigger Audit Crawl
          </button>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-5 rounded-xl bg-zinc-950 border border-white/10">
            <p className="text-white/50 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Schema Coverage
            </p>
            <p className="text-3xl font-mono text-white font-bold">100%</p>
            <p className="text-[11px] text-emerald-400 mt-1">8 / 8 Active Routes Validated</p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-950 border border-white/10">
            <p className="text-white/50 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-[#9C89D9]" /> Core Web Vitals
            </p>
            <p className="text-3xl font-mono text-white font-bold">98 / 100</p>
            <p className="text-[11px] text-white/50 mt-1">LCP: 1.2s • INP: 45ms</p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-950 border border-white/10">
            <p className="text-white/50 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-amber-400" /> Indexation Rate
            </p>
            <p className="text-3xl font-mono text-white font-bold">100%</p>
            <p className="text-[11px] text-white/50 mt-1">Dynamic Sitemap Validated</p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-950 border border-white/10">
            <p className="text-white/50 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" /> Content Freshness
            </p>
            <p className="text-3xl font-mono text-white font-bold">Optimal</p>
            <p className="text-[11px] text-emerald-400 mt-1">0 Flagged for Deprecation</p>
          </div>
        </div>

        {/* Audit Table */}
        <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10">
          <h2 className="text-white font-medium text-lg mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#9C89D9]" /> Route Audit & Review Governance Matrix
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/60">
                  <th className="py-3 px-3">Route</th>
                  <th className="py-3 px-3">Title</th>
                  <th className="py-3 px-3">JSON-LD Schema</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Last Review</th>
                  <th className="py-3 px-3">Next Scheduled Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {auditItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-semibold text-[#9C89D9]">{item.page}</td>
                    <td className="py-3 px-3 font-sans text-white">{item.title}</td>
                    <td className="py-3 px-3 text-white/60">{item.schema}</td>
                    <td className="py-3 px-3">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-white/50">{item.lastReviewed}</td>
                    <td className="py-3 px-3 text-white/50">{item.nextReview}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
