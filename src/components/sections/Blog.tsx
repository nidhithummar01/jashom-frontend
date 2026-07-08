import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import { getPublishedBlogs } from "@/lib/blogs";
import BlogPostCard from "@/components/BlogPostCard";

export default async function Blog() {
  const allPosts = await getPublishedBlogs();
  const posts = allPosts.slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="section border-t border-line" id="blog">
      <div className="container-j">
        {/* Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
          <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">
            Latest Insights
          </SplitHeading>
          <Reveal>
            <a
              href="/blogs/"
              className="border border-ink px-5 py-2.5 font-mono text-[0.75rem] uppercase tracking-wider hover:bg-ink hover:text-warmwhite transition-colors duration-300 font-medium"
            >
              View All Posts
            </a>
          </Reveal>
        </div>

        {/* Blog Post Cards Grid */}
        <Stagger className="grid md:grid-cols-3 gap-6" itemClassName="h-full" step={0.07}>
          {posts.map((p) => (
            <BlogPostCard key={p.slug} post={p} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
