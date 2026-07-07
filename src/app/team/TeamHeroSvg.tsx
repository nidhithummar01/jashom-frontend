/* Team page hero — org chart / engineer node graph.
   Minimal line-art on always-dark hero; teal accent. */
export default function TeamHeroSvg() {
  const ink = "var(--svg-ink)";
  const line = "var(--svg-line)";
  const accent = "#2dd4bf"; // teal

  const members = [
    { x: 110, y: 168, label: "CEO", init: "AD" },
    { x: 240, y: 120, label: "CUDA", init: "NP" },
    { x: 240, y: 216, label: "ARCH", init: "PS" },
    { x: 355, y: 96,  label: "ML", init: "RM" },
    { x: 355, y: 168, label: "RUST", init: "AV" },
    { x: 355, y: 240, label: "AI", init: "KI" },
  ];

  const edges = [
    [0, 1], [0, 2],
    [1, 3], [1, 4],
    [2, 4], [2, 5],
  ];

  return (
    <svg viewBox="0 0 480 340" className="w-full h-auto" fill="none" aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">

      {/* Edge lines */}
      {edges.map(([a, b], i) => {
        const from = members[a];
        const to = members[b];
        return (
          <line key={i}
            x1={from.x + 24} y1={from.y}
            x2={to.x - 24} y2={to.y}
            stroke={line} strokeWidth="1" strokeDasharray="4 3" />
        );
      })}

      {/* Nodes */}
      {members.map(({ x, y, label, init }, i) => (
        <g key={init}>
          {/* Outer ring for CEO */}
          {i === 0 && (
            <rect x={x - 32} y={y - 32} width="64" height="64"
              stroke={accent} strokeWidth="1.2" fill="none" opacity="0.3" />
          )}
          {/* Node box */}
          <rect x={x - 24} y={y - 24} width="48" height="48"
            stroke={i === 0 ? accent : ink} strokeWidth={i === 0 ? 2 : 1.5}
            fill={i === 0 ? accent : "none"} fillOpacity={i === 0 ? 0.12 : 0} />
          {/* Initials */}
          <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle"
            fill={i === 0 ? accent : ink}
            fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">
            {init}
          </text>
          {/* Role label */}
          <text x={x} y={y + 36} textAnchor="middle"
            fill={line} fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1">
            {label}
          </text>
        </g>
      ))}

      {/* Header */}
      <text x="40" y="44" fill={ink} fontSize="10" fontFamily="var(--font-mono)" letterSpacing="3" fontWeight="bold">JASHOM ENGINEERING TEAM</text>
      <line x1="40" y1="50" x2="200" y2="50" stroke={accent} strokeWidth="2" />

      {/* Footer */}
      <text x="40" y="318" fill={line} fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.55">GPU ENGINEERS · CUDA SPECIALISTS · SYSTEMS ARCHITECTS</text>
    </svg>
  );
}
