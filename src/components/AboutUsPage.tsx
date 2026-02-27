import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { GlassCard } from './GlassCard';
import { Helmet } from 'react-helmet-async';
import { Linkedin, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

export function AboutUsPage() {
  const location = useLocation();

  // Determine which section to show based on hash
  // Use both pathname and hash to ensure re-render on navigation
  const hash = location.hash.substring(1); // Remove the '#' symbol
  const pathAndHash = `${location.pathname}${location.hash}`;

  // Show Team if hash is 'team' or if on /about with no hash (default to Team)
  const showTeam = hash === 'team' || (location.pathname === '/about' && !hash);
  // Show Portfolio only if hash is 'portfolio'
  const showPortfolio = hash === 'portfolio';

  useEffect(() => {
    // Force scroll to top when hash changes to ensure proper rendering
    if (location.hash) {
      const hashValue = location.hash.substring(1);
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        const element = document.getElementById(hashValue);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // If element not found, scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else if (location.pathname === '/about') {
      // If on /about with no hash, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, location.pathname]);

  const teamMembers = [
    {
      name: 'Jay Dave',
      role: 'Founder',
      linkedin: null
    },
    {
      name: 'Soham Thaker',
      role: 'Tech Lead',
      linkedin: null
    },
    {
      name: 'Archana Trivedi',
      role: 'Operation Manager',
      linkedin: null
    },
    {
      name: 'Arpit',
      role: 'DevOps and Security Head (CISO)',
      linkedin: null
    },
    {
      name: 'Dhwana Gadani',
      role: 'Partner & Delivery Head',
      linkedin: null
    },
    {
      name: 'Maxime Derian',
      role: 'Partner – Europe Region',
      linkedin: null
    },
    {
      name: 'Abhishek Bhagwat',
      role: 'Sales Manager',
      linkedin: null
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Jashom | GPU Optimization & CUDA Development Experts</title>
        <meta
          name="description"
          content="Learn about Jashom, a technology-driven company specializing in GPU optimization, NVIDIA CUDA development, and high-performance computing solutions for modern AI and enterprise applications"
        />
      </Helmet>


      <div className="about us">
        <div className="min-h-screen bg-black" key={pathAndHash}>

          {/* Team Section - Only render if hash is 'team' or no hash on /about */}
          {showTeam && (
            <section id="team" className="pt-24 pb-20" key="team-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div
                    className="inline-block mb-4 px-4 py-2 rounded-full glass-effect border border-[#ffffff]/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-[#d1d5db]">Our Team</span>
                  </motion.div>
                  <h1 className="mb-4 text-gradient font-bold leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Meet the Team</h1>
                  <p className="text-white/70 max-w-3xl mx-auto">
                    The talented individuals driving innovation and excellence at Jashom.
                  </p>
                </motion.div>

                {/* Team Grid */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-16"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      variants={staggerItem}
                    >
                      <GlassCard>
                        <div className="text-center relative">
                          <h3 className="text-white mb-2 text-lg sm:text-xl">{member.name}</h3>
                          <p className="text-white/70 mb-4 text-sm sm:text-base">{member.role}</p>
                          <a
                            href={member.linkedin || '#'}
                            target={member.linkedin ? "_blank" : undefined}
                            rel={member.linkedin ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-2 text-[#d1d5db] hover:text-white transition-colors"
                            onClick={(e) => {
                              if (!member.linkedin) {
                                e.preventDefault();
                              }
                            }}
                          >
                            <Linkedin className="w-5 h-5" />
                            <span className="text-sm">LinkedIn</span>
                          </a>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          )}

          {/* Portfolio Section - Only render if hash is 'portfolio' */}
          {showPortfolio && (
            <section id="portfolio" className="pt-24 pb-20" key="portfolio-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div
                    className="inline-block mb-4 px-4 py-2 rounded-full glass-effect border border-[#ffffff]/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-[#d1d5db]">Success Stories</span>
                  </motion.div>
                  <h1 className="mb-4 text-gradient">Portfolio</h1>
                  <p className="text-white/70 max-w-3xl mx-auto">
                    Real-world transformations powered by our AI and GPU optimization expertise.
                    Discover how we've helped organizations achieve breakthrough results.
                  </p>
                </motion.div>

                <PortfolioContent />
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

// Portfolio Content Component - Reused from PortfolioPage
function PortfolioContent() {
  const caseStudies = [
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
      liveUrl: 'https://www.boostreferral.com'
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
      link: '/projects/projectsphere'
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
      liveUrl: 'https://enviropulse.jashom.com'
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
      liveUrl: 'https://greenesg.jashom.com/'
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
      liveUrl: 'https://ecoai.jashom.com/dashboard'
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
      liveUrl: 'https://jashomhealth.jashom.com'
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
      liveUrl: 'https://jashomhealthcare.jashom.com'
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
      liveUrl: 'https://jashomhealthcareplus.jashom.com'
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
      liveUrl: 'https://rag.lu'
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

  const categories = [
    'Environmental Tech',
    'Healthcare Technology',
    'SaaS Platforms',
    'AI & Machine Learning'
  ];

  const groupedProjects = categories.map(category => ({
    category,
    projects: caseStudies.filter(study => study.category === category)
  }));

  return (
    <div className="space-y-16 mt-16">
      {groupedProjects.map(({ category, projects }, categoryIndex) => {
        let gridColsClass: string;
        if (projects.length === 1) gridColsClass = 'grid-cols-1';
        else if (projects.length === 2) gridColsClass = 'grid-cols-1 md:grid-cols-2';
        else gridColsClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

        return (
        <div key={category} className={categoryIndex > 0 ? 'pt-12 sm:pt-16' : ''}>
          {/* Category Header */}
          <motion.div
            className="text-center mb-10 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-5 gap-y-1 mt-8 sm:mt-10 mb-8 sm:mb-10">
              <h2 className="text-3xl font-bold text-gradient">{category}</h2>
              <p className="text-white/60 text-sm">({projects.length} {projects.length === 1 ? 'Project' : 'Projects'})</p>
            </div>
          </motion.div>

          {/* Projects in this category - columns match project count (1→1, 2→2, 3+→3) */}
          <div className={`pt-10 sm:pt-12 grid gap-6 sm:gap-8 ${gridColsClass}`}>
          {projects.map((study, index) => (
            <GlassCard key={`${category}-${index}`}>
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#ffffff]/20 text-[#d1d5db] text-sm">
                    {study.industry}
                  </span>
                  <span className="text-white/50 text-sm">{study.client}</span>
                </div>
                <h3 className="mb-3 text-white font-semibold">{study.title}</h3>

                <div className="space-y-3 flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#ffffff]" />
                      <span className="text-[#d1d5db] text-xs font-medium">Challenge</span>
                    </div>
                    <p className="text-white/70 text-xs pl-4 leading-relaxed line-clamp-3">{study.challenge}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#ffffff]" />
                      <span className="text-[#d1d5db] text-xs font-medium">Solution</span>
                    </div>
                    <p className="text-white/70 text-xs pl-4 leading-relaxed line-clamp-3">{study.solution}</p>
                    <p className="text-[#9ca3af] text-xs font-medium mt-2 mb-1.5 pl-4">Technologies used</p>
                    <div className="flex flex-wrap gap-1.5 pl-4">
                      {study.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-1 rounded-md bg-[#ffffff]/12 border border-[#ffffff]/25 text-[#e5e7eb] text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <TrendingUp className="w-4 h-4 text-[#d1d5db]" />
                      <span className="text-[#d1d5db] text-xs font-medium">Impact & Results</span>
                    </div>
                    <ul className="space-y-1.5 pl-4">
                      {study.impact.slice(0, 3).map((item, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-2 text-white text-xs"
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#ffffff] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex flex-row flex-wrap items-center justify-between gap-3">
                  {study.link ? (
                    study.link.startsWith('/') ? (
                      <Link
                        to={study.link}
                        className="inline-flex items-center gap-2 text-[#d1d5db] hover:text-white transition-colors text-xs group/link"
                      >
                        <span>View Full Case Study</span>
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <a
                        href={study.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#d1d5db] hover:text-white transition-colors text-xs group/link"
                      >
                        <span>View Full Case Study</span>
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    )
                  ) : null}
                  {study.liveUrl ? (
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#ffffff] hover:text-[#d1d5db] transition-colors text-xs"
                    >
                      <span>Visit Live Platform</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  ) : null}
                </div>
              </div>
            </GlassCard>
          ))}
          </div>
        </div>
      );
      })}
    </div>
  );
}

