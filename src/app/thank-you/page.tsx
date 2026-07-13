import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import ThankYouContent from "./ThankYouContent";

export const metadata: Metadata = {
  title: "Thank You | Jashom Technologies",
  description: "Thank you for reaching out to Jashom. We'll be in touch shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Nav />
      <ThankYouContent />
      <Footer />
    </>
  );
}
