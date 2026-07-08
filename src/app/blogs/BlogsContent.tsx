"use client";

import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import type { BlogPost } from "@/lib/blogs";
import { formatDate } from "@/lib/blogs";

export default function BlogsContent({ posts }: { readonly posts: BlogPost[] }) {
  const reduced = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section id="hero" className="always-dark relative min-h-[50svh] flex flex-col overflow-clip">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative flex-1 flex flex-col justify-center pt-28 pb-10 max-w-3xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase mb-6">
            Insights • AI • GPU • CUDA
          </motion.p>
          <h1 className="text-[clamp(1.6rem,2.5vw,2.1rem)] leading-[1.1]">
            <span className="block overflow-clip">
              <motion.span className="block"
                initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                animate={{ transform: "translateY(0%)" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                Latest Blogs
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mt-7 max-w-[62ch] text-[1.0625rem] text-ink-2">
            Practical guidance, best practices, and real engineering learnings across AI systems, GPU optimization, and enterprise technology.
          </motion.p>
        </div>
      </section>

      <main>
        {/* Articles */}
        <section className="section" id="articles">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">All articles</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">Practical guidance, engineering insights, and case-study learnings from the Jashom team.</p></Reveal>
            </div>

            {posts.length === 0 ? (
              <Reveal>
                <div className="border border-line bg-paper p-10 flex flex-col items-start gap-3">
                  <p className="text-[1.1rem] font-medium text-ink">No posts yet</p>
                  <p className="text-ink-2 max-w-[50ch]">Check back soon — new articles are published regularly.</p>
                </div>
              </Reveal>
            ) : (
              <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" itemClassName="h-full" step={0.06}>
                {posts.map((p) => (
                  <a
                    key={p.slug}
                    href={`/blogs/${p.slug}/`}
                    className="bg-transparent border border-line hover:bg-paper group flex flex-col h-full transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-tint">
                      {p.featured_image_url ? (
                        <img
                          src={p.featured_image_url}
                          alt={p.featured_image_alt ?? p.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-tint flex items-center justify-center">
                          <span className="font-mono text-[0.75rem] text-ink-3 uppercase tracking-wider">No image</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col flex-1 p-6 md:p-7">
                      {/* Tags */}
                      {p.tags && p.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {p.tags.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-2 bg-tint border border-line/60 px-2 py-0.5 rounded-sm"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="font-sans font-medium text-[1.2rem] leading-snug text-ink mb-3 group-hover:underline decoration-1 underline-offset-4 transition-colors">
                        {p.title}
                      </h2>

                      {/* Excerpt */}
                      {p.excerpt && (
                        <p className="text-[0.875rem] text-ink-2 leading-relaxed line-clamp-2 mb-4">
                          {p.excerpt}
                        </p>
                      )}

                      {/* Footer */}
                      <div className="mt-auto pt-4 border-t border-line/40 flex items-center justify-between">
                        <span className="font-mono text-[0.75rem] text-ink-3 uppercase tracking-wider">
                          {formatDate(p.published_at)}
                        </span>
                        <span className="inline-block transition-all duration-300 group-hover:translate-x-1.5 text-ink-3 group-hover:text-ink">
                          <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </Stagger>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="relative section always-dark border-y border-line overflow-clip" id="contact">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
          <div className="container-j relative flex flex-col items-center text-center">
            <span className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase mb-5">Subscribe / Collaborate</span>
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] text-ink max-w-2xl">Have a Question or Project in Mind?</SplitHeading>
            <Reveal delay={0.1}><p className="mt-6 text-ink-2 max-w-[60ch]">Let&rsquo;s discuss how we can help you leverage AI and GPU computing to transform your business. Our team is ready to answer your questions.</p></Reveal>
            <Reveal delay={0.18}><div className="mt-10"><Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary">Contact Us</a></Magnetic></div></Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
