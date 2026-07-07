/* Hire Rust Developers hero — Rust system architecture:
   memory ownership model, async tasks, and binary output.
   Minimal line-art on the always-dark hero; orange-red accent. */
export default function HireRustHeroSvg() {
  const ink = "var(--svg-ink)";
  const line = "var(--svg-line)";
  const accent = "#fb923c"; // Rust orange

  return (
    <svg viewBox="0 0 480 360" className="w-full h-auto" fill="none" aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">

      {/* Memory ownership diagram — left column */}
      <rect x="30" y="50" width="150" height="270" stroke={ink} strokeWidth="1.8" />
      <text x="105" y="70" textAnchor="middle" fill={line} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="2">OWNERSHIP</text>
      <line x1="30" y1="78" x2="180" y2="78" stroke={line} strokeWidth="1" />

      {/* Stack frame */}
      {[
        { y: 100, w: 90, label: "let s1: String", owned: true },
        { y: 130, w: 90, label: "let s2 = s1", owned: false },
        { y: 160, w: 70, label: "&s2 borrow", owned: true },
        { y: 190, w: 110, label: "fn take(v: Vec<T>)", owned: true },
        { y: 220, w: 80, label: "drop(s1)", owned: false },
        { y: 250, w: 100, label: "Arc<Mutex<T>>", owned: true },
        { y: 280, w: 90, label: "impl Send + Sync", owned: false },
      ].map(({ y, w, label, owned }) => (
        <g key={y}>
          <rect x="40" y={y - 11} width={w} height="14"
            stroke={owned ? accent : line} strokeWidth={owned ? 1.5 : 0.8}
            fill={owned ? accent : "none"} fillOpacity={owned ? 0.1 : 0} />
          <text x="44" y={y} fill={owned ? accent : line} fontSize="8" fontFamily="var(--font-mono)">{label}</text>
        </g>
      ))}

      {/* Arrow connectors right */}
      {[100, 130, 160, 190, 220, 250, 280].map((y) => (
        <g key={y}>
          <line x1="180" y1={y - 4} x2="208" y2={y - 4} stroke={line} strokeWidth="0.8" strokeDasharray="3 2" />
        </g>
      ))}

      {/* Async runtime / binary output — right column */}
      <rect x="208" y="50" width="240" height="270" stroke={ink} strokeWidth="1.8" />
      <text x="328" y="70" textAnchor="middle" fill={line} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="2">ASYNC RUNTIME</text>
      <line x1="208" y1="78" x2="448" y2="78" stroke={line} strokeWidth="1" />

      {/* Tokio tasks */}
      {[
        { y: 100, label: "#[tokio::main]" },
        { y: 124, label: "async fn handler() {" },
        { y: 148, label: "  let db = pool.get().await?;" },
        { y: 172, label: "  let res = fetch(url).await;" },
        { y: 196, label: "  Ok(Json(res))" },
        { y: 220, label: "}" },
        { y: 244, label: "tokio::spawn(task_a());" },
        { y: 268, label: "tokio::spawn(task_b());" },
      ].map(({ y, label }, i) => (
        <text key={y} x="220" y={y} fill={i === 0 ? accent : line}
          fontSize="9.5" fontFamily="var(--font-mono)">{label}</text>
      ))}

      {/* Build output box */}
      <rect x="218" y="278" width="220" height="30" stroke={accent} strokeWidth="1.2" fill={accent} fillOpacity="0.06" />
      <text x="228" y="294" fill={accent} fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="1">✓ Compiling  ✓ Linking  ✓ Finished</text>

      {/* top label */}
      <text x="30" y="340" fill={line} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.6">RUST // SAFE · FAST · CONCURRENT</text>
    </svg>
  );
}
