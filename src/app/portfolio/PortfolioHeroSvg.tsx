/* Portfolio hero — 4 case study cards arranged in a 2×2 grid with key stats.
   Minimal line-art on the always-dark hero; ink accent. */
export default function PortfolioHeroSvg() {
  const ink = "var(--svg-ink)";
  const line = "var(--svg-line)";
  const accent = "#818cf8"; // indigo

  const cases = [
    { x: 40,  y: 60,  tag: "01 · LLM INFERENCE",    stat: "42%", sub: "Throughput ↑" },
    { x: 246, y: 60,  tag: "02 · WORKLOAD ORCH.",    stat: "5d",  sub: "Demo-ready" },
    { x: 40,  y: 204, tag: "03 · CLOUD FINE-TUNE",   stat: "70B", sub: "Model scale" },
    { x: 246, y: 204, tag: "04 · BMC TELEMETRY",     stat: "30s", sub: "Refresh rate" },
  ];

  return (
    <svg viewBox="0 0 480 360" className="w-full h-auto" fill="none" aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">

      {/* Divider lines */}
      <line x1="243" y1="50" x2="243" y2="350" stroke={line} strokeWidth="1" />
      <line x1="30"  y1="197" x2="450" y2="197" stroke={line} strokeWidth="1" />

      {/* Case study cards */}
      {cases.map(({ x, y, tag, stat, sub }, i) => (
        <g key={tag}>
          <rect x={x} y={y} width="196" height="128"
            stroke={i === 0 ? accent : line} strokeWidth={i === 0 ? 1.8 : 1.2} />
          <text x={x + 10} y={y + 18} fill={line} fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1">{tag}</text>
          <line x1={x} y1={y + 24} x2={x + 196} y2={y + 24} stroke={line} strokeWidth="0.8" />
          <text x={x + 10} y={y + 70} fill={i === 0 ? accent : ink}
            fontSize="32" fontFamily="var(--font-mono)" fontWeight="bold">{stat}</text>
          <text x={x + 10} y={y + 92} fill={line} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1">{sub.toUpperCase()}</text>
          {/* mini bar at bottom */}
          <rect x={x} y={y + 110} width={40 + i * 30} height="4" fill={i === 0 ? accent : line} fillOpacity="0.5" />
          <rect x={x} y={y + 110} width={196} height="4" fill="none" stroke={line} strokeWidth="0.8" />
        </g>
      ))}

      {/* corner label */}
      <text x="30" y="348" fill={line} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.55">PORTFOLIO · APPLIED GPU ENGINEERING</text>
    </svg>
  );
}
