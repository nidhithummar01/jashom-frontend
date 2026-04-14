import { motion } from 'motion/react';
import { Award, Zap, DollarSign, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildContactPayloadFromState, submitContact } from '../api/contact';
import { SEO as Seo } from './SEO';

const SECTION_BG = '#0B0F14';
const BORDER_WHITE_10 = 'rgba(255, 255, 255, 0.1)';
const STAT_ICON_BOX = 'w-14 h-14 rounded flex items-center justify-center flex-shrink-0';
const STAT_ICON_BG = { background: '#22D3EE' };
const DIVIDER_CLASS = 'hidden sm:block w-px h-16';
const DIVIDER_STYLE = { background: '#555555' };

const heroStatsData = [
  { Icon: Award, title: '15 Days Risk-Free', subtitle: 'Trial' },
  { Icon: Zap, title: '24x7 Technical', subtitle: 'Support' },
  { Icon: DollarSign, title: 'On-Time', subtitle: 'Delivery' },
];

const expertiseData: { title: string; description: string; pathDs: string[] }[] = [
  { title: 'Advanced Kernel Optimization', description: 'We optimize CUDA kernels by creating them to be more warp efficient and less divergent, and optimize instruction throughput. We have a stable implementation and quantifiable speed scalability with complicated workloads.', pathDs: ['M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'] },
  { title: 'Scalable Parallel Architecture', description: 'In order to achieve higher throughput, our engineers design GPU-oriented systems with maximum concurrency and optimization in the distribution of computational tasks among threads and streaming multiprocessors.', pathDs: ['M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'] },
  { title: 'Performance Profiling & Bottleneck Analysis', description: 'With the help of modern profiling tools, we will examine execution times, latency, and utilization of the compute to be able to identify areas of inefficiency and employ data-based optimization measures.', pathDs: ['M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'] },
  { title: 'AI & Machine Learning Acceleration', description: 'We execute model training and inference pipelines at a faster pace by tuning CUDA implementations and better participation of the GPUs, and less computational intensity of large-scale AI tasks.', pathDs: ['M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'] },
  { title: 'Efficient Memory Management', description: 'Shared, global, pinned, and unified memory usage is optimized by our CUDA developers to minimize the latency of data transfer and maximize the overall application performance.', pathDs: ['M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'] },
  { title: 'Multi-GPU & Distributed Computing', description: 'We support a multi-GPU execution platform with tuned communication patterns, which enable enterprises to use optimized communication patterns and scale applications with high compute intensity.', pathDs: ['M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'] },
];

const hireStepsData = [
  { title: 'Share Your Project Requirements', description: 'Characterize your type of workload and performance objectives, infrastructure, and the type of interaction you want so we can match the appropriate technical resources.' },
  { title: 'Examine Certified Profile of Developers', description: 'We offer extensively vetted CUDA engineers who have skills that fit your whenever-needed computational and architectural requirements.' },
  { title: 'Select Your Hiring Model', description: 'Select flexible staffing arrangements, such as full-time, part-time, and project hiring, depending on the scope and the timeline.' },
  { title: 'Start Development Implementation', description: 'The CUDA developer of your choice is integrated with your working process and immediately begins to optimize and accelerate your application.' },
];

const EXPERTISE_ICON_BG = 'rgba(34, 211, 238, 0.12)';
const EXPERTISE_ICON_BORDER = '1px solid rgba(34, 211, 238, 0.28)';
const EXPERTISE_ICON_COLOR = '#22D3EE';
const STEP_CIRCLE_STYLE = { background: 'radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, rgba(34, 211, 238, 0.05) 70%)', border: '3px solid rgba(34, 211, 238, 0.3)' };
const STEP_NUM_BG = { background: '#22D3EE' };

const whyHireCardsData: { title: string; description: string; src: string; alt: string; imageStyle?: React.CSSProperties }[] = [
  { title: 'High-Quality Engineering Standards', description: 'Our developers observe the best practices of coding and performance to provide stable and maintainable solutions for the GPU.', src: '/images/cuda-quality-code.jpg.jpg', alt: 'Quality Code' },
  { title: 'Strong Data Security & Confidentiality', description: 'Our business works under the broad NDAs and safe development procedures to maintain the delicate business logic and intellectual property.', src: '/images/cuda-nda.jpg.jpg', alt: 'NDA Agreement' },
  { title: 'Proven GPU Development Experience', description: 'Our group has practical experience in the fields of AI, analytics, simulation, and high-performance computing.', src: '/images/cuda-verified.jpg.jpg', alt: 'Certified Developer' },
  { title: 'Cost-Optimized Resource Allocation', description: 'Dependent employment platforms make sure that you only spend what is needed for your project.', src: '/images/cuda-cost.jpg.jpg', alt: 'Cost Reduction', imageStyle: { objectPosition: 'center 40%' } },
  { title: 'Senior-Level Technical Expertise', description: 'Our CUDA engineers have a combination of architectural and practical experience with the implementation of the efficient use of GPUs.', src: '/images/cuda-experience.jpg.jpg', alt: 'High Experience Team' },
  { title: 'Rapid Onboarding Process', description: 'We also make sure that we deploy resources as fast as possible, and this makes your project pick up without any unnecessary delays.', src: '/images/cuda-onboarding.jpg.jpg', alt: 'Quick Onboarding' },
];

const engagementModelsData = [
  { title: 'Full-Time', description: 'Contract a CUDA developer to work on your long-term project of non-temporal GPU or AI acceleration.' },
  { title: 'Part-Time', description: 'Outsource CUDA specialists on a part-time basis to maintain optimization, upgrades, or performance enhancements.' },
  { title: 'Time & Material', description: 'Flexible hourly development of the scale with changing CUDA needs and optimization via iteration.' },
  { title: 'Custom Model', description: 'Receive a customized staffing plan that is based on your technical, scheduling, and budget requirements.' },
];

const WHY_HIRE_CARD_IMG_STYLE = { borderRadius: '12px 12px 0 0' as const, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' };
const WHY_HIRE_GRADIENT = 'linear-gradient(to bottom, transparent 60%, rgba(11, 15, 20, 0.4) 100%)';

const whyChooseBenefitsData: { title: string; description: string; pathD?: string }[] = [
  { title: 'High-Impact GPU Acceleration', description: 'We re-architect compute workflows to achieve the maximum amount of parallel performance, providing huge improvements in processing time on AI, analytics, and simulation workloads.', pathD: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
  { title: 'Enterprise-Ready AI Systems', description: 'We develop CUDA-based AI systems with a scalable, stable, and real-world production foundation, all the way up to architecture planning to deployment pipelines.', pathD: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { title: 'Secure Development Framework', description: 'To ensure protection of sensitive data and GPU infrastructure, we have strict security criteria, controlled access policies, and processes driven by compliance.', pathD: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { title: 'Accelerated Deployment Cycles', description: 'Our streamlined development model is designed to be fast prototyping, highly optimizing and easy to move into production systems.' },
  { title: 'Dedicated Technical Assistance', description: 'We maintain a long-term stability of the GPU in terms of performance and stability through constant monitoring, performance tuning, and troubleshooting by our experts.', pathD: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { title: 'Performance-Oriented Cost Strategy', description: 'We maximize compute usage and assigning GPU resources to minimize infrastructure wastage and maximize investment.', pathD: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
];

const BENEFIT_CARD_STYLE = { background: 'rgba(34, 211, 238, 0.05)', borderColor: 'rgba(34, 211, 238, 0.3)' };
const BENEFIT_ICON_BOX_STYLE = { background: 'rgba(34, 211, 238, 0.1)', border: '1px solid rgba(34, 211, 238, 0.3)' };
const BADGE_FAQ = { background: 'rgba(34, 211, 238, 0.05)', borderColor: 'rgba(34, 211, 238, 0.2)' } as const;
const FAQ_ITEM_STYLE = {
  background: 'linear-gradient(160deg, rgba(20, 36, 56, 0.62) 0%, rgba(10, 20, 34, 0.8) 100%)',
  borderColor: 'rgba(34, 211, 238, 0.24)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.2)'
} as const;
const CHEVRON_DOWN_D = 'M19 9l-7 7-7-7';
const REVIEW_CARD_STYLE = {
  background: 'linear-gradient(160deg, rgba(20, 36, 56, 0.72) 0%, rgba(10, 20, 34, 0.82) 100%)',
  borderColor: 'rgba(34, 211, 238, 0.24)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 26px rgba(0, 0, 0, 0.24)'
} as const;
const STAR_PATH_D = 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z';
const ENGAGEMENT_CARD_BG = 'rgba(34, 211, 238, 0.05)';
const RELATED_SERVICE_CARD_STYLE = {
  background: 'linear-gradient(160deg, rgba(20, 36, 56, 0.72) 0%, rgba(10, 20, 34, 0.82) 100%)',
  border: '1px solid rgba(34, 211, 238, 0.24)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 26px rgba(0, 0, 0, 0.24)'
} as const;
const RELATED_SERVICE_BTN_STYLE = { background: '#22D3EE', color: '#FFFFFF' } as const;
const HIRE_FORM_INPUT_STYLE = { background: '#1F2937', borderColor: 'rgba(34, 211, 238, 0.3)', color: '#FAFAFA' } as const;

const reviewsData: { quote: string; author: string; filledStars: number }[] = [
  { quote: '"Our GPU workloads were dramatically improved after working with this team. Their CUDA optimization strategy enhanced throughput and reduced system latency beyond expectations."', author: 'CTO, AI Solutions Firm', filledStars: 5 },
  { quote: '"Their way of doing things in parallel contributed to us being able to meet our tight performance deadlines. Very well acquainted and technologically reliable."', author: 'VP Engineering, Data Platform Company', filledStars: 5 },
  { quote: '"The extraordinary knowledge of CUDA architecture. They assisted us in moving away the CPU-bound systems to scalable GPU infrastructure quickly."', author: 'Lead ML Engineer, Tech Startup', filledStars: 5 },
  { quote: '"Effective communication, good performance, and quantifiable performance benefits. They used their graphics prowess to enhance our analytics engine."', author: 'Director of Technology', filledStars: 4 },
  { quote: '"The team provided CUDA versions that were optimized and that reduced the training time of our AI models by a large margin."', author: 'Head of AI Research', filledStars: 5 },
  { quote: '"Professional, responsive, and highly skilled in GPU computing. We achieved performance milestones much faster than anticipated."', author: 'Product Engineering Manager', filledStars: 5 },
];

const faqData: { q: string; a: string }[] = [
  { q: 'Why should I hire a dedicated CUDA developer instead of a general developer?', a: 'The CUDA developers are experts in the domain of the architecture of the GPUs, parallel computing, and optimization of performance. They reorganize algorithms with a specific execution in the GPU and provide much faster and more efficient performance in comparison to the general-purpose programming methods.' },
  { q: 'What types of projects require CUDA development expertise?', a: 'AI/ML training, real-time data analytics, scientific simulations, computer vision, video processing, high-performance computing (HPC), and additional applications that rely on the acceleration provided by a graphics card are all applications that need CUDA skills.' },
  { q: 'How do CUDA developers improve application performance?', a: 'They enhance the execution of the kernel, thread setup, memory, and the transfer of data between the CPU and the GPU. They remove bottlenecks and maximize throughput using profiling tools to get measurable performance improvements.' },
  { q: 'Can you optimize an existing GPU or CUDA-based application?', a: 'Of course. Our CUDA team developers will examine existing implementations, uncover inefficiencies, and implement special-purpose optimization to achieve faster execution speed, scalability, and system stability.' },
  { q: 'Do you support multi-GPU or distributed GPU environments?', a: 'Yes. Our work is scalable multi-GPU designs, where each workload is placed on multiple processors and devices communicate in a more efficient and optimal way to provide the performance of an enterprise.' },
  { q: 'What hiring models are available for CUDA developers?', a: "You can hire CUDA developers on a full-time basis, part-time basis, hourly basis (time and material), and various other custom ability basis according to your project scope and performance needs." },
];

const getStartedFeaturesData: { title: string; description: string; pathD: string }[] = [
  { title: 'Quick Response', description: 'We respond to all inquiries within 24 hours', pathD: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'No Obligation', description: 'Free consultation with no commitment required', pathD: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Expert Matching', description: "We'll match you with developers suited to your project", pathD: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
];

const relatedServicesData = [
  { title: 'GPU Optimization Service', description: 'Finetune your GPU workloads for maximum speed and efficiency, eliminating bottlenecks and maximizing resource utilization.', href: '/gpu-optimization-service' },
  { title: 'CUDA Development Service', description: 'Build high-performance parallel applications with expert CUDA development tailored for speed, scalability and precision.', href: '/cuda-development-service' },
];

const hireFormFieldsConfig: { name: 'fullName' | 'email' | 'company' | 'phone' | 'hiringModel' | 'message'; label: string; type: 'text' | 'email' | 'tel' | 'select' | 'textarea'; placeholder?: string; required?: boolean; rows?: number; options?: { value: string; label: string }[] }[] = [
  { name: 'fullName', label: 'Full Name *', type: 'text', placeholder: 'John Doe', required: true },
  { name: 'email', label: 'Email Address *', type: 'email', placeholder: 'john@company.com', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000' },
  { name: 'company', label: 'Company Name', type: 'text', placeholder: 'Your Company' },
  { name: 'hiringModel', label: 'Preferred Hiring Model *', type: 'select', required: true, options: [{ value: '', label: 'Select a hiring model' }, { value: 'hourly', label: 'Hourly Basis' }, { value: 'monthly', label: 'Monthly Basis' }, { value: 'fixed', label: 'Fixed Price Project' }, { value: 'not-sure', label: 'Not Sure Yet' }] },
  { name: 'message', label: 'Project Requirements *', type: 'textarea', placeholder: 'Tell us about your project, timeline, and specific CUDA expertise needed...', required: true, rows: 4 },
];

const FEATURE_ICON_BOX_STYLE = { background: 'rgba(34, 211, 238, 0.1)' } as const;

export function HireCudaDeveloperPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    hiringModel: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setHireSubmitError(null);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [hireSubmitting, setHireSubmitting] = useState(false);
  const [hireSubmitError, setHireSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hireSubmitting) return;
    setHireSubmitError(null);
    setHireSubmitting(true);
    try {
      const payload = buildContactPayloadFromState(
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          hiringModel: formData.hiringModel,
        },
        'Hire CUDA Developer page'
      );
      await submitContact(payload);
      navigate('/thank-you/');
    } catch (err: unknown) {
      setHireSubmitError(err instanceof Error ? err.message : 'Failed to submit.');
    } finally {
      setHireSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title="Hire CUDA Developers | Dedicated CUDA Programmers & GPU Experts"
        description="Looking to hire CUDA developers? Get skilled GPU programmers for NVIDIA CUDA projects, performance optimization, and custom parallel computing solutions."
        keywords="hire CUDA developers, CUDA programmers, GPU experts, NVIDIA CUDA, parallel computing"
      />

      <div className="hire cuda developer">
        <div className="min-h-screen" style={{ background: '#0B0F14' }}>
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
                          border: '1px solid rgba(34, 211, 238, 0.2)',
                          padding: '0 16px',
                          height: '44px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div className="flex-none sm:ml-3 w-full sm:w-[250px] sm:min-w-[250px]">
                      <a
                        href="/contact/"
                        className="inline-flex items-center justify-center px-6 rounded-xl font-semibold text-sm leading-snug transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] w-full text-center"
                        style={{
                          background: '#22D3EE',
                          color: '#FFFFFF',
                          textDecoration: 'none',
                          boxShadow: '0 4px 14px 0 rgba(34, 211, 238, 0.4)',
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
                    {heroStatsData.map((stat, i) => {
                      const IconComponent = stat.Icon;
                      return (
                        <React.Fragment key={stat.title}>
                          {i > 0 && <div className={DIVIDER_CLASS} style={DIVIDER_STYLE} />}
                          <div className="flex items-center gap-4">
                            <div className={STAT_ICON_BOX} style={STAT_ICON_BG}>
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
          </section>

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
                        href="/contact/"
                        className="inline-flex items-center justify-center w-auto max-w-xs px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-2 text-center text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-orange-500 hover:text-white cursor-pointer"
                        style={{
                          background: 'transparent',
                          borderColor: '#22D3EE',
                          color: '#22D3EE'
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
                        boxShadow: '0 20px 60px rgba(34, 211, 238, 0.3)',
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
          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0F14' }}>
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
                {expertiseData.map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="flex gap-4 border rounded-xl p-6"
                    style={{
                      borderColor: 'rgba(34, 211, 238, 0.24)',
                      background: 'linear-gradient(160deg, rgba(20, 36, 56, 0.66) 0%, rgba(10, 20, 34, 0.82) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 26px rgba(0, 0, 0, 0.24)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ background: EXPERTISE_ICON_BG, border: EXPERTISE_ICON_BORDER }}>
                        <svg className="w-8 h-8" style={{ color: EXPERTISE_ICON_COLOR }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {item.pathDs.map((d) => (
                            <path key={d} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
                          ))}
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: '#FAFAFA' }}>{item.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How to Hire Section - 4 Steps */}
          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0F14' }}>
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
                {hireStepsData.map((step, i) => (
                  <motion.div
                    key={step.title}
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                  >
                    <div className="relative inline-block mb-6">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={STEP_CIRCLE_STYLE}>
                        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={STEP_NUM_BG}>
                          <span className="text-2xl font-bold text-white">{i + 1}</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Hire CUDA Engineers Section - 6 Cards with Images */}
          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(34, 211, 238, 0.05)' }}>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
                {whyHireCardsData.map((card, i) => (
                  <motion.div
                    key={card.title}
                    className="h-full rounded-2xl overflow-hidden group border transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: 'linear-gradient(160deg, rgba(18, 30, 46, 0.72) 0%, rgba(10, 20, 34, 0.84) 100%)',
                      borderColor: 'rgba(34, 211, 238, 0.24)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 12px 30px rgba(0, 0, 0, 0.24)',
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                  >
                    <div className="relative w-full overflow-hidden" style={{ height: '220px' }}>
                      <img
                        src={card.src}
                        alt={card.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ ...WHY_HIRE_CARD_IMG_STYLE, ...card.imageStyle }}
                      />
                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(11, 15, 20, 0.08) 0%, rgba(11, 15, 20, 0.42) 100%)' }} />
                    </div>
                    <div className="p-8 sm:p-9 border-t" style={{ borderColor: 'rgba(34, 211, 238, 0.18)' }}>
                      <h3 className="text-xl font-bold mb-3 leading-tight" style={{ color: '#FAFAFA' }}>{card.title}</h3>
                      <p className="text-sm leading-7" style={{ color: '#9E9E9E' }}>{card.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Our Engagement Models Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0F14' }}>
            <div className="max-w-7xl mx-auto">
              {/* Section Heading */}
              <motion.div
                className="mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#22D3EE' }}>
                  Flexible Hiring Models
                </h2>
                <p className="text-lg max-w-3xl mx-auto" style={{ color: '#9E9E9E' }}>
                  To achieve your performance goals and the scope of developing CUDA, use the appropriate engagement model.
                </p>
              </motion.div>

              {/* 4 Cards Grid - 2x2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {engagementModelsData.map((model, i) => (
                  <motion.div
                    key={model.title}
                    className="rounded-2xl p-8 min-h-[230px] border"
                    style={{
                      background: 'linear-gradient(160deg, rgba(20, 36, 56, 0.72) 0%, rgba(10, 20, 34, 0.82) 100%)',
                      borderColor: 'rgba(34, 211, 238, 0.24)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 26px rgba(0, 0, 0, 0.24)',
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                  >
                    <h3 className="text-3xl font-bold mb-4" style={{ color: '#FFFFFF' }}>{model.title}</h3>
                    <p className="text-base leading-relaxed" style={{ color: '#B0B0B0' }}>{model.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section with Background Image */}
          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0F14' }}>
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden border"
                style={{
                  minHeight: '360px',
                  borderColor: 'rgba(34, 211, 238, 0.24)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
                }}
              >
                <div className="absolute inset-0">
                  <img
                    src="/images/cuda-cta-bg.jpg.jpg"
                    alt="CUDA Background"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center center' }}
                  />
                </div>

                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, rgba(8, 14, 24, 0.9) 0%, rgba(8, 14, 24, 0.72) 45%, rgba(8, 14, 24, 0.48) 100%)'
                  }}
                />

                <div className="relative z-10 p-8 sm:p-10 lg:p-12 h-full flex items-center">
                  <div
                    className="max-w-2xl rounded-2xl p-6 sm:p-8 border"
                    style={{
                      background: 'rgba(8, 14, 24, 0.5)',
                      borderColor: 'rgba(34, 211, 238, 0.2)',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    <h2
                      className="text-3xl sm:text-4xl font-bold mb-5 leading-tight"
                      style={{
                        color: '#FFFFFF',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Ready to unleash the power of CUDA?
                    </h2>

                    <p className="text-base sm:text-lg mb-8 leading-relaxed" style={{ color: '#D1D5DB' }}>
                      Accelerate your compute workloads with production-grade CUDA engineering and performance-first architecture.
                    </p>

                    <a
                      href="/contact/"
                      className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
                        color: '#FFFFFF',
                        boxShadow: '0 10px 26px rgba(34, 211, 238, 0.35)',
                      }}
                    >
                      Take Charge
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Why Jashom Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0F14' }}>
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
                {whyChooseBenefitsData.map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                    className="group relative rounded-2xl p-8 border cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
                    style={BENEFIT_CARD_STYLE}
                  >
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300" style={BENEFIT_ICON_BOX_STYLE}>
                        {benefit.pathD ? (
                          <svg className="w-8 h-8" style={{ color: '#22D3EE' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.pathD} />
                          </svg>
                        ) : (
                          <Zap className="w-8 h-8" style={{ color: '#22D3EE' }} />
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>{benefit.title}</h3>
                      <p className="leading-relaxed" style={{ color: '#9E9E9E', lineHeight: 1.8 }}>{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Reviews Section - We Are Trusted By Businesses Across the Globe */}
          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(34, 211, 238, 0.05)' }}>
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
                        fill={star <= 4 ? '#22D3EE' : 'none'}
                        stroke={star === 5 ? '#22D3EE' : 'none'}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={star === 5 ? 2 : 0}
                          d={STAR_PATH_D}
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="text-2xl font-bold" style={{ color: '#FAFAFA' }}>4.8</span>
                </div>
                <div className="h-8 w-px" style={{ background: '#e0e0e0' }}></div>
                <div className="text-sm" style={{ color: '#9E9E9E' }}>
                  Powered by <span className="font-bold" style={{ color: '#22D3EE' }}>Clutch</span>
                </div>
              </motion.div>

              {/* 6 Review Cards - 3x2 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviewsData.map((review, i) => (
                  <motion.div
                    key={review.author}
                    className="rounded-xl p-6 border"
                    style={REVIEW_CARD_STYLE}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5" fill={star <= review.filledStars ? '#22D3EE' : 'none'} stroke={star > review.filledStars ? '#22D3EE' : 'none'} strokeWidth={2} viewBox="0 0 24 24">
                          <path d={STAR_PATH_D} />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#9E9E9E' }}>{review.quote}</p>
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-sm" style={{ color: '#FAFAFA' }}>{review.author}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          {/* Related Services Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(34, 211, 238, 0.05)' }}>
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#22D3EE' }}>
                  Explore Related GPU Services
                </h2>
                <p className="text-lg text-center mx-auto" style={{ color: '#B0B0B0' }}>
                  Want to hire best CUDA developer experts? Browse some other complimentary GPU oriented services that can make the system even more performance-efficient and scalable.
                </p>
              </motion.div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

                {relatedServicesData.map((service, i) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                    className="rounded-2xl p-8 transition-all duration-300 hover:scale-105"
                    style={RELATED_SERVICE_CARD_STYLE}
                  >
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

          {/* Q&A / FAQ Section - Home page style, border retained on items */}
          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0F14' }}>
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
                  style={BADGE_FAQ}
                >
                  <span style={{ color: '#22D3EE', fontWeight: 600, fontSize: '0.875rem' }}>FAQs</span>
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
                {faqData.map((item, i) => (
                  <motion.div
                    key={item.q}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                    className="rounded-2xl border overflow-hidden"
                    style={FAQ_ITEM_STYLE}
                  >
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

          {/* Contact Form Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(34, 211, 238, 0.05)' }}>
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

                {/* Right Column - Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="rounded-2xl p-8 border"
                  style={{
                    background: '#111827',
                    borderColor: 'rgba(34, 211, 238, 0.3)'
                  }}
                >
                  <form onSubmit={handleSubmit}>
                    {/* 2-Column Grid for Name, Email, Phone, Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '28px', marginBottom: '28px' }}>
                      {/* Name */}
                      <div>
                        <label htmlFor="hire-fullName" className="block text-sm font-semibold mb-2" style={{ color: '#FAFAFA' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="hire-fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                          style={HIRE_FORM_INPUT_STYLE}
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
                          style={HIRE_FORM_INPUT_STYLE}
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
                          style={HIRE_FORM_INPUT_STYLE}
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
                          style={HIRE_FORM_INPUT_STYLE}
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
                        value={formData.hiringModel}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        style={HIRE_FORM_INPUT_STYLE}
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
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                        style={HIRE_FORM_INPUT_STYLE}
                        placeholder="Tell us about your project, timeline, and specific CUDA expertise needed..."
                      />
                    </div>

                    {hireSubmitError && (
                      <p className="text-sm mb-4" style={{ color: '#fca5a5' }} role="alert">
                        {hireSubmitError}
                      </p>
                    )}

                    {/* Submit Button - Full Width */}
                    <button
                      type="submit"
                      disabled={hireSubmitting}
                      className="w-full px-8 py-4 rounded-lg font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, #22D3EE, #06B6D4)',
                        color: '#FFFFFF',
                        boxShadow: '0 8px 24px rgba(34, 211, 238, 0.4)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #06B6D4, #06B6D4)';
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(34, 211, 238, 0.6)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #22D3EE, #06B6D4)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 211, 238, 0.4)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {hireSubmitting ? 'Submitting…' : 'Submit Request'}
                    </button>

                    <p className="text-xs text-center mt-4" style={{ color: '#999999' }}>
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                  </form>
                </motion.div>

              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
