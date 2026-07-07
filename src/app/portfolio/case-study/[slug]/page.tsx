import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Customizer from "@/components/Customizer";
import QuickActions from "@/components/QuickActions";
import { CASE_STUDIES, getCaseStudy } from "../case-studies-data";
import CaseStudyLayout from "../CaseStudyLayout";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getCaseStudy(slug);
  if (!data) return {};
  return { title: data.metaTitle, description: data.metaDescription };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getCaseStudy(slug);
  if (!data) notFound();

  return (
    <>
      <Nav />
      <CaseStudyLayout data={data} />
      <Footer />
      <Customizer />
      <QuickActions
        actions={[
          { label: "Request Similar Work", href: "/contact/" },
          { label: "View All Projects", href: "/portfolio/" },
          { label: "Get a Quote", href: "/contact/" },
        ]}
      />
    </>
  );
}
