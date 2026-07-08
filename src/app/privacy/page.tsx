"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Customizer from "@/components/Customizer";
import QuickActions from "@/components/QuickActions";

export default function PrivacyPolicyPage() {
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
      title: "1. Information We Collect",
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-ink-2">We may collect the following types of information:</p>
          
          <div className="flex flex-col gap-4 pl-4 border-l border-ink/20 mt-2">
            <div>
              <h3 className="font-bold text-ink text-[0.9375rem] mb-2.5">a. Personal Information</h3>
              <ul className="list-none flex flex-col gap-2">
                <li className="flex items-start gap-2.5 text-ink-2">
                  <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
                  <span>Name</span>
                </li>
                <li className="flex items-start gap-2.5 text-ink-2">
                  <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
                  <span>Email address</span>
                </li>
                <li className="flex items-start gap-2.5 text-ink-2">
                  <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
                  <span>Phone number</span>
                </li>
                <li className="flex items-start gap-2.5 text-ink-2">
                  <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
                  <span>Company name</span>
                </li>
                <li className="flex items-start gap-2.5 text-ink-2">
                  <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
                  <span>Job title</span>
                </li>
                <li className="flex items-start gap-2.5 text-ink-2">
                  <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
                  <span>Any information you submit via contact forms, demo requests, or inquiries</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-ink text-[0.9375rem] mb-2.5">b. Technical & Usage Information</h3>
              <ul className="list-none flex flex-col gap-2">
                <li className="flex items-start gap-2.5 text-ink-2">
                  <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
                  <span>IP address</span>
                </li>
                <li className="flex items-start gap-2.5 text-ink-2">
                  <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
                  <span>Browser type and version</span>
                </li>
                <li className="flex items-start gap-2.5 text-ink-2">
                  <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
                  <span>Device information</span>
                </li>
                <li className="flex items-start gap-2.5 text-ink-2">
                  <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
                  <span>Pages visited and time spent on our website</span>
                </li>
                <li className="flex items-start gap-2.5 text-ink-2">
                  <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
                  <span>Referring URLs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2. How We Use Your Information",
      content: (
        <div className="flex flex-col gap-3">
          <p className="text-ink-2">We use the collected information to:</p>
          <ul className="list-none flex flex-col gap-2.5 pl-4 border-l border-ink/20">
            <li className="flex items-start gap-2.5 text-ink-2">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Respond to inquiries and demo requests</span>
            </li>
            <li className="flex items-start gap-2.5 text-ink-2">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Provide and improve our services</span>
            </li>
            <li className="flex items-start gap-2.5 text-ink-2">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Communicate updates, offers, or service-related information</span>
            </li>
            <li className="flex items-start gap-2.5 text-ink-2">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Analyze website performance and user behavior</span>
            </li>
            <li className="flex items-start gap-2.5 text-ink-2">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Ensure website security and prevent fraud</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "3. Data Sharing & Disclosure",
      content: (
        <div className="flex flex-col gap-3 text-ink-2">
          <p>We do not sell or rent your personal information.</p>
          <p>We may share information only with:</p>
          <ul className="list-none flex flex-col gap-2.5 pl-4 border-l border-ink/20">
            <li className="flex items-start gap-2.5">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Trusted service providers (hosting, analytics, CRM tools)</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Legal or regulatory authorities if required by law</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Internal teams for operational purposes</span>
            </li>
          </ul>
          <p>All third parties are required to maintain confidentiality and data protection standards.</p>
        </div>
      ),
    },
    {
      title: "4. Data Security",
      content: (
        <div className="flex flex-col gap-3 text-ink-2">
          <p>We implement industry-standard security measures to protect your information, including:</p>
          <ul className="list-none flex flex-col gap-2.5 pl-4 border-l border-ink/20">
            <li className="flex items-start gap-2.5">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Secure servers and encrypted communication</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Restricted access controls</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Regular security monitoring</span>
            </li>
          </ul>
          <p>However, no system is 100% secure, and we cannot guarantee absolute security.</p>
        </div>
      ),
    },
    {
      title: "5. Your Rights",
      content: (
        <div className="flex flex-col gap-3 text-ink-2">
          <p>You have the right to:</p>
          <ul className="list-none flex flex-col gap-2.5 pl-4 border-l border-ink/20">
            <li className="flex items-start gap-2.5">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Request access to your personal data</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Request correction or deletion of your data</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
              <span>Withdraw consent for marketing communications</span>
            </li>
          </ul>
          <p>To exercise your rights, contact us at info@jashom.com.</p>
        </div>
      ),
    },
    {
      title: "6. Updates to This Policy",
      content: (
        <p className="text-ink-2">
          We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated date.
        </p>
      ),
    },
    {
      title: "7. Contact Us",
      content: (
        <div className="flex flex-col gap-2 text-ink-2">
          <p>For privacy-related questions, contact us at:</p>
          <p className="font-mono text-ink">info@jashom.com</p>
          <p className="font-mono text-ink">www.jashom.com</p>
        </div>
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
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] leading-none text-ink font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-[0.875rem] text-ink-2 max-w-[50ch] leading-relaxed">
            At Jashom Technologies Pvt. Ltd., we respect your privacy and are committed to protecting your personal information.
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
              At Jashom Technologies Pvt. Ltd. ("Jashom", "we", "our", "us"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </div>

            {/* Accordion List */}
            <div className="flex flex-col">
              {SECTIONS.map((section, idx) => {
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
