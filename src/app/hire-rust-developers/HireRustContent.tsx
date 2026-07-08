"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import HireRustHeroSvg from "./HireRustHeroSvg";
import { submitContactForm } from "@/lib/submitContact";

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

const REVIEWS = [
  { quote: "With Rust expertise from Jashom, we improved backend reliability and delivered a safer production architecture.", who: "CTO, SaaS Platform" },
  { quote: "Their engineering team quickly understood our infrastructure needs and helped us build a performant Rust-based service layer.", who: "VP Engineering, Cloud Company" },
  { quote: "Clear communication, strong ownership and practical Rust architecture made the engagement smooth from start to finish.", who: "Product Lead, Technology Startup" },
];

const RELATED = [
  { title: "GPU Optimization Service", body: "Finetune your GPU workloads for maximum speed and efficiency, eliminating bottlenecks and maximizing resource utilization.", href: "/gpu-optimization-service/" },
  { title: "CUDA Development Service", body: "Build high-performance parallel applications with expert CUDA development tailored for speed, scalability and precision.", href: "/cuda-development-service/" },
];

const CONTACT_HIGHLIGHTS = [
  { title: "Quick Response", body: "Project inquiries are answered within 24 hours." },
  { title: "Flexible Hiring", body: "Decide on engagement models to meet project requirements." },
  { title: "Expert Developers", body: "Work with experienced Rust engineers for modern software solutions." },
];

const HIRING_OPTIONS = ["Full-Time", "Part-Time", "Time & Material", "Custom Model"];

const FAQS = [
  { q: "What makes Rust a good option for a new business application?", a: "Rust is memory safe, performance efficient and strongly suited to concurrency, making it popular for secure, fast and scalable applications. It is especially useful for modern backend systems, infrastructure software and high-performance applications." },
  { q: "Which industries benefit from Rust development services?", a: "Rust is widely used in SaaS, fintech, blockchain, cybersecurity, cloud infrastructure, gaming systems and enterprise backend solutions." },
  { q: "Can your Rust developers work with existing development teams?", a: "Absolutely. Our Rust developers can integrate with in-house development teams, external vendors and DevOps engineers using agile development workflows." },
  { q: "Do you offer maintenance and support after project completion?", a: "Yes. After deployment, we provide ongoing maintenance, performance optimization, technical support, feature enhancements and infrastructure updates." },
  { q: "How do you ensure code quality in Rust development?", a: "We follow rigorous coding standards, peer reviews, automated testing, performance optimization and secure coding practices to produce high-quality Rust applications." },
  { q: "Why should I hire Rust developers from Jashom?", a: "Jashom offers expert Rust developers, flexible engagement options, scalable development solutions, clear communication and reliable technical support for modern software projects." },
];

function Cards({ items, cols = "sm:grid-cols-2 lg:grid-cols-3" }: { readonly items: { title: string; body: string }[]; readonly cols?: string }) {
  return (
    <Stagger className={`grid ${cols} border-t border-line`} itemClassName="h-full" step={0.05}>
      {items.map((c) => (
        <div key={c.title} className="group h-full p-5 md:p-6 border-b border-line hover:bg-tint transition-all duration-300">
          <h3 className="font-sans font-medium text-[1rem] text-ink mb-2">{c.title}</h3>
          <p className="text-[0.875rem] text-ink-2">{c.body}</p>
        </div>
      ))}
    </Stagger>
  );
}

export default function HireRustContent() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
            <Cards items={EXPERTISE} />
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
            <Cards items={WHY_BUSINESSES} />
          </div>
        </section>

        {/* Hiring models */}
        <section className="section" id="hiring-models">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Flexible Hiring Models</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">Select engagement options suited to project needs, business priorities and development timeframes.</p></Reveal>
            </div>
            <Cards items={HIRING_MODELS} cols="sm:grid-cols-2 lg:grid-cols-4" />
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
            <Cards items={WHY_CHOOSE} />
          </div>
        </section>

        {/* Reviews */}
        <section className="section bg-paper border-y border-line" id="reviews">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Trusted by Startups, SaaS Brands &amp; Technology Companies</SplitHeading>
              <Reveal><p className="text-ink-2 text-[1.0625rem] max-w-[60ch]">With our expertise in Rust, businesses can build secure digital products, robust backend systems, cloud-ready solutions and scalable software architectures that promote sustainable growth.</p></Reveal>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {REVIEWS.map((t, i) => (
                <Reveal key={t.who} delay={i * 0.08} className="h-full">
                  <figure className="h-full flex flex-col p-6 md:p-8 hover:bg-tint transition-all duration-300 border border-line">
                    <blockquote className="font-mono text-[18px] leading-[1.4] text-ink flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
                    <figcaption className="mt-6 pt-5 border-t border-line text-[0.9375rem] text-ink-2">{t.who}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Related services */}
        <section className="section" id="related">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Explore Related Development Services</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[60ch]">Browse complementary GPU-oriented services that can make systems even more performance-efficient and scalable.</p></Reveal>
            </div>
            <Stagger className="grid md:grid-cols-2 gap-6" step={0.08}>
              {RELATED.map((r) => (
                <div key={r.title} className="group flex flex-col p-6 md:p-8 border border-line hover:bg-tint transition-all duration-300">
                  <h3 className="text-[1.25rem] font-medium mb-3">{r.title}</h3>
                  <p className="text-ink-2 mb-6 flex-1">{r.body}</p>
                  <a href={r.href} className="link-line text-ink font-medium text-[0.9375rem] w-fit">Know More →</a>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* FAQ */}
        <section className="section bg-paper border-y border-line" id="faq">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">FAQs</span>
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Frequently Asked Questions</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">Common questions about hiring Rust developers from Jashom.</p></Reveal>
            </div>
            <div className="border-t border-line max-w-3xl">
              {FAQS.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-5 text-ink font-medium">
                    {f.q}
                    <span className="text-ink-2 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="text-ink-2 pb-5 max-w-[60ch]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section" id="contact">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Get Started with Expert Rust Developers</SplitHeading>
                <Reveal><p className="text-ink-2 max-w-[48ch]">Let us know your project needs and we will get in touch within 24 hours. We will support you in hiring the best Rust developers that match your technical objectives, scalability requirements and development strategy.</p></Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-2 flex flex-col gap-5">
                    {CONTACT_HIGHLIGHTS.map((h) => (
                      <div key={h.title}>
                        <p className="text-ink font-medium mb-1">{h.title}</p>
                        <p className="text-[0.9375rem] text-ink-2">{h.body}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
              <div className="lg:col-span-7">
                {status === "sent" ? (
                  <div className="h-full flex flex-col items-start justify-center bg-linen border border-line rounded-none p-10">
                    <p className="font-mono text-3xl mb-3">Request received.</p>
                    <p className="text-ink-2">Thank you — we&rsquo;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <Reveal delay={0.08}>
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        const model = fd.get("model") as string;
                        const rawMsg = (fd.get("message") as string) || "";
                        setStatus("loading");
                        try {
                          await submitContactForm({
                            fullName: fd.get("name") as string,
                            email: fd.get("email") as string,
                            phone: fd.get("phone") as string,
                            company: fd.get("company") as string,
                            message: model ? `[Hiring Model: ${model}]\n\n${rawMsg}` : rawMsg || "Hire Rust Developer enquiry",
                          });
                          setStatus("sent");
                        } catch (err) {
                          setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
                          setStatus("error");
                        }
                      }} className="grid sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5"><label htmlFor="name" className="text-sm text-ink-2">Full Name *</label><input id="name" name="name" required autoComplete="name" className="field-j" placeholder="Your name" /></div>
                      <div className="flex flex-col gap-1.5"><label htmlFor="email" className="text-sm text-ink-2">Email Address *</label><input id="email" name="email" type="email" required autoComplete="email" className="field-j" placeholder="you@company.com" /></div>
                      <div className="flex flex-col gap-1.5"><label htmlFor="phone" className="text-sm text-ink-2">Phone Number</label><input id="phone" name="phone" type="tel" autoComplete="tel" className="field-j" placeholder="+91" /></div>
                      <div className="flex flex-col gap-1.5"><label htmlFor="company" className="text-sm text-ink-2">Company Name</label><input id="company" name="company" autoComplete="organization" className="field-j" placeholder="Company name" /></div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label htmlFor="model" className="text-sm text-ink-2">Preferred Hiring Model</label>
                        <select id="model" name="model" defaultValue="" className="field-j">
                          <option value="" disabled>Select a hiring model</option>
                          {HIRING_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2"><label htmlFor="message" className="text-sm text-ink-2">Project Requirements</label><textarea id="message" name="message" rows={5} className="field-j resize-y" placeholder="Tell us about your project and goals." /></div>
                      <div className="sm:col-span-2 flex flex-col items-start gap-2">
                        {status === "error" && <p className="text-[0.8125rem] text-red-600">{errorMsg}</p>}
                        <button type="submit" disabled={status === "loading"} className="btn btn-primary disabled:opacity-60">{status === "loading" ? "Sending…" : "Submit Request"}</button>
                      </div>
                    </form>
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
