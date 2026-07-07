/* CUDA Development hero — parallel computing: layered thread-block grids and
   interconnected nodes. Minimalist line-art on the always-dark hero; teal accent. */
export default function CudaHeroSvg() {
  const ink = "var(--svg-ink)";
  const line = "var(--svg-line)";
  const accent = "#2dd4bf"; // teal / electric accent

  const cells = [0, 1, 2, 3];

  return (
    <svg viewBox="0 0 480 360" className="w-full h-auto" fill="none" aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
      {/* layered (parallel) thread-block grids — back two, offset */}
      <g stroke={line} strokeWidth="1.2" opacity="0.45">
        <rect x="96" y="66" width="132" height="132" />
        <rect x="78" y="84" width="132" height="132" />
      </g>

      {/* front thread block — 4×4 cells */}
      <rect x="60" y="102" width="132" height="132" stroke={ink} strokeWidth="2" />
      <g>
        {cells.map((r) =>
          cells.map((c) => {
            const on = (r + c) % 3 === 0;
            return (
              <rect key={`${r}-${c}`} x={68 + c * 30} y={110 + r * 30} width="22" height="22"
                stroke={on ? accent : line} strokeWidth={on ? 1.8 : 1}
                fill={on ? accent : "none"} fillOpacity={on ? 0.14 : 0} />
            );
          })
        )}
      </g>
      <text x="60" y="92" fill={line} fontSize="11" fontFamily="var(--font-mono)" letterSpacing="1">THREAD BLOCK [4×4]</text>

      {/* interconnect to nodes */}
      <g stroke={accent} strokeWidth="1.5" opacity="0.8">
        <path d="M192 140 L300 120" />
        <path d="M192 168 L300 176" />
        <path d="M192 196 L300 232" />
      </g>
      <g stroke={line} strokeWidth="1" opacity="0.5">
        <path d="M300 120 L360 96" />
        <path d="M300 176 L360 176" />
        <path d="M300 232 L360 256" />
        <path d="M360 96 L408 136" />
        <path d="M360 176 L408 136" />
        <path d="M360 256 L408 216" />
      </g>

      {/* nodes */}
      <g>
        {[[300, 120], [300, 176], [300, 232]].map(([x, y]) => (
          <circle key={`a${x}${y}`} cx={x} cy={y} r="6" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.8" />
        ))}
        {[[360, 96], [360, 176], [360, 256], [408, 136], [408, 216]].map(([x, y]) => (
          <circle key={`b${x}${y}`} cx={x} cy={y} r="5" stroke={ink} strokeWidth="1.5" fill="none" />
        ))}
      </g>

      <text x="300" y="290" fill={line} fontSize="10" fontFamily="var(--font-mono)">WARPS · SHARED MEM · SYNC</text>
      <text x="300" y="84" fill={accent} fontSize="11" fontFamily="var(--font-mono)" letterSpacing="1">PARALLEL EXEC</text>
    </svg>
  );
}
