"use client";

import { useState } from "react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { submitContactForm } from "@/lib/submitContact";

export interface ContactHighlight { title: string; body: string; }

export default function HireContactForm({
  heading,
  description,
  highlights = [],
  hiringOptions = [],
  messagePlaceholder = "Tell us about your project and goals.",
  messageFallback = "",
  showPrivacyNote = false,
  sectionClassName = "section",
}: {
  readonly heading: string;
  readonly description: string;
  readonly highlights?: ContactHighlight[];
  readonly hiringOptions?: string[];
  readonly messagePlaceholder?: string;
  readonly messageFallback?: string;
  readonly showPrivacyNote?: boolean;
  readonly sectionClassName?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <section className={sectionClassName} id="contact">
      <div className="container-j">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">{heading}</SplitHeading>
            <Reveal><p className="text-ink-2 max-w-[48ch]">{description}</p></Reveal>
            {highlights.length > 0 && (
              <Reveal delay={0.1}>
                <div className="mt-2 flex flex-col gap-5">
                  {highlights.map((h) => (
                    <div key={h.title}>
                      <p className="text-ink font-medium mb-1">{h.title}</p>
                      <p className="text-[0.9375rem] text-ink-2">{h.body}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
          <div className="lg:col-span-7">
            {status === "sent" ? (
              <div className="h-full flex flex-col items-start justify-center bg-linen border border-line rounded-none p-10">
                <p className="font-mono text-3xl mb-3">Request received.</p>
                <p className="text-ink-2">Thank you — we&rsquo;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <Reveal delay={0.08}>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    const model = fd.get("model") as string;
                    const rawMsg = (fd.get("message") as string) || "";
                    setStatus("loading");
                    try {
                      await submitContactForm({
                        fullName: fd.get("name") as string,
                        email: fd.get("email") as string,
                        phone: fd.get("phone") as string,
                        company: fd.get("company") as string,
                        message: model ? `[Hiring Model: ${model}]\n\n${rawMsg}` : rawMsg || messageFallback,
                      });
                      setStatus("sent");
                    } catch (err) {
                      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
                      setStatus("error");
                    }
                  }}
                  className="grid sm:grid-cols-2 gap-5"
                >
                  <div className="flex flex-col gap-1.5"><label htmlFor="hcf-name" className="text-sm text-ink-2">Full Name *</label><input id="hcf-name" name="name" required autoComplete="name" className="field-j" placeholder="Your name" /></div>
                  <div className="flex flex-col gap-1.5"><label htmlFor="hcf-email" className="text-sm text-ink-2">Email Address *</label><input id="hcf-email" name="email" type="email" required autoComplete="email" className="field-j" placeholder="you@company.com" /></div>
                  <div className="flex flex-col gap-1.5"><label htmlFor="hcf-phone" className="text-sm text-ink-2">Phone Number</label><input id="hcf-phone" name="phone" type="tel" autoComplete="tel" className="field-j" placeholder="+91" /></div>
                  <div className="flex flex-col gap-1.5"><label htmlFor="hcf-company" className="text-sm text-ink-2">Company Name</label><input id="hcf-company" name="company" autoComplete="organization" className="field-j" placeholder="Company name" /></div>
                  {hiringOptions.length > 0 && (
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label htmlFor="hcf-model" className="text-sm text-ink-2">Preferred Hiring Model</label>
                      <select id="hcf-model" name="model" defaultValue="" className="field-j">
                        <option value="" disabled>Select a hiring model</option>
                        {hiringOptions.map((o) => (<option key={o} value={o}>{o}</option>))}
                      </select>
                    </div>
                  )}
                  <div className="flex flex-col gap-1.5 sm:col-span-2"><label htmlFor="hcf-message" className="text-sm text-ink-2">Project Requirements</label><textarea id="hcf-message" name="message" rows={5} className="field-j resize-y" placeholder={messagePlaceholder} /></div>
                  <div className="sm:col-span-2 flex flex-col items-start gap-2">
                    {status === "error" && <p className="text-[0.8125rem] text-red-600">{errorMsg}</p>}
                    <button type="submit" disabled={status === "loading"} className="btn btn-primary disabled:opacity-60">{status === "loading" ? "Sending…" : "Submit Request"}</button>
                    {showPrivacyNote && <p className="text-[0.8125rem] text-ink-3">By submitting this form, you agree to our privacy policy and terms of service.</p>}
                  </div>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
