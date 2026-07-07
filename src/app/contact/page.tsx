import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Customizer from "@/components/Customizer";
import QuickActions from "@/components/QuickActions";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Jashom | GPU & CUDA Development Consultation",
  description:
    "Get in touch with Jashom for expert GPU optimization and CUDA development services. Contact our team to discuss your performance challenges and project requirements.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <ContactContent />
      <Footer />
      <Customizer />
      <QuickActions
        actions={[
          { label: "Call Us", href: "tel:+919023906363", external: true },
          { label: "Email Us", href: "mailto:info@jashom.com", external: true },
          { label: "Visit Map", href: "https://www.google.com/maps/search/?api=1&query=SATYAM+1+414+AMBA+BUSINESS+PARK+ADALAJ+382421+Gandhinagar+Gujarat", external: true },
        ]}
      />
    </>
  );
}
