"use client";

import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

export interface FaqItem { q: string; a: string; }

export default function FaqAccordion({ subtitle, items, sectionClassName = "section bg-paper border-y border-line" }: {
  readonly subtitle: string;
  readonly items: FaqItem[];
  readonly sectionClassName?: string;
}) {
  return (
    <section className={sectionClassName} id="faq">
      <div className="container-j">
        <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
          <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">FAQs</span>
          <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Frequently Asked Questions</SplitHeading>
          <Reveal><p className="text-ink-2 max-w-[58ch]">{subtitle}</p></Reveal>
        </div>
        <div className="border-t border-line max-w-3xl">
          {items.map((f) => (
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
  );
}
