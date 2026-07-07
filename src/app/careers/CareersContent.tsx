"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import type { Job } from "@/lib/jobs";
import { submitApplication } from "@/lib/jobs";

const PERKS = [
  { title: "Great Team", body: "Work with talented professionals who are passionate about innovation" },
  { title: "Career Growth", body: "Continuous learning opportunities and clear paths for advancement" },
  { title: "Work-Life Balance", body: "Flexible work arrangements and a supportive environment" },
  { title: "Cutting-Edge Projects", body: "Work on innovative AI and GPU optimization projects" },
];

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function JobCard({ job, onApply }: { job: Job; onApply: (job: Job) => void }) {
  return (
    <div className="border border-line bg-linen group flex flex-col gap-0 transition-all duration-300 hover:bg-paper">
      <div className="p-6 md:p-7 flex flex-col gap-3 flex-1">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-sans font-medium text-[1.1rem] text-ink leading-snug">{job.title}</h3>
            {job.department && (
              <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-3">{job.department}</span>
            )}
          </div>
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-warmwhite bg-ink px-2 py-1 shrink-0">
            Open
          </span>
        </div>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-2">
          {job.location && (
            <span className="font-mono text-[0.7rem] text-ink-2 bg-tint border border-line/60 px-2 py-0.5 rounded-sm">
              📍 {job.location}
            </span>
          )}
          {job.employment_type && (
            <span className="font-mono text-[0.7rem] text-ink-2 bg-tint border border-line/60 px-2 py-0.5 rounded-sm">
              ⏱ {job.employment_type}
            </span>
          )}
          {job.experience && (
            <span className="font-mono text-[0.7rem] text-ink-2 bg-tint border border-line/60 px-2 py-0.5 rounded-sm">
              🎯 {job.experience}
            </span>
          )}
          {job.salary_range && (
            <span className="font-mono text-[0.7rem] text-ink-2 bg-tint border border-line/60 px-2 py-0.5 rounded-sm">
              💰 {job.salary_range}
            </span>
          )}
        </div>

        {/* Description preview */}
        {job.description && (
          <p className="text-[0.875rem] text-ink-2 leading-relaxed line-clamp-3">{job.description}</p>
        )}

        {/* Posted date */}
        {job.posted_at && (
          <p className="font-mono text-[0.7rem] text-ink-3 uppercase tracking-wider mt-auto pt-3 border-t border-line/40">
            Posted {formatDate(job.posted_at)}
          </p>
        )}
      </div>

      {/* Apply button */}
      <div className="px-6 md:px-7 pb-6">
        <button
          onClick={() => onApply(job)}
          className="w-full btn btn-primary text-center"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

function ApplyModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("loading");
    try {
      await submitApplication({
        jobId: job.id,
        jobTitle: job.title,
        fullName: fd.get("fullName") as string,
        email: fd.get("email") as string,
        phone: (fd.get("phone") as string) || undefined,
        coverLetter: (fd.get("coverLetter") as string) || undefined,
        linkedinUrl: (fd.get("linkedinUrl") as string) || undefined,
        portfolioUrl: (fd.get("portfolioUrl") as string) || undefined,
      });
      setStatus("sent");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] bg-ink/50 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-linen border border-line w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-line">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-3 mb-1">Applying for</p>
            <h2 className="font-sans font-medium text-[1.1rem] text-ink">{job.title}</h2>
          </div>
          <button onClick={onClose} className="text-ink-3 hover:text-ink ml-4 mt-1 shrink-0" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.50002L3.21846 10.9685C2.99391 11.193 2.99391 11.5571 3.21846 11.7816C3.44301 12.0062 3.80708 12.0062 4.03164 11.7816L7.50005 8.31322L10.9685 11.7816C11.193 12.0062 11.5571 12.0062 11.7816 11.7816C12.0062 11.5571 12.0062 11.193 11.7816 10.9685L8.31322 7.50002L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {status === "sent" ? (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-12 h-12 border border-line bg-paper flex items-center justify-center text-ink">
                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.4669 3.72684C11.7175 3.91484 11.771 4.27125 11.583 4.52184L6.58302 11.1885C6.49575 11.3049 6.36246 11.3765 6.21951 11.3838C6.07657 11.3911 5.93514 11.3333 5.83407 11.2268L3.33407 8.56015C3.12921 8.34163 3.12921 7.98734 3.33407 7.76882C3.53893 7.5503 3.87107 7.5503 4.07593 7.76882L6.10842 9.93681L10.6719 3.84299C10.8599 3.5924 11.2163 3.53884 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                </svg>
              </div>
              <p className="font-mono text-[1.1rem] uppercase tracking-wider text-ink">Application Submitted</p>
              <p className="text-ink-2 text-[0.875rem] max-w-[36ch]">
                Thank you — we&rsquo;ll review your application and get back to you soon.
              </p>
              <button onClick={onClose} className="btn btn-secondary mt-2">Close</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-ink-2">Full Name *</label>
                  <input name="fullName" required className="field-j" placeholder="Your full name" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-ink-2">Email *</label>
                  <input name="email" type="email" required className="field-j" placeholder="you@email.com" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-ink-2">Phone</label>
                <input name="phone" type="tel" className="field-j" placeholder="+91 98765 43210" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-ink-2">LinkedIn Profile URL</label>
                <input name="linkedinUrl" type="url" className="field-j" placeholder="https://linkedin.com/in/yourname" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-ink-2">Portfolio / GitHub URL</label>
                <input name="portfolioUrl" type="url" className="field-j" placeholder="https://github.com/yourname" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-ink-2">Cover Letter / Message</label>
                <textarea name="coverLetter" rows={4} className="field-j resize-y" placeholder="Tell us why you're a great fit for this role…" />
              </div>
              {status === "error" && (
                <p className="text-[0.8125rem] text-red-600">{errorMsg}</p>
              )}
              <button type="submit" disabled={status === "loading"} className="btn btn-primary disabled:opacity-60">
                {status === "loading" ? "Submitting…" : "Submit Application"}
              </button>
              <p className="text-[0.75rem] text-ink-3 text-center">
                Your information is kept confidential and used only for this application.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CareersContent({ jobs }: { jobs: Job[] }) {
  const reduced = useReducedMotion();
  const [applyingTo, setApplyingTo] = useState<Job | null>(null);
  const [generalFormStatus, setGeneralFormStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [generalErrorMsg, setGeneralErrorMsg] = useState("");

  const publishedJobs = jobs.filter((j) => j.status === "published");

  const handleGeneralSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setGeneralFormStatus("loading");
    try {
      await submitApplication({
        jobId: null,
        jobTitle: (fd.get("position") as string) || "General Application",
        fullName: fd.get("name") as string,
        email: fd.get("email") as string,
        phone: (fd.get("phone") as string) || undefined,
        coverLetter: (fd.get("message") as string) || undefined,
        linkedinUrl: (fd.get("linkedinUrl") as string) || undefined,
      });
      setGeneralFormStatus("sent");
    } catch (err) {
      setGeneralErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setGeneralFormStatus("error");
    }
  };

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
                Find your big role in our purposeful team
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
            className="mt-10 flex flex-wrap gap-4">
            <Magnetic strength={0.18}>
              <a href="#openings" className="btn btn-primary">
                {publishedJobs.length > 0 ? `See ${publishedJobs.length} Open Role${publishedJobs.length > 1 ? "s" : ""}` : "See Openings"}
              </a>
            </Magnetic>
            <a href="#apply" className="btn btn-secondary">Submit Resume</a>
          </motion.div>
        </div>
      </section>

      <main>
        {/* Why Join */}
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

        {/* Current Openings */}
        <section className="section bg-paper border-y border-line" id="openings">
          <div className="container-j">
            <div className="max-w-2xl mb-10 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Current Openings</SplitHeading>
              <Reveal>
                <p className="text-ink-2 max-w-[58ch]">
                  {publishedJobs.length > 0
                    ? `We have ${publishedJobs.length} open position${publishedJobs.length > 1 ? "s" : ""} right now. Click a role to apply.`
                    : "Explore opportunities to join our growing team"}
                </p>
              </Reveal>
            </div>

            {publishedJobs.length === 0 ? (
              <Reveal>
                <div className="border border-line bg-linen p-8 md:p-10 flex flex-col items-start gap-4">
                  <p className="text-[1.25rem] font-medium text-ink">Currently no openings</p>
                  <p className="text-ink-2 max-w-[52ch]">We&rsquo;re not hiring right now, but you can still submit your resume for future opportunities.</p>
                  <a href="#apply" className="btn btn-primary">Submit Resume</a>
                </div>
              </Reveal>
            ) : (
              <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" itemClassName="h-full" step={0.07}>
                {publishedJobs.map((job) => (
                  <JobCard key={job.id} job={job} onApply={setApplyingTo} />
                ))}
              </Stagger>
            )}
          </div>
        </section>

        {/* General Application Form */}
        <section className="section" id="apply">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Don&rsquo;t see your role?</span>
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Send us your resume</SplitHeading>
                <Reveal><p className="text-ink-2 max-w-[48ch]">If you are passionate and skilled, we&rsquo;ll get along very well :)</p></Reveal>
              </div>
              <div className="lg:col-span-7">
                {generalFormStatus === "sent" ? (
                  <div className="h-full flex flex-col items-start justify-center bg-linen border border-line p-10">
                    <p className="font-mono text-3xl mb-3">Application received.</p>
                    <p className="text-ink-2">Thank you — we&rsquo;ll be in touch about future opportunities.</p>
                  </div>
                ) : (
                  <Reveal delay={0.08}>
                    <form onSubmit={handleGeneralSubmit} className="grid sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm text-ink-2">Full Name *</label>
                        <input name="name" required className="field-j" placeholder="Your name" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm text-ink-2">Email Address *</label>
                        <input name="email" type="email" required className="field-j" placeholder="you@email.com" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm text-ink-2">Phone Number</label>
                        <input name="phone" type="tel" className="field-j" placeholder="+91" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm text-ink-2">Position / Role</label>
                        <input name="position" className="field-j" placeholder="Role you're interested in" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm text-ink-2">LinkedIn URL</label>
                        <input name="linkedinUrl" type="url" className="field-j" placeholder="https://linkedin.com/in/..." />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm text-ink-2">Portfolio / GitHub</label>
                        <input name="portfolio" type="url" className="field-j" placeholder="https://github.com/..." />
                      </div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="text-sm text-ink-2">Message / Cover Letter</label>
                        <textarea name="message" rows={5} className="field-j resize-y" placeholder="Tell us about yourself" />
                      </div>
                      <div className="sm:col-span-2 flex flex-col gap-3 items-start">
                        {generalFormStatus === "error" && <p className="text-[0.8125rem] text-red-600">{generalErrorMsg}</p>}
                        <button type="submit" disabled={generalFormStatus === "loading"} className="btn btn-primary disabled:opacity-60">
                          {generalFormStatus === "loading" ? "Sending…" : "Submit Application"}
                        </button>
                        <p className="text-[0.8125rem] text-ink-3">By submitting, you agree to our privacy policy.</p>
                      </div>
                    </form>
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative section always-dark border-t border-line overflow-clip">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
          <div className="container-j relative flex flex-col items-center text-center">
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] text-ink max-w-xl">Don&rsquo;t see the right role?</SplitHeading>
            <Reveal delay={0.1}><p className="mt-6 text-ink-2 max-w-[58ch]">We&rsquo;re always looking for talented individuals. Send us your resume and let&rsquo;s talk about how you can contribute to our mission.</p></Reveal>
            <Reveal delay={0.18}><div className="mt-10"><Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary">Get In Touch</a></Magnetic></div></Reveal>
          </div>
        </section>
      </main>

      {/* Apply Modal */}
      {applyingTo && <ApplyModal job={applyingTo} onClose={() => setApplyingTo(null)} />}
    </>
  );
}
