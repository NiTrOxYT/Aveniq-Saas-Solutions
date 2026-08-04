import { useEffect } from "react";

export interface SchemaMarkupProps {
  schema: Record<string, any> | Array<Record<string, any>>;
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  useEffect(() => {
    const scriptId = "json-ld-schema-script";
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = scriptId;
      scriptElement.type = "application/ld+json";
      document.head.appendChild(scriptElement);
    }

    scriptElement.textContent = JSON.stringify(schema, null, 2);

    return () => {
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, [schema]);

  return null;
}

// Preset standard schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Aveniq",
  "url": "https://theaveniq.site",
  "logo": "https://theaveniq.site/logo.png",
  "description": "Enterprise AI software development company specializing in custom SaaS, AI agents, RAG, workflow automation, and digital transformation.",
  "sameAs": [
    "https://github.com/aveniq",
    "https://linkedin.com/company/aveniq",
    "https://twitter.com/aveniq_tech"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "contact@theaveniq.site",
    "url": "https://theaveniq.site/contact"
  }
};
