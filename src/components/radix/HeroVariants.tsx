/* Three minimal hero illustrations for the Radix version.
   Each covers both core services: GPU Optimization + CUDA Development.
   Pure SVG + CSS animation (see .j-hero-* keyframes in radix-theme.css).
   Colors use --svg-* vars so they read on the dark hero band. */

const INK = "var(--svg-ink)";
const GRAY = "var(--svg-gray)";
const LINE = "var(--svg-line)";
const TINT = "var(--svg-tint)";
const MONO = "var(--font-mono)";

/* ---------- Variant 1 — BLUEPRINT ----------
   Minimal flat schematic: CUDA core chip → optimized bus → LLM. */
export function VariantBlueprint() {
  const cores = [0, 1, 2, 3].flatMap((r) => [0, 1, 2, 3].map((c) => ({ r, c })));
  return (
    <svg viewBox="0 0 520 360" fill="none" className="w-full h-auto" role="img" aria-label="GPU CUDA core chip feeding an optimized data bus into an LLM">
      <text x="20" y="28" fill={GRAY} fontSize="10" fontFamily={MONO} letterSpacing="1.5">GPU OPTIMIZATION // CUDA DEVELOPMENT</text>

      {/* Chip */}
      <rect x="40" y="80" width="200" height="200" rx="3" stroke={INK} strokeWidth="1.4" />
      <rect x="52" y="92" width="176" height="176" rx="2" stroke={LINE} strokeWidth="0.8" />
      <rect x="96" y="74" width="88" height="20" fill="var(--svg-linen)" stroke={INK} strokeWidth="1.2" />
      <text x="140" y="89" textAnchor="middle" fill={INK} fontSize="11" fontWeight="bold" fontFamily={MONO} letterSpacing="2">GPU</text>

      {/* Pins */}
      {[70, 110, 150, 190, 230].map((x) => (
        <g key={`pt${x}`}>
          <line x1={x} y1="64" x2={x} y2="80" stroke={INK} strokeWidth="1" />
          <line x1={x} y1="280" x2={x} y2="296" stroke={INK} strokeWidth="1" />
        </g>
      ))}

      {/* CUDA cores */}
      {cores.map(({ r, c }) => {
        const active = (r + c) % 2 === 0;
        return (
          <rect
            key={`${r}-${c}`}
            x={76 + c * 36} y={116 + r * 36} width="20" height="20" rx="2"
            stroke={INK} strokeWidth="0.9"
            fill={active ? INK : TINT}
            className={active ? "j-hero-blink" : undefined}
            style={{ animationDelay: `${(r + c) * 0.18}s`, transformOrigin: "center" }}
          />
        );
      })}
      <text x="140" y="305" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily={MONO} letterSpacing="1">CUDA CORES</text>

      {/* Bus */}
      <text x="340" y="120" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily={MONO} letterSpacing="1">OPTIMIZED PIPELINE</text>
      {[150, 180, 210].map((y, i) => (
        <g key={`bus${y}`}>
          <line x1="240" y1={y} x2="360" y2={y} stroke={INK} strokeWidth="1.4" />
          <circle cx="240" cy={y} r="3" fill={INK} className="j-hero-flow" style={{ animationDelay: `${i * 0.6}s` }} />
        </g>
      ))}

      {/* LLM */}
      <rect x="360" y="100" width="120" height="160" rx="3" stroke={INK} strokeWidth="1.4" fill="var(--svg-paper)" />
      <text x="420" y="186" textAnchor="middle" fill={INK} fontSize="22" fontWeight="bold" fontFamily={MONO} letterSpacing="1">LLM</text>
      <line x1="376" y1="124" x2="430" y2="124" stroke={LINE} strokeWidth="1.2" />
      <line x1="376" y1="132" x2="414" y2="132" stroke={LINE} strokeWidth="1.2" />
      <line x1="410" y1="232" x2="464" y2="232" stroke={LINE} strokeWidth="1.2" />

      <text x="500" y="340" textAnchor="end" fill={GRAY} fontSize="9" fontFamily={MONO}>RATE: 144 GB/S</text>
    </svg>
  );
}

/* ---------- Variant 2 — THROUGHPUT ----------
   Top: GPU Optimization latency profile. Bottom: CUDA parallel kernels. */
export function VariantThroughput() {
  return (
    <svg viewBox="0 0 520 360" fill="none" className="w-full h-auto" role="img" aria-label="GPU optimization latency curve and CUDA parallel kernel lanes">
      {/* GPU OPTIMIZATION panel */}
      <text x="20" y="28" fill={GRAY} fontSize="10" fontFamily={MONO} letterSpacing="1.5">GPU OPTIMIZATION</text>
      <rect x="20" y="40" width="480" height="120" rx="3" stroke={LINE} strokeWidth="1" />
      <line x1="20" y1="100" x2="500" y2="100" stroke={LINE} strokeWidth="0.6" strokeDasharray="2 3" />
      {/* baseline (slow) */}
      <path d="M30 140 L110 132 L190 138 L270 128 L350 140 L430 130 L490 138" stroke={GRAY} strokeWidth="1" strokeDasharray="3 3" fill="none" />
      <text x="34" y="60" fill={GRAY} fontSize="8.5" fontFamily={MONO}>BASELINE</text>
      {/* optimized */}
      <path d="M30 140 C 110 70, 150 64, 230 64 S 410 64, 490 62" stroke={INK} strokeWidth="2.2" fill="none" />
      <text x="300" y="58" fill={INK} fontSize="8.5" fontWeight="bold" fontFamily={MONO}>OPTIMIZED +342%</text>
      {/* scan head */}
      <line x1="30" y1="44" x2="30" y2="156" stroke={INK} strokeWidth="1.2" opacity="0.55" className="j-hero-scan" />

      {/* CUDA DEVELOPMENT panel */}
      <text x="20" y="200" fill={GRAY} fontSize="10" fontFamily={MONO} letterSpacing="1.5">CUDA DEVELOPMENT</text>
      <rect x="20" y="212" width="480" height="120" rx="3" stroke={LINE} strokeWidth="1" />
      {[232, 258, 284, 310].map((y, i) => (
        <g key={`lane${y}`}>
          <line x1="40" y1={y} x2="480" y2={y} stroke={LINE} strokeWidth="0.8" />
          <rect x="40" y={y - 5} width="40" height="10" fill={TINT} stroke={INK} strokeWidth="0.8" />
          <circle cx="80" cy={y} r="3.5" fill={INK} className="j-hero-lane" style={{ animationDelay: `${i * 0.5}s` }} />
        </g>
      ))}
      <text x="480" y="226" textAnchor="end" fill={GRAY} fontSize="8.5" fontFamily={MONO}>PARALLEL KERNELS // 32 WARPS</text>
    </svg>
  );
}

/* ---------- Variant 3 — CORES & GAIN ----------
   Left: CUDA core lattice. Right: GPU optimization step-gain bars. */
export function VariantCores() {
  const grid = [0, 1, 2, 3, 4, 5].flatMap((r) => [0, 1, 2, 3, 4, 5].map((c) => ({ r, c })));
  const bars = [38, 64, 96, 134, 178];
  return (
    <svg viewBox="0 0 520 360" fill="none" className="w-full h-auto" role="img" aria-label="CUDA core lattice and GPU optimization performance gain bars">
      {/* CUDA lattice */}
      <text x="40" y="60" fill={GRAY} fontSize="10" fontFamily={MONO} letterSpacing="1.5">CUDA DEVELOPMENT</text>
      {grid.map(({ r, c }) => {
        const active = (r * 7 + c) % 3 === 0;
        return (
          <rect
            key={`${r}-${c}`}
            x={40 + c * 28} y={80 + r * 28} width="18" height="18" rx="2"
            stroke={INK} strokeWidth="0.9" fill={active ? INK : "none"}
            className={active ? "j-hero-blink" : undefined}
            style={{ animationDelay: `${(r + c) * 0.14}s`, transformOrigin: "center" }}
          />
        );
      })}
      <text x="40" y="276" fill={GRAY} fontSize="9" fontFamily={MONO}>1024 THREADS / BLOCK</text>

      {/* divider */}
      <line x1="260" y1="70" x2="260" y2="276" stroke={LINE} strokeWidth="0.8" strokeDasharray="3 3" />

      {/* GPU optimization gain bars */}
      <text x="300" y="60" fill={GRAY} fontSize="10" fontFamily={MONO} letterSpacing="1.5">GPU OPTIMIZATION</text>
      <line x1="300" y1="240" x2="490" y2="240" stroke={INK} strokeWidth="1.2" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={300 + i * 40} y={240 - h} width="26" height={h}
          fill={i === bars.length - 1 ? INK : TINT} stroke={INK} strokeWidth="1"
          className="j-hero-rise" style={{ animationDelay: `${i * 0.12}s`, transformOrigin: "bottom" }}
        />
      ))}
      <path d="M306 200 L470 70" stroke={INK} strokeWidth="1.2" strokeDasharray="4 3" />
      <text x="430" y="64" fill={INK} fontSize="9" fontWeight="bold" fontFamily={MONO}>10X</text>
      <text x="300" y="262" fill={GRAY} fontSize="9" fontFamily={MONO}>THROUGHPUT GAIN</text>
    </svg>
  );
}

export const HERO_VARIANTS = [
  { id: "blueprint", label: "Blueprint", Component: VariantBlueprint },
  { id: "throughput", label: "Throughput", Component: VariantThroughput },
  { id: "cores", label: "Cores & Gain", Component: VariantCores },
] as const;

export type HeroVariantId = (typeof HERO_VARIANTS)[number]["id"];
