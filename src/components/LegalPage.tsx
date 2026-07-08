"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Customizer from "@/components/Customizer";
import QuickActions from "@/components/QuickActions";

export interface LegalSection {
  title: string;
  content: React.ReactNode;
}

interface Props {
  readonly title: string;
  readonly subtitle: string;
  readonly intro: React.ReactNode;
  readonly sections: LegalSection[];
}

export default function LegalPage({ title, subtitle, intro, sections }: Props) {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({ 0: true });

  const toggleSection = (idx: number) => {
    setOpenSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <>
      <Nav />

      <section className="always-dark relative bg-[#09090b] pt-40 pb-24 overflow-clip border-b border-line">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative text-center max-w-3xl mx-auto flex flex-col items-center">
          <span className="font-mono text-[0.75rem] tracking-[0.25em] text-ink-3 uppercase block mb-3">Legal &amp; Compliance</span>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] leading-none text-ink font-bold tracking-tight mb-4">{title}</h1>
          <p className="text-[0.875rem] text-ink-2 max-w-[50ch] leading-relaxed">{subtitle}</p>
          <div className="mt-6 font-mono text-[0.75rem] text-ink-3">Last Updated: July 2026</div>
        </div>
      </section>

      <main className="bg-linen min-h-[60vh] py-16">
        <div className="container-j">
          <div className="max-w-3xl mx-auto bg-paper border border-line p-6 md:p-10 shadow-[6px_6px_0px_0px_var(--color-line)] flex flex-col gap-6">

            <div className="pb-6 border-b border-line text-ink text-[1rem] font-medium leading-relaxed">{intro}</div>

            <div className="flex flex-col">
              {sections.map((section, idx) => {
                const isOpen = !!openSections[idx];
                return (
                  <div key={section.title} className="border-b border-line last:border-b-0">
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
                      <div className="pb-6 text-ink-2 text-[0.9375rem] leading-relaxed">{section.content}</div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

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
