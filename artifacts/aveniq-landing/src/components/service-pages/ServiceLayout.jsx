import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedContextGrid from "@/components/RelatedContextGrid";
import { SEOHead } from "./SEOHead";
import { ServiceHero } from "./ServiceHero";
import { ServiceOverview } from "./ServiceOverview";
import { WhyAveniqService } from "./WhyAveniqService";
import { ProcessTimeline } from "./ProcessTimeline";
import { TechStack } from "./TechStack";
import { IndustriesServed } from "./IndustriesServed";
import { ServicePortfolio } from "./ServicePortfolio";
import { Testimonials } from "./Testimonials";
import { ServiceFAQ } from "./ServiceFAQ";
import { ServiceCTA } from "./ServiceCTA";
import { ServiceAtmosphere } from "./ServiceAtmosphere";
/**
 * ServiceLayout — shared wrapper for all 8 service pages.
 * Composes all reusable sections with the existing Navbar + Footer.
 * Includes a scroll-progress indicator matching Aveniq OS aesthetic.
 */
export function ServiceLayout({ service }) {
    // Scroll-to-top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [service.slug]);
    const fallbackLinks = service.slug === "saas-development"
        ? [
            {
                title: "AI Automation Development",
                description: "Build intelligent LLM-powered pipelines and custom AI agents to automate operational work.",
                href: "/ai-automation-development",
                category: "Service",
            },
            {
                title: "SaaS Cost Estimator",
                description: "Estimate your project cost, scoping parameters, and custom build timelines.",
                href: "/tools/saas-cost-estimator",
                category: "Tool",
            },
            {
                title: "Engineering Standards",
                description: "Discover our testing models, strict type safety, and deployment pipelines.",
                href: "/trust/engineering-standards",
                category: "Resource",
            },
        ]
        : service.slug === "ai-automation-development"
            ? [
                {
                    title: "Custom SaaS Development",
                    description: "Architect high-performance, multi-tenant SaaS products ready for scale.",
                    href: "/saas-development",
                    category: "Service",
                },
                {
                    title: "AI ROI Calculator",
                    description: "Calculate your operational savings, time saved, and first-year ROI with custom AI solutions.",
                    href: "/tools/ai-roi-calculator",
                    category: "Tool",
                },
                {
                    title: "Security Policy",
                    description: "Learn how we handle data security, key rotations, and compliance benchmarks.",
                    href: "/trust/security-policy",
                    category: "Resource",
                },
            ]
            : [
                {
                    title: "Custom SaaS Development",
                    description: "Architect high-performance, multi-tenant SaaS products ready for scale.",
                    href: "/saas-development",
                    category: "Service",
                },
                {
                    title: "AI Automation Development",
                    description: "Build intelligent LLM-powered pipelines and custom AI agents to automate operational work.",
                    href: "/ai-automation-development",
                    category: "Service",
                },
                {
                    title: "Engineering Standards",
                    description: "Discover our testing models, strict type safety, and deployment pipelines.",
                    href: "/trust/engineering-standards",
                    category: "Resource",
                },
            ];
    const related = service.relatedLinks || fallbackLinks;
    return (<div className="relative min-h-screen text-white selection:bg-[#6750A4] selection:text-white overflow-x-hidden">
      
      {/* Visual background layers */}
      <ServiceAtmosphere />

      {/* SEO meta injection */}
      <SEOHead service={service}/>

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Existing Navbar — not modified */}
      <Navbar />

      {/* Page content */}
      <main id="main-content">
        {/* Schema breadcrumb nav — visually hidden but semantic */}
        <nav aria-label="Breadcrumb" className="sr-only">
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li aria-current="page">{service.schemaService.name}</li>
          </ol>
        </nav>

        <ServiceHero service={service}/>
        <ServiceOverview service={service}/>
        <WhyAveniqService />
        <ProcessTimeline />
        <TechStack service={service}/>
        <IndustriesServed />
        <ServicePortfolio service={service}/>
        <Testimonials />
        <ServiceFAQ service={service}/>
        
        <div className="max-w-7xl mx-auto px-6 py-12">
          <RelatedContextGrid items={related}/>
        </div>

        <ServiceCTA />
      </main>

      <Footer />
    </div>);
}
// ──────────────────────────────────────────────────────────────────────────────
// Scroll Progress Bar — thin purple line at the top of viewport
// ──────────────────────────────────────────────────────────────────────────────
function ScrollProgress() {
    useEffect(() => {
        const bar = document.getElementById("scroll-progress-bar");
        if (!bar)
            return;
        const onScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
            bar.style.width = `${progress}%`;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (<div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-transparent" aria-hidden="true">
      <div id="scroll-progress-bar" className="h-full w-0 transition-none" style={{
            background: "linear-gradient(90deg, #6750A4, #9C89D9)",
        }}/>
    </div>);
}
