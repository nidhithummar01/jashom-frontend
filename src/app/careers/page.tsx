import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import QuickActions from "@/components/QuickActions";
import CareersContent from "./CareersContent";
import { getPublishedJobs } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers at Jashom | Join Our AI & Technology Team",
  description:
    "Explore careers at Jashom and work on cutting edge AI, cloud, and automation solutions. Build your future with a fast growing tech team.",
  alternates: { canonical: "https://www.jashom.com/careers/" },
};

export default async function CareersPage() {
  const jobs = await getPublishedJobs();

  return (
    <>
      <Nav />
      <CareersContent jobs={jobs} />
      <Footer />
      <QuickActions
        actions={[
          { label: "View Openings", href: "/careers/" },
          { label: "Apply Now", href: "#openings" },
          { label: "Learn About Us", href: "/about-us/" },
        ]}
      />
    </>
  );
}
