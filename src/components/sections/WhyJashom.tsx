import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";

function Icon({ name }: { name: string }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "gauge": // performance
      return (
        <svg {...common}>
          <path d="M4.5 16.5 A8.5 8.5 0 0 1 19.5 16.5" />
          <path d="M12 16.5 L16 9.5" />
          <circle cx="12" cy="16.5" r="1.4" fill="currentColor" stroke="none" />
          <path d="M4 12.5 l1.8.6 M20 12.5 l-1.8.6 M12 7.5 v2" />
        </svg>
      );
    case "layers": // production-grade systems
      return (
        <svg {...common}>
          <path d="M12 3.5 L20.5 8 L12 12.5 L3.5 8 Z" />
          <path d="M3.5 12.5 L12 17 L20.5 12.5" />
          <path d="M3.5 16.5 L12 21 L20.5 16.5" />
        </svg>
      );
    case "shield": // security
      return (
        <svg {...common}>
          <path d="M12 3 L19.5 6 V11.5 C19.5 16.5 16.5 19.8 12 21.5 C7.5 19.8 4.5 16.5 4.5 11.5 V6 Z" />
          <path d="M9 11.8 L11.2 14 L15.2 9.5" />
        </svg>
      );
    case "cycle": // rapid cycles
      return (
        <svg {...common}>
          <path d="M19.5 12 A7.5 7.5 0 1 1 17.3 6.7" />
          <path d="M17.5 3.5 L17.5 7 L14 7" />
        </svg>
      );
    case "headset": // support
      return (
        <svg {...common}>
          <path d="M4.5 13 V12 a7.5 7.5 0 0 1 15 0 v1" />
          <rect x="3.5" y="13" width="4" height="6" rx="2" />
          <rect x="16.5" y="13" width="4" height="6" rx="2" />
          <path d="M18.5 19 a3.5 3.5 0 0 1 -3.5 2.5 h-2" />
        </svg>
      );
    case "scale": // cost-efficient scaling
      return (
        <svg {...common}>
          <path d="M4 20 V14 M9.5 20 V10 M15 20 V6.5" />
          <path d="M15.5 3.5 L20.5 3.5 L20.5 8.5" />
          <path d="M20.5 3.5 L14.5 9.5" />
        </svg>
      );
    default:
      return null;
  }
}

const REASONS = [
  {
    icon: "gauge",
    title: "10x GPU Performance Improvement",
    body: "Architecture-sensitive tuning methods are used by us to reap the best out of NVIDIA GPUs, providing physical acceleration to AI applications.",
  },
  {
    icon: "layers",
    title: "Production-Grade AI Systems",
    body: "Develop scalable systems that are designed with a focus on reliability, monitoring, and long-term performance.",
  },
  {
    icon: "shield",
    title: "Enterprise-Level Security",
    body: "Our operations are enforced under stringent security measures, compliance, and data protection models in order to secure essential workloads.",
  },
  {
    icon: "cycle",
    title: "Rapid Implementation Cycles",
    body: "We satisfy the timeline requirements of projects through organized processes, which allow us to roll out faster and maintain the quality of performance.",
  },
  {
    icon: "headset",
    title: "Dedicated Technical Support",
    body: "Our experts have continued optimization, surveillance, and expert services that ensure that the system operates continuously.",
  },
  {
    icon: "scale",
    title: "Cost-Efficient Scaling",
    body: "Our frameworks for designing GPU systems consider the demand of performance with functional efficiency to ensure the highest ROI in the long-term.",
  },
];

export default function WhyJashom() {
  return (
    <section className="section" id="why-jashom">
      <div className="container-j">
        <div className="grid lg:grid-cols-12 gap-6 items-end mb-10 md:mb-12">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">
              Why Choose Jashom?
            </SplitHeading>
            <Reveal>
              <p className="text-ink-2 text-[1.0625rem] max-w-[55ch]">
                Experience the Jashom advantage with cutting-edge GPU optimization and CUDA development solutions
              </p>
            </Reveal>
          </div>
        </div>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-line" itemClassName="h-full" step={0.05}>
          {REASONS.map((r) => (
            <div key={r.title} className="group h-full p-5 md:p-6 border-b border-line hover:bg-tint transition-all duration-300">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-none bg-tint text-ink mb-4 transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:bg-linen">
                <Icon name={r.icon} />
              </span>
              <h3 className="font-sans font-medium text-[1rem] text-ink mb-2">{r.title}</h3>
              <p className="text-[0.875rem] text-ink-2">{r.body}</p>
            </div>
          ))}
        </Stagger>

        <Reveal className="mt-10 flex justify-center">
          <Magnetic strength={0.18}>
            <a href="/contact/" className="btn btn-primary">
              Start Your AI Transformation
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
