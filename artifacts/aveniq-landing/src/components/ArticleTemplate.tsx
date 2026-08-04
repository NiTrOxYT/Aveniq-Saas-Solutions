import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { organizationSchema } from "@/components/SchemaMarkup";
import ContentMetaHeader from "@/components/ContentMetaHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedContextGrid, { ContextLink } from "@/components/RelatedContextGrid";
import { CheckCircle2, AlertTriangle, Cpu, Terminal, Shield, Zap, Layers, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TradeOffRow {
  dimension: string;
  optionA: string;
  optionB: string;
  recommendation: string;
}

export interface ArticleTemplateProps {
  title: string;
  subtitle: string;
  category: string;
  slug: string;
  author?: string;
  reviewer?: string;
  lastUpdated?: string;
  readTime?: string;
  version?: string;
  executiveSummary: string;
  problemStatement: string;
  whenToUse: string[];
  whenNotToUse: string[];
  architectureOverview: string;
  tradeOffs: TradeOffRow[];
  tradeOffHeaders?: [string, string];
  productionLessons: string[];
  codeExample?: {
    language: string;
    code: string;
    description: string;
  };
  faqs: FAQItem[];
  relatedLinks: ContextLink[];
}

export default function ArticleTemplate({
  title,
  subtitle,
  category,
  slug,
  author = "Aveniq Principal Architect",
  reviewer = "VP of Engineering",
  lastUpdated = "August 2026",
  readTime = "15 min read",
  version = "v1.2.0",
  executiveSummary,
  problemStatement,
  whenToUse,
  whenNotToUse,
  architectureOverview,
  tradeOffs,
  tradeOffHeaders = ["Option A", "Option B"],
  productionLessons,
  codeExample,
  faqs,
  relatedLinks,
}: ArticleTemplateProps) {
  const canonicalUrl = `https://theaveniq.site/articles/${slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": title,
    "description": subtitle,
    "url": canonicalUrl,
    "author": {
      "@type": "Organization",
      "name": author,
    },
    "publisher": organizationSchema,
    "datePublished": "2026-08-01",
    "dateModified": "2026-08-04",
  };

  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#6750A4]">
      <SEOHead
        title={`${title} | Aveniq Engineering`}
        description={subtitle}
        canonical={canonicalUrl}
        ogType="article"
      />
      <SchemaMarkup schema={[organizationSchema, articleSchema, faqSchema]} />
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-32">
        <ContentMetaHeader
          title={title}
          subtitle={subtitle}
          category={category}
          author={author}
          reviewer={reviewer}
          lastUpdated={lastUpdated}
          readTime={readTime}
          version={version}
        />

        {/* 1. Executive Summary */}
        <section className="p-6 rounded-2xl bg-zinc-950 border border-[#9C89D9]/30 mb-12">
          <h2 className="text-[#9C89D9] font-medium text-lg mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" /> Executive Summary
          </h2>
          <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
            {executiveSummary}
          </p>
        </section>

        {/* 2. Problem Statement */}
        <section className="mb-12 space-y-4">
          <h2 className="font-serif text-3xl text-white">Problem Statement & Engineering Context</h2>
          <p className="text-white/70 text-base leading-relaxed font-light">
            {problemStatement}
          </p>
        </section>

        {/* 3. When To Use / When NOT To Use */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
            <h3 className="text-emerald-400 font-medium text-base mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> When To Use
            </h3>
            <ul className="space-y-2 text-xs text-white/70">
              {whenToUse.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-rose-950/20 border border-rose-500/30">
            <h3 className="text-rose-400 font-medium text-base mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> When NOT To Use
            </h3>
            <ul className="space-y-2 text-xs text-white/70">
              {whenNotToUse.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. Architecture Overview */}
        <section className="mb-12 space-y-4">
          <h2 className="font-serif text-3xl text-white">Architecture & System Design Overview</h2>
          <p className="text-white/70 text-base leading-relaxed font-light whitespace-pre-line">
            {architectureOverview}
          </p>
        </section>

        {/* 5. Trade-Off Comparison Matrix */}
        {tradeOffs && tradeOffs.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-white mb-4">Engineering Trade-Off Matrix</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-white/20 text-white font-semibold">
                    <th className="py-3 px-3">Evaluation Metric</th>
                    <th className="py-3 px-3">{tradeOffHeaders[0]}</th>
                    <th className="py-3 px-3">{tradeOffHeaders[1]}</th>
                    <th className="py-3 px-3">Aveniq Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/70">
                  {tradeOffs.map((row, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-3 font-sans text-white font-medium">{row.dimension}</td>
                      <td className="py-3 px-3 text-white/60">{row.optionA}</td>
                      <td className="py-3 px-3 text-white/60">{row.optionB}</td>
                      <td className="py-3 px-3 text-[#9C89D9] font-medium">{row.recommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 6. Code Example */}
        {codeExample && (
          <section className="mb-12 space-y-3">
            <h2 className="font-serif text-2xl text-white">Implementation Code Pattern</h2>
            <p className="text-white/60 text-xs font-light">{codeExample.description}</p>
            <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 font-mono text-xs overflow-x-auto text-emerald-400">
              <pre>{codeExample.code}</pre>
            </div>
          </section>
        )}

        {/* 7. Information Gain — Real Production Lessons */}
        <section className="p-6 rounded-2xl bg-zinc-950 border border-white/10 mb-12 space-y-4">
          <h2 className="text-white font-medium text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#9C89D9]" /> Real Production Lessons & Failure Scenarios
          </h2>
          <ul className="space-y-3 text-xs text-white/70">
            {productionLessons.map((lesson, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#9C89D9] font-mono font-bold">{idx + 1}.</span>
                <span className="leading-relaxed">{lesson}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 8. FAQs */}
        {faqs && faqs.length > 0 && (
          <section className="mb-12 space-y-6">
            <h2 className="font-serif text-3xl text-white flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-[#9C89D9]" /> Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-zinc-950/60 border border-white/10 space-y-2">
                  <h3 className="text-white font-medium text-base">{faq.question}</h3>
                  <p className="text-white/60 text-sm font-light leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 9. Contextual Internal Linking */}
        <RelatedContextGrid items={relatedLinks} />

        {/* CTA Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-zinc-900 to-black border border-[#9C89D9]/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-serif text-2xl mb-2">Need Custom Enterprise AI Implementation?</h3>
            <p className="text-white/60 text-sm font-light">Schedule an architecture review session with Aveniq principal engineers.</p>
          </div>
          <Link
            href="/start-project"
            className="py-3 px-6 rounded-xl bg-[#6750A4] hover:bg-[#9C89D9] text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shrink-0"
          >
            Start Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
