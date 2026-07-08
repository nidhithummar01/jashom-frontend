"use client";

import LegalPage from "@/components/LegalPage";

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
          The website and services are provided &ldquo;as is&rdquo; without warranties of any kind.
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

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="Please read these Terms of Service carefully before using our website and services."
      intro="By accessing or using the Jashom website and services, you agree to the following Terms of Service."
      sections={SECTIONS}
    />
  );
}
