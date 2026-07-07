/* About Us hero — company milestones & GPU compute stats timeline.
   Minimal line-art on the always-dark hero; ink accent. */
export default function AboutHeroSvg() {
  const ink = "var(--svg-ink)";
  const line = "var(--svg-line)";
  const accent = "#a3e635"; // lime green

  const milestones = [
    { y: 90,  stat: "20+",   label: "Industries" },
    { y: 160, stat: "50k+",  label: "GPU Hours" },
    { y: 230, stat: "6 wk",  label: "Avg Cycle" },
    { y: 300, stat: "98%",   label: "Retention" },
  ];

  return (
    <svg viewBox="0 0 480 360" className="w-full h-auto" fill="none" aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">

      {/* Vertical timeline spine */}
      <line x1="160" y1="60" x2="160" y2="340" stroke={line} strokeWidth="1.5" />

      {/* Milestones */}
      {milestones.map(({ y, stat, label }, i) => (
        <g key={y}>
          {/* connector dot */}
          <circle cx="160" cy={y} r="6" fill={i % 2 === 0 ? accent : "none"}
            stroke={i % 2 === 0 ? accent : ink} strokeWidth="1.8"
            fillOpacity={i % 2 === 0 ? 0.85 : 0} />
          {/* horizontal line to card */}
          <line x1="166" y1={y} x2="200" y2={y} stroke={i % 2 === 0 ? accent : line} strokeWidth="1" />
          {/* stat card */}
          <rect x="200" y={y - 28} width="200" height="52"
            stroke={i % 2 === 0 ? accent : line} strokeWidth={i % 2 === 0 ? 1.5 : 1}
            fill={i % 2 === 0 ? accent : "none"} fillOpacity={i % 2 === 0 ? 0.06 : 0} />
          <text x="214" y={y - 6} fill={i % 2 === 0 ? accent : ink}
            fontSize="22" fontFamily="var(--font-mono)" fontWeight="bold">{stat}</text>
          <text x="214" y={y + 14} fill={line}
            fontSize="9" fontFamily="var(--font-mono)" letterSpacing="2">{label.toUpperCase()}</text>
          {/* left-side year marker */}
          <text x="148" y={y + 4} textAnchor="end" fill={line}
            fontSize="9" fontFamily="var(--font-mono)" opacity="0.5">0{i + 1}</text>
        </g>
      ))}

      {/* Jashom wordmark top */}
      <text x="40" y="52" fill={ink} fontSize="13" fontFamily="var(--font-mono)" letterSpacing="4" fontWeight="bold">JASHOM</text>
      <line x1="40" y1="56" x2="148" y2="56" stroke={accent} strokeWidth="2" />

      {/* bottom note */}
      <text x="40" y="350" fill={line} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.55">GPU ENGINEERING · CUDA · HPC</text>
    </svg>
  );
}
