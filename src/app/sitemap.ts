import type { MetadataRoute } from "next";
import { getPublishedBlogs } from "@/lib/blogs";
import { CASE_STUDIES } from "@/app/portfolio/case-study/case-studies-data";

const BASE = "https://www.jashom.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getPublishedBlogs();

  const staticRoutes: MetadataRoute.Sitemap = [
    // Core
    { url: `${BASE}/`, lastModified: new Date(), priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/gpu-optimization-service/`, lastModified: new Date(), priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/cuda-development-service/`, lastModified: new Date(), priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/kernel-optimization-services/`, lastModified: new Date(), priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/hire-cuda-developer/`, lastModified: new Date(), priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/hire-rust-developers/`, lastModified: new Date(), priority: 0.8, changeFrequency: "monthly" },
    // Company
    { url: `${BASE}/about-us/`, lastModified: new Date(), priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/contact/`, lastModified: new Date(), priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/team/`, lastModified: new Date(), priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/careers/`, lastModified: new Date(), priority: 0.6, changeFrequency: "weekly" },
    { url: `${BASE}/brochure/`, lastModified: new Date(), priority: 0.6, changeFrequency: "monthly" },
    // Portfolio
    { url: `${BASE}/portfolio/`, lastModified: new Date(), priority: 0.8, changeFrequency: "monthly" },
    ...CASE_STUDIES.map((c) => ({
      url: `${BASE}/portfolio/case-study/${c.slug}/`,
      lastModified: new Date(),
      priority: 0.6 as const,
      changeFrequency: "monthly" as const,
    })),
    // Blog index
    { url: `${BASE}/blogs/`, lastModified: new Date(), priority: 0.7, changeFrequency: "daily" },
    // Legal
    { url: `${BASE}/privacy/`, lastModified: new Date(), priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE}/terms/`, lastModified: new Date(), priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE}/security/`, lastModified: new Date(), priority: 0.3, changeFrequency: "yearly" },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: `${BASE}/blogs/${post.slug}/`,
    lastModified: post.published_at ? new Date(post.published_at) : new Date(),
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...blogRoutes];
}
