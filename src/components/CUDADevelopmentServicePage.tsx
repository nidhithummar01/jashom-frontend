import { motion } from 'motion/react';
import { SEO } from './SEO';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTION_BG = '#0B0F14';
const CARD_BG_LIGHT = '#f5f5f5';
const BORDER_SUBTLE = 'rgba(255, 255, 255, 0.08)';
const BENEFIT_CARD_BG = 'rgba(16, 185, 129, 0.05)';

const CheckIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIconLarge = () => (
  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const QuoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M10 18C10 15.7909 11.7909 14 14 14V10C9.58172 10 6 13.5817 6 18C6 20.2091 7.79086 22 10 22V18Z" fill="#10B981" opacity="0.3" />
    <path d="M22 18C22 15.7909 23.7909 14 26 14V10C21.5817 10 18 13.5817 18 18C18 20.2091 19.7909 22 22 22V18Z" fill="#10B981" opacity="0.3" />
  </svg>
);

const DividerLine = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </div>
);

const servicesData = [
  { title: 'Custom Parallel\nAlgorithm Design', description: 'To maintain long-term computational performance, we build workload-specific parallel plans, compromising thread allocation, the use of memory hierarchy, and synchronization.' },
  { title: 'GPU Acceleration for\nExisting Systems', description: 'With little disturbance, legacy applications are reformed to run on the GPU. We control the optimization of data transfer, API correspondence, and validation to production readiness.' },
  { title: 'End-to-End Performance\nArchitecture', description: 'Since we do initial modeling, benchmark validation, and hardening against deployment, we manage all the steps of the CUDA implementation with precision-driven engineering requirements.' },
];

const industryItems = [
  'Artificial Intelligence Model Training & Inference Systems',
  'Super-Accurate Scientific Research Platforms',
  'Risk Engines and Algorithms Trading',
  'Instant Media Rendering and Analysis',
];

const processSteps = [
  { title: 'Computational Profiling', description: 'We measure execution patterns, memory loads, and bottlenecks in order to come up with realistic acceleration targets.', gradient: 'from-blue-500 to-blue-500', shadow: 'shadow-blue-500/50', pathD: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { title: 'Parallel Systems Blueprint', description: 'Models known as thread hierarchy, shared memory models, and workload partitioning are designed for models that are ideal to execute using the GPUs.', gradient: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/50', pathD: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
  { title: 'CUDA Core Development', description: 'The high-occupancy kernels are also designed to provide the predictability of throughput when operating at peak loading.', gradient: 'from-blue-500 to-blue-500', shadow: 'shadow-cyan-500/50', pathD: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { title: 'Bottleneck Elimination & Benchmarking', description: 'The profiling tools reveal the areas of inefficiency so that they can be refined to achieve continuous and reliable performance improvements.', gradient: 'from-pink-500 to-rose-500', shadow: 'shadow-pink-500/50', pathD: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { title: 'Application Integration', description: 'GPU modules are integrated into your software ecosystem with clean interfaces and continuity.', gradient: 'from-indigo-500 to-purple-500', shadow: 'shadow-indigo-500/50', pathD: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
  { title: 'Production Optimization', description: 'Scalability is guaranteed during post-deployment analysis, based on the changing workloads and multi-GPUs.', gradient: 'from-green-500 to-emerald-500', shadow: 'shadow-green-500/50', pathD: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
];

const benefitsData = [
  { title: 'Accelerated\nComputational\nPerformance', description: 'CUDA allows parallel computation of thousands of Cores on the GPU, which saves a lot of processing time when dealing with complex workloads, like AI training, simulations, and applications of large data analytics.', borderColor: 'rgba(16, 185, 129, 0.35)' },
  { title: 'Improved\nInfrastructure\nEfficiency', description: 'By moving more intensive workloads off of CPU and onto the GPUs, the organizations are able to handle larger data volumes with reduced hardware resources to enhance performance-per-watt and infrastructure ROI.', borderColor: 'rgba(6, 182, 212, 0.35)' },
  { title: 'Enhanced\nCompetitive\nPositioning', description: 'A rapid computational speed can be more useful in fast experimentation, real-time analysis, and sophisticated modeling, which will enable companies to innovate faster and have a high level of technological superiority in their industry.', borderColor: 'rgba(139, 92, 246, 0.35)' },
  { title: 'Scalable\nHigh-Performance\nArchitecture', description: 'The architecture of CUDA-based systems is built so that it can be used in both multi-GPU architectures and high-performance clusters, both in terms of throughput and reliability, as data requirements and computing complexity rise.', borderColor: 'rgba(236, 72, 153, 0.35)' },
  { title: 'Future-Ready\nTechnology\nInvestment', description: 'Adopting CUDA aligns your infrastructure with evolving GPU advancements, ensuring compatibility with emerging AI frameworks, deep learning models, and next-generation computational workloads.', borderColor: 'rgba(251, 146, 60, 0.35)' },
  { title: 'Reduced\nDevelopment\nCycles', description: 'The performance in terms of optimization of GPU acceleration reduces the time of implementation in testing and in the process of iteration, whereby development teams can quickly rise above their experimental levels and proceed with their production processes more efficiently.', borderColor: 'rgba(52, 211, 153, 0.35)' },
];

const whyChooseItems = [
  { title: 'Advanced Parallel Computing Expertise', description: 'Our engineers have extensive practical experience in CUDA programming and in the design of large-scale parallel architecture, as well as in the management of the GPU memory. We build production-ready acceleration frameworks that prioritize execution stability, optimal resource utilization, and sustained high-throughput performance across demanding computational environments.' },
  { title: 'Quantifiable Performance Improvements', description: 'All CUDA implementations have advanced profiling, benchmarking, and performance analysis. We quantify the reduction of latency, throughput improvement as well as resource efficiency to make sure that optimization outcomes are realistic, evidence-based, and consistent with clearly established performance goals.' },
  { title: 'Workload-Specific Optimization Strategy', description: "We do not just make some arbitrary acceleration, but instead analyze the patterns of execution of your application, data dependencies, and scaling needs. This enables us to design CUDA solutions that are highly targeted to optimally match workload behaviour and provide predictable and orderable computational benefits." },
];

const testimonialsData = [
  { quote: '"GPU acceleration significantly enhanced our data processing framework, reducing execution cycles under high-load scenarios."', initials: 'DE', role: 'Director of Engineering', company: 'AI Platform', avatarGradient: 'linear-gradient(135deg, #10B981, #06B6D4)' },
  { quote: '"Our migration to CUDA-based execution improved analytical throughput without expanding infrastructure costs."', initials: 'CT', role: 'Chief Technology Officer', company: 'Technology Company', avatarGradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)' },
  { quote: '"The architectural redesign delivered predictable performance scaling across multiple GPU nodes."', initials: 'HS', role: 'Head of Systems Engineering', company: 'Engineering Company', avatarGradient: 'linear-gradient(135deg, #10B981, #34D399)' },
];

const faqData = [
  { q: 'How do I know if my application is suitable for CUDA acceleration?', a: 'Applications whose operations are frequently repeated in numbers, process large datasets, matrix calculations, or can be performed in parallel are good candidates. Performing profiling measurements helps us identify whether there are any performance improvements that can be realized and achieved through the use of GPU acceleration.' },
  { q: 'Can CUDA be integrated into an existing production system?', a: 'Yes. We refactor and modularize elements such that there is no disruption to other business operations, and a full system rebuild is not necessary to add the acceleration of a graphics card to your existing architecture.' },
  { q: 'What is the difference between CPU optimization and CUDA optimization?', a: 'CPU optimization enhances the ability to run sequence-related tasks, whereas CUDA optimization rearranges workloads to execute them in a massively parallel fashion across the armies of cores in GPUs, which is much more efficient at providing high throughput in tasks of high compute intensity.' },
  { q: 'Do you support multi-GPU and cluster-based deployments?', a: 'Absolutely. Our CUDA architectures are optimized to be scaled to multi-GPU and high-performance cluster environments, such that the performance remains consistent as the level of computational requirements rises.' },
  { q: 'How do you measure performance improvement in CUDA projects?', a: 'Before and after optimization, we measure the reduction of execution time, the increased memory efficiency, and scalability through profiling tools, benchmarking frameworks, and throughput analysis.' },
  { q: 'Is ongoing CUDA performance tuning necessary?', a: 'Yes. With the changing workloads, periodical profiling and optimization will ensure the efficiency is maintained and avoid any bottlenecks, keeping the utilization of the GPUs optimal over time.' },
];

export function CUDADevelopmentServicePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Redirect to thank you page
    navigate('/thank-you/');
  };
  return (
    <div className="min-h-screen" style={{ background: SECTION_BG }}>
      <SEO
        title="CUDA Development Services | Expert CUDA Developers for GPU Computing"
        description="Hire experienced CUDA developers to build high-performance GPU applications. Jashom delivers scalable CUDA development solutions for AI, deep learning, and parallel computing."
        keywords="CUDA development, CUDA developers, GPU computing, parallel computing, CUDA programming"
      />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: '100vh',
          backgroundImage: 'url(/images/cuda.service.hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Brightness layer for background image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/cuda.service.hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(1.2)'
          }}
        ></div>

        {/* Dark Gradient Overlay - Left to Right fade for readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(11, 15, 20, 0.85) 0%, rgba(11, 15, 20, 0.75) 40%, rgba(11, 15, 20, 0.5) 70%, rgba(11, 15, 20, 0.3) 100%)'
          }}
        ></div>

        {/* Content - Premium Spacing */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full" style={{ paddingTop: '140px', paddingBottom: '100px' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
              style={{ maxWidth: '620px' }}
            >
              {/* Heading */}
              <h1
                className="font-bold text-white leading-tight"
                style={{
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
                  letterSpacing: '-0.02em',
                  marginBottom: '32px'
                }}
              >
                Custom CUDA Development for Advanced GPU Computing
              </h1>

              {/* Paragraph */}
              <p
                className="text-white/90"
                style={{
                  fontSize: 'clamp(17px, 2vw, 20px)',
                  lineHeight: '1.75',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
                  marginBottom: '48px',
                  maxWidth: '560px'
                }}
              >
                Revolutionize computational pressure to run scalable performance using master CUDA engineering. Our architectures are built and deployed in the form of GPU-native, which opens the door to the efficiency of parallel processing of the AI systems, simulations, and data-intensive programs.
              </p>

              {/* CTA Button */}
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:scale-105"
                style={{
                  background: '#10B981',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.4)'
                }}
              >
                Get Free Consultation
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: SECTION_BG }}>
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section title - full width centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4 px-4 py-2 rounded-full" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <p className="text-sm uppercase tracking-wider" style={{ color: '#10B981' }}>Overview</p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              What CUDA Means for
              <br />
              Your Architecture
            </h2>
            <p className="text-white/70 text-lg mt-4">Redefining Performance with GPU Parallelism</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Description */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <p className="text-white/70 text-base leading-relaxed">
                  CUDA development is concentrated on reengineering applications that perform effectively in thousands of cores of GPUs at the same time. Workloads are separated into parallel operations that are optimized to high throughput environments, rather than creating sequential CPU execution.
                </p>
                <p className="text-white/70 text-base leading-relaxed">
                  Such a solution will minimize latency, optimize the use of resources, and increase the scalability of machine learning, quantitative analytics, visualization engines, and scientific modeling systems. The correct use of CUDA is not acceleration; it is an architectural change.
                </p>

                {/* Key Benefits */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="rounded-lg p-4" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <div className="text-3xl font-bold mb-1" style={{ color: '#10B981' }}>100x</div>
                    <div className="text-sm" style={{ color: '#9E9E9E' }}>Compute Throughput Increase</div>
                  </div>
                  <div className="rounded-lg p-4" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <div className="text-3xl font-bold mb-1" style={{ color: '#10B981' }}>Up to 50%</div>
                    <div className="text-sm" style={{ color: '#9E9E9E' }}>Hardware Efficiency Optimization</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Image */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative"
              >
                <img
                  src="/images/cuda.developer.jpg"
                  alt="CUDA Development"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  style={{ boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)' }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider between sections */}
      <div className="premium-divider" />

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: SECTION_BG }}>
        <div className="max-w-7xl mx-auto">
          {/* Section title - full width centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Performance-Driven
              <br />
              CUDA Engineering
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <p className="text-white/70 text-base leading-relaxed">
              Our team develops high-performance GPU systems that are very stable, scalable, and capable of providing performance across enterprise workloads, which can be measured.
            </p>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="rounded-2xl p-8"
                style={{ background: CARD_BG_LIGHT }}
              >
                <h3 className="text-2xl font-bold mb-4 text-black whitespace-pre-line">{item.title}</h3>
                <p className="text-base leading-relaxed text-[#666666]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry-Specific Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: SECTION_BG }}>
        {/* Brightness layer for background image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/industry-services9.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(1.1)'
          }}
        ></div>

        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 z-0" style={{ background: 'rgba(11, 15, 20, 0.4)' }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
              Accelerating Compute-Intensive
              <br />
              Industries
            </h2>
            <p className="text-white/90 text-base leading-relaxed mb-12 max-w-3xl" style={{ textShadow: '0 1px 5px rgba(0, 0, 0, 0.5)' }}>
              We design CUDA-driven solutions to industries whose speed of processing has a direct consequence on the results of their operation.
            </p>

            {/* Industry List - 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {industryItems.map((label) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 bg-[#10B981]">
                    <CheckIcon />
                  </div>
                  <span className="text-white text-base font-medium">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <DividerLine />

      {/* Process Flow Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0B0F14 0%, #111827 50%, #0B0F14 100%)' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-32"
          >
            <div className="inline-block mb-4 px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm">
              <span className="text-blue-400 font-semibold text-sm">OUR PROCESS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Structured CUDA <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Implementation Process</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-4">
              A Six-Phase GPU Engineering Model
            </p>
            <p className="text-white/60 text-base max-w-2xl mx-auto mb-16">
              Our design guarantees high availability, acceleration, and system integrity as well as scalability.
            </p>
          </motion.div>

          {/* Process Steps - Centered Transparent Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="text-center group"
              >
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg ${step.shadow} group-hover:scale-110 transition-transform duration-300`}>
                      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.pathD} />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6">{step.title}</h3>
                  <p className="text-white/60 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mt-16"
          >
            <a
              href="/contact/"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 hover:scale-105"
            >
              <span>Start Your Development Journey</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      <DividerLine />

      {/* Business Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: SECTION_BG }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Strategic Benefits of
              <br />
              CUDA Development
            </h2>
          </motion.div>

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefitsData.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="rounded-xl p-8 border transition-all duration-300"
                style={{ background: BENEFIT_CARD_BG, borderColor: item.borderColor }}
              >
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight whitespace-pre-line">{item.title}</h3>
                <p className="text-white/70 text-base leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DividerLine />

      {/* Why Choose Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-[100px]" style={{ background: SECTION_BG }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '60px' }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Why Organizations Trust
              <br />
              Our CUDA Team
            </h2>
          </motion.div>

          {/* Benefits List */}
          <div className="flex flex-col gap-6">
            {whyChooseItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="flex items-start gap-6 border rounded-xl p-6"
                style={{ borderColor: BORDER_SUBTLE }}
              >
                <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 bg-[#10B981]">
                  <CheckIconLarge />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/70 text-base leading-relaxed max-w-4xl">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Our Clients Say Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: SECTION_BG }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-6 py-2 rounded-full border mb-6"
              style={{
                background: 'rgba(16, 185, 129, 0.05)',
                borderColor: 'rgba(16, 185, 129, 0.2)'
              }}
            >
              <span style={{ color: '#10B981', fontWeight: 600, fontSize: '0.875rem' }}>Client Testimonials</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#FAFAFA', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
              Client Experiences
            </h2>

            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#9CA3AF', lineHeight: 1.7 }}>
              Proven Impact Across Industries
            </p>
          </motion.div>

          {/* Testimonials Grid - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonialsData.map((t, index) => (
              <motion.div
                key={t.initials}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="group"
              >
                <div
                  className="h-full p-8 rounded-2xl border transition-all duration-300 bg-white/[0.02] backdrop-blur-[10px]"
                  style={{ borderColor: BORDER_SUBTLE }}
                >
                  <div className="mb-4"><QuoteIcon /></div>
                  <p className="text-base mb-8 text-[#D1D5DB] leading-[1.8]">{t.quote}</p>
                  <div className="flex items-center gap-4 mt-4 pt-8 border-t" style={{ borderColor: BORDER_SUBTLE }}>
                    <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white" style={{ background: t.avatarGradient }}>{t.initials}</div>
                    <div>
                      <div className="text-[#FAFAFA] font-semibold text-[15px]">{t.role}</div>
                      <div className="text-[#9CA3AF] text-[13px]">{t.company}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: SECTION_BG }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column - Title */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-white/60 text-sm mb-4 uppercase tracking-wider">FAQs</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                  Frequently
                  <br />
                  Asked Questions
                </h2>
              </motion.div>
            </div>

            {/* Right Column - FAQ Items */}
            <div className="lg:col-span-8 space-y-4">
              {faqData.map((item, index) => (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  className="rounded-2xl border border-white/10 overflow-hidden"
                  style={{ background: SECTION_BG }}
                >
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <h3 className="text-lg font-semibold text-white pr-4">{item.q}</h3>
                      <svg className="w-6 h-6 text-white/60 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pt-2 pb-8">
                      <p className="text-white/70 text-base leading-relaxed">{item.a}</p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Contact Form Section */}
        <motion.div
          className="mt-12 sm:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: '#FAFAFA', letterSpacing: '-0.025em', lineHeight: 1.2 }}
            >
              Get Started with CUDA Development
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg mb-4 leading-relaxed max-w-2xl mx-auto"
              style={{ color: '#9CA3AF' }}
            >
              Fill out the form and our team will get back to you within 24 hours.
            </motion.p>
          </div>

          {/* Form Container - Centered with max-width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
            style={{
              maxWidth: '1100px',
              margin: '0 auto'
            }}
          >
            {/* Subtle radial glow behind form */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, transparent 60%)',
                filter: 'blur(60px)',
                opacity: 0.6
              }}
            />

            <div
              className="relative w-full"
              style={{
                background: 'rgba(17, 24, 39, 0.6)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(14px)',
                padding: '48px 32px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}
            >
              <form style={{ display: 'flex', flexDirection: 'column', gap: '28px' }} onSubmit={handleSubmit}>
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px' }}>
                  <div>
                    <label htmlFor="cuda-name" className="block text-white/90 mb-2 font-medium text-sm">Full Name *</label>
                    <input
                      type="text"
                      id="cuda-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border text-white placeholder-white/40 focus:border-[#10B981]/50 focus:outline-none focus:ring-1 focus:ring-[#10B981]/30 transition-all"
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                      }}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="cuda-email" className="block text-white/90 mb-2 font-medium text-sm">Email Address *</label>
                    <input
                      type="email"
                      id="cuda-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border text-white placeholder-white/40 focus:border-[#10B981]/50 focus:outline-none focus:ring-1 focus:ring-[#10B981]/30 transition-all"
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                      }}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Row 2: Company & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px' }}>
                  <div>
                    <label htmlFor="cuda-company" className="block text-white/90 mb-2 font-medium text-sm">Company Name</label>
                    <input
                      type="text"
                      id="cuda-company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border text-white placeholder-white/40 focus:border-[#10B981]/50 focus:outline-none focus:ring-1 focus:ring-[#10B981]/30 transition-all"
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                      }}
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label htmlFor="cuda-phone" className="block text-white/90 mb-2 font-medium text-sm">Phone Number</label>
                    <input
                      type="tel"
                      id="cuda-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border text-white placeholder-white/40 focus:border-[#10B981]/50 focus:outline-none focus:ring-1 focus:ring-[#10B981]/30 transition-all"
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                      }}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                {/* Row 3: Message (Full Width) */}
                <div>
                  <label htmlFor="cuda-message" className="block text-white/90 mb-2 font-medium text-sm">Project Details *</label>
                  <textarea
                    id="cuda-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border text-white placeholder-white/40 focus:border-[#10B981]/50 focus:outline-none focus:ring-1 focus:ring-[#10B981]/30 transition-all resize-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      borderColor: 'rgba(255, 255, 255, 0.1)'
                    }}
                    placeholder="Tell us about your CUDA development needs..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center sm:justify-start">
                  <motion.button
                    type="submit"
                    className="px-12 py-4 rounded-xl font-semibold text-base transition-all duration-300 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                      border: '1px solid transparent',
                      color: '#FFFFFF',
                      boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)',
                      minWidth: '200px'
                    }}
                    whileHover={{
                      y: -2,
                      boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Office Information Section - Below Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#FAFAFA' }}>
                Our Office
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Address */}
              <div
                className="p-6 rounded-xl text-center transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(17, 24, 39, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(14px)'
                }}
              >
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                  <img
                    src="/images/inidan.flag.jpg"
                    alt="India Flag"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#FAFAFA' }}>Address</h4>
                <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>
                  414, Satyam-2, Amba Business Park,<br />
                  ATPL, Adalaj, Gujarat,<br />
                  India - 380054
                </p>
              </div>

              {/* Email */}
              <div
                className="p-6 rounded-xl text-center transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(17, 24, 39, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(14px)'
                }}
              >
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                  <svg className="w-6 h-6" style={{ color: '#10B981' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#FAFAFA' }}>Email</h4>
                <a
                  href="mailto:info@jashom.com"
                  className="text-sm transition-colors inline-block"
                  style={{ color: '#10B981' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#059669'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#10B981'}
                >
                  info@jashom.com
                </a>
                <p className="text-xs mt-3" style={{ color: '#6B7280' }}>
                  We respond within 24 hours
                </p>
              </div>

              {/* Phone */}
              <div
                className="p-6 rounded-xl text-center transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(17, 24, 39, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(14px)'
                }}
              >
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                  <svg className="w-6 h-6" style={{ color: '#10B981' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#FAFAFA' }}>Phone</h4>
                <a
                  href="tel:+919023906363"
                  className="text-sm transition-colors inline-block"
                  style={{ color: '#10B981' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#059669'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#10B981'}
                >
                  +91 90239 06363
                </a>
                <p className="text-xs mt-3" style={{ color: '#6B7280' }}>
                  Available Mon-Fri, 9AM-6PM IST
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

