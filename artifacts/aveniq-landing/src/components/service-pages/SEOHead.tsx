import { useEffect } from "react";
import type { ServiceConfig } from "@/data/serviceData";

interface SEOHeadProps {
  service: ServiceConfig;
}

/**
 * SEOHead — injects all SEO meta tags + JSON-LD schemas into document.head
 * via useEffect. Works in Vite SPA context (Googlebot executes JS).
 */
export function SEOHead({ service }: SEOHeadProps) {
  useEffect(() => {
    const { seo, hero, faqs, schemaService, routePath } = service;
    const siteUrl = "https://theaveniq.in";

    // ── Helpers ──────────────────────────────────────────────────────────────

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr.split("=")[0], attr.split("=")[1]);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    const injectScript = (id: string, content: string) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.text = content;
      document.head.appendChild(script);
    };

    // ── Title ─────────────────────────────────────────────────────────────────
    document.title = seo.title;

    // ── Meta description ──────────────────────────────────────────────────────
    setMeta('meta[name="description"]', 'name=description', seo.description);
    setMeta('meta[name="robots"]', 'name=robots', 'index, follow');

    // ── Canonical ─────────────────────────────────────────────────────────────
    setLink("canonical", seo.canonical);

    // ── Open Graph ────────────────────────────────────────────────────────────
    setMeta('meta[property="og:type"]', 'property=og:type', 'website');
    setMeta('meta[property="og:title"]', 'property=og:title', seo.title);
    setMeta('meta[property="og:description"]', 'property=og:description', seo.description);
    setMeta('meta[property="og:url"]', 'property=og:url', seo.canonical);
    setMeta('meta[property="og:image"]', 'property=og:image', seo.ogImage);
    setMeta('meta[property="og:site_name"]', 'property=og:site_name', 'Aveniq');

    // ── Twitter Card ──────────────────────────────────────────────────────────
    setMeta('meta[name="twitter:card"]', 'name=twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name=twitter:title', seo.title);
    setMeta('meta[name="twitter:description"]', 'name=twitter:description', seo.description);
    setMeta('meta[name="twitter:image"]', 'name=twitter:image', seo.ogImage);

    // ── JSON-LD: Organization ─────────────────────────────────────────────────
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Aveniq",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      description:
        "Aveniq is a premium software agency building SaaS platforms, AI automation systems, mobile apps, and custom software for startups and enterprises.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "52 - Nabanagar, M.A Sarani, Birati",
        addressLocality: "Kolkata",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@theaveniq.in",
        contactType: "customer service",
        availableLanguage: ["English"],
      },
      sameAs: [
        "https://linkedin.com/company/aveniq",
        "https://twitter.com/aveniq",
        "https://github.com/aveniq",
      ],
    };

    // ── JSON-LD: Service ──────────────────────────────────────────────────────
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: schemaService.name,
      description: schemaService.description,
      serviceType: schemaService.serviceType,
      provider: {
        "@type": "Organization",
        name: "Aveniq",
        url: siteUrl,
      },
      url: seo.canonical,
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: schemaService.name,
      },
    };

    // ── JSON-LD: BreadcrumbList ───────────────────────────────────────────────
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${siteUrl}/services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: schemaService.name,
          item: seo.canonical,
        },
      ],
    };

    // ── JSON-LD: FAQPage ──────────────────────────────────────────────────────
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    // Inject all schemas
    injectScript("schema-org", JSON.stringify(orgSchema));
    injectScript("schema-service", JSON.stringify(serviceSchema));
    injectScript("schema-breadcrumb", JSON.stringify(breadcrumbSchema));
    injectScript("schema-faq", JSON.stringify(faqSchema));

    // Cleanup on unmount
    return () => {
      document.title = "Aveniq — Premium Software Agency";
      ["schema-org", "schema-service", "schema-breadcrumb", "schema-faq"].forEach(
        (id) => document.getElementById(id)?.remove()
      );
    };
  }, [service]);

  return null;
}
