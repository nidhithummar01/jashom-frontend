import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Customizer from "@/components/Customizer";
import QuickActions from "@/components/QuickActions";
import HireRustContent from "./HireRustContent";

export const metadata: Metadata = {
  title: "Hire Rust Developers - Hire Best Expert Rust Developer - Jashom",
  description:
    "Hire dedicated Rust developers from Jashom to accelerate your project. Our experienced Rust engineers deliver reliable, secure, and efficient applications tailored to your business needs.",
};

export default function HireRustDevelopersPage() {
  return (
    <>
      <Nav />
      <HireRustContent />
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
