import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import QuickActions from "@/components/QuickActions";
import HireCudaContent from "./HireCudaContent";

export const metadata: Metadata = {
  title: "Hire CUDA Developers | Dedicated CUDA Programmers & GPU Experts",
  description:
    "Looking to hire CUDA developers? Get skilled GPU programmers for NVIDIA CUDA projects, performance optimization, and custom parallel computing solutions.",
  alternates: { canonical: "https://www.jashom.com/hire-cuda-developer/" },
};

export default function HireCudaDeveloperPage() {
  return (
    <>
      <Nav />
      <HireCudaContent />
      <Footer />
      <QuickActions
        actions={[
          { label: "Get a Free Quote", href: "/contact/" },
          { label: "Hire an Expert", href: "/hire-rust-developers/" },
          { label: "View Case Studies", href: "/portfolio/" },
        ]}
      />
    </>
  );
}
