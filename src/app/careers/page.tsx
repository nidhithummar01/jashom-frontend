import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Customizer from "@/components/Customizer";
import QuickActions from "@/components/QuickActions";
import CareersContent from "./CareersContent";

export const metadata: Metadata = {
  title: "Careers at Jashom | Join Our Team",
  description:
    "Join the team to create digital products that the world has never seen before! Explore career opportunities at Jashom.",
};

export default function CareersPage() {
  return (
    <>
      <Nav />
      <CareersContent />
      <Footer />
      <Customizer />
      <QuickActions
        actions={[
          { label: "View Openings", href: "/careers/" },
          { label: "Apply Now", href: "/contact/" },
          { label: "Learn About Us", href: "/about-us/" },
        ]}
      />
    </>
  );
}
