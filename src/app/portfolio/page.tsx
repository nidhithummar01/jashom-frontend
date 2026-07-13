import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import QuickActions from "@/components/QuickActions";
import PortfolioContent from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Jashom Portfolio | AI, Cloud & Digital Transformation Projects",
  description:
    "Explore Jashom's portfolio showcasing AI, cloud, and digital transformation projects delivering scalable and high performance solutions.",
  alternates: { canonical: "https://www.jashom.com/portfolio/" },
};

export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <PortfolioContent />
      <Footer />
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
