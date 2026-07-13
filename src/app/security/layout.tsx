import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security at Jashom | Data Protection & Infrastructure Security",
  description:
    "Learn about Jashom's security practices, ensuring data protection, system integrity, and enterprise grade infrastructure security.",
  alternates: { canonical: "https://www.jashom.com/security/" },
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
