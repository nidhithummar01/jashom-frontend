import { motion } from 'motion/react';
import { SEO as Seo } from './SEO';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTION_BG = '#0B0F14';
const CARD_BG_LIGHT = '#f5f5f5';
const BORDER_SUBTLE = 'rgba(255, 255, 255, 0.08)';
const BENEFIT_CARD_BG = 'rgba(16, 185, 129, 0.05)';
const BADGE_STYLE = { background: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.25)' } as const;
const CHEVRON_DOWN_D = 'M19 9l-7 7-7-7';

const CHECK_PATH = 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
const CheckIcon = ({ size = 'sm' }: { size?: 'sm' | 'lg' }) => (
  <svg className={size === 'lg' ? 'w-6 h-6 text-white' : 'w-5 h-5 text-white'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={CHECK_PATH} />
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
  { title: 'CUDA\nOptimization', description: 'We optimize the underlying kernel execution, better shared memory assignment, and also readjust thread block settings to optimize performance. The services of our CUDA Development are aimed at removing the warp divergence and the latency in the NVIDIA GPU architecture.' },
  { title: 'AI/ML\nAcceleration', description: 'Optimize the equilibrium of both the speed of model training and inference via optimized batch operations and the control of accessing memory. We optimize compute to reduce training time and improve predictive performance.' },
  { title: 'Performance\nProfiling', description: 'We identify the areas of inefficiency in the execution flow and memory transfers into increasingly sophisticated profiling frameworks. The benefits of detailed benchmarking are accuracy in making optimization decisions and quantifiable performance improvements.' },
];
const industryItems = ['AI & Machine Learning', 'Scientific Computing', 'Data Analytics', 'Rendering & Graphics'];
const processSteps = [
  { title: 'Assessment', description: 'Assess existing GPU architecture, load, and establish specific optimization objectives.', gradient: 'from-blue-500 to-blue-500', shadow: 'shadow-blue-500/50', pathD: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { title: 'Analysis', description: 'Gather real-time monitoring information and spot performance issues and performance bottlenecks.', gradient: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/50', pathD: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4' },
  { title: 'Kernel Optimization', description: 'Refine CUDA kernels and improve parallel execution balance.', gradient: 'from-blue-500 to-blue-500', shadow: 'shadow-cyan-500/50', pathD: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { title: 'Tuning', description: 'Expenses in runtime parameters and memory allocation, better throughput.', gradient: 'from-pink-500 to-rose-500', shadow: 'shadow-pink-500/50', pathD: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { title: 'Testing', description: 'Authenticate gains with validation checkpoints.', gradient: 'from-indigo-500 to-purple-500', shadow: 'shadow-indigo-500/50', pathD: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Deployment', description: 'Employ workloads that are optimized, monitored, and improved.', gradient: 'from-green-500 to-emerald-500', shadow: 'shadow-green-500/50', pathD: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
];
const benefitsData = [
  { title: 'Faster\nProcessing\nSpeed', description: 'Fasten hardened compute tasks with an ideal use of parallelization and data movement. With decreased processing time, there will be shorter experimentation times and shorter delivery times.', borderColor: 'rgba(16, 185, 129, 0.35)' },
  { title: 'Lower Costs of\nInfrastructure', description: 'Optimize the use of GPUs in order to reduce costs on clouds and hardware. Harmful efficiency brings a decrease in over-provisioning and enhanced resource allocation.', borderColor: 'rgba(6, 182, 212, 0.35)' },
  { title: 'Improved\nScalability', description: 'Processes more data and intricate programs with no drop in performance or increased proportional cost.', borderColor: 'rgba(139, 92, 246, 0.35)' },
  { title: 'Enhanced\nModel\nPerformance', description: 'Improve the performance of AI models training and inference with optimal CUDA execution paths.', borderColor: 'rgba(236, 72, 153, 0.35)' },
  { title: 'Competitive\nAdvantage', description: 'Become better computers to hasten innovation and become more powerful in data-based markets.', borderColor: 'rgba(251, 146, 60, 0.35)' },
  { title: 'Energy\nEfficiency', description: 'Minimize energy use by optimizing the use of GPUs, which helps on the sustainability agenda and limits the cost of running the operations.', borderColor: 'rgba(52, 211, 153, 0.35)' },
];
const whyChooseItems = [
  { title: 'Advanced Parallel Computing Expertise', description: 'Our experts have extensive expertise in CUDA implementation, tuning of the GPU architecture, and high-performance parallel systems. This is done at low-level kernel optimization all the way up to optimizing an entire NVIDIA GPU, and we work to squeeze the highest performance out of every tier of your computing system.' },
  { title: 'Results Backed by Data', description: 'We value quantitative difference. Each interaction is predetermined by profiling information, systematic testing, and efficiency metrics showing evident acceleration, competitive advantages, and enhanced hardware use.' },
  { title: 'Optimization Built Around Your Workload', description: 'No generic templates. We will create application-specific GPU optimization that will respond to your application and run a discussion, infrastructure configuration, as well as scalability needs by making the performance consistently enhanced on a long-term basis.' },
];
const testimonialsData = [
  { quote: '"Their graphics processing optimization experience minimized our processing latency. The CUDA execution benefits were fast and quantifiable."', initials: 'AM', name: 'Arjun Mehta', role: 'Director of Engineering, NovaAI Labs', avatarGradient: 'linear-gradient(135deg, #10B981, #06B6D4)' },
  { quote: '"Our AI training pipeline became significantly faster after their optimization work. Clear performance gains with reduced infrastructure strain."', initials: 'SA', name: 'Sofia Alvarez', role: 'CTO, Quantix Systems', avatarGradient: 'linear-gradient(135deg, #10B981, #06B6D4)' },
  { quote: '"We hired their CUDA developers for complex optimization tasks. The results were stable, scalable, and production-ready."', initials: 'DB', name: 'Daniel Brooks', role: 'Chief Operating Officer, CoreTech Solutions', avatarGradient: 'linear-gradient(135deg, #10B981, #06B6D4)' },
];
const faqData = [
  { q: 'How long does a GPU optimization project typically take?', a: 'The timelines of projects are based on the complexity of the workload, the level of infrastructure, and the objectives of the performance. Enterprise environments take most optimization engagements between a few weeks and a few months.' },
  { q: 'Can you optimize legacy CUDA codebases?', a: 'Yes. We test current CUDA implementations, determine architectural waste, and cull kernels to optimize memory access characteristics, parallel execution ratio, and total performance.' },
  { q: 'What metrics do you use to measure optimization success?', a: 'We assess the use of GPUs, the performance, the ability to use memory, the decrease in latency, the efficiency of the scalability, and the savings in costs using structured profiling and benchmarking techniques.' },
  { q: 'Do optimized workloads remain stable in production?', a: 'Absolutely. All optimizations are tested, regressed, and monitored during deployment to make sure that the performance improvements will be maintained in the field.' },
];
const aiModelsData = [
  { name: 'GPT-4o', src: '/images/AI Models exeperty/gpt-4o.jpg.jpg', alt: 'GPT-4o' },
  { name: 'Llama 3', src: '/images/AI Models exeperty/llama-3.jpg.webp', alt: 'Llama 3' },
  { name: 'PaLM 2', src: '/images/AI Models exeperty/palm-2.jpg.webp', alt: 'PaLM 2' },
  { name: 'Stability AI', src: '/images/AI Models exeperty/stability-ai.jpg.webp', alt: 'Stability AI' },
  { name: 'Google Gemini', src: '/images/AI Models exeperty/google-gemini.jpg.webp', alt: 'Google Gemini' },
  { name: 'Vicuna', src: '/images/AI Models exeperty/vicuna.jpg.webp', alt: 'Vicuna' },
  { name: 'Mistral', src: '/images/AI Models exeperty/mistral.jpg.webp', alt: 'Mistral' },
  { name: 'Claude', src: '/images/AI Models exeperty/claude.jpg.webp', alt: 'Claude' },
];

const formInputClass = 'w-full px-4 py-3 rounded-xl border text-white placeholder-white/40 focus:border-[#10B981]/50 focus:outline-none focus:ring-1 focus:ring-[#10B981]/30 transition-all';
const formInputStyle = { background: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(255, 255, 255, 0.1)' } as const;

const formFieldsConfig: { name: 'name' | 'email' | 'company' | 'phone' | 'message'; label: string; type: 'text' | 'email' | 'tel' | 'textarea'; placeholder: string; required?: boolean; rows?: number }[] = [
  { name: 'name', label: 'Full Name *', type: 'text', placeholder: 'John Doe', required: true },
  { name: 'email', label: 'Email Address *', type: 'email', placeholder: 'john@company.com', required: true },
  { name: 'company', label: 'Company Name', type: 'text', placeholder: 'Your Company' },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000' },
  { name: 'message', label: 'Project Details *', type: 'textarea', placeholder: 'Tell us about your GPU optimization needs...', required: true, rows: 4 },
];

const OFFICE_ICON_BG = { background: 'rgba(16, 185, 129, 0.15)' } as const;
const officeCardsData: { title: string; type: 'address' | 'email' | 'phone'; content: React.ReactNode; href?: string; subtitle?: string }[] = [
  {
    title: 'Address',
    type: 'address',
    content: <>414, Satyam-2, Amba Business Park,<br />ATPL, Adalaj, Gujarat,<br />India - 380054</>,
  },
  {
    title: 'Email',
    type: 'email',
    content: 'info@jashom.com',
    href: 'mailto:info@jashom.com',
    subtitle: 'We respond within 24 hours',
  },
  {
    title: 'Phone',
    type: 'phone',
    content: '+91 90239 06363',
    href: 'tel:+919023906363',
    subtitle: 'Mon-Fri, 9AM-6PM IST',
  },
];
const officeCardStyle = { background: 'rgba(17, 24, 39, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(14px)' } as const;

export function GPUOptimizationServicePage() {
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
    navigate('/thank-you/');
  };
  return (
    <div className="min-h-screen" style={{ background: SECTION_BG }}>
      <Seo
        title="NVIDIA GPU Optimization Services | Optimize NVIDIA GPU Performance"
        description="Improve speed and efficiency with expert NVIDIA GPU optimization services. We help businesses optimize NVIDIA GPU performance for AI, HPC, and data-intensive applications."
        keywords="GPU optimization, NVIDIA GPU, GPU performance, AI acceleration, HPC optimization"
      />

      {/* Hero Section with Background Image */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: '100vh',
          backgroundImage: 'url(/images/service-hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Brightness layer for background image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/service-hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(1.3)'
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
                GPU Optimization Services
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
                We provide advanced GPU Optimization Services, used to maximize your computing infrastructure to full performance. Our team optimizes workload patterns, execution pipes, and parallel processing to remove bottlenecks.
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
              What is GPU
              <br />
              Optimization?
            </h2>
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
                  GPU optimization is a performance engineering science that aims at making the best use of throughput in a parallel computing system. It requires workload profiling, CUDA kernel restructuring, thread synchronization optimization, and efficient use of memory access to deliver consistent high-performance execution on modern hardware.
                </p>
                <p className="text-white/70 text-base leading-relaxed">
                  Training time can also be minimized by optimized workloads on GPUs, infrastructure waste is minimized, and AI, scientific simulations, and data analytics apps are able to achieve higher compute densities. The result is accelerated processing, optimal use of hardware for compute-intensive processes, and cost-sustainability.
                </p>

                {/* Key Benefits */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="rounded-lg p-4" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <div className="text-3xl font-bold mb-1" style={{ color: '#10B981' }}>10x</div>
                    <div className="text-sm" style={{ color: '#9E9E9E' }}>Faster Execution</div>
                  </div>
                  <div className="rounded-lg p-4" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <div className="text-3xl font-bold mb-1" style={{ color: '#10B981' }}>40%</div>
                    <div className="text-sm" style={{ color: '#9E9E9E' }}>Reduced Compute Costs</div>
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
                  src="/images/gpu.optimization.jpg"
                  alt="GPU Optimization"
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
              Optimize Performance That
              <br />
              Drives Real Results
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
              Our engineers integrate CUDA Development Services with profound architectural experience to increase the use of a GPU on a wide range of workloads.
            </p>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                className="rounded-2xl p-8"
                style={{ background: CARD_BG_LIGHT }}
              >
                <h3 className="text-2xl font-bold mb-4 whitespace-pre-line" style={{ color: '#000000' }}>{item.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: '#666666' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Get in Touch Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mt-16 pt-8"
          >
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:opacity-90"
              style={{
                background: '#10B981',
                color: '#FFFFFF'
              }}
            >
              Get in Touch With Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* Industry-Specific Services Section */}
      <section className="px-4 sm:px-6 lg:px-8" style={{ background: SECTION_BG, paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight" style={{ marginBottom: '16px' }}>
                Industry-Focused GPU
                <br />
                Optimization Solutions
              </h2>
              <p className="text-white/70 text-base leading-relaxed max-w-3xl mb-6">
                Our GPU optimization services are designed to satisfy the computational needs of industry-specific situations. Each of our solutions is differentiated based on workload complexity, goals, and scalability goals.
              </p>

              {/* Industry List - 2x2 Grid */}
              <div className="grid grid-cols-2 gap-8 max-w-2xl">
                {industryItems.map((label) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: '#10B981' }}>
                      <CheckIcon />
                    </div>
                    <span className="text-white text-base">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/images/gpu.service1.png"
                  alt="Industry-Specific GPU Solutions"
                  className="w-full h-auto object-cover"
                  style={{
                    borderRadius: '20px',
                    boxShadow: '0 20px 60px rgba(16, 185, 129, 0.25), 0 0 40px rgba(16, 185, 129, 0.1)'
                  }}
                />
              </div>
            </motion.div>
          </div>
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
              GPU Optimization <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-16">
              A dedicated six-step model to attain regular improvement in the performance of GPUs.
            </p>
          </motion.div>

          {/* Process Steps - Centered Transparent Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
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
              <span>Start Your Optimization Journey</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Need a Custom AI Development Partner? */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden group"
            style={{
              maxHeight: '500px',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Background Image with Hover Zoom */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="/images/custom-ai-partner.jpg.jpg"
                alt="Custom AI Development Partner"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  objectPosition: '70% center',
                  transform: 'translateY(-10px) scale(1.08)'
                }}
              />
              {/* Enhanced Gradient Overlay for Better Depth */}
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    linear-gradient(to right, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0.4) 100%),
                    linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%),
                    radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%)
                  `,
                  boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.3)'
                }}
              ></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 py-20 px-8 sm:px-12 lg:px-16">
              <div className="max-w-3xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: '#FFFFFF' }}>
                  Need a Custom AI Development Partner?
                </h2>
                <p className="text-base sm:text-lg mb-8 leading-relaxed" style={{ color: '#E5E5E5' }}>
                  We develop high-performing AI systems based on optimized GPU architecture. Whether you need to hire CUDA Developers for specialized projects or require end-to-end CUDA Development Services, our team delivers scalable solutions engineered for production-grade performance.
                </p>
                <a
                  href="/contact/"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:opacity-90"
                  style={{
                    background: '#10B981',
                    color: '#FFFFFF'
                  }}
                >
                  Let's talk about Your Project
                </a>
              </div>
            </div>
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
              Business Benefits of
              <br />
              GPU Optimization
            </h2>
          </motion.div>

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefitsData.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
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

      {/* AI Models We Have Expertise In Section */}
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
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ color: '#FAFAFA' }}>
              AI Models We Have Expertise In
            </h2>
          </motion.div>

          {/* AI Models Grid - 4 columns, 2 rows */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {aiModelsData.map((model, i) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                className="rounded-2xl p-6 flex flex-col items-center justify-center text-center group cursor-pointer transition-all duration-300 hover:scale-105 hover:border-[rgba(16,185,129,0.4)] hover:shadow-[0_8px_32px_rgba(16,185,129,0.2)]"
                style={{ background: 'rgba(17, 24, 39, 0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(16, 185, 129, 0.1)' }}
              >
                <div className="mb-4 flex items-center justify-center" style={{ height: '72px' }}>
                  <img src={model.src} alt={model.alt} className="object-contain transition-transform duration-300" style={{ maxHeight: '72px', maxWidth: '100%' }} />
                </div>
                <h3 className="text-base font-semibold" style={{ color: '#FAFAFA', letterSpacing: '0.02em' }}>{model.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="px-4 sm:px-6 lg:px-8" style={{ background: SECTION_BG, paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '60px' }}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Why Choose Us for
              <br />
              GPU Optimization?
            </h2>
          </motion.div>
          <div className="flex flex-col gap-6">
            {whyChooseItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                className="flex items-start gap-6 rounded-xl p-6 border transition-all duration-300"
                style={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}
              >
                <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0" style={{ background: '#10B981' }}>
                  <CheckIcon size="lg" />
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
              What Our Clients Say
            </h2>

            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#9CA3AF', lineHeight: 1.7 }}>
              Trusted by forward-thinking organizations to deliver high-performance GPU and CUDA solutions.
            </p>
          </motion.div>

          {/* Testimonials Grid - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonialsData.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                className="group"
              >
                <div className="h-full p-8 rounded-2xl border transition-all duration-300" style={{ background: 'rgba(255, 255, 255, 0.02)', borderColor: BORDER_SUBTLE, backdropFilter: 'blur(10px)' }}>
                  <div className="mb-4"><QuoteIcon /></div>
                  <p className="text-base mb-8" style={{ color: '#D1D5DB', lineHeight: 1.8 }}>{t.quote}</p>
                  <div className="flex items-center gap-4 mt-4 pt-8 border-t" style={{ borderColor: BORDER_SUBTLE }}>
                    <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white" style={{ background: t.avatarGradient }}>{t.initials}</div>
                    <div>
                      <div className="text-[#FAFAFA] font-semibold text-[15px]">{t.name}</div>
                      <div className="text-[#9CA3AF] text-[13px]">{t.role}</div>
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
            <div className="lg:col-span-4">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="text-white/60 text-sm mb-4 uppercase tracking-wider">FAQs</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                  Frequently
                  <br />
                  Asked Questions
                </h2>
              </motion.div>
            </div>
            <div className="lg:col-span-8 space-y-4">
              {faqData.map((item, i) => (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                  className="rounded-2xl border border-white/10 overflow-hidden"
                  style={{ background: SECTION_BG }}
                >
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <h3 className="text-lg font-semibold text-white pr-4">{item.q}</h3>
                      <svg className="w-6 h-6 text-white/60 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={CHEVRON_DOWN_D} />
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
        {/* Contact Form Section - Premium Layout */}
        <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0B0F14 0%, #111827 100%)' }}>
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-block mb-6 px-4 py-2 rounded-full border"
                style={BADGE_STYLE}
              >
                <span style={{ color: '#10B981', fontWeight: 600, fontSize: '0.875rem' }}>Get In Touch</span>
              </motion.div>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                style={{ color: '#FAFAFA', letterSpacing: '-0.025em' }}
              >
                Get Started with{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  GPU Optimization
                </span>
              </h2>

              <p
                className="text-base sm:text-lg mb-4 leading-relaxed max-w-2xl mx-auto"
                style={{ color: '#9CA3AF' }}
              >
                Fill out the form and our team will get back to you within 24 hours.
              </p>
            </motion.div>

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
                  <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px' }}>
                    {formFieldsConfig.map((field) => (
                      <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                        <label htmlFor={`gpuopt-${field.name}`} className="block text-white/90 mb-2 font-medium text-sm">{field.label}</label>
                        {field.type === 'textarea' ? (
                          <textarea
                            id={`gpuopt-${field.name}`}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required={field.required}
                            rows={field.rows ?? 4}
                            className={`${formInputClass} resize-none`}
                            style={formInputStyle}
                            placeholder={field.placeholder}
                          />
                        ) : (
                          <input
                            type={field.type}
                            id={`gpuopt-${field.name}`}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required={field.required}
                            className={formInputClass}
                            style={formInputStyle}
                            placeholder={field.placeholder}
                          />
                        )}
                      </div>
                    ))}
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

            {/* Our Office Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#FAFAFA' }}>
                  Our Office
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {officeCardsData.map((card) => (
                  <div
                    key={card.title}
                    className="p-6 rounded-xl text-center transition-all duration-300 hover:scale-105"
                    style={officeCardStyle}
                  >
                    <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden" style={OFFICE_ICON_BG}>
                      {card.type === 'address' ? (
                        <img src="/images/inidan.flag.jpg" alt="India Flag" className="w-full h-full object-cover" />
                      ) : card.type === 'email' ? (
                        <svg className="w-6 h-6 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold mb-3" style={{ color: '#FAFAFA' }}>{card.title}</h4>
                    {card.href ? (
                      <a href={card.href} className="text-sm inline-block text-[#10B981] hover:text-[#059669] transition-colors">{card.content}</a>
                    ) : (
                      <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>{card.content}</p>
                    )}
                    {card.subtitle && <p className="text-xs mt-3" style={{ color: '#6B7280' }}>{card.subtitle}</p>}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>
      </div>
    </div>
  );
}
