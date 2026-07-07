import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Customizer from "@/components/Customizer";
import QuickActions from "@/components/QuickActions";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Jashom | GPU Optimization & CUDA Development Experts",
  description:
    "Learn about Jashom, a technology-driven company specializing in GPU optimization, NVIDIA CUDA development, and high-performance computing solutions for modern AI and enterprise applications.",
};

export default function AboutUsPage() {
  return (
    <>
      <Nav />
      <AboutContent />
      <Footer />
      <Customizer />
      <QuickActions
        actions={[
          { label: "Meet the Team", href: "/about/team/" },
          { label: "Contact Us", href: "/contact/" },
          { label: "Our Culture", href: "/careers/" },
        ]}
      />
    </>
  );
}
