import { motion } from 'motion/react';
import { Award, Zap, DollarSign, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO as Seo } from './SEO';

export function HireCudaDeveloperPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectDetails: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <>
      <Seo
        title="Hire CUDA Developers | Dedicated CUDA Programmers & GPU Experts"
        description="Looking to hire CUDA developers? Get skilled GPU programmers for NVIDIA CUDA projects, performance optimization, and custom parallel computing solutions."
        keywords="hire CUDA developers, CUDA programmers, GPU experts, NVIDIA CUDA, parallel computing"
      />

      <div className="hire cuda developer">
        <div className="min-h-screen" style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
          {/* Hero Section */}
          <section className="relative px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ minHeight: '600px', paddingTop: '160px', paddingBottom: '100px' }}>
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: 'url(/images/hire.hero.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(1.1)'
              }}
            >
              {/* Overlay for better text readability */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.65) 50%, rgba(0, 0, 0, 0.45) 100%)'
                }}
              />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <h1 className="font-bold leading-tight" style={{ 
                    color: '#FFFFFF', 
                    letterSpacing: '-0.025em', 
                    fontSize: 'clamp(28px, 4vw, 48px)',
                    textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.8)'
                  }}>
                    Hire CUDA Developers
                  </h1>

                  <p className="text-lg leading-relaxed" style={{ 
                    color: '#E5E5E5',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                  }}>
                    CUDA Programming Experts | GPU Acceleration Engineers | Parallel Processing Specialists
                  </p>

                  <p className="text-lg leading-relaxed" style={{ 
                    color: '#D1D5DB',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                  }}>
                    Create high-performance GPU applications using expert CUDA programmers. We develop optimized parallel designs, stream memory, and access the full potential of GPUs to run AI models, simulations, and other data-intensive computing environments.
                  </p>

                  {/* Email Input + CTA Button */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 max-w-sm items-stretch sm:items-center">
                    <div className="w-full sm:w-[260px] sm:min-w-[260px] sm:max-w-[260px] sm:flex-shrink-0">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full max-w-full box-border"
                        style={{
                          background: '#1F2937',
                          color: '#FAFAFA',
                          borderRadius: '4px',
                          border: '1px solid rgba(16, 185, 129, 0.2)',
                          padding: '0 16px',
                          height: '44px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div className="flex-none sm:ml-3 w-full sm:w-[250px] sm:min-w-[250px]">
                      <a
                        href="/contact"
                        className="inline-flex items-center justify-center px-6 rounded-xl font-semibold text-sm leading-snug transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] w-full text-center"
                        style={{
                          background: '#10B981',
                          color: '#FFFFFF',
                          textDecoration: 'none',
                          boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.4)',
                          paddingTop: '12px',
                          paddingBottom: '12px',
                          minHeight: '44px',
                          height: '44px',
                          boxSizing: 'border-box'
                        }}
                      >
                        HIRE CUDA DEVELOPER NOW
                      </a>
                    </div>
                  </div>

                  {/* Stats - Horizontal Layout with Dividers */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-6 sm:gap-8 pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded flex items-center justify-center flex-shrink-0" style={{ background: '#10B981' }}>
                        <Award className="w-7 h-7" style={{ color: '#FFFFFF' }} />
                      </div>
                      <div>
                        <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '16px' }}>15 Days Risk-Free</div>
                        <div style={{ color: '#B0B0B0', fontSize: '14px' }}>Trial</div>
                      </div>
                    </div>

                    <div className="hidden sm:block w-px h-16" style={{ background: '#555555' }}></div>

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded flex items-center justify-center flex-shrink-0" style={{ background: '#10B981' }}>
                        <Zap className="w-7 h-7" style={{ color: '#FFFFFF' }} />
                      </div>
                      <div>
                        <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '16px' }}>24x7 Technical</div>
                        <div style={{ color: '#B0B0B0', fontSize: '14px' }}>Support</div>
                      </div>
                    </div>

                    <div className="hidden sm:block w-px h-16" style={{ background: '#555555' }}></div>

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded flex items-center justify-center flex-shrink-0" style={{ background: '#10B981' }}>
                        <DollarSign className="w-7 h-7" style={{ color: '#FFFFFF' }} />
                      </div>
                      <div>
                        <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '16px' }}>On-Time</div>
                        <div style={{ color: '#B0B0B0', fontSize: '14px' }}>Delivery</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Side - Empty/Background Space */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative hidden lg:block"
                >
                  {/* Empty space or subtle background pattern */}
                  <div className="h-full min-h-[400px]"></div>
                </motion.div>

              </div>
            </div>
          </section >

          {/* Hire CUDA Developers Section - Before Why Choose */}
          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0F14' }}>
            <div className="max-w-7xl mx-auto">
              {/* 2-Column Layout: Text Left, Image Right */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Left Column - Text Content */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: '#FAFAFA' }}>
                      Enhance GPU Performance with Dedicated CUDA Engineers
                    </h2>

                    <p className="text-base leading-relaxed" style={{ color: '#9E9E9E' }}>
                      Our CUDA development team assists companies in taking CPU-based systems to high-performance asymmetric solutions on GPUs. Scheduling the algorithms to perform the parallel execution and refining the thread-level activities, we provide significant improvements in the speed and resource usage. Our engineers become a natural part of your design, all the way to optimization of deployment, and concentrate on providing stable, scalable, and production-ready CUDA implementations.
                    </p>

                    <div className="pt-4">
                      <a
                        href="/contact"
                        className="inline-flex items-center justify-center w-auto max-w-xs px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-2 text-center text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-orange-500 hover:text-white cursor-pointer"
                        style={{
                          background: 'transparent',
                          borderColor: '#10B981',
                          color: '#10B981'
                        }}
                      >
                        TALK TO OUR EXPERT
                      </a>
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
                      src="/images/hire.page.jpg"
                      alt="Hire CUDA Developers"
                      className="w-full rounded-2xl shadow-2xl"
                      style={{ 
                        boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover'
                      }}
                    />
                  </motion.div>
                </div>

              </div>
            </div>
          </section>

          {/* Our CUDA Engineers Expertise Section */}
          < section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
            <div className="max-w-7xl mx-auto">
              {/* Section Heading */}
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#FAFAFA' }}>
                  Technical Expertise of Our CUDA Developers
                </h2>
              </motion.div>

              {/* Expertise Grid - 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Item 1 - GPU Kernel Optimization */}
                <motion.div
                  className="flex gap-4 border rounded-xl p-6"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ background: '#E3F2FD' }}>
                      <svg className="w-8 h-8" style={{ color: '#2196F3' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#FAFAFA' }}>
                      Advanced Kernel Optimization
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                      We optimize CUDA kernels by creating them to be more warp efficient and less divergent, and optimize instruction throughput. We have a stable implementation and quantifiable speed scalability with complicated workloads.
                    </p>
                  </div>
                </motion.div>

                {/* Item 2 - Parallel Computing Architecture */}
                <motion.div
                  className="flex gap-4 border rounded-xl p-6"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ background: '#E3F2FD' }}>
                      <svg className="w-8 h-8" style={{ color: '#2196F3' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#FAFAFA' }}>
                      Scalable Parallel Architecture
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                      In order to achieve higher throughput, our engineers design GPU-oriented systems with maximum concurrency and optimization in the distribution of computational tasks among threads and streaming multiprocessors.
                    </p>
                  </div>
                </motion.div>

                {/* Item 3 - Performance Profiling */}
                <motion.div
                  className="flex gap-4 border rounded-xl p-6"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ background: '#E3F2FD' }}>
                      <svg className="w-8 h-8" style={{ color: '#2196F3' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#FAFAFA' }}>
                      Performance Profiling & Bottleneck Analysis
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                      With the help of modern profiling tools, we will examine execution times, latency, and utilization of the compute to be able to identify areas of inefficiency and employ data-based optimization measures.
                    </p>
                  </div>
                </motion.div>

                {/* Item 4 - AI/ML Acceleration */}
                <motion.div
                  className="flex gap-4 border rounded-xl p-6"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ background: '#E3F2FD' }}>
                      <svg className="w-8 h-8" style={{ color: '#2196F3' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#FAFAFA' }}>
                      AI & Machine Learning Acceleration
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                      We execute model training and inference pipelines at a faster pace by tuning CUDA implementations and better participation of the GPUs, and less computational intensity of large-scale AI tasks.
                    </p>
                  </div>
                </motion.div>

                {/* Item 5 - Memory Management */}
                <motion.div
                  className="flex gap-4 border rounded-xl p-6"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ background: '#E3F2FD' }}>
                      <svg className="w-8 h-8" style={{ color: '#2196F3' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#FAFAFA' }}>
                      Efficient Memory Management
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                      Shared, global, pinned, and unified memory usage is optimized by our CUDA developers to minimize the latency of data transfer and maximize the overall application performance.
                    </p>
                  </div>
                </motion.div>

                {/* Item 6 - Multi-GPU & Distributed Computing */}
                <motion.div
                  className="flex gap-4 border rounded-xl p-6"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ background: '#E3F2FD' }}>
                      <svg className="w-8 h-8" style={{ color: '#2196F3' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#FAFAFA' }}>
                      Multi-GPU & Distributed Computing
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                      We support a multi-GPU execution platform with tuned communication patterns, which enable enterprises to use optimized communication patterns and scale applications with high compute intensity.
                    </p>
                  </div>
                </motion.div>

              </div>
            </div>
          </section >

          {/* How to Hire Section - 4 Steps */}
          < section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0F14' }}>
            <div className="max-w-7xl mx-auto">
              {/* Section Heading */}
              <motion.div
                className="text-center mb-4 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#FAFAFA' }}>
                  How to Hire Our CUDA Developers?
                </h2>
                <p className="text-lg mx-auto" style={{ color: '#9E9E9E' }}>
                  The process of hiring CUDA skills to work on your project is simple and clear.
                </p>
              </motion.div>

              {/* 4 Steps Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

                {/* Step 1 */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{
                      background: 'radial-gradient(circle, rgba(33, 150, 243, 0.2) 0%, rgba(33, 150, 243, 0.05) 70%)',
                      border: '3px solid rgba(33, 150, 243, 0.3)'
                    }}>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: '#2196F3' }}>
                        <span className="text-2xl font-bold text-white">1</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>
                    Share Your Project Requirements
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                    Characterize your type of workload and performance objectives, infrastructure, and the type of interaction you want so we can match the appropriate technical resources.
                  </p>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{
                      background: 'radial-gradient(circle, rgba(33, 150, 243, 0.2) 0%, rgba(33, 150, 243, 0.05) 70%)',
                      border: '3px solid rgba(33, 150, 243, 0.3)'
                    }}>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: '#2196F3' }}>
                        <span className="text-2xl font-bold text-white">2</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>
                    Examine Certified Profile of Developers
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                    We offer extensively vetted CUDA engineers who have skills that fit your whenever-needed computational and architectural requirements.
                  </p>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{
                      background: 'radial-gradient(circle, rgba(33, 150, 243, 0.2) 0%, rgba(33, 150, 243, 0.05) 70%)',
                      border: '3px solid rgba(33, 150, 243, 0.3)'
                    }}>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: '#2196F3' }}>
                        <span className="text-2xl font-bold text-white">3</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>
                    Select Your Hiring Model
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                    Select flexible staffing arrangements, such as full-time, part-time, and project hiring, depending on the scope and the timeline.
                  </p>
                </motion.div>

                {/* Step 4 */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{
                      background: 'radial-gradient(circle, rgba(33, 150, 243, 0.2) 0%, rgba(33, 150, 243, 0.05) 70%)',
                      border: '3px solid rgba(33, 150, 243, 0.3)'
                    }}>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: '#2196F3' }}>
                        <span className="text-2xl font-bold text-white">4</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>
                    Start Development Implementation
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                    The CUDA developer of your choice is integrated with your working process and immediately begins to optimize and accelerate your application.
                  </p>
                </motion.div>

              </div>
            </div>
          </section >

          {/* Why Hire CUDA Engineers Section - 6 Cards with Images */}
          < section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
            <div className="max-w-7xl mx-auto">
              {/* Section Heading */}
              <motion.div
                className="text-center mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#FAFAFA' }}>
                  Why Hire CUDA Developers from Us?
                </h2>
                <p className="text-lg max-w-4xl mx-auto" style={{ color: '#9E9E9E' }}>
                  Our entire process revolves around the peace of mind for our clients, explore what you get when you choose us.
                </p>
              </motion.div>

              {/* 6 Cards Grid - 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

                {/* Card 1 - High-Quality Engineering Standards */}
                <motion.div
                  className="rounded-2xl overflow-hidden group border"
                  style={{ background: '#0B0F14', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {/* Image Container with Enhanced Styling */}
                  <div className="relative w-full overflow-hidden" style={{ height: '260px' }}>
                    <img
                      src="/images/cuda-quality-code.jpg.jpg"
                      alt="Quality Code"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{
                        borderRadius: '12px 12px 0 0',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                      }}
                    />
                    {/* Subtle gradient overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to bottom, transparent 60%, rgba(11, 15, 20, 0.4) 100%)'
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>
                      High-Quality Engineering Standards
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                      Our developers observe the best practices of coding and performance to provide stable and maintainable solutions for the GPU.
                    </p>
                  </div>
                </motion.div>

                {/* Card 2 - Strong Data Security & Confidentiality */}
                <motion.div
                  className="rounded-2xl overflow-hidden group border"
                  style={{ background: '#0B0F14', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* Image Container with Enhanced Styling */}
                  <div className="relative w-full overflow-hidden" style={{ height: '260px' }}>
                    <img
                      src="/images/cuda-nda.jpg.jpg"
                      alt="NDA Agreement"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{
                        borderRadius: '12px 12px 0 0',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                      }}
                    />
                    {/* Subtle gradient overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to bottom, transparent 60%, rgba(11, 15, 20, 0.4) 100%)'
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>
                      Strong Data Security & Confidentiality
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                      Our business works under the broad NDAs and safe development procedures to maintain the delicate business logic and intellectual property.
                    </p>
                  </div>
                </motion.div>

                {/* Card 3 - Proven GPU Development Experience */}
                <motion.div
                  className="rounded-2xl overflow-hidden group border"
                  style={{ background: '#0B0F14', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {/* Image Container with Enhanced Styling */}
                  <div className="relative w-full overflow-hidden" style={{ height: '260px' }}>
                    <img
                      src="/images/cuda-verified.jpg.jpg"
                      alt="Certified Developer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{
                        borderRadius: '12px 12px 0 0',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                      }}
                    />
                    {/* Subtle gradient overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to bottom, transparent 60%, rgba(11, 15, 20, 0.4) 100%)'
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>
                      Proven GPU Development Experience
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                      Our group has practical experience in the fields of AI, analytics, simulation, and high-performance computing.
                    </p>
                  </div>
                </motion.div>

                {/* Card 4 - Cost-Optimized Resource Allocation */}
                <motion.div
                  className="rounded-2xl overflow-hidden group border"
                  style={{ background: '#0B0F14', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {/* Image Container with Enhanced Styling */}
                  <div className="relative w-full overflow-hidden" style={{ height: '260px' }}>
                    <img
                      src="/images/cuda-cost.jpg.jpg"
                      alt="Cost Reduction"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{
                        objectPosition: 'center 40%',
                        borderRadius: '12px 12px 0 0',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                      }}
                    />
                    {/* Subtle gradient overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to bottom, transparent 60%, rgba(11, 15, 20, 0.4) 100%)'
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>
                      Cost-Optimized Resource Allocation
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                      Dependent employment platforms make sure that you only spend what is needed for your project.
                    </p>
                  </div>
                </motion.div>

                {/* Card 5 - Senior-Level Technical Expertise */}
                <motion.div
                  className="rounded-2xl overflow-hidden group border"
                  style={{ background: '#0B0F14', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {/* Image Container with Enhanced Styling */}
                  <div className="relative w-full overflow-hidden" style={{ height: '260px' }}>
                    <img
                      src="/images/cuda-experience.jpg.jpg"
                      alt="High Experience Team"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{
                        borderRadius: '12px 12px 0 0',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                      }}
                    />
                    {/* Subtle gradient overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to bottom, transparent 60%, rgba(11, 15, 20, 0.4) 100%)'
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>
                      Senior-Level Technical Expertise
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                      Our CUDA engineers have a combination of architectural and practical experience with the implementation of the efficient use of GPUs.
                    </p>
                  </div>
                </motion.div>

                {/* Card 6 - Rapid Onboarding Process */}
                <motion.div
                  className="rounded-2xl overflow-hidden group border"
                  style={{ background: '#0B0F14', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {/* Image Container with Enhanced Styling */}
                  <div className="relative w-full overflow-hidden" style={{ height: '260px' }}>
                    <img
                      src="/images/cuda-onboarding.jpg.jpg"
                      alt="Quick Onboarding"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{
                        borderRadius: '12px 12px 0 0',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                      }}
                    />
                    {/* Subtle gradient overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to bottom, transparent 60%, rgba(11, 15, 20, 0.4) 100%)'
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>
                      Rapid Onboarding Process
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                      We also make sure that we deploy resources as fast as possible, and this makes your project pick up without any unnecessary delays.
                    </p>
                  </div>
                </motion.div>

              </div>
            </div>
          </section >

          {/* Our Engagement Models Section */}
          < section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0F14' }}>
            <div className="max-w-7xl mx-auto">
              {/* Section Heading */}
              <motion.div
                className="mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#10B981' }}>
                  Flexible Hiring Models
                </h2>
                <p className="text-lg max-w-3xl mx-auto" style={{ color: '#9E9E9E' }}>
                  To achieve your performance goals and the scope of developing CUDA, use the appropriate engagement model.
                </p>
              </motion.div>

              {/* 4 Cards Grid - 2x2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Card 1 - Full-time */}
                <motion.div
                  className="rounded-2xl p-8"
                  style={{ background: 'rgba(16, 185, 129, 0.05)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-3xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                    Full-Time
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: '#B0B0B0' }}>
                    Contract a CUDA developer to work on your long-term project of non-temporal GPU or AI acceleration.
                  </p>
                </motion.div>

                {/* Card 2 - Part-time */}
                <motion.div
                  className="rounded-2xl p-8"
                  style={{ background: 'rgba(16, 185, 129, 0.05)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-3xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                    Part-Time
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: '#B0B0B0' }}>
                    Outsource CUDA specialists on a part-time basis to maintain optimization, upgrades, or performance enhancements.
                  </p>
                </motion.div>

                {/* Card 3 - Time & Material */}
                <motion.div
                  className="rounded-2xl p-8"
                  style={{ background: 'rgba(16, 185, 129, 0.05)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-3xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                    Time & Material
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: '#B0B0B0' }}>
                    Flexible hourly development of the scale with changing CUDA needs and optimization via iteration.
                  </p>
                </motion.div>

                {/* Card 4 - Custom Model */}
                <motion.div
                  className="rounded-2xl p-8"
                  style={{ background: 'rgba(16, 185, 129, 0.05)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="text-3xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                    Custom Model
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: '#B0B0B0' }}>
                    Receive a customized staffing plan that is based on your technical, scheduling, and budget requirements.
                  </p>
                </motion.div>

              </div>
            </div>
          </section >

          {/* CTA Section with Background Image */}
          < section
            className="relative px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center"
            style={{
              minHeight: '400px',
              background: '#0B0F14'
            }}
          >
            {/* Background Image */}
            < div className="absolute inset-0" >
              <img
                src="/images/cuda-cta-bg.jpg.jpg"
                alt="CUDA Background"
                className="w-full h-full"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  minHeight: '400px'
                }}
              />
            </div >

            {/* Lighter Gradient Overlay for better image visibility */}
            < div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, rgba(11, 15, 20, 0.75) 0%, rgba(11, 15, 20, 0.4) 60%, rgba(11, 15, 20, 0.2) 100%)'
              }}
            ></div >

            <div className="max-w-7xl mx-auto relative z-10 py-20 w-full">
              <motion.div
                className="max-w-[60%]"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 leading-tight"
                  style={{
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  Ready to unleash the power of CUDA?
                </h2>

                <a
                  href="/contact/"
                  className="inline-flex items-center justify-center px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-orange-500"
                  style={{
                    background: 'transparent',
                    color: '#FFFFFF',
                    border: '2px solid #10B981'
                  }}
                >
                  Take Charge
                </a>
              </motion.div>
            </div>
          </section >

          {/* Why Jashom Section */}
          < section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0F14' }}>
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#FAFAFA', letterSpacing: '-0.025em' }}>
                  Why Choose Us for CUDA Development?
                </h2>
                <p className="max-w-2xl mx-auto text-base sm:text-lg" style={{ color: '#9E9E9E', lineHeight: 1.8 }}>
                  Partner with a CUDA-focused engineering team that blends deep GPU expertise with practical business execution. We assist companies in changing the compute-intensive systems into scalable and performance-oriented architectures.
                </p>
              </motion.div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Benefit 1 - High-Impact GPU Acceleration */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group relative rounded-2xl p-8 border cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300" style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)'
                    }}>
                      <svg className="w-8 h-8" style={{ color: '#10B981' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>High-Impact GPU Acceleration</h3>
                    <p className="leading-relaxed" style={{ color: '#9E9E9E', lineHeight: 1.8 }}>
                      We re-architect compute workflows to achieve the maximum amount of parallel performance, providing huge improvements in processing time on AI, analytics, and simulation workloads.
                    </p>
                  </div>
                </motion.div>

                {/* Benefit 2 - Enterprise-Ready AI Systems */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="group relative rounded-2xl p-8 border cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300" style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)'
                    }}>
                      <svg className="w-8 h-8" style={{ color: '#10B981' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>Enterprise-Ready AI Systems</h3>
                    <p className="leading-relaxed" style={{ color: '#9E9E9E', lineHeight: 1.8 }}>
                      We develop CUDA-based AI systems with a scalable, stable, and real-world production foundation, all the way up to architecture planning to deployment pipelines.
                    </p>
                  </div>
                </motion.div>

                {/* Benefit 3 - Secure Development Framework */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="group relative rounded-2xl p-8 border cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300" style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)'
                    }}>
                      <svg className="w-8 h-8" style={{ color: '#10B981' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>Secure Development Framework</h3>
                    <p className="leading-relaxed" style={{ color: '#9E9E9E', lineHeight: 1.8 }}>
                      To ensure protection of sensitive data and GPU infrastructure, we have strict security criteria, controlled access policies, and processes driven by compliance.
                    </p>
                  </div>
                </motion.div>

                {/* Benefit 4 - Accelerated Deployment Cycles */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="group relative rounded-2xl p-8 border cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300" style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)'
                    }}>
                      <Zap className="w-8 h-8" style={{ color: '#10B981' }} />
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>Accelerated Deployment Cycles</h3>
                    <p className="leading-relaxed" style={{ color: '#9E9E9E', lineHeight: 1.8 }}>
                      Our streamlined development model is designed to be fast prototyping, highly optimizing and easy to move into production systems.
                    </p>
                  </div>
                </motion.div>

                {/* Benefit 5 - Dedicated Technical Assistance */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="group relative rounded-2xl p-8 border cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300" style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)'
                    }}>
                      <svg className="w-8 h-8" style={{ color: '#10B981' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>Dedicated Technical Assistance</h3>
                    <p className="leading-relaxed" style={{ color: '#9E9E9E', lineHeight: 1.8 }}>
                      We maintain a long-term stability of the GPU in terms of performance and stability through constant monitoring, performance tuning, and troubleshooting by our experts.
                    </p>
                  </div>
                </motion.div>

                {/* Benefit 6 - Performance-Oriented Cost Strategy */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="group relative rounded-2xl p-8 border cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300" style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)'
                    }}>
                      <svg className="w-8 h-8" style={{ color: '#10B981' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>Performance-Oriented Cost Strategy</h3>
                    <p className="leading-relaxed" style={{ color: '#9E9E9E', lineHeight: 1.8 }}>
                      We maximize compute usage and assigning GPU resources to minimize infrastructure wastage and maximize investment.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section >

          {/* Reviews Section - We Are Trusted By Businesses Across the Globe */}
          < section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
            <div className="max-w-7xl mx-auto">
              {/* Section Heading */}
              <motion.div
                className="text-center mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#FAFAFA' }}>
                  Trusted by Global Technology Leaders
                </h2>
                <p className="text-lg max-w-3xl mx-auto" style={{ color: '#9E9E9E' }}>
                  Companies in all sectors are using our CUDA knowledge to address the intricate performance issues and speed up the most important applications. Long-term partnerships are developed as a result of our focus on precision engineering and quantifiable outcomes.
                </p>
              </motion.div>

              {/* Jashom Reviews Header with Clutch Branding */}
              <motion.div
                className="flex items-center justify-center gap-4 mb-12 mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold" style={{ color: '#FAFAFA' }}>
                    Jashom Reviews
                  </h3>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-6 h-6"
                        fill={star <= 4 ? '#10B981' : 'none'}
                        stroke={star === 5 ? '#10B981' : 'none'}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={star === 5 ? 2 : 0}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="text-2xl font-bold" style={{ color: '#FAFAFA' }}>4.8</span>
                </div>
                <div className="h-8 w-px" style={{ background: '#e0e0e0' }}></div>
                <div className="text-sm" style={{ color: '#9E9E9E' }}>
                  Powered by <span className="font-bold" style={{ color: '#10B981' }}>Clutch</span>
                </div>
              </motion.div>

              {/* 6 Review Cards - 3x2 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Review 1 */}
                <motion.div
                  className="rounded-xl p-6 border"
                  style={{ background: '#FFFFFF', borderColor: 'rgba(16, 185, 129, 0.2)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5"
                        fill="#10B981"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#9E9E9E' }}>
                    "Our GPU workloads were dramatically improved after working with this team. Their CUDA optimization strategy enhanced throughput and reduced system latency beyond expectations."
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold text-sm" style={{ color: '#000000' }}>CTO, AI Solutions Firm</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded" style={{ background: '#E8F5E9' }}>
                      <svg className="w-4 h-4" style={{ color: '#2E7D32' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                      </svg>
                      <span className="text-xs font-medium" style={{ color: '#2E7D32' }}>Verified</span>
                    </div>
                  </div>
                </motion.div>

                {/* Review 2 */}
                <motion.div
                  className="rounded-xl p-6 border"
                  style={{ background: '#FFFFFF', borderColor: 'rgba(16, 185, 129, 0.2)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5"
                        fill="#10B981"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#9E9E9E' }}>
                    "Their way of doing things in parallel contributed to us being able to meet our tight performance deadlines. Very well acquainted and technologically reliable."
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold text-sm" style={{ color: '#000000' }}>VP Engineering, Data Platform Company</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded" style={{ background: '#E8F5E9' }}>
                      <svg className="w-4 h-4" style={{ color: '#2E7D32' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                      </svg>
                      <span className="text-xs font-medium" style={{ color: '#2E7D32' }}>Verified</span>
                    </div>
                  </div>
                </motion.div>

                {/* Review 3 */}
                <motion.div
                  className="rounded-xl p-6 border"
                  style={{ background: '#FFFFFF', borderColor: 'rgba(16, 185, 129, 0.2)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5"
                        fill="#10B981"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#9E9E9E' }}>
                    "The extraordinary knowledge of CUDA architecture. They assisted us in moving away the CPU-bound systems to scalable GPU infrastructure quickly."
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold text-sm" style={{ color: '#000000' }}>Lead ML Engineer, Tech Startup</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded" style={{ background: '#E8F5E9' }}>
                      <svg className="w-4 h-4" style={{ color: '#2E7D32' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                      </svg>
                      <span className="text-xs font-medium" style={{ color: '#2E7D32' }}>Verified</span>
                    </div>
                  </div>
                </motion.div>

                {/* Review 4 */}
                <motion.div
                  className="rounded-xl p-6 border"
                  style={{ background: '#FFFFFF', borderColor: 'rgba(16, 185, 129, 0.2)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5"
                        fill="#10B981"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                    <svg className="w-5 h-5" fill="none" stroke="#10B981" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>

                  {/* Quote */}
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#9E9E9E' }}>
                    "Effective communication, good performance, and quantifiable performance benefits. They used their graphics prowess to enhance our analytics engine."
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold text-sm" style={{ color: '#000000' }}>Director of Technology</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded" style={{ background: '#E8F5E9' }}>
                      <svg className="w-4 h-4" style={{ color: '#2E7D32' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                      </svg>
                      <span className="text-xs font-medium" style={{ color: '#2E7D32' }}>Verified</span>
                    </div>
                  </div>
                </motion.div>

                {/* Review 5 */}
                <motion.div
                  className="rounded-xl p-6 border"
                  style={{ background: '#FFFFFF', borderColor: 'rgba(16, 185, 129, 0.2)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5"
                        fill="#10B981"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#9E9E9E' }}>
                    "The team provided CUDA versions that were optimized and that reduced the training time of our AI models by a large margin."
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold text-sm" style={{ color: '#000000' }}>Head of AI Research</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded" style={{ background: '#E8F5E9' }}>
                      <svg className="w-4 h-4" style={{ color: '#2E7D32' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                      </svg>
                      <span className="text-xs font-medium" style={{ color: '#2E7D32' }}>Verified</span>
                    </div>
                  </div>
                </motion.div>

                {/* Review 6 */}
                <motion.div
                  className="rounded-xl p-6 border"
                  style={{ background: '#FFFFFF', borderColor: 'rgba(16, 185, 129, 0.2)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5"
                        fill="#10B981"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#9E9E9E' }}>
                    "Professional, responsive, and highly skilled in GPU computing. We achieved performance milestones much faster than anticipated."
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold text-sm" style={{ color: '#000000' }}>Product Engineering Manager</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded" style={{ background: '#E8F5E9' }}>
                      <svg className="w-4 h-4" style={{ color: '#2E7D32' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                      </svg>
                      <span className="text-xs font-medium" style={{ color: '#2E7D32' }}>Verified</span>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </section >
          {/* Related Services Section */}
          < section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#10B981' }}>
                  Explore Related GPU Services
                </h2>
                <p className="text-lg text-center mx-auto" style={{ color: '#B0B0B0' }}>
                  Want to hire best CUDA developer experts? Browse some other complimentary GPU oriented services that can make the system even more performance-efficient and scalable.
                </p>
              </motion.div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

                {/* GPU Optimization Service Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-2xl p-8 transition-all duration-300 hover:scale-105"
                  style={{
                    background: '#2a2a2a',
                    border: '1px solid #3a3a3a'
                  }}
                >
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                    GPU Optimization Service
                  </h3>
                  <p className="text-base mb-6 leading-relaxed" style={{ color: '#B0B0B0' }}>
                    Finetune your GPU workloads for maximum speed and efficiency, eliminating bottlenecks and maximizing resource utilization.
                  </p>
                  <a
                    href="/gpu-optimization-service"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-240 hover:opacity-90"
                    style={{
                      background: '#10B981',
                      color: '#FFFFFF'
                    }}
                  >
                    <span>Know More</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>

                {/* CUDA Development Service Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-2xl p-8 transition-all duration-300 hover:scale-105"
                  style={{
                    background: '#2a2a2a',
                    border: '1px solid #3a3a3a'
                  }}
                >
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                    CUDA Development Service
                  </h3>
                  <p className="text-base mb-6 leading-relaxed" style={{ color: '#B0B0B0' }}>
                    Build high-performance parallel applications with expert CUDA development tailored for speed, scalability and precision.
                  </p>
                  <a
                    href="/cuda-development-service"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-240 hover:opacity-90"
                    style={{
                      background: '#10B981',
                      color: '#FFFFFF'
                    }}
                  >
                    <span>Know More</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>

              </div>
            </div>
          </section >

          {/* Q&A / FAQ Section - Home page style, border retained on items */}
          < section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0F14' }}>
            <div className="max-w-7xl mx-auto">
              {/* Section Header - Centered (like Home page) */}
              <motion.div
                className="text-center mb-16 sm:mb-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="inline-block mb-4 px-4 py-2 rounded-full border"
                  style={{
                    background: 'rgba(16, 185, 129, 0.05)',
                    borderColor: 'rgba(16, 185, 129, 0.2)'
                  }}
                >
                  <span style={{ color: '#10B981', fontWeight: 600, fontSize: '0.875rem' }}>FAQs</span>
                </motion.div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#FAFAFA', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
                  Frequently Asked Questions
                </h2>
                <p className="text-lg max-w-2xl mx-auto" style={{ color: '#9CA3AF', lineHeight: 1.7 }}>
                  Common questions about hiring CUDA developers from Jashom
                </p>
              </motion.div>

              {/* FAQ Items - full width, border kept on each item */}
              <div className="max-w-4xl mx-auto space-y-4">
                  {/* FAQ 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="rounded-2xl border overflow-hidden"
                    style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)' }}
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                        <h3 className="text-lg font-semibold pr-4" style={{ color: '#FAFAFA' }}>
                          Why should I hire a dedicated CUDA developer instead of a general developer?
                        </h3>
                        <svg
                          className="w-6 h-6 transition-transform group-open:rotate-180"
                          style={{ color: '#9E9E9E' }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 pt-2 pb-8">
                        <p className="text-base leading-relaxed" style={{ color: '#9E9E9E' }}>
                          The CUDA developers are experts in the domain of the architecture of the GPUs, parallel computing, and optimization of performance. They reorganize algorithms with a specific execution in the GPU and provide much faster and more efficient performance in comparison to the general-purpose programming methods.
                        </p>
                      </div>
                    </details>
                  </motion.div>

                  {/* FAQ 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="rounded-2xl border overflow-hidden"
                    style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)' }}
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                        <h3 className="text-lg font-semibold pr-4" style={{ color: '#FAFAFA' }}>
                          What types of projects require CUDA development expertise?
                        </h3>
                        <svg
                          className="w-6 h-6 transition-transform group-open:rotate-180"
                          style={{ color: '#9E9E9E' }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 pt-2 pb-8">
                        <p className="text-base leading-relaxed" style={{ color: '#9E9E9E' }}>
                          AI/ML training, real-time data analytics, scientific simulations, computer vision, video processing, high-performance computing (HPC), and additional applications that rely on the acceleration provided by a graphics card are all applications that need CUDA skills.
                        </p>
                      </div>
                    </details>
                  </motion.div>

                  {/* FAQ 3 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="rounded-2xl border overflow-hidden"
                    style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)' }}
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                        <h3 className="text-lg font-semibold pr-4" style={{ color: '#FAFAFA' }}>
                          How do CUDA developers improve application performance?
                        </h3>
                        <svg
                          className="w-6 h-6 transition-transform group-open:rotate-180"
                          style={{ color: '#9E9E9E' }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 pt-2 pb-8">
                        <p className="text-base leading-relaxed" style={{ color: '#9E9E9E' }}>
                          They enhance the execution of the kernel, thread setup, memory, and the transfer of data between the CPU and the GPU. They remove bottlenecks and maximize throughput using profiling tools to get measurable performance improvements.
                        </p>
                      </div>
                    </details>
                  </motion.div>

                  {/* FAQ 4 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="rounded-2xl border overflow-hidden"
                    style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)' }}
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                        <h3 className="text-lg font-semibold pr-4" style={{ color: '#FAFAFA' }}>
                          Can you optimize an existing GPU or CUDA-based application?
                        </h3>
                        <svg
                          className="w-6 h-6 transition-transform group-open:rotate-180"
                          style={{ color: '#9E9E9E' }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 pt-2 pb-8">
                        <p className="text-base leading-relaxed" style={{ color: '#9E9E9E' }}>
                          Of course. Our CUDA team developers will examine existing implementations, uncover inefficiencies, and implement special-purpose optimization to achieve faster execution speed, scalability, and system stability.
                        </p>
                      </div>
                    </details>
                  </motion.div>

                  {/* FAQ 5 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="rounded-2xl border overflow-hidden"
                    style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)' }}
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                        <h3 className="text-lg font-semibold pr-4" style={{ color: '#FAFAFA' }}>
                          Do you support multi-GPU or distributed GPU environments?
                        </h3>
                        <svg
                          className="w-6 h-6 transition-transform group-open:rotate-180"
                          style={{ color: '#9E9E9E' }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 pt-2 pb-8">
                        <p className="text-base leading-relaxed" style={{ color: '#9E9E9E' }}>
                          Yes. Our work is scalable multi-GPU designs, where each workload is placed on multiple processors and devices communicate in a more efficient and optimal way to provide the performance of an enterprise.
                        </p>
                      </div>
                    </details>
                  </motion.div>

                  {/* FAQ 6 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="rounded-2xl border overflow-hidden"
                    style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)' }}
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                        <h3 className="text-lg font-semibold pr-4" style={{ color: '#FAFAFA' }}>
                          What hiring models are available for CUDA developers?
                        </h3>
                        <svg
                          className="w-6 h-6 transition-transform group-open:rotate-180"
                          style={{ color: '#9E9E9E' }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 pt-2 pb-8">
                        <p className="text-base leading-relaxed" style={{ color: '#9E9E9E' }}>
                          You can hire CUDA developers on a full-time basis, part-time basis, hourly basis (time and material), and various other custom ability basis according to your project scope and performance needs.
                        </p>
                      </div>
                    </details>
                  </motion.div>

              </div>
            </div>
          </section >

          {/* Contact Form Section */}
          < section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Left Column - Form Info */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#FAFAFA' }}>
                    Get Started with Expert CUDA Developers
                  </h2>
                  <p className="text-base leading-relaxed mb-8 max-w-2xl mx-auto" style={{ color: '#9E9E9E' }}>
                    Fill out the form and our team will get back to you within 24 hours. Share your project requirements and we'll match you with the perfect CUDA developer for your needs.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                        <svg className="w-6 h-6" style={{ color: '#10B981' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: '#FAFAFA' }}>Quick Response</h3>
                        <p className="text-sm" style={{ color: '#9E9E9E' }}>We respond to all inquiries within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                        <svg className="w-6 h-6" style={{ color: '#10B981' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: '#FAFAFA' }}>No Obligation</h3>
                        <p className="text-sm" style={{ color: '#9E9E9E' }}>Free consultation with no commitment required</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                        <svg className="w-6 h-6" style={{ color: '#10B981' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: '#FAFAFA' }}>Expert Matching</h3>
                        <p className="text-sm" style={{ color: '#9E9E9E' }}>We'll match you with developers suited to your project</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column - Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="rounded-2xl p-8 border"
                  style={{
                    background: '#111827',
                    borderColor: 'rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <form onSubmit={handleSubmit}>
                    {/* 2-Column Grid for Name, Email, Phone, Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '28px', marginBottom: '28px' }}>
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: '#FAFAFA' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                          style={{
                            background: '#1F2937', borderColor: 'rgba(16, 185, 129, 0.3)',
                            color: '#FAFAFA'
                          }}
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#FAFAFA' }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                          style={{
                            background: '#1F2937', borderColor: 'rgba(16, 185, 129, 0.3)',
                            color: '#FAFAFA'
                          }}
                          placeholder="john@company.com"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold mb-2" style={{ color: '#FAFAFA' }}>
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                          style={{
                            background: '#1F2937', borderColor: 'rgba(16, 185, 129, 0.3)',
                            color: '#FAFAFA'
                          }}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold mb-2" style={{ color: '#FAFAFA' }}>
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                          style={{
                            background: '#1F2937', borderColor: 'rgba(16, 185, 129, 0.3)',
                            color: '#FAFAFA'
                          }}
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    {/* Hiring Model - Full Width */}
                    <div style={{ marginBottom: '28px' }}>
                      <label htmlFor="hiringModel" className="block text-sm font-semibold mb-2" style={{ color: '#FAFAFA' }}>
                        Preferred Hiring Model *
                      </label>
                      <select
                        id="hiringModel"
                        name="hiringModel"
                        required
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        style={{
                          background: '#1F2937', borderColor: 'rgba(16, 185, 129, 0.3)',
                          color: '#FAFAFA'
                        }}
                      >
                        <option value="">Select a hiring model</option>
                        <option value="hourly">Hourly Basis</option>
                        <option value="monthly">Monthly Basis</option>
                        <option value="fixed">Fixed Price Project</option>
                        <option value="not-sure">Not Sure Yet</option>
                      </select>
                    </div>

                    {/* Project Details - Full Width */}
                    <div style={{ marginBottom: '28px' }}>
                      <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: '#FAFAFA' }}>
                        Project Requirements *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                        style={{
                          background: '#1F2937', borderColor: 'rgba(16, 185, 129, 0.3)',
                          color: '#FAFAFA'
                        }}
                        placeholder="Tell us about your project, timeline, and specific CUDA expertise needed..."
                      />
                    </div>

                    {/* Submit Button - Full Width */}
                    <button
                      type="submit"
                      className="w-full px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                        color: '#FFFFFF',
                        boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #059669, #0891B2)';
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(16, 185, 129, 0.6)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #10B981, #06B6D4)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.4)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      Submit Request
                    </button>

                    <p className="text-xs text-center mt-4" style={{ color: '#999999' }}>
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                  </form>
                </motion.div>

              </div>
            </div>
          </section >

        </div>
      </div>
    </>
  );
}
