import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { SEO } from './SEO';
import { useState } from 'react';
import { CheckCircle, Upload, ArrowLeft, ArrowRight } from 'lucide-react';

const INPUT_STYLE: React.CSSProperties = {
  background: 'rgba(17, 24, 39, 0.8)',
  borderColor: 'rgba(16, 185, 129, 0.3)',
  color: '#FAFAFA',
};
const LABEL_CLASS = 'block text-sm font-semibold mb-3';
const LABEL_STYLE = { color: '#FAFAFA' as const };
const REQUIRED_SPAN = <span style={{ color: '#EF4444' }}>*</span>;
const INPUT_CLASS = 'w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all';

const formFieldsConfig: { name: 'fullName' | 'email' | 'phone' | 'linkedIn' | 'message'; label: string; placeholder: string; type: 'text' | 'email' | 'tel' | 'url' | 'textarea'; required: boolean; rows?: number }[] = [
  { name: 'fullName', label: 'Full Name', placeholder: 'John Doe', type: 'text', required: true },
  { name: 'email', label: 'Email Address', placeholder: 'john.doe@example.com', type: 'email', required: true },
  { name: 'phone', label: 'Phone Number', placeholder: '+1 (555) 000-0000', type: 'tel', required: true },
  { name: 'linkedIn', label: 'LinkedIn Profile URL', placeholder: 'https://linkedin.com/in/johndoe', type: 'url', required: false },
  { name: 'message', label: 'Cover Letter / Message', placeholder: "Tell us why you're a great fit for this role...", type: 'textarea', required: false, rows: 6 },
];

const stepsData = [
  { number: 1, title: 'Review', description: 'Our team reviews your application within 5-7 business days' },
  { number: 2, title: 'Interview', description: 'Qualified candidates are invited for an interview' },
  { number: 3, title: 'Offer', description: 'Successful candidates receive an offer to join our team' },
];

const STEP_CIRCLE_STYLE: React.CSSProperties = {
  background: 'rgba(16, 185, 129, 0.15)',
  border: '2px solid rgba(16, 185, 129, 0.3)',
};

const SECTION_BG = '#0B0F14';
const BADGE_STYLE = { background: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.25)' } as const;
const FORM_CONTAINER_STYLE: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.6) 0%, rgba(11, 15, 20, 0.8) 100%)',
  borderColor: 'rgba(16, 185, 129, 0.2)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
};
const DIVIDER_STYLE = { height: '1px', background: 'linear-gradient(to right, transparent, rgba(16, 185, 129, 0.3), transparent)', margin: '32px 0' } as const;
const SUBMIT_BUTTON_STYLE = {
  background: 'linear-gradient(135deg, #10B981, #06B6D4)',
  borderColor: 'transparent',
  color: '#FFFFFF',
  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)',
} as const;
const SUBMIT_BUTTON_HOVER = {
  background: 'linear-gradient(135deg, #059669, #0891B2)',
  boxShadow: '0 12px 48px rgba(16, 185, 129, 0.6)',
  transform: 'translateY(-2px)',
} as const;
const CTA_PRIMARY_STYLE = { background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#FFFFFF', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' } as const;
const CTA_SECONDARY_STYLE = { background: 'rgba(255, 255, 255, 0.05)', color: '#FAFAFA', border: '1px solid rgba(255, 255, 255, 0.1)' } as const;
const ACCENT_COLOR = '#10B981';

export function CareerApplicationPage() {
  const [searchParams] = useSearchParams();
  const jobRole = searchParams.get('role') ?? '';
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedIn: '',
    resume: null as File | null,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }));
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: SECTION_BG }}>
        <SEO
          title="Application Submitted | Jashom Careers"
          description="Your job application has been successfully submitted."
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-8"
            style={STEP_CIRCLE_STYLE}
          >
            <CheckCircle className="w-12 h-12" style={{ color: ACCENT_COLOR }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ color: '#FAFAFA' }}
          >
            Application Submitted Successfully!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg mb-8"
            style={{ color: '#D1D5DB', lineHeight: 1.7 }}
          >
            Thank you for applying for the <span style={{ color: ACCENT_COLOR, fontWeight: 600 }}>{jobRole}</span> position. 
            Our team will review your application and get back to you within 5-7 business days.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/careers/openings/"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              style={CTA_PRIMARY_STYLE}
            >
              View Other Openings
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              style={CTA_SECONDARY_STYLE}
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: SECTION_BG }}>
      <SEO
        title={`Apply for ${jobRole ?? 'Position'} | Jashom Careers`}
        description="Submit your application to join the Jashom team."
        keywords="job application, career application, apply for job"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/careers/openings/"
              className="inline-flex items-center gap-2 text-base transition-colors"
              style={{ color: ACCENT_COLOR }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Openings
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.div
              className="inline-block mb-6 px-4 py-2 rounded-full border"
              style={BADGE_STYLE}
            >
              <span style={{ color: ACCENT_COLOR, fontWeight: 600, fontSize: '0.875rem' }}>
                JOB APPLICATION
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#FAFAFA', letterSpacing: '-0.025em' }}>
              Apply for <span style={{ color: ACCENT_COLOR }}>{jobRole ?? 'Position'}</span>
            </h1>
            
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#9CA3AF', lineHeight: 1.7 }}>
              We're excited to learn more about you. Please fill out the form below and we'll be in touch soon.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl p-8 sm:p-12 border"
            style={FORM_CONTAINER_STYLE}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {formFieldsConfig.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className={LABEL_CLASS} style={LABEL_STYLE}>
                    {field.label} {field.required ? REQUIRED_SPAN : null}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      placeholder={field.placeholder}
                      rows={field.rows ?? 6}
                      className={`${INPUT_CLASS} resize-none`}
                      style={INPUT_STYLE}
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      placeholder={field.placeholder}
                      className={INPUT_CLASS}
                      style={INPUT_STYLE}
                    />
                  )}
                </div>
              ))}

              {/* Resume Upload */}
              <div>
                <label htmlFor="resume" className={LABEL_CLASS} style={LABEL_STYLE}>
                  Resume/CV {REQUIRED_SPAN}
                </label>
                <label
                  className="flex items-center justify-center w-full px-5 py-6 rounded-xl border-2 border-dashed cursor-pointer transition-all hover:border-opacity-60"
                  style={{ ...INPUT_STYLE, color: '#9CA3AF' }}
                >
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    required
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: ACCENT_COLOR }} />
                    {fileName ? (
                      <p className="text-sm font-medium" style={{ color: ACCENT_COLOR }}>
                        {fileName}
                      </p>
                    ) : (
                      <>
                        <p className="text-sm font-medium" style={{ color: '#FAFAFA' }}>
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
                          PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </>
                    )}
                  </div>
                </label>
              </div>

              {/* Divider */}
              <div style={DIVIDER_STYLE} />

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer border-0"
                style={SUBMIT_BUTTON_STYLE}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, SUBMIT_BUTTON_HOVER)}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = SUBMIT_BUTTON_STYLE.background;
                  e.currentTarget.style.boxShadow = SUBMIT_BUTTON_STYLE.boxShadow;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Submit Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-sm" style={{ color: '#6B7280' }}>
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#FAFAFA' }}>
              What Happens Next?
            </h2>
            <p className="text-base mb-12 max-w-2xl mx-auto" style={{ color: '#9CA3AF' }}>
              Here's what you can expect after submitting your application
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {stepsData.map((step) => (
                <div key={step.number}>
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={STEP_CIRCLE_STYLE}
                  >
                    <span className="text-2xl font-bold" style={{ color: ACCENT_COLOR }}>{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#FAFAFA' }}>{step.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: '#9CA3AF' }}>{step.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
