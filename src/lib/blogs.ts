const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://backend.jashom.com";

export interface ContentSection {
  title?: string;
  content?: string;
  images?: { url: string; alt?: string; name?: string }[];
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  author_name: string | null;
  tags: string[] | null;
  status: string;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  content_sections: ContentSection[] | null;
  is_featured: boolean;
  is_pinned: boolean;
  sort_order: number | null;
}

export async function getPublishedBlogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_URL}/v1/admin/blogs?status=published&limit=100`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(
      `${API_URL}/v1/admin/blogs?status=published&slug=${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const posts: BlogPost[] = await res.json();
    return posts[0] ?? null;
  } catch {
    return null;
  }
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
