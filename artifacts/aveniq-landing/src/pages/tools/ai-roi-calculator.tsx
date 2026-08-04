import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { organizationSchema } from "@/components/SchemaMarkup";
import ContentMetaHeader from "@/components/ContentMetaHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedContextGrid from "@/components/RelatedContextGrid";
import { Calculator, DollarSign, TrendingUp, Clock, Zap, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function AIRoiCalculatorPage() {
  const [teamSize, setTeamSize] = useState<number>(25);
  const [hourlyRate, setHourlyRate] = useState<number>(65);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState<number>(12);
  const [automationPercent, setAutomationPercent] = useState<number>(60);

  // Calculations
  const weeklyManualCostPerPerson = manualHoursPerWeek * hourlyRate;
  const totalWeeklyManualCost = weeklyManualCostPerPerson * teamSize;
  const annualManualCost = totalWeeklyManualCost * 52;
  const annualSavedHours = (manualHoursPerWeek * (automationPercent / 100)) * 52 * teamSize;
  const annualCostSavings = annualManualCost * (automationPercent / 100);
  const estimatedImplementationCost = Math.round(annualCostSavings * 0.25);
  const netFirstYearROI = Math.round(((annualCostSavings - estimatedImplementationCost) / (estimatedImplementationCost || 1)) * 100);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#6750A4]">
      <SEOHead
        title="AI ROI & Automation Savings Calculator | Aveniq"
        description="Calculate potential annual cost savings, time saved, and first-year ROI from deploying custom AI agents, workflow automation, and RAG architectures in your enterprise."
        canonical="https://theaveniq.site/tools/ai-roi-calculator"
      />
      <SchemaMarkup
        schema={[
          organizationSchema,
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Aveniq AI ROI & Automation Savings Calculator",
            "operatingSystem": "Web",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
            },
          },
        ]}
      />
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-32">
        <ContentMetaHeader
          title="Interactive Enterprise AI ROI & Savings Calculator"
          subtitle="Model the projected financial impact, labor efficiency gains, and payback period of deploying custom AI agents and workflow automation in your organization."
          category="Interactive Tool"
          author="AI Engineering Team"
          reviewer="Head of Solutions Architecture"
          lastUpdated="August 2026"
          version="v2.0.0"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Controls Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-white/10 space-y-6">
            <h2 className="text-white text-xl font-medium flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-[#9C89D9]" /> Model Parameters
            </h2>

            {/* Team Size */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <label className="text-white/80 font-medium">Team Size (Employees):</label>
                <span className="text-[#9C89D9] font-mono font-semibold text-base">{teamSize}</span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                step="5"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-[#9C89D9] cursor-pointer"
              />
            </div>

            {/* Average Hourly Rate */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <label className="text-white/80 font-medium">Average Blended Hourly Rate ($/hr):</label>
                <span className="text-[#9C89D9] font-mono font-semibold text-base">${hourlyRate}</span>
              </div>
              <input
                type="range"
                min="25"
                max="250"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-[#9C89D9] cursor-pointer"
              />
            </div>

            {/* Manual Hours / Week */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <label className="text-white/80 font-medium">Repetitive Work / Employee (hrs/week):</label>
                <span className="text-[#9C89D9] font-mono font-semibold text-base">{manualHoursPerWeek} hrs</span>
              </div>
              <input
                type="range"
                min="2"
                max="35"
                step="1"
                value={manualHoursPerWeek}
                onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
                className="w-full accent-[#9C89D9] cursor-pointer"
              />
            </div>

            {/* Target Automation % */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <label className="text-white/80 font-medium">Target AI Automation Efficiency (%):</label>
                <span className="text-[#9C89D9] font-mono font-semibold text-base">{automationPercent}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={automationPercent}
                onChange={(e) => setAutomationPercent(Number(e.target.value))}
                className="w-full accent-[#9C89D9] cursor-pointer"
              />
            </div>
          </div>

          {/* ROI Results Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-[#9C89D9]/40 flex flex-col justify-between shadow-2xl">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9C89D9] font-semibold flex items-center gap-1.5 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> Projected Impact
              </span>

              <div className="mb-6">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Estimated Annual Savings</p>
                <p className="text-4xl sm:text-5xl font-mono font-bold text-emerald-400">
                  ${Math.round(annualCostSavings).toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-white/50 text-xs mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#9C89D9]" /> Hours Saved / Yr
                  </p>
                  <p className="text-xl font-mono text-white font-semibold">
                    {Math.round(annualSavedHours).toLocaleString()} hrs
                  </p>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> Est 1st-Yr ROI
                  </p>
                  <p className="text-xl font-mono text-emerald-400 font-semibold">
                    +{netFirstYearROI}%
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link
                href="/start-project"
                className="w-full py-3.5 px-6 rounded-xl bg-[#6750A4] hover:bg-[#9C89D9] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors duration-300"
              >
                Schedule AI Architecture Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <RelatedContextGrid
          items={[
            {
              title: "AI Development Services",
              description: "Custom AI agents, LLM fine-tuning, and RAG pipelines for enterprise.",
              href: "/ai-automation-development",
              category: "Service",
            },
            {
              title: "SaaS Cost Estimator",
              description: "Calculate development budget and timeline for custom software.",
              href: "/tools/saas-cost-estimator",
              category: "Tool",
            },
            {
              title: "RAG vs Fine-Tuning Comparison",
              description: "Deep dive on model customization architecture strategies.",
              href: "/compare/rag-vs-fine-tuning",
              category: "Guide",
            },
          ]}
        />
      </main>

      <Footer />
    </div>
  );
}
