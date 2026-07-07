/* GPU Optimization hero — stylized GPU chip with performance indicators.
   Minimalist line-art on the always-dark hero; cyan accent. */
export default function GpuHeroSvg() {
  const ink = "var(--svg-ink)";
  const line = "var(--svg-line)";
  const accent = "#38bdf8"; // cyan / neon-blue accent

  return (
    <svg viewBox="0 0 480 360" className="w-full h-auto" fill="none" aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
      {/* pins */}
      <g stroke={line} strokeWidth="2">
        {[110, 150, 190, 230, 270, 310].map((x) => (
          <line key={`t${x}`} x1={x} y1="62" x2={x} y2="84" />
        ))}
        {[110, 150, 190, 230, 270, 310].map((x) => (
          <line key={`b${x}`} x1={x} y1="276" x2={x} y2="298" />
        ))}
        {[120, 160, 200, 240].map((y) => (
          <line key={`l${y}`} x1="78" y1={y} x2="100" y2={y} />
        ))}
        {[120, 160, 200, 240].map((y) => (
          <line key={`r${y}`} x1="320" y1={y} x2="342" y2={y} />
        ))}
      </g>

      {/* chip body */}
      <rect x="100" y="84" width="220" height="192" rx="6" stroke={ink} strokeWidth="2.5" />
      {/* die */}
      <rect x="128" y="112" width="164" height="136" stroke={line} strokeWidth="1.5" />
      {/* die grid */}
      <g stroke={line} strokeWidth="0.8" opacity="0.55">
        {[160, 192, 224, 256].map((x) => (<line key={`gx${x}`} x1={x} y1="112" x2={x} y2="248" />))}
        {[146, 180, 214].map((y) => (<line key={`gy${y}`} x1="128" y1={y} x2="292" y2={y} />))}
      </g>

      {/* lightning bolt — performance accent */}
      <path d="M214 120 L176 188 L204 188 L196 244 L246 168 L214 168 Z"
        fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="2.5" />

      {/* speed bars */}
      <g>
        <rect x="356" y="232" width="20" height="44" stroke={ink} strokeWidth="1.5" />
        <rect x="384" y="200" width="20" height="76" stroke={ink} strokeWidth="1.5" />
        <rect x="412" y="160" width="20" height="116" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="2" />
      </g>

      {/* labels */}
      <text x="100" y="50" fill={line} fontSize="12" fontFamily="var(--font-mono)" letterSpacing="2">GPU // OPTIMIZED</text>
      <text x="356" y="150" fill={accent} fontSize="12" fontFamily="var(--font-mono)" letterSpacing="1">THROUGHPUT ↑</text>
      <text x="128" y="270" fill={line} fontSize="10" fontFamily="var(--font-mono)">CORES · MEMORY · KERNELS</text>
    </svg>
  );
}
