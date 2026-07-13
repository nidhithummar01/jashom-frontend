import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  black: "#09090B",
  offBlack: "#111113",
  white: "#FDFDFD",
  offWhite: "#F5F5F3",
  ink2: "#6B6B6E",
  ink3: "#9B9B9E",
  accent: "#FFFFFF",
  border: "#262626",
  lightBorder: "#E4E3DE",
  paper: "#FAFAF8",
  blue: "#3B82F6",
};

Font.registerHyphenationCallback((w) => [w]);

const s = StyleSheet.create({
  // ── Page ──
  page: { backgroundColor: C.black, fontFamily: "Helvetica", paddingBottom: 40 },
  lightPage: { backgroundColor: C.paper, fontFamily: "Helvetica", paddingBottom: 40 },

  // ── Cover ──
  coverBody: { flex: 1, justifyContent: "space-between", padding: 48 },
  coverTag: { fontSize: 8, color: C.ink3, letterSpacing: 3, textTransform: "uppercase" },
  coverHeadline: { fontSize: 38, color: C.white, fontFamily: "Helvetica-Bold", lineHeight: 1.15, marginTop: 8, letterSpacing: -0.5 },
  coverSub: { fontSize: 12, color: C.ink2, lineHeight: 1.6, marginTop: 12, maxWidth: 320 },
  coverDivider: { height: 1, backgroundColor: C.border, marginVertical: 28 },
  coverPillRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  coverPill: { borderWidth: 1, borderColor: C.border, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  coverPillText: { fontSize: 9, color: C.ink2, letterSpacing: 1.5 },
  coverFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  coverFooterLeft: { fontSize: 9, color: C.ink3 },
  coverFooterRight: { fontSize: 9, color: C.ink3, textAlign: "right" },

  // ── Section header ──
  sectionHeader: { backgroundColor: C.offBlack, paddingHorizontal: 48, paddingVertical: 36, borderBottomWidth: 1, borderBottomColor: C.border },
  sectionHeaderLight: { backgroundColor: C.white, paddingHorizontal: 48, paddingVertical: 36, borderBottomWidth: 1, borderBottomColor: C.lightBorder },
  eyebrow: { fontSize: 8, color: C.ink3, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 },
  eyebrowDark: { fontSize: 8, color: C.ink3, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 },
  h1: { fontSize: 26, color: C.white, fontFamily: "Helvetica-Bold", letterSpacing: -0.3 },
  h1Light: { fontSize: 26, color: C.black, fontFamily: "Helvetica-Bold", letterSpacing: -0.3 },
  h2: { fontSize: 18, color: C.white, fontFamily: "Helvetica-Bold", marginBottom: 8 },
  h2Light: { fontSize: 18, color: C.black, fontFamily: "Helvetica-Bold", marginBottom: 8 },
  h3: { fontSize: 12, color: C.white, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  h3Light: { fontSize: 12, color: C.black, fontFamily: "Helvetica-Bold", marginBottom: 4 },

  // ── Body ──
  body: { paddingHorizontal: 48, paddingVertical: 32 },
  para: { fontSize: 10, color: C.ink2, lineHeight: 1.65, marginBottom: 10 },
  paraLight: { fontSize: 10, color: C.ink2, lineHeight: 1.65, marginBottom: 10 },

  // ── Cards / grid ──
  row: { flexDirection: "row", gap: 14 },
  card: { flex: 1, borderWidth: 1, borderColor: C.border, borderRadius: 6, padding: 16, backgroundColor: C.offBlack },
  cardLight: { flex: 1, borderWidth: 1, borderColor: C.lightBorder, borderRadius: 6, padding: 16, backgroundColor: C.white },
  cardTag: { fontSize: 7, color: C.ink3, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 },
  cardTitle: { fontSize: 11, color: C.white, fontFamily: "Helvetica-Bold", marginBottom: 5 },
  cardTitleLight: { fontSize: 11, color: C.black, fontFamily: "Helvetica-Bold", marginBottom: 5 },
  cardBody: { fontSize: 9, color: C.ink2, lineHeight: 1.6 },

  // ── Stat row ──
  statRow: { flexDirection: "row", borderTopWidth: 1, borderTopColor: C.border, paddingTop: 24, gap: 0 },
  statCell: { flex: 1, borderRightWidth: 1, borderRightColor: C.border, paddingHorizontal: 20, paddingVertical: 8 },
  statCellLast: { flex: 1, paddingHorizontal: 20, paddingVertical: 8 },
  statValue: { fontSize: 28, color: C.white, fontFamily: "Helvetica-Bold", letterSpacing: -1 },
  statLabel: { fontSize: 8, color: C.ink3, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 },
  statLabelLight: { fontSize: 8, color: C.ink3, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 },

  // ── Bullet list ──
  bulletRow: { flexDirection: "row", gap: 8, marginBottom: 6, alignItems: "flex-start" },
  bullet: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.ink3, marginTop: 4, flexShrink: 0 },
  bulletLight: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.ink3, marginTop: 4, flexShrink: 0 },
  bulletText: { fontSize: 9.5, color: C.ink2, lineHeight: 1.6, flex: 1 },

  // ── Case study ──
  caseRow: { flexDirection: "row", gap: 14, marginBottom: 14 },
  caseCard: { flex: 1, borderWidth: 1, borderColor: C.lightBorder, borderRadius: 6, padding: 16, backgroundColor: C.white },
  caseNum: { fontSize: 22, color: C.black, fontFamily: "Helvetica-Bold", letterSpacing: -0.5 },
  caseNumLabel: { fontSize: 8, color: C.ink3, letterSpacing: 1.5, marginBottom: 8 },
  caseTitle: { fontSize: 10, color: C.black, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  caseBody: { fontSize: 8.5, color: C.ink2, lineHeight: 1.55 },

  // ── Footer strip ──
  footer: { position: "absolute", bottom: 0, left: 0, right: 0, height: 36, backgroundColor: C.offBlack, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 48 },
  footerLight: { position: "absolute", bottom: 0, left: 0, right: 0, height: 36, backgroundColor: C.white, borderTopWidth: 1, borderTopColor: C.lightBorder, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 48 },
  footerText: { fontSize: 7.5, color: C.ink3 },

  // ── Contact ──
  contactGrid: { flexDirection: "row", gap: 14 },
  contactCard: { flex: 1, borderWidth: 1, borderColor: C.border, borderRadius: 6, padding: 18, backgroundColor: C.offBlack },
  contactLabel: { fontSize: 7.5, color: C.ink3, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 },
  contactValue: { fontSize: 10, color: C.white, fontFamily: "Helvetica-Bold" },
  contactSub: { fontSize: 8.5, color: C.ink2, marginTop: 2 },

  // ── Divider ──
  divider: { height: 1, backgroundColor: C.border, marginVertical: 20 },
  dividerLight: { height: 1, backgroundColor: C.lightBorder, marginVertical: 20 },

  // ── Tag pill ──
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: { borderWidth: 1, borderColor: C.lightBorder, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 8, color: C.ink2 },
});

function Bullet({ text, dark = true }: { readonly text: string; readonly dark?: boolean }) {
  return (
    <View style={s.bulletRow}>
      <View style={dark ? s.bullet : s.bulletLight} />
      <Text style={s.bulletText}>{text}</Text>
    </View>
  );
}

function PageFooter({ label, dark = true }: { readonly label: string; readonly dark?: boolean }) {
  return (
    <View style={dark ? s.footer : s.footerLight} fixed>
      <Text style={s.footerText}>Jashom Technologies Pvt. Ltd.</Text>
      <Text style={s.footerText}>{label}</Text>
      <Text style={s.footerText}>www.jashom.com</Text>
    </View>
  );
}

export function JashomBrochure() {
  return (
    <Document title="Jashom Technologies — Company Brochure" author="Jashom Technologies Pvt. Ltd.">

      {/* ── PAGE 1: COVER ──────────────────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <View style={s.coverBody}>
          {/* Top */}
          <View>
            <Text style={s.coverTag}>Jashom Technologies Pvt. Ltd.</Text>
            <Text style={s.coverHeadline}>Precision GPU{"\n"}Engineering for{"\n"}High-Performance AI</Text>
            <Text style={s.coverSub}>
              We build the infrastructure that makes AI faster, leaner, and more powerful — from CUDA kernel-level optimisation to full-stack GPU pipeline delivery.
            </Text>
            <View style={s.coverDivider} />
            <View style={s.coverPillRow}>
              {["GPU Optimization", "CUDA Development", "Hire GPU Experts", "Rust Engineering", "HPC Solutions"].map((p) => (
                <View key={p} style={s.coverPill}>
                  <Text style={s.coverPillText}>{p.toUpperCase()}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Bottom */}
          <View style={s.coverFooter}>
            <View>
              <Text style={s.coverFooterLeft}>Company Brochure · 2025–2026</Text>
              <Text style={[s.coverFooterLeft, { marginTop: 2 }]}>Confidential · All rights reserved</Text>
            </View>
            <View>
              <Text style={s.coverFooterRight}>info@jashom.com</Text>
              <Text style={[s.coverFooterRight, { marginTop: 2 }]}>www.jashom.com</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* ── PAGE 2: ABOUT ──────────────────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <View style={s.sectionHeader}>
          <Text style={s.eyebrow}>About Us</Text>
          <Text style={s.h1}>Who We Are</Text>
        </View>
        <View style={s.body}>
          <Text style={s.para}>
            Jashom Technologies is a specialist GPU engineering firm focused exclusively on high-performance computing, AI infrastructure, and parallel computing at scale. Founded by engineers who have worked on GPU architectures at the hardware and kernel level, we bring a depth of expertise that generalist IT providers cannot match.
          </Text>
          <Text style={s.para}>
            We work with AI startups, enterprise data teams, research institutions, and cloud-native companies that demand measurable performance improvements — not just incremental gains. Every engagement is built around your specific workload, hardware constraints, and business goals.
          </Text>
          <View style={s.divider} />

          <Text style={s.h2}>Our Core Competencies</Text>
          <View style={[s.row, { marginTop: 12 }]}>
            <View style={s.card}>
              <Text style={s.cardTag}>Capability 01</Text>
              <Text style={s.cardTitle}>CUDA & GPU Kernel Engineering</Text>
              <Text style={s.cardBody}>
                We write, profile, and optimise CUDA kernels for maximum throughput. From memory access patterns to warp-level parallelism, we squeeze every FLOP from your hardware.
              </Text>
            </View>
            <View style={s.card}>
              <Text style={s.cardTag}>Capability 02</Text>
              <Text style={s.cardTitle}>LLM Inference & AI Pipeline Optimisation</Text>
              <Text style={s.cardBody}>
                Quantisation, batching strategies, KV-cache tuning, tensor parallelism — we optimise the entire inference path for production LLM deployments at any scale.
              </Text>
            </View>
          </View>
          <View style={[s.row, { marginTop: 14 }]}>
            <View style={s.card}>
              <Text style={s.cardTag}>Capability 03</Text>
              <Text style={s.cardTitle}>Systems Programming (Rust & C++)</Text>
              <Text style={s.cardBody}>
                Our Rust and C++ engineers build low-latency, memory-safe systems for GPU orchestration, telemetry, and infrastructure control planes.
              </Text>
            </View>
            <View style={s.card}>
              <Text style={s.cardTag}>Capability 04</Text>
              <Text style={s.cardTitle}>Staff Augmentation & Dedicated Teams</Text>
              <Text style={s.cardBody}>
                Need embedded GPU engineers? We supply dedicated CUDA and Rust developers who integrate directly with your team and your development workflow.
              </Text>
            </View>
          </View>
          <View style={s.divider} />
          <View style={s.statRow}>
            <View style={s.statCell}>
              <Text style={s.statValue}>50+</Text>
              <Text style={s.statLabel}>GPU Projects Delivered</Text>
            </View>
            <View style={s.statCell}>
              <Text style={s.statValue}>12+</Text>
              <Text style={s.statLabel}>Expert GPU Engineers</Text>
            </View>
            <View style={s.statCell}>
              <Text style={s.statValue}>4+</Text>
              <Text style={s.statLabel}>Years of CUDA R&D</Text>
            </View>
            <View style={s.statCellLast}>
              <Text style={s.statValue}>3×</Text>
              <Text style={s.statLabel}>Avg. Cost Reduction</Text>
            </View>
          </View>
        </View>
        <PageFooter label="About Jashom · Page 2" />
      </Page>

      {/* ── PAGE 3: SERVICES ───────────────────────────────────────────── */}
      <Page size="A4" style={s.lightPage}>
        <View style={s.sectionHeaderLight}>
          <Text style={s.eyebrow}>Our Services</Text>
          <Text style={s.h1Light}>What We Do</Text>
        </View>
        <View style={s.body}>
          <View style={s.row}>
            <View style={[s.cardLight, { flex: 1 }]}>
              <Text style={s.cardTag}>Service 01</Text>
              <Text style={s.cardTitleLight}>NVIDIA GPU Optimization</Text>
              <Text style={s.cardBody}>
                End-to-end GPU performance engineering for AI, HPC, and data-intensive applications. We profile workloads, find bottlenecks, and implement kernel-level optimisations.
              </Text>
              <View style={{ marginTop: 10 }}>
                <Bullet dark={false} text="Custom CUDA kernel profiling and rewrite" />
                <Bullet dark={false} text="Memory bandwidth and occupancy optimisation" />
                <Bullet dark={false} text="Multi-GPU and distributed inference tuning" />
                <Bullet dark={false} text="Power efficiency improvements" />
              </View>
            </View>
            <View style={[s.cardLight, { flex: 1 }]}>
              <Text style={s.cardTag}>Service 02</Text>
              <Text style={s.cardTitleLight}>CUDA Development Services</Text>
              <Text style={s.cardBody}>
                Build scalable, production-ready GPU applications. Our CUDA developers design parallel algorithms for AI training, inference, simulation, and signal processing.
              </Text>
              <View style={{ marginTop: 10 }}>
                <Bullet dark={false} text="Parallel algorithm design and implementation" />
                <Bullet dark={false} text="AI model acceleration (training + inference)" />
                <Bullet dark={false} text="Custom GPU libraries for scientific computing" />
                <Bullet dark={false} text="Integration with PyTorch, TensorRT, ONNX" />
              </View>
            </View>
          </View>
          <View style={[s.row, { marginTop: 14 }]}>
            <View style={[s.cardLight, { flex: 1 }]}>
              <Text style={s.cardTag}>Service 03</Text>
              <Text style={s.cardTitleLight}>Hire CUDA Developers</Text>
              <Text style={s.cardBody}>
                Dedicated CUDA programmers embedded in your team. Senior GPU engineers on monthly retainer or project basis with full IP transfer.
              </Text>
              <View style={{ marginTop: 10 }}>
                <Bullet dark={false} text="Senior CUDA & GPU engineers on demand" />
                <Bullet dark={false} text="Monthly retainer or fixed-scope projects" />
                <Bullet dark={false} text="Full IP transfer and NDA-ready" />
              </View>
            </View>
            <View style={[s.cardLight, { flex: 1 }]}>
              <Text style={s.cardTag}>Service 04</Text>
              <Text style={s.cardTitleLight}>Hire Rust Developers</Text>
              <Text style={s.cardBody}>
                Experienced Rust engineers for GPU orchestration, telemetry pipelines, and high-throughput systems. Memory-safe, fast, and production-proven.
              </Text>
              <View style={{ marginTop: 10 }}>
                <Bullet dark={false} text="GPU orchestration and control plane systems" />
                <Bullet dark={false} text="High-throughput telemetry pipelines" />
                <Bullet dark={false} text="Memory-safe systems programming" />
              </View>
            </View>
          </View>
        </View>
        <PageFooter label="Services · Page 3" dark={false} />
      </Page>

      {/* ── PAGE 4: CASE STUDIES ───────────────────────────────────────── */}
      <Page size="A4" style={s.lightPage}>
        <View style={s.sectionHeaderLight}>
          <Text style={s.eyebrow}>Portfolio</Text>
          <Text style={s.h1Light}>Real Results, Real Workloads</Text>
        </View>
        <View style={s.body}>
          <Text style={[s.paraLight, { marginBottom: 16 }]}>
            Every case study below represents a live production deployment. Numbers are measured post-optimisation under real workload conditions — not benchmarks.
          </Text>

          <View style={s.caseRow}>
            <View style={s.caseCard}>
              <Text style={s.caseNumLabel}>OUTCOME · LLM INFERENCE</Text>
              <Text style={s.caseNum}>42%</Text>
              <Text style={[s.caseNumLabel, { marginBottom: 10 }]}>THROUGHPUT IMPROVEMENT</Text>
              <Text style={s.caseTitle}>LLM Inference Optimization on Constrained GPU Infrastructure</Text>
              <Text style={s.caseBody}>
                Deployed a 13B parameter model on a 12-node distributed cluster. Re-engineered the full inference path — CUDA kernels, dynamic quantisation, adaptive batching — delivering 42% higher throughput and 37% lower power, at ⅓ the projected cost.
              </Text>
            </View>
            <View style={s.caseCard}>
              <Text style={s.caseNumLabel}>OUTCOME · ORCHESTRATION</Text>
              <Text style={s.caseNum}>60%</Text>
              <Text style={[s.caseNumLabel, { marginBottom: 10 }]}>IDLE GPU TIME REDUCED</Text>
              <Text style={s.caseTitle}>GPU Workload Orchestration on Rocky Linux 9.7</Text>
              <Text style={s.caseBody}>
                Built a multi-queue GPU scheduling framework on Rocky Linux 9.7 that reduced idle GPU time by 60% and eliminated resource contention across concurrent AI training jobs.
              </Text>
            </View>
          </View>

          <View style={s.caseRow}>
            <View style={s.caseCard}>
              <Text style={s.caseNumLabel}>OUTCOME · CLOUD GPU</Text>
              <Text style={s.caseNum}>3×</Text>
              <Text style={[s.caseNumLabel, { marginBottom: 10 }]}>FASTER FINE-TUNING</Text>
              <Text style={s.caseTitle}>Cloud GPU Fine-Tuning for Production LLM Deployment</Text>
              <Text style={s.caseBody}>
                Redesigned the fine-tuning pipeline for a production LLM on cloud GPU infrastructure. Mixed-precision training, gradient checkpointing, and dynamic batch scaling cut training time by 3× and cost by 55%.
              </Text>
            </View>
            <View style={s.caseCard}>
              <Text style={s.caseNumLabel}>OUTCOME · TELEMETRY</Text>
              <Text style={s.caseNum}>99.9%</Text>
              <Text style={[s.caseNumLabel, { marginBottom: 10 }]}>HARDWARE VISIBILITY</Text>
              <Text style={s.caseTitle}>Real-Time GPU Telemetry via Redfish BMC Integration</Text>
              <Text style={s.caseBody}>
                Integrated Redfish BMC telemetry with a custom Rust-based collector to deliver real-time GPU server health monitoring across a bare-metal cluster with sub-second latency.
              </Text>
            </View>
          </View>

          <View style={s.dividerLight} />
          <Text style={[s.cardTag, { textAlign: "center", marginBottom: 10 }]}>Technologies We Work With</Text>
          <View style={s.tagRow}>
            {["CUDA", "TensorRT", "PyTorch", "ONNX", "NCCL", "Rust", "C++17", "Rocky Linux", "Kubernetes", "Redfish BMC", "H100 / A100", "NVLink"].map((t) => (
              <View key={t} style={s.tag}>
                <Text style={s.tagText}>{t}</Text>
              </View>
            ))}
          </View>
        </View>
        <PageFooter label="Case Studies · Page 4" dark={false} />
      </Page>

      {/* ── PAGE 5: WHY JASHOM ─────────────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <View style={s.sectionHeader}>
          <Text style={s.eyebrow}>Why Jashom</Text>
          <Text style={s.h1}>The Jashom Difference</Text>
        </View>
        <View style={s.body}>
          <View style={s.row}>
            <View style={s.card}>
              <Text style={s.cardTag}>Depth</Text>
              <Text style={s.cardTitle}>Kernel-Level Expertise</Text>
              <Text style={s.cardBody}>
                We work at the CUDA kernel and hardware level — not just framework wrappers. That depth is what produces 40%+ gains where others plateau.
              </Text>
            </View>
            <View style={s.card}>
              <Text style={s.cardTag}>Focus</Text>
              <Text style={s.cardTitle}>100% GPU-Specialised</Text>
              <Text style={s.cardBody}>
                We don't do everything. We do GPU performance — exclusively. That focus means our engineers have solved the exact problem you're facing before.
              </Text>
            </View>
          </View>
          <View style={[s.row, { marginTop: 14 }]}>
            <View style={s.card}>
              <Text style={s.cardTag}>Delivery</Text>
              <Text style={s.cardTitle}>Measurable Outcomes</Text>
              <Text style={s.cardBody}>
                Every engagement starts with baselines and ends with verified benchmarks. We define success metrics upfront and hit them — or keep working until we do.
              </Text>
            </View>
            <View style={s.card}>
              <Text style={s.cardTag}>Flexibility</Text>
              <Text style={s.cardTitle}>Your Model, Your Terms</Text>
              <Text style={s.cardBody}>
                Project-based, retainer, or embedded team — we work the way you work. Full IP transfer, NDA-ready, and timezone-aligned delivery.
              </Text>
            </View>
          </View>
          <View style={s.divider} />
          <Text style={s.h2}>Our Engagement Models</Text>
          <View style={[s.row, { marginTop: 10 }]}>
            <View style={s.card}>
              <Text style={s.cardTitle}>🔹 Fixed-Scope Project</Text>
              <Text style={s.cardBody}>Defined deliverables, timeline, and budget. Best for a specific optimisation task or feature build.</Text>
            </View>
            <View style={s.card}>
              <Text style={s.cardTitle}>🔹 Monthly Retainer</Text>
              <Text style={s.cardBody}>Ongoing GPU engineering support — ideal for teams that ship AI features continuously and need expert capacity on call.</Text>
            </View>
            <View style={s.card}>
              <Text style={s.cardTitle}>🔹 Dedicated Team</Text>
              <Text style={s.cardBody}>1–6 senior GPU engineers embedded in your team, working exclusively on your infrastructure and roadmap.</Text>
            </View>
          </View>
          <View style={s.divider} />
          <Text style={s.h2}>How It Works</Text>
          <View style={{ marginTop: 10 }}>
            <Bullet text="Step 1 — Discovery call: we understand your workload, hardware, and performance targets (30 min)" />
            <Bullet text="Step 2 — Baseline audit: we profile your current system and identify the highest-impact optimisation opportunities" />
            <Bullet text="Step 3 — Proposal: we deliver a scoped plan with timeline, team, and expected performance gains" />
            <Bullet text="Step 4 — Execution: our engineers get to work, with weekly updates and live benchmark tracking" />
            <Bullet text="Step 5 — Handoff: full documentation, code ownership, and optional ongoing support" />
          </View>
        </View>
        <PageFooter label="Why Jashom · Page 5" />
      </Page>

      {/* ── PAGE 6: CONTACT ────────────────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <View style={s.sectionHeader}>
          <Text style={s.eyebrow}>Get In Touch</Text>
          <Text style={s.h1}>Let&apos;s Talk Performance</Text>
        </View>
        <View style={s.body}>
          <Text style={[s.para, { marginBottom: 24 }]}>
            Whether you have a specific GPU bottleneck, a scaling challenge, or just want to know what&apos;s possible — we&apos;re happy to talk. No sales pitch, just engineering.
          </Text>

          <View style={s.contactGrid}>
            <View style={s.contactCard}>
              <Text style={s.contactLabel}>Email</Text>
              <Text style={s.contactValue}>info@jashom.com</Text>
              <Text style={s.contactSub}>Response within 24 hours</Text>
            </View>
            <View style={s.contactCard}>
              <Text style={s.contactLabel}>Website</Text>
              <Text style={s.contactValue}>www.jashom.com</Text>
              <Text style={s.contactSub}>Book a consultation online</Text>
            </View>
          </View>

          <View style={[s.contactGrid, { marginTop: 14 }]}>
            <View style={s.contactCard}>
              <Text style={s.contactLabel}>Phone</Text>
              <Text style={s.contactValue}>+91 90239 06363</Text>
              <Text style={s.contactSub}>Mon–Fri, 9am–6pm IST</Text>
            </View>
            <View style={s.contactCard}>
              <Text style={s.contactLabel}>Office</Text>
              <Text style={s.contactValue}>Gandhinagar, Gujarat</Text>
              <Text style={s.contactSub}>SATYAM 1 414, Amba Business Park, Adalaj 382421</Text>
            </View>
          </View>

          <View style={s.divider} />
          {/* Final tagline */}
          <View style={{ alignItems: "center", marginTop: 8 }}>
            <Text style={{ fontSize: 16, color: C.white, fontFamily: "Helvetica-Bold", textAlign: "center", letterSpacing: -0.3 }}>
              Powering High-Performance AI{"\n"}with Precision GPU Engineering
            </Text>
            <Text style={{ fontSize: 9, color: C.ink3, marginTop: 10, letterSpacing: 2, textTransform: "uppercase" }}>
              Jashom Technologies Pvt. Ltd. · 2025–2026
            </Text>
          </View>
        </View>
        <PageFooter label="Contact · Page 6" />
      </Page>

    </Document>
  );
}
