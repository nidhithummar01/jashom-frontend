"use client";

import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import PortfolioHeroSvg from "./PortfolioHeroSvg";

const CAPABILITIES = [
  { title: "GPU Kernel Engineering", depth: "CUDA / ROCm kernel development, layer fusion, operator optimization", impact: "Faster inference, lower hardware cost per query" },
  { title: "LLM Power Optimization", depth: "INT8/FP16 quantization, TensorRT inference re-engineering", impact: "37%+ power reduction with no accuracy loss" },
  { title: "AI Model Fine-Tuning", depth: "LoRA, QLoRA across 7B–70B+ models; cloud infra strategy", impact: "Production models in hours, not weeks" },
  { title: "Workload Orchestration", depth: "REST API scheduling, VRAM-aware assignment, container isolation", impact: "GPU jobs tracked, isolated, and audited end-to-end" },
  { title: "Hardware Telemetry", depth: "Redfish / BMC integration, per-GPU power & thermal monitoring", impact: "Real-time infrastructure visibility without OS dependency" },
  { title: "RAG Infrastructure", depth: "Retrieval-Augmented Generation with distributed data layers", impact: "Real-time contextual AI at scale" },
  { title: "Healthcare AI", depth: "Dispatch optimization, triage analytics, hospital system integration", impact: "Saves critical minutes in emergency response" },
];

const CASE_STUDIES = [
  { title: "LLM Inference Optimization on Constrained GPU Infrastructure", blurb: "42% higher throughput, 37% lower power, 12 distributed nodes. Full inference path re-engineering with CUDA kernels, TensorRT, and adaptive batching.", stats: ["42% Throughput", "37% Power ↓", "12 Nodes"], href: "/portfolio/case-study/llm-inference-optimization/" },
  { title: "GPU Workload Orchestration Framework on Rocky Linux 9.7", blurb: "Demo-ready in 5 days: REST API, VRAM-aware scheduling, Docker isolation, full audit trail. RTX 3090 + Rocky Linux 9.7.", stats: ["5 Days", "4 Endpoints", "100% Isolation"], href: "/portfolio/case-study/gpu-workload-orchestration/" },
  { title: "Cloud GPU Fine-Tuning Strategy for Production LLM Deployment", blurb: "Tiered strategy 7B–70B+ models: LoRA/QLoRA, Axolotl, DeepSpeed. Provider-agnostic cloud GPU; dataset to production in days.", stats: ["7B–70B+", "3 Tiers", "Days to Deploy"], href: "/portfolio/case-study/cloud-gpu-fine-tuning/" },
  { title: "Real-Time GPU Server Hardware Telemetry via Redfish BMC", blurb: "Live dashboard every 30s: power, temperature, fan RPM from Lambda Scalar BMCs. HTTPS, Basic Auth, scoped SSL bypass.", stats: ["30s Refresh", "4 Servers", "Out-of-band"], href: "/portfolio/case-study/redfish-bmc-telemetry/" },
];

const DEMONSTRATED = [
  { title: "Custom CUDA kernel engineering for LLMs", note: "Case Study 1: kernel-level optimization of 13B parameter model" },
  { title: "INT8/FP16 quantization without accuracy loss", note: "Case Study 1: zero measured accuracy degradation post-quantization" },
  { title: "42% throughput improvement on production inference", note: "Case Study 1: measured result on 13B model, 12-node deployment" },
  { title: "37% GPU power reduction", note: "Case Study 1: measured against pre-optimization baseline" },
  { title: "REST API GPU job scheduling with VRAM awareness", note: "Case Study 2: full FastAPI + SQLite orchestration system" },
  { title: "Containerized GPU execution with hard isolation", note: "Case Study 2: NVIDIA_VISIBLE_DEVICES enforced per job" },
  { title: "LoRA / QLoRA strategy across 7B–70B models", note: "Case Study 3: tiered fine-tuning framework" },
  { title: "Multi-provider cloud GPU management", note: "Case Study 3: AWS, Lambda Labs, CoreWeave, RunPod" },
  { title: "Out-of-band BMC hardware telemetry", note: "Case Study 4: Redfish / AST2600 integration" },
  { title: "Production platform engineering (TypeScript / Node.js)", note: "Case Study 4: Electron app metric collector extension" },
];

const TECH_STACK = [
  { group: "GPU & Inference", items: ["CUDA", "ROCm", "TensorRT", "Triton Inference Server", "ONNX", "nvidia-smi", "NVIDIA Nsight", "INT8/FP16 Quantization", "Layer Fusion"] },
  { group: "AI / ML Frameworks", items: ["PyTorch", "TensorFlow", "Hugging Face Transformers", "LangChain", "DeepSpeed (ZeRO-3)", "Unsloth", "Axolotl", "TorchTune", "vLLM"] },
  { group: "Infrastructure", items: ["Docker", "NVIDIA Container Toolkit", "FastAPI", "uvicorn", "SQLite", "SQLAlchemy", "systemd", "Rocky Linux 9.7", "Ubuntu 22.04", "Python 3.x"] },
  { group: "Monitoring & Telemetry", items: ["Redfish API", "Supermicro AST2600 BMC", "Lambda Scalar servers", "undici (Node.js)", "TypeScript / Electron"] },
  { group: "Cloud Providers", items: ["AWS", "Google Cloud Platform", "Microsoft Azure", "Lambda Labs", "CoreWeave", "RunPod", "Vast.ai", "TensorDock"] },
];

const ENGAGEMENT = [
  { title: "Fixed-Scope Prototype", body: "Well-defined problem, delivered in 3–5 days. Priced by scope. Examples: GPU orchestration prototype, Redfish telemetry integration, fine-tuning run with evaluation." },
  { title: "Production Engineering", body: "Ongoing GPU engineering, model optimization, or AI system development. Embedded technical partnership with measurable milestones." },
  { title: "Applied Research", body: "Low-power inference architectures, GPU sharing fabric design, model compression and distillation. Research engineering alongside production deliverables." },
  { title: "GPU Audit", body: "Profiling and optimization assessment of your existing GPU infrastructure. Delivered as a prioritized recommendations report with measurable impact projections." },
];

export default function PortfolioContent() {
  const reduced = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section id="hero" className="always-dark relative min-h-[60svh] flex flex-col overflow-clip">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative flex-1 grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-12 items-center pt-28 pb-10">
          <div className="flex flex-col justify-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase mb-6">
            Portfolio
          </motion.p>
          <h1 className="text-[clamp(1.6rem,2.5vw,2.1rem)] leading-[1.1]">
            <span className="block overflow-clip">
              <motion.span className="block"
                initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                animate={{ transform: "translateY(0%)" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                Powering AI. Redefining Efficiency.
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mt-7 max-w-[62ch] text-[1.0625rem] text-ink-2">
            Jashom is an applied AI company advancing artificial intelligence while optimizing performance and reducing energy consumption across GPU infrastructure, model deployment, and healthcare AI systems.
          </motion.p>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:block">
            <PortfolioHeroSvg />
          </motion.div>
        </div>
      </section>

      <main>
        {/* Capability matrix */}
        <section className="section" id="capabilities">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Core Capability Matrix</SplitHeading>
            </div>
            <Stagger className="grid md:grid-cols-2 border-t border-line" itemClassName="h-full" step={0.05}>
              {CAPABILITIES.map((c) => (
                <div key={c.title} className="h-full p-6 md:p-8 border-b border-line hover:bg-tint transition-all duration-300">
                  <h3 className="text-[1.125rem] font-medium text-ink mb-5">{c.title}</h3>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="font-mono text-[0.75rem] tracking-wider text-ink-3 uppercase mb-1">Technical Depth</p>
                      <p className="text-[0.9375rem] text-ink-2">{c.depth}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[0.75rem] tracking-wider text-ink-3 uppercase mb-1">Business Impact</p>
                      <p className="text-[0.9375rem] text-ink-2">{c.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Case studies */}
        <section className="section bg-paper border-y border-line" id="case-studies">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">GPU Portfolio &amp; Case Studies</span>
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Case Studies</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[60ch]">Real engagements: LLM inference optimization, GPU orchestration, cloud fine-tuning, and hardware telemetry.</p></Reveal>
            </div>
            <Stagger className="grid md:grid-cols-2 gap-6" step={0.08}>
              {CASE_STUDIES.map((cs) => (
                <div key={cs.title} className="group flex flex-col p-6 md:p-8 border border-line hover:bg-tint transition-all duration-300">
                  <span className="font-mono text-[0.75rem] tracking-wider text-ink-3 uppercase mb-3">Case Study</span>
                  <h3 className="text-[1.25rem] font-medium mb-3">{cs.title}</h3>
                  <p className="text-ink-2 mb-5 flex-1">{cs.blurb}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cs.stats.map((s) => (<span key={s} className="border border-line bg-linen px-3 py-1 text-[0.8125rem] font-mono text-ink">{s}</span>))}
                  </div>
                  <a href={cs.href} className="link-line text-ink font-medium text-[0.9375rem] w-fit">View full case study →</a>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Portfolio summary */}
        <section className="section" id="summary">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Portfolio Summary</span>
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Capabilities, Technologies &amp; Engagement Model</SplitHeading>
              <Reveal><p className="text-ink font-medium text-[1.0625rem]">What Jashom Has Demonstrated</p></Reveal>
            </div>
            <Stagger className="grid sm:grid-cols-2 border-t border-line" itemClassName="h-full" step={0.04}>
              {DEMONSTRATED.map((d) => (
                <div key={d.title} className="h-full p-5 md:p-6 border-b border-line">
                  <h3 className="font-sans font-medium text-[0.9375rem] text-ink mb-1">{d.title}</h3>
                  <p className="text-[0.8125rem] text-ink-3 font-mono">{d.note}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Technology stack */}
        <section className="section bg-paper border-y border-line" id="tech-stack">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Technology Stack</span>
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Full Technology Stack</SplitHeading>
            </div>
            <div className="flex flex-col gap-8 border-t border-line pt-8">
              {TECH_STACK.map((t) => (
                <Reveal key={t.group}>
                  <div className="grid md:grid-cols-[200px_1fr] gap-3 md:gap-8">
                    <p className="font-mono text-[0.875rem] text-ink font-medium">{t.group}</p>
                    <div className="flex flex-wrap gap-2">
                      {t.items.map((i) => (<span key={i} className="border border-line bg-linen px-3 py-1.5 text-[0.875rem] font-mono text-ink-2">{i}</span>))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Engagement model */}
        <section className="section" id="engagement">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">How We Work</span>
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Engagement Model</SplitHeading>
            </div>
            <Stagger className="grid sm:grid-cols-2 border-t border-line" itemClassName="h-full" step={0.06}>
              {ENGAGEMENT.map((e) => (
                <div key={e.title} className="group h-full p-6 md:p-8 border-b border-line hover:bg-tint transition-all duration-300">
                  <h3 className="text-[1.125rem] font-medium text-ink mb-3">{e.title}</h3>
                  <p className="text-[0.9375rem] text-ink-2">{e.body}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* CTA */}
        <section className="relative section always-dark border-y border-line overflow-clip">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
          <div className="container-j relative flex flex-col items-center text-center">
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] text-ink max-w-2xl">Ready to make your GPU infrastructure work harder?</SplitHeading>
            <Reveal delay={0.18}><div className="mt-10"><Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary">Get in touch</a></Magnetic></div></Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
