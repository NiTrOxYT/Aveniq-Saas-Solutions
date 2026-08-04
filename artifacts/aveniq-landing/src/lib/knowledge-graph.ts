export type EntityNodeType =
  | "Service"
  | "Technology"
  | "Guide"
  | "Article"
  | "Glossary"
  | "CaseStudy"
  | "Industry"
  | "Solution"
  | "Architecture"
  | "Playbook"
  | "Tool"
  | "Documentation"
  | "Integration"
  | "BestPractice"
  | "Resource";

export type RelationshipType =
  | "RelatedTo"
  | "DependsOn"
  | "Uses"
  | "Implements"
  | "AlternativeTo"
  | "PartOf"
  | "Explains"
  | "IntegratesWith"
  | "RecommendedFor"
  | "Prerequisite";

export interface GraphEntityNode {
  id: string;
  slug: string;
  title: string;
  type: EntityNodeType;
  description: string;
  href: string;
  tags: string[];
  relationships: Array<{
    targetId: string;
    relationship: RelationshipType;
  }>;
}

export const entityGraphRegistry: Record<string, GraphEntityNode> = {
  "ai-agents": {
    id: "ai-agents",
    slug: "ai-automation-development",
    title: "AI Development & Agentic Systems",
    type: "Service",
    description: "Custom AI agents, LangChain/LangGraph orchestration, RAG, and vector search systems.",
    href: "/ai-automation-development",
    tags: ["AI", "Agents", "RAG", "MCP", "LangGraph"],
    relationships: [
      { targetId: "mcp-protocol", relationship: "Uses" },
      { targetId: "enterprise-rag", relationship: "DependsOn" },
      { targetId: "ai-roi-calc", relationship: "RecommendedFor" },
    ],
  },
  "custom-saas": {
    id: "custom-saas",
    slug: "saas-development",
    title: "Custom SaaS Development",
    type: "Service",
    description: "Multi-tenant SaaS architecture, Stripe billing, role-based access control, and API engineering.",
    href: "/saas-development",
    tags: ["SaaS", "Multi-Tenancy", "Stripe", "Next.js", "PostgreSQL"],
    relationships: [
      { targetId: "saas-estimator", relationship: "RecommendedFor" },
      { targetId: "multi-tenant-arch", relationship: "Implements" },
    ],
  },
  "mcp-protocol": {
    id: "mcp-protocol",
    slug: "docs",
    title: "Model Context Protocol (MCP)",
    type: "Documentation",
    description: "Standardized open protocol for connecting AI models to tools, databases, and enterprise APIs.",
    href: "/docs",
    tags: ["MCP", "Tools", "JSON-RPC", "Protocol"],
    relationships: [
      { targetId: "ai-agents", relationship: "IntegratesWith" },
    ],
  },
  "enterprise-rag": {
    id: "enterprise-rag",
    slug: "docs",
    title: "Enterprise RAG Architecture",
    type: "Architecture",
    description: "Hybrid vector search, dense embeddings, BM25 re-ranking, and Knowledge Graph retrieval.",
    href: "/docs",
    tags: ["RAG", "Vector DB", "Embeddings", "Pinecone"],
    relationships: [
      { targetId: "ai-agents", relationship: "Prerequisite" },
    ],
  },
  "ai-roi-calc": {
    id: "ai-roi-calc",
    slug: "tools/ai-roi-calculator",
    title: "AI ROI & Savings Calculator",
    type: "Tool",
    description: "Interactive model for projecting labor savings, time saved, and 1st-year ROI from custom AI automation.",
    href: "/tools/ai-roi-calculator",
    tags: ["Tool", "ROI", "Calculator", "AI Savings"],
    relationships: [
      { targetId: "ai-agents", relationship: "Explains" },
    ],
  },
  "saas-estimator": {
    id: "saas-estimator",
    slug: "tools/saas-cost-estimator",
    title: "SaaS Cost & Timeline Estimator",
    type: "Tool",
    description: "Configurable scope and budget estimator for custom SaaS and multi-tenant platforms.",
    href: "/tools/saas-cost-estimator",
    tags: ["Tool", "Estimator", "SaaS", "Budget"],
    relationships: [
      { targetId: "custom-saas", relationship: "Explains" },
    ],
  },
  "multi-tenant-arch": {
    id: "multi-tenant-arch",
    slug: "architecture",
    title: "Multi-Tenant SaaS Architecture Blueprint",
    type: "Architecture",
    description: "Supabase RLS, tenant database isolation, and high-availability microservice design.",
    href: "/architecture",
    tags: ["Blueprint", "SaaS", "PostgreSQL", "RLS"],
    relationships: [
      { targetId: "custom-saas", relationship: "Explains" },
    ],
  },
};

export function getRelatedNodes(nodeId: string): GraphEntityNode[] {
  const sourceNode = entityGraphRegistry[nodeId];
  if (!sourceNode) return [];

  return sourceNode.relationships
    .map((rel) => entityGraphRegistry[rel.targetId])
    .filter(Boolean);
}
