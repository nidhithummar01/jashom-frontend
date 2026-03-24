import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { SEO as Seo } from './SEO';
import { Calendar, User, Share2, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getBlogBySlug, getBlogs } from '../api/blogs';
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
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('');
  const pageBackground =
    'radial-gradient(1200px 560px at 14% 0%, rgba(34, 211, 238, 0.12) 0%, rgba(11, 15, 20, 1) 56%, rgba(11, 15, 20, 1) 100%)';

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

  useEffect(() => {
    if (!blog?.slug) return;
    getBlogs({ status: 'published', limit: 5 })
      .then((list) => setRelatedBlogs(list.filter((b) => b.slug !== blog.slug).slice(0, 3)))
      .catch(() => setRelatedBlogs([]));
  }, [blog?.slug]);

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
      <div className="min-h-screen flex items-center justify-center" style={{ background: pageBackground }}>
        <div className="text-center" style={{ color: '#9CA3AF' }}>
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-[#22D3EE] border-t-transparent mb-4" />
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-32" style={{ background: pageBackground }}>
        <div className="text-center" style={{ color: '#e57373' }}>
          <p>Failed to load blog: {error}</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-32" style={{ background: pageBackground }}>
        <div className="text-center" style={{ color: '#9CA3AF' }}>
          <p>Blog not found.</p>
        </div>
      </div>
    );
  }

  const heroImage = blog.featured_image_url ?? '/images/service-hero-bg.jpg';

  return (
    <div className="min-h-screen" style={{ background: pageBackground }}>
      <Seo
        title={`${blog.title} | Jashom Blog`}
        description={blog.excerpt ?? blog.title}
        keywords={blog.tags ?? 'blog'}
      />

      {/* Hero - padding so content starts below fixed navbar */}
      <section
        className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pb-20 blog-detail-hero"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-10">
            <div className="mx-auto md:mx-0 w-full md:max-w-2xl text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <span
                  className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                  style={{
                    background: 'rgba(34, 211, 238, 0.1)',
                    color: '#22D3EE',
                    border: '1px solid rgba(34, 211, 238, 0.3)',
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
                {blog.excerpt ?? ''}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-6"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" style={{ color: '#9CA3AF' }} />
                  <span style={{ color: '#9CA3AF' }}>{formatDate(blog.published_at)}</span>
                </div>
                {blog.author_name && <span style={{ color: '#9CA3AF' }}>{blog.author_name}</span>}
              </motion.div>
            </div>

            <div className="relative w-full h-full min-h-[320px] md:min-h-[420px]">
              <img
                src={heroImage}
                alt={blog.title}
                className="w-full h-full object-cover rounded-2xl md:rounded-3xl"
                loading="eager"
              />
              {/* Helps keep left-side text readable when content overlaps on smaller screens */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, rgba(11, 15, 20, 0.85) 0%, rgba(11, 15, 20, 0.35) 45%, rgba(11, 15, 20, 0.05) 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="blog-detail-content-section">
        <div className="blog-detail-container">
          <div className="blog-detail-grid">
            {/* Main article */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="blog-detail-main"
            >
              <article className="blog-detail-article">
                {(blog.content_sections ?? []).map((sec: BlogContentSection, i: number) => (
                  <BlogSection
                    key={slugifyId(sec.title ?? 'section', i)}
                    section={sec}
                    index={i}
                    slugifyId={slugifyId}
                  />
                ))}
              </article>
            </motion.div>

            {/* Right sidebar - always visible on desktop */}
            <motion.aside
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="blog-detail-sidebar"
            >
              <div className="blog-detail-sidebar-sticky">
                {sections.length > 0 && (
                  <div className="blog-sidebar-card">
                    <h3 className="blog-sidebar-title">On this page</h3>
                    <nav className="blog-toc">
                      {sections.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => scrollToSection(item.id)}
                          className={`blog-toc-item ${activeSection === item.id ? 'blog-toc-item--active' : ''}`}
                        >
                          {item.title}
                        </button>
                      ))}
                    </nav>
                  </div>
                )}

                {blog.author_name && (
                  <div className="blog-sidebar-card">
                    <h3 className="blog-sidebar-title">Author</h3>
                    <div className="blog-author-card">
                      <div className="blog-author-avatar">
                        <User className="blog-author-icon" />
                      </div>
                      <span className="blog-author-name">{blog.author_name}</span>
                    </div>
                  </div>
                )}

                <div className="blog-sidebar-card">
                  <h3 className="blog-sidebar-title">Share</h3>
                  <div className="blog-share-buttons">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-share-btn"
                      aria-label="Share on X"
                    >
                      <Share2 className="blog-share-icon" />
                      <span>X / Twitter</span>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-share-btn"
                      aria-label="Share on LinkedIn"
                    >
                      <Share2 className="blog-share-icon" />
                      <span>LinkedIn</span>
                    </a>
                    <button
                      type="button"
                      className="blog-share-btn"
                      onClick={() => {
                        if (typeof navigator !== 'undefined' && navigator.clipboard) {
                          navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '');
                        }
                      }}
                      aria-label="Copy link"
                    >
                      <Share2 className="blog-share-icon" />
                      <span>Copy link</span>
                    </button>
                  </div>
                </div>

                {relatedBlogs.length > 0 && (
                  <div className="blog-sidebar-card">
                    <h3 className="blog-sidebar-title">Related reads</h3>
                    <ul className="blog-related-list">
                      {relatedBlogs.map((b) => (
                        <li key={b.id}>
                          <Link to={`/blogs/${b.slug}`} className="blog-related-link">
                            <span className="blog-related-title">{b.title}</span>
                            <ArrowRight className="blog-related-arrow" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link to="/blogs/" className="blog-sidebar-all">
                      View all posts
                    </Link>
                  </div>
                )}

                <div className="blog-sidebar-card blog-sidebar-cta">
                  <p className="blog-sidebar-cta-text">Need help with AI or GPU acceleration?</p>
                  <Link to="/contact/" className="blog-sidebar-cta-btn">
                    Get in touch
                  </Link>
                </div>
              </div>
            </motion.aside>
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
              background: 'rgba(34, 211, 238, 0.05)',
              borderColor: 'rgba(34, 211, 238, 0.2)',
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
                background: 'linear-gradient(135deg, #22D3EE 0%, #22D3EE 100%)',
                color: '#000000',
              }}
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        .blog-detail-hero { min-height: 420px; padding-top: 13rem; }
        @media (max-width: 768px) { .blog-detail-hero { min-height: 360px; padding-top: 11rem; } }

        .blog-detail-content-section {
          position: relative;
          padding-top: 5rem;
          padding-bottom: 5rem;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.16) 0%, rgba(11, 15, 20, 0) 100%);
        }
        .blog-detail-container { max-width: 1600px; margin: 0 auto; padding: 0 1.5rem; }
        @media (min-width: 1024px) {
          .blog-detail-grid { display: grid; grid-template-columns: 1fr; gap: 0; align-items: start; }
        }
        .blog-detail-main { min-width: 0; width: 100%; }
        .blog-detail-article { color: #D1D5DB; width: 100%; max-width: none; }

        .blog-detail-sidebar { display: none; }

        .blog-sidebar-card {
          background: rgba(17, 24, 39, 0.7);
          border: 1px solid rgba(75, 85, 99, 0.4);
          border-radius: 14px;
          padding: 1.35rem 1.25rem;
          margin-bottom: 1.25rem;
          backdrop-filter: blur(8px);
        }
        .blog-sidebar-title {
          color: #fff;
          font-size: 0.8125rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0 0 1rem 0;
          padding-bottom: 0.65rem;
          border-bottom: 1px solid rgba(34, 211, 238, 0.25);
        }
        .blog-toc { display: flex; flex-direction: column; gap: 0.25rem; }
        .blog-toc-item {
          display: block;
          width: 100%;
          text-align: left;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: #9CA3AF;
          font-size: 0.9375rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          border-left: 3px solid transparent;
        }
        .blog-toc-item:hover { background: rgba(34, 211, 238, 0.08); color: #D1D5DB; }
        .blog-toc-item--active { background: rgba(34, 211, 238, 0.12); color: #22D3EE; border-left-color: #22D3EE; }

        .blog-author-card { display: flex; align-items: center; gap: 0.75rem; }
        .blog-author-avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(34, 211, 238, 0.2);
          display: flex; align-items: center; justify-content: center;
        }
        .blog-author-icon { width: 22px; height: 22px; color: #22D3EE; }
        .blog-author-name { color: #E5E7EB; font-weight: 500; font-size: 0.9375rem; }

        .blog-share-buttons { display: flex; flex-direction: column; gap: 0.5rem; }
        .blog-share-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          background: rgba(55, 65, 81, 0.5);
          color: #D1D5DB;
          font-size: 0.875rem;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .blog-share-btn:hover { background: rgba(34, 211, 238, 0.15); color: #22D3EE; }
        .blog-share-icon { width: 16px; height: 16px; flex-shrink: 0; }

        .blog-related-list { list-style: none; margin: 0; padding: 0; }
        .blog-related-list li { margin-bottom: 0.5rem; }
        .blog-related-link {
          display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
          padding: 0.6rem 0.75rem;
          border-radius: 8px;
          color: #D1D5DB;
          text-decoration: none;
          font-size: 0.9375rem;
          transition: background 0.2s, color 0.2s;
        }
        .blog-related-link:hover { background: rgba(34, 211, 238, 0.08); color: #22D3EE; }
        .blog-related-title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .blog-related-arrow { width: 16px; height: 16px; flex-shrink: 0; color: #22D3EE; }
        .blog-sidebar-all {
          display: inline-block; margin-top: 0.75rem;
          font-size: 0.875rem; color: #22D3EE; text-decoration: none;
          font-weight: 500;
        }
        .blog-sidebar-all:hover { text-decoration: underline; }

        .blog-sidebar-cta {
          background: linear-gradient(135deg, rgba(34, 211, 238, 0.12) 0%, rgba(34, 211, 238, 0.06) 100%);
          border-color: rgba(34, 211, 238, 0.3);
        }
        .blog-sidebar-cta-text { color: #D1D5DB; font-size: 0.9375rem; margin: 0 0 0.75rem 0; line-height: 1.5; }
        .blog-sidebar-cta-btn {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          background: #22D3EE;
          color: #000;
          font-size: 0.875rem; font-weight: 600;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
        }
        .blog-sidebar-cta-btn:hover { opacity: 0.9; transform: translateY(-1px); }

        .blog-detail-section-images { margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        /* API/admin images: full-width large square (1080×1080 / 1400×1400), no column squeeze */
        .blog-detail-img {
          display: block;
          width: 100%;
          min-width: 400px;
          max-width: 1080px;
          height: auto;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(34, 211, 238, 0.2);
        }
        @media (min-width: 900px) { .blog-detail-img { max-width: 1200px; } }
        @media (min-width: 1200px) { .blog-detail-img { max-width: 1400px; } }
        .blog-section-shell {
          width: 100%;
          background: linear-gradient(180deg, rgba(17, 24, 39, 0.62) 0%, rgba(15, 23, 42, 0.5) 100%);
          border: 1px solid rgba(34, 211, 238, 0.16);
          border-radius: 18px;
          padding: 1.35rem 1.2rem;
          box-shadow: 0 14px 38px rgba(0, 0, 0, 0.22);
        }
        @media (min-width: 768px) { .blog-section-shell { padding: 1.8rem 1.6rem; } }
        .blog-section-content { margin-top: 0.5rem; }
        .blog-section-content h2 { color: #FFFFFF; font-size: 2.25rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; padding-left: 20px; border-left: 4px solid #22D3EE; }
        .blog-section-content h3 { color: #FFFFFF; font-size: 1.75rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; }
        .blog-section-content p { color: #D1D5DB; line-height: 1.8; margin-bottom: 1.25rem; font-size: 1.0625rem; }
        .blog-section-content ul { list-style-type: disc; padding-left: 2rem; margin-bottom: 1.25rem; }
        .blog-section-content li { color: #D1D5DB; margin-bottom: 0.5rem; line-height: 1.8; }
        article .blog-section-content strong,
        article .blog-section-content b,
        .blog-section-content strong,
        .blog-section-content b,
        .blog-section-content span[style*="font-weight: bold"],
        .blog-section-content span[style*="font-weight:bold"] { color: #FFFFFF !important; font-weight: 600 !important; }
      `}</style>
    </div>
  );
}

type BlogSectionProps = Readonly<{
  section: BlogContentSection;
  index: number;
  slugifyId: (title: string, i: number) => string;
}>;

function BlogSection({
  section,
  index,
  slugifyId,
}: BlogSectionProps) {
  const id = slugifyId(section.title ?? '', index);
  const hasImages = !!section.images && section.images.length > 0;

  return (
    <div id={id} className="mb-16">
      {index > 0 && (
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(34, 211, 238, 0.3), transparent)', margin: '60px 0 40px' }} />
      )}
      <div className="blog-section-shell">
        {section.title && (
          <h2
            style={{
              color: '#FFFFFF',
              fontSize: '2.25rem',
              fontWeight: 700,
              marginBottom: '24px',
              paddingLeft: '20px',
              borderLeft: '4px solid #22D3EE',
            }}
          >
            {section.title}
          </h2>
        )}
        <div className={hasImages ? 'blog-section-with-images' : ''}>
          {section.content && (
            <div
              className="blog-section-content"
              dangerouslySetInnerHTML={{ __html: section.content }}
              style={{ lineHeight: 1.8, color: '#D1D5DB' }}
            />
          )}
          {hasImages && section.images && (
            <div className="blog-detail-section-images">
              {section.images.map((img) => (
                <img
                  key={`${img.url}-${img.alt ?? ''}`}
                  src={img.url}
                  alt={img.alt ?? ''}
                  className="blog-detail-img"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
