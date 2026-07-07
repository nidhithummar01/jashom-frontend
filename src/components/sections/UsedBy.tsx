"use client";

import React, { useState, useEffect } from "react";

// Pool of 9 showcase logos with customized, balanced sizing to ensure visual weight is identical
// Removed all dark:invert classes since the background is locked to white/light sand
const LOGO_POOL = [
  {
    id: "nvidia",
    name: "NVIDIA",
    url: "https://www.pngarts.com/files/10/Nvidia-Logo-PNG-Image-Transparent.png",
    className: "h-14 md:h-16 w-auto object-contain scale-[1.4] origin-center"
  },
  {
    id: "googlecloud",
    name: "Google Cloud",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/3840px-Google_Cloud_logo.svg.png",
    className: "h-8 md:h-10 w-auto object-contain"
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Microsoft_Azure_Logo.svg/3840px-Microsoft_Azure_Logo.svg.png",
    className: "h-8 md:h-10 w-auto object-contain"
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/960px-Amazon_Web_Services_Logo.svg.png",
    className: "h-11 md:h-13 w-auto object-contain"
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    url: "/brand-logo/Hugging-face.png",
    className: "h-8 md:h-10 w-auto object-contain"
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    url: "https://www.edigitalagency.com.au/wp-content/uploads/new-ChatGPT-logo-black-png-large-size.png",
    className: "h-8 md:h-10 w-auto object-contain"
  },
  {
    id: "gemini",
    name: "Google Gemini",
    url: "/brand-logo/gemini.png",
    className: "h-8 md:h-10 w-auto object-contain"
  },
  {
    id: "claude",
    name: "Anthropic Claude",
    url: "/brand-logo/clude.png",
    className: "h-7 md:h-9 w-auto object-contain"
  },
  {
    id: "ollama",
    name: "Ollama",
    url: "/brand-logo/ollama-logo.png",
    className: "h-8 md:h-10 w-auto object-contain"
  }
];

export default function UsedBy() {
  const [slots, setSlots] = useState([0, 1, 2, 3, 4, 5]);
  const [fadingSlots, setFadingSlots] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const swapLogo = () => {
      // Pick a random slot index (0 to 5)
      const targetSlot = Math.floor(Math.random() * 6);

      // If that slot is already transitioning, wait for the next tick
      if (fadingSlots[targetSlot]) return;

      // Find logo indices in LOGO_POOL that are not currently displayed in any slot
      const displayedIndices = new Set(slots);
      const availableIndices = Array.from({ length: LOGO_POOL.length }, (_, i) => i)
        .filter(i => !displayedIndices.has(i));

      if (availableIndices.length === 0) return;
      const nextLogoIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

      // Step 1: Fade out the target slot
      setFadingSlots(prev => ({ ...prev, [targetSlot]: true }));

      // Step 2: Swap the logo source after fade-out transition finishes (500ms)
      setTimeout(() => {
        setSlots(prev => {
          const next = [...prev];
          next[targetSlot] = nextLogoIndex;
          return next;
        });

        // Step 3: Fade the new logo back in
        setTimeout(() => {
          setFadingSlots(prev => {
            const next = { ...prev };
            delete next[targetSlot];
            return next;
          });
        }, 50); // Small render tick delay
      }, 500);
    };

    // Staggered timer to trigger swaps at slightly randomized intervals
    const intervalTime = 2500 + Math.random() * 1500;
    const timer = setInterval(swapLogo, intervalTime);

    return () => clearInterval(timer);
  }, [slots, fadingSlots]);

  return (
    <section className="w-full border-b border-line py-8" style={{ backgroundColor: 'var(--color-linen)' }} id="used-by">
      <div className="container-j">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-[clamp(1.6rem,2.5vw,2.1rem)] text-ink font-normal tracking-tight">
            Frontier Labs
          </h2>
        </div>

        {/* Brand Grid Container */}
        <div className="relative max-w-6xl mx-auto border-t border-l border-line bg-paper shadow-[6px_6px_0px_0px_var(--color-line)] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {slots.map((logoIndex, index) => {
            const logo = LOGO_POOL[logoIndex];
            return (
              <div
                key={index}
                className="group flex items-center justify-center py-8 px-6 min-h-[110px] md:min-h-[120px] border-r border-b border-line hover:bg-tint/50 transition-colors duration-300 cursor-default"
              >
                <div
                  className={`transition-opacity duration-500 ease-in-out ${fadingSlots[index] ? "opacity-0" : "opacity-100"
                    }`}
                >
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className={`${logo.className} transition-all duration-300 ease-out select-none`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
