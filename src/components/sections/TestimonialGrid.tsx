"use client";

import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

export interface Testimonial { quote: string; name: string; org: string; }

export default function TestimonialGrid({ heading, subtitle, items }: {
  readonly heading: string;
  readonly subtitle: string;
  readonly items: Testimonial[];
}) {
  return (
    <section className="section" id="testimonials">
      <div className="container-j">
        <div className="grid lg:grid-cols-12 gap-6 items-end mb-10 md:mb-12">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Client Testimonials</span>
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">{heading}</SplitHeading>
            <Reveal><p className="text-ink-2 text-[1.0625rem] max-w-[55ch]">{subtitle}</p></Reveal>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="h-full">
              <figure className="h-full flex flex-col p-6 md:p-8 hover:bg-tint transition-all duration-300">
                <blockquote className="font-mono text-[18px] leading-[1.4] text-ink flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 pt-5 border-t border-line text-[0.9375rem]">
                  <span className="text-ink font-medium">{t.name}</span>
                  <span className="text-ink-2"> · {t.org}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
