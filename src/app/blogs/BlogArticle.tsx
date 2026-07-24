"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import type { BlogPost } from "@/lib/blogs";
import { formatDate } from "@/lib/blogs";
import AuthorBio from "./AuthorBio";

function BlogContent({ post }: { readonly post: BlogPost }) {
  if (post.content) {
    return (
      <div
        className="blog-content text-ink-2 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    );
  }

  if (!post.content_sections || post.content_sections.length === 0) {
    return null;
  }

  return (
    <>
      {post.content_sections.map((section) => (
        <div key={section.title ?? section.content?.slice(0, 40)} className="flex flex-col gap-4">
          {section.title && (
            <h2 className="text-[1.25rem] md:text-[1.4rem] font-medium text-ink mt-4">
              {section.title}
            </h2>
          )}
          {section.content && (
            <div
              className="blog-content text-ink-2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
          {section.images && section.images.length > 0 && (
            <div className="flex flex-col gap-3 my-2">
              {section.images.map((img) => (
                <div key={img.url} className="relative w-full overflow-hidden bg-tint">
                  <img src={img.url} alt={img.alt ?? ""} className="w-full h-auto object-contain" />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default function BlogArticle({
  post,
  allPosts,
}: {
  readonly post: BlogPost;
  readonly allPosts: BlogPost[];
}) {
  const reduced = useReducedMotion();

  // Up to 4 related posts (same tags priority), excluding current
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const tagsA = post.tags ?? [];
      const commonA = (a.tags ?? []).filter((t) => tagsA.includes(t)).length;
      const commonB = (b.tags ?? []).filter((t) => tagsA.includes(t)).length;
      return commonB - commonA;
    })
    .slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section id="hero" className="always-dark relative flex flex-col overflow-clip">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative pt-32 pb-12 max-w-5xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase mb-6">
            Insight · {formatDate(post.published_at)}
          </motion.p>
          <h1 className="text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.15]">
            <span className="block overflow-clip">
              <motion.span className="block"
                initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                animate={{ transform: "translateY(0%)" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                {post.title}
              </motion.span>
            </span>
          </h1>
        </div>
      </section>

      <main>
        <article className="section pt-6">
          <div className="container-j max-w-5xl grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Article content */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              {/* Hero image */}
              {post.featured_image_url && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-tint mb-4">
                  <img
                    src={post.featured_image_url}
                    alt={post.featured_image_alt ?? post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pb-4 border-b border-line">
                  {post.tags.map((t) => (
                    <span key={t} className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-2 bg-tint border border-line/60 px-2 py-0.5 rounded-sm">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Content — rendered as HTML from admin panel */}
              <BlogContent post={post} />

              {/* Author Bio */}
              <AuthorBio authorName={post.author_name} />
            </div>

            {/* Right Column: Sidebar related blogs */}
            <aside className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-28 h-fit lg:border-l lg:border-line lg:pl-8 mt-12 lg:mt-0">
              <div className="flex flex-col gap-1 pb-3 border-b border-line">
                <span className="font-mono text-[0.75rem] tracking-[0.2em] text-ink-3 uppercase font-medium">Resources</span>
                <h3 className="font-sans font-medium text-[1.15rem] text-ink">Related Insights</h3>
              </div>
              {relatedPosts.length === 0 ? (
                <p className="text-sm text-ink-3">No related posts yet.</p>
              ) : (
                <div className="flex flex-col">
                  {relatedPosts.map((rp) => (
                    <a
                      key={rp.slug}
                      href={`/blogs/${rp.slug}/`}
                      className="group flex gap-4 py-4 border-b border-line/60 last:border-b-0 hover:bg-paper/40 transition-all duration-300"
                    >
                      <div className="relative aspect-[16/10] w-24 shrink-0 overflow-hidden bg-tint">
                        {rp.featured_image_url ? (
                          <img
                            src={rp.featured_image_url}
                            alt={rp.featured_image_alt ?? rp.title}
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-tint" />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-center min-w-0">
                        <span className="font-mono text-[0.625rem] text-ink-3 uppercase tracking-wider mb-1 truncate block">
                          {formatDate(rp.published_at)}
                        </span>
                        <h4 className="font-sans font-medium text-[0.875rem] text-ink leading-snug group-hover:underline decoration-1 underline-offset-2 transition-colors line-clamp-2">
                          {rp.title}
                        </h4>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </article>

        {/* CTA */}
        <section className="relative section always-dark border-t border-line overflow-clip">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
          <div className="container-j relative flex flex-col items-center text-center">
            <p className="text-[clamp(1.4rem,2.2vw,1.9rem)] text-ink max-w-xl font-medium">Ready to accelerate your AI workloads?</p>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary">Talk to our team</a></Magnetic>
                <a href="/blogs/" className="btn btn-secondary">Back to all blogs</a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
