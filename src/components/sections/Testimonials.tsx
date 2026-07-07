import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

/* Placeholder testimonials — replace quotes and attributions with
   verified client statements before launch. */
const QUOTES = [
  {
    quote: "Jashom's GPU optimization reduced our inference latency by 73%. The team's expertise in CUDA programming is unmatched.",
    name: "Alexander D.",
    org: "Founder, 20+ years of experience.",
  },
  {
    quote: "The AI automation solutions delivered by Jashom transformed our workflow. We achieved 5x faster processing with their custom ML pipeline.",
    name: "Ricky T.",
    org: "CTO, 15+ years of experience.",
  },
  {
    quote: "Outstanding DevSecOps implementation. Jashom's team integrated security seamlessly into our CI/CD pipeline without compromising speed.",
    name: "Jimmy B.",
    org: "VP Engineering, 10+ years of experience.",
  },
];

export default function Testimonials() {
  return (
    <section className="section bg-paper border-y border-line" id="testimonials">
      <div className="container-j">
        <div className="grid lg:grid-cols-12 gap-6 items-end mb-10 md:mb-12">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">
              Testimonials
            </span>
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">
              What Our Clients Say
            </SplitHeading>
            <Reveal>
              <p className="text-ink-2 text-[1.0625rem] max-w-[55ch]">
                The industry leaders are banking on our CUDA and GPU engineering skills to get the compute workloads on high throughput, enhance AI responsiveness, and implement stable high-performance units with results that can be measured.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.08} className="h-full">
              <figure className="h-full flex flex-col p-6 md:p-8 hover:bg-tint transition-all duration-300">
                <blockquote className="font-mono text-[18px] leading-[1.4] text-ink flex-1">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-line text-[0.9375rem]">
                  <span className="text-ink font-medium">{q.name}</span>
                  <span className="text-ink-2"> · {q.org}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
