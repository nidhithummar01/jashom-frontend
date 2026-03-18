import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildContactPayloadFromForm, submitContact } from '../api/contact';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setIsSubmitting(false);
      setSubmitError(null);
      setFormData({
        fullName: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: ''
      });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const form = e.currentTarget as HTMLFormElement;
      const payload = buildContactPayloadFromForm(form, 'Contact modal (navigation)');
      await submitContact(payload);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        navigate('/thank-you/');
      }, 1500);
    } catch (error: unknown) {
      console.error('Form submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSubmitError(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
          onClick={handleBackdropClick}
        >
          {/* Dark Overlay Backdrop (60-70% opacity) */}
          <div className="absolute inset-0 bg-black/70" />
          
          {/* RIGHT SIDE Modal - Fixed positioning */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 100 }}
            className="fixed top-1/2 -translate-y-1/2 w-full max-w-2xl glass-effect rounded-2xl border border-[#ffffff]/30 bg-black/95 shadow-2xl max-h-[90vh] overflow-y-auto sm:max-h-[85vh]"
            style={{ right: '24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Top Right */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10 cursor-pointer"
              style={{ top: '24px', right: '24px' }}
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-white text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Contact Us</h2>
                <p className="text-white/70 text-sm sm:text-base mb-3">
                  Have a question or need assistance? We're here to help. Reach out to us anytime.
                </p>
                <p className="text-white/70 text-sm sm:text-base">
                  Fill out the form below and our team will get back to you as soon as possible.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-[#111] border border-white/10 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-[#d1d5db] text-xl mb-3">Message Sent!</h3>
                  <p className="text-white/70">Redirecting to thank you page...</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 mb-2 font-medium">Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#ffffff]/20 text-white placeholder-white/40 focus:border-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#ffffff]/20 transition-all disabled:opacity-50"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2 font-medium">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#ffffff]/20 text-white placeholder-white/40 focus:border-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#ffffff]/20 transition-all disabled:opacity-50"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 mb-2 font-medium">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#ffffff]/20 text-white placeholder-white/40 focus:border-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#ffffff]/20 transition-all disabled:opacity-50"
                        placeholder="Your Company"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2 font-medium">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#ffffff]/20 text-white placeholder-white/40 focus:border-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#ffffff]/20 transition-all disabled:opacity-50"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2 font-medium">Service Interest</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#ffffff]/20 text-white focus:border-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#ffffff]/20 transition-all disabled:opacity-50"
                    >
                      <option value="" className="bg-[#1A1A1A]">Select a service</option>
                      <option value="gpu-optimization" className="bg-[#1A1A1A]">GPU Optimization Service</option>
                      <option value="cuda-development" className="bg-[#1A1A1A]">CUDA Development Service</option>
                      <option value="ai-ml" className="bg-[#1A1A1A]">AI/ML Development</option>
                      <option value="consulting" className="bg-[#1A1A1A]">AI Consulting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2 font-medium">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#ffffff]/20 text-white placeholder-white/40 focus:border-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#ffffff]/20 transition-all resize-none disabled:opacity-50"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-300" role="alert">
                      {submitError}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 rounded-xl bg-black border border-white text-white transition-all duration-300 hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed font-medium cursor-pointer"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}