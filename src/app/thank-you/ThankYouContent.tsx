"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";

export default function ThankYouContent() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (seconds <= 0) {
      router.push("/");
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, router]);

  return (
    <section className="always-dark relative bg-[#09090b] min-h-[80vh] flex items-center overflow-clip border-b border-line">
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="container-j relative text-center max-w-2xl mx-auto flex flex-col items-center py-24">
        {/* Animated check circle */}
        <motion.div
          className="mb-8 flex items-center justify-center w-20 h-20 rounded-full border border-white/20 bg-white/5"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <motion.path
              d="M8 18.5L14.5 25L28 11"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            />
          </motion.svg>
        </motion.div>

        <Reveal>
          <span className="font-mono text-[0.75rem] tracking-[0.25em] text-ink-3 uppercase block mb-3">
            Message Received
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="text-[clamp(2.25rem,6vw,3.75rem)] leading-none text-ink font-bold tracking-tight mb-5">
            Thank You!
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-[0.9375rem] text-ink-2 leading-relaxed max-w-[46ch] mb-10">
            We&apos;ve received your message and our team will get back to you within <strong className="text-ink">24 hours</strong>. In the meantime, feel free to explore our work.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="/portfolio/" className="btn-primary px-8 py-3.5 text-[0.875rem] font-mono uppercase tracking-wider">
              View Our Work
            </a>
            <a href="/" className="btn-secondary px-8 py-3.5 text-[0.875rem] font-mono uppercase tracking-wider">
              Back to Home
            </a>
          </div>
        </Reveal>

        {/* Auto-redirect countdown */}
        <Reveal delay={0.2}>
          <p className="font-mono text-[0.72rem] text-ink-3">
            Redirecting to home in{" "}
            <span className="text-ink">{seconds}s</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
