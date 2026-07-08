"use client";

import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";

export interface RelatedServiceItem { title: string; body: string; href: string; }

export default function RelatedServicesSection({ heading, subtitle, items }: {
  readonly heading: string;
  readonly subtitle: string;
  readonly items: readonly RelatedServiceItem[];
}) {
  return (
    <section className="section" id="related">
      <div className="container-j">
        <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
          <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">{heading}</SplitHeading>
          <Reveal><p className="text-ink-2 max-w-[60ch]">{subtitle}</p></Reveal>
        </div>
        <Stagger className="grid md:grid-cols-2 gap-6" step={0.08}>
          {items.map((r) => (
            <div key={r.title} className="group flex flex-col p-6 md:p-8 border border-line hover:bg-tint transition-all duration-300">
              <h3 className="text-[1.25rem] font-medium mb-3">{r.title}</h3>
              <p className="text-ink-2 mb-6 flex-1">{r.body}</p>
              <a href={r.href} className="link-line text-ink font-medium text-[0.9375rem] w-fit">Know More →</a>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
