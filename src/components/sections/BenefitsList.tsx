"use client";

import SplitHeading from "@/components/motion/SplitHeading";

export interface BenefitItem { title: string; body: string; }

export default function BenefitsList({ heading, items }: {
  readonly heading: string;
  readonly items: BenefitItem[];
}) {
  return (
    <section className="section" id="benefits">
      <div className="container-j">
        <div className="max-w-2xl mb-10 md:mb-12">
          <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Benefits</span>
          <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] mt-2">{heading}</SplitHeading>
        </div>
        <div className="flex flex-col border-t border-line">
          {items.map((b, i) => (
            <div key={b.title} className="group grid md:grid-cols-12 gap-4 md:gap-8 py-8 px-4 border-b border-line hover:bg-tint/40 transition-colors duration-300 items-start">
              <div className="md:col-span-4 flex gap-4 items-start">
                <span className="font-mono text-xs text-ink-3 tabular-nums pt-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-sans font-medium text-[1.125rem] text-ink leading-snug">{b.title}</h3>
              </div>
              <div className="md:col-span-8 flex justify-between items-start gap-4">
                <p className="text-[0.9375rem] text-ink-2 leading-relaxed max-w-[62ch]">{b.body}</p>
                <div className="hidden sm:block text-ink-3 group-hover:text-ink transform translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 pt-1">
                  <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
