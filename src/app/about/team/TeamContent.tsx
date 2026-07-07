"use client";

import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";

const TEAM = [
  { name: "Jay Dave", role: "Founder", bio: "Visionary founder leading the company's strategy, innovation, and long-term growth." },
  { name: "Maxime Derian", role: "Partner (Europe Region)", bio: "Leads business growth and partnerships across the European market." },
  { name: "Soham Thaker", role: "Tech Lead", bio: "Leads technical strategy and architecture, ensuring scalable and high-quality solutions across projects." },
  { name: "Dhwanan Gadani", role: "Partner & Delivery Head", bio: "Manages project delivery and client success, ensuring timely execution and quality outcomes." },
  { name: "Archana Trivedi", role: "Operations Manager", bio: "Oversees day-to-day operations to ensure smooth execution, efficiency, and process excellence." },
  { name: "Abhishek Bhagwat", role: "Sales Manager", bio: "Drives sales strategy and client acquisition by aligning business needs with tailored solutions." },
];

export default function TeamContent() {
  const reduced = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section id="hero" className="always-dark relative min-h-[45svh] flex flex-col overflow-clip">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative flex-1 flex flex-col justify-center pt-28 pb-10 max-w-3xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase mb-6">
            Our Team
          </motion.p>
          <h1 className="text-[clamp(1.6rem,2.5vw,2.1rem)] leading-[1.1]">
            <span className="block overflow-clip">
              <motion.span className="block"
                initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                animate={{ transform: "translateY(0%)" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                Meet the Team
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mt-7 max-w-[58ch] text-[1.0625rem] text-ink-2">
            The talented individuals driving innovation and excellence at Jashom.
          </motion.p>
        </div>
      </section>

      <main>
        <section className="section" id="team">
          <div className="container-j">
            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-line" itemClassName="h-full" step={0.06}>
              {TEAM.map((m) => (
                <div key={m.name} className="group h-full p-6 md:p-8 border-b border-line hover:bg-tint transition-all duration-300">
                  <h2 className="text-[1.25rem] font-medium text-ink">{m.name}</h2>
                  <p className="font-mono text-[0.8125rem] tracking-wider text-ink-3 uppercase mt-1 mb-4">{m.role}</p>
                  <p className="text-[0.9375rem] text-ink-2">{m.bio}</p>
                </div>
              ))}
            </Stagger>
            <Reveal className="mt-12">
              <p className="text-ink-2">Want to join us? <a href="/careers/" className="link-line text-ink font-medium">View open roles →</a></p>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
