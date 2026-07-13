"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";

const HIGHLIGHTS = [
  { icon: "⚡", label: "GPU Optimization", desc: "NVIDIA GPU performance tuning for AI & HPC workloads" },
  { icon: "🔧", label: "CUDA Development", desc: "Custom CUDA kernels and parallel computing solutions" },
  { icon: "🚀", label: "Hire GPU Experts", desc: "Dedicated CUDA & Rust engineers for your team" },
  { icon: "📊", label: "Case Studies", desc: "Real-world results across LLM, cloud, and telemetry" },
];

export default function BrochureContent() {
  return (
    <>
      {/* Hero */}
      <section className="always-dark relative bg-[#09090b] pt-40 pb-24 overflow-clip border-b border-line">
        <div
          className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]"
          aria-hidden="true"
        />
        <div className="container-j relative text-center max-w-3xl mx-auto flex flex-col items-center">
          <motion.span
            className="font-mono text-[0.75rem] tracking-[0.25em] text-ink-3 uppercase block mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Company Brochure
          </motion.span>
          <motion.h1
            className="text-[clamp(2.5rem,6vw,4rem)] leading-none text-ink font-bold tracking-tight mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Everything Jashom,<br />in One Document
          </motion.h1>
          <motion.p
            className="text-[0.9375rem] text-ink-2 max-w-[52ch] leading-relaxed mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our company brochure covers services, capabilities, case studies, and how we can help you unlock maximum GPU performance for AI and enterprise workloads.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="/brochure/jashom-brochure.pdf"
              download="Jashom-Company-Brochure.pdf"
              className="btn-primary flex items-center gap-2.5 px-8 py-3.5 text-[0.875rem] font-mono uppercase tracking-wider"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1v9M4.5 7l3.5 3.5L11.5 7M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download Brochure
            </a>
            <a
              href="/contact/"
              className="btn-secondary flex items-center gap-2 px-8 py-3.5 text-[0.875rem] font-mono uppercase tracking-wider"
            >
              Talk to Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* Brochure preview card + highlights */}
      <section className="section bg-paper border-b border-line">
        <div className="container-j">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* PDF preview card */}
            <Reveal>
              <div className="relative rounded-xl border border-line overflow-hidden shadow-xl bg-white dark:bg-[#111113]">
                {/* Toolbar strip */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#f5f5f5] dark:bg-[#1a1a1c] border-b border-line">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-3 font-mono text-[0.7rem] text-ink-3">Jashom-Company-Brochure.pdf</span>
                </div>
                {/* Cover mockup */}
                <div className="relative aspect-[3/4] bg-[#09090b] flex flex-col items-center justify-center gap-6 px-8 py-12">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]" aria-hidden="true" />
                  {/* Logo area */}
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/jashom-logo-dark.svg"
                      alt="Jashom"
                      width={140}
                      height={40}
                      className="opacity-90"
                    />
                    <div className="h-px w-24 bg-white/20" />
                    <p className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-white/40">Company Brochure</p>
                    <h2 className="text-white text-center text-[1.5rem] font-bold leading-snug tracking-tight mt-2">
                      Precision GPU Engineering<br />for High-Performance AI
                    </h2>
                    <p className="text-white/50 text-[0.8rem] text-center mt-1 max-w-[28ch]">
                      GPU Optimization · CUDA Development · Expert Engineering
                    </p>
                  </div>
                  {/* Bottom bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-white/10 via-white/30 to-white/10" />
                </div>
                {/* Download footer */}
                <div className="flex items-center justify-between px-5 py-4 bg-[#f9f9f8] dark:bg-[#111113] border-t border-line">
                  <span className="font-mono text-[0.72rem] text-ink-3">PDF · Jashom Technologies</span>
                  <a
                    href="/brochure/jashom-brochure.pdf"
                    download="Jashom-Company-Brochure.pdf"
                    className="flex items-center gap-1.5 font-mono text-[0.72rem] text-ink-2 hover:text-ink transition-colors"
                  >
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 1v9M4.5 7l3.5 3.5L11.5 7M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Download
                  </a>
                </div>
              </div>
            </Reveal>

            {/* What's inside */}
            <div className="flex flex-col gap-8 pt-2">
              <Reveal>
                <div>
                  <span className="font-mono text-[0.72rem] tracking-[0.2em] uppercase text-ink-3 mb-2 block">What&apos;s Inside</span>
                  <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight leading-tight text-ink">
                    Everything you need<br />to evaluate Jashom
                  </h2>
                  <p className="mt-4 text-[0.9375rem] text-ink-2 leading-relaxed max-w-[48ch]">
                    From our core GPU engineering services to real client results — this brochure gives decision-makers a complete picture of how Jashom delivers performance.
                  </p>
                </div>
              </Reveal>

              <div className="flex flex-col gap-4">
                {HIGHLIGHTS.map((h, i) => (
                  <Reveal key={h.label} delay={i * 0.07}>
                    <div className="flex items-start gap-4 p-4 rounded-lg border border-line bg-paper hover:border-ink/20 transition-colors">
                      <span className="text-2xl leading-none mt-0.5" aria-hidden="true">{h.icon}</span>
                      <div>
                        <p className="font-bold text-ink text-[0.9375rem]">{h.label}</p>
                        <p className="text-ink-2 text-[0.875rem] mt-0.5 leading-snug">{h.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.3}>
                <a
                  href="/brochure/jashom-brochure.pdf"
                  download="Jashom-Company-Brochure.pdf"
                  className="btn-primary inline-flex items-center gap-2.5 px-8 py-3.5 text-[0.875rem] font-mono uppercase tracking-wider w-fit"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 1v9M4.5 7l3.5 3.5L11.5 7M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download Free Brochure
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="always-dark section bg-[#09090b] border-b border-line">
        <div className="container-j text-center flex flex-col items-center gap-6">
          <Reveal>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-ink leading-tight">
              Ready to accelerate your AI workloads?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-ink-2 text-[0.9375rem] max-w-[48ch] leading-relaxed">
              The brochure is just the start. Get in touch and we&apos;ll show you exactly what Jashom can do for your infrastructure.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact/" className="btn-primary px-8 py-3.5 text-[0.875rem] font-mono uppercase tracking-wider">
                Book a Consultation
              </a>
              <a href="/portfolio/" className="btn-secondary px-8 py-3.5 text-[0.875rem] font-mono uppercase tracking-wider">
                View Case Studies
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
