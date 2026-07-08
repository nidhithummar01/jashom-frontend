"use client";

import LegalPage from "@/components/LegalPage";

const SECTIONS = [
  {
    title: "1. Our Security Approach",
    content: (
      <div className="flex flex-col gap-3">
        <p className="text-ink-2">We follow industry best practices to ensure:</p>
        <ul className="list-none flex flex-col gap-2.5 pl-4 border-l border-ink/20">
          <li className="flex items-start gap-2.5 text-ink-2">
            <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
            <span>Confidentiality of client data</span>
          </li>
          <li className="flex items-start gap-2.5 text-ink-2">
            <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
            <span>Integrity of systems and applications</span>
          </li>
          <li className="flex items-start gap-2.5 text-ink-2">
            <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
            <span>Availability of services</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "2. Security Measures",
    content: (
      <div className="flex flex-col gap-3">
        <ul className="list-none flex flex-col gap-2.5 pl-4 border-l border-ink/20">
          <li className="flex items-start gap-2.5 text-ink-2">
            <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
            <span>Secure cloud infrastructure</span>
          </li>
          <li className="flex items-start gap-2.5 text-ink-2">
            <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
            <span>Encrypted data transmission</span>
          </li>
          <li className="flex items-start gap-2.5 text-ink-2">
            <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
            <span>Role-based access control</span>
          </li>
          <li className="flex items-start gap-2.5 text-ink-2">
            <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
            <span>Regular security audits and monitoring</span>
          </li>
          <li className="flex items-start gap-2.5 text-ink-2">
            <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
            <span>Secure DevOps &amp; DevSecOps practices</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "3. Client Responsibility",
    content: (
      <div className="flex flex-col gap-3">
        <p className="text-ink-2">Clients are responsible for:</p>
        <ul className="list-none flex flex-col gap-2.5 pl-4 border-l border-ink/20">
          <li className="flex items-start gap-2.5 text-ink-2">
            <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
            <span>Maintaining confidentiality of access credentials</span>
          </li>
          <li className="flex items-start gap-2.5 text-ink-2">
            <span className="mt-2 w-1.5 h-1.5 bg-ink rounded-xs flex-shrink-0" />
            <span>Ensuring secure usage of delivered solutions</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "4. Incident Management",
    content: (
      <p className="text-ink-2">
        In case of a security incident, we follow a structured response process to assess, mitigate, and notify affected parties where required.
      </p>
    ),
  },
  {
    title: "5. Contact for Security Issues",
    content: (
      <div className="flex flex-col gap-2 text-ink-2">
        <p className="font-mono text-ink">info@jashom.com</p>
      </div>
    ),
  },
];

export default function SecurityPolicyPage() {
  return (
    <LegalPage
      title="Security Policy"
      subtitle="At Jashom, security is a core priority across all our platforms and services."
      intro="At Jashom, security is a core priority across all our platforms and services."
      sections={SECTIONS}
    />
  );
}
