"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";

// Minimal grid / terminal SVG
function NotFoundSvg() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full max-w-sm h-auto opacity-60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Grid lines */}
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((x) => (
        <line key={`v${x}`} x1={x} y1={0} x2={x} y2={200} stroke="var(--svg-line)" strokeWidth="0.5" />
      ))}
      {[0, 40, 80, 120, 160, 200].map((y) => (
        <line key={`h${y}`} x1={0} y1={y} x2={320} y2={y} stroke="var(--svg-line)" strokeWidth="0.5" />
      ))}

      {/* Centre broken-link node */}
      <rect x="120" y="76" width="80" height="48" stroke="var(--svg-ink)" strokeWidth="1.5" />
      <line x1="120" y1="76" x2="200" y2="124" stroke="var(--svg-ink)" strokeWidth="0.8" strokeDasharray="4 3" />
      <line x1="200" y1="76" x2="120" y2="124" stroke="var(--svg-ink)" strokeWidth="0.8" strokeDasharray="4 3" />

      {/* Left dead-end path */}
      <line x1="80" y1="100" x2="120" y2="100" stroke="var(--svg-line)" strokeWidth="1" strokeDasharray="4 3" />
      <circle cx="72" cy="100" r="6" stroke="var(--svg-line)" strokeWidth="1" />

      {/* Right dead-end path */}
      <line x1="200" y1="100" x2="240" y2="100" stroke="var(--svg-line)" strokeWidth="1" strokeDasharray="4 3" />
      <circle cx="248" cy="100" r="6" stroke="var(--svg-line)" strokeWidth="1" />

      {/* Top label */}
      <text x="160" y="64" textAnchor="middle" fill="var(--svg-line)"
        fontSize="8" fontFamily="var(--font-mono)" letterSpacing="2">
        ROUTE NOT FOUND
      </text>

      {/* Bottom label */}
      <text x="160" y="148" textAnchor="middle" fill="var(--svg-line)"
        fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1">
        / 404 /
      </text>
    </svg>
  );
}

const LINKS = [
  { label: "GPU Optimization", href: "/gpu-optimization-service/" },
  { label: "CUDA Development", href: "/cuda-development-service/" },
  { label: "Hire CUDA Devs", href: "/hire-cuda-developer/" },
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Contact", href: "/contact/" },
];

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="always-dark relative min-h-[100svh] flex flex-col overflow-clip">
        {/* Radial glow */}
        <div
          className="absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_0%,var(--radial-glow),transparent_55%)]"
          aria-hidden="true"
        />

        <div className="container-j relative flex-1 flex flex-col items-center justify-center py-32 text-center gap-10">

          {/* 404 giant number */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="relative select-none"
          >
            <span
              className="font-mono font-bold leading-none text-[clamp(7rem,18vw,14rem)] text-ink"
              style={{ letterSpacing: "-0.04em" }}
            >
              404
            </span>
            {/* Hairline underline accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="absolute bottom-0 left-0 right-0 h-px bg-ink origin-left"
            />
          </motion.div>

          {/* SVG illustration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <NotFoundSvg />
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col items-center gap-3 max-w-[44ch]"
          >
            <p className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase">
              Page not found
            </p>
            <p className="text-[1.0625rem] text-ink-2 leading-relaxed">
              The route you're looking for doesn't exist or has been moved. Head back to familiar ground.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Link href="/" className="btn btn-primary">← Back to Home</Link>
            <Link href="/contact/" className="btn btn-secondary">Contact Us</Link>
          </motion.div>

          {/* Quick nav links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="border-t border-line pt-8 w-full max-w-xl"
          >
            <p className="font-mono text-[0.75rem] tracking-[0.18em] text-ink-3 uppercase mb-4">
              Quick links
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-mono text-[0.75rem] tracking-wider text-ink-3 border border-line px-3 py-1.5 uppercase hover:text-ink hover:border-ink transition-all duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}
