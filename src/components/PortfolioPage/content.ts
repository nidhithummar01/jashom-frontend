/** Portfolio page copy and section config. Single source to avoid duplication. */
export const PORTFOLIO_PAGE_CONTENT = {
  seo: {
    title: 'Portfolio | AI, GPU & Healthcare Solutions | Jashom',
    description:
      "Explore Jashom's portfolio of applied AI, GPU optimization, and healthcare AI systems. Powering AI and redefining efficiency.",
    keywords: 'portfolio, AI solutions, GPU optimization, healthcare AI, model deployment',
  },
  hero: {
    badge: 'Portfolio',
    title: 'Powering AI. Redefining Efficiency.',
    subtitle:
      'Jashom is an applied AI company advancing artificial intelligence while optimizing performance and reducing energy consumption across GPU infrastructure, model deployment, and healthcare AI systems.',
    backgroundImage: '/images/portfolio.jpg',
  },
  capabilityMatrix: { title: 'Core Capability Matrix' },
  caseStudies: {
    badge: 'GPU Portfolio & Case Studies',
    title: 'Case Studies',
    subtitle: 'Real engagements: LLM inference optimization, GPU orchestration, cloud fine-tuning, and hardware telemetry.',
    items: [
      {
        badge: 'Case Study 1 · Enterprise AI · LLM Deployment',
        title: 'LLM Inference Optimization on Constrained GPU Infrastructure',
        summary:
          '42% higher throughput, 37% lower power, 12 distributed nodes. Full inference path re-engineering with CUDA kernels, TensorRT, and adaptive batching.',
        stats: ['42% Throughput', '37% Power ↓', '12 Nodes'],
        to: '/portfolio/case-study/llm-inference-optimization/',
      },
      {
        badge: 'Case Study 2 · Infrastructure · GPU Operations',
        title: 'GPU Workload Orchestration Framework on Rocky Linux 9.7',
        summary:
          'Demo-ready in 5 days: REST API, VRAM-aware scheduling, Docker isolation, full audit trail. RTX 3090 + Rocky Linux 9.7.',
        stats: ['5 Days', '4 Endpoints', '100% Isolation'],
        to: '/portfolio/case-study/gpu-workload-orchestration/',
      },
      {
        badge: 'Case Study 3 · AI Engineering · Cloud Infrastructure',
        title: 'Cloud GPU Fine-Tuning Strategy for Production LLM Deployment',
        summary:
          'Tiered strategy 7B–70B+ models: LoRA/QLoRA, Axolotl, DeepSpeed. Provider-agnostic cloud GPU; dataset to production in days.',
        stats: ['7B–70B+', '3 Tiers', 'Days to Deploy'],
        to: '/portfolio/case-study/cloud-gpu-fine-tuning/',
      },
      {
        badge: 'Case Study 4 · Infrastructure Monitoring · GPU Data Centers',
        title: 'Real-Time GPU Server Hardware Telemetry via Redfish BMC',
        summary:
          'Live dashboard every 30s: power, temperature, fan RPM from Lambda Scalar BMCs. HTTPS, Basic Auth, scoped SSL bypass.',
        stats: ['30s Refresh', '4 Servers', 'Out-of-band'],
        to: '/portfolio/case-study/redfish-bmc-telemetry/',
      },
    ],
  },
  portfolioSummary: {
    badge: 'Portfolio Summary',
    title: 'Capabilities, Technologies & Engagement Model',
    subtitle: 'What Jashom Has Demonstrated',
  },
  techStack: {
    badge: 'Technology Stack',
    title: 'Full Technology Stack',
  },
  engagement: {
    badge: 'How We Work',
    title: 'Engagement Model',
  },
  cta: {
    heading: 'Ready to make your GPU infrastructure work harder?',
    buttonLabel: 'Get in touch',
    buttonHref: '/contact/',
  },
} as const;

export type PortfolioPageContent = typeof PORTFOLIO_PAGE_CONTENT;
