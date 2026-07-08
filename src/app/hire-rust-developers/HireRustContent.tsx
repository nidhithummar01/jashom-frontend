"use client";

import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import HireRustHeroSvg from "./HireRustHeroSvg";
import HireCards from "@/components/HireCards";
import { RELATED_SERVICES as RELATED } from "@/lib/relatedServices";
import FaqAccordion, { type FaqItem } from "@/components/sections/FaqAccordion";
import HireContactForm, { type ContactHighlight } from "@/components/sections/HireContactForm";
import RelatedServicesSection from "@/components/sections/RelatedServicesSection";
import TestimonialGrid, { type Testimonial } from "@/components/sections/TestimonialGrid";

const BADGES = [
  { label: "Flexible Hiring", sub: "Scalable engagement models" },
  { label: "Technical Expertise", sub: "Experienced Rust engineers" },
  { label: "On-Time", sub: "Reliable delivery" },
];

const EXPERTISE = [
  { title: "Backend API Development", body: "We develop scalable REST APIs, GraphQL APIs and backend platforms in Rust that are fast, secure and performant in high traffic." },
  { title: "Cloud-Native Application Engineering", body: "Our engineers create Rust applications optimized for Kubernetes, microservices architectures and modern DevOps workflows using containers and cloud platforms." },
  { title: "Distributed Systems Architecture", body: "We create distributed applications that efficiently process concurrent workloads, asynchronous processing and large-scale infrastructure operations." },
  { title: "Blockchain & Web3 Solutions", body: "Our Rust developers build safe blockchain applications, smart contract ecosystems, crypto infrastructure and decentralized platforms for Web3 businesses." },
  { title: "System-Level Programming", body: "We create low-level applications, networking solutions, embedded software and infrastructure components where performance and resource usage are vital." },
  { title: "Performance Optimization & Refactoring", body: "We optimize existing applications for execution speed, memory usage and concurrency, while modernizing legacy architectures." },
];

const HIRE_STEPS = [
  { title: "Discuss Your Project Vision", body: "Tell us your technical needs, business objectives, application scope and scaling goals so we can understand where Rust expertise is required." },
  { title: "Evaluate Rust Developer Profiles", body: "Review skilled Rust developers with experience in backend systems, cloud infrastructure, blockchain, distributed computing and enterprise software." },
  { title: "Choose Engagement Structure", body: "Choose dedicated developers, project-based teams, full-time employees or flexible scaling models based on your delivery needs." },
  { title: "Launch Development Process", body: "Our Rust developers integrate into your workflow and begin building secure, scalable and efficient software solutions." },
];

const WHY_BUSINESSES = [
  { title: "Product-Focused Engineering", body: "We build Rust programs with business goals, usability, scalability, maintainability and long-term stability in mind." },
  { title: "Clean & Scalable Codebase", body: "Our developers use modern standards, modular architecture and maintainable coding methods for future-ready applications." },
  { title: "Strong Security Standards", body: "We use secure coding techniques, protected infrastructure procedures and compliance-based development practices." },
  { title: "Fast & Transparent Communication", body: "We keep communication clear with agile reporting, milestone tracking and collaborative workflows throughout delivery." },
  { title: "Experienced Technical Team", body: "Our Rust engineers have real-world experience in SaaS applications, infrastructure tools, cloud systems and enterprise platforms." },
  { title: "Scalable Resource Allocation", body: "Scale resources up and down with project growth, shifting priorities and new technical requirements." },
];

const HIRING_MODELS = [
  { title: "Full-Time", body: "Hire dedicated Rust developers for long-term projects involving backend systems, cloud applications and scalable software development." },
  { title: "Part-Time", body: "Outsource Rust developers on a part-time basis for maintenance, optimization, upgrades and ongoing technical improvements." },
  { title: "Time & Material", body: "Scale development resources flexibly with changing project requirements, iterative development cycles and evolving business needs." },
  { title: "Custom Model", body: "Receive a customized hiring plan based on your technical goals, project complexity, scheduling and budget requirements." },
];

const WHY_CHOOSE = [
  { title: "Modern Software Architecture", body: "We build scalable, maintainable architectures for future growth, seamless integration, improved performance and long-term application development." },
  { title: "Reliable Production Deployment", body: "We deploy tested software with CI/CD workflows, optimized infrastructure and stable release processes for production environments." },
  { title: "Business-Centric Development", body: "We align software development with your business objectives, processes, customer needs and scalability requirements." },
  { title: "Agile Development Execution", body: "Our agile approach supports transparent collaboration, faster iterations, continuous improvement and flexible execution." },
  { title: "Long-Term Technical Support", body: "Our team offers ongoing maintenance, performance optimization, feature enhancements and troubleshooting." },
  { title: "Optimized Development Efficiency", body: "We improve turnaround using scalable coding practices, streamlined workflows, reusable architecture patterns and optimized engineering methods." },
];

const REVIEWS: Testimonial[] = [
  { quote: "With Rust expertise from Jashom, we improved backend reliability and delivered a safer production architecture.", name: "CTO", org: "SaaS Platform" },
  { quote: "Their engineering team quickly understood our infrastructure needs and helped us build a performant Rust-based service layer.", name: "VP Engineering", org: "Cloud Company" },
  { quote: "Clear communication, strong ownership and practical Rust architecture made the engagement smooth from start to finish.", name: "Product Lead", org: "Technology Startup" },
];

const CONTACT_HIGHLIGHTS: ContactHighlight[] = [
  { title: "Quick Response", body: "Project inquiries are answered within 24 hours." },
  { title: "Flexible Hiring", body: "Decide on engagement models to meet project requirements." },
  { title: "Expert Developers", body: "Work with experienced Rust engineers for modern software solutions." },
];

const HIRING_OPTIONS = ["Full-Time", "Part-Time", "Time & Material", "Custom Model"];

const FAQS: FaqItem[] = [
  { q: "What makes Rust a good option for a new business application?", a: "Rust is memory safe, performance efficient and strongly suited to concurrency, making it popular for secure, fast and scalable applications. It is especially useful for modern backend systems, infrastructure software and high-performance applications." },
  { q: "Which industries benefit from Rust development services?", a: "Rust is widely used in SaaS, fintech, blockchain, cybersecurity, cloud infrastructure, gaming systems and enterprise backend solutions." },
  { q: "Can your Rust developers work with existing development teams?", a: "Absolutely. Our Rust developers can integrate with in-house development teams, external vendors and DevOps engineers using agile development workflows." },
  { q: "Do you offer maintenance and support after project completion?", a: "Yes. After deployment, we provide ongoing maintenance, performance optimization, technical support, feature enhancements and infrastructure updates." },
  { q: "How do you ensure code quality in Rust development?", a: "We follow rigorous coding standards, peer reviews, automated testing, performance optimization and secure coding practices to produce high-quality Rust applications." },
  { q: "Why should I hire Rust developers from Jashom?", a: "Jashom offers expert Rust developers, flexible engagement options, scalable development solutions, clear communication and reliable technical support for modern software projects." },
];

export default function HireRustContent() {
  const reduced = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section id="hero" className="always-dark relative min-h-[60svh] flex flex-col overflow-clip">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative flex-1 grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-12 items-center pt-28 pb-10">
          <div className="flex flex-col justify-center">
            <h1 className="text-[clamp(1.6rem,2.5vw,2.1rem)] leading-[1.1]">
              <span className="block overflow-clip">
                <motion.span className="block"
                  initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                  animate={{ transform: "translateY(0%)" }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                  Hire Rust Developers
                </motion.span>
              </span>
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-5 font-mono text-[0.9375rem] text-ink-3">
              Rust Programming Experts | Systems Programming Engineers | High-Performance Backend Specialists
            </motion.p>
            <motion.p
              initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
              className="mt-6 max-w-[58ch] text-[1.0625rem] text-ink-2">
              Hire experienced Rust developers to create safe, efficient and modern software for digital products. We use Rust at Jashom to build blazing fast backends, APIs, cloud-native applications, developer tools, and distributed platforms for startups, SaaS, and enterprise.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="mt-9 flex flex-col gap-6">
              <Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary w-fit">HIRE DEDICATED RUST DEVELOPERS</a></Magnetic>
              <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[0.875rem]">
                {BADGES.map((b) => (
                  <li key={b.label} className="flex flex-col">
                    <span className="text-ink font-medium">{b.label}</span>
                    <span className="text-ink-2 text-[0.8125rem]">{b.sub}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:block">
            <HireRustHeroSvg />
          </motion.div>
        </div>
      </section>

      <main>
        {/* Intro */}
        <section className="section" id="intro">
          <div className="container-j">
            <div className="max-w-3xl flex flex-col gap-5">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Accelerate Modern Software Development with Rust Engineers</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[68ch]">With the rise of Rust, it has emerged as one of the reliable and high-performing programming languages for software development. Rust development supports businesses in modernizing infrastructure, reducing operational overhead, and building highly scalable software systems. We develop software for huge workloads, operational efficiency and memory safety including cloud-native applications, API development, distributed systems and blockchain solutions.</p></Reveal>
              <Reveal delay={0.1}><Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary">Talk to Our Developers</a></Magnetic></Reveal>
            </div>
          </div>
        </section>

        {/* Technical expertise */}
        <section className="section bg-paper border-y border-line" id="expertise">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Technical Expertise of Our Rust Developers</SplitHeading>
            </div>
            <HireCards items={EXPERTISE} />
          </div>
        </section>

        {/* How to hire */}
        <section className="section" id="how-to-hire">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">How to Hire Our Rust Developers?</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">The process of hiring Rust developers for your project is simple, transparent, and efficient.</p></Reveal>
            </div>
            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-line" itemClassName="h-full" step={0.05}>
              {HIRE_STEPS.map((p, i) => (
                <div key={p.title} className="group h-full p-5 md:p-6 border-b border-line hover:bg-tint transition-all duration-300">
                  <span className="font-mono text-[0.875rem] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-sans font-medium text-[1rem] text-ink mt-3 mb-2">{p.title}</h3>
                  <p className="text-[0.875rem] text-ink-2">{p.body}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Why businesses choose */}
        <section className="section bg-paper border-y border-line" id="why-businesses">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Why Businesses Choose Jashom for Rust Development</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">Our engineering skills, scalable architecture and enterprise-centric execution all contribute to reliable Rust solutions.</p></Reveal>
            </div>
            <HireCards items={WHY_BUSINESSES} />
          </div>
        </section>

        {/* Hiring models */}
        <section className="section" id="hiring-models">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Flexible Hiring Models</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">Select engagement options suited to project needs, business priorities and development timeframes.</p></Reveal>
            </div>
            <HireCards items={HIRING_MODELS} cols="sm:grid-cols-2 lg:grid-cols-4" />
          </div>
        </section>

        {/* CTA banner */}
        <section className="relative section always-dark border-y border-line overflow-clip">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
          <div className="container-j relative flex flex-col items-center text-center">
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] text-ink max-w-2xl">Looking to Build Faster, Safer &amp; Scalable Applications?</SplitHeading>
            <Reveal delay={0.1}><p className="mt-6 text-ink-2 max-w-[58ch]">Partner with our experienced Rust programmers to build efficient, secure and scalable software solutions.</p></Reveal>
            <Reveal delay={0.18}><div className="mt-10"><Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary">Get Started</a></Magnetic></div></Reveal>
          </div>
        </section>

        {/* Why choose Jashom */}
        <section className="section" id="why-choose">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Why Choose Jashom for Rust Development?</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">We support businesses to develop and design future-ready software systems using modern Rust engineering practices and scalable development strategy.</p></Reveal>
            </div>
            <HireCards items={WHY_CHOOSE} />
          </div>
        </section>

        <TestimonialGrid
          heading="Trusted by Startups, SaaS Brands &amp; Technology Companies"
          subtitle="With our expertise in Rust, businesses can build secure digital products, robust backend systems, cloud-ready solutions and scalable software architectures that promote sustainable growth."
          items={REVIEWS}
        />

        <RelatedServicesSection
          heading="Explore Related Development Services"
          subtitle="Browse complementary GPU-oriented services that can make systems even more performance-efficient and scalable."
          items={RELATED}
        />

        <FaqAccordion
          subtitle="Common questions about hiring Rust developers from Jashom."
          items={FAQS}
          sectionClassName="section bg-paper border-y border-line"
        />

        <HireContactForm
          heading="Get Started with Expert Rust Developers"
          description="Let us know your project needs and we will get in touch within 24 hours. We will support you in hiring the best Rust developers that match your technical objectives, scalability requirements and development strategy."
          highlights={CONTACT_HIGHLIGHTS}
          hiringOptions={HIRING_OPTIONS}
          messagePlaceholder="Tell us about your project and goals."
          messageFallback="Hire Rust Developer enquiry"
        />
      </main>
    </>
  );
}
