import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect, type CSSProperties } from 'react';
import { SEO as Seo } from './SEO';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { getBlogs } from '../api/blogs';
import type { Blog } from '../api/blogs';
import * as Theme from '../constants/theme';
import { homePageData, formatBlogDate } from './HomePage/data';

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
    <div className="min-h-screen" style={{ background: Theme.SECTION_BG }}>
      <Seo
        title="Blog | Jashom - AI & GPU Optimization Expertise"
        description="Explore the latest blog posts, case studies, and news from Jashom. Stay informed about AI, GPU optimization, CUDA development, and enterprise technology trends."
        keywords="AI blog, GPU optimization, CUDA development, case studies, technology news, machine learning, enterprise AI"
      />

      {/* Hero */}
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
        <div className="absolute inset-0" style={{ background: Theme.HERO_OVERLAY_GRADIENT }} />
        <div className="absolute inset-0" style={{ background: 'rgba(8, 14, 24, 0.72)' }} />
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-24 left-10 h-72 w-72 rounded-full bg-blue-500 mix-blend-multiply blur-3xl filter" />
          <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-purple-500 mix-blend-multiply blur-3xl filter" />
        </div>
        <div
          className={`${Theme.SECTION_CONTAINER} relative z-10 px-4 sm:px-6 lg:px-8`}
          style={{ paddingTop: '13rem', paddingBottom: '4rem' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              className="inline-block mb-6 px-4 py-2 rounded-full border"
              style={Theme.BADGE_STYLE}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span style={{ color: Theme.ACCENT_COLOR, fontWeight: 600, fontSize: '0.875rem' }}>Blogs</span>
            </motion.div>
            <h1
              className="font-bold mb-6"
              style={{
                color: Theme.TEXT_FAFAFA,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                fontSize: 'clamp(2.4rem, 4.2vw, 3.7rem)',
                textShadow: '0 2px 22px rgba(0,0,0,0.55)',
              }}
            >
              Latest <span style={{ color: Theme.ACCENT_COLOR }}>Blogs</span>
            </h1>
            <p className="text-base sm:text-lg max-w-3xl mx-auto" style={{ color: Theme.TEXT_MUTED, lineHeight: 1.8 }}>
              Stay informed with the latest trends, best practices, and success stories in AI, GPU optimization, and enterprise technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className={Theme.SECTION_CLASS} style={{ background: Theme.SECTION_BG }}>
        <div className={`${Theme.SECTION_CONTAINER} px-4 sm:px-6 lg:px-8`}>
          <motion.div {...Theme.MOTION_FADE_UP_20} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: Theme.TEXT_FAFAFA, letterSpacing: '-0.025em' }}>
              All articles
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base" style={{ color: Theme.TEXT_MUTED, lineHeight: 1.8 }}>
              Practical guidance, engineering insights, and case-study learnings from the Jashom team.
            </p>
          </motion.div>
          {loading && (
            <div className="text-center py-20" style={{ color: '#9CA3AF' }}>
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-[#22D3EE] border-t-transparent mb-4" />
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
                  }`}
                >
                  <Link
                    to={`/blogs/${blog.slug}/`}
                    className="block h-full"
                    style={{ ['--accent' as string]: Theme.ACCENT_COLOR } as CSSProperties}
                  >
                    <div
                      className="relative h-full min-h-[320px] rounded-2xl overflow-hidden transition-all duration-500 group-hover:translate-y-[-2px] flex flex-col"
                      style={{
                        background: blog.featured_image_url ? undefined : homePageData.BLOG_CARD_BG,
                        border: homePageData.BLOG_CARD_BORDER,
                        ...(blog.featured_image_url
                          ? {
                              backgroundImage: `url(${blog.featured_image_url})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }
                          : {}),
                      }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background: blog.featured_image_url
                            ? 'linear-gradient(180deg, rgba(11, 15, 20, 0.7) 0%, rgba(11, 15, 20, 0.88) 50%, rgba(11, 15, 20, 0.96) 100%)'
                            : 'none',
                        }}
                      />

                      <div className="absolute top-4 left-4 z-10">
                        <div
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            ...homePageData.BLOG_BADGE_STYLE,
                            border: '1px solid rgba(34, 211, 238, 0.22)',
                            background: 'rgba(8, 14, 24, 0.55)',
                          }}
                        >
                          Insight
                        </div>
                      </div>

                      <div className="relative z-10 flex flex-col flex-1 justify-between p-6 sm:p-8 pt-14">
                        <div>
                          <h3
                            className="text-xl sm:text-2xl font-bold mb-3 line-clamp-3 transition-colors duration-240 group-hover:text-[var(--accent)]"
                            style={{ color: Theme.TEXT_FAFAFA, lineHeight: 1.3 }}
                          >
                            {blog.title}
                          </h3>

                          <p className="text-sm sm:text-base mb-4 line-clamp-3" style={{ color: Theme.TEXT_MUTED, lineHeight: 1.6 }}>
                            {blog.excerpt ?? ''}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: Theme.TEXT_SUBTLE }}>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{formatBlogDate(blog.published_at)}</span>
                            </div>
                            {typeof blog.reading_time_minutes === 'number' ? (
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{blog.reading_time_minutes} min read</span>
                              </div>
                            ) : null}
                          </div>

                          <div
                            className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-240"
                            style={{ color: Theme.ACCENT_COLOR }}
                          >
                            <span>Read more</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-240 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>

                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: 'linear-gradient(180deg, rgba(34, 211, 238, 0.05) 0%, rgba(34, 211, 238, 0.02) 100%)',
                        }}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          <motion.div {...Theme.MOTION_FADE_UP_20} className="text-center mt-16 sm:mt-20">
            <Link to="/contact/" className="ui-btn ui-btn--lg transition-all duration-300 hover:opacity-95" style={Theme.CTA_SIMPLE}>
              Subscribe / Collaborate <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={Theme.SECTION_CLASS} style={{ background: Theme.SECTION_BG }}>
        <div className={`${Theme.SECTION_CONTAINER} px-4 sm:px-6 lg:px-8`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              className="inline-block mb-4 px-4 py-2 rounded-full border"
              style={Theme.BADGE_STYLE}
            >
              <span style={{ color: Theme.ACCENT_COLOR, fontWeight: 600, fontSize: '0.875rem' }}>Get in touch</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: Theme.TEXT_FAFAFA, letterSpacing: '-0.025em' }}>
              Have a Question or Project in Mind?
            </h2>
            
            <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto" style={{ color: Theme.TEXT_MUTED, lineHeight: 1.8 }}>
              Let's discuss how we can help you leverage AI and GPU computing to transform your business. Our team is ready to answer your questions.
            </p>
            
            <Link
              to="/contact/"
              className="ui-btn ui-btn--lg transition-all duration-300 hover:opacity-95"
              style={Theme.CTA_SIMPLE}
            >
              <span>Contact Us</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
