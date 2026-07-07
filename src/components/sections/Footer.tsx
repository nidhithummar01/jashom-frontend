"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  head: string;
  links: FooterLink[];
}

const COLUMNS: FooterColumn[] = [
  {
    head: "Services",
    links: [
      { label: "GPU Optimization Service", href: "/gpu-optimization-service/" },
      { label: "CUDA Development Service", href: "/cuda-development-service/" },
      { label: "Hire CUDA Developer", href: "/hire-cuda-developer/" },
      { label: "Hire Rust Developer", href: "/hire-rust-developers/" },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "About Us", href: "/about-us/" },
      { label: "Company Brochure", href: "/brochure/" },
      { label: "Contact Us", href: "/contact/" },
      { label: "Careers", href: "/careers/" },
      { label: "Legal", href: "/terms/" },
    ],
  },
  {
    head: "Resources",
    links: [
      { label: "Blog", href: "/blogs/" },
      { label: "Case Studies", href: "/portfolio/" },
    ],
  },
  {
    head: "Social",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/jashom/", external: true },
      { label: "Instagram", href: "https://www.instagram.com/jashomtechnologies_", external: true },
      { label: "YouTube", href: "https://youtube.com/@infojashom", external: true },
      { label: "Reddit", href: "https://reddit.com/r/jashom", external: true },
    ],
  },
];

export default function Footer() {
  const [theme, setTheme] = useState<"system" | "light" | "dark" | "mono">("light");
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Track actual dark state by watching html.classList
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
    setMounted(true);
    const saved = localStorage.getItem("theme") as "system" | "light" | "dark" | "mono" | null;
    if (saved) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted || theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => {
      const root = document.documentElement;
      root.classList.remove("mono");
      if (e.matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [theme, mounted]);

  const handleThemeChange = (newTheme: "system" | "light" | "dark" | "mono") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    const root = document.documentElement;
    root.classList.remove("dark");
    root.classList.remove("mono");

    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      if (systemTheme === "dark") {
        root.classList.add("dark");
      }
    } else if (newTheme === "dark") {
      root.classList.add("dark");
    } else if (newTheme === "mono") {
      root.classList.add("mono");
    }
  };

  return (
    <footer className="bg-linen border-t border-line">
      <div className="container-j pt-12 md:pt-14 pb-8">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 mb-4" aria-label="Jashom home">
                <img
                  src={isDark ? "/logo/jashom-dark.svg" : "/logo/jashom-white.svg"}
                  alt="Jashom logo"
                  width={30}
                  height={30}
                  className="h-[30px] w-auto"
                />
                <span className="font-mono font-medium text-lg md:text-xl text-ink tracking-tight">
                  Jashom
                </span>
              </Link>
              <p className="text-[0.9375rem] text-ink-2 max-w-[36ch] mb-4">
                Empowering businesses with modern GPU optimization and CUDA development for high-performance computing.
              </p>
              <p className="text-[0.8125rem] text-ink-3 max-w-[34ch] mb-5 leading-relaxed">
                <a
                  href="https://www.google.com/maps?cid=14003985891872718787&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYASAA&hl=en-US&source=embed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  SATYAM 1, 414, AMBA BUSINESS PARK, B/H TRI MANDIR, ADALAJ 382421, Dist Gandhinagar Gujarat
                </a>
              </p>
            </div>
            <div className="flex flex-col gap-2 text-[0.875rem] text-ink-2">
              <div>
                <span className="text-ink-3">Phone: </span>
                <a href="tel:+919023906363" className="hover:text-ink transition-colors">
                  +91 90239 06363
                </a>
              </div>
              <div>
                <span className="text-ink-3">Email: </span>
                <a href="mailto:info@jashom.com" className="hover:text-ink transition-colors">
                  info@jashom.com
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.head}>
                <p className="text-sm font-medium text-ink mb-4">{col.head}</p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-line text-[0.875rem] text-ink-2 hover:text-ink transition-colors duration-150"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="link-line text-[0.875rem] text-ink-2 hover:text-ink transition-colors duration-150"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[0.8125rem] text-ink-3">
          {/* Left Column: Copyright & Links */}
          <div className="flex flex-col gap-2">
            <p>© 2026 Jashom GPU Optimization. All rights reserved. Engineered for peak performance.</p>
            <div className="flex items-center gap-3">
              <Link href="/privacy" className="hover:text-ink transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-ink transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/security" className="hover:text-ink transition-colors">
                Security
              </Link>
            </div>
          </div>

          {/* Right Column: Theme Switcher & Back to Top */}
          <div className="flex items-center gap-4 self-stretch justify-between md:justify-end md:self-auto">
            <div className="flex items-center border border-line bg-linen p-0.5 rounded-none" aria-label="Theme selection">
              <button
                onClick={() => handleThemeChange("system")}
                className={`p-1.5 rounded-none flex items-center justify-center transition-all cursor-pointer ${theme === "system" && mounted
                    ? "bg-tint border border-line text-ink"
                    : "text-ink-3 hover:text-ink-2 border border-transparent"
                  }`}
                title="System Theme"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </button>
              <button
                onClick={() => handleThemeChange("light")}
                className={`p-1.5 rounded-none flex items-center justify-center transition-all cursor-pointer ${theme === "light" || (!mounted && theme === "system")
                    ? "bg-tint border border-line text-ink"
                    : "text-ink-3 hover:text-ink-2 border border-transparent"
                  }`}
                title="Light Theme"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </button>
              <button
                onClick={() => handleThemeChange("mono")}
                className={`p-1.5 rounded-none flex items-center justify-center transition-all cursor-pointer ${theme === "mono" && mounted
                    ? "bg-tint border border-line text-ink"
                    : "text-ink-3 hover:text-ink-2 border border-transparent"
                  }`}
                title="Monochrome Theme"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a10 10 0 0 0 0 20v-20" fill="currentColor" />
                </svg>
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                className={`p-1.5 rounded-none flex items-center justify-center transition-all cursor-pointer ${theme === "dark" && mounted
                    ? "bg-tint border border-line text-ink"
                    : "text-ink-3 hover:text-ink-2 border border-transparent"
                  }`}
                title="Dark Theme"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>
            </div>

            <a href="#" className="hover:text-ink transition-colors duration-150">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
