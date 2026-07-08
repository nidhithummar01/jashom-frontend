"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";

const ArrowSvg = () => (
  <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
    <path
      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

function LinkList({ heading, links }: {
  readonly heading: string;
  readonly links: { readonly title: string; readonly description: string; readonly url: string }[];
}) {
  return (
    <div className="mb-14 last:mb-0">
      <h2 className="font-mono text-[0.875rem] uppercase tracking-wider text-ink-3 border-b border-line pb-2 mb-6">
        {heading}
      </h2>
      <div className="flex flex-col border-t border-l border-line bg-paper">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-6 border-b border-r border-line hover:bg-tint/50 transition-all duration-300 group"
          >
            <div>
              <h3 className="font-sans font-medium text-[1.125rem] text-ink group-hover:underline decoration-1 underline-offset-4 mb-1">
                {link.title}
              </h3>
              <p className="text-sm text-ink-2 max-w-[65ch]">{link.description}</p>
            </div>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 text-ink-3 group-hover:text-ink pl-4">
              <ArrowSvg />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

const DESIGN_LINKS = [
  {
    title: "Logo Figma",
    description: "Official brand identity assets, typography structures, and logo configurations.",
    url: "https://www.figma.com/design/WyYu9x2DCjCtcyF2csWm0v/%F0%9F%93%81-Jashom-Technologies?node-id=254-2&t=m1vrqTF2ljENpB06-4",
  },
  {
    title: "UX Process Figma",
    description: "User flow charts, process blueprints, and architectural layouts.",
    url: "https://www.figma.com/design/WyYu9x2DCjCtcyF2csWm0v/%F0%9F%93%81-Jashom-Technologies?node-id=112-2901&t=m1vrqTF2ljENpB06-4",
  },
  {
    title: "Wireframes Figma",
    description: "Low-fidelity outline wireframes, layout planning, and screen models.",
    url: "https://www.figma.com/design/WyYu9x2DCjCtcyF2csWm0v/%F0%9F%93%81-Jashom-Technologies?node-id=104-5&t=m1vrqTF2ljENpB06-4",
  },
];

const PROTOTYPE_LINKS = [
  {
    title: "Home 1.1",
    description: "Live prototype release 1.1 featuring standard design assets.",
    url: "https://jashom-final.vercel.app/",
  },
  {
    title: "Home 2.1",
    description: "Live prototype release 2.1 presenting the alternative black hero variation.",
    url: "https://jashom-black-hero-gules.vercel.app/",
  },
];

export default function AllLinksPage() {
  return (
    <>
      <Nav forceBg />
      <main className="min-h-screen bg-linen pt-32 pb-20 border-b border-line">
        <div className="container-j max-w-4xl">
          {/* Page Title Header */}
          <div className="mb-14">
            <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium block mb-3">
              INDEX
            </span>
            <h1 className="text-[clamp(2.2rem,4vw,3.2rem)] font-sans font-medium text-ink leading-tight tracking-tight">
              Project Resources
            </h1>
            <p className="text-ink-2 text-[1.125rem] mt-3 max-w-[50ch]">
              A centralized index of Figma design resources, wireframes, and live prototypes for Jashom Technologies.
            </p>
          </div>

          <LinkList heading="Figma Design Files" links={DESIGN_LINKS} />
          <LinkList heading="Live Prototypes" links={PROTOTYPE_LINKS} />
        </div>
      </main>
      <Footer />
    </>
  );
}
