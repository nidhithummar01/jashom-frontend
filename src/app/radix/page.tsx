import Nav from "@/components/radix/Nav";
import Hero from "@/components/radix/sections/Hero";
import AskChatGPT from "@/components/radix/sections/AskChatGPT";
import UsedBy from "@/components/radix/sections/UsedBy";
import WhatWeDo from "@/components/radix/sections/WhatWeDo";
import Services from "@/components/radix/sections/Services";
import TrustStats from "@/components/radix/sections/TrustStats";
import CaseStudies from "@/components/radix/sections/CaseStudies";
import SupportedLanguages from "@/components/radix/sections/SupportedLanguages";
import Testimonials from "@/components/radix/sections/Testimonials";
import WhyJashom from "@/components/radix/sections/WhyJashom";
import Blog from "@/components/radix/sections/Blog";
import Contact from "@/components/radix/sections/Contact";
import FinalCTA from "@/components/radix/sections/FinalCTA";
import Footer from "@/components/radix/sections/Footer";

export default function RadixHome() {
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
