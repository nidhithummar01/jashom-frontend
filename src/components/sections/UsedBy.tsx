"use client";

import React, { useState, useEffect } from "react";

const logo = (id: string, name: string, url: string, cls: string) => ({ id, name, url, className: cls });

const LOGO_POOL = [
  logo("nvidia", "NVIDIA", "https://www.pngarts.com/files/10/Nvidia-Logo-PNG-Image-Transparent.png", "h-14 md:h-16 w-auto object-contain scale-[1.4] origin-center"),
  logo("googlecloud", "Google Cloud", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/3840px-Google_Cloud_logo.svg.png", "h-8 md:h-10 w-auto object-contain"),
  logo("azure", "Microsoft Azure", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Microsoft_Azure_Logo.svg/3840px-Microsoft_Azure_Logo.svg.png", "h-8 md:h-10 w-auto object-contain"),
  logo("aws", "Amazon Web Services", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/960px-Amazon_Web_Services_Logo.svg.png", "h-11 md:h-13 w-auto object-contain"),
  logo("huggingface", "Hugging Face", "/brand-logo/Hugging-face.png", "h-8 md:h-10 w-auto object-contain"),
  logo("chatgpt", "ChatGPT", "https://www.edigitalagency.com.au/wp-content/uploads/new-ChatGPT-logo-black-png-large-size.png", "h-8 md:h-10 w-auto object-contain"),
  logo("gemini", "Google Gemini", "/brand-logo/gemini.png", "h-8 md:h-10 w-auto object-contain"),
  logo("claude", "Anthropic Claude", "/brand-logo/clude.png", "h-7 md:h-9 w-auto object-contain"),
  logo("ollama", "Ollama", "/brand-logo/ollama-logo.png", "h-8 md:h-10 w-auto object-contain"),
];

function swapSlot(
  targetSlot: number,
  nextLogoIndex: number,
  setSlots: React.Dispatch<React.SetStateAction<number[]>>,
  setFadingSlots: React.Dispatch<React.SetStateAction<Record<number, boolean>>>,
) {
  setTimeout(() => {
    setSlots(prev => { const next = [...prev]; next[targetSlot] = nextLogoIndex; return next; });
    setTimeout(() => {
      setFadingSlots(prev => { const next = { ...prev }; delete next[targetSlot]; return next; });
    }, 50);
  }, 500);
}

export default function UsedBy() {
  const [slots, setSlots] = useState([0, 1, 2, 3, 4, 5]);
  const [fadingSlots, setFadingSlots] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const swapLogo = () => {
      const targetSlot = Math.floor(Math.random() * 6); // NOSONAR — visual animation only
      if (fadingSlots[targetSlot]) return;

      const displayedIndices = new Set(slots);
      const availableIndices = Array.from({ length: LOGO_POOL.length }, (_, i) => i)
        .filter(i => !displayedIndices.has(i));

      if (availableIndices.length === 0) return;
      const nextLogoIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)]; // NOSONAR — visual animation only

      setFadingSlots(prev => ({ ...prev, [targetSlot]: true }));
      swapSlot(targetSlot, nextLogoIndex, setSlots, setFadingSlots);
    };

    // Staggered timer to trigger swaps at slightly randomized intervals
    const intervalTime = 2500 + Math.random() * 1500; // NOSONAR — visual animation only
    const timer = setInterval(swapLogo, intervalTime);

    return () => clearInterval(timer);
  }, [slots, fadingSlots]);

  return (
    <section className="w-full border-b border-line py-8" style={{ backgroundColor: 'var(--color-linen)' }} id="used-by">
      <div className="container-j">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-[clamp(1.6rem,2.5vw,2.1rem)] text-ink font-normal tracking-tight">
            Trusted by GPU and inference teams at frontier AI labs
 
          </h2>
        </div>

        {/* Brand Grid Container */}
        <div className="relative max-w-6xl mx-auto border-t border-l border-line bg-paper shadow-[6px_6px_0px_0px_var(--color-line)] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {slots.map((logoIndex, index) => {
            const logo = LOGO_POOL[logoIndex];
            return (
              <div
                key={logo.id}
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
