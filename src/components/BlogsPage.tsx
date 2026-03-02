import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SEO } from './SEO';
import { ArrowRight, Calendar } from 'lucide-react';
import { getBlogs } from '../api/blogs';
import type { Blog } from '../api/blogs';

function formatDate(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBlogs({ status: 'published' })
      .then(setBlogs)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#0B0F14' }}>
      <SEO
        title="Blog | Jashom - AI & GPU Optimization Expertise"
        description="Explore the latest blog posts, case studies, and news from Jashom. Stay informed about AI, GPU optimization, CUDA development, and enterprise technology trends."
        keywords="AI blog, GPU optimization, CUDA development, case studies, technology news, machine learning, enterprise AI"
      />

      {/* Hero Section - background image like other pages */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: '420px',
          backgroundImage: 'url(/images/blog.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(11, 15, 20, 0.88)' }}
        />
        <div
          className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8"
          style={{ paddingTop: '13rem', paddingBottom: '4rem' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              className="inline-block mb-6 px-4 py-2 rounded-full border border-[rgba(16,185,129,0.25)] bg-[rgba(16,185,129,0.08)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-[#10B981] font-semibold text-sm">Blog & Resources</span>
            </motion.div>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              style={{ color: '#FAFAFA', letterSpacing: '-0.025em', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              Latest <span style={{ color: '#10B981' }}>Blog</span> & Case Studies
            </h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: '#D1D5DB', lineHeight: 1.7 }}>
              Stay informed with the latest trends, best practices, and success stories in AI, GPU optimization, and enterprise technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid - from API (extra top spacing after hero) */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-16 text-center"
            style={{ color: '#10B981', letterSpacing: '-0.025em' }}
          >
            All Blogs
          </h2>
          {loading && (
            <div className="text-center py-20" style={{ color: '#9CA3AF' }}>
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-[#10B981] border-t-transparent mb-4" />
              <p>Loading blogs…</p>
            </div>
          )}
          {error && (
            <div className="text-center py-20" style={{ color: '#e57373' }}>
              Failed to load blogs: {error}
            </div>
          )}
          {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-20" style={{ color: '#9CA3AF' }}>
              No blogs yet.
            </div>
          )}
          {!loading && !error && blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`group relative overflow-hidden rounded-2xl ${
                    blog.is_featured ? 'md:col-span-2 lg:col-span-1' : ''
                  } ${index === 0 ? 'lg:row-span-2' : ''}`}
                >
                  <Link to={`/blogs/${blog.slug}/`} className="block h-full">
                    <div
                      className="relative h-full min-h-[320px] overflow-hidden transition-all duration-500 group-hover:scale-[1.02]"
                      style={{
                        background: '#1E293B',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      <div className="absolute inset-0">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                          style={{
                            backgroundImage: blog.featured_image_url ? `url(${blog.featured_image_url})` : 'none',
                            opacity: blog.featured_image_url ? 0.3 : 0
                          }}
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(180deg, #1E293B00 0%, #1E293B 100%)'
                          }}
                        />
                      </div>

                      <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
                        <div>
                          <div className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold" style={{
                            background: 'rgba(16, 185, 129, 0.15)',
                            color: '#10B981',
                            border: '1px solid rgba(16, 185, 129, 0.3)'
                          }}>
                            Blog
                          </div>

                          <h3 className="text-xl sm:text-2xl font-bold mb-3 transition-colors duration-240" style={{ color: '#FAFAFA', lineHeight: 1.3 }}>
                            {blog.title}
                          </h3>

                          <p className="text-sm sm:text-base mb-4" style={{ color: '#D1D5DB', lineHeight: 1.6 }}>
                            {blog.excerpt ?? ''}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: '#9CA3AF' }}>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(blog.published_at)}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-240" style={{ color: '#10B981' }}>
                            <span>Read more</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-240 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                        background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)'
                      }} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16 sm:mt-20"
          >
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[#FAFAFA] transition-all duration-240 border border-[rgba(16,185,129,0.35)] bg-[rgba(16,185,129,0.12)] hover:bg-[rgba(16,185,129,0.18)] hover:border-[rgba(16,185,129,0.5)] hover:-translate-y-0.5"
            >
              <span>Load More Blogs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.08) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#FAFAFA' }}>
                Stay Updated with Latest Blog
              </h2>
              <p className="text-lg mb-8" style={{ color: '#D1D5DB' }}>
                Get the latest AI, GPU optimization, and technology blog posts delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FAFAFA'
                  }}
                />
                <button
                  className="px-6 py-3 rounded-xl font-semibold whitespace-nowrap text-white bg-[#10B981] hover:bg-[#0284C7] hover:scale-105 transition-all duration-240"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0F14' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              className="inline-block mb-4 px-4 py-2 rounded-full border border-[rgba(16,185,129,0.25)] bg-[rgba(16,185,129,0.08)]"
            >
              <span className="text-[#10B981] font-semibold text-sm">GET IN TOUCH</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#FAFAFA', letterSpacing: '-0.025em' }}>
              Have a Question or Project in Mind?
            </h2>
            
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#9CA3AF', lineHeight: 1.7 }}>
              Let's discuss how we can help you leverage AI and GPU computing to transform your business. Our team is ready to answer your questions.
            </p>
            
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white border-0 cursor-pointer transition-all duration-300 bg-gradient-to-br from-[#10B981] to-[#06B6D4] shadow-[0_8px_32px_rgba(16,185,129,0.4)] hover:from-[#059669] hover:to-[#0891B2] hover:shadow-[0_12px_48px_rgba(16,185,129,0.6)] hover:-translate-y-0.5"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
