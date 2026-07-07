"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroIllustration() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Entrance animation: GPU slide from left, LLM slide from right
      gsap.from(".schematic-gpu", {
        x: -40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".schematic-llm", {
        x: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.4,
      });

      // Draw connection lines on load
      gsap.from(".schematic-line", {
        strokeDasharray: "200",
        strokeDashoffset: "200",
        duration: 1.2,
        ease: "power2.inOut",
        delay: 0.7,
      });

      // Pop staggered dots on the lines
      gsap.from(".schematic-dot", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.8)",
        delay: 1.3,
      });

      // Stagger fade-in for CUDA cores starting from center
      gsap.from(".cuda-core", {
        scale: 0.4,
        opacity: 0,
        duration: 0.7,
        stagger: {
          each: 0.03,
          grid: [5, 5],
          from: "center",
        },
        ease: "power2.out",
        delay: 0.6,
      });

      // Continuous data packet pulses sliding from GPU to LLM
      gsap.to(".signal-pulse-0", {
        attr: { cx: 640 },
        duration: 2.4,
        repeat: -1,
        ease: "none",
        delay: 1.2,
      });
      gsap.to(".signal-pulse-1", {
        attr: { cx: 640 },
        duration: 2.4,
        repeat: -1,
        ease: "none",
        delay: 2.0,
      });
      gsap.to(".signal-pulse-2", {
        attr: { cx: 640 },
        duration: 2.4,
        repeat: -1,
        ease: "none",
        delay: 1.6,
      });

      // Active CUDA cores pulse in a subtle organic rhythm
      gsap.to(".cuda-core-active", {
        opacity: 0.35,
        duration: 1.1,
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.15,
          from: "random",
        },
        ease: "sine.inOut",
      });
    }, svg);

    return () => ctx.revert();
  }, []);

  // CUDA lattice definition
  const columns = [216, 248, 280, 312, 344];
  const rows = [206, 238, 270, 302, 334];

  // Pin centers
  const edgePins = [190, 226, 262, 298, 334, 370];
  const sidePins = [180, 216, 252, 288, 324, 360];

  return (
    <svg
      ref={ref}
      viewBox="0 0 860 540"
      fill="none"
      className="w-full h-auto"
      role="img"
      aria-label="Flat technical schematic of a GPU wafer showing CUDA Core array connected to an LLM block"
    >
      {/* Grid pattern definition */}
      <defs>
        <pattern id="diagonal-mesh" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 0 8 L 8 0" stroke="var(--svg-line)" strokeWidth="0.8" />
          <path d="M 0 0 L 8 8" stroke="var(--svg-line)" strokeWidth="0.8" />
        </pattern>
      </defs>

      {/* Technical Schematic margin elements (crosshairs and reference texts) */}
      <g className="schematic-margins" opacity="0.85">
        {/* Crosshair markers */}
        <path d="M 20 30 H 40 M 30 20 V 40" stroke="var(--svg-gray)" strokeWidth="1" />
        <path d="M 820 30 H 840 M 830 20 V 40" stroke="var(--svg-gray)" strokeWidth="1" />
        <path d="M 20 510 H 40 M 30 500 V 520" stroke="var(--svg-gray)" strokeWidth="1" />
        <path d="M 820 510 H 840 M 830 500 V 520" stroke="var(--svg-gray)" strokeWidth="1" />

        {/* Marginal labels shifted to align cleanly next to crosshairs */}
        <text x="45" y="34" fill="var(--svg-gray)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="500">SYS_REF: GPU_SYS_01</text>
        <text x="45" y="514" fill="var(--svg-gray)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="500">JASHOM // PRECISION_ENGINEERING</text>
        <text x="815" y="34" textAnchor="end" fill="var(--svg-gray)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="500">WAFER_ID: 99X-ALPHA</text>
        <text x="815" y="514" textAnchor="end" fill="var(--svg-gray)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="500">RATE: 144 GB/S</text>
      </g>

      {/* Connection Bus Lines (GPU to LLM) */}
      <g className="schematic-connections">
        {/* System Bus Labeling */}
        <text
          x="545"
          y="232"
          fill="var(--svg-gray)"
          fontSize="11"
          fontFamily="var(--font-mono)"
          fontWeight="500"
          opacity="0.95"
          textAnchor="middle"
          letterSpacing="1"
        >
          SYSTEM BUS // 384-BIT
        </text>

        {/* Horizontal Traces */}
        <line
          className="schematic-line"
          x1="450"
          y1="252"
          x2="640"
          y2="252"
          stroke="var(--svg-ink)"
          strokeWidth="1.6"
        />
        <line
          className="schematic-line"
          x1="450"
          y1="288"
          x2="640"
          y2="288"
          stroke="var(--svg-ink)"
          strokeWidth="1.6"
        />
        <line
          className="schematic-line"
          x1="450"
          y1="324"
          x2="640"
          y2="324"
          stroke="var(--svg-ink)"
          strokeWidth="1.6"
        />

        {/* Staggered Dot Terminals */}
        <circle
          className="schematic-dot"
          cx="550"
          cy="252"
          r="4.5"
          fill="var(--svg-paper)"
          stroke="var(--svg-ink)"
          strokeWidth="1.6"
          style={{ transformOrigin: "550px 252px" }}
        />
        <circle
          className="schematic-dot"
          cx="590"
          cy="288"
          r="4.5"
          fill="var(--svg-paper)"
          stroke="var(--svg-ink)"
          strokeWidth="1.6"
          style={{ transformOrigin: "590px 288px" }}
        />
        <circle
          className="schematic-dot"
          cx="490"
          cy="324"
          r="4.5"
          fill="var(--svg-paper)"
          stroke="var(--svg-ink)"
          strokeWidth="1.6"
          style={{ transformOrigin: "490px 324px" }}
        />

        {/* Traveling Data Packet Pulses */}
        <circle className="signal-pulse-0" cx="450" cy="252" r="3" fill="var(--svg-ink)" />
        <circle className="signal-pulse-1" cx="450" cy="288" r="3" fill="var(--svg-ink)" />
        <circle className="signal-pulse-2" cx="450" cy="324" r="3" fill="var(--svg-ink)" />

        <text
          x="545"
          y="350"
          fill="var(--svg-gray)"
          fontSize="10"
          fontFamily="var(--font-mono)"
          fontWeight="500"
          opacity="0.85"
          textAnchor="middle"
        >
          DATA TRANSFER: GPU → LLM
        </text>
      </g>

      {/* GPU Package Module */}
      <g className="schematic-gpu">
        {/* Connection Traces: Top and Bottom Pins */}
        {edgePins.map((cx) => (
          <g key={`edge-traces-${cx}`}>
            {/* Top traces */}
            <line x1={cx - 3} y1="126" x2={cx - 3} y2="150" stroke="var(--svg-ink)" strokeWidth="0.8" />
            <line x1={cx + 3} y1="126" x2={cx + 3} y2="150" stroke="var(--svg-ink)" strokeWidth="0.8" />
            {/* Bottom traces */}
            <line x1={cx - 3} y1="390" x2={cx - 3} y2="414" stroke="var(--svg-ink)" strokeWidth="0.8" />
            <line x1={cx + 3} y1="390" x2={cx + 3} y2="414" stroke="var(--svg-ink)" strokeWidth="0.8" />
          </g>
        ))}

        {/* Connection Traces: Left and Right Pins */}
        {sidePins.map((cy) => (
          <g key={`side-traces-${cy}`}>
            {/* Left traces */}
            <line x1="126" y1={cy - 3} x2="160" y2={cy - 3} stroke="var(--svg-ink)" strokeWidth="0.8" />
            <line x1="126" y1={cy + 3} x2="160" y2={cy + 3} stroke="var(--svg-ink)" strokeWidth="0.8" />
            {/* Right traces */}
            <line x1="400" y1={cy - 3} x2="434" y2={cy - 3} stroke="var(--svg-ink)" strokeWidth="0.8" />
            <line x1="400" y1={cy + 3} x2="434" y2={cy + 3} stroke="var(--svg-ink)" strokeWidth="0.8" />
          </g>
        ))}

        {/* Pin Modules: Top */}
        {edgePins.map((cx) => (
          <g key={`top-pin-${cx}`}>
            <rect
              x={cx - 8}
              y="102"
              width="16"
              height="24"
              rx="2"
              stroke="var(--svg-ink)"
              strokeWidth="1.2"
              fill="var(--svg-paper)"
            />
            <rect x={cx - 3} y="106" width="6" height="16" fill="var(--svg-ink)" />
          </g>
        ))}

        {/* Pin Modules: Bottom */}
        {edgePins.map((cx) => (
          <g key={`bottom-pin-${cx}`}>
            <rect
              x={cx - 8}
              y="414"
              width="16"
              height="24"
              rx="2"
              stroke="var(--svg-ink)"
              strokeWidth="1.2"
              fill="var(--svg-paper)"
            />
            <rect x={cx - 3} y="418" width="6" height="16" fill="var(--svg-ink)" />
          </g>
        ))}

        {/* Pin Modules: Left */}
        {sidePins.map((cy) => (
          <g key={`left-pin-${cy}`}>
            <rect
              x="110"
              y={cy - 12}
              width="16"
              height="24"
              rx="2"
              stroke="var(--svg-ink)"
              strokeWidth="1.2"
              fill="var(--svg-paper)"
            />
            <rect x="115" y={cy - 8} width="6" height="16" fill="var(--svg-ink)" />
          </g>
        ))}

        {/* Pin Modules: Right */}
        {sidePins.map((cy) => (
          <g key={`right-pin-${cy}`}>
            <rect
              x="434"
              y={cy - 12}
              width="16"
              height="24"
              rx="2"
              stroke="var(--svg-ink)"
              strokeWidth="1.2"
              fill="var(--svg-paper)"
            />
            <rect x="439" y={cy - 8} width="6" height="16" fill="var(--svg-ink)" />
          </g>
        ))}

        {/* GPU Chip Outer Package Boundary (Double border) */}
        <rect
          x="160"
          y="150"
          width="240"
          height="240"
          rx="4"
          stroke="var(--svg-ink)"
          strokeWidth="1.6"
          fill="var(--svg-linen)"
        />
        <rect
          x="164"
          y="154"
          width="232"
          height="232"
          rx="2"
          stroke="var(--svg-ink)"
          strokeWidth="0.8"
          fill="none"
        />

        {/* Textured Border (Mesh Pattern inside package) */}
        <rect
          x="172"
          y="162"
          width="216"
          height="216"
          fill="url(#diagonal-mesh)"
          stroke="var(--svg-ink)"
          strokeWidth="1"
        />

        {/* GPU Text Header Box & Label (Masks the mesh underneath) */}
        <rect
          x="235"
          y="150"
          width="90"
          height="24"
          fill="var(--svg-linen)"
          stroke="var(--svg-ink)"
          strokeWidth="1.2"
        />
        <text
          x="280"
          y="166"
          textAnchor="middle"
          fill="var(--svg-ink)"
          fontSize="12"
          fontWeight="bold"
          fontFamily="var(--font-mono)"
          letterSpacing="2"
        >
          GPU
        </text>

        {/* Inner Silicon Die Frame (Double border, filled to cover mesh) */}
        <rect
          x="196"
          y="186"
          width="168"
          height="168"
          rx="2"
          stroke="var(--svg-ink)"
          strokeWidth="1.5"
          fill="var(--svg-paper)"
        />
        <rect
          x="200"
          y="190"
          width="160"
          height="160"
          rx="1"
          stroke="var(--svg-ink)"
          strokeWidth="0.8"
          fill="none"
        />

        {/* Inner Lattice of CUDA Cores */}
        {rows.map((ry, rIdx) =>
          columns.map((cx, cIdx) => {
            // Leave the center column (cIdx = 2) in rows 1, 2, 3 empty for the "CUDA CORES" label
            const isLabelArea = cIdx === 2 && (rIdx === 1 || rIdx === 2 || rIdx === 3);
            if (isLabelArea) return null;

            // Determine if core is active
            const isActive = (rIdx + cIdx) % 2 === 0;

            return (
              <rect
                key={`core-${rIdx}-${cIdx}`}
                className={`cuda-core ${isActive ? "cuda-core-active" : "cuda-core-inactive"}`}
                x={cx - 7}
                y={ry - 7}
                width="14"
                height="14"
                rx="2"
                stroke="var(--svg-ink)"
                strokeWidth="0.8"
                fill={isActive ? "var(--svg-ink)" : "var(--svg-tint)"}
                style={{ transformOrigin: `${cx}px ${ry}px` }}
              />
            );
          })
        )}

        {/* Center CUDA CORES Label (framed nicely with dashed boundary) */}
        <rect
          x="254"
          y="234"
          width="52"
          height="72"
          stroke="var(--svg-line)"
          strokeWidth="0.8"
          strokeDasharray="2 2"
          fill="none"
        />
        <text
          x="280"
          y="265"
          textAnchor="middle"
          fill="var(--svg-ink)"
          fontSize="11"
          fontWeight="bold"
          fontFamily="var(--font-mono)"
          letterSpacing="0.5"
        >
          CUDA
        </text>
        <text
          x="280"
          y="285"
          textAnchor="middle"
          fill="var(--svg-ink)"
          fontSize="11"
          fontWeight="bold"
          fontFamily="var(--font-mono)"
          letterSpacing="0.5"
        >
          CORES
        </text>
      </g>

      {/* LLM Box Module */}
      <g className="schematic-llm">
        {/* Outer and Inner Border Box */}
        <rect
          x="640"
          y="170"
          width="140"
          height="200"
          rx="4"
          stroke="var(--svg-ink)"
          strokeWidth="1.5"
          fill="var(--svg-paper)"
        />
        <rect
          x="644"
          y="174"
          width="132"
          height="192"
          rx="2"
          stroke="var(--svg-ink)"
          strokeWidth="0.8"
          fill="none"
        />

        {/* Large Model Label */}
        <text
          x="710"
          y="278"
          textAnchor="middle"
          fill="var(--svg-ink)"
          fontSize="24"
          fontWeight="bold"
          fontFamily="var(--font-mono)"
          letterSpacing="1"
        >
          LLM
        </text>

        {/* Schematic Circuit Graphics inside LLM Box */}
        {/* Top-left circuit code block lines */}
        <line x1="660" y1="196" x2="700" y2="196" stroke="var(--svg-line)" strokeWidth="1.2" />
        <line x1="660" y1="204" x2="690" y2="204" stroke="var(--svg-line)" strokeWidth="1.2" />
        <line x1="660" y1="212" x2="710" y2="212" stroke="var(--svg-line)" strokeWidth="1.2" />

        {/* Bottom-right circuit code block lines */}
        <line x1="710" y1="328" x2="760" y2="328" stroke="var(--svg-line)" strokeWidth="1.2" />
        <line x1="730" y1="336" x2="760" y2="336" stroke="var(--svg-line)" strokeWidth="1.2" />
        <line x1="720" y1="344" x2="760" y2="344" stroke="var(--svg-line)" strokeWidth="1.2" />
      </g>
    </svg>
  );
}
