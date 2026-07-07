import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Customizer from "@/components/Customizer";
import QuickActions from "@/components/QuickActions";
import PortfolioContent from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Portfolio | AI, GPU & Healthcare Solutions | Jashom",
  description:
    "Explore Jashom's portfolio of applied AI, GPU optimization, and healthcare AI systems. Powering AI and redefining efficiency.",
};

export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <PortfolioContent />
      <Footer />
      <Customizer />
      <QuickActions
        actions={[
          { label: "Request Similar Work", href: "/contact/" },
          { label: "View All Projects", href: "/portfolio/" },
          { label: "Get a Quote", href: "/contact/" },
        ]}
      />
    </>
  );
}
