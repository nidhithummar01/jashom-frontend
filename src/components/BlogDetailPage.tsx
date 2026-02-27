import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from './SEO';
import { Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getBlogBySlug } from '../api/blogs';
import type { Blog, BlogContentSection } from '../api/blogs';

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function slugifyId(title: string, index: number): string {
  const base = title?.replace(/\s+/g, '-').toLowerCase() || `section-${index}`;
  return `${base}-${index}`;
}

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    getBlogBySlug(slug)
      .then((b) => {
        setBlog(b);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const sections: { id: string; title: string }[] =
    blog?.content_sections
      ?.map((s, i) => ({
        id: slugifyId(s.title ?? '', i),
        title: s.title ?? `Section ${i + 1}`,
      }))
      .filter((s) => s.title) ?? [];

  useEffect(() => {
    if (sections.length === 0) return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [blog?.id]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0B0F14' }}>
        <div className="text-center" style={{ color: '#9CA3AF' }}>
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-[#10B981] border-t-transparent mb-4" />
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-32" style={{ background: '#0B0F14' }}>
        <div className="text-center" style={{ color: '#e57373' }}>
          <p>Failed to load blog: {error}</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-32" style={{ background: '#0B0F14' }}>
        <div className="text-center" style={{ color: '#9CA3AF' }}>
          <p>Blog not found.</p>
        </div>
      </div>
    );
  }

  const heroImage = blog.featured_image_url ?? '/images/service-hero-bg.jpg';

  return (
    <div className="min-h-screen" style={{ background: '#0B0F14' }}>
      <SEO
        title={`${blog.title} | Jashom Blog`}
        description={blog.excerpt ?? blog.title}
        keywords={blog.tags ?? 'blog'}
      />

      {/* Hero - padding so content starts below fixed navbar */}
      <section
        className="relative pt-52 pb-20 px-4 sm:px-6 lg:px-8 blog-detail-hero"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '420px',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'rgba(11, 15, 20, 0.85)' }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#10B981',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              Blog
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ color: '#FFFFFF' }}
          >
            {blog.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 leading-relaxed"
            style={{ color: '#D1D5DB' }}
          >
            {blog.excerpt || ''}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-6"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" style={{ color: '#9CA3AF' }} />
              <span style={{ color: '#9CA3AF' }}>{formatDate(blog.published_at)}</span>
            </div>
            {blog.author_name && (
              <span style={{ color: '#9CA3AF' }}>{blog.author_name}</span>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8"
            >
              <article style={{ color: '#D1D5DB' }}>
                {(blog.content_sections || []).map((sec: BlogContentSection, i: number) => (
                  <BlogSection key={i} section={sec} index={i} slugifyId={slugifyId} />
                ))}
              </article>
            </motion.div>

            {sections.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden lg:block lg:col-span-4"
              >
                <div style={{ position: 'sticky', top: '120px' }}>
                  <div
                    style={{
                      background: 'rgba(17, 24, 39, 0.6)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      borderRadius: '16px',
                      padding: '24px',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <h3
                      style={{
                        color: '#FFFFFF',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        marginBottom: '20px',
                        paddingBottom: '12px',
                        borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
                      }}
                    >
                      Table of Contents
                    </h3>
                    <nav>
                      {sections.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          style={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'left',
                            padding: '10px 16px',
                            marginBottom: '8px',
                            borderRadius: '8px',
                            border: 'none',
                            background: activeSection === item.id ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                            color: activeSection === item.id ? '#10B981' : '#9CA3AF',
                            fontSize: '0.9375rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            borderLeft: activeSection === item.id ? '3px solid #10B981' : '3px solid transparent',
                          }}
                          onMouseEnter={(e) => {
                            if (activeSection !== item.id) {
                              e.currentTarget.style.background = 'rgba(16, 185, 129, 0.05)';
                              e.currentTarget.style.color = '#D1D5DB';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (activeSection !== item.id) {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = '#9CA3AF';
                            }
                          }}
                        >
                          {item.title}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-12 text-center border"
            style={{
              background: 'rgba(16, 185, 129, 0.05)',
              borderColor: 'rgba(16, 185, 129, 0.2)',
            }}
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Ready to Accelerate Your AI Projects?
            </h2>
            <p className="text-lg mb-8" style={{ color: '#9CA3AF' }}>
              Let's discuss how GPU optimization can transform your machine learning workflows.
            </p>
            <Link
              to="/contact/"
              className="inline-block px-8 py-4 rounded-xl font-semibold text-lg transition-all"
              style={{
                background: 'linear-gradient(135deg, #10B981 0%, #10B981 100%)',
                color: '#000000',
              }}
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        /* Hero: min height + extra top space so content sits below navbar */
        .blog-detail-hero { min-height: 420px; padding-top: 13rem; }
        @media (max-width: 768px) { .blog-detail-hero { min-height: 360px; padding-top: 11rem; } }
        /* Section images: fixed width and height for all blog images from backend */
        .blog-detail-img {
          width: 560px;
          max-width: 100%;
          height: 360px;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.2);
          display: block;
        }
        @media (max-width: 768px) {
          .blog-detail-img { width: 100%; height: 260px; }
        }
        .blog-section-content h2 { color: #FFFFFF; font-size: 2.25rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; padding-left: 20px; border-left: 4px solid #10B981; }
        .blog-section-content h3 { color: #FFFFFF; font-size: 1.75rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; }
        .blog-section-content p { color: #D1D5DB; line-height: 1.8; margin-bottom: 1.25rem; font-size: 1.0625rem; }
        .blog-section-content ul { list-style-type: disc; padding-left: 2rem; margin-bottom: 1.25rem; }
        .blog-section-content li { color: #D1D5DB; margin-bottom: 0.5rem; line-height: 1.8; }
        .blog-section-content strong { color: #10B981; font-weight: 600; }
      `}</style>
    </div>
  );
}

function BlogSection({
  section,
  index,
  slugifyId,
}: {
  section: BlogContentSection;
  index: number;
  slugifyId: (title: string, i: number) => string;
}) {
  const id = slugifyId(section.title || '', index);
  const hasImages = section.images && section.images.length > 0;

  return (
    <div id={id} className="mb-16">
      {index > 0 && (
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(16, 185, 129, 0.3), transparent)', margin: '60px 0 40px' }} />
      )}
      {section.title && (
        <h2
          style={{
            color: '#FFFFFF',
            fontSize: '2.25rem',
            fontWeight: 700,
            marginBottom: '24px',
            paddingLeft: '20px',
            borderLeft: '4px solid #10B981',
          }}
        >
          {section.title}
        </h2>
      )}
      <div className={hasImages ? 'grid grid-cols-1 md:grid-cols-2 gap-8 items-start' : ''}>
        <div className={hasImages ? '' : ''}>
          {section.content && (
            <div
              className="blog-section-content"
              dangerouslySetInnerHTML={{ __html: section.content }}
              style={{ lineHeight: 1.8, color: '#D1D5DB' }}
            />
          )}
        </div>
        {hasImages && (
          <div className="space-y-4 blog-detail-section-images">
            {section.images!.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={img.alt || ''}
                className="blog-detail-img"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
