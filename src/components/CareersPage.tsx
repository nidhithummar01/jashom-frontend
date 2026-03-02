import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from './SEO';
import { Briefcase, Users, TrendingUp, Heart, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface JobOpening {
  id: number;
  title: string;
  openings: number;
  description: string;
  postedDays: number;
  location?: string;
  type?: string;
}

const jobOpenings: JobOpening[] = [
  {
    id: 1,
    title: 'Account Executive',
    openings: 1,
    description: 'We are seeking trustworthy candidates who work efficiently without sacrificing accuracy. Accountants can expect to work with multiple tasks with deadlines and provide transparent and complete reports to management. The ideal candidates will be innovative enough to suggest tailored solutions to common account problems.',
    postedDays: 3,
    location: 'Remote',
    type: 'Full-time'
  },
  {
    id: 2,
    title: 'iPhone App Developer',
    openings: 5,
    description: 'Are you iOS geek!! Sounds familiar with Mac system and iOS development. Looking for challenging work, Career Growth and Personal growth as well!! Here is the great Opportunity knocking the door of success, open the door and grab it with Feel at Home and friendly work environment. Well we here to hear you!! Together with our development...',
    postedDays: 5,
    location: 'Remote / Hybrid',
    type: 'Full-time'
  }
];

export function CareersPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    resume: '',
    coverLetter: ''
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
    <div className="min-h-screen" style={{ background: '#0B0F14' }}>
      <SEO
        title="Careers at Jashom | Join Our Team"
        description="Join the team to create digital products that the world has never seen before! Explore career opportunities at Jashom."
        keywords="careers, jobs, AI jobs, CUDA developer jobs, software engineer jobs, remote jobs"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden w-full"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          maxWidth: '100vw'
        }}
      >
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full"
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'brightness(1.1)',
              minWidth: '100%',
              minHeight: '100%'
            }}
          >
            <source src="/videos/carrer.hero.mp4" type="video/mp4" />
          </video>
          
          {/* Overlay for better text readability */}
          <div 
            className="absolute inset-0" 
            style={{ 
              background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.3) 100%)'
            }}
          />
        </div>

        {/* Content positioned at bottom - Matching About Us Style */}
        <div className="relative z-10 flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
              style={{ maxWidth: '620px' }}
            >
              <h1 
                className="font-bold text-white leading-tight" 
                style={{ 
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
                  letterSpacing: '-0.02em',
                  marginBottom: '32px',
                  fontWeight: '700'
                }}
              >
                Find your big role In our purposeful team
              </h1>
              
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
                Join the team to create digital products that the world has never seen before. We're building the future of AI and GPU computing.
              </p>

              {/* CTA Button */}
              <Link
                to="/careers/openings"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:scale-105 cursor-pointer"
                style={{
                  background: '#10B981',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.4)'
                }}
              >
                Join Our Team
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0F14' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#FAFAFA' }}>
              Why Join <span style={{ color: '#10B981' }}>Jashom</span>?
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#9E9E9E' }}>
              We're building the future of AI and GPU computing, and we want you to be part of it
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)]">
                <Users className="w-8 h-8 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#FAFAFA' }}>Great Team</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                Work with talented professionals who are passionate about innovation
              </p>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)]">
                <TrendingUp className="w-8 h-8 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#FAFAFA' }}>Career Growth</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                Continuous learning opportunities and clear paths for advancement
              </p>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)]">
                <Heart className="w-8 h-8 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#FAFAFA' }}>Work-Life Balance</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                Flexible work arrangements and a supportive environment
              </p>
            </motion.div>

            {/* Benefit 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)]">
                <Briefcase className="w-8 h-8 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#FAFAFA' }}>Cutting-Edge Projects</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                Work on innovative AI and GPU optimization projects
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0F14' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#FAFAFA' }}>
              Current <span style={{ color: '#10B981' }}>Openings</span>
            </h2>
            <p className="text-lg" style={{ color: '#9E9E9E' }}>
              Explore opportunities to join our growing team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl p-8 border transition-all duration-300 hover:shadow-lg"
                style={{ background: 'transparent', borderColor: 'rgba(16, 185, 129, 0.3)' }}
              >
                {/* Job Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-3" style={{ color: '#FAFAFA' }}>
                      {job.title}
                    </h3>
                    <div className="inline-block px-3 py-1 rounded-full text-sm font-semibold" style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10B981'
                    }}>
                      {job.openings} {job.openings === 1 ? 'Opening' : 'Openings'}
                    </div>
                  </div>
                  <div className="text-right text-sm" style={{ color: '#999999' }}>
                    {job.postedDays} days ago
                  </div>
                </div>

                {/* Job Meta */}
                {(job.location || job.type) && (
                  <div className="flex flex-wrap gap-4 mb-6">
                    {job.location && (
                      <div className="flex items-center gap-2 text-sm" style={{ color: '#9E9E9E' }}>
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    )}
                    {job.type && (
                      <div className="flex items-center gap-2 text-sm" style={{ color: '#9E9E9E' }}>
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Job Description */}
                <div className="mb-8">
                  <p className="text-base leading-relaxed" style={{ color: '#9E9E9E' }}>
                    {job.description}
                  </p>
                </div>

                {/* Roles + Responsibilities */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#FAFAFA' }}>
                    Roles + Responsibilities:
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}>Design, develop, and maintain enterprise solutions using <strong>Sitecore XP and XM Cloud</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}>Work on <strong>headless architecture</strong> using <strong>Sitecore XM Cloud</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}>Develop front-end integrations using <strong>JSS (React / Next.js preferred)</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}>Implement Sitecore features such as: Content Management, Personalization, Search, Analytics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}>Handle <strong>Sitecore XP MVC-based implementations</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}>Participate in architecture discussions and solution design</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}>Perform Sitecore upgrades, migrations, and cloud deployments</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}>Collaborate with QA, DevOps, and UX teams for smooth delivery</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}>Ensure best practices for performance, security, and scalability</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}>Provide technical guidance and code reviews when required</span>
                    </li>
                  </ul>
                </div>

                {/* Good to Have */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#FAFAFA' }}>
                    Good to Have
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}>Experience with <strong>Next.js / React</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}>Familiarity with <strong>Sitecore Content Hub, Search, or Personalize</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}><strong>Azure</strong> cloud experience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}><strong>Sitecore Certifications (XP or XM Cloud)</strong></span>
                    </li>
                  </ul>
                </div>

                {/* What We Offer */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#FAFAFA' }}>
                    What We Offer
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}>Long-term engagement (Project-based or Permanent)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}>Remote-first culture</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}>Opportunity to work on <strong>global enterprise projects</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}>Exposure to the latest <strong>Sitecore XM Cloud & headless technologies</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#10B981' }}></span>
                      <span className="text-base" style={{ color: '#9E9E9E' }}>Flexible engagement model (Contract / Full-time)</span>
                    </li>
                  </ul>
                </div>

                {/* Apply Button */}
                <Link
                  to={`/careers/apply?role=${encodeURIComponent(job.title)}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white border-0 cursor-pointer transition-all duration-300 bg-gradient-to-br from-[#10B981] to-[#06B6D4] shadow-[0_8px_32px_rgba(16,185,129,0.4)] hover:from-[#059669] hover:to-[#0891B2] hover:shadow-[0_12px_48px_rgba(16,185,129,0.6)] hover:-translate-y-0.5"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply-form" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0F14' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column - Heading */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#FAFAFA' }}>
                Begin your journey with us!
              </h2>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl p-8 border"
              style={{ background: '#111827', borderColor: 'rgba(16, 185, 129, 0.3)' }}
            >
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#FAFAFA' }}>
                Ready to start?
              </h3>
              <p className="text-sm mb-6" style={{ color: '#9E9E9E' }}>
                If you are passionate and skilled, we'll get along very well :)
              </p>

              <form onSubmit={handleSubmit}>
                {/* 2-Column Grid for Name, Email, Phone, Position */}
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '28px', marginBottom: '28px' }}>
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold mb-2" style={{ color: '#FAFAFA' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                      style={{ 
                        background: '#1F2937', 
                        borderColor: 'rgba(16, 185, 129, 0.3)',
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
                        background: '#1F2937', 
                        borderColor: 'rgba(16, 185, 129, 0.3)',
                        color: '#FAFAFA'
                      }}
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2" style={{ color: '#FAFAFA' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                      style={{ 
                        background: '#1F2937', 
                        borderColor: 'rgba(16, 185, 129, 0.3)',
                        color: '#FAFAFA'
                      }}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label htmlFor="position" className="block text-sm font-semibold mb-2" style={{ color: '#FAFAFA' }}>
                      Position Applied For
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                      style={{ 
                        background: '#1F2937', 
                        borderColor: 'rgba(16, 185, 129, 0.3)',
                        color: '#FAFAFA'
                      }}
                      placeholder="e.g. Senior Developer"
                    />
                  </div>
                </div>

                {/* Resume Upload - Full Width */}
                <div style={{ marginBottom: '28px' }}>
                  <label htmlFor="resume" className="block text-sm font-semibold mb-2" style={{ color: '#FAFAFA' }}>
                    Resume/CV *
                  </label>
                  <label 
                    className="block w-full px-4 py-3 rounded-lg border cursor-pointer transition-all hover:border-orange-500"
                    style={{ 
                      background: '#1F2937', 
                      borderColor: 'rgba(16, 185, 129, 0.3)',
                      color: '#9E9E9E'
                    }}
                  >
                    <input type="file" name="resume" className="hidden" accept=".pdf,.doc,.docx" required />
                    <span>Choose File (Resume)</span>
                  </label>
                  <p className="text-xs mt-2" style={{ color: '#666666' }}>
                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>

                {/* Cover Letter - Full Width */}
                <div style={{ marginBottom: '28px' }}>
                  <label htmlFor="coverLetter" className="block text-sm font-semibold mb-2" style={{ color: '#FAFAFA' }}>
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                    style={{ 
                      background: '#1F2937', 
                      borderColor: 'rgba(16, 185, 129, 0.3)',
                      color: '#FAFAFA'
                    }}
                    placeholder="Tell us why you're a great fit for this role..."
                  />
                </div>

                {/* Submit Button - Full Width */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white border-0 cursor-pointer transition-all duration-300 bg-gradient-to-br from-[#10B981] to-[#06B6D4] shadow-[0_8px_32px_rgba(16,185,129,0.4)] hover:from-[#059669] hover:to-[#0891B2] hover:shadow-[0_12px_48px_rgba(16,185,129,0.6)] hover:-translate-y-0.5"
                >
                  <span>Submit Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-xs text-center mt-4" style={{ color: '#999999' }}>
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0F14' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#FAFAFA' }}>
              Don't see the right role?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#9E9E9E' }}>
              We're always looking for talented individuals. Send us your resume and let's talk about how you can contribute to our mission.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white border-0 cursor-pointer transition-all duration-300 bg-gradient-to-br from-[#10B981] to-[#06B6D4] shadow-[0_8px_32px_rgba(16,185,129,0.4)] hover:from-[#059669] hover:to-[#0891B2] hover:shadow-[0_12px_48px_rgba(16,185,129,0.6)] hover:-translate-y-0.5"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

