export const learningPaths = [
    {
        id: "ai-architect-path",
        title: "Enterprise AI Architect Path",
        targetRole: "AI Architect",
        description: "Master multi-agent orchestration, Model Context Protocol (MCP), hybrid RAG pipelines, and LLM cost governance.",
        steps: [
            { stepNumber: 1, title: "AI Development & Agentic Systems", description: "Overview of agent capabilities and LLM integration.", href: "/ai-automation-development", type: "Foundational" },
            { stepNumber: 2, title: "Model Context Protocol (MCP) Specs", description: "Deep dive into MCP tool registration and JSON-RPC transport.", href: "/docs", type: "Architecture" },
            { stepNumber: 3, title: "Multi-Agent Systems vs Single-Agent", description: "Production trade-off analysis of LangGraph, AutoGen, and CrewAI.", href: "/articles/single-agent-vs-multi-agent-architectures", type: "Implementation" },
            { stepNumber: 4, title: "Enterprise AI Implementation Playbook", description: "Deployment, security isolation, and token cost governance.", href: "/playbooks", type: "Production SRE" },
        ],
    },
    {
        id: "saas-engineering-path",
        title: "Enterprise SaaS Engineering Path",
        targetRole: "Software Engineer",
        description: "Build multi-tenant SaaS platforms with Supabase Row-Level Security, Stripe billing, and Next.js 15.",
        steps: [
            { stepNumber: 1, title: "Custom SaaS Development Overview", description: "Core multi-tenancy requirements and tech stack selection.", href: "/saas-development", type: "Foundational" },
            { stepNumber: 2, title: "Multi-Tenant SaaS Architecture Blueprint", description: "Row-Level Security (RLS) vs schema isolation in Postgres.", href: "/architecture", type: "Architecture" },
            { stepNumber: 3, title: "SaaS Cost & Timeline Estimator", description: "Model development scope and timeline specifications.", href: "/tools/saas-cost-estimator", type: "Implementation" },
            { stepNumber: 4, title: "Engineering Standards & Quality", description: "Code review standards, PR protocols, and SLA metrics.", href: "/trust/engineering-standards", type: "Production SRE" },
        ],
    },
];
