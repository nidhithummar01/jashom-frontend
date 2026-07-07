import Counter from "@/components/motion/Counter";
import { Stagger } from "@/components/motion/Reveal";

const STATS = [
  { value: 25, suffix: "+", label: "Clients served" },
  { value: 50, suffix: "+", label: "Projects delivered" },
  { value: 10, suffix: "X", label: "Peak performance gain" },
  { value: 100, suffix: "%", label: "Client satisfaction" },
];

export default function TrustStats() {
  return (
    <section className="section always-dark border-t border-line overflow-clip" id="trust-stats">
      <div className="container-j">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-[clamp(1.6rem,2.5vw,2.1rem)] text-ink uppercase font-bold tracking-tight">
            TRACK RECORD
          </h2>
        </div>

        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12" step={0.08}>
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col">
              <p className="font-mono text-[clamp(2rem,4vw,3rem)] leading-none text-ink font-bold">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-[0.875rem] md:text-[0.9375rem] text-ink-2 uppercase tracking-wider font-mono">
                {s.label}
              </p>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
