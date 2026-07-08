"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";

const MAIN_LINKS = [
  { title: "Home", description: "Primary landing page.", href: "/" },
  { title: "About Us", description: "Company mission, story, and values.", href: "/about-us/" },
  { title: "Team", description: "Meet the people behind Jashom Technologies.", href: "/team/" },
  { title: "Portfolio", description: "Case studies and project showcases.", href: "/portfolio/" },
  { title: "Blog", description: "Articles and engineering write-ups.", href: "/blogs/" },
  { title: "Careers", description: "Open roles and hiring information.", href: "/careers/" },
  { title: "Contact", description: "Get in touch with the team.", href: "/contact/" },
];

const SERVICE_LINKS = [
  { title: "GPU Optimization", description: "Maximize NVIDIA GPU throughput and compute efficiency.", href: "/gpu-optimization-service/" },
  { title: "CUDA Development", description: "High-performance parallel kernels for NVIDIA architecture.", href: "/cuda-development-service/" },
  { title: "Hire CUDA Developer", description: "Bring on dedicated CUDA engineering talent.", href: "/hire-cuda-developer/" },
  { title: "Hire Rust Developer", description: "Bring on dedicated Rust engineering talent.", href: "/hire-rust-developers/" },
];

const LEGAL_LINKS = [
  { title: "Terms of Service", description: "Standard conditions and rules for using our services.", href: "/terms/" },
  { title: "Privacy Policy", description: "How we collect, manage, and safeguard user data.", href: "/privacy/" },
  { title: "Security Policy", description: "Our approach to infrastructure security and incident response.", href: "/security/" },
];

function LinkGroup({ title, links }: { readonly title: string; readonly links: { readonly title: string; readonly description: string; readonly href: string }[] }) {
  return (
    <div className="mb-14">
      <h2 className="font-mono text-[0.875rem] uppercase tracking-wider text-ink-3 border-b border-line pb-2 mb-6">
        {title}
      </h2>
      <div className="flex flex-col border-t border-l border-line bg-paper">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center justify-between p-6 border-b border-r border-line hover:bg-tint/50 transition-all duration-300 group"
          >
            <div>
              <h3 className="font-sans font-medium text-[1.125rem] text-ink group-hover:underline decoration-1 underline-offset-4 mb-1">
                {link.title}
              </h3>
              <p className="text-sm text-ink-2 max-w-[65ch]">
                {link.description}
              </p>
            </div>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 text-ink-3 group-hover:text-ink pl-4">
              <svg
                width="12"
                height="12"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SitemapPage() {
  return (
    <>
      <Nav forceBg />
      <main className="min-h-screen bg-linen pt-32 pb-20 border-b border-line">
        <div className="container-j max-w-4xl">
          <div className="mb-14">
            <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium block mb-3">
              SITEMAP
            </span>
            <h1 className="text-[clamp(2.2rem,4vw,3.2rem)] font-sans font-medium text-ink leading-tight tracking-tight">
              All Pages
            </h1>
            <p className="text-ink-2 text-[1.125rem] mt-3 max-w-[50ch]">
              A complete index of every page on the Jashom Technologies website.
            </p>
          </div>

          <LinkGroup title="Main" links={MAIN_LINKS} />
          <LinkGroup title="Services" links={SERVICE_LINKS} />
          <LinkGroup title="Legal" links={LEGAL_LINKS} />
        </div>
      </main>
      <Footer />
    </>
  );
}
