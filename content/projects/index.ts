export const projects: import("@/types").Project[] = [
  {
    title: "Document Intelligence System",
    slug: "document-intelligence-system",
    industry: "Enterprise",
    summary:
      "An AI-powered document processing platform that automatically extracts information, validates business rules, detects financial risks, and routes documents through intelligent approval workflows.",
    problem:
      "Growing businesses process hundreds of invoices, purchase orders, contracts, receipts, and supplier documents every month. Most organizations still rely on manual review, repetitive data entry, and disconnected approval processes. As document volume increases, teams spend more time reviewing paperwork than making business decisions.",
    solution:
      "A comprehensive document intelligence platform that combines AI-powered OCR, business rule validation, risk detection, workflow automation, and ERP integration into one system. Documents are automatically classified, validated against business rules, scored for risk, and routed through configurable approval workflows.",
    implementation:
      "Built with Next.js and Supabase for the application layer, n8n for workflow orchestration, and multiple AI models (OpenAI, Claude, Google Document AI, Azure AI, Mistral OCR) for document understanding. The system integrates with existing ERP systems via REST APIs.",
    coverImage: "/projects/document-intelligence-system/cover.webp",
    primaryAction: {
      label: "Live Project",
      url: "https://document-intelligence-demo.vercel.app",
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "n8n", "OpenAI", "Claude", "Supabase", "PostgreSQL", "Google Document AI", "Azure AI Document Intelligence", "Mistral OCR", "REST APIs"],
    featured: true,
    tags: ["Document Processing", "AI Automation", "Enterprise"],
    businessImpact: [
      "Reduce repetitive document processing",
      "Accelerate approval workflows",
      "Detect duplicate invoices earlier",
      "Improve financial compliance",
      "Reduce manual data entry",
      "Increase operational visibility",
      "Support business growth without proportional administrative overhead",
    ],
    gallery: [],
  },
  {
    title: "WhatsApp Customer Hub",
    slug: "whatsapp-customer-hub",
    industry: "SaaS",
    summary:
      "A private multi-tenant WhatsApp CRM that helps businesses organize conversations, manage customer relationships, automate repetitive communication, and collaborate as a team from one centralized workspace.",
    problem:
      "As customer conversations move to WhatsApp, many growing businesses struggle to manage them efficiently. Messages become scattered across personal devices, follow-ups depend on memory, and valuable customer history is difficult to track. Without a structured communication system, teams spend more time searching for information than serving customers.",
    solution:
      "A centralized WhatsApp CRM platform that combines team inbox, customer profiles, CRM pipeline, automation workflows, campaign management, and analytics into one workspace. Built as a multi-tenant system so agencies and businesses can manage multiple brands or client accounts securely.",
    implementation:
      "Built with Next.js and Supabase for real-time data, WhatsApp API for messaging, and n8n for workflow automation. Each tenant has isolated data, settings, and team access.",
    coverImage: "/projects/whatsapp-customer-hub/cover.webp",
    primaryAction: {
      label: "Live Project",
      url: "https://www.amarchat.xyz/",
    },
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind", "WhatsApp", "n8n", "OpenAI"],
    featured: true,
    tags: ["Customer Communication", "AI Automation", "SaaS"],
    businessImpact: [
      "Faster response times",
      "Lost customer context",
      "Duplicate replies",
      "Missed follow-ups",
      "No team visibility",
    ],
    gallery: [],
  },
  {
    title: "HVAC Lead Intelligence",
    slug: "hvac-lead-intelligence",
    industry: "HVAC",
    summary:
      "An AI-powered lead management system that helps HVAC businesses organize inquiries, prioritize opportunities, and streamline dispatcher operations.",
    problem:
      "Most HVAC companies invest heavily in marketing to generate leads. The real challenge begins after the lead arrives. Without a structured operational workflow, inquiries sit unanswered, follow-ups are forgotten, customer information becomes scattered, and managers lose visibility into the sales pipeline.",
    solution:
      "A comprehensive operational system that combines AI, workflow automation, dispatcher tools, analytics, and lead management into one integrated platform. Designed to transform how service businesses handle every stage of the customer journey from initial inquiry to completed job.",
    implementation:
      "Built as a private, client-owned system with dedicated infrastructure. The platform uses AI-powered lead scoring, a visual CRM pipeline, automated communication workflows, and real-time analytics dashboards.",
    coverImage: "/projects/hvac-lead-intelligence/cover.webp",
    primaryAction: {
      label: "Live Project",
      url: "https://hvac-lead-intelligence.vercel.app",
    },
    technologies: ["Next.js", "TypeScript", "Tailwind", "Supabase", "n8n", "OpenAI", "ElevenLabs"],
    featured: true,
    tags: ["Lead Management", "AI Automation", "HVAC"],
    businessImpact: [
      "Respond to inquiries faster",
      "Reduce missed follow-ups",
      "Keep every lead organized",
      "Improve dispatcher efficiency",
      "Increase operational visibility",
      "Prioritize high-value opportunities",
    ],
    gallery: [],
  },
];
