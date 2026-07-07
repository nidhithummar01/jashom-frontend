import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";

interface LanguageItem {
  name: string;
  description: string;
  icon: React.ReactNode;
}

const LANGUAGES: LanguageItem[] = [
  {
    name: "CUDA",
    description: "Native CUDA C/C++",
    icon: (
      <img
        src="/mini-icon/cuda.svg"
        className="w-8 h-8 select-none transition-all duration-300"
        alt="CUDA"
      />
    ),
  },
  {
    name: "Triton",
    description: "OpenAI Triton",
    icon: (
      <img
        src="/mini-icon/chatgpt.svg"
        className="w-8 h-8 select-none transition-all duration-300"
        alt="Triton"
      />
    ),
  },
  {
    name: "Mojo",
    description: "Mojo GPU kernels",
    icon: (
      <img
        src="/mini-icon/mojo.svg"
        className="w-8 h-8 select-none transition-all duration-300"
        alt="Mojo"
      />
    ),
  },
  {
    name: "PyTorch",
    description: "PyTorch Framework",
    icon: (
      <img
        src="/mini-icon/pytorch.svg"
        className="w-8 h-8 select-none transition-all duration-300"
        alt="PyTorch"
      />
    ),
  },
  {
    name: "CUTE",
    description: "CUTLASS Templates",
    icon: (
      <img
        src="/mini-icon/cute.svg"
        className="w-8 h-8 select-none transition-all duration-300"
        alt="CUTE"
      />
    ),
  },
  {
    name: "CUDA Tile",
    description: "Tile-based CUDA kernels",
    icon: (
      <img
        src="/mini-icon/cuda-tile .svg"
        className="w-8 h-8 select-none transition-all duration-300"
        alt="CUDA Tile"
      />
    ),
  },
  {
    name: "Numba",
    description: "Numba GPU kernels",
    icon: (
      <img
        src="/mini-icon/numba.png"
        className="w-8 h-8 select-none transition-all duration-300"
        alt="Numba"
      />
    ),
  },
  {
    name: "TileLang",
    description: "Tile Language DSL",
    icon: (
      <img
        src="/mini-icon/tile-lang.svg"
        className="w-8 h-8 select-none transition-all duration-300"
        alt="TileLang"
      />
    ),
  },
  {
    name: "REQUEST",
    description: "Request a new language",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-8 h-8 fill-none stroke-current stroke-[1.5] text-ink-3 transition-colors duration-300"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
];

export default function SupportedLanguages() {
  return (
    <section className="section bg-linen border-t border-b border-line" id="supported-languages">
      <div className="container-j">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-14 md:mb-16">
          <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">
            Supported Languages
          </span>
          <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">
            Write GPU code in your preferred DSL
          </SplitHeading>
          <Reveal>
            <p className="text-ink-2 text-[0.9375rem] md:text-[1.0625rem] max-w-[65ch]">
              Jashom supports multiple GPU programming languages and domain-specific languages, including Numba, Mojo, and CUDA Tile.
            </p>
          </Reveal>
        </div>

        {/* Languages Grid */}
        <Stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-l border-line" itemClassName="h-full" step={0.05}>
          {LANGUAGES.map((lang) => (
            <div
              key={lang.name}
              className="bg-paper border-r border-b border-line group flex flex-col items-start p-6 md:p-7 h-full hover:bg-tint/50 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="mb-6 transition-transform duration-300 group-hover:-translate-y-1">
                {lang.icon}
              </div>

              {/* Title */}
              <h3 className="font-mono text-[1.05rem] font-bold text-ink mb-1.5 uppercase tracking-wide">
                {lang.name}
              </h3>

              {/* Description */}
              <p className="text-[0.8125rem] md:text-[0.875rem] text-ink-2 font-mono tracking-tight leading-normal">
                {lang.description}
              </p>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
