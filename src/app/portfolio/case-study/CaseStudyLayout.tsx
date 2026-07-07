"use client";

import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import type { Block, CaseStudy } from "./case-studies-data";

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto border border-line">
      <table className="w-full text-left text-[0.875rem] border-collapse">
        <thead>
          <tr className="bg-tint">
            {headers.map((h) => (
              <th key={h} className="font-mono text-[0.75rem] uppercase tracking-wider text-ink-2 font-medium p-3 border-b border-line">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-line last:border-b-0">
              {r.map((c, j) => (
                <td key={j} className={`p-3 align-top ${j === 0 ? "text-ink font-medium" : "text-ink-2"}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((b, i) => {
        if (b.t === "p") return <p key={i} className="text-ink-2 max-w-[68ch]">{b.text}</p>;
        if (b.t === "bullets")
          return (
            <ul key={i} className="flex flex-col gap-2.5">
              {b.items.map((it) => (
                <li key={it} className="flex gap-3 text-[0.9375rem] text-ink-2">
                  <span className="w-4 h-px bg-ink shrink-0 mt-3" aria-hidden="true" />
                  <span className="max-w-[64ch]">{it}</span>
                </li>
              ))}
            </ul>
          );
        if (b.t === "table") return <Table key={i} headers={b.headers} rows={b.rows} />;
        if (b.t === "sub")
          return (
            <div key={i} className="flex flex-col gap-3 pt-2">
              <h3 className="font-sans font-medium text-[1.0625rem] text-ink">{b.heading}</h3>
              <Blocks blocks={b.blocks} />
            </div>
          );
        return null;
      })}
    </div>
  );
}

export default function CaseStudyLayout({ data }: { data: CaseStudy }) {
  const reduced = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section id="hero" className="always-dark relative flex flex-col overflow-clip">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative pt-32 pb-12 max-w-4xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase mb-6">
            Case Study
          </motion.p>
          <h1 className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15]">
            <span className="block overflow-clip">
              <motion.span className="block"
                initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                animate={{ transform: "translateY(0%)" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                {data.title}
              </motion.span>
            </span>
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-5 font-mono text-[0.875rem] text-ink-3">{data.hardware}</motion.p>
          <motion.p
            initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="mt-7 max-w-[72ch] text-[1.0625rem] text-ink-2">{data.summary}</motion.p>
        </div>
      </section>

      <main>
        {/* Stats */}
        <section className="section always-dark border-y border-line !py-[calc(var(--section-pad)*0.6)]">
          <div className="container-j">
            <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10" step={0.06}>
              {data.stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <p className="font-mono text-[clamp(1.6rem,3.2vw,2.5rem)] leading-none text-ink font-bold">{s.value}</p>
                  <p className="mt-3 text-[0.8125rem] md:text-[0.875rem] text-ink-2 uppercase tracking-wider font-mono">{s.label}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Sections */}
        {data.sections.map((sec, i) => (
          <section key={sec.heading} className={`section ${i % 2 === 1 ? "bg-paper border-y border-line" : ""}`}>
            <div className="container-j max-w-4xl">
              {sec.eyebrow && <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">{sec.eyebrow}</span>}
              <SplitHeading className="text-[clamp(1.4rem,2.2vw,1.9rem)] mb-8">{sec.heading}</SplitHeading>
              <Reveal><Blocks blocks={sec.blocks} /></Reveal>
            </div>
          </section>
        ))}

        {/* Technologies */}
        <section className={`section ${data.sections.length % 2 === 1 ? "bg-paper border-y border-line" : ""}`}>
          <div className="container-j max-w-4xl">
            <SplitHeading className="text-[clamp(1.4rem,2.2vw,1.9rem)] mb-8">Technologies Used</SplitHeading>
            <Stagger className="flex flex-wrap gap-2.5" step={0.03}>
              {data.technologies.map((t) => (
                <span key={t} className="border border-line bg-linen px-3.5 py-1.5 text-[0.875rem] font-mono text-ink-2">{t}</span>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Outcome */}
        <section className="relative section always-dark border-t border-line overflow-clip">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
          <div className="container-j relative max-w-4xl">
            <SplitHeading className="text-[clamp(1.4rem,2.2vw,1.9rem)] text-ink mb-6">{data.outcome.heading}</SplitHeading>
            {data.outcome.paras.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}><p className="text-ink-2 max-w-[72ch] mb-4">{p}</p></Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary">Start a similar project</a></Magnetic>
                <a href="/portfolio/" className="btn btn-secondary">Back to all case studies</a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
