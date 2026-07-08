"use client";

import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import BlogPostCard from "@/components/BlogPostCard";
import type { BlogPost } from "@/lib/blogs";

export default function RelatedBlogsSection({ posts }: { readonly posts: BlogPost[] }) {
  return (
    <section className="section border-t border-line" id="related-blogs">
      <div className="container-j">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Resources</span>
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Related Insights</SplitHeading>
          </div>
          <Reveal>
            <a href="/blogs/" className="border border-ink px-5 py-2.5 font-mono text-[0.75rem] uppercase tracking-wider hover:bg-ink hover:text-warmwhite transition-colors duration-300 font-medium">
              View All Insights
            </a>
          </Reveal>
        </div>
        <Stagger className="grid md:grid-cols-3 gap-6" itemClassName="h-full" step={0.07}>
          {posts.map((p) => (
            <BlogPostCard key={p.slug} post={p} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
