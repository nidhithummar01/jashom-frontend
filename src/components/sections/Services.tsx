"use client";

import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { GaugeVisual, ParallelVisual } from "@/components/radix/ServiceVisuals";

const SERVICES = [
  {
    title: "GPU Optimization Service",
    body: "We optimize AI and compute workloads with the help of advanced GPU optimization, performance, efficiency, and hardware usage.",
    points: ["Workload profiling & bottleneck analysis", "Inference acceleration (TensorRT, Triton)", "Memory & bandwidth optimization"],
    href: "/gpu-optimization-service/",
  },
  {
    title: "CUDA Development Service",
    body: "Hire skilled CUDA developers to create and optimize parallel advanced applications that meet your requirements.",
    points: ["Custom kernel development", "Parallel algorithm optimization", "Multi-GPU system architecture"],
    href: "/cuda-development-service/",
  },
];

export default function Services() {
  return (
    <section className="section bg-paper border-y border-line !py-[calc(var(--section-pad)*0.7)]" id="services">
      <div className="container-j">
        <div className="max-w-2xl mb-10 md:mb-12">
          <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] mb-5">
            Which Services We Provide
          </SplitHeading>
          <Reveal>
            <p className="text-ink-2">
              Two core disciplines, one outcome: AI systems that run at the speed the hardware
              was built for.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-12 md:gap-14">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <div>
                  <h3 className="text-[1.25rem] md:text-[1.4rem] font-medium mb-4">{s.title}</h3>
                  <p className="text-ink-2 mb-6 max-w-[55ch]">{s.body}</p>
                  <ul className="flex flex-col gap-2.5 mb-8">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-3 text-[0.9375rem] text-ink">
                        <span className="w-4 h-px bg-ink shrink-0" aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <a href={s.href} className="link-line text-ink font-medium text-[0.9375rem]">
                    Explore service →
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="bg-linen border border-line rounded-none p-2.5 md:p-4">
                  {i === 0 ? <GaugeVisual /> : <ParallelVisual />}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
