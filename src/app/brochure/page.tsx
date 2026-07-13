import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import QuickActions from "@/components/QuickActions";
import BrochureContent from "./BrochureContent";

export const metadata: Metadata = {
  title: "Company Brochure | Jashom Technologies",
  description:
    "Download Jashom's company brochure to learn about our GPU optimization, CUDA development, and high-performance computing services.",
  alternates: { canonical: "https://www.jashom.com/brochure/" },
};

export default function BrochurePage() {
  return (
    <>
      <Nav />
      <BrochureContent />
      <Footer />
      <QuickActions
        actions={[
          { label: "Download Brochure", href: "/brochure/jashom-brochure.pdf", external: true },
          { label: "Contact Us", href: "/contact/" },
          { label: "View Services", href: "/gpu-optimization-service/" },
        ]}
      />
    </>
  );
}
