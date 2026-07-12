import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import QuickActions from "@/components/QuickActions";
import BlogsContent from "./BlogsContent";
import { getPublishedBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Jashom - AI & GPU Optimization Expertise",
  description:
    "Explore the latest blog posts, case studies, and news from Jashom. Stay informed about AI, GPU optimization, CUDA development, and enterprise technology trends.",
};

export default async function BlogsPage() {
  const posts = await getPublishedBlogs();

  return (
    <>
      <Nav />
      <BlogsContent posts={posts} />
      <Footer />
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
