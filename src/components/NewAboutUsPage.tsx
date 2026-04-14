import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { buildContactPayloadFromForm, submitContact } from '../api/contact';
import {
  Mail,
  Phone
} from 'lucide-react';

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
      type: "spring" as const,
      stiffness: 100,
      damping: 10
    }
  }
};

function useCanonicalUrl() {
  const location = useLocation();
  const base = (import.meta.env.VITE_SITE_URL ?? (typeof window !== 'undefined' ? window.location.origin : '')).replace(/\/$/, '');
  const path = location.pathname !== '/' && !location.pathname.endsWith('/') ? `${location.pathname}/` : location.pathname;
  return `${base}${path}`;
}

export function NewAboutUsPage() {
  const navigate = useNavigate();
  const canonicalUrl = useCanonicalUrl();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const payload = buildContactPayloadFromForm(e.currentTarget as HTMLFormElement, 'About Us page — contact form');
      await submitContact(payload);
      navigate('/thank-you/');
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSubmitError(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Helmet>
        <title>About Jashom | GPU Optimization & CUDA Development Experts</title>
        <meta
          name="description"
          content="Learn about Jashom, a technology-driven company specializing in GPU optimization, NVIDIA CUDA development, and high-performance computing solutions for modern AI and enterprise applications."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="min-h-screen bg-black overflow-x-hidden">
        {/* Hero Section with Background Image */}
        <section
          className="relative overflow-hidden w-full"
          style={{
            backgroundImage: 'url(/images/About%20Us/about-us-hero.jpg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            maxWidth: '100vw'
          }}
        >
          {/* Dark Gradient Overlay - Left to Right fade for readability */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(11, 15, 20, 0.95) 0%, rgba(11, 15, 20, 0.85) 40%, rgba(11, 15, 20, 0.6) 70%, rgba(11, 15, 20, 0.4) 100%)'
            }}
          ></div>

          {/* Content - aligned with section container */}
          <div className="relative z-10 flex items-center overflow-x-hidden">
            <div className="about-page-container w-full" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
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
                  About Jashom
                </h1>

                {/* Paragraph */}
                <p
                  className="text-white/90"
                  style={{
                    fontSize: 'clamp(17px, 2vw, 20px)',
                    lineHeight: '1.75',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
                    marginBottom: '0',
                    maxWidth: '560px'
                  }}
                >
                  We are developing and designing superior-level GPU systems to transform ideas which are rich in compute into scalable, production-ready solutions that are designed to perform in the real world.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section - aligned with hero */}
        <section
          className="pt-24 pb-16 sm:pt-28 mb-16 sm:pb-20 lg:pt-32 lg:pb-24 mb-20"
          style={{
            background: 'linear-gradient(180deg, #0B0F14 0%, #0F1419 100%)'
          }}
        >
          <div className="about-page-container mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
              {/* Left Side - Title and Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>About</p>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6"
                  style={{ color: '#FAFAFA' }}
                >
                  Engineering Parallel Performance for{' '}
                  <span style={{ color: '#22D3EE' }}>
                    Modern
                  </span>
                  {' '}
                  <span style={{ color: '#22D3EE' }}>
                    Workloads
                  </span>
                </h2>

                <div className="space-y-4">
                  <p className="text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
                    Our company deals with the design of the GPU architecture and the development of CUDA and optimization of data-intensive applications. We deal with startups, research laboratories, and businesses that require the efficiency of an extra level of computation beyond the CPU.
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
                    Our group is a combination of advanced skills in CUDA programming, memory optimization and multi-GPU coordination to provide stable production ready systems. All solutions are designed based on workload profiling, benchmarking and performance tuning- not assumptions.
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
                    We engineer scalable GPU systems that are used in AI training pipelines, real-time analytics, simulation engines, and scientific computing systems. We achieve this by designing a development strategy that ensures ultimate throughput, eminent latency, and efficient use of resources throughout the deployments.
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
                    With proof-of-concept systems to enterprise-grade systems, we support organizations to leverage the full potential of parallel computing, and at the same time ensure reliability, security and maintainability.
                  </p>
                </div>
              </motion.div>

              {/* Right Side - Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative flex items-center justify-center"
              >
                <div
                  className="rounded-2xl overflow-hidden w-full max-w-md aspect-square"
                  style={{
                    border: '1px solid rgba(34, 211, 238, 0.2)',
                    boxShadow: '0 20px 60px rgba(34, 211, 238, 0.15)'
                  }}
                >
                  <img
                    src="/images/About%20Us/about-us-Software-Solutions.jpg.jpg"
                    alt="Software Solutions"
                    className="w-full h-full object-cover"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                {/* Decorative glow effect */}
                <div
                  className="absolute -inset-4 -z-10 rounded-2xl opacity-30 blur-2xl max-w-md aspect-square"
                  style={{
                    background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)'
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section - same container alignment */}
        <section className="pt-36 pb-16 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 bg-black">
          <div className="about-page-container ">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
              {/* Team Image - Spans 2 rows on desktop */}
              <motion.div
                variants={staggerItem}
                className="sm:col-span-2 lg:row-span-2 rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <img
                  src="/images/About%20Us/about-us-team-collaboration.jpg.jpg"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Social Icons - Facebook */}
              <motion.a
                variants={staggerItem}
                href="https://www.facebook.com/jashom"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl p-6 flex items-center justify-center cursor-pointer transition-all duration-300 group relative overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                whileHover={{
                  background: '#1877F2',
                  borderColor: '#1877F2',
                  scale: 1.05
                }}
                transition={{ duration: 0 }}
              >
                <img
                  src="/images/social-media/facebook.png.png"
                  alt="Facebook"
                  className="w-16 h-16 object-cover transition-all duration-300"
                  style={{ objectFit: 'cover' }}
                />
              </motion.a>

              {/* Social Icons - Twitter */}
              <motion.a
                variants={staggerItem}
                href="https://twitter.com/jashom"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl p-6 flex items-center justify-center cursor-pointer transition-all duration-300 group relative overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                whileHover={{
                  background: '#FFFFFF',
                  borderColor: '#000000',
                  scale: 1.05
                }}
                transition={{ duration: 0 }}
              >
                <img
                  src="/images/social-media/twitter.png.png"
                  alt="Twitter"
                  className="w-16 h-16 object-cover transition-all duration-300"
                  style={{ objectFit: 'cover' }}
                />
              </motion.a>

              {/* Industries Served - Jashom Theme */}
              <motion.div
                variants={staggerItem}
                className="sm:col-span-2 rounded-2xl p-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
                  border: '1px solid rgba(34, 211, 238, 0.3)'
                }}
              >
                <h3 className="text-4xl font-bold mb-2" style={{ color: '#22D3EE' }}>20+</h3>
                <h4 className="text-xl font-semibold mb-3 text-white">Industries Served</h4>
                <p className="text-sm" style={{ color: '#D1D5DB' }}>
                  Bringing graphics computing to healthcare, fintech, research, autonomous systems, and enterprise AI.
                </p>
              </motion.div>

              {/* Social Icons - LinkedIn (Clickable) */}
              <motion.a
                variants={staggerItem}
                href="https://www.linkedin.com/company/jashom/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl p-6 flex items-center justify-center cursor-pointer transition-all duration-300 group relative overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                whileHover={{
                  background: '#006192',
                  borderColor: '#006192',
                  scale: 1.05
                }}
                transition={{ duration: 0 }}
              >
                <img
                  src="/images/social-media/linkedin.png.png"
                  alt="LinkedIn"
                  className="w-16 h-16 object-cover transition-all duration-300"
                  style={{ objectFit: 'cover' }}
                />
              </motion.a>

              {/* Social Icons - Instagram (Clickable) */}
              <motion.a
                variants={staggerItem}
                href="https://www.instagram.com/jashomtechnologies_"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl p-6 flex items-center justify-center cursor-pointer transition-all duration-300 group relative overflow-hidden instagram-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                whileHover={{
                  background: 'radial-gradient(circle at 30% 110%, #feda75, #fa7e1e 25%, #d62976 50%, #962fbf 75%, #4f5bd5 100%)',
                  borderColor: '#d62976',
                  scale: 1.05
                }}
                transition={{ duration: 0 }}
              >
                <img
                  src="/images/social-media/instagram.png.png"
                  alt="Instagram"
                  className="w-16 h-16 object-cover transition-all duration-300"
                  style={{ objectFit: 'cover' }}
                />
              </motion.a>

              {/* GPU Compute Hours */}
              <motion.div
                variants={staggerItem}
                className="sm:col-span-2 rounded-2xl p-8"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 className="text-4xl font-bold mb-2" style={{ color: '#22D3EE' }}>50k+</h3>
                <h4 className="text-xl font-semibold mb-3 text-white">GPU Compute Hours Delivered</h4>
                <p className="text-sm" style={{ color: '#9CA3AF' }}>
                  Performance CUDA workloads running on AI training, simulations, and analytics pipelines.
                </p>
              </motion.div>

              {/* 6 Weeks */}
              <motion.div
                variants={staggerItem}
                className="sm:col-span-2 rounded-2xl p-8"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 className="text-4xl font-bold mb-2" style={{ color: '#22D3EE' }}>6 Weeks</h3>
                <h4 className="text-xl font-semibold mb-3 text-white">Average Implementation Cycle</h4>
                <p className="text-sm" style={{ color: '#9CA3AF' }}>
                  Planning of structured architecture and quick optimization minimize the time of deployment without affecting its quality.
                </p>
              </motion.div>

              {/* 24/7 Support */}
              <motion.div
                variants={staggerItem}
                className="sm:col-span-2 rounded-2xl p-8"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 className="text-4xl font-bold mb-2" style={{ color: '#22D3EE' }}>24/7</h3>
                <h4 className="text-xl font-semibold mb-3 text-white">Technical Performing Support</h4>
                <p className="text-sm" style={{ color: '#9CA3AF' }}>
                  This is done through continuous monitoring, debugging, and optimization to ensure the existence of stable GPU execution environments.
                </p>
              </motion.div>

              {/* Bottom Image */}
              <motion.div
                variants={staggerItem}
                className="sm:col-span-2 rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <img
                  src="/images/About%20Us/about-us-team-working.jpg.jpg"
                  alt="Team working"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Client Retention */}
              <motion.div
                variants={staggerItem}
                className="sm:col-span-2 rounded-2xl p-8"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 className="text-4xl font-bold mb-2" style={{ color: '#22D3EE' }}>98%</h3>
                <h4 className="text-xl font-semibold mb-3 text-white">Client Retention Rate</h4>
                <p className="text-sm" style={{ color: '#9CA3AF' }}>
                  Long-term relationships based on the quantifiable performance improvements and open-engineering.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission - one row, two cards side by side */}
        <section
          className="py-20 sm:py-24 lg:py-32 mt"
          style={{
            background: 'linear-gradient(180deg, #0B0F14 0%, #000000 100%)'
          }}
        >
          <div className="about-page-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative rounded-2xl px-8 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14 h-full flex flex-col"
                style={{
                  background: 'linear-gradient(160deg, rgba(20, 36, 56, 0.72) 0%, rgba(10, 20, 34, 0.82) 100%)',
                  border: '1px solid rgba(34, 211, 238, 0.24)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 26px rgba(0, 0, 0, 0.24)'
                }}
              >
                <div className="absolute top-0  left-8 sm:left-10 lg:left-12 w-12 h-0.5 rounded-full" />
                <p className="text-sm mt-2  font-medium mb-3" style={{ color: '#22D3EE' }}>We Think in Compute Power</p>
                <h2 className="text-3xl sm:text-4xl font-bold mb-5" style={{ color: '#FAFAFA' }}>
                  Vision
                </h2>
                <p className="text-base leading-relaxed flex-1" style={{ color: '#D1D5DB' }}>
                  To promote the use of GPU computing in the world by designing efficient, scalable and future-compatible CUDA architectures.
                </p>
              </motion.div>

              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative rounded-2xl px-8 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14 h-full flex flex-col"
                style={{
                  background: 'linear-gradient(160deg, rgba(20, 36, 56, 0.72) 0%, rgba(10, 20, 34, 0.82) 100%)',
                  border: '1px solid rgba(34, 211, 238, 0.24)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 26px rgba(0, 0, 0, 0.24)'
                }}
              >
                <div className="absolute top-0 left-8 sm:left-10 lg:left-12 w-12 h-0.5 rounded-full" />
                <p className="text-sm mt-2 font-medium mb-3" style={{ color: '#22D3EE' }}>We Bring Impact</p>
                <h2 className="text-3xl sm:text-4xl font-bold mb-5" style={{ color: '#FAFAFA' }}>
                  Mission
                </h2>
                <p className="text-base leading-relaxed flex-1" style={{ color: '#D1D5DB' }}>
                  To help organizations unlock maximum computational performance through precision-driven GPU optimization and parallel engineering expertise.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Brand Values Section - same left/right space as rest of page */}
        <section className="py-0 bg-black pb-20">
          <div className="about-page-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[600px] rounded-2xl overflow-hidden">
              {/* Left Side - Image and CTA (50%) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden min-h-[600px]"
                style={{
                  backgroundImage: 'url(/images/About%20Us/about-us-contact-us.jpg.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/50" />

                <div className="relative h-full flex flex-col justify-between p-8 md:p-12 xl:p-16">
                  {/* Bottom Content */}
                  <div className="mt-auto">
                    <h3
                      className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 text-white"
                      style={{
                        textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)'
                      }}
                    >
                      Want to create something impactful?
                    </h3>
                    <p
                      className="text-white mb-8 text-base md:text-lg"
                      style={{
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.6)'
                      }}
                    >
                      Let us talk about your ideas, strategies, and how to execute.
                    </p>
                    <div className="flex justify-start">
                      <button
                        onClick={() => {
                          const formSection = document.getElementById('contact-form');
                          formSection?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                        style={{
                          background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
                          color: '#FFFFFF',
                          boxShadow: '0 8px 24px rgba(34, 211, 238, 0.4)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 12px 32px rgba(34, 211, 238, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 211, 238, 0.4)';
                        }}
                      >
                        Contact Us
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Brand Values (50%) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 xl:p-16 flex flex-col justify-center min-h-[600px]"
                style={{
                  background: 'linear-gradient(160deg, rgba(20, 36, 56, 0.72) 0%, rgba(10, 20, 34, 0.82) 100%)',
                  borderLeft: '1px solid rgba(34, 211, 238, 0.24)'
                }}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 md:mb-12" style={{ color: '#22D3EE' }}>
                  Values We Deliver
                </h2>

                <div className="space-y-8 md:space-y-10">
                  {/* Performance-Driven Innovation */}
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold" style={{ color: '#FAFAFA' }}>
                      Performance-Driven Innovation
                    </h3>
                    <p className="leading-relaxed text-sm md:text-base lg:text-lg" style={{ color: '#D1D5DB' }}>
                      We use state-of-the-art CUDA programming and optimization of the use of the GPUs to develop quantifiable speed gains in the challenging workloads.
                    </p>
                  </div>

                  {/* Workload-Specific Engineering */}
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold" style={{ color: '#FAFAFA' }}>
                      Workload-Specific Engineering
                    </h3>
                    <p className="leading-relaxed text-sm md:text-base lg:text-lg" style={{ color: '#D1D5DB' }}>
                      Each of the systems is tailored to your data flow, compute intensity, and scalability needs in order to optimize it.
                    </p>
                  </div>

                  {/* Transparent Collaboration */}
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold" style={{ color: '#FAFAFA' }}>
                      Transparent Collaboration
                    </h3>
                    <p className="leading-relaxed text-sm md:text-base lg:text-lg" style={{ color: '#D1D5DB' }}>
                      Every phase of development is directed by clear communication, benchmarking reports and shared performance measures.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Divider Section - Add Space */}
        <section className="py-12 lg:py-16 bg-black">
          <div className="about-page-container">
            <div className="border-t border-white/10"></div>
          </div>
        </section>

        {/* Contact Form Section - 50/50 Split */}
        <section
          id="contact-form"
          className="py-16 sm:py-20 lg:py-24"
          style={{
            background: 'linear-gradient(180deg, #000000 0%, #0B0F14 100%)'
          }}
        >
          <div className="about-page-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              {/* Left Side - Contact Info & Office Details (50%) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl h-full flex flex-col"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="space-y-8 p-8 md:p-10">
                  <div>
                    <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>Contact Us</p>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6" style={{ color: '#FAFAFA' }}>
                      Jashom is ready to help you grow.
                    </h2>
                  </div>

                  {/* Our Office */}
                  <div className="space-y-6">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white">Our Office</h3>

                    <div className="flex items-start gap-3">
                      <img
                        src="/images/inidan.flag.jpg"
                        alt="India"
                        className="w-8 h-6 object-cover rounded mt-1"
                      />
                      <div>
                        <p className="text-white/90 leading-relaxed text-sm md:text-base lg:text-lg">
                          414, Satyam-2, Amba Business Park,
                        </p>
                        <p className="text-white/90 leading-relaxed text-sm md:text-base lg:text-lg">
                          ATPL, Adalaj, Gujarat, India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <Mail className="w-5 h-5" style={{ color: '#22D3EE' }} />
                      <a
                        href="mailto:info@jashom.com"
                        className="text-white/90 hover:text-white transition-colors text-sm md:text-base lg:text-lg"
                      >
                        info@jashom.com
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5" style={{ color: '#22D3EE' }} />
                      <a
                        href="tel:+919854412744"
                        className="text-white/90 hover:text-white transition-colors text-sm md:text-base lg:text-lg"
                      >
                        +91 985 441 2744
                      </a>
                    </div>

                    <div className="pt-6">
                      <p className="text-white/70 text-sm md:text-base mb-6">
                        Pay us a visit for a cup of coffee. We'll be more than happy to welcome you.
                      </p>

                      {/* Office Image */}
                      <div className="rounded-xl overflow-hidden mt-6" style={{
                        border: '1px solid rgba(34, 211, 238, 0.2)',
                        boxShadow: '0 4px 12px rgba(34, 211, 238, 0.1)'
                      }}>
                        <img
                          src="/images/about-us-our-office.jpg"
                          alt="Jashom Office"
                          className="w-full h-auto object-cover"
                          style={{ maxHeight: '300px', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Contact Form (50%) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl h-full flex flex-col"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="space-y-6 p-8 md:p-10">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-white">
                    Ready to Accelerate Your Infrastructure?
                  </h3>
                  <p className="text-white/70 mb-8 text-sm md:text-base">
                    Let's analyze your current GPU performance, remove bottlenecks, and engineer scalable CUDA solutions that drive measurable computational gains.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        placeholder="Name"
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        placeholder="Business Email ID"
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        placeholder="Phone (optional)"
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        placeholder="Company Name"
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      />
                    </div>

                    <div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        rows={5}
                        placeholder="Message"
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all resize-none disabled:opacity-50"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      />
                    </div>

                    {submitError && (
                      <p className="text-sm text-red-300" role="alert">
                        {submitError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
                        color: '#FFFFFF'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 211, 238, 0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
