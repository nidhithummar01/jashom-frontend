"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { submitContactForm } from "@/lib/submitContact";

const PERKS = [
  { title: "Great Team", body: "Work with talented professionals who are passionate about innovation" },
  { title: "Career Growth", body: "Continuous learning opportunities and clear paths for advancement" },
  { title: "Work-Life Balance", body: "Flexible work arrangements and a supportive environment" },
  { title: "Cutting-Edge Projects", body: "Work on innovative AI and GPU optimization projects" },
];

export default function CareersContent() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <>
      {/* Hero */}
      <section id="hero" className="always-dark relative min-h-[55svh] flex flex-col overflow-clip">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative flex-1 flex flex-col justify-center pt-28 pb-10 max-w-3xl">
          <h1 className="text-[clamp(1.6rem,2.5vw,2.1rem)] leading-[1.1]">
            <span className="block overflow-clip">
              <motion.span className="block"
                initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                animate={{ transform: "translateY(0%)" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                Find your big role In our purposeful team
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mt-7 max-w-[58ch] text-[1.0625rem] text-ink-2">
            Join the team to create digital products that the world has never seen before. We&rsquo;re building the future of AI and GPU computing.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.7, delay: 0.66, ease: [0.23, 1, 0.32, 1] }}
            className="mt-10">
            <Magnetic strength={0.18}><a href="#apply" className="btn btn-primary">Join Our Team</a></Magnetic>
          </motion.div>
        </div>
      </section>

      <main>
        {/* Why join */}
        <section className="section" id="why-join">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Why Join Jashom?</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">We&rsquo;re building the future of AI and GPU computing, and we want you to be part of it</p></Reveal>
            </div>
            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-line" itemClassName="h-full" step={0.06}>
              {PERKS.map((p) => (
                <div key={p.title} className="group h-full p-5 md:p-6 border-b border-line hover:bg-tint transition-all duration-300">
                  <h3 className="font-sans font-medium text-[1rem] text-ink mb-2">{p.title}</h3>
                  <p className="text-[0.875rem] text-ink-2">{p.body}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Current openings */}
        <section className="section bg-paper border-y border-line" id="openings">
          <div className="container-j">
            <div className="max-w-2xl mb-10 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Current Openings</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">Explore opportunities to join our growing team</p></Reveal>
            </div>
            <Reveal>
              <div className="border border-line bg-linen p-8 md:p-10 flex flex-col items-start gap-4">
                <p className="text-[1.25rem] font-medium text-ink">Currently no openings</p>
                <p className="text-ink-2 max-w-[52ch]">We&rsquo;re not hiring right now, but you can still submit your resume for future opportunities.</p>
                <a href="#apply" className="btn btn-primary">Submit Resume</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Application form */}
        <section className="section" id="apply">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Begin your journey with us!</span>
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Ready to start?</SplitHeading>
                <Reveal><p className="text-ink-2 max-w-[48ch]">If you are passionate and skilled, we&rsquo;ll get along very well :)</p></Reveal>
              </div>
              <div className="lg:col-span-7">
                {status === "sent" ? (
                  <div className="h-full flex flex-col items-start justify-center bg-linen border border-line rounded-none p-10">
                    <p className="font-mono text-3xl mb-3">Application received.</p>
                    <p className="text-ink-2">Thank you — we&rsquo;ll be in touch about future opportunities.</p>
                  </div>
                ) : (
                  <Reveal delay={0.08}>
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        const position = fd.get("position") as string;
                        const rawMsg = (fd.get("message") as string) || "";
                        setStatus("loading");
                        try {
                          await submitContactForm({
                            fullName: fd.get("name") as string,
                            email: fd.get("email") as string,
                            phone: fd.get("phone") as string,
                            company: fd.get("company") as string,
                            message: position ? `[Position: ${position}]\n\n${rawMsg}` : rawMsg || "Career enquiry",
                          });
                          setStatus("sent");
                        } catch (err) {
                          setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
                          setStatus("error");
                        }
                      }} className="grid sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5"><label htmlFor="name" className="text-sm text-ink-2">Full Name *</label><input id="name" name="name" required autoComplete="name" className="field-j" placeholder="Your name" /></div>
                      <div className="flex flex-col gap-1.5"><label htmlFor="email" className="text-sm text-ink-2">Email Address *</label><input id="email" name="email" type="email" required autoComplete="email" className="field-j" placeholder="you@email.com" /></div>
                      <div className="flex flex-col gap-1.5"><label htmlFor="phone" className="text-sm text-ink-2">Phone Number *</label><input id="phone" name="phone" type="tel" required autoComplete="tel" className="field-j" placeholder="+91" /></div>
                      <div className="flex flex-col gap-1.5"><label htmlFor="company" className="text-sm text-ink-2">Company</label><input id="company" name="company" autoComplete="organization" className="field-j" placeholder="Company name" /></div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2"><label htmlFor="position" className="text-sm text-ink-2">Position Applied For</label><input id="position" name="position" className="field-j" placeholder="Role you're applying for" /></div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label htmlFor="resume" className="text-sm text-ink-2">Resume/CV *</label>
                        <input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" required className="field-j !p-2.5 text-[0.875rem] text-ink-2" />
                        <p className="text-[0.8125rem] text-ink-3">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                      </div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2"><label htmlFor="message" className="text-sm text-ink-2">Message / Cover letter</label><textarea id="message" name="message" rows={5} className="field-j resize-y" placeholder="Tell us about yourself" /></div>
                      <div className="sm:col-span-2 flex flex-col gap-3 items-start">
                        {status === "error" && <p className="text-[0.8125rem] text-red-600">{errorMsg}</p>}
                        <button type="submit" disabled={status === "loading"} className="btn btn-primary disabled:opacity-60">{status === "loading" ? "Sending…" : "Submit Application"}</button>
                        <p className="text-[0.8125rem] text-ink-3">By submitting this form, you agree to our privacy policy and terms of service.</p>
                      </div>
                    </form>
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Don't see the right role */}
        <section className="relative section always-dark border-t border-line overflow-clip">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
          <div className="container-j relative flex flex-col items-center text-center">
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] text-ink max-w-xl">Don&rsquo;t see the right role?</SplitHeading>
            <Reveal delay={0.1}><p className="mt-6 text-ink-2 max-w-[58ch]">We&rsquo;re always looking for talented individuals. Send us your resume and let&rsquo;s talk about how you can contribute to our mission.</p></Reveal>
            <Reveal delay={0.18}><div className="mt-10"><Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary">Get In Touch</a></Magnetic></div></Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
