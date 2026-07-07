"use client";

import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";


// ─── Data ────────────────────────────────────────────────────────────────────

const TEAM = [
  {
    name: "Jay Dave",
    role: "Founder",
    bio: "Visionary founder leading the company's strategy, innovation, and long-term growth.",
    linkedin: "https://www.linkedin.com/in/jayksdave/",
    photo: "/team/jay-dave-hiring.png",
    photoClass: "object-cover object-center scale-[1.4]",
  },
  {
    name: "Maxime Derian",
    role: "Partner (Europe Region)",
    bio: "Leads business growth and partnerships across the European market.",
    linkedin: "https://www.linkedin.com/in/maxime-derian/",
    photo: "/team/maxime-derian.jpg",
  },
  {
    name: "Soham Thaker",
    role: "Tech Lead",
    bio: "Leads technical strategy and architecture, ensuring scalable and high-quality solutions across projects.",
    linkedin: "https://www.linkedin.com/in/thakersoham/",
    photo: "/team/soham-thaker.jpg",
  },
  {
    name: "Dhwanan Gadani",
    role: "Partner & Delivery Head",
    bio: "Manages project delivery and client success, ensuring timely execution and quality outcomes.",
    linkedin: "https://www.linkedin.com/in/dhwanan/",
    photo: "/team/dhwanan-gadani.jpg",
  },
  {
    name: "Archana Trivedi",
    role: "Operations Manager",
    bio: "Oversees day-to-day operations to ensure smooth execution, efficiency, and process excellence.",
    linkedin: "https://www.linkedin.com/in/archana-trivedi-326b65110/",
    photo: "/team/archana-trivedi.jpg",
  },
  {
    name: "Abhishek Bhagwat",
    role: "Lead CUDA Engineer",
    bio: "Specializes in kernel-level optimization and memory hierarchy tuning. Has delivered 100x+ throughput improvements across ML training pipelines.",
    linkedin: "https://www.linkedin.com/in/abhishek-bhagwat-037221248/",
    photo: "/team/abhishek-bhagwat.jpg",
  },
];

const VALUES = [
  {
    label: "6+",
    desc: "Engineers on staff",
  },
  {
    label: "8+",
    desc: "Years avg. GPU exp.",
  },
  {
    label: "20+",
    desc: "Industries served",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TeamContent() {
  const reduced = useReducedMotion();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section id="hero" className="always-dark relative min-h-[60svh] flex flex-col overflow-clip">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative flex-1 flex items-center pt-28 pb-10">
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase mb-6"
            >
              Team · GPU Engineers · CUDA · Rust
            </motion.p>
            <h1 className="text-[clamp(1.6rem,2.5vw,2.1rem)] leading-[1.1]">
              <span className="block overflow-clip">
                <motion.span
                  className="block"
                  initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                  animate={{ transform: "translateY(0%)" }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                >
                  The engineers behind
                </motion.span>
              </span>
              <span className="block overflow-clip">
                <motion.span
                  className="block"
                  initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                  animate={{ transform: "translateY(0%)" }}
                  transition={{ duration: 0.9, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  Jashom's GPU expertise
                </motion.span>
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="mt-7 max-w-[58ch] text-[1.0625rem] text-ink-2"
            >
              A focused team of GPU engineers, CUDA specialists, and systems architects—built to deliver measurable compute performance, not presentations.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.7, delay: 0.66, ease: [0.23, 1, 0.32, 1] }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Magnetic strength={0.18}>
                <a href="/contact/" className="btn btn-primary">Work with us</a>
              </Magnetic>
              <a href="/portfolio/" className="btn btn-secondary">See our work</a>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── Quick stats bar ───────────────────────────────────── */}
      <section className="border-b border-line bg-linen">
        <div className="container-j grid grid-cols-3 divide-x divide-line">
          {VALUES.map(({ label, desc }) => (
            <div key={label} className="flex flex-col items-center justify-center gap-1 py-8">
              <span className="font-mono font-bold text-[clamp(1.6rem,3vw,2.4rem)] text-ink leading-none">{label}</span>
              <span className="font-mono text-[0.75rem] text-ink-3 uppercase tracking-widest">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team grid ─────────────────────────────────────────── */}
      <section className="section" id="team">
        <div className="container-j">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase mb-4 block">Our People</span>
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">
              Every engineer is a specialist
            </SplitHeading>
            <Reveal>
              <p className="mt-5 text-ink-2 text-[1.0625rem] max-w-[58ch]">
                We hire for depth, not breadth. Each member brings genuine expertise in their domain—kernel engineering, systems design, or AI infrastructure.
              </p>
            </Reveal>
          </div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-line"
            style={{ gridAutoRows: "1fr" }}
          >
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className="flex flex-col border-r border-b border-line p-6 md:p-8 hover:bg-tint transition-all duration-300"
              >
                {/* Photo + name header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 flex-shrink-0 overflow-hidden border border-line">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className={`w-full h-full transition-transform duration-300 ${member.photoClass ?? "object-cover object-top"}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-[1rem] text-ink leading-tight">{member.name}</h3>
                    <p className="font-mono text-[0.75rem] text-ink-3 tracking-wider uppercase mt-0.5">{member.role}</p>
                  </div>
                </div>

                {/* Bio — grows to fill */}
                <p className="text-[0.9375rem] text-ink-2 leading-relaxed flex-1">{member.bio}</p>

                {/* LinkedIn — pinned to bottom */}
                <div className="mt-6 pt-5 border-t border-line">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="inline-flex items-center gap-2 font-mono text-[0.75rem] text-ink-3 uppercase tracking-wider border border-line px-3 py-2 hover:border-ink hover:text-ink transition-all duration-200"
                  >
                    {/* LinkedIn SVG mark */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hiring CTA ────────────────────────────────────────── */}
      <section className="section bg-paper border-y border-line" id="join">
        <div className="container-j">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <span className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase">Join the team</span>
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">
                We're always looking for great engineers
              </SplitHeading>
              <Reveal>
                <p className="text-ink-2 text-[1.0625rem] max-w-[55ch]">
                  If you're deeply technical, obsessed with performance, and want to work on real GPU systems—we'd like to talk. No bureaucracy, just engineering.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Magnetic strength={0.18}>
                <a href="/careers/" className="btn btn-primary w-full text-center">View open roles</a>
              </Magnetic>
              <a href="/contact/" className="btn btn-secondary w-full text-center">Send your CV directly</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
