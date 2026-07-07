import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Customizer from "@/components/Customizer";
import QuickActions from "@/components/QuickActions";
import CudaDevelopmentContent from "./CudaDevelopmentContent";
import { getPublishedBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "CUDA Development Services | Expert CUDA Developers for GPU Computing",
  description:
    "Hire experienced CUDA developers to build high-performance GPU applications. Jashom delivers scalable CUDA development solutions for AI, deep learning, and parallel computing.",
};

export default async function CudaDevelopmentServicePage() {
  const blogPosts = await getPublishedBlogs();
  return (
    <>
      <Nav />
      <CudaDevelopmentContent blogPosts={blogPosts} />
      <Footer />
      <Customizer />
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
