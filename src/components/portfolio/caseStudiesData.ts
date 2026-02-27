export type CaseStudy = {
  title: string;
  client: string;
  industry: string;
  category: string;
  challenge: string;
  solution: string;
  impact: string[];
  tags: string[];
  link: string;
  liveUrl?: string;
  image?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: 'BoostReferral - SaaS Platform',
    client: 'Jay Dave',
    industry: 'SaaS',
    category: 'SaaS Platforms',
    challenge: 'Businesses needed an automated solution to manage referral programs and drive customer acquisition efficiently.',
    solution: 'Founded and developed a comprehensive referral management platform that automates referral programs, tracks analytics, and drives customer acquisition for businesses.',
    impact: [
      'Automated referral program management',
      'Increased customer acquisition rates',
      '99.9% platform uptime',
      'Scalable SaaS architecture serving thousands of users'
    ],
    tags: ['SaaS Platform', 'Referral Management', 'Analytics', 'Automation'],
    link: '/projects/boostreferral',
    liveUrl: 'https://www.boostreferral.com',
    image: '/images/portfolio/boostreferral.jpg'
  },
  {
    title: 'ProjectSphere - Project Management Platform',
    client: 'Jay Dave',
    industry: 'SaaS',
    category: 'SaaS Platforms',
    challenge: 'Organizations need comprehensive project management tools that enable real-time collaboration and provide insights into team performance and project progress.',
    solution: 'ProjectSphere offers a complete project management platform with real-time collaboration, resource management, and advanced analytics for better project outcomes.',
    impact: [
      '45% improvement in team efficiency',
      '30% faster project delivery',
      '85% user adoption rate',
      'Real-time team collaboration'
    ],
    tags: ['Project Management', 'Real-time Collaboration', 'Resource Management', 'Analytics Dashboard'],
    link: '/projects/projectsphere',
    image: '/images/portfolio/projectsphere.jpg'
  },
  {
    title: 'EnviroPulse - Environmental Monitoring',
    client: 'Jay Dave',
    industry: 'Environmental Tech',
    category: 'Environmental Tech',
    challenge: 'Industrial facilities need real-time monitoring of environmental metrics across multiple zones, but existing solutions lack comprehensive coverage and actionable insights.',
    solution: 'EnviroPulse combines IoT sensors with advanced analytics to provide real-time monitoring and insights across multiple environmental parameters.',
    impact: [
      '35% reduction in environmental incidents',
      '45% improvement in compliance reporting efficiency',
      'Real-time environmental monitoring',
      'Multi-zone tracking capabilities'
    ],
    tags: ['IoT Integration', 'Real-time Data', 'Data Visualization', 'Environmental Sensors', 'Analytics Dashboard'],
    link: '/projects/enviropulse',
    liveUrl: 'https://enviropulse.jashom.com',
    image: '/images/portfolio/enviropulse.jpg'
  },
  {
    title: 'GreenSphere - ESG Management Platform',
    client: 'Jay Dave',
    industry: 'ESG Platform',
    category: 'Environmental Tech',
    challenge: 'Organizations struggle to track, manage, and report their ESG metrics effectively, leading to compliance risks and missed sustainability opportunities.',
    solution: 'GreenSphere provides a comprehensive platform for tracking, analyzing, and reporting ESG metrics, helping organizations achieve their sustainability goals.',
    impact: [
      '23% average reduction in carbon emissions',
      '65% improvement in ESG reporting efficiency',
      'ESG metrics tracking',
      'Sustainability reporting automation'
    ],
    tags: ['ESG Metrics', 'Sustainability Tracking', 'Reporting Tools', 'Data Visualization', 'Compliance Management'],
    link: '/projects/greensphere',
    liveUrl: 'https://greenesg.jashom.com/',
    image: '/images/portfolio/greensphere.jpg'
  },
  {
    title: 'EcoBot AI - Sustainability Assistant',
    client: 'Jay Dave',
    industry: 'AI Platform',
    category: 'Environmental Tech',
    challenge: 'Organizations struggle to keep up with complex environmental regulations and sustainability requirements, often leading to compliance issues and missed opportunities for improvement.',
    solution: 'EcoBot AI leverages advanced language models to provide instant, accurate responses to sustainability queries, helping organizations make informed decisions and maintain compliance.',
    impact: [
      '40% reduction in compliance-related issues',
      '60% improvement in sustainability decision-making efficiency',
      'Instant sustainability query responses',
      'High accuracy LLM integration'
    ],
    tags: ['AI Integration', 'Natural Language Processing', 'Sustainability Analytics', 'Environmental Compliance', 'Real-time Analytics'],
    link: '/projects/ecobot-ai',
    liveUrl: 'https://ecoai.jashom.com/dashboard',
    image: '/images/portfolio/ecobot-ai.jpg'
  },
  {
    title: 'Jashom Health - Hospital System',
    client: 'Jay Dave',
    industry: 'Healthcare Platform',
    category: 'Healthcare Technology',
    challenge: 'Modern healthcare facilities face significant challenges in managing multiple locations while maintaining strict HIPAA compliance and providing real-time patient monitoring.',
    solution: 'Jashom Health provides a comprehensive hospital management system designed specifically for multi-location healthcare facilities with HIPAA-compliant security and real-time monitoring.',
    impact: [
      '99.9% system uptime ensuring continuous patient care',
      '40% reduction in administrative overhead',
      '60% improvement in patient care coordination',
      '100% HIPAA compliance with zero security incidents',
      'Supports 25+ hospital locations simultaneously'
    ],
    tags: ['HIPAA Compliance', 'Multi-location Support', 'Real-time Monitoring', 'Patient Management', 'Healthcare Analytics'],
    link: '/projects/jashom-health',
    liveUrl: 'https://jashomhealth.jashom.com',
    image: '/images/portfolio/jashom-health.jpg'
  },
  {
    title: 'Jashom Healthcare - Interoperability Platform',
    client: 'Jay Dave',
    industry: 'Healthcare Interoperability',
    category: 'Healthcare Technology',
    challenge: 'Healthcare systems operate in silos, making it extremely difficult to share patient data and coordinate care across different departments and facilities.',
    solution: 'Jashom Healthcare provides seamless interoperability between healthcare systems using industry-standard protocols (HL7, FHIR) and advanced integration technology.',
    impact: [
      '99.9% system uptime ensuring continuous data flow',
      '35% reduction in duplicate patient records',
      '50+ healthcare partners successfully integrated',
      '60% faster care coordination across facilities',
      '24/7 real-time synchronization'
    ],
    tags: ['HL7 Integration', 'FHIR Standards', 'EMR/LIS/PACS', 'IoT Device Integration', 'Real-time Sync', 'HIPAA Compliance'],
    link: '/projects/jashom-healthcare',
    liveUrl: 'https://jashomhealthcare.jashom.com',
    image: '/images/portfolio/jashom-healthcare.jpg'
  },
  {
    title: 'Jashom ICU Connect - Remote Monitoring',
    client: 'Jay Dave',
    industry: 'Remote ICU Monitoring',
    category: 'Healthcare Technology',
    challenge: 'Rural and semi-urban hospitals often lack access to specialist care, leading to unnecessary patient transfers and delayed critical care interventions.',
    solution: 'Jashom ICU Connect provides a comprehensive remote monitoring and collaboration platform that bridges the gap between rural hospitals and specialist care.',
    impact: [
      '40% reduction in unnecessary patient transfers',
      '15+ hospitals now have specialist oversight',
      '< 30 second response time for critical alerts',
      'Improved outcomes through 24/7 specialist collaboration',
      '100% 24/7 monitoring coverage'
    ],
    tags: ['Real-time Monitoring', 'Vital Signs Tracking', 'Expert Collaboration', 'Secure Communication', 'Role-based Access', 'HIPAA Compliance'],
    link: '/projects/jashom-icu-connect',
    liveUrl: 'https://jashomhealthcareplus.jashom.com',
    image: '/images/portfolio/jashom-icu-connect.jpg'
  },
  {
    title: 'RAG.LU - AI Knowledge Platform',
    client: 'Jay Dave',
    industry: 'AI & Machine Learning',
    category: 'AI & Machine Learning',
    challenge: 'Organizations needed intelligent knowledge management and information retrieval solutions powered by cutting-edge AI technology.',
    solution: 'Founded an innovative AI platform leveraging Retrieval-Augmented Generation (RAG) technology for intelligent knowledge management and information retrieval solutions.',
    impact: [
      '93% accuracy in information retrieval',
      '10x faster processing speed',
      'RAG-powered knowledge management',
      'AI transformation solutions for enterprises'
    ],
    tags: ['RAG Technology', 'AI Platform', 'Machine Learning', 'Knowledge Management'],
    link: '/projects/rag-lu',
    liveUrl: 'https://rag.lu',
    image: '/images/portfolio/rag-lu.ai.png'
  },
  {
    title: 'RANKZY AI - AI Visibility Optimization Platform',
    client: 'Jashom',
    industry: 'AI SEO & Optimization',
    category: 'AI & Machine Learning',
    challenge: 'Businesses struggle to maintain visibility in AI-powered search and recommendations across ChatGPT, Claude, Google Gemini, and Perplexity, as traditional SEO methods are becoming obsolete in the AI-first discovery era.',
    solution: 'Rankzy AI is the world\'s first comprehensive AI Visibility Optimization Platform that helps businesses dominate AI-powered search and recommendations across multiple AI models through multi-stage prompt testing, brand mention detection, competitor tracking, and citation analysis.',
    impact: [
      'Future-proof marketing strategy for AI-first discovery',
      'Data-driven competitive intelligence in AI responses',
      'Actionable insights with specific implementation guidance',
      'Real-time monitoring of AI visibility performance',
      'First-mover advantage in emerging AI optimization market'
    ],
    tags: ['AI SEO', 'AI Visibility', 'Large Language Model Optimization', 'AI Search Ranking', 'Multi-Provider AI Testing'],
    link: '/portfolio/rankzy-ai'
  },
  {
    title: 'POD AI (CLIPFORGE) - AI Content Creation & Repurposing Platform',
    client: 'Jashom',
    industry: 'AI Content Automation',
    category: 'AI & Machine Learning',
    challenge: 'Content creators and businesses need to produce professional videos, social media posts, and presentations at scale, but existing tools lack comprehensive multi-format AI processing and brand consistency across platforms.',
    solution: 'POD AI (ClipForge) is an all-in-one AI-powered content creation platform that transforms any content format into professional videos, social media posts, presentations, and more with intelligent automation, brand consistency, and platform-specific optimization.',
    impact: [
      'Multi-format AI processing in single platform (text, voice, video, images, documents)',
      'Deep brand integration for consistent professional presentation',
      'Credit-based pricing eliminates unused subscription waste',
      'Platform-specific optimization for YouTube, TikTok, Instagram, LinkedIn',
      'No technical skills required with intuitive user interface'
    ],
    tags: ['AI Content Creation', 'Video Generation', 'Content Repurposing', 'Social Media Automation', 'Voice AI Technology'],
    link: '/portfolio/pod-ai-clipforge'
  },
  {
    title: 'NVTRUST GPU ATTESTATION - Secure Hardware Verification System',
    client: 'Jashom',
    industry: 'GPU Security & Confidential Computing',
    category: 'AI & Machine Learning',
    challenge: 'Enterprises need to verify GPU authenticity and integrity for confidential computing workloads, but existing solutions lack cryptographic verification protocols and tamper detection capabilities for NVIDIA H100 GPUs.',
    solution: 'nvTrust GPU Attestation System provides enterprise-grade secure remote attestation for NVIDIA H100 GPUs using cryptographic verification protocols with dual-verification architecture, hardware-rooted trust, and SPDM compliance to ensure hardware authenticity and integrity.',
    impact: [
      'Cryptographic proof of genuine NVIDIA hardware',
      'Verification of untampered GPU firmware and configuration',
      'Current responses with nonce-based validation',
      'ECDSA signatures provide cryptographic attestation proof',
      'Standards compliance with SPDM protocol'
    ],
    tags: ['GPU Security', 'Hardware Attestation', 'Confidential Computing', 'NVIDIA GPU Verification', 'Cryptographic Verification'],
    link: '/portfolio/nvtrust-gpu-attestation'
  },
  {
    title: 'HTI CUDA GPU ACCELERATION - Energy-Efficient AI Computing',
    client: 'Jashom',
    industry: 'GPU Optimization & Energy Efficiency',
    category: 'AI & Machine Learning',
    challenge: 'AI training workloads consume excessive energy on enterprise GPUs, but existing optimization solutions compromise computational accuracy or lack real-time power monitoring capabilities for distributed multi-GPU environments.',
    solution: 'HTI (High-dimensional Token Integration) CUDA Acceleration provides research-grade GPU optimization for NVIDIA A100/H100 enterprise GPUs, achieving up to 82% energy reduction while maintaining computational accuracy through optimized kernel fusion and real-time power monitoring.',
    impact: [
      'Up to 82.3% energy reduction on specific AI workloads',
      'Zero accuracy loss while optimizing energy consumption',
      'Real-time power monitoring with NVML-based energy sampling',
      'Multi-GPU scaling proven across multiple A100/H100 GPUs',
      'Significant power consumption savings for data centers'
    ],
    tags: ['GPU Optimization', 'CUDA Acceleration', 'Energy Efficiency', 'AI Performance', 'Multi-GPU Scaling'],
    link: '/portfolio/hti-cuda-acceleration'
  }
];

export const PORTFOLIO_CATEGORIES = [
  'Environmental Tech',
  'Healthcare Technology',
  'SaaS Platforms',
  'AI & Machine Learning'
];
