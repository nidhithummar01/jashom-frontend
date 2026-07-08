"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Magnetic from "@/components/motion/Magnetic";
import MeetingDrawer from "@/components/MeetingDrawer";

const SERVICES = [
  {
    label: "GPU Optimization",
    desc: "Maximize NVIDIA GPU throughput and compute efficiency",
    href: "/gpu-optimization-service/",
    iconName: "gpu" as const,
  },
  {
    label: "CUDA Development",
    desc: "High-performance parallel kernels for NVIDIA architecture",
    href: "/cuda-development-service/",
    iconName: "cuda" as const,
  },
];

function ServiceIcon({ name }: { readonly name: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "gpu":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <line x1="9" y1="4" x2="9" y2="20" />
          <line x1="15" y1="4" x2="15" y2="20" />
          <line x1="4" y1="9" x2="20" y2="9" />
          <line x1="4" y1="15" x2="20" y2="15" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "cuda":
      return (
        <svg {...common}>
          <polyline points="2 13 6 6 10 17 14 10 18 14 22 9" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      );
    default:
      return null;
  }
}

const DROP_ANIM = {
  initial: { opacity: 0, transform: "translateY(6px) scale(0.98)" },
  animate: { opacity: 1, transform: "translateY(0px) scale(1)" },
  exit: { opacity: 0, transform: "translateY(4px) scale(0.99)" },
  transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] as const },
  style: { transformOrigin: "top center" as const },
};

function DropPanel({ className, reduced, children }: { readonly className: string; readonly reduced: boolean | null; readonly children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: reduced ? "none" : "translateY(6px) scale(0.98)" }}
      animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
      exit={{ opacity: 0, transform: "translateY(4px) scale(0.99)" }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      style={{ transformOrigin: "top center" }}
      className={`absolute top-full pt-3 ${className}`}
    >
      <div className="bg-paper border border-line rounded-none p-2 shadow-[0_16px_40px_rgba(17,17,19,0.08)] flex flex-col gap-1">
        {children}
      </div>
    </motion.div>
  );
}

const LINKS = [
  { label: "Contact", href: "/contact/" },
];

export default function Nav({ forceBg = false }: { readonly forceBg?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hireOpen, setHireOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const reduced = useReducedMotion();

  // Track dark mode by watching the .dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open (iOS-safe: position:fixed trick)
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (top) window.scrollTo(0, -parseInt(top, 10));
    }
    return () => {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (top) window.scrollTo(0, -parseInt(top, 10));
    };
  }, [open]);

  const isHeaderDark = isDark || ((!scrolled && !forceBg) && !open);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-100 ${
        isHeaderDark ? "dark-nav" : ""
      } ${
        (scrolled || forceBg)
          ? "bg-paper border-b border-line shadow-[0_1px_0_rgba(17,17,19,0.02)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-j flex items-center justify-between h-[68px]">
        <Link href="/" className="flex items-center gap-2" aria-label="Jashom home">
          <img
            src={isHeaderDark ? "/logo/jashom-dark.svg" : "/logo/jashom-white.svg"}
            alt="Jashom logo"
            width={26}
            height={26}
            className="h-[26.4px] w-auto"
          />
          <span className="font-mono font-medium text-lg md:text-xl text-ink tracking-tight">
            Jashom
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Services Dropdown */}
          <div
            className="relative"
            onPointerEnter={() => setServicesOpen(true)}
            onPointerLeave={() => setServicesOpen(false)}
          >
            <button
              className="px-3 py-1.5 rounded-none text-[0.875rem] text-ink-2 hover:text-ink hover:bg-tint transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <DropPanel reduced={reduced} className="left-0 w-[300px]">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      onClick={() => setServicesOpen(false)}
                      className="group flex items-center gap-3 p-3 rounded-none hover:bg-tint transition-all duration-200"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 border border-line bg-tint text-ink transition-all duration-200 group-hover:bg-paper group-hover:-translate-y-0.5">
                        <ServiceIcon name={s.iconName} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-mono font-medium text-[0.875rem] text-ink leading-tight mb-0.5">{s.label}</h4>
                        <p className="text-[0.75rem] text-ink-2 leading-snug">{s.desc}</p>
                      </div>
                    </Link>
                  ))}
                </DropPanel>
              )}
            </AnimatePresence>
          </div>

          {/* Hire Expert Dropdown */}
          <div
            className="relative"
            onPointerEnter={() => setHireOpen(true)}
            onPointerLeave={() => setHireOpen(false)}
          >
            <button
              className="px-3 py-1.5 rounded-none text-[0.875rem] text-ink-2 hover:text-ink hover:bg-tint transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
              aria-expanded={hireOpen}
              onClick={() => setHireOpen((v) => !v)}
            >
              Hire Expert
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"
                className={`transition-transform duration-200 ${hireOpen ? "rotate-180" : ""}`}>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <AnimatePresence>
              {hireOpen && (
                <DropPanel reduced={reduced} className="left-1/2 -translate-x-1/2 w-[200px]">
                  {[
                    { label: "Hire CUDA Developer", href: "/hire-cuda-developer/" },
                    { label: "Hire Rust Developer", href: "/hire-rust-developers/" },
                  ].map((item) => (
                    <Link key={item.label} href={item.href} onClick={() => setHireOpen(false)}
                      className="px-3 py-2 text-[0.875rem] text-ink-2 hover:text-ink hover:bg-tint transition-all duration-150 rounded-none block font-mono">
                      {item.label}
                    </Link>
                  ))}
                </DropPanel>
              )}
            </AnimatePresence>
          </div>

          {/* Company Dropdown */}
          <div
            className="relative"
            onPointerEnter={() => setCompanyOpen(true)}
            onPointerLeave={() => setCompanyOpen(false)}
          >
            <button
              className="px-3 py-1.5 rounded-none text-[0.875rem] text-ink-2 hover:text-ink hover:bg-tint transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
              aria-expanded={companyOpen}
              onClick={() => setCompanyOpen((v) => !v)}
            >
              Company
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"
                className={`transition-transform duration-200 ${companyOpen ? "rotate-180" : ""}`}>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <AnimatePresence>
              {companyOpen && (
                <DropPanel reduced={reduced} className="left-1/2 -translate-x-1/2 w-[200px]">
                  {[
                    { label: "About Us", href: "/about-us/" },
                    { label: "Team", href: "/team/" },
                    { label: "Portfolio", href: "/portfolio/" },
                    { label: "Blog", href: "/blogs/" },
                    { label: "Career", href: "/careers/" },
                  ].map((item) => (
                    <Link key={item.label} href={item.href} onClick={() => setCompanyOpen(false)}
                      className="px-3 py-2 text-[0.875rem] text-ink-2 hover:text-ink hover:bg-tint transition-all duration-150 rounded-none block font-mono">
                      {item.label}
                    </Link>
                  ))}
                </DropPanel>
              )}
            </AnimatePresence>
          </div>

          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3 py-1.5 rounded-none text-[0.875rem] text-ink-2 hover:text-ink hover:bg-tint transition-all duration-200"
            >
              {l.label}
            </a>
          ))}

          <Magnetic strength={0.2}>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="btn btn-primary !py-3 !px-5 text-center cursor-pointer"
            >
              Schedule a Meeting
            </button>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden relative z-50 flex flex-col justify-center items-center w-11 h-11 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className={`block w-5 h-px bg-ink transition-transform duration-300 ${
              open ? "rotate-45 translate-y-[0.5px]" : "-translate-y-1"
            }`}
          />
          <span
            className={`block w-5 h-px bg-ink transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-1"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden fixed inset-0 bg-linen z-40 overflow-y-scroll overscroll-contain"
          >
            <div className="container-j pt-24 pb-10">
              <p className="text-xs uppercase tracking-wider text-ink-3 mb-3">Services</p>
              {SERVICES.map((s, i) => (
                <Link
                  key={s.label}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-4 py-3 border-b border-line"
                >
                  <motion.div
                    initial={{ opacity: 0, transform: reduced ? "none" : "translateY(12px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="flex items-center gap-4 w-full"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 border border-line bg-tint text-ink transition-all duration-200 group-hover:bg-paper">
                      <ServiceIcon name={s.iconName} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-mono font-medium text-[1.05rem] text-ink leading-tight mb-0.5">
                        {s.label}
                      </h4>
                      <p className="text-[0.8125rem] text-ink-2 leading-snug">
                        {s.desc}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}

              <div className="h-6" />
              <p className="text-xs uppercase tracking-wider text-ink-3 mb-3">Hire Expert</p>
              <div className="flex flex-col gap-1 pl-2 border-l border-line mb-6">
                {[
                  { label: "Hire CUDA Developer", href: "/hire-cuda-developer/" },
                  { label: "Hire Rust Developer", href: "/hire-rust-developers/" },
                ].map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, transform: reduced ? "none" : "translateY(12px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{ delay: 0.1 + i * 0.03, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="block py-2 font-mono text-lg text-ink-2 hover:text-ink"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              <div className="h-6" />
              <p className="text-xs uppercase tracking-wider text-ink-3 mb-3">Company</p>
              <div className="flex flex-col gap-1 pl-2 border-l border-line mb-6">
                {[
                  { label: "About Us", href: "/about-us/" },
                  { label: "Team", href: "/team/" },
                  { label: "Portfolio", href: "/portfolio/" },
                  { label: "Blog", href: "/blogs/" },
                  { label: "Career", href: "/careers/" },
                ].map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, transform: reduced ? "none" : "translateY(12px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{ delay: 0.1 + i * 0.03, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="block py-2 font-mono text-lg text-ink-2 hover:text-ink"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              {LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, transform: reduced ? "none" : "translateY(12px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  transition={{ delay: 0.3 + i * 0.04, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="block py-3 font-mono text-2xl text-ink border-b border-line"
                >
                  {l.label}
                </motion.a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  setIsDrawerOpen(true);
                }}
                className="btn btn-primary w-full mt-8 text-center cursor-pointer"
              >
                Schedule a Meeting
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <MeetingDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </header>
  );
}
