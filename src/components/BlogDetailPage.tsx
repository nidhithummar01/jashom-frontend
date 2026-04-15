import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { SEO as Seo } from './SEO';
import { Calendar, Share2, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getBlogBySlug, getBlogs } from '../api/blogs';
import type { Blog, BlogContentSection } from '../api/blogs';
import * as Theme from '../constants/theme';
import { homePageData } from './HomePage/data';

/** Blog detail author line — static (not from API). */
const BLOG_PAGE_AUTHOR_NAME = 'Jay Dave';
/** Company LinkedIn (same as Footer social). */
const JASHOM_LINKEDIN_COMPANY_URL = 'https://www.linkedin.com/company/jashom/';

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function slugifyId(title: string, index: number): string {
  const base = title?.replace(/\s+/g, '-').toLowerCase() || `section-${index}`;
  return `${base}-${index}`;
}

function getInitials(name: string | null): string {
  if (!name) return 'JD';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

/** When the section title references CPU, GPU, and TPU, show a real comparison table instead of a cramped screenshot image. */
function shouldShowBuiltinCpuGpuTpuTable(title: string | undefined): boolean {
  const t = (title ?? '').toLowerCase();
  return ['cpu', 'gpu', 'tpu'].every((w) => t.includes(w));
}

const BLOG_CPU_GPU_TPU_ROWS: ReadonlyArray<{
  feature: string;
  cpu: string;
  gpu: string;
  tpu: string;
}> = [
  {
    feature: 'Primary purpose',
    cpu: 'General serial workloads, OS, orchestration, and control logic',
    gpu: 'Massively parallel math (graphics, deep learning, HPC)',
    tpu: 'Matrix-heavy ML training & inference (systolic arrays)',
  },
  {
    feature: 'Architecture',
    cpu: 'Few powerful cores, large caches, branch-heavy code',
    gpu: 'Thousands of smaller cores, high memory bandwidth',
    tpu: 'Specialized for multiply-accumulate in fixed patterns',
  },
  {
    feature: 'AI training performance',
    cpu: 'Poor for large models; mainly preprocessing & orchestration',
    gpu: 'Excellent for most frameworks and model sizes',
    tpu: 'Very strong for large-batch training in supported stacks',
  },
  {
    feature: 'Parallel processing',
    cpu: 'Limited parallelism; optimized for latency',
    gpu: 'Massive parallelism across threads / warps',
    tpu: 'Structured batch parallelism for matrix units',
  },
  {
    feature: 'Availability',
    cpu: 'Every device',
    gpu: 'Workstations to datacenters (NVIDIA, AMD, cloud)',
    tpu: 'Cloud (e.g. Google) and select dedicated hardware',
  },
  {
    feature: 'Cost',
    cpu: 'Lowest per general-purpose capability',
    gpu: 'Moderate–high; strong perf per watt for parallel work',
    tpu: 'Usage-based cloud pricing; best when workload fits TPU',
  },
  {
    feature: 'Best use cases',
    cpu: 'Business logic, light inference, data prep',
    gpu: 'Training, inference, rendering, simulation',
    tpu: 'Large-scale training when frameworks & ops fit TPU',
  },
  {
    feature: 'Framework compatibility',
    cpu: 'Universal',
    gpu: 'CUDA, ROCm, OpenCL; all major ML frameworks',
    tpu: 'Strong with TensorFlow/JAX/XLA-oriented pipelines',
  },
];

function BlogHardwareComparisonTable() {
  return (
    <div className="blog-comparison-table-wrap" role="region" aria-label="CPU, GPU, and TPU comparison">
      <div className="blog-comparison-table-scroll">
        <table className="blog-comparison-table">
          <thead>
            <tr>
              <th scope="col">Feature</th>
              <th scope="col">CPU</th>
              <th scope="col">GPU</th>
              <th scope="col">TPU</th>
            </tr>
          </thead>
          <tbody>
            {BLOG_CPU_GPU_TPU_ROWS.map((row) => (
              <tr key={row.feature}>
                <th scope="row">{row.feature}</th>
                <td>{row.cpu}</td>
                <td>{row.gpu}</td>
                <td>{row.tpu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
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
    // Always fetch latest blogs for the detail page.
    // Some API responses may not include `blog.slug`, so we fall back to the route param.
    if (!slug) return;

    // Fetch extra so we still have 3 items after excluding the current blog.
    getBlogs({ status: 'published', limit: 8 })
      .then((list) => {
        const currentSlug = blog?.slug ?? slug;
        const valid = list.filter((b) => b.slug);
        const withoutCurrent = valid.filter((b) => b.slug !== currentSlug).slice(0, 3);
        // If there is only one blog total, show it (so the section is still visible).
        setRelatedBlogs(withoutCurrent.length > 0 ? withoutCurrent : valid.slice(0, 3));
      })
      .catch(() => setRelatedBlogs([]));
  }, [slug, blog?.slug]);

  const sections: { id: string; title: string }[] =
    blog?.content_sections
      ?.map((s, i) => ({
        id: slugifyId(s.title ?? '', i),
        title: s.title ?? `Section ${i + 1}`,
      }))
      .filter((s) => s.title) ?? [];
  const tocItems =
    sections.length > 0
      ? sections
      : [{ id: 'blog-top', title: 'Overview' }];

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
        className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12 blog-detail-hero"
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
                <span style={{ color: '#9CA3AF' }}>{BLOG_PAGE_AUTHOR_NAME}</span>
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
                <div className="blog-sidebar-card">
                  <h3 className="blog-sidebar-title">In this article</h3>
                  <nav className="blog-toc">
                    {tocItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          if (item.id === 'blog-top') {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            return;
                          }
                          scrollToSection(item.id);
                        }}
                        className={`blog-toc-item ${activeSection === item.id ? 'blog-toc-item--active' : ''}`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="blog-sidebar-card">
                  <h3 className="blog-sidebar-title">Author</h3>
                  <div className="blog-author-card">
                    <div className="blog-author-avatar">
                      <span className="blog-author-initials">{getInitials(BLOG_PAGE_AUTHOR_NAME)}</span>
                    </div>
                    <div>
                      <div className="blog-author-name">{BLOG_PAGE_AUTHOR_NAME}</div>
                      <div className="blog-author-role">Author, Jashom</div>
                    </div>
                  </div>
                  <p className="blog-author-bio">GPU engineer focused on real-world AI and performance optimization workflows.</p>
                </div>

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
                      <span>X (Twitter)</span>
                    </a>
                    <a
                      href={JASHOM_LINKEDIN_COMPANY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-share-btn"
                      aria-label="Jashom on LinkedIn"
                    >
                      <Share2 className="blog-share-icon" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>

                <div className="blog-sidebar-card">
                  <h3 className="blog-sidebar-title">Related posts</h3>
                  {relatedBlogs.length > 0 ? (
                    <ul className="blog-related-list">
                      {relatedBlogs.map((rb) => (
                        <li key={rb.id}>
                          <Link to={`/blogs/${rb.slug}/`} className="blog-related-link">
                            <span className="blog-related-icon-box">
                              <ArrowRight className="blog-related-arrow" />
                            </span>
                            <span className="blog-related-texts">
                              <span className="blog-related-title">{rb.title}</span>
                              <span className="blog-related-date">{formatDate(rb.published_at)}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="blog-related-empty">More related articles will appear here soon.</p>
                  )}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Latest Blogs (3) */}
      {relatedBlogs.length > 0 && (
        <section
          className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
          style={{ background: `linear-gradient(180deg, ${homePageData.BLOG_CARD_BG} 0%, rgba(11, 15, 20, 0.0) 100%)` }}
        >
          {/* Background decoration (same feel as Home blog section) */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-16 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl" />
            <div className="absolute bottom-16 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <motion.div
                className="inline-block mb-4 px-4 py-2 rounded-full border"
                style={Theme.BADGE_STYLE}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <span style={{ color: Theme.ACCENT_COLOR, fontWeight: 600, fontSize: '0.875rem' }}>
                  Related Blogs
                </span>
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: Theme.TEXT_FAFAFA, letterSpacing: '-0.025em' }}>
                Latest <span style={{ color: Theme.ACCENT_COLOR }}>Reads</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((b, index) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  className="group"
                >
                  <Link
                    to={`/blogs/${b.slug}/`}
                    className="block h-full"
                    style={{ ['--accent' as string]: Theme.ACCENT_COLOR } as React.CSSProperties}
                  >
                    <div
                      className="relative h-full min-h-[320px] rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02] flex flex-col"
                      style={{
                        background: b.featured_image_url ? undefined : homePageData.BLOG_CARD_BG,
                        border: 'none',
                        ...(b.featured_image_url
                          ? {
                              backgroundImage: `url(${b.featured_image_url})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }
                          : {}),
                      }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background: b.featured_image_url
                            ? 'linear-gradient(180deg, rgba(11, 15, 20, 0.68) 0%, rgba(11, 15, 20, 0.88) 55%, rgba(11, 15, 20, 0.96) 100%)'
                            : 'none',
                        }}
                      />

                      <div className="absolute top-4 left-4 z-10">
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={homePageData.BLOG_BADGE_STYLE}>
                          Blog
                        </div>
                      </div>

                      <div className="relative z-10 flex flex-col flex-1 justify-between p-6 pt-14">
                        <div>
                          <h3
                            className="text-lg font-bold mb-3 line-clamp-3 transition-colors duration-240 group-hover:text-[var(--accent)]"
                            style={{ color: Theme.TEXT_FAFAFA, lineHeight: 1.35 }}
                          >
                            {b.title}
                          </h3>
                          <p className="text-sm mb-4 line-clamp-3" style={{ color: Theme.TEXT_MUTED, lineHeight: 1.6 }}>
                            {b.excerpt ?? ''}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-xs" style={{ color: Theme.TEXT_SUBTLE }}>
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(b.published_at)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: Theme.ACCENT_COLOR }}>
                            <span>Read More</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>

                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: 'linear-gradient(180deg, rgba(34, 211, 238, 0.05) 0%, rgba(34, 211, 238, 0.02) 100%)' }}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
              background: 'linear-gradient(160deg, rgba(20, 36, 56, 0.72) 0%, rgba(10, 20, 34, 0.82) 100%)',
              borderColor: 'rgba(34, 211, 238, 0.24)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 26px rgba(0, 0, 0, 0.24)',
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
        .blog-detail-hero { min-height: 380px; padding-top: 10rem; }
        @media (max-width: 768px) { .blog-detail-hero { min-height: 320px; padding-top: 8.5rem; } }

        .blog-detail-content-section {
          position: relative;
          padding-top: 2.5rem;
          padding-bottom: 5rem;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.16) 0%, rgba(11, 15, 20, 0) 100%);
        }
        .blog-detail-container { max-width: 1600px; margin: 0 auto; padding: 0 1.5rem; }
        .blog-detail-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: start; }
        @media (min-width: 1200px) {
          .blog-detail-grid { grid-template-columns: minmax(0, 1fr) 320px; gap: 2rem; }
        }
        .blog-detail-main { min-width: 0; width: 100%; }
        .blog-detail-article { color: #D1D5DB; width: 100%; max-width: none; }

        .blog-detail-sidebar { display: none; }
        @media (min-width: 1200px) { .blog-detail-sidebar { display: block; } }
        .blog-detail-sidebar-sticky { position: sticky; top: 7rem; display: flex; flex-direction: column; gap: 1rem; }

        .blog-sidebar-card {
          background: linear-gradient(160deg, rgba(20, 36, 56, 0.62) 0%, rgba(10, 20, 34, 0.82) 100%);
          border: 1px solid rgba(34, 211, 238, 0.2);
          border-radius: 14px;
          padding: 1rem 1rem;
          backdrop-filter: blur(8px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.2);
        }
        .blog-sidebar-title {
          color: #9CA3AF;
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin: 0 0 0.8rem 0;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid rgba(34, 211, 238, 0.18);
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
        .blog-author-initials { color: #22D3EE; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.04em; }
        .blog-author-name { color: #E5E7EB; font-weight: 600; font-size: 0.9375rem; }
        .blog-author-role { color: #6B7280; font-size: 0.75rem; margin-top: 0.15rem; }
        .blog-author-bio { color: #9CA3AF; font-size: 0.8rem; line-height: 1.55; margin: 0.8rem 0 0; }

        .blog-share-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 0.55rem; }
        .blog-share-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.55rem 0.7rem;
          border-radius: 8px;
          background: rgba(15, 23, 42, 0.62);
          border: 1px solid rgba(34, 211, 238, 0.14);
          color: #D1D5DB;
          font-size: 0.75rem;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .blog-share-btn:hover { background: rgba(34, 211, 238, 0.15); color: #22D3EE; }
        .blog-share-icon { width: 16px; height: 16px; flex-shrink: 0; }

        .blog-related-list { list-style: none; margin: 0; padding: 0; }
        .blog-related-list li { margin-bottom: 0.5rem; }
        .blog-related-link {
          display: flex; align-items: center; justify-content: flex-start; gap: 0.65rem;
          padding: 0.55rem 0.55rem;
          border-radius: 8px;
          color: #D1D5DB;
          text-decoration: none;
          font-size: 0.75rem;
          transition: background 0.2s, color 0.2s;
          border: 1px solid transparent;
        }
        .blog-related-link:hover { background: rgba(34, 211, 238, 0.08); color: #22D3EE; border-color: rgba(34, 211, 238, 0.2); }
        .blog-related-icon-box {
          width: 34px; height: 34px; border-radius: 8px;
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(17, 24, 39, 0.9);
          border: 1px solid rgba(34, 211, 238, 0.14);
          flex-shrink: 0;
        }
        .blog-related-texts { min-width: 0; display: flex; flex-direction: column; gap: 0.15rem; }
        .blog-related-title { color: #E5E7EB; overflow: hidden; text-overflow: ellipsis; white-space: normal; line-height: 1.35; font-size: 0.8125rem; }
        .blog-related-date { color: #6B7280; font-size: 0.72rem; }
        .blog-related-arrow { width: 13px; height: 13px; color: #22D3EE; }
        .blog-related-empty { color: #9CA3AF; font-size: 0.8rem; line-height: 1.5; margin: 0; }

        .blog-detail-section-images { margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; }
        .blog-detail-figure {
          margin: 0;
          padding: 0.65rem;
          border-radius: 16px;
          background: linear-gradient(165deg, rgba(17, 24, 39, 0.88) 0%, rgba(11, 15, 20, 0.82) 100%);
          border: 1px solid rgba(34, 211, 238, 0.22);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 32px rgba(0, 0, 0, 0.28);
        }
        .blog-detail-figure-inner {
          overflow-x: auto;
          border-radius: 12px;
          -webkit-overflow-scrolling: touch;
        }
        /* Natural aspect ratio — wide diagrams & table screenshots are no longer cropped to a square */
        .blog-detail-img {
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          height: auto;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
        }
        .blog-comparison-table-wrap {
          margin: 1.25rem 0 0.25rem;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(34, 211, 238, 0.22) 0%, rgba(34, 211, 238, 0.05) 100%);
          box-shadow: 0 14px 42px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }
        .blog-comparison-table-scroll {
          overflow-x: auto;
          border-radius: 15px;
          background: linear-gradient(168deg, rgba(15, 23, 42, 0.96) 0%, rgba(11, 15, 20, 0.94) 100%);
          border: 1px solid rgba(34, 211, 238, 0.2);
          -webkit-overflow-scrolling: touch;
        }
        .blog-comparison-table {
          width: 100%;
          min-width: 720px;
          border-collapse: collapse;
          font-size: 0.9375rem;
        }
        .blog-comparison-table thead th {
          text-align: left;
          padding: 0.9rem 1rem;
          background: rgba(34, 211, 238, 0.12);
          color: #22d3ee;
          font-weight: 700;
          letter-spacing: 0.02em;
          border-bottom: 1px solid rgba(34, 211, 238, 0.28);
        }
        .blog-comparison-table tbody th[scope='row'] {
          text-align: left;
          padding: 0.8rem 1rem;
          color: #f3f4f6;
          font-weight: 600;
          background: rgba(17, 24, 39, 0.65);
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
          width: 20%;
          vertical-align: top;
        }
        .blog-comparison-table td {
          padding: 0.8rem 1rem;
          color: #d1d5db;
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
          vertical-align: top;
          line-height: 1.55;
        }
        .blog-comparison-table tbody tr:nth-child(even) td { background: rgba(15, 23, 42, 0.4); }
        .blog-comparison-table tbody tr:hover td { background: rgba(34, 211, 238, 0.07); }
        .blog-comparison-table tbody tr:last-child th,
        .blog-comparison-table tbody tr:last-child td { border-bottom: none; }
        /* HTML tables pasted into section body */
        .blog-section-content .blog-table-scroll {
          overflow-x: auto;
          margin: 1.25rem 0;
          border-radius: 14px;
          border: 1px solid rgba(34, 211, 238, 0.18);
          background: rgba(15, 23, 42, 0.45);
          -webkit-overflow-scrolling: touch;
        }
        .blog-section-content table:not(.blog-comparison-table) {
          width: 100%;
          min-width: 520px;
          border-collapse: collapse;
          font-size: 0.9375rem;
        }
        .blog-section-content table:not(.blog-comparison-table) th {
          text-align: left;
          padding: 0.75rem 0.9rem;
          background: rgba(34, 211, 238, 0.1);
          color: #e5e7eb;
          font-weight: 600;
          border-bottom: 1px solid rgba(34, 211, 238, 0.22);
        }
        .blog-section-content table:not(.blog-comparison-table) td {
          padding: 0.7rem 0.9rem;
          color: #d1d5db;
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
        }
        .blog-section-content img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          display: block;
          margin: 1rem 0;
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.3);
        }
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
        .blog-section-with-images .blog-comparison-table-wrap { margin-top: 0.75rem; }
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
  const showBuiltinCpuGpuTpuTable = shouldShowBuiltinCpuGpuTpuTable(section.title);
  const showSectionImages = hasImages && !showBuiltinCpuGpuTpuTable;
  const sectionLayoutClass = showSectionImages || showBuiltinCpuGpuTpuTable ? 'blog-section-with-images' : '';

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
        <div className={sectionLayoutClass}>
          {section.content && (
            <div
              className="blog-section-content"
              dangerouslySetInnerHTML={{ __html: section.content }}
              style={{ lineHeight: 1.8, color: '#D1D5DB' }}
            />
          )}
          {showBuiltinCpuGpuTpuTable && <BlogHardwareComparisonTable />}
          {showSectionImages && section.images && (
            <div className="blog-detail-section-images">
              {section.images.map((img) => (
                <figure key={`${img.url}-${img.alt ?? ''}`} className="blog-detail-figure">
                  <div className="blog-detail-figure-inner">
                    <img src={img.url} alt={img.alt ?? ''} className="blog-detail-img" loading="lazy" />
                  </div>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
