import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Jashom Website Usage Policy",
  description:
    "Review Jashom's terms and conditions outlining website usage, legal policies, and user responsibilities.",
  alternates: { canonical: "https://www.jashom.com/terms/" },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
