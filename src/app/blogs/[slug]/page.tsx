import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Customizer from "@/components/Customizer";
import QuickActions from "@/components/QuickActions";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/blogs";
import BlogArticle from "../BlogArticle";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta_title ?? post.title,
    description: post.meta_description ?? post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogBySlug(slug),
    getPublishedBlogs(),
  ]);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <BlogArticle post={post} allPosts={allPosts} />
      <Footer />
      <Customizer />
      <QuickActions
        actions={[
          { label: "Subscribe", href: "/contact/" },
          { label: "Read Latest", href: "/blogs/" },
          { label: "Write for Us", href: "/careers/" },
        ]}
      />
    </>
  );
}
