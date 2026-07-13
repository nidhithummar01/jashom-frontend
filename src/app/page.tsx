import type { Metadata } from "next";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "GPU Optimization Services & CUDA Development Company | Jashom",
  description:
    "Jashom provides advanced GPU optimization, CUDA development, and high-performance computing solutions to accelerate AI, simulation, and enterprise workloads efficiently.",
  alternates: { canonical: "https://www.jashom.com/" },
};
import Hero from "@/components/sections/Hero";
import AskChatGPT from "@/components/sections/AskChatGPT";
import UsedBy from "@/components/sections/UsedBy";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Services from "@/components/sections/Services";
import TrustStats from "@/components/sections/TrustStats";
import CaseStudies from "@/components/sections/CaseStudies";
import SupportedLanguages from "@/components/sections/SupportedLanguages";
import Testimonials from "@/components/sections/Testimonials";
import WhyJashom from "@/components/sections/WhyJashom";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <AskChatGPT />
        <UsedBy />
        <WhatWeDo />
        <Services />
        <TrustStats />
        <CaseStudies />
        <SupportedLanguages />
        <Testimonials />
        <WhyJashom />
        <Blog />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
