import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SEO as Seo } from './SEO';
import { useState } from 'react';
import { careers, getAllDepartments } from '../data/careersData';
import { MapPin, Clock, Users, ArrowRight } from 'lucide-react';

export function CareerListingPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const departments = getAllDepartments();

  const filteredCareers = selectedDepartment === 'All' 
    ? careers 
    : careers.filter(career => career.department === selectedDepartment);

  return (
    <div className="min-h-screen" style={{ background: '#000000' }}>
      <Seo
        title="Job Openings at Jashom | Explore Opportunities"
        description="Explore current job openings at Jashom. Join our team of innovators building the future of AI and GPU computing."
        keywords="job openings, careers, AI jobs, CUDA developer jobs, machine learning jobs, remote jobs"
      />

      {/* Hero Section */}
      <section 
        className="relative px-4 sm:px-6 lg:px-8 overflow-hidden" 
        style={{ 
          minHeight: '500px', 
          paddingTop: '160px', 
          paddingBottom: '80px'
        }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/carrer.listing.hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: '60% center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Lighter gradient overlay - fades from left to right */}
          <div 
            className="absolute inset-0" 
            style={{ 
              background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.1) 70%, transparent 100%)'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6" 
              style={{ 
                color: '#FAFAFA', 
                letterSpacing: '-0.025em',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
              }}
            >
              A Sneak Peek Into Our <span style={{ color: '#10B981' }}>Opportunities</span> That Help Us Power Innovation
            </h1>
            
            <p 
              className="text-lg sm:text-xl max-w-xl" 
              style={{ 
                color: '#E5E7EB', 
                lineHeight: 1.7,
                textShadow: '0 1px 5px rgba(0, 0, 0, 0.3)'
              }}
            >
              Get the latest updates about career opportunities with an expert perspective on AI, GPU computing, and digital innovation. Find out how new roles and fresh ideas shape industry changes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0F14' }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-block mb-4 px-4 py-2 rounded-full border"
              style={{
                background: 'rgba(16, 185, 129, 0.08)',
                borderColor: 'rgba(16, 185, 129, 0.25)'
              }}
            >
              <span style={{ color: '#10B981', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.05em' }}>
                BENEFITS
              </span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: '#FAFAFA', letterSpacing: '-0.025em' }}>
              Perks of being a <span style={{ color: '#10B981' }}>Jashomian</span>
            </h2>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefit 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl p-8 border transition-all duration-300 hover:border-teal-500/50"
              style={{
                background: 'rgba(17, 24, 39, 0.4)',
                borderColor: 'rgba(16, 185, 129, 0.2)'
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>
                    FAST GROWING COMPANY
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: '#9CA3AF' }}>
                    With our increasing growth and expansion every day, you can be an integral part of the progress.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl p-8 border transition-all duration-300 hover:border-teal-500/50"
              style={{
                background: 'rgba(17, 24, 39, 0.4)',
                borderColor: 'rgba(16, 185, 129, 0.2)'
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>
                    WORK WITH INDEPENDENCE
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: '#9CA3AF' }}>
                    We give you the space and the freedom to implement your skills and expertise with trust and faith.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl p-8 border transition-all duration-300 hover:border-teal-500/50"
              style={{
                background: 'rgba(17, 24, 39, 0.4)',
                borderColor: 'rgba(16, 185, 129, 0.2)'
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>
                    CROSS DOMAIN EXPERTISE
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: '#9CA3AF' }}>
                    You will get to sharpen your skills and pick up new ones while working with a team of experts from multiple domains.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Benefit 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl p-8 border transition-all duration-300 hover:border-teal-500/50"
              style={{
                background: 'rgba(17, 24, 39, 0.4)',
                borderColor: 'rgba(16, 185, 129, 0.2)'
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#FAFAFA' }}>
                    FUN WORK ENVIRONMENT
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: '#9CA3AF' }}>
                    We believe work-life balance should always be good. The culture here is fun with a healthy work week and recreation activities.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8" style={{ background: '#000000' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#FAFAFA' }}>
              Categories
            </h2>
            
            <div className="flex flex-wrap gap-3">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className="px-6 py-2.5 rounded-full font-medium transition-all duration-300"
                  style={{
                    background: selectedDepartment === dept ? '#0066FF' : 'transparent',
                    color: selectedDepartment === dept ? '#FFFFFF' : '#9CA3AF',
                    border: `1px solid ${selectedDepartment === dept ? '#0066FF' : 'rgba(156, 163, 175, 0.3)'}`,
                    cursor: 'pointer'
                  }}
                >
                  {dept}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Career Cards Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#000000' }}>
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {filteredCareers.map((career, index) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div
                  className="relative rounded-3xl overflow-hidden transition-all duration-500 border border-[rgba(16,185,129,0.15)] shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:border-[rgba(16,185,129,0.4)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.2)]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.6) 0%, rgba(11, 15, 20, 0.8) 100%)'
                  }}
                >
                  <div className="p-8 md:p-10">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span
                            className="px-4 py-1.5 rounded-full text-xs font-semibold"
                            style={{
                              background: 'rgba(16, 185, 129, 0.15)',
                              color: '#10B981',
                              border: '1px solid rgba(16, 185, 129, 0.3)'
                            }}
                          >
                            {career.department}
                          </span>
                          <span
                            className="px-4 py-1.5 rounded-full text-xs"
                            style={{
                              background: 'rgba(255, 255, 255, 0.05)',
                              color: '#9CA3AF'
                            }}
                          >
                            {career.postedDate}
                          </span>
                        </div>
                        
                        <h3
                          className="text-2xl md:text-3xl font-bold mb-3"
                          style={{ color: '#FAFAFA', lineHeight: 1.3 }}
                        >
                          {career.title}
                        </h3>
                        
                        <p
                          className="text-base mb-6"
                          style={{ color: '#D1D5DB', lineHeight: 1.7 }}
                        >
                          {career.description}
                        </p>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: '#9CA3AF' }}>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" style={{ color: '#10B981' }} />
                            <span>{career.location}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" style={{ color: '#10B981' }} />
                            <span>{career.type}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" style={{ color: '#10B981' }} />
                            <span>{career.openings} {career.openings === 1 ? 'Opening' : 'Openings'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Apply Button */}
                      <Link
                        to={`/careers/apply?role=${encodeURIComponent(career.title)}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap cursor-pointer border-0"
                        style={{
                          background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                          borderColor: 'transparent',
                          color: '#FFFFFF',
                          boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #059669, #0891B2)';
                          e.currentTarget.style.boxShadow = '0 12px 48px rgba(16, 185, 129, 0.6)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #10B981, #06B6D4)';
                          e.currentTarget.style.boxShadow = '0 8px 32px rgba(16, 185, 129, 0.4)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Divider */}
                    <div
                      style={{
                        height: '1px',
                        background: 'linear-gradient(to right, transparent, rgba(16, 185, 129, 0.3), transparent)',
                        margin: '32px 0'
                      }}
                    />

                    {/* Content Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Key Responsibilities */}
                      <div>
                        <h4
                          className="text-lg font-semibold mb-4"
                          style={{ color: '#10B981' }}
                        >
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-3">
                          {career.responsibilities.slice(0, 4).map((item) => (
                            <li
                              key={`${career.id}-resp-${item}`}
                              className="flex items-start gap-3 text-sm"
                              style={{ color: '#D1D5DB', lineHeight: 1.6 }}
                            >
                              <span
                                className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                                style={{ background: '#10B981' }}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Requirements */}
                      <div>
                        <h4
                          className="text-lg font-semibold mb-4"
                          style={{ color: '#10B981' }}
                        >
                          Requirements
                        </h4>
                        <ul className="space-y-3">
                          {career.requirements.slice(0, 4).map((item) => (
                            <li
                              key={`${career.id}-req-${item}`}
                              className="flex items-start gap-3 text-sm"
                              style={{ color: '#D1D5DB', lineHeight: 1.6 }}
                            >
                              <span
                                className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                                style={{ background: '#10B981' }}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4
                          className="text-lg font-semibold mb-4"
                          style={{ color: '#10B981' }}
                        >
                          Benefits
                        </h4>
                        <ul className="space-y-3">
                          {career.benefits.slice(0, 4).map((item) => (
                            <li
                              key={`${career.id}-benefit-${item}`}
                              className="flex items-start gap-3 text-sm"
                              style={{ color: '#D1D5DB', lineHeight: 1.6 }}
                            >
                              <span
                                className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                                style={{ background: '#10B981' }}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredCareers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl" style={{ color: '#9CA3AF' }}>
                No openings found in this department.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
