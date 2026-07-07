import Nav from "@/components/Nav";
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
import Customizer from "@/components/Customizer";

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
      <Customizer />
    </>
  );
}
