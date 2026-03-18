import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { SEO as Seo } from './SEO';
import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildContactPayloadFromForm, submitContact } from '../api/contact';

const PAGE_BG = '#000000';
const SECTION_BG_DARK = '#0B0F14';
const ACCENT_COLOR = '#22D3EE';
const TEXT_WHITE = '#FFFFFF';
const TEXT_MUTED = '#9CA3AF';
const HERO_OVERLAY_GRADIENT = 'linear-gradient(to right, rgba(11, 15, 20, 0.95) 0%, rgba(11, 15, 20, 0.85) 40%, rgba(11, 15, 20, 0.6) 70%, rgba(11, 15, 20, 0.4) 100%)';
const CTA_HERO_STYLE = { background: ACCENT_COLOR, color: TEXT_WHITE, boxShadow: '0 4px 14px 0 rgba(34, 211, 238, 0.4)', border: 'none', cursor: 'pointer' } as const;
const DIVIDER_ACCENT_STYLE = { background: ACCENT_COLOR, boxShadow: '0 0 15px rgba(34, 211, 238, 0.6)' } as const;
const MAP_CONTAINER_STYLE: React.CSSProperties = { borderRadius: '20px', borderColor: 'rgba(34, 211, 238, 0.3)', boxShadow: '0 0 40px rgba(34, 211, 238, 0.2)', height: '450px' };
const SUBMIT_BUTTON_STYLE = { background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)', color: TEXT_WHITE, boxShadow: '0 4px 25px rgba(34, 211, 238, 0.4)' } as const;
const SUBMIT_BUTTON_HOVER = { boxShadow: '0 6px 35px rgba(34, 211, 238, 0.6)' } as const;
const FAQ_ITEM_STYLE = { background: SECTION_BG_DARK, borderColor: 'rgba(255, 255, 255, 0.1)' } as const;
const TEXT_WHITE_60 = 'rgba(255, 255, 255, 0.6)';
const TEXT_WHITE_70 = 'rgba(255, 255, 255, 0.7)';

const HEADING_WHITE_STYLE = { color: TEXT_WHITE } as const;
const MUTED_STYLE = { color: TEXT_MUTED } as const;
const ACCENT_STYLE = { color: ACCENT_COLOR } as const;
const SECTION_PADDING_120 = { padding: '120px 0' } as const;
const SECTION_PADDING_100 = { padding: '100px 0' } as const;
const HERO_SECTION_STYLE: React.CSSProperties = {
  minHeight: '100vh',
  backgroundImage: 'url(/images/contact.hero.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};
const HERO_H1_STYLE: React.CSSProperties = {
  fontSize: 'clamp(28px, 4vw, 48px)',
  textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
  letterSpacing: '-0.02em',
  marginBottom: '32px',
};
const HERO_P_STYLE: React.CSSProperties = {
  fontSize: 'clamp(17px, 2vw, 20px)',
  lineHeight: '1.75',
  textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
  marginBottom: '48px',
  maxWidth: '560px',
};
const HERO_CONTENT_PADDING = { paddingTop: '140px', paddingBottom: '100px' };
const MOTION_FADE_LEFT = { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6 } } as const;
const MOTION_FADE_RIGHT = { initial: { opacity: 0, x: 30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6 } } as const;
const MOTION_FADE_UP = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } } as const;
const MOTION_FAQ_ITEM = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } } as const;
const FAQ_ANSWER_STYLE = { color: TEXT_WHITE_70 } as const;
const FAQ_LABEL_STYLE = { color: TEXT_WHITE_60 } as const;
const MAP_IFRAME_STYLE: React.CSSProperties = { border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.9)' };
const INPUT_CLASS_BASE = 'w-full border transition-all duration-300';

const INPUT_BASE_STYLE: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  color: TEXT_WHITE,
  borderRadius: '10px',
  fontSize: '15px',
  padding: '14px 18px',
};
const INPUT_FOCUSED = {
  borderColor: ACCENT_COLOR,
  boxShadow: '0 0 20px rgba(34, 211, 238, 0.4), inset 0 0 10px rgba(34, 211, 238, 0.1)',
};
const INPUT_BLUR = {
  borderColor: 'rgba(255, 255, 255, 0.1)' as const,
  boxShadow: 'none' as const,
};

const formFieldsConfig: {
  name: 'fullName' | 'email' | 'phone' | 'company' | 'message';
  placeholder: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  rows?: number;
  required?: boolean;
}[] = [
  { name: 'fullName', placeholder: 'Name', type: 'text', required: true },
  { name: 'email', placeholder: 'Business Email ID', type: 'email', required: true },
  { name: 'phone', placeholder: 'Phone (optional)', type: 'tel', required: false },
  { name: 'company', placeholder: 'Company Name (optional)', type: 'text', required: false },
  { name: 'message', placeholder: 'Message', type: 'textarea', rows: 5, required: true },
];

const faqsData = [
    {
      question: 'Are you an end-to-end CUDA developer or just an advisor?',
      answer: 'We offer both. Depending on the level of engagement, our team can lead an architecture decision at a consulting level or execute all the way to CUDA development, kernel engineering, testing, and deployment.'
    },
    {
      question: 'What NVIDIA technologies do you operate?',
      answer: 'We are involved in the NVIDIA ecosystem, such as CUDA Toolkit, cuDNN, TensorRT, NCCL, and GPU profiling tools, to streamline AI, simulation, and other compute-intensive workloads.'
    },
    {
      question: 'Can you integrate GPU acceleration into existing AI pipelines?',
      answer: 'Yes. We train and inference pipelines that are optimized through the use of GPU acceleration without interfering with your existing framework, infrastructure, and deployment workflow.'
    },
    {
      question: 'How do you ensure scalability for future growth?',
      answer: 'We develop a scalable GPU architecture that benefits from scaling up to workloads, orchestration of multiple GPUs, and an upgrade of the infrastructure without having to redesign larger systems.'
    }
  ];

function SectionContent({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="px-4 sm:px-6 lg:px-4">
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
}

function ContactLink({ href, icon: Icon, children, last }: Readonly<{ href: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; children: React.ReactNode; last?: boolean }>) {
  return (
    <div className="flex items-center gap-3" style={last ? undefined : { marginBottom: '16px' }}>
      <Icon className="w-6 h-6" style={ACCENT_STYLE} />
      <a href={href} className="text-xl hover:underline transition-colors" style={HEADING_WHITE_STYLE}>
        {children}
      </a>
    </div>
  );
}

export function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const payload = buildContactPayloadFromForm(e.currentTarget as HTMLFormElement, 'Contact page');
      await submitContact(payload);
      navigate('/thank-you/');
    } catch (err: unknown) {
      setSubmitError((err as any)?.message ?? 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Jashom Technologies',
    image: 'https://www.jashom.com/jashom-logo-header-70px.png',
    '@id': 'https://www.jashom.com/contact/',
    url: 'https://www.jashom.com/',
    telephone: '90239 06363',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '414, Shivam 2, AMBA BUSINESS PARK',
      addressLocality: 'Adalaj',
      postalCode: '382421',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.1872755,
      longitude: 72.573118
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(contactPageSchema)}</script>
      </Helmet>
      <Seo
        title="Contact Jashom | GPU & CUDA Development Consultation"
        description="Get in touch with Jashom for expert GPU optimization and CUDA development services. Contact our team to discuss your performance challenges and project requirements."
        keywords="contact Jashom, GPU consultation, CUDA development inquiry, AI consulting"
      />

      <div className="contact">
        <div className="min-h-screen" style={{ background: PAGE_BG }}>

          {/* SECTION 1 - HERO SECTION */}
          <section className="relative overflow-hidden" style={HERO_SECTION_STYLE}>
            {/* Dark Gradient Overlay - Left to Right fade for readability */}
            <div
              className="absolute inset-0"
              style={{ background: HERO_OVERLAY_GRADIENT }}
            />

            {/* Content - Premium Spacing */}
            <div className="relative z-10 min-h-screen flex items-center">
              <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full" style={HERO_CONTENT_PADDING}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-left"
                  style={{ maxWidth: '620px' }}
                >
                  {/* Heading */}
                  <h1 className="font-bold text-white leading-tight" style={HERO_H1_STYLE}>
                    Contact Jashom
                  </h1>

                  {/* Paragraph */}
                  <p className="text-white/90" style={HERO_P_STYLE}>
                    Need to optimize AI training, high-performance computing, or data-intensive jobs? Our GPU and CUDA consulting team helps you design, optimize, and scale parallel computing systems that deliver measurable speed, efficiency, and cost performance.
                  </p>

                  {/* CTA Button */}
                  <a
                    href="#contact-form"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:scale-105"
                    style={CTA_HERO_STYLE}
                  >
                    Get in Touch
                  </a>
                </motion.div>
              </div>
            </div>
          </section>

          {/* SECTION 2 - CONTACT FORM + OFFICE INFO */}
          <section id="contact-form" style={{ ...SECTION_PADDING_120, background: PAGE_BG }}>
            <SectionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 xl:gap-20 items-start">

                  {/* LEFT SIDE - Info */}
                  <motion.div {...MOTION_FADE_LEFT}>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight" style={HEADING_WHITE_STYLE}>
                      Our consultants bring deep technical expertise and{' '}
                      <span style={ACCENT_STYLE}>production-grade execution</span>.
                    </h2>

                    {/* Cyan Divider */}
                    <div
                      className="h-1 w-32 rounded-full mb-12"
                      style={DIVIDER_ACCENT_STYLE}
                    />

                    {/* Get in touch heading */}
                    <h3 className="text-3xl font-bold mb-6" style={HEADING_WHITE_STYLE}>
                      Get in touch with our GPU experts
                    </h3>

                    <p className="text-lg mb-16" style={MUTED_STYLE}>
                      We have CUDA consultants who will look at your needs and get back to you within two business days.
                    </p>

                    {/* Our Office Heading */}
                    <h3 className="text-3xl font-bold mb-6 mt-8" style={HEADING_WHITE_STYLE}>
                      Our Office
                    </h3>

                    {/* Office Block */}
                    <div className="mb-10">
                      <div className="flex items-start gap-4" style={{ marginBottom: '28px' }}>
                        <span className="text-3xl">🇮🇳</span>
                        <div>
                          <p className="text-lg leading-relaxed" style={{ ...MUTED_STYLE, marginBottom: '0' }}>
                            414, Satyam-2, Amba Business Park
                          </p>
                          <p className="text-lg leading-relaxed" style={{ ...MUTED_STYLE, marginTop: '18px', marginBottom: '0' }}>
                            ATPL, Adalaj, Gujarat, India
                          </p>
                        </div>
                      </div>

                      <div style={{ marginTop: '28px' }}>
                        <ContactLink href="mailto:info@jashom.com" icon={Mail}>info@jashom.com</ContactLink>
                        <ContactLink href="tel:+919023906363" icon={Phone} last>+91 90239 06363</ContactLink>
                      </div>
                    </div>

                    <p className="text-lg italic" style={{ ...MUTED_STYLE, marginTop: '24px' }}>
                      Let's build something powerful together.
                    </p>
                  </motion.div>

                  {/* RIGHT SIDE - Glassmorphism Contact Form */}
                  <motion.div {...MOTION_FADE_RIGHT}>
                    <div className="mb-20">
                      <h3 className="text-3xl font-bold mb-4" style={HEADING_WHITE_STYLE}>
                        Get in touch
                      </h3>
                      <p className="text-base" style={MUTED_STYLE}>
                        Our team will respond to you within 2 business days.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {formFieldsConfig.map((field) => {
                        const isFocused = focusedField === field.name;
                        const inputStyle = { ...INPUT_BASE_STYLE, ...(isFocused ? INPUT_FOCUSED : INPUT_BLUR) };
                        const commonProps = {
                          name: field.name,
                          placeholder: field.placeholder,
                          value: formData[field.name],
                          onChange: handleChange,
                          onFocus: () => setFocusedField(field.name),
                          onBlur: () => setFocusedField(null),
                          required: field.required ?? true,
                          className: field.type === 'textarea' ? `${INPUT_CLASS_BASE} resize-none` : INPUT_CLASS_BASE,
                          style: inputStyle,
                        };
                        return (
                          <div key={field.name}>
                            {field.type === 'textarea' ? (
                              <textarea {...commonProps} rows={field.rows ?? 5} />
                            ) : (
                              <input {...commonProps} type={field.type} />
                            )}
                          </div>
                        );
                      })}

                      {submitError && (
                        <div
                          role="alert"
                          className="text-sm"
                          style={{ color: 'rgba(255,255,255,0.85)', background: 'rgba(239,68,68,0.14)', border: '1px solid rgba(239,68,68,0.35)', padding: '10px 12px', borderRadius: '12px' }}
                        >
                          {submitError}
                        </div>
                      )}

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        className="font-semibold text-sm transition-all duration-300 px-6 py-3 rounded-xl"
                        style={SUBMIT_BUTTON_STYLE}
                        whileHover={{ scale: 1.02, ...SUBMIT_BUTTON_HOVER }}
                        whileTap={{ scale: 0.98 }}
                        disabled={submitting}
                      >
                        {submitting ? 'Submitting...' : 'Submit'}
                      </motion.button>
                    </form>
                  </motion.div>

                </div>
            </SectionContent>
          </section>

          {/* SECTION 3 - GOOGLE MAP */}
          <section style={SECTION_PADDING_100}>
            <SectionContent>
                <motion.div
                  {...MOTION_FADE_UP}
                  className="overflow-hidden border"
                  style={MAP_CONTAINER_STYLE}
                >
                  <iframe
                    src="https://www.google.com/maps?q=Jashom+Technologies+Shivam+2+AMBA+BUSINESS+PARK+414+Adalaj+Gujarat+382421&output=embed"
                    width="100%"
                    height="100%"
                    style={MAP_IFRAME_STYLE}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Jashom Technologies Office"
                  />
                </motion.div>
            </SectionContent>
          </section>

          {/* SECTION 4 - FAQs */}
          <section style={{ ...SECTION_PADDING_120, background: SECTION_BG_DARK }}>
            <SectionContent>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-5xl mx-auto">

                  {/* Left 40% - Heading */}
                  <motion.div {...MOTION_FADE_LEFT} className="lg:col-span-4">
                    <p className="text-xs font-semibold tracking-wider mb-3 uppercase" style={FAQ_LABEL_STYLE}>
                      FAQs
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold leading-tight" style={HEADING_WHITE_STYLE}>
                      Frequently
                      <br />
                      Asked Questions
                    </h2>
                  </motion.div>

                  {/* Right 60% - Accordion */}
                  <div className="lg:col-span-8 space-y-3">
                    {faqsData.map((faq, index) => (
                      <motion.div
                        key={faq.question}
                        {...MOTION_FAQ_ITEM}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="rounded-xl border overflow-hidden"
                        style={FAQ_ITEM_STYLE}
                      >
                        <details className="group">
                          <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                            <h4 className="font-semibold pr-3" style={HEADING_WHITE_STYLE}>
                              {faq.question}
                            </h4>
                            <svg
                              className="w-4 h-4 flex-shrink-0 transition-transform group-open:rotate-180"
                              style={FAQ_LABEL_STYLE}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                            <p className="text-xs leading-relaxed" style={FAQ_ANSWER_STYLE}>
                              {faq.answer}
                            </p>
                          </div>
                        </details>
                      </motion.div>
                    ))}
                  </div>

                </div>
            </SectionContent>
          </section>
        </div>
      </div>
    </>
  );
}

export default ContactPage;

