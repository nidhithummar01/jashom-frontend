"use client";

/* Animated CAD-blueprint visuals for the Services section.
   Copied from the original Services.tsx so the Radix version matches the
   original layout without modifying the original (untouched) component. */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export function GaugeVisual() {
  const ref = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [hoverX, setHoverX] = useState<number | null>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(".scan-line", { x: 0 }, { x: 320, duration: 6, ease: "none", repeat: -1 }, 0);
      tl.fromTo(
        ".opt-coalesced-pulse",
        { y: 0, opacity: 0 },
        { y: 25, keyframes: { opacity: [0, 0.7, 0.7, 0] }, duration: 2.2, repeat: -1, stagger: 0.4, ease: "none" },
        0
      );
      tlRef.current = tl;
    }, svg);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svgEl = ref.current;
    if (!svgEl) return;
    const rect = svgEl.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 400;
    if (x >= 40 && x <= 360) setHoverX(x);
    else setHoverX(null);
  };
  const handleMouseEnter = () => { if (tlRef.current) gsap.to(tlRef.current, { timeScale: 1.4, duration: 0.6 }); };
  const handleMouseLeave = () => { setHoverX(null); if (tlRef.current) gsap.to(tlRef.current, { timeScale: 1, duration: 0.6 }); };
  const getWaveY = (x: number) => {
    const progress = (x - 40) / 320;
    if (progress < 0.25) return 130 - Math.sin(progress * Math.PI * 2) * 35;
    return 90 + Math.sin(progress * Math.PI * 6) * 8;
  };

  return (
    <svg ref={ref} viewBox="0 0 400 300" className="w-full h-auto cursor-crosshair select-none" fill="none" aria-hidden="true" onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <defs>
        <pattern id="opt-grid-g" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="var(--svg-line)" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>
      <rect x="20" y="20" width="360" height="260" fill="url(#opt-grid-g)" />
      <text x="30" y="38" fill="var(--svg-gray)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="500">SYS_REF: KERNEL_TUNER_01</text>
      <text x="370" y="38" textAnchor="end" fill="var(--svg-gray)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="500">TARGET: H100_SXM5</text>
      <text x="30" y="270" fill="var(--svg-gray)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="500">MODE: LATENCY_MINIMIZER</text>
      <text x="370" y="270" textAnchor="end" fill="var(--svg-gray)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="500">THR: +342% [PERF_BOOST]</text>
      <rect x="40" y="60" width="320" height="80" stroke="var(--svg-line)" strokeWidth="1" fill="var(--svg-linen)" />
      <line x1="120" y1="60" x2="120" y2="140" stroke="var(--svg-line)" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="200" y1="60" x2="200" y2="140" stroke="var(--svg-line)" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="280" y1="60" x2="280" y2="140" stroke="var(--svg-line)" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="40" y1="100" x2="360" y2="100" stroke="var(--svg-line)" strokeWidth="0.5" strokeDasharray="2 2" />
      <path d="M 40 130 L 80 125 L 120 132 L 160 120 L 200 135 L 240 125 L 280 132 L 320 120 L 360 135" stroke="var(--svg-gray)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
      <path d="M 40 130 C 80 100, 100 90, 120 90 S 160 115, 200 90 S 280 90, 360 90" stroke="var(--svg-ink)" strokeWidth="2.2" fill="none" />
      <text x="50" y="76" fill="var(--svg-gray)" fontSize="8.5" fontFamily="var(--font-mono)">BASELINE [SERIALIZED]</text>
      <text x="180" y="76" fill="var(--svg-ink)" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="bold">OPTIMIZED KERNEL [PIPELINED]</text>
      <line className="scan-line" x1="40" y1="60" x2="40" y2="140" stroke="var(--svg-ink)" strokeWidth="1.2" opacity="0.6" />
      {hoverX !== null && (
        <g>
          <line x1={hoverX} y1="60" x2={hoverX} y2="140" stroke="var(--svg-ink)" strokeWidth="1" strokeDasharray="3 2" opacity="0.75" />
          <circle cx={hoverX} cy={getWaveY(hoverX)} r="4" fill="var(--svg-ink)" stroke="var(--svg-linen)" strokeWidth="1" />
          <rect x={hoverX > 200 ? hoverX - 70 : hoverX + 10} y="68" width="60" height="15" fill="var(--svg-linen)" stroke="var(--svg-ink)" strokeWidth="0.8" />
          <text x={hoverX > 200 ? hoverX - 40 : hoverX + 40} y="78" fill="var(--svg-ink)" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">{(0.12 * hoverX).toFixed(1)} us</text>
        </g>
      )}
      <text x="40" y="162" fill="var(--svg-gray)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="bold">L2 CACHE / COALESCING SCHEMATIC</text>
      <rect x="40" y="175" width="130" height="20" stroke="var(--svg-line)" strokeWidth="1" fill="var(--svg-tint)" />
      <text x="45" y="188" fill="var(--svg-gray)" fontSize="8" fontFamily="var(--font-mono)">MISALIGNED ACCESS</text>
      <path d="M 50 195 L 60 220" stroke="var(--svg-gray)" strokeWidth="0.8" strokeDasharray="2 2" />
      <path d="M 80 195 L 120 220" stroke="var(--svg-gray)" strokeWidth="0.8" strokeDasharray="2 2" />
      <path d="M 110 195 L 70 220" stroke="var(--svg-gray)" strokeWidth="0.8" strokeDasharray="2 2" />
      <path d="M 140 195 L 150 220" stroke="var(--svg-gray)" strokeWidth="0.8" strokeDasharray="2 2" />
      <rect x="40" y="220" width="130" height="25" stroke="var(--svg-line)" strokeWidth="1" fill="var(--svg-paper)" />
      <text x="48" y="236" fill="var(--svg-gray)" fontSize="8" fontFamily="var(--font-mono)">4 MEMORY TRANSACTIONS</text>
      <rect x="230" y="175" width="130" height="20" stroke="var(--svg-ink)" strokeWidth="1.2" fill="var(--svg-tint)" />
      <text x="235" y="188" fill="var(--svg-ink)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="bold">COALESCED ACCESS</text>
      <line x1="250" y1="195" x2="250" y2="220" stroke="var(--svg-ink)" strokeWidth="1.2" />
      <line x1="270" y1="195" x2="270" y2="220" stroke="var(--svg-ink)" strokeWidth="1.2" />
      <line x1="290" y1="195" x2="290" y2="220" stroke="var(--svg-ink)" strokeWidth="1.2" />
      <line x1="310" y1="195" x2="310" y2="220" stroke="var(--svg-ink)" strokeWidth="1.2" />
      <circle className="opt-coalesced-pulse" cx="250" cy="195" r="2" fill="var(--svg-ink)" />
      <circle className="opt-coalesced-pulse" cx="270" cy="195" r="2" fill="var(--svg-ink)" />
      <circle className="opt-coalesced-pulse" cx="290" cy="195" r="2" fill="var(--svg-ink)" />
      <circle className="opt-coalesced-pulse" cx="310" cy="195" r="2" fill="var(--svg-ink)" />
      <rect x="230" y="220" width="130" height="25" stroke="var(--svg-ink)" strokeWidth="1.2" fill="var(--svg-paper)" />
      <text x="242" y="236" fill="var(--svg-ink)" fontSize="8" fontFamily="var(--font-mono)">1 COALESCED TRANSACTION</text>
    </svg>
  );
}

export function ParallelVisual() {
  const ref = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      gsap.set(".warp-cell", { opacity: 0.15 });
      gsap.set(".cuda-mem-pulse-1, .cuda-mem-pulse-2", { opacity: 0 });
      tl.to(".cuda-global-box", { strokeWidth: 2, duration: 0.6, ease: "power1.inOut" })
        .fromTo(".cuda-mem-pulse-1", { y: 0, opacity: 0 }, { y: 24, opacity: 1, duration: 1.6, ease: "power1.inOut" }, "-=0.2")
        .to(".cuda-mem-pulse-1", { opacity: 0, duration: 0.2 })
        .to(".cuda-global-box", { strokeWidth: 1, duration: 0.4 }, "-=0.2");
      tl.to(".cuda-shared-box", { fill: "var(--svg-tint)", strokeWidth: 2.2, duration: 0.6, ease: "power1.inOut" }, "-=0.4")
        .to(".warp-cell", { opacity: 0.95, duration: 0.8, stagger: { grid: [8, 8] as [number, number], from: "start" as const, each: 0.05 }, ease: "sine.out" }, "-=1.0")
        .to(".warp-cell", { opacity: 0.15, duration: 1.0, stagger: 0.03, ease: "sine.in" }, "+=0.3")
        .to(".cuda-shared-box", { fill: "var(--svg-linen)", strokeWidth: 1.2, duration: 0.6 }, "-=0.6");
      tl.fromTo(".cuda-mem-pulse-2", { y: 0, opacity: 0 }, { y: 24, opacity: 1, duration: 1.2, ease: "power1.inOut" }, "-=0.6")
        .to(".cuda-mem-pulse-2", { opacity: 0, duration: 0.2 })
        .to(".cuda-register-box", { strokeWidth: 2, duration: 0.4 }, "-=0.2")
        .to(".cuda-register-box", { strokeWidth: 1.2, duration: 0.4 });
      tl.to(".cuda-barrier-line", { strokeWidth: 2.5, strokeDasharray: "8 4", duration: 0.8, ease: "power1.inOut" }, "-=0.4")
        .to(".cuda-sync-box", { fill: "var(--svg-linen)", strokeWidth: 1.8, duration: 0.6, ease: "power1.inOut" })
        .to(".cuda-barrier-line", { strokeWidth: 1.2, strokeDasharray: "4 3", duration: 0.8, ease: "power1.inOut" })
        .to(".cuda-sync-box", { fill: "var(--svg-tint)", strokeWidth: 1, duration: 0.6 })
        .to({}, { duration: 1.2 });
      tlRef.current = tl;
    }, svg);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => { if (tlRef.current) gsap.to(tlRef.current, { timeScale: 1.4, duration: 0.6 }); };
  const handleMouseLeave = () => { if (tlRef.current) gsap.to(tlRef.current, { timeScale: 1, duration: 0.6 }); };
  const gridRows = Array.from({ length: 8 });
  const gridCols = Array.from({ length: 8 });

  return (
    <svg ref={ref} viewBox="0 0 400 300" className="w-full h-auto cursor-pointer select-none" fill="none" aria-hidden="true" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <defs>
        <pattern id="opt-grid-p" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="var(--svg-line)" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>
      <rect x="20" y="20" width="360" height="260" fill="url(#opt-grid-p)" />
      <text x="30" y="38" fill="var(--svg-gray)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="500">SYS_REF: CUDA_GRID_02</text>
      <text x="370" y="38" textAnchor="end" fill="var(--svg-gray)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="500">BLOCKS: [64, 64, 1]</text>
      <text x="30" y="274" fill="var(--svg-gray)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="500">SHARED_MEM: ACTIVE</text>
      <text x="370" y="274" textAnchor="end" fill="var(--svg-gray)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="500">THREADS: [1024, 1, 1]</text>
      <text x="40" y="60" fill="var(--svg-gray)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="bold">THREAD BLOCK EXECUTION GRID</text>
      <g>
        {gridRows.map((_, r) => {
          const isWarpRow = r === 1 || r === 3 || r === 5;
          return gridCols.map((_, c) => (
            <rect key={`${r}-${c}`} x={41 + c * 12} y={70 + r * 12} width="9" height="9" fill={isWarpRow ? "var(--svg-ink)" : "var(--svg-tint)"} stroke="var(--svg-line)" strokeWidth="0.8" opacity={isWarpRow ? 0.75 : 1} className={`${isWarpRow ? "warp-cell" : ""}`} />
          ));
        })}
      </g>
      <rect x="40" y="176" width="93" height="18" stroke="var(--svg-line)" strokeWidth="1" fill="var(--svg-paper)" />
      <text x="45" y="188" fill="var(--svg-gray)" fontSize="7" fontFamily="var(--font-mono)">32 THREAD WARPS</text>
      <text x="200" y="60" fill="var(--svg-gray)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="bold">MEMORY HIERARCHY / PIPELINE</text>
      <rect className="cuda-global-box" x="200" y="70" width="160" height="18" stroke="var(--svg-line)" strokeWidth="1" fill="var(--svg-tint)" />
      <text x="210" y="82" fill="var(--svg-gray)" fontSize="8.5" fontFamily="var(--font-mono)">GLOBAL MEMORY [HBM]</text>
      <line x1="280" y1="88" x2="280" y2="112" stroke="var(--svg-gray)" strokeWidth="1" strokeDasharray="3 3" />
      <circle className="cuda-mem-pulse-1" cx="280" cy="88" r="2" fill="var(--svg-gray)" />
      <rect className="cuda-shared-box" x="200" y="112" width="160" height="18" stroke="var(--svg-ink)" strokeWidth="1.2" fill="var(--svg-linen)" />
      <text x="210" y="124" fill="var(--svg-ink)" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="bold">SHARED MEMORY [SRAM]</text>
      <line x1="280" y1="130" x2="280" y2="154" stroke="var(--svg-ink)" strokeWidth="1" />
      <circle className="cuda-mem-pulse-2" cx="280" cy="130" r="2.5" fill="var(--svg-ink)" />
      <rect className="cuda-register-box" x="200" y="154" width="160" height="18" stroke="var(--svg-ink)" strokeWidth="1.2" fill="var(--svg-paper)" />
      <text x="210" y="166" fill="var(--svg-ink)" fontSize="8" fontFamily="var(--font-mono)">REGISTERS [THREAD_PRIVATE]</text>
      <line className="cuda-barrier-line" x1="40" y1="210" x2="360" y2="210" stroke="var(--svg-ink)" strokeWidth="1.2" strokeDasharray="4 3" />
      <text x="200" y="202" textAnchor="middle" fill="var(--svg-ink)" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="bold">SYNCHRONIZATION BARRIER [__syncthreads()]</text>
      <rect className="cuda-sync-box" x="140" y="222" width="120" height="18" stroke="var(--svg-ink)" strokeWidth="1" fill="var(--svg-tint)" />
      <text x="200" y="234" textAnchor="middle" fill="var(--svg-ink)" fontSize="8" fontFamily="var(--font-mono)">WARP_SYNC_OK</text>
    </svg>
  );
}
