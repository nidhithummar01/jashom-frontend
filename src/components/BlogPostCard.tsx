import { formatDate } from "@/lib/blogs";
import type { BlogPost } from "@/lib/blogs";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5">
    <path
      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

export default function BlogPostCard({ post }: { readonly post: BlogPost }) {
  return (
    <a
      href={`/blogs/${post.slug}/`}
      className="bg-transparent border border-line hover:bg-paper group flex flex-col h-full transition-all duration-300"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-tint">
        {post.featured_image_url ? (
          <img
            src={post.featured_image_url}
            alt={post.featured_image_alt ?? post.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-tint" />
        )}
      </div>

      <div className="flex flex-col flex-1 p-6 md:p-7">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 3).map((t) => (
              <span key={t} className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-2 bg-tint border border-line/60 px-2 py-0.5 rounded-sm">
                {t}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-sans font-medium text-[1.2rem] leading-snug text-ink mb-3 group-hover:underline decoration-1 underline-offset-4 transition-colors">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-[0.875rem] text-ink-2 leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
        )}

        <div className="mt-auto pt-4 border-t border-line/40 flex items-center justify-between">
          <span className="font-mono text-[0.75rem] text-ink-3 uppercase tracking-wider font-medium">
            {formatDate(post.published_at) || "Read Article"}
          </span>
          <span className="inline-block transition-all duration-300 group-hover:translate-x-1.5 text-ink-3 group-hover:text-ink">
            <ArrowIcon />
          </span>
        </div>
      </div>
    </a>
  );
}
