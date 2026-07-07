/* Hire CUDA Developer hero — developer profile + kernel call stack.
   Minimal line-art on the always-dark hero; cyan accent. */
export default function HireCudaHeroSvg() {
  const ink = "var(--svg-ink)";
  const line = "var(--svg-line)";
  const accent = "#38bdf8"; // cyan

  return (
    <svg viewBox="0 0 480 360" className="w-full h-auto" fill="none" aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">

      {/* Developer silhouette / avatar card */}
      <rect x="40" y="60" width="140" height="220" stroke={ink} strokeWidth="2" rx="2" />
      {/* avatar circle */}
      <circle cx="110" cy="120" r="28" stroke={ink} strokeWidth="1.8" />
      {/* shoulders */}
      <path d="M68 200 Q110 178 152 200 L152 280 L68 280 Z" stroke={ink} strokeWidth="1.5" fill="none" opacity="0.5" />
      {/* name lines */}
      <line x1="72" y1="222" x2="148" y2="222" stroke={accent} strokeWidth="2.5" />
      <line x1="82" y1="234" x2="138" y2="234" stroke={line} strokeWidth="1.2" />
      <line x1="86" y1="246" x2="134" y2="246" stroke={line} strokeWidth="1.2" />
      {/* role badge */}
      <rect x="68" y="258" width="84" height="16" stroke={accent} strokeWidth="1.2" fill={accent} fillOpacity="0.1" />
      <text x="110" y="269" textAnchor="middle" fill={accent} fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1">CUDA ENGINEER</text>

      {/* connector to kernel block */}
      <line x1="180" y1="168" x2="222" y2="168" stroke={line} strokeWidth="1" strokeDasharray="4 3" />
      <line x1="180" y1="200" x2="222" y2="200" stroke={line} strokeWidth="1" strokeDasharray="4 3" />
      <line x1="180" y1="232" x2="222" y2="232" stroke={line} strokeWidth="1" strokeDasharray="4 3" />

      {/* CUDA Kernel stack */}
      <rect x="222" y="60" width="196" height="260" stroke={ink} strokeWidth="1.8" />
      <text x="320" y="82" textAnchor="middle" fill={line} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="2">KERNEL CALL STACK</text>
      <line x1="222" y1="90" x2="418" y2="90" stroke={line} strokeWidth="1" />

      {/* Kernel rows */}
      {[
        { y: 110, label: "__global__ matMul()", accent: true },
        { y: 140, label: "__shared__ float tile[]", accent: false },
        { y: 170, label: "threadIdx.x + blockIdx", accent: true },
        { y: 200, label: "__syncthreads()", accent: false },
        { y: 230, label: "atomicAdd(&out, val)", accent: false },
        { y: 260, label: "cudaMemcpyAsync()", accent: true },
        { y: 290, label: "cudaDeviceSynchronize()", accent: false },
      ].map(({ y, label, accent: isAccent }) => (
        <g key={y}>
          <rect x="232" y={y - 10} width="8" height="8"
            fill={isAccent ? accent : "none"} stroke={isAccent ? accent : line}
            strokeWidth="1" fillOpacity={isAccent ? 0.8 : 0} />
          <text x="248" y={y - 2} fill={isAccent ? accent : line}
            fontSize="9" fontFamily="var(--font-mono)">{label}</text>
        </g>
      ))}

      {/* corner label */}
      <text x="222" y="338" fill={line} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.6">GPU // PARALLEL EXECUTION ENGINE</text>
    </svg>
  );
}
