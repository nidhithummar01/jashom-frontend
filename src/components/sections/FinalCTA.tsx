import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";

export default function FinalCTA() {
  return (
    <section id="final-cta" className="relative section always-dark border-t border-line overflow-clip">
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]"
        aria-hidden="true"
      />
      {/* Minimal waves background aligned at the bottom */}
      <div className="absolute bottom-0 inset-x-0 h-44 opacity-[0.08] pointer-events-none select-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 200" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main wave */}
          <path
            d="M -10,120 C 250,50 480,180 720,110 C 960,40 1180,180 1450,110"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Second wave */}
          <path
            d="M -10,150 C 280,80 440,190 690,130 C 940,70 1140,190 1450,130"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="container-j relative flex flex-col items-center text-center">
        <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] text-ink max-w-xl">
          Ready to Accelerate Your AI Journey?
        </SplitHeading>
        <Reveal delay={0.1}>
          <p className="mt-6 text-ink-2 max-w-[58ch]">
            Join hundreds of forward-thinking companies leveraging Jashom{"'"}s AI expertise to drive innovation and achieve unprecedented business outcomes.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Magnetic strength={0.18}>
              <a href="https://cal.id/jashom-technologies/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Request a Demo
              </a>
            </Magnetic>
            <a href="/portfolio/" className="btn btn-secondary">
              View Case Studies
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
