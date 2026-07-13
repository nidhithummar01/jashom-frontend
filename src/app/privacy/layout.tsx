import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Jashom Data Protection & Compliance",
  description:
    "Read Jashom's privacy policy to understand how we collect, use, and protect your personal data in compliance with global standards.",
  alternates: { canonical: "https://www.jashom.com/privacy/" },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
