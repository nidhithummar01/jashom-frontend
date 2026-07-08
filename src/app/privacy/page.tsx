"use client";

import LegalPage from "@/components/LegalPage";

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
              <li className="flex items-start gap-2.5 text-ink-2"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Name</span></li>
              <li className="flex items-start gap-2.5 text-ink-2"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Email address</span></li>
              <li className="flex items-start gap-2.5 text-ink-2"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Phone number</span></li>
              <li className="flex items-start gap-2.5 text-ink-2"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Company name</span></li>
              <li className="flex items-start gap-2.5 text-ink-2"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Job title</span></li>
              <li className="flex items-start gap-2.5 text-ink-2"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Any information you submit via contact forms, demo requests, or inquiries</span></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-ink text-[0.9375rem] mb-2.5">b. Technical &amp; Usage Information</h3>
            <ul className="list-none flex flex-col gap-2">
              <li className="flex items-start gap-2.5 text-ink-2"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>IP address</span></li>
              <li className="flex items-start gap-2.5 text-ink-2"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Browser type and version</span></li>
              <li className="flex items-start gap-2.5 text-ink-2"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Device information</span></li>
              <li className="flex items-start gap-2.5 text-ink-2"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Pages visited and time spent on our website</span></li>
              <li className="flex items-start gap-2.5 text-ink-2"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Referring URLs</span></li>
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
          <li className="flex items-start gap-2.5 text-ink-2"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Respond to inquiries and demo requests</span></li>
          <li className="flex items-start gap-2.5 text-ink-2"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Provide and improve our services</span></li>
          <li className="flex items-start gap-2.5 text-ink-2"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Communicate updates, offers, or service-related information</span></li>
          <li className="flex items-start gap-2.5 text-ink-2"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Analyze website performance and user behavior</span></li>
          <li className="flex items-start gap-2.5 text-ink-2"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Ensure website security and prevent fraud</span></li>
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
          <li className="flex items-start gap-2.5"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Trusted service providers (hosting, analytics, CRM tools)</span></li>
          <li className="flex items-start gap-2.5"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Legal or regulatory authorities if required by law</span></li>
          <li className="flex items-start gap-2.5"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Internal teams for operational purposes</span></li>
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
          <li className="flex items-start gap-2.5"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Secure servers and encrypted communication</span></li>
          <li className="flex items-start gap-2.5"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Restricted access controls</span></li>
          <li className="flex items-start gap-2.5"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Regular security monitoring</span></li>
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
          <li className="flex items-start gap-2.5"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Request access to your personal data</span></li>
          <li className="flex items-start gap-2.5"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Request correction or deletion of your data</span></li>
          <li className="flex items-start gap-2.5"><span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" /><span>Withdraw consent for marketing communications</span></li>
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

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="At Jashom Technologies Pvt. Ltd., we respect your privacy and are committed to protecting your personal information."
      intro={
        <>
          At Jashom Technologies Pvt. Ltd. (&ldquo;Jashom&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
        </>
      }
      sections={SECTIONS}
    />
  );
}
