/* CUDA Development Overview SVG — parallel thread execution throughput chart.
   Minimal line-art; uses CSS token colors so it works in both light and dark mode. */
export default function CudaOverviewSvg() {
  return (
    <svg
      viewBox="0 0 380 220"
      className="w-full h-auto"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Axes */}
      <line x1="48" y1="20" x2="48" y2="178" stroke="var(--color-line)" strokeWidth="1.2" />
      <line x1="48" y1="178" x2="360" y2="178" stroke="var(--color-line)" strokeWidth="1.2" />

      {/* Y-axis label */}
      <text x="12" y="100" fill="var(--color-ink-3)" fontSize="9"
        fontFamily="var(--font-mono)" letterSpacing="1"
        transform="rotate(-90, 12, 100)">THROUGHPUT</text>

      {/* X grid lines */}
      {[148, 118, 88, 58].map((y) => (
        <line key={y} x1="48" y1={y} x2="360" y2={y}
          stroke="var(--color-line)" strokeWidth="0.6" strokeDasharray="3 4" />
      ))}

      {/* X-axis labels */}
      {[
        { x: 80,  label: "CPU" },
        { x: 170, label: "CPU+GPU" },
        { x: 270, label: "CUDA Opt" },
        { x: 340, label: "Jashom" },
      ].map(({ x, label }) => (
        <text key={label} x={x} y="192" textAnchor="middle"
          fill="var(--color-ink-3)" fontSize="8" fontFamily="var(--font-mono)">{label}</text>
      ))}

      {/* Bars */}
      <rect x="60"  y="148" width="40" height="30" fill="var(--color-line)" fillOpacity="0.4"
        stroke="var(--color-line)" strokeWidth="1" />
      <rect x="150" y="118" width="40" height="60" fill="var(--color-ink-2)" fillOpacity="0.25"
        stroke="var(--color-ink-2)" strokeWidth="1" />
      <rect x="250" y="78"  width="40" height="100" fill="var(--color-ink)" fillOpacity="0.15"
        stroke="var(--color-ink)" strokeWidth="1.5" />
      <rect x="320" y="38"  width="32" height="140" fill="var(--color-ink)" fillOpacity="0.3"
        stroke="var(--color-ink)" strokeWidth="2" />

      {/* Bar value labels */}
      <text x="80"  y="144" textAnchor="middle" fill="var(--color-ink-3)" fontSize="9" fontFamily="var(--font-mono)">1×</text>
      <text x="170" y="114" textAnchor="middle" fill="var(--color-ink-2)" fontSize="9" fontFamily="var(--font-mono)">3×</text>
      <text x="270" y="74"  textAnchor="middle" fill="var(--color-ink)" fontSize="9" fontFamily="var(--font-mono)">12×</text>
      <text x="336" y="34"  textAnchor="middle" fill="var(--color-ink)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="bold">100×</text>

      {/* Arrow on Jashom bar */}
      <path d="M336 20 L332 28 L340 28 Z" fill="var(--color-ink)" />

      {/* Annotation line */}
      <line x1="336" y1="28" x2="336" y2="38" stroke="var(--color-ink)" strokeWidth="1.5" />

      {/* Legend */}
      <text x="56" y="212" fill="var(--color-ink-3)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1">COMPUTE THROUGHPUT / RELATIVE SCALE</text>
    </svg>
  );
}
