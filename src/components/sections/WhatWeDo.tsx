import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

const PILLARS = [
  {
    title: "GPU Optimization",
    badge: "High Performance",
    body: "We provide dedicated GPU Optimization Services aimed at the maximum use of the compute efficiency. Our model will guarantee optimization in the use of hardware, the reduction of operational expenses, and coherent high-performance scale.",
  },
  {
    title: "CUDA Development",
    badge: "High Performance",
    body: "Our CUDA Development Services assist companies in developing high-performance parallel applications to suit their workloads with high demand. Our built-in kernel development-based team of CUDA Developers provides your apps with complete utilization of NVIDIA architecture.",
  },
];

export default function WhatWeDo() {
  return (
    <section className="section !pt-[calc(var(--section-pad)*0.5)]" id="what-we-do">
      <div className="container-j">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="sticky top-28 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">
                What We Do
              </SplitHeading>
              <Reveal>
                <p className="text-ink-2 text-[0.9375rem] max-w-[32ch]">
                  We engineer performance-first systems with measurable impact, from low-level GPU tuning to production-ready CUDA acceleration.
                </p>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-8">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className={`py-6 ${i === 0 ? "border-b border-line" : ""}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                    <h3 className="text-[1.25rem] md:text-[1.4rem] font-medium">{p.title}</h3>
                    <span className="text-[0.75rem] uppercase tracking-wide text-ink-2 bg-tint rounded-full px-3 py-1">
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-ink-2 max-w-[58ch]">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
