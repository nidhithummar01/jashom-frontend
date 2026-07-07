/* Contact page hero — communication topology: office pin, signal waves, global nodes.
   Minimal line-art on the always-dark hero; ink accent. */
export default function ContactHeroSvg() {
  const ink = "var(--svg-ink)";
  const line = "var(--svg-line)";
  const accent = "#34d399"; // emerald

  return (
    <svg viewBox="0 0 480 360" className="w-full h-auto" fill="none" aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">

      {/* Signal rings from India HQ */}
      {[40, 72, 108].map((r) => (
        <circle key={r} cx="240" cy="190" r={r}
          stroke={accent} strokeWidth={r === 40 ? 1.5 : 0.8}
          opacity={r === 40 ? 0.6 : r === 72 ? 0.35 : 0.18} />
      ))}

      {/* HQ pin */}
      <circle cx="240" cy="190" r="10" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="2" />
      <circle cx="240" cy="190" r="4" fill={accent} />
      <text x="252" y="188" fill={accent} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1">HQ — ADALAJ, GUJARAT</text>

      {/* Remote nodes */}
      {[
        { cx: 80,  cy: 100, label: "USA" },
        { cx: 400, cy: 80,  label: "EU" },
        { cx: 420, cy: 240, label: "APAC" },
        { cx: 60,  cy: 280, label: "MENA" },
      ].map(({ cx, cy, label }) => (
        <g key={label}>
          <line x1={cx} y1={cy} x2="240" y2="190" stroke={line} strokeWidth="0.8" strokeDasharray="5 4" />
          <circle cx={cx} cy={cy} r="6" stroke={ink} strokeWidth="1.5" />
          <text x={cx + 10} y={cy + 4} fill={line} fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1">{label}</text>
        </g>
      ))}

      {/* Contact info block */}
      <rect x="130" y="50" width="220" height="96" stroke={ink} strokeWidth="1.5" />
      <text x="145" y="72" fill={ink} fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1">GET IN TOUCH</text>
      <line x1="130" y1="80" x2="350" y2="80" stroke={line} strokeWidth="0.8" />
      <text x="145" y="100" fill={line} fontSize="9" fontFamily="var(--font-mono)">info@jashom.com</text>
      <text x="145" y="118" fill={line} fontSize="9" fontFamily="var(--font-mono)">+91 90239 06363</text>
      <text x="145" y="136" fill={accent} fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1">RESPONDS WITHIN 24H</text>

      {/* bottom label */}
      <text x="40" y="350" fill={line} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.55">JASHOM · WORLDWIDE GPU ENGINEERING</text>
    </svg>
  );
}
