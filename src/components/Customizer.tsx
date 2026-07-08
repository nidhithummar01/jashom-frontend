"use client";

import { useState, useEffect } from "react";

// Types
interface ColorPreset {
  name: string;
  id: string;
  isDark: boolean;
  bg: string;
  card: string;
  text: string;
  accent: string;
  border: string;
}

interface FontPreset {
  name: string;
  id: string;
  sansName: string;
  monoName: string;
  fontUrl: string | null; // null for system/default
  variables: Record<string, string>;
}

// Fixed Color Presets
const COLOR_PRESETS: ColorPreset[] = [
  {
    name: "Current Version (Classic Sand)",
    id: "current",
    isDark: false,
    bg: "#F7F7F4",
    card: "#FFFFFF",
    text: "#111113",
    accent: "#18181c",
    border: "#e4e3de",
  },
  {
    name: "Dark Version (Obsidian Slate)",
    id: "dark-version",
    isDark: true,
    bg: "#111113",
    card: "#17171a",
    text: "#e8e6df",
    accent: "#ffffff",
    border: "#28282c",
  },
  {
    name: "Pure White Theme",
    id: "white-theme",
    isDark: false,
    bg: "#FFFFFF",
    card: "#FFFFFF",
    text: "#111113",
    accent: "#18181c",
    border: "#E4E3DE",
  },
  {
    name: "Slate Grey Theme",
    id: "grey-theme",
    isDark: false,
    bg: "#EAEAEA",
    card: "#F5F5F5",
    text: "#1A1A1A",
    accent: "#000000",
    border: "#D1D1D1",
  },
  {
    name: "Deep Black Theme",
    id: "black-theme",
    isDark: true,
    bg: "#000000",
    card: "#0D0D0D",
    text: "#FFFFFF",
    accent: "#FFFFFF",
    border: "#262626",
  },
  {
    name: "Black & White Combination",
    id: "black-white",
    isDark: false,
    bg: "#FFFFFF",
    card: "#FFFFFF",
    text: "#000000",
    accent: "#000000",
    border: "#000000",
  },
  {
    name: "Black & Cream Combination",
    id: "black-cream",
    isDark: false,
    bg: "#F7F7F4",
    card: "#F7F7F4",
    text: "#111113",
    accent: "#111113",
    border: "#e4e3de",
  },
];

// Font Presets
const FONT_PRESETS: FontPreset[] = [
  {
    name: "JetBrains Mono + JetBrains Mono",
    id: "current",
    sansName: "JetBrains Mono",
    monoName: "JetBrains Mono",
    fontUrl: null,
    variables: {
      "--font-sans-family": "var(--font-jetbrains-mono), monospace",
      "--font-mono-family": "var(--font-jetbrains-mono), monospace",
    },
  },
  {
    name: "Space Grotesk + Inter",
    id: "grotesk-inter",
    sansName: "Inter",
    monoName: "Space Grotesk",
    fontUrl: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap",
    variables: {
      "--font-sans-family": "'Inter', sans-serif",
      "--font-mono-family": "'Space Grotesk', sans-serif",
    },
  },
  {
    name: "Sora + Manrope",
    id: "sora-manrope",
    sansName: "Manrope",
    monoName: "Sora",
    fontUrl: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap",
    variables: {
      "--font-sans-family": "'Manrope', sans-serif",
      "--font-mono-family": "'Sora', sans-serif",
    },
  },
  {
    name: "Plus Jakarta Sans + IBM Plex Sans",
    id: "plusjakarta-ibmplex",
    sansName: "IBM Plex Sans",
    monoName: "Plus Jakarta Sans",
    fontUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap",
    variables: {
      "--font-sans-family": "'IBM Plex Sans', sans-serif",
      "--font-mono-family": "'Plus Jakarta Sans', sans-serif",
    },
  },
];

function ColorRow({ id, label, value, onChange }: {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor={id} className="font-mono text-[0.75rem] text-ink uppercase">{label}</label>
      <div className="flex items-center gap-2">
        <span className="font-mono text-[0.6875rem] text-ink-2 select-all">{value}</span>
        <input id={id} type="color" value={value} onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 border border-line cursor-pointer p-0" />
      </div>
    </div>
  );
}

export default function Customizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"colors" | "fonts">("colors");

  // Color states
  const [selectedColorPreset, setSelectedColorPreset] = useState("current");
  const [customBg, setCustomBg] = useState("#F7F7F4");
  const [customCard, setCustomCard] = useState("#FFFFFF");
  const [customText, setCustomText] = useState("#111113");
  const [customAccent, setCustomAccent] = useState("#18181c");
  const [customBorder, setCustomBorder] = useState("#e4e3de");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Section background override states
  const [sectionColors, setSectionColors] = useState<Record<string, string>>({
    hero: "default",
    "ask-chatgpt": "default",
    "used-by": "default",
    "what-we-do": "default",
    services: "default",
    "trust-stats": "default",
    "case-studies": "default",
    "supported-languages": "default",
    testimonials: "default",
    "why-jashom": "default",
    blog: "default",
    contact: "default",
    "final-cta": "default",
  });

  const applySectionColor = (sectionId: string, color: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    if (color === "default") {
      el.style.removeProperty("--bg-primary");
      el.style.removeProperty("--bg-secondary");
      el.style.removeProperty("--text-primary");
      el.style.removeProperty("--text-secondary");
      el.style.removeProperty("--text-tertiary");
      el.style.removeProperty("--border-default");
      el.style.removeProperty("--accent-cta");
      el.style.backgroundColor = "";
      el.style.color = "";
      el.style.borderColor = "";
      if (sectionId === "hero" || sectionId === "final-cta" || sectionId === "trust-stats") {
        el.classList.add("always-dark");
      }
    } else if (color === "white") {
      el.style.setProperty("--bg-primary", "#FFFFFF");
      el.style.setProperty("--bg-secondary", "#F7F7F7");
      el.style.setProperty("--text-primary", "#111113");
      el.style.setProperty("--text-secondary", "#111113b3");
      el.style.setProperty("--text-tertiary", "#11111380");
      el.style.setProperty("--border-default", "#E4E3DE");
      el.style.setProperty("--accent-cta", "#18181c");
      el.style.backgroundColor = "#FFFFFF";
      el.style.color = "#111113";
      el.style.borderColor = "#E4E3DE";
      el.classList.remove("always-dark");
    } else if (color === "grey") {
      el.style.setProperty("--bg-primary", "#EAEAEA");
      el.style.setProperty("--bg-secondary", "#F5F5F5");
      el.style.setProperty("--text-primary", "#1A1A1A");
      el.style.setProperty("--text-secondary", "#1A1A1Ab3");
      el.style.setProperty("--text-tertiary", "#1A1A1A80");
      el.style.setProperty("--border-default", "#D1D1D1");
      el.style.setProperty("--accent-cta", "#000000");
      el.style.backgroundColor = "#EAEAEA";
      el.style.color = "#1A1A1A";
      el.style.borderColor = "#D1D1D1";
      el.classList.remove("always-dark");
    } else if (color === "black") {
      el.style.setProperty("--bg-primary", "#000000");
      el.style.setProperty("--bg-secondary", "#0D0D0D");
      el.style.setProperty("--text-primary", "#FFFFFF");
      el.style.setProperty("--text-secondary", "#FFFFFFb3");
      el.style.setProperty("--text-tertiary", "#FFFFFF80");
      el.style.setProperty("--border-default", "#262626");
      el.style.setProperty("--accent-cta", "#FFFFFF");
      el.style.backgroundColor = "#000000";
      el.style.color = "#FFFFFF";
      el.style.borderColor = "#262626";
      el.classList.add("always-dark");
    }
  };

  const handleSectionColorChange = (sectionId: string, color: string) => {
    const nextColors = { ...sectionColors, [sectionId]: color };
    setSectionColors(nextColors);
    localStorage.setItem("customizer-section-colors", JSON.stringify(nextColors));
    applySectionColor(sectionId, color);
  };

  // Font states
  const [fontSizeScale, setFontSizeScale] = useState(1.0);
  const [selectedFontPreset, setSelectedFontPreset] = useState("current");

  // Update specific color values
  const applyColors = (colors: {
    bg: string;
    card: string;
    text: string;
    accent: string;
    border: string;
    isDark: boolean;
  }) => {
    const root = document.documentElement;

    root.style.setProperty("--bg-primary", colors.bg);
    root.style.setProperty("--bg-secondary", colors.card);
    root.style.setProperty("--bg-tertiary", colors.isDark ? "#1f1f23" : "#eceae4");
    root.style.setProperty("--text-primary", colors.text);

    // Dynamic opacities for text shade variables
    root.style.setProperty("--text-secondary", `${colors.text}b3`); // ~70% opacity
    root.style.setProperty("--text-tertiary", `${colors.text}80`);  // ~50% opacity

    root.style.setProperty("--border-default", colors.border);
    root.style.setProperty("--accent-cta", colors.accent);

    // SVG Illustration components
    root.style.setProperty("--svg-linen", colors.bg);
    root.style.setProperty("--svg-paper", colors.card);
    root.style.setProperty("--svg-ink", colors.text);
    root.style.setProperty("--svg-line", colors.border);
    root.style.setProperty("--svg-tint", colors.isDark ? "#1f1f23" : "#eceae4");
    root.style.setProperty("--svg-gray", `${colors.text}80`);

    if (colors.isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  // Font adjustments
  const applyFontSize = (scale: number) => {
    setFontSizeScale(scale);
    document.documentElement.style.fontSize = `${scale * 16}px`;
    localStorage.setItem("customizer-font-scale", scale.toString());
  };

  const applyFontPreset = (presetId: string) => {
    const preset = FONT_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    if (preset.fontUrl) {
      let linkElement = document.getElementById("customizer-font-link") as HTMLLinkElement;
      if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "customizer-font-link";
        linkElement.rel = "stylesheet";
        document.head.appendChild(linkElement);
      }
      linkElement.href = preset.fontUrl;
    }

    const root = document.documentElement;
    Object.entries(preset.variables).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });

    setSelectedFontPreset(presetId);
    localStorage.setItem("customizer-font-preset", presetId);
  };

  // Load configuration from localstorage on mount
  useEffect(() => {
    try {
      const savedPreset = localStorage.getItem("customizer-color-preset") ?? "current";
      const savedBg = localStorage.getItem("customizer-bg") ?? "#F7F7F4";
      const savedCard = localStorage.getItem("customizer-card") ?? "#FFFFFF";
      const savedText = localStorage.getItem("customizer-text") ?? "#111113";
      const savedAccent = localStorage.getItem("customizer-accent") ?? "#18181c";
      const savedBorder = localStorage.getItem("customizer-border") ?? "#e4e3de";
      const savedDark = localStorage.getItem("customizer-dark") === "true";

      const savedScale = parseFloat(localStorage.getItem("customizer-font-scale") ?? "1.0");
      const savedFont = localStorage.getItem("customizer-font-preset") ?? "current";

      setSelectedColorPreset(savedPreset);
      setCustomBg(savedBg);
      setCustomCard(savedCard);
      setCustomText(savedText);
      setCustomAccent(savedAccent);
      setCustomBorder(savedBorder);
      setIsDarkMode(savedDark);
      setFontSizeScale(savedScale);
      setSelectedFontPreset(savedFont);

      // Apply initial theme settings
      applyColors({
        bg: savedBg,
        card: savedCard,
        text: savedText,
        accent: savedAccent,
        border: savedBorder,
        isDark: savedDark,
      });

      applyFontSize(savedScale);
      applyFontPreset(savedFont);

      // Apply initial section background colors
      const savedSectionsStr = localStorage.getItem("customizer-section-colors");
      if (savedSectionsStr) {
        try {
          const savedSections = JSON.parse(savedSectionsStr);
          setSectionColors(savedSections);
          setTimeout(() => {
            Object.entries(savedSections).forEach(([sectId, colorVal]) => {
              applySectionColor(sectId, colorVal as string);
            });
          }, 100);
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.error("Customizer load settings error:", e);
    }
  }, []);

  const handleSelectPreset = (presetId: string) => {
    const preset = COLOR_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    setSelectedColorPreset(presetId);
    setCustomBg(preset.bg);
    setCustomCard(preset.card);
    setCustomText(preset.text);
    setCustomAccent(preset.accent);
    setCustomBorder(preset.border);
    setIsDarkMode(preset.isDark);

    applyColors({
      bg: preset.bg,
      card: preset.card,
      text: preset.text,
      accent: preset.accent,
      border: preset.border,
      isDark: preset.isDark,
    });

    localStorage.setItem("customizer-color-preset", presetId);
    localStorage.setItem("customizer-bg", preset.bg);
    localStorage.setItem("customizer-card", preset.card);
    localStorage.setItem("customizer-text", preset.text);
    localStorage.setItem("customizer-accent", preset.accent);
    localStorage.setItem("customizer-border", preset.border);
    localStorage.setItem("customizer-dark", preset.isDark ? "true" : "false");

    // Automatically set all sections to the selected color preset version
    const resetAllSections = (color: string) => {
      const nextColors = Object.keys(sectionColors).reduce((acc, key) => {
        acc[key] = color;
        return acc;
      }, {} as Record<string, string>);
      setSectionColors(nextColors);
      localStorage.setItem("customizer-section-colors", JSON.stringify(nextColors));
      Object.keys(nextColors).forEach((sectId) => applySectionColor(sectId, color));
    };

    if (presetId === "white-theme") resetAllSections("white");
    else if (presetId === "grey-theme") resetAllSections("grey");
    else if (presetId === "black-theme") resetAllSections("black");
    else resetAllSections("default");
  };

  const handleCustomColorChange = (key: string, value: string) => {
    setSelectedColorPreset("custom");
    localStorage.setItem("customizer-color-preset", "custom");

    let updatedBg = customBg;
    let updatedCard = customCard;
    let updatedText = customText;
    let updatedAccent = customAccent;
    let updatedBorder = customBorder;
    let updatedDark = isDarkMode;

    if (key === "bg") {
      setCustomBg(value);
      updatedBg = value;
      localStorage.setItem("customizer-bg", value);
    } else if (key === "card") {
      setCustomCard(value);
      updatedCard = value;
      localStorage.setItem("customizer-card", value);
    } else if (key === "text") {
      setCustomText(value);
      updatedText = value;
      localStorage.setItem("customizer-text", value);
    } else if (key === "accent") {
      setCustomAccent(value);
      updatedAccent = value;
      localStorage.setItem("customizer-accent", value);
    } else if (key === "border") {
      setCustomBorder(value);
      updatedBorder = value;
      localStorage.setItem("customizer-border", value);
    } else if (key === "dark") {
      const val = value === "true";
      setIsDarkMode(val);
      updatedDark = val;
      localStorage.setItem("customizer-dark", value);
    }

    applyColors({
      bg: updatedBg,
      card: updatedCard,
      text: updatedText,
      accent: updatedAccent,
      border: updatedBorder,
      isDark: updatedDark,
    });
  };


  const handleReset = () => {
    handleSelectPreset("current");
    applyFontSize(1.0);
    applyFontPreset("current");
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 hidden sm:flex items-center justify-center w-12 h-12 bg-ink text-paper border border-line rounded-none shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
        aria-label="Open style customizer"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.63-.77 1.63-1.7 0-.42-.16-.83-.44-1.14-.28-.31-.44-.72-.44-1.15 0-.93.77-1.69 1.7-1.69h2.83C20.1 16.32 22 14.36 22 12c0-5.5-4.5-10-10-10z" />
        </svg>
      </button>

      {/* Style Switcher Drawer */}
      <div
        className={`fixed top-0 right-0 w-[350px] z-50 bg-paper border-l border-line shadow-[0_0_50px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out select-none ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ height: '100vh' }}
      >
        {/* Header (Static) */}
        <div className="p-5 border-b border-line flex items-center justify-between" style={{ flexShrink: 0 }}>
          <div>
            <h2 className="font-mono text-[0.875rem] font-bold text-ink uppercase tracking-wider">
              Style Customizer
            </h2>
            <p className="text-[0.6875rem] font-mono text-ink-3 uppercase tracking-tight mt-0.5">
              Live Preview controls
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-ink-2 hover:text-ink hover:bg-tint transition-colors duration-200 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab switch buttons (Static) */}
        <div className="flex border-b border-line" style={{ flexShrink: 0 }}>
          <button
            onClick={() => setActiveTab("colors")}
            className={`flex-1 py-3 font-mono text-[0.75rem] uppercase tracking-wider text-center border-b-2 transition-all duration-200 cursor-pointer ${activeTab === "colors"
                ? "border-ink text-ink font-bold"
                : "border-transparent text-ink-3 hover:text-ink-2"
              }`}
          >
            Color Palette
          </button>
          <button
            onClick={() => setActiveTab("fonts")}
            className={`flex-1 py-3 font-mono text-[0.75rem] uppercase tracking-wider text-center border-b-2 transition-all duration-200 cursor-pointer ${activeTab === "fonts"
                ? "border-ink text-ink font-bold"
                : "border-transparent text-ink-3 hover:text-ink-2"
              }`}
          >
            Typography
          </button>
        </div>

        {/* Scrollable content container — scroll trapped inside panel */}
        <div
          className="p-5 space-y-6"
          style={{
            height: 'calc(100vh - 189px)',
            overflowY: 'scroll',
            overflowX: 'hidden',
            overscrollBehavior: 'contain',
          }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {activeTab === "colors" ? (
            <>
              {/* Group combinations */}
              <div className="space-y-3">
                <p className="text-[0.6875rem] font-mono text-ink-3 uppercase tracking-wider font-bold">
                  Color Preset Groups
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset.id)}
                      className={`w-full flex items-center gap-3.5 p-3.5 border text-left transition-all duration-200 cursor-pointer ${selectedColorPreset === preset.id
                          ? "border-ink bg-tint shadow-[3px_3px_0px_0px_var(--color-line)]"
                          : "border-line bg-paper hover:bg-tint/40"
                        }`}
                    >
                      {/* Swatch swatch */}
                      <div
                        className="w-8 h-8 border border-line flex items-center justify-center shrink-0"
                        style={{ backgroundColor: preset.bg }}
                      >
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: preset.accent }}
                        >
                          <span
                            className="text-[8px] font-mono font-bold"
                            style={{ color: preset.text }}
                          >
                            a
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-[0.72rem] font-bold text-ink uppercase tracking-wide">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color pickers */}
              <div className="space-y-4 border-t border-line/65 pt-5">
                <p className="text-[0.6875rem] font-mono text-ink-3 uppercase tracking-wider font-bold">
                  Customize Colors
                </p>

                <div className="space-y-3">
                  <ColorRow id="custom-bg" label="Page Background" value={customBg} onChange={(v) => handleCustomColorChange("bg", v)} />
                  <ColorRow id="custom-card" label="Card Background" value={customCard} onChange={(v) => handleCustomColorChange("card", v)} />
                  <ColorRow id="custom-text" label="Primary Text" value={customText} onChange={(v) => handleCustomColorChange("text", v)} />
                  <ColorRow id="custom-accent" label="Accent / CTA" value={customAccent} onChange={(v) => handleCustomColorChange("accent", v)} />
                  <ColorRow id="custom-border" label="Borders" value={customBorder} onChange={(v) => handleCustomColorChange("border", v)} />

                  {/* Dark Mode toggle */}
                  <div className="flex items-center justify-between pt-2">
                    <label htmlFor="custom-dark" className="font-mono text-[0.75rem] text-ink uppercase">Force Dark Mode</label>
                    <input
                      id="custom-dark"
                      type="checkbox"
                      checked={isDarkMode}
                      onChange={(e) => handleCustomColorChange("dark", e.target.checked ? "true" : "false")}
                      className="w-4 h-4 cursor-pointer accent-ink"
                    />
                  </div>
                </div>
              </div>

              {/* Individual Section Background Overrides */}
              <div className="space-y-4 border-t border-line/65 pt-5 pb-2">
                <p className="text-[0.6875rem] font-mono text-ink-3 uppercase tracking-wider font-bold">
                  Section Background Overrides
                </p>

                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
                  {Object.entries(sectionColors).map(([sectionId, currentColor]) => (
                    <div key={sectionId} className="flex flex-col gap-1.5 border border-line/50 p-2.5 bg-tint/5">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[0.6875rem] font-bold text-ink uppercase tracking-wide">
                          {sectionId.replace("-", " ")}
                        </span>
                        <span className="font-mono text-[0.58rem] text-ink-3 uppercase bg-tint px-1.5 py-0.5 border border-line/40">
                          {currentColor}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {["default", "white", "grey", "black"].map((colorOption) => (
                          <button
                            key={colorOption}
                            onClick={() => handleSectionColorChange(sectionId, colorOption)}
                            className={`py-1 text-[0.6rem] font-mono uppercase tracking-tight transition-all duration-200 border cursor-pointer ${
                              currentColor === colorOption
                                ? "border-ink bg-ink text-paper font-bold"
                                : "border-line bg-paper text-ink hover:bg-tint"
                            }`}
                          >
                            {colorOption}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Font Size multiplier section */}
              <div className="space-y-4">
                <p className="text-[0.6875rem] font-mono text-ink-3 uppercase tracking-wider font-bold">
                  Scale Font Size
                </p>

                {/* Quick size scale buttons */}
                <div className="grid grid-cols-4 gap-1.5">
                  {[1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.5, 3.0].map((scale) => (
                    <button
                      key={scale}
                      onClick={() => applyFontSize(scale)}
                      className={`py-1.5 border font-mono text-[0.68rem] tracking-tight uppercase cursor-pointer transition-all duration-200 text-center ${fontSizeScale === scale
                          ? "border-ink bg-ink text-paper font-bold"
                          : "border-line bg-paper text-ink hover:bg-tint"
                        }`}
                    >
                      {scale === 1.0 ? "1.0x" : `${scale}x`}
                    </button>
                  ))}
                </div>

                {/* Custom size inputs */}
                <div className="space-y-2 border border-line p-3 bg-tint/15">
                  <div className="flex justify-between items-center text-[0.6875rem] font-mono text-ink-2">
                    <span>CUSTOM SCALE:</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="1.0"
                        max="3.0"
                        step="0.05"
                        value={fontSizeScale}
                        onChange={(e) => applyFontSize(parseFloat(e.target.value) || 1.0)}
                        className="w-12 h-6 border border-line bg-paper text-center font-mono text-[0.75rem] text-ink p-0"
                      />
                      <span>x</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="3.0"
                    step="0.05"
                    value={fontSizeScale}
                    onChange={(e) => applyFontSize(parseFloat(e.target.value))}
                    className="w-full h-1 bg-line rounded-none appearance-none cursor-pointer accent-ink"
                  />
                </div>
              </div>

              {/* Font Selection preset */}
              <div className="space-y-3 border-t border-line/65 pt-5">
                <p className="text-[0.6875rem] font-mono text-ink-3 uppercase tracking-wider font-bold">
                  Select Typography
                </p>

                <div className="space-y-2">
                  {FONT_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyFontPreset(preset.id)}
                      className={`w-full p-3.5 border text-left transition-all duration-200 cursor-pointer flex flex-col gap-1.5 ${selectedFontPreset === preset.id
                          ? "border-ink bg-tint shadow-[3px_3px_0px_0px_var(--color-line)]"
                          : "border-line bg-paper hover:bg-tint/40"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[0.72rem] font-bold text-ink uppercase tracking-wide">
                          {preset.name}
                        </span>
                        {selectedFontPreset === preset.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-ink shrink-0" />
                        )}
                      </div>

                      <div className="flex gap-2 justify-between items-center border-t border-line/50 pt-1.5 text-[0.65rem] font-mono text-ink-3">
                        <span>Sans: {preset.sansName}</span>
                        <span>Mono: {preset.monoName}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer buttons (Static) */}
        <div className="p-5 border-t border-line flex gap-3" style={{ flexShrink: 0 }}>
          <button
            onClick={handleReset}
            className="flex-1 py-2.5 border border-line text-ink font-mono text-[0.75rem] uppercase tracking-wider hover:bg-tint transition-all duration-200 cursor-pointer text-center"
          >
            Reset Style
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 py-2.5 bg-ink text-paper font-mono text-[0.75rem] uppercase tracking-wider hover:bg-ink/90 transition-all duration-200 cursor-pointer text-center"
          >
            Close Panel
          </button>
        </div>
      </div>
    </>
  );
}
