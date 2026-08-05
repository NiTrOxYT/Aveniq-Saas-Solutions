import { useEffect } from "react";

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
}

export default function SEOHead({
  title = "Aveniq — AI Software Development, Custom SaaS & Automation",
  description = "Aveniq is an enterprise AI software development company specializing in custom SaaS solutions, AI agents, RAG, workflow automation, and digital transformation.",
  canonical,
  ogType = "website",
  ogImage = "https://theaveniq.site/preview-og.jpg",
  keywords = "AI development company, AI agents, custom SaaS development, enterprise software, workflow automation, RAG, MCP, Next.js, React, Node.js",
}: SEOHeadProps) {
  useEffect(() => {
    // Title
    document.title = title;

    // Helper to set or create meta tags
    const setMetaTag = (nameAttr: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(nameAttr, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);
    setMetaTag("name", "robots", "index, follow");

    // OpenGraph
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:image:secure_url", ogImage);
    setMetaTag("property", "og:image:type", "image/jpeg");
    setMetaTag("property", "og:image:width", "1200");
    setMetaTag("property", "og:image:height", "630");
    setMetaTag("property", "og:site_name", "Aveniq");

    // Twitter
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage);

    // Canonical link
    const targetUrl = canonical || window.location.href;
    let canonicalLink = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", targetUrl);
  }, [title, description, canonical, ogType, ogImage, keywords]);

  return null;
}
