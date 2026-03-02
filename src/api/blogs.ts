/**
 * Blog API client.
 * Option A (no CORS): Use same-origin proxy. Set VITE_USE_API_PROXY=true and proxy /api → backend on your server.
 * Option B: Set VITE_API_URL=https://backend.jashom.com and allow that origin in backend CORS.
 */
const PRODUCTION_API_BASE = 'https://backend.jashom.com';
const API_PROXY_PREFIX = '/api';

const getBaseUrl = (): string => {
  if (import.meta.env.VITE_USE_API_PROXY === 'true') {
    return typeof window !== 'undefined' ? window.location.origin + API_PROXY_PREFIX : API_PROXY_PREFIX;
  }
  const url = import.meta.env.VITE_API_URL;
  if (url) return String(url).replace(/\/$/, '');
  if (import.meta.env.PROD) return PRODUCTION_API_BASE;
  return typeof window !== 'undefined' ? window.location.origin : '';
};

export interface BlogSectionImage {
  url: string;
  alt?: string;
  name?: string;
}

export interface BlogContentSection {
  title?: string;
  content?: string;
  images?: BlogSectionImage[];
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  author_name: string | null;
  tags: string | null;
  status: string;
  published_at: string | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  content_sections: BlogContentSection[];
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

async function api<T>(path: string): Promise<T> {
  const base = getBaseUrl();
  const pathStr = path.startsWith('/') ? path : '/' + path;
  const url = base + pathStr;
  const res = await fetch(url);
  const text = await res.text();
  if (!res.ok) throw new Error(res.statusText ?? 'Request failed');
  if (!text.trim().startsWith('[') && !text.trim().startsWith('{')) {
    throw new Error('Blog API returned an unexpected response. Check VITE_API_URL and that the backend is serving JSON at this URL.');
  }
  return JSON.parse(text) as T;
}

/** Fetch published blogs (for list/cards). */
export async function getBlogs(params?: { status?: string; limit?: number; offset?: number }): Promise<Blog[]> {
  const search = new URLSearchParams();
  if (params?.status) search.set('status', params.status);
  if (params?.limit != null) search.set('limit', String(params.limit));
  if (params?.offset != null) search.set('offset', String(params.offset));
  const q = search.toString();
  const path = q ? '/v1/admin/blogs?' + q : '/v1/admin/blogs';
  return api<Blog[]>(path);
}

/** Fetch a single blog by id. */
export async function getBlogById(id: string | number): Promise<Blog> {
  return api<Blog>(`/v1/admin/blogs/${id}`);
}

/** Fetch a single blog by slug (for detail page). */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const list = await api<Blog[]>(`/v1/admin/blogs?slug=${encodeURIComponent(slug)}`);
  return list.length > 0 ? list[0] : null;
}
