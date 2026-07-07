"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import AboutHeroSvg from "./AboutHeroSvg";

const STATS = [
  { value: "20+", label: "Industries Served", body: "Bringing graphics computing to healthcare, fintech, research, autonomous systems, and enterprise AI." },
  { value: "50k+", label: "GPU Compute Hours Delivered", body: "Performance CUDA workloads running on AI training, simulations, and analytics pipelines." },
  { value: "6 Weeks", label: "Average Implementation Cycle", body: "Planning of structured architecture and quick optimization minimize the time of deployment without affecting its quality." },
  { value: "24/7", label: "Technical Performing Support", body: "This is done through continuous monitoring, debugging, and optimization to ensure the existence of stable GPU execution environments." },
  { value: "98%", label: "Client Retention Rate", body: "Long-term relationships based on the quantifiable performance improvements and open-engineering." },
];

const VALUES = [
  { title: "Performance-driven innovation", body: "Kernel-level CUDA engineering and GPU optimization that produces measurable throughput and latency gains." },
  { title: "Workload-specific engineering", body: "Systems tailored to your data flow, compute profile, and scaling targets—optimized with profiling, not assumptions." },
  { title: "Transparent collaboration", body: "Clear communication, benchmarking reports, and shared performance metrics across every milestone." },
];

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=SATYAM+1+414+AMBA+BUSINESS+PARK+ADALAJ+382421+Gandhinagar+Gujarat";

export default function AboutContent() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <>
      {/* Hero */}
      <section id="hero" className="always-dark relative min-h-[60svh] flex flex-col overflow-clip">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative flex-1 grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-12 items-center pt-28 pb-10">
          <div className="flex flex-col justify-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase mb-6">
            About • GPU Optimization • CUDA • HPC
          </motion.p>
          <h1 className="text-[clamp(1.6rem,2.5vw,2.1rem)] leading-[1.1]">
            <span className="block overflow-clip">
              <motion.span className="block"
                initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                animate={{ transform: "translateY(0%)" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                About Jashom
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mt-7 max-w-[60ch] text-[1.0625rem] text-ink-2">
            We are developing and designing superior-level GPU systems to transform ideas which are rich in compute into scalable, production-ready solutions that are designed to perform in the real world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.7, delay: 0.66, ease: [0.23, 1, 0.32, 1] }}
            className="mt-10 flex flex-wrap gap-4">
            <Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary">Talk to our team</a></Magnetic>
            <a href="/portfolio/" className="btn btn-secondary">View case studies</a>
          </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:block">
            <AboutHeroSvg />
          </motion.div>
        </div>
      </section>

      <main>
        {/* About */}
        <section className="section" id="about">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <div className="sticky top-28 flex flex-col gap-4">
                  <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">About</span>
                  <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Engineering Parallel Performance for Modern Workloads</SplitHeading>
                </div>
              </div>
              <div className="lg:col-span-8 flex flex-col gap-5">
                {[
                  "Our company deals with the design of the GPU architecture and the development of CUDA and optimization of data-intensive applications. We deal with startups, research laboratories, and businesses that require the efficiency of an extra level of computation beyond the CPU.",
                  "Our group is a combination of advanced skills in CUDA programming, memory optimization and multi-GPU coordination to provide stable production ready systems. All solutions are designed based on workload profiling, benchmarking and performance tuning- not assumptions.",
                  "We engineer scalable GPU systems that are used in AI training pipelines, real-time analytics, simulation engines, and scientific computing systems. We achieve this by designing a development strategy that ensures ultimate throughput, eminent latency, and efficient use of resources throughout the deployments.",
                  "With proof-of-concept systems to enterprise-grade systems, we support organizations to leverage the full potential of parallel computing, and at the same time ensure reliability, security and maintainability.",
                ].map((t, i) => (
                  <Reveal key={i} delay={i * 0.06}><p className="text-ink-2 max-w-[66ch]">{t}</p></Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section always-dark border-y border-line" id="stats">
          <div className="container-j">
            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12" step={0.06}>
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <p className="font-mono text-[clamp(2rem,4vw,3rem)] leading-none text-ink font-bold">{s.value}</p>
                  <p className="mt-3 text-[0.9375rem] text-ink uppercase tracking-wider font-mono">{s.label}</p>
                  <p className="mt-3 text-[0.875rem] text-ink-2 max-w-[40ch]">{s.body}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="section" id="vision-mission">
          <div className="container-j">
            <div className="grid md:grid-cols-2 border-t border-line">
              <div className="p-6 md:p-8 border-b md:border-r border-line">
                <p className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase mb-2">We Think in Compute Power</p>
                <h2 className="text-[1.4rem] font-medium mb-4">Vision</h2>
                <p className="text-ink-2 max-w-[48ch]">To promote the use of GPU computing in the world by designing efficient, scalable and future-compatible CUDA architectures.</p>
              </div>
              <div className="p-6 md:p-8 border-b border-line">
                <p className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase mb-2">We Bring Impact</p>
                <h2 className="text-[1.4rem] font-medium mb-4">Mission</h2>
                <p className="text-ink-2 max-w-[48ch]">To help organizations unlock maximum computational performance through precision-driven GPU optimization and parallel engineering expertise.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="relative section always-dark border-y border-line overflow-clip">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
          <div className="container-j relative flex flex-col items-center text-center">
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] text-ink max-w-xl">Want to create something impactful?</SplitHeading>
            <Reveal delay={0.1}><p className="mt-6 text-ink-2 max-w-[52ch]">Let us talk about your ideas, strategies, and how to execute.</p></Reveal>
            <Reveal delay={0.18}><div className="mt-10"><Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary">Contact Us</a></Magnetic></div></Reveal>
          </div>
        </section>

        {/* Values */}
        <section className="section" id="values">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">What you can expect</span>
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Values we deliver</SplitHeading>
            </div>
            <Stagger className="grid md:grid-cols-3 border-t border-line" itemClassName="h-full" step={0.06}>
              {VALUES.map((v) => (
                <div key={v.title} className="group h-full p-5 md:p-6 border-b border-line hover:bg-tint transition-all duration-300">
                  <h3 className="font-sans font-medium text-[1rem] text-ink mb-2">{v.title}</h3>
                  <p className="text-[0.875rem] text-ink-2">{v.body}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Contact */}
        <section className="section bg-paper border-y border-line" id="contact">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Contact us</span>
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Jashom is ready to help you grow.</SplitHeading>
                <Reveal><p className="text-ink-2 max-w-[48ch]">Share your goals with our team and we will help you identify the fastest, most practical way forward.</p></Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-2 text-[0.9375rem] text-ink-2 flex flex-col gap-3">
                    <p className="text-ink font-medium">Our Office</p>
                    <p>SATYAM 1, 414, AMBA BUSINESS PARK, B/H TRI MANDIR, ADALAJ 382421, Dist Gandhinagar Gujarat</p>
                    <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="link-line w-fit text-ink">Open location in Google Maps</a>
                    <a href="mailto:info@jashom.com" className="link-line w-fit text-ink">info@jashom.com</a>
                    <a href="tel:+919023906363" className="link-line w-fit text-ink">+91 90239 06363</a>
                    <p className="text-ink-3 text-[0.8125rem]">Pay us a visit for a cup of coffee. We&rsquo;ll be more than happy to welcome you.</p>
                  </div>
                </Reveal>
              </div>
              <div className="lg:col-span-7">
                {status === "sent" ? (
                  <div className="h-full flex flex-col items-start justify-center bg-linen border border-line rounded-none p-10">
                    <p className="font-mono text-3xl mb-3">Message received.</p>
                    <p className="text-ink-2">Thank you — we&rsquo;ll get back to you shortly.</p>
                  </div>
                ) : (
                  <Reveal delay={0.08}>
                    <div className="flex flex-col gap-6">
                      <div>
                        <h3 className="text-[1.25rem] font-medium mb-2">Ready to Accelerate Your Infrastructure?</h3>
                        <p className="text-ink-2 max-w-[58ch]">Let&rsquo;s analyze your current GPU performance, remove bottlenecks, and engineer scalable CUDA solutions that drive measurable computational gains.</p>
                      </div>
                      <form onSubmit={(e) => { e.preventDefault(); setStatus("sent"); }} className="grid sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5"><label htmlFor="name" className="text-sm text-ink-2">Name</label><input id="name" name="name" required autoComplete="name" className="field-j" placeholder="Your name" /></div>
                        <div className="flex flex-col gap-1.5"><label htmlFor="email" className="text-sm text-ink-2">Email</label><input id="email" name="email" type="email" required autoComplete="email" className="field-j" placeholder="you@company.com" /></div>
                        <div className="flex flex-col gap-1.5 sm:col-span-2"><label htmlFor="message" className="text-sm text-ink-2">Message</label><textarea id="message" name="message" rows={5} required className="field-j resize-y" placeholder="Tell us about your goals." /></div>
                        <div className="sm:col-span-2 flex justify-start"><button type="submit" className="btn btn-primary">Submit</button></div>
                      </form>
                    </div>
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
