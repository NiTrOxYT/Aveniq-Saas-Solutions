// ──────────────────────────────────────────────────────────────────────────────
// Aveniq Service Page Data — Single Source of Truth
// ──────────────────────────────────────────────────────────────────────────────

export interface ServiceStat {
  value: string;
  label: string;
}

export interface ServiceOverviewItem {
  title: string;
  body: string;
}

export interface UseCase {
  industry: string;
  problem: string;
  outcome: string;
}

export interface TechItem {
  name: string;
  category: string;
  iconSlug: string; // Simple Icons slug
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceConfig {
  slug: string;
  routePath: string;
  seo: {
    title: string;
    description: string;
    canonical: string;
    ogImage: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    headlineItalic: string;
    subtext: string;
    primaryCTA: string;
    secondaryCTA: string;
    stats: ServiceStat[];
  };
  overview: {
    whatItIs: ServiceOverviewItem;
    whoItsFor: ServiceOverviewItem;
    businessBenefits: string[];
    useCases: UseCase[];
  };
  techStack: TechItem[];
  portfolioTags: string[]; // match project.tag values
  faqs: FAQItem[];
  schemaService: {
    name: string;
    description: string;
    serviceType: string;
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// Shared tech items (reused across services)
// ──────────────────────────────────────────────────────────────────────────────

const TECH: Record<string, TechItem> = {
  react:       { name: "React",       category: "Frontend",    iconSlug: "react" },
  nextjs:      { name: "Next.js",     category: "Frontend",    iconSlug: "nextdotjs" },
  typescript:  { name: "TypeScript",  category: "Language",    iconSlug: "typescript" },
  nodejs:      { name: "Node.js",     category: "Backend",     iconSlug: "nodedotjs" },
  python:      { name: "Python",      category: "Language",    iconSlug: "python" },
  supabase:    { name: "Supabase",    category: "Database",    iconSlug: "supabase" },
  postgres:    { name: "PostgreSQL",  category: "Database",    iconSlug: "postgresql" },
  aws:         { name: "AWS",         category: "Cloud",       iconSlug: "amazonwebservices" },
  docker:      { name: "Docker",      category: "DevOps",      iconSlug: "docker" },
  kubernetes:  { name: "Kubernetes",  category: "DevOps",      iconSlug: "kubernetes" },
  openai:      { name: "OpenAI",      category: "AI",          iconSlug: "openai" },
  anthropic:   { name: "Anthropic",   category: "AI",          iconSlug: "anthropic" },
  gemini:      { name: "Gemini",      category: "AI",          iconSlug: "googlegemini" },
  stripe:      { name: "Stripe",      category: "Payments",    iconSlug: "stripe" },
  cloudflare:  { name: "Cloudflare",  category: "Infra",       iconSlug: "cloudflare" },
  redis:       { name: "Redis",       category: "Database",    iconSlug: "redis" },
  graphql:     { name: "GraphQL",     category: "API",         iconSlug: "graphql" },
  tailwind:    { name: "Tailwind",    category: "Frontend",    iconSlug: "tailwindcss" },
  figma:       { name: "Figma",       category: "Design",      iconSlug: "figma" },
  flutter:     { name: "Flutter",     category: "Mobile",      iconSlug: "flutter" },
  reactnative: { name: "React Native",category: "Mobile",      iconSlug: "react" },
  swift:       { name: "Swift",       category: "Mobile",      iconSlug: "swift" },
  kotlin:      { name: "Kotlin",      category: "Mobile",      iconSlug: "kotlin" },
  langchain:   { name: "LangChain",   category: "AI",          iconSlug: "langchain" },
  pinecone:    { name: "Pinecone",    category: "AI",          iconSlug: "pinecone" },
  mongodb:     { name: "MongoDB",     category: "Database",    iconSlug: "mongodb" },
  tensorflow:  { name: "TensorFlow",  category: "AI",          iconSlug: "tensorflow" },
  vercel:      { name: "Vercel",      category: "Deployment",  iconSlug: "vercel" },
  github:      { name: "GitHub",      category: "DevOps",      iconSlug: "github" },
  framer:      { name: "Framer",      category: "Design",      iconSlug: "framer" },
};

// ──────────────────────────────────────────────────────────────────────────────
// 1. AI Automation Development
// ──────────────────────────────────────────────────────────────────────────────

const aiAutomation: ServiceConfig = {
  slug: "ai-automation-development",
  routePath: "/ai-automation-development",
  seo: {
    title: "AI Automation Development Services | Aveniq",
    description: "Build intelligent AI automation systems that reduce manual effort by 80%. Custom LLM integrations, workflow automation, and agent pipelines built by senior engineers.",
    canonical: "https://theaveniq.in/ai-automation-development",
    ogImage: "https://theaveniq.in/og/ai-automation.png",
  },
  hero: {
    eyebrow: "AI Automation",
    headline: "Automate the work.",
    headlineItalic: "Amplify the results.",
    subtext: "We build intelligent automation systems powered by LLMs, AI agents, and custom workflows that eliminate repetitive bottlenecks and accelerate your entire operation.",
    primaryCTA: "Start Your Project",
    secondaryCTA: "View AI Work",
    stats: [
      { value: "80%", label: "Reduction in manual tasks" },
      { value: "14 days", label: "Average delivery time" },
      { value: "3×", label: "Productivity multiplier" },
      { value: "99.9%", label: "Pipeline uptime" },
    ],
  },
  overview: {
    whatItIs: {
      title: "What is AI Automation Development?",
      body: "AI automation development is the engineering discipline of replacing manual, repetitive, or decision-heavy business processes with intelligent software systems. We build LLM-powered pipelines, autonomous AI agents, document processing engines, and integration workflows that act on data in real time — without human intervention.",
    },
    whoItsFor: {
      title: "Who needs custom AI automation?",
      body: "Businesses drowning in manual data entry, document review, customer communication backlogs, or operational reporting. Whether you're a startup trying to do more with less, or an enterprise with thousands of daily transactions, custom AI automation gives you a competitive edge that off-the-shelf tools cannot replicate.",
    },
    businessBenefits: [
      "Eliminate 60-90% of manual data processing overhead",
      "Operate 24/7 without scaling headcount proportionally",
      "Reduce error rates in document and data handling to near-zero",
      "Free senior staff from repetitive tasks for strategic work",
      "Accelerate customer response times from hours to seconds",
      "Generate real-time operational intelligence from raw data",
    ],
    useCases: [
      {
        industry: "Finance",
        problem: "Manual invoice processing taking 3+ days and introducing errors",
        outcome: "AI pipeline processes 500 invoices per hour with 99.7% accuracy",
      },
      {
        industry: "Healthcare",
        problem: "Patient intake forms requiring manual data extraction and entry",
        outcome: "Automated extraction feeds EHR system in under 30 seconds per form",
      },
      {
        industry: "E-commerce",
        problem: "Customer support tickets overwhelming a 5-person team",
        outcome: "AI agent resolves 74% of tickets autonomously, escalates 26% with full context",
      },
      {
        industry: "Real Estate",
        problem: "Hours spent compiling market reports from multiple data sources",
        outcome: "Automated report generation delivers daily briefings in 90 seconds",
      },
    ],
  },
  techStack: [
    TECH.python, TECH.openai, TECH.anthropic, TECH.gemini,
    TECH.langchain, TECH.pinecone, TECH.nodejs, TECH.typescript,
    TECH.postgres, TECH.redis, TECH.aws, TECH.docker,
    TECH.cloudflare, TECH.supabase, TECH.graphql,
  ],
  portfolioTags: ["AI", "Automation", "SaaS", "AI Automation"],
  faqs: [
    {
      question: "How long does it take to build a custom AI automation pipeline?",
      answer: "Most targeted automation pipelines ship within 2-4 weeks. Complex multi-agent systems with enterprise integrations typically take 6-10 weeks. We provide a detailed scope and timeline after an initial discovery call.",
    },
    {
      question: "Which AI models do you work with?",
      answer: "We work with OpenAI (GPT-4o, o3), Anthropic Claude, Google Gemini, and open-source models like Llama and Mistral. We select the right model for your use case based on cost, latency, accuracy, and data privacy requirements.",
    },
    {
      question: "Can you integrate AI automation with our existing software stack?",
      answer: "Yes. We build integrations with any REST, GraphQL, or webhook-based system — including Salesforce, HubSpot, SAP, QuickBooks, Slack, and custom internal tools. We use secure API connections and never require access to production databases unless strictly necessary.",
    },
    {
      question: "How do you handle data privacy with LLMs?",
      answer: "We architect all pipelines with data privacy by design. This includes data masking before model calls, self-hosted model options for sensitive workloads, zero-retention API configurations with providers like OpenAI, and audit logging for compliance.",
    },
    {
      question: "What is the difference between RPA and AI automation?",
      answer: "Traditional RPA (Robotic Process Automation) follows rigid rules — it breaks when interfaces or data formats change. AI automation is flexible: it understands intent, adapts to variation in data, and makes contextual decisions. We build AI-native systems, not brittle rule engines.",
    },
    {
      question: "Do you provide ongoing support after the automation is deployed?",
      answer: "Yes. All projects include a 30-day post-launch support window at no charge. We offer monthly retainer plans for monitoring, model fine-tuning, and feature iteration. Most clients see their automation improve continuously in the first 90 days as it processes more real-world data.",
    },
    {
      question: "Can AI automation handle unstructured data like PDFs and emails?",
      answer: "Absolutely. Document intelligence — extracting structured data from PDFs, scanned images, emails, and freeform text — is one of our core specialties. We combine vision models, OCR, and LLM parsing to achieve production-grade accuracy.",
    },
    {
      question: "What does an AI agent actually do differently than a workflow?",
      answer: "A workflow follows a fixed sequence. An AI agent can reason, plan sub-tasks, use tools (search, APIs, code execution), remember context across steps, and adapt its approach based on intermediate results. Agents handle multi-step problems that traditional workflows cannot.",
    },
    {
      question: "How do you price AI automation projects?",
      answer: "We price based on project scope and complexity, not hourly rates. After a discovery call, we provide a fixed-price proposal with deliverables, timelines, and milestone-based payments. There are no hidden fees or open-ended billing.",
    },
    {
      question: "What if the automation doesn't perform as expected after launch?",
      answer: "All our automation systems are delivered with monitoring dashboards, error alerts, and detailed documentation. We define measurable success criteria before development begins. If a system underperforms against agreed benchmarks within 30 days, we resolve it at no additional cost.",
    },
  ],
  schemaService: {
    name: "AI Automation Development",
    description: "Custom AI automation systems including LLM pipelines, AI agents, and intelligent workflow automation.",
    serviceType: "Software Development",
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// 2. SaaS Development
// ──────────────────────────────────────────────────────────────────────────────

const saasDevelopment: ServiceConfig = {
  slug: "saas-development",
  routePath: "/saas-development",
  seo: {
    title: "SaaS Development Company | Custom SaaS Platform | Aveniq",
    description: "Build scalable SaaS platforms from scratch. Multi-tenant architecture, subscription billing, admin dashboards, and enterprise-grade security. Ship your SaaS in 90 days.",
    canonical: "https://theaveniq.in/saas-development",
    ogImage: "https://theaveniq.in/og/saas-development.png",
  },
  hero: {
    eyebrow: "SaaS Development",
    headline: "Your SaaS idea,",
    headlineItalic: "production-ready.",
    subtext: "We architect and build multi-tenant SaaS platforms with subscription billing, role-based access, analytics dashboards, and the infrastructure to scale from 10 to 100,000 users without rewriting a line.",
    primaryCTA: "Start Your SaaS",
    secondaryCTA: "See SaaS Projects",
    stats: [
      { value: "90 days", label: "Avg. time to launch" },
      { value: "100K+", label: "Users supported" },
      { value: "99.95%", label: "Uptime delivered" },
      { value: "12+", label: "SaaS platforms built" },
    ],
  },
  overview: {
    whatItIs: {
      title: "What is custom SaaS development?",
      body: "Custom SaaS development is the full-stack engineering of a software-as-a-service product — from database schema to frontend UI — built to your specific business logic. Unlike off-the-shelf solutions, a custom SaaS platform is owned entirely by you, optimized for your users, and designed to scale on your terms.",
    },
    whoItsFor: {
      title: "Who builds a custom SaaS?",
      body: "Founders who have validated a business model and need a technical partner to build their product. Established businesses converting an internal tool into a marketable SaaS product. Enterprises replacing a legacy system with a modern, multi-tenant platform. If you need something that doesn't exist yet, custom SaaS development is the answer.",
    },
    businessBenefits: [
      "Recurring revenue model with predictable cash flow",
      "Multi-tenant architecture scales without proportional infrastructure cost",
      "Complete IP ownership — no vendor lock-in",
      "Custom role-based access for enterprise sales motion",
      "White-label capability to reach multiple market segments",
      "Built-in analytics to drive product-led growth decisions",
    ],
    useCases: [
      {
        industry: "HR Tech",
        problem: "Teams using spreadsheets and email chains for performance reviews",
        outcome: "Custom SaaS platform manages reviews, OKRs, and feedback for 200+ companies",
      },
      {
        industry: "Logistics",
        problem: "Freight brokers tracking shipments across 6 disconnected systems",
        outcome: "Unified SaaS platform cuts dispatch time by 55% and eliminates duplicate data entry",
      },
      {
        industry: "Education",
        problem: "Course creators locked into high-commission marketplace platforms",
        outcome: "White-label SaaS platform generates direct sales with 0% commission",
      },
      {
        industry: "Healthcare",
        problem: "Practice management requiring HIPAA-compliant scheduling and billing",
        outcome: "Custom SaaS handles 10,000+ appointments/month with full compliance",
      },
    ],
  },
  techStack: [
    TECH.react, TECH.nextjs, TECH.typescript, TECH.nodejs,
    TECH.postgres, TECH.supabase, TECH.redis, TECH.stripe,
    TECH.aws, TECH.docker, TECH.kubernetes, TECH.cloudflare,
    TECH.graphql, TECH.tailwind, TECH.vercel,
  ],
  portfolioTags: ["SaaS", "Platform", "Web App"],
  faqs: [
    {
      question: "How long does it take to build a SaaS platform from scratch?",
      answer: "An MVP-quality SaaS with core features typically ships in 8-12 weeks. A full-featured platform with advanced billing, analytics, and enterprise features takes 16-24 weeks. We define the scope and timeline precisely during discovery.",
    },
    {
      question: "Do you handle Stripe subscription billing integration?",
      answer: "Yes, completely. We implement Stripe Billing for subscription plans, metered usage, annual/monthly toggles, free trials, coupons, and dunning logic. We also build a customer-facing billing portal and webhook-driven subscription state management.",
    },
    {
      question: "What does multi-tenant architecture mean for my SaaS?",
      answer: "Multi-tenancy means one codebase serves many customers, each isolated from each other's data. We design row-level security in your database so customer data is logically and cryptographically separated — essential for enterprise sales and GDPR compliance.",
    },
    {
      question: "Can you build a SaaS with a white-label option?",
      answer: "Yes. White-labeling in a SaaS context means your customers can use the platform under their own brand. We build custom domain support, dynamic theming, and brand asset management so you can serve the B2B market with reseller arrangements.",
    },
    {
      question: "How do you handle SaaS security and compliance?",
      answer: "Security is built into the architecture from day one: JWT-based auth, role-based access control (RBAC), encrypted data at rest and in transit, audit logging, rate limiting, and OWASP-aligned API design. For regulated industries, we implement HIPAA or SOC 2 relevant controls on request.",
    },
    {
      question: "Do you help with post-launch SaaS iteration and growth engineering?",
      answer: "Yes. We offer ongoing engineering retainers specifically for SaaS products — feature development, performance optimization, A/B testing infrastructure, user analytics implementation, and customer success tooling. Many of our SaaS clients have worked with us for 2+ years.",
    },
    {
      question: "What if I need to migrate an existing product to your platform?",
      answer: "We handle data migrations from legacy systems, third-party platforms, and Bubble/Webflow/Glide no-code tools. Our process includes schema mapping, data cleaning, parallel-run validation, and zero-downtime cutover.",
    },
    {
      question: "Will my SaaS be able to handle rapid user growth?",
      answer: "We design for scale from the start: connection pooling, query optimization, horizontal scaling with Kubernetes, CDN-cached assets, and queue-based async processing. We've built platforms that went from 0 to 50,000 users in under 6 months without architecture rewrites.",
    },
    {
      question: "How do you approach SaaS pricing strategy?",
      answer: "As part of our discovery process, we review your target customer segments and discuss feature gating, usage-based pricing, and plan tiers. We implement the billing logic to support whatever pricing model you validate — and make it easy to change without code deploys.",
    },
    {
      question: "What tech stack do you use to build SaaS products?",
      answer: "Our default SaaS stack is Next.js (or React) frontend, Node.js or Python backend, PostgreSQL database with row-level security, Supabase or AWS infrastructure, Stripe for billing, and Cloudflare for edge security. We adapt to your team's existing stack when joining an in-progress project.",
    },
  ],
  schemaService: {
    name: "SaaS Development",
    description: "Full-stack custom SaaS platform development with multi-tenant architecture, subscription billing, and enterprise security.",
    serviceType: "Software Development",
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// 3. Mobile App Development
// ──────────────────────────────────────────────────────────────────────────────

const mobileAppDevelopment: ServiceConfig = {
  slug: "mobile-app-development",
  routePath: "/mobile-app-development",
  seo: {
    title: "Mobile App Development Company | iOS & Android | Aveniq",
    description: "Premium iOS and Android mobile app development. React Native, Flutter, and native Swift/Kotlin. From concept to App Store in 10 weeks.",
    canonical: "https://theaveniq.in/mobile-app-development",
    ogImage: "https://theaveniq.in/og/mobile-app.png",
  },
  hero: {
    eyebrow: "Mobile Development",
    headline: "Apps your users",
    headlineItalic: "can't put down.",
    subtext: "We design and build cross-platform and native mobile applications that feel native, perform at 60fps, and convert users into loyal customers from the very first launch.",
    primaryCTA: "Build Your App",
    secondaryCTA: "View Mobile Work",
    stats: [
      { value: "10 weeks", label: "Average MVP delivery" },
      { value: "4.8★", label: "Average App Store rating" },
      { value: "60fps", label: "Target frame rate" },
      { value: "iOS + Android", label: "Single codebase" },
    ],
  },
  overview: {
    whatItIs: {
      title: "What is custom mobile app development?",
      body: "Custom mobile app development is the process of building iOS and Android applications tailored to your business requirements — not adapted from a template. We handle everything from UX research and UI design to native performance optimization, App Store submission, and post-launch analytics integration.",
    },
    whoItsFor: {
      title: "Who needs a custom mobile app?",
      body: "Businesses with field teams that need offline-capable tooling. Consumer brands building direct engagement channels. SaaS products expanding to mobile users. Healthcare providers needing HIPAA-compliant patient-facing apps. If your users are on their phones, you need to meet them there — with software that reflects your brand quality.",
    },
    businessBenefits: [
      "Direct mobile channel with push notification reach",
      "Offline-capable operations for field and remote teams",
      "Native device features: camera, biometrics, GPS, Bluetooth",
      "Higher session time and retention than mobile web",
      "App Store and Play Store presence for organic discovery",
      "In-app purchase and subscription revenue models",
    ],
    useCases: [
      {
        industry: "Field Services",
        problem: "Technicians relying on paper forms and phone calls to log job status",
        outcome: "Mobile app with offline sync cuts job reporting time from 20 min to 3 min",
      },
      {
        industry: "Hospitality",
        problem: "Guests navigating clunky generic hotel apps with poor brand experience",
        outcome: "Custom-branded guest app drives 40% increase in in-stay service orders",
      },
      {
        industry: "Retail",
        problem: "Loyalty program losing engagement due to poor mobile experience",
        outcome: "Rebuilt loyalty app with personalized offers drives 28% higher repeat purchase rate",
      },
      {
        industry: "Fitness",
        problem: "Fitness studio managing bookings through a third-party app charging 15% per transaction",
        outcome: "Own-brand app eliminates commission fees, saving $180K annually",
      },
    ],
  },
  techStack: [
    TECH.reactnative, TECH.flutter, TECH.swift, TECH.kotlin,
    TECH.typescript, TECH.nodejs, TECH.supabase, TECH.postgres,
    TECH.redis, TECH.aws, TECH.cloudflare, TECH.stripe,
    TECH.graphql, TECH.figma, TECH.docker,
  ],
  portfolioTags: ["Mobile", "iOS", "Android", "React Native", "Flutter"],
  faqs: [
    {
      question: "Should I build a native app or use React Native / Flutter?",
      answer: "For most products, React Native or Flutter is the right choice — one codebase for iOS and Android, 80-90% of native performance, and significantly lower development cost. Native Swift/Kotlin is recommended when your app relies heavily on platform-specific APIs, advanced graphics, or augmented reality.",
    },
    {
      question: "How long does mobile app development take?",
      answer: "An MVP with core features typically takes 8-12 weeks. A full-featured consumer app with payments, social features, and analytics takes 16-24 weeks. App Store review adds 1-7 days after submission.",
    },
    {
      question: "Do you handle App Store and Google Play submission?",
      answer: "Yes. We manage the full submission process including provisioning profiles, signing certificates, App Store screenshots and metadata, age ratings, privacy policy requirements, and resolution of any review rejections.",
    },
    {
      question: "Can you add offline functionality to our mobile app?",
      answer: "Yes. We implement local SQLite or Realm databases, optimistic UI updates, and conflict-resolution sync logic so your app works fully without a network connection and syncs seamlessly when connectivity returns.",
    },
    {
      question: "How do you approach mobile UI/UX design?",
      answer: "We follow platform-specific Human Interface Guidelines (iOS) and Material Design 3 (Android) for intuitive navigation, while applying your brand's visual identity on top. Every design goes through usability review before development begins.",
    },
    {
      question: "Do you integrate push notifications and analytics?",
      answer: "Yes. We integrate Firebase Cloud Messaging for push notifications, implement deep linking, and connect analytics (Mixpanel, Amplitude, or Firebase Analytics) with event tracking designed to support your growth metrics from day one.",
    },
    {
      question: "Can you add in-app purchases and subscription billing?",
      answer: "Yes. We implement StoreKit (iOS) and Google Play Billing for native in-app purchases, including subscription management, restore purchases, receipt validation, and server-side subscription state tracking.",
    },
    {
      question: "How do you handle mobile app performance optimization?",
      answer: "We measure performance against 60fps render targets, use list virtualization for large datasets, lazy-load images with progressive placeholders, minimize bundle size through tree-shaking, and profile with Flipper and Xcode Instruments before every release.",
    },
    {
      question: "What happens if Apple or Google changes their guidelines after launch?",
      answer: "We monitor platform policy changes and issue compliance updates as part of our maintenance retainers. Regulatory compliance updates (privacy labels, permission changes) are handled at cost for retained clients.",
    },
    {
      question: "Can you take over and improve an existing mobile app?",
      answer: "Yes. We conduct a technical audit of your existing app, document architectural issues, and produce a remediation roadmap. We've successfully taken over React Native, Flutter, Ionic, and legacy Objective-C/Swift codebases.",
    },
  ],
  schemaService: {
    name: "Mobile App Development",
    description: "Custom iOS and Android mobile app development using React Native, Flutter, and native Swift/Kotlin.",
    serviceType: "Software Development",
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// 4. Custom Software Development
// ──────────────────────────────────────────────────────────────────────────────

const customSoftwareDevelopment: ServiceConfig = {
  slug: "custom-software-development",
  routePath: "/custom-software-development",
  seo: {
    title: "Custom Software Development Company | Aveniq",
    description: "Bespoke software built for complex business problems. Enterprise systems, internal tools, and mission-critical applications engineered by senior developers.",
    canonical: "https://theaveniq.in/custom-software-development",
    ogImage: "https://theaveniq.in/og/custom-software.png",
  },
  hero: {
    eyebrow: "Custom Software",
    headline: "Built precisely",
    headlineItalic: "for your problem.",
    subtext: "When off-the-shelf software can't handle your unique business logic, we engineer custom systems from the ground up — architected for reliability, designed for your team, and built to outlast the vendors.",
    primaryCTA: "Discuss Your Project",
    secondaryCTA: "Explore Our Work",
    stats: [
      { value: "50+", label: "Custom systems delivered" },
      { value: "5 yrs", label: "Avg. system lifespan" },
      { value: "0", label: "Vendor lock-in" },
      { value: "24/7", label: "Production monitoring" },
    ],
  },
  overview: {
    whatItIs: {
      title: "What is custom software development?",
      body: "Custom software development is the design and engineering of software built exclusively for your organization's specific requirements. Unlike commercial off-the-shelf (COTS) products, custom software has no unnecessary features, no per-seat licensing fees, and no limitations imposed by a vendor's product roadmap. You own the code, the data, and the evolution.",
    },
    whoItsFor: {
      title: "Who needs custom software?",
      body: "Organizations with business processes that don't fit existing tools. Companies spending more on workarounds and integrations than a bespoke system would cost. Enterprises requiring deep integration with internal systems. Industries with compliance requirements that generic software cannot satisfy. If your team is working around the limitations of your software, it's time to build software around your team.",
    },
    businessBenefits: [
      "Complete alignment with your actual workflows — no compromises",
      "Elimination of recurring per-seat and per-feature licensing costs",
      "Deep integration with existing internal systems and databases",
      "Full intellectual property ownership with no vendor dependencies",
      "Security architecture designed for your specific compliance requirements",
      "Scalable foundation that evolves as your business grows",
    ],
    useCases: [
      {
        industry: "Manufacturing",
        problem: "Production floor reporting split across 4 legacy systems with manual reconciliation",
        outcome: "Unified operations platform reduces reporting overhead from 8 hours to 45 minutes daily",
      },
      {
        industry: "Legal",
        problem: "Matter management requiring compliance workflows generic tools couldn't enforce",
        outcome: "Custom system enforces conflict-checking and deadline tracking, reducing malpractice risk",
      },
      {
        industry: "Insurance",
        problem: "Claims processing requiring 17 manual handoffs between departments",
        outcome: "Custom workflow engine automates routing and reduces claims cycle from 14 days to 3",
      },
      {
        industry: "Government",
        problem: "Citizen service portal unable to meet accessibility and security mandates",
        outcome: "Custom system passes all WCAG 2.1 AA audits and ISO 27001 assessments",
      },
    ],
  },
  techStack: [
    TECH.react, TECH.nextjs, TECH.typescript, TECH.nodejs,
    TECH.python, TECH.postgres, TECH.mongodb, TECH.redis,
    TECH.aws, TECH.docker, TECH.kubernetes, TECH.graphql,
    TECH.cloudflare, TECH.supabase, TECH.github,
  ],
  portfolioTags: ["Enterprise", "Custom Software", "Internal Tool", "Platform"],
  faqs: [
    {
      question: "How do you approach requirements gathering for a complex custom system?",
      answer: "We begin every custom software engagement with a structured discovery phase: stakeholder interviews, process mapping, data flow analysis, and constraint documentation. The output is a detailed technical specification that serves as the contract between your requirements and our engineering.",
    },
    {
      question: "How long does custom enterprise software development take?",
      answer: "Simple custom tools take 6-10 weeks. Mid-complexity systems with multiple user roles, integrations, and reporting take 16-28 weeks. Large enterprise platforms with complex workflows are typically 6-12 months with phased delivery milestones.",
    },
    {
      question: "How do you handle integration with our existing legacy systems?",
      answer: "We have extensive experience with legacy integration including REST/SOAP API adapters, database-to-database ETL pipelines, event-driven messaging with RabbitMQ/Kafka, and screen scraping where APIs don't exist. We don't require you to abandon your existing systems.",
    },
    {
      question: "What security standards do you build to?",
      answer: "We build to OWASP Top 10 as a minimum baseline. For regulated industries, we implement controls aligned with ISO 27001, HIPAA, PCI DSS, SOC 2, or GDPR as required. We provide security documentation to support your compliance audits.",
    },
    {
      question: "Do you provide source code handover?",
      answer: "Yes, always. Source code is delivered to your repository on milestone completion. You have full access throughout the project. We document the architecture, deployment procedures, and runbooks so your internal team can own the system after handover.",
    },
    {
      question: "How do you manage scope changes during a large project?",
      answer: "We use an agile delivery model with 2-week sprints and a formal change request process. Scope changes are assessed for effort and impact, priced transparently, and require sign-off before implementation. This keeps projects on track while allowing legitimate evolution.",
    },
    {
      question: "What testing practices do you apply to custom software?",
      answer: "We write unit tests, integration tests, and end-to-end tests as part of development — not as an afterthought. Critical business logic achieves >90% test coverage. We conduct user acceptance testing (UAT) with your team before every major release.",
    },
    {
      question: "Can you migrate our data from the system we're replacing?",
      answer: "Yes. Data migration is a first-class concern in our process. We map schemas, clean and transform data, run parallel validation, and execute zero-downtime cutovers. We've migrated everything from Access databases to Oracle ERP systems.",
    },
    {
      question: "What happens after the software is delivered?",
      answer: "We offer post-launch support plans including 24/7 incident response, SLA-backed maintenance, quarterly security patches, and ongoing feature development retainers. We also provide thorough knowledge transfer to your internal team.",
    },
    {
      question: "How do you ensure the software scales as our organization grows?",
      answer: "Scalability is designed into the architecture before the first line of code. We use horizontal scaling patterns, database read replicas, async job queues, and caching layers. We also conduct load testing before production launch to validate performance under expected peak demand.",
    },
  ],
  schemaService: {
    name: "Custom Software Development",
    description: "Bespoke enterprise software development including internal tools, workflow systems, and mission-critical applications.",
    serviceType: "Software Development",
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// 5. Web Development Company
// ──────────────────────────────────────────────────────────────────────────────

const webDevelopmentCompany: ServiceConfig = {
  slug: "web-development-company",
  routePath: "/web-development-company",
  seo: {
    title: "Web Development Company India | React, Next.js | Aveniq",
    description: "Premium web application development with React, Next.js, and modern full-stack architecture. We build web experiences that convert visitors into customers.",
    canonical: "https://theaveniq.in/web-development-company",
    ogImage: "https://theaveniq.in/og/web-development.png",
  },
  hero: {
    eyebrow: "Web Development",
    headline: "Web experiences",
    headlineItalic: "worth remembering.",
    subtext: "We engineer full-stack web applications, marketing sites, and customer portals that load fast, convert better, and reflect the quality of your brand from every angle.",
    primaryCTA: "Start Your Project",
    secondaryCTA: "View Web Work",
    stats: [
      { value: "<1s", label: "Target page load" },
      { value: "98", label: "Lighthouse performance" },
      { value: "WCAG AA", label: "Accessibility standard" },
      { value: "React + Next.js", label: "Primary stack" },
    ],
  },
  overview: {
    whatItIs: {
      title: "What is full-stack web development?",
      body: "Full-stack web development covers everything from the database layer through to the pixel-perfect user interface. We build React and Next.js frontends with performance-first architecture, Node.js or Python backends, PostgreSQL databases, and cloud infrastructure — all optimized for speed, security, and developer maintainability.",
    },
    whoItsFor: {
      title: "Who needs professional web development?",
      body: "Businesses whose website is a revenue-generating asset, not just a brochure. SaaS companies needing performant, SEO-optimized marketing sites. Enterprises replacing outdated web portals with modern React applications. Startups that need a premium web presence to close enterprise customers. If your website is losing you deals, it's costing you money.",
    },
    businessBenefits: [
      "Sub-second load times that reduce bounce rate by 25-50%",
      "SEO-optimized architecture for organic search visibility",
      "Core Web Vitals passing scores for Google ranking signals",
      "Conversion-optimized layouts grounded in UX best practices",
      "CMS integration for marketing teams to self-serve content updates",
      "Accessible design that expands your potential customer base",
    ],
    useCases: [
      {
        industry: "B2B SaaS",
        problem: "Marketing site loading in 6+ seconds, hurting ad conversion rates",
        outcome: "Rebuilt Next.js site loads in 0.8s, cutting cost-per-lead by 38%",
      },
      {
        industry: "E-commerce",
        problem: "Legacy Magento store failing mobile users and losing mobile sales",
        outcome: "Headless commerce migration achieves 4.8x mobile checkout completion improvement",
      },
      {
        industry: "Professional Services",
        problem: "Outdated website misrepresenting firm's premium positioning",
        outcome: "New site drives 3× increase in inbound enterprise RFQ submissions",
      },
      {
        industry: "Media",
        problem: "Editorial platform unable to handle 500K concurrent readers during viral moments",
        outcome: "Edge-deployed Next.js architecture handles 2M requests/hour without degradation",
      },
    ],
  },
  techStack: [
    TECH.react, TECH.nextjs, TECH.typescript, TECH.tailwind,
    TECH.nodejs, TECH.python, TECH.postgres, TECH.supabase,
    TECH.redis, TECH.graphql, TECH.aws, TECH.cloudflare,
    TECH.vercel, TECH.docker, TECH.stripe,
  ],
  portfolioTags: ["Web", "Next.js", "React", "Landing Page", "Web App"],
  faqs: [
    {
      question: "Do you build websites or web applications — what's the difference?",
      answer: "Websites deliver content and information (marketing sites, portfolios, blogs). Web applications deliver functionality with authenticated user sessions, data persistence, and complex business logic (dashboards, portals, tools). We build both, often combined — a marketing site with an embedded application for authenticated users.",
    },
    {
      question: "Which framework do you use for web development?",
      answer: "Our primary stack is Next.js (React) for web applications and marketing sites requiring SSR or SSG for SEO. For highly interactive client-side applications, we use React with Vite. We use the framework that serves your use case — not the one we're most comfortable with.",
    },
    {
      question: "How do you approach website SEO during development?",
      answer: "SEO is built into the architecture, not bolted on afterward. We implement semantic HTML, structured data (JSON-LD), canonical URLs, Open Graph tags, sitemap.xml, robots.txt, image optimization with next/image, and Core Web Vitals optimization as standard practice on every project.",
    },
    {
      question: "Can you integrate our website with our CRM or marketing tools?",
      answer: "Yes. We integrate with HubSpot, Salesforce, Marketo, Intercom, Segment, and most major marketing automation platforms. We also build custom lead capture pipelines with enrichment and CRM sync.",
    },
    {
      question: "What is your process for web design before development?",
      answer: "We begin with a brand and UX audit, produce high-fidelity Figma designs for review, and only begin development after designs are approved. We build in Storybook component-first so every UI element is reviewed in isolation before assembly.",
    },
    {
      question: "Do you handle website hosting and deployment?",
      answer: "Yes. We set up CI/CD pipelines, deploy to your preferred platform (Vercel, AWS, Cloudflare Pages, or self-hosted), configure CDN, SSL certificates, environment management, and production monitoring with uptime alerts.",
    },
    {
      question: "How do you ensure our website is accessible?",
      answer: "We build to WCAG 2.1 AA as standard. This includes semantic HTML, ARIA labels for interactive elements, keyboard navigation, color contrast compliance, focus management, and screen reader testing with NVDA and VoiceOver.",
    },
    {
      question: "Will our website work on all browsers and devices?",
      answer: "Yes. We test across Chrome, Firefox, Safari, and Edge on both desktop and mobile, covering the devices that represent 95%+ of your actual traffic. We use progressive enhancement so core functionality works even in older browsers.",
    },
    {
      question: "Can you redesign our existing website without losing SEO rankings?",
      answer: "Yes, with careful planning. We audit your current indexed URLs, implement 301 redirects, preserve URL structures where possible, and monitor Google Search Console throughout the migration to catch and resolve ranking impacts quickly.",
    },
    {
      question: "How much does professional web development cost?",
      answer: "A high-quality marketing website starts at ₹3-6 lakh. A full-stack web application starts at ₹8-15 lakh. Pricing depends on scope, complexity, design requirements, and integrations. We provide a detailed fixed-price proposal after discovery.",
    },
  ],
  schemaService: {
    name: "Web Development",
    description: "Full-stack web application development with React, Next.js, and modern cloud infrastructure.",
    serviceType: "Software Development",
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// 6. MVP Development
// ──────────────────────────────────────────────────────────────────────────────

const mvpDevelopment: ServiceConfig = {
  slug: "mvp-development",
  routePath: "/mvp-development",
  seo: {
    title: "MVP Development Company | Launch in 6 Weeks | Aveniq",
    description: "Build a production-quality MVP in 6-10 weeks. We help founders validate their product ideas with real software, not mockups. Trusted by 30+ startups.",
    canonical: "https://theaveniq.in/mvp-development",
    ogImage: "https://theaveniq.in/og/mvp-development.png",
  },
  hero: {
    eyebrow: "MVP Development",
    headline: "From idea to market",
    headlineItalic: "in weeks, not months.",
    subtext: "We turn validated ideas into production-ready MVPs that real users can interact with — built lean, shipped fast, and architected to grow without a rewrite.",
    primaryCTA: "Launch Your MVP",
    secondaryCTA: "View MVP Projects",
    stats: [
      { value: "6 weeks", label: "Minimum launch time" },
      { value: "30+", label: "MVPs launched" },
      { value: "40%", label: "Avg. validation faster" },
      { value: "3 of 5", label: "MVPs raised funding" },
    ],
  },
  overview: {
    whatItIs: {
      title: "What is MVP development?",
      body: "An MVP (Minimum Viable Product) is the smallest version of your product that delivers real value to real users and generates genuine feedback. It is not a prototype, a wireframe, or a Figma file — it is working software that paying users can actually use. Our MVP development process focuses ruthlessly on the one or two core features that define your value proposition.",
    },
    whoItsFor: {
      title: "Who needs an MVP?",
      body: "First-time founders who need to validate demand before raising funding. Non-technical entrepreneurs who have a clear problem to solve but need a technical partner. Early-stage startups that want to reach product-market fit faster. Even established companies testing new product lines benefit from MVP-thinking — ship small, learn fast, and iterate with evidence.",
    },
    businessBenefits: [
      "Validate product-market fit with real users before full investment",
      "Raise seed or pre-seed funding with a live, working product",
      "Collect actionable user feedback instead of assumption-based decisions",
      "Reduce time to first revenue by eliminating non-essential features",
      "Built on scalable architecture that grows with validated learning",
      "Defined scope prevents the endless-feature-creep that kills startups",
    ],
    useCases: [
      {
        industry: "FinTech",
        problem: "Founder with a lending marketplace idea, no technical team, and 90 days to prove the concept to investors",
        outcome: "MVP launched in 7 weeks, 200 early users signed up, pre-seed round closed within 45 days",
      },
      {
        industry: "Marketplace",
        problem: "Two-sided marketplace in home services with no way to test whether supply meets demand",
        outcome: "Lightweight MVP validated 3× more demand than supply — informed hiring plan for first 6 months",
      },
      {
        industry: "EdTech",
        problem: "Course creation platform needed to prove retention before raising ₹2Cr seed round",
        outcome: "MVP with 3 core features showed 68% weekly active usage, unlocked seed funding",
      },
      {
        industry: "B2B SaaS",
        problem: "Enterprise analytics tool with 12-month development estimate from traditional agency",
        outcome: "Core reporting MVP shipped in 8 weeks, first paying enterprise customer signed in month 3",
      },
    ],
  },
  techStack: [
    TECH.react, TECH.nextjs, TECH.typescript, TECH.nodejs,
    TECH.supabase, TECH.postgres, TECH.stripe, TECH.vercel,
    TECH.cloudflare, TECH.tailwind, TECH.figma, TECH.github,
    TECH.docker, TECH.redis,
  ],
  portfolioTags: ["MVP", "Startup", "Product", "SaaS"],
  faqs: [
    {
      question: "What exactly is included in your MVP development service?",
      answer: "Our MVP service includes: product discovery workshop, feature prioritization, UI/UX design for core flows, full-stack development of agreed features, deployment to production infrastructure, analytics and error monitoring setup, and 30 days post-launch support. Nothing is left unfinished.",
    },
    {
      question: "How do you define what goes into the MVP vs. what waits?",
      answer: "We run a structured scope workshop where we map your target user's core job-to-be-done. Every proposed feature is evaluated against one question: does this feature directly enable the user to accomplish the core job? If not, it goes to the roadmap, not the MVP.",
    },
    {
      question: "Is an MVP built on a scalable architecture?",
      answer: "Yes. We don't use throwaway tech for MVPs. We use the same production-grade stack we'd use for a funded startup — proper database design, API architecture, authentication, and deployment pipeline. The difference is scope, not quality.",
    },
    {
      question: "Can investors see the MVP code and infrastructure?",
      answer: "Yes. We deliver full source code to your repository and comprehensive technical documentation. Many of our founders share this directly with technical due diligence reviewers from VC firms.",
    },
    {
      question: "How do you handle changes after user feedback starts coming in?",
      answer: "We build MVPs with iteration in mind — clean component architecture, documented APIs, and a seed data environment for safe testing. Post-launch sprint packages are available to incorporate your first wave of user feedback quickly.",
    },
    {
      question: "What if I only have an idea — do you help with product strategy?",
      answer: "Yes. If you arrive with a problem statement and a target user, we can facilitate the full product discovery process — user persona definition, problem mapping, feature ideation, and MVP scope agreement — before engineering begins.",
    },
    {
      question: "Do you offer equity or deferred payment for early-stage startups?",
      answer: "In rare cases with strong founding teams and validated market evidence, we consider partial equity arrangements. Contact us to discuss. Our default model is milestone-based fixed-fee payments, which aligns incentives without diluting your cap table unnecessarily.",
    },
    {
      question: "Can the MVP be used to raise funding?",
      answer: "Absolutely. Working software is the strongest possible signal to early-stage investors. We've seen clients go from no product to a seed term sheet using an Aveniq-built MVP. We can also prepare a technical summary document to share during due diligence.",
    },
    {
      question: "What happens after the MVP is launched?",
      answer: "We provide 30 days of support included in the project. After that, we offer two paths: a sprint-based iteration retainer where we build new features based on user feedback, or a technical handover package to bring development in-house.",
    },
    {
      question: "How is an MVP different from a prototype or a proof of concept?",
      answer: "A prototype demonstrates an idea visually. A proof of concept validates a technical approach. An MVP is a fully functional product that real users pay for or derive genuine value from. It has real authentication, real data, and real production infrastructure.",
    },
  ],
  schemaService: {
    name: "MVP Development",
    description: "Rapid MVP development for startups and founders — production-ready software in 6-10 weeks.",
    serviceType: "Software Development",
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// 7. Startup Software Development
// ──────────────────────────────────────────────────────────────────────────────

const startupSoftwareDevelopment: ServiceConfig = {
  slug: "startup-software-development",
  routePath: "/startup-software-development",
  seo: {
    title: "Startup Software Development Agency | Aveniq",
    description: "Technical partner for startups. We build your product, scale your team, and architect for growth — from seed stage to Series A and beyond.",
    canonical: "https://theaveniq.in/startup-software-development",
    ogImage: "https://theaveniq.in/og/startup-software.png",
  },
  hero: {
    eyebrow: "Startup Partner",
    headline: "The technical team",
    headlineItalic: "your startup deserves.",
    subtext: "We act as your fractional engineering team — building, iterating, and scaling your product from idea to growth stage while you focus on customers, fundraising, and strategy.",
    primaryCTA: "Partner With Us",
    secondaryCTA: "Startup Success Stories",
    stats: [
      { value: "30+", label: "Startups partnered" },
      { value: "3 of 5", label: "Raised VC funding" },
      { value: "$0", label: "Equity taken" },
      { value: "Seed → A", label: "Full stage coverage" },
    ],
  },
  overview: {
    whatItIs: {
      title: "What is startup software development?",
      body: "Startup software development is technical partnership tailored to early-stage ventures — combining the speed of a product studio with the architecture thinking of a senior engineering team. We work as an extension of your founding team: building your product, making technical decisions, and scaling the codebase as you grow — without the hiring overhead.",
    },
    whoItsFor: {
      title: "Who is this for?",
      body: "Non-technical founders who need a reliable engineering partner rather than a vendor. Technical founders who need supplemental capacity to hit a fundraising milestone. Seed-stage startups that need senior engineers without senior engineering salaries. Pre-Series A companies preparing their infrastructure for scale.",
    },
    businessBenefits: [
      "Ship product 3× faster than building an in-house team from scratch",
      "Access senior engineers at a fraction of full-time hiring cost",
      "Technical decisions made by experienced engineers, not junior devs",
      "Flexible engagement — scale capacity up or down with the business",
      "Clean, documented codebase ready for technical due diligence",
      "Architecture that survives Series A growth without a full rewrite",
    ],
    useCases: [
      {
        industry: "PropTech",
        problem: "Non-technical founder with VC interest but no engineering team",
        outcome: "Full product built in 10 weeks, pre-seed round closed, in-house engineer hired and onboarded by week 14",
      },
      {
        industry: "HealthTech",
        problem: "Seed-stage startup with a single overworked engineer and Series A board pressure",
        outcome: "Aveniq team joined for 6 months, shipped 4 major features, prepared codebase for Series A due diligence",
      },
      {
        industry: "B2B SaaS",
        problem: "Founding team needed to demonstrate product-market fit but had no technical resources",
        outcome: "MVP built, 50 beta users onboarded, $300K ARR achieved within 5 months of launch",
      },
      {
        industry: "Consumer Tech",
        problem: "Mobile-first consumer app needed to launch before a competitor window closed",
        outcome: "App launched in 8 weeks, 10,000 installs in first 30 days, App Store featured in 3 countries",
      },
    ],
  },
  techStack: [
    TECH.react, TECH.nextjs, TECH.reactnative, TECH.typescript,
    TECH.nodejs, TECH.python, TECH.supabase, TECH.postgres,
    TECH.stripe, TECH.aws, TECH.vercel, TECH.cloudflare,
    TECH.docker, TECH.figma, TECH.github,
  ],
  portfolioTags: ["Startup", "MVP", "SaaS", "Mobile", "Platform"],
  faqs: [
    {
      question: "How is working with Aveniq different from hiring a typical agency?",
      answer: "We work as a partner, not a vendor. We sit in your Slack, attend your product meetings, flag technical risks proactively, and make architecture decisions with your long-term success in mind — not to maximize our own hours billed. Our incentive is your product's success.",
    },
    {
      question: "Do you take equity in startups?",
      answer: "We charge for our work in cash. We don't take equity, which means our incentives are aligned with shipping your product — not holding your codebase hostage for a share of your cap table. In exceptional circumstances, hybrid arrangements are discussed case by case.",
    },
    {
      question: "Can you help me prepare for technical due diligence?",
      answer: "Yes. We produce technical documentation, architecture diagrams, security posture summaries, and test coverage reports that satisfy the questions VCs and their technical reviewers ask. We've supported multiple clients through successful due diligence processes.",
    },
    {
      question: "How do you handle knowledge transfer when we hire in-house engineers?",
      answer: "Transition planning starts from day one. We write documentation as we build, use conventional commit standards, maintain a living architecture decision record (ADR), and conduct formal handover sessions with new in-house hires. Our goal is for you to be independent.",
    },
    {
      question: "What's the minimum engagement size for startup partnerships?",
      answer: "Our startup partnerships typically start at a 3-month engagement minimum, giving us enough runway to deliver something meaningful and understand your product deeply. We can discuss shorter timelines for well-scoped single deliverables.",
    },
    {
      question: "How quickly can your team start?",
      answer: "We can typically start within 5-7 business days of contract signing. We maintain a small pipeline buffer specifically for startup engagements that need to move fast.",
    },
    {
      question: "Do you have experience with regulated startup industries?",
      answer: "Yes. We've built for startups in HealthTech (HIPAA), FinTech (PCI DSS, RBI guidelines), EdTech, and LegalTech. We understand the compliance implications of your architecture choices and build accordingly from the start.",
    },
    {
      question: "Can you help us hire and onboard our first in-house engineer?",
      answer: "Yes. We assist with technical interview design, candidate evaluation, and structured onboarding for your first in-house hire. Many of our startup clients have hired their first engineer with our support and a warm introduction to the codebase.",
    },
    {
      question: "What if we run out of runway and need to pause the engagement?",
      answer: "Startups are unpredictable. Our contracts include clear pause provisions. We document the project state thoroughly so resumption is seamless. We've paused and resumed engagements multiple times with clients who went through fundraising cycles.",
    },
    {
      question: "How do you approach product roadmap prioritization?",
      answer: "We don't just build what you put in the ticket. We ask why every feature is being built, what metric it moves, and whether there's a simpler implementation that delivers the same outcome. This keeps your product lean and your runway longer.",
    },
  ],
  schemaService: {
    name: "Startup Software Development",
    description: "Full-stack engineering partnership for startups from seed stage through Series A.",
    serviceType: "Software Development",
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// 8. UI/UX Design
// ──────────────────────────────────────────────────────────────────────────────

const uiUxDesign: ServiceConfig = {
  slug: "ui-ux-design",
  routePath: "/ui-ux-design",
  seo: {
    title: "UI/UX Design Agency India | Product Design | Aveniq",
    description: "Enterprise UI/UX design that converts. User research, interaction design, design systems, and Figma prototypes built by senior product designers.",
    canonical: "https://theaveniq.in/ui-ux-design",
    ogImage: "https://theaveniq.in/og/ui-ux-design.png",
  },
  hero: {
    eyebrow: "UI/UX Design",
    headline: "Design that earns",
    headlineItalic: "every click.",
    subtext: "We craft interfaces that guide users effortlessly to their goals — through deep user research, systems-thinking design, and pixel-perfect execution that reflects the quality of your product.",
    primaryCTA: "Start a Design Project",
    secondaryCTA: "View Design Work",
    stats: [
      { value: "40%", label: "Avg. conversion uplift" },
      { value: "1 week", label: "First prototype delivery" },
      { value: "WCAG AA", label: "Accessibility built-in" },
      { value: "100%", label: "Figma source files included" },
    ],
  },
  overview: {
    whatItIs: {
      title: "What is UI/UX design?",
      body: "UX design is the discipline of making software easy, intuitive, and satisfying to use — through user research, information architecture, interaction patterns, and usability testing. UI design is the execution of those decisions as a visual interface: typography, color, component design, and motion. Together, they determine whether your users succeed or abandon your product.",
    },
    whoItsFor: {
      title: "Who needs professional UI/UX design?",
      body: "Products where design directly drives business outcomes: SaaS platforms with trial-to-paid conversion pressure, consumer apps competing on experience quality, enterprise software where poor UX causes support tickets and churn, and marketing sites where the design is the first sales pitch. If your product's success depends on whether users understand and enjoy it, you need professional design.",
    },
    businessBenefits: [
      "Higher trial-to-paid conversion rates through optimized onboarding",
      "Reduced support costs when users complete tasks without help",
      "Lower churn through interfaces that build user confidence",
      "Faster feature adoption when new capabilities are discoverable",
      "Accessible design that expands market reach to all users",
      "Design systems that accelerate future engineering velocity",
    ],
    useCases: [
      {
        industry: "FinTech",
        problem: "Banking app with 34% drop-off during onboarding due to complex KYC flow",
        outcome: "Redesigned onboarding reduces drop-off to 11%, adds ₹2.4Cr annual revenue",
      },
      {
        industry: "Healthcare",
        problem: "EHR system so complex that doctors spent more time on the UI than the patient",
        outcome: "Simplified workflow design reduces documentation time by 40% per appointment",
      },
      {
        industry: "E-commerce",
        problem: "Product page design contributing to 76% cart abandonment on mobile",
        outcome: "Redesigned mobile product pages reduce abandonment by 31%, lift mobile GMV by 27%",
      },
      {
        industry: "B2B SaaS",
        problem: "Dashboard so dense that users couldn't find the actions they needed daily",
        outcome: "Information architecture redesign reduces support tickets by 55% in 90 days",
      },
    ],
  },
  techStack: [
    TECH.figma, TECH.framer, TECH.react, TECH.nextjs,
    TECH.typescript, TECH.tailwind, TECH.nodejs, TECH.supabase,
    TECH.aws, TECH.cloudflare, TECH.vercel, TECH.github,
    TECH.openai, TECH.stripe,
  ],
  portfolioTags: ["Design", "UI/UX", "Product Design", "Branding", "Web"],
  faqs: [
    {
      question: "What deliverables do we receive from a UI/UX project?",
      answer: "Deliverables vary by scope but typically include: user research synthesis, information architecture map, wireframes (low-fidelity), high-fidelity Figma designs for all screens and states, interactive prototype, component library in Figma, and a design handoff package for developers with spacing specs, tokens, and asset exports.",
    },
    {
      question: "Do you conduct user research before designing?",
      answer: "For projects where research budgets allow, yes. We conduct user interviews, competitive audits, heuristic evaluations of existing products, and usability testing. For tighter timelines, we leverage existing analytics data, session recordings, and expert UX review to inform design decisions rapidly.",
    },
    {
      question: "How long does a UI/UX design project take?",
      answer: "A comprehensive redesign of a complex SaaS product takes 6-12 weeks. A focused design sprint for a single feature or flow takes 1-2 weeks. An initial prototype for investor demos takes 5-7 business days. Scope defines the timeline.",
    },
    {
      question: "Do you build design systems and component libraries?",
      answer: "Yes. Design systems are one of our specialties. We build Figma component libraries with variants, interactive states, light/dark modes, and semantic token structures that map directly to code — typically to shadcn/ui, Radix, or a custom component system.",
    },
    {
      question: "Can you design for both web and mobile from the same engagement?",
      answer: "Yes. We design responsive across breakpoints and, for separate mobile app projects, design to platform conventions (iOS Human Interface Guidelines and Android Material Design 3) within a consistent brand system.",
    },
    {
      question: "Do you include dark mode designs?",
      answer: "For modern products, dark mode is standard. We design both modes simultaneously using semantic color tokens, ensuring contrast compliance and visual consistency in both contexts.",
    },
    {
      question: "How do you validate that designs will work for real users?",
      answer: "We conduct usability testing on high-fidelity prototypes before engineering begins. For existing products, we run heuristic evaluations against Nielsen's 10 principles, review session recording heat maps, and conduct 5-user moderated tests to identify critical issues.",
    },
    {
      question: "Can your designs be handed off to a different development team?",
      answer: "Yes. Our Figma deliverables include developer notes, spacing annotations, motion specs, and a comprehensive asset export. We've handed off to hundreds of different engineering teams and engineering agencies with no friction.",
    },
    {
      question: "Do you design with accessibility in mind?",
      answer: "Accessibility is non-negotiable in our process. We verify color contrast against WCAG 2.1 AA ratios, design visible focus states, structure content for screen reader compatibility, and include ARIA guidance in our developer handoff documentation.",
    },
    {
      question: "What's the difference between hiring a freelance designer and Aveniq?",
      answer: "A freelance designer delivers visuals. We deliver outcomes. Our design process is grounded in UX research, behavioral psychology, and business metrics — not just aesthetic preference. Every design decision is tied to a measurable user or business goal.",
    },
  ],
  schemaService: {
    name: "UI/UX Design",
    description: "End-to-end UI/UX design including user research, interaction design, design systems, and developer-ready Figma handoffs.",
    serviceType: "Design",
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// Export all services
// ──────────────────────────────────────────────────────────────────────────────

export const ALL_SERVICES: ServiceConfig[] = [
  aiAutomation,
  saasDevelopment,
  mobileAppDevelopment,
  customSoftwareDevelopment,
  webDevelopmentCompany,
  mvpDevelopment,
  startupSoftwareDevelopment,
  uiUxDesign,
];

export const SERVICE_MAP: Record<string, ServiceConfig> = Object.fromEntries(
  ALL_SERVICES.map((s) => [s.slug, s])
);

export {
  aiAutomation,
  saasDevelopment,
  mobileAppDevelopment,
  customSoftwareDevelopment,
  webDevelopmentCompany,
  mvpDevelopment,
  startupSoftwareDevelopment,
  uiUxDesign,
};
