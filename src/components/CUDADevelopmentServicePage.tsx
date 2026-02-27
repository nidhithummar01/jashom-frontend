import { motion } from 'motion/react';
import { SEO } from './SEO';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SECTION_BG,
  CARD_BG_LIGHT,
  BORDER_SUBTLE,
  BENEFIT_CARD_BG,
  ACCENT_COLOR,
  TEXT_WHITE,
  TEXT_FAFAFA,
  TEXT_MUTED,
  TEXT_SUBTLE,
  TEXT_GRAY,
  HERO_OVERLAY_GRADIENT,
  HERO_BG_TOP,
  OVERVIEW_BADGE,
  KEY_STAT_BOX,
  IMAGE_SHADOW_ACCENT,
  CTA_HERO_STYLE,
  FORM_GLOW_STYLE,
  FORM_CONTAINER_STYLE,
  SUBMIT_BTN_STYLE,
  SUBMIT_BTN_HOVER,
  HEADING_TITLE_STYLE,
  PROCESS_GRADIENT_BG,
  FORM_LAYOUT,
  FORM_GRID_GAP,
  FORM_MAX_WIDTH,
  CHECK_ICON_BG,
  CHEVRON_DOWN_D,
  CHECK_PATH,
  HERO_H1_STYLE,
  HERO_P_STYLE,
  HERO_CONTENT_PADDING,
  SECTION_CLASS,
  SECTION_CONTAINER,
  MOTION_FADE_UP_20,
  MOTION_FADE_UP_30,
  MOTION_FADE_SCALE,
  OFFICE_ICON_BG,
  officeCardStyle,
  formInputStyle,
  formInputClass,
  OVERLAY_DARK,
  OFFICE_ICON_SVG_CLASS,
  OFFICE_ICON_SVG_PROPS,
  TESTIMONIAL_CARD_STYLE,
  BADGE_TESTIMONIAL,
} from '../constants/theme';
import {
  servicesData,
  industryItems,
  processSteps,
  benefitsData,
  whyChooseItems,
  testimonialsData,
  faqData,
  formFieldsConfig,
  officeCardsData,
} from './CUDADevelopmentServicePage/data';

const CUDA_HERO_IMAGE = '/images/cuda.service.hero.jpg';

function CheckIcon({ size = 'sm' }: Readonly<{ size?: 'sm' | 'lg' }>) {
  return (
    <svg className={size === 'lg' ? 'w-6 h-6 text-white' : 'w-5 h-5 text-white'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={CHECK_PATH} />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M10 18C10 15.7909 11.7909 14 14 14V10C9.58172 10 6 13.5817 6 18C6 20.2091 7.79086 22 10 22V18Z" fill={ACCENT_COLOR} opacity="0.3" />
      <path d="M22 18C22 15.7909 23.7909 14 26 14V10C21.5817 10 18 13.5817 18 18C18 20.2091 19.7909 22 22 22V18Z" fill={ACCENT_COLOR} opacity="0.3" />
    </svg>
  );
}

function DividerLine() {
  return (
    <div className={`${SECTION_CONTAINER} px-4 sm:px-6 lg:px-8`}>
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

function renderOfficeCardIcon(type: 'address' | 'email' | 'phone') {
  if (type === 'address') return <img src="/images/inidan.flag.jpg" alt="India Flag" className="w-full h-full object-cover" />;
  if (type === 'email') return (
    <svg className={OFFICE_ICON_SVG_CLASS} style={{ color: ACCENT_COLOR }} {...OFFICE_ICON_SVG_PROPS}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
  return (
    <svg className={OFFICE_ICON_SVG_CLASS} style={{ color: ACCENT_COLOR }} {...OFFICE_ICON_SVG_PROPS}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

type FormFieldConfig = (typeof formFieldsConfig)[number];
function renderCudaFormField(
  field: FormFieldConfig,
  formData: Record<FormFieldConfig['name'], string>,
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
) {
  const id = `cuda-${field.name}`;
  const base = {
    name: field.name,
    value: formData[field.name],
    onChange: handleChange,
    placeholder: field.placeholder,
    ...('required' in field && { required: field.required }),
  };
  if (field.type === 'textarea') {
    return <textarea id={id} rows={field.rows ?? 4} className={`${formInputClass} resize-none`} style={formInputStyle} {...base} />;
  }
  return <input type={field.type} id={id} className={formInputClass} style={formInputStyle} {...base} />;
}

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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        style={{ minHeight: '100vh', backgroundImage: `url(${CUDA_HERO_IMAGE})`, ...HERO_BG_TOP }}
      >
        <div className="absolute inset-0" style={{ backgroundImage: `url(${CUDA_HERO_IMAGE})`, ...HERO_BG_TOP, filter: 'brightness(1.2)' }} />
        <div className="absolute inset-0" style={{ background: HERO_OVERLAY_GRADIENT }} />

        {/* Content - Premium Spacing */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className={`${SECTION_CONTAINER} px-6 sm:px-8 lg:px-12 w-full`} style={HERO_CONTENT_PADDING}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
              style={{ maxWidth: '620px' }}
            >
              <h1 className="font-bold text-white leading-tight" style={HERO_H1_STYLE}>
                Custom CUDA Development for Advanced GPU Computing
              </h1>
              <p className="text-white/90" style={HERO_P_STYLE}>
                Revolutionize computational pressure to run scalable performance using master CUDA engineering. Our architectures are built and deployed in the form of GPU-native, which opens the door to the efficiency of parallel processing of the AI systems, simulations, and data-intensive programs.
              </p>

              {/* CTA Button */}
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:scale-105"
                style={CTA_HERO_STYLE}
              >
                Get Free Consultation
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className={`${SECTION_CLASS} relative overflow-hidden`} style={{ background: SECTION_BG }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className={`${SECTION_CONTAINER} relative z-10`}>
          {/* Section title - full width centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4 px-4 py-2 rounded-full" style={OVERVIEW_BADGE}>
              <p className="text-sm uppercase tracking-wider" style={{ color: ACCENT_COLOR }}>Overview</p>
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
                  <div className="rounded-lg p-4" style={KEY_STAT_BOX}>
                    <div className="text-3xl font-bold mb-1" style={{ color: ACCENT_COLOR }}>100x</div>
                    <div className="text-sm" style={{ color: TEXT_GRAY }}>Compute Throughput Increase</div>
                  </div>
                  <div className="rounded-lg p-4" style={KEY_STAT_BOX}>
                    <div className="text-3xl font-bold mb-1" style={{ color: ACCENT_COLOR }}>Up to 50%</div>
                    <div className="text-sm" style={{ color: TEXT_GRAY }}>Hardware Efficiency Optimization</div>
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
                  style={IMAGE_SHADOW_ACCENT}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider between sections */}
      <div className="premium-divider" />

      {/* Services Section */}
      <section className={SECTION_CLASS} style={{ background: SECTION_BG }}>
        <div className={SECTION_CONTAINER}>
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
      <section className={`${SECTION_CLASS} relative overflow-hidden`} style={{ background: SECTION_BG }}>
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

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-0" style={{ background: OVERLAY_DARK }} />

        <div className={`${SECTION_CONTAINER} relative z-10`}>
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
                  <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={CHECK_ICON_BG}>
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
      <section className={`${SECTION_CLASS} relative overflow-hidden`} style={{ background: PROCESS_GRADIENT_BG }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className={`${SECTION_CONTAINER} relative z-10`}>
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
      <section className={SECTION_CLASS} style={{ background: SECTION_BG }}>
        <div className={SECTION_CONTAINER}>
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
        <div className={SECTION_CONTAINER}>
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
                <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0" style={CHECK_ICON_BG}>
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
      <section className={SECTION_CLASS} style={{ background: SECTION_BG }}>
        <div className={SECTION_CONTAINER}>
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
              style={BADGE_TESTIMONIAL}
            >
              <span style={{ color: ACCENT_COLOR, fontWeight: 600, fontSize: '0.875rem' }}>Client Testimonials</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={HEADING_TITLE_STYLE}>
              Client Experiences
            </h2>

            <p className="text-lg max-w-2xl mx-auto" style={{ color: TEXT_MUTED, lineHeight: 1.7 }}>
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
                      <div className="font-semibold text-[15px]" style={{ color: TEXT_FAFAFA }}>{t.role}</div>
                      <div className="text-[13px]" style={{ color: TEXT_MUTED }}>{t.company}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={SECTION_CLASS} style={{ background: SECTION_BG }}>
        <div className={SECTION_CONTAINER}>
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

      <div className={`${SECTION_CONTAINER} px-4 sm:px-6 lg:px-8 pb-20`}>
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
              style={HEADING_TITLE_STYLE}
            >
              Get Started with CUDA Development
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg mb-4 leading-relaxed max-w-2xl mx-auto"
              style={{ color: TEXT_MUTED }}
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
            style={FORM_MAX_WIDTH}
          >
            <div className="absolute inset-0 pointer-events-none" style={FORM_GLOW_STYLE} />
            <div className="relative w-full" style={FORM_CONTAINER_STYLE}>
              <form style={FORM_LAYOUT} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2" style={FORM_GRID_GAP}>
                  {formFieldsConfig.map((field) => (
                    <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                      <label htmlFor={`cuda-${field.name}`} className="block text-white/90 mb-2 font-medium text-sm">{field.label}</label>
                      {renderCudaFormField(field, formData, handleChange)}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center sm:justify-start">
                  <motion.button
                    type="submit"
                    className="px-12 py-4 rounded-xl font-semibold text-base transition-all duration-300 cursor-pointer"
                    style={SUBMIT_BTN_STYLE}
                    whileHover={{ y: -2, ...SUBMIT_BTN_HOVER }}
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
              <h3 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: TEXT_FAFAFA }}>
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
                    {renderOfficeCardIcon(card.type)}
                  </div>
                  <h4 className="text-lg font-semibold mb-3" style={{ color: TEXT_FAFAFA }}>{card.title}</h4>
                  {card.href ? (
                    <>
                      <a href={card.href} className="text-sm inline-block hover:text-[#059669] transition-colors" style={{ color: ACCENT_COLOR }}>
                        {card.content}
                      </a>
                      {card.subtitle && <p className="text-xs mt-3" style={{ color: TEXT_SUBTLE }}>{card.subtitle}</p>}
                    </>
                  ) : (
                    <p className="text-sm leading-relaxed" style={{ color: TEXT_MUTED, whiteSpace: typeof card.content === 'string' ? 'pre-line' : undefined }}>{card.content}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

