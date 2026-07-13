"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import ContactHeroSvg from "./ContactHeroSvg";
import { submitContactForm } from "@/lib/submitContact";

const FAQS = [
  { q: "Are you an end-to-end CUDA developer or just an advisor?", a: "We offer both. Depending on the level of engagement, our team can lead an architecture decision at a consulting level or execute all the way to CUDA development, kernel engineering, testing, and deployment." },
  { q: "What NVIDIA technologies do you operate?", a: "We are involved in the NVIDIA ecosystem, such as CUDA Toolkit, cuDNN, TensorRT, NCCL, and GPU profiling tools, to streamline AI, simulation, and other compute-intensive workloads." },
  { q: "Can you integrate GPU acceleration into existing AI pipelines?", a: "Yes. We train and inference pipelines that are optimized through the use of GPU acceleration without interfering with your existing framework, infrastructure, and deployment workflow." },
  { q: "How do you ensure scalability for future growth?", a: "We develop a scalable GPU architecture that benefits from scaling up to workloads, orchestration of multiple GPUs, and an upgrade of the infrastructure without having to redesign larger systems." },
];

export default function ContactContent() {
  const router = useRouter();
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("loading");
    try {
      await submitContactForm({
        fullName: fd.get("name") as string,
        email: fd.get("email") as string,
        phone: fd.get("phone") as string,
        company: fd.get("company") as string,
        message: fd.get("message") as string,
      });
      router.push("/thank-you/");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section id="hero" className="always-dark relative min-h-[60svh] flex flex-col overflow-clip">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative flex-1 grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-12 items-center pt-28 pb-10">
          <div className="flex flex-col justify-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase mb-6">
            Get in touch
          </motion.p>
          <h1 className="text-[clamp(1.6rem,2.5vw,2.1rem)] leading-[1.1]">
            <span className="block overflow-clip">
              <motion.span className="block"
                initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                animate={{ transform: "translateY(0%)" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                Contact Jashom
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mt-7 max-w-[62ch] text-[1.0625rem] text-ink-2">
            Need to optimize AI training, high-performance computing, or data-intensive jobs? Our GPU and CUDA consulting team helps you design, optimize, and scale parallel computing systems that deliver measurable speed, efficiency, and cost performance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.7, delay: 0.66, ease: [0.23, 1, 0.32, 1] }}
            className="mt-10 flex flex-col gap-4">
            <Magnetic strength={0.18}>
              <a href="https://cal.id/jashom-technologies/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary w-fit">Book Consultation</a>
            </Magnetic>
            <p className="text-[0.875rem] text-ink-3">Our consultants bring deep technical expertise and production-grade execution.</p>
          </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:block">
            <ContactHeroSvg />
          </motion.div>
        </div>
      </section>

      <main>
        {/* Contact + form */}
        <section className="section" id="contact">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Get in touch with our GPU experts</SplitHeading>
                <Reveal><p className="text-ink-2 max-w-[48ch]">We have CUDA consultants who will look at your needs and get back to you within two business days.</p></Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-2 text-[0.9375rem] text-ink-2 flex flex-col gap-3">
                    <p className="text-ink font-medium">Our Office <span aria-hidden="true">🇮🇳</span></p>
                    <p>SATYAM 1, 414, AMBA BUSINESS PARK, B/H TRI MANDIR, ADALAJ 382421, Dist Gandhinagar, Gujarat</p>
                    <a href="mailto:info@jashom.com" className="link-line w-fit text-ink">info@jashom.com</a>
                    <a href="tel:+919023906363" className="link-line w-fit text-ink">+91 90239 06363</a>
                  </div>
                </Reveal>
              </div>
              <div className="lg:col-span-7">
                <Reveal delay={0.08}>
                    <div className="flex flex-col gap-6">
                      <div>
                        <h2 className="text-[1.25rem] md:text-[1.4rem] font-medium mb-2">Let&rsquo;s build something powerful together.</h2>
                        <p className="text-ink-2">Get in touch — our team will respond to you within 2 business days.</p>
                      </div>
                      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5"><label htmlFor="name" className="text-sm text-ink-2">Name</label><input id="name" name="name" required autoComplete="name" className="field-j" placeholder="Your name" /></div>
                        <div className="flex flex-col gap-1.5"><label htmlFor="email" className="text-sm text-ink-2">Email</label><input id="email" name="email" type="email" required autoComplete="email" className="field-j" placeholder="you@company.com" /></div>
                        <div className="flex flex-col gap-1.5"><label htmlFor="company" className="text-sm text-ink-2">Company</label><input id="company" name="company" autoComplete="organization" className="field-j" placeholder="Company name" /></div>
                        <div className="flex flex-col gap-1.5"><label htmlFor="phone" className="text-sm text-ink-2">Phone</label><input id="phone" name="phone" type="tel" autoComplete="tel" className="field-j" placeholder="+91" /></div>
                        <div className="flex flex-col gap-1.5 sm:col-span-2"><label htmlFor="message" className="text-sm text-ink-2">Message</label><textarea id="message" name="message" rows={5} required className="field-j resize-y" placeholder="Tell us about your workload and performance targets." /></div>
                        <div className="sm:col-span-2 flex flex-col items-start gap-2">
          {status === "error" && <p className="text-[0.8125rem] text-red-600">{errorMsg}</p>}
          <button type="submit" disabled={status === "loading"} className="btn btn-primary disabled:opacity-60">{status === "loading" ? "Sending…" : "Submit"}</button>
        </div>
                      </form>
                    </div>
                  </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section bg-paper border-y border-line" id="faq">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">FAQs</span>
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Frequently Asked Questions</SplitHeading>
            </div>
            <div className="border-t border-line max-w-3xl">
              {FAQS.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-5 text-ink font-medium">
                    {f.q}
                    <span className="text-ink-2 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="text-ink-2 pb-5 max-w-[60ch]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
