import { motion } from 'motion/react';
import { ArrowRight, Award, Code2, DollarSign, Shield, Zap } from 'lucide-react';
import React from 'react';
import { SEO as Seo } from './SEO';
import {
  hireDividerClass,
  hireDividerStyle,
  hireFeatureIconBoxStyle,
  hireFormInputStyle,
  hireStatIconBg,
  hireStatIconBoxClass,
  useHireDeveloperForm,
} from './hireDeveloperShared';

const PAGE_BG = '#0B0F14';
const CARD_BG = 'linear-gradient(160deg, rgba(20, 36, 56, 0.72) 0%, rgba(10, 20, 34, 0.82) 100%)';
const CARD_BORDER = 'rgba(34, 211, 238, 0.24)';
const CARD_SHADOW = 'inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 26px rgba(0, 0, 0, 0.24)';
const ICON_BOX_STYLE = { background: 'rgba(34, 211, 238, 0.12)', border: '1px solid rgba(34, 211, 238, 0.28)' } as const;
const FAQ_ITEM_STYLE = { background: CARD_BG, borderColor: CARD_BORDER, boxShadow: CARD_SHADOW } as const;
const RELATED_SERVICE_BTN_STYLE = { background: '#22D3EE', color: '#FFFFFF' } as const;
const HIRE_FORM_INPUT_STYLE = hireFormInputStyle;
const FEATURE_ICON_BOX_STYLE = hireFeatureIconBoxStyle;
const CHEVRON_DOWN_D = 'M19 9l-7 7-7-7';

const heroStatsData = [
  { Icon: Award, title: 'Flexible Hiring', subtitle: 'Scalable engagement models' },
  { Icon: Code2, title: 'Technical Expertise', subtitle: 'Experienced Rust engineers' },
  { Icon: DollarSign, title: 'On-Time', subtitle: 'Reliable delivery' },
];

const expertiseData = [
  {
    title: 'Backend API Development',
    description: 'We develop scalable REST APIs, GraphQL APIs and backend platforms in Rust that are fast, secure and performant in high traffic.',
  },
  {
    title: 'Cloud-Native Application Engineering',
    description: 'Our engineers create Rust applications optimized for Kubernetes, microservices architectures and modern DevOps workflows using containers and cloud platforms.',
  },
  {
    title: 'Distributed Systems Architecture',
    description: 'We create distributed applications that efficiently process concurrent workloads, asynchronous processing and large-scale infrastructure operations.',
  },
  {
    title: 'Blockchain & Web3 Solutions',
    description: 'Our Rust developers build safe blockchain applications, smart contract ecosystems, crypto infrastructure and decentralized platforms for Web3 businesses.',
  },
  {
    title: 'System-Level Programming',
    description: 'We create low-level applications, networking solutions, embedded software and infrastructure components where performance and resource usage are vital.',
  },
  {
    title: 'Performance Optimization & Refactoring',
    description: 'We optimize existing applications for execution speed, memory usage and concurrency, while modernizing legacy architectures.',
  },
];

const hireStepsData = [
  {
    title: 'Discuss Your Project Vision',
    description: 'Tell us your technical needs, business objectives, application scope and scaling goals so we can understand where Rust expertise is required.',
  },
  {
    title: 'Evaluate Rust Developer Profiles',
    description: 'Review skilled Rust developers with experience in backend systems, cloud infrastructure, blockchain, distributed computing and enterprise software.',
  },
  {
    title: 'Choose Engagement Structure',
    description: 'Choose dedicated developers, project-based teams, full-time employees or flexible scaling models based on your delivery needs.',
  },
  {
    title: 'Launch Development Process',
    description: 'Our Rust developers integrate into your workflow and begin building secure, scalable and efficient software solutions.',
  },
];

const whyBusinessCardsData = [
  {
    title: 'Product-Focused Engineering',
    description: 'We build Rust programs with business goals, usability, scalability, maintainability and long-term stability in mind.',
  },
  {
    title: 'Clean & Scalable Codebase',
    description: 'Our developers use modern standards, modular architecture and maintainable coding methods for future-ready applications.',
  },
  {
    title: 'Strong Security Standards',
    description: 'We use secure coding techniques, protected infrastructure procedures and compliance-based development practices.',
  },
  {
    title: 'Fast & Transparent Communication',
    description: 'We keep communication clear with agile reporting, milestone tracking and collaborative workflows throughout delivery.',
  },
  {
    title: 'Experienced Technical Team',
    description: 'Our Rust engineers have real-world experience in SaaS applications, infrastructure tools, cloud systems and enterprise platforms.',
  },
  {
    title: 'Scalable Resource Allocation',
    description: 'Scale resources up and down with project growth, shifting priorities and new technical requirements.',
  },
];

const engagementModelsData = [
  {
    title: 'Full-Time',
    description: 'Hire dedicated Rust developers for long-term projects involving backend systems, cloud applications and scalable software development.',
  },
  {
    title: 'Part-Time',
    description: 'Outsource Rust developers on a part-time basis for maintenance, optimization, upgrades and ongoing technical improvements.',
  },
  {
    title: 'Time & Material',
    description: 'Scale development resources flexibly with changing project requirements, iterative development cycles and evolving business needs.',
  },
  {
    title: 'Custom Model',
    description: 'Receive a customized hiring plan based on your technical goals, project complexity, scheduling and budget requirements.',
  },
];

const whyChooseBenefitsData = [
  {
    title: 'Modern Software Architecture',
    description: 'We build scalable, maintainable architectures for future growth, seamless integration, improved performance and long-term application development.',
  },
  {
    title: 'Reliable Production Deployment',
    description: 'We deploy tested software with CI/CD workflows, optimized infrastructure and stable release processes for production environments.',
  },
  {
    title: 'Business-Centric Development',
    description: 'We align software development with your business objectives, processes, customer needs and scalability requirements.',
  },
  {
    title: 'Agile Development Execution',
    description: 'Our agile approach supports transparent collaboration, faster iterations, continuous improvement and flexible execution.',
  },
  {
    title: 'Long-Term Technical Support',
    description: 'Our team offers ongoing maintenance, performance optimization, feature enhancements and troubleshooting.',
  },
  {
    title: 'Optimized Development Efficiency',
    description: 'We improve turnaround using scalable coding practices, streamlined workflows, reusable architecture patterns and optimized engineering methods.',
  },
];

const reviewsData = [
  {
    quote: 'With Rust expertise from Jashom, we improved backend reliability and delivered a safer production architecture.',
    author: 'CTO, SaaS Platform',
    filledStars: 5,
  },
  {
    quote: 'Their engineering team quickly understood our infrastructure needs and helped us build a performant Rust-based service layer.',
    author: 'VP Engineering, Cloud Company',
    filledStars: 5,
  },
  {
    quote: 'Clear communication, strong ownership and practical Rust architecture made the engagement smooth from start to finish.',
    author: 'Product Lead, Technology Startup',
    filledStars: 5,
  },
];

const relatedServicesData = [
  {
    title: 'GPU Optimization Service',
    description: 'Finetune your GPU workloads for maximum speed and efficiency, eliminating bottlenecks and maximizing resource utilization.',
    href: '/gpu-optimization-service/',
  },
  {
    title: 'CUDA Development Service',
    description: 'Build high-performance parallel applications with expert CUDA development tailored for speed, scalability and precision.',
    href: '/cuda-development-service/',
  },
];

const faqData = [
  {
    q: 'What makes Rust a good option for a new business application?',
    a: 'Rust is memory safe, performance efficient and strongly suited to concurrency, making it popular for secure, fast and scalable applications. It is especially useful for modern backend systems, infrastructure software and high-performance applications.',
  },
  {
    q: 'Which industries benefit from Rust development services?',
    a: 'Rust is widely used in SaaS, fintech, blockchain, cybersecurity, cloud infrastructure, gaming systems and enterprise backend solutions.',
  },
  {
    q: 'Can your Rust developers work with existing development teams?',
    a: 'Absolutely. Our Rust developers can integrate with in-house development teams, external vendors and DevOps engineers using agile development workflows.',
  },
  {
    q: 'Do you offer maintenance and support after project completion?',
    a: 'Yes. After deployment, we provide ongoing maintenance, performance optimization, technical support, feature enhancements and infrastructure updates.',
  },
  {
    q: 'How do you ensure code quality in Rust development?',
    a: 'We follow rigorous coding standards, peer reviews, automated testing, performance optimization and secure coding practices to produce high-quality Rust applications.',
  },
  {
    q: 'Why should I hire Rust developers from Jashom?',
    a: 'Jashom offers expert Rust developers, flexible engagement options, scalable development solutions, clear communication and reliable technical support for modern software projects.',
  },
];

const getStartedFeaturesData = [
  {
    title: 'Quick Response',
    description: 'Project inquiries are answered within 24 hours.',
    pathD: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Flexible Hiring',
    description: 'Decide on engagement models to meet project requirements.',
    pathD: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Expert Developers',
    description: 'Work with experienced Rust engineers for modern software solutions.',
    pathD: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  },
];

function SectionHeading({ title, description, accent = false }: Readonly<{ title: string; description?: string; accent?: boolean }>) {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: accent ? '#22D3EE' : '#FAFAFA' }}>
        {title}
      </h2>
      {description && (
        <p className="text-lg max-w-4xl mx-auto" style={{ color: '#9E9E9E', lineHeight: 1.7 }}>
          {description}
        </p>
      )}
    </motion.div>
  );
}

function InfoCard({ title, description, index }: Readonly<{ title: string; description: string; index: number }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.08 * (index + 1) }}
      className="rounded-2xl p-8 border h-full"
      style={{ background: CARD_BG, borderColor: CARD_BORDER, boxShadow: CARD_SHADOW }}
    >
      <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={ICON_BOX_STYLE}>
        <Shield className="w-7 h-7" style={{ color: '#22D3EE' }} />
      </div>
      <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>{title}</h3>
      <p className="text-sm leading-7" style={{ color: '#9E9E9E' }}>{description}</p>
    </motion.div>
  );
}

export function HireRustDevelopersPage() {
  const { formData, handleChange, handleSubmit, hireSubmitting, hireSubmitError } = useHireDeveloperForm('Hire Rust Developers page');

  return (
    <>
      <Seo
        title="Hire Rust Developers - Hire Best Expert Rust Developer - Jashom"
        description="Hire dedicated Rust developers from Jashom to accelerate your project. Our experienced Rust engineers deliver reliable, secure, and efficient applications tailored to your business needs."
        keywords="hire Rust developers, Rust programmers, Rust engineers, systems programming, backend development"
      />

      <div className="hire rust developers">
        <div className="min-h-screen" style={{ background: PAGE_BG }}>
          <section className="relative px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ minHeight: '600px', paddingTop: '160px', paddingBottom: '100px' }}>
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: 'url(/images/hire.hero.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(1.1)',
              }}
            >
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.68) 50%, rgba(0, 0, 0, 0.45) 100%)' }}
              />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
                  <h1
                    className="font-bold leading-tight"
                    style={{
                      color: '#FFFFFF',
                      letterSpacing: '-0.025em',
                      fontSize: 'clamp(28px, 4vw, 48px)',
                      textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    Hire Rust Developers
                  </h1>
                  <p className="text-lg leading-relaxed" style={{ color: '#E5E5E5', textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
                    Rust Programming Experts | Systems Programming Engineers | High-Performance Backend Specialists
                  </p>
                  <p className="text-lg leading-relaxed" style={{ color: '#D1D5DB', textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
                    Hire experienced Rust developers to create safe, efficient and modern software for digital products. We use Rust at Jashom to build blazing fast backends, APIs, cloud-native applications, developer tools, and distributed platforms for startups, SaaS, and enterprise.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 max-w-sm items-stretch sm:items-center">
                    <div className="w-full sm:w-[260px] sm:min-w-[260px] sm:max-w-[260px] sm:flex-shrink-0">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full max-w-full box-border"
                        style={{ background: '#1F2937', color: '#FAFAFA', borderRadius: '4px', border: '1px solid rgba(34, 211, 238, 0.2)', padding: '0 16px', height: '44px' }}
                      />
                    </div>
                    <div className="flex-none sm:ml-3 w-full sm:w-[270px] sm:min-w-[270px]">
                      <a
                        href="/contact/"
                        className="inline-flex items-center justify-center px-6 rounded-xl font-semibold text-sm leading-snug transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] w-full text-center"
                        style={{ background: '#22D3EE', color: '#FFFFFF', textDecoration: 'none', boxShadow: '0 4px 14px 0 rgba(34, 211, 238, 0.4)', minHeight: '44px', height: '44px' }}
                      >
                        HIRE DEDICATED RUST DEVELOPERS
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-6 sm:gap-8 pt-6">
                    {heroStatsData.map((stat, i) => {
                      const IconComponent = stat.Icon;
                      return (
                        <React.Fragment key={stat.title}>
                          {i > 0 && <div className={hireDividerClass} style={hireDividerStyle} />}
                          <div className="flex items-center gap-4">
                            <div className={hireStatIconBoxClass} style={hireStatIconBg}>
                              <IconComponent className="w-7 h-7" style={{ color: '#FFFFFF' }} />
                            </div>
                            <div>
                              <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '16px' }}>{stat.title}</div>
                              <div style={{ color: '#B0B0B0', fontSize: '14px' }}>{stat.subtitle}</div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: PAGE_BG }}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: '#FAFAFA' }}>
                  Accelerate Modern Software Development with Rust Engineers
                </h2>
                <p className="text-base leading-relaxed" style={{ color: '#9E9E9E' }}>
                  With the rise of Rust, it has emerged as one of the reliable and high-performing programming languages for software development. Rust development supports businesses in modernizing infrastructure, reducing operational overhead, and building highly scalable software systems. We develop software for huge workloads, operational efficiency and memory safety including cloud-native applications, API development, distributed systems and blockchain solutions.
                </p>
                <a href="/contact/" className="inline-flex items-center justify-center w-auto max-w-xs px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-2 text-center text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-cyan-500 hover:text-white cursor-pointer" style={{ background: 'transparent', borderColor: '#22D3EE', color: '#22D3EE' }}>
                  Talk to Our Developers
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                <img src="/images/hire.page.jpg" alt="Hire Rust Developers" className="w-full rounded-2xl shadow-2xl" style={{ boxShadow: '0 20px 60px rgba(34, 211, 238, 0.3)', aspectRatio: '1 / 1', objectFit: 'cover' }} />
              </motion.div>
            </div>
          </section>

          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: PAGE_BG }}>
            <div className="max-w-7xl mx-auto">
              <SectionHeading title="Technical Expertise of Our Rust Developers" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {expertiseData.map((item, i) => <InfoCard key={item.title} title={item.title} description={item.description} index={i} />)}
              </div>
            </div>
          </section>

          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: PAGE_BG }}>
            <div className="max-w-7xl mx-auto">
              <SectionHeading title="How to Hire Our Rust Developers?" description="The process of hiring Rust developers for your project is simple, transparent, and efficient." />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                {hireStepsData.map((step, i) => (
                  <motion.div key={step.title} className="text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}>
                    <div className="flex items-center justify-center mx-auto mb-6">
                      <div className="rounded-full flex items-center justify-center" style={{ width: '56px', height: '56px', background: '#22D3EE' }}>
                        <span className="text-xl font-bold text-white">{i + 1}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(34, 211, 238, 0.05)' }}>
            <div className="max-w-7xl mx-auto">
              <SectionHeading title="Why Businesses Choose Jashom for Rust Development" description="Our engineering skills, scalable architecture and enterprise-centric execution all contribute to reliable Rust solutions." />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {whyBusinessCardsData.map((card, i) => <InfoCard key={card.title} title={card.title} description={card.description} index={i} />)}
              </div>
            </div>
          </section>

          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: PAGE_BG }}>
            <div className="max-w-7xl mx-auto">
              <SectionHeading title="Flexible Hiring Models" description="Select engagement options suited to project needs, business priorities and development timeframes." accent />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {engagementModelsData.map((model, i) => <InfoCard key={model.title} title={model.title} description={model.description} index={i} />)}
              </div>
            </div>
          </section>

          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: PAGE_BG }}>
            <div className="max-w-7xl mx-auto">
              <motion.div className="relative rounded-2xl overflow-hidden border" style={{ minHeight: '360px', borderColor: CARD_BORDER, boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <img src="/images/cta-gpu-innovation-bg.svg" alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(8, 14, 24, 0.9) 0%, rgba(8, 14, 24, 0.72) 45%, rgba(8, 14, 24, 0.48) 100%)' }} />
                <div className="relative z-10 p-8 sm:p-10 lg:p-12 min-h-[360px] flex items-center">
                  <div className="max-w-2xl rounded-2xl p-6 sm:p-8 border" style={{ background: 'rgba(8, 14, 24, 0.5)', borderColor: 'rgba(34, 211, 238, 0.2)', backdropFilter: 'blur(6px)' }}>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-5 leading-tight" style={{ color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                      Looking to Build Faster, Safer & Scalable Applications?
                    </h2>
                    <p className="text-base sm:text-lg mb-8 leading-relaxed" style={{ color: '#D1D5DB' }}>
                      Partner with our experienced Rust programmers to build efficient, secure and scalable software solutions.
                    </p>
                    <a href="/contact/" className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)', color: '#FFFFFF', boxShadow: '0 10px 26px rgba(34, 211, 238, 0.35)' }}>
                      Get Started
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: PAGE_BG }}>
            <div className="max-w-7xl mx-auto">
              <SectionHeading title="Why Choose Jashom for Rust Development?" description="We support businesses to develop and design future-ready software systems using modern Rust engineering practices and scalable development strategy." />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyChooseBenefitsData.map((benefit, i) => <InfoCard key={benefit.title} title={benefit.title} description={benefit.description} index={i} />)}
              </div>
            </div>
          </section>

          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(34, 211, 238, 0.05)' }}>
            <div className="max-w-7xl mx-auto">
              <SectionHeading title="Trusted by Startups, SaaS Brands & Technology Companies" description="With our expertise in Rust, businesses can build secure digital products, robust backend systems, cloud-ready solutions and scalable software architectures that promote sustainable growth." />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviewsData.map((review, i) => (
                  <motion.div key={review.author} className="rounded-xl p-6 border" style={{ background: CARD_BG, borderColor: CARD_BORDER, boxShadow: CARD_SHADOW }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}>
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => <Zap key={star} className="w-5 h-5" fill={star <= review.filledStars ? '#22D3EE' : 'none'} style={{ color: '#22D3EE' }} />)}
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#9E9E9E' }}>"{review.quote}"</p>
                    <div className="font-semibold text-sm" style={{ color: '#FAFAFA' }}>{review.author}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(34, 211, 238, 0.05)' }}>
            <div className="max-w-7xl mx-auto">
              <SectionHeading title="Explore Related Development Services" description="Browse complementary GPU-oriented services that can make systems even more performance-efficient and scalable." accent />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {relatedServicesData.map((service, i) => (
                  <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * (i + 1) }} className="rounded-2xl p-8 transition-all duration-300 hover:scale-105" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, boxShadow: CARD_SHADOW }}>
                    <h3 className="text-2xl font-bold mb-4" style={{ color: '#FFFFFF' }}>{service.title}</h3>
                    <p className="text-base mb-6 leading-relaxed" style={{ color: '#B0B0B0' }}>{service.description}</p>
                    <a href={service.href} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-240 hover:opacity-90" style={RELATED_SERVICE_BTN_STYLE}>
                      <span>Know More</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: PAGE_BG }}>
            <div className="max-w-7xl mx-auto">
              <SectionHeading title="Frequently Asked Questions" description="Common questions about hiring Rust developers from Jashom." />
              <div className="max-w-4xl mx-auto space-y-4">
                {faqData.map((item, i) => (
                  <motion.div key={item.q} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * (i + 1) }} className="rounded-2xl border overflow-hidden" style={FAQ_ITEM_STYLE}>
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                        <h3 className="text-lg font-semibold pr-4" style={{ color: '#FAFAFA' }}>{item.q}</h3>
                        <svg className="w-6 h-6 transition-transform group-open:rotate-180" style={{ color: '#9E9E9E' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={CHEVRON_DOWN_D} />
                        </svg>
                      </summary>
                      <div className="px-6 pt-2 pb-8">
                        <p className="text-base leading-relaxed" style={{ color: '#9E9E9E' }}>{item.a}</p>
                      </div>
                    </details>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(34, 211, 238, 0.05)' }}>
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#FAFAFA' }}>
                  Get Started with Expert Rust Developers
                </h2>
                <p className="text-base leading-relaxed mb-8 max-w-2xl mx-auto" style={{ color: '#9E9E9E' }}>
                  Let us know your project needs and we will get in touch within 24 hours. We will support you in hiring the best Rust developers that match your technical objectives, scalability requirements and development strategy.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {getStartedFeaturesData.map((feature) => (
                    <div key={feature.title} className="flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={FEATURE_ICON_BOX_STYLE}>
                        <svg className="w-6 h-6 text-[#22D3EE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.pathD} />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: '#FAFAFA' }}>{feature.title}</h3>
                        <p className="text-sm" style={{ color: '#9E9E9E' }}>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="rounded-2xl p-8 border" style={{ background: '#111827', borderColor: 'rgba(34, 211, 238, 0.3)' }}>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '28px', marginBottom: '28px' }}>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" style={HIRE_FORM_INPUT_STYLE} placeholder="Full Name *" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" style={HIRE_FORM_INPUT_STYLE} placeholder="Business Email *" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" style={HIRE_FORM_INPUT_STYLE} placeholder="Phone Number" />
                    <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" style={HIRE_FORM_INPUT_STYLE} placeholder="Company Name" />
                  </div>
                  <select name="hiringModel" value={formData.hiringModel} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" style={{ ...HIRE_FORM_INPUT_STYLE, marginBottom: '24px' }}>
                    <option value="">Select a hiring model</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="time-material">Time & Material</option>
                    <option value="custom">Custom Model</option>
                  </select>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none mb-7" style={HIRE_FORM_INPUT_STYLE} placeholder="Tell us about your Rust project, timeline, and technical needs..." />
                  {hireSubmitError && <p className="text-sm mb-4" style={{ color: '#fca5a5' }} role="alert">{hireSubmitError}</p>}
                  <button type="submit" disabled={hireSubmitting} className="w-full px-8 py-4 rounded-lg font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed" style={{ background: 'linear-gradient(135deg, #22D3EE, #06B6D4)', color: '#FFFFFF', boxShadow: '0 8px 24px rgba(34, 211, 238, 0.4)' }}>
                    {hireSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
