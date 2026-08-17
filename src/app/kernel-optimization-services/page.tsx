import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import QuickActions from "@/components/QuickActions";
import KernelOptimizationContent from "./KernelOptimizationContent";
import { getPublishedBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Kernel Optimization Services | GPU & AI Performance | Jashom Technologies",
  description:
    "Accelerate AI and GPU workloads with expert kernel optimization services. Improve performance, reduce latency, and maximize GPU efficiency with optimized compute kernels.",
  alternates: { canonical: "https://www.jashom.com/kernel-optimization-services/" },
};

export default async function KernelOptimizationServicesPage() {
  const blogPosts = await getPublishedBlogs();
  return (
    <>
      <Nav />
      <KernelOptimizationContent blogPosts={blogPosts} />
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
