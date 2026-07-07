"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Customizer from "@/components/Customizer";
import QuickActions from "@/components/QuickActions";

export default function TermsOfServicePage() {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    0: true, // open first section by default
  });

  const toggleSection = (idx: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const SECTIONS = [
    {
      title: "1. Use of Website",
      content: (
        <div className="flex flex-col gap-3">
          <p className="text-ink-2">You agree to:</p>
          <ul className="list-none flex flex-col gap-2.5 pl-4 border-l border-ink/20">
            <li className="flex items-start gap-2.5 text-ink-2">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Use the website for lawful purposes only</span>
            </li>
            <li className="flex items-start gap-2.5 text-ink-2">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Not engage in activities that disrupt or damage the website</span>
            </li>
            <li className="flex items-start gap-2.5 text-ink-2">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Not attempt unauthorized access to systems or data</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "2. Services",
      content: (
        <div className="flex flex-col gap-3 text-ink-2">
          <p>Jashom provides AI, cloud, DevOps, and digital technology services.</p>
          <p>All service engagements are subject to separate agreements or contracts.</p>
        </div>
      ),
    },
    {
      title: "3. Intellectual Property",
      content: (
        <div className="flex flex-col gap-3 text-ink-2">
          <p>
            All content on this website, including text, graphics, logos, code, and designs, is the property of Jashom Technologies Pvt. Ltd. and is protected by intellectual property laws.
          </p>
          <p>You may not reproduce, distribute, or modify content without written permission.</p>
        </div>
      ),
    },
    {
      title: "4. Limitation of Liability",
      content: (
        <div className="flex flex-col gap-3 text-ink-2">
          <p>Jashom shall not be liable for:</p>
          <ul className="list-none flex flex-col gap-2.5 pl-4 border-l border-ink/20 mb-1">
            <li className="flex items-start gap-2.5">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Any indirect, incidental, or consequential damages</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Loss of data, revenue, or business arising from website use</span>
            </li>
          </ul>
          <p className="font-medium mt-1">
            The website and services are provided "as is" without warranties of any kind.
          </p>
        </div>
      ),
    },
    {
      title: "5. Termination",
      content: (
        <p className="text-ink-2">
          We reserve the right to restrict or terminate access to the website if these terms are violated.
        </p>
      ),
    },
    {
      title: "6. Governing Law",
      content: (
        <p className="text-ink-2">
          These Terms are governed by the laws of India, without regard to conflict of law principles.
        </p>
      ),
    },
  ];

  return (
    <>
      <Nav />
      
      {/* Hero Banner */}
      <section className="always-dark relative bg-[#09090b] pt-40 pb-24 overflow-clip border-b border-line">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative text-center max-w-3xl mx-auto flex flex-col items-center">
          <span className="font-mono text-[0.75rem] tracking-[0.25em] text-ink-3 uppercase block mb-3">Legal & Compliance</span>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] leading-none text-ink font-bold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-[0.875rem] text-ink-2 max-w-[50ch] leading-relaxed">
            Please read these Terms of Service carefully before using our website and services.
          </p>
          <div className="mt-6 font-mono text-[0.75rem] text-ink-3">
            Last Updated: July 2026
          </div>
        </div>
      </section>

      <main className="bg-linen min-h-[60vh] py-16">
        <div className="container-j">
          <div className="max-w-3xl mx-auto bg-paper border border-line p-6 md:p-10 shadow-[6px_6px_0px_0px_var(--color-line)] flex flex-col gap-6">
            
            {/* Overview Intro */}
            <div className="pb-6 border-b border-line text-ink text-[1rem] font-medium leading-relaxed">
              By accessing or using the Jashom website and services, you agree to the following Terms of Service.
            </div>

            {/* Accordion List */}
            <div className="flex flex-col">
              {SECTIONS.map((section, idx) => {
                const isOpen = !!openSections[idx];
                return (
                  <div key={idx} className="border-b border-line last:border-b-0">
                    <button
                      onClick={() => toggleSection(idx)}
                      className="w-full flex items-center justify-between py-5 text-left focus:outline-none group cursor-pointer"
                    >
                      <h2 className={`font-sans font-bold text-[1.1rem] transition-colors duration-200 ${isOpen ? "text-ink" : "text-ink-2 group-hover:text-ink"}`}>
                        {section.title}
                      </h2>
                      <span className="text-ink-3 group-hover:text-ink transition-colors duration-200 ml-4 flex-shrink-0">
                        <svg
                          className={`w-4 h-4 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>

                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 text-ink-2 text-[0.9375rem] leading-relaxed">
                        {section.content}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Contact Footer */}
            <div className="border-t border-line pt-6 mt-2 font-mono text-[0.8125rem] text-ink-3">
              If you have questions about this policy, please contact us at{" "}
              <a href="mailto:info@jashom.com" className="text-ink hover:underline transition-colors font-bold">
                info@jashom.com
              </a>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <Customizer />
      <QuickActions
        actions={[
          { label: "Back to Home", href: "/" },
          { label: "Contact Us", href: "/contact/" },
        ]}
      />
    </>
  );
}
