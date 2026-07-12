import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import QuickActions from "@/components/QuickActions";
import GpuOptimizationContent from "./GpuOptimizationContent";
import { getPublishedBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "NVIDIA GPU Optimization Services | Optimize NVIDIA GPU Performance",
  description:
    "Improve speed and efficiency with expert NVIDIA GPU optimization services. We help businesses optimize NVIDIA GPU performance for AI, HPC, and data-intensive applications.",
};

export default async function GpuOptimizationServicePage() {
  const blogPosts = await getPublishedBlogs();
  return (
    <>
      <Nav />
      <GpuOptimizationContent blogPosts={blogPosts} />
      <Footer />
      <QuickActions
        actions={[
          { label: "Get a Free Quote", href: "/contact/" },
          { label: "Hire an Expert", href: "/hire-cuda-developer/" },
          { label: "View Case Studies", href: "/portfolio/" },
        ]}
      />
    </>
  );
}
