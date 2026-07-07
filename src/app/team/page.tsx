import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Customizer from "@/components/Customizer";
import QuickActions from "@/components/QuickActions";
import TeamContent from "./TeamContent";

export const metadata: Metadata = {
  title: "Our Team | Jashom — GPU & CUDA Engineers",
  description:
    "Meet the GPU engineers, CUDA specialists, and systems architects behind Jashom's high-performance computing solutions. A focused team built for measurable results.",
};

export default function TeamPage() {
  return (
    <>
      <Nav />
      <TeamContent />
      <Footer />
      <Customizer />
      <QuickActions
        actions={[
          { label: "About Jashom", href: "/about-us/" },
          { label: "Work with us", href: "/contact/" },
          { label: "Open Roles", href: "/careers/" },
        ]}
      />
    </>
  );
}
